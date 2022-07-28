<template>
	<section>
		<div class="wancho">
			<h1>Mi Perfil</h1>
			<h2>Cambiar tu apodo, correo o teléfono</h2>
			<div class="wrapper">
				<div class="wrapper-left">
					<img :src="user.person.foto" alt="" class="profile-img" />
					<!-- <a href="" class="item-enlace">Editar Foto ></a> -->
					<router-link to="/mis" tag="a" class="Btn"
						>MIS PUBLICACIONES</router-link
					>
				</div>
				<div class="wrapper-right">
					<div class="p-input">
						<span>Username</span>
						<input
							type="text"
							class="p-input"
							:value="username"
							@input="updateUsername"
							:disabled="canEdit == false"
							v-on:keyup.enter="editarP"
						/>
						<img @click="editar" src="@/assets/SVG/pencil-perfil.svg" alt="" />
					</div>
					<div class="p-input">
						<span>Nombres</span>
						<input
							type="text"
							class="p-input"
							disabled
							:value="user.person.nombre"
						/>
					</div>
					<div class="p-input">
						<span>Apellidos</span>
						<input type="text" class="p-input" disabled :value="Apellidos" />
					</div>
					<div class="p-input">
						<span>Edad</span>
						<input type="text" class="p-input" disabled :value="age" />
					</div>
					<div class="p-input">
						<span>Carrera</span>
						<input
							type="text"
							class="p-input"
							disabled
							:value="user.person.perFacultad"
						/>
					</div>
					<div class="p-input">
						<span>Correo Electrónico</span>
						<input
							type="text"
							class="p-input"
							:value="correo"
							@input="updateCorreo"
							:disabled="canEdit == false"
							v-on:keyup.enter="editarP"
						/>
						<img @click="editar" src="@/assets/SVG/pencil-perfil.svg" alt="" />
					</div>
					<div class="p-input">
						<span>Teléfono</span>
						<input
							type="text"
							class="p-input"
							:value="celular1"
							@input="updateCelular1"
							:disabled="canEdit == false"
							v-on:keyup.enter="editarP"
						/>
						<img @click="editar" src="@/assets/SVG/pencil-perfil.svg" alt="" />
					</div>
					<div class="p-input">
						<span>Teléfono 2</span>
						<input
							type="text"
							class="p-input"
							:value="celular2"
							@input="updateCelular2"
							:disabled="canEdit == false"
							v-on:keyup.enter="editarP"
						/>
						<img @click="editar" src="@/assets/SVG/pencil-perfil.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import store from '@/store/index';
export default {
	data() {
		return {
			canEdit: false,
		};
	},
	methods: {
		editarP() {
			axios
				.patch(
					'http://localhost:9112/api/users/update/' + store.state.user.id,
					store.state.user
				)
				.then(
					response => {
						console.log(response);
					}
					// error => {
					// 	console.log(error);
					// }
				);
		},
		editar() {
			this.canEdit = !this.canEdit;
		},
		updateUsername(e) {
			this.$store.commit('updateUsername', e.target.value);
		},
		updateCorreo(e) {
			this.$store.commit('updateCorreo', e.target.value);
		},
		updateCelular1(e) {
			this.$store.commit('updateCelular1', e.target.value);
		},
		updateCelular2(e) {
			this.$store.commit('updateCelular2', e.target.value);
		},
	},
	computed: {
		age() {
			var today = new Date();
			var birthDate = new Date(this.$store.state.user.person.fecNac);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		Apellidos() {
			return (
				this.$store.state.user.person.aPaterno +
				' ' +
				this.$store.state.user.person.aMaterno
			);
		},
		...mapState({
			user: state => state.user,
			username: state => state.user.username,
			correo: state => state.user.person.correo,
			celular1: state => state.user.person.celular1,
			celular2: state => state.user.person.celular2,
		}),
	},
};
</script>

<style lang="scss" scoped>
@import '../styles/views/editar-perfil.scss';
</style>
