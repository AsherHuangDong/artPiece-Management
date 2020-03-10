<template>
  <div>
    <Row>
      <Table border :columns="columns1" :data="data1"></Table>
    </Row>
    <br />
    <br />
    <Row>
      <Col span="12" offset="4">
        <Form label-position="left" :label-width="200">
          <FormItem style='border-bottom:1px solid #eee;' :label="$t('realName.name') + '：'">
            <span>{{obj.nickname}}</span>
          </FormItem>
          <FormItem style='border-bottom:1px solid #eee;' :label="$t('realName.name') + '：'">
            <span>{{obj.authRealname.countryCode}}</span>
          </FormItem>
          <FormItem style='border-bottom:1px solid #eee;' :label="$t('realName.certificateType') + '：'">
            <span>{{obj.authRealname.certificateType}}</span>
          </FormItem>
          <FormItem style='border-bottom:1px solid #eee;' :label="$t('realName.certificateNum') + '：'">
            <span>{{obj.authRealname.certificateNumber}}</span>
          </FormItem>
          <FormItem style='border-bottom:1px solid #eee;' :label="$t('realName.photo1') + '：'">
            <div style="width:100px; height: 100px;background-color: #6B6C6C;margin-bottom:10px;"></div>
          </FormItem>
          <FormItem :label="$t('realName.photo2') + '：'">
            <div style="width:100px; height: 100px;background-color: #6B6C6C"></div>
          </FormItem>
          <FormItem label>
            <Input
              v-model="obj.authRealname.reason"
              style="width:100%"
              type="textarea"
              v-show='obj.authRealname.authStatus!=1'
              :disabled="obj.authRealname.authStatus==2"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="如果审核不通过，请填写打回理由、理由将通过实名认证页面发送给用户"
            ></Input>
          </FormItem>
          <FormItem label style v-show="obj.authRealname.authStatus!=0">
            <Button type="primary" style="width:80px;margin-top:30px;" @click="goBack">{{$t('button.back')}}</Button>
          </FormItem>
          <FormItem label style v-show="obj.authRealname.authStatus==0">
            <Button type="primary" @click="cheched(1)">审核通过</Button>
            <Button
              style="display: inline-block;margin-left: 10px;"
              type="primary"
              @click="cheched(2)"
            >审核不通过,打回</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "realNameAuditDetail",
  data() {
    let _this = this
    return {
      userId: "",
      obj: {
        authRealname: ""
      },
      reason: "",
      columns1: [
        {
          title: "UID",
          key: "id",
          align: "center"
        },
        {
          key: "mobileNumber",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("realName.phone"));
          },
        },
        {
          key: "email",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("realName.email"));
          },
        },
        {
          key: "time",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("realName.auditTime"));
          }
        },
        {
          title: "证件类型",
          key: "certificateType",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("realName.certificateType"));
          }
        },
        {
          key: "name",
          align: "center",
          renderHeader: function(h, params) {
            return h("span", {}, _this.$t("realName.name"));
          }
        }
      ],
      data1: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (from.name === "realNameAuditDetailChangeStatus") {
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
      this.$axios.post("/api/user/getNameVerifyById", form).then(res => {
        this.obj = res.data.data;
        this.data1 = [
          {
            id: this.obj.id,
            name: this.obj.nickname,
            email: this.obj.email,
            time: this.obj.authRealname.ctime[0]+'/'+this.obj.authRealname.ctime[1]+'/'+this.obj.authRealname.ctime[2]+' '+this.obj.authRealname.ctime[3]+':'+this.obj.authRealname.ctime[4]+':'+this.obj.authRealname.ctime[5],
            mobileNumber: this.obj.mobileNumber,
            certificateType: this.obj.authRealname.certificateType
          }
        ];
      });
    },
    cheched(status) {
      this.$router.push({
        path: "/realNameAuditDetailChangeStatus",
        query: {
          id: this.userId,
          status: status,
          reason: this.obj.authRealname.reason
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
