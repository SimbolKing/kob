<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">King of Bots</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :class="route_name === 'pk' ? 'nav-link active' : 'nav-link'" :to="{name: 'pk'}">对战</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'record' ? 'nav-link active' : 'nav-link'" :to="{name: 'record'}">对局列表</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="route_name === 'ranklist' ? 'nav-link active' : 'nav-link'" :to="{name: 'ranklist'}">排行榜</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              jinshengbo
            </button>
            <ul class="dropdown-menu dropdown-menu-write">
              <li><router-link class="dropdown-item" :to="{name: 'user_bot'}">我的Bot</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "NavBar",
  setup() {
    const route = useRoute();
    let route_name = computed(() => route.name);

    return { route_name }
  }
}
</script>

<style scoped>

</style>