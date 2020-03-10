<template>
  <div>
    <Row>
      <Col span="24">
        <span style="font-weight: bold">当前总注册用户：{{total}}人</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row>
            <Col span="9">
              <span>关键字：</span>
              <Input
                v-model="usersParams.keyWords"
                style="width:150px;"
                placeholder="请输入UID/手机号/邮箱/姓名"
              />
              <Select v-model="usersParams.type" style="width: 80px">
                <Option value="1">UID</Option>
                <Option value="2">手机号</Option>
                <Option value="3">邮箱</Option>
                <Option value="4">姓名</Option>
                <Option value="5">标签</Option>
              </Select>
            </Col>
            <Col span="15">
              <span>注册时间：</span>
              <DatePicker v-model="usersParams.startTime" type="date" placeholder="Select date"></DatePicker>--
              <DatePicker v-model="usersParams.endTime" type="date" placeholder="Select date"></DatePicker>
              <span style="display: inline-block;float: right;line-height: 20px;">
                <Button @click="users" type="primary">{{$t('button.search')}}</Button>
              </span>
              <span
                style="display: inline-block;float: right;line-height: 20px;margin-right: 10px;"
              >
                <Button type="primary" @click="exportTable">{{$t('button.export')}}</Button>
              </span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;" />
          <span style="font-weight: bold">用户列表</span>
          <Row>
            <Table border :columns="columns1" :data="data1"></Table>
          </Row>
          <br />
          <Row>
            <Col span="24" style="text-align: center">
              <Page
                :total="total"
                show-total
                show-sizer
                show-elevator
                @on-change="changePage"
                @on-page-size-change="changePageSize"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "userQuery",
  data() {
    let _this = this;
    return {
      usersParams: {
        type: "1",
        keyWords: "",
        selectItem: 2,
        endTime: "",
        startTime: "",
        page: 1,
        pageSize: 10
      },
      total: 0,
      columns1: [
        {
          title: "UID",
          key: "id",
          align: "center"
        },
        {
          key: "mobileNumber",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.phone"));
          }
        },
        {
          key: "email",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.email"));
          }
        },
        {
          key: "countryCode",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.country"));
          }
        },
        {
          key: "nickname",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.nickname"));
          }
        },
        {
          key: "userLevel",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.level"));
          }
        },
        {
          key: "ctimeLong",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.time"));
          },
          render: function(h, param) {
            return h(
              "span",
              {},
              _this.$tool.date.format(
                new Date(param.row.ctimeLong),
                "yyyy/MM/dd hh:mm:ss"
              )
            );
          }
        },
        {
          key: "ip",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.ip"));
          }
        },
        {
          key: "ip",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, '标签')
          }
        },
        {
          key: "ip",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, '修改标签')
          }
        },
        {
          key: "address",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("userSearch.status"));
          },
          render(h, param) {
            let status
            if (param.row.loginStatus == 0){
              status = h("span", {style: { color: "green", marginLeft: "10px" }},
                _this.$t("button.normal")
              )
            } else {
              status = h("span", {style: { color: "red", marginLeft: "10px" }},
                _this.$t("button.frozen")
              )
            }
            return h("span", {}, [status,
              h(
                "a",
                {
                  style: { color: "blue", marginLeft: "10px" },
                  on: {
                    click: function() {
                      _this.$router.push({
                        path: "/userFreeze",
                        query: {
                          status: param.row.loginStatus,
                          id: param.row.id
                        }
                      });
                    }
                  }
                },
                param.row.loginStatus == 0
                  ? _this.$t("button.freeze")
                  : param.row.loginStatus == 1
                  ? _this.$t("button.unfreeze")
                  : ""
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "userFreeze") {
      this.users();
    }
    next();
  },
  methods: {
    exportTable() {
      let idList = [];
      this.data1.forEach(item => {
        idList.push(item.id);
      });
      location.href = 'http://admin.paimaisuo.talkingcake.cn/api/user/userExportExcel?idList='+idList
    },
    changePage(page) {
      this.usersParams.page = page;
      this.users();
    },
    changePageSize(pageSize) {
      this.usersParams.pageSize = pageSize;
      this.users();
    },
    // users() {
    //   let url = "/api/user/users?pageSize="+this.usersParams.pageSize+"&pageNum="+this.usersParams.pageNum;
    //   let userRegisterTimeEnd = Date.parse(this.usersParams.userRegisterTimeEnd);
    //   let userRegisterTimeStart = Date.parse(this.usersParams.userRegisterTimeStart);
    //   // console.log(this.usersParams);
    //   // console.log(userRegisterTimeEnd, userRegisterTimeStart);
    //   if (!isNaN(userRegisterTimeEnd)){
    //     url += "&userRegisterTimeEnd="+userRegisterTimeEnd
    //   }
    //   if (!isNaN(userRegisterTimeStart)){
    //     url += "&userRegisterTimeStart="+userRegisterTimeStart
    //   }
    //   if (this.usersParams.userMobile !== ''){
    //     url += "&userMobile="+this.usersParams.userMobile
    //   }
    //   this.$axios.get(url)
    //     .then(res => {
    //       console.log(res.data);
    //       this.data1 = res.data.data;
    //     })
    // }
    users() {
      let form = new FormData();
      form.append("page", this.usersParams.page);
      form.append("pageSize", this.usersParams.pageSize);
      if (this.usersParams.keyWords) {
        form.append("keyWords", this.usersParams.keyWords);
        form.append("type", this.usersParams.type);
      }
      if (this.usersParams.startTime && this.usersParams.endTime) {
        form.append("startTime", this.usersParams.startTime.valueOf());
        form.append("endTime", this.usersParams.endTime.valueOf());
      }
      this.$axios.post("/api/user/showUsersByLimits", form).then(res => {
        this.data1 = res.data.data.records;
        this.total = res.data.data.total;
        console.log(res.data);
      });
    }
  },
  mounted() {
    this.users();
  }
};
</script>

<style scoped>
</style>
