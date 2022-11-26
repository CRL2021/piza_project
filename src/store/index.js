import { createStore } from 'vuex'

export default createStore({
  state: {
	  keyword:'',    //搜索关键字
	  goods:{},      //所有菜品
	  shopping_cart:[],    //购物车  
  },
  mutations: {
	  update_keyword(state,k){
		  state.keyword=k;
	  },
	  update_goods(state,g){
		  state.goods=g;
	  },
	  update_cart(state,cart){
	  	 state.shopping_cart=cart;
	  }
  },
	getters:{
		getShoppingCart:(state)=>{
			return state.shopping_cart;
		}
	},
  actions: {
  },
  modules: {
  }
})
