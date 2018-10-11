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
				titleArr: [],
				upmonthList:[],
				upmonthArr:[]
			}
		},
		mounted() {
			let data = null;
			let upmonthdata=null;
			$.ajax({
				dataType: "json",
				url: global_.requestServerPath + "/data/GetWeekStatistics",
				async: false,
				success: function(resp) {
					data = resp;
				}
			})
			$.ajax({
				dataType: "json",
				url: global_.requestServerPath + "/data/GetUpMonth_Statistics",
				async: false,
				success: function(resp) {
					upmonthdata = resp;
				}
			})
			this.dataList = data.data.dataList;
			this.titleArr = data.data.titleArr;
			this.upmonthList=upmonthdata.data.dataList;
			this.upmonthArr=upmonthdata.data.titleArr;
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
				let that=this;
				let myChart = this.$echarts.init(document.getElementById('monthchart'));
				let option = {
					xAxis: {
						type: 'category',
						data: that.upmonthArr 
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: that.upmonthList, 
						type: 'line',
						smooth: true,
						 areaStyle: {} 
					}]
				};

				myChart.setOption(option);
			},
		}
	}
</script>

<style>

</style>