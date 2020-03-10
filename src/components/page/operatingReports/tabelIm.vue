<template>
  <div style="background:#fff;padding:0px;margin:0px">
    <Row>
        <Col span="14">
           <Table :columns="columns" :data="data1" style="background:#fff"></Table>
        </Col>
    </Row>
  </div>
</template>
<script>
import { Form } from 'iview';
export default {
  name: "tableIm",
  props: ["row"],
  data() {
    return {
      columns: [
        {
          title: "bue_uid",
          key: "userId",
          align: "center"
        },
        {
          title: "sell_uid",
          key: "type",
          align: "center"
        },
        {
          title: "成交时间",
          key: "status",
          align: "center"
        },
        {
          title: "成交数量",
          key: "ctime",
          align: "center"
        },
        {
          title: "成交价格",
          key: "volume",
          align: "center"
        },
        {
          title: "成交金额",
          key: "price",
          align: "center"
        },
        {
          title: "手续费",
          key: "dealVolume",
          align: "center"
        }
      ],
      data1: []
    };
  },
  methods: {
    getOrder() {
        let form = new FormData();
        form.append("orderId",this.row.id);
        form.append("orderTable",this.row.tableName)
        this.$axios.post('/api/report/tradeStatistics',form).then(res=>{
            console.log(res.data.data)
            this.data1 = res.data.data
        })
    }
  },
  mounted() {
    console.log(this.row)
    this.getOrder()
  }
};
</script>
<style>
</style>