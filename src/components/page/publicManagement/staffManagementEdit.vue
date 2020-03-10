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
  import {editSuccess, repeatEmail, repeatMobile} from "../../component/message/message";
  export default {
    name: "staffManagementEdit",
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
            form.append("adminId", this.formValidate.adminId);
            this.$axios.post("/api/admin/repetitionEmail", form)
              .then(res => {
                console.log(res.data);
                if(res.data.data.status === 1){ // 1为不重复，2为重复
                  this.$axios.post("/api/admin/repetitionMobile", form)
                    .then(res => {
                      console.log(res.data);
                      if(res.data.data.status === 1){
                        this.updateAdmin();
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
            this.$Message.error('表单验证错误!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      updateAdmin() {
        let form = new FormData();
        for (let i in this.formValidate){
          form.append(i, this.formValidate[i])
        }
        this.$axios.post("/api/admin/updateAdmin", form)
          .then(res => {
            this.loading.handleSubmit = false;
            console.log("/api/admin/updateAdmin", res.data);
            editSuccess()
            this.$router.push("/staffManagement")
          })
      }
    },
    mounted() {
      this.$axios.post("/api/role/listRole")
        .then(res => {
          console.log("/api/role/listRole", res.data);
          this.listRole = res.data.data;
        });
      this.formValidate = this.$route.params.param;
      this.formValidate.countryCode = this.$route.params.param.country_code;
      this.formValidate.nickName = this.$route.params.param.nick_name;
      this.formValidate.adminId = this.$route.params.param.admin_id;
      this.formValidate.roleId = this.$route.params.param.roleList[0].roleId;
    }
  }
</script>

<style scoped>

</style>
