<template>
	<div class="mui-off-canvas-wrap mui-draggable">
		<!-- 菜单容器 -->
		<aside class="mui-off-canvas-left">
			<div class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<div class="title" style="color:white;">{{cibatitle}}</div>
					<div class="content">
						{{cibacontent}}

					</div>
					<div class="title" style="margin-bottom: 25px;color: white;"></div>
					<ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
						<li class="mui-table-view-cell">
							<a class="mui-navigate-right" href="goup">
								系统更新
							</a>
						</li>
						<li class="mui-table-view-cell">
							<a class="mui-navigate-right">
								.........
							</a>
						</li>

					</ul>
				</div>

			</div>
		</aside>

		<div class="mui-inner-wrap">
			<header class="mui-bar mui-bar-nav">
				<h1 class="mui-title">主页</h1>
			</header>

			<div class="mui-content mui-scroll-wrapper">
				<div class="mui-scroll">
					<ul class="mui-table-view mui-grid-view mui-grid-9">
						<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#/bill/blist">
								<svg class="mui-icon icon" aria-hidden="true">
									<use xlink:href="#icon-jizhang"></use>
								</svg>
								<div class="mui-media-body">记账本</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#/bill/add">
								<svg class="mui-icon icon" aria-hidden="true">
									<use xlink:href="#icon-tianjiaadd142"></use>
								</svg>
								<div class="mui-media-body">记账</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
							<a href="#">
								<svg class="mui-icon icon" aria-hidden="true">
									<use xlink:href="#icon-tongji"></use>
								</svg>
								<div class="mui-media-body">统计</div>
							</a>
						</li>

					</ul>
				</div>
			</div>
			<!-- off-canvas backdrop -->
			<div class="mui-off-canvas-backdrop"></div>
		</div>
	</div>
</template>
<script>
	mui.init({
		keyEventBind: {
			backbutton: true //关闭back按键监听
		}
	})
	sessionStorage.clear();
	var _toast = false;
	import global_ from '@/components/tool/Global'　
	import axios from 'axios'
	mui.plusReady(function() {

	});
	export default {
		name: 'homeindex',
		data() {
			return {
				cibacontent: "",
				cibatitle: ""
			}
		},
		mounted() {

			this.getds();
			this.aclick();
			let hispath = this.$route.path;
			let that = this;
			mui.back = function() {
				let path = that.$route.path;
				console.log(path);
				console.log(hispath);
				if(path == "/") {
					if(!_toast || !_toast.isVisible()) {
						_toast = mui.toast('再按一次返回键退出', {
							duration: 'long',
							type: 'div'
						});
					} else {
						plus.runtime.quit();
					}
				} else {
					//location.href=hispath;
					that.$router.push({
						path: hispath,
						//name:"跳转的path也能 ", 
						query: {}
					})
				}
			}
		},
		methods: {
			getds() {

				let that = this;
				axios.get(global_.requestServerPath + "/data/GetIciba").then(function(res) {
					that.cibacontent = res.data.note;
					that.cibatitle = res.data.caption;
				})

			},
			goup() {
				var url = global_.requestDownLoadServerPath + "/bill.apk"; // 下载文件地址
				console.log(url);
				var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
					mui.hideLoading();
					if(status == 200) { // 下载成功
						mui.confirm("有新版本，是否立马安装", "提示", ['取消', '确定'], function(e) {
							if(e.index == 1) {
								var path = d.filename;
								console.log(d.filename);
								plus.runtime.install(path); // 安装下载的apk文件
							}
						})
					} else { //下载失败
						console.log("Download failed: " + status);
						//alert("Download failed: " + status);
					}
				});
				dtask.addEventListener("statechanged", function(d, status) {

					console.log(Number((d.downloadedSize / d.totalSize) * 100).toFixed(2) + "%")
					mui.showLoading(Number((d.downloadedSize / d.totalSize) * 100).toFixed(2) + "%", "div")
				})
				dtask.start();
			},
			aclick() {
				let that = this;
				//$.showLoading
				mui('body').on('tap', 'a', function() {
					// 获取地址
					var href = this.getAttribute('href');
					if(href == "goup") {
						that.goup();
					} else {
						location.href = href;
					}
				})
				mui("#app").on("swiperight", ".mui-off-canvas-wrap", function() {
					console.log("滑块");
					mui('.mui-off-canvas-wrap').offCanvas().show();
				})
			}
		}
	}
</script>
<style>
	p {
		text-indent: 22px;
	}
	
	span.mui-icon {
		font-size: 14px;
		color: #007aff;
		margin-left: -15px;
		padding-right: 10px;
	}
	
	.mui-off-canvas-right {
		color: #fff;
	}
	
	.title {
		margin: 35px 15px 10px;
	}
	
	.title+.content {
		margin: 10px 15px 35px;
		color: #bbb;
		text-indent: 1em;
		font-size: 14px;
		line-height: 24px;
	}
	
	input {
		color: #000;
	}
</style>