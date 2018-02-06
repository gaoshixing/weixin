<template>
	<div class="approveGsx">
		<v-select 
        style="width:100%;"
        placeholder="输入合同名称/签约合同编号/学生EC号/学生姓名/顾问姓名"
        icon="search"
		:datafunc="datafunc"
        v-model="compact"
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
		</v-select>
		<div class="title">
			<span v-for="(item, index) in statusList" @click="addActiveTop(index)" :class="{active:num == index}">{{item}}</span>
		</div>
		<div class="content" v-for="item in signList">
			<p @click="routerGo(item)"><span class="signName">{{item.name}}</span><span class="right">{{item.code}}</span></p>
			<p>提交人: {{item.sellerName}}</p>
			<p>提交时间: {{item.createDate|filterTime}}</p>
			<p v-if="num>0">审核时间: {{item.auditingTime|filterTime}}</p>
			<div v-if="num>0" class="statusZhang">
				<div v-if="item.auditStatus=='agree'">
					<i class="iconfont icon-zhang" style="color:#44bcb7"></i>
					<span class="textZhang">{{item.auditStatus|signText}}</span>
				</div>
				<div v-if="item.auditStatus=='reject'">
					<i class="iconfont icon-zhang" style="color:#eaacb7"></i>
					<span class="textZhang">{{item.auditStatus|signText}}</span>
				</div>
			</div>
		</div>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span  @click="addActive('news')"><i class="iconfont icon-xuanxiaoshenpi_"></i><br/>消息</span>
			<span  class="active" @click="addActive('notice')" ><i class="iconfont icon-icon_notice "></i><br/>审核</span>
		</div>
	</div>
</template>

<script>
import vSelect from './modules/vSelect'
import valid, { errors, SIGNAPPROVAL } from "./libs/request";

export default {
	data () {
		return {
			statusList: ['待处理', '已处理'],
			num: 0,
			compact: '',
			signList: [],
			// agree reject
			auditStatus: 'upgrade,waiting',
		}
	},
	components: {
		vSelect,
	},
	
	computed:{
		
	},

	created() {
		this.setCookie()
	},

	mounted() {
		this.getSignApprovalList('first')
	},

	methods: {
		setCookie() {
			document.cookie="spoc.session.id="+'b095c5e6d5b24e6fb2a6673fb82ea26e';
		},
 		getSignApprovalList(type = {}) {
			let obj = {
				name: this.compact,
				auditStatus: this.auditStatus,
			}

			SIGNAPPROVAL.signApprovalList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.signList = res.data.data.list
				}
				
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		addActiveTop(index) {
			this.num = index
			if(index) {
				this.auditStatus = 'agree,reject'
				
			}else {
				this.auditStatus = 'upgrade,waiting'
			}
			this.getSignApprovalList()
		},

		routerGo(item) {
			if(this.num) {
				this.$router.replace({
					name: 'signResult',
					query: {
						'signNumber': item.id
					}
				})
				return 
			}
			this.$router.replace({
				name: 'signDetail',
				query: {
					'signNumber': item.id
					}
				}
			)
		},

		addActive(obj) {
			if(obj == 'news') {
				this.$router.replace({
					name: 'news'
				})
				return 
			}
			this.$router.replace({
				name: 'approve'
			})
		},

		textChange() {
			this.getSignApprovalList()
		},

		datafunc() {
			return new Promise((resole, reject) => {

			})
		}
	},

	filters: {
		signText(val) {
			return val == 'agree' ? '通过' : '驳回'
		},

		filterTime(val) {
			return val.substr(0,7)
		}
 	}
}
</script>

<style lang= "less">
	.approveGsx {
		font-size: 14px;
		color: #999;
		.icon-zhang {
			font-size: 150/2px;
		}
		.title {
			line-height: 1;
			color: #000;
			height: 90/2px;
			display: flex;
			justify-content: space-around;
			span {
				font-size: 28/2px;
				text-align: center;
				line-height: 90/2px;
				height: 90/2px;
			}
			.active {
				color: #44bcbc;
				border-bottom: 2px solid #44bcbc;
			}
		}
		.content {
			padding: 30/2px;
			border-bottom: 1px solid #ccc;
			box-sizing: border-box;
			position:relative;
			.signName {
				display: inline-block;
				width: 150px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			p {
				margin: 0;
				line-height: 32px;
			}
			p:first-of-type {
				color: #000;
				font-size: 32/2px;
				margin-bottom: 20/2px;
				.right {
					font-size: 14px;
					float: right;
				}
			}
			.statusZhang {
				position: absolute;
				right: 15px;
				top: 67px;
			}
			.textZhang {
				position: absolute;
				color: white;
				left: 50%;
				top: 48%;
				transform: translate(-50%, -50%) rotate(-26deg)
			}
		}
		.isAgree {
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 97/2px;
			font-size: 0;
			background-color: #fff;
			span {
				display: inline-block;
				width: 50%;
				font-size: 16px;
				text-align: center;
				color: #999;
			}
			.active {
				color: #4f77aa;				
			}
		}
	}
</style>
