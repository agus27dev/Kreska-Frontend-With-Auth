<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-md-3 mb-4">
                <Category /> <!-- component Category -->
            </div>
            <div class="col-md-9 mb-4">
                <Slider /> <!-- component Slider -->
            </div>
        </div>
    </div>

    <div class="container-fluid mb-5 mt-4">
        <!-- data product -->

        <div class="row">
            <div class="col-md-12">
                <h4 class="font-weight-bold">PRODUK KRESKA</h4>
                <hr class="mb-5" style="border-top: 5px solid rgb(231 171 60);border-radius:.5rem">
            </div>
        </div>

        <div class="row">

            <div v-for="product in products" :key="product.id" class="col-md-3 col-6 mb-3">

                <div v-if="product.stock>0">
                    <div class="card h-100 border-0 shadow rounded-md">
                        <div class="card-img">
                            <img :src="product.image"
                                class="w-100"
                                style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                        </div>
                        <div class="card-body">
                            <router-link :to="{name: 'detail_product', params:{slug: product.slug }}" class="card-title font-weight-bold" style="font-size:18px; color:#000">
                                {{ product.title }}
                            </router-link>

                            <div class="discount mt-2" style="color: #999"><s>Rp. {{ moneyFormat(product.price) }}</s> 
                                <span style="background-color: darkorange" class="badge badge-pill badge-success text-white ml-1">
                                    DISKON {{ product.discount }} %
                                </span>
                            </div>

                            <div class="price font-weight-bold mt-2" style="color: #ff8c00; font-size:18px">
                                Rp. {{ moneyFormat(calculateDiscount(product)) }}
                            </div>
                            <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT PRODUK</router-link>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="card h-100 border-0 shadow rounded-md">
                        <div class="card-img">
                            <img :src="product.image"
                                class="w-100"
                                style="height: 15em; object-fit:cover; border-top-left-radius: .25rem; border-top-right-radius: .25rem; opacity: 0.4">
                        </div>
                        <div class="card-body">
                            <div class="card-title font-weight-bold text-muted" style="font-size:18px; color:#000">
                                {{ product.title }}
                            </div>

                            <div class="discount" style="color: #999; font-size:14.5px;"><s style="color: #999; font-size:14.5px;">Rp. {{ moneyFormat(product.price) }}</s> 
                                <span class="badge badge-pill badge-secondary text-white ml-1" style="font-size:12px;">
                                    DISKON {{ product.discount }} %
                                </span>
                            </div>

                            <div class="price font-weight-bold mt-2 text-muted" style="color: #ff8c00; font-size:18px">
                                Rp. {{ moneyFormat(calculateDiscount(product)) }}
                            </div>
                            <div class="btn btn-primary btn-md mt-3 btn-block shadow-md disabled" style="background-color:grey;">PRODUK HABIS</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

import Category from '@/components/Category' // <-- component Category
import Slider from '@/components/Slider' // <-- component Slider
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {

    components: {
        Category,       // <-- register component Category
        Slider          // <-- register component slider
    },

    setup() {
        
        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action "getProducts" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
        })

        //computed properti digunakan untuk get data products dari state di module product 
        const products = computed(() => {
            return store.state.product.products
        })

        return {
            store,
            products
        }

    }

}
</script>