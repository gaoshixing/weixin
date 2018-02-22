<template>
	<div class="signDetailGsx">
		<sign-check
		:data="data"></sign-check>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span @click="signReject">驳回</span><span @click="signPass">通过</span>
		</div>
		<gsx-dialog
		:isShow="isShow"
		@on-close="close"
		>
		<div class="dialogContent">
			<p v-if="isAgree">确定通过审核吗?</p>
			<div class="reject" v-else>
				<p ref="reason">驳回理由(必填)</p>
				<textarea v-model="textareaT" rows="5">
				</textarea>
			</div>
			<span @click="close" class="left">取消</span><span @click="ok" class="right">确定</span>
		</div>
		
		</gsx-dialog>
	</div>
</template>

<script>
import signCheck from './modules/signCheck'
import gsxDialog from './modules/gsxDialog'
import valid, { errors, SIGNAPPROVAL } from "./libs/request";
export default {
	data () {
		return {
			signNumber: this.$route.query.signNumber,
			data: {},
			isShow: false,
			isAgree: false,
			textareaT: '',
		}
	},
	components: {
		signCheck,
		gsxDialog,
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

		signReject() {
			this.isShow = true;
			this.isAgree = false;
			
		},
		
		signPass() {
			this.isAgree = this.isShow = true
		},
		
		ok() {
			if(this.isAgree) {
				this.resole()
				return
			}
			this.reject()
		},

		resole() {
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

		reject() {
			if(!this.textareaT) {
				this.$refs.reason.style.color="red" 
				return
			}
			let obj = {
				ctId: this.signNumber,
				status: "reject",
				reason: this.textareaT
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

		close() {
			this.isShow = false
		},
	},
	watch: {
		textareaT() {
			if(this.textareaT.length) {
				this.$refs.reason.style.color= 'black'
			}
		}
	}
}
</script>

<style lang= "less">
	.signDetailGsx {
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
				border-top: 1px solid #eee;
			}
			span:last-of-type {
				background-color: #4f77aa;
				color: white;
			}
		}
		.dialogContent {
			padding-top: 15px;
			p:first-of-type {
				text-align: center;
			}
			.left,.right {
				display: inline-block;
				width: 50%;
				font-weight: 500;
				text-align: center;
				line-height: 35px;
			}
			.right {
				color: white;
				background-color: #4f77aa;
			}
			.left {
				border-top: 1px solid #eee;
			}
			.reject {
				box-sizing: border-box;
				padding: 0 15px 0 10px;
				p {
					line-height: 0;
				}
				textarea {
					margin: 0 auto;
					width: 100%;
				 	resize : none;
					border: 1px solid #cccccc;
					-webkit-appearance:none;
				}
			}
			
		}
	}
	
</style>
