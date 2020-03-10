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
          <Tree ref="tree" :data="formValidate.menuList" check-directly show-checkbox multiple></Tree>
        </FormItem>
        <FormItem>
          <Col span="12" offset="6">
            <Button type="primary" style="width:100px;" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="cancel" style="width:100px;margin-left: 8px">取消</Button>
          </Col>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<script>
  import {addAdminSuccess, formVerError} from "../../component/message/message";
  import {pleaseSelectPerm} from "../../component/message/message"
  export default {
    name: "roleManagementAdd",
    data() {
      return {
        formValidate: {
          roleDesc: '',
          roleName: '',
          menuList: [],
        },
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
                mm.push(item.permId.toString())
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
            this.$axios.post("/api/role/addRole", form)
              .then(res => {
                console.log(res.data);
                if(res.data.msg ==="成功"){
                  addAdminSuccess();
                  this.$router.push("/roleManagement")
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
      listPerm() {
        function arrDispose(arr) {
          for (let i = 0; i < arr.length; i++) {
            arr[i].title = arr[i].permName;
            if (arr[i].children){
              arrDispose(arr[i].children)
            }
          }
        }
        this.$axios.post("/api/perm/listPerm")
          .then(res => {
            console.log("/perm/listPerm", res.data);
            this.formValidate.menuList = res.data.data;
            arrDispose(this.formValidate.menuList);
            console.log(this.formValidate.menuList)
          })
      }
    },
    mounted() {
      this.listPerm();
    }
  }
</script>

<style scoped>

</style>
