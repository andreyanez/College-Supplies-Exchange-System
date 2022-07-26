<template>
  <section class="externoBlock">
    <div class="wancho">
      <li @click="$router.go(-1)" class="back-enlace">
        <img src="@/assets/arrow_back.svg" />
        <a>Seguir buscando</a>
      </li>
      <h1>{{ perfilExterno.username }}</h1>
      <h2>Explora las reseñas de este usuario</h2>
      <div class="wrapper">
        <div class="wrapper-left">
          <img :src="perfilExterno.person.foto" alt="" class="profile-img" />
          <!-- <a href="" class="item-enlace">Editar Foto ></a> -->
        </div>
        <div class="wrapper-right externo">
          <div class="p-input">
            <span>Username</span>
            <input
              type="text"
              class="p-input"
              :value="perfilExterno.username"
              disabled
            />
          </div>
          <div class="b1-block">
            <h2>Información del propietario</h2>
            <div class="fantasy1">
              <div class="fantasyNum">
                <h2>61</h2>
                <span>calificaciones</span>
              </div>
              <ul class="fantasyGraph">
                <li class="great">
                  <span class="bar"><span></span></span>
                  <h3>20</h3>
                </li>
                <li class="meh">
                  <span class="bar"><span></span></span>
                  <h3>30</h3>
                </li>
                <li class="bad">
                  <span class="bar"><span></span></span>
                  <h3>11</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventService from "@/services/EventService.js";
import { mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      canEdit: false
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
  computed: {
    ...mapState(["perfilExterno"]),
    age() {
      var today = new Date();
      var birthDate = new Date(this.$store.state.perfilExterno.person.fecNac);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
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
@import "../styles/views/editar-perfil.scss";
</style>
