<template>
  <div class="content">
    <Row>
      <Col span="20">
        <span>币种：</span>
        <Select style="width: 150px;margin-right:10px;" v-model="search.type">
          <Option value="-1">全部</Option>
          <Option :value="item.id" v-for="(item,index) in symbol" :key="index">{{item.coinSymbol}}</Option>
        </Select>
        <span>时间：</span>
        <DatePicker
          v-model="search.from"
          type="date"
          placeholder="Select date"
          style="width: 180px"
        ></DatePicker>&nbsp;&nbsp;--&nbsp;&nbsp;
        <DatePicker
          v-model="search.to"
          type="date"
          placeholder="Select date"
          style="width: 180px"
        ></DatePicker>
      </Col>
      <Col span="4" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;" @click="getSearch">{{$t('button.search')}}</Button>
        <Button type="primary">{{$t('button.export')}}</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col style="width:100%;">
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
//import { Form } from '_iview@3.5.1@iview/types';
export default {
  name: "userStatistics",
  data() {
    let _this = this;
    return {
      symbol: [],
      data1: [],
      total: 0,
      search: {
        type: -1,
        from: "",
        to: "",
        page: 1,
        pageSize: 10
      },
      collect: {
        creatTime: "",
        withdrawSum: 0,
        arriveSum: 0,
        withdrawNum: 0,
        successNum: 0,
        withdrawUsers: 0
      },
      columns: [
        {
          align: "center",
          renderHeader(h, param) {
            let time1 = "";
            let t1 = _this.collect.creatTime;
            time1 = "汇总：数据跟新时间：";
            return h("span", {}, time1+t1);
          },
          children: [
            {
              title: "日期",
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
            return h("span", {}, _this.collect.withdrawSum);
          },
          children: [
            {
              title: "提现金额(KRW)",
              key: "withdrawMoney",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h("span", {}, _this.collect.arriveSum);
          },
          children: [
            {
              title: "到账金额(KRW)",
              key: "arrivalMoney",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h("span", {}, _this.collect.withdrawNum);
          },
          children: [
            {
              title: "提现笔数",
              key: "withdrawNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h("span", {}, _this.collect.successNum);
          },
          children: [
            {
              title: "成功笔数",
              key: "successNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h("span", {}, _this.collect.withdrawUsers);
          },
          children: [
            {
              title: "提现用户数",
              key: "withdrawUserNum",
              align: "center"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getcoin() {
      this.$axios
        .get("/api/configCoinSymbol/getConfigCoinSymbolList", {})
        .then(res => {
          this.symbol = res.data.data;
        });
    },
    getWithdraw() {
      let _this = this;
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      this.$axios.post("/api/report/withdrawStatistics", form).then(res => {
        let data = res.data.data.records;
        this.data1 = res.data.data.records;
        this.total = res.data.data.total;
        console.log(res.data);
        data.forEach(item => {
          _this.collect.withdrawSum += item.withdrawMoney;
          _this.collect.arriveSum += item.arrivalMoney;
          _this.collect.withdrawNum += item.withdrawNum;
          _this.collect.successNum += item.successNum;
          _this.collect.withdrawUsers += item.withdrawUserNum;
        });
         if(res.data.data.records.length != 0){
          _this.collect.creatTime = res.data.data.records[0].timeStr;
        }
      });
    },
    getSearch() {
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      if (this.search.type) {
        form.append("type", this.search.type);
      }
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
      this.$axios.post("/api/report/withdrawStatistics", form).then(res => {
        let data = res.data.data.records;
        this.data1 = res.data.data.records;
        this.total = res.data.data.total;
      })
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
    this.getcoin();
    this.getWithdraw();
  }
};
</script>

<style scoped>
</style>
