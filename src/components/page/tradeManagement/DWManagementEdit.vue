<template>
  <div>
    <Form :label-width="150" label-position="left" style="margin:0 40px;">
      <FormItem label="兑入AP汇率" prop="age">
        <Input style="width:400px;padding-right:10px;" v-model="obj.matchRate" type="number"></Input>
        <span>{{symbol}}/AP</span>
      </FormItem>
      <FormItem label="兑出AP汇率" prop="age">
        <Input style="width:400px;padding-right:10px;" v-model="obj.cashOutRate" type="number"></Input>
        <span>{{symbol}}/AP</span>
      </FormItem>
      <br />
      <h3 style="margin-left:-40px;">提现额度配置</h3>
      <FormItem label="单笔最小提现金额：" prop="age">
        <Input style="width:400px;padding-right:10px;" v-model="obj.onceMinAmount" type="number"></Input>
        <span>{{symbol}}</span>
      </FormItem>
      <FormItem label="单笔最大提现金额：" prop="age">
        <Input style="width:400px;padding-right:10px;" v-model="obj.onceMaxAmount" type="number"></Input>
        <span>{{symbol}}</span>
      </FormItem>
      <FormItem label="提现金额精度：" prop="age">
        <Input
          style="width:400px;padding-right:10px;"
          v-model="obj.withdrawPrecision"
          type="number"
        ></Input>
        <span>{{symbol}}</span>
      </FormItem>
      <FormItem label="提现手续费：" prop="age">
        <Input
          style="width:400px;padding-right:10px;"
          v-model="obj.withdrawFee"
          type="number"
        ></Input>
        <span>{{symbol}}</span>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width:80px;" @click="submit">{{$t('button.save')}}</Button>
        <Button
          style="margin-left: 40px;width:80px;"
          type="default"
          @click="cancel"
        >{{$t('button.cancel')}}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "DWManagementEdit",
  data() {
    return {
      symbol: "",
      obj: {},
      rateType: [
        {
          id: 1,
          name: "兑入AP汇率"
        },
        {
          id: 2,
          name: "兑出AP汇率"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.obj.symbol = this.symbol;
      this.$axios.post("/api/exRate/save", this.obj).then(res => {
        this.$router.go(-1);
        this.$Message.success("保存成功");
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    getBiZhong() {
      this.$axios.get("/api/exRate/symbolList", {}).then(res => {
        res.data.data.forEach(item => {
          if (this.obj.id == item.id) {
            this.obj = item;
          }
        });
      });
    }
  },
  mounted() {
    this.symbol = this.$route.query.type;
    this.obj.id = this.$route.query.id;
    this.getBiZhong();
  }
};
</script>

<style scoped>
</style>
