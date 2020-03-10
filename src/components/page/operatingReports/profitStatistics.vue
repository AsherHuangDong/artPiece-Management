<template>
  <div class="content">
    <Row>
      <Col span="14">
        <span>版权代码：</span>
        <Select style="width: 150px;margin-right:10px;">
          <Option value="-1">全部</Option>
          <Option
            :value="item.id"
            v-for="(item,index) in symbol"
            :key="index"
          >{{item.copyrightCode}}</Option>
        </Select>
        <span>时间：</span>
        <DatePicker type="datetime" placeholder="Select date and time"></DatePicker>&nbsp;&nbsp;--&nbsp;&nbsp;
        <DatePicker type="datetime" placeholder="Select date and time"></DatePicker>
      </Col>
      <Col span="6">
        <span>关键字：</span>
        <Input style="width:200px;" placeholder="用户UID"></Input>
      </Col>
      <Col span="4" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;">{{$t('button.search')}}</Button>
      </Col>
    </Row>
    <br />

    <Row>
      <Col style="width:100%;">
        <Table :columns="columns" border></Table>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page :total="40" show-elevator show-sizer />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "profitStatistics",
  data() {
    return {
      symbol: [],
      columns: [
        {
          title: "用户UID",
          key: "name",
          align: "center"
        },
        {
          title: "成交时间",
          key: "name",
          align: "center"
        },
        {
          title: "版权代码",
          key: "name",
          align: "center"
        },
        {
          title: "卖出数量",
          key: "name",
          align: "center"
        },
        {
          title: "平均买入价格",
          key: "name",
          align: "center"
        },
        {
          title: "成交价格",
          key: "name",
          align: "center"
        },
        {
          title: "成交金额",
          key: "name",
          align: "center"
        },
        {
          title: "手续费",
          key: "name",
          align: "center"
        },
        {
          title: "利润",
          key: "name",
          align: "center"
        }
      ]
    };
  },
  methods: {
    getCopyright() {
      this.$axios.get("/api/copyright/getAllCopyright", {}).then(res => {
        this.symbol = res.data.data;
      });
    }
  },
  mounted() {
    this.getCopyright();
  }
};
</script>

<style scoped>
</style>

