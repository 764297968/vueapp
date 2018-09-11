<template>
	<div>
		<div id="weekchart" style="height: 300px"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('weekchart'))
				 
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
						data: ['西凉', '益州', '兖州', '荆州', '幽州']
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: [{
								vaue: 535,
								name: '荆州'
							},
							{
								value: 510,
								name: '兖州'
							},
							{
								value: 634,
								name: '益州'
							},
							{
								value: 735,
								name: '西凉'
							}
						],
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
			}
		}
	}
</script>

<style>

</style>