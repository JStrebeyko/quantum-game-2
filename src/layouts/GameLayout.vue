<template>
	<div class="game-layout">
		<header>
			<div class="left">
				<q-menu />
			</div>
			<div class="middle">
				<slot name="header-middle"></slot>
			</div>
			<div class="right">
				<slot name="header-right"></slot>
			</div>
		</header>
		<main>
			<aside class="left">
				<slot name="main-left"></slot>
			</aside>
			<article class="middle">
				<slot name="main-middle"></slot>
			</article>
			<aside class="right">
				<slot name="main-right"></slot>
			</aside>
		</main>
		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import QMenu from '../components/QMenu.vue';

@Component({
	components: {
		QMenu
	}
})
export default class GameLayout extends Vue {}
</script>

<style lang="scss" scoped>
.game-layout {
	width: 1400px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	color: white;
	width: 100%;
	align-items: center;
}
.middle {
	padding: 20px;
	align-content: center;
	justify-content: center;
	width: 65%;
}
.left,
.right {
	height: auto;
	width: 16%;
	padding: 20px;
}
header {
	width: 1400px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: none;
}
main,
footer {
	max-width: 1400px;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.placeholder {
	width: 100%;
	height: 200px;
	& h3 {
		margin: 0;
	}
	&.explanation {
		border-top: 1px solid white;
	}
	&.toolbox {
		border-top: 1px solid white;
	}
	&.goals {
		border-top: 1px solid white;
		height: 400px;
	}
	&.controls {
		border-top: 1px solid white;
		height: 100px;
	}
}
</style>
