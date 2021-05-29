Vue.component('error-message', {
    props: ['message', 'visibility'],
    template: `
        <div class="error-message" v-show="visibility">
            <p>{{message}}</p>
            <button @click="$parent.$emit('close-message',message)">close</button>
        </div>
    `
});

Vue.component('error-messages_block', {
    props: ['messages','visibility'],
    template: `
        <div class="error-messages_block" v-show="visibility">
            <error-message v-for="message of messages" :message="message" visibility="true">
            </error-message>
        </div>
    `
});