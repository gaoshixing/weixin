<template>
	<div class="signDetailGsx">
		<sign-check
		:data="data"></sign-check>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span @click="signReject">驳回</span><span @click="signPass">通过</span>
		</div>
		<confirm
		ref="confirm"
		:isShow="isShow"
		></confirm>
	</div>
</template>

<script>
import signCheck from './modules/signCheck'
import confirm from './modules/confirm'

import valid, { errors, SIGNAPPROVAL } from "./libs/request";
export default {
	data () {
		return {
			signNumber: this.$route.query.signNumber,
			data: {},
			isShow: false,
		}
	},
	components: {
		signCheck,
		confirm
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
		
		signPass() {
			alert(0)
			this.isShow = true
			return
			let obj = {
				ctId:this.signNumber,
				status:"agree",
				}
			SIGNAPPROVAL.signApprovalIsPass(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.$router.replace({
						name: 'approve'
					})
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		signReject() {
			let obj = {
				ctId: this.signNumber,
				status: "reject",
				// reason: this.rejectContent
			}
			SIGNAPPROVAL.signApprovalIsPass(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.rejectContent = ''
					this.getSignApprovalList('first')
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},
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
