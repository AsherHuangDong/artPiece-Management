<template>
  <div class="content">
    <div class="centerBox">
      <Form
        ref="formValidate"
        :label-width="80"
        style="margin:40px;"
        :model="formValidate"
        :rules="rules"
        label-position="left"
      >
        <FormItem :label="$t('others.content')" prop="content">
          <VueEditor
            v-model="formValidate.content"
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
  components: { VueEditor },
  data() {
    return {
      formValidate: {
        content:''
      },
      rules: {
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }]
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
      let _this = this
      let form = new FormData()
      this.$refs[name].validate(valid => {
        if (valid) {
          form.append('content', this.formValidate.content)
          form.append('type', 1)
          _this.$axios.post('/api/othercontent/editOtherContent',form)
          .then(res=>{
            _this.$router.go(-1)
          })
        }
      });
    },
    handleCancel() {
      this.$router.go(-1)
    },
    getData(){
      let form = new FormData()
      form.append('type',1)
      this.$axios.post('/api/othercontent/getOtherContent',form).then(res=>{
        this.formValidate.content = res.data.data.content
        console.log(this.formValidate.content)
      })
    }
  },
  mounted() {
    this.getData()
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
