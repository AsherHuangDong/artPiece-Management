<template>
  <div class="content">
    <Row>
      <Col style="margin-top:10px;display:flex;flex-wrap:wrap;justify-content:space-between;">
        <div style="margin:0 20px 20px 0;">
          <span style="display: inline-block;margin-left: 10px;">币种：</span>
          <Select style="width: 80px" v-model="obj.currency">
            <Option value="-1">全部</Option>
            <Option :value="item.id" v-for="(item,index) in symbol" :key="index">{{item.coinSymbol}}</Option>
          </Select>
        </div>
        <div style="margin:0 20px 20px 0;">
          <span>关键字：</span>
          <Input style="width:200px;" placeholder="请输入UID/手机号/邮箱" v-model="obj.KeyWords" />
          <Select style="width: 80px" v-model="obj.category">
            <Option value="1">UID</Option>
            <Option value="2">手机号</Option>
            <Option value="3">邮箱</Option>
          </Select>
        </div>
        <div style="margin:0 20px 20px 0;">
          <span style="display: inline-block;margin-left: 10px;">提现状态：</span>
          <Select style="width: 80px" v-model="obj.status">
            <Option value="-1">全部</Option>
            <Option value="0">待审核</Option>
            <Option value="1">已通过</Option>
            <Option value="2">未通过</Option>
            <Option value="3">回款中</Option>
            <Option value="4">已完成</Option>
            <Option value="5">汇款失败</Option>
            <Option value="6">已撤销</Option>
          </Select>
        </div>
        <div style="margin:0 20px 20px 0;">
          <span style="display: inline-block;margin-left: 10px;">提现单号：</span>
          <Input style="width: 200px" placeholder="请输入提现单号" v-model="obj.id"></Input>
        </div>
        <div style="margin:0 20px 20px 0;">
          <span>注册时间：</span>
          <DatePicker type="date" placeholder="Select date" v-model="obj.startTime"></DatePicker>--
          <DatePicker type="date" placeholder="Select date" v-model="obj.endTime"></DatePicker>
        </div>
        <div>
          <span style="display: inline-block;float: right;line-height: 20px;">
            <Button type="primary" @click="getData">{{$t('button.search')}}</Button>
          </span>
          <span style="display: inline-block;float: right;line-height: 20px;margin-right: 10px;">
            <Button type="primary" @click="exportTable">{{$t('button.export')}}</Button>
          </span>
        </div>
      </Col>
    </Row>
    <br />
    <br />
    <Row>
      <Table :columns="columns" border :data="list"></Table>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          show-total
          show-elevator
          show-sizer
          :current="obj.currPage"
          :page-size="obj.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "userStatistics",
  data() {
    let _this = this;
    return {
      symbol: [],
      list: [{ name: "111", age: 13 }],
      total: 0,
      obj: {
        currency: "-1",
        status: "-1",
        category: "2",
        currPage: 1,
        pageSize: 10
      },
      columns: [
        {
          title:
            "数据列表 | 友情提醒：审核时请判断用户账户是否平账、是否存在套利或其他违规操作，SaaS云交易所官方只提供技术层面风险监控，业务层面的风险需交易所运营方自行把控。",
          children: [
            {
              title: "提现单号",
              key: "id",
              align: "center"
            },
            {
              title: "UID",
              key: "uid",
              align: "center"
            },
            {
              title: "登录账号",
              key: "loginAccount",
              align: "center"
            },
            {
              title: "币种",
              key: "symbol",
              align: "center"
            },
            {
              title: "提现时间",
              key: "createdAt",
              align: "center"
            },
            {
              title: "手续费",
              key: "fee",
              align: "center"
            },
            {
              title: "收款银行",
              key: "bankNo",
              align: "center"
            },
            {
              title: "收款账号",
              key: "cardNo",
              align: "center"
            },
            {
              title: "收款姓名",
              key: "name",
              align: "center"
            },
            {
              title: "银行流水单",
              key: "outTransId",
              align: "center"
            },
            {
              title: "操作员",
              key: "operator",
              align: "center"
            },
            {
              title: "提现状态",
              key: "status",
              align: "center",
              render: function(h, params) {
                return h(
                  "span",
                  {},
                  params.row.status == 0
                    ? "未审核"
                    : params.row.status == 1
                    ? "通过"
                    : params.row.status == 2
                    ? "未通过"
                    : params.row.status == 3
                    ? "回款中"
                    : params.row.status == 4
                    ? "已完成"
                    : params.row.status == 5
                    ? "汇款失败"
                    : params.row.status == 6
                    ? "已撤销"
                    : ""
                );
              }
            },
            {
              key: "name",
              align: "center",
              renderHeader: function(h, params) {
                return h("span", {}, _this.$t("public.action"));
              },
              render: function(h, params) {
                if (params.row.status == 0) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#2d8cf0",
                        padding: "0 10px",
                        display: "flex",
                        "justify-content": "space-around"
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          on: {
                            click: () => {
                              _this.$router.push({
                                path: "/withdrawalAuditChangeStatus",
                                query: {
                                  id: params.row.id,
                                  status: 4
                                }
                              });
                            }
                          }
                        },
                        "通过"
                      ),
                      h("span", {}, "|"),
                      h(
                        "span",
                        {
                          on: {
                            click: () => {
                              _this.$router.push({
                                path: "/withdrawalAuditChangeStatus",
                                query: {
                                  id: params.row.id,
                                  status: 2
                                }
                              });
                            }
                          }
                        },
                        "拒绝"
                      )
                    ]
                  );
                }

                if (params.row.status == 3) {
                  return h(
                    "div",
                    {
                      style: {
                        color: "#2d8cf0",
                        padding: "0 10px",
                        display: "flex",
                        "justify-content": "space-around"
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          on: {
                            click: () => {
                              _this.$router.push({
                                path: "/withdrawalAuditChangeStatus",
                                query: {
                                  id: params.row.id,
                                  status: 4
                                }
                              });
                            }
                          }
                        },
                        "完成支付"
                      )
                    ]
                  );
                }
              }
            }
          ]
        }
      ]
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "withdrawalAuditChangeStatus") {
      this.getData();
    }
    next();
  },
  methods: {
    exportTable() {},
    changePage(page) {
      this.obj.currPage = currPage;
      this.getData();
    },
    changePageSize(pageSize) {
      this.obj.pageSize = pageSize;
      this.getData();
    },
    getData() {
      let form = new FormData();
      form.append("currPage", this.obj.currPage);
      form.append("pageSize", this.obj.pageSize);
      if (this.obj.currency != -1) {
        form.append("currency", this.obj.currency);
      }
      if (this.obj.Keywords) {
        form.append("Keywords", this.obj.Keywords);
        form.append("category", this.obj.category);
      }
      if (this.obj.status != -1) {
        form.append("status", this.obj.status);
      }
      if (this.obj.id) {
        form.append("id", this.obj.id);
      }
      if (this.obj.startTime && this.obj.endTime) {
        let startTime = this.$tool.date.format(
          new Date(this.obj.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        let endTime = this.$tool.date.format(
          new Date(this.obj.endTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        form.append("startTime", startTime);
        form.append("endTime", endTime);
      }
      this.$axios
        .post("/api/transactionWithdraw/selectTransactionWithdrawByPage", form)
        .then(res => {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    getcoin() {
      this.$axios
        .get("/api/configCoinSymbol/getConfigCoinSymbolList", {})
        .then(res => {
          this.symbol = res.data.data;
        });
    }
  },
  mounted() {
    this.getData();
    this.getcoin();
  }
};
</script>
<style scoped>
</style>
