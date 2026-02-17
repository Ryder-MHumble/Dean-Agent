import type {
  PolicyItem,
  TechTrend,
  Competitor,
} from "@/lib/types/intelligence";

export const mockPolicies: PolicyItem[] = [
  {
    id: "p1",
    title: "算力基础设施补贴政策",
    summary: "北京科委发布算力基础设施补贴，支持高校和研究机构建设算力平台。",
    category: "北京政策",
    importance: "紧急",
    date: "2026-02-12",
    source: "北京科委",
    tags: ["算力", "基础设施", "补贴"],
    matchScore: 98,
    funding: "500-1000万",
    daysLeft: 5,
    aiInsight:
      "与我院算力平台二期建设高度匹配，建议李副主任牵头、科研处配合紧急组织申报。",
    detail:
      "北京科委发布的「算力基础设施补贴政策」旨在支持高校和研究机构建设算力平台。我院算力平台二期建设规划与该政策高度匹配，预估可申请500-1000万资金支持。",
  },
  {
    id: "p2",
    title: "新一代人工智能重大专项",
    summary: "科技部重大专项申报，聚焦大模型、具身智能、AI for Science。",
    category: "国家政策",
    importance: "重要",
    date: "2026-02-10",
    source: "科技部",
    tags: ["大模型", "具身智能", "专项"],
    matchScore: 85,
    funding: "1000-2000万",
    daysLeft: 15,
    aiInsight: "我院具身智能方向可参与申报，需与王教授团队确认技术路线。",
    detail:
      "科技部「新一代人工智能」重大专项申报，聚焦大模型、具身智能、AI for Science三大方向。我院在大模型方向有基础，具身智能方向需加强。",
  },
  {
    id: "p3",
    title: "高校AI人才培养专项基金",
    summary: "教育部面向高校AI人才培养的专项基金，支持课程建设和师资培训。",
    category: "国家政策",
    importance: "关注",
    date: "2026-02-08",
    source: "教育部",
    tags: ["人才培养", "教育", "基金"],
    matchScore: 72,
    funding: "200-500万",
    daysLeft: 31,
    aiInsight:
      "匹配度中等，可关注但无需紧急行动，适合作为人才培养方向的补充资金来源。",
    detail:
      "教育部面向高校AI人才培养的专项基金，支持课程建设、实验室升级和师资培训。我院在AI人才培养方面有一定基础。",
  },
  {
    id: "p4",
    title: "中关村人工智能产业扶持计划",
    summary: "海淀区针对中关村AI企业和机构的产业扶持计划。",
    category: "北京政策",
    importance: "一般",
    date: "2026-02-05",
    source: "海淀区政府",
    tags: ["中关村", "产业扶持"],
    matchScore: 65,
    funding: "100-300万",
    daysLeft: 46,
    aiInsight: "区级政策，资金规模有限但审批流程快，可与算力平台项目打包申报。",
    detail:
      "海淀区政府针对中关村AI企业和机构的产业扶持计划，支持算力基础设施、模型开发和应用落地。",
  },
];

export const mockTechTrends: TechTrend[] = [
  {
    id: "t1",
    topic: "具身智能",
    heatTrend: "surging",
    heatLabel: "+300%",
    ourStatus: "none",
    ourStatusLabel: "未布局",
    gapLevel: "high",
    keyMetric: "清华AIR发布2篇顶会论文",
    aiInsight:
      "该方向热度飙升且我院布局为空，尚未布局，存在覆盖缺口。建议召集技术委员会评估是否需要快速布局。",
    detail:
      "具身智能（Embodied AI）近期在学术界和产业界热度急剧上升，DeepSeek-V3的发布进一步推动了该领域的关注度。清华AIR已发布2篇具身智能方向的顶会论文，而我院在该方向完全没有布局，存在明显的覆盖缺口。",
  },
  {
    id: "t2",
    topic: "多模态大模型",
    heatTrend: "rising",
    heatLabel: "+85%",
    ourStatus: "deployed",
    ourStatusLabel: "已布局",
    gapLevel: "low",
    keyMetric: "我院已有2个团队在研",
    aiInsight: "方向正确，需关注GPT-5等新模型发布对我院技术路线的影响。",
    detail:
      "多模态大模型持续升温，GPT-4o和Gemini Pro等模型推动了视觉-语言融合的发展。我院已有2个团队在多模态方向有布局，整体技术路线与行业趋势匹配。",
  },
  {
    id: "t3",
    topic: "AI Agent",
    heatTrend: "surging",
    heatLabel: "+210%",
    ourStatus: "weak",
    ourStatusLabel: "布局薄弱",
    gapLevel: "medium",
    keyMetric: "行业融资事件增加120%",
    aiInsight:
      "AI Agent是产业化重要方向，我院有理论基础但缺乏工程团队，建议引进相关人才。",
    detail:
      "AI Agent在产业界受到极大关注，相关创业公司融资事件大幅增加。我院在强化学习和决策智能方面有理论积累，但缺乏工程化能力，限制了在Agent方向的竞争力。",
  },
  {
    id: "t4",
    topic: "AI for Science",
    heatTrend: "stable",
    heatLabel: "+25%",
    ourStatus: "deployed",
    ourStatusLabel: "重点布局",
    gapLevel: "low",
    keyMetric: "Nature发表AI蛋白质预测突破",
    aiInsight: "持续稳定发展方向，我院在生物计算方向有优势，可继续深耕。",
    detail:
      "AI for Science作为长期战略方向持续发展，AI在蛋白质结构预测、药物发现和材料科学等领域不断取得突破。我院在生物计算和药物设计方向有较好基础，建议持续投入。",
  },
  {
    id: "t5",
    topic: "端侧AI推理",
    heatTrend: "rising",
    heatLabel: "+60%",
    ourStatus: "weak",
    ourStatusLabel: "布局薄弱",
    gapLevel: "medium",
    keyMetric: "苹果/高通发布新AI芯片",
    aiInsight:
      "手机端AI推理需求增长，但需要芯片合作伙伴，建议与华为昇腾团队对接。",
    detail:
      "端侧AI推理随着智能手机和IoT设备的AI能力提升而快速发展。苹果和高通相继发布新一代AI加速芯片，推动端侧大模型部署成为可能。我院在模型压缩方向有一定积累。",
  },
];

export const mockCompetitors: Competitor[] = [
  {
    id: "c1",
    name: "清华AIR",
    activityLevel: 92,
    latestAction: "发布具身智能新成果，2篇论文入选顶会",
    actionType: "成果发布",
    threatLevel: "critical",
    recentCount: 5,
    aiInsight:
      "清华AIR在具身智能领域快速布局，已形成领先优势。我院需评估跟进策略。",
    detail:
      "清华AIR近期在具身智能方向密集发布成果，2篇论文入选ICRA 2025，同时获批国家自然科学基金重点项目。团队从5人扩展到15人，招聘力度大。需要特别关注其在机器人操作和导航方向的突破。",
  },
  {
    id: "c2",
    name: "智源研究院",
    activityLevel: 78,
    latestAction: "获批国家重大AI专项，资金过亿",
    actionType: "资金获取",
    threatLevel: "warning",
    recentCount: 3,
    aiInsight: "智源在大模型训练基础设施方面投入巨大，形成算力优势。",
    detail:
      "智源研究院近期获批国家级重大AI专项，资金规模超过1亿元，主要用于大模型训练基础设施建设。同时在开源大模型社区保持活跃，Aquila模型系列持续迭代。",
  },
  {
    id: "c3",
    name: "北大AI Lab",
    activityLevel: 65,
    latestAction: "NLP方向新突破，中文评测榜排名提升",
    actionType: "成果发布",
    threatLevel: "normal",
    recentCount: 2,
    aiInsight: "北大在传统NLP领域保持优势，但在新兴方向布局较少。",
    detail:
      "北大AI Lab继续在NLP领域深耕，近期在中文语言理解评测榜上排名提升。但在具身智能、多模态等新兴方向的布局相对保守。整体威胁程度可控。",
  },
];
