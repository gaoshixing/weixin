<template>
	<div class="newsDetailGsx">
		<p class="title">{{obj.title}}</p>
		<div class="content">{{obj.content}}</div>
		<p class="time">{{obj.time}}</p>
		<div v-if="isShow" class="isAgree">
			<span>驳回</span><span>通过</span>
		</div>
	</div>
</template>

<script>
import vSelect from './modules/vSelect'
export default {
	data () {
		return {
			obj: {
				title: '签约通知',
				content: '大家回顾大家的撒看的比较卡萨不对劲卡斯比登记卡随便点击就爱看是笨蛋就爱看不放假卡斯比道具卡驾考宝典就爱看斯巴达克',
				time: '2017.01.03'
			},
			isShow: true,
		}
	},

	methods: {

	}
}
</script>

<style lang= "less">
	.newsDetailGsx {
		padding: 25px 16px;
		p {
			font-size: 16px;
			font-weight: 700;
		}
		p:last-of-type , .content {
			font-weight: normal;
			font-size: 14px;
			color: 	#999;
		}
		.content {
			margin: 28px 0;
		}
		.isAgree {
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 97/2px;
			span {
				display: inline-block;
				width: 50%;
				font-size: 16px;
				line-height: 97/2px;
				text-align: center;
				background-color: #fff;
			}
			span:last-of-type {
				background-color: #4f77aa;
				color: white;
			}
		}
	}
</style>
