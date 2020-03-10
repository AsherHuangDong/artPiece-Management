<template>
  <div>
    <Row>
      <Card dis-hover>
        <Row>
          <Col span="20" offset="1">
            <Form label-position="right" :label-width="250" ref="formValidate" :model="formValidate" :rules="ruleValidate">
              <FormItem label="拍卖版权代码：" prop="copyrightId">
                <Select style="width:40%;min-width:300px;" v-model='formValidate.copyrightId'>
                  <Option :value="item.copyrightId" v-for='(item,index) in codeList' :key='item.copyrightId + index'>{{item.copyrightCode}}</Option>
                </Select>
              </FormItem>
              <FormItem label="价格精度：" prop="priceAccuracy">
                <Input type="number" style="width:40%;min-width:300px;" v-model='formValidate.priceAccuracy'>
                  <span slot="append">位小数</span>
                </Input>
              </FormItem>
              <FormItem label="最小交易金额：" prop="minTransactionAmount">
                <Input type="number" style="width:40%;min-width:300px;" v-model='formValidate.minTransactionAmount'>
                  <span slot="append">AP</span>
                </Input>
              </FormItem>
              <FormItem label="最小交易数量：" prop="minTransactionNumber">
                <Input type="number" style="width:40%;min-width:300px;" v-model='formValidate.minTransactionNumber'></Input>
              </FormItem>
              <FormItem label="手续费：" prop="handlingFee">
                <Input type="number" style="width:40%;min-width:300px;" v-model='formValidate.handlingFee'>
                  <span slot="append">AP</span>
                </Input>
              </FormItem>
              <FormItem label="开盘价：" prop="openingPrice">
                <Input type="number" style="width:40%;min-width:300px;" v-model='formValidate.openingPrice'></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span="12" offset="7">
            <Button @click="handleSubmit('formValidate')" style="margin-right: 5px;width:80px;" type="primary">{{$t('button.save')}}</Button>
            <Button @click="cancel" style="margin-left: 5px;width:80px;" type="default">{{$t('button.cancel')}}</Button>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "dealManagementAdd",
    data() {
      return {
        codeList:[],
        formValidate: {},
        ruleValidate: {
          copyrightId: [
            { required: true, message: '请选择拍卖版权代码', trigger: 'blur',type:'number'}
          ],
           priceAccuracy: [
            { required: true, message: '请填写价格精度', trigger: 'blur' }
          ],
           minTransactionAmount: [
            { required: true, message: '请填写单小交易金额', trigger: 'blur' }
          ],
           minTransactionNumber: [
            { required: true, message: '请填写单小交易数量', trigger: 'blur'}
          ],
           handlingFee: [
            { required: true, message: '请填写手续费', trigger: 'blur'}
          ],
          openingPrice: [
            { required: true, message: '请填写开盘价', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.$router.push("/dealManagement")
      },
      handleSubmit (name) {
        let form = new FormData()
        let _this = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.codeList.forEach(item=>{
              if (item.copyrightId == this.formValidate.copyrightId){
               this.formValidate.copyrightCode = item.copyrightCode
              }
            })
            form.append('copyrightCode',this.formValidate.copyrightCode)
            form.append('copyrightId',this.formValidate.copyrightId)
            form.append('priceAccuracy',this.formValidate.priceAccuracy)
            form.append('minTransactionAmount',this.formValidate.minTransactionAmount)
            form.append('minTransactionNumber',this.formValidate.minTransactionNumber)
            form.append('handlingFee',this.formValidate.handlingFee)
            form.append('openingPrice',this.formValidate.openingPrice)
            _this.$axios.post('/api/transactionCopyright/saveTransactionCopyright',form)
            .then(res=>{
              _this.$Message.success('添加成功')
              _this.$router.go(-1)
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getCode(){
        this.$axios.get('/api/copyrightAuction/getCopyrightAuctionList')
        .then(res=>{
          this.codeList = res.data.data
        })
      }
    },
    mounted(){
      this.getCode()
    }
  }
</script>

<style scoped>

</style>
