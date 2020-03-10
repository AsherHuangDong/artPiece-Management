<template>
  <div>
<!--    添加版权国家-->
    <Row v-if="type === 1">
      <Form ref="saveCopyrightCountryParams" :model="saveCopyrightCountryParams" :rules="ruleValidate2" :label-width="250">
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
              <FormItem label="国家名称：" prop="countryName">
                <Input v-model="saveCopyrightCountryParams.countryName" style="width:40%;min-width:300px;"></Input>
              </FormItem>
              <FormItem label="版权图片：" prop="url">
                <div @click="uploadImage2" style="width: 40%;min-width:300px;height: 100px;background: #515a6e url('http://client.yimei.talkingcake.cn/img/erweima.gif') no-repeat 4px 5px;"></div>
                <input id="uploadImage2" type="file" style="opacity: 0;">
              </FormItem>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="12" offset="7">
              <Button :loading="loading.handleSubmit1" @click="handleSubmit1('saveCopyrightCountryParams')" style="margin-right: 5px;width:80px;" type="primary">保存</Button>
              <Button @click="cancel" style="margin-left: 5px;width:80px;" type="default">取消</Button>
            </Col>
          </Row>
          <br>
          <br>
        </Card>
      </Form>
    </Row>
<!--    添加版权-->
    <Row v-if="type === 2">
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
                <DatePicker v-model="saveCopyrightParams.time" style="width:40%;min-width:300px;" type="date" placeholder=""></DatePicker>
              </FormItem>
              <FormItem label="版权简介：" prop="copyrightIntroduction">
                <Input v-model="saveCopyrightParams.copyrightIntroduction" style="width:40%;min-width:300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
              </FormItem>
              <FormItem label="版权图片：" prop="copyrightImg">
                <div @click="uploadImage" style="width: 40%;min-width:300px;height: 100px;background: #515a6e url('http://client.yimei.talkingcake.cn/img/erweima.gif') no-repeat 4px 5px;"></div>
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
                <Input v-model="saveCopyrightParams.lastYearAverageRoyalties" style="width:40%;min-width:300px;"></Input>
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
            <Button :loading="loading.handleSubmit" @click="handleSubmit('saveCopyrightParams')" style="margin-right: 5px;width:80px;" type="primary">保存</Button>
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
          copyrightImg: ''
        },
        ruleValidate: {
          artist: [
            { required: true, message: 'The artist cannot be empty', trigger: 'blur' }
          ],
          composer: [
            { required: true, message: 'The composer cannot be empty', trigger: 'blur' }
          ],
          copyrightCode: [
            { required: true, message: 'The copyrightCode cannot be empty', trigger: 'blur' }
          ],
          copyrightCountryId: [
            { required: true, type: 'number', message: 'Please select the copyrightCountry', trigger: 'change' }
          ],
          copyrightImg: [
            { required: true, message: 'The copyrightImg cannot be empty', trigger: 'blur' }
          ],
          copyrightIntroduction: [
            { required: true, message: 'The copyrightIntroduction cannot be empty', trigger: 'blur' }
          ],
          copyrightName: [
            { required: true, message: 'The copyrightName cannot be empty', trigger: 'blur' }
          ],
          time: [
            { required: true,type: 'date', message: 'The time cannot be empty', trigger: 'blur' }
          ]
        },
        ruleValidate2: {
          countryName: [
            { required: true, message: 'The countryName cannot be empty', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'The url cannot be empty', trigger: 'blur' }
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
      handleSubmit1 (name) {
        this.loading.handleSubmit1 = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveCopyrightCountry();
          } else {
            this.loading.handleSubmit1 = false;
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleSubmit (name) {
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
      saveCopyrightCountry() {
        let form = new FormData();
        form.append("countryName", this.saveCopyrightCountryParams.countryName);
        form.append("url", this.saveCopyrightCountryParams.url);
        this.$axios.post("/api/copyrightCountry/saveCopyrightCountry",form)
          .then(res => {
            console.log("/api/copyrightCountry/saveCopyrightCountry", res.data);
            if(res.data.msg === '成功'){
              addAdminSuccess();
              this.loading.handleSubmit1 = false;
              this.$router.push("/copyrightManagement");
            }
          })
      },
      saveCopyright() {
        let form = new FormData();
        for(let i in this.saveCopyrightParams){
          form.append(i,this.saveCopyrightParams[i]);
        }
        this.$axios.post("/api/copyright/saveCopyright", form)
          .then(res => {
            this.loading.handleSubmit = false;
            console.log(res.data);
            addAdminSuccess();
            this.$router.push("/copyrightManagement");
          })
      }
    },
    mounted() {
      this.type = this.$route.params.type;
      if (this.type === 2){
        this.country = this.$route.params.country; // country下拉菜单
        console.log(this.country);
      }
    }
  }
</script>

<style scoped>

</style>
