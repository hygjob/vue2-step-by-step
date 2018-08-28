window.Event = new Vue();

Vue.component('coupon', {
    template: '<input placeholder="Enter your coupon code=" @blur="onCouponApplied">',

    methods: {
        onCouponApplied(){
            
            
            Event.$emit('applied');

        }
    } 
});
/* custom event name
window.Event = new class {
    constructor(){
        this.vue = new Vue();
    }

    fire(event, data = null){
        this.vue.$emit(event, data);
    }

    listen(event, callback){
        this.vue.$on(event, callback);
    }
}
*/


new Vue({
    
    el: '#root',

    data: {
        couponApplied : false
    },
    created(){
        Event.$on('applied', ()=>alert('its applied'));
    }
});


