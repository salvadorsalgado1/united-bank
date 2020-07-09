<template>
    <div class="signup container">
        <div class="card card-login">
            <div class="card-content">
            <h2 class="center-align teal-text">Sign Up</h2>
            <form @submit.prevent="signup()">
                <label for="username ">Username</label>
                <input class="" name="username" type='text' for="username" v-model="username" />
                <label for="name">First Name</label>
                <input class="" name="fname" type="text" v-model="fname"/>
                <label for="email">Email</label>
                <input name="email" type="text" v-model="email"/>
                <label for="name">Social Security</label>
                <input class="" name="social" type="password" v-model="social" maxlength="9"/>
                <label for="password">Password</label>
                <input class="" name="password" type="password" v-model="password" />
                <label for="password">Confirm Password</label>
                <input class="" name="passwordTwo" type="password" v-model="passwordTwo" />
                <div class="region center-align">
                    <p class="red-text" v-if="feedback">{{feedback}}</p>
                    <button class="btn btn-teal">Sign Up</button>
                </div>
            </form>
            <router-link :to="{name:'Login'}"><p class="center-align">Already have an account? Login!</p></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import db from '../firebase/init';
import firebase from 'firebase'
import slugify from 'slugify'

export default {
    name:'Signup',
    data(){
        return{
            username:null,
            fname:null,
            email:null,
            social:null,
            password:null,
            passwordTwo:null,
            feedback:null,
            slug:null,
            checkingBalance:null,
            savingsBalance:null
        }
    },
    methods:{
        signup(){
            console.log(this.username, this.fname, this.email, this.social,this.password, this.passwordTwo);
            if(this.username && this.fname && this.email && this.social && this.password && this.passwordTwo){
                if(this.password == this.passwordTwo){
                    this.checkingBalance = (Math.floor(Math.random() * 1000000)+100)/100;
                    this.savingsBalance = (Math.floor(Math.random() * 1000000)+100)/100
                    console.log("passwords match");
                   //let ref = db.collections('users').doc
                   this.slug = slugify(this.username,{
                         replacement:'-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower:true
                   })
                   let ref = db.collection('users').doc(this.slug)
                   ref.get().then(doc=>{
                       if(doc.exist){
                           this.feedback = "This username already exists";
                           this.username=null;

                       }else{
                           ref.set({
                               username:this.username,
                               firstName: this.fname,
                               email: this.email,
                               social:this.social,
                               checkingBalance:this.checkingBalance,
                               savingsBalance:this.savingsBalance
                           })
                           .then(()=>{
                               return firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                           })
                           .then(cred=>{
                               return ref.update({
                                   user_id:cred.user.uid

                               }).then(()=>{
                                   this.$router.push({name:'Home'})
                               })
                           })
                           .catch(err=>{
                               console.log(err);
                               this.feedback = err.message;
                           })
                           this.feedback = "This username is free to use"
                       }
                   })
                   console.log(this.slug)
                }
                else{
                    this.feedback = "Passwords do not match!"
                    this.password = null;
                    this.passwordTwo = null;
                }
            }else{
                this.feedback = "You must fill in the form"
            }
        }
    }
}
</script>

<style scoped>
.signup{
    margin:50px auto;
    max-width:30%;
}
.card-content{
    margin:10px auto;
}
.btn{
    margin:20px auto;
}
.card-content h2{
    font-size:1.6em;
}
</style>