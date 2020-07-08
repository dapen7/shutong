<style>
    .five .planCom .el-input{
        max-width:660px;
    }
    .five .planCom .el-select,.five .orgDiv .el-cascader{
        width:660px;
    }
    .five .planCom  .el-date-editor{
        width:660px;
    }
    .five .planCom .formDiv {
        width: 100%;
    }

    .five .planCom .tableDiv {
        flex-grow: 1;
    }

    .five .planCom .el-button--primary.is-plain {
        background: white;
        color:var(--color-primary);
    }

    .five .planCom .el-button--primary.is-plain:hover {
        background:var(--color-primary);
        color: white;
    }
    @media screen and (max-width: 1000px) {
        .five .planCom .treeDiv {
            display: none;
        }
        .five .planCom{
            padding:15px;
        }
        .five .planCom .tableDiv {
            width:100%;
            padding-left:0;
        }
        .five .planCom .el-select,.five .planCom .el-cascader{
            width: 100%;
        }
        .five .planCom .submitDiv{
            display: flex;
            justify-content: center;
        }
    }
    
</style>
<template>
    <div class="planCom">
        <el-form :model="planForm" class="formDiv" :rules="rules" ref="planForm" label-position="top">
            <el-form-item label="填表单位">
                <el-input v-model="planForm.dept" disabled placeholder="请输入填表单位"></el-input>
            </el-form-item>
            <el-form-item label="填写人">
                <el-input v-model="planForm.recorder" disabled placeholder="请输入填写人"></el-input>
            </el-form-item>
            <el-form-item label="填表日期" prop="date">
                <el-date-picker :editable="false" v-model="planForm.date" type="date" placeholder="请选择填表日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="planForm.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目所属" prop="belong">
                <el-select v-model="planForm.belong" placeholder="请选择项目所属">
                    <el-option v-for="item in belongList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主管机关" prop="supervisor">
                <el-select v-model="planForm.supervisor" placeholder="请选择主管机关">
                    <el-option v-for="item in supervisorList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目分类" prop="type">
                <el-select v-model="planForm.type" placeholder="请选择项目分类">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为超额项目" prop="overload">
                <el-radio v-model="planForm.overload" label="1">是</el-radio>
                <el-radio v-model="planForm.overload" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="原项目名称" prop="oldName">
                <el-select v-model="planForm.oldName" placeholder="请选择原项目名称">
                    <el-option v-for="item in oldNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目来源" prop="source">
                <el-radio v-model="planForm.source" label="1">所级评审</el-radio>
                <el-radio v-model="planForm.source" label="2">部门评审</el-radio>
                <el-radio v-model="planForm.source" label="3">会签审批</el-radio>
                <el-radio v-model="planForm.source" label="4">备案审批</el-radio>
            </el-form-item>
            <el-form-item label="合同编号/立项课题号" prop="code">
                <el-select v-model="planForm.code" placeholder="请选择合同编号/立项课题号">
                    <el-option v-for="item in codeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="执行年度" prop="year">
                <el-input v-model="planForm.year" placeholder="请输入执行年度"></el-input>
            </el-form-item>
            <el-form-item label="单号" prop="orderNumber">
                <el-input v-model="planForm.orderNumber" disabled placeholder="请输入单号"></el-input>
            </el-form-item>
            <el-form-item label="密级" prop="slevel">
                <el-select v-model="planForm.slevel" placeholder="请选择密级">
                    <el-option v-for="item in slevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目简介" prop="introduction" class="mb30">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入项目简介"
                    v-model="planForm.introduction">
                </el-input>
            </el-form-item>
            <el-form-item label="项目进展情况" prop="progress" class="mb30">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输项目进展情况"
                    v-model="planForm.progress">
                </el-input>
            </el-form-item>

            <el-form-item>
                <div class="submitDiv">
                    <el-button type="primary" @click="submitForm('planForm')">提交</el-button>
                    <el-button type="primary" @click="saveForm('planForm')">保存</el-button>
                    <el-button type="primary" plain @click="connect('planForm')">关联附表</el-button>
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
        },
        computed: {
        },
        data: function () {
            return {
                belongList:[
                    { value: "1", label: "所" },
                    { value: "2", label: "处" },
                ],
                supervisorList:[
                    { value: "1", label: "机关1" },
                    { value: "2", label: "机关2" },
                ],
                typeList:[
                    { value: "1", label: "分类1" },
                    { value: "2", label: "分类2" },
                ],
                oldNameList:[
                    { value: "1", label: "原名称1" },
                    { value: "2", label: "原名称2" },
                ],
                codeList:[
                    { value: "1", label: "111" },
                    { value: "2", label: "222" },
                ],
                slevelList:[
                    { value: "1", label: "公开" },
                    { value: "2", label: "级别2" },
                ],    
                roleList: [
                    { value: "1", label: "普通用户" },
                    { value: "2", label: "本公司管理员" },
                    { value: "3", label: "本部门管理员" },
                    { value: "4", label: "部门管理员" },
                    { value: "5", label: "公司管理员" },
                    { value: "6", label: "系统管理员" },
                ],
                planForm: {
                    dept: "计划经营处",
                    recorder: "系统管理员",
                    date:"",
                    name:"",
                    belong:"1",
                    supervisor:"",
                    type:"",
                    overload:"1",
                    oldName:"",
                    source:"1",
                    code:"",
                    year:"",
                    orderNumber:"",
                    slevel:"1",
                    introduction:"",
                    progress:""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    belong: [
                        { required: true, message: '请选择项目所属', trigger: 'blur' },
                    ],
                    supervisor: [
                        { required: true, message: '请选择主管机关', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择项目分类', trigger: 'blur' },
                    ],
                    source: [
                        { required: true, message: '请选择来源', trigger: 'blur' },
                    ],
                    overload: [
                        { required: true, message: '请选择编号', trigger: 'blur' },
                    ],
                    year: [
                        { required: true, message: '请输入执行年度', trigger: 'blur' },
                    ],
                    introduction: [
                        { required: true, message: '请输入项目简介', trigger: 'blur' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                    ],
                    progress: [
                        { required: true, message: '请输入项目进展情况', trigger: 'blur' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        watch: {
            planForm: {
                handler(newValue, oldValue) {
                },
                deep: true,
            },
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.planForm);
                    } else {
                        console.log('error');
                        return false;
                    }
                });
            },
            saveForm(formName) {
                console.log("save");
            },
            connect(){
                console.log("connect");
            }
        }
    }
</script>