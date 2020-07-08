<style>
    .five .infoDiv {
        display: grid;
        /* grid-template-columns: repeat(4, 1fr); */
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        grid-auto-flow: row dense;
        grid-gap:25px;
    }
    @media screen and (max-width: 1000px) {
        .five .infoDiv{
            grid-gap:15px;
        }
    }
    .five .oneInfo {
        height: 178px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.02);
        border-radius: 6px;
        padding: 20px;
        justify-content: space-around;
        box-sizing: border-box;
        /* width: 100%; */
    }
    .five .oneInfo:last-child{
        margin-right:0;
    }
    .five .infoItem:last-child {
        margin-right: 0;
    }

    .five .infoImg {
        width: 32px;
        height: 32px;
        margin-bottom: 10px;
    }

    .five .infoText {
        font-size: 38px;
        font-family: Helvetica;
        color: rgba(52, 69, 99, 1);
        margin-bottom: 10px;
    }

    .five .infoNumber {
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 108, 132, 1);
        margin-bottom: 16px;
    }

    .five .infoUp {
        font-size:var(--font-size-primary);
        display: flex;
        align-items: center;
        color:rgba(100, 200, 188, 1);
    }
    .five .infoDown{
        color:rgba(255, 138, 138, 1);
    }
    .five .infoUp i {
        margin-right: 9px;
    }
</style>
<template>
    <div class="infoDiv">
        <div class="oneInfo" v-for="(item,index) in infoList" :key="index" @click="onclick(item)">
            <img class="infoImg" alt="" :src="item.logo">
            <div class="infoText">{{item.text}}</div>
            <div class="infoNumber">{{item.desc}}</div>
            <div class="infoUp" v-if="item.type == 'up'">
                <i class="iconfont iconup_icon1"></i>
                <span>{{item.number}}</span>
            </div>
            <div class="infoUp infoDown" v-if="item.type == 'down'">
                <i class="iconfont icondown_icon1"></i>
                <span>{{item.number}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: {
        },
        data: function () {
            return {
                infoList: [
                    {
                        logo: "../../images/five/home_visitor_icon@2x.png",
                        text: "4,648",
                        desc: "今日访问量",
                        number: "26.84%",
                        type: "up"
                    },
                    {
                        logo: "../../images/five/home_visitor2_icon@2x.png",
                        text: "2,648",
                        desc: "昨日访问量",
                        number: "26.32%",
                        type: "up"
                    },
                    {
                        logo: "../../images/five/home_people_icon@2x.png",
                        text: "768",
                        desc: "在线人数",
                        number: "0.86%",
                        type: "down"
                    },
                    {
                        logo: "../../images/five/home_cpu_icon@2x.png",
                        text: "82.6",
                        desc: "CPU使用率",
                        number: "8.64%",
                        type: "up"
                    },
                ]
            }
        },
        methods: {
            onclick(item){
                console.log("info点击",item);
            }
        }
    }
</script>