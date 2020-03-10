<template>
  <div class="content">
    <div class="centerBox">
      <Form ref="banner" :label-width="100" style="margin:40px;" :model="banner" :rules="rules">
        <FormItem :label="$t('banners.title')" prop="bannerTittle">
          <Input type="text" v-model="banner.bannerTittle"></Input>
        </FormItem>
        <FormItem :label="$t('banners.url')" prop="bannerImgUrl">
          <Input type="text" v-model="banner.bannerImgUrl" disabled></Input>
        </FormItem>
        <FormItem :label="$t('banners.sort')" prop="sort">
          <Input type="number" v-model="banner.sort" disabled></Input>
        </FormItem>
        <FormItem :label="$t('banners.upLoadImg')" prop="imgUrl">
          <Upload action="/api/upload/image" :on-success="success">
            <Button icon="ios-cloud-upload-outline">请选择要上传的图片</Button>
            <span style="color:#ff9900;">请支持JPG/JPEG/PNG格式，大小不要超过5M</span>
          </Upload>
          <div>
            <img :src="banner.bannerImgUrl" alt width=500/>
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('banner')">{{$t('button.save')}}</Button>
          <Button @click="handleCancel('banner')" style="margin-left: 40px">{{$t('button.cancel')}}</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "rotationDiagramAdd",
  data() {
    return {
      banner: {
        bannerImgUrl: "",
        bannerTittle: "",
        sort: ""
      },
      rules: {
        bannerTittle: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        bannerImgUrl: [
          { required: true, message: "访问路径不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getData() {
      let form = new FormData()
      form.append('id',this.banner.id)
      this.$axios.post("/api/banner/getEditBanner",form).then(res => {
        this.banner = res.data.data[0]
      });
    },
    success(response, file, fileList) {
      this.banner.bannerImgUrl = response.data[0];
    },
    submit(name) {
      let _this = this;
      let form = new FormData();
      form.append("bannerImgUrl", this.banner.bannerImgUrl);
      form.append("bannerTittle", this.banner.bannerTittle);
      // form.append("sort", this.banner.sort);
      form.append("id", this.banner.id);
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.$axios.post("/api/banner/editBanner", form).then(res => {
            if (res.data.code == 0) {
              _this.$Message.success(_this.$t('message.edit'));
              _this.$router.go(-1);
            } else {
              _this.$Message.error(res.data.msg);
            }
          });
        }
      });
    },
    handleCancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.banner.id = this.$route.query.id;
    this.getData();
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
