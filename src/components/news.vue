<template>
	<div class="newsGsx1">
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
		<a v-if="data.list.length" @click="allRead" class="tab">全部已读</a>
		<div class="newsContent">
			<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
				<div class="content">
					<div class="contentDetail" v-for="item in data.list">
						<p @click="detaliInfo(item)">{{item.title}}<i v-if="item.readFlag != 1"></i><span>{{item.sendTime}}</span></p>
						<div class="noticeContent">
							{{item.content}}
						</div>
					</div>
				</div>
			</v-scroll>
		</div>
		<div class="isAgree">
			<span class="active" @click="addActive('news')"><i class="iconfont icon-xuanxiaoshenpi_"></i><br/>消息</span>
			<span @click="addActive('notice')" class="addActive"><i class="iconfont icon-icon_notice "></i><br/>审核</span>
		</div>
	</div>
</template>
<script>
import vSelect from './modules/vSelect'
import valid, { errors, NEWS } from "./libs/request";
import Scroll from './modules/betterScroll';

export default {
	data () {
		return {
			compact: '',
			readFlag: '',
			pageNo: 1,
			pageSize: 10,
			data: {
				list: []
			},
			count: '',
		}
	},
	components: {
		vSelect,
		'v-scroll': Scroll,
	},
	
	computed: {
		textChang() {

		}
	},

	mounted() {
		this.getNewsMessage()
	},

	methods: {
		onRefresh(done) {
			this.getNewsMessage();
			done() 
		},

		onInfinite(done) { 
			if(this.pageNo * this.pageSize >= this.count) {
				this.$el.querySelector('.load-more span').innerHTML = '没有更多了';
				return
			}
			this.pageNo++
			let obj = {
				readFlag: this.readFlag,
				menuId: 201,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			}

			NEWS.message(obj)
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
		getNewsMessage() {
			let obj = {
				readFlag: this.readFlag,
				menuId: 201,
				pageNo: 1,
				pageSize: 10,
			}

			NEWS.message(obj)
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

		addActive(index) {
			this.num = index
		},

		allRead() {
			this.id = ''
			this.targetMarkRead()
		},

		targetMarkRead() {
			let obj = {
				id: this.id
			}

			NEWS.markRead(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.getNewsMessage()
				}
				
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		addActive(obj) {
			if(obj == 'news') {
				this.$router.replace({
					name: 'news'
				})
				return 
			}
		
			this.$router.replace({
				name: 'notice'
			})
		},

		detaliInfo(item) {
			this.id = item.id
			this.targetMarkRead()
			this.$router.replace({
				name: 'newsDetail',
				query: {
					id: item.id
				}
			})
		},

		textChange() {

		},
 
		datafunc() {
			return new Promise((resole, reject) => {

			})
		}
	},

	filters: {
		signText(val) {
			return val == 1 ? '通过' : '驳回'
		}
 	}
}
</script>

<style lang= "less">
	.newsGsx1 {
		overflow: hidden;
		position: absolute;
		top: 0;
		bottom: 0px;
		left: 0;
		right: 0;
		.tab {
			top: 60px;
			display: block;
			text-align: right;
			right: 10px; 
			width: 100%;
			z-index: 22222;
			position: absolute;
			color: #4f77aa;
		}
		.newsContent {
			margin-top: 15px;
			position: relative;
			overflow: hidden;
			height: 100%;
			margin-bottom: 58.5px;
		}
		.content {
			p:first-of-type {
				font-size: 16px;
				i {
					display: inline-block;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: red;
					margin-left: 5px;
				}
				span {
					float: right;
					font-size: 14px;
					color: #999;
				}
			}
			.contentDetail {
				padding: 10px 16px 16px 22px;
				border-bottom: 1px solid #eee;
				.noticeContent {
					font-size: 14px;
					color: #999;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
				}
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
				font-size: 12px;
				text-align: center;
				color: #999;
				height:  97/2px;
				padding-top: 9px;
			}
			.active {
				color: #4f77aa;				
			}
		}
	}
</style>
