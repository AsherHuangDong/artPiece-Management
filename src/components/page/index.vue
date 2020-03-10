<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  /* width: 200px; */
  height: 25px;
  line-height: 45px;
  /* background: url("../../assets/img/lo.png"); */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 10px;
  left:-24px;
  color: #fff;
}
.layout-nav {
  width: 420px;
  margin: 0 -20px 0 auto;
  display: flex;
  justify-content: flex-end;
}
</style>
<template>
  <div class="layout">
    <Layout :style="{height: height + 'px', overflow: 'scroll'}">
      <Header style='background:rgba(31, 38, 52, 1);' class='header'>
        <Menu mode="horizontal" style='background:rgba(31, 38, 52, 1);' active-name="1" @on-select="lanClick">
          <div class="layout-logo">{{$t('login.projectName')}}</div>
          <div class="layout-nav">
            <Submenu name="userInfo">
              <!-- <img src="../../../static/img/person.png" alt="" style='margin-right:5px;'> -->
              <template slot="title" style='color:#fff;'>{{userName}}</template>
              <MenuItem name="1-1">{{$t('header.personalSetting')}}</MenuItem>
              <MenuItem name="1-2">{{$t('header.loginOut')}}</MenuItem>
            </Submenu>
            <Submenu name="language">
              <template slot="title">{{lan}}</template>
              <MenuItem :name="item.id" v-for="item in lanList" :key="item.id">{{item.name}}</MenuItem>
            </Submenu>
            <!-- <MenuItem name="3"></MenuItem>
            <MenuItem name="4"></MenuItem> -->
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" accordion @on-select="selectMenu">
            <Submenu v-if="item.show" v-for="item in menuList" :key="item.name" :name="item.name">
              <template slot="title">{{item.title}}</template>
              <div v-if="item2.show || item2.name==='other'" v-for="item2 in item.children">
                <MenuItem
                  v-if="!item2.children"
                  :key="item2.name"
                  :name="item2.name"
                >{{item2.title}}</MenuItem>
                <Submenu v-else :key="item2.name" :name="item2.name">
                  <template slot="title">{{item2.title}}</template>
                  <MenuItem
                    v-if="item3.show"
                    v-for="item3 in item2.children"
                    :key="item3.name"
                    :name="item3.name"
                  >{{item3.title}}</MenuItem>
                </Submenu>
              </div>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '12px 0'}">
            <BreadcrumbItem>
              <div style="height: 18px;width:1px;border: 3px solid #515a6e;display: inline-block;"></div>
              <span
                style="height: 18px;line-height: 18px;font-size:18px;display: inline-block;"
              >{{$t(this.$route.name)}}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{padding: '24px', minHeight: '280px',height: '100%', background: '#fff'}"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <user-setting></user-setting>
  </div>
</template>
<script>
import menuList from "../../perm/menuList";
import { changeLanguage } from "@/locale";
import UserSetting from "../component/userSetting/userSetting";
export default {
  name: "index",
  components: { UserSetting },
  data() {
    return {
      userName:'',
      height: 0,
      menuList: [],
      lanId: "zh_CN",
      lan: "简体中文",
      lanList: [
        {
          id: "zh_CN",
          name: "简体中文"
        },
        {
          id: "el_GR",
          name: "繁体中文"
        },
        {
          id: "en_US",
          name: "English"
        },
        {
          id: "ko_KR",
          name: "한국어"
        },
        {
          id: "mn_MN",
          name: "日本語"
        }
      ]
    };
  },
  methods: {
    selectMenu(name) {
      this.$router.push("/" + name);
    },
    lanClick(lanId) {
      console.log("ppp", lanId);
      this.lanList.forEach(element => {
        if (element.id === lanId) {
          this.lan = element.name;
          this.lanId = lanId;
          localStorage.setItem("lan", lanId);
          localStorage.setItem("lanName", this.lan);
          changeLanguage(this.lanId);
          this.getSideBar();
        }
      });
      if (lanId === "1-1") {
        this.$store.commit("personalData/setShowPersonalData", true);
      }
      if (lanId === "1-2") {
        this.$router.push('/')
      }
    },
    // 生成左侧菜单
    getSideBar() {
      let M = menuList();
      let permPath = JSON.parse(localStorage.getItem("permPath"));
      function f(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (permPath.indexOf(arr[i].path) !== -1) {
            arr[i].show = true;
          }
          if (arr[i].children) {
            f(arr[i].children);
          }
        }
      }
      f(M);
      this.menuList = M;
      console.log(M);
    }
  },
  mounted() {
    this.userName = JSON.parse(localStorage.getItem("userInfo")).nickName
    console.log("kkkk" + localStorage.getItem("userInfo") );
    // 自动计算高度
    if (localStorage.getItem("lanName")) {
      this.lanId = localStorage.getItem("lan");
      this.lan = localStorage.getItem("lanName");
    }
    changeLanguage(this.lanId);
    let _this = this;
    _this.height = document.documentElement.clientHeight - 2;
    window.onresize = function() {
      _this.height = document.documentElement.clientHeight - 2;
    };
    this.getSideBar();
  }
};
</script>
<style>
.ivu-menu-horizontal {
    height: 64px;
    line-height: 64px;
}
.header .ivu-menu-submenu .ivu-menu-submenu-title{
  color:#fff;
}
</style>
