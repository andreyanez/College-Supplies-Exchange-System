<template>
  <section class="b4">
    <div class="wancho">
      <modalConfirmacion
        v-if="modalVisible"
        @reactivar="live"
        @desactivar="kill"
      >
        <div slot="body" class="modalBody">
          <div class="modal-info">
            <li class="back-enlace" @click="modalVisible = false">
              <img src="@/assets/arrow_back.svg" /><a>Volver</a>
            </li>
            <h1>Deseas reactivar tu material luego de concluir?</h1>
            <h2>REACTIVAR pasará tu material a tu inventario.</h2>
            <h2>DESACTIVAR eliminará el material.</h2>
          </div>
        </div>
      </modalConfirmacion>
      <h1>Califica a {{ perfilExterno.person.nombre }}</h1>
      <h2>Que tal les fue?</h2>
      <div class="b4-wrapper">
        <img :src="perfilExterno.person.foto" alt="" class="profile-img" />
        <a href="" class="item-enlace" style="pointer-events: none">{{
          perfilExterno.username
        }}</a>
        <div class="b4-nombre">
          <h2>{{ perfilExterno.person.nombre }}</h2>
          <h3>{{ Apellidos }}</h3>
        </div>
        <p v-if="(material.idEstado = 4)" class="b4-warning">
          Porfavor, califica al usuario sólo cuando este haya devuelto el
          material.
        </p>
        <fieldset class="rating">
          <input type="radio" id="star5" name="rating" value="5" /><label
            class="full"
            for="star5"
            title="Awesome - 5 stars"
          ></label>
          <input type="radio" id="star4half" name="rating" value="4.5" /><label
            class="half"
            for="star4half"
            title="Pretty good - 4.5 stars"
          ></label>
          <input type="radio" id="star4" name="rating" value="4" /><label
            class="full"
            for="star4"
            title="Pretty good - 4 stars"
          ></label>
          <input type="radio" id="star3half" name="rating" value="3.5" /><label
            class="half"
            for="star3half"
            title="Meh - 3.5 stars"
          ></label>
          <input type="radio" id="star3" name="rating" value="3" /><label
            class="full"
            for="star3"
            title="Meh - 3 stars"
          ></label>
          <input type="radio" id="star2half" name="rating" value="2.5" /><label
            class="half"
            for="star2half"
            title="Kinda bad - 2.5 stars"
          ></label>
          <input type="radio" id="star2" name="rating" value="2" /><label
            class="full"
            for="star2"
            title="Kinda bad - 2 stars"
          ></label>
          <input type="radio" id="star1half" name="rating" value="1.5" />
          <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
          <input type="radio" id="star1" name="rating" value="1" /><label
            class="full"
            for="star1"
            title="Sucks big time - 1 star"
          ></label>
          <input type="radio" id="starhalf" name="rating" value="0.5" /><label
            class="half"
            for="starhalf"
            title="Sucks big time - 0.5 stars"
          ></label>
        </fieldset>
        <a href="" class="Btn" @click="doneDeal()">CALIFICAR</a>
      </div>
    </div>
  </section>
</template>

<script>
import EventService from "@/services/EventService.js";
import { mapState } from "vuex";
import axios from "axios";
import store from "@/store/index";
import modalConfirmacion from "@/components/modalConfirmacion.vue";
export default {
  components: {
    modalConfirmacion
  },
  props: {
    id: Number,
    material: Object,
    usuario: Object
  },
  data() {
    return {
      canEdit: false,
      modalVisible: false,
      modalData: null,
      modalTitle: null,
      modalMessage: null,
      transaccion: {
        idMaterial: this.material.id,
        idUsuario: this.usuario.id
      }
    };
  },
  created() {
    EventService.getUser(this.id)
      .then(response => {
        // this.usuario = response.data;
        this.$store.commit("SET_EXT_DATA", response.data);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    doneDeal() {
      event.preventDefault();
      if (this.material.idEstado == 3) {
        // console.log("hello");
        axios.all([
          // axios.post(
          //   "http://localhost:9112/api/transactions",
          //   this.transaccion
          // ),
          axios.delete(
            "http://localhost:9112/api/request/" + store.state.request.id
          ),
          axios.delete(
            "http://localhost:9112/api/materials/" + this.material.id
          )
        ]);
        this.$router.push({ path: "/solicitudes" });
      } else {
        this.modalVisible = true;
      }
    },
    live() {
      axios.put(
        "http://localhost:9112/api/transactions/" + store.state.user.id
      );
      axios
        .put("http://localhost:9112/api/materials/activate/" + this.material.id)
        .then(() => {
          this.$router.push({
            name: "mis"
          });
        });
    },
    kill() {
      axios.delete(
        "http://localhost:9112/api/transactions/" + store.state.user.id
      );
      axios
        .delete("http://localhost:9112/api/materials/" + this.material.id)
        .then(() => {
          this.$router.push({
            name: "mis"
          });
        });
    }
  },
  computed: {
    ...mapState(["perfilExterno"]),
    Apellidos() {
      return (
        this.$store.state.perfilExterno.person.aPaterno +
        " " +
        this.$store.state.perfilExterno.person.aMaterno
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/s4.scss";
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
</style>
