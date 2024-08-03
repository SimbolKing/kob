import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from "@/views/error/NotFoundView.vue";
import PkIndexView from "@/views/pk/PkIndexView.vue";
import RanklistIndexView from "@/views/ranklisk/RanklistIndexView.vue";
import RecordIndexView from "@/views/record/RecordIndexView.vue";
import UserBotIndexView from "@/views/user/bot/UserBotIndexView.vue";

const routes = [
  {
    path: '/',
    redirect: '/pk/',
    name: 'home',
  },
  {
    path: '/pk/',
    name: 'pk',
    component: PkIndexView,
  },
  {
    path: '/record/',
    name: 'record',
    component: RecordIndexView,
  },
  {
    path: '/ranklist/',
    name: 'ranklist',
    component: RanklistIndexView,
  },
  {
    path: '/user/bot/',
    name: 'user_bot',
    component: UserBotIndexView,
  },
  {
    path: '/404/',
    name: 'not_found',
    component: NotFoundView,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
