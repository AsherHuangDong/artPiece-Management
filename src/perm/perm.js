const permListConstruct = function () {
  return [
    {
      children: [
        {
          children: [
            {
              permValue: "/staffManagement",
              permId: 8,
              checked: false,
              title: "查看员工",
            },
            {
              permValue: "/staffManagementAdd",
              permId: 9,
              checked: false,
              title: "添加员工",
            },
            {
              permValue: "/staffManagementEdit",
              permId: 10,
              checked: false,
              title: "编辑员工",
            },
            {
              permValue: "/staffManagementFreeze",
              permId: 11,
              checked: false,
              title: "冻结/解冻员工",
            },
            {
              permValue: "/staffManagementDelete",
              permId: 12,
              checked: false,
              title: "删除员工",
            }
          ],
          permValue: "/staffManagement",
          permId: 3,
          checked: false,
          title: "员工管理",
        },
        {
          children: [
            {
              permValue: "/roleManagement",
              permId: 13,
              checked: false,
              title: "查看角色",
            },
            {
              permValue: "/roleManagementAdd",
              permId: 14,
              checked: false,
              title: "添加角色",
            },
            {
              permValue: "/roleManagementEdit",
              permId: 15,
              checked: false,
              title: "编辑角色",
            },
            {
              permValue: "/roleManagementDelete",
              permId: 16,
              checked: false,
              title: "删除角色",
            }
          ],
          permValue: "/roleManagement",
          permId: 4,
          checked: false,
          title: "角色管理",
        }
      ],
      permValue: "/publicManagement",
      permId: 1,
      checked: false,
      title: "公共管理",
    },
    {
      children: [
        {
          children: [
            {
              permValue: "/userQuery",
              permId: 17,
              checked: false,
              title: "查看用户",
            },
            {
              permValue: "/userFreeze",
              permId: 18,
              checked: false,
              title: "冻结用户",
            }
          ],
          permValue: "/userQuery",
          permId: 5,
          checked: false,
          title: "用户查询",
        },
        {
          children: [
            {
              permValue: "/realNameAudit",
              permId: 19,
              checked: false,
              title: "查看实名认证审核",
            },
            {
              permValue: "/realNameAuditDetail",
              permId: 20,
              checked: false,
              title: "审核明细",
            },
            {
              permValue: "/realNameAuditDetailChangeStatus",
              permId: 21,
              checked: false,
              title: "更改审核状态",
            }
          ],
          permValue: "/realNameAudit",
          permId: 6,
          checked: false,
          title: "实名认证审核",
        },
        {
          children: [
            {
              permValue: "/addressCertificate",
              permId: 22,
              checked: false,
              title: "查看地址证明审核",
            },
            {
              permValue: "/realNameAuditDetailChangeStatus",
              permId: 23,
              checked: false,
              title: "更改审核状态",
            },
            {
              permValue: "/addressCertificateDetail",
              permId: 24,
              checked: false,
              title: "审核明细",
            }
          ],
          permValue: "/addressCertificate",
          permId: 7,
          checked: false,
          title: "地址证明审核",
        }
      ],
      permValue: "/userManagement",
      permId: 2,
      checked: false,
      title: "用户管理",
    },
    {
      children: [
        {
          children: [
            {
              permValue: "/copyrightManagement",
              permId: 33,
              checked: false,
              title: "查看版权",
            },
            {
              permValue: "/copyrightManagementAdd",
              permId: 34,
              checked: false,
              title: "添加版权",
            },
            {
              permValue: "/copyrightManagementDelete",
              permId: 35,
              checked: false,
              title: "删除版权",
            },
            {
              permValue: "/copyrightManagementOrderBy",
              permId: 36,
              checked: false,
              title: "版权排序",
            },
            {
              permValue: "/copyrightManagementEdit",
              permId: 37,
              checked: false,
              title: "编辑版权",
            },
            {
              permValue: "/copyrightChartEditor",
              permId: 38,
              checked: false,
              title: "版权图表编辑",
            }
          ],
          permValue: "/copyrightManagement",
          permId: 28,
          checked: false,
          title: "版权管理",
        },
        {
          children: [
            {
              permValue: "/auctionManagementAdd",
              permId: 39,
              checked: false,
              title: "添加拍卖",
            },
            {
              permValue: "/auctionManagementDetail",
              permId: 40,
              checked: false,
              title: "查看拍卖",
            },
            {
              permValue: "/auctionManagementEdit",
              permId: 41,
              checked: false,
              title: "编辑拍卖",
            }
          ],
          permValue: "/auctionManagement",
          permId: 29,
          checked: false,
          title: "拍卖管理",
        },
        {
          children: [
            {
              permValue: "/dealManagement",
              permId: 42,
              checked: false,
              title: "查看交易版权",
            },
            {
              permValue: "/dealManagementOrderBy",
              permId: 43,
              checked: false,
              title: "交易版权排序",
            },
            {
              permValue: "/dealManagementDelete",
              permId: 44,
              checked: false,
              title: "删除交易版权",
            },
            {
              permValue: "/dealManagementChangeStatus",
              permId: 45,
              checked: false,
              title: "开启/关闭交易",
            },
            {
              permValue: "/dealManagementAdd",
              permId: 46,
              checked: false,
              title: "添加交易版权",
            },
            {
              permValue: "/dealManagementEdit",
              permId: 47,
              checked: false,
              title: "编辑交易版权",
            }
          ],
          permValue: "/dealManagement",
          permId: 30,
          checked: false,
          title: "交易管理",
        },
        {
          children: [
            {
              permValue: "/DWManagement",
              permId: 48,
              checked: false,
              title: "查看",
            },
            {
              permValue: "/DWManagementEdit",
              permId: 49,
              checked: false,
              title: "修改",
            }
          ],
          permValue: "/DWManagement",
          permId: 31,
          checked: false,
          title: "D/W管理",
        },
        {
          children: [
            {
              permValue: "/withdrawalAudit",
              permId: 50,
              checked: false,
              title: "查看",
            },
            {
              permValue: "/withdrawalAuditChangeStatus",
              permId: 51,
              checked: false,
              title: "修改审核状态状态",
            }
          ],
          permValue: "/withdrawalAudit",
          permId: 32,
          checked: false,
          title: "提现审核",
        },
        {
          permValue: "/participationInProfitManagement",
          permId: 94,
          checked: false,
          title: "分红管理",
        }
      ],
      permValue: "/tradeManagement",
      permId: 25,
      checked: false,
      title: "交易管理",
    },
    {
      children: [
        {
          children: [
            {
              permValue: "/rotationDiagramManagement",
              permId: 62,
              checked: false,
              title: "查看轮播图",
            },
            {
              permValue: "/rotationDiagramManagementOrderBy",
              permId: 63,
              checked: false,
              title: "排序轮播图",
            },
            {
              permValue: "/rotationDiagramManagementDelete",
              permId: 64,
              checked: false,
              title: "删除轮播图",
            },
            {
              permValue: "/rotationDiagramAdd",
              permId: 65,
              checked: false,
              title: "添加轮播图",
            },
            {
              permValue: "/rotationDiagramEdit",
              permId: 66,
              checked: false,
              title: "编辑轮播图",
            }
          ],
          permValue: "/rotationDiagramManagement",
          permId: 52,
          checked: false,
          title: "轮播图管理",
        },
        {
          children: [
            {
              permValue: "/newsManagement",
              permId: 67,
              checked: false,
              title: "查看新闻",
            },
            {
              permValue: "/newsManagementOrderBy",
              permId: 68,
              checked: false,
              title: "排序新闻",
            },
            {
              permValue: "/newsManagementDelete",
              permId: 69,
              checked: false,
              title: "删除新闻",
            },
            {
              permValue: "/addNews",
              permId: 70,
              checked: false,
              title: "添加新闻",
            },
            {
              permValue: "/editNews",
              permId: 71,
              checked: false,
              title: "编辑新闻",
            }
          ],
          permValue: "/newsManagement",
          permId: 53,
          checked: false,
          title: "新闻管理",
        },
        {
          children: [
            {
              permValue: "/noticeManagement",
              permId: 72,
              checked: false,
              title: "查看公告",
            },
            {
              permValue: "/noticeManagementOrderBy",
              permId: 73,
              checked: false,
              title: "排序公告",
            },
            {
              permValue: "/noticeManagementDelete",
              permId: 74,
              checked: false,
              title: "删除公告",
            },
            {
              permValue: "/addNotice",
              permId: 75,
              checked: false,
              title: "添加公告",
            },
            {
              permValue: "/editNotice",
              permId: 76,
              checked: false,
              title: "编辑公告",
            }
          ],
          permValue: "/noticeManagement",
          permId: 54,
          checked: false,
          title: "公告管理",
        },
        {
          children: [
            {
              permValue: "/helpCenter",
              permId: 77,
              checked: false,
              title: "查看帮助",
            },
            {
              permValue: "/addHelp",
              permId: 78,
              checked: false,
              title: "添加帮助",
            },
            {
              permValue: "/editHelp",
              permId: 79,
              checked: false,
              title: "编辑帮助",
            }
          ],
          permValue: "/helpCenter",
          permId: 55,
          checked: false,
          title: "帮助中心",
        },
        {
          children: [
            {
              permValue: "/serviceTerms",
              permId: 80,
              checked: false,
              title: "查看服务条款",
            },
            {
              permValue: "/editService",
              permId: 81,
              checked: false,
              title: "编辑服务条款",
            }
          ],
          permValue: "/serviceTerms",
          permId: 56,
          checked: false,
          title: "服务条款",
        },
        {
          children: [
            {
              permValue: "/privacyAgreement",
              permId: 82,
              checked: false,
              title: "查看隐私协议",
            },
            {
              permValue: "/editPrivacy",
              permId: 83,
              checked: false,
              title: "编辑隐私协议",
            }
          ],
          permValue: "/privacyAgreement",
          permId: 57,
          checked: false,
          title: "隐私协议",
        },
        {
          children: [
            {
              permValue: "/receptionNotice",
              permId: 84,
              checked: false,
              title: "查看接收通知",
            },
            {
              permValue: "/editReceptionNotice",
              permId: 85,
              checked: false,
              title: "编辑接收通知",
            }
          ],
          permValue: "/receptionNotice",
          permId: 58,
          checked: false,
          title: "接收通知",
        },
        {
          children: [
            {
              permValue: "/aboutUs",
              permId: 86,
              checked: false,
              title: "查看关于我们",
            },
            {
              permValue: "/editAboutUs",
              permId: 87,
              checked: false,
              title: "编辑关于我们",
            }
          ],
          permValue: "/aboutUs",
          permId: 59,
          checked: false,
          title: "关于我们",
        },
        {
          children: [
            {
              permValue: "/contactUs",
              permId: 88,
              checked: false,
              title: "查看联系我们",
            },
            {
              permValue: "/editContactUs",
              permId: 89,
              checked: false,
              title: "编辑联系我们",
            }
          ],
          permValue: "/contactUs",
          permId: 60,
          checked: false,
          title: "联系我们",
        },
        {
          children: [
            {
              permValue: "/auctionRules",
              permId: 90,
              checked: false,
              title: "查看拍卖rules",
            },
            {
              permValue: "/editAuctionRules",
              permId: 91,
              checked: false,
              title: "编辑拍卖rules",
            }
          ],
          permValue: "/auctionRules",
          permId: 61,
          checked: false,
          title: "拍卖rules",
        }
      ],
      permValue: "/contentManagement",
      permId: 26,
      checked: false,
      title: "内容管理",
    },
    {
      children: [
        {

          permValue: "/userStatistics",
          permId: 92,
          checked: false,
          title: "用户统计",
        },
        {

          permValue: "/orderInquiry",
          permId: 93,
          checked: false,
          title: "订单管理",
        },
        {

          permValue: "/auctionStatistics",
          permId: 95,
          checked: false,
          title: "拍卖统计",
        },
        {

          permValue: "/dealStatistics",
          permId: 96,
          checked: false,
          title: "交易统计",
        },
        {

          permValue: "/rechargeStatistics",
          permId: 97,
          checked: false,
          title: "充值统计",
        },
        {

          permValue: "/withdrawStatistics",
          permId: 98,
          checked: false,
          title: "提现统计",
        }
      ],
      permValue: "/operatingReports",
      permId: 27,
      checked: false,
      title: "运营报表",
    }
  ];
};
export default permListConstruct
