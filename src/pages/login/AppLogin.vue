<template>
    <div class='page'>
        <div class="login-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <h3 class="title">登录系统</h3>
                <el-form-item  prop="account">
                    <el-input type="text" v-model="ruleForm.account" placeholder="帐号" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item  prop="checkPassz`">
                    <el-input type="password" v-model="ruleForm.checkPass" placeholder="密码" auto-complete="off"></el-input>
                    <label>
                        <el-checkbox v-model="checked">显示密码</el-checkbox>
                    </label>
                    <router-link to="/" style="float:right;color:#bbbbbb">忘记密码？</router-link>
                </el-form-item>

                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%" @click="handleSubmit" :loading="logining">登录</el-button>
                </el-form-item>

                <el-form-item style="width:100%;">
                    <router-link to="/register">
                        <el-button style="width:100%;">注册 </el-button>
                    </router-link>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>

<script>

import sha256 from 'crypto-js/sha256'
import {requestLogin} from '@/api/user'

export default {

    name: 'app-login',
    data () {
        return {
            logining:false,
            fromUrl: '/',
            ruleForm:{
                account:'admin',
                checkPass: '123456',
            },
            rules:{
                account:[
                    {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                checkPass:[
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            },
            checked: false
        }  
    },
    methods:{
        //登录
        handleSubmit (ev){
            this.$refs.ruleForm.validate((valid) => {
                if (valid){
                    this.logining = true
                    const loginParsams = {username: this.ruleForm.account, password: sha256(this.ruleForm.checkPass)}
                    console.log(loginParsams)
                    requestLogin(loginParsams).then(data => {
                        console.log(data)
                        this.logining = false
                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        })
                        this.$router.push(this.fromUrl)
                    }).catch( err => {
                        this.logining = false
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
            
        },


    }
    
} 
</script scoped>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
}
.page {
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #FFF;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #DDD;
  border-radius: .5em;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
