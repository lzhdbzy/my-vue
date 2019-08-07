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
          <span style="margin-left: 10px">{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="老师编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classTeacherId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="老师名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classCourseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级人数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classStudents }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级创建日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classCreateTime.substring(0,10) }}</span>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
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
      GetAllClass(){
        var than = this
        var toke = sessionStorage.getItem("token_type");
        than.axios.defaults.headers.Authorization = toke;
        this.axios({
          url: '/api/Class/GetAllClass'
        }).then((res) => {
          this.tableData = []
          for (let cart of res.data) {
            this.tableData.push(cart)
          }
        })
      }
    },
    created() {
      this.GetAllClass()
    }
  }

</script>

<style scoped lang="less">

</style>
