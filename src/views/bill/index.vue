<template>
	<div>
		<header class="mui-bar mui-bar-nav">
			<a href="#/" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">账本列表</h1>
		</header>
		<div class="mui-content">

			 
	<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item" href="#item1mobile">
				待办公文
			</a>
					<a class="mui-control-item" href="#item2mobile">
				已办公文
			</a>
					<a class="mui-control-item" href="#item3mobile">
				全部公文
			</a>
				</div>
				<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-4"></div>
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<ul class="mui-table-view">
									<li class="mui-table-view-cell">
										第一个选项卡子项-1
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-2
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-3
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-4
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-5
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-6
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-7
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-8
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-9
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-10
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-11
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-12
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-13
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-14
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-15
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-16
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-17
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-18
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-19
									</li>
									<li class="mui-table-view-cell">
										第一个选项卡子项-20
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div id="scroll2" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="mui-loading">
									<div class="mui-spinner">
									</div>
								</div>
							</div>
						</div>

					</div>
					<div id="item3mobile" class="mui-slider-item mui-control-content">
						<div id="scroll3" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="mui-loading">
									<div class="mui-spinner">
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>

	</div>
</template>
<script>
	import global_ from '@/components/tool/Global'
	import axios from 'axios'
	//import { fetchDataList } from 'api'
	export default {
		name: 'billadd',
		data() {
			return {
				billdata: []
			}
		},
		mounted() {
			 
		},
		methods: {

		}
	}
</script>
