<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row style="margin-top: -10px;">
            <Col span="20" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">版权国家管理</span>
            </Col>
            <Col span="4" style="text-align: right;">
              <Button @click="addCopyrightCountry" type="primary">添加</Button>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Table border :columns="columns1" :data="data1"></Table>
          </Row>
          <br>
          <br>
          <Row style="margin-top: -10px;">
            <Col span="20" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">版权信息管理</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20">
              <span>关键字：</span>
              <Input v-model="getCopyrightAndCopyrightCountryByPageParams.Keyword" style="width:200px;"
                     placeholder="请输入版权代码"/>
              <!--              <Select style="width: 80px;margin-right: 10px;">-->
              <!--                <Option value="1">UID</Option>-->
              <!--                <Option value="2">手机号</Option>-->
              <!--                <Option value="3">邮箱</Option>-->
              <!--              </Select>-->
              <Button @click="getCopyrightAndCopyrightCountryByPage" type="primary">搜索</Button>
            </Col>
            <Col span="4" style="text-align: right;">
              <Button @click="addCopyright" type="primary">添加版权</Button>
            </Col>
          </Row>
          <br>
          <span style="font-weight: bold;">版权列表</span>
          <Row>
            <Table border :columns="columns2" :data="data2"></Table>
          </Row>
          <br>
          <Row>
            <Col span="24" style="text-align: center">
              <Page @on-change="changePage($event)" @on-page-size-change="sizeChange($event)"
                    :total="getCopyrightAndCopyrightCountryByPageParams.total" show-total show-sizer show-elevator/>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
  import {moveSuccess} from "../../component/message/message";

  export default {
    name: "copyrightManagement",
    data() {
      let self = this;
      return {
        moveCopyrightParams: {},
        getCopyrightAndCopyrightCountryByPageParams: {
          currPage: 1,
          pageSize: 10,
          Keyword: ''
        },
        columns2: [
          {
            title: '版权代码',
            key: 'copyrightCode',
            align: 'center'
          },
          {
            title: '版权名称',
            key: 'copyrightName',
            align: 'center'
          },
          {
            title: '国家',
            key: 'countryName',
            align: 'center'
          },
          {
            title: '发行时间',
            key: 'address',
            align: 'center',
            render(h, param) {
              let result = '';
              result += param.row.publishTime[0] + '-';
              result += param.row.publishTime[1] + '-';
              result += param.row.publishTime[2] + ' ';
              result += param.row.publishTime[3] + ':';
              if (param.row.publishTime[5]) {
                result += param.row.publishTime[4] + ':';
                result += param.row.publishTime[5];
              } else {
                result += param.row.publishTime[4];
              }
              return h("span", {}, result)
            }
          },
          {
            title: '艺术家',
            key: 'artist',
            align: 'center'
          },
          {
            title: '作曲家',
            key: 'composer',
            align: 'center'
          },
          {
            title: '排序',
            key: 'address',
            align: 'center',
            render(h, param) {
              let result = [];
              let up = h("a", {
                  style: {color: 'blue'},
                  on: {
                    click() {
                      console.log("up");
                      self.moveCopyright(param.row.id, 1)
                    }
                  }
                }, '上移');
              let down = h("a", {
                  style: {color: 'blue', marginLeft: '5px'},
                  on: {
                    click() {
                      console.log("down");
                      self.moveCopyright(param.row.id, 2)
                    }
                  }
                }, '下移');
              let top = h("a", {
                style: {color: 'blue', marginLeft: '5px'},
                on: {
                  click() {
                    console.log("head");
                    self.moveCopyright(param.row.id, 3)
                  }
                }
              }, '置顶');
              if (param.row._index === 0){
                result.push(down);
              } else if (param.row._index === self.data2.length - 1){
                result.push(up);
                result.push(top);
              } else {
                result.push(up);
                result.push(down);
                result.push(top);
              }
              return h("span", {}, result)
            }
          },
          {
            title: '操作',
            key: 'address',
            align: 'center',
            render(h, param) {
              return h("span", {}, [
                h("a", {
                  style: {color: 'blue'},
                  on: {
                    click() {
                      console.log("删除版权");
                      self.$router.push({
                        name: "copyrightManagementDelete",
                        params: {
                          id: param.row.id,
                          url: "/api/copyright/delCopyright?id=" + param.row.id,
                          callback: self.getCopyrightAndCopyrightCountryByPage,
                          method: 'delete'
                        }
                      });
                    }
                  }
                }, '删除'),
                h("a", {
                  style: {color: 'blue'},
                  on: {
                    click() {
                      console.log("信息编辑");
                      self.$router.push({name:"copyrightManagementEdit", params:{row: param.row, country: self.data1}})
                    }
                  }
                }, ' | 信息编辑 | '),
                h("a", {
                  style: {color: 'blue'},
                  on: {
                    click() {
                      console.log("图表数据");
                      self.$router.push({name:"copyrightChartEditor", params:{row: param.row}})
                    }
                  }
                }, '图表数据')
              ])
            }
          }
        ],
        columns1: [
          {
            title: '序号',
            align: 'center',
            render(h, param) {
              return h('span', {}, param.row._index + 1);
            }
          },
          {
            title: '国家名称',
            key: 'countryName',
            align: 'center'
          },
          {
            title: '排序',
            key: 'sort',
            align: 'center',
            render(h, param) {
              let result = [];
              let up = h("a", {
                style: {color: 'blue'},
                on: {
                  click() {
                    console.log("上移");
                    self.moveCopyrightCountry({id1: param.row.id, id2: param.row.up})
                  }
                }
              }, '上移');
              let down = h("a", {
                style: {color: 'blue'},
                on: {
                  click() {
                    console.log("下移");
                    self.moveCopyrightCountry({id1: param.row.id, id2: param.row.down})
                  }
                }
              }, '下移');
              let line = h("span", {}, ' | ');
              if (param.row._index === 0) {
                result.push(down);
              } else if (param.row._index === self.data1.length - 1) {
                result.push(up)
              } else {
                result.push(up);
                result.push(line);
                result.push(down);
              }
              return h("span", {}, result)
            }
          },
          {
            title: '操作',
            key: 'address',
            align: 'center',
            render(h, param) {
              return h("span", {}, [
                h("a", {
                  style: {color: 'blue'},
                  on: {
                    click() {
                      console.log("删除国家！！！");
                      self.$router.push({
                        name: "copyrightManagementDelete",
                        params: {
                          url: "/api/copyrightCountry/deleteCopyrightCountry",
                          id: param.row.id,
                          callback: self.getCopyrightCountryList
                        }
                      })
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: [],
        data2: []
      }
    },
    methods: {
      changePage(e) {
        this.getCopyrightAndCopyrightCountryByPageParams.currPage = e;
        this.getCopyrightAndCopyrightCountryByPage();
      },
      sizeChange(e) {
        this.getCopyrightAndCopyrightCountryByPageParams.currPage = 1;
        this.getCopyrightAndCopyrightCountryByPageParams.pageSize = e;
        this.getCopyrightAndCopyrightCountryByPage();
      },
      getCopyrightAndCopyrightCountryByPage() {
        let form = new FormData();
        form.append("currPage", this.getCopyrightAndCopyrightCountryByPageParams.currPage);
        form.append("pageSize", this.getCopyrightAndCopyrightCountryByPageParams.pageSize);
        form.append("Keyword", this.getCopyrightAndCopyrightCountryByPageParams.Keyword);
        this.$axios.post("/api/copyright/getCopyrightAndCopyrightCountryByPage", form)
          .then(res => {
            console.log("/api/copyright/getCopyrightAndCopyrightCountryByPage", res.data);
            let l = res.data.data[1].length;
            this.getCopyrightAndCopyrightCountryByPageParams.total = res.data.data[1][l - 1].total;
            this.data2 = res.data.data[1];
            this.data2.splice(l - 1, l)
          })
      },
      addCopyright() {
        this.$router.push({name: 'copyrightManagementAdd', params: {type: 2, country: this.data1}})
      },
      addCopyrightCountry() {
        this.$router.push({name: 'copyrightManagementAdd', params: {type: 1}})
      },
      moveCopyright(id, status) {
        let form = new FormData();

        form.append("id", id);
        form.append("status", status);
        this.$axios.post("/api/copyright/moveCopyright", form)
          .then(res => {
            console.log("/api/copyright/moveCopyright", res.data);
            this.getCopyrightAndCopyrightCountryByPage();
          })
      },
      getCopyrightCountryList() {
        this.$axios.get("/api/copyrightCountry/getCopyrightCountryList")
          .then(res => {
            console.log("/copyrightCountry/getCopyrightCountryList", res.data);
            this.data1 = res.data.data;
            // 从小到大排序
            console.log(this.data1[0].sort);
            for (let j = 0; j < this.data1.length; j++) {
              for (let i = 0; i < this.data1.length - j - 1; i++) {
                if (this.data1[i].sort > this.data1[i + 1].sort) {
                  let temp = this.data1[i].sort;
                  this.data1[i].sort = this.data1[i + 1].sort;
                  this.data1[i + 1].sort = temp;
                }
              }
            }
            // 添加上级下级ID
            for (let i = 0; i < this.data1.length; i++) {
              if (i === 0) {
                this.data1[i].down = this.data1[i + 1].id
              } else if (i !== this.data1.length - 1) {
                this.data1[i].down = this.data1[i + 1].id;
                this.data1[i].up = this.data1[i - 1].id;
              } else {
                this.data1[i].up = this.data1[i - 1].id;
              }
            }
          })
      },
      moveCopyrightCountry(p) {
        let form = new FormData();
        form.append("id1", p.id1);
        form.append("id2", p.id2);
        this.$axios.post("/api/copyrightCountry/moveCopyrightCountry", form)
          .then(res => {
            console.log("/api/copyrightCountry/moveCopyrightCountry", res.data);
            if (res.data.code === 0) {
              moveSuccess();
              this.getCopyrightCountryList();
            }
          })
      }
    },
    mounted() {
      // this.getAllCopyright();
      this.getCopyrightCountryList();
      this.getCopyrightAndCopyrightCountryByPage();
    }
  }
</script>

<style scoped>

</style>
