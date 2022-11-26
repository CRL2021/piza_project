<template>
	<div class="detail">
		<header>
			<h1>详情</h1>
			<router-link to='/' class="goback-btn icon-chevron-left"></router-link>
		</header>
		<div class="cont">
			<h4>{{dish.name}}<span class="price">￥{{dish.price}}</span></h4>
			<button type="button" class="plus-btn icon-shopping-cart" 
			:class="dish.checked?'ac':''"></button>
			<div class="swiper-slide">
				<img :src="dish.img" class="slide-img"/>
			</div>
			<div class="describe">
				{{dish.describe}}
			</div>	
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			dish:null
		}
	},
	created(){
		this.dish=JSON.parse(this.$route.params.item);
	}
}
</script>

<style>
</style>
