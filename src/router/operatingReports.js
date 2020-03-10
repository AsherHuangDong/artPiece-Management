export const operatingReports = {
  path: '/operatingReports',
  name: 'operatingReports',
  title: '运营报表',
  component: () => import("../components/page/operatingReports/operatingReports"),
  children: [
    {
      path: '/userStatistics',
      name: 'userStatistics',
      component: () => import("../components/page/operatingReports/userStatistics"),
      meta:{title:'用户统计'}
    },
    {
      path: '/auctionStatistics',
      name: 'auctionStatistics',
      component: () => import("../components/page/operatingReports/auctionStatistics"),
      meta:{title:'拍卖统计'}
    },
    {
      path: '/dealStatistics',
      name: 'dealStatistics',
      component: () => import("../components/page/operatingReports/dealStatistics"),
      meta:{title:'交易统计'}
    },
    {
      path: '/rechargeStatistics',
      name: 'rechargeStatistics',
      component: () => import("../components/page/operatingReports/rechargeStatistics"),
      meta:{title:'充值统计'}
    },
    {
      path: '/withdrawStatistics',
      name: 'withdrawStatistics',
      component: () => import("../components/page/operatingReports/withdrawStatistics"),
      meta:{title:'提现统计'}
    },
    {
      path: '/orderInquiry',
      name: 'orderInquiry',
      component: () => import("../components/page/operatingReports/orderInquiry"),
      meta:{title:'订单查询'}
    },
    {
      path: '/profitStatistics',
      name: 'profitStatistics',
      component: () => import("../components/page/operatingReports/profitStatistics"),
      meta:{title:'利润统计'}
    }
  ]
};