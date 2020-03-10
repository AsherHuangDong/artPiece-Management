<template>
    <div>
      <Modal
        title="请输入分红总额"
        v-model="showDel"
        :closable="false"
        :mask-closable="false"
        @on-ok='sure'
        @on-cancel='cancel'
        >
        <Input v-model="data1" type="number"></Input>
    </Modal>
    </div>
</template>

<script>
  export default {
    name:'participationInProfitEditEdit',
    data(){
      return {
        showDel:true,
        id:'',
        copyrightCode:'',
        data1:0
      }
    },
    methods:{
      sure(){
        this.$route.params.self.getEdit(this);
        this.$router.go(-1);
      },
      cancel(){
        this.$router.go(-1);
      }
    },
    mounted(){
      this.id = this.$route.params.id
      this.copyrightCode = this.$route.params.copyrightCode
      console.log('fffffffffffff'+this.id)
      console.log(this.copyrightCode)
    }
  }
</script>

<style scoped>

</style>
