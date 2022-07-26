import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      person: {
        nombre: "",
        correo: "",
        perFacultad: "",
        foto: "",
        fecNac: "",
        aPaterno: "",
        aMaterno: "",
        celular1: null,
        celular2: null
      },
      username: "",
      token: "",
      id: null,
      codUsuario: ""
    },
    materiales: [],
    material: null,
    requests: null,
    usuarioCompleto: null,
    request: [],
    transactions: [],
    transaction: null,
    category: null,
    career: null,
    facultad: null,
    perfilExterno: {
      person: {
        nombre: "",
        correo: "",
        perFacultad: "",
        foto: "",
        fecNac: "",
        aPaterno: "",
        aMaterno: "",
        celular1: null,
        celular2: null
      },
      username: "",
      token: "",
      id: null,
      codUsuario: ""
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      // state.user = userData;
      (state.user.username = userData.username),
        (state.user.id = userData.id),
        (state.user.codUsuario = userData.codUsuario),
        (state.user.token = userData.token),
        (state.user.person.nombre = userData.nombre),
        (state.user.person.correo = userData.correo),
        (state.user.person.perFacultad = userData.perFacultad),
        (state.user.person.foto = userData.foto),
        (state.user.person.fecNac = userData.fecNac),
        (state.user.person.aPaterno = userData.aPaterno),
        (state.user.person.aMaterno = userData.aMaterno),
        (state.user.person.celular1 = userData.celular1),
        (state.user.person.celular2 = userData.celular2),
        localStorage.setItem("user", JSON.stringify(userData));
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${userData.token}`;
    },
    SET_EXT_DATA(state, userData) {
      state.perfilExterno = userData;
    },
    SET_COMPLETE_USER(state, userData) {
      state.usuarioCompleto = userData;
    },
    SET_TRANSACTION(state, transaction) {
      state.transaction = transaction;
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
    updateUsername(state, username) {
      state.user.username = username;
    },
    updateCorreo(state, correo) {
      state.user.person.correo = correo;
    },
    updateCelular1(state, celular1) {
      state.user.person.celular1 = celular1;
    },
    updateCelular2(state, celular2) {
      state.user.person.celular2 = celular2;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    GET_MATERIALES(state, materiales) {
      state.materiales = materiales;
    },
    GET_MATERIAL(state, material) {
      state.material = material;
    },
    GET_REQUESTS(state, requests) {
      state.requests = requests;
    },
    GET_REQUEST(state, request) {
      state.request = request;
    },
    GET_CAT(state, cat) {
      state.category = cat;
    },
    GET_CAR(state, car) {
      state.career = car;
    },
    GET_FAC(state, fac) {
      state.facultad = fac;
    }
  },
  actions: {
    login({ commit }, credentials) {
      return axios
        .post("//localhost:9112/api/users/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    getMateriales(context) {
      axios
        .get(
          "http://localhost:9112/api/materials/cod/" + this.$store.state.user.id
        )
        .then(response => {
          context.commit("GET_MATERIALES", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user.id;
    },
    getMaterialById: state => id => {
      return state.materiales.find(material => material.id === id);
    }
  }
});
