<template>
	<div class="header">购物车</div>
	<router-link to='/'>返回主页</router-link>
	<div class="box2">
		<div class="details" v-for="item in getShopcart">
			<div style="display:flex">
				<img :src="item.img" alt="">
				<div class="pinfo">
					<span>{{item.name}}</span>
					<div> X{{item.num}}</div>
				</div>
			</div>

			<div class="pprice">
				<div>￥{{item.price*item.num}}</div>
			</div>

		</div>
	</div>
	<div class="footer">
		<div class="footer_left">
			实际付款:
			<span >{{totalprice}}</span>
		</div>
		<div class="footer_right" @click="show()">立即付款</div>
	</div>
</template>

<script>
	export default{
		data(){
		},
		methods:{
			show(){
				alert('提交成功');
				this.$router.push('/home');
			}
		},
		computed:{
			getShopcart(){
				return this.$store.getters.getShoppingCart;
			},
			totalprice(){
				let sc = this.$store.getters.getShoppingCart;
				let fee = 0;
				console.log() // 序列化后可以取值
				let scarr = JSON.parse(JSON.stringify(sc));
				scarr.forEach(item=>{
					fee += item.price*item.num;
				});

				return fee;
			}
		},

	}

</script>

<style>
	.box2{
		margin-bottom:65px;
	}
	.details{
		display: flex;
		justify-content: space-between;
		margin-top:20px;
		margin-left: 15px;
		margin-right:15px;
		border:1px solid #ccc;
		border-radius: 10px;

	}

	.details img{
		height: 60px;
		border-radius: 10px;
		padding-left: 10px;
	}
	.pinfo{
		text-align: center;
		margin-left:30px;
		padding-top:10px;

	}
	.pinfo span{
		font-size: 16px;
		font-weight: bold;
		line-height: 20px;
	}
	.pinfo div{
		text-align: left;
		color:#ccc;
	}
	.pprice {
		width:15%;
		padding-right: 20px;
		text-align: left;
		padding-top:10px;
		font-size: 18px;
		font-weight: bold;
	}
	.header{
		height: 50px;
		width:100%;
		margin-top:-50px;
		text-align:center;
		line-height: 50px;
		font-weight: bold;
		font-size:16px;
		border-bottom:1px solid #ccc;
	}
	.footer{
		position: fixed;
		bottom:0;
		left:0;
		background-color: white;
		border-top:1px solid #ccc;
		display: flex;
		height: 50px;
		width:100%;
		line-height: 50px;
	}
	.footer_left{
		flex:1;
		text-align: center;
		padding-right:10px;
		font-size: 18px;
	}
	.footer_left span{
		color:red;
	}
	.footer_right{
		color:white;
		background-color: #BC8F8F;
		text-align: center;
		line-height: 50px;
		width:30%;
		height: 50px;

	}
</style>
