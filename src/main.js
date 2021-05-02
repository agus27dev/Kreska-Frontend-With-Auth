import { createApp } from 'vue'
import App from './App.vue'

// import router dari folder router
import router from './router'

//import store vuex
import store from './store'

const app = createApp(App)

// menggunkan router dengan plugin use
app.use(router)

//menggunakan store dengan plugin "use"
app.use(store)

// define mixin untuk global function atau helper
app.mixin({
    methods: {

        //money thousands
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
            thousands   = reverse.match(/\d{1,3}/g)
            thousands   = thousands.join('.').split('').reverse().join('')
            return thousands
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        }

    }
})

app.mount('#app')
