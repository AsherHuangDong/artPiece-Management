<template>
  <div class="content">
    <Row>
      <Col span="24">
        <span>分红月份：</span>
        <DatePicker
          type="month"
          format="yyyy-MM"
          placeholder="Select month"
          style="width: 180px"
          v-model="month"
        ></DatePicker>
      </Col>
    </Row>
    <br />
    <Row>
      <Col style="width:100%;">
        <Table :columns="columns" border :data="symbol"></Table>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24" offset="10">
        <Button type="primary" style="width:80px;" @click="submit">{{$t('button.save')}}</Button>
        <Button
          @click="cancel"
          style="margin-left: 5px;width:80px;"
          type="default"
        >{{$t('button.cancel')}}</Button>
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
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "participationInProfitEdit",
  data() {
    let _this = this;
    return {
      symbol: [],
      total: 0,
      page: 1,
      pageSize: 10,
      month: new Date(),
      columns: [
        {
          title: "版权代码",
          key: "copyrightCode",
          align: "center"
        },
        {
          title: "版权名称",
          key: "copyrightName",
          align: "center"
        },
        {
          title: "分红总额",
          key: "troops",
          align: "center"
        },
        {
          title: "操作",
          key: "copyrightCode",
          align: "center",
          render(h, param) {
            return h("span", {}, [
              h(
                "a",
                {
                  style: { color: "blue" },
                  on: {
                    click() {
                      _this.$router.push({
                        name: "participationInProfitEditEdit",
                        params:{
                          id: param.row._index,
                          copyrightCode: param.row.copyrightCode,
                          self:_this
                        }
                      });
                    }
                  }
                },
                "编辑分红总额"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
     getEdit(self){
      console.log('sssssssssss'+self.data1)
      this.symbol  = JSON.parse(JSON.stringify(this.symbol))
      this.symbol[self.id].troops = self.data1
      console.log(this.symbol)
    },
    getCopyright() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      let date = new Date(this.month);
      let month = date.getFullYear() + "-" +(Number(date.getMonth()) + 1).toString();
      form.append("yearMonth", month);
      this.$axios.post("/api/copyrightProfit/getCanEditProfitCopyright",form).then(res=>{
        this.symbol = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    submit() {
      let _this = this;
      //let month = _this.month.getFullYear()+'-'+(Number(_this.month.getMonth()+1)).toString();
      let list = [];
      _this.symbol.forEach(item=>{
        list.push({
          copyrightCode:item.copyrightCode,
          copyrightId:item.copyrightId,
          id:item.id,
          troops:parseInt(item.troops)
        })
      })
      console.log(list)
      list = JSON.stringify(list);
      console.log(list)
      console.log(typeof(list));
      _this.$axios.post("/api/copyrightProfit/updateCopyrightProfit",list).then(res=>{
        console.log('/api/copyrightProfit/updateCopyrightProfit'+res.data);
        _this.$router.go(-1);
      })
    },
    cancel() {
      this.$router.go(-1);
    },
    changePage(page) {
      this.participation.page = page;
      this.getCopyright();
    },
    changePageSize(pageSize) {
      this.participation.pageSize = pageSize;
      this.getCopyright();
    }
  },
  mounted() {
    this.getCopyright();
  }
};
</script>

<style scoped>
</style>
