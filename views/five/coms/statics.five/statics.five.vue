<style>
    .five .staticsDiv{
        padding:25px;
    }
    .five .staticsDiv .title{
        position: absolute;
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
    }
    .five .staticsDiv .title .desc{
        color: #999;
        font-size:var(--font-size-primary);
    }
    .five .staticsDiv .chartDiv{
        width: 100%;
        height: 100%;
    }
    #staticChartFive{
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 1000px) {
        .five .staticsDiv{
            padding:15px;
        }
    }
</style>
<template>
    <div class="staticsDiv">
        <div class="title">
            <span>数据概览：<span class="desc">近一周新增用户量</span></span>
        </div>
        <div class="chartDiv">
            <div id="staticChartFive"></div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: {
            active: {
                type: String,
                default: "1"
            }
        },
        mounted: function () {
            var self = this;
            this.$nextTick(function () {
                self.init();
            });
            window.addEventListener("resize", function(){
                self.chart.resize();
            });
        },
        data: function () {
            return {
                chart:"",
                title:['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                data:[38, 30, 42, 18, 38, 52, 30]
            }
        },
        methods: {
            init(){
                this.chart = echarts.init(document.getElementById('staticChartFive'));
                var option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.title,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#D4D4D4'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#D4D4D4'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color:'#EBEDF8'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '新增用户量',
                            type: 'bar',
                            color:'#5488FF',
                            barWidth: '23px',
                            data: this.data
                        }
                    ]
                };

                this.chart.setOption(option);
            }
        }
    }
</script>