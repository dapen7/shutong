<style>
    .five .taskDiv {
        padding: 25px;
        display: flex;
        flex-direction: column;
        font-size:var(--font-size-primary);
    }
    @media screen and (max-width: 1000px) {
        .five .taskDiv{
            grid-gap:15px;
        }
    }
    .five .taskDiv .title{
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
    }
    .five .taskDiv .chartDiv{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .five .taskDiv .taskItem {
        margin-bottom: 35px;
    }

    .five .taskDiv .infoBox {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .five .taskDiv .name {
        color: #A9B2C2;
        font-size:12px;
    }
    .five .taskDiv  .des{
        color:#A9B2C2;
        font-size:12px;
    }
    .five .taskDiv  .des i{
        font-size:12px;
    }

    .five .taskDiv  .value {
        color: #3D3A59;
        font-size: 20px;
    }

    #taskChart0 {
        width: 220px;
        height: 220px;
    }

    #taskChart1 {
        width: 220px;
        height: 220px;
    }
</style>
<template>
    <div class="taskDiv">
        <div class="topInfo">
            <span class="title">任务统计</span>
        </div>
        <div class="chartDiv">
            <div class="taskCountMain" v-for="(item,index) in datalist" :key="index">
                <div>
                    <div :id="'taskChart'+index"></div>
                </div>
                <div class="infoBox">
                    <div class="value">{{ item.value }}%</div>
                    <div class="name">{{ item.name }}</div>
                    <span class="des">
                        <i v-if="item.type==='up'" :style="{color:item.color}" class="iconfont iconarrow-up"></i>
                        <i v-if="item.type==='down'" :style="{color:item.color}" class="iconfont iconarrow-down"></i>
                        <span>{{ item.contrast }}%</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: {
        },
        mounted: function () {
            var self = this;
            this.$nextTick(function () {
                self.init();
            })
            window.addEventListener("resize", function(){
                self.chart1.resize();
                self.chart2.resize();
            });
        },
        data: function () {
            return {
                datalist: [
                    { name: '任务名称', value: 87, contrast: 1.2, type: 'up', color: '#5488FF' },
                    { name: '任务名称', value: 68, contrast: 9.3, type: 'up', color: '#FF91BD' }
                ],
                chart1:"",
                chart2:"",
            }
        },
        methods: {
            init() {
                this.chart1 = echarts.init(document.getElementById('taskChart0'));
                this.chart1.setOption(this.getChartOption(this.datalist[0]));

                this.chart2 = echarts.init(document.getElementById('taskChart1'));
                this.chart2.setOption(this.getChartOption(this.datalist[1]));
            },
            getChartOption(item){
                var name = item.name;
                var value = item.value;
                var color = item.color;
                return {
                    angleAxis: {
                        max: 100,
                        startAngle: 90,
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        },
                        minorSplitLine: {
                            show: false
                        },
                        minorTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                    },
                    radiusAxis: {
                        type: 'category',
                        z: 0,
                        data:[0,1,2,3],
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            length: 0,
                        },
                        axisLabel: {
                            show: false
                        },
                        minorSplitLine: {
                            show: false
                        },
                        minorTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                    },
                    polar: {
                    },
                    series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: [null,null,null,100],
                        coordinateSystem: 'polar',
                        animation: false,
                        barWidth: '8px',
                    },{
                        type: 'bar',
                        data: [null,null,null,value],
                        coordinateSystem: 'polar',
                        color: color,
                        barWidth: '8px',
                    },{
                        type: 'scatter',
                        color:'white',
                        itemStyle:{
                            borderWidth:4,
                            borderColor:color,
                            opacity:1,
                        },
                        coordinateSystem: 'polar',
                        symbolSize:16,
                        animation: false,
                        data: [null,null,null,value],
                        
                    }],
                    legend: {
                        show: true,
                        data: ['aaa', 'bbb']
                    }
                };
            }
        }
    }
</script>