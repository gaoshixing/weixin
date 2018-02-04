<template>
	<div class="signDetailGsx">
		<p>合同名称: <<{{data.title}}>></p>
		<p>合同类型: {{data.stage}}</p>
		<p>合同编号: {{data.num}}</p>
		<p>合同原价: {{data.originPrice}}</p>
		<p>实际签约金额: {{data.price}}</p>
		<p>实际优惠金额: {{data.sellPrice}}</p>
		<p>附加协议: 
			<p>5</p>
			<p>6</p>
		</p>
		<p>提交人: {{data.name}}</p>
		<p>提交时间: {{data.time}}</p>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: function () {
				return {}
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
