<template>
	<div class="home">
		<!-- 头部搜索栏 -->
		<header>
			<label><input type="search" v-model="keyword" :placeholder="search_ico"/></label>
			<button type="button" class="search-btn" @click="search">搜索</button>
		</header>

		<!--本店热销-->
		<div class="hotsale">
			<p class="hotsale-title">新品推荐</p>
			<div class="hotsale-box">

				<div class="hotsale-item" v-for="item in new_goods">
					<img class="hotimg" :src="item.img" alt="">
					<p class="hotname">{{item.name}}</p>
					<div class="price-get">
						<span>￥{{item.price}}</span>
						<div>
							<button type="button" :class="item.checked?'gary':'white'"
									@click="order(item)" :disabled="item.checked">点餐</button>
						</div>

					</div>
				</div>

			</div>
		</div>

		<div class="box stickybox" >
		<!-- 左侧边栏，菜品类别 -->
		<aside class="animated bounceInLeft" :class="stickybox?'hasfixed':'hasnotfixed'">
			<ul>
				<li v-for='(cls,index) in goods_cls' :class="{'ac':goods_cls_cur==cls.id}" 
				@click="chgMenu(index)">{{cls.name}}</li>
			</ul>
		</aside>
		
		<!-- 主菜普 -->
		<div class="main-menu" :class="stickybox?'main-menu-marginLeft':''">
			<div class="order-bar animated bounceInRight">
				<div class="order-class" v-for="cls in goods_cls">
					<h3>{{cls.name}}</h3>
					<ul class="good-list">
						<li v-for="id in cls.goods">
							<router-link :to="{name:'Detail',params:{item:JSON.stringify(goods[id])}}"> 
								<img :src='this.goods[id].img' />
								<h3>{{this.goods[id].name}}</h3>
							</router-link>
							<p class="ellipsis">{{this.goods[id].describe}}</p>
							<strong>￥{{this.goods[id].price}}</strong>
							<button type="button" :class="['pointer-btn',this.goods[id].checked?'ac':'']" 
							@click="order(goods[id])" :disabled="this.goods[id].checked">点餐</button>
						</li>						
					</ul>					
				</div>								
			</div>			
		</div>
		</div>
		<!-- 购物车 -->

		<footer>
			<div class="shoping-cart animated" :class="{'bounceInUp':showCart,'shoping-list-slide':showCart}">
				<div class="empty">
					<span class="icon-trash" @click="clearCart"></span>
				</div>
				<ul v-if="shopping_cart.length>0">
					<li v-for="(item,index) in shopping_cart">
						{{item.name}}
						<em>￥{{item.price}}</em>
						<div>
							<button type="button" class="shoping-sub icon-minus" @click="sub(item,index)"></button>
							<span>{{item.num}}</span>
							<button type="button" class="shoping-add icon-plus" @click="add(item)"></button>
						</div>
					</li>
				</ul>
				<ul v-else>
					<li style="text-align: center;">还没有点餐喔！！</li>
				</ul>

				<button type="button" class="shopping-btn icon-shopping-cart" @click="showCart=!showCart"></button>
				<span class="count" :class="{'hide':totalNum==0}">{{totalNum}}</span>
			</div>
			<div class="cont">
				<div class="order-pointer-footer">
					<div class="total"><em>￥{{totalPrice}}</em></div>

						<a v-if='totalNum>0' class="pay-btn" >
							<router-link :to="{name:'Pay'}">
							去下单
							</router-link>
						</a>


				</div>
			</div>
		</footer>
		<!-- 模态层 -->
		<div class="modal" :class="{'hide':!showCart}" @click="showCart=!showCart"></div>
	</div>
</template>

<script>
import $ from 'jquery'
export default{
	data(){
		return{
			goods:null,    //菜品
			goods_cls:null,   //菜品类别
			goods_cls_cur:1,    //当前菜品类别
			new_goods:null,     //新品
			keyword:''    ,//搜索关键字
			search_ico:'\ue903 请输入菜品名称',
			shopping_cart:[],     //购物车
			totalNum:0,       //订单菜品数量
			totalPrice:0,       //订单总价
			showCart:false,      //是否显示购物车
			stickybox:false
		}
	},
	created(){
		console.log("created");
		this.axios.get('/data.json').then(
			msg=>{
				this.goods = msg.data.goods;
				this.goods_cls = msg.data.goods_cls;
				this.new_goods = msg.data.news_goods;
				//将菜品信息存入store
				this.$store.commit('update_goods',this.goods);
			},
			()=>{
				alert('连接失败！');
			}
		);
	},
	mounted(){
		//监听window滚动
		window.addEventListener('scroll',this.winScroll);
		window.addEventListener('scroll',this.stickyBox);
	},
	methods:{
		stickyBox(){
			let scrollTop = $(window).scrollTop();
			this.stickybox = scrollTop>250;
		},
		//左侧选择类别，右侧显示对应的菜品
		chgMenu(i){
			var aUl = $('.order-class');
			//使用position判断的ul
			$(window).scrollTop(aUl.eq(i).position().top);	
		},
		//右侧主菜谱滚动，在·
		winScroll() {
			var _this = this;
			var scrollTop = $(window).scrollTop();
			var oItem = $('.order-class');
			oItem.each(function(i) {
				if($(this).offset().top < scrollTop + 300) {
					_this.goods_cls_cur = i + 1;
				}
			})
		},
		//搜索
		search(){
			if(this.keyword==''){
				alert('请输入搜索的菜品！！');
			}else{
				//将搜索关键字存入store
				this.$store.commit('update_keyword',this.keyword);
				//导航到搜索结果页
				this.$router.push('List');
			}
		},
		//点菜
		order(item){
			this.shopping_cart.push({
				id:item.id,
				name:item.name,
				price:item.price,
				img:item.img,
				num:1
			});
			this.$store.commit('update_cart',this.shopping_cart);
		},
		//清空购物车
		clearCart(){
			this.shopping_cart=[];
			//存储购物车数据到store
			this.$store.commit('update_cart',this.shopping_cart);
			this.showCart=!this.showCart;
		},
		//菜品数量增加
		add(item){
			item.num++;			
		},
		//菜品数量减少
		sub(item,i){
			item.num--;
			if(item.num==0){
				this.shopping_cart.splice(i,1);
			}
		}
	},
	computed:{

	},
	watch:{
		  shopping_cart:{
			  handler(val){
				  //重置购物车原有相关数据
				  this.totalNum=0;
				  this.totalPrice=0;
				  //清空所有菜品checked
				  for(let key in this.goods){
					  this.goods[key].checked=false;
				  }
				  for(let key in this.new_goods){
					  this.new_goods[key].checked=false;
				  }

				  //计算购物车当前数据
				  val.forEach(item=>{
					  //计算订单菜品数量、订单总价
					  this.totalNum+=item.num;
					  this.totalPrice+=item.price*item.num;
					  //禁用已选菜品按钮
					  this.goods[item.id].checked = true;
					  let newgoodsArr = JSON.parse(JSON.stringify(this.new_goods));
					  for(let value in newgoodsArr){
					  	if(newgoodsArr[value].id==item.id){
							this.new_goods[item.id].checked = true;
						}
					  }
				  });
				  //存储购物车数据到store
				  this.$store.commit('update_cart',val);
			  },
			  deep:true,         //对象内部属性深度监听
			  immediate:true     //首次绑定的时候，就立即执行handler方法
		  },
	},
}
</script>

<style>

</style>
