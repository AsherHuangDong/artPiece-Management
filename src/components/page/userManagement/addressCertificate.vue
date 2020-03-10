<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row style="margin-top: -10px;">
            <Col :xxl="12" :xl="24" style="margin-top:10px;">
              <span>关键字：</span>
              <Input style="width:200px;" placeholder="请输入UID/手机号/邮箱/姓名" v-model="obj.keyWords" />
              <Select style="width: 80px" v-model="obj.type">
                <Option value="1">UID</Option>
                <Option value="2">手机号</Option>
                <Option value="3">邮箱</Option>
                <Option value="4">姓名</Option>
              </Select>
              <span style="display: inline-block;margin-left: 10px;">认证状态：</span>
              <Select style="width: 80px" v-model="obj.status">
                <Option value="-1">未认证</Option>
                <Option value="0">待审核</Option>
                <Option value="1">已通过</Option>
                <Option value="2">未通过</Option>
              </Select>
            </Col>
            <Col :xxl="12" :xl="24" style="margin-top:10px;">
              <span>注册时间：</span>
              <DatePicker type="date" placeholder="Select date" v-model="obj.startTime" :disabled='obj.status==-1'></DatePicker>--
              <DatePicker type="date" placeholder="Select date" v-model="obj.endTime" :disabled='obj.status==-1'></DatePicker>
              <span style="display: inline-block;float: right;line-height: 20px;">
                <Button type="primary" @click="toSearch">{{$t('button.search')}}</Button>
              </span>
              <span
                style="display: inline-block;float: right;line-height: 20px;margin-right: 10px;"
              >
                <Button type="primary" @click="exportTable">{{$t('button.export')}}</Button>
              </span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;" />
          <span style="font-weight: bold">认证列表</span>
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
  </div>
</template>

<script>
export default {
  name: "addressCertificate",
  data() {
    let self = this;
    return {
      obj: {
        page: 1,
        pageSize: 10,
        kind: 2,
        type: "1",
        status: "0"
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
            return h("span", {}, self.$t("address.phone"));
          },
        },
        {
          key: "email",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, self.$t("address.email"));
          },
        },
        {
          title: "提交审核时间",
          key: "",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, self.$t("address.auditTime"));
          },
          render: function(h, param) {
            if (param.row.userAddressVerify) {
             return h('span',{},self.$tool.date.format(new Date(param.row.userAddressVerify.ctimeLong),"yyyy/MM/dd hh:mm:ss"))
            }
          }
        },
        {
          key: "userAddressVerify.mtime",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, self.$t("address.upDateTime"));
          },
          render: function(h, param) {
            if (param.row.userAddressVerify) {
              return h('span',{},self.$tool.date.format(new Date(param.row.userAddressVerify.ctimeLong),"yyyy/MM/dd hh:mm:ss"))
            }
          }
        },
        {
          key: "nickname",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, self.$t("address.name"));
          },
        },
        {
          key: "address",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, self.$t("address.status"));
          },
          render(h, param) {
            if (param.row.userAddressVerify) {
              return h("span", {}, [
                h(
                  "a",
                  {
                    style: { color: "blue" },
                    on: {
                      click() {
                        self.$router.push({
                          path: "/addressCertificateDetail",
                          query: {
                            id: param.row.userAddressVerify.userId
                          }
                        });
                      }
                    }
                  },
                  param.row.userAddressVerify.verifyStatus == 0
                    ? "待审核"
                    : param.row.userAddressVerify.verifyStatus == 1
                    ? "通过"
                    : param.row.userAddressVerify.verifyStatus == 2
                    ? "未通过"
                    : ""
                )
              ]);
            } else {
              return h("span", {}, [
                h(
                  "a",
                  {
                    on: {
                      click() {
                        // self.$router.push("/addressCertificateDetail")
                      }
                    }
                  },
                  "未认证"
                )
              ]);
            }
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
      ]
    };
  },
  methods: {
    exportTable() {
      let idList = [];
      this.data1.forEach(item => {
        idList.push(item.id);
      });
      location.href = 'http://admin.paimaisuo.talkingcake.cn/api/userAddressVerify/addressExportExcel?idList='+idList+'&&type=2'
    },
    changePage(page) {
      this.obj.page = page;
      this.toSearch();
    },
    changePageSize(pageSize) {
      this.obj.pageSize = pageSize;
      this.toSearch();
    },
    toSearch() {
      let form = new FormData();
      form.append("page", this.obj.page);
      form.append("pageSize", this.obj.pageSize);
      form.append("kind", this.obj.kind);
      if (this.obj.keyWords) {
        form.append("keyWords", this.obj.keyWords);
        form.append("type", this.obj.type);
      }
      form.append("status", this.obj.status);
      if (this.obj.startTime && this.obj.endTime &&this.obj.status!=-1) {
        form.append("startTime", this.obj.startTime.valueOf());
        form.append("endTime", this.obj.endTime.valueOf());
      }
      this.getData(form);
    },
    getData(form) {
      this.$axios.post("/api/user/getExamInfoByLimits", form).then(res => {
        this.data1 = res.data.data.records;
        this.total = res.data.data.total;
      });
    }
  },
  mounted() {
    this.toSearch();
  }
};
</script>

<style scoped>
</style>
