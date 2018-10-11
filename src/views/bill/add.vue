<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<a href="#/" class=" mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">录入</h1>
		</header>
		<form class="mui-content" v-on:submit.prevent="submitdata">
			<div class="mui-content-padded" style="margin: 5px;">

				<h5>信息录入</h5>

				<div class="mui-input-group">

					<div class="mui-input-row">
						<label>概要：</label>
						<input type="text" required="" v-model="bill.ChargeName" class="mui-input-clear" placeholder="消费概要">
					</div>
					<div class="mui-input-row">
						<label>类型：</label>
						<input type="text" required="" v-model="bill.TypeNmae" class="mui-input-clear" placeholder="类型" v-on:click="selectchargetype">
						<input type="text" v-model="bill.TypeId" class="mui-input-clear" placeholder="类型" v-on:click="selecttype">
					</div>
					<div class="mui-input-row">
						<label>时间：</label>
						<input type="date" required="" v-model="bill.ChargeTime" ref="currdate" value="">
					</div>
					<div class="mui-input-row">
						<label>金额：</label>
						<input type="number" required="" step="0.01" v-model="bill.Money" class="mui-input-clear" placeholder="相关金额">
					</div>
					<div class="mui-input-row">
						<label>地址：</label>
						<input type="text" v-model="bill.Address" class="mui-input-clear" v-on:focus="getcurrposition" placeholder="相应的地址">
					</div>

				</div>

				<div class="mui-input-row" style="margin: 10px 0px;">
					<textarea id="textarea" v-model="bill.RemarkInfo" rows="5" placeholder="备注"></textarea>
				</div>
				<div class="mui-button-row">
					<button type="submit" class="mui-btn mui-btn-primary">确认</button>&nbsp;&nbsp;
					<button type="button" class="mui-btn mui-btn-danger" v-on:click="cancelsub">取消</button>
				</div>
			</div>
		</form>

	</div>
</template>

<script>
	import global_ from '@/components/tool/Global'
	import axios from 'axios'
	export default {
		name: 'billadd',
		data() {
			return {
				bill: {
					ChargeName: "",
					TypeNmae: "支出",
					TypeId: "1",
					ChargeTime: "",
					Money: "",
					Address: "",
					RemarkInfo: "",
					Lat: "",
					Lng: ""
				},
				currdate: ""
			}
		},
		mounted() {

			const billdata = this.getParams();
			if(billdata != null) {
				this.bill = billdata;
				sessionStorage.removeItem("billdata");
			}
			const date = new Date();
			this.currdate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2);

			this.bill.ChargeTime = this.currdate;

			this.getcurrposition();

		},
		methods: {
			getParams() {
				// 取到路由带过来的参数 
				let routerParams = this.$route.query
				// 将数据放在当前组件的数据内 
				var d = sessionStorage.getItem("billdata");
				if(d == null)
					return null;
				return JSON.parse(d);
			},
			selecttype() {
				let that = this;
				sessionStorage.setItem("billdata", JSON.stringify(that.bill));
				this.$router.push({
					name: "billtype",
				})
			},
			submitdata() {
				mui.showLoading("提交中..", "div");
				let that = this;
				axios.post(global_.requestServerPath + "/bill ", this.bill)
					.then(resp => {
						mui.hideLoading(function() {
							if(resp.data.code == 1) {
								mui.confirm("录入成功，是否继续录入", "提示", ['取消', '继续'], function(e) {
									if(e.index == 1) {
										that.cancelsub();
									} else {
										that.$router.push({
											path: 'blist',
											//name:"跳转的path也能 ", 
											query: {}
										})
									}
								})

							} else {
								mui.toast("操作失败 ");
							}
						});

					}).catch(function(err) {
						mui.toast(JSON.stringify(err));
					})
				return false;
			},
			cancelsub() {
//				let TypeNmae = this.bill.TypeNmae;
//				let Address = this.bill.Address;
//				this.bill = {};
//				this.bill.ChargeTime = this.currdate;
//				this.bill.TypeNmae = TypeNmae;
//				this.bill.Address = this.Address;
				this.bill.ChargeName="";
				this.bill.Money="";
				this.bill.RemarkInfo="";
			},
			getcurrposition() {
				let that = this;
				plus.geolocation.getCurrentPosition(function(p) {
					//alert(p.coords.latitude);
					console.log('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
					that.bill.Lat = p.coords.latitude;
					that.bill.Lng = p.coords.longitude;
					$.getJSON(global_.requestServerPath + "/map", {
						lat: p.coords.latitude,
						lng: p.coords.longitude
					}, function(res) {
						//alert("2");
						console.log(res.result.formatted_address);
						that.bill.Address = res.result.formatted_address;
					})
					// 根据坐标得到地址描述     

				}, function(e) {
					alert("获取失败" + e.message);
				});
			},
			selectchargetype() {
				let that = this;
				var picker = new mui.PopPicker({
					layer: 2
				});
				//data
				picker.setData(global_.billtype)
				picker.pickers[0].setSelectedIndex(0);
				picker.pickers[1].setSelectedIndex(1);
				picker.show(function(SelectedItem) {
					console.log(SelectedItem);
					that.bill.TypeId = SelectedItem[1].value;
					that.bill.TypeNmae = SelectedItem[1].text;
				})
			}
		}

	}

	//{{currdate}}
	//new Date()
</script>