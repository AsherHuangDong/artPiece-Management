const menuList = function () {
  return [
    {
      path: '/publicManagement',
      name: 'publicManagement',
      show: false,
      title: newVue.$t('publicManagement'),
      children: [
        {
          path: '/staffManagement',
          name: 'staffManagement',
          show: false,
          title: newVue.$t('staffManagement')
        },
        {
          path: '/roleManagement',
          name: 'roleManagement',
          show: false,
          title: newVue.$t('roleManagement')
        }
      ]
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      show: false,
      title: newVue.$t('userManagement'),
      children: [
        {
          path: '/userQuery',
          name: 'userQuery',
          show: false,
          title: newVue.$t('userQuery')
        },
        {
          path: '/realNameAudit',
          name: 'realNameAudit',
          show: false,
          title: newVue.$t('realNameAudit')
        },
        {
          path: '/addressCertificate',
          name: 'addressCertificate',
          show: false,
          title: newVue.$t('addressCertificate')
        }
      ]
    },
    {
      path: '/tradeManagement',
      name: 'tradeManagement',
      show: false,
      title: newVue.$t('tradeManagement'),
      children: [
        {
          path: '/copyrightManagement',
          name: 'copyrightManagement',
          show: false,
          title: newVue.$t('copyrightManagement')
        },
        {
          path: '/auctionManagement',
          name: 'auctionManagement',
          show: false,
          title: newVue.$t('auctionManagement')
        },
        {
          path: '/dealManagement',
          name: 'dealManagement',
          show: false,
          title: newVue.$t('dealManagement')
        },
        {
          path: '/DWManagement',
          name: 'DWManagement',
          show: false,
          title: newVue.$t('DWManagement')
        },
        {
          path: '/withdrawalAudit',
          name: 'withdrawalAudit',
          show: false,
          title: newVue.$t('withdrawalAudit')
        },
        {
          path: '/participationInProfitManagement',
          name: 'participationInProfitManagement',
          show: false,
          title: newVue.$t('participationInProfitManagement')
        }

      ]
    },
    {
      path: '/contentManagement',
      name: 'contentManagement',
      show: false,
      title: newVue.$t('contentManagement'),
      children: [
        {
          path: '/rotationDiagramManagement',
          name: 'rotationDiagramManagement',
          show: false,
          title: newVue.$t('rotationDiagramManagement')
        },
        {
          path: '/newsManagement',
          name: 'newsManagement',
          show: false,
          title: newVue.$t('newsManagement')
        },
        {
          path: '/noticeManagement',
          name: 'noticeManagement',
          show: false,
          title: newVue.$t('noticeManagement')
        },
        {
          path: '/helpCenter',
          name: 'helpCenter',
          show: false,
          title: newVue.$t('helpCenter')
        },
        {
          path: '/other',
          name: 'other',
          show: false,
          title: newVue.$t('other'),
          children: [
            {
              path: '/serviceTerms',
              name: 'serviceTerms',
              show: false,
              title: newVue.$t('serviceTerms')
            },
            {
              path: '/privacyAgreement',
              name: 'privacyAgreement',
              show: false,
              title: newVue.$t('privacyAgreement')
            },
            {
              path: '/receptionNotice',
              name: 'receptionNotice',
              show: false,
              title: newVue.$t('receptionNotice')
            },
            {
              path: '/aboutUs',
              name: 'aboutUs',
              show: false,
              title: newVue.$t('aboutUs')
            },
            {
              path: '/contactUs',
              name: 'contactUs',
              show: false,
              title: newVue.$t('contactUs')
            },
            {
              path: '/ auctionRules',
              name: 'auctionRules',
              show: false,
              title: newVue.$t('auctionRules')
            }
          ]
        }
      ]
    },
    {
      path: '/operatingReports',
      name: 'operatingReports',
      show: false,
      title: newVue.$t('operatingReports'),
      children: [
        {
          path: '/userStatistics',
          name: 'userStatistics',
          show: false,
          title: newVue.$t('userStatistics')
        },
        {
          path: '/auctionStatistics',
          name: 'auctionStatistics',
          show: false,
          title: newVue.$t('auctionStatistics')
        },
        {
          path: '/dealStatistics',
          name: 'dealStatistics',
          show: false,
          title: newVue.$t('dealStatistics')
        },
        {
          path: '/rechargeStatistics',
          name: 'rechargeStatistics',
          show: false,
          title: newVue.$t('rechargeStatistics')
        },
        {
          path: '/withdrawStatistics',
          name: 'withdrawStatistics',
          show: false,
          title: newVue.$t('withdrawStatistics')
        },
        {
          path: '/orderInquiry',
          name: 'orderInquiry',
          show: false,
          title: newVue.$t('orderInquiry')
        },
        {
          path: '/profitStatistics',
          name: 'profitStatistics',
          show: false,
          title: newVue.$t('profitStatistics')
        }
      ]
    }

  ]
};

export default menuList;
