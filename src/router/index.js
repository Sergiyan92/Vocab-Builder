import { createRouter, createWebHistory } from 'vue-router'

const Dictionary = () => import('../views/DictionaryPage/DictionaryPage.vue')
const Recommend = () => import('@/components/Recommend/RecommendComponent.vue')
const Training = () => import('@/components/Training/TrainingComponent.vue')

const routes = [
  { path: '/dictionary', component: Dictionary, name: 'dictionary' },
  { path: '/recommend', component: Recommend, name: 'recommend' },
  { path: '/training', component: Training, name: 'training' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
