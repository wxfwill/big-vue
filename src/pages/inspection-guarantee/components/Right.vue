<template>
    <div class="home-page-right">
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
							<p>总资产<br/><span>￥{{formatNum(assetsSituation.zzc)}}</span><b></b></p>
							<ol>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ol>
							<ul>
								<li>长期投资资产<br/><span>￥{{formatNum(assetsSituation.cqtzzc)}}</span></li>
								<li @mouseover="changeMask(true)" @mouseout="changeMask(false)">固定资产<br/><span>￥{{formatNum(assetsSituation.gdzc)}}</span>
									<div class="hoverdiv" v-show='hoverdivisshow'>
										<span>房屋(平方米)数量：{{assetsSituation.fwsl}}</span>
										<span>房屋(平方米)价值：{{assetsSituation.fwjz}}</span>
										<span>汽车(台辆)数量：{{assetsSituation.qcsl}}</span>
										<span>汽车(台辆)价值：{{assetsSituation.qcjz}}</span>
										<span>单价在50万元以上的设备数量：{{assetsSituation.djwswyssbsl}}</span>
										<span>单价在50万元以上的设备价值：{{assetsSituation.djwswyssbjz}}</span>
										<span>其他固定资产价值：{{assetsSituation.qtgdzcjz}}</span>
										<span>单价100万元(含)以上的专业设备数量——年末数[本期数]：{{assetsSituation.djybwyssbsl}}</span>
										<span>单价100万元(含)以上的专业设备价值——年末数[本期数]：{{assetsSituation.djybwyssbjz}}</span>
									</div>
								</li>
								<li>流动资产<br/><span>￥{{formatNum(assetsSituation.ldzc)}}</span></li>
								<li>其他资产<br/><span>￥{{formatNum(assetsSituation.qtzc)}}</span></li>
								<li>无形资产<br/><span>￥{{formatNum(assetsSituation.wxzc)}}</span></li>
								<li>在建工程资产<br/><span>￥{{formatNum(assetsSituation.zjgczc)}}</span></li>
							</ul>
						</div>
					</div>
                </div>
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
							<!-- <div class='agencytotal'> -->
								<!-- <span class='totalnum'>{{theProcuratorialAgency.zs}}</span> -->
								<!-- <i class='el-icon-top'></i><span>{{theProcuratorialAgency.tbss}}</span><b>{{theProcuratorialAgency.tbssbfb}}</b> -->
							<!-- </div> -->
							<div class='agencylist'>
								<p>年末机构数</p>
								<p>{{theProcuratorialAgency.ynmjgs}}</p>
							</div>
							<div class='agencylist'>
								<p>省级院个数</p>
								<p>{{theProcuratorialAgency.sjy}}</p>
							</div>
							<div class='agencylist'>
								<p>地市级个数</p>
								<p>{{theProcuratorialAgency.dsy}}</p>
							</div>
							<div class='agencylist'>
								<p>县区级个数</p>
								<p>{{theProcuratorialAgency.xjy}}</p>
							</div>
							<div class='agencylist'>
								<p>派出院个数</p>
								<p>{{theProcuratorialAgency.pcy}}</p>
							</div>
							<div class='agencylist'>
								<p>铁检院个数</p>
								<p>{{theProcuratorialAgency.tjy}}</p>
							</div>
							<div class='agencylist'>
								<p>林区院个数</p>
								<p>{{theProcuratorialAgency.lqy}}</p>
							</div>
							<div class='agencylist'>
								<p>油田院个数</p>
								<p>{{theProcuratorialAgency.yty}}</p>
							</div>
							<div class='agencylist'>
								<p>矿区院个数</p>
								<p>{{theProcuratorialAgency.kqy}}</p>
							</div>
							<div class='agencylist'>
								<p>事业单位个数</p>
								<p>{{theProcuratorialAgency.sydw}}</p>
							</div>
						</div>
						<div class="personnel-bottom-left">
							<p class='title'>机构情况</p>
							<div class="agency-content" ref="agencyChart" style='top:-30px;'></div>
						</div>
						<div class="personnel-bottom-right">
							<p class='title'>单位在职人数</p>
							<div class="job-content" ref="jobChart" style='top:-30px!important'></div>
						</div>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <div class="procuratorial-work">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察业务装备</i>
                    </div>
					<p class='unit'>单位:万元</p>
                    <div class='service-content' ref="serviceChart"></div>
					<div class="putinto">
						<p>三年投入</p>
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
                <div class="totalfiscal-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>计财机构及人员情况</i>
                    </div>
                    <div class="totalfiscal-content">
						<div class="totalfiscal-top">
							<p class='title'>机构情况</p>
							<p>计财部门设置情况</p>
							<p>{{financialInstitutions.jcbmszqk}}</p>
							<ul>
								<!-- <li :style="{width:`${financialInstitutions.yszjcbm}%`}">{{financialInstitutions.yszjcbm}}</li>
								<li :style="{width:`${financialInstitutions.wszjcbm}%`}">{{financialInstitutions.wszjcbm}}</li> -->
								<li :style="{width:`(${financialInstitutions.yszjcbm}/(${financialInstitutions.wszjcbm}+${financialInstitutions.yszjcbm}))%`}">{{financialInstitutions.yszjcbm}}</li>
								<li :style="{width:`(${financialInstitutions.wszjcbm}/(${financialInstitutions.wszjcbm}+${financialInstitutions.yszjcbm}))%`}">{{financialInstitutions.wszjcbm}}</li>
							</ul>
							<ol>
								<li>已设置计财部门的单位</li>
								<li>未设置计财部门的单位</li>
							</ol>
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
							<div class="totalfiscal-bottom-right">
								<div class='one'>
									<p>{{financialInstitutions.kjhsxs}}</p>	
									<p>会计核算形式</p>	
								</div>
								<div class='two'>
									<p>{{financialInstitutions.kjdlhs}}</p>	
									<p>会计独立核算</p>	
								</div>
								
								<div class='four'>
									<div>
											<p>{{financialInstitutions.kjwpz}}</p>	
											<p>会计委派制</p>	
									</div>
									<div>
											<p>{{financialInstitutions.qzkjjzhs}}</p>	
											<p>其中会计集中核算</p>	
									</div>
								</div>
								<div class='three'>
									<p>{{financialInstitutions.qtxs}}</p>	
									<p>其他形式</p>	
								</div>
							</div>
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
						<div class="left" @click="hidefn('righttableIsshow3')">》</div>
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
	import ECharts                               from 'echarts';
	import { mapGetters }                        from 'vuex';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import 'echarts-liquidfill/src/liquidFill.js';
	import * as services                         from '../service';
	import {propertyConfig,agencyConfig}                 from '../constant/index';


	export default {
		data() {
			return {
				swiperTitle     : '',
				civilBoxImg     : require('@/public/img/home/civilBox.png'),
				empiricaIcon    : require('@/public/img/home/empirica-icon.png'),
				propertyConfig:propertyConfig,
				agencyConfig:agencyConfig,
				righttableIsshow:false,
				righttableIsshow2:false,
				righttableIsshow3:false,
				hoverdivisshow:false,
				hoverdivisshow1:false,
				hoverdivisshow2:false,
				activeIndex:0
			};
		},
		props:{
			assetsSituation:{
				default:{}
			},
			theProcuratorialAgency:{
				default:{}
			},
			prosecutionPersonnel:{
				default:{}
			},
			numberOfEmployees:{
				default:{}
			},
			financialInstitutions:{
				default:{}
			},
			inspectionServiceEquipment:{
				default:{}
			},
			inspectionServiceEquipmentDetails:{
				default:{}
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
			const params                       = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState               = params;
			this.jobChart   = ECharts.init(this.$refs.jobChart);
			this.serviceChart= ECharts.init(this.$refs.serviceChart);
			this.serviceChart.on('pieselectchanged', (params)=>{
				console.log(params.name);
				if(params.name=="技术装备"){
					this.righttableIsshow=true
				}else if(params.name=="综合保障装备"){
					this.righttableIsshow2=true
				}else if(params.name=='司法警察装备'){
					this.righttableIsshow3=true
				}
				
			});
			this.agencyChart=ECharts.init(this.$refs.agencyChart);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadjobChart(data) {
				var datas = [{
					value: data.zyjsry,
					name: '专业技术人员'
				}, {
					value: data.gqry,
					name: '工勤人员'
				}, {
					value: data.gbxzzw,
					name: '干部行政职务'
				}];
				var scale = 1;
				var rich = {
					yellow: {
						color: "#ffc72b",
						fontSize: 14 * scale,
						padding: [5, 4],
						align: 'center'
					},
					total: {
						color: "#ffc72b",
						fontSize: 14 * scale,
						align: 'center',
					},
					white: {
						color: "#fff",
						align: 'center',
						fontSize: 14 * scale,
						padding: [10, 0]
					},
					blue: {
						color: '#49dff0',
						fontSize: 14 * scale,
						align: 'center'
					},
					hr: {
						borderColor: '#0b5263',
						width: '100%',
						borderWidth: 1,
						height: 0,
					}
				};

				this.jobChart.setOption( {
						title: {
							left: 'center',
							padding: [0, 0],
							textStyle: {
								color: '#fff',
								fontSize: 14 * scale,
								align: 'center'
							}
						},
						grid:{
							bottom:'15%'
						},
						legend: {
							selectedMode: false,
							formatter: function(name) {
								var total = 0; 
								var averagePercent; 
								datas.forEach(function(value, index, array) {
									total += value.value;
								});
								return total;
							},
							data: [datas[0].name],
							left: 'center',
							top: 'center',
							icon: 'none',
							align: 'center',
							padding: [10, 0],
							textStyle: {
								color: "#ffc72b",
								fontSize: 12 * scale
							},
						},
						series: [{
							type: 'pie',
							radius: ['32%', '40%'],
							hoverAnimation: true,
							color: ['#FBBA18', '#0CADE8', '#1BC85D'],
							label: {
								normal: {
									textStyle: {
										fontSize: 12 * scale,
									},
									formatter: function(params, ticket, callback) {
										var total = 0; 
										var percent = 0; 
										datas.forEach(function(value, index, array) {
											total += value.value;
										});
										percent = ((params.value / total) * 100).toFixed(1);
										return '{white|' + params.name + '}{yellow|' + params.value + '}{blue|' + percent + '%}';
									},
									rich: rich
								},
							},
							labelLine: {
								normal: {
									length: 12 * scale,
									length2: 12,
									length3:30,
									lineStyle: {
										color: '#fff'
									}
								}
							},
							data: datas
						}]
					})
			},
			loadserviceChart(data){
				this.serviceChart.setOption({
					color: ['#FBBA18', '#0CADE8', '#1BC85D'],
					tooltip: {
							trigger: 'item',
							formatter:function(params){
										return ''+params.name+'\n金额:'+params.value+'\n数量'+params.data.num+'\n占比'+params.percent+''
									},
							itemStyle:{
								fontSize:'14'
							},
							extraCssText:'background:#03C4C3'
						},
					legend: {
						show:false,
						orient: 'horizontal',
						icon: 'circle',
						bottom:10,
						x: 'center',
						textStyle: {
							color: '#fff'
						},
						data: ['司法警察装备', '综合保障装备', '技术装备']
					},
					series: [{
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '50%'],
							center: ['50%', '60%'],
							label: {
								normal: {
									show: true,
									position: 'inner',
									textStyle: {
										color: '#fff',
										fontWeight: 'normal',
										fontSize: 10
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: data.sfjczb_je,
									name: '司法警察装备',
									num:data.sfjczb_sl
								},
								{
									value: data.jcywzhbzzb_je,
									name: '综合保障装备',
									num: data.jcywzhbzzb_sl
								},
								{
									value:  data.jcywjszb_je,
									name: '技术装备',
									num: data.jcywjszb_sl
								}
							]
						},
						{
							type: 'pie',
							radius: ['53%', '55%'],
							center: ['50%', '60%'],
							label: {
								normal: {
									formatter:function(params){
										return ''+params.name+'\n金额:'+params.value+'\n数量'+params.data.num+'\n占比'+params.percent+''
									}
								}
							},
							labelLine: {
								normal: {
									show: true,
									length: 20,
									length2: 20,
									lineStyle: {
										type: 'dashed',
										width: 2
									}
								}
							},
							data:[{
									value: data.sfjczb_je,
									name: '司法警察装备',
									num:data.sfjczb_sl
								},
								{
									value: data.jcywzhbzzb_je,
									name: '综合保障装备',
									num: data.jcywzhbzzb_sl
								},
								{
									value:  data.jcywjszb_je,
									name: '技术装备',
									num: data.jcywjszb_sl
								}
							]
						}
					]	
				})
			},
			loadagencyChart(data){
				let str='着检察服人数：'+data.zjcfrs+'人'+ '<br/>' +'着法服人数：'+data.zfjfrs+'人';
				let str1='政法专项编制：'+data.zfzxbz+'人'+ '<br/>' +'事业编制：'+data.sybz+'人'+ '<br/>' +'工勤编制：'+data.gqbz+'人'+ '<br/>' +'其他编制：'+data.qtbz+'人';
				let str2='政府购买服务聘用人员：'+data.zfgmfwpyry+'人'+ '<br/>' +'其他聘用人员：'+data.qtpyry+'人'+ '<br/>' +'临时工：'+data.lsg+'人';
				this.agencyChart.setOption({
					tooltip: {
						trigger: 'item',
						// formatter: "{b}:{c}",
						formatter:function(data){
							if(data.name=='着装人员'){
								return str 
							}
							if(data.name=='人员编制数'){
								return str1
							}
							if(data.name=='其他人员'){
								return str2
							}
						},
						itemStyle:{
							fontSize:'14'
						},
						extraCssText:'background:#03C4C3'
					},
					color:['#009FE8'],
					series: [
						{
							type:'pie',
							radius: ['35%', '45%'],
							center:['50%','70%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: true,
									formatter:'{b}\n{c}人',
									rich:{
										b:{
											align:'left',
											color:'yellow'
										}
									}
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '14',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							itemStyle:{
								borderWidth:5, //设置border的宽度有多大
								borderColor:'#020309',
							},
							data:[
								{value:data.rybzs, name:'人员编制数'},
								{value:data.zzry, name:'着装人员'},
								{value:data.qtry, name:'其他人员'}
							]
						}
					]
				})
			},
			righttableIsshowfn(num){
				this.activeIndex=num
			},
			hidefn(val){
				this[val]=false
			},
			formatNum(money){
				if(money && money!=null){
					money = String(money);
					var left=money.split('.')[0],right=money.split('.')[1];
					right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '';
					var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
					return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
				}else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
					return '0.00';
				}else{
					return "";
				}
			},
			changeMask(value){
				this.hoverdivisshow=value
			},
			changeMask1(value){
				this.hoverdivisshow1=value
			},
			changeMask2(value){
				this.hoverdivisshow2=value
			}
		},
		components: {
			
		},
	}
</script>

<style lang="scss" scoped>
    .home-page-right {
        height: 900px;
        width: 1256px;
        .content-box {
            display: flex;
            .left-view {
                .property-box {
                    width: 739px;
					position:relative;
					.unit{
						position:absolute;
						right:10px;
						top:45px;
						color:#FBBA18;
					}
					.propertyBox{			
						height:301px;
						.propertyContent{
							color:#fff;
							text-align:center;
							p{
								width:198px;
								height:66px;
								border-radius:2px;
								border:1px solid rgba(0,216,233,1);
								padding-top:8px;
								margin-top:39px;
								margin-left:270px;
								position:relative;
								b{
									width:1px;
									height:31px;
									background:#979797;
									position:absolute;
									bottom:-31px;
									left:97px;
								}
							}
							ol{
								width:636px;
								height:29px;
								border:1px solid #979797;
								border-bottom:none;
								margin-top:31px;
								margin-left:51px;
								overflow:hidden;
								li{
									width:131px;
									height:29px;
									float:left;
									border-right:1px solid #979797;
								}
								li:last-child{
									border-right:none;
								}
							}
							span{
								color:#FBBA18;
							}
							ul{
								li{
									float:left;
									width:95px;
									height:59px;
									border-radius:2px;
									border:1px solid rgba(0,216,233,1);
									margin-right:30px;
									margin-top:13px;
									padding-top:8px;
									font-size: 12px;
								}
								li:nth-child(2){
									position: relative;
									.hoverdiv{
										position:absolute;
										width:400px;
										height:200px;
										background:rgba(3,196,195,0.9);
										box-shadow:0px 2px 4px 0px rgba(13,61,137,0.5);
										border-radius:4px;
										left:50%;
										text-align:left;
										padding-left:5px;
										line-height:20px;
										span{
											display:block;
											color:#fff;
											margin:2px 0px;
										}
									}
								}
								li:last-child{
									margin-right:0px;
								}
							}
						}
					}
                }
				.personnel-box{
					width:739px;
					height:543px;
					.personnel-content{
						display: flex;
						flex-wrap: wrap;
						height:543px;
						.personnel-top{
							width:739px;
							height:307px;
							padding:10px 27px;
							overflow:hidden;
							position:relative;
							.unit{
								position:absolute;
								right:10px;
								top:10px;
							}
							.agencytotal{
								.totalnum{
									color:#00FFF8;
									width:162px;
									height:55px;
									line-height:55px;
									background:rgba(2,119,205,0.21);
									border-radius:33px;
									border:1px solid rgba(4,169,230,1);
									text-align:center;
									margin-left:289px;
									display:inline-block;
									font-size:20px;
								}
								span{
									color:#00FFF8;
								}
								.el-icon-top{
									color:#1BC85D;
									margin-right:7px;
								}
								b{
									color:#FF6C40;
									margin-left:7px;
								}
							}
							.agencylist{
								float:left;
								margin-right:37px;
								text-align:center;
								p:first-child{
									color:#fff;
									margin:24px 0px 10px 0px;
								}
								p:last-child{
									color:#04A9E6;
									width:100px;
									height:36px;
									line-height:36px;
									background:rgba(2,119,205,0.21);
									border-radius:28px;
									border:1px solid rgba(4,169,230,1);
								}
							}
						}
						p{
							color:#2FE0BE;
						}
						.personnel-bottom-left{
							width:296px;
							height:200px;
							padding:10px 27px;
							.agency-content{
								width:267px;
								height:200px;
							}
						}
						.personnel-bottom-right{
							width:443px;
							height:247px;
							padding:10px 27px;
							.job-content{
								width:443px;
								height:200px;
								div{
									width:443px;
									height:200px;
									canvas{
										top:-30px!important;
									}
								}
								
							}
						}
					}
				}
                .lawsuitBox {
                    width: 739px;
                    .lawsuit-label {
                        display: flex;
                        align-items: center;
                        i {
                            margin: 0 0 0 10px;
                            font-size: 24px;
                            color: rgba(255, 255, 255, 1);
                            line-height: 29px;
                        }
                        .lawsuit {
                            width: 13px;
                            height: 13px;
                            border-radius: 50%;
                            background: rgba(0, 178, 226, 1);
                        }
                    }
                    .law-chart {
                        width: 650px;
                        height: 170px;
                        margin: 20px auto 10px;
                    }
                }
                .bottomPortion {
                    margin-top: 10px;
                    display: flex;
                    .dom-line-chart {
                        margin-top: 20px;
                        li {
                            display: flex;
                            align-items: center;
                            margin: 12px 0 0 10px;
                            font-size: 16px;
                            font-family: MicrosoftYaHei;
                            color: rgba(43, 191, 226, 1);
                            line-height: 21px;
                            i {
                                display: inline-block;
                                text-align: center;
                                flex: 0 37;
                                min-width: 37px;
                                width: 37px;
                                font-size: 18px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            span {
                                margin: 0 15px;
                                height: 15px;
                                display: inline-block;
                                background: rgba(43, 191, 226, 1)
                            }
                        }
                    }
                    .perCapita {
                        display: inline-block;
                        width: 354px;
                        p {
                            display: flex;
                            align-items: center;
                            margin: 12px 0 0 10px;
                            color: rgba(43, 191, 226, 1);
                            i {
                                display: inline-block;
                                text-align: center;
                                flex: 0 37;
                                min-width: 37px;
                                width: 37px;
                                font-size: 18px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            span {
                                margin: 0 15px;
                                height: 10px;
                                border-radius: 20px;
                                display: inline-block;

                                background: linear-gradient(
                                                to right,
                                                #0C7FD8,
                                                #25CBE9
                                );
                            }
                        }
                    }
                    .fileCapita {
                        display: inline-block;
                        margin-left: 20px;
                        width: 354px;
                    }
                }
            }
            .right-view {
				width:464px;
				position:relative;
                .procuratorial-work {
                    position: relative;
                    margin-left: 22px;
                    width: 464px;
                    height: 522px;
					.unit{
						position:absolute;
						right:10px;
						top:45px;
						color:#FBBA18;
					}
					.service-content{
						width:464px;
						height:205px;
						background:none!important;
					}
					.putinto{
							width: 464px;
							height:264px;
							p{
								color:#fff;
								text-align:center;
								margin:10px 0px 10px 0px;
								font-size:16px;
							}
							ul{
								width:464px;
								height:215px;
								li{
									width:108px;
									height:215px;
									float:left;
									border:1px solid rgba(11,184,250,1);
									margin-right:10px;
									text-align:center;
									p{
									margin-bottom:8px;
									}
									i{
										margin-top:9px;
										font-size:22px;
									}
									span{
										color:#0BB8FA;
										display:block;
									}
									b{
										display:block;
										color:#FF6C40;
									}
								}
								
								li:first-child{
									i{
										color:#0BAEFF;
									}
								}
								.active{
									background:linear-gradient(180deg,rgba(23,213,191,0.6) 0%,rgba(12,143,226,0.6) 100%);
								}
								li:nth-child(2){
									i{
										color:#1BC85D;
									}
								}
								li:nth-child(3){
									i{
										color:#FF6C40;
									}
								}
								li:last-child{
									margin-right:0px;
									i{
										color:#FBBA18;
									}
								}
							}
						}
                }
                .totalfiscal-box{
					width: 464px;
					height:420px;
					.totalfiscal-content{
						height:376px;
						p{
							color:#fff;
							text-align:center;
						}
						.title{
							color:#2FE0BE;
							text-align:left;
							margin:13px 0px 0px 30px;
						}
						.totalfiscal-top{
							ul{
								width:397px;
								height:21px;
								background:rgba(12,173,232,1);
								border-radius:11px;
								margin-left:26px;
								margin-top:6px;
								li{
									text-align:center;
									float:left;
									color:#fff;
								}
								li:first-child{
									width:80%;
								}
								li:last-child{
									width:20%;
									background:#FF6C40;
									border-radius:11px;
								}
							}
							ol{
								width:397px;
								height:21px;
								margin-top:13px;
								color:#fff;
								li{
									float:left;
									text-align:center;
									width:50%;
								}
							}
						}
						
						.totalfiscal-bottom{
							margin-top:21px;
							.totalfiscal-bottom-left{
								float:left;
								ul{
									width:158px;
									height:95px;
									margin-top:40px;
									li{
										text-align:center;
										width:64px;
										margin-right:29px;
										float:left;
										position:relative;
										i{
											color:#1BC85D;
											font-size:26px;
										}
										span{
											color:#1BC85D;
											display:block;
										}
										.hoverdiv{
											position:absolute;
											width:150px;
											height:56px;
											background:rgba(3,196,195,1);
											box-shadow:0px 2px 4px 0px rgba(13,61,137,0.5);
											border-radius:4px;
											left:50%;
											bottom:3%;
											text-align:left;
											padding-left:5px;
											z-index:999;
												span{
													display:block;
													color:#fff;
													margin:2px 0px;
												}
										}
									}
									li:last-child{
										margin-right:0px;
										i{
											color:#0CADE8;
										}
										span{
											color:#0CADE8;
										}
										.hoverdiv{
											position:absolute;
											width:150px;
											height:auto;
											background:rgba(3,196,195,1);
											box-shadow:0px 2px 4px 0px rgba(13,61,137,0.5);
											border-radius:4px;
											left:50%;
											text-align:left;
											padding-left:5px;
												span{
													display:block;
													color:#fff;
													margin:2px 0px;
												}
										}
									}
								}
							}
							.totalfiscal-bottom-right{
								float:left;
								width:257px;
								color:#fff;
								margin-left:36px;
								div.one{
									height:57px;
									text-align:center;
									p:first-child{
										margin-left:66px;
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
									}
								}
								.two{
									float:left;
									margin-top:6px;
									p:first-child{
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
										margin-bottom:10px;
									}
								}
								.three{
									float:left;
									margin-top:11px;
									p:first-child{
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
										margin-bottom:10px;
									}
								}
								.four{
									float:right;
									width:134px;
									height:133px;
									border-radius:4px;
									border:1px solid rgba(4,169,230,1);
									margin-top:3px;
									div:first-child{
										width:134px;
										height:64px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
									}
									div{
										p:first-child{
											margin-top:11px;
										}
									}
								}
							}
						}
					}
				}
				.righttable{
					width:1045px;
					height: 1080px;
					position:absolute;
					right:-100px;
					top:-110px;
					background:rgba(0,0,0,0.31);
					border:1px solid rgb(138, 250, 233);
					z-index:9999999999;
					.left{
						width:97px;
						height:1080px;
						float:left;
						border-right:1px solid rgb(138, 250, 233);
						line-height:1080px;
						text-align:center;
						color:#09F4FF;
						font-size:65px;
					}
					.right{
						float:left;
						width:942px;
						height:1080px;
						background:rgba(0,10,19,0.8);
						table{
							width:942px;
							height:1080px;
							color:#fff;
							text-align:center;
							tr{
								border-bottom:1px solid rgb(138, 250, 233);
								th{
									border-bottom:1px solid rgb(138, 250, 233);
									border-right:1px solid rgb(138, 250, 233);
									height: 38px;
									text-align:center;
									font-size:18px;
								}
								th:last-child{
									border-right:none;
								}
								td{
									height:44px;
									border-right:1px solid rgb(138, 250, 233);
									text-align:center;
								}
								td:first-child{
									text-align:left;
									padding-left:20px;
								}
								td:last-child{
									border-right:none;
								}
							}
							tr:first-child{
								th:first-child{
									width:340px;
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
						/* .slide-fade-leave-active for below version 2.1.8 */ {
						transform: translateX(1045px);
						opacity: 0;
						}
			}
        }
    }
</style>