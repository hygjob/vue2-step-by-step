Vue.component('coupon', {
    template: '<input placeholder="Enter your coupon code=" @blur="onCouponApplied">',

    methods: {
        onCouponApplied(){
            //alert('applied!');
            this.$emit('applied');
        }
    } 
});



new Vue({
    
    el: '#root',

    data: {
        couponApplied : false
    },
    methods: {
        onCouponApplied(){
            //alert('It was applied!');
            this.couponApplied = true;
        }
    } 
});


