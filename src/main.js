/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Multiselect from "vue-multiselect";
import Vuelidate from "vuelidate";
import "nprogress/nprogress.css";
import VueFuse from "vue-fuse";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
}),
  Vue.use(VueFuse);

Vue.use(Vuelidate);

Vue.component("multiselect", Multiselect);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     if (error.response.status === 401) {
    //       this.$store.dispatch("logout");
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  },
  render: h => h(App)
}).$mount("#app");
