webpackJsonp([14],{"+pKc":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("g1HI"),r={name:"staffManagement",data:function(){var t=this;return{searchParams:{email:"",page:1,pageSize:10,total:0},columns1:[{title:"员工ID",align:"center",key:"admin_id"},{title:"手机号",align:"center",key:"mobile"},{title:"邮箱",align:"center",key:"mailbox"},{title:"员工姓名",align:"center",key:"nick_name"},{title:"角色",align:"center",render:function(t,a){for(var e="",n=0;n<a.row.roleList.length;n++)e+=0===n?a.row.roleList[n].roleName:"、"+a.row.roleList[n].roleName;return t("span",{},e)}},{title:"上次登录时间",align:"center",key:"address"},{title:"登录IP",align:"center",key:"address"},{title:"操作",key:"address",align:"center",render:function(a,e){var r=1===e.row.status?"冻结":"解冻";return a("span",{},[a("a",{style:{color:"blue"},on:{click:function(){console.log("delete"),t.$store.commit("deleteModal/setDeleteParams",{url:"/api/admin/deleteAdmin",adminId:e.row.admin_id,callback:function(){t.search()}}),t.$router.push("/staffManagementDelete")}}},"删除"),a("a",{style:{color:"blue",marginLeft:"10px"},on:{click:function(){console.log("edit"),t.$router.push({name:"staffManagementEdit",params:{param:e.row}})}}},"编辑"),a("a",{style:{color:"blue",marginLeft:"10px"},on:{click:function(){console.log("cold");var a=new FormData;a.append("adminId",e.row.admin_id),t.$axios.post("/api/admin/updateAdminStatus",a).then(function(t){1===e.row.status?Object(n.f)():Object(n.o)(),console.log(t.data)}).finally(function(){return t.search()})}}},r)])}}],data1:[]}},methods:{pageSizeChange:function(t){this.searchParams.pageSize=t,this.searchParams.page=1,this.search()},pageChange:function(t){this.searchParams.page=t,this.search()},search:function(){var t=this;console.log("search",this.searchParams);var a=new FormData;a.append("page",this.searchParams.page),a.append("pageSize",this.searchParams.pageSize),a.append("mailbox",this.searchParams.email),this.$axios.post("/api/admin/listAdmin",a).then(function(a){console.log("/api/admin/listAdmin",a.data),t.data1=a.data.data.records,t.searchParams.page=a.data.data.current,t.searchParams.pageSize=a.data.data.size,t.searchParams.total=a.data.data.total})},add:function(){console.log("add"),this.$router.push("/staffManagementAdd")}},mounted:function(){this.search()}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",{attrs:{"dis-hover":""}},[e("p",{attrs:{slot:"title"},slot:"title"},[t._v("数据筛选")]),t._v(" "),e("Row",[e("Col",{attrs:{span:"12"}},[e("span",[t._v("邮箱： ")]),e("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入邮箱"},model:{value:t.searchParams.email,callback:function(a){t.$set(t.searchParams,"email",a)},expression:"searchParams.email"}})],1),t._v(" "),e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[e("Button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")])],1)],1)],1)],1)],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Card",{staticClass:"staffListHeader",attrs:{"dis-hover":""}},[e("p",{staticStyle:{padding:"0",display:"inline-block",height:"34px","line-height":"34px"},attrs:{slot:"title"},slot:"title"},[t._v("\n          员工列表\n          "),e("span",{staticStyle:{display:"inline-block",float:"right","line-height":"20px"}},[e("Button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("添加")])],1)]),t._v(" "),e("Row",[e("Table",{attrs:{border:"",columns:t.columns1,data:t.data1}})],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{staticStyle:{"text-align":"center"},attrs:{span:"24"}},[e("Page",{attrs:{total:t.searchParams.total,"show-total":"","show-sizer":""},on:{"on-page-size-change":function(a){return t.pageSizeChange(a)},"on-change":function(a){return t.pageChange(a)}}})],1)],1)],1)],1)],1),t._v(" "),e("br"),t._v(" "),e("Row",{attrs:{gutter:16}},[e("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[e("Button",{staticStyle:{width:"120px"},attrs:{type:"primary"}},[t._v("保存")]),t._v(" \n    ")],1),t._v(" "),e("Col",{attrs:{span:"12"}},[e("Button",{staticStyle:{width:"120px"},attrs:{type:"default"}},[t._v("取消")])],1)],1),t._v(" "),e("router-view")],1)},staticRenderFns:[]};var i=e("C7Lr")(r,s,!1,function(t){e("Lu5X")},"data-v-dec97e54",null);a.default=i.exports},Lu5X:function(t,a){}});
//# sourceMappingURL=14.9b7b89d56add73fdfdf9.js.map