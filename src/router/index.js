import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Materiales from "../views/Lista-materiales.vue";
import PreBusqueda from "../views/Pre-Busqueda.vue";
import Mis from "../views/Mis-materiales.vue";
import Registrar from "../views/Registrar-materiales.vue";
import DetalleMaterial from "../views/Detalle-material.vue";
import DetalleUsuario from "../views/Perfil-Externo.vue";
import SolicitudAceptada from "../views/Solicitud-Aceptada.vue";
import Editar from "../views/Editar-perfil.vue";
import EditarMaterial from "../views/Editar-Material.vue";
import Solicitudes from "../views/Lista-Solicitudes.vue";
import MatEnAlquiler from "../views/En-Alquiler.vue";
import Calificar from "../views/Calificar-Usuario.vue";
import ByCat from "../views/MaterialesByCat.vue";
import ByCar from "../views/MaterialesByCar.vue";
import ByFac from "../views/MaterialesByFac.vue";
import NProgress from "nprogress";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/solicitudes",
    component: Solicitudes,
    meta: { requiresAuth: true }
  },
  {
    path: "/calificar",
    name: "calificar",
    component: Calificar,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/enAlquiler",
    name: "enAlquiler",
    component: MatEnAlquiler,
    meta: { requiresAuth: true }
  },
  {
    path: "/perfilexterno",
    name: "perfilexterno",
    component: DetalleUsuario,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/aceptada",
    name: "aceptada",
    component: SolicitudAceptada,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/materiales",
    component: Materiales,
    meta: { requiresAuth: true }
  },
  {
    path: "/prebusqueda",
    component: PreBusqueda,
    meta: { requiresAuth: true }
  },
  {
    path: "/byCat",
    component: ByCat,
    name: "byCat",
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.state.category) {
        console.log("hey");
        next("/prebusqueda");
      }
      next();
    }
  },
  {
    path: "/byCar",
    component: ByCar,
    name: "byCar",
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.state.career) {
        console.log("hey");
        next("/prebusqueda");
      }
      next();
    }
  },
  {
    path: "/byFac",
    component: ByFac,
    name: "byFac",
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (!store.state.facultad) {
        console.log("hey");
        next("/prebusqueda");
      }
      next();
    }
  },
  {
    path: "/editarmaterial",
    name: "editarmaterial",
    component: EditarMaterial,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/mis",
    name: "mis",
    component: Mis,
    meta: { requiresAuth: true }
  },
  {
    path: "/registrar",
    component: Registrar,
    meta: { requiresAuth: true }
  },
  {
    path: "/detalleMaterial",
    name: "detallematerial",
    component: DetalleMaterial,
    props: true,
    meta: { requiresAuth: true }
    // beforeEnter: (to, from, next) => {
    //   if (!store.state.material) {
    //     console.log("hey");
    //     next("/");
    //   }
    //   next();
    // }
  },
  {
    path: "/perfil",
    name: "perfil",
    component: Editar,
    props: true,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    console.log("hey");
    next("/");
  }
  NProgress.start();
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
export default router;
