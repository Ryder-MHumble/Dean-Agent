import type { PeerInstitution, PersonnelChange, ResearchOutput } from "@/lib/types/university-eco";

export const mockPeers: PeerInstitution[] = [
  {
    id: "c1",
    name: "清华AIR",
    activityLevel: 92,
    latestAction: "发布具身智能实验室2篇ICRA论文",
    actionType: "科研成果",
    threatLevel: "critical",
    recentCount: 5,
    aiInsight: "清华AIR在具身智能方向形成明显领先，该团队已扩至15人。建议密切关注其研究路线，评估合作可能性。",
    detail: "清华AIR近期在具身智能、多模态大模型方向密集产出。已发表ICRA 2024论文2篇，获批国家级项目1项，团队规模扩至15人。",
  },
  {
    id: "c2",
    name: "智源研究院",
    activityLevel: 78,
    latestAction: "获批算力基础设施建设资金",
    actionType: "资金动态",
    threatLevel: "warning",
    recentCount: 3,
    aiInsight: "智源在算力方面获得大量资金支持。我院需关注其算力开放策略是否影响我院合作方获取资源。",
    detail: "智源研究院近期获批过亿资金用于算力基础设施建设，预计新增10000 GPU小时算力。",
  },
  {
    id: "c3",
    name: "北大AI Lab",
    activityLevel: 55,
    latestAction: "NLP团队发布ChatBench评测基准",
    actionType: "学术发布",
    threatLevel: "normal",
    recentCount: 2,
    aiInsight: "北大AI Lab在传统NLP领域保持稳定产出，整体威胁可控。其新发布的评测基准可作为我院论文引用参考。",
    detail: "北大AI Lab近期发布ChatBench大模型评测基准，在NLP领域保持稳定产出，团队规模基本不变。",
  },
];

export const mockPersonnelChanges: PersonnelChange[] = [
  {
    id: "p1",
    person: "张伟教授",
    fromPosition: "清华大学计算机系副主任",
    toPosition: "清华大学人工智能研究院院长",
    institution: "清华大学",
    type: "任命",
    impact: "重大",
    date: "2025-05-10",
    background: "ACM Fellow，长期从事计算机视觉和多模态学习研究，H-index 85",
    aiAnalysis:
      "张伟教授升任AI研究院院长，意味着清华将进一步加强人工智能方向的战略投入。该任命可能带来清华AI研究院在资源获取和人才招募方面的显著提升。建议密切关注其上任后的战略规划和人才招聘动向。",
    detail:
      "张伟教授于2025年5月正式就任清华大学人工智能研究院院长。此前他担任计算机系副主任长达6年，在计算机视觉领域具有深厚积累。此次任命被认为是清华大学加强AI布局的关键一步。",
  },
  {
    id: "p2",
    person: "李明远教授",
    fromPosition: "北京大学智能学院副院长",
    toPosition: "离职赴美（斯坦福大学访问教授）",
    institution: "北京大学",
    type: "离职",
    impact: "重大",
    date: "2025-05-06",
    background: "国家杰青，NLP方向领军人物，带走3名博士后",
    aiAnalysis:
      "李明远教授的离职对北大NLP方向将产生较大冲击，其团队核心成员可能面临流散。这对我院是一个引才窗口期。建议立即评估其团队中可争取的青年人才，特别是NLP方向的博士后研究员。",
    detail:
      "李明远教授因个人发展原因，将赴斯坦福大学担任访问教授（为期2年）。其在北大的NLP实验室目前有在读博士8人，博士后3人。据悉其中3名博士后将随其赴美，实验室日常管理将移交副教授刘芳。",
  },
  {
    id: "p3",
    person: "陈思远研究员",
    fromPosition: "中科院物理所研究员",
    toPosition: "中科院量子信息重点实验室主任",
    institution: "中科院",
    type: "任命",
    impact: "较大",
    date: "2025-04-28",
    background: "量子计算领域顶级专家，Nature/Science发文6篇",
    aiAnalysis:
      "陈思远研究员主导的量子纠错码研究近期取得重大突破。其担任实验室主任后，中科院在量子计算领域的投入预计将大幅增加。建议评估与该实验室建立合作关系的可行性。",
    detail:
      "陈思远研究员近期在量子纠错码领域取得Nature Physics发文突破后，被任命为中科院量子信息重点实验室主任。该实验室现有固定研究人员25人，年度经费约8000万元。",
  },
  {
    id: "p4",
    person: "赵俊峰教授",
    fromPosition: "浙江大学化工学院教授",
    toPosition: "浙江大学能源研究院常务副院长",
    institution: "浙江大学",
    type: "调动",
    impact: "较大",
    date: "2025-04-22",
    background: "新能源材料专家，与宁德时代等企业有深度合作",
    aiAnalysis:
      "赵俊峰教授调任能源研究院常务副院长，预示浙大将进一步整合能源方向的产学研资源。其与产业界的密切关系可能为浙大带来更多横向经费和成果转化机会。建议关注浙大能源研究院的发展动向。",
    detail:
      "赵俊峰教授从化工学院调任能源研究院，负责日常管理工作。此次调动被认为是浙大加强新能源方向布局的重要举措。其团队的锂硫电池专利已进入产业化中试阶段。",
  },
  {
    id: "p5",
    person: "王强教授",
    fromPosition: "上海交通大学电子信息学院副院长",
    toPosition: "离职创业（AI芯片公司）",
    institution: "上海交通大学",
    type: "离职",
    impact: "一般",
    date: "2025-04-15",
    background: "集成电路设计专家，拥有多项AI芯片专利",
    aiAnalysis:
      "王强教授离职创业对上交电子信息学院有一定影响，但其方向偏向产业化，对学术竞争格局影响有限。可关注其创业公司的技术路线，评估未来产学研合作的可能性。",
    detail:
      "王强教授辞去上海交通大学教职，创办AI芯片公司「智芯科技」，已获红杉中国A轮投资。其在上交的研究团队将由副教授周磊接管。该离职事件对上交集成电路方向的学科评估可能产生一定影响。",
  },
];

export const mockResearchOutputs: ResearchOutput[] = [
  {
    id: "r1",
    title: "基于多模态大模型的具身智能感知框架",
    institution: "清华大学",
    type: "论文",
    influence: "高",
    date: "2025-05-08",
    field: "具身智能",
    authors: "张明远、李华、王磊等",
    aiAnalysis:
      "该论文在多模态融合方面提出了新的架构方案，直接对标我院同类研究方向。清华在该领域已连续发表3篇顶会论文，形成系统性领先。建议加强我院在视觉-语言联合建模方面的投入。",
    detail:
      "清华大学人工智能研究院在ICRA 2025发表的该论文，提出了一种融合视觉、语言和触觉信号的具身智能感知框架。实验表明该方法在操作任务上提升23%成功率。论文已获领域内高度关注，两周内被引用12次。",
  },
  {
    id: "r2",
    title: "量子纠错码的拓扑优化方法",
    institution: "中科院",
    type: "论文",
    influence: "高",
    date: "2025-05-05",
    field: "量子计算",
    authors: "陈思远、刘伟航等",
    aiAnalysis:
      "中科院在量子纠错码方面取得突破性进展，该方向为量子计算核心瓶颈。建议关注该团队后续研究动态，评估与我院量子计算团队的合作空间。",
    detail:
      "中科院物理所在Nature Physics发表论文，提出了一种新型拓扑量子纠错方案，将逻辑错误率降低了2个数量级。这是国内团队首次在该方向上取得国际领先成果。",
  },
  {
    id: "r3",
    title: "新型锂硫电池正极材料制备工艺（发明专利）",
    institution: "浙江大学",
    type: "专利",
    influence: "中",
    date: "2025-04-28",
    field: "新能源材料",
    authors: "赵俊峰团队",
    aiAnalysis:
      "浙大在新能源材料领域持续布局，该专利具有较高的产业化价值。建议评估我院在类似方向的专利布局是否完整，避免技术路线被抢占。",
    detail:
      "浙江大学化学工程学院获批的该发明专利，公开了一种低成本、高循环稳定性的锂硫电池正极材料制备方法。已与宁德时代建立联合实验室进行中试。",
  },
  {
    id: "r4",
    title: "国家自然科学奖二等奖（脑机接口方向）",
    institution: "北京大学",
    type: "获奖",
    influence: "高",
    date: "2025-04-20",
    field: "脑科学",
    authors: "王建华教授团队",
    aiAnalysis:
      "北大脑机接口团队获得国家级奖项，标志其在该方向的长期积累获得认可。我院脑科学方向需加快高水平成果产出，争取在下一轮评奖中有所突破。",
    detail:
      "北京大学脑科学与类脑研究中心王建华教授团队，凭借「高通量无创脑机接口关键技术及应用」获得2024年度国家自然科学奖二等奖。该团队长期深耕脑机接口领域，已积累专利30余项。",
  },
  {
    id: "r5",
    title: "面向自动驾驶的端到端决策规划算法",
    institution: "上海交通大学",
    type: "论文",
    influence: "中",
    date: "2025-04-15",
    field: "自动驾驶",
    authors: "刘昊天、周明等",
    aiAnalysis:
      "上交在自动驾驶端到端方案上有持续产出，但整体影响力尚未达到头部水平。可持续关注但无需过度警惕。建议我院相关团队重点关注其开源代码的技术路线。",
    detail:
      "上海交通大学计算机科学学院在CVPR 2025发表论文，提出了一种将感知、预测和规划统一在单一Transformer架构中的端到端自动驾驶方案。在nuScenes基准上取得了新的SOTA结果。",
  },
];
