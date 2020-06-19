<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item :to="{path: '/'}">
          <v-list-item-action>
            <v-icon>mdi mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/products'}">
          <v-list-item-action>
            <v-icon>mdi mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/admin'}">
          <v-list-item-action>
            <v-icon>mdi mdi-security</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/about'}">
          <v-list-item-action>
            <v-icon>mdi mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vue Store</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn v-if="!loggedIn" :to="{path: '/login'}">Login</v-btn>
      <v-btn v-else type="button" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">
        &copy; 2020 —
        <strong>Vue Academy</strong>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loggedIn"])
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout() {
      localStorage.removeItem("auth_token");
      location.reload();
    }
  },
  created() {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      this.$store.dispatch("setAuthToken", auth_token);
    }
  }
};
</script>

<style>
.left {
  float: left;
}
.right {
  float: right;
}

/* transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes acrossIn {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes acrossOut {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

.page-enter-active {
  animation: acrossIn 0.45s ease-out both;
}

.page-leave-active {
  animation: acrossOut 0.65s ease-in both;
}
</style>
