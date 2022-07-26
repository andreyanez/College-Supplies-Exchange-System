<template>
  <header :class="{ login: !loggedIn }">
    <ul>
      <router-link to="/" tag="li" class="logo" v-if="loggedIn" exact>
        <img src="@/assets/SVG/simuniver_horizontal_blanco.svg" />
      </router-link>

      <router-link to="/" tag="li" class="logo" v-if="!loggedIn" exact>
        <img src="../assets/logo-urp.png" />
      </router-link>

      <div class="user-options">
        <router-link to="/perfil" tag="li" active-class="active" v-if="loggedIn"
          ><a
            ><img class="user" src="../assets/user-icon.svg" />{{
              this.$store.state.user.username
            }}</a
          ></router-link
        >
        <router-link to="/solicitudes" tag="li" v-if="loggedIn"
          ><a
            ><img class="request" src="../assets/SVG/mail.svg" />Solicitudes</a
          ></router-link
        >
        <a v-if="loggedIn" @click="logout" class="logout"></a>
      </div>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@import "../styles/components/header.scss";
</style>

<script>
import { authComputed } from "../store/helpers.js";

export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
