<style>
    .five .userinfoDiv {
        padding: 20px;
        display: flex;
    }

    .five .userinfoDiv .treeDiv {
        flex-basis: 305px;
        flex-shrink: 0;
        border-right: 1px solid rgba(232, 233, 238, 1);
        overflow-y: auto;
        overflow-x: auto;
    }
    .five .userinfoDiv .el-input{
        max-width:660px;
    }
    .five .userinfoDiv .el-select,.five .userinfoDiv .el-cascader{
        width:660px;
    }
    .five .userinfoDiv .formDiv {
        width: 100%;
    }

    .five .userinfoDiv .tableDiv {
        padding-left: 40px;
        flex-grow: 1;
    }

    .five .userinfoDiv .el-button--primary.is-plain {
        background: white;
        color:var(--color-primary);
    }

    .five .userinfoDiv .el-button--primary.is-plain:hover {
        background: var(--color-primary);
        color:white;
    }

    .five .userinfoDiv .custom-tree-node {
        display: flex;
        align-items: center;
    }

    .five .userinfoDiv .shu {
        border: 0;
        border-right: 1px solid #DDDFE6;
        display: inline-block;
        height: 26px;
    }

    .five .userinfoDiv .heng {
        color: #DDDFE6;
        font-size: 14px;
        margin-right: 3px;
        margin-left: 3px;
    }

    .five .userinfoDiv .jia {
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

    .five .userinfoDiv .el-icon-caret-right {
        display: none;
    }
    @media screen and (min-width: 1000px) {
        .five .userinfoDiv .fixSearch .el-icon-arrow-down,
        .five .userinfoDiv .fixSearch .el-icon-arrow-up {
            transition: none;
            transform: rotateZ(0);
        }

        .five .userinfoDiv .fixSearch .el-icon-arrow-down:before,
        .five .userinfoDiv .fixSearch .el-icon-arrow-up:before {
            content: "\e778";
        }
    }
    
    @media screen and (max-width: 1000px) {
        .five .userinfoDiv .treeDiv {
            display: none;
        }
        .five .userinfoDiv{
            padding:15px;
        }
        .five .userinfoDiv .tableDiv {
            width:100%;
            padding-left:0;
        }
        .five .userinfoDiv .el-select,.five .userinfoDiv .el-cascader{
            width: 100%;
        }
        .five .userinfoDiv .submitDiv{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
<template>
    <div class="userinfoDiv">
        <div class="treeDiv">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true">
                <span class="custom-tree-node" slot-scope="{ node, data }"
                    :style="{'padding-left':((node.level-1)*18+(node.isLeaf?7:0))+'px'}">
                    <template v-if="!node.isLeaf">
                        <span class="jia" v-if="node.expanded">
                            <i class="el-icon-minus"></i>
                        </span>
                        <span class="jia" v-if="!node.expanded">
                            <i class="el-icon-plus"></i>
                        </span>
                        <span class="heng">--</span>
                        <img style="width:18px;height:18px;" src="../../images/five/file_icon@2x.png">
                    </template>
                    <template v-if="node.isLeaf">
                        <span class="shu"></span>
                        <span class="heng">---</span>
                        <img style="width:14px;height:18px;" src="../../images/five/file2_icon@2x.png">
                    </template>
                    <span style="margin-left:8px;">{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <div class="tableDiv">
            <div class="mb20 breadDiv">
                <span class="mr10 isPc">当前位置 : </span>
                <el-breadcrumb separator=">" class="isPc">
                    <el-breadcrumb-item><a href="" class="activebread">机构用户</a></el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
                <el-breadcrumb separator="/" class="isMobile">
                    <el-breadcrumb-item><a href="" class="activebread">机构用户</a></el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="mb10">
                <el-form :model="orgForm" class="formDiv" :rules="rules" ref="orgForm" label-position="top">
                    <el-form-item label="归属公司">
                        <el-cascader class="fixSearch" filterable ref="companySelect"
                            :options="companyData" placeholder="请选择归属部门" :props="{ checkStrictly: true }"
                            v-model="orgForm.company" clearable @change="onCompanyChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="归属部门">
                        <el-select class="fixSearch" filterable v-model="orgForm.dept"
                            placeholder="请选择归属部门">
                            <el-option v-for="item in deptList" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工号" prop="code">
                        <el-input v-model="orgForm.code" placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="orgForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名" prop="loginName">
                        <el-input v-model="orgForm.loginName" placeholder="请输入登录名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="orgForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input v-model="orgForm.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="orgForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model=" orgForm.phone" placeholder="请输入电话">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model="orgForm.mobile" placeholder="请输入手机"></el-input>
                    </el-form-item>
                    <el-form-item label="是否允许登陆" prop="canLogin">
                        <el-radio v-model="orgForm.canLogin" label="1">是</el-radio>
                        <el-radio v-model="orgForm.canLogin" label="0">否</el-radio>
                        <el-link type="danger">注：“是”代表此账号允许登录，“否”则表示此账号不允许登录</el-link>
                    </el-form-item>
                    <el-form-item label="用户类型">
                        <el-select style="width:100%;" v-model="orgForm.type"
                            placeholder="请选择用户类型">
                            <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户角色" prop="role">
                        <el-checkbox-group v-model="orgForm.role">
                            <el-checkbox v-for="item in roleList" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="mb30">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入备注内容"
                            v-model="orgForm.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="submitDiv">
                            <el-button type="primary" @click="submitForm('orgForm')">保存</el-button>
                            <el-button type="primary" plain @click="resetForm('orgForm')">取消</el-button>
                        </div>
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
            companyData: function () {
                function findChildren(node) {
                    if (node.children) {
                        node.deptList = [];
                        for (var i = node.children.length - 1; i >= 0; i--) {
                            var item = node.children[i]
                            if (item.type == "dept") {
                                node.deptList.push(item);
                                node.children.splice(i, 1)
                            } else {
                                findChildren(item);
                            }
                            if (node.children && node.children.length == 0) {
                                delete node.children;
                            }
                        }
                    }
                }
                var tempData = JSON.parse(JSON.stringify(this.data));
                tempData.forEach(function (item) {
                    findChildren(item);
                });
                return tempData;
            }
        },
        data: function () {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.orgForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                isMobile:false,
                deptList: [
                ],
                data: [{
                    label: '山东省总公司',
                    value: '山东省总公司',
                    type: 'company',
                    children: [
                        { label: '公司领导', value: '公司领导', type: 'dept' },
                        { label: '综合部', value: '综合部', type: 'dept' },
                        { label: '市场部', value: '市场部', type: 'dept' },
                        { label: '技术部', value: '技术部', type: 'dept' },
                        { label: '研发部', value: '研发部', type: 'dept' },
                        {
                            label: '济南市分公司',
                            value: '济南市分公司',
                            type: 'company',
                            children: [
                                { label: '公司领导', value: '公司领导', type: 'dept' },
                                { label: '综合部', value: '综合部', type: 'dept' },
                                { label: '市场部', value: '市场部', type: 'dept' },
                                { label: '技术部', value: '技术部', type: 'dept' },
                                { label: '研发部', value: '研发部', type: 'dept' },
                                {
                                    label: '历城区分公司',
                                    value: '历城区分公司',
                                    type: 'company',
                                    children: [
                                        { label: '公司领导', value: '公司领导', type: 'dept' },
                                        { label: '综合部', value: '综合部', type: 'dept' },
                                        { label: '市场部', value: '市场部', type: 'dept' },
                                        { label: '技术部', value: '技术部', type: 'dept' },
                                        { label: '研发部', value: '研发部', type: 'dept' },
                                    ],
                                },
                                {
                                    label: '市中区分公司',
                                    value: '市中区分公司',
                                    type: 'company',
                                    children: [
                                        { label: '公司领导', value: '公司领导', type: 'dept' },
                                        { label: '综合部', value: '综合部', type: 'dept' },
                                        { label: '市场部', value: '市场部', type: 'dept' },
                                        { label: '技术部', value: '技术部', type: 'dept' },
                                        { label: '研发部', value: '研发部', type: 'dept' },
                                    ],
                                },
                                {
                                    label: '历下区分公司',
                                    value: '历下区分公司',
                                    type: 'company',
                                    children: [
                                        { label: '公司领导', value: '公司领导', type: 'dept' },
                                        { label: '综合部', value: '综合部', type: 'dept' },
                                        { label: '市场部', value: '市场部', type: 'dept' },
                                        { label: '技术部', value: '技术部', type: 'dept' },
                                        { label: '研发部', value: '研发部', type: 'dept' },
                                    ],
                                },
                            ],
                        },
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                typeList:[
                    {key:"1",label:"普通用户"},
                    {key:"2",label:"普通用户"}
                ],
                roleList:[
                    {key:"1",label:"普通用户"},
                    {key:"2",label:"本公司管理员"},
                    {key:"3",label:"本部门管理员"},
                    {key:"4",label:"部门管理员"},
                    {key:"5",label:"公司管理员"},
                    {key:"6",label:"系统管理员"},
                ],
                orgForm: {
                    company: "",
                    dept: "",
                    code:"",
                    name: "",
                    loginName:"",
                    password:"",
                    password2:"",
                    email:"",
                    phone:"",
                    mobile:"",
                    canLogin:"1",
                    type:"",
                    role:[],
                    remark:""
                },
                rules: {
                    code: [
                        { required: true, message: '请输入工号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    loginName: [
                        { required: true, message: '请输入登录名', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true,validator:validatePass2, trigger: 'blur' },
                    ],
                    role: [
                        { required: true, message: '请选择用户角色', trigger: 'change' }
                    ],
                }
            }
        },
        watch: {
            orgForm: {
                handler(newValue, oldValue) {
                },
                deep: true,
            },
        },
        methods: {
            onCompanyChange(item) {
                var node = this.$refs.companySelect.getCheckedNodes();
                node = node[0].data;
                this.deptList = node.deptList;
            },
            getParent(node, arr) {
                if (node.data.value) {
                    if (node.data.type == "company") {
                        arr.push(node.data.value);
                    }
                }
                if (node.parent) {
                    this.getParent(node.parent, arr);
                }
            },
            handleNodeClick(data, node) {
                if (node.isLeaf) {
                    this.deptList = [];
                    this.orgForm.company = [];
                    this.orgForm.dept = data.value;
                    this.getParent(node, this.orgForm.company);
                    this.orgForm.company = this.orgForm.company.reverse();
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.orgForm);
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