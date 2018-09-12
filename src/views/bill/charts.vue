<template>
	<div>
		<div id="weekchart" style="height: 300px"></div>
		<div id="monthchart" style="height: 300px"></div>
	</div>
</template>

<script>
	import global_ from '@/components/tool/Global'
	import axios from 'axios'
	export default {
		data() {
			return {
				dataList: [],
				titleArr: []
			}
		},
		mounted() {
			let data = null;
			$.ajax({
				dataType: "json",
				url: global_.requestServerPath + "/data/GetWeekStatistics",
				async: false,
				success: function(resp) {
					data = resp;
				}
			})
			this.dataList = data.data.dataList;
			this.titleArr = data.data.titleArr;
			this.drawLine();
			this.monthLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('weekchart'))
				let that = this;
				let option = {
					title: {
						text: '财务统计',
						subtext: '上周数据',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						// orient: 'vertical',
						// top: 'middle',
						bottom: 10,
						left: 'center',
						data: that.titleArr
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: that.dataList,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};

				// 绘制图表
				myChart.setOption(option);
			},
			monthLine() {
				let myChart = this.$echarts.init(document.getElementById('monthchart'));
				let option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line',
						smooth: true
					}]
				};

				myChart.setOption(option);
			},
		}
	}
</script>

<style>

</style>