import { createRouter, createWebHashHistory } from 'vue-router'
import NotesView from '@/views/NotesView.vue'
import StatsView from '@/views/StatsView.vue'
import EditNoteView from '@/views/EditNoteView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name:'signup',
    component: SignupView
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView
  },
  {
    path: '/stats',
    name:'stats',
    component: StatsView
  },
  {
    path: '/editNote/:id',
    name: 'editNote',
    component: EditNoteView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router