<template>
  <div id="Userpassw">
    
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
        <i class="el-icon-edit">修改密码</i>
      <el-form-item label="旧密码" prop="oldPass" style="margin-top: 40px;">   
        <el-input type="text" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Useradd('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validatepass1 = (rele, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          uid: '', //用户唯一标识符
          pass: '', //密码
          checkPass: '', //确认密码
          oldPass: '' //旧密码
        },
        rules: {
          oldPass: [{
            validator: validatepass1,
            trigger: 'blur'
          }],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      };
    },
    // 方法
    methods: {
      Useradd() {
        let than = this;
        // sessionStorage.getItem 获取指定会话存储key
        var toke = sessionStorage.getItem("token_type")
        console.log(toke)
        // 默认配置请求头
        this.axios.defaults.headers.Authorization = toke;
        console.log(than.ruleForm.oldPass);
        console.log(than.ruleForm.pass)
        than.axios({
          url: "/api/User/ModifyPassword?uid=" + than.ruleForm.uid + "&oldPassword=" + than.ruleForm.oldPass +
            "&newPassword=" + than.ruleForm.pass,
        }).then((res) => {
          if (res.data.code == 1) {     //1表示成功
            than.$message({
              message: res.data.message,
              type: 'success'
            })
            than.$router.push("/")
            sessionStorage.clear()  
          } else if (res.data.code == 0) {      //0表示数据没有任何变化
            than.$message({
              message: res.data.message,
              type: 'warning'
            })
          } else if (res.data.code == -1) {   //系统异常
            than.$message({
              message: res.data.message,
              type: 'error'
            })
          } else {
            than.$message({           //其他错误
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    // 加载后
    created() {
      this.ruleForm.uid = sessionStorage.getItem("uid");      //用户唯一标识符
    },
  }

</script>

<style scoped lang="less">
.el-icon-edit{
  vertical-align: middle;
  font-size: 23px;
  text-align: center;
}
.el-form demo-ruleForm{
  float: left !important;
}
#Userpassw{
  vertical-align: middle;
  text-align: center;
  float: left;
}
.el-input__inner{
  width: 383px !important;
}
.el-input{
  width: 378px !important;

}
</style>
