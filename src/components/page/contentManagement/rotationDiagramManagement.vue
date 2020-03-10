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
    <router-view />
  </div>
</template>

<script>
import { move } from "@/assets/js/move";
export default {
  name: "",
  data() {
    let _this = this;
    return {
      page:1,
      pageSize:10,
      total:0,
      list: [],
      columns: [
        {
          key: "sort",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.sort"));
          }
        },
        {
          key: "bannerTittle",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.title"));
          }
        },
        {
          key: "name",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.img"));
          },
          render: function(h, params) {
            return h("img", {
              domProps: {
                src: params.row.bannerImgUrl
              },
              style: {
                width: "60%",
                marginTop: "5px"
              }
            });
          }
        },
        {
          key: "name",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.url"));
          }
        },
        {
          key: "time",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.upLoadTime"));
          }
        },
        {
          key: "adminId",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("banners.manageId"));
          }
        },
        {
          key: "name",
          width: 200,
          align: "center",
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
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        move("/api/banner/move", params.row.id, 1).then(res => {
                          _this.$Message.success(_this.$t('message.moveUp'));
                          _this.getData();
                        });
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
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        move("/api/banner/move", params.row.id, 2).then(res => {
                          _this.$Message.success(_this.$t('message.moveDown'));
                          _this.getData();
                        });
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
          key: "name",
          width: 150,
          align: "center",
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
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        _this.$router.push({
                          path: "/rotationDiagramEdit",
                          query: {
                            id: params.row.id
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
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        _this.$router.push({
                          path: "/rotationDiagramManagementDelete",
                          query: {
                            id: params.row.id
                          }
                        });
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
    if (from.name === "rotationDiagramManagementDelete") {
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
      this.$router.push("/rotationDiagramAdd");
    },
    getData() {
      let form = new FormData()
      form.append('page',this.page)
      form.append('pageSize',this.pageSize)
      this.$axios.post("/api/banner/getBanner",form).then(res => {
        this.list = res.data.data.records;
        this.total = res.data.data.total
        this.list.forEach(item => {
          item.time = this.$tool.date.format(new Date(item.createTimeLong),"yyyy/MM/dd hh:mm:ss")
        });
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
