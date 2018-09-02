<template>
	<div style="height: 500px;">
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
				size: 6
			}
		},
		mounted() {
			this.refresh();
		},
		methods: {
			refresh(loaded) {
				this.index = 1;
				this.load(loaded);
			},
			scroll() {
				console.log(2);
			},
			loadmore() { 
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
						this.index += 1; 
					})
				}, 1000);

			},
			load(loaded) {
				let that = this;
				axios.get(global_.requestServerPath + "/bill", {
					params: {
						index: this.index,
						size: this.size
					}
				}).then(resp => {
					mui.hideLoading(h => {});
					this.dataList = resp.data.data;
					if(loaded != null) {
						loaded('done');
					}
					this.index = 2; 
				})
			}
		}
	}
</script>