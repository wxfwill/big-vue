 <template>
  <div class="map-page">
      <div class="bg_img initial" :style="{backgroundImage:'url('+initialImg+')'}" @click="initialHandle"></div>
      <div class="bg_img superior" :style="{backgroundImage:'url('+superiorImg+')'}" @click="backHandle"></div>
      <div class="bg_img popupIcon" :style="{backgroundImage:'url('+popupImg+')'}" @click="popupHandle"></div>
      <div class="year-data" :class="user!=='home'? 'civil':null">
              <p>当年数据</p>
              <ul>
                 <span>受理数：</span><div class="array"><li v-for="(item,index) in slList" :key="index">{{item}}</li></div> 
              </ul>
              <ol>
                  <span>办结数：</span><div class="array"><li v-for="(item,index) in bjList" :key="index">{{item}}</li></div> 
              </ol>
              <ul> 
                  <span>在办数：</span><div class="array"><li v-for="(item,index) in zbList" :key="index">{{item}}</li> </div>    
              </ul>
       </div>
    <!-- <div id="mapBox" :style="{width: user==='home'? '800px':'1010px', height: user==='home'? '550px':'860px'}"></div> -->
    <div id="mapBox" :style="{width: '100%', height: '100%'}"></div>
    <div class="area-box">
              <p class="bg_img rotation" :style="{backgroundImage:'url('+shengdataImg+')'}"></p>
              <span class="title">青海省</span>
              <ul>
                  <li>
                     <span> 受理数：</span> <i>2154 12%</i> 
                  </li>
                  <li>
                      <span>受理数：</span><i>2154 12%</i> 
                  </li>
                  <li>
                      <span>受理数：</span><i>2154 12%</i> 
                  </li>
                  <li>
                      <span>受理数：</span><i>2154 12%</i> 
                  </li>
                  <li>
                     <span> 原来检察官：</span><i>21547111111124e48万人</i> 
                  </li>
                  <li>
                     <span> 受理数：</span><i>2154 12%</i> 
                  </li>

              </ul>
          </div>
  </div>
</template>

<script>
import Echarts from 'echarts';
import 'echarts/map/js/china';
import * as types from '../../vuex/types.js'
import { mapGetters } from 'vuex'
export default {
    name:'china',
    props:{
        user: {
            type: String,
            default: function() {
                return "home"
            }
        }
    },
    data() {
        return {
            slList:[3,2,4,4,9,8],
            bjList:[2,3,4,5,6,7],
            zbList:[1,2,3,4,5,6,7],
            show:false,
            shengdataImg:require('@/public/img/home/shengdata.png'),
            initialImg:require('@/public/img/home/initial.png'),
            superiorImg:require('@/public/img/home/superior.png'),
            popupImg:require('@/public/img/home/popup.png'),
            levelNum:0,
            current: 0,
            show: false,
            myChart:null,
            geoJsonData:null,
            beforeName:null,//之前的名称
            beforeCode:null,//之前编号
            cityName:null,//此时的地区名称
            cityCode:null,//地区编号
            curlevel:'province',//字符串省市区
            clickTimer:null,
            mapData:null,//此时的地图数据
            district:null,
            map:null
        }
    },
    computed:{
        ...mapGetters(['popupShow'])
    },
    mounted(){//-----------1  
        this.myChart = Echarts.init(document.getElementById("mapBox"));
        let current = 0;
        this.myChart.on('mapselectchanged', params =>{//鼠标点击时触发mapselectchanged：地图区域切换/点击选中状态的事件。下钻事件
        console.log('点击',params)//参数为当前选中的区域信息
                this.echartsMapClick(params);
                this.show=true//弹窗显示
        });

        
        // this.map = new AMap.Map('container', {//根据高德生成地图
        //     resizeEnable: true,
        //     center: [116.30946, 39.937629],
        //     zoom: 3
        // });
        let opts = {
            subdistrict: 1,   //返回下一级行政区
            showbiz: false  //最后一级返回街道信息，不显示商圈
        };
        this.district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用 构造函数，实例化一个行政区查询实例
        //https://lbs.amap.com/api/javascript-api/reference/search/
        this.district.search('中国', (status, result) => {//根据关键字查询行政区或商圈信息  
                            //当status为complete时，result为DistrictSearchResult；
                            //当status为error时，result为错误信息info；
                            //当status为no_data时，代表检索返回0结果
                            console.log(result,'中国查询出的结果')
            if (status == 'complete') {
                this.getData(result.districtList[0], 'province', 100000);//-.全国各省信息数组， ，中国编号
            }
        });
    },
    methods:{
        popupHandle(){//弹窗事件
        this.$store.commit(types.POPUPSHOW,true)
        },
        initialHandle(){
            this.district.search('中国', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], 'province', 100000);
                }
            })
        },
        backHandle(){
            if(this.curlevel==='city'){
                this.district.search('中国', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], 'province', 100000);
                }
            });
            }else if(this.curlevel==='district'){
                this.cityName=this.beforeName//返回上级时重新给之前的江西省否则会为赣州市信息
                this.cityCode=this.beforeCode
                this.district.search(this.beforeCode, (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], 'city', this.beforeCode);
                    console.log('返回保存的',this.beforeCode,this.beforeName)
                }
            });
            }
        },
        echartsMapClick(option){ //地图点击事件，参数为当前选中的区域信息//
        this.myChart.showLoading({
                    text: '正在加载中...',
                    color: 'blue',
                    // textColor: 'red',
                    textStyle : {
                        fontSize : '50%',
                        color:'black' 
                    },
                    maskColor: 'rgba(255, 255, 255, 0.8)',
                    zlevel: 1,
        })
        let params = {data: {level: '',cityCode: '',name: '' } };
        switch (option.batch[0].name) {
            case '台湾省':
                return false
            case '澳门特别行政区':
                return false
                case '香港特别行政区':
               return false
                case '南海诸岛':
                return false
            default:
                break;
        }
        this.mapData.map(item=>{//为什么此时mapData有数据,mounted的时候搜索了全国地图数据所以有
            if(item.name == option['batch'][0]['name']){
                params.data = item;
            }
        })
        if (!params.data || params.data.level == "district"){//点击该区域无geojson或到了区
            this.cityName=null
            this.district.search('中国', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], 'province', 100000);
                }
            });
            return false;
        };
        
        this.cityName = params.data.name;
        this.cityCode = params.data.cityCode;
        // this.district.setLevel(params.data.level); //行政区级别
        // this.district.setExtensions('all');
        //行政区查询
        //按照adcode进行查询可以保证数据返回的唯一性
        this.district.search(params.data.cityCode, (status, result) => {
            if (status === 'complete') {
                this.getData(result.districtList[0], params.data.level, params.data.cityCode);
                console.log(result,'search')
            }
        });
    },
    loadMap(mapName, data) {//街道时----3 //传入该城市名字和根据实例搜索到的数据数组 //data是ui实例搜索的，this.mapData是search的
    console.log(data,'ui实例')
        if (Object.keys(data).length !== 0 && data) {//返回可枚举属性组成的数组
            Echarts.registerMap(mapName, data);
            //registerMap(mapName,geoJson,specialAreas)
            //mapName：地图名称，这里的名称要与地图配置中 option--series--mapType 的值保持一致。
            //geoJson：geoJson 格式的数据，具体格式见 http://geojson.org/。
             //specialAreas：可选参数，细节配置
             this.myChart.hideLoading()
            let option = this.GetMapOption(mapName, this.mapData, this.curlevel)//配置项
            this.myChart.setOption(option);//生成地图
            this.show=false
            //指定高亮数据的index，动作
            // this.myChart.dispatchAction({//触发图表行为，例如图例开关
            //     type: 'downplay',
            //     seriesIndex: 0,
            // });
            this.myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 2// % (this.mapData.length)//高亮数据的名称 number
            });
        }
    },
    loadMapData(areaCode) {//传入的地区编号，初始时是传入的中国的
        AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer=>{
            let districtExplorer = new DistrictExplorer({
                eventSupport: true,//打开事件支持
                map: this.map//关联的地图实例
            });//利用 AMapUI.loadUI 可以构造一个创建一个 DistrictExplorer 实例，
            //然后利用 DistrictExplorer 的实例，可以根据当前需要加载城市的 adcode 获取到该城市的 geo 数据
            districtExplorer.loadAreaNode( areaCode, (error, areaNode) => {
                if (error) {//adcode是城市（国家省市区）的编号
                    return false;
                }
                let mapJson = { features: {} };//areaNode对象执行这个方法返回的geoJSON中的features
                mapJson.features = areaNode.getSubFeatures();
                console.log(areaNode.getSubFeatures(),'AMapUI')
                if(this.cityName===null){this.cityName='china'}
                console.log(mapJson.features,'ui插件返回的geoJSON中的features',this.cityName)
                this.loadMap(this.cityName, mapJson);
                this.geoJsonData = mapJson;
            });  
		})
    },
    getData(data, level, adcode) { //中国的数据，省市区，区编号----------2
    console.log(data,'search搜索')
        let subList = data.districtList || [];//省市区数组数据
            let curlevel = subList[0].level;
            this.curlevel = curlevel;//初始化时将省赋值
            if(this.curlevel==='city'){//保存上级信息
                this.beforeName=this.cityName//江西时保存此时名称和编号
                this.beforeCode=this.cityCode
                console.log(this.beforeCode,this.curlevel,this.beforeName,'getData保存')
            }
            //市区
            if (curlevel === 'street') {//街道
                let mapJsonList = this.geoJsonData.features || [];//返回地理json数据的特点数组
                let mapJson= {};
                mapJsonList.map(item => {
                    if (item.properties.name == this.cityName) {
                        mapJson.features = Array.prototype.concat([], item);//拼接数组，两个参数拼到第一个去
                    }
                })
                let mapData= [];
                Array.prototype.push(mapData, {
                    name: this.cityName,
                    value: 1,
                    level: curlevel
                });
                this.mapData = mapData;
                this.loadMap(this.cityName, mapJson);
                this.geoJsonData = mapJson;
                return;
            }

            let mapData = [];
            subList.map(item => {//遍历初始化中国的省市区数组数据
                let option = {//新增value1/2，并给mapData数组
                    name: item.name,
                    value: 1,
                    cityCode: item.adcode,
                    level: curlevel
                };
                mapData.push(option)
            });
            mapData[0].value = 2;//将第一个value变为2
            this.mapData = mapData;//将此时的地图数据保存以后续echarts出图
            this.loadMapData(adcode);//传入编号
    },
    /**
 * 
 * @param mapName 区域名字
 * @param data 区域json数据
 * @param curlevel 当前区域层级(province，city，district),需要根据层级改变zoom进行适配
 */
 GetMapOption(mapName, data, curlevel){
     let MapBorder = '#27CDD3';
        let Select1 = '#0664BE';
        let Select2 = '#63E8D7';
        let SelectPoint = '#00FFFF';
        let MapBg3 = 'rgba(51,209,248,0.5)';
    return {
        legend: {
            show: false
        },
        visualMap: {
            type: 'continuous',
            show: false,
            pieces: [{
                    min: 0,
                    label: '安全',
                    color: MapBg3
                }
            ],
            color: '#fff',
            textStyle: {
                color: '#fff',
            },
            visibility: 'off',
            selectedMode: 'single',
            inRange: {
                color: [MapBg3]
            },
        },
        series: [{
            name: '数据名称',
            type: 'map',
            roam: false,
            // zoom:  curlevel == 'province'?0.9:0.7,
            zoom:  curlevel == 'province'?1.0:0.7,
            bottom: curlevel == 'province'?0:15,
            left:'center',
            top: curlevel == 'province'?20:20,
            mapType: mapName,
            selectedMode: 'single',
            showLegendSymbol: false,
            visibility: 'off',
            itemStyle: {
                normal: {
                    label: {
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 12,
                        position: 'inside',
                        show: true
                    },
                    areaColor: MapBg3,
                    borderColor: MapBorder,
                    borderWidth: 1,
                },
                emphasis: {
                    label: {
                        color: '#fff',
                        fontSize: 18,
                        position: 'inside'
                    },
                    areaColor: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: Select1
                    }, {
                        offset: 1,
                        color: Select2
                    }])
                }
            },
            data: data,
        }]
    };
}
    }
}
</script>
<style lang='scss' scoped>
.map-page{
    height:100%;
    width:100%;
    // padding-left:135px;
    position: relative;
    .year-data{
            position: absolute;
            left:14px;
            top:90px;
            font-size:18px;
            color:rgba(11,193,244,1);
            line-height:22px;
            margin-bottom:20px;
            // width:100px;
            // height:200px;
            p{
                margin-bottom:20px;
            }
            ul,ol{
                display: flex;
                margin-bottom:20px;
                span{
                    width:74px;
                }
                .array{
                    display: flex;
                    flex-wrap: wrap;
                    width:138px;
                    li{
                        width:19px;
                        height:28px;
                        text-align: center;
                        line-height:28px;
                        border-radius:4px;
                        background: -webkit-linear-gradient(#0BE5F1, #0C99F7); /* Safari 5.1 - 6.0 */
                        background: -o-linear-gradient(#0BE5F1, #0C99F7); /* Opera 11.1 - 12.0 */
                        background: -moz-linear-gradient(#0BE5F1, #0C99F7); /* Firefox 3.6 - 15 */
                        background: linear-gradient(#0BE5F1, #0C99F7); /* 标准的语法（必须放在最后） */
                        font-size:27px;
                        color:rgba(255,255,255,1);
                        margin-left:4px;
                        margin-bottom:5px;
                    }
                }
            }
        }
        .civil{
            top:551px;
        }
    .area-box{
            position:absolute;
            width:200px;
            right:70px;
            top:220px; 
            padding:20px 20px;
            background: rgba(0,178,226, 0.2);
            @-webkit-keyframes rotation {
                from {
                -webkit-transform: rotate(0deg);
                }
                to {
                -webkit-transform: rotate(360deg);
                }
                }
                .rotation {
                -webkit-transform: rotate(360deg);
                animation: rotation 3s linear infinite;
                -moz-animation: rotation 3s linear infinite;
                -webkit-animation: rotation 3s linear infinite;
                -o-animation: rotation 3s linear infinite;
                }
                .title{
                    position: absolute;
                    left:72px;
                    top:49px;
                    font-size:14px;
                    color:rgba(255,255,255,1);
                }
            p{
                width:55px;
                height:55px;
                border-radius:50%;
                text-align: center;
                line-height:55px;
                margin:10px 0 15px 45px;
            }
            ul{
                li{
                    font-size:12px;
                    color:rgba(255,255,255,1);
                    line-height:14px;
                    margin-top:7px;
                    span{
                        display: inline-block;
                        width:60px;
                    }
                    i{
                        display: inline-block;
                        width:65px;
                    }
                }
            }
        }
        .initial{
            position: absolute;
            right:140px;
            top:43px;
            width:30px;
            height:30px;
            z-index:11;
        }
        .superior{
            position: absolute;
            right:85px;
            top:43px;
            width:30px;
            height:30px;
            z-index:11;
        }
        .popupIcon{
            position: absolute;
            left:14px;
            top:43px;
            width:30px;
            height:30px;
            z-index:11;
        }
}
</style>
