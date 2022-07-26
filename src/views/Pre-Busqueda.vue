<template>
  <section class="container-block prebusqueda" v-if="loggedIn">
    <li @click="back" class="back-enlace" v-if="destroyed == true">
      <img src="@/assets/arrow_back.svg" />
      <a>Seguir buscando</a>
    </li>
    <h1>Puedes buscar por</h1>
    <div class="img-wrap" v-if="destroyed == false">
      <transition name="slide-up-enter">
        <a class="search-item" @click="category">
          <div class="home-item">
            <img src="@/assets/SVG/categoria.svg" />
            <h2>Categoria</h2>
          </div>
        </a>
      </transition>
      <transition name="slide-up-enter">
        <a class="search-item" @click="facultad">
          <div class="home-item">
            <img src="@/assets/SVG/facultad.svg" />
            <h2>Facultad</h2>
          </div>
        </a>
      </transition>
      <transition name="slide-up-enter">
        <a class="search-item" @click="carrera">
          <div class="home-item">
            <img src="@/assets/SVG/carrera.svg" />
            <h2>Carrera</h2>
          </div>
        </a>
      </transition>
    </div>

    <div class="img-wrap categorias" v-if="showC == true">
      <a
        class="search-item categorias"
        v-for="category in categorias"
        v-bind:key="category.id"
        @click="sendCat(category)"
      >
        <div class="home-item">
          <h2>{{ category.nombre }}</h2>
        </div>
      </a>
    </div>

    <div class="img-wrap categorias" v-if="showCar == true">
      <a
        class="search-item carreras"
        v-for="carrera in carreras"
        v-bind:key="carrera.id"
        @click="sendCar(carrera)"
      >
        <div class="home-item">
          <h2>{{ carrera.nombre }}</h2>
        </div>
      </a>
    </div>

    <div class="img-wrap categorias" v-if="showFac == true">
      <a
        class="search-item facultades"
        v-for="facultad in facultades"
        v-bind:key="facultad.id"
        @click="sendFac(facultad)"
      >
        <div class="home-item">
          <h2>{{ facultad.nombre }}</h2>
        </div>
      </a>
    </div>

    <div class="intro-bottom">
      <h2>Si deseas, puedes</h2>
      <router-link tag="a" to="/materiales"
        >ver todos los materiales en oferta.</router-link
      >
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { authComputed } from "../store/helpers.js";
export default {
  data() {
    return {
      destroyed: false,
      showC: false,
      showCar: false,
      showFac: false,
      categorias: [],
      carreras: [],
      facultades: []
    };
  },
  methods: {
    back() {
      location.reload();
    },
    category() {
      this.destroyed = true;
      (this.showC = true),
        axios.get("http://localhost:9112/api/categories").then(response => {
          this.categorias = response.data;
        });
    },
    sendCat(category) {
      this.$store.commit("GET_CAT", category);
      this.$router.push({
        name: "byCat",
        params: { id: category.id }
      });
    },
    sendCar(career) {
      this.$store.commit("GET_CAR", career);
      this.$router.push({
        name: "byCar",
        params: { id: career.id }
      });
    },
    sendFac(facultad) {
      this.$store.commit("GET_FAC", facultad);
      this.$router.push({
        name: "byFac",
        params: { id: facultad.id }
      });
    },
    carrera() {
      this.destroyed = true;
      (this.showCar = true),
        axios.get("http://localhost:9112/api/careers").then(response => {
          this.carreras = response.data;
        });
    },
    facultad() {
      this.destroyed = true;
      (this.showFac = true),
        axios.get("http://localhost:9112/api/faculties").then(response => {
          this.facultades = response.data;
        });
    }
  },
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
