webpackJsonp([59],{hPxh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"rotationDiagramManagementDelete",data:function(){return{showDel:!0,id:""}},methods:{sure:function(){var e=this,t=new FormData;t.append("id",this.id),this.$axios.post("/api/banner/deleteBanner",t).then(function(t){e.$Message.success(e.$t("message.delete")),e.$router.push("/rotationDiagramManagement")})},cancel:function(){this.$router.go(-1)}},mounted:function(){this.id=this.$route.query.id}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Modal",{attrs:{title:"删除确认",closable:!1,"mask-closable":!1,"ok-text":e.$t("button.sure"),"cancel-text":e.$t("button.cancel")},on:{"on-ok":e.sure,"on-cancel":e.cancel},model:{value:e.showDel,callback:function(t){e.showDel=t},expression:"showDel"}},[n("p",[e._v("确定删除该条记录吗？")])])],1)},staticRenderFns:[]};var s=n("C7Lr")(a,o,!1,function(e){n("q+nL")},"data-v-3fb437f4",null);t.default=s.exports},"q+nL":function(e,t){}});
//# sourceMappingURL=59.ca5e79e04f0019709e0d.js.map