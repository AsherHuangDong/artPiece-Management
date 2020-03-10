<template>
  <div class="content">
    <div class="centerBox">
      <div style="min-height:300px;padding:20px;position:relative;">
        <div v-html='contentObj.content'></div>
        <Button
          type="primary"
          @click="editService"
          style="position:absolute;bottom:20px;right:20px;"
        >{{$t('button.edit')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeLanguage } from "@/locale";
export default {
  name: "rotationDiagramAdd",
  data() {
    return {
      edit: false,
      contentObj: {},
    };
  },
  methods: {
    editService(){
      this.$router.push('/editPrivacy')
    },
     getData(){
      let form = new FormData()
      form.append('type',2)
      this.$axios.post('/api/othercontent/getOtherContent',form).then(res=>{
        this.contentObj = res.data.data
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
  width: 70%;
  margin: 20px auto;
  border: 1px solid #eee;
}
</style>
