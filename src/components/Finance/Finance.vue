<template>
    <div class="finance container">
        <div class="card">
            <div class="card-content">
                <h2 class="center">Finance</h2>
                <div class="row">
                    <div class="col s12 m6">
                         <div class="select"> 
                            <div class="input-field col s12">
                            <form @submit.prevent="optionSelect()">
                            <select v-model="selectOne">
                                <option disabled selected>Choose your account</option>
                                <option>Checking - #4353</option>
                                <option >Savings - #6543</option>
                            </select>
                            <p>To transfer to</p>
                            <input type="number" min="0" v-model="transferAmt" placeholder="Amount"/>
                            <select v-model="selectTwo">
                                <option disabled selected>Choose your account</option>
                                <option>Checking - #4353</option>
                                <option >Savings - #6543</option>
                            </select>
                            <label>Bank Account</label>
                            <p v-if="feedback" class="feedback red-text">{{feedback}}</p>
                            <button class="btn blue">Check</button>
                        </form>
                        </div>
                        <router-link :to="{name:'Home'}"><a class="btn pink">Home</a></router-link>
                            </div>
                        </div>
                    <div class="col s12 m6">
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <i class="material-icons circle blue">account_balance</i>
                                <span class="title">Checking</span>
                                <p>#4353 <br>
                                    <strong>${{this.checking}}</strong>
                                </p>
                                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                            </li>
                            <li class="collection-item avatar">
                                <i class="material-icons circle green">beach_access</i>
                                <span class="title">Savings</span>
                                <p>#6543 <br>
                                    <strong>${{this.savings}}</strong>
                                </p>
                                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import db from '@/components/firebase/init'
import firebase from 'firebase'
export default {
    name:'Finance',
    props:['checking', 'savings'],
    data(){
        return{
            transferAmt:null,
           selectOne:null,
            selectTwo:null,
            feedback:null
        }
    },
    mounted(){
    $(document).ready(function(){
        $('select').formSelect();
        });
    },
    methods:{
        optionSelect(){
            if(this.selectTwo == this.selectOne || this.selectTwo == null || this.selectOne == null)
            {
                this.feedback = "Cannot choose the same account!"
                    
            }else{
                
                    db.collections('users').doc(id)
            }
        }
    }
}
</script>
<style scoped>
.btn{
    margin:20px auto;
}
.card .card-content .feedback{
    margin-top:20px;
}
.select-wrapper input.select-dropdown{
    color:rgb(6, 106, 163)
}
</style>