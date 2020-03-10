<template>
  <div>
    <!--    编辑版权-->
    <Row>
      <Form ref="saveCopyrightParams" :model="saveCopyrightParams" :rules="ruleValidate" :label-width="250">
        <Card dis-hover>
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">基本信息</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="版权代码：" prop="copyrightCode">
                <Input v-model="saveCopyrightParams.copyrightCode" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="版权名称：" prop="copyrightName">
                <Input v-model="saveCopyrightParams.copyrightName" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="国家：" prop="copyrightCountryId">
                <Select v-model="saveCopyrightParams.copyrightCountryId" style="width:40%;min-width:300px;">
                  <Option v-for="item in country" :value="item.id" :key="item.id">{{ item.countryName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="艺术家：" prop="artist">
                <Input v-model="saveCopyrightParams.artist" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="作曲家：" prop="composer">
                <Input v-model="saveCopyrightParams.composer" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="发行日期：" prop="time">
                <DatePicker :value="saveCopyrightParams.time" v-model="saveCopyrightParams.time"
                            style="width:40%;min-width:300px;" type="date" placeholder=""></DatePicker>
              </FormItem>
              <FormItem label="版权简介：" prop="copyrightIntroduction">
                <Input v-model="saveCopyrightParams.copyrightIntroduction" style="width:40%;min-width:300px;"
                       type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
              </FormItem>
              <FormItem label="版权图片：" prop="copyrightImg">
                <div @click="uploadImage"
                     style="width: 40%;min-width:300px;height: 100px;background: #515a6e 4px 5px;"></div>
                <input id="uploadImage" type="file" style="opacity: 0;">
              </FormItem>
            </Col>
          </Row>
          <br>
          <br>
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">Information</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="专业术语：">
                <Input v-model="saveCopyrightParams.term" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="过去12个月的版税(平均)：">
                <Input v-model="saveCopyrightParams.lastYearAverageRoyalties"
                       style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="作曲家：">
                <Input v-model="saveCopyrightParams.songwriter" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="编曲：">
                <Input v-model="saveCopyrightParams.arranger" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="版税经销商：">
                <Input v-model="saveCopyrightParams.royaltyDistributor" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="受托人：">
                <Input v-model="saveCopyrightParams.trustee" style="width:40%;min-width:300px;"></Input>
              </FormItem>
            </Col>
          </Row>
          <br>
          <br>
          <Row style="margin-top: -10px;">
            <Col span="24" style="line-height: 34px;">
              <div style="display: inline-block;height: 14px;border: 2px solid #515a6e;margin-right: 5px;"></div>
              <span style="font-weight: bold;">Details</span>
            </Col>
          </Row>
          <Divider style="margin: 10px 0;"/>
          <Row>
            <Col span="20" offset="1">
              <FormItem label="来源：">
                <Input v-model="saveCopyrightParams.sources" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="复制权：">
                <Input v-model="saveCopyrightParams.rightToCopy" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="商业表现：">
                <Input v-model="saveCopyrightParams.commercialPerformences" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="公共传播权：">
                <Input v-model="saveCopyrightParams.publicTransmissionRight" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="参展权：">
                <Input v-model="saveCopyrightParams.exhibbitionRight" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="分发权：">
                <Input v-model="saveCopyrightParams.rightToDistribute" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="出租权：">
                <Input v-model="saveCopyrightParams.rentalRight" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="二级工作权：">
                <Input v-model="saveCopyrightParams.secondaryWorkRight" style="width:40%;min-width:300px;"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12" offset="7">
              <Button :loading="loading.handleSubmit" @click="handleSubmit('saveCopyrightParams')"
                      style="margin-right: 5px;width:80px;" type="primary">保存
              </Button>
              <Button @click="cancel" style="margin-left: 5px;width:80px;" type="default">取消</Button>
            </Col>
          </Row>
          <br>
          <br>
        </Card>
      </Form>
    </Row>
  </div>
</template>

<script>
  import {timestampToTime} from "../../../assets/js/tool";
  import {addAdminSuccess} from "../../component/message/message";

  export default {
    name: "copyrightManagementAdd",
    data() {
      return {
        country: [],
        loading: {
          handleSubmit1: false,
          handleSubmit: false,
        },
        type: 0,
        saveCopyrightCountryParams: {
          countryName: '',
          url: ''
        },
        saveCopyrightParams: {
          time: new Date(),
          copyrightImg: ''
        },
        ruleValidate: {
          artist: [
            {required: true, message: 'The artist cannot be empty', trigger: 'blur'}
          ],
          composer: [
            {required: true, message: 'The composer cannot be empty', trigger: 'blur'}
          ],
          copyrightCode: [
            {required: true, message: 'The copyrightCode cannot be empty', trigger: 'blur'}
          ],
          copyrightCountryId: [
            {required: true, type: 'number', message: 'Please select the copyrightCountry', trigger: 'change'}
          ],
          copyrightImg: [
            {required: true, message: 'The copyrightImg cannot be empty', trigger: 'blur'}
          ],
          copyrightIntroduction: [
            {required: true, message: 'The copyrightIntroduction cannot be empty', trigger: 'blur'}
          ],
          copyrightName: [
            {required: true, message: 'The copyrightName cannot be empty', trigger: 'blur'}
          ],
          time: [
            {required: true, type: 'date', message: 'The time cannot be empty', trigger: 'blur'}
          ]
        },
        ruleValidate2: {
          countryName: [
            {required: true, message: 'The countryName cannot be empty', trigger: 'blur'}
          ],
          url: [
            {required: true, message: 'The url cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.$router.push("/copyrightManagement")
      },
      uploadImage2() {
        let self = this;
        let uploadImage = document.getElementById("uploadImage2")
        uploadImage.click();
        uploadImage.onchange = function () {
          console.log("change", this);
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("/api/upload/image", form)
            .then(res => {
              console.log(res.data.data[0]);
              self.saveCopyrightCountryParams.url = res.data.data[0];
            })
        }
      },
      uploadImage() {
        let self = this;
        let uploadImage = document.getElementById("uploadImage")
        uploadImage.click();
        uploadImage.onchange = function () {
          console.log("change", this);
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("/api/upload/image", form)
            .then(res => {
              console.log(res.data.data[0]);
              self.saveCopyrightParams.copyrightImg = res.data.data[0];
            })
        }
      },
      handleSubmit(name) {
        this.loading.handleSubmit = true;
        console.log(this.saveCopyrightParams, timestampToTime(this.saveCopyrightParams.time.valueOf()));
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveCopyrightParams.time = timestampToTime(this.saveCopyrightParams.time.valueOf());
            this.saveCopyright();
          } else {
            this.loading.handleSubmit = false;
            this.$Message.error('表单验证失败!');
          }
        })
      },
      saveCopyright() {
        let form = new FormData();
        for (let i in this.saveCopyrightParams) {
          form.append(i, this.saveCopyrightParams[i]);
        }
        form.delete("publishTime");
        // form.append("publishTime", this.saveCopyrightParams.time);
        this.$axios.post("/api/copyright/updateCopyright", form)
          .then(res => {
            this.loading.handleSubmit = false;
            console.log(res.data);
            addAdminSuccess();
            this.$router.push("/copyrightManagement");
          })
      },
      selectCopyrightById() {
        let url = "/api/copyright/selectCopyrightById?id=" + this.saveCopyrightParams.id;
        this.$axios.get(url)
          .then(res => {
            let d = res.data.data;
            console.log(url, res.data);
            this.saveCopyrightParams.copyrightImg = d[0].copyrightImg;
            this.saveCopyrightParams.artist = d[0].artist;
            this.saveCopyrightParams.composer = d[0].composer;
            this.saveCopyrightParams.copyrightCountryId = d[0].copyrightCountryId;
            this.saveCopyrightParams.copyrightIntroduction = d[0].copyrightIntroduction;
            this.saveCopyrightParams.copyrightName = d[0].copyrightName;
            let temp = '';
            temp += d[0].publishTime[0] + '-';
            temp += d[0].publishTime[1] + '-';
            temp += d[0].publishTime[2];
            this.saveCopyrightParams.time = temp;
            this.saveCopyrightParams.publishTime = temp;
            this.saveCopyrightParams.arranger = d[1].arranger;
            this.saveCopyrightParams.lastYearAverageRoyalties = d[1].lastYearAverageRoyalties;
            this.saveCopyrightParams.royaltyDistributor = d[1].royaltyDistributor;
            this.saveCopyrightParams.songwriter = d[1].songwriter;
            this.saveCopyrightParams.term = d[1].term;
            this.saveCopyrightParams.trustee = d[1].trustee;
            this.saveCopyrightParams.sources = d[2].sources;
            this.saveCopyrightParams.rightToCopy = d[2].rightToCopy;
            this.saveCopyrightParams.commercialPerformences = d[2].commercialPerformences;
            this.saveCopyrightParams.publicTransmissionRight = d[2].publicTransmissionRight;
            this.saveCopyrightParams.exhibbitionRight = d[2].exhibbitionRight;
            this.saveCopyrightParams.rightToDistribute = d[2].rightToDistribute;
            this.saveCopyrightParams.rentalRight = d[2].rentalRight;
            this.saveCopyrightParams.secondaryWorkRight = d[2].secondaryWorkRight;
            console.log(this.saveCopyrightParams);
          })
      },
    },
    mounted() {
      this.type = this.$route.params.type;
      if (this.type === 2) {
        this.country = this.$route.params.country; // country下拉菜单
        console.log(this.country);
      }
      console.log(this.$route.params.row);
      console.log(this.$route.params.country);
      this.saveCopyrightParams = this.$route.params.row;
      this.country = this.$route.params.country;
      this.selectCopyrightById();
    }
  }
</script>


<style scoped>

</style>
