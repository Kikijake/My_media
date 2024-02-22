<template>
  <div>
    
    <div class="d-flex justify-content-center py-3">
      <p class="btn btn-danger text-white mr-4" @click="routeTo('homePage')">Home</p>
    </div>
    <div class="container col-3">
      <legend>Login</legend>
      <small class=" text-danger" v-if="noUser"> The Credential do not Match! </small>
      <form class=" my-4">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="userData.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="userData.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-on:keyup.enter="login()">
        </div>
        <button type="button" class="btn btn-danger" @click="login()">Submit</button>
      </form>
    </div>
  </div>
</template>

<script src="../js/LoginPage.js"></script>

<style lang="stylus" scoped>

</style>
