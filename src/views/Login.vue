<template>
  <div>
      <h1>Login</h1>
    <form @submit.prevent="login">
      <v-text-field
            label="Email"
            type="email" name="email"
            dense
          ></v-text-field>

      <v-text-field
            label="Password"
            type="password" name="password"
            dense
          ></v-text-field>

      <v-btn type="submit" name="button">Login</v-btn>
    </form>
  </div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "admin" });
          vuetifyToast.success('Successfully logged in!');
        })
        .catch(error => {
          vuetifyToast.error('Unsuccessful login: ', error.response);
        });
    }
  }
};
</script>

<style lang="css" scoped>

</style>