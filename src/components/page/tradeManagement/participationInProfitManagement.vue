<template>
  <div class="content">
    <Row>
      <Col span="24">
        <span>分红月份：</span>
        <DatePicker
          type="month"
          format="yyyy-MM"
          v-model="participation.month"
          placeholder="select month"
          style="width: 180px"
        ></DatePicker>
        <span @click="lastMonth" style="color:blue;cursor:pointer">上一月</span>
        <span @click="nextMonth" :style="style1">下一月</span>
        <Button type="primary" @click="create">{{$t('button.create')}}</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <!-- <span>发放时间：2019/10/05 19:00</span>
        <span style="color:red">未发放</span>
        <Button type="primary" @click="edit">修改</Button> -->
        <span v-if="symbol.length==0" style="color:red">该月分红尚未创建</span>
      </Col>
    </Row>
    <br />
    <Row>
      <Col style="width:100%;">
        <Table :columns="columns" :data="symbol" border></Table>
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
import { Form } from 'iview';
export default {
  name: "participationInProfitManagement",
  data() {
    let _this = this;
    return {
      style1:{color:"#ccc"},
      symbol: [],
      participation: {
        month: new Date(),
        page: 1,
        pageSize: 10
      },
      total: 0,
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
          title: "分红用户数",
          key: "userNumber",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render(h, param) {
            let list = []
            list.push(h(
                "a",
                {
                  style: { color: "blue" },
                  on: {
                    click() {
                      _this.$router.push({
                        path: "/participationInProfitDetail",
                        query: {
                          id: param.row.id
                        }
                      });
                    }
                  }
                },
                "查看明细"
              ))
            if(_this.style1.color != '#ccc'){
              list.push(h(
              "a",
              {
                  style: { color: "blue" , "margin-left":"15px"},
                  on: {
                    click() {
                      let form = new FormData()
                      form.append('id',param.row.id)
                      _this.$axios.post('/api/copyrightProfit/shareOutBonus',form).then(res=>{
                        console.log(res)
                      })
                    }
                  }
                },
                "发放"
            ))
            }
            return h("span", {},list);
          }
        }
      ],
      option1: [
        {
          disabledDate(date) {
            return date && date.valueOf() >= Date.now() - 86400000;
          }
        }
      ]
    };
  },
  methods: {
    getParticipation() {
      let form = new FormData();
      form.append("page", this.participation.page);
      form.append("pageSize", this.participation.pageSize);
      let date = new Date(this.participation.month);  
      let month = date.getFullYear()+'-'+Number(date.getMonth()+1).toString()
      console.log(month);
      console.log(typeof(month))
      form.append("yearMonth", month);
      this.$axios
        .post("/api/copyrightProfit/getCopyrightProfitByPage", form)
        .then(res => {
          this.symbol = res.data.data.list;
          this.total = res.data.data.total
          console.log(this.symbol);
          console.log(res.data.data);
        });
    },
    create() {
      this.$router.push({
        name: "participationInProfitCreate",
        params: { type: 1 }
      });
    },
    edit() {
      this.$router.push({
        name: "participationInProfitEdit",
        params: { type: 1 }
      });
    },
    lastMonth() {
      this.style1 = {color:"blue","cursor":"pointer"}
      let month = new Date(this.participation.month);
      this.participation.month = month.getFullYear()+'-'+month.getMonth();
      this.getParticipation()
    },
    nextMonth() {
      let date = new Date();
      let date1 = new Date(this.participation.month);
      let time1 = date1.getFullYear()+'-'+date1.getMonth();
      let time2 = date.getFullYear()+'-'+date.getMonth();
      if(time1 == time2){
        this.style1 = {color:"#ccc"};
        return;
      }else{
        this.style1 = {color:"blue","cursor":"pointer"}
        this.participation.month = date1.getFullYear() + '-' + (date1.getMonth()+2);
        let date3 = new Date();
        let time4 = date3.getFullYear()+'-'+(date3.getMonth()+1);
        if(this.participation.month === time4){
          this.style1 = {color:"#ccc"};
        }
        console.log(this.participation.month);
        this.getParticipation()
      }
    },
    changePage(page) {
      this.participation.page = page;
      this.getParticipation();
    },
    changePageSize(pageSize) {
      this.participation.pageSize = pageSize;
      this.getParticipation();
    }
  },
  mounted() {
    this.getParticipation();
  }
};
</script>

<style scoped>
</style>
