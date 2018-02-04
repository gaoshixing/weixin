<template>
	<div class="baseGsx">
		<v-select
		:datafunc = "datafunc"
		value = '请输入合同号'

		></v-select>
		<div class="title">
			<span v-for="(item, index) in statusList" @click="addActive(index)" :class="{active:num == index}">{{item}}</span>
		</div>
		<div class="content" v-for="item in signList">
			<p @click="routerGo"><<{{item.title}}>> <span class="right">{{item.num}}</span></p>
			<p>提交人: {{item.peope}}</p>
			<p>提交时间: {{item.time}}</p>
			<p v-if="num>0">审核时间: {{item.checkTime}}</p>
			<div v-if="num>0" class="statusZhang">
				<i class="iconfont icon-zhang"></i>
				<span>{{item.text|signText}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import vSelect from './modules/vSelect'
export default {
	data () {
		return {
			statusList: ['待处理', '已处理'],
			num: 0,
			signList: [
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '1'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '2'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '1'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '1'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '2'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '1'},
				{title: '高中留学服务', peope: '刘芳一', time: '2017/12/1', num: '#898989', checkTime: '2017/11/8', text: '2'}		
			],
		}
	},
	components: {
		vSelect,
	},
	
	computed: {
		textZhang() {

		}
	},

	methods: {
		addActive(index) {
			console.log(index)
			alert(2)
			this.num = index
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
	.baseGsx {
		.icon-zhang {
			font-size: 150/2px;
			color: #44bcbc;
		}
		.title {
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
			p {
				margin: 0;
				line-height: 32px;
			}
			p:first-of-type {
				font-size: 32/2px;
				margin-bottom: 20/2px;
				.right {
					font-size: 14px;
					float: right;
				}
			}
			.statusZhang {
				position: absolute;
				right: 18/2px;
				top: 50/2px;
			}
		}
	}
</style>
