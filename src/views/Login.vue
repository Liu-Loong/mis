<template>
    <div style="width: 100%; height: 100vh; overflow: hidden">
        <div style="width: 70%;display:flex;float:left; height: 100vh;">
            <img alt="login logo" src="../assets/p2.jpg" >
        </div>
        <div style="width: 30%;display:flex;float:right; height: 100vh;">
            <div style="width: 300px;margin: 170px auto;">
                <div style="color: dodgerblue;font-size: 30px; text-align:center;padding: 30px 0; ">欢迎登录</div>
                <el-form :model="form" ref="form" size="default" :rules="rules">
                    <el-form-item prop="account">
                        <el-input
                                v-model="form.account "
                                placeholder="请输入账号"
                                size="large"
                                clearable
                                :prefix-icon="UserFilled"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                v-model="form.password"
                                placeholder="请输入密码"
                                size="large"
                                :prefix-icon="Lock"
                                show-password/>
                    </el-form-item>
                    <el-form-item  :label-width="formLabelWidth" prop="type">
                        <el-radio v-model="form.type" label="admin" size="large">管理员</el-radio>
                        <el-radio v-model="form.type" label="staff" size="large">职工</el-radio>
                    </el-form-item>
                    <el-form-item >
                        <el-button style="width: 100%;" type="primary" size="large" round
                        @click="login('form')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>


</template>

<script>
    import request from "../utils/request";
    import {UserFilled,Lock} from '@element-plus/icons-vue'
    export default {
        name: "Login",
        components:{
            UserFilled,Lock
        },
        setup(){
            return{
                UserFilled,Lock
            }
        },
        data(){
            return{
                rules:{
                    account:[{required: true, pattern: /^[a-zA-Z]\w{1,18}$/,
                        message: '以字母开头，长度在6~18之间，只能包含字符、数字和下划线', trigger: 'blur'}],
                    password:[{required: true, pattern: /^\w+$/,
                        message: '只能输入由数字、26个英文字母或者下划线组成的字符串',trigger: 'blur' }],
                },
                form:{}
            }
        },
        methods:{
            login(forName){
                this.$refs[forName].validate((valid) =>{
                    if (valid){
                        request.get("/api/user/login",{
                            params:{
                                username: this.form.username,
                                password: this.form.password,
                            }
                        }).then(res =>{
                            if (res.code ===200){
                                this.$message({
                                    type:"success",
                                    message:"登录成功"
                                })
                                this.$router.push("/")//跳转到主页面
                            }else{
                                this.$message.error("用户名或密码错误")
                            }
                        })
                    }else{
                        console.log("登录失败，提交表单失败！！！")
                        return false;
                    }
                })

            }

        }
    }
</script>

<style scoped>
    .img2 {
        width: 100px;
        height: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100px auto;
    }
    .el-input{
        padding: 10px 0;
        border-radius: 15px;
    }
</style>