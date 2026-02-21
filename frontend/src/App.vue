<template>
  <NavBar />
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import NavBar from "@/components/NavBar.vue";
import $ from 'jquery';

export default {
  name: 'App',
  components: { NavBar },
  setup() {
    $.ajax({
      url: "http://localhost:3000/user/account/register/",
      type: "post",
      data: {
        username: "ppp",
        password: "456",
        confirmedPassword: "456"
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });
  }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
