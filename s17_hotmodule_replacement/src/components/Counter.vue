<template>
    <div>

        <h2>The Count is : {{ count }}</h2>
        <p>

            <button @click="count += 21">Increment</button>
        </p>
    </div>
</template>

<script>
    export default {
        data(){
            return { count:0 };
        }
    }
</script>
