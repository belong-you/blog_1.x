<template>
	<div class="stay">
		<div class="wrapper">
			<discuss-plate address='stay' />
		</div>
	</div>
</template>

<script>
export default {
	components: {
		DiscussPlate: () => import(/* webpackChunkName: "stay" */ '@/components/discuss/DiscussPlate'),
	},
};
</script>

<style lang="less">
.wrapper{
	margin-top: 20px;
}
</style>