<template>
    <div>
      <Modal
        title="修改交易状态"
        v-model="showDel"
        :closable="false"
        :mask-closable="false"
        @on-ok='sure'
        @on-cancel='cancel'
        >
        <p>确定{{msg}}该交易吗？</p>
    </Modal>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        showDel:true,
        id:'',
        msg:'开启'
      }
    },
    methods:{
      sure(){
        let form = new FormData()
        form.append('id',this.id)
        this.$axios.get('/api/transactionCopyright/updateCopyrightStatus?id=' + this.id)
        .then(res=>{
          this.$Message.success('已'+ this.msg)
           this.$router.push('/dealManagement')
        })
      },
      cancel(){
        this.$router.go(-1)
      }
    },
    mounted(){
      this.id = this.$route.query.id
      this.$route.query.status==0?this.msg = '开启':this.$route.query.status==1?this.msg = '关闭':''
    }
  }
</script>

<style scoped>

</style>
