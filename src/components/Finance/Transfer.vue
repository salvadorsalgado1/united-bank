<template>
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
                <p v-if="feedback" class="feedback red-text">{{feedback}}</p>
                <div class="center">
                <button v-if="this.transferAct" class="btn blue">Initiate Transfer</button>

                </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '@/components/firebase/init'
export default {
    name:'Transfer',
    props:['transferAct', 'checkingBalance', 'savingsBalance'],
    data(){
        return{
            transferAmt:null,
           selectOne:null,
            selectTwo:null,
            feedback:null,
            checkingAmt:null,
            savingsAmt:null,
            
        }
    },
    mounted(){
    $(document).ready(function(){
        $('select').formSelect();
        });
    },
    updated(){

    },
    methods:{
        optionSelect(){
            this.transferAmt = parseInt(this.transferAmt)
            this.checkingAmt = this.checkingBalance
            this.savingsAmt = this.savingsBalance

            if(this.selectTwo == this.selectOne || this.selectTwo == null || this.selectOne == null)
            {
                this.feedback = "Cannot choose the same account!"
            }else{
                 
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

                                console.log("New Checking: " + this.checkingAmt)
                                console.log("New Savings:" + this.savingsAmt)

                                let user = firebase.auth().currentUser
                              let ref =  db.collection('users').where('user_id', '==', user.uid).get()
                            .then(snapshot =>{
                                snapshot.forEach((doc)=>{
                                    db.collection('users').doc(doc.id).update({
                                         checkingBalance:this.checkingAmt,
                                        savingsBalance:this.savingsAmt
                                    })
                                })
                            })

//--------
            }
        }
    }
}
</script>
<style>
.btn{
    margin:10px auto;
}
.card .card-content .feedback{
    margin-top:20px;
}
.select-wrapper input.select-dropdown{
    color:rgb(6, 106, 163)
}
.transfer{
    margin-top:30px;
}
</style>