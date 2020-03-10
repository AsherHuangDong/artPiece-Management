<template>
  <div>
    <delete-modal></delete-modal>
  </div>
</template>

<script>
  import deleteModal from "../../component/modal/deleteModal";
  export default {
    name: "copyrightManagementDelete",
    components: {deleteModal},
    data() {
      return {
      }
    },
    methods: {
    },
    mounted: function () {
      let self = this;
      console.log(self.$route);
      this.$store.commit("deleteModal/setDeleteParams", {
        url: self.$route.params.url,
        id: self.$route.params.id,
        callback: self.$route.params.callback,
        method: self.$route.params.method
      })
    }
  }
</script>

<style scoped>

</style>
