webpackJsonp([33],{DSvo:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{showDel:!0,id:"",opUid:"",status:"",outTransId:""}},methods:{sure:function(){var s=this;if(this.outTransId){var t=new FormData;t.append("status",this.status),t.append("opUid",this.opUid),t.append("id",this.id),t.append("outTransId",this.outTransId),this.$axios.post("/api/transactionWithdraw/updateTransactionWithdrawById",t).then(function(t){s.$Message.success("审核完成"),s.$router.go(-1)})}else this.$Message.error("审核失败！"),this.$router.go(-1)},cancel:function(){this.$router.go(-1)}},mounted:function(){this.opUid=JSON.parse(localStorage.getItem("userInfo")).adminId,this.id=this.$route.query.id,this.status=this.$route.query.status}},o={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("Modal",{attrs:{title:"审核",closable:!1,"mask-closable":!1},on:{"on-ok":s.sure,"on-cancel":s.cancel},model:{value:s.showDel,callback:function(t){s.showDel=t},expression:"showDel"}},[e("p",{directives:[{name:"show",rawName:"v-show",value:3!=s.status,expression:"status!=3"}]},[s._v("确定"+s._s(1==s.status?"通过":3==s.status?"拒绝":"")+"该申请吗？")]),s._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:3==s.status,expression:"status==3"}]},[s._v("请输入银行单号")]),s._v(" "),e("Input",{directives:[{name:"show",rawName:"v-show",value:3==s.status,expression:"status==3"}],attrs:{placeholder:"00000000"},model:{value:s.outTransId,callback:function(t){s.outTransId=t},expression:"outTransId"}})],1)],1)},staticRenderFns:[]};var n=e("C7Lr")(a,o,!1,function(s){e("bTyL")},"data-v-7683243e",null);t.default=n.exports},bTyL:function(s,t){}});
//# sourceMappingURL=33.1514b1aa3276e7b6e7ce.js.map