<template lang="pug">
  div.bookMain
    h3 图书概览
    el-button(@click="addBook") 添加图书
    edit-book(v-if="editBookShow")
    el-table(:data="booksData" stripe style="width: 96%" empty-text="暂无数据")
      el-table-column(prop="isbn" label="ISBN" header-align="center" width="140px")
      el-table-column(prop="name" label="书名" header-align="center" width="200px")
      el-table-column(prop="author" label="作者" header-align="center" width="200px")
      el-table-column(prop="publisher" label="出版社" header-align="center" width="200px")
      el-table-column(prop="price" label="价格" header-align="center" width="90px")
      el-table-column(label="操作" header-align="center")
        template(scope="scope")
          i.el-icon-edit(@click.prevent="editRow(scope.$index, booksData)")
          i.el-icon-delete(@click.prevent="deleteRow(scope.$index, booksData)")
</template>
<script>
  import EditBook from '../components/EditBook.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default{
    name: 'bookOverview',
    data: () => {
      return {
      }
    },
    computed: {
      ...mapGetters(['editBookShow', 'booksData'])
    },
    created: function () {
      this.updateBooksData()
    },
    methods: {
      ...mapActions(['updateBooksData']),
      addBook: function () {
        this.showEditBook({titleName: '添加'})
      },
      deleteRow: function (index, rows) {
        rows.splice(index, 1)
        console.log(rows[index - 1])
        this.$http.post('/api/book/deleteBook', {name: rows[index - 1].name, publisher: rows[index - 1].publisher})
      },
      editRow: function (index, rows) {
        this.showEditBook({titleName: '修改'})
        this.saveModifyIndex(index)
        this.getBookData(rows[index])
      },
      ...mapMutations(['showEditBook', 'hiddenEditBook', 'getBookData', 'saveModifyIndex'])
    },
    components: {
      EditBook
    }
  }
</script>
<style lang="less">
  .bookMain{
    padding: 20px;
    .el-icon-edit{
      margin-right: 10px;
      cursor: pointer;
    }
    .el-icon-delete{
      cursor: pointer;
    }
  }
</style>
