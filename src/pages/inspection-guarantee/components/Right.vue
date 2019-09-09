<template>
    <div class="jw-right-box">
        <div class="content-box">
            <div class="left-view">
                <!-- 资产情况 -->
                <div class="property-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>资产情况</i>
                    </div>
                    <p class='unit'>单位:万元</p>
                    <div class="propertyBox">
                        <div class="propertyContent">
                            <p>总资产<br/><span>{{formatNum(assetsSituation.zzc)}}</span><b></b></p>
                            <ol>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                            <ul>
                                <li>长期投资资产<br/><span>{{formatNum(assetsSituation.cqtzzc)}}</span></li>
                                <li @mouseover="changeMask(true)" @mouseout="changeMask(false)">固定资产<br/><span>{{formatNum(assetsSituation.gdzc)}}</span>
                                    <div class="hoverdiv" v-show='hoverdivisshow'>
                                        <span>房屋(平方米)数量：{{ formatNum(assetsSituation.fwsl) }}</span>
                                        <span>房屋(平方米)价值：{{formatNum(assetsSituation.fwjz)}}</span>
                                        <span>汽车(台辆)数量：{{formatNum(assetsSituation.qcsl)}}</span>
                                        <span>汽车(台辆)价值：{{formatNum(assetsSituation.qcjz)}}</span>
                                        <span>单价在50万元以上的设备数量：{{formatNum(assetsSituation.djwswyssbsl)}}</span>
                                        <span>单价在50万元以上的设备价值：{{formatNum(assetsSituation.djwswyssbjz)}}</span>
                                        <span>其他固定资产价值：{{formatNum(assetsSituation.qtgdzcjz)}}</span>
                                        <span>单价100万元(含)以上的专业设备数量：{{formatNum(assetsSituation.djybwyssbsl)}}</span>
                                        <span>单价100万元(含)以上的专业设备价值：{{formatNum(assetsSituation.djybwyssbjz)}}</span>
                                    </div>
                                </li>
                                <li>流动资产<br/><span>{{formatNum(assetsSituation.ldzc)}}</span></li>
                                <li>其他资产<br/><span>{{formatNum(assetsSituation.qtzc)}}</span></li>
                                <li>无形资产<br/><span>{{formatNum(assetsSituation.wxzc)}}</span></li>
                                <li>在建工程资产<br/><span>{{formatNum(assetsSituation.zjgczc)}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="procuratorial-work">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察业务装备</i>
                    </div>
                    <p class='unit'>单位:万元</p>
                    <div class='service-content' ref="serviceChart"></div>
                    <div class="putinto">
                        <p class="putinto-title">检察业务装备16、18年增长比例</p>
                        <ul>
                            <li @mouseover="righttableIsshowfn(0)" :class='{active:0==activeIndex}'>
                                <i class='el-icon-tickets'></i>
                                <p>检察业务装备</p>
                                <span>数量</span>
                                <span>{{inspectionServiceEquipmentDetails.jcywzbsl}}</span>
                                <span>{{inspectionServiceEquipmentDetails.snzcljcywzbsl}}%</span>
                                <b>金额</b>
                                <b>{{formatNum(inspectionServiceEquipmentDetails.jcywzbje)}}</b>
                                <b>{{inspectionServiceEquipmentDetails.snzcljcywzbje}}%</b>
                            </li>
                            <li @mouseover="righttableIsshowfn(1)" :class='{active:1==activeIndex}'>
                                <i class='el-icon-tickets'></i>
                                <p>技术装备</p>
                                <span>数量</span>
                                <span>{{inspectionServiceEquipmentDetails.jcywjzzbsl}}</span>
                                <span>{{inspectionServiceEquipmentDetails.snzcljcywjzzbsl}}%</span>
                                <b>金额</b>
                                <b>{{formatNum(inspectionServiceEquipmentDetails.jcywjzzbje)}}</b>
                                <b>{{inspectionServiceEquipmentDetails.snzcljcywjzzbje}}%</b>
                            </li>
                            <li @mouseover="righttableIsshowfn(2)" :class='{active:2==activeIndex}'>
                                <i class='el-icon-tickets'></i>
                                <p>综合保障装备</p>
                                <span>数量</span>
                                <span>{{inspectionServiceEquipmentDetails.jcywzhbzzbsl}}</span>
                                <span>{{inspectionServiceEquipmentDetails.snzcljcywzhbzzbsl}}%</span>
                                <b>金额</b>
                                <b>{{formatNum(inspectionServiceEquipmentDetails.jcywzhbzzbje)}}</b>
                                <b>{{inspectionServiceEquipmentDetails.snzcljcywzhbzzbje}}%</b>
                            </li>
                            <li @mouseover="righttableIsshowfn(3)" :class='{active:3==activeIndex}'>
                                <i class='el-icon-tickets'></i>
                                <p>司法警察装备</p>
                                <span>数量</span>
                                <span>{{inspectionServiceEquipmentDetails.sfgjzbsl}}</span>
                                <span>{{inspectionServiceEquipmentDetails.snzclsfgjzbsl}}%</span>
                                <b>金额</b>
                                <b>{{formatNum(inspectionServiceEquipmentDetails.sfgjzbje)}}</b>
                                <b>{{inspectionServiceEquipmentDetails.snzclsfgjzbje}}%</b>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <!-- 检察机关机构人员情况 -->
                <div class="personnel-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察机关机构人员情况</i>
                    </div>
                    <div class="personnel-content">
                        <div class="personnel-top">
                            <p class='unit'>单位:个</p>
                            <p class='title'>机构情况</p>
                            <div class="fraze-grid">
                                <div class='agencylist'>
                                    <p>年末机构数</p>
                                    <p>{{theProcuratorialAgency.ynmjgs}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>省级院</p>
                                    <p>{{theProcuratorialAgency.sjy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>地市级</p>
                                    <p>{{theProcuratorialAgency.dsy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>县区级</p>
                                    <p>{{theProcuratorialAgency.xjy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>派出院</p>
                                    <p>{{theProcuratorialAgency.pcy}}</p>
                                </div>
                            </div>
                            <div class="fraze-grid">
                                <div class='agencylist'>
                                    <p>铁检院</p>
                                    <p>{{theProcuratorialAgency.tjy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>林区院</p>
                                    <p>{{theProcuratorialAgency.lqy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>油田院</p>
                                    <p>{{theProcuratorialAgency.yty}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>矿区院</p>
                                    <p>{{theProcuratorialAgency.kqy}}</p>
                                </div>
                                <div class='agencylist'>
                                    <p>事业单位</p>
                                    <p>{{theProcuratorialAgency.sydw}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="fraze-grid">
                            <div class="agency-content" ref="agencyChart"></div>
                            <div class="job-content" ref="jobChart"></div>
                        </div>
                    </div>
                </div>
                <div class="totalfiscal-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>计财机构及人员情况</i>
                    </div>
                    <div class="totalfiscal-content">
                        <div class="totalfiscal-top">
                            <p class='title'>计财部门设置情况</p>
                            <p class="unit">单位：个</p>
                            <p class="totalfiscal-text">
                                <span>已设置计财部门</span>
                                <span>{{financialInstitutions.jcbmszqk}}</span>
                                <span>未设置计财部门</span>
                            </p>
                            <ul>
                                <li :style="{width:`${financialInstitutions.yszjcbm / (financialInstitutions.wszjcbm + financialInstitutions.yszjcbm) * 100}%`}">
                                    {{financialInstitutions.yszjcbm}}
                                </li>
                                <li :style="{width:`${financialInstitutions.wszjcbm /(financialInstitutions.wszjcbm + financialInstitutions.yszjcbm) * 100}%`}">
                                    {{financialInstitutions.wszjcbm}}
                                </li>
                            </ul>

                        </div>
                        <div class="totalfiscal-bottom">
                            <div class="totalfiscal-bottom-left">
                                <p class='title'>人员情况</p>
                                <ul>
                                    <li @mouseover="changeMask1(true)" @mouseout="changeMask1(false)">
                                        <i class='el-icon-s-custom'></i>
                                        <span>{{financialInstitutions.jcrysys}}</span>
                                        <p>计财人员 实有数</p>
                                        <div class="hoverdiv" v-show='hoverdivisshow1'>
                                            <span>专职人员:{{financialInstitutions.zzry}}人</span>
                                            <span>兼职人员:{{financialInstitutions.jzry}}人</span>
                                        </div>
                                    </li>
                                    <li @mouseover="changeMask2(true)" @mouseout="changeMask2(false)">
                                        <i class='el-icon-s-custom'></i>
                                        <span>{{financialInstitutions.kjryqk}}</span>
                                        <p>会计人员 情况</p>
                                        <div class="hoverdiv" v-show='hoverdivisshow2'>
                                            <span>在编不在岗位:{{financialInstitutions.zbbzghjryssl}}人</span>
                                            <span>在编在岗:{{financialInstitutions.zbzghjryssl}}人</span>
                                            <span>在岗不在编:{{financialInstitutions.zgbzbhjryssl}}人</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="totalfiscal-bottom-right" ref="busAccChart"></div>

                        </div>
                    </div>
                </div>
                <transition name='slide-fade'>
                    <div class="righttable" v-if="righttableIsshow">
                        <div class="left" @click="hidefn('righttableIsshow')">》</div>
                        <div class="right">
                            <table>
                                <thead>
                                <tr>
                                    <th>项目</th>
                                    <th>数量</th>
                                    <th>金额（万元）</th>
                                </tr>
                                <tr>
                                    <td>（一）检察业务技术装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywjszb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywjszb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>1.查办和预防职务犯罪装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.cbhyfzwfzzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.cbhyfzwfzzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>2.公诉和民行装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.gshmxzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.gshmxzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>3.侦查监督装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.zcjdzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.zcjdzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>4.执行监督装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.zxjdzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.zxjdzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>5.控告申诉装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.kgsszb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.kgsszb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>6.办案工作区装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.bagzqzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.bagzqzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>7.法医检验鉴定设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.fyjyjdsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.fyjyjdsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>8.物证类检验鉴定设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.wzljyjdsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.wzljyjdsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>9.图像声像处理和电子物证检验鉴定设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.txsxclhdzwzjyjdsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.txsxclhdzwzjyjdsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>10.司法会计检验鉴定装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sfhjjyjdzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sfhjjyjdzb_je)}}</td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="righttable" v-if="righttableIsshow2">
                        <div class="left" @click="hidefn('righttableIsshow2')">》</div>
                        <div class="right">
                            <table>
                                <thead>
                                <tr>
                                    <th>项目</th>
                                    <th>数量</th>
                                    <th>金额（万元）</th>
                                </tr>
                                <tr>
                                    <td>（二）检察业务综合保障装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywzhbzzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywzhbzzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>1.检察通信设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jctxsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jctxsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>2.视频会议系统</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sphyxt_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sphyxt_je)}}</td>
                                </tr>
                                <tr>
                                    <td>3.信息网络设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.xxwlsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.xxwlsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>4.交通设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jtsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jtsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>5.档案管理设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.daglsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.daglsb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>6.检察业务常规设备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywcgsb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jcywcgsb_je)}}</td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="righttable" v-if="righttableIsshow3">
                        <div class="left cur-pointer" @click="hidefn('righttableIsshow3')">》</div>
                        <div class="right">
                            <table>
                                <thead>
                                <tr>
                                    <th>项目</th>
                                    <th>数量</th>
                                    <th>金额（万元）</th>
                                </tr>
                                <tr>
                                    <td>（三）司法警察装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sfjczb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.sfjczb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>1.单警装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.djzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.djzb_je)}}</td>
                                </tr>
                                <tr>
                                    <td>2.警械专用柜</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jxzyg_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.jxzyg_je)}}</td>
                                </tr>
                                <tr>
                                    <td>3.防暴处突装备</td>
                                    <td>{{formatNum(inspectionServiceEquipment.fbctzb_sl)}}</td>
                                    <td>{{formatNum(inspectionServiceEquipment.fbctzb_je)}}</td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
    </div>
</template>

<script>
	import ECharts                                          from 'echarts';
	import { mapGetters }                                   from 'vuex';
	import { verifyTriggerState, numberInteger, formatNum } from '@/utlis/helper';
	import 'echarts-liquidfill/src/liquidFill.js';
	import * as services                                    from '../service';
	import { propertyConfig, agencyConfig }                 from '../constant/index';


	export default {
		data() {
			return {
				swiperTitle      : '',
				civilBoxImg      : require('@/public/img/home/civilBox.png'),
				empiricaIcon     : require('@/public/img/home/empirica-icon.png'),
				propertyConfig   : propertyConfig,
				agencyConfig     : agencyConfig,
				righttableIsshow : false,
				righttableIsshow2: false,
				righttableIsshow3: false,
				hoverdivisshow   : false,
				hoverdivisshow1  : false,
				hoverdivisshow2  : false,
				activeIndex      : 0
			};
		},
		props     : {
			assetsSituation                  : {
				default: {}
			},
			theProcuratorialAgency           : {
				default: {}
			},
			prosecutionPersonnel             : {
				default: {}
			},
			numberOfEmployees                : {
				default: {}
			},
			financialInstitutions            : {
				default: {}
			},
			inspectionServiceEquipment       : {
				default: {}
			},
			inspectionServiceEquipmentDetails: {
				default: {}
			}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.jobChart        = ECharts.init(this.$refs.jobChart);
			this.serviceChart    = ECharts.init(this.$refs.serviceChart);
			this.busAccChart     = ECharts.init(this.$refs.busAccChart);
			this.serviceChart.on('pieselectchanged', (params) => {
				if(params.name === "技术装备") {
					this.righttableIsshow = true;
					this.righttableIsshow2 = false;
					this.righttableIsshow3 = false;
				} else if(params.name === "综合保障装备") {
					this.righttableIsshow = false;
					this.righttableIsshow2 = true;
					this.righttableIsshow3 = false;
				} else if(params.name === '司法警察装备') {
					this.righttableIsshow = false;
					this.righttableIsshow2 = false;
					this.righttableIsshow3 = true
				}
				
			});
			this.agencyChart = ECharts.init(this.$refs.agencyChart);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadserviceChart(data) {
				const numTotal = data.sfjczb_sl + data.jcywzhbzzb_sl + data.jcywjszb_sl;
				this.serviceChart.setOption({
					color  : ['#FBBA18', '#0CADE8', '#1BC85D'],
					tooltip: {
						show: false
					},
					legend : {
						show     : false,
						orient   : 'horizontal',
						icon     : 'circle',
						bottom   : 10,
						x        : 'center',
						textStyle: {
							color: '#fff'
						},
						data     : ['司法警察装备', '综合保障装备', '技术装备']
					},
					series : [{
						name        : '数量',
						type        : 'pie',
						selectedMode: 'single',
						radius      : [0, '50%'],
						center      : ['50%', '60%'],
						label       : {
							normal: {
								show     : true,
								position : 'inner',
								textStyle: {
									color     : '#fff',
									fontWeight: 'normal',
									fontSize  : 10
								}
							}
						},
						labelLine   : {
							normal: {
								show: false
							}
						},
						tooltip     : {
							show     : true,
							trigger  : 'item',
							formatter: '{b} <br/> 数量 : {c} <br/> 数量占比： {d}%'
						},
						data        : [{
							value: data.sfjczb_sl,
							name : '司法警察装备',
							num  : data.sfjczb_je
						}, {
							value: data.jcywzhbzzb_sl,
							name : '综合保障装备',
							num  : data.jcywzhbzzb_je
						}, {
							value: data.jcywjszb_sl,
							name : '技术装备',
							num  : data.jcywjszb_je
						}]
					}, {
						name     : '金额',
						type     : 'pie',
						radius   : ['53%', '70%'],
						center   : ['50%', '60%'],
						label    : {
							normal: {
								formatter: function(params) {
									return `${params.name}\n金额：${ params.value}\n金额占比：${params.percent}%\n数量：${params.data.num}\n数量占比：${params.data.numPercent}%`;
								}
							}
						},
						labelLine: {
							normal: {
								show     : true,
								length   : 20,
								length2  : 20,
								lineStyle: {
									type : 'dashed',
									width: 2
								}
							}
						},
						tooltip  : {
							show     : true,
							trigger  : 'item',
							formatter: '{b} <br/> 金额 : {c} <br/> 金额占比： {d}%'
						},
						data     : [{
							value     : data.sfjczb_je,
							name      : '司法警察装备',
							num       : data.sfjczb_sl,
							numPercent: (data.sfjczb_sl / numTotal * 10000).toFixed(0) / 100
						}, {
							value     : data.jcywzhbzzb_je,
							name      : '综合保障装备',
							num       : data.jcywzhbzzb_sl,
							numPercent: (data.jcywzhbzzb_sl / numTotal * 10000).toFixed(0) / 100
						}, {
							value     : data.jcywjszb_je,
							name      : '技术装备',
							num       : data.jcywjszb_sl,
							numPercent: (data.jcywjszb_sl / numTotal * 10000).toFixed(0) / 100
						}]
					}]
				})
			},
			loadagencyChart(data) {
				let str  = '着检察服人数：' + data.zjcfrs + '人' + '<br/>' + '着法服人数：' + data.zfjfrs + '人';
				let str1 = '政法专项编制：' + data.zfzxbz + '人' + '<br/>' + '事业编制：' + data.sybz + '人' + '<br/>' + '工勤编制：' + data.gqbz + '人' + '<br/>' + '其他编制：' + data.qtbz + '人';
				let str2 = '政府购买服务聘用人员：' + data.zfgmfwpyry + '人' + '<br/>' + '其他聘用人员：' + data.qtpyry + '人' + '<br/>' + '临时工：' + data.lsg + '人';
				this.agencyChart.setOption({
					title  : {
						text     : '人员情况',
						left     : 10,
						top      : 10,
						textStyle: {
							color     : '#2fe0be',
							fontSize  : 16,
							fontWeight: 500
						}
					},
					tooltip: {
						hoverAnimation: false,
						trigger       : 'item',
						formatter     : function(data) {
							if(data.name === '着装人员') {
								return str
							}
							if(data.name === '人员编制数') {
								return str1
							}
							if(data.name === '其他人员') {
								return str2
							}
						},
					},
					color  : ['#5C89FF', '#FF6C40', '#FBBA18'],
					series : [
						{
							type             : 'pie',
							radius           : ['35%', '45%'],
							center           : ['50%', '55%'],
							avoidLabelOverlap: false,
							hoverAnimation   : false,
							legendHoverLink  : false,
							label            : {
								normal: {
									show            : true,
									padding         : -8,
									hoveyirAnimation: false,
									formatter       : '{b}\n{c}人',
									rich            : {
										b: {
											align: 'left',
											color: 'yellow'
										}
									}
								}
							},
							labelLine        : {
								normal: {
									show: true,
								}
							},
							data             : [
								{
									value: data.rybzs,
									name : '人员编制数'
								},
								{
									value: data.zzry,
									name : '着装人员'
								},
								{
									value: data.qtry,
									name : '其他人员'
								}
							]
						}
					]
				})
			},
			loadjobChart(data) {
				var datas = [{
					value: data.zyjsry,
					name : '专业技术人员'
				}, {
					value: data.gqry,
					name : '工勤人员'
				}, {
					value: data.gbxzzw,
					name : '干部行政职务'
				}];
				var scale = 1;


				this.jobChart.setOption({
					tooltip: {},
					series : [{
						type          : 'pie',
						radius        : ['35%', '45%'],
						center        : ['50%', '55%'],
						hoverAnimation: true,
						color         : ['#FBBA18', '#0CADE8', '#1BC85D'],
						label         : {
							normal: {
								align    : 'left',
								formatter: function(params, ticket, callback) {
									var total   = 0;
									var percent = 0;
									datas.forEach(function(value, index, array) {
										total += value.value;
									});
									percent = ((params.value / total) * 100).toFixed(1);
									return `${params.name}\n${params.value}\n${percent}%`;
								},
							},
						},
						labelLine     : {
							normal: {
								show: true,
							}
						},
						data          : datas
					}]
				})
			},
			loadBusAccChart(data) {
				const chartData = {
					"name"    : "会计核算形式",
					value     : data.kjhsxs,
					"children": [{
						"name": "会计独立核算",
						value : data.kjdlhs,
						label : {
							offset: [0, -10]
						},
					}, {
						"name"     : "会计委派制",
						"collapsed": false,
						value      : data.kjwpz,
						"children" : [{
							"name": "其中会计集中核算",
							value : data.qzkjjzhs,
							label : {
								offset: [0, -10]
							},
						}]
					}, {
						"name": "其他形式",
						value : data.qtxs,
						label : {
							offset: [10, -10]
						},
					}],
				};
				this.busAccChart.setOption({
					tooltip: {
						trigger  : 'item',
						formatter: '{b}：{c}'
					},
					series : [{
						type                   : 'tree',
						data                   : [chartData],
						top                    : '1%',
						left                   : 100,
						right                  : 30,
						bottom                 : '1%',
						symbolSize             : 10,
						height                 : 270,
						label                  : {
							normal: {
								position     : 'left',
								verticalAlign: 'middle',
								align        : 'right',
								fontSize     : 14,
								color        : '#dfdfdf',
								formatter    : '{b}\n{c}',
								offset       : [10, -20]
							}
						},
						lineStyle              : {
							color: '#04A9E6',
							width: 3,
						},
						leaves                 : {
							label: {
								normal: {
									position     : 'right',
									verticalAlign: 'bottom',
									align        : 'right',
								}
							}
						},
						expandAndCollapse      : true,
						animationDuration      : 550,
						animationDurationUpdate: 750
					}]
				});
			},
			righttableIsshowfn(num) {
				this.activeIndex = num
			},
			hidefn(val) {
				this[val] = false
			},
			changeMask(value) {
				this.hoverdivisshow = value
			},
			changeMask1(value) {
				this.hoverdivisshow1 = value
			},
			changeMask2(value) {
				this.hoverdivisshow2 = value
			},
			formatNum,
		},
		components: {},
	}
</script>

<style lang="scss" scoped>
    .jw-right-box {
        width: 100%;
        .hoverdiv {
            z-index: 100;
        }
        .content-box {
            display: flex;
            .left-view {
                flex: 670;
                .property-box {
                    width: 100%;
                    position: relative;
                    .unit {
                        position: absolute;
                        right: 20px;
                        top: 45px;
                        color: #FBBA18;
                    }
                    .propertyBox {
                        height: 240px;
                        .propertyContent {
                            color: #fff;
                            text-align: center;
                            p {
                                width: 198px;
                                height: 66px;
                                border-radius: 2px;
                                border: 1px solid rgba(0, 216, 233, 1);
                                padding-top: 8px;
                                margin: 40px auto 0;
                                position: relative;
                                b {
                                    width: 1px;
                                    height: 31px;
                                    background: #979797;
                                    position: absolute;
                                    bottom: -31px;
                                    left: 97px;
                                }
                            }
                            ol {
                                display: flex;
                                width: 75%;
                                margin: 31px auto 0;
                                height: 29px;
                                border: 1px solid #979797;
                                border-bottom: none;
                                overflow: hidden;
                                li {
                                    flex: 1;
                                    height: 29px;
                                    float: left;
                                    border-right: 1px solid #979797;
                                }
                                li:last-child {
                                    border-right: none;
                                }
                            }
                            span {
                                color: #FBBA18;
                            }
                            ul {
                                width: 92%;
                                display: flex;
                                margin: 0 auto;
                                li {
                                    flex: 1;
                                    height: 59px;
                                    border-radius: 2px;
                                    border: 1px solid rgba(0, 216, 233, 1);
                                    margin-right: 10px;
                                    padding-top: 8px;
                                    font-size: 12px;
                                }
                                li:nth-child(2) {
                                    position: relative;
                                    .hoverdiv {
                                        position: absolute;
                                        width: 400px;
                                        background-image: linear-gradient(top,#091e5f,#01040b);
                                        box-shadow: 0 2px 4px 0 rgba(13, 61, 137, 0.5);
                                        border-radius: 4px;
                                        left: 50%;
                                        text-align: left;
                                        line-height: 20px;
                                        padding: 10px;
                                        span {
                                            display: block;
                                            color: #fff;
                                            margin: 2px 0;
                                        }
                                    }
                                }
                                li:last-child {
                                    margin-right: 0px;
                                }
                            }
                        }
                    }
                }
                .procuratorial-work {
                    position: relative;
                    width: 100%;
                    .unit {
                        position: absolute;
                        right: 20px;
                        top: 45px;
                        color: #FBBA18;
                    }
                    .service-content {
                        width: 100%;
                        height: 270px;
                        background: none !important;
                    }
                    .putinto {
                        width: 100%;
                        .putinto-title {
                            font-size: 20px;
                            margin-bottom: 30px;
                        }
                        p {
                            color: #fff;
                            text-align: center;
                            margin: 10px 0px 10px 0px;
                            font-size: 16px;
                        }
                        ul {
                            width: 80%;
                            margin: 0 auto;
                            height: 215px;
                            display: flex;
                            justify-content: space-around;
                            li {
                                width: 130px;
                                height: 215px;
                                float: left;
                                border: 1px solid rgba(11, 184, 250, 1);
                                margin-right: 10px;
                                text-align: center;
                                p {
                                    margin-bottom: 8px;
                                }
                                i {
                                    margin-top: 9px;
                                    font-size: 22px;
                                }
                                span {
                                    color: #0BB8FA;
                                    display: block;
                                }
                                b {
                                    display: block;
                                    color: #FF6C40;
                                }
                            }

                            li:first-child {
                                i {
                                    color: #0BAEFF;
                                }
                            }
                            .active {
                                background: linear-gradient(180deg, rgba(23, 213, 191, 0.6) 0%, rgba(12, 143, 226, 0.6) 100%);
                            }
                            li:nth-child(2) {
                                i {
                                    color: #1BC85D;
                                }
                            }
                            li:nth-child(3) {
                                i {
                                    color: #FF6C40;
                                }
                            }
                            li:last-child {
                                margin-right: 0;
                                i {
                                    color: #FBBA18;
                                }
                            }
                        }
                    }
                }
            }
            .right-view {
                flex: 580;
                position: relative;
                .personnel-box {
                    width: 100%;
                    .personnel-content {
                        display: flex;
                        flex-wrap: wrap;
                        .personnel-top {
                            width: 100%;
                            padding: 10px 27px;
                            overflow: hidden;
                            position: relative;
                            .title {
                                margin-left: -10px;
                            }
                            .unit {
                                position: absolute;
                                right: 20px;
                                top: 10px;
                                color: #fbba18;
                            }
                            .agencytotal {
                                .totalnum {
                                    color: #00FFF8;
                                    width: 162px;
                                    height: 55px;
                                    line-height: 55px;
                                    background: rgba(2, 119, 205, 0.21);
                                    border-radius: 33px;
                                    border: 1px solid rgba(4, 169, 230, 1);
                                    text-align: center;
                                    margin-left: 289px;
                                    display: inline-block;
                                    font-size: 20px;
                                }
                                span {
                                    color: #00FFF8;
                                }
                                .el-icon-top {
                                    color: #1BC85D;
                                    margin-right: 7px;
                                }
                                b {
                                    color: #FF6C40;
                                    margin-left: 7px;
                                }
                            }
                            .agencylist {
                                margin: 0 10px;
                                text-align: center;
                                p:first-child {
                                    color: #fff;
                                    margin: 24px 0px 10px 0px;
                                }
                                p:last-child {
                                    color: #00FFF8;
                                    width: 84px;
                                    height: 36px;
                                    line-height: 36px;
                                    background: rgba(2, 119, 205, 0.21);
                                    border-radius: 28px;
                                    border: 1px solid rgba(4, 169, 230, 1);
                                }
                            }
                        }
                        p {
                            color: #2FE0BE;
                        }
                        .fraze-grid {
                            width: 100%;
                            .agency-content {
                                width: 50%;
                                height: 250px;
                            }
                            .job-content {
                                width: 50%;
                                height: 250px;
                            }
                        }

                    }
                }
                .totalfiscal-box {
                    width: 100%;
                    .totalfiscal-content {
                        height: 376px;
                        p {
                            color: #fff;
                            text-align: center;
                        }
                        .title {
                            color: #2FE0BE;
                            text-align: left;
                            margin: 13px 0 0 20px;
                        }
                        .totalfiscal-top {
                            position: relative;
                            font-size: 16px;
                            .unit {
                                position: absolute;
                                top: 0;
                                right: 20px;
                                color: #fbba18;
                            }
                            ul {
                                width: 520px;
                                margin: 6px auto 0;
                                height: 21px;
                                border-radius: 11px;
                                background: rgba(12, 173, 232, 1);
                                li {
                                    text-align: center;
                                    float: left;
                                    color: #fff;
                                    border-radius: 11px;
                                }

                                li:last-child {
                                    height: 22px;
                                    background: #FF6C40;
                                }
                            }
                            .totalfiscal-text {
                                width: 520px;
                                margin: 10px auto 0;
                                display: flex;
                                justify-content: space-between;
                                font-size: 14px;
                            }
                        }

                        .totalfiscal-bottom {
                            margin-top: 21px;
                            display: flex;
                            .totalfiscal-bottom-left {
                                ul {
                                    margin: 20px 20px 0 40px;
                                    li {
                                        position: relative;
                                        text-align: center;
                                        width: 64px;
                                        margin-bottom: 20px;
                                        i {
                                            color: #1BC85D;
                                            font-size: 26px;
                                        }
                                        span {
                                            color: #1BC85D;
                                            display: block;
                                        }
                                        .hoverdiv {
                                            position: absolute;
                                            width: 150px;
                                            height: 56px;
                                            background: rgba(3, 196, 195, 1);
                                            box-shadow: 0px 2px 4px 0px rgba(13, 61, 137, 0.5);
                                            border-radius: 4px;
                                            left: 50%;
                                            bottom: 3%;
                                            text-align: left;
                                            padding-left: 5px;
                                            z-index: 999;
                                            span {
                                                display: block;
                                                color: #fff;
                                                margin: 2px 0px;
                                            }
                                        }
                                    }
                                    li:last-child {
                                        margin-right: 0px;
                                        i {
                                            color: #0CADE8;
                                        }
                                        span {
                                            color: #0CADE8;
                                        }
                                        .hoverdiv {
                                            position: absolute;
                                            width: 150px;
                                            height: auto;
                                            background: rgba(3, 196, 195, 1);
                                            box-shadow: 0px 2px 4px 0px rgba(13, 61, 137, 0.5);
                                            border-radius: 4px;
                                            left: 50%;
                                            text-align: left;
                                            padding-left: 5px;
                                            span {
                                                display: block;
                                                color: #fff;
                                                margin: 2px 0px;
                                            }
                                        }
                                    }
                                }
                            }
                            .totalfiscal-bottom-right {
                                flex: 1;
                                max-width: 550px;
                                height: 270px;
                                color: #fff;
                            }
                        }
                    }
                }
                .righttable {
                    position: fixed;
                    right: -100px;
                    top: 0;
                    width: 1045px;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.31);
                    border: 1px solid rgb(138, 250, 233);
                    z-index: 99999;
                    .left {
                        width: 97px;
                        height: 100%;
                        float: left;
                        border-right: 1px solid rgb(138, 250, 233);
                        line-height: 100vh;
                        text-align: center;
                        color: #09F4FF;
                        font-size: 65px;
                        cursor: pointer;
                    }
                    .right {
                        float: left;
                        width: 942px;
                        height: 100%;
                        background: rgba(0, 10, 19, 0.8);
                        table {
                            width: 942px;
                            height: 100%;
                            color: #fff;
                            text-align: center;
                            tr {
                                border-bottom: 1px solid rgb(138, 250, 233);
                                th {
                                    border-bottom: 1px solid rgb(138, 250, 233);
                                    border-right: 1px solid rgb(138, 250, 233);
                                    height: 38px;
                                    text-align: center;
                                    font-size: 18px;
                                }
                                th:last-child {
                                    border-right: none;
                                }
                                td {
                                    height: 44px;
                                    border-right: 1px solid rgb(138, 250, 233);
                                    text-align: center;
                                }
                                td:first-child {
                                    text-align: left;
                                    padding-left: 20px;
                                }
                                td:last-child {
                                    border-right: none;
                                }
                            }
                            tr:first-child {
                                th:first-child {
                                    width: 340px;
                                }
                            }
                        }
                    }
                }
                .slide-fade-enter-active {
                    transition: all .3s linear;
                }
                .slide-fade-leave-active {
                    transition: all .5s linear;
                }
                .slide-fade-enter, .slide-fade-leave-to
                    /* .slide-fade-leave-active for below version 2.1.8 */
                {
                    transform: translateX(1045px);
                    opacity: 0;
                }
            }
        }
    }
</style>