<style>
    .five .beartaskDiv {
        width: 100%;
        padding: 10px;
        padding-bottom: 40px;
    }

    .el-tab-pane {
        z-index: 0;
    }

    .five .beartaskDiv .el-button--primary.is-plain {
        background: white;
        color: var(--color-primary);
    }

    .five .beartaskDiv .el-button--primary.is-plain:hover {
        background: var(--color-primary);
        color: white;
    }

    .five .beartaskDiv .formDiv {
        width: 100%;
        height: 100%;
    }

    .five .beartaskDiv .formTableDiv {
        padding: 15px 20px;
        border-radius: 0px 0px 8px 8px;
        border: 1px solid #EBEEF5;
        border-top: 0;
    }

    .five .beartaskDiv .el-table--border {
        border-radius: 8px 8px 0 0;
    }

    .five .beartaskDiv .fixSearch .el-icon-arrow-down,
    .five .beartaskDiv .fixSearch .el-icon-arrow-up {
        transition: none;
        transform: rotateZ(0);
    }

    .five .beartaskDiv .fixSearch .el-icon-arrow-down:before,
    .five .beartaskDiv .fixSearch .el-icon-arrow-up:before {
        content: "\e778";
    }

    .five .beartaskDiv .el-table .cell {
        text-overflow: unset;
    }

    .five .beartaskDiv .el-table th.is-leaf {
        background: rgba(245, 245, 245, 0.5);
    }

    @media screen and (max-width: 1000px) {
        .five .beartaskDiv .el-card__header {
            padding: 0;
        }

        .five .beartaskDiv .el-form-item__label {
            width: 100%;
        }

        .five .beartaskDiv .bearGrid {
            display: grid;
            grid-template-columns: 90px 1fr;
            grid-auto-flow: row dense;
            grid-gap: 12px;
        }

        .five .beartaskDiv {
            padding: 15px;
        }

        .five .beartaskDiv .tableDiv {
            height: 100%;
        }
    }
</style>
<template>
    <div class="beartaskDiv">
        <el-form :model="beartaskForm" class="formDiv" :rules="rules" ref="beartaskForm" label-position="top">
            <el-form-item label="项目牵头部门承担任务" prop="mainTask">
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 10}" placeholder="请输项目牵头部门承担任务"
                    v-model="beartaskForm.mainTask">
                </el-input>
            </el-form-item>
            <el-form-item label="各部门承担任务项目牵头部门">
                <div slot="label" style="display: flex;align-items: center;justify-content: space-between;">
                    各部门承担任务项目牵头部门
                    <el-button v-if="isMobile" style="float:right;" type="text"
                        @click="addItem(beartaskForm.tableData1)">添加</el-button>
                </div>
                <template v-if="isMobile">
                    <el-card class="box-card" style="margin-bottom:10px;"
                        v-for="(item,index) in beartaskForm.tableData1" :key="index">
                        <div slot="header" class="clearfix"
                            style="padding:0 15px;background-color:rgba(245,245,245,1);display: flex;align-items: center;justify-content: space-between;">
                            <span style="color:var(--color-text-primary);font-weight: 500;">序号{{index+1}}
                                <span>{{item.dept}}</span></span>
                            <i class="el-icon-delete" style="float:right;color:var(--color-primary)"
                                @click="deleteItem(beartaskForm.tableData1,index)"></i>
                        </div>
                        <div class="bearGrid">
                            <span>姓名</span>
                            <el-input v-model="item.name"></el-input>
                            <span>职责</span>
                            <el-input v-model="item.duty"></el-input>
                            <span>职称及学历</span>
                            <el-select v-model="item.education" placeholder="">
                                <el-option v-for="item in educationList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <span>类别</span>
                            <el-select v-model="item.type" placeholder="">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <span>工作量(人/年)</span>
                            <el-input v-model="item.workCount"></el-input>
                        </div>
                    </el-card>
                </template>
                <template v-if="!isMobile">
                    <el-table border :data="beartaskForm.tableData1" style="width: 100%">
                        <el-table-column label="序号">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="项目责任部门" width="160" prop="dept"></el-table-column>
                        <el-table-column label="姓名" width="150" prop="name">
                            <template slot-scope="scope">
                                <el-input style="width:130px;" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="职责" width="150" prop="duty">
                            <template slot-scope="scope">
                                <el-input style="width:130px;" v-model="scope.row.duty"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="职称及学历" width="200" prop="education">
                            <template slot-scope="scope">
                                <el-select style="width:180px;" v-model="scope.row.education" placeholder="">
                                    <el-option v-for="item in educationList" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="类别" width="200" prop="type">
                            <template slot-scope="scope">
                                <el-select style="width:180px;" v-model="scope.row.type" placeholder="">
                                    <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="工作量(人/年)" width="170" prop="workCount">
                            <template slot-scope="scope">
                                <el-input style="width:150px;" v-model="scope.row.workCount"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" prop="workCount">
                            <template slot-scope="scope">
                                <el-button type="text" @click="deleteItem(beartaskForm.tableData1,scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="formTableDiv">
                        <el-button type="primary" size="mini" @click="addItem(beartaskForm.tableData1)">添加
                        </el-button>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="各部门承担任务项目参与部门">
                <div slot="label" style="display: flex;align-items: center;justify-content: space-between;">
                    各部门承担任务项目参与部门
                    <el-button v-if="isMobile" style="float:right;" type="text"
                        @click="addItem(beartaskForm.tableData2)">添加</el-button>
                </div>
                <template v-if="isMobile">
                    <el-card class="box-card" style="margin-bottom:10px;"
                        v-for="(item,index) in beartaskForm.tableData2" :key="index">
                        <div slot="header" class="clearfix"
                            style="padding:0 15px;background-color:rgba(245,245,245,1);display: flex;align-items: center;justify-content: space-between;">
                            <span style="color:var(--color-text-primary)">序号{{index+1}}
                                <span>{{item.dept}}</span></span>
                            <i class="el-icon-delete" style="float:right;color:var(--color-primary)"
                                @click="deleteItem(beartaskForm.tableData2,index)"></i>
                        </div>
                        <div class="bearGrid">
                            <span>姓名</span>
                            <el-select class="fixSearch" filterable v-model="item.name"
                                placeholder="">
                                <el-option v-for="item in userList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <span>职责</span>
                            <el-select class="fixSearch" filterable v-model="item.duty"
                                placeholder="">
                                <el-option v-for="item in dutyList" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <span>职称及学历</span>
                            <el-select v-model="item.education" placeholder="">
                                <el-option v-for="item in educationList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <span>类别</span>
                            <el-select v-model="item.type" placeholder="">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <span>工作量(人/年)</span>
                            <el-input v-model="item.workCount"></el-input>
                        </div>
                    </el-card>
                </template>
                <template v-if="!isMobile">
                    <el-table border :data="beartaskForm.tableData2" style="width: 100%">
                        <el-table-column label="序号">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="项目责任部门" width="160" prop="dept"></el-table-column>
                        <el-table-column label="姓名" width="150" prop="name">
                            <template slot-scope="scope">
                                <el-select style="width:130px;" class="fixSearch" filterable v-model="scope.row.name"
                                    placeholder="">
                                    <el-option v-for="item in userList" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="职责" width="150" prop="duty">
                            <template slot-scope="scope">
                                <el-input style="width:130px;" v-model="scope.row.duty"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="职称及学历" width="200" prop="education">
                            <template slot-scope="scope">
                                <el-select style="width:180px;" v-model="scope.row.education" placeholder="">
                                    <el-option v-for="item in educationList" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="类别" width="200" prop="type">
                            <template slot-scope="scope">
                                <el-select style="width:180px;" v-model="scope.row.type" placeholder="">
                                    <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="工作量(人/年)" width="170" prop="workCount">
                            <template slot-scope="scope">
                                <el-input style="width:150px;" v-model="scope.row.workCount"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" prop="workCount">
                            <template slot-scope="scope">
                                <el-button type="text" @click="deleteItem(beartaskForm.tableData2,scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="formTableDiv">
                        <el-button type="primary" size="mini" @click="addItem(beartaskForm.tableData2)">添加
                        </el-button>
                    </div>
                </template>
            </el-form-item>

            <el-form-item>
                <div class="submitDiv">
                    <el-button type="primary" @click="submitForm('beartaskForm')">提交</el-button>
                    <el-button type="primary" @click="saveForm('beartaskForm')">保存</el-button>
                    <el-button type="primary" plain @click="connect('beartaskForm')">关联附表</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    module.exports = {
        props: {
        },
        mounted: function () {
            var self = this;
            this.$nextTick(function (vm) {
                if (window.innerWidth < 1000) {
                    self.isMobile = true;
                }
                window.addEventListener("resize", function () {
                    if (window.innerWidth < 1000) {
                        self.isMobile = true;
                    } else {
                        self.isMobile = false;
                    }
                });
            });

        },
        computed: {
        },
        data: function () {
            return {
                isMobile: false,
                typeList: [
                    { value: "1", label: "分类1" },
                    { value: "2", label: "分类2" },
                ],
                educationList: [
                    { value: "1", label: "小学" },
                    { value: "2", label: "中学" },
                    { value: "3", label: "大学" },
                ],
                userList: [
                    { value: "1", label: "jobs" },
                    { value: "2", label: "able" },
                    { value: "3", label: "张三" },
                    { value: "4", label: "李四" },
                ],
                dutyList: [
                    { value: "1", label: "指责1" },
                    { value: "2", label: "指责2" },
                    { value: "3", label: "指责3" },
                    { value: "4", label: "指责4" },
                ],
                beartaskForm: {
                    mainTask: "",
                    tableData1: [{
                        dept: "经营计划处",
                        name: "",
                        duty: "",
                        education: "",
                        type: "",
                        workCount: "",
                    },
                    {
                        dept: "经营计划处",
                        name: "",
                        duty: "",
                        education: "",
                        type: "",
                        workCount: "",
                    }
                    ],
                    tableData2: [{
                        dept: "经营计划处",
                        name: "",
                        duty: "",
                        education: "",
                        type: "",
                        workCount: "",
                    },
                    {
                        dept: "经营计划处",
                        name: "",
                        duty: "",
                        education: "",
                        type: "",
                        workCount: "",
                    }
                    ],
                },
                rules: {
                    mainTask: [
                        { required: true, message: '请输入项目牵头部门承担任务', trigger: 'blur' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            beartaskForm: {
                handler(newValue, oldValue) {
                },
                deep: true,
            },
        },
        methods: {
            addItem(tableData) {
                tableData.push({
                    dept: "经营计划处",
                    name: "",
                    duty: "",
                    education: "",
                    type: "",
                    workCount: "",
                });
            },
            deleteItem(tableData, index) {
                this.$confirm('确认删除？').then(function () {
                    tableData.splice(index, 1);
                }).catch(_ => { });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.beartaskForm);
                    } else {
                        console.log('error');
                        return false;
                    }
                });
            },
            saveForm(formName) {
                console.log("save");
            },
            connect() {
                console.log("connect");
            }
        }
    }
</script>