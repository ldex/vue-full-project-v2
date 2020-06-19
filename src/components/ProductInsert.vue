<template>
    <div>
  <form @submit.prevent="onSubmit" novalidate>   
    <h2>Add product</h2>

        <div class="form-group" :class="{ 'form-group--error': $v.$error && $v.product.name.$error }">
            <label for="productName">Name:</label>
            <v-text-field
                type="text"
                v-model.trim="$v.product.name.$model"
                class="form-control"
                id="productName"
                maxlength="50"
            />
            <p v-if="$v.$error" class="errorMessage">
                <span v-if="!$v.product.name.required">Name is required.</span>
                <span
                v-if="!$v.product.name.minLength">Name must have at least {{ $v.product.name.$params.minLength.min }} characters!</span>
                <span
                v-if="!$v.product.name.maxlength">Name must have less than {{ $v.product.name.$params.maxlength.max }} characters!</span>
            </p>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.$error && $v.product.description.$error }">
            <label for="productDesc">Description:</label>
            <v-text-field
                v-model.trim="$v.product.description.$model"
                class="form-control"
                id="productDesc"
            />
            <p v-if="$v.$error" class="errorMessage">
                <span
                v-if="!$v.product.description.minLength">Description must have at least {{ $v.product.description.$params.minLength.min }} characters!</span>
                <span
                v-if="!$v.product.description.maxlength">Description must have less than {{ $v.product.description.$params.maxlength.max }} characters!</span>
            </p>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.$error && $v.product.price.$error }">
            <label for="productPrice">Price:</label>
            <v-text-field
                type="number"
                step="0.5"
                v-model.trim="$v.product.price.$model"
                class="form-control"
                id="productPrice"
            />
            <p v-if="$v.$error" class="errorMessage">                
                <span v-if="!$v.product.price.required">Price is required.</span>
                <span
                v-if="!$v.product.price.between">Price must be between {{ $v.product.price.$params.between.min }} and {{ $v.product.price.$params.between.max }}</span>       
            </p>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.$error && $v.product.imageUrl.$error }">
            <label for="imageUrl">Image url:</label>
            <input type="text" v-model="product.imageUrl" 
                class="form-control"
                id="imageUrl"
                placeholder="http://">
            <p v-if="$v.$error" class="errorMessage">                
                <span v-if="!$v.product.imageUrl.isValidImageUrl">Invalid image url.</span>
            </p>
        </div>

        <div class="form-group">
            <label for="discontinued">Discontinued?</label>
            <input type="checkbox" v-model="product.discontinued" 
                class="form-control"
                id="discontinued">
        </div>

        <div class="form-group">
            <label for="fixedPrice">Fixed price?</label>
            <input type="checkbox" v-model="product.fixedPrice" 
                class="form-control"
                id="fixedPrice">
        </div>
    
    <div style="margin:10px">
         <v-btn type="submit">Save product</v-btn>
    </div>

    <img :src="product.imageUrl" width="200" />  

  </form>
    </div>
</template>

<script>
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import vuetifyToast from 'vuetify-toast'

const validUrlRegex = /^(https?:\/\/[a-zA-Z0-9\-.]+.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$/g

export default {
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        discontinued: false,
        fixedPrice: false
      }
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch()

      if(!this.$v.product.$anyError) {
        let newProduct = {
          name: this.product.name,
          price: this.product.price,
          description: this.product.description || '',
          imageUrl: this.product.imageUrl,
          discontinued: this.product.discontinued,
          fixedPrice: this.product.fixedPrice
        };

        this.$store.dispatch('addProduct', newProduct)
        .then(() => {
          this.$router.push({ name: 'products'});
          vuetifyToast.success('The new product has been saved.');
          })
          .catch(error => {
            vuetifyToast.error('There was an error:', error.response);
          });
      }
    }
  },
  validations: {
    product: {
      name: {
        required,
        minLength: minLength(5),
        maxlength: maxLength(50)
      },
      description: {
        minLength: minLength(5),
        maxlength: maxLength(200)
      },
      price: {
        required,
        between: between(0, 1000000)
      },
      imageUrl: {
        isValidImageUrl(img) {
          return (
            validUrlRegex.test(img)
          );
        }
      }
    }
  },
}
</script>

<style lang="css" scoped>
input:active, 
input:focus, 
input:hover, 
textarea:active, 
textarea:focus, 
textarea:hover { 
  background-color: lightyellow; 
  border-color: yellow; 
} 

label {
    clear: both;
    float:left;
    width: 120px;
}

.errorMessage {
    color: red;
}

.form-group--error {
    animation-name: shakeError;
    animation-fill-mode: forward;
    animation-duration: .6s;
    animation-timing-function: ease-in-out;
}
.form-group--error input, .form-group--error textarea {
    border-color: #f79483;
}
@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); } 
  }
</style>