export default {
  // 输入框的placeholder提示集合
  login: {
    projectName: 'LIANSHANG SAAS Management System(Business)',
    login: 'Login',
    loginOut:'',
    userName: '请输入用户名',
    password: '请输入登录密码',
  },
  // 头部
  header:{
    personalSetting:'personalSetting',
    loginOut:'Login Out',
  },
  // 按钮集合
  button: {
    normal: 'normal',
    frozen: 'frozen',
    search: 'search',
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    export: 'export',
    save: 'save',
    cancel: 'cancel',
    sure:'sure',
    back: 'Go back',
    top:'Top',
    moveDown: 'MoveDown',
    moveUp: 'MoveUp',
    freeze:'freeze',
    unfreeze:'unfreeze',
    create:'+create'
  },
  // 弹出提示框集合
  message:{
    save:'Save successfully!',
    edit:'Editor Success!',
    add:'Added successfully!',
    moveUp:'Move up successfully!',
    moveDown:'Move down successfully!',
    top:'Top success!',
    delete:'Delete successful!',
  },
  upLoadImgMessage: {
    require: 'The File is required',
    size: 'Exceeding file size limit',
    format: 'The file format is incorrect'
  },
  pagination: {
    first: 'First',
    last: 'Last',
    go: 'go to',
    page: 'page',
    confirm: 'confirm'
  },
  // 表头公用
  public: {
    move: 'move',
    action: 'action'
  },
  // 用户查询
  userSearch:{
    phone:'cell-phone number',
    email:'EMAIL',
    country:'nationality',
    level:'VIP level',
    time:'Registration time',
    ip:'Login IP',
    status:'Login status'
  },
  // 实名认证审核
  realName:{
    phone:'cell-phone number',
    email:'EMAIL',
    auditTime:'Audit Time',
    upDateTime:'Update Time',
    name:'real name',
    status:'Authentication status',
    certificateType:'Certificate Type',
    certificateNum:'Identification Number',
    photo1:'Positive photo of certificate',
    photo2:'Photos on the back of the document'
  },
  // 地址认证审核
  address:{
    phone:'cell-phone number',
    email:'EMAIL',
    auditTime:'Audit Time',
    upDateTime:'Update Time',
    name:'real name',
    status:'Authentication status',
    address:'Address',
    photo:'Photographs of Residence'
  },
  // 轮播管理
  banners:{
    sort:'sort',
    title:'title',
    img:'image',
    url:'lookUrl',
    upLoadTime:'upLoadTime',
    manageId:'manageId',
    upLoadImg:'upLoadImage'
  },
  // 新闻管理
  news: {
    title: 'title',
    img: 'NewsImage',
    lan: 'language',
    content: 'content',
    sort: 'sort',
    uploadTime: 'uploadTime',
    manageId: 'manageId',
    lanRequire: 'qinggouxuanyuyan',
    titleRequire: 'qingtianxiebiaoti',
    contentRequire: 'qingtianxieneirong'
  },
  // 公告管理
  notice:{
    sort:'sort',
    title:'title',
    upLoadTime:'upLoadTime',
    manageId:'manageId',
    content:'content',
    lan:'language'
  },
  // 帮助中心
  help:{
    sort:'sort',
    title:'title',
    upLoadTime:'upLoadTime',
    manageId:'manageId',
    content:'content',
    lan:'language'
  },
  // 其他内容
  others:{
    content:'content'
  },
  // 公共管理模块路由
  publicManagement: 'publicManagement',
  staffManagement: 'staffManagement',
  staffManagementFreeze: 'staffManagement',
  staffManagementDelete: 'staffManagement',
  staffManagementAdd: 'staffManagementAdd',
  staffManagementEdit: 'staffManagementEdit',
  roleManagement: 'roleManagement',
  roleManagementDelete: 'roleManagement',
  roleManagementAdd: 'roleManagementAdd',
  roleManagementEdit: 'roleManagementEdit',
  // 用户管理模块路由
  userManagement: 'userManagement',
  userQuery: 'userQuery',
  realNameAudit: 'realNameAudit',
  realNameAuditDetail: 'realNameAuditDetail',
  realNameAuditDetailChangeStatus: 'realNameAuditDetailChangeStatus',
  addressCertificate: 'addressCertificate',
  addressCertificateDetail: 'addressCertificateDetail',
  // 交易管理模块路由
  tradeManagement: 'tradeManagement',
  copyrightManagement: 'copyrightManagement',
  copyrightManagementAdd: "copyrightManagementAdd",
  copyrightManagementEdit: 'copyrightManagementEdit',
  copyrightChartEditor: 'copyrightChartEditor',
  auctionManagement: 'auctionManagement',
  auctionManagementAdd: 'auctionManagementAdd',
  auctionManagementDetail: "auctionManagementDetail",
  auctionManagementEdit: 'auctionManagementEdit',
  dealManagement: 'dealManagement',
  dealManagementAdd: 'dealManagementAdd',
  dealManagementEdit: 'dealManagementEdit',
  DWManagement: 'DWManagement',
  DWManagementEdit: 'DWManagementEdit',
  withdrawalAudit: 'withdrawalAudit',
  participationInProfitManagement: 'participationInProfitManagement',
  participationInProfitCreate: 'participationInProfitCreate',
  participationInProfitEdit: 'participationInProfitEdit',
  participationInProfitDetail: 'participationInProfitDetail',
  // 内容管理模块路由
  contentManagement: 'contentManagement',
  rotationDiagramManagement: 'rotationDiagramManagement',
  rotationDiagramAdd: 'rotationDiagramAdd',
  rotationDiagramEdit: 'rotationDiagramEdit',
  rotationDiagramManagementDelete: 'rotationDiagramManagementDelete',
  newsManagement: 'newsManagement',
  addNews: 'addNews',
  editNews: 'editNews',
  newsManagementDelete: 'newsManagementDelete',
  noticeManagement: 'noticeManagement',
  addNotice: 'addNotice',
  editNotice: 'editNotice',
  noticeManagementDelete: 'noticeManagementDelete',
  helpCenter: 'helpCenter',
  addHelp: 'addHelp',
  editHelp: 'editHelp',
  helpCenterDelete: 'helpCenterDelete',
  other:'other',
  serviceTerms: 'serviceTerms',
  editService: 'editService',
  privacyAgreement: 'privacyAgreement',
  editPrivacy: 'editPrivacy',
  receptionNotice: 'receptionNotice',
  editReceptionNotice: 'editReceptionNotice',
  aboutUs: 'aboutUs',
  editAboutUs: 'editAboutUs',
  contactUs: 'contactUs',
  editContactUs: 'editContactUs',
  auctionRules: 'auctionRules',
  editAuctionRules: 'editAuctionRules',
  // 运营报表路由
  operatingReports: 'operatingReports',
  userStatistics: 'userStatistics',
  auctionStatistics: 'auctionStatistics',
  dealStatistics: 'dealStatistics',
  rechargeStatistics: 'rechargeStatistics',
  withdrawStatistics: 'withdrawStatistics',
  orderInquiry:'orderInquiry',
  profitStatistics:'profitStatistics',
}
