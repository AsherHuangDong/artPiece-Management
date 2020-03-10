<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="layout-logo">
          <!-- <span>币改</span> -->
          <!--<img src="/static/img/logo.png" style="width:40px;height:40px;position:relative;top:-5px;left:-15px;">-->
          <span class="zong_title" style="position:relative;left:-15px;">{{$t('login.projectName')}}</span>
        </div>
        <div class="layout-nav">
          <ul>
            <li class="nav-item">
              <Select style="width:200px" @on-change="lanClick" v-model='lanId'>
                <Option
                  v-for="item in lanList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </li>
            <li class="nav-item">
              <img
                src="/static/img/tuichu.png"
                style="position:relative;top:-5px;width:16px;height:16px;cursor:pointer;"
                @click="logout"
              />
            </li>
            <li class="nav-item">
              <span>{{user_account}}</span>
            </li>
          </ul>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger class="sider">
          <Menu theme="dark" width="auto" :accordion="true" :active-name="activeName">
            <template v-for="item of list">
              <MenuItem
                :to="item.value"
                :name="item.value"
                :key="item.value"
                v-if="!item.children"
              >{{item.title}}</MenuItem>
              <Submenu :name="item.value" :key="item.value" v-if="item.children">
                <template slot="title">{{item.title}}</template>
                <MenuItem
                  :to="child.value"
                  :name="child.value"
                  v-for="child of item.children"
                  :key="child.value"
                >{{child.title}}</MenuItem>
              </Submenu>
            </template>
          </Menu>
        </Sider>
        <Layout id="cont_layout">
          <Content>
            <!-- 路由 -->
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal v-model="isshowsetmima" width="360" :closable="true" id="mol" :mask-closable="true">
      <p slot="header" style="text-align:center">
        <span style="font-size:18px;">修改密码</span>
      </p>
      <div style="width:300px;margin:0 auto;">
        <p style="display:flex;justify-content:space-between;flex-wrap:nowrap;margin-top:15px;">
          <span>原密码：</span>
          <Input v-model="obj.password" type="password" style="width:200px;"></Input>
        </p>
        <p style="display:flex;justify-content:space-between;flex-wrap:nowrap;margin-top:15px;">
          <span>新密码：</span>
          <Input v-model="obj.newPassword" type="password" style="width:200px;"></Input>
        </p>
        <p style="display:flex;justify-content:space-between;flex-wrap:nowrap;margin-top:15px;">
          <span>确认密码：</span>
          <Input
            v-model="obj.reNewPassword"
            type="password"
            @on-blur="toyanzheng"
            style="width:200px;"
          ></Input>
        </p>
      </div>
      <div slot="footer" style="text-align:center;margin-top:25px;margin-bottom:10px;">
        <span class="btn_quxiao" @click="cancel1">取消</span>
        <span class="btn_queding" @click="confirm1">确定</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import permListConstruct from "../../perm/perm";
import { changeLanguage } from "@/locale";
export default {
  data() {
    return {
      lanMarkFlag: false,
      lanId: '',
      obj: {},
      lanList: [
        {
          id: 'zh_CN',
          name: "简体中文"
        },
        {
          id: 'en_US',
          name: "en_US"
        }
      ],
      activeName: "/useradmin",
      user_account: "",
      actindex: 0,
      isshowsetmima: false,
      authority: new Map(),
      list: [
        {
          value: "/productadmin",
          name: "productadmin",
          title: "商品管理"
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      sessionStorage.setItem("path", to.path);
      this.activeName = sessionStorage.getItem("path");
      console.log("ccccc==" + this.activeName);
    }
  },
  methods: {
    lanMarkShow() {
      this.lanMarkFlag = true;
    },
    lanClick(lan) {
      console.log('ppp' + lan)
      this.lanList.forEach(element => {
        if (element.id === lan) {
          this.lan = element.name;
          this.lanId = lan;
        }
      });
      changeLanguage(lan);
    },
    setmima() {
      this.isshowsetmima = true;
    },
    toyanzheng() {
      if (this.obj.reNewPassword !== this.obj.newPassword) {
        this.$Message.error("两次密码输入不一致");
        return false;
      }
    },
    cancel1() {
      this.isshowsetmima = false;
      this.obj = {};
    },
    confirm1() {
      if (!this.obj.password) {
        this.$Message.error("请输入原密码");
        return false;
      }
      if (!this.obj.newPassword) {
        this.$Message.error("请输入新密码");
        return false;
      }
      if (!this.obj.reNewPassword) {
        this.$Message.error("请再次输入新密码");
        return false;
      }
      let _this = this;
      _this.$axios.post("/api/update_password", _this.obj).then(res => {
        if (res.data.code == 100) {
          _this.$Message.success({
            content: "已" + _this.jinqi,
            onClose() {
              _this.getData();
            }
          });
          _this.isshowsetmima = false;
        } else {
          _this.$Message.error(res.data.msg);
        }
      });
    },
    tochose(ind) {
      this.actindex = ind;
    },
    logout() {
      let _this = this;
      _this.$axios.post("/api/logout", {}).then(res => {
        if (res.data.code == 100) {
          _this.$router.replace("/");
        } else {
          _this.$Message.error(res.data.msg);
        }
      });
      _this.$router.replace("/");
    }
  },
  mounted() {
    this.lanId = localStorage.getItem('lan')
    changeLanguage(this.lanId);
    let self = this;
    // 以下为生成左侧菜单
    console.log(JSON.parse(sessionStorage.getItem("permList")));
    let a = JSON.parse(sessionStorage.getItem("permList"));
    if (a[0].permValue !== "useradmin") {
      // 如果该用户没有useradmin路由的权限，跳转到该用户拥有权限的页面
      this.$router.push("/" + a[0].permValue);
    }
    let b = [];
    for (let i = 0; i < a.length; i++) {
      b.push(a[i].permId);
    }
    this.list = permListConstruct();
    let manageArr = function(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = b.indexOf(arr[i].id) !== -1;
        if (arr[i].children) {
          manageArr(arr[i].children);
        }
      }
    };
    manageArr(this.list);
    console.log("this.list", this.list);
    // 生成左侧菜单结束
    this.user_account = window.sessionStorage.getItem("account");
  }
};
</script>
<style lang="scss" >
$anniuse: #00c1de;
$quxiao_btn: #bfbfbf;
html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
img.img {
  position: relative;
  top: 5px;
  margin-right: 5px;
  margin-left: 15px;
}
.ivu-btn {
  border-radius: 0px;
}
.ivu-modal-content {
  border-radius: 0px;
  .ivu-modal-header {
    background: #eeeeee;
  }
  .ivu-modal-body {
    margin: 5px 0 5px 0;
  }
  .ivu-modal-footer {
    border-top: 1px solid transparent;
    padding: 0px 18px 18px 18px;
    .btn_queding {
      display: inline-block;
      width: 90px;
      height: 40px;
      line-height: 40px;
      background: $anniuse;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 8px;
    }
    .btn_quxiao {
      display: inline-block;
      width: 90px;
      height: 40px;
      line-height: 40px;
      background: $quxiao_btn;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 8px;
    }
  }
}
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  /*background: #f5f7f9;*/
  background: url("/static/img/content_bg.png") no-repeat;
  background-size: cover;
  background-position: 0 -10px;
  position: relative;
  border-radius: 4px;
  overflow: auto;
  /deep/ .ivu-layout {
    background: transparent;
    /deep/ .ivu-layout-header {
      background: transparent;
    }
    /deep/ .ivu-layout-sider {
      background: transparent;
      border-top: none;
      /deep/ .ivu-menu-dark {
        background: transparent;
        /deep/ .ivu-menu-item,
        .ivu-menu-submenu-title {
          font-size: 16px;
        }
        /deep/ .ivu-menu-opened {
          background: transparent;
          /deep/ .ivu-menu-item-active {
            background: rgba(255, 255, 255, 0.1) !important;
            color: #00c1de;
          }
          /deep/ .ivu-menu-submenu-title {
            background: transparent;
          }
        }
        /deep/
          .ivu-menu-submenu:not(.ivu-menu-opened)
          .ivu-menu-submenu-title:hover {
          background: transparent !important;
        }
        /deep/ .ivu-menu-item-active:not(.ivu-menu-submenu) {
          background: rgba(255, 255, 255, 0.1) !important;
          color: #00c1de;
        }
        /deep/ .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
          background: transparent;
        }
        /deep/ .ivu-menu-item:hover {
          background: transparent;
        }
      }
    }
    /deep/ .ivu-layout-content {
      background: #ffffff;
    }
  }
}
.layout-logo {
  width: 600px;
  float: left;
  .zong_title {
    display: inline-block;
    width: 400px;
    font-size: 22px;
    letter-spacing: 2px;
  }
  img {
    vertical-align: middle;
  }
  span {
    color: #fff;
  }
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
  .nav-item {
    float: right;
    color: #fff;
    margin-left: 36px;
    img {
      vertical-align: -14%;
      cursor: pointer;
    }
    span {
    }
  }
}
.sider {
  background: #515a6e;
  border-top: 1px solid #dddddd;
}
.input_search {
  width: 197px;
  height: 40px;
  background: #eeeeee;
  position: relative;
  input {
    width: 90%;
    height: 40px;
    border: none;
    outline: none;
    background: transparent;
    margin-left: 15px;
    font-size: 14px;
    color: #666666;
  }
  input::-webkit-input-placeholder {
    color: #999999;
  }
  img {
    position: absolute;
    right: 18px;
    top: 11px;
  }
}
.ivu-dropdown {
  position: relative;
  top: 10px;
}
</style>
