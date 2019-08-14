<template>
  <div class="picmain">
    <div class="login">
      <h1>智学无忧后台</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="user">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"
            οninput="if(value.length>11)value=value.slice(0,11)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
      <el-button class="but" type="primary" round @click="loginn(ruleForm)" v-model="ruleForm" :loading="isDisable">登录
      </el-button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Cookie from "@/unti/Cookie"
  import Base64 from "@/unti/Base64"
  export default {
    //数据
    data() {
      return {
        isDisable: false, //登录
        checked: false, //记住密码
        ruleForm: {
          phone: '', //手机号
          pass: '' //密码
        },
        rules: {
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          pass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    //方法
    methods: {
      // 登录
      loginn() {
        let that = this
        that.isDisable = true
        that.axios({
          url: "/api/OAuth/authenticate",
          params: {
            userMobile: this.ruleForm.phone,
            userPassword: this.ruleForm.pass
          }
        }).then((res) => {
          that.$message({
            message: '登录成功',
            type: 'success'
          })
          // token 请求头
          sessionStorage.setItem("userName", res.data.profile.userName); //管理员
          sessionStorage.setItem("uid", res.data.profile.userUid); //用户唯一标识符
          sessionStorage.setItem("token_type", "Bearer" + " " + res.data.access_token); //密钥
          that.$router.push("/Home")
          console.log(res.data)
        }).catch((res) => {
          that.$message({
            message: "账号或者密码错误",
            type: "error"
          })
        })
        // 判断复选框是否被勾选; 勾选则调用配置Cookie方法
        if (that.checked) { // 记住密码
          that.setCookie(that.ruleForm.phone, that.ruleForm.pass, 30); // 保存期限为30天
          let phone = Base64.encode(that.ruleForm.phone)
          let pass = Base64.encode(that.ruleForm.pass)
          that.setCookie(phone, pass, 11)
        } else {
          that.clearCookie(); // 清空 Cookie

        }
        setTimeout(() => { //时间函数
          that.isDisable = false
        }, 3000)
      },


      //图片自适应
      windowwid() {
        var h = window.innerHeight
        var main = document.getElementsByClassName("picmain")
        main[0].style.cssText = "height:" + h + "px;"
      },
      //保存天数Cookie
      setCookie(phone, pass, exdays) { // 用户名, 密码, 保存天数
        let exdate = new Date(); // 获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
        // 字符串拼接cookie
        window.document.cookie = 'phone' + '=' + phone + ';path=/;expires=' + exdate.toGMTString();
        window.document.cookie = 'pass' + '=' + pass + ';path=/;expires=' + exdate.toGMTString();
      },
      // 读取Cookie
      getCookie() {
        // console.log(document.cookie);
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; '); // 这里显示的格式需要切割一下自己可输出看下
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('='); // 再次切割
            // 判断查找相对应的值 
            if (arr2[0] == 'phone') {
              this.ruleForm.phone = Base64.decode(arr2[1]).substring(0, 11); // 保存到保存数据的地方   

            } else if (arr2[0] == 'pass') {
              this.ruleForm.pass = Base64.decode(arr2[1]);
            }
          }
        }
        this.checked = true;
      },
      // 清除Cookie
      clearCookie() {
        this.setCookie('', '', -1); // 修改2值都为空，天数为负1天就好了
      }
    },
    created() {
      sessionStorage.setItem("istrue", false);
      console.log(sessionStorage.getItem("istrue"));
    },
    mounted() { //挂载后
      this.windowwid();
      this.getCookie();
    }
  }

</script>

<style scoped lang="less">
  .picmain {
    background: url(../assets/背景.jpg);
    overflow: hidden !important;
  }

  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-style: sans-serif;
  }

  .login {
    overflow: hidden !important;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -108px 0 0 -280px;
    width: 380px;
    height: 500px;
  }

  .login h1 {
    text-shadow: 0 0 10px;
    letter-spacing: 1px;
    text-align: center;
  }

  h1 {
    color: #312E3D;
    font-size: 2em;
    /* margin: 0.67em 0; */
    margin-left: 76px;
  }

  input {
    width: 278px;
    height: 18px;
    margin-bottom: 10px;
    outline: none;
    padding: 10px;
    font-size: 13px;
    color: black;
    border-top: 1px solid #312E3D;
    border-left: 1px solid #312E3D;
    border-right: 1px solid #312E3D;
    border-bottom: 1px solid #56536A;
    border-radius: 4px;
    /* background-color: #2D2D3F; */
  }

  .but {
    width: 281px;
    min-height: 20px;
    display: block;
    background-color: #4a77d4;
    border: 1px solid #3762bc;
    color: #fff;
    padding: 9px 14px;
    font-size: 15px;
    line-height: normal;
    border-radius: 5px;
    margin-left: 100px;
  }

  .bud {
    width: 281px;
    min-height: 20px;
    display: block;
    background-color: #EFEFEF;
    border: 1px solid #EFEFEF;
    color: #fff;
    padding: 9px 14px;
    font-size: 15px;
    line-height: normal;
    border-radius: 5px;
    margin-left: 96px;
    margin-top: 20px;
  }

  a {
    text-decoration: none;
  }

</style>
