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
		 <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
			<div class="content" @click="routerGo(item)" v-for="item in data.list">
				<p ><span class="signName">{{item.name}}</span><span class="right">{{item.code}}</span></p>
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
    	</v-scroll>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span  @click="addActive('news')"><i class="iconfont icon-xuanxiaoshenpi_"></i><br/>消息</span>
			<span  class="active" @click="addActive('notice')" ><i class="iconfont icon-icon_notice "></i><br/>审核</span>
		</div>
	</div>
</template>

<script>
import Scroll from './modules/betterScroll';
import vSelect from './modules/vSelect'
import valid, { errors, SIGNAPPROVAL } from "./libs/request";

export default {
	data () {
		return {
			pageNo: 1,
			statusList: ['待处理', '已处理'], 
			num: 1,
			pageSize: 10,
			compact: '',
			count: '',
			data: {
				list: [],
			},
			auditStatus: 'agree,reject',
		}
	},
	components: {
		vSelect,
		'v-scroll': Scroll
	},
	
	computed:{
		
	},
	
	create() {
	},

	mounted() {
		this.getSignApprovalList()
		this.$el.querySelector('.yo-scroll').style.top = '77px'
	},

	methods: {
		onRefresh(done) {
			this.getSignApprovalList();
			done() // call done
		},

    	onInfinite(done) {
			if(this.pageNo * this.pageSize >= this.count) {
				this.$el.querySelector('.load-more span').innerHTML = '没有更多了';
				return
			}
			this.pageNo++
			let obj = {
				name: this.compact,
				auditStatus: this.auditStatus,
				pageSize: 10,
				pageNo: this.pageNo,
			}
			SIGNAPPROVAL.signApprovalList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					res.data.data.list.forEach((item) => {
						this.data.list.push(item)	
						done()
					})
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
        },
  
 		getSignApprovalList(type = {}) {
			let obj = {
				name: this.compact,
				auditStatus: this.auditStatus,
				pageSize: 10,
				pageNo: 1,
			}

			SIGNAPPROVAL.signApprovalList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.data = res.data.data
					this.count = res.data.data.count
					this.pageNo = 1
					if(this.count < 10) {
						this.$el.querySelector('.load-more span').innerHTML = '没有更多了';
					}else {
						this.$el.querySelector('.load-more span').innerHTML = '加载中...';
					}				
				}
				
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		addActiveTop(index) {
			if(!index) {
				this.$router.replace({
					name: 'approve',
				})
				return 
			}
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
			z-index: 9999;
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
				color: #4f77aa;
				border-bottom: 2px solid #4f77aa;
			}
		}
		.content {
			padding: 30/2px;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
			position:relative;
			.signName {
				display: inline-block;
				width: 55%;
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
				top: 50%;
				transform: translate(-50%, -50%) rotate(-21deg)
			}
		}
		.isAgree {
            font-size: 12px;
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 97/2px;
			font-size: 0;
			background-color: #fff;
			span {
				border-top: 1px solid #eeeeee;
				display: inline-block;
				width: 50%;
				font-size: 12px;
				text-align: center;
                height: 97/2px;
				color: #999;
                padding-top: 9px;
			}
			.active {
				color: #4f77aa;				
			}
		}
	}
</style>
