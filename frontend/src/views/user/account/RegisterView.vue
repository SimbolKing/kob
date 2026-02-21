<template>
  <ContentField>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter your username here!">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password here!">
          </div>
          <div class="mb-3">
            <label for="comformedPassword" class="form-label">Conformed Password</label>
            <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="Conformed your password!">
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">Join us now!</button>
        </form>
      </div>
    </div>
  </ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue";
import $ from 'jquery';
import router from "@/router";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "register",
  components: { ContentField },
  setup() {
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let confirmedPassword = ref('');
    let error_message = ref('');

    const register = () => {
      $.ajax({
        url: "http://localhost:3000/user/account/register/",
        type: "post",
        data: {
          username: username.value,
          password: password.value,
          confirmedPassword: confirmedPassword.value,
        },
        success(resp) {
          if (resp.error_message === 'success') {
            router.push({ name: 'login' });
          } else {
            error_message.value = resp.error_message;
          }
        },
        error(resp) {
          console.log(resp);
        }
      });
    }

    return { username, password, confirmedPassword, error_message, register }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}

div.error-message {
  color: red;
  margin-bottom: 8px;
}
</style>