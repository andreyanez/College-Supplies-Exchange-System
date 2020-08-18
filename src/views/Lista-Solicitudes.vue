<template>
  <section class="b3">
    <div class="wancho">
      <h1>Mis Solicitudes</h1>
      <div class="b3-tabs">
        <span class="b3-tab" @click="search1" :class="{ active: isActive }"
          >SOLICITUDES DE BÚSQUEDA</span
        >
        <span class="b3-tab" @click="search2" :class="{ active: !isActive }"
          >SOLICITUDES DE MIS MATERIALES</span
        >
      </div>
      <div class="b3-wrap" v-if="this.isActive == true">
        <div
          class="b3-item"
          v-for="request in requests"
          v-bind:key="request.id"
        >
          <h2>{{ request.material.nombre }}</h2>
          <div class="b3-pack">
            <div class="b3-info">
              <img
                v-if="request.material.idEstado == 4"
                class="b3-item-icono"
                src="@/assets/SVG/time.svg"
              />
              <img
                v-if="request.material.idEstado == 3"
                class="b3-item-icono"
                src="@/assets/SVG/enventa.svg"
              />
              <img src="../assets/SVG/request-user.svg" />
              <span class="b3-nombre">{{
                request.material.user.username
              }}</span>
              <!-- <span class="b3-rating">4.25</span> -->
              <router-link
                :to="{
                  name: 'perfilexterno',
                  params: { id: request.material.user.id }
                }"
                tag="a"
                class="item-enlace"
                >Información del usuario
                <img src="@/assets/arrow_back.svg" alt="" />
              </router-link>
              <router-link
                :to="{
                  name: 'detallematerial',
                  params: { id: request.material.id, estado: request.estado }
                }"
                tag="a"
                class="item-enlace ver"
                >Ver Material
                <img src="@/assets/arrow_back.svg" alt="" />
              </router-link>
              <h4>Hace {{ dias(request) }}</h4>
            </div>
            <div class="b3-desc">
              <div class="b3-text">
                <p>{{ request.comentario }}</p>
              </div>
              <h3>Estado: {{ request.estado }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="b3-wrap" v-else>
        <div
          class="b3-item"
          v-for="request in requests"
          v-bind:key="request.id"
        >
          <h2>{{ request.material.nombre }}</h2>
          <div class="b3-pack">
            <div class="b3-info">
              <img
                v-if="request.material.idEstado == 4"
                class="b3-item-icono"
                src="@/assets/SVG/time.svg"
              />
              <img
                v-if="request.material.idEstado == 3"
                class="b3-item-icono"
                src="@/assets/SVG/enventa.svg"
              />
              <img src="../assets/SVG/request-user.svg" />
              <span class="b3-nombre">{{ request.usuario.username }}</span>
              <!-- <span class="b3-rating">4.25</span> -->
              <router-link
                :to="{
                  name: 'perfilexterno',
                  params: { id: request.usuario.id }
                }"
                tag="a"
                class="item-enlace"
                >Información del solicitante
                <img src="@/assets/arrow_back.svg" alt="" />
              </router-link>
              <router-link
                :to="{
                  name: 'detallematerial',
                  params: { id: request.material.id }
                }"
                tag="a"
                class="item-enlace"
                >Ver Material
                <img src="@/assets/arrow_back.svg" alt="" />
              </router-link>
              <h4>Hace {{ dias(request) }}</h4>
            </div>
            <div class="b3-desc">
              <div class="b3-text">
                <p>{{ request.comentario }}</p>
              </div>
              <div
                class="b3-botones transaccion"
                v-if="request.estado == 'En Proceso'"
              >
                <h4>Se completo la transacción?</h4>
                <a href="" class="Btn" @click="rateUser(request)">Si</a>
                <a href="" class="Btn" @click="reactivateRequest(request)"
                  >No</a
                >
              </div>
              <div class="b3-botones" v-else>
                <a
                  href=""
                  class="Btn"
                  @click="acceptRequest(request)"
                  :disabled="request.material.alquiler == true"
                  :class="request.material.alquiler == true ? 'disabled' : null"
                  >ACEPTAR
                  <span class="b3-alert"
                    >Al aceptar, recibirás los datos del solicitante</span
                  ></a
                >

                <a
                  href=""
                  class="Btn"
                  @click="removeRequest(request)"
                  :disabled="request.material.alquiler == true"
                  :class="request.material.alquiler == true ? 'disabled' : null"
                  >RECHAZAR</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
import EventService from "@/services/EventService.js";
export default {
  data() {
    return {
      isActive: true,
      doneAlquiler: false,
      requests: [],
      transactions: [],
      transaccion: {
        idMaterial: null,
        idUsuario: null
      }
    };
  },
  created() {
    EventService.getUser(store.state.user.id).then(response => {
      this.$store.commit("SET_COMPLETE_USER", response.data);
    });
    axios
      .get("http://localhost:9112/api/requests/user/" + store.state.user.id)
      .then(response => {
        this.requests = response.data;
        this.$store.commit("GET_REQUESTS", response.data);
      });
    // axios
    //   .get("http://localhost:9112/api/transactions/cod/" + store.state.user.id)
    //   .then(response => {
    //     this.transactions = response.data;
    //     this.$store.commit("SET_TRANSACTIONS", response.data);
    //   });
  },
  methods: {
    dias(request) {
      moment.updateLocale("en", {
        relativeTime: {
          past: "%s atrás",
          d: "un día",
          dd: "%d días",
          hh: "%d horas",
          h: "una hora",
          mm: "%d minutos",
          m: "un minuto",
          s: "unos segundos"
        }
      });
      var dia = moment(String(request.fecha)).fromNow();

      return dia;
    },
    search1() {
      axios
        .get("http://localhost:9112/api/requests/user/" + store.state.user.id)
        .then(
          response => {
            console.log(response);
            this.requests = response.data;
            this.isActive = true;
            this.$store.commit("GET_REQUESTS", response.data);
          },
          error => {
            console.log(error);
          }
        );
    },
    search2() {
      axios
        .get("http://localhost:9112/api/requests/" + store.state.user.id)
        .then(
          response => {
            console.log(response);
            this.requests = response.data;
            this.isActive = false;
            this.$store.commit("GET_REQUESTS", response.data);
          },
          error => {
            console.log(error);
          }
        );
    },
    acceptRequest(request) {
      event.preventDefault();
      axios.put("http://localhost:9112/api/request/activate/" + request.id);

      this.$store.commit("GET_REQUEST", request.id);

      this.$router.push({
        name: "aceptada",
        params: { id: request.idUsuario }
      });
    },
    rateUser(request) {
      event.preventDefault();
      //venta
      if (request.material.idEstado == 3) {
        this.$store.commit("GET_MATERIAL", request.material);
        this.$store.commit("GET_REQUEST", request);
        this.$router.push({
          name: "calificar",
          params: {
            id: request.idUsuario,
            material: request.material,
            usuario: request.usuario
          }
        });
      } else {
        this.$store.commit("GET_MATERIAL", request.material);
        this.$store.commit("GET_REQUEST", request);
        this.transaccion.idMaterial = request.idMaterial;
        this.transaccion.idUsuario = request.idUsuario;
        axios.post("http://localhost:9112/api/transactions", this.transaccion);
        axios
          .delete("http://localhost:9112/api/request/" + request.id)
          .then(() => {
            this.$router.push({
              name: "mis"
            });
          });
      }
      //alquiler
    },
    removeRequest(request) {
      axios
        .delete("http://localhost:9112/api/request/" + request.id)
        .then(() => {
          location.reload();
        });
    },
    reactivateRequest(request) {
      axios.put("http://localhost:9112/api/request/reactivate/" + request.id);
      axios
        .delete("http://localhost:9112/api/request/" + request.id)
        .then(() => {
          location.reload();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/s3.scss";
</style>
