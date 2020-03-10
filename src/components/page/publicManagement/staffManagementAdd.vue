<template>
  <Row>
    <Col span="12" offset="6">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
        <FormItem label="员工昵称" prop="nickName">
          <Input v-model="formValidate.nickName" placeholder="请输入员工昵称"></Input>
        </FormItem>
        <FormItem label="手机国家编码" prop="countryCode">
          <Select v-model="formValidate.countryCode" placeholder="请选择手机国家编码">
            <Option value="+86">+86</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号码" prop="mobile">
          <Input v-model="formValidate.mobile" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mailbox">
          <Input v-model="formValidate.mailbox" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="登录密码" prop="password">
          <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="角色" prop="roleId">
          <RadioGroup v-model="formValidate.roleId">
            <Radio v-for="item in listRole" :key="item.roleId" :label="item.roleId">
              <span>{{item.roleName}}</span>
            </Radio>
          </RadioGroup>
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
  import {formVerError, addAdminSuccess, repeatEmail, repeatMobile} from "../../component/message/message";
  export default {
    name: "staffManagementAdd",
    data() {
      return {
        listRole: [],
        loading: {
          handleSubmit: false
        },
        formValidate: {
          nickName: '',
          mailbox: '',
          countryCode: '',
          mobile: '',
          roleId: '',
          password: ''
        },
        ruleValidate: {
          nickName: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: 'The phone cannot be empty', trigger: 'blur'}
          ],
          mailbox: [
            {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
            {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
          ],
          countryCode: [
            {required: true, message: 'Please select the city', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please select the city', trigger: 'blur'}
          ],
          roleId: [
            {required: true, message: 'Choose at least one role'},
          ]
        }
      }
    },
    methods: {
      cancel() {
        this.$router.push("/staffManagement");
      },
      // 以下两个方法为表单验证
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading.handleSubmit = true;
            console.log(this.formValidate);
            // 判断邮箱和手机号是否重复
            let form = new FormData();
            form.append("mailbox", this.formValidate.mailbox);
            form.append("countryCode", this.formValidate.countryCode);
            form.append("mobile", this.formValidate.mobile);
            this.$axios.post("/api/admin/repetitionEmail", form)
              .then(res => {
                console.log(res.data);
                if(res.data.data.status === 1){ // 1为不重复，2为重复
                  this.$axios.post("/api/admin/repetitionMobile", form)
                    .then(res => {
                      console.log(res.data);
                      if(res.data.data.status === 1){
                        this.addAdmin();
                      } else {
                        repeatMobile();
                        this.loading.handleSubmit = false;
                        return null;
                      }
                    })
                } else {
                  repeatEmail();
                  this.loading.handleSubmit = false;
                  return null;
                }
              });
          } else {
            formVerError();
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      addAdmin() {
        let form = new FormData();
        for (let i in this.formValidate){
          form.append(i, this.formValidate[i])
        }
        this.$axios.post("/api/admin/addAdmin", form)
          .then(res => {
            this.loading.handleSubmit = false;
            console.log(res.data);
            for (let i in this.formValidate){
              this.formValidate[i] = ''
            }
            addAdminSuccess();
          })
      }
    },
    mounted() {
      this.$axios.post("/api/perm/listPerm")
        .then(res => {
          console.log("/api/perm/listPerm", res.data);
        });
      this.$axios.post("/api/role/listRole")
        .then(res => {
          console.log("/api/role/listRole", res.data);
          this.listRole = res.data.data;
        })
    }
  }
</script>

<style scoped>

</style>
