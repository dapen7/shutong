<style>
    .five .upcoming {
        padding: 25px;
    }
    @media screen and (max-width: 1000px) {
        .five .upcoming{
            padding:15px;
        }
    }
    .five .upcoming .title {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
    }

    .five .upcoming .upcontent {
        overflow-y: auto;
    }

    .five .upcoming .upcomingContent {
        overflow-y: auto;
    }

    .five .upcoming .upcomingItem {
        margin-bottom: 15px;
        padding: 10px 15px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .five .upcoming .upcomingText {
        font-size: 14px;
        color: #344563;
        display: flex;
        align-items: center;
    }

    .five .upcoming .upcomingBlock {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        margin-right: 8px;
    }

    .five .upcoming .upcomingCount {
        font-size: 14px;
    }

    .five .upcoming .upcomingContent :last-child {
        margin-bottom: 0;
    }
</style>
<template>
    <div class="upcoming">
        <div class="title">
            待办事项
        </div>
        <div class="upcontent">
            <div class="upcomingItem" v-for="(item,index) in list" :key="index"
                :style="{background:hexToRgba(colorList[index%6],0.1)}">
                <div class="upcomingText">
                    <div class="upcomingBlock" :style="{background:colorList[index%6]}"></div>
                    <span>{{ item.name }}</span>
                </div>
                <div class="upcomingCount" :style="{color:colorList[index%6]}">{{ item.count }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: {
        },
        mounted: function () {
        },
        data: function () {
            return {
                list: [
                    { name: '审批类型', desc: '此处输入公告内容', date: '2019-12-06',count:28},
                    { name: '待确认', desc: '此处输入公告内容', date: '2019-12-06' ,count:24},
                    { name: '审批类型', desc: '此处输入公告内容', date: '2019-12-06' ,count:28},
                    { name: '审批类型', desc: '此处输入公告内容', date: '2019-12-06' ,count:28},
                    { name: '审批类型', desc: '此处输入公告内容', date: '2019-12-06' ,count:28},
                    { name: '审批类型', desc: '此处输入公告内容', date: '2019-12-06' ,count:28}
                ],
                colorList:[
                    '#64C8BC',
                    '#61A4E4',
                    '#FF8A8A',
                    '#FFA958',
                    '#C8B9FF',
                    '#5E6C84'
                ],
            }
        },
        methods: {
            hexToRgba:function(hex, opacity) {
                return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
            }
        }
    }
</script>