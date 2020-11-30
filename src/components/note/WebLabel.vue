<template>
	<div class="web-label">
		<div class="content">
			<router-link
				v-for="(item, index) in webLabel"
				:key="index"
				:to="'/note/webPage/' + item.link"
				:class="item.sign" 
				:style="{color: item.color}"
			>{{ item.name }}</router-link>
		</div>
	</div>
</template>

<script>
import axios from "@/axios/note";
export default {
	data () {
		return{
			webLabel: [],
		}
	},
	async created () {
		const data = await axios.getNoteLabel();
		this.webLabel = data;
	}
}
</script>

<style lang="less">
.web-label {
	min-height: calc(100vh - 25vh);
	display: flex;
	justify-content: center;
	align-items: center;
	.content {
		max-width: 790px;
		min-width: 320px;
		// position: absolute;
		// left: 50%;
		// top: 50%;
		// transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		border-radius: 10px;
		transition: all .8s cubic-bezier(0, 0, 0.26, 0.76);
		a {
			font-size: 18px;
			color: #404040;
			text-decoration: none;
			height: 26px;
			line-height: 26px;
			border-bottom: 1px solid;
			margin: 8px 14px;
			filter: grayscale(70%);
			&:hover{
				filter: grayscale(0);
			}
			&.mark {
				font-size: 24px;
			}
			&.small {
				font-size: 14px;
			}
		}
	}
}
@media (max-width: 540px) {
	.web-label .content{
		position: static;
		transform: translate(0, 0);
		margin-top: 30px;
	}
}

</style>