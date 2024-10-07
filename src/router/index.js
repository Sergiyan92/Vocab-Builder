import RecommendComponent from '../components/Recommend/RecommendComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const Dictionary = () => import('../views/DictionaryPage/DictionaryPage.vue')
const Training = () => import('../components/Training/TrainingComponent.vue')
const Home = () => import('../views/HomePage/HomePage.vue')
const Auth = () => import('../views/Auth/AuthPage.vue')
const Registration = () => import('../views/RegistrPage/RegistrationPage.vue')
const Login = () => import('../views/LoginPage/LoginPage.vue')

const routes = [
  { path: '/', component: Home, redirect: '/auth/login', name: 'home' },
  { path: '/dictionary', component: Dictionary, name: 'dictionary' },
  { path: '/recommend', component: RecommendComponent, name: 'recommend' },
  { path: '/training', component: Training, name: 'training' },
  {
    path: '/auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      { path: 'registration', component: Registration, name: 'registration' },
      { path: 'login', component: Login, name: 'login' }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
