import type { ScheduleEvent, UpcomingEvent } from "@/lib/types/schedule";

export const EVENTS: ScheduleEvent[] = [
  {
    time: "09:00",
    endTime: "10:30",
    title: "Q3 战略技术审查",
    subtitle: "与科技部联席会议",
    color: "bg-blue-500",
    type: "meeting",
    confirmed: true,
    location: "A号主会议厅",
    description:
      "资金续批审查会议。基于历史数据，与该单位的会议在3个月内的政策批准相关性高达70%。",
    stakeholders: [
      {
        name: "张部长",
        initial: "张",
        role: "科技部",
        bgColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "Dr. Emily Wu",
        initial: "吴",
        role: "AI 实验室主任",
        bgColor: "bg-slate-100 text-slate-700",
      },
    ],
    talkingPoints: [
      "重点提及计算成本降低了15%。",
      "提议与政策部门建立联合AI工作组。",
      "主动回应关于道德AI的担忧。",
    ],
    files: [
      {
        name: "Q3_技术报告_终稿.pdf",
        size: "2.4 MB",
        added: "昨天添加",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        icon: "doc",
      },
      {
        name: "战略_审查_演示文稿_v2.pptx",
        size: "5.1 MB",
        added: "2小时前添加",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        icon: "ppt",
      },
    ],
  },
  {
    time: "11:00",
    endTime: "12:00",
    title: "内部运营审计",
    subtitle: "财务部 302室",
    color: "bg-slate-400",
    type: "meeting",
    confirmed: true,
    location: "财务部 302室",
    description:
      "常规性运营审计，重点审查上季度项目支出合规情况。建议委派运营总监全程参与。",
    stakeholders: [
      {
        name: "陈处长",
        initial: "陈",
        role: "财务处",
        bgColor: "bg-slate-100 text-slate-700",
      },
      {
        name: "刘审计员",
        initial: "刘",
        role: "审计部",
        bgColor: "bg-slate-100 text-slate-700",
      },
    ],
    talkingPoints: [
      "确认Q2经费执行率达标情况。",
      "跟进大模型基座项目采购延期问题。",
      "核实量子计算中心设备到货清单。",
    ],
    files: [
      {
        name: "Q2_财务审计_报告.pdf",
        size: "1.8 MB",
        added: "3天前添加",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        icon: "doc",
      },
    ],
  },
  {
    time: "14:00",
    endTime: "15:30",
    title: "人才引进委员会",
    subtitle: "人力资源会议室",
    color: "bg-red-500",
    type: "conflict",
    confirmed: false,
    location: "人力资源会议室",
    description:
      "讨论下半年高层次人才引进计划。与14:30的部委电话会议存在时间冲突，建议授权副手参加。",
    conflictNote: "与14:30部委电话会议冲突",
    stakeholders: [
      {
        name: "赵院长",
        initial: "赵",
        role: "人力资源处",
        bgColor: "bg-orange-100 text-orange-700",
      },
      {
        name: "Prof. Chen",
        initial: "陈",
        role: "学术委员会",
        bgColor: "bg-blue-100 text-blue-700",
      },
    ],
    talkingPoints: [
      "审议3名海外高层次候选人资质。",
      "讨论薪酬竞争力对标方案。",
      "确定下半年招聘时间表。",
    ],
    files: [
      {
        name: "候选人_履历_汇总.pdf",
        size: "3.2 MB",
        added: "今天上传",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        icon: "doc",
      },
    ],
  },
  {
    time: "16:00",
    endTime: "17:00",
    title: "审查伦理委员会报告",
    subtitle: "线上会议",
    color: "bg-amber-500",
    type: "deadline",
    confirmed: true,
    location: "线上会议 (腾讯会议)",
    description:
      "AI伦理合规新指引审查截止日为今天。需确认伦理委员会对第四季度资金申请的合规意见。",
    deadlineNote: "今日截止",
    stakeholders: [
      {
        name: "孙主任",
        initial: "孙",
        role: "伦理委员会",
        bgColor: "bg-amber-100 text-amber-700",
      },
    ],
    talkingPoints: [
      "确认AI伦理合规审查结论。",
      "讨论新指引对Q4资金申请的影响。",
      "制定后续合规整改时间表。",
    ],
    files: [
      {
        name: "AI伦理_审查报告_v3.pdf",
        size: "1.5 MB",
        added: "今天上传",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        icon: "doc",
      },
    ],
  },
];

/** Days in this week that have events (for the week strip dots) */
export const WEEK_EVENT_DAYS = [1, 3, 4]; // Mon, Wed, Thu have events

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    day: "周三",
    date: "15日",
    title: "教育部科研项目中期检查",
    time: "10:00",
    type: "meeting",
  },
  {
    day: "周四",
    date: "16日",
    title: "校企合作签约仪式",
    time: "14:00",
    type: "meeting",
  },
  {
    day: "周五",
    date: "17日",
    title: "科技部专项申报截止",
    time: "17:00",
    type: "deadline",
  },
];
