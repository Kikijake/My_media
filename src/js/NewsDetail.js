import axios from "axios";
import {mapGetters} from 'vuex';

export default {
  name:'NewsDatail',
  data() {
    return {
      postId:0,
      postLists: {},
      viewCount: 0,
      loading:false
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
    loadPost (id) {
      let post={
        postId: id
      }
      axios
      .post('http://localhost:8000/api/post/detail',post)
      .then((response)=>{
        this.postLists = response.data.post
        if(this.postLists.image != null){
          this.postLists.image = 'http://localhost:8000/postImage/'+this.postLists.image
        }else{
          this.postLists.image = 'assets/img/news/image_not_available.png'
        }
      })
    },
    back(){
      this.$router.push({name:'homePage'})
    },
    viewCountLoad(){
      let data = {
        userId : this.storageUserData.id.toString(),
        postId : this.$route.query.newsId
      }
      this.loading = true;
      axios
      .post('http://localhost:8000/api/post/actionlog',data)
      .then((response)=>{
        this.viewCount = response.data.view.length
        this.loading = false
      })
    }
  },
  mounted(){
    this.viewCountLoad()
    this.postId = this.$route.query.newsId
    this.loadPost(this.postId)
  }
}