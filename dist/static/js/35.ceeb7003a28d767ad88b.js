webpackJsonp([35],{PkKX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"realNameAuditDetail",data:function(){var e=this;return{userId:"",obj:{authRealname:""},reason:"",columns1:[{title:"UID",key:"id",align:"center"},{key:"mobileNumber",align:"center",renderHeader:function(t,a){return t("span",{},e.$t("realName.phone"))}},{key:"email",align:"center",renderHeader:function(t,a){return t("span",{},e.$t("realName.email"))}},{key:"time",align:"center",renderHeader:function(t,a){return t("span",{},e.$t("realName.auditTime"))}},{title:"证件类型",key:"certificateType",align:"center",renderHeader:function(t,a){return t("span",{},e.$t("realName.certificateType"))}},{key:"name",align:"center",renderHeader:function(t,a){return t("span",{},e.$t("realName.name"))}}],data1:[]}},beforeRouteUpdate:function(e,t,a){"realNameAuditDetailChangeStatus"===t.name&&this.getDetails(),a()},methods:{goBack:function(){this.$router.go(-1)},getDetails:function(){var e=this,t=new FormData;t.append("userId",this.userId),this.$axios.post("/api/user/getNameVerifyById",t).then(function(t){e.obj=t.data.data,e.data1=[{id:e.obj.id,name:e.obj.nickname,email:e.obj.email,time:e.obj.authRealname.ctime[0]+"/"+e.obj.authRealname.ctime[1]+"/"+e.obj.authRealname.ctime[2]+" "+e.obj.authRealname.ctime[3]+":"+e.obj.authRealname.ctime[4]+":"+e.obj.authRealname.ctime[5],mobileNumber:e.obj.mobileNumber,certificateType:e.obj.authRealname.certificateType}]})},cheched:function(e){this.$router.push({path:"/realNameAuditDetailChangeStatus",query:{id:this.userId,status:e,reason:this.obj.authRealname.reason}})}},mounted:function(){this.userId=this.$route.query.id,this.getDetails()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("Table",{attrs:{border:"",columns:e.columns1,data:e.data1}})],1),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("Row",[a("Col",{attrs:{span:"12",offset:"4"}},[a("Form",{attrs:{"label-position":"left","label-width":200}},[a("FormItem",{staticStyle:{"border-bottom":"1px solid #eee"},attrs:{label:e.$t("realName.name")+"："}},[a("span",[e._v(e._s(e.obj.nickname))])]),e._v(" "),a("FormItem",{staticStyle:{"border-bottom":"1px solid #eee"},attrs:{label:e.$t("realName.name")+"："}},[a("span",[e._v(e._s(e.obj.authRealname.countryCode))])]),e._v(" "),a("FormItem",{staticStyle:{"border-bottom":"1px solid #eee"},attrs:{label:e.$t("realName.certificateType")+"："}},[a("span",[e._v(e._s(e.obj.authRealname.certificateType))])]),e._v(" "),a("FormItem",{staticStyle:{"border-bottom":"1px solid #eee"},attrs:{label:e.$t("realName.certificateNum")+"："}},[a("span",[e._v(e._s(e.obj.authRealname.certificateNumber))])]),e._v(" "),a("FormItem",{staticStyle:{"border-bottom":"1px solid #eee"},attrs:{label:e.$t("realName.photo1")+"："}},[a("div",{staticStyle:{width:"100px",height:"100px","background-color":"#6B6C6C","margin-bottom":"10px"}})]),e._v(" "),a("FormItem",{attrs:{label:e.$t("realName.photo2")+"："}},[a("div",{staticStyle:{width:"100px",height:"100px","background-color":"#6B6C6C"}})]),e._v(" "),a("FormItem",{attrs:{label:""}},[a("Input",{directives:[{name:"show",rawName:"v-show",value:1!=e.obj.authRealname.authStatus,expression:"obj.authRealname.authStatus!=1"}],staticStyle:{width:"100%"},attrs:{type:"textarea",disabled:2==e.obj.authRealname.authStatus,autosize:{minRows:2,maxRows:5},placeholder:"如果审核不通过，请填写打回理由、理由将通过实名认证页面发送给用户"},model:{value:e.obj.authRealname.reason,callback:function(t){e.$set(e.obj.authRealname,"reason",t)},expression:"obj.authRealname.reason"}})],1),e._v(" "),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:0!=e.obj.authRealname.authStatus,expression:"obj.authRealname.authStatus!=0"}],attrs:{label:""}},[a("Button",{staticStyle:{width:"80px","margin-top":"30px"},attrs:{type:"primary"},on:{click:e.goBack}},[e._v(e._s(e.$t("button.back")))])],1),e._v(" "),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:0==e.obj.authRealname.authStatus,expression:"obj.authRealname.authStatus==0"}],attrs:{label:""}},[a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.cheched(1)}}},[e._v("审核通过")]),e._v(" "),a("Button",{staticStyle:{display:"inline-block","margin-left":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.cheched(2)}}},[e._v("审核不通过,打回")])],1)],1)],1)],1),e._v(" "),a("router-view")],1)},staticRenderFns:[]};var o=a("C7Lr")(r,n,!1,function(e){a("rJrk")},"data-v-6d9f76ba",null);t.default=o.exports},rJrk:function(e,t){}});
//# sourceMappingURL=35.ceeb7003a28d767ad88b.js.map