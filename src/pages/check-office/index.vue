<template>
    <div class="check-office-wrap outer-home-page">
        <date-picker
                :dateChange="requestCheckOfficeData"
        ></date-picker>
        <left-side
                :publishingStatistics="publishingStatistics"
                :postPriorities="postPriorities"
                :receivingStatistics="receivingStatistics"
                :jeremyLevinUnitList="jeremyLevinUnitList"
                :submitApprovalStatistics="submitApprovalStatistics"
                :submitApprovalPriorities="submitApprovalPriorities"
        ></left-side>
        <center-box
                :securityClassificationSw="securityClassificationSw"
                :securityClassificationFw="securityClassificationFw"
                :securityClassificationCpj="securityClassificationCpj"
        ></center-box>
        <right-side
                :theArchiveAnalysisList="theArchiveAnalysisList"
                :infoPublishList="infoPublishList"
        ></right-side>
    </div>
</template>

<script>
	import LeftSide                                                 from '@/components/check-office/Left';
	import CenterBox                                                from '@/components/check-office/Center';
	import RightSide                                                from '@/components/check-office/Right';
	import { getProcuratorialOfficeData }                           from '@/utlis/request';
	import { postDistributeConfig, submitApprovalPrioritiesConfig } from './chart-config';
	import DatePicker                                               from '@/components/common/date-picker';

	export default {
		data() {
			return {
				publishingStatistics    : {},
				postPriorities          : [],
				receivingStatistics     : {},
				jeremyLevinUnitList     : [],
				submitApprovalStatistics: {},
				submitApprovalPriorities: [],

				securityClassificationSw : {},
				securityClassificationFw : {},
				securityClassificationCpj: {},

				theArchiveAnalysisList: [],
				infoPublishList       : []
			}
		},
		methods   : {
			requestCheckOfficeData({startDate, endDate}) {
				getProcuratorialOfficeData({
					startdate: startDate,
					enddate  : endDate
				}).then((resolve) => {
					if(resolve.code === 200) {
						// const data = resolve.data;
						const data={
    "publishingStatistics": {
      "xj": 1037,
      "db": 364,
      "bj": 666,
      "qt": 33
    },
    "receivingStatistics": {
      "xj": 377,
      "db": 282,
      "bj": 1344,
      "qt": 1
    },
    "submitApprovalStatistics": {
      "xj": 5796,
      "db": 4766,
      "bj": 6010,
      "qt": 1680
    },
    "postPriorities": {
      "tj": 178,
      "jj": 234,
      "qt": 937,
      "w": 751
    },
    "jeremyLevinUnitList": [
      {
        "lwdw": "办公厅",
		"sl": 178,
		"zb":'3%'
      },
      {
        "lwdw": "政治部",
		"sl": 87,
		"zb":'23%'
      },
      {
        "lwdw": "机关党委",
		"sl": 65,
		"zb":'5%'
      },
      {
        "lwdw": "机关工会",
		"sl": 16,
		"zb":'39%'
      },
      {
        "lwdw": "主题教育领导小组办公室",
		"sl": 9,
		"zb":'43%'
      },
      {
        "lwdw": "信息中心",
		"sl": 9,
		"zb":'33%'
      },
      {
        "lwdw": "新闻办",
        "sl": 9
      },
      {
        "lwdw": "计划财务装备局",
		"sl": 8,
		"zb":'38%'
      },
      {
        "lwdw": "计财局",
		"sl": 8,
		"zb":'89%'
      },
      {
        "lwdw": "一厅",
		"sl": 7,
		"zb":'35%'
      },
      {
        "lwdw": "法律政策研究室",
		"sl": 7,
		"zb":'3%'
      },
      {
        "lwdw": "内蒙古区院案管办",
		"sl": 5,
		"zb":'3%'
      },
      {
        "lwdw": "服务中心",
		"sl": 4,
		"zb":'3%'
      },
      {
        "lwdw": "研究室",
		"sl": 4,
		"zb":'3%'
      },
      {
        "lwdw": "第一检察厅",
		"sl": 4,
		"zb":'3%'
      },
      {
        "lwdw": "军事检察院民事检察厅",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "四川省院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "学院",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "安徽省院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "山东省院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "山西省院案管中心",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "广东省院技术处",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "广西区院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "新疆区院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "机关服务中心",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "河南省院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "湖北省院案管办",
		"sl": 3,
		"zb":'3%'
      },
      {
        "lwdw": "111",
		"sl": 2,
		"zb":'3%'
      },
      {
        "lwdw": "三厅",
		"sl": 2,
		"zb":'3%'
      }
    ],
    "submitApprovalPriorities": {
      "tj": 816,
      "jj": 1070,
      "qt": 13317,
      "w": 3049
    },
    "securityClassificationFw": {
      "mm": 202,
      "jm": 177,
      "w": 528,
      "nb": 259,
      "qt": 934
    },
    "securityClassificationSw": {
      "mm": 79,
      "jm": 51,
      "w": 159,
      "nb": 97,
      "qt": 1618
    },
    "securityClassificationCpj": {
      "mm": 298,
      "jm": 563,
      "w": 2238,
      "nb": 1671,
      "qt": 13482
    },
    "theArchiveAnalysisList": [
      {
        "gdjs": 1071,
        "sj": "2019-01"
      },
      {
        "gdjs": 847,
        "sj": "2019-02"
      },
      {
        "gdjs": 1052,
        "sj": "2019-03"
      },
      {
        "gdjs": 1088,
        "sj": "2019-04"
      },
      {
        "gdjs": 900,
        "sj": "2019-05"
      },
      {
        "gdjs": 942,
        "sj": "2019-06"
      },
      {
        "gdjs": 448,
        "sj": "2019-07"
      }
    ]
  }
						// left
						this.publishingStatistics = data.publishingStatistics;
						this.postPriorities       = postDistributeConfig.map(i => ({
							...i,
							value: data.postPriorities[i.id],
						}));

						this.receivingStatistics = data.receivingStatistics;
						this.jeremyLevinUnitList = data.jeremyLevinUnitList;

						this.submitApprovalStatistics = data.submitApprovalStatistics;
						this.submitApprovalPriorities = submitApprovalPrioritiesConfig.map(i => ({
							...i,
							value: data.submitApprovalPriorities[i.id]
						}));

						// center
						this.securityClassificationSw  = data.securityClassificationSw;
						this.securityClassificationFw  = data.securityClassificationFw;
						this.securityClassificationCpj = data.securityClassificationCpj;

						// right
						this.theArchiveAnalysisList = data.theArchiveAnalysisList;
						this.infoPublishList=data.jeremyLevinUnitList
					} else {
						this.$message.error(`code:${resolve.code}`);
					}
				});
			}
		},
		components: {
			LeftSide,
			CenterBox,
			RightSide,
			DatePicker,
		}
	}
</script>

<style lang="scss">
    .check-office-wrap {
        padding-top: 40px;
        position: relative;
        .cursor-img {
            width: 240px;
            height: 26px;
            margin: -10px auto 0 auto;
            img {
                width: 100%;
            }
        }
    }
</style>