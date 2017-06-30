import axios from 'axios'
const state = {
  editBookShow: false,
  editBookTitle: '',
  bookForm: {
    isbn: '',
    name: '',
    author: '',
    publisher: '',
    price: '',
    _id: ''
  },
  modifyIndex: 0,
  booksData: [],
  beforeModifyData: {}
}

const getters = {
  editBookShow: state => state.editBookShow,
  bookForm: state => state.bookForm,
  editBookTitle: function (state) {
    return state.editBookTitle
  },
  booksData: state => state.booksData,
  modifyIndex: state => state.modifyIndex,
  beforeModifyData: state => state.beforeModifyData
}

const mutations = {
  showEditBook: (state, data) => {
    state.editBookShow = true
    state.editBookTitle = data.titleName
  },
  hiddenEditBook: (state) => {
    state.editBookShow = false
    if (state.editBookTitle === '修改') {
      state.bookForm.isbn = ''
      state.bookForm.name = ''
      state.bookForm.author = ''
      state.bookForm.publisher = ''
      state.bookForm.price = ''
      state.bookForm._id = ''
    }
  },
  getBookData: (state, data) => {
    state.bookForm.name = data.name
    state.bookForm.author = data.author
    state.bookForm.publisher = data.publisher
    state.bookForm.price = data.price
    state.beforeModifyData = data
  },
  saveModifyIndex: (state, num) => {
    state.modifyIndex = num
  }
}

const actions = {
  updateBooksData: (context) => {
    return axios.get('/api/book/getBooks')
      .then((res) => {
        state.booksData = res.data
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}

export default {
  state, getters, mutations, actions
}
