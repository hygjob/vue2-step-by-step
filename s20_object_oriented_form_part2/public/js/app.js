class Errors {

    constructor(){
        this.errors = {};
    }

    get(field){
       
        
        if(this.errors[field]){
            return this.errors[field];
        }
    }

    record(errors){
        this.errors = errors;
        
    }

    any(){
        
        return Object.keys(this.errors).length > 0;
    }
    clear(field){
        if (field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }

    has(field){
        
       
        return this.errors.hasOwnProperty(field);
        
    }


}

class Form{
    constructor(data){
        this.originalData = data;

        for (let field in data){
            this [field] = data[field];
        }

        this.errors = new Errors();
    }
    data(){
        let data = Object.assign({}, this);

        delete data.originalData;

        delete data.errors;
        console.log('1');
        console.log(data);
        return data;
    }
    reset(){
        for (let field in this.originalData){
            this [field] = '';
        }
    }

    submit(requestType, url){
        console.log('submit')
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this));
    }

    onSuccess(response){
        alert(response.data.message);

        this.errors.clear();
        this.reset();
    }

    onFail(error){
        this.errors.record(error.response.data.errors);

    }
}
new Vue({
    el: '#app',
    data:{
        form: new Form({
            name: '',
            description: ''
        }) 
    },
    methods:{
        onSubmit(){
           
           this.form.submit('post', '/store');
           
        
        }
    }
    
})