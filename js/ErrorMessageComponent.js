Vue.component('error-message', {
    props: ['message', 'visibility'],
    template: `
        <div class="error-message" v-show="visibility">
            <p>{{message}}</p>
            <button @click="$parent.$emit('closeMessage',message)">close</button>
        </div>
    `
});

Vue.component('error-messages_block', {
    props: ['messages','visibility'],
    template: `
        <div class="error-messages_block" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});