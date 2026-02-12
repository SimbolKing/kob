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
      url: "http://localhost:3000/user/account/token/",
      type: "post",
      data: {
        username: 'jsb',
        password: '123',
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });

    $.ajax({
      url: "http://localhost:3000/user/account/info/",
      type: "get",
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiZDRhZWZjZTI4YTU0ZmE1OWY3Yjk1MGMwMDlmNjg4NSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTc3MDc3ODQ4OSwiZXhwIjoxNzcxOTg4MDg5fQ.5DQSoPr6aWITcz_0hksE0TfEpJPwRN6m17duDAhUNJ4"
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });

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
