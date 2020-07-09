<template>
    <div class="account container">
        <div class="card">
            <div class="card-content center">   
                <h2>Account</h2>
                <table class="table striped highlight">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Social</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{this.firstName}}</td>
                            <td>{{this.username}}</td>
                            <td>{{this.email}}</td>
                            <td>{{this.social}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <button class="btn blue">Edit</button>
                    <router-link :to="{name:'Home'}"><a class="btn teal">Home</a></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Account',
    props:['firstName','email','social','username'],
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.account{
    margin-top:50px;
}
.btn{
    margin:30px 10px auto;
}
 h2{
    font-size:1.4em;
}
</style>