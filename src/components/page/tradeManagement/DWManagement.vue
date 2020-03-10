<template>
  <div>
    <Tabs type="card" v-model='type'>
      <TabPane :label="item.symbol" :name='item.symbol' v-for='(item,index) in symbol' :key='index'>
        <div>
          <h3>汇率配置</h3>
          <Form :label-width="150" label-position="left" style="margin:0 40px;" v-show="!edit">
            <FormItem label="兑入AP汇率">{{item.matchRate}}%</FormItem>
            <FormItem label="兑出AP汇率">{{item.cashOutRate}}%</FormItem>
            <br />
            <h3 style="margin-left:-40px;">提现额度配置</h3>
            <FormItem label="单笔最小提现金额：">{{item.onceMinAmount}}&nbsp;&nbsp;({{item.symbol}})</FormItem>
            <FormItem label="单笔最大提现金额：">{{item.onceMaxAmount}}&nbsp;&nbsp;({{item.symbol}})</FormItem>
            <FormItem label="提现金额精度：">{{item.withdrawPrecision}}&nbsp;&nbsp;({{item.symbol}})</FormItem>
            <FormItem label="提现手续费：">{{item.withdrawFee}}&nbsp;&nbsp;({{item.symbol}})</FormItem>
            <FormItem>
              <Button type="primary" style='width:80px;' @click="goEdit(item.id)">{{$t('button.edit')}}</Button>
            </FormItem>
          </Form>
          <Divider style="margin: 10px 0;"/>
          <h3>会员提现设置</h3>
          <div style="width:80%;padding-bottom:40px;">
            <Table :columns="columns" border :data='data'></Table>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    let _this = this
    return {
      edit: false,
      edit1:false,
      type:'KRW',
      KRW:{},
      USD:{},
      symbol:[],
      columns: [
        {
          title: "VIP Level",
          key: "vipLevel",
          align: "center"
        },
        {
          title: "每日提现限额(KRW)",
          key: "withdrawDay",
          align: "center"
        },
        {
          title: "每月提现限额(KRW)",
          key: "withdrawMonth",
          align: "center"
        },
        // {
        //   title: "提现手续费(KRW)",
        //   key: "withdrawPrecision",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "",
          align: "center",
          render:function(h,params){
            return h('a',{
              style: { color: 'blue'},
              on:{
                click:()=>{
                  _this.$router.push({
                    path:'/vipWithdrawlEdit',
                    query:{
                      id:params.row.id
                    }
                  })
                }
              }
            },_this.$t('button.edit'))
          }
        }
      ],
      columns1: [
        {
          title: "VIP Level",
          key: "",
          align: "center"
        },
        {
          title: "每日提现限额(USD)",
          key: "",
          align: "center"
        },
        {
          title: "每月提现限额(USD)",
          key: "",
          align: "center"
        },
        // {
        //   title: "提现手续费(USD)",
        //   key: "",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "",
          align: "center"
        }
      ],
      data:[]
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "vipWithdrawlEdit") {
      this.getVipList();
    }
    next();
  },
  methods: {
    goEdit(id) {
      this.$router.push({
        path:'/DWManagementEdit',
        query:{
          type:this.type,
          id:id
        }
      })
    },
    getVipList(){
      this.$axios.post('/api/exRate/memberWithdrawalList',{})
      .then(res=>{
        this.data = res.data.data
      })
    },
    getData(){
      this.$axios.post('/api/exRate/bySymbol',{symbol:'KRW'})
      .then(res=>{
        this.obj = res.data.data[0]
      })
    },
    getBiZhong(){
      this.$axios.get('/api/exRate/symbolList',{})
      .then(res=>{
        this.symbol = res.data.data
        this.symbol.forEach(item => {
          item.cashOutRate = ((item.cashOutRate-item.generalRate)<0?"":"+")+Math.round((item.cashOutRate-item.generalRate)/item.generalRate*10000)/100.00;
          item.matchRate = ((item.matchRate-item.generalRate)<0?"":"+")+Math.round((item.matchRate-item.generalRate)/item.generalRate*10000)/100.00;
          console.log(item);
        });
        this.type = this.symbol[0].symbol
      })
    }
  },
  mounted(){
    this.getVipList()
    this.getBiZhong()
    this.getData()   
  }
};
</script>

<style scoped>
h3 {
  line-height: 30px;
  margin-bottom: 20px;
  border-left: 6px solid #333;
  padding-left: 20px;
}
</style>
