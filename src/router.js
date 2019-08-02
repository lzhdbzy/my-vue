import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Change from './views/buil/Change.vue'
import Management from './views/buil/Management.vue'
import student from './views/buil/student.vue'
import Teacher from './views/buil/Teacher.vue'
import Home from './views/buil/Home.vue'
import Testpaper from './views/Teacherr/Testpaper.vue'
import Placement from './views/Teacherr/Placement.vue'
import Markingexam from './views/Teacherr/Markingexam.vue'
import examination from './views/Teacherr/examination.vue'
import Achievements from './views/Teacherr/Achievements.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',     //登录
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: 'Change',   
          name: 'Change',       //修改密码
          component: Change
        },
        {
          path: 'Management',     //班级管理
          name: 'Management',
          component: Management
        },
        {
          path: 'student',      //学生管理
          name: 'student',
          component: student
        },
        {
          path: 'Teacher',        //老师管理
          name: 'Teacher',
          component: Teacher
        },
        {
          path: 'Testpaper',        //添加试卷
          name: 'Testpaper',
          component: Testpaper
        },
        {
          path: 'Placement',        //布置考试
          name: 'Placement',
          component: Placement
        },
        {
          path: 'Markingexam',        //批阅试卷
          name: 'Markingexam',
          component: Markingexam
        },
        {
          path: 'examination',        //试卷维护
          name: 'examination',
          component: examination
        },
        {
          path: 'Achievements',        //试卷维护
          name: 'Achievements',
          component: Achievements
        }
      ]
    }
  ]
})
