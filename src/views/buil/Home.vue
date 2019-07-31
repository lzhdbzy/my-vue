<template>
  <div>
      <router-link to="/Home">首页</router-link><p></p>
      <router-link to="/Home/Change">修改密码</router-link><p></p>
      <router-link to="/Home/student">学生管理</router-link><p></p>
      <router-link to="/Home/Teacher">老师管理</router-link><p></p>
      <router-link to="/Home/Management">班级管理</router-link><p></p>
      <router-link to="/Home/Testpaper">添加试卷</router-link><p></p>
      <router-link to="/Home/Placement">布置考试</router-link><p></p>
      <router-link to="/Home/Markingexam">批阅试卷</router-link><p></p>
      <router-link to="/Home/examination">试卷维护</router-link><p></p>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped lang="less">

</style>
