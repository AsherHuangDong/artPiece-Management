webpackJsonp([54],{CYiE:function(t,e){},tgOQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"userStatistics",data:function(){var t=this;return{symbol:[],list:[{name:"111",age:13}],total:0,obj:{currency:"-1",status:"-1",category:"2",currPage:1,pageSize:10},columns:[{title:"数据列表 | 友情提醒：审核时请判断用户账户是否平账、是否存在套利或其他违规操作，SaaS云交易所官方只提供技术层面风险监控，业务层面的风险需交易所运营方自行把控。",children:[{title:"提现单号",key:"id",align:"center"},{title:"UID",key:"uid",align:"center"},{title:"登录账号",key:"loginAccount",align:"center"},{title:"币种",key:"symbol",align:"center"},{title:"提现时间",key:"createdAt",align:"center"},{title:"手续费",key:"fee",align:"center"},{title:"收款银行",key:"bankNo",align:"center"},{title:"收款账号",key:"cardNo",align:"center"},{title:"收款姓名",key:"name",align:"center"},{title:"银行流水单",key:"outTransId",align:"center"},{title:"操作员",key:"operator",align:"center"},{title:"提现状态",key:"status",align:"center",render:function(t,e){return t("span",{},0==e.row.status?"未审核":1==e.row.status?"通过":2==e.row.status?"未通过":3==e.row.status?"回款中":4==e.row.status?"已完成":5==e.row.status?"汇款失败":6==e.row.status?"已撤销":"")}},{key:"name",align:"center",renderHeader:function(e,a){return e("span",{},t.$t("public.action"))},render:function(e,a){return 0==a.row.status?e("div",{style:{color:"#2d8cf0",padding:"0 10px",display:"flex","justify-content":"space-around"}},[e("span",{on:{click:function(){t.$router.push({path:"/withdrawalAuditChangeStatus",query:{id:a.row.id,status:4}})}}},"通过"),e("span",{},"|"),e("span",{on:{click:function(){t.$router.push({path:"/withdrawalAuditChangeStatus",query:{id:a.row.id,status:2}})}}},"拒绝")]):3==a.row.status?e("div",{style:{color:"#2d8cf0",padding:"0 10px",display:"flex","justify-content":"space-around"}},[e("span",{on:{click:function(){t.$router.push({path:"/withdrawalAuditChangeStatus",query:{id:a.row.id,status:4}})}}},"完成支付")]):void 0}}]}]}},beforeRouteUpdate:function(t,e,a){"withdrawalAuditChangeStatus"===e.name&&this.getData(),a()},methods:{exportTable:function(){},changePage:function(t){this.obj.currPage=currPage,this.getData()},changePageSize:function(t){this.obj.pageSize=t,this.getData()},getData:function(){var t=this,e=new FormData;if(e.append("currPage",this.obj.currPage),e.append("pageSize",this.obj.pageSize),-1!=this.obj.currency&&e.append("currency",this.obj.currency),this.obj.Keywords&&(e.append("Keywords",this.obj.Keywords),e.append("category",this.obj.category)),-1!=this.obj.status&&e.append("status",this.obj.status),this.obj.id&&e.append("id",this.obj.id),this.obj.startTime&&this.obj.endTime){var a=this.$tool.date.format(new Date(this.obj.startTime),"yyyy-MM-dd hh:mm:ss"),i=this.$tool.date.format(new Date(this.obj.endTime),"yyyy-MM-dd hh:mm:ss");e.append("startTime",a),e.append("endTime",i)}this.$axios.post("/api/transactionWithdraw/selectTransactionWithdrawByPage",e).then(function(e){t.list=e.data.data.list,t.total=e.data.data.total})},getcoin:function(){var t=this;this.$axios.get("/api/configCoinSymbol/getConfigCoinSymbolList",{}).then(function(e){t.symbol=e.data.data})}},mounted:function(){this.getData(),this.getcoin()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("Row",[a("Col",{staticStyle:{"margin-top":"10px",display:"flex","flex-wrap":"wrap","justify-content":"space-between"}},[a("div",{staticStyle:{margin:"0 20px 20px 0"}},[a("span",{staticStyle:{display:"inline-block","margin-left":"10px"}},[t._v("币种：")]),t._v(" "),a("Select",{staticStyle:{width:"80px"},model:{value:t.obj.currency,callback:function(e){t.$set(t.obj,"currency",e)},expression:"obj.currency"}},[a("Option",{attrs:{value:"-1"}},[t._v("全部")]),t._v(" "),t._l(t.symbol,function(e,i){return a("Option",{key:i,attrs:{value:e.id}},[t._v(t._s(e.coinSymbol))])})],2)],1),t._v(" "),a("div",{staticStyle:{margin:"0 20px 20px 0"}},[a("span",[t._v("关键字：")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入UID/手机号/邮箱"},model:{value:t.obj.KeyWords,callback:function(e){t.$set(t.obj,"KeyWords",e)},expression:"obj.KeyWords"}}),t._v(" "),a("Select",{staticStyle:{width:"80px"},model:{value:t.obj.category,callback:function(e){t.$set(t.obj,"category",e)},expression:"obj.category"}},[a("Option",{attrs:{value:"1"}},[t._v("UID")]),t._v(" "),a("Option",{attrs:{value:"2"}},[t._v("手机号")]),t._v(" "),a("Option",{attrs:{value:"3"}},[t._v("邮箱")])],1)],1),t._v(" "),a("div",{staticStyle:{margin:"0 20px 20px 0"}},[a("span",{staticStyle:{display:"inline-block","margin-left":"10px"}},[t._v("提现状态：")]),t._v(" "),a("Select",{staticStyle:{width:"80px"},model:{value:t.obj.status,callback:function(e){t.$set(t.obj,"status",e)},expression:"obj.status"}},[a("Option",{attrs:{value:"-1"}},[t._v("全部")]),t._v(" "),a("Option",{attrs:{value:"0"}},[t._v("待审核")]),t._v(" "),a("Option",{attrs:{value:"1"}},[t._v("已通过")]),t._v(" "),a("Option",{attrs:{value:"2"}},[t._v("未通过")]),t._v(" "),a("Option",{attrs:{value:"3"}},[t._v("回款中")]),t._v(" "),a("Option",{attrs:{value:"4"}},[t._v("已完成")]),t._v(" "),a("Option",{attrs:{value:"5"}},[t._v("汇款失败")]),t._v(" "),a("Option",{attrs:{value:"6"}},[t._v("已撤销")])],1)],1),t._v(" "),a("div",{staticStyle:{margin:"0 20px 20px 0"}},[a("span",{staticStyle:{display:"inline-block","margin-left":"10px"}},[t._v("提现单号：")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入提现单号"},model:{value:t.obj.id,callback:function(e){t.$set(t.obj,"id",e)},expression:"obj.id"}})],1),t._v(" "),a("div",{staticStyle:{margin:"0 20px 20px 0"}},[a("span",[t._v("注册时间：")]),t._v(" "),a("DatePicker",{attrs:{type:"date",placeholder:"Select date"},model:{value:t.obj.startTime,callback:function(e){t.$set(t.obj,"startTime",e)},expression:"obj.startTime"}}),t._v("--\n        "),a("DatePicker",{attrs:{type:"date",placeholder:"Select date"},model:{value:t.obj.endTime,callback:function(e){t.$set(t.obj,"endTime",e)},expression:"obj.endTime"}})],1),t._v(" "),a("div",[a("span",{staticStyle:{display:"inline-block",float:"right","line-height":"20px"}},[a("Button",{attrs:{type:"primary"},on:{click:t.getData}},[t._v(t._s(t.$t("button.search")))])],1),t._v(" "),a("span",{staticStyle:{display:"inline-block",float:"right","line-height":"20px","margin-right":"10px"}},[a("Button",{attrs:{type:"primary"},on:{click:t.exportTable}},[t._v(t._s(t.$t("button.export")))])],1)])])],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("Row",[a("Table",{attrs:{columns:t.columns,border:"",data:t.list}})],1),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total,"show-total":"","show-elevator":"","show-sizer":"",current:t.obj.currPage,"page-size":t.obj.pageSize},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var s=a("C7Lr")(i,n,!1,function(t){a("CYiE")},"data-v-47fe4599",null);e.default=s.exports}});
//# sourceMappingURL=54.a9eed0ca94a0220688f3.js.map