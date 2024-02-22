import axios from "axios";
import {mapGetters} from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      postLists: {},
      categoryLists: {},
      searchKey:'',
      tokenStatus: false
    }
  },
  computed: {
    ...mapGetters(['storageToken','storageUserData']),
  },
  methods: {
    routeTo(rName){
      this.$router.push({
        name:rName
      })
    },
    logout(){
      this.$store.dispatch('setToken',null)
      this.routeTo('login')
    },
    getAllPost(){
      axios.get('http://localhost:8000/api/allPostList').then((response) => { 
        this.postLists = response.data.post
        this.postLists.forEach(list => {
          if(list.image != null){
            list.image = 'http://localhost:8000/postImage/'+list.image
          }else{
            list.image = 'assets/img/news/image_not_available.png'
          }
        });
      })
    },
    loadCategory(){
      axios
        .get('http://localhost:8000/api/allCategory')
        .then((response) => { 
          this.categoryLists = response.data.category
        })
        .catch((error)=>{
          console.log(error)
        })
    },
    search(){
      let search = {
        key : this.searchKey
      }
      axios
        .post('http://localhost:8000/api/post/search',search)
        .then((response)=>{
          this.postLists=response.data.searchData
          this.postLists.forEach(list => {
            if(list.image != null){
              list.image = 'http://localhost:8000/postImage/'+list.image
            }else{
              list.image = 'assets/img/news/image_not_available.png'
            }
          });
        }
        )
    },
    categorySearch(searchKey){
      let search = {
        key:searchKey
      }
      axios.post('http://localhost:8000/api/category/search',search)
      .then((response)=>{
        this.postLists=response.data.searchData
        this.postLists.forEach(list => {
          if(list.image != null){
            list.image = 'http://localhost:8000/postImage/'+list.image
          }else{
            list.image = 'assets/img/news/image_not_available.png'
          }
        });
      }
      )
      .catch((error)=>{
        console.log(error)
      })
    },
    newsDetail(id){
      this.$router.push({
        name: 'newsDetail',
        query:{
          newsId: id
        }
      })
    },
    checkToken(){
      if(this.storageToken != null && this.storageToken != undefined && this.storageToken != ''){
        this.tokenStatus = true
      }else {
        this.tokenStatus = false
      }
    }
  },
  mounted() {
    this.checkToken()
    this.getAllPost()
    this.loadCategory()
}
}