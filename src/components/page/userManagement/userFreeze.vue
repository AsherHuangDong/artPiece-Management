<template>
    <div>
      <Modal
        title="修改用户状态"
        v-model="showDel"
        :closable="false"
        :mask-closable="false"
        @on-ok='sure'
        @on-cancel='cancel'
        >
        <p>确定{{status==0?'冻结':'解冻'}}该用户吗？</p>
    </Modal>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        showDel:true,
        userId:'',
        status:''
      }
    },
    methods:{
      sure(){
        let form = new FormData()
        form.append('userId',this.userId)
        if (this.reason){
          form.append('reason',this.reason)
        }
        this.$axios.post('/api/user/editUserLoginStatus',form)
        .then(res=>{
          this.$Message.success('修改完成')
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
    }
  }
</script>

<style scoped>

</style>
