<template>
  <div class="content">
    <Row>
      <Col span="10">
        <span>版权代码：</span>
        <Select style="width: 100px;margin-right:10px;" v-model="search.copyrightCode">
          <Option value="-1">全部</Option>
          <Option
            :value="item.copyrightCode"
            v-for="(item,index) in symbol"
            :key="index"
          >{{item.copyrightCode}}</Option>
        </Select>
        <span>时间：</span>
        <DatePicker type="date" v-model="search.from" placeholder="Select date" style="width:100px"></DatePicker>&nbsp;&nbsp;--&nbsp;&nbsp;
        <DatePicker type="date" v-model="search.to" placeholder="Select date" style="width:100px"></DatePicker>
      </Col>
      <Col span="3">
        用户：
        <Input style="width: 90px" placeholder="用户UID" v-model="search.userId"></Input>
      </Col>
      <Col span="4">
        <span>委托类型：</span>
        <Select style="width: 90px" v-model="search.entrustType">
          <Option value="-1">全部</Option>
          <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <span>订单状态：</span>
        <Select style="width: 90px" v-model="search.entrustStatus">
          <Option value="-1">全部</Option>
          <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="3" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;" @click="getSearch">{{$t('button.search')}}</Button>
      </Col>
    </Row>
    <br />

    <Row>
      <Col style="width:100%;">
        <Table :columns="columns" :data="entrust" border></Table>
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
import tableIm from "./tabelIm";
export default {
  name: "orderInquiry",
  components: { tableIm },
  data() {
    return {
      symbol: [],
      entrust: [],
      data1: [],
      total: 0,
      search: {
        from: "",
        to: "",
        page: 1,
        pageSize: 10,
        copyrightCode: "",
        entrustStatus: "",
        entrustType: "",
        userId: ""
      },
      cityList3: [
        {
          value: 1,
          label: "买入"
        },
        {
          value: 2,
          label: "卖出"
        }
      ],
      cityList4: [
        {
          value: 1,
          label: "未成交"
        },
        {
          value: 2,
          label: "部分成交"
        },
        {
          value: 3,
          label: "完成成交"
        },
        {
          value: 4,
          label: "已撤单"
        },
        {
          value: 5,
          label: "异常订单"
        }
      ],
      columns: [
        {
          title: "用户UID",
          key: "userId",
          align: "center"
        },
        {
          title: "委托类型",
          key: "type",
          align: "center",
          render(h, param){
            if(param.row.type == 1){
              return h('span',{},'买入')
            }
            if(param.row.type == 2){
              return h('span',{},'卖出')
            }
          }
        },
        {
          title: "订单状态",
          key: "status",
          align: "center",
          render(h, param){
            if(param.row.status == 1){
              return h('span',{},'未成交')
            }
            if(param.row.status == 2){
              return h('span',{},'部分成交')
            }
            if(param.row.status == 3){
              return h('span',{},'完成成交')
            }
            if(param.row.status == 4){
              return h('span',{},'已撤单')
            }
            if(param.row.status == 5){
              return h('span',{},'异常订单')
            }
          }
        },
        {
          title: "委托时间",
          key: "ctime",
          align: "center"
        },
        {
          title: "委托数量",
          key: "volume",
          align: "center"
        },
        {
          title: "委托价格",
          key: "price",
          align: "center"
        },
        {
          title: "成交数量",
          key: "dealVolume",
          align: "center"
        },
        {
          title: "委托金额",
          key: "total",
          align: "center"
        },
        {
          title: "成交均价",
          key: "avgPrice",
          align: "center"
        },
        {
          title: "成交金额",
          key: "dealMoney",
          align: "center"
        },
        {
          title: "展开",
          type: "expand",
          align: "center",
          render(h, param) {
            return h(tableIm, {
              props: {
                row: param.row
              } 
            });
          }
        }
      ]
    };
  },
  methods: {
    getCopyright() {
      this.$axios.get("/api/copyright/getAllCopyright", {}).then(res => {
        this.symbol = res.data.data;
      });
    },
    getOrder() {
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      this.$axios.post("/api/report/orderStatistics", form).then(res => {
        console.log(res.data);
        this.total = res.data.data.totalElements;
        this.entrust = res.data.data.content;
      });
    },
    getSearch() {
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      if (this.search.userId) {
        form.append("userId", this.search.userId);
      }
      if (this.search.copyrightCode) {
        form.append("copyrightCode", this.search.copyrightCode);
      }
      if (this.search.entrustStatus) {
        if(this.search.entrustStatus == '-1'){
          form.append("orderStatus", '');
        }else{
          form.append("orderStatus", this.search.entrustStatus);
        }
      }
      if (this.search.entrustType) {
        if(this.search.entrustType == '-1'){
          form.append("orderType", '');
        }else{
          form.append("orderType", this.search.entrustType);
        }
      }
      if (this.search.from && this.search.to) {
        let t1 = new Date(this.search.from);
        let t2 = new Date(this.search.to);

        let y1 = t1.getFullYear().toString();
        let m1 = (t1.getMonth() + 1 < 10
          ? "0" + (t1.getMonth() + 1)
          : t1.getMonth() + 1
        ).toString();
        let d1 =
          t1.getDate() + 1 < 10 ? "0" + t1.getDate() : t1.getDate().toString();

        let y2 = t2.getFullYear().toString();
        let m2 = (t2.getMonth() + 1 < 10
          ? "0" + (t2.getMonth() + 1)
          : t2.getMonth() + 1
        ).toString();
        let d2 = (t2.getDate() < 10
          ? "0" + t2.getDate()
          : t2.getDate()
        ).toString();

        let time1 = y1 + m1 + d1;
        let time2 = y2 + m2 + d2;
        form.append("from", time1);
        form.append("to", time2);
      }
      this.$axios.post("/api/report/orderStatistics", form).then(res => {
        console.log(res.data);
        this.total = res.data.data.totalElements;
        this.entrust = res.data.data.content;
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
    this.getCopyright();
    this.getOrder();
  }
};
</script>

<style scoped>
</style>


    