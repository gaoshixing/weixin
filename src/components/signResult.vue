<template>
	<div class="signResultGsx">
		<sign-check
		:data="data"
		></sign-check>
		<div class="res">
			<p v-if="data.auditorStatus !== '已通过'"><span>驳回理由</span>: {{data.reason}}</p>
            <p v-if="data.auditorStatus == '已通过'"><span>审核结果</span>：{{data.auditorStatus}}</p>
			<p>审核时间: {{data.signTime}}</p>
		</div>
	</div>
</template>
<script>
import signCheck from './modules/signCheck'
import valid, { errors, SIGNAPPROVAL } from "./libs/request";
export default {
	data () {
		return {
			signNumber: this.$route.query.signNumber,
			data: {}

		}
	},
	components: {
		signCheck
	},
	
	computed: {
		textZhang() {

		}
	},

	mounted() {
		this.getCheckSignRecord()
	},

	methods: {
		getCheckSignRecord() {
            SIGNAPPROVAL.checkSignRecord({
                id:this.signNumber
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.data = res.data.data
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
	}
}
</script>

<style lang= "less">
	.signResultGsx {
		.res {
			padding: 50/2px 30/2px;
			margin-top: 50/2px;
			border-top: 1px solid #eee;
		}
	}
</style>
