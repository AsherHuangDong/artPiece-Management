<template>
  <div>
    <Modal
      title="审核"
      v-model="showDel"
      :closable="false"
      :mask-closable="false"
      @on-ok="sure"
      @on-cancel="cancel"
    >
      <p v-show="status!=3">确定{{status==1?'通过':status==3?'拒绝':''}}该申请吗？</p>
      <p v-show="status==3">请输入银行单号</p>
      <Input v-show="status==3" v-model="outTransId" placeholder="00000000"></Input>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDel: true,
      id: "",
      opUid: "",
      status: "",
      outTransId: ""
    };
  },
  methods: {
    sure() {
      if (!this.outTransId) {
        this.$Message.error("审核失败！");
        this.$router.go(-1);
      } else {
        let form = new FormData();
        form.append("status", this.status);
        form.append("opUid", this.opUid);
        form.append("id", this.id);
        form.append("outTransId", this.outTransId);
        this.$axios
          .post("/api/transactionWithdraw/updateTransactionWithdrawById", form)
          .then(res => {
            this.$Message.success("审核完成");
            this.$router.go(-1);
          });
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.opUid = JSON.parse(localStorage.getItem("userInfo")).adminId;
    this.id = this.$route.query.id;
    this.status = this.$route.query.status;
  }
};
</script>

<style scoped>
</style>