<template>
  <section>
    <div class="wancho">
      <div class="enter">
        <h1>{{ material.nombre }}</h1>
        <router-link to="/mis" tag="li" active-class="active" exact
          ><img src="@/assets/arrow_back.svg" /><a
            >Volver al inventario</a
          ></router-link
        >
      </div>
      <div class="registrar-form">
        <form action="" id="registrar-form-id">
          <div class="r-form-left">
            <div class="form-full">
              <div class="r-form-radio">
                <input
                  type="radio"
                  v-model="material.idEstado"
                  id="venta"
                  name="estado"
                  value="4"
                  disabled
                />
                <label for="venta">Venta</label>
                <input
                  type="radio"
                  v-model="material.idEstado"
                  id="alquiler"
                  name="estado"
                  value="3"
                  disabled
                />
                <label for="alquiler">Alquiler</label>
              </div>
            </div>
            <div class="form-full">
              <div class="r-form-input">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  v-model="material.nombre"
                  placeholder="Que vas a publicar? Busca un título corto pero poderoso!"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="r-form-input precio">
                <label for="precio">Precio</label>
                <span>S/.</span>
                <input type="text" v-model="material.precio" />
                <span class="aviso"
                  >Este precio debe ser proporcionado al tiempo
                  referencial.</span
                >
              </div>
              <div class="r-form-input">
                <label class="typo__label">Categoría</label>
                <multiselect
                  v-model="material.category"
                  :options="categorias"
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Elige una categoría"
                  label="nombre"
                  track-by="id"
                ></multiselect>
              </div>
            </div>
            <div class="form-group">
              <div class="r-form-input">
                <label class="typo__label">Condición</label>
                <multiselect
                  v-model="material.condition"
                  :options="condiciones"
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Elige una condicion"
                  label="nombre"
                  track-by="id"
                ></multiselect>
              </div>
              <div class="r-form-input carreras">
                <label class="typo__label">Carrera</label>
                <span>Max: 3 Carreras</span>
                <multiselect
                  v-model="material.materialxcareer"
                  track-by="id"
                  label="nombre"
                  :options="carreras"
                  :multiple="true"
                  :max="3"
                  tag-placeholder=""
                  placeholder="Busca una carrera"
                ></multiselect>
              </div>
            </div>
            <div class="form-group">
              <div class="r-form-input">
                <label for="tiempoReferencial">Tiempo Referencial</label>
                <input
                  type="text"
                  v-model="material.tiempoRef"
                  placeholder="Cuanto tiempo piensas alquilar?"
                />
              </div>
              <div class="r-form-input">
                <!-- //OE, ACA IRÁN IMAGENES -->
                <label class="typo__label">Lugar de Encuentro</label>
                <multiselect
                  v-model="material.materialxplace"
                  :options="lugares"
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Elige un lugar"
                  label="nombre"
                  :multiple="true"
                  :max="3"
                  track-by="id"
                ></multiselect>
              </div>
            </div>
            <div class="form-full">
              <div class="r-form-input">
                <label for="descripcion">Descripcion</label>
                <textarea
                  name="descripcion"
                  v-model="material.descripcion"
                  placeholder="Añade una breve descripción de tu material"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <button
              class="registrarBtn"
              v-on:click.stop.prevent="submit()"
              id="registrar-material"
            >
              GUARDAR
            </button>
          </div>
          <div class="r-form-right">
            <div class="r-form-input">
              <label for="foto">Foto</label>
              <div class="card">
                <img :src="material.foto" id="imgPreview" />
                <label class="file-upload-container" for="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    style="display:none;"
                    @change="onUpload"
                  />
                  Elige una imagen
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// import VueUploadMultipleImage from 'vue-upload-multiple-image'
import Multiselect from "vue-multiselect";
import axios from "axios";
import store from "@/store/index";
import EventService from "@/services/EventService.js";

export default {
  props: ["id"],
  data() {
    return {
      //select
      value: null,
      categorias: [],
      value2: null,
      condiciones: [],
      value3: null,
      carreras: [],
      value4: null,
      lugares: [],
      //select
      materialxcareer2: [],
      materialxplace2: [],
      material: {
        idUsuario: store.state.user.id,
        idEstado: null,
        nombre: "",
        precio: "",
        idCategoria: 0,
        idCondicion: 0,
        tiempoRef: "",
        materialxcareer: [],
        materialxplace: [],
        descripcion: "",
        foto: ""
      }
    };
  },
  created() {
    EventService.getMaterial(this.id)
      .then(response => {
        this.material = response.data;
        this.material.materialxplace = response.data.materialxplace.map(
          place => ({
            nombre: place.place.nombre,
            id: place.place.id
          })
        );
        this.material.materialxcareer = response.data.materialxcareer.map(
          car => ({
            nombre: car.career.nombre,
            id: car.career.id
          })
        );
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  mounted() {
    axios.get("http://localhost:9112/api/conditions").then(response => {
      this.condiciones = response.data;
    });

    axios.get("http://localhost:9112/api/categories").then(response => {
      this.categorias = response.data;
    });

    axios.get("http://localhost:9112/api/careers").then(response => {
      this.carreras = response.data;
    });

    axios.get("http://localhost:9112/api/places").then(response => {
      this.lugares = response.data;
    });
  },

  components: {
    Multiselect
  },

  methods: {
    onUpload() {
      var file = event.target.files[0];
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "eeobvkf1");
      axios({
        url: "https://api.cloudinary.com/v1_1/simuniver/upload",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: fd
      }).then(
        response => {
          document.getElementById("imgPreview").src = response.data.secure_url;
          this.material.foto = response.data.secure_url;
        },
        error => {
          console.log(error);
        }
      );
    },
    // AXIOS
    submit() {
      this.material.idCategoria = this.material.category.id;

      this.material.idCondicion = this.material.condition.id;

      this.material.materialxcareer.forEach(car => {
        this.materialxcareer2.push({ idCarrera: car.id });
      });

      this.material.materialxcareer = this.materialxcareer2;

      this.material.materialxplace.forEach(lug => {
        this.materialxplace2.push({ idLugar: lug.id });
      });

      this.material.materialxplace = this.materialxplace2;

      axios
        .put(
          "http://localhost:9112/api/materials/update/" + this.material.id,
          this.material
        )
        .then(
          response => {
            console.log(response);
            this.$router.push({ path: "/mis" });
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/registrar-material.scss";
@import "../styles/components/vue-multiselect.min.css";
</style>
