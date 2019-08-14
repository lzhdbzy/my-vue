<template>
  <div id="main">
    <!-- 添加学生 -->
    <el-button class="el-icon-circle-plus-outline" type="primary" plain @click="addStuBtn()">添加学生</el-button>
    <!-- 班级下拉列表 -->
    <el-select v-model="className" class="sClass" filterable default-first-option placeholder="请选择班级" @change="select">
      <el-option v-for="item in classarr" :key="item.classId" :label="item.className" :value="item.className">
      </el-option>
    </el-select>
    <!-- 搜索 -->
    <el-input v-model="search" size="medium " class="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
    <el-table :data="arr.slice((paging-1)*pagingSize,paging*pagingSize)">
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
          <el-button size="mini" @click="madifystu(scope.$index,scope.row)">修改</el-button>
          <el-button size="mini" style="margin-left:0px" type="danger" @click="delopen(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加学生 -->
    <el-dialog title="添加学生" :visible.sync="dialogTableVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="ruleForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="addClassName">
          <el-select v-model="ruleForm.addClassName" placeholder="请选择班级编号">
            <el-option v-for="item in classarr" :key="item.classId  " :label="item.className" :value="item.classId ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="stuMobile">
          <el-input v-model="ruleForm.stuMobile"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="stuBirthDay">
          <el-date-picker v-model="ruleForm.stuBirthDay" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-select v-model="ruleForm.stuSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="stuPassword">
          <el-input v-model="ruleForm.stuPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 结束添加学生 -->

    <!-- 修改学生信息 -->
    <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="ruleForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="addClassName">
          <el-select v-model="ruleForm.addClassName" placeholder="请选择班级编号">
            <el-option v-for="item in classarr" :key="item.classId  " :label="item.className" :value="item.classId ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="stuMobile">
          <el-input v-model="ruleForm.stuMobile"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="stuBirthDay">
          <el-date-picker v-model="ruleForm.stuBirthDay" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-select v-model="ruleForm.stuSex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="stuPassword">
          <el-input v-model="ruleForm.stuPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormm()">确定</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 结束修改学生信息 -->
    <!-- 分页 -->
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="arr.length" :page-size="pagingSize"
        @current-change="pagingg">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    // 数据
    data() {
      return {
        paging: 1, //分页
        pagingSize: 6, //分页长度
        classarr: [], //班级选项
        arr: [], //渲染到页面的数据
        arrs: [], //储存全部调取过来的数据
        className: "", //班级下拉列表
        search: "", //搜索框
        classId: "", //通过班级ID来查找改班级的学生
        dialogTableVisible: false, //隐藏添加学生按钮
        dialogFormVisible: false, //隐藏修改学生
        uid: "", //要删除学生的唯一标识符

        ruleForm: {
          stuName: "", //添加-学生姓名
          addClassName: "", //添加-班级名称
          stuBirthDay: "", //添加-学生生日
          stuMobile: "", //添加-手机号
          stuPassword: "", //添加-登录密码
          stuSex: "", //添加-性别
          stuUid: "", //要修改学生的唯一标识符
        },
        rules: {
          stuName: [{
            required: true,
            message: '请输入学生姓名',
            trigger: 'change'
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
          stuSex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          addClassName: [{
            required: true,
            message: '请选择班级',
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
    // 方法
    methods: {
      select(content) { //选中班级渲染
        var classid = this.classarr.filter(value => value.className === content)
        this.classId = classid[0].classId
        console.log(content) //获取下标
        this.stuInfo(this.classId)
      },
      /*
        改变时触发这个事件
      */
      pagingg(index) {
        this.paging = index
      },
      /*
        获取班级里面全部信息
      */
      stuInfo(classId) {
        this.axios({
          url: "api/Student/GetClassStudent",
          params: {
            classId: classId
          },
        }).then((res) => {
          this.arr = res.data
          this.arrs = this.arr
        })
      },
      /*
        清空学生添加信息
      */
      addStuBtn() {
        var than = this;
        than.ruleForm.stuName = "",
          than.ruleForm.addClassName = "",
          than.ruleForm.stuBirthDay = "",
          than.ruleForm.stuMobile = "",
          than.ruleForm.stuPassword = "",
          than.ruleForm.stuSex = ""
        this.dialogTableVisible = true;
      },

      /*
        修改学生
      */
      madifystu(scope, row) {
        var than = this;
        than.ruleForm.stuName = row.stuName,
          than.ruleForm.addClassName = row.classId,
          than.ruleForm.stuBirthDay = row.stuBirthDay,
          than.ruleForm.stuMobile = row.stuMobile,
          than.ruleForm.stuPassword = row.stuPassword,
          than.ruleForm.stuSex = row.stuSex,
          than.ruleForm.stuUid = row.stuUid
        this.dialogFormVisible = true;
      },
      /*
          修改学生确定
      */
      submitFormm() {
        var than = this;
        than.axios({
          method: 'post',
          url: '/api/Student/ModifyStudent',
          data: than.ruleForm
        }).then((res) => {
          console.log(res)
          this.stuInfo(this.classId)
          than.yanZhen(res)
          this.dialogFormVisible = false;
        })
      },
      /*
        添加学生确定
      */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var than = this;
            than.axios({
              url: '/api/Student/AddStudent',
              method: 'post',
              data: {
                StuName: than.ruleForm.stuName,
                StuClassId: than.ruleForm.addClassName,
                StuBirthDay: than.ruleForm.stuBirthDay,
                StuMobile: than.ruleForm.stuMobile,
                StuPassword: than.ruleForm.stuPassword,
                StuSex: than.ruleForm.stuSex
              }
            }).then((res) => {
              than.classInfo() //调用全部班级
              than.dialogTableVisible = false;
              than.yanZhen(res) //验证信息
              than.stuInfo(this.classId) //获取班级里面全部信息
              console.log(res)
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
      弹出删除弹框
      */
      delopen(tid) {
        this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delStuInfo(tid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*
          删除学生
      */
      delStuInfo(tid) {
        var than = this;
        than.axios({
          url: '/api/Student/RemoveStudent',
          params: {
            uid: tid.stuUid
          }
        }).then((res) => {
          console.log(res)
          this.classInfo()
          this.yanZhen(res)
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
      获取班级信息
      */
      classInfo() {
        this.axios({
          url: "api/Class/GetAllClass",
        }).then((res) => {
          this.classarr = res.data
          this.className = this.classarr[0].className
          this.classId = this.classarr[0].classId
          this.stuInfo(this.classId)
        })
      },
    },
    /*
        加载事件
    */
    created() {
      this.classInfo() //获取班级信息
    },
    /*
      事件监听
    */
    watch: {
      search(n, old) {
        this.arr = this.arrs //先等于储存的全部班级数据
        this.arr = this.arr.filter(value => value.stuName.indexOf(n) != -1 || value.stuMobile.indexOf(n) != -1 || value
          .stuSex.indexOf(n) != -1)
      }
    }
  }

</script>

<style scoped>
  .search {
    width: 240px;
    margin-left: 1rem;
  }

  .sClass {
    margin-left: 1rem;
  }

  .page {
    width: 80%;
    display: flex;
    position: fixed;
  }

  .el-pagination {
    font-size: 19px;
    margin: auto;
  }

</style>
