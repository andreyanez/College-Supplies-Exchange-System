<template>
  <section class="b1">
    <div class="wancho">
      <modalSolicitar v-if="modalVisible" @confirmar="sendRequest">
        <!--
      you can use custom content here to overwrite
      default content
    -->
        <!-- <h1 slot="header">{{ modalTitle }}</h1> -->
        <div slot="body" class="modalBody">
          <div class="modal-img">
            <img :src="material.foto" id="imgPreview" />
          </div>
          <div class="modal-info">
            <li to="/mis" class="back-enlace" @click="modalVisible = false">
              <img src="@/assets/arrow_back.svg" /><a>Volver</a>
            </li>
            <h1>{{ material.nombre }}</h1>
            <div class="modal-datos">
              <h2>S/.{{ material.precio }}.00</h2>
              <div v-if="material.idEstado == 4" class="modal-tipo">
                <img src="@/assets/SVG/time.svg" />
                <h3>Alquiler</h3>
              </div>
              <div v-else class="modal-tipo">
                <img src="@/assets/SVG/enventa.svg" />
                <h3>Venta</h3>
              </div>
            </div>
            <div class="modal-desc">
              <h2>Descripcion</h2>
              <textarea
                name="descripcion"
                v-model="solicitud.comentario"
                placeholder="Describe tu solicitud, trata de ser convincente."
                cols="30"
                rows="10"
              ></textarea>
              <div class="modal-warning" v-if="emptyRequest == true">
                <p>
                  Por favor, ingresa una descripcion. Ayudará a que tu solicitud
                  sea aceptada!
                </p>
              </div>
            </div>
          </div>
        </div>
      </modalSolicitar>
      <li @click="$router.go(-1)" class="back-enlace">
        <img src="@/assets/arrow_back.svg" />
        <a>Seguir buscando</a>
      </li>
      <div class="b1-ctn">
        <div class="b1-top">
          <div class="b1-img">
            <img :src="material.foto" id="imgPreview" />
          </div>
          <div class="b1-details">
            <span>{{ material.category.nombre }}</span>
            <h1>{{ material.nombre }}</h1>
            <h2>S/.{{ material.precio }}</h2>
            <div class="b1-alquiler">
              <div v-if="material.idEstado == 4" class="b1-tipo">
                <img src="@/assets/SVG/time.svg" />
                <div class="b1-info">
                  <h3>Alquiler</h3>
                  <h4>Tiempo Referencial: {{ material.tiempoRef }}</h4>
                </div>
              </div>
              <div
                v-else
                class="b1-tipo"
                :class="material.idEstado == 4 ? 'tipoAlquiler' : 'tipoVenta'"
              >
                <img src="@/assets/SVG/enventa.svg" />
                <div class="b1-info">
                  <h3>Venta</h3>
                </div>
              </div>
              <div class="b1-info condicion">
                <h3>Estado</h3>
                <h4 v-if="material.condition.id == 1" class="optimo">Óptimo</h4>
                <h4 v-if="material.condition.id == 2" class="gastado">
                  Usado
                </h4>
                <h4 v-if="material.condition.id == 3" class="depreciar">
                  Por Depreciar
                </h4>
              </div>
            </div>
            <div class="b1-lugar">
              <ul>
                <li
                  v-for="lugar in material.materialxplace"
                  v-bind:key="lugar.id"
                >
                  <img src="@/assets/SVG/place.svg" alt="" />{{
                    lugar.place.nombre
                  }}
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="Btn"
              @click="solicitarMaterial(material)"
              v-if="
                material.user.id != this.$store.state.user.id &&
                  estado != 'Pendiente'
              "
            >
              SOLICITAR MATERIAL
            </button>
          </div>
        </div>
        <div class="b1-bottom">
          <div class="b1-block">
            <h2>Detalle de Producto</h2>
            <div class="b1-parrafo">
              <p>{{ material.descripcion }}</p>
            </div>
          </div>
          <div class="b1-owner">
            <div class="b1-block">
              <h2>Información del propietario</h2>
              <div class="fantasy1">
                <div class="fantasyNum">
                  <h2>32</h2>
                  <span>calificaciones</span>
                </div>
                <ul class="fantasyGraph">
                  <li class="great">
                    <span class="bar"><span></span></span>
                    <h3>24</h3>
                  </li>
                  <li class="meh">
                    <span class="bar"><span></span></span>
                    <h3>6</h3>
                  </li>
                  <li class="bad">
                    <span class="bar"><span></span></span>
                    <h3>2</h3>
                  </li>
                </ul>
              </div>
            </div>
            <div class="b1-block">
              <!-- <h2>Información del propietario</h2> -->
              <div class="b1-num">
                <h3>{{ material.user.username }}</h3>
                <div class="b1-star">
                  <img src="@/assets/star.png" alt="" />
                  <h3>4.25</h3>
                </div>
              </div>
              <div class="fantasyGraph1">
                <div class="great"><span>75%</span></div>
                <div class="meh"><span>19%</span></div>
                <div class="bad"><span>6%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import VueUploadMultipleImage from 'vue-upload-multiple-image'
import axios from "axios";
import store from "@/store/index";
import EventService from "@/services/EventService.js";
import modalSolicitar from "@/components/modalSolicitar.vue";

export default {
  components: {
    modalSolicitar
  },
  props: {
    id: Object,
    estado: String
  },
  data() {
    return {
      //select
      emptyRequest: false,
      modalVisible: false,
      modalData: null,
      modalTitle: null,
      modalMessage: null,
      material: {
        idUsuario: store.state.user.id,
        idEstado: null,
        nombre: "",
        precio: "",
        idCategoria: 0,
        idCondicion: 0,
        materialxcareer: [],
        tiempoRef: "",
        materialxplace: [],
        descripcion: "",
        foto: ""
      },
      solicitud: {
        comentario: "",
        idMaterial: null,
        idUsuario: store.state.user.id
      }
    };
  },
  created() {
    EventService.getMaterial(this.id)
      .then(response => {
        this.material = response.data;
        // this.material.materialxplace = response.data.materialxplace.map(
        //   place => ({
        //     nombre: place.place.nombre,
        //     id: place.place.id
        //   })
        // );
        // this.material.materialxcareer = response.data.materialxcareer.map(
        //   car => ({
        //     nombre: car.career.nombre,
        //     id: car.career.id
        //   })
        // );
        this.$store.commit("GET_MATERIAL", response.data);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  methods: {
    solicitarMaterial(material) {
      if (material.alquiler == false) {
        event.preventDefault();
        this.modalVisible = true;
        // this.modalTitle = "No puedes editar el material!";
        // this.modalMessage = material.nombre;
      }
      // else {
      //   this.$router.push({
      //     name: "editarmaterial",
      //     params: { id: material.id }
      //   });
      // }
    },
    sendRequest() {
      if (!this.solicitud.comentario) {
        console.log("he");
        this.emptyRequest = true;
      } else {
        this.emptyRequest = false;
        this.solicitud.idMaterial = store.state.material.id;
        const answer = window.confirm("Seguro que buscas este material?");
        if (answer) {
          axios.post("http://localhost:9112/api/requests", this.solicitud).then(
            response => {
              console.log(response);
              this.$router.push({ path: "/solicitudes" });
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/s1.scss";
</style>
