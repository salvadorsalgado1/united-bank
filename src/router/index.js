import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Login from '@/components/Login/Login'
import Signup from '@/components/Login/Signup'
import Home from '@/components/Home/Home'
import firebase from 'firebase'
import Account from '@/components/Account/Account'
import Finance from '@/components/Finance/Finance'
import TransferFunds from '@/components/Finance/TransferFunds'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/signup',
      name:'Signup',
      component: Signup
    },
    {
      path:'/home',
      name:'Home',
      component: Home,
      meta:{
        requiresAuth: true
      },
      props:true
     
    },
    {
      path:'/home/account',
      name:'Account',
      component:Account,
      meta:{
        requiresAuth: true
      },
      props:true

    },
    {
      path:'/home/finance',
      name:'Finance',
      component:Finance,
      meta:{
        requiresAuth: true
      },
      props:true
    },
    {
      path:'/home/finance/transfer-funds',
      name:'TransferFunds',
      component:TransferFunds,
      meta:{
        requiresAuth: true
      },
      props:true
    }
    
  ]
})

router.beforeEach((to,from,next)=>{
  //check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      // user signed in , proceed to route
      next()
    }else{
      //no user signed in, redirect to login
      next({ name : 'Login'})
    }
  }else{
    next()
  }
})

export default router