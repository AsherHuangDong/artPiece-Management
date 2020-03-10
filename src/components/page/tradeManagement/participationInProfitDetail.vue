
<template>
  <div class="content">
    <Row>
      <Col span="24">
        <Button type="primary" @click="back" style="float: left;">{{$t('button.back')}}</Button>
        <Button type="primary" @click="derive" style="float: right;">{{$t('button.export')}}</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col style="width:100%">
        <div style="height:40px;background:#f8f8f9;border:1px solid #e8eaec">
          <tr style="font-size:14px;position:absolute;top:10px">
            <th style="padding-right:100px">版权代码：{{data1.copyrightCode}}</th> 
            <th style="padding-right:100px">分红月份：{{data1.yearAndMonth}}</th>
            <th>分红用户总数：{{data1.userNumber}}</th>
          </tr>
        </div>
      </Col>
      <Col style="width:100%;">
        <Table :columns="columns" border :data="symbol"></Table>
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
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "participationInProfitDetail",
  data() {
    return {
      id: "",
      page: 1,
      pageSize: 10,
      symbol: [],
      total: 0,
      data1: {},
      columns: [
        {
          title: "UID",
          key: "userId",
          align: "center"
        },
        {
          title: "快照总数",
          key: "totalNum",
          align: "center"
        },
        {
          title: "应得分红(AP)",
          key: "profit",
          align: "center"
        }
      ]
    };
  },
  methods: {
    derive() {},
    back() {
      this.$router.go(-1);
    },
    getDetail() {
      let form = new FormData();
      form.append("id", this.id);
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.$axios
        .post("/api/copyrightProfit/getProfitDetail", form)
        .then(res => {
          console.log(res);
          this.symbol = res.data.data.content;
          this.total = res.data.data.totalElements;
        });
    },
    getTotal() {
      let form = new FormData();
      form.append("id", this.id);
      this.$axios.post("/api/copyrightProfit/getProfitInfo", form).then(res => {
        console.log(res.data.data);
        this.data1 = res.data.data;
        console.log(this.data1);
      });
    },
    changePage(page) {
      this.search.page = page;
      this.getDetail();
    },
    changePageSize(pageSize) {
      this.search.pageSize = pageSize;
      this.getDetail();
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getDetail();
    this.getTotal();
  }
};
</script>

<style scoped>
</style>
