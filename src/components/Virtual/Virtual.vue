<template>
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
</template>
<script>

export default {
    data(){
        return{

        }
    },
    mounted(){
           $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
    }
}
</script>