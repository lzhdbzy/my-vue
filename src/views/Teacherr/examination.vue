<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 新增 -->
    <el-row style="text-align: center;margin-right: 260px">
      <!-- 下拉选择班级 -->
      <el-select v-model="Classname" class="sClass" filterable default-first-option placeholder="请选择班级"
        @change="select">
        <el-option v-for="item in classarr" :key="item.className" :label="item.className" :value="item.classId">
        </el-option>
      </el-select>
      <el-button type="success" icon="el-icon-plus" @click="addStuBtn()">新增学生</el-button>
    </el-row>


    <!-- 渲染信息页面 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="className" label="班级名称"></el-table-column>
      <el-table-column prop="classId" label="班级编号"></el-table-column>
      <el-table-column prop="stuName" label="学生姓名"></el-table-column>
      <el-table-column prop="stuAge" label="学生年龄"></el-table-column>
      <el-table-column prop="stuSex" label="性别"></el-table-column>
      <el-table-column prop="stuMobile" label="手机号"></el-table-column>
      <el-table-column label="生日">
        <template slot-scope="scope">
          <span>{{ scope.row.stuBirthDay.substring(0,10)}}</span>
        </template>
      </el-table-column>
      
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" style="margin-left:0px" type="danger"
              :disabled="tableData[scope.$index].disableDelete" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      
    </el-table>
    <!-- 渲染信息页面结束 -->

    <!-- 添加学生 -->
    <el-dialog title="添加" :visible.sync="dialogTableVisible">
      <el-form :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="stuName"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="addClassName">
          <el-select v-model="addClassName" placeholder="请选择班级编号">
            <el-option v-for="item in classarr" :key="item.classId  " :label="item.className" :value="item.classId ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="stuMobile">
          <el-input v-model="stuMobile"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="stuBirthDay">
          <el-date-picker v-model="stuBirthDay" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-select v-model="stuSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="stuPassword">
          <el-input v-model="stuPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改按钮-->
    <!-- <el-dialog title="修改老师信息" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </div>


</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        stuName: "", //添加-学生姓名
        addClassName: "", //添加-班级名称
        stuBirthDay: "", //添加-学生生日
        stuMobile: "", //添加-手机号
        stuPassword: "", //添加-登录密码
        stuSex: "", //添加-性别
        Classname: "",
        classarr: [], //班级选项
        classId: "", //通过班级ID来查找改班级的学生
        rules: {
          stuName: [{
            required: true,
            message: '请输入学生姓名',
            trigger: 'blur'
          }],
          addClassName: [{
            required: true,
            message: '请选择班级编号',
            trigger: 'blur'
          }],
          stuMobile: [{
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
          stuPassword: [{
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
          stuBirthDay: [{
            required: true,
            message: '请选择生日',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      select(content) {
        // var classid = this.classarr.filter(value => value.className == content)
        // this.classId = this.classid[0].classId
        console.log(this.content)
        // this.addTeacher(this.classId)
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
           添加学生按钮
       */
      addStuBtn() {
        this.dialogTableVisible = true;
      },
      /*
        添加确定
      */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {} else {
            return false;
          }
        });
        var that = this;
        this.axios({
          method: 'post',
          url: '/api/Student/AddStudent',
        })
      },
      resetForm(formName) {
        var that = this;
        that.$refs[formName].resetFields();
      },
      /*
        修改按钮
      */
      handleEdit(index, row) {

      },
      /*
      修改确定
      */

      /*
        获取班级的所有信息
      */
      addTeacher(classId) {
        var than = this;
        
   
        than.$http.get('/api/Student/GetClassStudent?classId='
        +than.classId).then((res) => {
        
          console.log(res.data)
          than.tableData = res.data
        })
      },
      /*
          获取班级信息
      */
      getclasssmg() {
        var than = this;
        than.axios
          .get("/api/Class/GetAllClass")
          .then(response => {
            console.log(response.data);
            this.classarr = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      },

      /*
        清空弹出框的值  
      */
      addTeach() {

      },
    },
    //加载
    created() {
      this.addTeacher() //获取班级所有信息
      this.getclasssmg() //获取班级所有信息
    },
  }

</script>

<style scoped lang="less">
</style>
