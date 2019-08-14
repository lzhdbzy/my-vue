<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>老师管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="text-align: center;margin-right: 260px">
      <el-button type="success" icon="el-icon-plus" @click="addTeach()">新增老师</el-button>
    </el-row>
    <div class="radio">
      <el-radio-group v-model="radio">
        <el-radio :label="0" value="全选" @change="checked">全选</el-radio>
        <el-radio :label="index+1" @change="checked" v-for="(item,index) in Administrator" :key="item.userUserTypeId">
          {{item.userTypeTypeName}}</el-radio>
      </el-radio-group>
    </div>
    <!-- 渲染信息页面 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userId" label="主键编号"></el-table-column>
      <el-table-column prop="userName" label="老师名称"></el-table-column>
      <el-table-column prop="userSex" label="性别"></el-table-column>
      <el-table-column prop="userMobile" label="手机号码"></el-table-column>
      <el-table-column prop="userPassword" label="密码"></el-table-column>
      <el-table-column prop="userTypeTypeName" label="职务"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" style="margin-left:0px" type="danger" :disabled="tableData[scope.$index].disableDelete"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 渲染信息页面结束 -->

    <!-- 新增教师 -->
    <el-dialog title="新增老师" :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="老师名称" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="userMobile">
          <el-input v-model="form.userMobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="form.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="form.userSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色信息" prop="userUserTypeId">
          <el-select v-model="form.userUserTypeId" placeholder="请选择角色">
            <el-option v-for="(item,index) in Administrator" :key="index" :value="item.userTypeId"
              :label="item.userTypeTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改按钮-->
    <el-dialog title="修改老师信息" :visible.sync="dialogFormVisible">
      <el-form :model="objec" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="老师名称" prop="userName">
          <el-input v-model="objec.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="userMobile">
          <el-input v-model="objec.userMobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="objec.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="objec.userSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色信息" prop="userUserTypeId">
          <el-select v-model="objec.userUserTypeId" placeholder="请选择角色">
            <el-option v-for="(item,index) in Administrator" :key="index" :value="item.userTypeId"
              :label="item.userTypeTypeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addConfirm()">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        radio: 0, //单选
        tableData: [],
        Administrator: [], //角色信息
        dialogTableVisible: false, //新增显示与隐藏
        dialogFormVisible: false, //修改显示与隐藏
        allData: [],
        userTypeId:"",
        form: {
          userName: '', //老师名称
          userMobile: '', //手机号
          userSex: '男', //性别
          userPassword: '', //密码
          userUserTypeId: '', //用户角色编号   
        },
        objec: {
          userUid: "", //要修改的用户标识符
          userName: "", //修改的老师名称
          userMobile: "", //修改的手机号
          userPassword: "", //修改的密码
          userSex: "", //修改的性别
          userUserTypeId: "" //修改的角色    
        },
        uid: "", //用户的唯一标识符
        rules: {
          userName: [{
            required: true,
            message: '请输入老师名称',
            trigger: 'change'
          }, ],
          userMobile: [{
              required: true,
              message: '手机号码',
              trigger: 'change'
            },
            {
              min: 11,
              max: 11,
              message: '11位手机号码',
              trigger: 'blur'
            }
          ],
          userPassword: [{
              required: true,
              message: '请输入密码',
              trigger: 'change'
            },
            {
              min: 6,
              max: 18,
              message: '请输入6至18位密码',
              trigger: 'blur'
            }
          ],
          userSex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          userUserTypeId: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      /*
        选中课程
      */
      checked(value) {
        console.log(value)
        var that = this;
        var arr = [];
        if (value != 0) {
          that.allData.forEach(el => {
            if (el.userUserTypeId == that.Administrator[value-1].userTypeId) {
              arr.push(el);
            }
          });
          that.tableData = arr;
        } else {
          that.tableData = that.allData;
        }
      },


      /*
          删除教师
       */
      handleDelete(index, row) {
        var than = this;
        var userid = this.tableData[index].userUid;
        console.log(userid)
        than.axios
          .post(
            "/api/User/RemoveTeacher?uid=" + userid + ""
          )
          .then((res) => {
            this.yanZhen(res)
            this.addTeacher()
          })
          .catch(err => {
            console.log(err);
          });
      },
      /*
            验证信息
        */
      yanZhen(res) {
        if (res.data.code == -1) { //-1系统异常
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        } else if (res.data.code == 0) { //0没有改变
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        } else if (res.data.code == 1) { //1 成功
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        } else if (res.data.code == -2) { //-2 参数错误
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        } else {
          this.$message({ //其他错误
            message: res.data.message,
            type: 'error'
          })
        }
      },
      /*
           新增老师
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            this.axios({
                url: "/api/User/AddTeacher",
                method: "post",
                data: {
                  userName: that.form.userName, //用户名,不能为空
                  userMobile: that.form.userMobile, //手机号,长度11位
                  userSex: that.form.userSex, //性别,男|女
                  userPassword: that.form.userPassword, //密码,长度6~18
                  userUserTypeId: that.form.userUserTypeId, //用户角色编号
                },
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                // console.log(res)
                that.addTeacher()
                that.yanZhen(res)
                that.dialogTableVisible = false;
              })
          } else {
            return false;
          }
        });
      },

      /*
        重置
      */
      resetForm(formName) {
        var that = this;
        that.$refs[formName].resetFields();
      },
      /*
        修改按钮
      */
      handleEdit(index, row) {
        var that = this;
        that.objec.userName = row.userName
        that.objec.userMobile = row.userMobile
        that.objec.userPassword = row.userPassword
        that.objec.userSex = row.userSex
        that.objec.userUserTypeId = row.userUserTypeId
        that.objec.userUid = row.userUid;
        that.dialogFormVisible = true;
      },
      /*
      修改确定
      */
      addConfirm() {
        // console.log(this.objec.userUid)
        var than = this;
        this.axios({
            method: "post",
            url: "/api/User/ModifyTeacher",
            data: than.objec,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            than.addTeacher()
            than.dialogFormVisible = false
            console.log(res)
            than.yanZhen(res)
          }).catch((error) => {})
      },
      /*
        获取所有的老师信息
      */
      addTeacher() {
        var than = this;
        var toke = sessionStorage.getItem("token_type");
        than.axios.defaults.headers.Authorization = toke;
        than.axios({
          url: '/api/User/GetTeachers'
        }).then((res) => {
          // console.log(res.data)
          than.tableData = res.data
          than.allData = res.data
        })
      },
      /*
          获取所有角色
      */
      addAdministrator() {
        this.axios({
          url: "/api/UserType/GetUserRoles",
        }).then((res) => {
          // console.log(res.data)
          this.Administrator = res.data
        })
      },
      /*
        清空弹出框的值  
      */
      addTeach() {
        var that = this;
        that.form.userName = ""
        that.form.userMobile = ""
        that.form.userPassword = ""
        that.form.userSex = ""
        that.form.userUserTypeId = ""
        this.dialogTableVisible = true;
      }
    },
    //加载
    created() {
      this.addTeacher() //老师信息
      this.addAdministrator() //获取所有的角色信息
    },
  }

</script>

<style scoped lang="less">
</style>
