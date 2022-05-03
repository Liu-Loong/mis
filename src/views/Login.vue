<template>
    <div style="width: 100%; height: 100vh; overflow: hidden">
        <div style="width: 70%;display:flex;float:left; height: 100vh;">
            <img alt="login logo" src="../assets/p2.jpg" >
        </div>
        <div style="width: 30%;display:flex;float:right; height: 100vh;">
            <div style="width: 300px;margin: 170px auto;">
                <div style="color: dodgerblue;font-size: 30px; text-align:center;padding: 30px 0; ">欢迎登录</div>
                <el-form :model="form" size="normal">
                    <el-form-item >
                        <el-input
                                v-model="form.username "
                                size="large"
                                clearable
                                :prefix-icon="UserFilled"/>
                    </el-form-item>
                    <el-form-item >
                        <el-input
                                v-model="form.password"
                                size="large"
                                :prefix-icon="Lock"
                                show-password/>
                    </el-form-item>
                    <el-form-item >
                        <el-button style="width: 100%;margin-top: 50px" type="primary" size="large" round
                        @click="login">登录</el-button>
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
                form:{}
            }
        },
        methods:{
            login(){
                request.post("api/user/login",this.form).then(res =>{
                    if (res.code ==='200'){
                        this.$message({
                            type:"success",
                            message:"登录成功"
                        })
                        this.$router.push("/")//跳转到主页面
                    }else{
                        this.$message.error("用户名或密码错误")
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