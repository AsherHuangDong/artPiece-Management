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
        <Page
          :total="total"
          show-total
          show-elevator
          show-sizer
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
  data() {
    let _this = this;
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      columns: [
        {
          key: "sort",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("notice.sort"));
          }
        },
        {
          key: "announcementTittle",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("notice.title"));
          }
        },
        {
          key: "time",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("notice.upLoadTime"));
          }
        },
        {
          key: "adminId",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("notice.manageId"));
          }
        },
        {
          key: "name",
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
                  padding: "0 10px",
                  display: "flex",
                  "justify-content": "space-around"
                }
              },
              [
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        _this.move(params.row.id, 1);
                      }
                    }
                  },
                  _this.$t("button.moveUp")
                ),
                h("span", {}, "|"),
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        _this.move(params.row.id, 2);
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
                  padding: "0 10px",
                  display: "flex",
                  "justify-content": "space-around"
                }
              },
              [
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        _this.$router.push({
                          path: "/editNotice",
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
                    on: {
                      click: () => {
                        _this.$router.push({
                          path: "/noticeManagementDelete",
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
    if (from.name === "noticeManagementDelete") {
      this.getData();
    }
    next();
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    goAdd() {
      this.$router.push("/addNotice");
    },
    getData() {
      let form = new FormData();
      form.append("type", 1);
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.$axios.post("/api/announcement/getAnnouncement", form).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data.records;
          this.total = res.data.data.total;
          this.list.forEach(item => {
            item.time = this.$tool.date.format(new Date(item.createTimeLong),"yyyy/MM/dd hh:mm:ss")
          });
        }
      });
    },
    move(id, status) {
      let msg = "";
      if (status == 1) {
        msg = this.$t('message.moveUp');
      } else {
        msg = this.$t('message.moveDown');
      }
      let form = new FormData();
      form.append("id", id);
      form.append("status", status);
      form.append("type", 1);
      this.$axios.post("/api/announcement/moveAnnouncement", form).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(msg);
          this.getData();
        } else {
          this.$Message.success(res.data.msg);
        }
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
