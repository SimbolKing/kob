import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from "@/views/pk/PkIndexView.vue";
import RecordIndexView from "@/views/record/RecordIndexView.vue";
import RanklistIndexView from "@/views/ranklist/RanklistIndexView.vue";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView.vue";
import NotFoundView from "@/views/error/NotFoundView.vue";
import loginView from "@/views/user/account/LoginView.vue";
import RegisterView from "@/views/user/account/RegisterView.vue";
import store from '@/store/index';

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFoundView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/user/account/login/",
    name: "login",
    component: loginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/user/account/register/",
    name: "register",
    component: RegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.is_login) {
    next({ name: 'login' });
  } else {
    next();
  }
})

export default router
