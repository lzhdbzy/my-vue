<template>
  <div id="main">
    <el-button class="el-icon-circle-plus-outline" type="primary" plain @click="addStuBtn()">添加角色</el-button>
    <el-table :data="tableData">
      <el-table-column prop="userTypeId" label="编号"></el-table-column>
      <el-table-column prop="userTypeTypeName" label="管理员"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" :disabled="tableData[scope.$index].disable"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <el-dialog title="新增角色" :visible.sync="dialogTableVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="userRoleName">
          <el-input v-model="ruleForm.userRoleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色编号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="userRoleName">
          <el-input v-model="ruleForm.userRoleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    // 数据
    data() {
      return {
        tableData: [],
        userTypeId: "", //编号
        userTypeTypeName: "", //管理员
        dialogTableVisible: false, //新增角色名称
        dialogFormVisible: false, //编辑角色名称
        ruleForm: {
          userRoleName: "", //角色名称
          id: "", //要更改的角色编号

        },
        rules: {
          userRoleName: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'change'
          }],
          id: [{
            required: true,
            message: '请输入角色编号',
            trigger: 'change'
          }]
        }
      }
    },
    // 方法
    methods: {
      /*
        编辑信息
      */
      handleEdit(index, row) {
        var than = this;
        than.ruleForm.userRoleName = row.userTypeTypeName,
          than.ruleForm.id = row.userTypeId,
          than.dialogFormVisible = true;
      },
      /*
        删除信息  
        */
      handleDelete(index, row) {
        var than = this;
        than.axios({
          method: 'post',
          url: '/api/UserType/RemoveUserRole',
          params: {
            userRoleId: row.userTypeId
          }
        }).then((res) => {
          console.log(res)
          this.roleBased()
          this.yanZhen(res)
        })
      },
      /*
          编辑角色确定
      */
      submitFormm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {} else {
            return false;
          }
        });
        var than = this;
        than.axios({
            method: 'post',
            url: '/api/UserType/ModifyUserRole?id=' + than.ruleForm.id + '&userRoleName=' + than.ruleForm
              .userRoleName,
          })
          .then((res) => {
            than.roleBased()
            than.dialogFormVisible = false;
            console.log(res)
            than.yanZhen(res)
          })

      },
      /*
        获取所有角色
      */
      roleBased() {
        var than = this;
        than.axios({
          url: '/api/UserType/GetUserRoles'
        }).then((res) => {
          this.tableData = res.data
          // console.log(res)
        })
      },
      /*
          添加角色
      */
      addStuBtn() {
        this.ruleForm.userRoleName = ""
        this.dialogTableVisible = true;
      },
      /*
        添加角色确定
      */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var than = this;
            than.axios({
              method: 'post',
              url: '/api/UserType/AddUserRole?userRoleName=' + than.ruleForm.userRoleName,

            }).then((res) => {
              this.roleBased()
              console.log(res)
              than.yanZhen(res)
              this.dialogTableVisible = false;
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
    },
    /*
      加载状态
    */
    created() {
      this.roleBased() //获取所有角色
    }
  }

</script>

<style scoped lang="less">

</style>
