<template>
  <Row>
    <Col span="12" offset="6">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formValidate.roleName" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDesc">
          <Input v-model="formValidate.roleDesc" placeholder="请输入角色描述"></Input>
        </FormItem>
        <FormItem label="权限" prop="role">
          <Tree ref="tree" :data="theLastDisposeMenuList" show-checkbox multiple></Tree>
        </FormItem>
        <FormItem>
          <Col span="12" offset="6">
            <Button type="primary" style="width:100px;" :loading="loading.handleSubmit" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel" style="width:100px;margin-left: 8px">取消</Button>
          </Col>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<script>
  import { pleaseSelectPerm, formVerError, editSuccess} from "../../component/message/message";
  import permListConstruct from "../../../perm/perm";
  export default {
    name: "roleManagementEdit",
    data() {
      return {
        loading: {
          handleSubmit: false
        },
        formValidate: {
          roleDesc: '',
          roleName: '',
          menuList: [],
        },
        theLastDisposeMenuList: [],
        ruleValidate: {
          roleName: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          roleDesc: [
            {required: true, message: 'The desc cannot be empty', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.$router.push("/roleManagement");
      },
      // 以下两个方法为表单验证
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let nn = this.$refs.tree.getCheckedAndIndeterminateNodes();
            let mm = [];
            if (nn.length !== 0) {
              for (let item of nn) {
                mm.push(item.permId)
              }
            } else {
              pleaseSelectPerm();
              return false
            }
            console.log("mm", mm);
            let form = new FormData();
            form.append("permId", mm);
            form.append("roleDesc", this.formValidate.roleDesc);
            form.append("roleName", this.formValidate.roleName);
            form.append("roleId ", this.$route.params.roleId);
            this.loading.handleSubmit = true;
            this.$axios.post("/api/role/updateRole", form)
              .then(res => {
                console.log(res.data);
                if(res.data.code === 0){
                  editSuccess();
                  this.$router.push("/roleManagement");
                  this.loading.handleSubmit = false
                }
              })
          } else {
            formVerError();
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      getRole() {
        let form = new FormData();
        form.append("roleId", this.$route.params.roleId);
        this.$axios.post("/api/role/getRole", form)
          .then(res => {
            console.log("/api/role/getRole", res.data.data);
            this.formValidate.roleDesc = res.data.data.roleDesc;
            this.formValidate.roleName = res.data.data.roleName;
            function arrDispose(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].children){
                  arrDispose(arr[i].children)
                } else {
                  arr[i].checked = res.data.data.permId.indexOf(arr[i].permId.toString()) !== -1;
                }
              }
            }
            arrDispose(this.formValidate.menuList);
            this.theLastDisposeMenuList = this.formValidate.menuList;
            console.log(this.formValidate.menuList);
          });
      },
    },
    mounted() {
      this.formValidate.menuList = permListConstruct();
      console.log(this.formValidate.menuList);
      this.getRole();
    }
  }
</script>

<style scoped>

</style>
