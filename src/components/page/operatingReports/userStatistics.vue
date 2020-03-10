<template>
  <div class="content">
    <Row>
      <Col span="20">
        登陆时间：
        <DatePicker
          type="date"
          v-model="search.from"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>&nbsp;&nbsp;--&nbsp;&nbsp;
        <DatePicker
          type="date"
          v-model="search.to"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
      </Col>
      <Col span="4" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;" @click="getSearch">{{$t('button.search')}}</Button>
        <Button type="primary">{{$t('button.export')}}</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <Table :columns="columns" :data="data1" border></Table>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          show-total
          show-sizer
          show-elevator
          :current="search.page"
          :page-size="search.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "userStatistics",
  data() {
    let _this = this;
    return {
      symbol: [],
      data1: [],
      total: 0,
      collect: {
        creatTime:'',
        registerTotal:0,
        loginTotal:0,
        dealTotal:0,
        rechargeTotal:0,
        withdrawTotal:0,
      },
      search: {
        from: "",
        to: "",
        page: 1,
        pageSize: 10
      },
      columns: [
        {
          align: "center",
          renderHeader(h, param) {
            let time1 = "";
            let t1 = _this.collect.creatTime;
            time1 = "汇总：数据跟新时间：" + t1;
            return h("span", {}, time1);
          },
          children: [
            {
              title: "时间",
              key: "time",
              width: 400,
              align: "center",
              render(h, param) {
                let time1 = "";
                time1 =
                  param.row.time[0] +
                  "-" +
                  (param.row.time[1] < 10
                    ? "0" + param.row.time[1]
                    : param.row.time[1]) +
                  "-" +
                  (param.row.time[2] < 10
                    ? "0" + param.row.time[2]
                    : param.row.time[2]);
                return h("span", {}, time1);
              }
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.registerTotal)
          },
          children: [
            {
              title: "注册人数",
              key: "registerNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.loginTotal)
          },
          children: [
            {
              title: "登陆人数",
              key: "loginNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.dealTotal)
          },
          children: [
            {
              title: "参与交易人数",
              key: "transactionNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.rechargeTotal)
          },
          children: [
            {
              title: "完成充值人数",
              key: "depositNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.withdrawTotal)
          },
          children: [
            {
              title: "提现人数",
              key: "withdrawNum",
              align: "center"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getUser() {
      let _this = this
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      this.$axios.post("/api/report/userStatistics", form).then(res => {
        console.log(res.data.data);
        let data = res.data.data.records;
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
        data.forEach(item => {
          _this.collect.registerTotal += item.registerNum;
          _this.collect.loginTotal += item.loginNum;
          _this.collect.dealTotal += item.transactionNum;
          _this.collect.rechargeTotal += item.depositNum;
          _this.collect.withdrawTotal += item.withdrawNum;
        });
        if(res.data.data.records.length != 0){
          _this.collect.creatTime = res.data.data.records[0].timeStr;
        }
      });
    },
    getSearch() {
      let _this = this
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      if (this.search.from && this.search.to) {
        let t1 = new Date(this.search.from);
        let t2 = new Date(this.search.to);

        let y1 = t1.getFullYear().toString();
        let m1 = ((t1.getMonth()+1)<10?'0'+(t1.getMonth()+1):(t1.getMonth()+1)).toString();
        let d1 = (t1.getDate()+1)<10?'0'+t1.getDate():t1.getDate().toString();

        let y2 = t2.getFullYear().toString();
        let m2 = ((t2.getMonth()+1)<10?'0'+(t2.getMonth()+1):(t2.getMonth()+1)).toString();
        let d2 = (t2.getDate()<10?'0'+t2.getDate():t2.getDate()).toString();
        
        let time1 = y1+m1+d1;
        let time2 = y2+m2+d2;
        form.append("from", time1);
        form.append("to", time2);
      }
      this.$axios.post("/api/report/userStatistics", form).then(res => {
        console.log(res.data.data);
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
        if(res.data.data.records.length != 0){
          _this.collect.creatTime = res.data.data.records[0].timeStr;
        }
      });
    },
    changePage(page) {
      this.search.page = page;
      this.getSearch();
    },
    changePageSize(pageSize) {
      this.search.pageSize = pageSize;
      this.getSearch();
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style scoped>
</style>
