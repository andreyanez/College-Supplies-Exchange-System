<template>
	<div>
		<intro />
	</div>
</template>

<script>
// @ is an alias to /src
import intro from '@/components/intro.vue';
import { authComputed } from '../store/helpers.js';

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Home',
	components: {
		intro,
	},
	computed: {
		...authComputed,
	},
};
</script>
