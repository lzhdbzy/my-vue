<template>
  <div id="main">
    <el-container>
      <!-- 左边栏 -->
      <el-aside width="auto">
        <el-menu class="el-menu-vertical-demo" active-text-color="#ffd04b" :collapse="isCollapse" @select="tabadd"
          :default-active="$route.path" style="height: 1200px;
         overflow: hidden;">
          <div class="pi"><img src="../../assets/logo-1.png"></div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-family: 楷体;font-size: 17px;">在线测试</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/Testpaper">添加试卷 </el-menu-item>
              <el-menu-item index="/Home/Placement">布置考试 </el-menu-item>
              <el-menu-item index="/Home/Markingexam">批阅试卷 </el-menu-item>
              <el-menu-item index="/Home/examination">试卷维护 </el-menu-item>
              <el-menu-item index="/Home/Achievements">查看成绩 </el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="/Home" style="display:none">查看成绩 </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-family: 楷体;font-size: 17px;">基础数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Home/Change">修改密码</el-menu-item>
              <el-menu-item index="/Home/Management">班级管理</el-menu-item>
              <el-menu-item index="/Home/student">学生管理</el-menu-item>
              <el-menu-item index="/Home/Teacher">老师管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="padding: 0px;">
          <div class="top-left">
            <i class="el-icon-arrow-left" style="margin-top: 14px;" @click="trsfor"></i>
          </div>
          <div class="iconn">
              <i class="el-icon-user"></i>
            </div>
            <div class="stop">
                <span @click="stop">退出系统</span>
              </div>
          <div class="titlethere">  
            <div class="titsb">
              <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title"
                  :name="item.name" :closable="index==0?false:true">
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-header>
        <!-- 中间栏 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    // 数据
    data() {
      return {
        isCollapse: false, //控制伸缩图片的
        editableTabsValue2: '0', //标签页
        editableTabs: [{
          title: "首页",
          path: "/Home",
          name: " 0"
        }]
      }
    },
    // 方法
    methods: {
      //窗体的高度
      windowwid() {
        var h = window.innerHeight
        var main = document.getElementById("main")
        main.style.cssText = "height:" + h + "px;"
      },
      // 点击
      tabadd(path) {
        var ev = ev || event
        var index = this.findindex(ev.target.innerHTML) //查找元素是否已经存在
        if (index < 0) { //大于0则添加进去
          var contentmain = document.getElementsByClassName("el-header")
          var content = document.getElementsByClassName("el-tabs__item")
          var wid = 0
          for (var i = 0; i < content.length; i++) {
            wid += content[i].offsetWidth //offsetWidth实际宽度
          }
          if (wid > contentmain[0].offsetWidth - 200) { //判断长度不够可以再加
            this.$message({
              message: "标签不能再多了",
              type: "warning"
            })
          } else { //Number数字
            let newTabName = Number(this.editableTabs[this.editableTabs.length - 1].name) + 1 + ""
            var a = {
              title: ev.target.innerHTML, //名字
              path: path, //路劲
              name: newTabName //下标
            }
            this.editableTabsValue2 = newTabName;
            this.editableTabs.push(a) //点击那个添加进去
            console.log(this.editableTabs[1].title)
            var str = "[" //循环数组里面的信息点击那个添加进去。保存到会话存储里面
            for (var i = 0; i < this.editableTabs.length; i++) {
              str += "{title:'" + this.editableTabs[i].title + "',path:'" + this.editableTabs[i].path + "',name:'" +
                this.editableTabs[i].name + "'},"
            }
            str = str.substring(0, str.lastIndexOf(","))
            str += "]"
            sessionStorage.arr = str
            sessionStorage.path = this.editableTabs[this.removeindex(this.editableTabsValue2)].path
            sessionStorage.nvalue = this.editableTabsValue2
          }
        } else {
          this.editableTabsValue2 = this.editableTabs[index].name //标签页的下标名字
        }
      },
      // 退出登录
      stop() {
        this.$message({
          message: '你已退出系统',
          type: 'success'
        })
        this.$router.push('/')
        sessionStorage.clear()
      },
      // 图片伸缩
      trsfor() {
        var that = this;
        that.isCollapse = !that.isCollapse
        var iconer = document.getElementsByClassName("el-icon-arrow-left")
        if (!that.isCollapse) {
          iconer[0].classList.add("trsfor") //在元素中添加类名
        } else {
          iconer[0].classList.remove("trsfor") //否则在元素中删除类名
        }
      },
      findindex(name) { //查找元素是否已存在
        var index = 0
        //循环下标是否已经存在 不在则返回-1
        for (var i = 0; i < this.editableTabs.length; i++) {
          if (this.editableTabs[i].title == name) {
            index = i
            break
          } else {
            index = -1
          }
        }
        return index
      },
      // 删除
      removeTab(tab) {
        var that = this;
        var index = that.removeindex(tab)
        if (index == -1) return //判断没有就返回
        if (that.editableTabs[index].name != that.editableTabsValue2) { //判断如果删除tab在显示tab的左侧则只删除不跳转路由
          that.editableTabs.splice(index, 1)
        } else { //判断如果删除tab在显示tab的右侧则既删除跳转路由
          that.editableTabs.splice(index, 1)
          that.$router.push(that.editableTabs[index - 1].path) //标签页删除当前。减1 然后跳转当前路由
          that.editableTabsValue2 = that.editableTabs[index - 1].name
        }
        var arr = [] //声明一个数组
        arr = eval("(" + sessionStorage.getItem('arr') + ")") //会话存储里面查找arr
        arr.splice(index, 1) //删除
        sessionStorage.clear() //清空
        var str = "["
        for (var i = 0; i < arr.length; i++) {
          for (var i = 0; i < that.editableTabs.length; i++) {
            str += "{title:'" + that.editableTabs[i].title + "',path:'" + that.editableTabs[i].path + "',name:'" + that
              .editableTabs[i].name + "'},"
          }
          str = str.substring(0, str.lastIndexOf(","))
          str += "]"
        }
        sessionStorage.arr = str
        sessionStorage.path = that.editableTabs[index - 1].path
        sessionStorage.nvalue = that.editableTabsValue2
      },
      removeindex(tname) { //查找下标
        // 删除这里也查找下标看是否存在 不在则返回-1
        var that = this;
        var index = 0
        for (var i = 0; i < that.editableTabs.length; i++) {
          if (that.editableTabs[i].name == tname) {
            index = i
            break
          } else {
            index = -1
          }
        }
        return index
      }

    },
    watch: {
      editableTabsValue2: { //监听元素变化
        deep: false,
        handler(n, old) {
          var index = this.removeindex(n)
          var path = this.editableTabs[index].path //获取新路由
          this.$router.push(path) //跳转到新路由
          sessionStorage.path = path
          sessionStorage.nvalue = this.editableTabs[index].name
        }
      }
    },
    mounted() {
      this.windowwid();
      var uid = sessionStorage.getItem("uid")
      console.log(uid)
      if (sessionStorage.arr != undefined) {
        this.editableTabs = eval("(" + sessionStorage.getItem('arr') + ")")
        this.$router.push(sessionStorage.getItem("path"));
        this.editableTabsValue2 = sessionStorage.getItem("nvalue")
      }
    }
  }

</script>

<style scoped lang="less">
  * {
    padding: 0px;
  }

  .el-header {
    text-align: center;
    line-height: 60px;
    height: 70px;
  }

  .el-aside {
    background-color: rgba(117, 119, 121, 0.137) !important;
    overflow: hidden;
    height: 1000px;
  }

  .el-header {
    padding: 0px;
    height: 1000px;
    background-color: white;
    color: #333;
    text-align: center;
  }

  /*控制收缩*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    background-color: white !important;
    width: 200px;
    min-height: 1000px;
    overflow: hidden !important;
  }

  .el-menu {
    border: 0px solid;
  }

  /* 图片伸缩 */
  .trsfor {
    transform: rotateZ(180deg);
  }

  .pi {
    padding-top: 6px;
    background-color: rgb(153, 200, 245);
  }

  .top-left .el-icon-arrow-left {
    float: left;
    font-size: xx-large;
    /* 字体变大 */
    color: black !important;
    margin-top: auto;
    margin-bottom: auto;
  }

  .pi img {
    margin-left: 10px;
  }

  a {
    width: 200px;
    font-family: 楷体;
    text-decoration: none;
  }

  .iconn {
    color: black !important;
    font-size: 27px;
    float: right;
  }

  .stop {
    color: black !important;
    font-size: 23px;
    float: right;
    font-family: 宋体;
  }

  .el-menu-item-group__title {
    padding: -1px 0 7px 20px !important;
    line-height: normal;
    font-size: 12px;
    color: #909399;
  }

  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    min-width: 200px;
  }

  .titlethere {
    color: white;
    overflow: hidden;
  }

  .el-menu-item:focus,
  .el-menu-item:active,
  .el-menu-item:hover {
    outline: 1;
    background-color: #99c8f5;
  }

  .el-tabs--card>.el-tabs__header {
    border-right: 1px solid #E4E7ED !important;
  }
/* 背景 */
  .is-active{
    background-color: #99C8F5;
  }
  .el-submenu__title{
    background-color: white;
  }
  .el-submenu__title:focus, .el-submenu__title:hover {
    outline: 0;
    background-color: #ecf5ff !important;
}
</style>
