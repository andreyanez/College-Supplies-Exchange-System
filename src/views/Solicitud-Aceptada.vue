<template>
  <section>
    <div class="wancho">
      <h1>Solicitud Aceptada!</h1>
      <h2>Aqui tienes la información del solicitante</h2>
      <div class="wrapper">
        <li @click="$router.go(-1)" class="back-enlace">
          <a>Continua a Solicitudes</a>
          <img src="@/assets/arrow_back.svg" />
        </li>
        <div class="wrapper-left">
          <img :src="perfilExterno.person.foto" alt="" class="profile-img" />
          <a href="" class="item-enlace" style="pointer-events: none">{{
            perfilExterno.username
          }}</a>
        </div>
        <div class="wrapper-right">
          <!-- <h2>Contactate lo más antes posible!</h2> -->
          <div class="p-input">
            <span>Nombres</span>
            <input
              type="text"
              class="p-input"
              disabled
              :value="perfilExterno.person.nombre"
            />
          </div>
          <div class="p-input">
            <span>Apellidos</span>
            <input type="text" class="p-input" disabled :value="Apellidos" />
          </div>
          <div class="p-input">
            <span>Correo Electrónico</span>
            <input
              type="text"
              class="p-input"
              :value="perfilExterno.person.correo"
              disabled
              v-on:keyup.enter="editarP"
            />
          </div>
          <div class="p-input">
            <span>Teléfono</span>
            <input
              type="text"
              class="p-input"
              :value="perfilExterno.person.celular1"
              disabled
            />
          </div>
          <div class="p-input">
            <span>Teléfono 2</span>
            <input
              type="text"
              class="p-input"
              :value="perfilExterno.person.celular2"
              disabled
            />
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
