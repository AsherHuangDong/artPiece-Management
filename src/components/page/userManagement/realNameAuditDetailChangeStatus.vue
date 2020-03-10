<template>
    <div>
      <Modal
        title="审核"
        v-model="showDel"
        :closable="false"
        :mask-closable="false"
        @on-ok='sure'
        @on-cancel='cancel'
        >
        <p>确定{{status==1?'通过':'驳回'}}该申请吗？</p>
    </Modal>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        showDel:true,
        userId:'',
        status:'',
        reason:''
      }
    },
    methods:{
      sure(){
        let form = new FormData()
        form.append('status',this.status)
        form.append('kind',1)
        form.append('userId',this.userId)
        if (this.reason){
          form.append('reason',this.reason)
        }
        this.$axios.post('/api/user/setVerifyById',form)
        .then(res=>{
          this.$Message.success('审核完成')
          this.$router.go(-1)
        })
      },
      cancel(){
        this.$router.go(-1)
      }
    },
    mounted(){
      this.userId = this.$route.query.id
      this.status = this.$route.query.status
      if (this.$route.query.reason){
        this.reason = this.$route.query.reason
      }
    }
  }
</script>

<style scoped>

</style>
