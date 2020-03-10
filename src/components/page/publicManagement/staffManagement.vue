<style scoped>

</style>
<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <p slot="title">数据筛选</p>
          <Row>
            <Col span="12"><span>邮箱：&nbsp;</span><Input v-model="searchParams.email" placeholder="请输入邮箱" style="width: 300px" /></Col>
            <Col span="12" style="text-align: right"><Button @click="search" type="primary">查询</Button></Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Card dis-hover class="staffListHeader">
          <p slot="title" style="padding: 0;display: inline-block;height: 34px;line-height: 34px;">
            员工列表
            <span style="display: inline-block;float: right;line-height: 20px;">
              <Button @click="add" type="primary">添加</Button>
            </span>
          </p>
          <Row>
            <Table border :columns="columns1" :data="data1"></Table>
          </Row>
          <br>
          <Row>
          <Col span="24" style="text-align: center">
            <Page @on-page-size-change="pageSizeChange($event)" @on-change="pageChange($event)" :total="searchParams.total" show-total show-sizer />
          </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <br>
    <Row :gutter="16">
      <Col span="12" style="text-align: right">
        <Button type="primary" style="width:120px;">保存</Button>&nbsp;
      </Col>
      <Col span="12">
        <Button type="default" style="width:120px;">取消</Button>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
  import {freezeFinish, unFreezeFinish} from "../../component/message/message";

  export default {
    name: "staffManagement",
    data() {
      let self = this;
      return {
        searchParams: {
          email: '',
          page: 1,
          pageSize: 10,
          total: 0
        },
        columns1: [
          {
            title: '员工ID',
            align: 'center',
            key: 'admin_id'
          },
          {
            title: '手机号',
            align: 'center',
            key: 'mobile'
          },
          {
            title: '邮箱',
            align: 'center',
            key: 'mailbox'
          },
          {
            title: '员工姓名',
            align: 'center',
            key: 'nick_name'
          }
          ,
          {
            title: '角色',
            align: 'center',
            render(h, param){
              let res = "";
              for (let i = 0; i < param.row.roleList.length; i++){
                if (i === 0){
                  res += param.row.roleList[i].roleName
                } else {
                  res += "、" + param.row.roleList[i].roleName
                }
              }
              return h("span", {}, res)
            }
          }
          ,
          {
            title: '上次登录时间',
            align: 'center',
            key: 'address'
          }
          ,
          {
            title: '登录IP',
            align: 'center',
            key: 'address'
          }
          ,
          {
            title: '操作',
            key: 'address',
            align: 'center',
            render(h, param){
              let coldOption = param.row.status === 1 ? "冻结" : "解冻";
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click: function () {
                      console.log('delete');
                      self.$store.commit("deleteModal/setDeleteParams", {
                        url: '/api/admin/deleteAdmin',
                        adminId: param.row.admin_id,
                        callback: function () {
                          self.search();
                        }
                      });
                      self.$router.push("/staffManagementDelete")
                    }
                  }
                }, '删除'),
                h("a",{
                  style: { color: 'blue', marginLeft: '10px'},
                  on: {
                    click: function () {
                      console.log('edit');
                      self.$router.push({name: "staffManagementEdit", params:{param: param.row}});
                    }
                  }
                }, '编辑'),
                h("a",{
                  style: { color: 'blue', marginLeft: '10px'},
                  on: {
                    click: function () {
                      console.log('cold');
                      let form = new FormData();
                      form.append("adminId", param.row.admin_id);
                      self.$axios.post("/api/admin/updateAdminStatus", form)
                        .then(res => {
                          param.row.status === 1 ? freezeFinish() : unFreezeFinish();
                          console.log(res.data);
                        }).finally(() => self.search())
                    }
                  }
                }, coldOption)
              ])
            }
          }
        ],
        data1: []
      }
    },
    methods: {
      pageSizeChange(e){
        this.searchParams.pageSize = e;
        this.searchParams.page = 1;
        this.search();
      },
      pageChange(e) {
        this.searchParams.page = e;
        this.search();
      },
      search() {
        console.log('search', this.searchParams);
        let form = new FormData();
        form.append("page", this.searchParams.page);
        form.append("pageSize", this.searchParams.pageSize);
        form.append("mailbox", this.searchParams.email);
        this.$axios.post("/api/admin/listAdmin", form)
          .then(res => {
            console.log("/api/admin/listAdmin", res.data);
            this.data1 = res.data.data.records;
            this.searchParams.page = res.data.data.current;
            this.searchParams.pageSize = res.data.data.size;
            this.searchParams.total = res.data.data.total;
          })
      },
      add() {
        console.log('add');
        this.$router.push("/staffManagementAdd");
      }
    },
    mounted() {
      this.search();
    }
  }
</script>
