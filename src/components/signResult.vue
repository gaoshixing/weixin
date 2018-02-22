<template>
	<div class="signResultGsx">
		<sign-check
		:data="data"
		></sign-check>
		<div class="res">
			<div  v-if="data.auditorStatus !== '已通过'">
				<p><span>驳回理由</span>: {{data.reason}}</p>
				<div class="statusZhang">
					<i class="iconfont icon-zhang" style="color:#eaacb7"></i>
					<span class="textZhang">驳回</span>
				</div>
			</div>
			<div  v-if="data.auditorStatus == '已通过'">
				<p ><span>审核结果</span>：{{data.auditorStatus}}</p>
				<div class="statusZhang">
					<i class="iconfont icon-zhang" style="color:#44bcb7"></i>
					<span class="textZhang">通过</span>
				</div>
			</div>
			<p class="checkTime">审核时间: {{data.auditorTime|filterTime}}</p>
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
	},

	filters: {
		filterTime(val) {
			if(val) return val.substr(0,16)
		}
 	}
}
</script>

<style lang= "less">
	.signResultGsx {
		.res {
			position: relative;
			padding: 50/2px 30/2px;
			border-top: 1px solid #eee;
			p {
				line-height: 0;
			}
			.checkTime {
				margin-top: 21px;
				color: #999999;
			}
		}
		.textZhang {
			position: absolute;
			color: white;
			font-size: 12px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(-21deg)
		}
		.statusZhang {
			position: absolute;
			right: 2%;
			top: 14px;
		}
		.icon-zhang {
			font-size: 150/2px;
		}
	}
</style>
