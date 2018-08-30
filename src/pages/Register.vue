<template>
  <div class="register">
    <div class="logIn" >
      <div class="content">
        <p>慕思经销商平台</p>
        <form action="">
          <ul>
            <li  >
              <label for="userName" v-bind:class="`${usname}`"><span>账号</span></label>
              <input type="text" id="userName"  v-bind:class="`${username}`" 
                v-on:focus='focusName()'  @blur="blurName()"
                v-model="ruleForm.user" maxlength="15" autocomplete="off" >
            </li>
            <li>
              <label for="userPassword" v-bind:class="`${uspwd}`"><span>密码</span></label>
              <input type="password" id="userPassword" v-bind:class="`${userPassword}`" 
                @focus ='focusPwd()'  @blur="blurPwd()"
              v-model="ruleForm.pwd" maxlength="15">
            </li>
            <li class="tips clearfix">
              <input type="checkbox" name="checkbox-1" id="checkbox-1" v-model="checked">
              <label for="checkbox-1" ></label>
              <div class="rememberPassword">
              <span>记住密码</span>
              </div>
              <div class="forgetPassword">
              <router-link to='/Login'><span>忘记密码?</span></router-link>
              </div>
            </li>
            <li>
              <button type="button" @click="submitForm('ruleForm')">登录</button>
            </li>
          </ul>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios'

export default {
  name: "register",
  data() {
    return {
      username: "userName",
      userPassword: "userPassword",
      usname:'usname',
      uspwd:'uspwd',
      ruleForm:{
        user:'',
        pwd:''
      },
      checked: true    
    }
  },
  //页面加载调用获取cookie值
  mounted(){
      this.getAccountMsg();
      if(this.ruleForm.pwd.length){
        this.username = 'userName1'
        this.usname = 'usname2'
        this.userPassword = 'userPassword1'
        this.uspwd = 'uspwd2'
      }
    },
  methods: {
    //光标获得焦点，失去焦点触发的事件。
    focusName : function(){
      if(this.ruleForm.user.length){
        this.username = 'userName1'
        this.usname = 'usname2'
      }else{
        this.username = 'userName1'
        this.usname = 'usname1'
      }  
    },
    focusPwd : function(){
      if(this.ruleForm.pwd.length){
        this.userPassword = 'userPassword1'
        this.uspwd = 'uspwd2'
      }else{
        this.userPassword = 'userPassword1'
        this.uspwd = 'uspwd1'
      }
      
    },
    blurName:function(){
      if(this.ruleForm.user.length){
        this.username = 'userName1'
        this.usname = 'usname2'
      }else{
        this.username = 'userName'
        this.usname = 'usname'
      }
    },
    blurPwd:function(){
      if(this.ruleForm.pwd.length){
        this.userPassword = 'userPassword1'
        this.uspwd = 'uspwd2'
      }else{
        this.userPassword = 'userPassword'
        this.uspwd = 'uspwd'
      }
    },
    //去除input输入框的左边空格
    trimStr: function(str) {
      return str.replace(/(^\s*)/g, "")
    }, 
    //提交时如果勾选记住密码，则缓存账号密码。否则清除缓存。
    submitForm(formName) {
      if (this.checked) {
        this.setAccountMsg(this.ruleForm.user, this.ruleForm.pwd);
        getApi()
      } else {
        this.setAccountMsg('', '');
      }
       function getApi(){
         console.log('1')
       return new Promise(function(resolve,reject){
        axios({
          method :'POST',
          header : {
            UUID : 'e10adc3949ba59abbe56e057f20f883e'    
          },
          url : "https://derucci.net/app/login.api",
          params : {
            account : 18080028,
            password : 'e10adc3949ba59abbe56e057f20f883e'    
          }
        }).then(function(response){
          if(response){
            console.log(response)
          }else{  
          }
        })
      })
    }
    },
    //设置cookie
    setAccountMsg(uname, upwd) {
      let string = `{"name":" ${uname}", "pwd": "${upwd}"}`
      localStorage.setItem('accountMsg', string)
    },
    //读取cookie
    getAccountMsg: function() {
      let accountMsg = localStorage.getItem('accountMsg')
      let oldaccountMsg = JSON.parse(accountMsg)
      // console.log(oldaccountMsg)
      // console.log('获取本地缓存的账号信息', oldaccountMsg['name'],oldaccountMsg['pwd'])
      //去除空格
      let trimName = this.trimStr(oldaccountMsg['name'])
      this.ruleForm.user = trimName
      this.ruleForm.pwd = oldaccountMsg['pwd']
    }
   
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "PingFang";
  src: url("../assets/font/PingFang Regular.ttf");
}
@font-face {
  font-family: "PingFangBold";
  src: url("../assets/font/PingFang Bold.ttf");
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.register {
  background: url("../assets/image/bg.jpg") no-repeat center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  font-family: "PingFang" !important;
  .logIn {
    padding: 44px 40px 30px 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #feffff;
    box-shadow: 0 6px 10px 0 rgba(37, 54, 74, 0.46);
    border-radius: 4px;
    opacity: 0.9;
    .content {
      width: 380px;
      height: 344px;  
      p {
        font-size: 30px;
        line-height: 34px;
        font-weight: bold;
        margin-bottom: 67px;
      }
      ul {
        position: relative;
        .userName,
        .userPassword {
          display: block;
          border-bottom: 1px solid #ed4545;
          width: 380px;
          height: 40px;
          font-size: 18px;
          font-family: "MicrosoftYaHei";
          margin-top: -20px;
        }
        .userName{
          margin-bottom:40px;
        }
        //span的位置改变
        .usname{
          position: absolute;
          left: 1px;
          top: 5px;
          animation: moveDown1 .5s;
          @keyframes moveDown1 {
            from{
              top:-20px
            }
            to{
              top: 5px
            }
          }
        }
        //当输入框有值，不用动画。
        .usname2{
          position: absolute;
          left: 1px;
          top: -20px
        }
        .uspwd2{
          position: absolute;
          left: 1px;
          top: 40px
        }
        .uspwd{
          position: absolute;
          left: 1px;
          top: 65px;
          animation: moveDown .5s;
          @keyframes moveDown {
            from{
              top:40px
            }
            to{
              top: 65px
            }
          }
        }
        .usname1{
          position: absolute;
          left: 1px;
          top: -20px;
           animation: moveUp1 .5s;
          @keyframes moveUp1 {
            from{
              top:5px
            }
            to{
              top: -20px
            }
          }
        }
        .uspwd1{
          position: absolute;
          left: 1px;
          top: 40px;
           animation: moveUp .5s;
          @keyframes moveUp {
            from{
              top:65px
            }
            to{
              top: 40px
            }
          }
        }
        //获得光标样式改变
        .userName1{
          display: block;
          border-bottom: 2px solid #ed4545;
          width: 380px;
          height: 40px;
          font-size: 18px;
          font-family: "MicrosoftYaHei";
          margin-top: -20px;
          margin-bottom:40px;
        }
        .userPassword1{
          display: block;
          border-bottom: 2px solid #ed4545;
          width: 380px;
          height: 40px;
          font-size: 18px;
          font-family: "MicrosoftYaHei";
          margin-top: -20px;
        }
        span {
          font-family: "MicrosoftYaHei";
          font-size: 18px;
          letter-spacing: 3px;
          color: #909090;   
        }
        .tips {
          margin-top: 10px;
          [type="checkbox"] {
            display: none;
          }
          label {
            display: inline-block;
            position: relative;
            width: 20px;
            height: 20px;
            border: 1px solid #dbe8f1;
            background-color: #f5f5f5;
            border-radius: 100%;
            cursor: pointer;
            margin-top: 7px;
            margin-right: 10px;
            float: left;
            box-sizing: border-box;
          }
          [type="checkbox"]:checked + label {
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            border: 5px solid #dbe8f1;
            background-color: grey;
          }
          .rememberPassword {
            float: left;
          }
          .forgetPassword {
            text-decoration: underline;
            float: right;
            color: #909090;
            cursor: pointer;
            a{
              color: #909090;
            }
          }
         
        }
        button {
          width: 380px;
          height: 50px;
          background-color: #ed4545;
          box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, 0.5);
          border-radius: 4px;
          border: 1px solid #ca3a39;
          font-family: "MicrosoftYaHei";
          font-size: 18px;
          letter-spacing: 3px;
          color: #eff9fd;
          margin-top: 28px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

