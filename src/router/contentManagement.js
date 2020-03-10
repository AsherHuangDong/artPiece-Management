export const contentManagement = {
  path: '/contentManagement',
  name: 'contentManagement',
  title: '内容管理',
  component: () => import("../components/page/contentManagement/contentManagement"),
  children: [
    {
      path: '/rotationDiagramManagement',
      name: 'rotationDiagramManagement',
      component: () => import("../components/page/contentManagement/rotationDiagramManagement"),
      meta:{title:'轮播图管理'},
      children: [
        {
          path: '/rotationDiagramManagementOrderBy',
          name: 'rotationDiagramManagementOrderBy',
          component: () => import("../components/page/contentManagement/rotationDiagramManagementOrderBy"),
          meta:{title:'轮播图管理'},
        },
        {
          path: '/rotationDiagramManagementDelete',
          name: 'rotationDiagramManagementDelete',
          component: () => import("../components/page/contentManagement/rotationDiagramManagementDelete"),
          meta:{title:'轮播图管理'},
        }
      ]
    },
    {
      path: '/rotationDiagramAdd',
      name: 'rotationDiagramAdd',
      component: () => import("../components/page/contentManagement/rotationDiagramAdd"),
      meta:{title:'添加轮播图'}
    },
    {
      path: '/rotationDiagramEdit',
      name: 'rotationDiagramEdit',
      component: () => import("../components/page/contentManagement/rotationDiagramEdit"),
      meta:{title:'编辑轮播图'}
    },
    {
      path: '/newsManagement',
      name: 'newsManagement',
      component: () => import("../components/page/contentManagement/newsManagement"),
      meta:{title:'新闻管理'},
      children: [
        {
          path: '/newsManagementOrderBy',
          name: 'newsManagementOrderBy',
          component: () => import("../components/page/contentManagement/newsManagementOrderBy"),
          meta:{title:'新闻管理'},
        },
        {
          path: '/newsManagementDelete',
          name: 'newsManagementDelete',
          component: () => import("../components/page/contentManagement/newsManagementDelete"),
          meta:{title:'新闻管理'},
        }
      ]
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: () => import("../components/page/contentManagement/addNews"),
      meta:{title:'添加新闻'}
    },
    {
      path: '/editNews',
      name: 'editNews',
      component: () => import("../components/page/contentManagement/editNews"),
      meta:{title:'编辑新闻'}
    },
    {
      path: '/noticeManagement',
      name: 'noticeManagement',
      component: () => import("../components/page/contentManagement/noticeManagement"),
      meta:{title:'公告管理'},
      children: [
        {
          path: '/noticeManagementOrderBy',
          name: 'noticeManagementOrderBy',
          component: () => import("../components/page/contentManagement/noticeManagementOrderBy"),
          meta:{title:'公告管理'},
        },
        {
          path: '/noticeManagementDelete',
          name: 'noticeManagementDelete',
          component: () => import("../components/page/contentManagement/noticeManagementDelete"),
          meta:{title:'公告管理'},
        }
      ]
    },
    {
      path: '/addNotice',
      name: 'addNotice',
      component: () => import("../components/page/contentManagement/addNotice"),
      meta:{title:'添加公告'}
    },
    {
      path: '/editNotice',
      name: 'editNotice',
      component: () => import("../components/page/contentManagement/editNotice"),
      meta:{title:'编辑公告'}
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: () => import("../components/page/contentManagement/helpCenter"),
      meta:{title:'帮助中心'},
      children: [
        {
          path: '/helpCenterDelete',
          name: 'helpCenterDelete',
          component: () => import("../components/page/contentManagement/helpCenterDelete"),
          meta:{title:'帮助中心'},
        }
      ]
    },
    {
      path: '/addHelp',
      name: 'addHelp',
      component: () => import("../components/page/contentManagement/addHelp"),
      meta:{title:'添加帮助'}
    },
    {
      path: '/editHelp',
      name: 'editHelp',
      component: () => import("../components/page/contentManagement/editHelp"),
      meta:{title:'编辑帮助'}
    },
    {
      path: '/serviceTerms',
      name: 'serviceTerms',
      component: () => import("../components/page/contentManagement/serviceTerms"),
      meta:{title:'服务条款'}
    },
    {
      path: '/editService',
      name: 'editService',
      component: () => import("../components/page/contentManagement/editService"),
      meta:{title:'编辑服务条款'}
    },
    {
      path: '/privacyAgreement',
      name: 'privacyAgreement',
      component: () => import("../components/page/contentManagement/privacyAgreement"),
      meta:{title:'隐私协议'}
    },
    {
      path: '/editPrivacy',
      name: 'editPrivacy',
      component: () => import("../components/page/contentManagement/editPrivacy"),
      meta:{title:'编辑隐私协议'}
    },
    {
      path: '/receptionNotice',
      name: 'receptionNotice',
      component: () => import("../components/page/contentManagement/receptionNotice"),
      meta:{title:'接收通知'}
    },
    {
      path: '/editReceptionNotice',
      name: 'editReceptionNotice',
      component: () => import("../components/page/contentManagement/editReceptionNotice"),
      meta:{title:'编辑接收通知'}
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import("../components/page/contentManagement/aboutUs"),
      meta:{title:'关于我们'}
    },
    {
      path: '/editAboutUs',
      name: 'editAboutUs',
      component: () => import("../components/page/contentManagement/editAboutUs"),
      meta:{title:'编辑关于我们'}
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: () => import("../components/page/contentManagement/contactUs"),
      meta:{title:'联系我们'}
    },
    {
      path: '/editContactUs',
      name: 'editContactUs',
      component: () => import("../components/page/contentManagement/editContactUs"),
      meta:{title:'编辑联系我们'}
    },
    {
      path: '/ auctionRules',
      name: ' auctionRules',
      component: () => import("../components/page/contentManagement/auctionRules"),
      meta:{title:'拍卖rules'}
    },
    {
      path: '/editAuctionRules',
      name: 'editAuctionRules',
      component: () => import("../components/page/contentManagement/editAuctionRules"),
      meta:{title:'编辑拍卖rules'}
    }
  ]
};
