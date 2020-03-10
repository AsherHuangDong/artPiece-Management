<template>
    <div>
      <Row>
        <Col span="24">
          <Card dis-hover class="staffListHeader">
            <p slot="title" style="padding: 0;display: inline-block;height: 34px;line-height: 34px;">
              角色列表
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
<!--                <Page :total="100" show-total show-sizer />-->
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: "roleManagement",
    data() {
      let self = this;
      return {
        columns1: [
          {
            title: '角色名称',
            key: 'roleName',
            align: 'center'
          }
          ,
          {
            title: '角色描述',
            key: 'roleDesc',
            align: 'center'
          }
          ,
          {
            title: '操作',
            align: 'center',
            render(h, param){
              return h("span", {}, [
                h("a",{
                  style: { color: 'blue'},
                  on: {
                    click: function () {
                      console.log('edit');
                      self.$router.push({name: "roleManagementEdit", params:{roleId: param.row.roleId}});
                    }
                  }
                }, '编辑'),
                h("a",{
                  style: { color: 'blue', marginLeft: '10px'},
                  on: {
                    click: function () {
                      console.log('delete');
                      self.$store.commit("deleteModal/setDeleteParams", {
                        url: '/api/role/deleteRole',
                        roleId: param.row.roleId,
                        callback: function () {
                          self.listRole();
                        }
                      });
                      self.$router.push("/roleManagementDelete")
                    }
                  }
                }, '删除')
              ])
            }
          }],
        data1: []
      }
    },
    methods: {
      add() {
        console.log("add");
        this.$router.push("/roleManagementAdd");
      },
      listRole() {
        this.$axios.post("/api/role/listRole")
          .then(res => {
            console.log("/role/listRole", res.data);
            this.data1 = res.data.data;
          })
      }
    },
    mounted() {
      this.listRole();
    }
  }
</script>

<style scoped>

</style>
