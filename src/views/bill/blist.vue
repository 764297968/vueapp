<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<a href="#/" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">账本列表</h1>
		</header>

		<div class="mui-content" style="" ref="contentheigth">

			<!--<div style="padding-bottom: 2px;">-->
			<!--:bottom-load-method="loadmore" -->
			<pull-to :top-load-method="refresh" @infinite-scroll="loadmore">
				<ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
					<li class="mui-table-view-cell" v-for="bill in dataList">
						<div class="mui-table">
							<div class="mui-table-cell mui-col-xs-8">
								<h4 class="mui-ellipsis">{{bill.chargeName}}_{{bill.typeName}}_{{bill.money}}</h4>
								<h5>地址:{{bill.address}}</h5>
								<p class="mui-h6 mui-ellipsis">备注:{{bill.remarkInfo}}</p>
							</div>
							<div class="mui-table-cell mui-col-xs-4 mui-text-right">
								<span class="mui-h5">{{bill.chargeTime1}}</span>
							</div>
						</div>
					</li>

				</ul>
			</pull-to>
		</div>
	</div>
</template>

<script>
	import PullTo from 'vue-pull-to'
	//import { fetchDataList } from 'api' 
	import global_ from '@/components/tool/Global'
	import axios from 'axios'
	export default {
		name: 'refrech',
		components: {
			PullTo
		},
		data() {
			return {
				dataList: [],
				index: 1,
				size: 5,
				isload: true,
				currheight:"",
			}
		},
		mounted() {
			console.log(this.$refs.contentheigth.offsetHeight)
			
			this.currheight= this.$refs.contentheigth.offsetHeight * 15 - 2 + "px";
			//this.$refs.contentheigth.style.height=this.currheight;
			this.refresh();
		},
		methods: {
			refresh(loaded) {
				this.index = 1;
				
				this.$refs.contentheigth.style.height=this.currheight;
				this.load(loaded);

			},
			scroll() {
				console.log(2);
			},
			loadmore() {
				console.log(this.isload);
				if(!this.isload) {
					return false;
				}
				console.log(this.index);
				mui.showLoading("加载中..", "div");
				setTimeout(() => {
					axios.get(global_.requestServerPath + "/bill", {
						params: {
							index: this.index,
							size: this.size
						}
					}).then(resp => {

						mui.hideLoading(h => {});
						if(resp.data.data.length == 0) {
							return;
						}
						this.dataList = this.dataList.concat(resp.data.data);
						if(resp.data.data.length >= this.size) {
							this.index += 1;

						} else {
							this.isload = false;
						}

					})
				}, 500);

			},
			load(loaded) {
				let that = this;
				//				$.getJSON(global_.requestServerPath + "/bill", {
				//					index: this.index,
				//					size: this.size
				//				}, function(res) {
				//					console.log(res);
				//				})
				$.ajax({
					url: global_.requestServerPath + "/bill",
					data: {
						index: this.index,
						size: this.size
					},
					dataType: "json",
					async: false,
					success: function(res) { 
						mui.hideLoading(h => {});
						that.dataList = res.data;
						if(loaded != null) {
							loaded('done');
						}
						that.index += 1;
						if(that.dataList.length < this.size) {
							that.isload = false;
							console.log(that.isload);
							that.$refs.contentheigth.style.height = "100%";
							that.$refs.contentheigth.offsetHeight * 15 - 2 + "px";
							 
						}else{
							that.loadmore();
						}
					}
				})
				
				//				axios.get(global_.requestServerPath + "/bill", {
				//					params: {
				//						index: this.index,
				//						size: this.size
				//					}
				//				}).then(resp => {
				//					mui.hideLoading(h => {});
				//					this.dataList = resp.data.data;
				//					if(loaded != null) {
				//						loaded('done');
				//					}
				//					this.index += 1;
				//					if(this.dataList.length < this.size) {
				//
				//						this.$refs.contentheigth.style.height = "100%";
				//						this.$refs.contentheigth.offsetHeight * 10 - 2 + "px";
				//						return false;
				//					}
				//
				//					this.loadmore();
				//				})
			}
		},

	}
</script>