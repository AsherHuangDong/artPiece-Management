<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row>
            <Col span="20">
              <span>关键字：</span>
              <Input v-model="selectCopyrightAuctionByPageParams.Keyword" style="width:200px;margin-right: 10px;" placeholder="请输入版权关键字" />
              <span>拍卖状态：</span>
              <Select v-model="selectCopyrightAuctionByPageParams.status" style="width: 100px;margin-right: 10px;">
                <Option value="All">All</Option>
                <Option value="Live">Live</Option>
                <Option value="Upcoming">Upcoming</Option>
                <Option value="Closed">Closed</Option>
              </Select>
              <Button @click="selectCopyrightAuctionByPage" type="primary">搜索</Button>
            </Col>
            <Col span="4" style="text-align: right;">
              <Button @click="addAuction" type="primary">添加拍卖</Button>
            </Col>
          </Row>
          <br>
          <span style="font-weight: bold;">版权列表</span>
          <Row>
            <Table border :columns="columns2" :data="data1"></Table>
          </Row>
          <br>
          <Row>
            <Col span="24" style="text-align: center">
              <Page @on-change="change($event)" @on-page-size-change="sizeChange($event)" :total="selectCopyrightAuctionByPageParams.Total" show-total show-sizer show-elevator />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "auctionManagement",
    data() {
      let self = this;
      return {
        columns2: [
          {
            title: '版权代码',
            key: 'copyrightCode',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '版权名称',
            key: 'copyrightName',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '开始拍卖时间',
            minWidth: 110,
            align: 'center',
            render(h, param){
              let result = '';
              result += param.row.startTime[0] + '-';
              result += param.row.startTime[1] + '-';
              result += param.row.startTime[2] + '  ';
              result += param.row.startTime[3] + ':';
              if (param.row.startTime[5]){
              result += param.row.startTime[4] + ':';
              result += param.row.startTime[5] + '';
              } else {
                result += param.row.startTime[4];
              }
              return h('span', {}, result);
            }
          },
          {
            title: '结束拍卖时间',
            key: 'address',
            minWidth: 110,
            align: 'center',
            render(h, param){
              let result = '';
              result += param.row.endTime[0] + '-';
              result += param.row.endTime[1] + '-';
              result += param.row.endTime[2] + '  ';
              result += param.row.endTime[3] + ':';
              if (param.row.endTime[5]){
                result += param.row.endTime[4] + ':';
                result += param.row.endTime[5] + '';
              } else {
                result += param.row.endTime[4]
              }

              return h('span', {}, result);
            }
          },
          {
            title: '拍卖总数',
            key: 'issuanceTotalAmount',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '起拍价格',
            key: 'startingPrice',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '手续费',
            key: 'handlingFee',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '免费次数',
            key: 'freeHandlingFee',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '拍卖状态',
            key: 'auctionStatus',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '操作',
            key: 'address',
            minWidth: 180,
            align: 'center',
            render(h, param){
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.$router.push({name:"auctionManagementDetail", params:{row: param.row}})
                    }
                  }
                }, '查看 | '),
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      console.log("拍卖统计");
                    }
                  }
                }, '拍卖统计'),
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.$router.push({name:"auctionManagementEdit", params:{row: param.row}})
                    }
                  }
                }, ' | 编辑')
              ])
            }
          }
        ],
        data1: [],
        selectCopyrightAuctionByPageParams: {
          currPage: 1,
          pageSize: 10,
          Keyword: '',
          status: '',
          Total: 0
        }
      }
    },
    methods: {
      change(e){
        this.selectCopyrightAuctionByPageParams.currPage = e;
        this.selectCopyrightAuctionByPage();
      },
      sizeChange(e){
        this.selectCopyrightAuctionByPageParams.currPage = 1;
        this.selectCopyrightAuctionByPageParams.pageSize = e;
        this.selectCopyrightAuctionByPage();
      },
      addAuction() {
        this.$router.push('/auctionManagementAdd')
      },
      selectCopyrightAuctionByPage() {
        console.log(this.selectCopyrightAuctionByPageParams);
        let form = new FormData();
        form.append("currPage", this.selectCopyrightAuctionByPageParams.currPage);
        form.append("pageSize", this.selectCopyrightAuctionByPageParams.pageSize);
        if (this.selectCopyrightAuctionByPageParams.Keyword !== ''){
          form.append("Keyword", this.selectCopyrightAuctionByPageParams.Keyword);
        }
        if (this.selectCopyrightAuctionByPageParams.status !== ''){
          form.append("status", this.selectCopyrightAuctionByPageParams.status);
        }
        this.$axios.post("/api/copyrightAuction/selectCopyrightAuctionBypage", form)
          .then(res => {
            console.log("/api/copyrightAuction/selectCopyrightAuctionBypage", res.data);
            this.data1 = res.data.data.list;
            this.selectCopyrightAuctionByPageParams.currPage = res.data.data.Current;
            this.selectCopyrightAuctionByPageParams.pageSize = res.data.data.Size;
            this.selectCopyrightAuctionByPageParams.Total = res.data.data.Total;
          })
      }
    },
    mounted() {
      this.selectCopyrightAuctionByPage();
    }
  }
</script>

<style scoped>

</style>
