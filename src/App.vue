<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="less">
.el-menu-item{
  text-align: center;
  padding-left:0px !important;
}

body{
  padding: 0px !important;
  margin: 0px !important;
}
.el-menu-item-group__title {
  padding: 0px !important;
    line-height: 0px !important;
    font-size: 12px;
    color: #909399;
}
.el-tabs--card>.el-tabs__header {
    border-bottom: 1px solid #E4E7ED;
    border-right: 1px solid #E4E7ED;
}
el-submenu__title:focus{
  background-color: white;
}
.el-submenu__title{
    background-color: white !important;
  }
</style>
