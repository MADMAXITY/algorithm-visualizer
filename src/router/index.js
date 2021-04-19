import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sudoku from '../views/sudoku-solver.vue'
import AstarPathfinder from '../views/AStar-pathfinder.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sudoku-solver',
    name: 'Sudoku',
    component: Sudoku
  },
  {
    path: '/a-star-pathfinder',
    name: 'AStarPathfinder',
    component: AstarPathfinder
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
