import axios from "axios";
import {mapGetters} from 'vuex';
export default {
  name:'LoginPage',
  data () {
    return {
      userData: {
        email:'',
        password:'',
      },
      noUser:false
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
    login(){
      axios
      .post('http://localhost:8000/api/user/login',this.userData)
      .then((response)=>{
        if(response.data.token == null){
          this.noUser = true;
          console.log('there is no user');
        }else {
          this.storeUserInfo(response)
          this.noUser = false
          this.routeTo('homePage')
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    },
    storeUserInfo(response){
      this.$store.dispatch('setToken',response.data.token)
      this.$store.dispatch('setUserData',response.data.user)
    },
  }
}
