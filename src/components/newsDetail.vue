<template>
	<div class="newsDetailGsx">
		<p class="title">《{{obj.title}}》</p>
		<div class="content">{{obj.description}}</div>
		<p class="time">{{obj.sendTime}}</p>
		<div v-if="isShow" class="isAgree">
			<span>驳回</span><span>通过</span>
		</div>
	</div>
</template>

<script>
import valid, { errors, NEWS } from "./libs/request";
export default {
	data () {
		return {
			obj: {
			},
			isShow: true,
		}
	},
	
	mounted() {
		this.getNoticeDeatil()
	},

	methods: {
		getNoticeDeatil() {
			let obj = {
				id: this.$route.query.id
			}
			NEWS.noticeDetail(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					console.log(res.data.data)
					this.obj = res.data.data
				}
				
			})
			.catch(errors.call(this))
			.finally(() => {});
		}
		
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
			margin: 28/2px 0;
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
