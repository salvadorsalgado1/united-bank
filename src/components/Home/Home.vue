<template>
    <div class="home container">
        <div class="row">
            <div class="col m4">
                <div class="card top card-home center">
                    <img class="card-image home-logo" src="@/assets/logo.png" />
                    <div class="card-content left-align">
                          <h2>Good Afternoon, {{this.firstName}}</h2>
                          <p><strong>Username:<br></strong> 
                          {{this.username}}</p>
                    </div>
                </div>
            </div>
            <div class="col m6 s12">
                <div class="card top card-home">
                    <div class="card-content">
                        <h2 class="center">Financials</h2>
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
                        <div class="" v-if="transferAct">
                            <Transfer :transferAct="this.transferAct" :checkingBalance="this.checkingBalance" :savingsBalance="savingsBalance"/>
                        </div>
                        <div class="center">
                            <button @click="transferAccount()" class="btn teal ">{{buttonTransferText}}</button>

                        </div>
                        </div>
                </div>
            </div>
    </div>
    <div class="row">
            <div class="col m6 s12">
                <div class="card card-home center">
                     <div class="carousel carousel-slider center">
                        <div class="carousel-fixed-item center">
                        <a class="btn waves-effect white grey-text darken-text-2">button</a>
                        </div>
                        <div class="carousel-item red white-text" href="#one!">
                        <h2>Virtual Checking Card</h2>
                        <p class="white-text">This is your first panel</p>
                        <p>3212-3423-9564-8800</p>
                        <div class="container ">
                            <div class="row center">
                                <div class="col m6">
                                    <p>Robert</p>
                                </div>
                                <div class="col m6">
                                    <p>12/24</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="carousel-item amber white-text" href="#two!">
                        <h2>Second Panel</h2>
                        <p class="white-text">This is your second panel</p>
                        </div>
                        <div class="carousel-item green white-text" href="#three!">
                        <h2>Third Panel</h2>
                        <p class="white-text">This is your third panel</p>
                        </div>
                        <div class="carousel-item blue white-text" href="#four!">
                        <h2>Fourth Panel</h2>
                        <p class="white-text">This is your fourth panel</p>
                        </div>
                    </div>
                </div>
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
import Transfer from '@/components/Finance/Transfer'
export default {
    name:'Home',
    components:{
        Transfer
    },
    data(){
        return{
           email:null,
           firstName:null,
           social:null,
           username:null,
           checkingBalance:null,
           savingsBalance:null,
           checking:null,
           transferAct:false,
           buttonTransferText:"Transfer"
        }
    },
    methods:{
         logout(){
                firebase.auth().signOut().then(()=>{
                    this.$router.push({name:'Login'})
                })
            },
            transferAccount(){
                
                if(!this.transferAct){
                    this.transferAct = true;
                    this.buttonTransferText = "Hide";
                     console.log("New Checking: " + this.checkingAmt)
                    console.log("New Savings:" + this.savingsAmt)
                    console.log("New Checking: " + this.checkingBalance)
                    console.log("New Savings:" + this.savingsBalance)
                }else if(this.transferAct){
                    this.buttonTransferText = "Transfer"
                    this.transferAct = false
                }else{
                    console.log("else")
                }
            }
    },
    
    
    mounted(){
         $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
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