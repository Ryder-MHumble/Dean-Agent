import type { SecretaryTodoItem, SecretaryScheduleConflict, SecretaryRecommendation } from "@/lib/types/ai-secretary";

export const mockSecretaryTodos: SecretaryTodoItem[] = [
  {
    id: '1',
    title: '审查伦理委员会报告',
    priority: 'urgent',
    deadline: '今天 18:00',
    completed: false,
    actionLabel: '开始审阅',
  },
  {
    id: '2',
    title: '恭喜张教授当选院士',
    priority: 'important',
    completed: false,
    actionLabel: 'AI草稿已就绪',
  },
  {
    id: '3',
    title: '督办大模型基座项目采购',
    priority: 'important',
    deadline: '延期15天',
    completed: false,
    actionLabel: '催办负责人',
  },
  {
    id: '4',
    title: '审阅科技伦理政策影响分析',
    priority: 'normal',
    completed: false,
    actionLabel: '查看AI分析',
  },
  {
    id: '5',
    title: '处理日程冲突：人才引进委员会',
    priority: 'important',
    completed: false,
    actionLabel: '选择方案',
  },
];

export const mockSecretaryConflict: SecretaryScheduleConflict = {
  id: '1',
  title: '人才引进委员会',
  time: '今天 14:00',
  conflictWith: '部委电话会议',
  suggestion: '建议授权李副主任处理人才引进委员会',
};

export const mockSecretaryRecommendations: SecretaryRecommendation[] = [
  {
    id: '1',
    icon: 'file',
    title: '关注科技伦理治理政策',
    description: '该政策与我院3个在研项目相关',
  },
  {
    id: '2',
    icon: 'users',
    title: '恭喜王教授当选IEEE Fellow',
    description: 'AI已起草祝贺邮件，点击查看',
  },
  {
    id: '3',
    icon: 'calendar',
    title: '北京科创大会邀请',
    description: 'ROI:95 | 建议接受邀请',
  },
];
