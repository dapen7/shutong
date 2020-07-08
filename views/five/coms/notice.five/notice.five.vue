<style>
    .five .noticeDiv{
        padding:0;
        height: 100%;
        overflow-y: auto;
    }
    .five .noticeDiv .el-tabs__nav{
        height: 60px;
        display: flex;
        align-items: center;
    }
    .five .noticeDiv .el-tabs__header{
        margin-bottom:0;
    }
    .five .noticeDiv .tableDiv{
        overflow-y: auto;
    }
    .five .noticeDiv .el-table--striped .el-table__body tr.el-table__row--striped td{
        background-color:#FAFBFF;
    }
</style>
<template>
    <div class="noticeDiv">
        <el-tabs v-model="active" :stretch="true">
            <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.title" :name="item.title" >
                <div class="tableDiv">
                    <el-table :data="item.tableData" stripe style="width: 100%" :show-header="false">
                        <el-table-column prop="name" label="" width="120" :align="'center'">
                            <template style="color:#333333;font-weight:500;" slot-scope="scope">
                                <span style="color:#333333;font-weight:500;">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="desc" label="">
                            <template slot-scope="scope">
                                <span style="color:#999999;">{{scope.row.desc}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="" width="120">
                            <template style="color:#999999;" slot-scope="scope">
                                <span style="color:#999999;">{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                active:"招聘公告",
                tabs:[
                    {
                        title:"招聘公告",
                        tableData:[
                            {
                                name:"UI设计",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            }
                        ]
                    },
                    {
                        title:"近期通知",
                        tableData:[
                            {
                                name:"UI设计",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                date:"2019-12-06"
                            }
                        ]
                    },
                    {
                        title:"要点新闻",
                        tableData:[
                            {
                                name:"UI设计",
                                desc:"此处输入公告内容",
                                time:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                time:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                time:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                time:"2019-12-06"
                            },
                            {
                                name:"岗位名称",
                                desc:"此处输入公告内容",
                                time:"2019-12-06"
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            init(){
            }
        }
    }
</script>