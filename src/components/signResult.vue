<template>
	<div class="signResultGsx">
		<sign-check></sign-check>
		<div class="res">
			<p>审核结果: {{res}}</p>
			<p>理由: {{reason}}</p>
			<p>审核时间: {{time}}</p>
		</div>
	</div>
</template>
<script>
import signCheck from './modules/signCheck'
export default {
	data () {
		return {
			res: '过来',
			reason: '55',
			time: '20178.298'

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
	.signResultGsx {
		.res {
			padding: 50/2px 30/2px;
			margin-top: 50/2px;
			border-top: 1px solid #ccc;
		}
	}
</style>
