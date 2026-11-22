// 主要頁面清單（需求文件第五節）。側邊欄與路由都由這份清單產生。
export type NavItem = {
  path: string
  title: string
  subtitle: string
  description: string
  plannedPhase: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: '/',
    title: '財務總覽',
    subtitle: 'Dashboard',
    description: '顯示本月收支、帳戶資產、預算與最近交易的總覽。',
    plannedPhase: '第二階段',
  },
  {
    path: '/transactions',
    title: '收支紀錄',
    subtitle: 'Transactions',
    description: '新增、修改、刪除及搜尋收入、支出與轉帳紀錄。',
    plannedPhase: '第二階段',
  },
  {
    path: '/accounts',
    title: '帳戶管理',
    subtitle: 'Accounts',
    description: '管理現金、銀行、電子支付等帳戶。',
    plannedPhase: '第二階段',
  },
  {
    path: '/credit-cards',
    title: '信用卡管理',
    subtitle: 'Credit Cards',
    description: '管理信用卡、帳單、分期付款與繳款提醒。',
    plannedPhase: '第五階段',
  },
  {
    path: '/budgets',
    title: '預算管理',
    subtitle: 'Budgets',
    description: '設定每月總預算與各類別預算，追蹤使用比例。',
    plannedPhase: '第五階段',
  },
  {
    path: '/savings-goals',
    title: '儲蓄目標',
    subtitle: 'Savings Goals',
    description: '建立存錢目標並追蹤進度。',
    plannedPhase: '第五階段',
  },
  {
    path: '/ai-insights',
    title: 'AI 財務分析',
    subtitle: 'AI Insights',
    description: '依實際交易資料提供消費分析與財務問答。',
    plannedPhase: '第四、五階段',
  },
  {
    path: '/receipts',
    title: '收據及發票',
    subtitle: 'Receipts',
    description: '上傳收據與發票圖片，辨識交易內容。',
    plannedPhase: '第四、六階段',
  },
  {
    path: '/recurring',
    title: '固定收支',
    subtitle: 'Recurring',
    description: '管理固定收入、固定支出與訂閱服務。',
    plannedPhase: '第五階段',
  },
  {
    path: '/reports',
    title: '財務報表',
    subtitle: 'Reports',
    description: '產生月度、季度、年度報表並匯出。',
    plannedPhase: '第二階段起',
  },
  {
    path: '/integrations',
    title: '整合設定',
    subtitle: 'Integrations',
    description: '連結 LINE、Email、電子發票等外部服務。',
    plannedPhase: '第三、六階段',
  },
  {
    path: '/settings',
    title: '系統設定',
    subtitle: 'Settings',
    description: '個人偏好、通知與帳號設定。',
    plannedPhase: '第一階段起逐步加入',
  },
]
