<template>	
<div class="list">
	<header>
		<h1>搜索结果</h1>
		<router-link to='/' class="goback-btn icon-chevron-left"></router-link>
		<span class="total">共{{searchList.length}}条</span>
	</header>
	<div>
			<ul class="good-list">
				<li v-for="list in searchList" :key='list.id'>
					<router-link :to="{name:'Detail',params:{item:JSON.stringify(list)}}"> 
						<img :src='list.img' />
						<h3>{{list.name}}</h3>
					</router-link>
					<p class="ellipsis">{{list.describe}}</p>
					<strong>￥{{list.price}}</strong>
					<button type="button" :class="['pointer-btn',list.checked?'ac':'']">点餐</button>
				</li>						
			</ul>					
	</div>
	<div v-if="searchList.length==0" style="text-align: center;">没有找到你需要的菜品！</div>	
</div>
	
</template>

<script>
export default{
	data(){
		return{
			searchList:[]      //搜索结果列表
		}
	},
	created(){
		//获得store保存的搜索关键字、菜品信息
		let keyword=this.$store.state.keyword;
		let goods=this.$store.state.goods;
		//搜索
		for(let key in goods){
			if(goods[key].name.includes(keyword)){
				this.searchList.push(goods[key]);
			}
		}
	}
}
</script>

<style>
</style>
