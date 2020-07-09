<template>
    <div class="transferFunds container top">
        <div class="card">
            <div class="card-content">
                <div class="transferFunds">
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
                        <div class="transfer">
                            <div class="select"> 
                                <div class="input-field">
                                    <form @submit.prevent="optionSelect()">
                                    <select v-model="selectOne">
                                        <option disabled selected>Choose your account</option>
                                        <option>Checking</option>
                                        <option >Savings</option>
                                    </select>
                                    <p>To transfer to</p>
                                    <input type="number" min="0.01" step="0.01" v-model="transferAmt" placeholder="Amount"/>
                                    <select v-model="selectTwo">
                                        <option disabled selected>Choose your account</option>
                                        <option>Checking</option>
                                        <option >Savings</option>
                                    </select>
                                    <label class="bank-label">Bank Account</label>
                                    <p v-if="feedback" class="feedback red-text center">{{feedback}}</p>
                                    <p v-if="feedbackTransfer" class="feedbackTransfer center green-text">{{feedbackTransfer}}</p>
                                    <div class="center">
                                        <div v-if="load" class="loader">Loading...</div>
                                    <button class="btn blue initiate">Initiate Transfer</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <router-link :to="{name:'Home'}"><a class="btn teal">Home</a></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/components/firebase/init'
export default {
    name:'TransferFunds',
    props:['checkingBalance', 'savingsBalance'],
    data(){
        return{
            feedback:null,
            feedbackTransfer:null,
            transferAmt:null,
            selectOne:null,
            selectTwo:null,
            checkingAmt:null,
            savingsAmt:null,
            load:false
        }
    },
    mounted(){
    $(document).ready(function(){
        $('select').formSelect();
        });
    },
    methods:{
        optionSelect(){
            this.transferAmt = parseInt(this.transferAmt)
            this.checkingAmt = this.checkingBalance
            this.savingsAmt = this.savingsBalance

            if(this.selectTwo == this.selectOne || this.selectTwo == null || this.selectOne == null)
            {
                this.feedback = "Cannot choose the same account!"
            }else
            {
                switch(this.selectOne){
                    case "Checking":
                        if(this.transferAmt <= this.checkingAmt){
                            this.checkingAmt = this.checkingAmt - this.transferAmt;
                            if(this.checkingAmt < 0){
                                this.feedback = "Transfer amount must not exceed more than account!"
                                break;
                            }else{ 
                                this.savingsAmt = (this.transferAmt + this.savingsAmt) ;
                            }
                        }
                        break;
                    case "Savings":
                        if(this.transferAmt <= this.savingsAmt){
                            this.savingsAmt = this.savingsAmt - this.transferAmt;
                            if(this.savingsAmt < 0){
                                this.feedback = "Transfer amount must not exceed more than account!".
                                break;
                            }else{
                                this.checkingAmt = this.checkingAmt + this.transferAmt;
                            }
                        }
                        break;
                    default:console.log("No Action.")
                }
//firebase action goes here
                //console.log("New Checking: " + this.checkingAmt)
                //console.log("New Savings:" + this.savingsAmt)
                this.feedback=false;
                let user = firebase.auth().currentUser
                let ref =  db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot =>{
                    snapshot.forEach((doc)=>{
                        db.collection('users').doc(doc.id).update({
                            checkingBalance:this.checkingAmt,
                            savingsBalance:this.savingsAmt
                        })
                    })
                }).then(()=>{
                    this.feedbackTransfer = "Transfer Complete!"
                    this.load=true;
                    setTimeout( () => this.$router.push({ name:'Home'}), 2000);
                })
            }
        },
    }
}
</script>
<style scoped>
h2{
    font-size:1.4em;
}
.top{
    margin-top:80px;
}
.btn{
    margin-top:20px;
}
.card .card-content .feedback{
    margin-top:20px;
    font-size:1em;
}
.card .card-content .feedbackTransfer{
    font-size:1.1em;
}
.select-wrapper input.select-dropdown{
    color:rgb(6, 106, 163)
}
.transfer{
    margin-top:30px;
}

.card .card-content .feedback{
    margin-top:20px;
    font-size:1em;
}
.card .card-content .feedbackTransfer{
    font-size:1.1em;
}
.select-wrapper input.select-dropdown{
    color:rgb(6, 106, 163)
}
.transfer{
    margin-top:30px;
}
.loader {
  font-size: 10px;
  margin: 25px auto;
  text-indent: -9999em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: #00b0c7;
  background: -moz-linear-gradient(left, #00b0c7 10%, rgba(0,176,199, 0) 42%);
  background: -webkit-linear-gradient(left, #00b0c7 10%, rgba(0,176,199, 0) 42%);
  background: -o-linear-gradient(left, #00b0c7 10%, rgba(0,176,199, 0) 42%);
  background: -ms-linear-gradient(left, #00b0c7 10%, rgba(0,176,199, 0) 42%);
  background: linear-gradient(to right, #00b0c7 10%, rgba(0,176,199, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #00b0c7;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #fcfcfc;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>