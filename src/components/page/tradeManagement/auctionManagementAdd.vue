<template>
  <div>
    <Row>
      <Card dis-hover>
        <Form
          label-position="right"
          :label-width="250"
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
        >
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div
                style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"
              ></div>
              <span style="font-weight: bold;">基本信息</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;" />
          <Row>
            <Col span="20" offset="1">
              <FormItem label="拍卖版权代码：" prop="copyrightCode">
                <Select
                  @on-change="copyrightCodeChange"
                  v-model="formValidate.copyrightId"
                  style="width:40%;min-width:300px;"
                  label-in-value
                >
                  <Option
                    v-for="(item,index) in auctionList"
                    :value="item.id"
                    :key="index"
                  >{{item.copyrightCode}}</Option>
                </Select>
              </FormItem>
              <FormItem label="拍卖类型：" prop="type">
                <Select
                  v-model="formValidate.type"
                  style="width:40%;min-width:300px;"
                  label-in-value
                >
                  <Option value="1">拍卖</Option>
                  <Option value="2">抢购</Option>
                </Select>
              </FormItem>
              <FormItem label="发行总量：" prop="issuanceTotalAmount">
                <Input
                  v-model="formValidate.issuanceTotalAmount"
                  type="number"
                  style="width:40%;min-width:300px;"
                ></Input>
              </FormItem>
              <FormItem label="起拍价格：" prop="startingPrice">
                <Input
                  v-model="formValidate.startingPrice"
                  type="number"
                  style="width:40%;min-width:300px;"
                ></Input>
              </FormItem>
              <FormItem label="开始时间：" prop="stime">
                <DatePicker
                  :options="option1"
                  :value="formValidate.stime"
                  v-model="formValidate.stime"
                  type="date"
                  style="width:20%;min-width:150px;"
                  placeholder="Select date"
                ></DatePicker>
                <TimePicker
                  :value="time1"
                  v-model="time1"
                  type="time"
                  placeholder="Select time"
                  style="width:20%;min-width:150px;"
                ></TimePicker>
              </FormItem>
              <FormItem label="结束时间：" prop="etime">
                <DatePicker
                  :options="option2"
                  :value="formValidate.etime"
                  v-model="formValidate.etime"
                  type="date"
                  style="width:20%;min-width:150px;"
                  placeholder="Select date"
                ></DatePicker>
                <TimePicker
                  :value="time2"
                  v-model="time2"
                  type="time"
                  placeholder="Select time"
                  style="width:20%;min-width:150px;"
                ></TimePicker>
              </FormItem>
            </Col>
          </Row>
          <br />
          <br />
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div
                style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"
              ></div>
              <span style="font-weight: bold;">拍卖参数</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;" />
          <Row>
            <Col span="20" offset="1">
              <FormItem label="价格精度：" prop="priceAccuracy">
                <Input
                  v-model="formValidate.priceAccuracy"
                  type="number"
                  style="width:40%;min-width:300px;"
                >
                  <span slot="append">位小数</span>
                </Input>
              </FormItem>
              <FormItem label="单笔交易最小拍卖金额：" prop="minAuctionAmount">
                <Input
                  v-model="formValidate.minAuctionAmount"
                  type="number"
                  style="width:40%;min-width:300px;"
                >
                  <span slot="append">AP</span>
                </Input>
              </FormItem>
              <FormItem label="单笔交易最小拍卖数量：" prop="minAuctionNumber">
                <Input
                  v-model="formValidate.minAuctionNumber"
                  type="number"
                  style="width:40%;min-width:300px;"
                ></Input>
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
                <Input
                  v-model="formValidate.freeHandlingFee"
                  type="number"
                  style="width:40%;min-width:300px;"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <br />
          <br />
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div
                style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"
              ></div>
              <span style="font-weight: bold;">其他设置</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;" />
          <Row>
            <Col span="20" offset="1">
              <FormItem label="参加资格：" prop="auctionRules">
                <Checkbox v-model="formValidate.eligibility">完成KYC可参与</Checkbox>
              </FormItem>
              <!--              <FormItem label="拍卖规则：" prop="auctionRules">-->
              <!--                <Input v-model="formValidate.auctionRules" type="textarea" autosize style="width:40%;min-width:300px;"></Input>-->
              <!--              </FormItem>-->
              <FormItem label="拍卖结束前" prop="canNotCancelTime">
                <Input
                  v-model="formValidate.canNotCancelTime"
                  type="number"
                  style="width:100px;margin-right:5px;"
                ></Input>分钟不可撤单
              </FormItem>
              <FormItem label="拍卖结束前" prop="sendEmailTime">
                <Input
                  v-model="formValidate.sendEmailTime"
                  type="number"
                  style="width:100px;margin-right:5px;"
                ></Input>分钟向未成交用户发送短信/邮件提醒
              </FormItem>
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
          <Row>
            <Col span="12" offset="7">
              <Button
                @click="handleSubmit('formValidate')"
                style="margin-right: 5px;width:80px;"
                type="primary"
              >保存</Button>
              <Button @click="cancel" style="margin-left: 5px;width:80px;" type="default">取消</Button>
            </Col>
          </Row>
        </Form>
        <br />
        <br />
      </Card>
    </Row>
  </div>
</template>

<script>
import { timestampToDate, timestampToTime } from "../../../assets/js/tool";
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  name: "auctionManagementAdd",
  data() {
    return {
      time1: "",
      time2: "",
      auctionList: [],
      formValidate: {
        eligibility: false
      },
      ruleValidate: {
        auctionRules: [
          {
            required: true,
            message: "The auctionRules cannot be empty",
            trigger: "blur"
          }
        ],
        cancelAuctionRules: [
          {
            required: true,
            message: "The cancelAuctionRules  cannot be empty",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "The copyrightType  cannot be empty",
            trigger: "blur"
          }
        ],
        copyrightCode: [
          {
            required: true,
            message: "The copyrightCode  cannot be empty",
            trigger: "blur"
          }
        ],
        copyrightId: [
          {
            required: true,
            message: "The copyrightId  cannot be empty",
            trigger: "blur"
          }
        ],
        eligibility: [
          {
            required: true,
            message: "The eligibility  cannot be empty",
            trigger: "blur"
          }
        ],
        etime: [
          {
            required: true,
            type: "date",
            message: "The etime  cannot be empty",
            trigger: "blur"
          }
        ],
        freeHandlingFee: [
          {
            required: true,
            message: "The freeHandlingFee  cannot be empty",
            trigger: "blur"
          }
        ],
        handlingFee: [
          {
            required: true,
            message: "The handlingFee  cannot be empty",
            trigger: "blur"
          }
        ],
        issuanceTotalAmount: [
          {
            required: true,
            message: "The issuanceTotalAmount  cannot be empty",
            trigger: "blur"
          }
        ],
        minAuctionAmount: [
          {
            required: true,
            message: "The minAuctionAmount  cannot be empty",
            trigger: "blur"
          }
        ],
        minAuctionNumber: [
          {
            required: true,
            message: "The minAuctionNumber  cannot be empty",
            trigger: "blur"
          }
        ],
        priceAccuracy: [
          {
            required: true,
            message: "The priceAccuracy  cannot be empty",
            trigger: "blur"
          }
        ],
        startingPrice: [
          {
            required: true,
            message: "The startingPrice  cannot be empty",
            trigger: "blur"
          }
        ],
        stime: [
          {
            required: true,
            type: "date",
            message: "The stime   cannot be empty",
            trigger: "blur"
          }
        ],
        canNotCancelTime: [
          {
            required: true,
            message: "The time cannot be empty",
            trigger: "blur"
          }
        ],
        sendEmailTime: [
          {
            required: true,
            message: "The time cannot be empty",
            trigger: "blur"
          }
        ],
        percentage: [
          {
            required: true,
            message: "The percentage cannot be empty",
            trigger: "blur"
          }
        ]
      },
      option1: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      option2: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
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
    cancel() {
      this.$router.push("/auctionManagement");
    },
    copyrightCodeChange(e) {
      console.log(e);
      this.formValidate.copyrightCode = e.label;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          this.saveCopyrightAuction();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    //
    saveCopyrightAuction() {
      let stime = Number(this.formValidate.stime) + Number(this.time1);
      let etime = Number(this.formValidate.etime) + Number(this.time2);
      if (stime > etime) {
        this.$Message.error("时间选择有误！！");
      } else {
        this.formValidate.stime =
          timestampToDate(Number(this.formValidate.stime)) + this.time1;
        this.formValidate.etime =
          timestampToDate(Number(this.formValidate.etime)) + this.time2;
        let form = new FormData();
        for (let i in this.formValidate) {
          form.append(i, this.formValidate[i]);
        }
        console.log(form);
        form.delete("eligibility");
        if (this.formValidate.eligibility === true) {
          form.append("eligibility", "1");
        } else {
          form.append("eligibility", "0");
        }
        this.$axios
          .post("/api/copyrightAuction/saveCopyrightAuction", form)
          .then(res => {
            console.log("/api/copyrightAuction/saveCopyrightAuction", res.data);
            if (res.data.msg === '成功') {
              this.$router.push('/auctionManagement')
            }
          });
      }
    },
    // getAllCopyright() {
    //   // 获取版权代码，下拉框用
    //   this.$axios.get("/api/copyright/getAllCopyright")
    //     .then(res => {
    //       console.log("/copyright/getAllCopyright", res.data);
    //       this.auctionList = res.data.data;
    //     })
    // },
    getCopyright() {
      this.$axios.get("/api/copyright/getCopyright").then(res => {
        console.log(res.data);
        this.auctionList = res.data.data;
      });
    }
  },
  mounted() {
    this.getCopyright();
  }
};
</script>

<style scoped>
</style>
