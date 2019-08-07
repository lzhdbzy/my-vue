<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="text-align: center;margin-right: 260px">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">新增班级</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="班级名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.className}}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.classId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="老师编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.classTeacherId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="老师名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.classCourseId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.courseName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级人数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.classStudents}}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级创建日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.classCreateTime.substring(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" style="margin-left:0px" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增班级-->
    <div class="increased">
      <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="班级名称" :label-width="formLabelWidth" style="margin-left: 100px;">
            <el-input v-model="form.className" autocomplete="off" style="width: 415px;"></el-input>
          </el-form-item>
          <el-form-item label="课程编号" :label-width="formLabelWidth" style="margin-left: 100px;">
            <el-select v-model="form.book" placeholder="请选择" style="width: 415px;">
              <el-option v-for="item in options" :key="item.courseId" :label="item.courseName" :value="item.courseId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="老师编号" :label-width="formLabelWidth" style="margin-left: 100px;">
            <el-select v-model="form.book" style="width: 415px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTeach">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [], //渲染班级的数组
        dialogFormVisible: false, //新增班级显示与隐藏
        form: {
          className: '',
          book: '',
          teach: '',
        },
        options: [], //课程
        formLabelWidth: '100px'
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },

      handleDelete(index, row) {
        console.log(index, row);
      },
      // 获取所有的班级信息
      GetAllClass() {
        var than = this
        var toke = sessionStorage.getItem("token_type");
        than.axios.defaults.headers.Authorization = toke;
        this.axios({
          url: '/api/Class/GetAllClass'
        }).then((res) => {
          than.tableData = []
          for (let cart of res.data) {
            than.tableData.push(cart)
          }
        })
      },
      //添加班级
      addTeach() {
        let than = this;
        than.dialogFormVisible = false;
        var clas = {
          className: than.form.className,       //班级名称
          classCourseId: than.form.book,        //课程编号
          classTeacherId: than.form.book       //老师编号
        }
        than.axios({
          method: 'post',
          url: '/api/Class/AddClass',

        }).then((res) => {
          console.log(res.data)
        })
      },
      // 获取所有的课程
      addcourses() {
        var than = this;
        than.axios({
          url: '/api/Class/GetAllCourse'
        }).then((res) => {
          console.log(res.data)
          than.options = res.data
        })
      }
    },
    created() {
      this.GetAllClass()
      this.addcourses()
    }
  }

</script>

<style scoped lang="less">
</style>
