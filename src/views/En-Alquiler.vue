<template>
  <section>
    <div class="wancho">
      <h1>En Alquiler</h1>
      <div class="materiales-input">
        <!-- <input type="text" placeholder="Busca dentro de tus materiales" /> -->
        <vue-fuse
          :keys="keys"
          :list="posts"
          :defaultAll="true"
          placeholder="Busca dentro de tus materiales"
        ></vue-fuse>
        <img src="@/assets/SVG/search.svg" alt="" />
        <router-link
          to="/mis"
          tag="a"
          class="enAlquiler"
          v-if="enInventario == false"
          >INVENTARIO</router-link
        >
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
      <div v-if="!results.length" class="firstContact">
        <img src="@/assets/SVG/search.svg" alt="" />
        <h2>Sin resultados</h2>
      </div>
      <div v-else class="materiales-wrap alquiler">
        <div
          class="material-item-inv"
          v-for="post in results"
          v-bind:key="post.material.id"
        >
          <div class="material-item-img">
            <img :src="post.material.foto" />
            <span v-bind:class="post.material.state.nombre">{{
              post.material.state.nombre
            }}</span>
          </div>
          <ul>
            <router-link
              :to="{ name: 'detallematerial', params: { id: post.idMaterial } }"
              tag="a"
              class="item-enlace"
              >{{ post.material.nombre }}</router-link
            >
            <li class="item-price">{{ post.user.username }}</li>
            <li class="item-fecha">
              Alquilado el {{ post.fec_inicio | formatDate }}
            </li>
          </ul>
          <a href="#" class="Btn" @click="rateUser(post)">CONCLUIR</a>
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
      keys: ["material.nombre", "user.username"]
    };
  },
  created() {
    axios
      .get("http://localhost:9112/api/transactions/cod/" + store.state.user.id)
      .then(response => {
        this.posts = response.data;
        // this.$store.commit("GET_MATERIALES", response.data);
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
    rateUser(post) {
      event.preventDefault();
      this.$store.commit("GET_MATERIAL", post.material);
      this.$store.commit("SET_TRANSACTION", post);
      this.$router.push({
        name: "calificar",
        params: {
          id: post.idUsuario,
          material: post.material,
          usuario: post.user
        }
      });
    }
  },
  computed: {
    ...mapState(["user", "materiales"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/mis-materiales.scss";
</style>
