<template>
  <section>
    <div class="wancho">
      <div class="enter">
        <h1>Publica un nuevo material</h1>
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
                  value="3"
                  @blur="$v.material.idEstado.$touch()"
                />
                <label for="venta">Venta</label>
                <input
                  type="radio"
                  v-model="material.idEstado"
                  id="alquiler"
                  name="estado"
                  value="4"
                  @blur="$v.material.idEstado.$touch()"
                />
                <label for="alquiler">Alquiler</label>
                <template v-if="$v.material.idEstado.$error">
                  <p v-if="!$v.material.idEstado.required" class="errorMsg">
                    Campo Requerido
                  </p>
                </template>
              </div>
            </div>
            <div class="form-full">
              <div class="r-form-input">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  v-model="material.nombre"
                  placeholder="Que vas a publicar? Busca un título corto pero poderoso!"
                  @blur="$v.material.nombre.$touch()"
                />
                <template v-if="$v.material.nombre.$error">
                  <p v-if="!$v.material.nombre.required" class="errorMsg">
                    Campo Requerido
                  </p>
                </template>
              </div>
            </div>
            <div class="form-group">
              <div class="r-form-input precio">
                <label for="precio">Precio</label>
                <span>S/.</span>
                <input
                  type="text"
                  v-model="material.precio"
                  @blur="$v.material.precio.$touch()"
                />
                <span class="aviso"
                  >Este precio debe ser proporcionado al tiempo
                  referencial.</span
                >
                <template v-if="$v.material.precio.$error">
                  <p v-if="!$v.material.precio.required" class="errorMsg">
                    Campo Requerido
                  </p>
                  <p v-if="!$v.material.precio.numeric" class="errorMsg">
                    Solo numeros
                  </p>
                </template>
              </div>
              <div class="r-form-input">
                <label class="typo__label">Categoría</label>
                <multiselect
                  v-model="value"
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
                  v-model="value2"
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
                  v-model="value3"
                  :options="carreras"
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Busca una carrera"
                  label="nombre"
                  :multiple="true"
                  :max="3"
                  track-by="id"
                  :taggable="true"
                ></multiselect>
              </div>
            </div>
            <div class="form-group">
              <div class="r-form-input">
                <label for="tiempoReferencial">Tiempo Referencial</label>
                <input
                  type="text"
                  v-model="material.tiempoRef"
                  :placeholder="
                    this.material.idEstado == 4
                      ? 'Cuanto tiempo piensas alquilar? '
                      : 'Añade tiempo si alquilas.'
                  "
                  :disabled="this.material.idEstado == 3"
                  :class="
                    this.material.idEstado == 3 ? 'desactivado' : 'activado'
                  "
                />
              </div>
              <div class="r-form-input">
                <!-- //OE, ACA IRÁN IMAGENES -->
                <label class="typo__label">Lugar de Encuentro</label>
                <multiselect
                  v-model="value4"
                  :options="lugares"
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Elige un lugar"
                  label="nombre"
                  :multiple="true"
                  :max="3"
                  track-by="id"
                  :taggable="true"
                ></multiselect>
              </div>
            </div>
            <div class="form-full">
              <div class="r-form-input">
                <label for="descripcion">Descripcion del Material</label>
                <textarea
                  name="descripcion"
                  v-model="material.descripcion"
                  placeholder="Añade una breve descripción de tu material"
                  id=""
                  cols="30"
                  rows="10"
                  @blur="$v.material.descripcion.$touch()"
                ></textarea>
                <template v-if="$v.material.descripcion.$error">
                  <p v-if="!$v.material.descripcion.required" class="errorMsg">
                    Campo Requerido
                  </p>
                </template>
              </div>
            </div>
            <button
              class="registrarBtn"
              v-on:click.stop.prevent="submit()"
              id="registrar-material"
              :disabled="$v.$anyError"
              :class="$v.$anyError ? 'desactivado' : 'activado'"
            >
              PUBLICAR
            </button>
            <p v-if="$v.$anyError" class="errorMsg">
              Llena todos los campos
            </p>
          </div>
          <div class="r-form-right">
            <div class="r-form-input">
              <label for="foto">Foto</label>
              <div class="card">
                <img src="@/assets/imgplaceholder.png" id="imgPreview" />
                <label class="file-upload-container" for="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    style="display:none;"
                    @change="onUpload"
                    @blur="$v.material.foto.$touch()"
                  />
                  Elige una imagen
                </label>
                <template v-if="$v.material.foto.$error">
                  <p v-if="!$v.material.foto.required" class="errorMsg">
                    Campo Requerido
                  </p>
                </template>
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
import { required, numeric, requiredIf } from "vuelidate/lib/validators";

export default {
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
      material: {
        idUsuario: store.state.user.id,
        idEstado: "4",
        nombre: "",
        precio: "",
        idCategoria: 0,
        idCondicion: 0,
        materialxcareer: [],
        tiempoRef: "",
        materialxplace: [],
        descripcion: "",
        foto: ""
      }
    };
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
  validations: {
    material: {
      idEstado: { required },
      nombre: { required },
      precio: { required, numeric },
      // categorias: { required },
      // condiciones: { required },
      // carreras: { required },
      // lugares: { required },
      tiempoRef: {
        required: requiredIf(function(material) {
          return (material.idEstado = "4");
        })
      },
      descripcion: { required },
      foto: { required }
    }
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
    //AXIOS

    submit() {
      this.$v.material.foto.$touch();
      this.$v.material.nombre.$touch();
      this.$v.material.descripcion.$touch();
      this.$v.material.precio.$touch();
      if (!this.$v.$invalid) {
        this.material.idCategoria = this.value.id;

        this.material.idCondicion = this.value2.id;

        this.value3.forEach(car => {
          this.material.materialxcareer.push({ idCarrera: car.id });
        });

        this.value4.forEach(lug => {
          this.material.materialxplace.push({ idLugar: lug.id });
        });

        // this.material.idLugar = this.value4.id;

        axios.post("http://localhost:9112/api/materials", this.material).then(
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
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/registrar-material.scss";
@import "../styles/components/vue-multiselect.min.css";
</style>
