<template>
  <div>
    <Row>
      <Col span="24">
        <Button @click="back" type="warning">返回</Button>
      </Col>
    </Row>
    <br>
    <Row>
      <Card dis-hover>
        <Form label-position="right" :label-width="250" ref="formValidate" :model="formValidate">
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">基本信息</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="拍卖版权代码：" prop="copyrightCode">
                <Select v-model="formValidate.copyrightId" style="width:40%;min-width:300px;" label-in-value>
                  <Option v-for="(item,index) in auctionList" :value="item.id" :key='index'>{{item.copyrightCode}}</Option>
                </Select>
              </FormItem>
              <FormItem label="发行总量：" prop="issuanceTotalAmount">
                <Input v-model="formValidate.issuanceTotalAmount" type="number" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="起拍价格：" prop="startingPrice">
                <Input v-model="formValidate.startingPrice" type="number" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem  label="开始时间：" prop="stime">
                <span  style="width:20%;min-width:150px;" >
                  {{formValidate.startTime}}
                </span>
              </FormItem>
              <FormItem label="结束时间：" prop="etime">
                <span style="width:20%;min-width:150px;" >
                  {{formValidate.endTime}}
                </span>
              </FormItem>
            </Col>
          </Row>
          <br>
          <br>
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">拍卖参数</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="价格精度：" prop="priceAccuracy">
                <Input v-model="formValidate.priceAccuracy" type="number" style="width:40%;min-width:300px;">
                  <span slot="append">位小数</span>
                </Input>
              </FormItem>
              <FormItem label="单笔交易最小拍卖金额：" prop="minAuctionAmount">
                <Input v-model="formValidate.minAuctionAmount" type="number" style="width:40%;min-width:300px;">
                  <span slot="append">AP</span>
                </Input>
              </FormItem>
              <FormItem label="单笔交易最小拍卖数量：" prop="minAuctionNumber">
                <Input v-model="formValidate.minAuctionNumber" type="number" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="手续费：" prop="handlingFee">
                <Row>
                  <Col span="4">
                    <Input v-model="formValidate.handlingFee" type="number" style="width:100px;">
                      <span slot="append">AP</span>
                    </Input>
                  </Col>
                  <Col span="1">
                    <span>+</span>
                  </Col>
                  <Col span="4">
                    <Input v-model="formValidate.handlingFeePercent" placeholder="0" type="number" style="width:100px">
                      <span slot="append">%</span>
                    </Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="免手续费次数：" prop="freeHandlingFee">
                <Input v-model="formValidate.freeHandlingFee" type="number" style="width:40%;min-width:300px;"></Input>
              </FormItem>
            </Col>
          </Row>
          <br>
          <br>
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">其他设置</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="参加资格：">
                <Checkbox v-model="formValidate.eligibility === 1">完成KYC可参与</Checkbox>
              </FormItem>
<!--              <FormItem label="拍卖规则：" prop="auctionRules">-->
<!--                <Input v-model="formValidate.auctionRules" type="textarea" autosize style="width:40%;min-width:300px;"></Input>-->
<!--              </FormItem>-->
              <FormItem label="拍卖规则" prop="auctionRules">
                <VueEditor
                  v-model="formValidate.auctionRules"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  style="width:100%;height:auto"
                ></VueEditor>
              </FormItem>
<!--              <FormItem label="取消拍卖规则：" prop="cancelAuctionRules">-->
<!--                <Input v-model="formValidate.cancelAuctionRules" type="textarea" autosize style="width:40%;min-width:300px;"></Input>-->
<!--              </FormItem>-->
              <FormItem label="取消拍卖规则" prop="cancelAuctionRules">
                <VueEditor
                  v-model="formValidate.cancelAuctionRules"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  style="width:100%;height:auto"
                ></VueEditor>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <br>
        <br>
      </Card>
    </Row>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  export default {
    components: { VueEditor },
    name: "auctionManagementDetail",
    data() {
      return {
        formValidate: {},
        auctionList:[]
      }
    },
    methods: {
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("image", file);
        this.$axios
          .post("/api/upload/image", formData)
          .then(result => {
            let url = result.data.data[0]; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
      },
      back(){
        this.$router.push("/auctionManagement");
      },
      // getCopyright(){
      //   this.$axios.get("/api/copyright/getCopyright")
      //     .then(res => {
      //       console.log(res.data);
      //       this.auctionList = res.data.data;
      //     })
      // },
      getAllCopyright() {
        // 获取版权代码，下拉框用
        this.$axios.get("/api/copyright/getAllCopyright")
          .then(res => {
            console.log("/copyright/getAllCopyright", res.data);
            this.auctionList = res.data.data;
          })
      },
      selectCopyrightAuctionById() {
        this.$axios.get("/api/copyrightAuction/selectCopyrightAuctionById?id=" + this.formValidate.id)
          .then(res => {
            console.log(res.data);
          })
      },
      handleTime(){
        let result = '';
        result += this.formValidate.startTime[0] + '-';
        result += this.formValidate.startTime[1] + '-';
        result += this.formValidate.startTime[2] + '  ';
        result += this.formValidate.startTime[3] + ':';
        if (this.formValidate.startTime[5]){
          result += this.formValidate.startTime[4] + ':';
          result += this.formValidate.startTime[5] + '';
        } else {
          result += this.formValidate.startTime[4]
        }
        let result2 = '';
        result2 += this.formValidate.endTime[0] + '-';
        result2 += this.formValidate.endTime[1] + '-';
        result2 += this.formValidate.endTime[2] + '  ';
        result2 += this.formValidate.endTime[3] + ':';
        if (this.formValidate.endTime[5]){
          result2 += this.formValidate.endTime[4] + ':';
          result2 += this.formValidate.endTime[5] + '';
        } else {
          result2 += this.formValidate.endTime[4]
        }
        this.formValidate.startTime = result;
        this.formValidate.endTime = result2;
        console.log(this.formValidate.endTime);
      }
    },
    mounted() {
      console.log(this.$route.params.row);
      this.formValidate =this.$route.params.row;
      this.handleTime();
      // this.selectCopyrightAuctionById();
      this.getAllCopyright();
    }
  }
</script>

<style scoped>

</style>
