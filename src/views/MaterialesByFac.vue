<template>
  <section>
    <div class="b2 wancho">
      <div class="b2-top">
        <h1>{{ this.$store.state.facultad.nombre }}</h1>
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
        <div v-if="!results.length" class="firstContact">
          <img src="@/assets/SVG/search.svg" alt="" />
          <h2>Sin resultados</h2>
        </div>
        <div v-else class="b2-wrap">
          <div
            class="b2-item"
            v-for="post in results"
            v-bind:key="post.material.id"
          >
            <div class="material-item-img" v-bind:data-id="post.material.id">
              <img :src="post.material.foto" />
              <span v-bind:class="post.material.state.nombre">{{
                post.material.state.nombre
              }}</span>
            </div>
            <ul class="b2-item-details">
              <li class="b2-item-title">{{ post.material.nombre }}</li>
              <li class="b2-item-price">S/.{{ post.material.precio }}</li>
              <span v-if="post.material.idCondicion == 1" class="optimo"
                >Óptimo</span
              >
              <span v-if="post.material.idCondicion == 2" class="usado"
                >Usado</span
              >
              <span v-if="post.material.idCondicion == 3" class="depreciar"
                >Por Depreciar</span
              >
              <router-link
                :to="{
                  name: 'detallematerial',
                  params: { id: post.material.id }
                }"
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
// import store from "@/store/index";
import { mapState } from "vuex";
import modal from "@/components/modal.vue";
import _ from "lodash";
import EventService from "@/services/EventService.js";

export default {
  components: {
    modal
  },
  props: ["id"],
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
      keys: ["material.nombre", "material.precio"]
    };
  },
  created() {
    EventService.getMaterialByFac(this.$store.state.facultad.id).then(
      response => {
        this.posts = response.data;
        //   this.$store.commit("GET_MATERIALES", response.data);
      }
    );
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
