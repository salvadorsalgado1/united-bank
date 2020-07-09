<template>
  <div class="landing container center">
        <img src="@/assets/logo.png" class="responsive" />
        <h1>Welcome, Lets Get Started</h1>
        <router-link :to="{name:'Login'}"><a class="btn waves-effect waves-light">Proceed</a></router-link>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img{
  margin:5%;
  width:35%;
  box-shadow:3px 3px 3px rgba(3, 3, 3, 0.384);
}
h1{
  font-size:1.6em;
  margin-bottom:2%;
  
}
.btn{
  margin-bottom:40px;
}
</style>
