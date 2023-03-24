<template>
    <el-row>
        <!-- 首页左侧 -->
        <el-col :span="8" style="padding-right: 10px">
            <!-- 首页左侧，上面部分 -->
            <el-card class="box-card" style="background:pink">
                <div class="user">
                    <img src="https://ts3.cn.mm.bing.net/th?id=OIP-C.V7xuh8Em6iJQ3sHi_TTVqgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="">
                    <div class="userinfo">
                        <p class="name">Kk-</p>
                        <p class="access">超级管理员</p>
                    </div> 
                </div>
                <div class="login-info">
                    <p>上次登陆时间: <span>2023-3-1</span></p>
                    <p>上次登陆地点: <span>北京</span></p>
                </div>
            </el-card>
            <!-- 首页左侧，下面部分 -->
            <el-card style="margin-top:20px;height=460px;background:pink">
                <el-table :data="tableData" style="width: 100%;">
                <!-- <el-table-column prop="name" label="机型">
                </el-table-column>
                <el-table-column prop="todayBuy" label="今日购买" >
                </el-table-column>
                <el-table-column prop="monthBuy" label="本月购买" >
                </el-table-column>
                <el-table-column prop="totalBuy" label="总购买" >
                </el-table-column> -->
                <!-- 简便方式 -->
                <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val"  />
            </el-table>
            </el-card>
        </el-col>
        <!-- 首页右侧 -->
        <el-col :span="16" style="padding-left: 10px">
            <!-- 首页右侧，上面部分 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0,background:'pink'}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}" ></i>
                    <div class="detail">
                        <p class="price">￥{{item.value}}</p>
                        <p class="desc">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- 折线图 -->
            <el-card style="height:280px">
                <div ref="echarts1" style="height:280px"></div>
            </el-card>
                <!-- 另外两个图 -->
            <div class="graph">
                <!-- 柱状图 -->
                <el-card style="height:260px">
                    <div ref="echarts2" style="height:260px"></div>
                </el-card>
                <!-- 饼状图 -->
                <el-card style="height:260px">
                    <div ref="echarts3" style="height:240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import  { getData } from '../api'
import * as echarts from 'echarts'
    export default {
        data() {
            return {
                tableData:[
                    // {
                    //     name:'oPpo',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                    // {
                    //     name:'vivo',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                    // {
                    //     name:'苹果',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                    // {
                    //     name:'华为',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                    // {
                    //     name:'一加',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                    // {
                    //     name:'小米',
                    //     todayBuy:100,
                    //     monthBuy:300,
                    //     totalBuy:800
                    // },
                ],
                tableLabel:{
                    name:'机型',
                    todayBuy:'今日购买',
                    monthBuy:'本月购买',
                    totalBuy:'总购买'
                },
                countData:[
                    {
                        name:"今日支付订单",
                        value:9999,
                        icon:"success",
                        color:"#2ec7c9"
                    },
                    {
                        name:"今日收藏订单",
                        value:9999,
                        icon:"star-on",
                        color:"#ffb980"
                    },
                    {
                        name:"今日未支付订单",
                        value:9999,
                        icon:"s-goods",
                        color:"#5ab1ef"
                    },
                    {
                        name:"本月支付订单",
                        value:99999,
                        icon:"success",
                        color:"#2ec7c9"
                    },
                    {
                        name:"本月收藏订单",
                        value:99999,
                        icon:"star-on",
                        color:"#ffb980"
                    },
                    {
                        name:"本月未支付订单",
                        value:99999,
                        icon:"s-goods",
                        color:"#5ab1ef"
                    },
                ],
                userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
              ],
            }
        },
        mounted() {

            getData().then(({data})=>{
                const { tableData } = data.data
                // console.log(tableData)
                this.tableData = tableData

                    //折线图
                    //基于准备好的dom,初始化echarts实例
                    const echarts1= echarts.init(this.$refs.echarts1)
                    // 指定图表的配置项和数据
                    var echarts1Option = { }
                    //处理数据xAxis
                    const {orderData,userData,videoData}=data.data
                    const xAxis = Object.keys(orderData.data[0])
                    const xAxisData = {
                        data:xAxis
                    }
                    console.log(userData);
                    echarts1Option.xAxis = xAxisData
                    echarts1Option.yAxis ={}
                    echarts1Option.legend= xAxisData
                    echarts1Option.series=[]
                    xAxis.forEach(key =>{
                        echarts1Option.series.push({
                            name:key,
                            data:orderData.data.map(item =>item[key]),
                            type:'line'
                        })
                    })
                //    console.log(  echarts1Option)
                //使用刚指定的配置项和数据显示图标
                echarts1.setOption( echarts1Option);

                //柱状图
            //基于准备好的dom,初始化echarts实例
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                     grid: {
                        left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name:'新增用户',
                        data:userData.map(item => item.new),
                        type:'bar'
                    },
                    {
                        name:'活跃用户',
                        data:userData.map(item => item.active),
                        type:'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data:videoData,
                        type:'pie'
                    }
                ],
             }
             echarts3.setOption(echarts3Option)
        })
    }
}

</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: green;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666;
            margin-left: 60px;
        }
    }
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        color:#fff;
    }
    .detail{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            color: #999;
            font-size: 14px;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card{
        width: 48%;

    }
}
</style>
