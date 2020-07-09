<template>
    <div class="home container">
        <div class="row">
            <div class="col m4">
                <div class="card top card-home center">
                    <img class="card-image home-logo" src="@/assets/logo.png" />
                    <div class="card-content left-align">
                          <h2 class="blue-text">{{this.greeting}}, {{this.firstName}}</h2>
                          <p class="username-text"><strong>Username:<br></strong> 
                          {{this.username}}</p>
                    </div>
                </div>
            </div>
            <div class="col m6 s12">
                
                <div class="card top card-home">
                    <div class="card-content">
                            <h2 class="center teal-text">Financials</h2>
                            <hr/>
                            <ul class="collection">
                                <li class="collection-item avatar">
                                    <i class="material-icons circle blue">account_balance</i>
                                    <span class="title">Checking</span>
                                    <p>#4353<br>
                                        <strong>${{this.checkingBalance}}</strong>
                                    </p>
                                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                                </li>
                                <li class="collection-item avatar">
                                    <i class="material-icons circle green">beach_access</i>
                                    <span class="title">Savings</span>
                                    <p>#6543<br>
                                        <strong>${{this.savingsBalance}}</strong>
                                    </p>
                                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                                </li>
                                </ul>
                               
                                <div class="center">
                                    <router-link :to="{name:'TransferFunds', params:{checkingBalance:this.checkingBalance, savingsBalance:this.savingsBalance}}"><a class="btn teal ">Transfer Funds</a></router-link>
                                    
                                </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        <div class="row">
                <div class="col m6 s12">
                    <Virtual/>
                </div>
            <div class="col m4 s12">
                <div class="card card-home center">
                    <div class="card-content">
                        <h2>Account Information</h2>
                        <router-link :to="{name:'Account', params:{email:this.email, firstName:this.firstName, social:this.social, username:this.username}}"><a class="btn teal">Account</a></router-link>
                        <a class="btn red" @click="logout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase';
import db from '../firebase/init'
import Account from '@/components/Account/Account'
import Virtual from '@/components/Virtual/Virtual'
import TransferFunds from '@/components/Finance/TransferFunds'
export default {
    name:'Home',
    components:{
        
        Virtual,
        
    },
    data(){
        return{
           email:null,
           firstName:null,
           social:null,
           username:null,
           checkingBalance:null,
           savingsBalance:null,
           greeting:null,
           time:null,
           
           
        }
    },
    
    methods:{
         logout(){
                firebase.auth().signOut().then(()=>{
                    this.$router.push({name:'Login'})
                })
            },
            
    },
    
   
    mounted(){
      
        let date = new Date();
 let time = date.getHours();
        if(time < 12){
            this.greeting = "Good Morning"
        }else if( time >= 12 && time <= 17){
            this.greeting = "Good Afternoon"
        }else if(time>= 17 && time <=24){
            this.greeting = "Good Evening"
        }



       let user = firebase.auth().currentUser
       this.email = user.email

       db.collection('users').where('user_id', '==', user.uid).get()
       .then(snapshot=>{
           snapshot.forEach((doc)=>{
               db.collection('users').doc(doc.id).get()
               .then(user=>{
                   this.username = doc.id
                   this.firstName = doc.data().name
                   this.email = doc.data().email
                   this.social = doc.data().social
                   this.firstName = doc.data().firstName
                   this.checkingBalance = doc.data().checkingBalance
                   this.savingsBalance = doc.data().savingsBalance
               })
            })
       })
    },
    
}
</script>
<style>
.username-text{
    font-size:1em;
}
.card .card-content h2{
    font-size:1.8em;
}
.top
{
    margin-top:80px;
}
.card-home h2{
    font-size:1.6em;
}
.home-logo{
    width:100%;
}
</style>