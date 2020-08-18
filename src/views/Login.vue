<template>
  <div class="login-ctn">
    <div id="cuadro">
      <center>
        <img id="imagen" src="@/assets/SVG/sim_verde.svg" />
      </center>
      <form @submit.prevent="login">
        <h1 id="ingreso">Ingresa tus datos</h1>
        <div class="inputs-padre">
          <input
            v-model="codUsuario"
            placeholder="Ingresa tu código de alumno"
            class="entrada"
            type="text"
            name="codUsuario"
            value
          />

          <input
            v-model="password"
            type="password"
            class="entrada"
            placeholder="Contraseña"
            name="password"
            @blur="$v.password.$touch()"
          />
          <p>{{ error }}</p>
        </div>

        <button
          type="submit"
          name="button"
          class="Btn"
          :disabled="$v.$anyError"
          :class="$v.$anyError ? 'desactivado' : 'activado'"
        >
          INGRESAR
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      codUsuario: "",
      password: "",
      error: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          codUsuario: this.codUsuario,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "Inicio" });
        })
        .catch(err => {
          this.error = err.response.data;
        });
    }
  },
  validations: {
    // codUsuario: { required },
    password: { required }
  }
};
</script>

<style lang="scss" scoped>
a:visited {
  color: #2c3e50;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 15em;
  margin-bottom: 2em;

  p {
    font-size: 12px;
    font-family: $t-3;
    color: red;
    position: absolute;
    bottom: -44px;
  }
  li {
    font-size: 12px;
    color: red;
  }
}

.login-ctn {
  height: 82vh;
  display: flex;
}

#cuadro {
  margin: auto;
  border-radius: 15px;
  width: 432px;
  height: 549px;
  background: #f2f2f2;
}

#imagen {
  margin-top: 50px;
  max-width: 100%;
  height: auto;
  width: 100px;
}

form h1 {
  margin: auto;
  padding-top: 44px;
  padding-bottom: 33px;
  text-align: center;
  font-family: $t-1;
  font-size: 24px;
  color: #000000;
}

form input {
  margin-bottom: 12px;
}

.inputs-padre {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 58px;
  position: relative;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px $c3 inset;
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: $c7;
}
.entrada {
  box-sizing: border-box;
  border: 0px;
  padding-left: 15px;
  border-radius: 6px;
  width: 343px;
  height: 55px;
  font-family: arial;
  font-weight: 100;
  outline: none;
}

.Btn {
  &.desactivado {
    opacity: 0.7;
    &:hover {
      background: $c1;
      color: $c6;
    }
  }
}

.boton {
  box-sizing: border-box;
  border: 0px;
  margin-top: 7%;
  margin-left: 31.5%;
  width: 157px;
  height: 50px;
  border-radius: 7px;
  background: #2da15f;
  color: #ffffff;
  font-size: 13px;
  font-weight: bold;
  font-family: SF Pro Text;
  opacity: 0.9;
  transition: all 100ms ease;
}

.boton:hover {
  box-shadow: 5px 10px #888888;
  color: #000000;
}
@media (max-width: 414px) {
  #cuadro {
    background: none;
    margin: 0;
    border-radius: 15px;
    width: 100%;
    height: auto;
  }
  .entrada {
    background: $c3;
  }
  .login-ctn {
    height: 78vh;
  }
}
</style>
