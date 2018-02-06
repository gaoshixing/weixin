<template>
	<div class="signDetailGsx">
		
		<p>合同名称: {{data.name}}</p>
		<p>合同类型: {{data.stage}}</p>
		<p>合同编号: {{data.code}}</p>
		<p>合同原价: {{data.price}}</p>
		<p>实际签约金额: {{data.presentPrice}}</p>
		<p>实际优惠金额: {{data.presentPriceCost}}</p>
		<div v-if="data.protocolContent" >
			<p >附加条款</p>
        	<div>{{data.protocolContent}}</div>
		</div>
		
		<p>提交人: {{data.auditorName}}</p>
		<p>提交时间: {{data.signTime}}</p>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: function () {
				return {
					protocolContent: []
				}
			}
		}
	},

	data () {
		return {
			
		}
	},

	components: {
	},

	methods: {
	}
}
</script>

<style lang= "less">
	.signDetailGsx {
		padding: 50/2px 30/2px;
	}
</style>
