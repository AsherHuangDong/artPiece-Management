<template>
  <div class="content">
    <div class="centerBox">
      <Form
        ref="formValidate"
        :label-width="100"
        style="margin:40px;"
        :model="formValidate"
        :rules="rules"
        label-position="left"
      >
        <FormItem :label="$t('notice.title')" prop="title">
          <Input type="text" v-model="formValidate.title"></Input>
        </FormItem>
        <FormItem :label="$t('notice.lan')" prop="languageList">
          <CheckboxGroup v-model="formValidate.languageList">
            <Checkbox
              :label="item.id"
              v-for="item in lanList"
              :key="item.id"
              style="margin-right:20px;"
            >{{item.language}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem :label="$t('notice.content')" prop="detail">
          <VueEditor
            v-model="formValidate.detail"
            useCustomImageHandler
            @image-added="handleImageAdded"
            style="width:100%;height:auto;"
          ></VueEditor>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('formValidate')">{{$t('button.save')}}</Button>
          <Button
            @click="handleCancel('formValidate')"
            style="margin-left: 40px"
          >{{$t('button.cancel')}}</Button>
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
    return {
      lanList: [],
      formValidate: {
        id:'',
        languageList:[],
        title:'',
        detail:''
      },
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        languageList: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择语言",
            trigger: "change"
          }
        ],
        detail: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
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
    submit(name) {
      let _this = this;
      let form = new FormData();
      this.$refs[name].validate(valid => {
        if (valid) {
          form.append("id", this.formValidate.id);
          form.append("announcementTittle", this.formValidate.title);
          form.append("announcementContent", this.formValidate.detail);
          form.append("languageId", this.formValidate.languageList);
          form.append("type", 1);
          _this.$axios.post("/api/announcement/editAnnouncement", form).then(res => {
            _this.$Message.success(_this.$t('message.edit'));
            _this.$router.go(-1);
          });
        }
      });
    },
    handleCancel() {
      this.$router.go(-1);
    },
    getLanguage() {
      this.$axios.post("/api/language/getLanguage", {}).then(res => {
        this.lanList = res.data.data;
      });
    },
    getShowData(){
      let form = new FormData()
      form.append('id',this.formValidate.id)
      this.$axios.post('/api/announcement/getEditAnnouncement',form)
      .then(res=>{
        this.formValidate.title = res.data.data.announcementTittle
        this.formValidate.detail = res.data.data.announcementContent
        this.formValidate.languageList = res.data.data.languages
      })
    }
  },
  mounted() {
    this.formValidate.id = this.$route.query.id
    this.getLanguage();
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