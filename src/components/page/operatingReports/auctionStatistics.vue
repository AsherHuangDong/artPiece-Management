<template>
  <div class="content">
    <Row>
      <Col span="20">
        关键字：
        <Input style="width:200px;" placeholder="
请输入UID/手机号/邮箱" v-model="search.keyWords"></Input>
      </Col>
      <Col span="4" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;" @click="getSearch">{{$t('button.search')}}</Button>
        <Button type="primary" @click="exportTable">{{$t('button.export')}}</Button>
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
  name: "auctionStatistics",
  data() {
    return {
      total: 0,
      search: {
        page: 1,
        pageSize: 10,
        keyWords: ""
      },
      data1:[],
      columns: [
        {
          title: "版权代码",
          key: "code",
          align: "center"
        },
        {
          title: "版权名称",
          key: "name",
          align: "center"
        },
        {
          title: "拍卖用时",
          key: "time",
          align: "center",
          render(h, param) {
            return h('span',{},param.row.time+' '+'min');
          },
        },
        {
          title: "卖出总额",
          key: "amount",
          align: "center",
          render(h, param) {
            return h('span',{},param.row.amount+' '+'AP');
          },
        },
        {
          title: "成交人数",
          key: "userNum",
          align: "center"
        },
        {
          title: "平均价格",
          key: "avgPrice",
          align: "center",
          render(h, param) {
            return h('span',{},param.row.avgPrice+' '+'AP');
          },
        },
        {
          title: "最高价格",
          key: "highPrice",
          align: "center",
          render(h, param) {
            return h('span',{},param.row.highPrice+' '+'AP');
          },
        }
      ]
    };
  },
  methods: {
    getAution() {
      let form = new FormData();
      form.append('page',this.search.page)
      form.append('pageSize',this.search.pageSize);
      this.$axios.post('/api/report/auctionStatistics',form).then(res => {
        console.log(res.data.data);
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
      })
    },
    changePage(page) {
      this.search.page = page;
      this.getSearch();
    },
    changePageSize(pageSize) {
      this.search.pageSize = pageSize;
      this.getSearch();
    },
    getSearch(){
      let form = new FormData();
      form.append('page',this.search.page)
      form.append('pageSize',this.search.pageSize);
      if(this.search.keyWords){
        form.append('关键字',this.search.keyWords);
      }
      this.$axios.post('/api/report/auctionStatistics',form).then(res => {
        console.log(res.data.data);
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
      })
    },
    exportTable() {
      let idList = [];
      this.data1.forEach(item => {
        idList.push(item.id);
      });
      location.href = 'http://admin.paimaisuo.talkingcake.cn/api/user/userExportExcel?idList='+idList
    },
  },
  mounted() {
    this.getAution();
  }
};
</script>

<style scoped>
</style>
