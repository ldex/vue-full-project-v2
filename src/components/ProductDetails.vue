<template>
  <div>
    <section v-if="error">
      {{error.message}}
    </section>
    <section v-else>
      <div v-if="loading">
          <h2>Loading...</h2>
      </div>
      <div v-else>
        <h2>{{product.name}}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://placeimg.com/200/200/tech'" width="200" style="float:right" />
        <h3>{{product.description}}</h3>
        <p>Price: {{product.price}}</p>
        <p>Fixed price? {{product.fixedPrice}}</p>
        <p>Discontinued? {{product.discontinued}}</p>
        <p>Modified date: {{product.modifiedDate | formatDate('DD/MM/YYYY hh:mm') }}</p>
        <v-btn @click="delProduct">Delete</v-btn>           
      </div>
    </section>
  </div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'
import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                error: null,
                loading: false
            }
        },
        computed: {
            ...mapState(['product']), // map `this.product` to `this.$store.state.product`
        },
        methods: {
            delProduct() {
              if (window.confirm("Are you sure ??")) {
                this.deleteProduct(this.product)
                .then(() => {
                  vuetifyToast.success('The product has been deleted.');
                  this.$router.push({ name: 'products'});
                  })
                .catch(error => {
                  vuetifyToast.error('There was an error:', error.response);
                });
              }
            },
            ...mapActions(['fetchProduct','deleteProduct']) // map `this.fetchProduct(this.id)` to `this.$store.dispatch('fetchProduct', this.id)`
        },
        props: {
            id: {
                type:Number,
                required:true
            }
        },
        created () {
            this.fetchProduct(this.id);
        },
    }
</script>

<style lang="scss" scoped>

</style>