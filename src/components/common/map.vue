<template>
    <div class="map-chart-box">
        <div ref="mapRef" class="map-chart"></div>
        <div class="map-option">
            <i class="map-btn map-icon el-icon-s-home" @click="showChinaMap"></i>
            <img class="map-btn" :src="backIcon" alt="..." @click="backSuperiorMap">
        </div>
        <div v-if="showTooltip" class="area-box">
            <p class="bg_img rotation" :style="{backgroundImage:`url(${this.mapTooltipTitleBg})`}"></p>
            <span class="title">{{ tooltipData.name }}</span>
            <ul>
                <li v-for="item in tooltipConfig" :key="item.id">
                    <span>{{ item.name }}：</span>
                    <i>{{ item.regExp ? getTooltipText(item.regExp, tooltipData) : tooltipData[item.id] || '-' }}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	import ECharts from 'echarts';

	export default {
		data() {
			return {
				backIcon         : require('@/public/img/team-management/back-icon.png'),
				mapTooltipTitleBg: require('@/public/img/home/shengdata.png'),
				mapPositionImg   : require('@/public/img/home/position.png'),
				showTooltip      : false,
				tooltipData      : {},
				code             : 100000,
			}
		},
		mounted() {
			const myChart    = ECharts.init(this.$refs.mapRef);
			this.mapLevel    = 1;
			this.dataMap     = null;
			this.secondLvMap = null;

			myChart.on('click', (params) => {
				if(this.mapLevel < 3) {
					if(!params.data) {
						return false;
					}
					const selectCityName = params.name,
						  selectCity     = this.dataMap.find((place) => {
							  return place.name === selectCityName;
						  });
					if(this.lev) {
						if(selectCity.id.length === 6) {
							this.notRunHoldWarn();
							return false;
						}
					}
					this.mapLevel++;
					if(this.mapLevel === 2) {
						this.secondLvMap = selectCity;
						this.code        = params.data && params.data.code;
					}
					this.getNewRegionInfo && this.getNewRegionInfo({
						code: params.data.code,
						lev : this.mapLevel,
					});
					this.loadMapData(selectCity.id, selectCity.name);
				}
			});
			myChart.on('mouseover', (params) => {
				this.tooltipData = params.data || { name: params.name };
				this.showTooltip = true;
			});
			myChart.on('mouseout', () => {
				this.tooltipData = {};
				this.showTooltip = false;
			});
			this.loadMapData(0, 'china');
			this.myChart = myChart;
		},
		methods: {
			async loadMapData(id, name) {
				let url = 'public/map-json';
				switch(this.mapLevel) {
					case 1 :
						url += '/china';
						break;
					case 2:
						url += `/geometryProvince/${id}`;
						break;
					case 3 :
						url += `/geometryCouties/${id}00`;
						break;
				}
				const data = await require(`../../${url}.json`);
				this.loadMap(name, data);
				this.mapSvgJson = {
					name,
					data
				};
				this.dataMap    = data.features.map((place) => ({
					id  : place.properties.id,
					name: place.properties.name
				}));
			},
			loadMap(name, data) {
				this.myChart.clear();
				ECharts.registerMap(name, data);
				this.myChart.setOption({
					tooltip  : {
						show: false,
					},
					geo      : {
						map         : name,
						roam        : false,
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
						layoutSize  : name === 'china' ? 950: undefined,
					},
					series   : [{
						name    : '人数',
						type    : 'map',
						mapType : name,
						geoIndex: 0,

						data: this.mapData,
					}],
				});
			},

			getTooltipText(reg, data) {
				return reg.replace(/\{([a-z|_])+\}/g, function(word) {
					const key = word.replace(/\{|\}/g, "");
					return data[key] || 0;
				});
			},
			// 返回顶级
			showChinaMap() {
				this.mapLevel = 1;
				this.loadMapData(0, 'china');
				this.getNewRegionInfo({
					code: 100000,
					lev : 1,
				});
			},
			// 返回上一级
			backSuperiorMap() {
				switch(this.mapLevel) {
					case 3 : {
						this.mapLevel--;
						this.loadMapData(this.secondLvMap.id, this.secondLvMap.name);
					}
						break;
					case 2 : {
						this.mapLevel--;
						this.code = 100000;
						this.loadMapData(0, 'china');
					}
						break;
				}
				this.getNewRegionInfo({
					code: this.code,
					lev : this.mapLevel
				});
			},
			// 无法下钻提示
			notRunHoldWarn() {
				this.$message({
					message: '无法继续下钻',
					type   : 'warning'
				});
			},
		},
		props  : ['mapData', 'getNewRegionInfo', 'tooltipConfig'],
		watch  : {
			mapData() {
				this.loadMap(this.mapSvgJson.name, this.mapSvgJson.data);
			}
		}
	}
</script>

<style lang="scss">
    .map-chart-box {
        position: relative;
        width: 100%;
        height: 100%;
        float: right;
        .map-chart {
            width: 1150px;
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
            top: 360px;
            right: 47px;
            width: 200px;
            min-height: 230px;
            padding-bottom: 10px;
            background: linear-gradient(90deg, rgba(19, 210, 220, .3) 0%, rgba(5, 138, 227, .5) 100%);
            box-shadow: 0 0 1px rgba(1, 1, 1, 1);
            border-radius: 5px;
            @keyframes rotation {
                from {
                    -webkit-transform: rotate(0deg);
                }
                to {
                    -webkit-transform: rotate(360deg);
                }
            }
            .rotation {
                animation: rotation 3s linear infinite;
                background-image: url("../../public/img/home/shengdata.png");
            }
            .title {
                position: absolute;
                top: 30px;
                left: 0;
                width: 100%;
                padding: 0;
                text-align: center;
                font-size: 14px;
                color: rgba(255, 255, 255, 1);
            }
            p {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                text-align: center;
                line-height: 55px;
                margin: 12px auto 21px auto;
            }
            ul {
                li {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 14px;
                    display: flex;
                    padding: 10px;
                    span {
                        display: inline-block;
                        width: 100px;
                        text-align: right;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>