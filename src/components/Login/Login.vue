<template>
    <div class="login container">
        <div class="card card-login">
            <div class="card-content">
            <h2 class=" teal-text center-align">Sign In</h2>
            <form @submit.prevent="login()">
                <label for="email">Email</label>
                <input class="" name="email" type='text' for="email" v-model="email" />
                <label class="" for="password">Password</label>
                <input class="" name="password" type="password" v-model="password"/>
                <div class="region center-align">
                </div>
                <div class="region center-align">
                <button class="btn btn-teal">Login</button>
                <router-link :to="{name:'Landing'}"><a class="btn blue">Landing</a></router-link>
                </div>
                
            </form>
            <div class="region center-align">
                <router-link :to="{name:'Signup'}"><a class="center-align">New Here? Create an account!</a></router-link>
            </div>
           
            </div>
            
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    name:'Login',
    
    data(){
        return{
            username:null,
            password:null,
            feedback:null,
            email:null,
        }
    },
    methods:{
        login(){
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(
                    
                    cred=>{
                    this.$router.push({
                        name:'Home',
                    })
                })
                .catch(err=>{
                    this.feedback = err.message;
                })
                this.feedback="Please fill in both fields"
            }
        }
    }
}
</script>
<style scoped>
.card .card-login{
    width:50%;
}
.login{
    margin:50px auto;
    max-width:30%;
}
.card-content h2{
    font-size:1.6em;
}
.btn{
    margin:20px auto;
}

</style>