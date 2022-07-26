<template>
  <section class="container-block" v-if="loggedIn">
    <h1>Hola, {{ this.$store.state.user.person.nombre | uppercase }}</h1>
    <h2>Que bueno verte por aquí.</h2>
    <h3>¿Que necesitas hoy?</h3>
    <div class="img-wrap">
      <transition name="slide-up-enter">
        <router-link to="/prebusqueda" tag="a">
          <div class="home-item">
            <img src="@/assets/search 1.png" />
            <h2>Estoy buscando materiales</h2>
          </div>
        </router-link>
      </transition>
      <transition name="slide-up-enter">
        <router-link to="/registrar" tag="a">
          <div class="home-item">
            <img src="@/assets/publish 1.png" />
            <h2>Quiero publicar materiales</h2>
          </div>
        </router-link>
      </transition>
    </div>
  </section>
  <section v-else-if="!loggedIn">
    <div class="home-ctn">
      <img src="@/assets/SVG/simuniver_horizontal_verde.svg" />
      <h1>Busca y Publica Materiales Universitarios</h1>
      <router-link to="/login" tag="a" class="Btn">
        INGRESAR
      </router-link>
    </div>
  </section>
</template>

<script>
import { authComputed } from "../store/helpers.js";
export default {
  computed: {
    ...authComputed
  },
  filters: {
    uppercase(value) {
      return value.toLowerCase();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/components/intro.scss";
</style>
