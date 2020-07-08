<style>
    .five .qualityDiv {
        padding: 20px 30px;
        display: flex;
    }
    .five .qualityDiv .formDiv {
        width:100%;
        max-width: 660px;
    }

    .five .qualityDiv .tableDiv {
        flex-grow: 1;
    }

    .five .qualityDiv .el-button--primary.is-plain {
        background: white;
        color:var(--color-primary);
    }

    .five .qualityDiv .el-button--primary.is-plain:hover {
        background:var(--color-primary);
        color:white;
    }

    .five .qualityDiv .custom-tree-node {
        display: flex;
        align-items: center;
    }

    .five .qualityDiv .shu {
        border: 0;
        border-right: 1px solid #DDDFE6;
        display: inline-block;
        height: 26px;
    }

    .five .qualityDiv .heng {
        color: #DDDFE6;
        font-size: 14px;
        margin-right: 3px;
        margin-left: 3px;
    }

    .five .qualityDiv .jia {
        border: 1px solid #BBBBBB;
        display: block;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #BBBBBB;
    }

    .five .qualityDiv .el-icon-caret-right {
        display: none;
    }

    .five .qualityDiv .el-table th{
        background:rgba(245,245,245,0.5);
    }

    .five .qualityDiv .process{
        width:32%;
    }
    @media screen and (max-width: 1000px) {
        .five .qualityDiv {
            padding:15px;
        }
        .five .qualityDiv .process{
            width:100%;
            margin-bottom:12px;
        }
        .five .qualityDiv .ml0{
            margin-left:0;
        }
    }
</style>
<template>
    <div class="qualityDiv">
        <div class="tableDiv">
            <div class="mb30 breadDiv">
                <span class="mr10 isPc">当前位置 : </span>
                <el-breadcrumb separator=">" class="isPc">
                    <el-breadcrumb-item><a href="" class="activebread">机构用户</a></el-breadcrumb-item>
                    <el-breadcrumb-item>质卡填报</el-breadcrumb-item>
                </el-breadcrumb>
                <el-breadcrumb separator="/" class="isMobile">
                    <el-breadcrumb-item><a href="" class="activebread">机构用户</a></el-breadcrumb-item>
                    <el-breadcrumb-item>质卡填报</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mb10">
                <el-form :model="qualityForm" class="formDiv" :rules="rules" ref="qualityForm" label-position="top">
                    <el-form-item label="">
                        <template slot-scope="scope">
                            <span class="mr25">报工状态</span>
                            <el-button type="text" v-if="qualityForm.status1=='0'">未报工</el-button>
                            <el-button type="text" v-if="qualityForm.status1=='1'">已报工</el-button>
                            <span class="mr25" style="margin-left:30px;">检验状态</span>
                            <el-button type="text" v-if="qualityForm.status2=='0'">互检中</el-button>
                            <el-button type="text" v-if="qualityForm.status2=='1'">已完成</el-button>
                            <el-button type="primary"  @click="finish('qualityForm')" class="ml0">互检完成</el-button>
                            <el-button type="primary"  @click="submitForm('qualityForm')">快速报工</el-button>
                        </template>
                    </el-form-item>
                    <el-form-item label="技术要求" >
                        <div style="display: flex;justify-content: space-between;flex-wrap: wrap;">
                            <el-select v-model="qualityForm.process1" class="process" placeholder="请选择">
                                <el-option v-for="item in processList1" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="qualityForm.process2" class="process" placeholder="请选择">
                                <el-option v-for="item in processList2" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="qualityForm.process3" class="process" placeholder="请选择">
                                <el-option v-for="item in processList3" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="检查结果" prop="resultList">
                        <el-table border :data="qualityForm.resultList" style="width: 100%" >
                            <el-table-column header-align="center" prop="tag" label="参数名称">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.name" disabled></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column header-align="center" prop="type" label="参数值" >
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.value"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="执行状态" prop="status3">
                        <el-input v-model="qualityForm.status3" placeholder="" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="mb30">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 8}" placeholder="请输入备注内容"
                            v-model="qualityForm.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
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
            var validateResult = (rule, value, callback) => {
                var result = true;
                value.forEach(item=>{
                    if(item.value == ""){
                        result = false;
                    }
                });
                if (result) {
                    callback();
                }else {
                    callback(new Error('请填写参数值!'));
                }
            };

            return {
                isMobile:false,
                processList1:[
                    {value:"1",label:"工序1"},
                    {value:"2",label:"工序2"}
                ],
                processList2:[
                    {value:"1",label:"工序1"},
                    {value:"2",label:"工序2"}
                ],
                processList3:[
                    {value:"1",label:"工序1"},
                    {value:"2",label:"工序2"}
                ],
                qualityForm: {
                    status1:"0",//报工状态
                    status2:"0",//检验状态
                    process1:"1",//技术要求1
                    process2:"",//技术要求2
                    process3:"",//技术要求3
                    resultList:[
                        {name:"test07",value:"123"},
                        {name:"test08",value:"456"}
                    ],//检查结果列表
                    status3:"填报完成",//执行状态
                    remark:"",//备注
                },
                rules: {
                    resultList: [
                        { required: true,validator:validateResult, trigger: 'blur' },
                    ],
                }
            }
        },
        watch: {
            qualityForm: {
                handler(newValue, oldValue) {
                },
                deep: true,
            },
        },
        methods: {
            finish(){
                this.qualityForm.status2 = "1";
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.qualityForm);
                    } else {
                        console.log('error');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>