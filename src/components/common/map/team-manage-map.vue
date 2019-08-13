<template>
    <div class="extend-bj-map">
        <div v-if="lev === 1" class="high-procurator" v-show='mapConfig.tooltipIsshow'>
            <div class="tooltip-bg bg_img" :style="{backgroundImage:`url(${this.mapTooltipTitleBg})`}"></div>
            <p class="tooltip-title">最高人民检察院</p>
            <ul class="high-content">
                <li v-for="item in tooltipConfig" :key="item.id">
                    <span>{{ item.name }}：</span>
                    <p class="high-number">
                        <i v-html="item.regExp ? getTooltipText(item.regExp, highProcuratorInfo) : highProcuratorInfo[item.id] || '0'"></i>
                    </p>
                </li>
            </ul>
        </div>
        <div class="sumBox" v-show="mapConfig.numIsshow">
            <div class="num-block" v-for="topDataItem in topDataConfig" :key="topDataItem.id">
                {{ topDataItem.name }}
                <ul>
                    <li v-for="(item,index) in topData[topDataItem.id]" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="now-data">
            <div v-if='mapConfig.leftIsshow'>
                <h4 class="now-date-text" v-if="nowSelectDate">
                    {{ nowSelectDate.startdate }} ~ {{ nowSelectDate.enddate }}
                </h4>
                <h4 class="now-area">
                    <span>{{ nowAreaName }}</span>
                    <i class="now-data-icon el-icon-coin" @click="dialogVisible = true"></i>
                </h4>
                <ul class="nd-text-list">
                    <li v-for="(item, index) in leftDataConfig" :key="item.id"
                        :style="{ color: `${leftSideColorList[index]}` }">
                        {{ item.name }}: {{ ~~leftData[item.id] }}
                    </li>
                </ul>
            </div>
            <el-popover
                    popper-class="map-extra-table"
                    v-show="extendData.length !== 0"
                    placement="bottom-start"
                    width="400"
                    trigger="click">
                <el-table :data="extendData">
                    <el-table-column
                            v-for="item in extraCityColumn"
                            :key="item.id"
                            :property="item.id"
                            :label="item.name"></el-table-column>
                </el-table>
                <i slot="reference" class="extra-btn el-icon-star-off"></i>
            </el-popover>
        </div>
        <div class="map-chart-box">
            <div ref="mapRef" class="map-chart"></div>
            <div class="map-option">
                <i class="map-btn map-icon el-icon-aim" @click="normotopiaMapCvs"></i>
                <i class="map-btn map-icon el-icon-s-home" @click="showChinaMap"></i>
                <img class="map-btn" :src="backIcon" alt="..." @click="backSuperiorMap">
            </div>
            <div v-if="showTooltip" class="area-box">
                <p class="tooltip-bg bg_img" :style="{backgroundImage:`url(${this.mapTooltipTitleBg})`}"></p>
                <h3 class="title">{{ tooltipData.name }}</h3>
                <ul>
                    <li v-for="item in tooltipConfig" :key="item.id">
                        <span>{{ item.name }}：</span>
                        <i v-html="item.regExp ? getTooltipText(item.regExp, tooltipData) : tooltipData[item.id] || '0'"></i>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
                :title="nowAreaName"
                :visible.sync="dialogVisible"
                @opened="loadMapLineChart"
                width="90%">
            <div class="map-data-list" ref="mapLineChart"></div>
        </el-dialog>
    </div>
</template>

<script>
	import ECharts                                            from 'echarts';
	import { geoCoordMap, extraCityColumnConfig, geoMapName } from './config';

	export default {
		data() {
			return {
				backIcon          : require('@/public/img/team-management/back-icon.png'),
				mapTooltipTitleBg : require('@/public/img/home/shengdata.png'),
				mapPositionImg    : require('@/public/img/home/position.png'),
				showTooltip       : false,
				dialogVisible     : false,
				tooltipData       : {},
				cityCrumbsList    : [],
				mapLevel          : 0,
				highProcuratorInfo: {},
				extendData        : [],
				loadingMap        : false,
			}
		},
		computed: {
			nowAreaName() {
				const name = this.cityCrumbsList[this.mapLevel].name;
				return geoMapName[name] || name;
			}
		},
		created() {
			this.cityCrumbsList    = [{
				id  : 0,
				code: this.defaultCode,
				name: 'china'
			}];
			this.leftSideColorList = ['#FBBA18', '#0BC1F4', '#FF6C40'];
		},
		mounted() {
			const myChart        = ECharts.init(this.$refs.mapRef);
			this.mapJsonData     = [];
			this.mapGeoLoadFaily = false;
			myChart.on('mouseover', (params) => {
				if(params.name) {
					this.tooltipData = params.data || { name: params.name };
					this.showTooltip = true;
				}
			});

			myChart.on('mouseout', () => {
				this.tooltipData = {};
				this.showTooltip = false;
			});

			/**
			 * 地图下钻点击事件
			 *   下钻分为四种情况
			 *     1、国、省市、区县下钻，类型分别为1、2、3、4，需记录上一级地区信息，可根据地图json id截取，第四级不下钻，转为高亮
			 *     2、code、lev需要同步更新
			 *     3、含特殊地区，例如新疆兵团、可用extend=true作为辨别信息
			 *     4、判断@params.data  做是下钻处理
			 * */
			myChart.on('click', (params) => {
				if(this.loadingMap) {
					this.$message.warning('正在加载数据...');
					return false;
				}
				// 判断沒有数据或者不能下钻则返回
				if(!params.data || params.data.id.length > 6) {
					return false;
				}
				const { name, data: { id, code, extendMap } } = params,
					  { id: lastId }                          = this.cityCrumbsList[this.mapLevel],
					  lastIsEndLev                            = this.verifyMapIsEnd(lastId),
					  notEndLev                               = this.verifyMapIsEnd(id);
				// 区分地图最后一级
				if(!(notEndLev && lastIsEndLev)) {
					this.mapLevel++;
				} else {
					return false;
				}
				this.cityCrumbsList[this.mapLevel] = {
					id,
					code,
					name,
					extendMap,
					publicName: params.data.publicName
				};
				this.extendData                    = [];
				// 第四级不加载地图
				if(!notEndLev) {
					this.loadMapGraphJson();
				} else {
					this.highlightCountyArea();
				}
			});

			this.loadMapGraphJson();
			this.myChart = myChart;
		},
		methods : {
			/**
			 * 加载地图json离线数据包
			 * */
			async loadMapGraphJson() {
				const { id, name, extendMap } = this.cityCrumbsList[this.mapLevel];
				let url                       = 'public/map-json';
				if(extendMap) {
					url += `/extendProvince/${id}`;
				} else {
					switch(this.mapLevel) {
						case 0 :
							url += '/china';
							break;
						case 1:
							url += `/geometryProvince/${id}`;
							break;
						case 2 :
							url += `/geometryCouties/${id}00`;
							break;
					}
				}
				try {
					const mapGeoJson        = await require(`../../../${url}.json`);
					this.mapJsonData.length = this.mapLevel;
					this.mapJsonData.push({
						name,
						data: mapGeoJson
					});
					this.handleMapStateChange();
					this.loadMapChart(name, mapGeoJson, false);
				} catch(e) {
					this.mapGeoLoadFaily = true;
					this.$message.error('地区加载失败');
					if(this.mapLevel > 0) {
						this.mapLevel--;
						this.cityCrumbsList.pop();
					}
				}
			},

			/**
			 * 加载地图
			 * */
			loadMapChart(name, data, isMatchExtra = true) {
				this.myChart.clear();
				ECharts.registerMap(name, data);
				let mapData    = [],
					extendData = [];
				// mapDataClassify方法复杂度On2,减少调用次数
				if(isMatchExtra) {
					const classify = this.mapDataClassify(this.cityCrumbsList[this.mapLevel].publicName);
					extendData     = classify.extendData;
					mapData        = classify.mapData;

					if(name === 'china') {
						extendData.some((i) => {
							if(i.code === this.highProcuratorCode) {
								this.highProcuratorInfo = i;
								return true;
							}
							return false;
						});
					} else {
						this.extendData = extendData;
					}
				}
				this.myChart.setOption({
					tooltip: {
						show: false,
					},
					geo    : {
						map         : name,
						roam        : true,
						scaleLimit  : {
							min: .5,
							max: 10
						},
						label       : {
							normal  : {
								show     : true,
								textStyle: {
									color: '#fff',
								}
							},
							emphasis: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						itemStyle   : {
							normal  : {
								borderColor: 'rgba(39, 297, 209, 1)',
								color      : 'rgba(51,209,248,0.2)',
								shadowColor: '#25c9d2',
								shadowBlur : 1,
							},
							emphasis: {
								areaColor    : new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color : 'rgba(7, 101,190, 1)'
								}, {
									offset: 1,
									color : 'rgba(97, 229, 215, 1)'
								}]),
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								shadowBlur   : 20,
								borderWidth  : 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						},
						layoutCenter: name === 'china' ? ['50%', '50%'] : undefined,
						layoutSize  : name === 'china' ? this.mapDefaultWidth : undefined,
					},
					series : [{
						name            : 'extend',
						type            : 'scatter',
						coordinateSystem: 'geo',
						symbolSize      : 15,
						data            : this.convertMapData(name, extendData),
						label           : {
							normal: {
								color    : '#fff',
								formatter: '{b}',
								position : 'right',
								show     : true
							}
						},
						itemStyle       : {
							color: '#00FFFF',
						},
					}, {
						name    : '人数',
						type    : 'map',
						mapType : name,
						geoIndex: 0,
						data    : mapData,
					}],
				});
			},
			// 下钻到第四级
			highlightCountyArea() {
				const { name }               = this.cityCrumbsList[this.mapLevel],
					  { data: upMapGeoJson } = this.mapJsonData[this.mapLevel - 1];
				const nowSelectedMap         = {
					"type"  : "FeatureCollection",
					"cp"    : [116.4551, 40.2539],
					"size"  : "5000",
					features: [upMapGeoJson.features.find(i => i.properties.name === name)],
				};
				this.mapJsonData.push({
					name,
					data: nowSelectedMap
				});
				this.handleMapStateChange();
				this.loadMapChart(name, nowSelectedMap, false);
			},

			/**
			 * 地图正位
			 * */
			normotopiaMapCvs() {
				const { name, data } = this.mapJsonData[this.mapLevel];
				this.loadMapChart(name, data);
			},

			/**
			 * 地图数据分类，对匹配不到的地图区域做特殊处理
			 * */
			mapDataClassify(publicName) {
				let cityData               = this.mapData;
				const mapData              = [],
					{ data: { features } } = this.mapJsonData[this.mapLevel],
					extendData             = cityData.filter((i) => {
						if(publicName) {
							i.name = i.name.replace(publicName, '');
						}
						const isExist = features.some(j => {
							if(j.properties.name === i.name) {
								i.id = j.properties.id;
								return true;
							}
							return false;
						});
						if(isExist) {
							mapData.push(i);
						}
						return !isExist
					});
				return {
					mapData,
					extendData
				};
			},

			getExtraPosition(name) {
				return geoCoordMap[name] || {};
			},

			convertMapData(areaName, extendData) {
				const scatterData   = [],
					  extraPosition = this.getExtraPosition(areaName);
				extendData.forEach(i => {
					const areaInfo = extraPosition[i.name];
					if(areaInfo) {
						scatterData.push({
							...areaInfo,
							...i,
							value: areaInfo.coordinates.concat([i.value || 0])
						})
					}
				});
				return scatterData;
			},

			/**
			 * 工具栏显示内容
			 * */
			getTooltipText(reg, data) {
				return reg.replace(/\{([a-z|_])+\}/g, function(word) {
					const key = word.replace(/\{|\}/g, "");
					return data[key] || 0;
				});
			},

			/**
			 * 地图返回顶级
			 * */
			showChinaMap() {
				if(this.loadingMap || this.mapLevel === 0) {
					return false;
				}
				this.mapLevel           = 0;
				this.mapJsonData.length = 1;
				this.cityCrumbsList     = [{
					id            : 0,
					code          : this.defaultCode,
					name          : 'china',
					nowMapHoleType: true,
				}];
				const { name, data }    = this.mapJsonData[0];
				this.extendData         = [];
				this.loadMapChart(name, data, false);

				this.handleMapStateChange();
			},

			/**
			 * 返回上一级
			 * */
			backSuperiorMap() {
				if(this.mapLevel === 0 || this.loadingMap) {
					return false;
				}
				this.extendData = [];
				this.cityCrumbsList.pop();
				this.mapLevel--;
				this.mapJsonData.pop();
				this.handleMapStateChange();
			},

			/**
			 * 无法下钻提示
			 * */
			notRunHoldWarn() {
				this.$message({
					message: '无法继续下钻',
					type   : 'warning'
				});
			},

			// 验证当前层级是否为最后一级
			verifyMapIsEnd(id) {
				return id.length === 6 && id.substr(4) !== '00';
			},

			/**
			 * 加载地图数据柱状图
			 * */
			loadMapLineChart() {
				const chartData                             = this.mapData,
					  { xAxisList, legendData, seriesData } = this.convertMapChartData(chartData),
					  mapLineChart                          = ECharts.init(this.$refs.mapLineChart);
				mapLineChart.setOption({
					color     : ['#12E9E9', '#F7BD07', '#10E77E'],
					tooltip   : {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend    : {
						data     : legendData,
						left     : 'center',
						top      : 0,
						textStyle: {
							color   : "#fff",
							fontSize: 18
						}
					},
					grid      : {
						top   : '10%',
						left  : '3%',
						right : '3%',
						bottom: '20%',
					},
					calculable: true,
					xAxis     : {
						type     : 'category',
						axisTick : { show: false },
						data     : xAxisList,
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						axisLabel: {
							color     : '#00ffff',
							fontSize  : 21,
							lineHeight: 25,
							interval  : 0
						}
					},
					yAxis     : {
						type     : 'value',
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(216,216,216,0.4)'
							}
						},
						axisLabel: {
							color: '#0ff',
						},
					},
					series    : seriesData
				})
			},
			convertMapChartData(chartData) {
				const xAxisList  = [],
					  legendData = [],
					  seriesData = this.topDataConfig.map((i, index) => {
						  legendData.push(i.name);
						  return {
							  name       : i.name,
							  type       : 'bar',
							  barMaxWidth: 40,
							  data       : chartData.map(j => {
								  if(index === 0) {
									  xAxisList.push(j.name);
								  }
								  return j[i.id];
							  }),
						  }
					  });

				return {
					xAxisList,
					seriesData,
					legendData
				}
			},

			handleMapStateChange() {
				const { name, code } = this.cityCrumbsList[this.mapLevel];

				this.loadingMap = true;
				this.getNewRegionInfo && this.getNewRegionInfo({
					code,
					lev: this.mapLevel + 1,
					name,
				});
			},
		},
		props   : {
			mapData           : {},
			getNewRegionInfo  : {},
			tooltipConfig     : {},
			leftDataConfig    : {
				default: function() {
					return [];
				}
			},
			leftData          : {
				default: function() {
					return {};
				},
			},
			topDataConfig     : {
				default: () => []
			},
			topData           : {},
			lev               : {},
			code              : {},
			defaultCode       : {
				type: String
			},
			nowSelectDate     : {},
			mapConfig         : {
				type: Object,
				default() {
					return {
						numIsshow    : true,
						leftIsshow   : true,
						tooltipIsshow: true
					}
				}
			},
			extraCityColumn   : {
				type   : Array,
				default: extraCityColumnConfig
			},
			mapDefaultWidth   : {
				default: 950
			},
			highProcuratorCode: {
				default: 100000
			}
		},
		watch   : {
			mapData() {
				if(this.mapGeoLoadFaily) {
					this.mapGeoLoadFaily = false;
				} else {
					const index       = this.mapLevel,
						  mapJsonData = this.mapJsonData;
					this.loadingMap   = false;
					this.loadMapChart(mapJsonData[index].name, mapJsonData[index].data);
				}
			}
		}
	}
</script>

<style lang="scss">
    @mixin tooltipBg {
        background: linear-gradient(90deg, rgba(19, 210, 220, .2) 0%, rgba(5, 138, 227, .4) 100%);
    }

    .map-extra-table {
        &.el-popover {
            background-color: rgba(6, 35, 85, 1);
            border: 0;
            .el-table {
                background-color: transparent;
                max-height: 400px;
                overflow: auto;
                overflow-x: hidden;
                &::-webkit-scrollbar {
                    width: 5px;
                    background-color: transparent;
                }
                &::-webkit-scrollbar-track {
                    border-radius: 10px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    background: rgba(14, 132, 218, .4);
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
                }

                &:before {
                    display: none;
                }
                tr {
                    background-color: transparent;
                    color: #fff;
                    th {
                        background-color: transparent;
                        border: 0;
                    }
                    td {
                        border: 0;
                    }
                    &:hover {
                        td {
                            background-color: rgba(233, 233, 233, .1);
                        }
                    }
                }
            }
        }
    }

    .tooltip-bg {
        display: table;
        top: 20px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        text-align: center;
        margin: 12px auto 21px auto;
        animation: rotation 3s linear infinite;
    }

    @keyframes rotation {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .extend-bj-map {
        position: relative;
        width: 100%;
        height: 100%;
        margin-top: -20px;
        .sumBox {
            display: flex;
            font-size: 18px;
            height: 43px;
            line-height: 43px;
            color: rgba(11, 193, 244, 1);
            align-items: center;
            margin: 20px 0 0 -10px;
            justify-content: center;
            .num-block {
                margin-right: 20px;
                text-align: center;
                ul {
                    position: relative;
                    vertical-align: middle;
                    display: inline-flex;
                    li {
                        position: relative;
                        top: 0;
                        width: 32px;
                        height: 43px;
                        line-height: 43px;
                        display: inline-block;
                        border-radius: 4px;
                        font-size: 36px;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        margin-right: 5px;
                        background: linear-gradient(bottom, #0BE5F1, #0C99F7);
                        cursor: pointer;
                        /*animation: blockShake 1s linear 0s 1 normal forwards;*/
                        transition: top .1s linear;
                        &:last-of-type {
                            margin-left: 0;
                        }
                        &:hover {
                            top: -3px;
                        }

                    }
                }
                @keyframes blockShake {
                    50% {
                        transform: rotateY(-180deg);
                    }
                    100% {
                        transform: rotateY(-360deg);
                    }
                }
            }
        }
        .map-chart-box {
            position: relative;
            width: 100%;
            height: 100%;
            float: right;
            .map-chart {
                width: 100%;
                height: 100%;
            }
            .map-option {
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                width: 140px;
                z-index: 2;
                .map-btn {
                    width: 30px;
                    height: 30px;
                    margin-right: 11px;
                    cursor: pointer;
                    background-color: #06a7ba;
                    &.map-icon {
                        display: block;
                        width: 30px;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 5px;
                        color: #FFFFFF;
                        background-color: #06a7ba;
                    }

                }
            }
            .area-box {
                position: absolute;
                top: 400px;
                right: 47px;
                min-width: 200px;
                padding-bottom: 10px;
                box-shadow: 0 0 1px rgba(1, 1, 1, 1);
                border-radius: 5px;
                @include tooltipBg;
                .title {
                    position: absolute;
                    top: 20px;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding: 0;
                    text-align: center;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 1);
                }
                ul {

                    li {
                        display: flex;
                        justify-content: space-evenly;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
                        line-height: 14px;
                        padding: 10px 7px;
                        span {
                            display: inline-block;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }

        .now-data {
            position: absolute;
            top: 60px;
            left: 50px;
            font-weight: bold;
            z-index: 2;
            .now-date-text {
                margin-bottom: 18px;
                color: #0ff;
                font-size: 20px;
            }
            .now-area {
                margin-bottom: 20px;
                span {
                    color: #FFFFFF;
                    font-size: 28px;
                    vertical-align: bottom;
                }
                .now-data-icon {
                    display: inline-block;
                    width: 29px;
                    height: 29px;
                    text-align: center;
                    line-height: 29px;
                    margin-left: 42px;
                    background-color: #03a2b8;
                    color: #FFFFFF;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
            }
            .nd-text-list {
                li {
                    margin-bottom: 21px;
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
            }
            .extra-btn {
                display: inline-block;
                width: 29px;
                height: 29px;
                margin-top: 20px;
                text-align: center;
                line-height: 29px;
                background-color: #03a2b8;
                color: #FFFFFF;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
        }
        .high-procurator {
            position: absolute;
            left: 50%;
            top: 65px;
            transform: translate(-50%, 0);
            width: 300px;
            padding: 0 15px;
            border: 1px solid #17DDDD;
            border-radius: 10px;
            color: #fff;
            .tooltip-title {
                position: absolute;
                top: 30px;
                left: 50%;
                transform: translate(-50%, 0);
            }
            .high-content {
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 100%;
                    margin-bottom: 10px;
                    display: flex;
                    color: #dfdfdf;
                    span {
                        width: 120px;
                        text-align: right;
                    }
                }
            }
        }
        .map-data-list {
            width: 99%;
            height: 420px;
            margin: 0 auto 20px;
        }
    }
</style>