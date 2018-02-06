<template>
	<div class="newsGsx">
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
		<div class="content">
			<a @click="allRead" class="tab">全部标记为已读</a>
			<div class="contentDetail" v-for="item in obj">
				<p @click="detaliInfo">{{item.title}}<i v-if="item.status"></i><span>{{item.time}}</span></p>
				<div class="noticeContent">
					{{item.content}}
				</div>
			</div>
		</div>
		<div style="height:50px"></div>
		<div class="isAgree">
			<span class="active" @click="addActive('news')"><i class="iconfont icon-xuanxiaoshenpi_"></i><br/>消息</span>
			<span @click="addActive('notice')" class="addActive"><i class="iconfont icon-icon_notice "></i><br/>审核</span>
		</div>
	</div>
</template>

<script>
import vSelect from './modules/vSelect'
export default {
	data () {
		return {
			compact: '',
			obj: [
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: false,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
				{status: true,title: '签约通知', time: '2017.01.7', content: '到哪里看吧大保健安保点击看顶部萨拉丁不解散科技是的比较安康杯丹江口市fhajha'},
			]
		}
	},
	components: {
		vSelect,
	},
	
	computed: {
		textChang() {

		}
	},

	methods: {
		addActive(index) {
			this.num = index
		},

		allRead() {
			alert(0)
		},

		routerGo() {
			if(this.num) {
				this.$router.replace({
					name: 'signResult'
				})
				return 
			}
			this.$router.replace(
				{name: 'signDetail'}
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
				name: 'notice'
			})
		},

		detaliInfo() {
			this.$router.replace({
				name: 'newsDetail'
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
	.newsGsx {
		.tab {
			position: relative;
			left: 70%;
			top: 15px;
			color: #4f77aa;
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
				border-bottom: 1px solid #999;
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
