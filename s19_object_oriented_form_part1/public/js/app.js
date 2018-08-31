class Errors {

    constructor(){
        this.errors = {};
    }

    get(field){
        //console.log(this.errors)
        
        if(this.errors[field]){
            return this.errors[field];
        }
    }

    record(errors){
        this.errors = errors;
        //console.log(this.errors)  
    }

    any(){
        
        return Object.keys(this.errors).length > 0;
    }
    clear(field){
        delete this.errors[field];
    }

    has(field){
        
       
        return this.errors.hasOwnProperty(field);
        
    }


}

new Vue({
    el: '#app',
    data:{
        name: '',
        description: ''  ,
        errors: new Errors()
    },
    methods:{
        onSubmit(){
            
            axios.post('/store', this.$data)
                .then(this.onSuccess)
                .catch(error => {
                    
                     this.errors.record( error.response.data.errors)
                     console.log(error.response.data.errors)
                     
                });
        
        },
        onSuccess(response){
            alert(response.data.message);
            this.name = '';
            this.description = '';
        }
    }
    
})