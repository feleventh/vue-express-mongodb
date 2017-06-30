<template lang="pug">
  transition(name="boom")
    .edit-book
      el-card
        i.el-icon-close(@click="hiddenEditBook")
        el-form(label-width="65px" :model="bookForm" ref="bookForm" :rules="rules")
          h3 {{editBookTitle}}图书
          el-form-item(label="ISBN" prop="isbn")
            el-input(v-model="bookForm.isbn")
          el-form-item(label="书名" prop="name")
            el-input(v-model="bookForm.name")
          el-form-item(label="作者" prop="author")
            el-input(v-model="bookForm.author")
          el-form-item(label="出版社" prop="publisher")
            el-input(v-model="bookForm.publisher")
          el-form-item(label="单价" prop="price")
            el-input(v-model="bookForm.price")
          el-form-item
            el-button(@click="submitForm('bookForm')") 确定
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data: () => {
      return {
        rules: {
          isbn: [
            {
              required: true,
              message: 'ISBN不能为空',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '书名不能为空',
              trigger: 'blur'
            }
          ],
          author: [
            {
              required: true,
              message: '作者不能为空'
            }
          ],
          publisher: [
            {
              required: true,
              message: '出版社不能为空'
            }
          ],
          price: [
            {
              required: true,
              message: '价格不能为空'
            },
            {
              pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/,
              message: '价格格式不正确'
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['bookForm', 'editBookTitle', 'booksData', 'modifyIndex', 'beforeModifyData'])
    },
    methods: {
      ...mapMutations(['login', 'logout', 'hiddenEditBook']),
      submitForm: function (formName) {
        const formData = {
          isbn: String.prototype.trim.call(this.bookForm.isbn),
          name: String.prototype.trim.call(this.bookForm.name),
          author: String.prototype.trim.call(this.bookForm.author),
          publisher: String.prototype.trim.call(this.bookForm.publisher),
          price: String.prototype.trim.call(this.bookForm.price)
        }
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (that.editBookTitle === '添加') {
              that.$http.post('/api/book/addBook', formData)
                .then((response) => {
                  console.log('success')
                  console.log(response.data)
                  that.booksData.push(formData)
                  that.hiddenEditBook()
                })
            } else {
              that.$http.post('/api/book/modifyBook', {
                beforeModifyData: that.beforeModifyData,
                modifiedData: formData
              })
                .then((response) => {
                  if (response.data === 'success') {
                    that.booksData[that.modifyIndex].isbn = formData.isbn
                    that.booksData[that.modifyIndex].name = formData.name
                    that.booksData[that.modifyIndex].author = formData.author
                    that.booksData[that.modifyIndex].publisher = formData.publisher
                    that.booksData[that.modifyIndex].price = formData.price
                    that.hiddenEditBook()
                  }
                })
//              console.log(that.beforeModifyData)
//              console.log(that.modifyIndex)
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .edit-book{
    width: 440px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    color: #415f83;
    .el-form-item{
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .el-icon-close{
      /*position: absolute;*/
    }
    h3{
      margin: 12px 0;
      color: #415f83;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
