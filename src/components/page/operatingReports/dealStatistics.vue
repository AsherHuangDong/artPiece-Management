<template>
  <div class="content">
    <Row>
      <Col span="20">
        <span>版权：</span>
        <Select style="width: 150px;margin-right:10px;" v-model="search.type">
          <Option value="-1">全部</Option>
          <Option :value="item.id" v-for="(item,index) in copyright" :key="index">{{item.copyrightCode}}</Option>
        </Select>
        <span>时间：</span>
        <DatePicker type="date" v-model="search.from" placeholder="Select date" style="width: 180px"></DatePicker>&nbsp;&nbsp;--&nbsp;&nbsp;
        <DatePicker type="date" v-model="search.to" placeholder="Select date" style="width: 180px"></DatePicker>
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
import { changeLanguage } from "@/locale";
export default {
  name: "userStatistics",
  data() {
    let _this = this
    return {
      copyright:[],
      symbol: [],
      data1: [],
      total:0,
      search: {
        type:-1,
        from: "",
        to: "",
        page:1,
        pageSize:10
      },
      collect:{
        creatTime: '',
        dealTotal: 0,
        dealNum: 0,
        dealUser: 0,
      },
      columns: [
        {
          align: "center",
          renderHeader(h, param) {
            let time1 = "";
            let t1 = _this.collect.creatTime;
            time1 = "汇总：数据跟新时间：" 
            return h("span", {}, time1+' '+t1);
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
            return h('span',{},_this.collect.dealTotal)
          },
          children: [
            {
              title: "总交易额(AP)",
              key: "transactionAmount",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.dealNum)
          },
          children: [
            {
              title: "交易总笔数",
              key: "transactionNum",
              align: "center"
            }
          ]
        },
        {
          align: "center",
          renderHeader(h, param) {
            return h('span',{},_this.collect.dealUser)
          },
          children: [
            {
              title: "交易用户数",
              key: "transactionUserNum",
              align: "center"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getCopyright() {
      this.$axios
        .get("/api/copyright/getAllCopyright", {})
        .then(res => {
          this.copyright = res.data.data;
        });
    },
    getDeal() {
      let _this = this
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      this.$axios.post("/api/report/transactionStatistics", form).then(res => {
        console.log(res.data.data);
        let data = res.data.data.records;
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
        data.forEach(item => {
          _this.collect.dealTotal += item.transactionAmount;
          _this.collect.dealNum += item.transactionNum;
          _this.collect.dealUser += item.transactionUserNum;
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
      this.$axios.post("/api/report/transactionStatistics", form).then(res => {
        console.log(res.data.data);
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
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
    changeLanguage(localStorage.getItem("lan"));
    this.getCopyright();
    this.getDeal();
  }
};
</script>

<style scoped>
</style>
