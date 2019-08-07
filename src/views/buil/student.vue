<template>
  <div id="main">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="班级名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生年龄" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuBirthDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuSex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stuPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    //数据
    data() {
      return {
        tableData: [],
        stuUid: "",
        classId: ""
        // stuUid: "", //学生唯一标识符    
        // className:"" ,    //班级名称
        // classId:"",   //班级编号
        // stuName:"",   //学生姓名
        // stuAge:"",    //学生年龄
        // stuBirthDay:"",   //生日
        // stuMobile:"",   //手机号
        // stuSex:"",    //性别
        // stuPassword:"",   //密码
      }
    },
    // 方法
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      Studentt(classId) {
        var than = this
        var toke = sessionStorage.getItem("token_type");
        than.axios.defaults.headers.Authorization = toke;
        than.axios({
          url: "/api/Student/GetClassStudent",
          params: {
            classId: classId
          },
        }).then((res) => {
          console.log(res.data)
          this.tableData = []
          for (let cart of res.data) {
            this.tableData.push(cart)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 加载
    created() {
      this.Studentt();
    },
  }

</script>
<style scoped lang="less">

</style>
