webpackJsonp([87],{"1sYk":function(e,t){},"5/Uw":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"addressCertificateDetailChangeStatus",data:function(){var e=this;return{userId:"",obj:{},columns1:[{title:"UID",key:"id",align:"center"},{key:"name",align:"center",renderHeader:function(t,r){return t("span",{},e.$t("address.name"))}},{key:"email",align:"center",renderHeader:function(t,r){return t("span",{},e.$t("address.email"))}},{key:"time",align:"center",renderHeader:function(t,r){return t("span",{},e.$t("address.auditTime"))}}],data1:[{name:"John Brown",age:18,address:"New York No. 1 Lake Park",date:"2016-10-03"}]}},beforeRouteUpdate:function(e,t,r){"addressCertificateDetailChangeStatus"===t.name&&this.getDetails(),r()},methods:{goBack:function(){this.$router.go(-1)},getDetails:function(){var e=this,t=new FormData;t.append("userId",this.userId),this.$axios.post("/api/user/getAddrVerifyById",t).then(function(t){e.obj=t.data.data,e.data1=[{id:e.obj.id,name:e.obj.nickname,email:e.obj.email,time:e.obj.userAddressVerify.ctime[0]+"/"+e.obj.userAddressVerify.ctime[1]+"/"+e.obj.userAddressVerify.ctime[2]+" "+e.obj.userAddressVerify.ctime[3]+":"+e.obj.userAddressVerify.ctime[4]+":"+e.obj.userAddressVerify.ctime[5]}]})},cheched:function(e){this.$router.push({path:"/addressCertificateDetailChangeStatus",query:{id:this.userId,status:e}})}},mounted:function(){this.userId=this.$route.query.id,this.getDetails()}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Row",[r("Table",{attrs:{border:"",columns:e.columns1,data:e.data1}})],1),e._v(" "),r("br"),e._v(" "),r("br"),e._v(" "),r("Row",[r("Col",{attrs:{span:"12",offset:"4"}},[r("Form",{attrs:{"label-position":"right","label-width":100}},[r("FormItem",{attrs:{label:e.$t("address.address")}},[r("span",[e._v(e._s(e.obj.userAddressVerify.address))])]),e._v(" "),r("FormItem",{attrs:{label:e.$t("address.photo")}},[r("div",{staticStyle:{width:"100px",height:"100px","background-color":"#6B6C6C"}},[r("img",{attrs:{src:e.obj.userAddressVerify.addressPhoto,alt:""}})])]),e._v(" "),r("FormItem",{directives:[{name:"show",rawName:"v-show",value:0==e.obj.userAddressVerify.verifyStatus,expression:"obj.userAddressVerify.verifyStatus==0"}],attrs:{label:""}},[r("Input",{staticStyle:{width:"100%"},attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"如果审核不通过，请填写打回理由、理由将通过实名认证页面发送给用户"}})],1),e._v(" "),r("FormItem",{directives:[{name:"show",rawName:"v-show",value:0==e.obj.userAddressVerify.verifyStatus,expression:"obj.userAddressVerify.verifyStatus==0"}],attrs:{label:""}},[r("Button",{attrs:{type:"primary"},on:{click:function(t){return e.cheched(1)}}},[e._v("审核通过")]),e._v(" "),r("Button",{staticStyle:{display:"inline-block","margin-left":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.cheched(2)}}},[e._v("审核不通过,打回")])],1),e._v(" "),r("FormItem",{directives:[{name:"show",rawName:"v-show",value:0!=e.obj.userAddressVerify.verifyStatus,expression:"obj.userAddressVerify.verifyStatus!=0"}],attrs:{label:""}},[r("Button",{staticStyle:{width:"80px","margin-top":"30px"},attrs:{type:"primary"},on:{click:e.goBack}},[e._v(e._s(e.$t("button.back")))])],1)],1),e._v(" "),r("router-view")],1)],1)],1)},staticRenderFns:[]};var i=r("C7Lr")(s,a,!1,function(e){r("1sYk")},"data-v-015e90ef",null);t.default=i.exports}});
//# sourceMappingURL=87.f3b927371d1456a67f57.js.map