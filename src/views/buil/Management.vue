<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="text-align: center;margin-right: 260px">
      <el-button type="success" icon="el-icon-plus" @click="addClasss()">新增班级</el-button>
    </el-row>

    <el-row>
      <!-- <el-button v-for="(item,index) in ClassCourseId" :key="index" @click="select">{{item.courseName}}</el-button> -->
    </el-row>

    <el-table :data="tableData">
      <el-table-column prop="classId" label="班级主键编号"></el-table-column>
      <el-table-column prop="className" label="班级名称"></el-table-column>
      <el-table-column prop="userName" label="授课老师"></el-table-column>
      <el-table-column prop="courseName" label="班级课程"></el-table-column>
      <el-table-column prop="classStudents" label="班级人数"></el-table-column>
      <el-table-column label="开班时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.classCreateTime.substring(0,10)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" :disabled="tableData[scope.$index].disableDelete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改信息 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="Classname">
          <el-select v-model="ruleForm.Classname" placeholder="请选择班级名称">
            <el-option :key="index" :value="item.className" v-for="(item,index) in classsmg"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程编号" prop="uesrBook">
          <el-select placeholder="请选择课程编号" v-model="ruleForm.uesrBook">
            <el-option v-for="(item,index) in ClassCourseId" :key="index" :value="item.courseId"
              :label="item.courseName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老师编号" prop="classTeacherId">
          <el-select v-model="ruleForm.classTeacherId" placeholder="请选择老师编号">
            <el-option v-for="(item,index) in classtearchid" :key="index" :value="item.userId" :label="item.userName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormm('ruleForm')">确 定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改结束 -->
    <!-- 新增班级 -->
    <el-dialog title="添加班级" :visible.sync="dialogTableVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="班级名称" prop="Classname">
          <el-input v-model="ruleForm.Classname"></el-input>
        </el-form-item>
        <el-form-item label="课程选择" prop="uesrBook">
          <el-select v-model="ruleForm.uesrBook" placeholder="请选择">
            <el-option v-for="item in ClassCourseId" :key="item.courseId" :label="item.courseName"
              :value="item.courseId" clearable></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课老师" prop="Teacher">
          <el-select v-model="ruleForm.Teacher" placeholder="请选择">
            <el-option v-for="item in classtearchid" :key="item.userUid" :label="item.userName" :value="item.userId"
              clearable></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增班级结束结束 -->
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [], //渲染班级的数组
        classsmg: [], //班级
        ClassCourseId: [], //课程id
        classtearchid: [], //教师信息
        dialogFormVisible: false, //新增显示与隐藏
        dialogTableVisible: false, //修改的显示与隐藏
        ruleForm: {
          classid: "", //班级ID
          Classname: "", //班级名称
          uesrBook: "", //课程编号
          classTeacherId: "" //老师编号
        },
        rules: {
          Classname: [{
            required: true,
            message: '请输入老师名称',
            trigger: 'change'
          }, ],
          uesrBook: [{
            required: true,
            message: '请选择课程',
            trigger: 'change'
          }, ],
          classTeacherId: [{
            required: true,
            message: '请选择授课老师',
            trigger: 'change'
          }, ],
        }
      };
    },
    methods: {
      /*
        选中课程
      */

      /*
        获取所有班级信息
      */
      GetAllClass() {
        var than = this;
        var toke = sessionStorage.getItem("token_type");
        than.axios.defaults.headers.Authorization = toke;
        than.axios
          .get("/api/Class/GetAllClass")
          .then(response => {
            this.tableData = response.data;
          })
      },
      /*
            删除班级
          */
      handleDelete(index, row) {
        this.axios({
          url: '/api/Class/RemoveClass',
          params: {
            classId: row.classId
          }
        }).then((res) => {
          this.yanZhen(res) //验证信息
          this.GetAllClass()
        })
      },
      /*
          点击弹出编辑框
      */
          handleEdit(index, row) {
            console.log(row)
            var than = this;
            than.dialogFormVisible = true;
            than.ruleForm.Classname = row.className
            than.ruleForm.uesrBook = row.classCourseId
            than.ruleForm.classTeacherId = row.classTeacherId
            than.ruleForm.classid = row.classId
          },
          /*
        修改确定
      */
      submitFormm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var than = this;
            console.log(than.ruleForm)
            than.axios
              .post("/api/Class/ModifyClass", {
                classId: than.ruleForm.classid, //要修改的班级主键
                className: than.ruleForm.Classname, //要修改的班级名称
                classCourseId: than.ruleForm.uesrBook, //课程编号
                classTeacherId: than.ruleForm.classTeacherId, //老师编号
              })
        
              .then(res => {
                this.yanZhen(res)
                this.dialogFormVisible = false;
                this.GetAllClass()
              })
          } else {
            return false;
          }
        });

      },
      /*
         获取所有的课程
       */
      addcourses() {
        var than = this;
        than.axios
          .get("/api/Class/GetAllCourse")
          .then(response => {
            this.ClassCourseId = response.data;
          })
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
          获取所有班级信息
      */
      getclasssmg() {
        var than = this;
        than.axios
          .get("/api/Class/GetAllClass")
          .then(response => {
            this.classsmg = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      /*
         获取所有老师信息
       */
      addTeacher() {
        var than = this;
        than.axios
          .get("/api/User/GetTeachers")
          .then(response => {
            this.classtearchid = response.data;
          })
          .catch(err => {
            console.log(err);
          });
      },
      /*
         添加班级
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var than = this;
            than.axios({
              method: 'post',
              url: '/api/Class/AddClass',
              data: {
                "ClassName": than.ruleForm.Classname, //班级名称
                "ClassCourseId": than.ruleForm.uesrBook, //课程编号
                "ClassTeacherId": than.ruleForm.Teacher //老师编号
              }
            }).then((res) => {
              this.yanZhen(res)
              than.dialogTableVisible = false;
              than.GetAllClass()
            })

          } else {
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*
          新增班级清空属性并重新赋值
      */
      addClasss() {
        var than = this;
        this.dialogTableVisible = true;
        than.ruleForm.Classname = ""
        than.ruleForm.uesrBook = ""
        than.ruleForm.Teacher = ""
      }
    },

    /*
        加载事件
    */
    created() {
      this.GetAllClass(); //获取所有的班级信息
      this.addcourses(); //获取所有的课程信息
      this.getclasssmg(); //获取所有的班级信息
      this.addTeacher(); //获取所有的老师信息
    }
  };

</script>
<style scopen>
  el-main {
    width: 200px;
  }

  .el-button+.el-button {
    margin-left: 0 !important;
  }

</style>
