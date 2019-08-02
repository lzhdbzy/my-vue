<template>
  <div id="main">
    <el-container>
      <!-- 左边栏 -->
      <el-aside width="auto">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
          @select="tabadd" :default-active="$route.path" id="menu" style="height: 1200px;
         overflow: hidden;">
          <div class="pi"><img src="../../assets/logo-1.png"></div>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-family: 楷体;font-size: 17px;">在线测试</span>
            </template>
            <el-menu-item-group style="background-color:white; ">
              <el-menu-item>
                <router-link to="/Home/Testpaper">
                  <el-menu-item index="1-1" class="menus" @click="addTab(editableTabsValue2,0,'/Home/Testpaper')"
                    style="padding-left: 10px;font-size: 19px;">添加试卷
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/Placement">
                  <el-menu-item index="1-2" class="menus" @click="addTab(editableTabsValue2,1,'/Home/Placement')"
                    style="padding-left: 10px;font-size: 19px;">布置考试
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/Markingexam">
                  <el-menu-item index="1-3" class="menus" @click="addTab(editableTabsValue2,2,'/Home/Markingexam')"
                    style="padding-left: 10px;font-size: 19px;">批阅试卷
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/examination">
                  <el-menu-item index="1-4" class="menus" @click="addTab(editableTabsValue2,3,'/Home/examination')"
                    style="padding-left: 10px;font-size: 19px;">试卷维护
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/Achievements">
                  <el-menu-item index="1-5" class="menus" @click="addTab(editableTabsValue2,4,'/Home/Achievements')"
                    style="padding-left: 10px;font-size: 19px;">查看成绩
                  </el-menu-item>
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-family: 楷体;font-size: 17px">基础数据</span>
            </template>
            <el-menu-item-group style="background-color:white;padding: 0px !important">
              <el-menu-item>
                <router-link to="/Home/Change">
                  <el-menu-item index="2-1" class="menus" @click="addTab(editableTabsValue2,5,'/Home/Change')"
                    style="padding-left: 10px;font-size: 19px;">修改密码
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/Management">
                  <el-menu-item index="2-2" class="menus" @click="addTab(editableTabsValue2,6,'/Home/Management')"
                    style="padding-left: 10px;font-size: 19px;">班级管理
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/student">
                  <el-menu-item index="2-3" class="menus" @click="addTab(editableTabsValue2,7,'/Home/student')"
                    style="padding-left: 10px;font-size: 19px;">学生管理
                  </el-menu-item>
                </router-link>
              </el-menu-item>
              <el-menu-item>
                <router-link to="/Home/Teacher">
                  <el-menu-item index="2-4" class="menus" @click="addTab(editableTabsValue2,8,'/Home/Teacher')"
                    style="padding-left: 10px;font-size: 19px;">老师管理
                  </el-menu-item>
                </router-link>
              </el-menu-item>
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
        </el-header>
        <!-- 中间栏 -->
        <el-main>
          <el-tabs v-model="editableTabsValue2" type="card" @tab-remove="removeTab" @tab-click="Hop">
            <el-tab-pane v-for="(item, index) in editableTabs2" :key="index" :label="item.title" :name="item.name"
              :closable="item.closable"></el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  export default {
    // 数据
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        isCollapse: false, //控制伸缩图片的
        editableTabsValue2: '1', //标签页
        editableTabs2: [{
          title: '首页',
          path: '/Home',
          name: '1',
          closable: false
        }],
        tabIndex: 2,
        arr1: [
          "首页",
          "添加试卷",
          "布置试卷",
          "批阅试卷",
          "试卷维护",
          "查看成绩",
          "修改密码",
          "班级管理",
          "学生管理",
          "老师管理"
        ]
      };
    },
    // 方法
    methods: {
      handleOpen(key, keyPath) { //NavMenu 导航菜单自带的
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) { //NavMenu 导航菜单自带的
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) { //NavMenu 导航菜单自带的
        console.log(key, keyPath);
      },
      // 退出登录
      stop() {
        this.$message({
          message: '你已退出系统',
          type: 'success'
        })
        this.$router.push('/')
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
      // 点击添加传参
      addTab(targetName, index, rout) {
        var that = this;
        var rout = rout;
        console.log(rout)
        var num = document.getElementsByClassName("menus") //获取传参属性的Class值      获取别个的下标位置
        var texts = num[index].innerText; //获取位置
        // console.log(num[7].innerText)     
        var bool = false;
        var ins = 0;
        for (let i = 0; i < that.editableTabs2.length; i++) { //循环要遍历的值
          if (that.editableTabs2[i].title == texts) { //遍历的值等于获取到位置的值
            bool = false;
            ins = i;
            break; //结束
          } else {
            bool = true; //否则为true
          }
        }
        if (bool) { //如果为true  获取到的位置都添加进去
          let newTabName = ++this.tabIndex + "";
          this.editableTabs2.push({
            title: texts, //位置
            name: newTabName, //名字
            content: rout, //路由
            closable: true //删除
          });
          that.editableTabsValue2 = newTabName;
        } else {
          var id = that.editableTabs2[ins].title;
          var index = that.arr1.indexOf(id);
          index = index + 2;
          console.log(index)
          that.editableTabsValue2 = index + "";
        }
      },
      // 点击跳转路由
      Hop(targetName) {
        var that = this;
        var arr = [
          "/Home",
          "/Home/Testpaper",
          "/Home/Placement",
          "/Home/Markingexam",
          "/Home/examination",
          "/Home/Achievements",
          "/Home/Change",
          "/Home/Managemen",
          "/Home/student",
          "/Home/Teacher"
        ];
        var arr1 = [
          "首页",
          "添加试卷",
          "布置试卷",
          "批阅试卷",
          "试卷维护",
          "查看成绩",
          "修改密码",
          "班级管理",
          "学生管理",
          "老师管理"
        ];
        var name = targetName; //名字
        console.log(name.label);

        var index = arr1.indexOf(name.label); //查找名字
        that.$router.push({ //跳转路由
          path: arr[index] //路由名字
        })
      },
      // 删除
      removeTab(targetName) {
        var than = this;
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                console.log(nextTab);
                than.$router.push({
                  path: nextTab.content
                });
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      // 点击
      tabadd(path) {
        var ev = ev || event
        var index =this.findindex(ev.target.innerHtml)
        if(index<0){
          var conte=document.getElementsByClassName("el-main")
          var content=document.getElementsByClassName("el-tabs__item")
          var wid=0
          for(var i=0;i<content.length;i++){
              wid+=content[i].offsetWidth
          }
          if(wid>conte[0].offsetWidth-200){   //根据长度不够可以在加
              this.$message({
                message:"标签不能在多了",
                type:"warning"
              })
          }
        }
      },
      findindex(name){    //查找元素是否已经存在
          var index =0;
          for(var i =0;i<this.editableTabs2.length;i++){
              if(this.editableTabs2[i].title==name){
                index=i;
              break;
              }else{
                index=-1
              }
          }
          return index
      }
    }
  }

</script>

<style scoped lang="less">
  * {
    padding: 0px;
  }

  .el-header {
    background-color: rgba(3, 10, 20, 0.705);
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 70px;
  }

  .el-aside {
    background-color: rgba(117, 119, 121, 0.137) !important;
    overflow: hidden;
    height: 1000px;
  }

  .el-main {
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
    color: white;
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
    color: black;
  }

  .iconn {
    color: white;
    margin-right: 130px;
    font-size: 27px;
    float: right;
  }

  .stop {
    color: white;
    margin-right: 30px;
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

</style>
