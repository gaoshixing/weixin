<template>
	<div class="signDetailGsx">
		<sign-check></sign-check>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span>驳回</span><span>通过</span>
		</div>
	</div>
</template>

<script>
import signCheck from './modules/signCheck'
export default {
	data () {
		return {
			
		}
	},
	components: {
		signCheck
	},
	
	computed: {
		textZhang() {

		}
	},

	methods: {
	}
}
</script>

<style lang= "less">
	.signDetailGsx {
		
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
</style>
