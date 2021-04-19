import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sudoku from '../views/sudoku-solver.vue'
import AstarPathfinder from '../views/AStar-pathfinder.vue'
import Dijkshtra from '../views/Dijkshtra.vue'
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
  },
  {
    path:'/dijkshtra',
    name : 'Dijkstra',
    component: Dijkshtra
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
