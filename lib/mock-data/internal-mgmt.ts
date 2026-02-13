import type {
  BudgetItem,
  StudentAlert,
  StudentSummary,
  SentimentData,
} from "@/lib/types/internal-mgmt";

export const mockBudgets: BudgetItem[] = [
  {
    id: "b1",
    department: "AI & 机器人实验室",
    annualBudget: 2800,
    spent: 980,
    executionRate: 35,
    status: "normal",
    statusLabel: "正常",
    recentChange: "本月支出120万（设备采购）",
    aiInsight: "预算执行节奏正常，Q2有大额设备采购计划，建议提前启动审批流程。",
    detail:
      "年度预算2800万，主要用于算力平台建设、GPU集群扩容和实验室改造。当前已执行980万，执行率35%。Q2计划采购新一批A100 GPU集群（预算800万）。",
  },
  {
    id: "b2",
    department: "量子计算中心",
    annualBudget: 1500,
    spent: 1425,
    executionRate: 95,
    status: "danger",
    statusLabel: "超支预警",
    recentChange: "超支提示：低温设备维修追加150万",
    aiInsight:
      "已超支预警，低温设备维修费用超出预期。建议紧急协调校级应急资金或从其他中心调剂。",
    detail:
      "年度预算1500万，因低温设备频繁故障已追加维修费用150万。若不及时调剂，预计Q2将出现资金断裂。建议与校财务处协商紧急拨款。",
  },
  {
    id: "b3",
    department: "先进材料研究院",
    annualBudget: 1200,
    spent: 240,
    executionRate: 20,
    status: "warning",
    statusLabel: "执行滞后",
    recentChange: "采购审批卡在流程中",
    aiInsight:
      "执行率仅20%，远低于季度目标。主因是3个大额采购审批流程停滞。建议院长直接推动。",
    detail:
      "年度预算1200万，主要用于材料采购和仪器设备。当前执行滞后，3个大额采购（合计450万）审批停滞在采购处。",
  },
  {
    id: "b4",
    department: "科研项目专项基金",
    annualBudget: 1800,
    spent: 720,
    executionRate: 40,
    status: "normal",
    statusLabel: "正常",
    recentChange: "新增2个国家级项目配套",
    aiInsight: "执行率正常，新增的国家级项目配套资金已到位，建议加快项目启动。",
    detail:
      "年度预算1800万，覆盖院级、省部级和国家级项目配套。本月新增2个国家级项目配套共350万。",
  },
  {
    id: "b5",
    department: "行政与人员经费",
    annualBudget: 1200,
    spent: 600,
    executionRate: 50,
    status: "normal",
    statusLabel: "正常",
    recentChange: "人才引进签约奖金支出",
    aiInsight: "人员经费执行正常，但人才引进计划可能导致Q3-Q4压力增大。",
    detail:
      "年度预算1200万，包含人员工资、绩效奖金和人才引进费用。本月因引进1名海外人才支出签约奖金50万。",
  },
];

export const mockStudentAlerts: StudentAlert[] = [
  {
    id: "s1",
    name: "张明远",
    grade: "2023级硕士",
    major: "计算机科学与技术",
    type: "心理预警",
    level: "紧急",
    summary: "连续两周未参加组会，导师反馈情绪异常低落",
    detail:
      "该生近期表现明显异常：连续两周未参加课题组组会，导师李教授反馈其近一个月情绪持续低落，与同学交流减少。宿舍同学反映该生作息紊乱，经常深夜独自外出。上学期成绩优异（GPA 3.8），但本学期已缺交两次课程作业。",
    aiRecommendation:
      "建议立即启动心理危机干预流程：1) 辅导员24小时内进行一对一面谈；2) 协调心理咨询中心安排专业评估；3) 通知导师暂时减轻其科研压力；4) 联系家长了解家庭近况。该生属于高危预警，需要多方协同跟进。",
  },
  {
    id: "s2",
    name: "李思雨",
    grade: "2022级博士",
    major: "人工智能",
    type: "学业预警",
    level: "关注",
    summary: "博士中期考核未通过，论文进展严重滞后",
    detail:
      "该生博士中期考核未通过，论文实验数据不足，研究方向与导师存在分歧。已延期1学期。导师王教授建议调整研究课题方向，但该生对此有较大抵触情绪。当前已发表论文0篇（同期博士生平均1.5篇）。",
    aiRecommendation:
      "建议安排学业帮扶方案：1) 协调研究生院延长中期考核补考时间；2) 安排副导师或高年级博士进行学术辅导；3) 组织导师与学生进行深度沟通，调解研究方向分歧；4) 关注该生情绪变化，防止学业压力引发心理问题。",
  },
  {
    id: "s3",
    name: "王浩然",
    grade: "2024级硕士",
    major: "网络安全",
    type: "考勤异常",
    level: "提醒",
    summary: "本月旷课3次，实验室打卡记录不规律",
    detail:
      "该生本月旷课3次（《高级密码学》2次、《网络安全前沿》1次），实验室打卡记录显示经常下午才到。该生入学成绩排名第3，上学期表现良好。近期班主任了解到该生正在参与一个校外创业项目。",
    aiRecommendation:
      "建议进行常规谈话了解情况：1) 班主任约谈了解校外活动详情；2) 强调学业优先的原则，明确考勤纪律；3) 如校外项目与专业相关，可引导其纳入研究课题；4) 持续关注后续出勤情况，如无改善则进一步处理。",
  },
  {
    id: "s4",
    name: "陈雪",
    grade: "2023级硕士",
    major: "数据科学",
    type: "心理预警",
    level: "关注",
    summary: "心理普测异常，SCL-90多项因子超标",
    detail:
      "该生在本学期心理健康普测中，SCL-90量表中强迫、抑郁、焦虑三项因子分均超过预警线。该生平时性格内向，社交圈子较小。成绩正常（GPA 3.5），科研进展顺利。但宿舍关系一般，曾申请调换宿舍。",
    aiRecommendation:
      "建议开展关怀性介入：1) 辅导员以学业关心为切入点进行自然接触；2) 推荐参加学院心理成长工作坊；3) 协调宿舍调换事宜，改善生活环境；4) 安排一次心理咨询中心的初步评估；5) 在导师知情的前提下给予适当关注。",
  },
  {
    id: "s5",
    name: "赵鹏飞",
    grade: "2022级硕士",
    major: "智能制造",
    type: "经济困难",
    level: "提醒",
    summary: "助学贷款到期，家庭突发变故申请困难补助",
    detail:
      "该生家庭所在地区遭遇自然灾害，父亲因伤住院，家庭经济状况急剧恶化。已提交困难补助申请。该生平时勤奋刻苦，成绩优秀（GPA 3.7），担任课题组技术骨干。目前依靠助学贷款和勤工俭学维持学业。",
    aiRecommendation:
      "建议启动紧急资助通道：1) 加急审批困难补助申请（建议特等助学金）；2) 协调勤工助学岗位，优先安排科研助理；3) 推荐校友基金会专项救助；4) 导师可考虑提高其课题劳务费；5) 持续关注其心理状态，防止经济压力影响学业。",
  },
];

export const studentSummary: StudentSummary = {
  totalStudents: 186,
  employmentRate: 94,
};

export const sentimentData: SentimentData = {
  score: 78,
  positive: 65,
  neutral: 20,
  negative: 15,
};
