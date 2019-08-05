<template>
  <div id="Userpassw">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('ruleForm')">提交</el-button>
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
          oldPass: '' //用户唯一标识符
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      add(name) {
        let than = this;
        var toke=sessionStorage.getItem("token_type")
        console.log(toke)
        than.axios({
          url: '/api/User/ModifyPassword?oldPassword' + this.resetForm.oldPass + '&newPassword' + this.resetForm
            .pass,
          // params 是即将于请求一起发送的url参数

          // headers 请求头

        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style scoped lang="less">

</style>
