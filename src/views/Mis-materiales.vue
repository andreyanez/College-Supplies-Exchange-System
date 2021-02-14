<template>
  <section class="mismateriales">
    <div class="wancho">
      <h1>Mi Inventario</h1>
      <div class="materiales-input">
        <!-- <input type="text" placeholder="Busca dentro de tus materiales" /> -->
        <vue-fuse
          :keys="keys"
          :list="posts"
          :defaultAll="true"
          placeholder="Busca dentro de tus materiales"
        ></vue-fuse>

        <img src="@/assets/SVG/search.svg" alt="" />
        <a
          href=""
          @click="showAlquiler"
          class="enAlquiler"
          v-if="enAlquiler.length"
          >MATERIALES EN ALQUILER</a
        >
        <!-- <a
          href=""
          @click="router.push('mis')"
          class="enAlquiler"
          v-if="enInventario == true"
          >INVENTARIO</a
        > -->
        <router-link v-if="posts.length" to="/registrar" active-class="active"
          ><a href="">NUEVO MATERIAL</a></router-link
        >
      </div>
      <modal v-if="modalVisible" @close="modalVisible = false">
        <!--
      you can use custom content here to overwrite
      default content
    -->
        <h1 slot="header">{{ modalTitle }}</h1>
        <h2 slot="body">{{ modalMessage }}</h2>
      </modal>
      <div v-if="!posts.length" class="firstContact">
        <img src="@/assets/SVG/search.svg" alt="" />
        <h2>Parece que no hay nada por aquí</h2>
        <h3>Empieza a publicar algun material!</h3>
        <router-link to="/registrar" class="Btn"
          ><a href="">NUEVO MATERIAL</a></router-link
        >
      </div>
      <div v-if="!results.length" class="firstContact">
        <img src="@/assets/SVG/search.svg" alt="" />
        <h2>Sin resultados</h2>
      </div>
      <div v-else-if="enInventario == false" class="materiales-wrap">
        <div
          class="material-item-inv"
          v-for="post in results"
          v-bind:key="post.id"
        >
          <div class="material-item-img" v-bind:data-id="post.id">
            <img :src="post.foto" />
            <span v-bind:class="post.state.nombre">{{
              post.state.nombre
            }}</span>
          </div>
          <ul class="inv-details">
            <li class="item-title">{{ post.nombre }}</li>
            <li class="item-price">S/.{{ post.precio }}</li>
            <li class="item-toggle">
              <span class="i-habilitar">HABILITAR</span>
              <label
                class="switch"
                :class="post.alquiler ? 'desactivado' : 'activado'"
                @click="post.alquiler ? setHabilitar(post) : null"
              >
                <input
                  type="checkbox"
                  v-model="post.habilitado"
                  @change="setHabilitar(post)"
                  :disabled="post.alquiler == true"
                />
                <span class="slider round"></span>
              </label>
            </li>
            <router-link
              :to="{ name: 'detallematerial', params: { id: post.id } }"
              tag="a"
              class="item-enlace"
              >Ver Material</router-link
            >
          </ul>
          <!-- <p>{{ getMaterial(37) }}</p> -->
          <button type="button" class="editar" @click="editar(post)">
            <img src="@/assets/SVG/editar.svg" alt="" />
          </button>
          <button
            type="button"
            class="eliminar"
            @click="eliminarMaterial(post)"
          >
            <img src="@/assets/SVG/eliminar.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import { mapState } from "vuex";
import modal from "@/components/modal.vue";
// Moved the current page & action call outside the component
// function fetchMateriales() {
//   store.dispatch("getMateriales");
// }
export default {
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   // Before we enter the route
  //   fetchMateriales(routeTo, next);
  // },
  components: {
    modal
  },
  data() {
    return {
      posts: [],
      // query: '',
      enInventario: false,
      modalVisible: false,
      modalData: null,
      modalTitle: null,
      modalMessage: null,
      results: [],
      enAlquiler: [],
      keys: ["nombre", "precio"]
    };
  },
  created() {
    axios
      .get("http://localhost:9112/api/materials/cod/" + store.state.user.id)
      .then(response => {
        this.posts = response.data;
        this.$store.commit("GET_MATERIALES", response.data);
      });
    axios
      .get(
        "http://localhost:9112/api/materials/alquiler/cod/" +
          store.state.user.id
      )
      .then(response => {
        this.enAlquiler = response.data;
        // this.$store.commit("GET_MATERIALES_ALQUILER", response.data);
      });
    this.$on("fuseResultsUpdated", results => {
      this.results = results;
    });
  },
  methods: {
    // findM() {
    //   this.$search(this.query, this.posts, { keys: ["nombre"] }).then(
    //     results => {
    //       this.results = results;
    //     }
    //   );
    // },
    toggle: function() {
      this.dots = !this.dots;
      console.log("dude");
    },
    showAlquiler() {
      event.preventDefault();
      this.$router.push({
        name: "enAlquiler"
      });
    },
    editar(post) {
      if (post.alquiler == true) {
        event.preventDefault();
        this.modalVisible = true;
        this.modalTitle = "No puedes editar el material!";
        this.modalMessage =
          post.nombre + " está siendo alquilad@!. Espera para poder editarlo.";
      } else {
        this.$router.push({
          name: "editarmaterial",
          params: { id: post.id }
        });
      }
    },
    setHabilitar(post) {
      if (post.alquiler == true) {
        event.preventDefault();
        this.modalVisible = true;
        this.modalTitle = "No se puede deshabilitar el material!";
        this.modalMessage =
          post.nombre +
          " está siendo alquilad@!. Espera para poder desactivarlo.";
      }
      axios.put("http://localhost:9112/api/materials/hab/" + post.id).then(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    },
    eliminarMaterial(post) {
      if (post.alquiler == true) {
        this.modalVisible = true;
        this.modalTitle = "No se puede eliminar el material!";
        this.modalMessage =
          post.nombre +
          " está siendo alquilad@!. Espera para poder eliminarlo.";
      } else if (post.habilitado == true) {
        this.modalVisible = true;
        this.modalTitle = "No se puede eliminar el material!";
        this.modalMessage =
          post.nombre +
          " está habilitad@!. Deshabilitalo para poder continuar.";
      } else {
        const answer = window.confirm(
          "Seguro que deseas eliminar el material?"
        );
        if (answer) {
          axios
            .delete("http://localhost:9112/api/materials/" + post.id)
            .then(() => {
              location.reload();
            });
        }
      }
    }
  },
  computed: {
    getMaterial() {
      return this.$store.getters.getMaterialById;
    },
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/mis-materiales.scss";
</style>
