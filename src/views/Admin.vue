<template lang="pug">
  .app

    h3 图书馆里系统
    el-row(:gutter="20")
      el-col(:span="6")
        el-menu(router default-active="bookOverview")
          el-menu-item(index="bookOverview") 图书概览
          el-menu-item(index="bookManage") 图书管理
      el-col(:span="18")
        router-view(name="bookMain")
</template>
<script>
  import ElMenu from '../../node_modules/element-ui/packages/menu/src/menu'
  export default{components: {ElMenu}}
</script>
<style scoped lang="less">
  .app{
    margin: auto;
  }
</style>
