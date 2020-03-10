<template>
  <div class="content">
    <div class="centerBox">
      <Form
        ref="news"
        :label-width="100"
        style="margin:40px;"
        :model="news"
        :rules="rules"
        label-position="left"
      >
        <FormItem :label="$t('news.title')" prop="newsTittle">
          <Input type="text" v-model="news.newsTittle"></Input>
        </FormItem>
        <FormItem :label="$t('news.img')" prop="newsImgUrl">
          <Upload
            :on-success="success"
            action="/api/upload/image"
            :max-size="5120"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :show-upload-list="false"
          >
            <Button icon="ios-cloud-upload-outline">请选择要上传的图片</Button>
            <span style="color:#ff9900;">请支持JPG/JPEG/PNG格式，大小不要超过5M</span>
          </Upload>
          <div style='margin-top:10px;'>
            <img :src='news.newsImgUrl' alt />
          </div>
        </FormItem>
        <FormItem :label="$t('news.lan')" prop="languageList">
          <CheckboxGroup v-model="news.languageList">
            <Checkbox
              :label="item.id"
              v-for="item in lanList"
              :key="item.id"
              style="margin-right:20px;"
            >{{item.language}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem :label="$t('news.content')" prop="newsContent">
          <VueEditor
            v-model="news.newsContent"
            useCustomImageHandler
            @image-added="handleImageAdded"
            style="width:100%;height:auto;"
          ></VueEditor>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('news')">{{$t('button.save')}}</Button>
          <Button @click="handleCancel('news')" style="margin-left: 40px">{{$t('button.cancel')}}</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "rotationDiagramAdd",
  components: { VueEditor },
  data() {
    const validateUpload = (rule, value, callback) => {
      if (!this.news.newsImgUrl) {
        callback(new Error(this.$t("upLoadImgMessage.require")));
      } else {
        callback();
      }
    };
    let _this = this;
    return {
      uploadList: [],
      lanList: [],
      news: {
        id:'',
        newsTittle:'',
        newsImgUrl:'',
        languageList:[],
        newsContent:''
      },
      rules: {
        newsTittle: [
          {
            required: true,
            message: _this.$t("news.titleRequire"),
            trigger: "blur"
          }
        ],
        newsImgUrl: [
          { required: true, validator: validateUpload, trigger: "change" }
        ],
        languageList: [
          {
            required: true,
            type: "array",
            min: 1,
            message: _this.$t("news.lanRequire"),
            trigger: "change"
          }
        ],
        newsContent: [
          {
            required: true,
            message: _this.$t("news.contentRequire"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getLanguage(){
      this.$axios.post('/api/language/getLanguage',{})
      .then(res=>{
        this.lanList = res.data.data
      })
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);
      this.$axios
        .post("/api/upload/image", formData)
        .then(result => {
          let url = result.data[0]; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    success(response, file, fileList) {
      console.log("response", file);
      this.news.newsImgUrl = response.data[0];
    },
    handleFormatError(file) {
      this.$message.warning({
        title: this.$t("upLoadImgMessage.format")
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: this.$t("upLoadImgMessage.size")
      });
    },
    submit(name) {
      let _this = this
      let form = new FormData()
      form.append('id', this.news.id)
      form.append('languageList', this.news.languageList)
      form.append('newsContent', this.news.newsContent)
      form.append('newsImgUrl', this.news.newsImgUrl)
      form.append('newsTittle', this.news.newsTittle)
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.$axios.post('/api/news/editNews', form)
          .then(res=>{
            _this.$Message.success(_this.$t('message.edit'))
            _this.$router.go(-1);
          })
        }
      });
    },
    handleCancel() {
      this.$router.go(-1);
    },
    getShowData(){
      let form = new FormData()
      form.append('id',this.news.id)
      this.$axios.post('/api/news/getEditNews',form)
      .then(res=>{
        this.news = res.data.data
        this.news.languageList = res.data.data.languages
      })
    }
  },
  mounted() {
    this.getLanguage()
    this.news.id = this.$route.query.id
    this.getShowData()
  }
};
</script>

<style scoped>
.centerBox {
  width: 80%;
  margin: 20px auto;
  border: 1px solid #eee;
}
</style>
