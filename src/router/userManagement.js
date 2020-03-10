export const userManagement = {
  path: '/userManagement',
  name: 'userManagement',
  title: '用户管理',
  component: () => import("../components/page/userManagement/userManagement"),
  children: [
    {
      path: '/userQuery',
      name: 'userQuery',
      component: () => import("../components/page/userManagement/userQuery"),
      meta:{title:'用户查询'},
      children: [
        {
          path: '/userFreeze',
          name: 'userFreeze',
          component: () => import("../components/page/userManagement/userFreeze"),
          meta:{title:'用户查询'}
        }
      ]
    },
    {
      path: '/realNameAudit',
      name: 'realNameAudit',
      component: () => import("../components/page/userManagement/realNameAudit"),
      meta:{title:'实名认证审核'}
    },
    {
      path: '/realNameAuditDetail',
      name: 'realNameAuditDetail',
      component: () => import("../components/page/userManagement/realNameAuditDetail"),
      meta:{title:'审核明细'},
      children: [
        {
          path: '/realNameAuditDetailChangeStatus',
          name: 'realNameAuditDetailChangeStatus',
          component: () => import("../components/page/userManagement/realNameAuditDetailChangeStatus"),
          meta:{title:'审核明细'}
        }
      ]
    },
    {
      path: '/addressCertificate',
      name: 'addressCertificate',
      component: () => import("../components/page/userManagement/addressCertificate"),
      meta:{title:'地址证明审核'}
    },
    {
      path: '/addressCertificateDetail',
      name: 'addressCertificateDetail',
      component: () => import("../components/page/userManagement/addressCertificateDetail"),
      meta:{title:'审核明细'},
      children: [
        {
          path: '/addressCertificateDetailChangeStatus',
          name: 'addressCertificateDetailChangeStatus',
          component: () => import("../components/page/userManagement/addressCertificateDetailChangeStatus"),
          meta:{title:'审核明细'}
        }
      ]
    }
  ]
};
