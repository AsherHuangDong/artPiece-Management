webpackJsonp([16],{"Pt6+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("InnB"),r={components:{VueEditor:a("WHp7").a},name:"auctionManagementAdd",data:function(){return{time1:"",time2:"",auctionList:[],formValidate:{eligibility:!1},ruleValidate:{auctionRules:[{required:!0,message:"The auctionRules cannot be empty",trigger:"blur"}],cancelAuctionRules:[{required:!0,message:"The cancelAuctionRules  cannot be empty",trigger:"blur"}],type:[{required:!0,message:"The copyrightType  cannot be empty",trigger:"blur"}],copyrightCode:[{required:!0,message:"The copyrightCode  cannot be empty",trigger:"blur"}],copyrightId:[{required:!0,message:"The copyrightId  cannot be empty",trigger:"blur"}],eligibility:[{required:!0,message:"The eligibility  cannot be empty",trigger:"blur"}],etime:[{required:!0,type:"date",message:"The etime  cannot be empty",trigger:"blur"}],freeHandlingFee:[{required:!0,message:"The freeHandlingFee  cannot be empty",trigger:"blur"}],handlingFee:[{required:!0,message:"The handlingFee  cannot be empty",trigger:"blur"}],issuanceTotalAmount:[{required:!0,message:"The issuanceTotalAmount  cannot be empty",trigger:"blur"}],minAuctionAmount:[{required:!0,message:"The minAuctionAmount  cannot be empty",trigger:"blur"}],minAuctionNumber:[{required:!0,message:"The minAuctionNumber  cannot be empty",trigger:"blur"}],priceAccuracy:[{required:!0,message:"The priceAccuracy  cannot be empty",trigger:"blur"}],startingPrice:[{required:!0,message:"The startingPrice  cannot be empty",trigger:"blur"}],stime:[{required:!0,type:"date",message:"The stime   cannot be empty",trigger:"blur"}],canNotCancelTime:[{required:!0,message:"The time cannot be empty",trigger:"blur"}],sendEmailTime:[{required:!0,message:"The time cannot be empty",trigger:"blur"}],percentage:[{required:!0,message:"The percentage cannot be empty",trigger:"blur"}]},option1:{disabledDate:function(e){return e&&e.valueOf()<Date.now()-864e5}},option2:{disabledDate:function(e){return e&&e.valueOf()<Date.now()-864e5}}}},methods:{handleImageAdded:function(e,t,a,i){var r=new FormData;r.append("image",e),this.$axios.post("/api/upload/image",r).then(function(e){var r=e.data.data[0];t.insertEmbed(a,"image",r),i()}).catch(function(e){console.log(e)})},cancel:function(){this.$router.push("/auctionManagement")},copyrightCodeChange:function(e){console.log(e),this.formValidate.copyrightCode=e.label},handleSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e?(t.$Message.success("Success!"),t.saveCopyrightAuction()):t.$Message.error("Fail!")})},saveCopyrightAuction:function(){var e=this;if(Number(this.formValidate.stime)+Number(this.time1)>Number(this.formValidate.etime)+Number(this.time2))this.$Message.error("时间选择有误！！");else{this.formValidate.stime=Object(i.b)(Number(this.formValidate.stime))+this.time1,this.formValidate.etime=Object(i.b)(Number(this.formValidate.etime))+this.time2;var t=new FormData;for(var a in this.formValidate)t.append(a,this.formValidate[a]);console.log(t),t.delete("eligibility"),!0===this.formValidate.eligibility?t.append("eligibility","1"):t.append("eligibility","0"),this.$axios.post("/api/copyrightAuction/saveCopyrightAuction",t).then(function(t){console.log("/api/copyrightAuction/saveCopyrightAuction",t.data),"成功"===t.data.msg&&e.$router.push("/auctionManagement")})}},getCopyright:function(){var e=this;this.$axios.get("/api/copyright/getCopyright").then(function(t){console.log(t.data),e.auctionList=t.data.data})}},mounted:function(){this.getCopyright()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("Card",{attrs:{"dis-hover":""}},[a("Form",{ref:"formValidate",attrs:{"label-position":"right","label-width":250,model:e.formValidate,rules:e.ruleValidate}},[a("Row",{staticStyle:{"margin-top":"-10px"}},[a("Col",{staticStyle:{"line-height":"34px"},attrs:{span:"24"}},[a("div",{staticStyle:{display:"inline-block",height:"14px",border:"2px solid #515a6e","margin-right":"5px"}}),e._v(" "),a("span",{staticStyle:{"font-weight":"bold"}},[e._v("基本信息")])])],1),e._v(" "),a("Divider",{staticStyle:{margin:"10px 0"}}),e._v(" "),a("Row",[a("Col",{attrs:{span:"20",offset:"1"}},[a("FormItem",{attrs:{label:"拍卖版权代码：",prop:"copyrightCode"}},[a("Select",{staticStyle:{width:"40%","min-width":"300px"},attrs:{"label-in-value":""},on:{"on-change":e.copyrightCodeChange},model:{value:e.formValidate.copyrightId,callback:function(t){e.$set(e.formValidate,"copyrightId",t)},expression:"formValidate.copyrightId"}},e._l(e.auctionList,function(t,i){return a("Option",{key:i,attrs:{value:t.id}},[e._v(e._s(t.copyrightCode))])}),1)],1),e._v(" "),a("FormItem",{attrs:{label:"拍卖类型：",prop:"type"}},[a("Select",{staticStyle:{width:"40%","min-width":"300px"},attrs:{"label-in-value":""},model:{value:e.formValidate.type,callback:function(t){e.$set(e.formValidate,"type",t)},expression:"formValidate.type"}},[a("Option",{attrs:{value:"1"}},[e._v("拍卖")]),e._v(" "),a("Option",{attrs:{value:"2"}},[e._v("抢购")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"发行总量：",prop:"issuanceTotalAmount"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.issuanceTotalAmount,callback:function(t){e.$set(e.formValidate,"issuanceTotalAmount",t)},expression:"formValidate.issuanceTotalAmount"}})],1),e._v(" "),a("FormItem",{attrs:{label:"起拍价格：",prop:"startingPrice"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.startingPrice,callback:function(t){e.$set(e.formValidate,"startingPrice",t)},expression:"formValidate.startingPrice"}})],1),e._v(" "),a("FormItem",{attrs:{label:"开始时间：",prop:"stime"}},[a("DatePicker",{staticStyle:{width:"20%","min-width":"150px"},attrs:{options:e.option1,value:e.formValidate.stime,type:"date",placeholder:"Select date"},model:{value:e.formValidate.stime,callback:function(t){e.$set(e.formValidate,"stime",t)},expression:"formValidate.stime"}}),e._v(" "),a("TimePicker",{staticStyle:{width:"20%","min-width":"150px"},attrs:{value:e.time1,type:"time",placeholder:"Select time"},model:{value:e.time1,callback:function(t){e.time1=t},expression:"time1"}})],1),e._v(" "),a("FormItem",{attrs:{label:"结束时间：",prop:"etime"}},[a("DatePicker",{staticStyle:{width:"20%","min-width":"150px"},attrs:{options:e.option2,value:e.formValidate.etime,type:"date",placeholder:"Select date"},model:{value:e.formValidate.etime,callback:function(t){e.$set(e.formValidate,"etime",t)},expression:"formValidate.etime"}}),e._v(" "),a("TimePicker",{staticStyle:{width:"20%","min-width":"150px"},attrs:{value:e.time2,type:"time",placeholder:"Select time"},model:{value:e.time2,callback:function(t){e.time2=t},expression:"time2"}})],1)],1)],1),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("Row",{staticStyle:{"margin-top":"-10px"}},[a("Col",{staticStyle:{"line-height":"34px"},attrs:{span:"24"}},[a("div",{staticStyle:{display:"inline-block",height:"14px",border:"2px solid #515a6e","margin-right":"5px"}}),e._v(" "),a("span",{staticStyle:{"font-weight":"bold"}},[e._v("拍卖参数")])])],1),e._v(" "),a("Divider",{staticStyle:{margin:"10px 0"}}),e._v(" "),a("Row",[a("Col",{attrs:{span:"20",offset:"1"}},[a("FormItem",{attrs:{label:"价格精度：",prop:"priceAccuracy"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.priceAccuracy,callback:function(t){e.$set(e.formValidate,"priceAccuracy",t)},expression:"formValidate.priceAccuracy"}},[a("span",{attrs:{slot:"append"},slot:"append"},[e._v("位小数")])])],1),e._v(" "),a("FormItem",{attrs:{label:"单笔交易最小拍卖金额：",prop:"minAuctionAmount"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.minAuctionAmount,callback:function(t){e.$set(e.formValidate,"minAuctionAmount",t)},expression:"formValidate.minAuctionAmount"}},[a("span",{attrs:{slot:"append"},slot:"append"},[e._v("AP")])])],1),e._v(" "),a("FormItem",{attrs:{label:"单笔交易最小拍卖数量：",prop:"minAuctionNumber"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.minAuctionNumber,callback:function(t){e.$set(e.formValidate,"minAuctionNumber",t)},expression:"formValidate.minAuctionNumber"}})],1),e._v(" "),a("FormItem",{attrs:{label:"手续费：",prop:"handlingFee"}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("Input",{staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:e.formValidate.handlingFee,callback:function(t){e.$set(e.formValidate,"handlingFee",t)},expression:"formValidate.handlingFee"}},[a("span",{attrs:{slot:"append"},slot:"append"},[e._v("AP")])])],1),e._v(" "),a("Col",{attrs:{span:"1"}},[a("span",[e._v("+")])]),e._v(" "),a("Col",{attrs:{span:"4"}},[a("Input",{staticStyle:{width:"100px"},attrs:{placeholder:"0",type:"number"},model:{value:e.formValidate.handlingFeePercent,callback:function(t){e.$set(e.formValidate,"handlingFeePercent",t)},expression:"formValidate.handlingFeePercent"}},[a("span",{attrs:{slot:"append"},slot:"append"},[e._v("%")])])],1)],1)],1),e._v(" "),a("FormItem",{attrs:{label:"免手续费次数：",prop:"freeHandlingFee"}},[a("Input",{staticStyle:{width:"40%","min-width":"300px"},attrs:{type:"number"},model:{value:e.formValidate.freeHandlingFee,callback:function(t){e.$set(e.formValidate,"freeHandlingFee",t)},expression:"formValidate.freeHandlingFee"}})],1)],1)],1),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("Row",{staticStyle:{"margin-top":"-10px"}},[a("Col",{staticStyle:{"line-height":"34px"},attrs:{span:"24"}},[a("div",{staticStyle:{display:"inline-block",height:"14px",border:"2px solid #515a6e","margin-right":"5px"}}),e._v(" "),a("span",{staticStyle:{"font-weight":"bold"}},[e._v("其他设置")])])],1),e._v(" "),a("Divider",{staticStyle:{margin:"10px 0"}}),e._v(" "),a("Row",[a("Col",{attrs:{span:"20",offset:"1"}},[a("FormItem",{attrs:{label:"参加资格：",prop:"auctionRules"}},[a("Checkbox",{model:{value:e.formValidate.eligibility,callback:function(t){e.$set(e.formValidate,"eligibility",t)},expression:"formValidate.eligibility"}},[e._v("完成KYC可参与")])],1),e._v(" "),a("FormItem",{attrs:{label:"拍卖结束前",prop:"canNotCancelTime"}},[a("Input",{staticStyle:{width:"100px","margin-right":"5px"},attrs:{type:"number"},model:{value:e.formValidate.canNotCancelTime,callback:function(t){e.$set(e.formValidate,"canNotCancelTime",t)},expression:"formValidate.canNotCancelTime"}}),e._v("分钟不可撤单\n            ")],1),e._v(" "),a("FormItem",{attrs:{label:"拍卖结束前",prop:"sendEmailTime"}},[a("Input",{staticStyle:{width:"100px","margin-right":"5px"},attrs:{type:"number"},model:{value:e.formValidate.sendEmailTime,callback:function(t){e.$set(e.formValidate,"sendEmailTime",t)},expression:"formValidate.sendEmailTime"}}),e._v("分钟向未成交用户发送短信/邮件提醒\n            ")],1),e._v(" "),a("FormItem",{attrs:{label:"拍卖规则",prop:"auctionRules"}},[a("VueEditor",{staticStyle:{width:"100%",height:"auto"},attrs:{useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.formValidate.auctionRules,callback:function(t){e.$set(e.formValidate,"auctionRules",t)},expression:"formValidate.auctionRules"}})],1),e._v(" "),a("FormItem",{attrs:{label:"取消拍卖规则",prop:"cancelAuctionRules"}},[a("VueEditor",{staticStyle:{width:"100%",height:"auto"},attrs:{useCustomImageHandler:""},on:{"image-added":e.handleImageAdded},model:{value:e.formValidate.cancelAuctionRules,callback:function(t){e.$set(e.formValidate,"cancelAuctionRules",t)},expression:"formValidate.cancelAuctionRules"}})],1)],1)],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"12",offset:"7"}},[a("Button",{staticStyle:{"margin-right":"5px",width:"80px"},attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("保存")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"5px",width:"80px"},attrs:{type:"default"},on:{click:e.cancel}},[e._v("取消")])],1)],1)],1),e._v(" "),a("br"),e._v(" "),a("br")],1)],1)],1)},staticRenderFns:[]};var l=a("C7Lr")(r,n,!1,function(e){a("XVW7")},"data-v-c6d1f95c",null);t.default=l.exports},XVW7:function(e,t){}});
//# sourceMappingURL=16.ba3ab3a12d74bda97549.js.map