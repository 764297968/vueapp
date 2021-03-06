import Vue from 'vue'

import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//bill
import billindex from '@/views/bill/index' 
import billadd from '@/views/bill/add'
import billtype from '@/views/bill/type'
 
import billlist from '@/views/bill/blist'
import billcharts from '@/views/bill/charts'
//home
import homeindex from '@/views/home/index'
Vue.use(Router)

export default new Router({
	routes: [

		{
			path: "/",
			name: "homeindex",
			component: homeindex
		},
		{
			path: '/hello',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/bill/index',
			name: "billindex",
			component: billindex
		}, 
		{
			path: "/bill/add",
			name: "billadd",
			component: billadd
		},
		{
			path: "/bill/type",
			name: "billtype",
			component: billtype
		},
	 
		{
			path: "/bill/blist",
			name: "billlist",
			component: billlist
		} ,
		{
			path:"/bill/charts",
			name:"billcharts",
			component:billcharts
		}
	]
})
