<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row>
            <Col span="20">
              <span>关键字：</span>
              <Input style="width:200px;margin-right: 10px;" placeholder="请输入版权关键字" v-model='search.Keyword'/>
              <span>交易状态：</span>
              <Select style="width: 100px;margin-right: 10px;" v-model='search.tradingStatus'>
                <Option value="2">全部</Option>
                <Option value="1">开启</Option>
                <Option value="0">关闭</Option>
              </Select>
              <Button type="primary" @click='toSearch'>{{$t('button.search')}}</Button>
            </Col>
            <Col span="4" style="text-align: right;">
              <Button @click="addAuction" type="primary">{{$t('button.add')}}</Button>
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
              <Page :total="total" show-total show-sizer show-elevator />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
import { move } from "@/assets/js/move";
  export default {
    name: "dealManagement",
    data() {
      let self = this;
      return {
        total:0,
        search:{
          currPage:1,
          pageSize:10,
          tradingStatus:2,
          Keyword:''
        },
        columns2: [
          {
            title: '版权代码',
            key: 'copyrightCode',
            align: 'center'
          },
          {
            title: '版权名称',
            key: 'copyrightId',
            align: 'center'
          },
          {
            title: '国家',
            key: 'countryName',
            align: 'center'
          },
          {
            title: '交易状态',
            key: 'isOpen',
            align: 'center',
            render:function(h,param){
              return h('span',{},param.row.isOpen==0?'关闭':param.row.isOpen==1?'开启':'')
            }
          },
          {
            title: '排序',
            key: 'address',
            align: 'center',
            render(h, param){
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue',display:param.index==0?'none':'block'},
                  on: {
                    click() {
                      move("/api/transactionCopyright/moveTransactionCopyright", param.row.id, 1).then(res => {
                          self.$Message.success("上移成功");
                          self.toSearch();
                        });
                    }
                  }
                }, self.$t('button.moveUp')),
                h("a",{
                  style: { color: 'blue', marginLeft: '5px',display:param.index==self.data1.length-1?'none':'block'},
                  on: {
                    click() {
                      move("/api/transactionCopyright/moveTransactionCopyright", param.row.id, 2).then(res => {
                          self.$Message.success("下移成功");
                          self.toSearch();
                        });
                    }
                  }
                }, self.$t('button.moveDown')),
                h("a",{
                  style: { color: 'blue', marginLeft: '5px', display:param.index==0?'none':'block'},
                  on: {
                    click() {
                      move("/api/transactionCopyright/moveTransactionCopyright", param.row.id, 3).then(res => {
                          self.$Message.success("置顶成功");
                          self.toSearch();
                        });
                    }
                  }
                }, self.$t('button.top'))
              ])
            }
          },
          {
            title: '操作',
            key: 'address',
            align: 'center',
            render(h, param){
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue', marginLeft: '5px'},
                  on: {
                    click() {
                      self.$router.push({
                        path:"/dealManagementDelete",
                        query:{
                          id:param.row.id
                        }
                      })
                    }
                  }
                }, self.$t('button.delete')),
                h("a",{
                  style: { color: 'blue', marginLeft: '5px'},
                  on: {
                    click() {
                      self.$router.push({
                        path:'/dealManagementChangeStatus',
                        query:{
                          id:param.row.id,
                          status:param.row.isOpen
                        }
                      })
                    }
                  }
                }, param.row.isOpen==0?'开启交易':param.row.isOpen==1?'关闭交易':''),
                h("a",{
                  style: { color: 'blue', marginLeft: '5px'},
                  on: {
                    click() {
                      console.log("编辑");
                      self.$router.push({
                        path:'/dealManagementEdit',
                        query:{
                          id:param.row.id
                        }
                      })
                    }
                  }
                }, self.$t('button.edit'))
              ])
            }
          }
        ],
        columns1: [
          {
            title: '序号',
            key: 'name',
            align: 'center'
          },
          {
            title: '国家名称',
            key: 'age',
            align: 'center'
          },
          {
            title: '排序',
            key: 'address',
            align: 'center'
          },
          {
            title: '操作',
            key: 'address',
            align: 'center',
            render(h, param){
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      console.log("delete")
                      self.$router.push("/dealManagementDelete")
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: []
      }
    },
    beforeRouteUpdate(to, from, next) {
    if (from.name === "dealManagementDelete" || from.name === "dealManagementChangeStatus") {
      this.toSearch();
    }
    next();
  },
    methods: {
      addAuction() {
        this.$router.push('/dealManagementAdd')
      },
      toSearch(){
        let form = new FormData()
        form.append('currPage',this.search.currPage)
        form.append('pageSize',this.search.pageSize)
        if (this.search.Keyword){
          form.append('Keyword',this.search.Keyword)
        }
        if (this.search.tradingStatus!=2){
          form.append('tradingStatus',this.search.tradingStatus)
        }
        this.getData(form)
      },
      getData(form){
        this.$axios.post('/api/transactionCopyright/getTransactionCopyrightByPage',form)
        .then(res=>{
          if (res.data.data){
            this.data1 = res.data.data.list
            this.total = res.data.data.Total
          } else {
            this.data1 = []
            this.total = 0
          }
        })
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>

</style>
