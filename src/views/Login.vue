<template>
  <el-form ref="form" class="login-container" label-width="70px" :inline="true" :model="form" :rules="rules">
    <h3 class="login_title">系统登陆</h3>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button @click="submit" style="margin-left: 105px; margin-top: 10px;" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
    export default {
        data(){
            return{
                form:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        { required:true , message:'请输入姓名', trigger:'blur'}
                    ],
                    password:[
                         { required:true , message:'请输入密码', trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            //登录
            submit(){
            //     //token信息
            //    const token = Mock.Random.guid()
            //    //将token信息存入cookie用于不同页面间通信
            //    Cookie.set('token',token)
                //校验通过
                this.$refs.form.validate((valid) =>{
                    if(valid){
                        getMenu(this.form).then(({data}) =>{
                            console.log(data)
                            if(data.code === 20000){
                          //将token信息存入cookie用于不同页面间通信
                             Cookie.set('token',data.data.token)
                            //跳转到首页
                            this.$router.push('/home')
                            }else{
                                this.$message.error(data.data.message);
                            }
                        })
                    }
                })

            }
        },
    }
</script>

<style lang="less" scoped>
    .login-container{
        width: 350px;
        background:pink ;
        border: 1px solid yellow ;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 15px;
        box-shadow: 0 0 25px yellow;
        box-sizing:border-box ;
        .login_title{
            text-align: center;
            margin-bottom: 40px;
        }
        .el-input{
            width:198px;
        }
    }
</style>