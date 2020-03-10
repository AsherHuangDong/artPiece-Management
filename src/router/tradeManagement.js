export const tradeManagement = {
  path: '/tradeManagement',
  name: 'tradeManagement',
  title: '交易管理',
  component: () => import("../components/page/tradeManagement/tradeManagement"),
  children: [
    {
      path: '/copyrightManagement',
      name: 'copyrightManagement',
      component: () => import("../components/page/tradeManagement/copyrightManagement"),
      meta:{title:'版权管理'},
      children: [
        {
          path: '/copyrightManagementDelete',
          name: 'copyrightManagementDelete',
          component: () => import("../components/page/tradeManagement/copyrightManagementDelete"),
          meta:{title:'版权管理'}
        },
        {
          path: '/copyrightManagementOrderBy',
          name: 'copyrightManagementOrderBy',
          component: () => import("../components/page/tradeManagement/copyrightManagementOrderBy"),
          meta:{title:'版权管理'}
        }
      ]
    },
    {
      path: '/copyrightManagementAdd',
      name: 'copyrightManagementAdd',
      component: () => import("../components/page/tradeManagement/copyrightManagementAdd"),
      meta:{title:'添加版权'}
    },
    {
      path: '/copyrightManagementEdit',
      name: 'copyrightManagementEdit',
      component: () => import("../components/page/tradeManagement/copyrightManagementEdit"),
      meta:{title:'编辑版权'}
    },
    {
      path: '/copyrightChartEditor',
      name: 'copyrightChartEditor',
      component: () => import("../components/page/tradeManagement/copyrightChartEditor"),
      meta:{title:'版权图表编辑'}
    },
    {
      path: '/auctionManagement',
      name: 'auctionManagement',
      component: () => import("../components/page/tradeManagement/auctionManagement"),
      meta:{title:'拍卖管理'}
    },
    {
      path: '/auctionManagementAdd',
      name: 'auctionManagementAdd',
      component: () => import("../components/page/tradeManagement/auctionManagementAdd"),
      meta:{title:'添加拍卖'}
    },
    {
      path: '/auctionManagementDetail',
      name: 'auctionManagementDetail',
      component: () => import("../components/page/tradeManagement/auctionManagementDetail"),
      meta:{title:'查看拍卖'}
    },
    {
      path: '/auctionManagementEdit',
      name: 'auctionManagementEdit',
      component: () => import("../components/page/tradeManagement/auctionManagementEdit"),
      meta:{title:'编辑拍卖'}
    },
    {
      path: '/dealManagement',
      name: 'dealManagement',
      component: () => import("../components/page/tradeManagement/dealManagement"),
      meta:{title:'交易管理'},
      children: [
        {
          path: '/dealManagementOrderBy',
          name: 'dealManagementOrderBy',
          component: () => import("../components/page/tradeManagement/dealManagementOrderBy"),
          meta:{title:'交易管理'}
        },
        {
          path: '/dealManagementDelete',
          name: 'dealManagementDelete',
          component: () => import("../components/page/tradeManagement/dealManagementDelete"),
          meta:{title:'交易管理'}
        },
        {
          path: '/dealManagementChangeStatus',
          name: 'dealManagementChangeStatus',
          component: () => import("../components/page/tradeManagement/dealManagementChangeStatus"),
          meta:{title:'交易管理'}
        }
      ]
    },
    {
      path: '/dealManagementAdd',
      name: 'dealManagementAdd',
      component: () => import("../components/page/tradeManagement/dealManagementAdd"),
      meta:{title:'添加交易版权'}
    },
    {
      path: '/dealManagementEdit',
      name: 'dealManagementEdit',
      component: () => import("../components/page/tradeManagement/dealManagementEdit"),
      meta:{title:'编辑交易版权'}
    },
    {
      path: '/DWManagement',
      name: 'DWManagement',
      component: () => import("../components/page/tradeManagement/DWManagement"),
      meta:{title:'D/W管理'},
      children: [
        {
          path: '/vipWithdrawlEdit',
          name: 'vipWithdrawlEdit',
          component: () => import("../components/page/tradeManagement/vipWithdrawlEdit"),
          meta:{title:'D/W管理'}
        }
      ]
    },
    {
      path: '/DWManagementEdit',
      name: 'DWManagementEdit',
      component: () => import("../components/page/tradeManagement/DWManagementEdit"),
      meta:{title:'D/W管理'}
    },
    {
      path: '/withdrawalAudit',
      name: 'withdrawalAudit',
      component: () => import("../components/page/tradeManagement/withdrawalAudit"),
      meta:{title:'提现审核'},
      children: [
        {
          path: '/withdrawalAuditChangeStatus',
          name: 'withdrawalAuditChangeStatus',
          component: () => import("../components/page/tradeManagement/withdrawalAuditChangeStatus"),
          meta:{title:'提现审核'}
        }
      ]
    },
    {
      path: '/participationInProfitManagement',
      name: 'participationInProfitManagement',
      component: ()=> import("../components/page/tradeManagement/participationInProfitManagement"),
      meta: {title:'分红管理'}
    },
    {
      path: '/participationInProfitCreate',
      name: 'participationInProfitCreate',
      component: ()=> import("../components/page/tradeManagement/participationInProfitCreate"),
      meta: {title:'创建分红'},
      children: [
        {
          path: '/participationInProfitCreateEdit',
          name: 'participationInProfitCreateEdit',
          component: () => import("../components/page/tradeManagement/participationInProfitCreateEdit"),
          meta:{title:'创建分红'}
        }
      ]
    },
    {
      path: '/participationInProfitEdit',
      name: 'participationInProfitEdit',
      component: ()=> import("../components/page/tradeManagement/participationInProfitEdit"),
      meta: {title:'编辑分红'},
      children: [
        {
          path: '/participationInProfitEditEdit',
          name: 'participationInProfitEditEdit',
          component: () => import("../components/page/tradeManagement/participationInProfitEditEdit"),
          meta:{title:'编辑分红'}
        }
      ]
    },
    {
      path: '/participationInProfitDetail',
      name: 'participationInProfitDetail',
      component: ()=> import("../components/page/tradeManagement/participationInProfitDetail"),
      meta: {title:'分红明细'}
    }
  ]
};
