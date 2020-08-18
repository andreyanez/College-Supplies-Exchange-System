<template>
  <section>
    <div class="b2 wancho">
      <div class="b2-top">
        <h1>Explora Materiales</h1>
        <div class="materiales-input">
          <vue-fuse
            :keys="keys"
            :list="posts"
            :defaultAll="true"
            placeholder="Que necesitas? Ej. Libro de Matemática"
          ></vue-fuse>
          <img src="@/assets/SVG/search.svg" alt="" />
        </div>
      </div>
      <modal v-if="modalVisible" @close="modalVisible = false">
        <h1 slot="header">{{ modalTitle }}</h1>
        <h2 slot="body">{{ modalMessage }}</h2>
      </modal>
      <span class="b2-introfiltro"
        >Prueba usando filtros para una mejor búsqueda</span
      >
      <div class="b2-super-wrap">
        <!-- <div class="b2-filters">
          <fieldset>
            <legend>Condición</legend>
            <input type="radio" id="optimo" value="1" v-model="condicion" />
            <label for="optimo">optimo</label>
            <br />
            <input type="radio" id="usado" value="2" v-model="condicion" />
            <label for="usado">Usado</label>
            <br />
            <input type="radio" id="depreciar" value="3" v-model="condicion" />
            <label for="depreciar">Por depreciar</label>
            <br />
          </fieldset>
          <fieldset>
            <legend>size</legend>
            <input type="radio" id="all" value="" v-model="size" />
            <label for="all">all</label>
            <br />
            <input type="radio" id="small" value="small" v-model="size" />
            <label for="small">small</label>
            <br />
            <input type="radio" id="medium" value="medium" v-model="size" />
            <label for="medium">medium</label>
            <br />
            <input type="radio" id="large" value="large" v-model="size" />
            <label for="large">large</label>
            <br />
          </fieldset>
        </div> -->
        <div v-if="!results.length" class="firstContact">
          <img src="@/assets/SVG/search.svg" alt="" />
          <h2>Sin resultados</h2>
        </div>
        <div v-else class="b2-wrap">
          <div class="b2-item" v-for="post in results" v-bind:key="post.id">
            <div class="material-item-img" v-bind:data-id="post.id">
              <img :src="post.foto" />
              <span v-bind:class="post.state.nombre">{{
                post.state.nombre
              }}</span>
            </div>
            <ul class="b2-item-details">
              <li class="b2-item-title">{{ post.nombre }}</li>
              <li class="b2-item-price">S/.{{ post.precio }}</li>
              <span v-if="post.idCondicion == 1" class="optimo">Óptimo</span>
              <span v-if="post.idCondicion == 2" class="usado">Usado</span>
              <span v-if="post.idCondicion == 3" class="depreciar"
                >Por Depreciar</span
              >
              <router-link
                :to="{ name: 'detallematerial', params: { id: post.id } }"
                tag="a"
                class="item-enlace"
                >Ver Material
                <img src="@/assets/arrow_back.svg" alt="" />
              </router-link>
            </ul>
            <!-- <p>{{ getMaterial(37) }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
// import store from "@/store/index";
import { mapState } from "vuex";
import modal from "@/components/modal.vue";
import _ from "lodash";
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
      condicion: "",
      posts: [],
      // query: '',
      modalVisible: false,
      modalData: null,
      modalTitle: null,
      modalMessage: null,
      results: [],
      keys: ["nombre", "precio"]
    };
  },
  created() {
    axios.get("http://localhost:9112/api/materials").then(response => {
      this.posts = response.data;
      //   this.$store.commit("GET_MATERIALES", response.data);
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
    }
  },
  computed: {
    filterList() {
      var vm = this,
        results = vm.results;
      return _.filter(results, function(query) {
        var condicion = this.results
          ? query.condicion == this.results.condition.id
          : true;
        return condicion;
      });
    },
    ...mapState(["user", "materiales"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/s2.scss";
</style>
