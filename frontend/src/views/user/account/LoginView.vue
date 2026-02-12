<template>
  <ContentField>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Enter your username here!">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter your password here!">
          </div>
          <div class="error-message">Password is wrong!</div>
          <button type="submit" class="btn btn-primary">Create now</button>
        </form>
    </div>
    </div>
  </ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue";

export default {
  name: "login",
  components: {ContentField}
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