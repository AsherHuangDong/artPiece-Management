<template>
    <div>
      <Modal
        title="删除确认"
        v-model="showDel"
        :closable="false"
        :mask-closable="false"
        :ok-text="$t('button.sure')"
        :cancel-text="$t('button.cancel')"
        @on-ok='sure'
        @on-cancel='cancel'
        >
        <p>确定删除该条记录吗？</p>
    </Modal>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        showDel:true,
        id:''
      }
    },
    methods:{
      sure(){
        let form = new FormData()
        form.append('id',this.id)
        this.$axios.get('/api/transactionCopyright/deleteTransactionCopyrightById?id=' + this.id)
        .then(res=>{
          this.$Message.success('删除成功')
           this.$router.push('/dealManagement')
        })
      },
      cancel(){
        this.$router.go(-1)
      }
    },
    mounted(){
      this.id = this.$route.query.id
    }
  }
</script>

<style scoped>

</style>
