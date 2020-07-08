<style>
    .five .dictionaryDiv {
        padding: 20px;
    }
    .five .dictionaryDiv .tableDiv {
        width:100%;
    }
    .five .dictionaryDiv .table {
        border-top: 1px solid #EBEEF5;
    }
    @media screen and (max-width: 1000px) {
        .five .dictionaryDiv{
            padding:15px;
        }
        .five .dictionaryDiv .tableDiv {
            width:100%;
            padding-left:0;
        }
        .five .dictionaryDiv .el-select,.five .userinfoDiv .el-cascader{
            width: 100%;
        }
    }
</style>
<template>
    <div class="dictionaryDiv">
        <div class="tableDiv">
            <div class="mb25 breadDiv">
                <span class="mr10 isPc">当前位置 : </span>
                <el-breadcrumb separator=">" class="isPc">
                    <el-breadcrumb-item><a href="" class="activebread">系统设置</a></el-breadcrumb-item>
                    <el-breadcrumb-item>字典列表</el-breadcrumb-item>
                </el-breadcrumb>
                <el-breadcrumb separator="/" class="isMobile">
                    <el-breadcrumb-item><a href="" class="activebread">系统设置</a></el-breadcrumb-item>
                    <el-breadcrumb-item>字典列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mb25">
                <el-button type="primary" @click="doAdd">添加字典</el-button>
            </div>
            <div class="table mb25">
                <el-table :data="tableData">
                    <el-table-column prop="key" label="键值" width="150"></el-table-column>
                    <el-table-column prop="tag" label="标签" width="150">
                        <template slot-scope="scope">
                            <el-button @click="tagClick(scope.row)" type="text">{{scope.row.tag}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型" width="120">
                        <template slot-scope="scope">
                            <el-button @click="typeClick(scope.row)" type="text">{{scope.row.type}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="描述" min-width="150"></el-table-column>
                    <el-table-column prop="order" label="排序" width="150"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" @click="doEditItem(scope)">编辑</el-button>
                            <el-button type="text" @click="doDeleteItem(scope)">删除</el-button>
                            <el-button type="text" @click="addItem(scope)">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pager mb25">
                <el-pagination class="isPc" layout=" prev, pager, next, jumper,slot,total, sizes"
                    :current-page="searchForm.currentPage" @current-change="onPageChange" :page-sizes="pagesizes"
                    :page-size="pagesize" :total="total">
                    <span>&nbsp;&nbsp;</span>
                </el-pagination>
                <el-pagination class="isMobile" layout="jumper,slot,total, sizes"
                    :current-page="searchForm.currentPage" @current-change="onPageChange" :page-sizes="pagesizes"
                    :page-size="pagesize" :total="total">
                    <span>&nbsp;&nbsp;</span>
                </el-pagination>
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
            this.$nextTick(function (vm) {
                if(window.innerWidth<1000){
                    self.isMobile = true;
                }
                window.addEventListener("resize",function(){
                    if(window.innerWidth<1000){
                        self.isMobile = true;
                    }else{
                        self.isMobile = false;
                    }
                });
            });
            
        },
        computed: {
        },
        data: function () {
            return {
                isMobile:false,
                tableData: [
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题主题方案主题方案主题方案主题主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                    {key:"creulean",tag:"creulean主题",type:"theme",desc:"主题方案主题方案主题方案主题",order:"20"},
                ],
                searchForm: {
                    currentPage: 1,
                },
                pagesizes: [10, 20, 30, 40],
                pagesize: 10,
                total: 200,
            }
        },
        watch: {
            searchForm: {
                handler(newValue, oldValue) {
                    this.doSearch();
                },
                deep: true,
            },
        },
        methods: {
            //搜索
            doSearch() {
                console.log("doSearch", this.searchForm);
            },
            //翻页
            onPageChange(page) {
                this.searchForm.currentPage = page;
            },
            tagClick(item){
                console.log("点击标签");
            },
            typeClick(item){
                console.log("点击类型");
            },
            doAdd() {
                console.log("添加");
            },
            doEditItem(item) {
                console.log("编辑条目");
                console.log(item)
            },
            doDeleteItem(item) {
                console.log("删除条目");
                console.log(item)
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>