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
        form.append('type',1)
        this.$axios.post('/api/announcement/deleteNews',form)
        .then(res=>{
          this.$Message.success(this.$t('message.delete'))
           this.$router.push('/noticeManagement')
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
