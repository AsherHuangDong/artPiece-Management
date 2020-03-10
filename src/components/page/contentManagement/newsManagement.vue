<template>
  <div class="content">
    <Row>
      <Col span="24" style="text-align:right;">
        <Button type="primary" style="margin-right:20px;" @click="goAdd">{{$t('button.add')}}</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <Table :columns="columns" border :data="list"></Table>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page :total="total" show-total show-elevator show-sizer @on-change='changePage' @on-page-size-change='changePageSize'/>
      </Col>
    </Row>
    <router-view/>
  </div>
</template>

<script>
import { move } from '@/assets/js/move';
export default {
  name: "userStatistics",
  data() {
    let _this = this;
    return {
      page:1,
      pageSize:10,
      total:0,
      list: [],
      columns: [
        {
          title: "",
          key: "sort",
          align: "center",
          width:100,
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("news.sort"));
          }
        },
        {
          title: "",
          key: "newsTittle",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("news.title"));
          }
        },
        {
          title: "",
          key: "name",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("news.img"));
          },
          render:function(h,params){
            return h('img',{
             domProps: {
                src: params.row.newsImgUrl
              },
              style: {
                width: "60%",
                marginTop: "5px"
              }
            })
          }
        },
        {
          title: "",
          key: "time",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("news.uploadTime"));
          }
        },
        {
          title: "",
          key: "adminId",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("news.manageId"));
          }
        },
        {
          title: "",
          key: "name",
          align: "center",
          width:200,
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("public.move"));
          },
          render: function(h, params) {
            return h(
              "div",
              {
                style: {
                  color: "#2d8cf0",
                  display: "flex",
                  "justify-content": "space-around"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      cursor:'pointer'
                    },
                    on: {
                      click: () => {
                       move('/api/news/move',params.row.id,1).then(res=>{
                          _this.$Message.success('上移成功')
                            _this.getData();
                        })
                      }
                    }
                  },
                  _this.$t("button.moveUp")
                ),
                h("span", {}, "|"),
                h(
                  "span",
                  {
                    style: {
                      cursor:'pointer'
                    },
                    on: {
                      click: () => {
                         move('/api/news/move',params.row.id,2).then(res=>{
                          _this.$Message.success('下移成功')
                            _this.getData();
                        })
                      }
                    }
                  },
                  _this.$t("button.moveDown")
                )
              ]
            );
          }
        },
        {
          title: "",
          key: "name",
          align: "center",
          width:150,
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("public.action"));
          },
          render: function(h, params) {
            return h(
              "div",
              {
                style: {
                  color: "#2d8cf0",
                  display: "flex",
                  "justify-content": "space-around"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      cursor:'pointer'
                    },
                    on: {
                      click: () => {
                        _this.$router.push({
                          path: "/editNews",
                          query: {
                            id:params.row.id
                          }
                        });
                      }
                    }
                  },
                  _this.$t("button.edit")
                ),
                h("span", {}, "|"),
                h(
                  "span",
                  {
                    style: {
                      cursor:'pointer'
                    },
                    on: {
                      click: () => {
                        _this.$router.push({
                          path:'/newsManagementDelete',
                          query:{
                            id:params.row.id
                          }
                        })
                      }
                    }
                  },
                  _this.$t("button.delete")
                )
              ]
            );
          }
        }
      ]
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "newsManagementDelete") {
      this.getData();
    }
    next();
  },
  methods: {
    changePage(page){
      this.page = page
      this.getData()
    },
    changePageSize(pageSize){
      this.pageSize = pageSize
      this.getData()
    },
    goAdd() {
      this.$router.push("/addNews");
    },
    getData(){
      let form = new FormData()
      form.append('page',this.page)
      form.append('pageSize',this.pageSize)
      this.$axios.post('/api/news/getNews',form)
      .then(res=>{
        this.list = res.data.data.records
        this.total = res.data.data.total
        this.list.forEach(item=>{
          item.time = this.$tool.date.format(new Date(item.createTimeLong),"yyyy/MM/dd hh:mm:ss")
        })
      })
    }
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped>
</style>
