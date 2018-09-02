<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">主页</h1>
		</header>

		<div class="mui-content">
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
	mui.plusReady(function() {

		var url = global_.requestDownLoadServerPath + "/bill.apk"; // 下载文件地址
		console.log(url);
		console.log(plus);
		var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
			if(status == 200) { // 下载成功
				mui.confirm("有新版本，是否后台更新", "提示", ['取消', '确定'], function(e) {
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
		dtask.start();

	});
	export default {
		name: 'homeindex',
		data() {
			return {

			}
		},
		mounted() {
			console.log(this.$route.path);
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
					that.$router.push({
						path: hispath,
						//name:"跳转的path也能 ", 
						query: {}
					})
				}
			}
		}
	}
</script>