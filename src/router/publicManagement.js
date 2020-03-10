export const publicManagement = {
  // publicManagement有没有视图
  path: '/publicManagement',
  name: 'publicManagement',
  title: '公共管理',
  component: () => import("../components/page/publicManagement/publicManagement"),
  children: [
    {
      path: '/staffManagement',
      name: 'staffManagement',
      component: () => import("../components/page/publicManagement/staffManagement"),
      meta:{title:'员工管理'},
      children: [
        {
          path: '/staffManagementFreeze',
          name: 'staffManagementFreeze',
          component: () => import("../components/page/publicManagement/staffManagementFreeze"),
          meta:{title:'员工管理'}
        },
        {
          path: '/staffManagementDelete',
          name: 'staffManagementDelete',
          component: () => import("../components/page/publicManagement/staffManagementDelete"),
          meta:{title:'员工管理'}
        },
      ]
    },
    {
      path: '/staffManagementAdd',
      name: 'staffManagementAdd',
      component: () => import("../components/page/publicManagement/staffManagementAdd"),
      meta:{title:'添加员工'}
    },
    {
      path: '/staffManagementEdit',
      name: 'staffManagementEdit',
      component: () => import("../components/page/publicManagement/staffManagementEdit"),
      meta:{title:'编辑员工'}
    },
    {
      path: '/roleManagement',
      name: 'roleManagement',
      component: () => import("../components/page/publicManagement/roleManagement"),
      meta:{title:'角色管理'},
      children: [
        {
          path: '/roleManagementDelete',
          name: 'roleManagementDelete',
          component: () => import("../components/page/publicManagement/roleManagementDelete"),
          meta:{title:'角色管理'}
        }
      ]
    },
    {
      path: '/roleManagementAdd',
      name: 'roleManagementAdd',
      component: () => import("../components/page/publicManagement/roleManagementAdd"),
      meta:{title:'添加角色'}
    },
    {
      path: '/roleManagementEdit',
      name: 'roleManagementEdit',
      component: () => import("../components/page/publicManagement/roleManagementEdit"),
      meta:{title:'编辑角色'}
    }
  ]
};
