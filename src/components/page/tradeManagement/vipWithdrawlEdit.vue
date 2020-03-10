<template>
  <div>
    <Modal
      title="修改会员提现设置"
      v-model="showDel"
      :closable="false"
      :mask-closable="false"
      :ok-text="$t('button.sure')"
      :cancel-text="$t('button.cancel')"
      @on-ok="sure"
      @on-cancel="cancel"
    >
      <Form>
        <FormItem label="VIP Level">
          <Input style="width:400px;padding-right:10px;" v-model="obj.vipLevel" type="number"></Input>
        </FormItem>
        <FormItem label="每日提现限额">
          <Input style="width:380px;padding-right:10px;" v-model="obj.withdrawDay" type="number"></Input>
        </FormItem>
        <FormItem label="每月提现限额">
          <Input style="width:380px;padding-right:10px;" v-model="obj.withdrawMonth" type="number"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDel: true,
      id: "",
      obj: {}
    };
  },
  methods: {
    sure() {
      this.$axios.post("/api/exRate/updateMemberWithdrawal", this.obj).then(res => {
        this.$Message.success("修改成功");
        this.$router.push("/DWManagement");
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    getData() {}
  },
  mounted() {
    this.obj.id = this.$route.query.id;
  }
};
</script>

<style scoped>
</style>
