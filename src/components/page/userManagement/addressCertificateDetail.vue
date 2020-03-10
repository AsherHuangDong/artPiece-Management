<template>
  <div>
    <Row>
      <Table border :columns="columns1" :data="data1"></Table>
    </Row>
    <br />
    <br />
    <Row>
      <Col span="12" offset="4">
        <Form label-position="right" :label-width="100">
          <FormItem :label="$t('address.address')">
            <span>{{obj.userAddressVerify.address}}</span>
          </FormItem>
          <FormItem :label="$t('address.photo')">
            <div style="width:100px; height: 100px;background-color: #6B6C6C">
              <img :src="obj.userAddressVerify.addressPhoto" alt />
            </div>
          </FormItem>
          <FormItem label v-show="obj.userAddressVerify.verifyStatus==0">
            <Input
              style="width:100%"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="如果审核不通过，请填写打回理由、理由将通过实名认证页面发送给用户"
            ></Input>
          </FormItem>
          <FormItem label style v-show="obj.userAddressVerify.verifyStatus==0">
            <Button type="primary" @click="cheched(1)">审核通过</Button>
            <Button
              style="display: inline-block;margin-left: 10px;"
              type="primary"
              @click="cheched(2)"
            >审核不通过,打回</Button>
          </FormItem>
          <FormItem label style v-show="obj.userAddressVerify.verifyStatus!=0">
            <Button type="primary" style="width:80px;margin-top:30px;" @click="goBack">{{$t('button.back')}}</Button>
          </FormItem>
        </Form>
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "addressCertificateDetailChangeStatus",
  data() {
    let _this = this
    return {
      userId: "",
      obj: {},
      columns1: [
        {
          title: "UID",
          key: "id",
          align: "center"
        },
        {
          key: "name",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("address.name"));
          },
        },
        {
          key: "email",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("address.email"));
          },
        },
        {
          key: "time",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("address.auditTime"));
          },
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
      ]
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "addressCertificateDetailChangeStatus") {
      this.getDetails();
    }
    next();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDetails() {
      let form = new FormData();
      form.append("userId", this.userId);
      this.$axios.post("/api/user/getAddrVerifyById", form).then(res => {
        this.obj = res.data.data;
        this.data1 = [
          {
            id: this.obj.id,
            name: this.obj.nickname,
            email: this.obj.email,
            time:this.obj.userAddressVerify.ctime[0]+'/'+this.obj.userAddressVerify.ctime[1]+'/'+this.obj.userAddressVerify.ctime[2]+' '+this.obj.userAddressVerify.ctime[3]+':'+this.obj.userAddressVerify.ctime[4]+':'+this.obj.userAddressVerify.ctime[5]
          }
        ];
      });
    },
    cheched(status) {
      this.$router.push({
        path: "/addressCertificateDetailChangeStatus",
        query: {
          id: this.userId,
          status: status
        }
      });
    }
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.getDetails();
  }
};
</script>

<style scoped>
</style>
