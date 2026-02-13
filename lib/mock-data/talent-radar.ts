import type { TalentEntry, MobilityEvent, TalentCandidate } from "@/lib/types/talent-radar";

export const mockTalents: TalentEntry[] = [
  {
    id: "ti1",
    name: "Andrew Ng",
    institution: "Stanford University",
    discipline: "机器学习",
    hIndex: 168,
    influenceScore: 98,
    cooperationStatus: "potential",
    cooperationLabel: "意向中",
    topAwards: ["AAAI Fellow", "ACM Fellow"],
    recentPapers: 12,
    aiAnalysis:
      "吴恩达教授在AI教育和产业化方面具有全球影响力。建议通过其在线教育平台合作切入，探讨联合开设AI课程或共建AI教育实验室的可能性。",
    profile:
      "斯坦福大学计算机系客座教授，Coursera联合创始人，Landing AI创始人。曾任百度首席科学家、Google Brain创始人。在深度学习和AI教育方面具有开创性贡献。",
  },
  {
    id: "ti2",
    name: "Yann LeCun",
    institution: "Meta AI / NYU",
    discipline: "深度学习",
    hIndex: 182,
    influenceScore: 97,
    cooperationStatus: "none",
    cooperationLabel: "未接触",
    topAwards: ["图灵奖", "IEEE Fellow", "ACM Fellow"],
    recentPapers: 8,
    aiAnalysis:
      "LeCun教授是深度学习三巨头之一，学术影响力极高。建议通过其在NYU的实验室寻找博士后合作机会，或邀请其参加我院学术论坛作为主讲嘉宾。",
    profile:
      "Meta首席AI科学家，纽约大学Silver教授。2018年图灵奖获得者（与Hinton、Bengio共享）。卷积神经网络先驱，对计算机视觉和自监督学习有奠基性贡献。",
  },
  {
    id: "ti3",
    name: "李飞飞",
    institution: "Stanford HAI",
    discipline: "计算机视觉",
    hIndex: 145,
    influenceScore: 95,
    cooperationStatus: "active",
    cooperationLabel: "合作中",
    topAwards: ["ACM Fellow", "NAE Member"],
    recentPapers: 15,
    aiAnalysis:
      "李飞飞教授已与我院建立合作关系，联合培养2名博士生。建议深化合作：共同申请中美联合研究基金，并邀请其担任我院国际学术委员会成员。",
    profile:
      "斯坦福大学计算机系教授，Stanford HAI联合主任。ImageNet创始人，视觉智能领域先驱。美国国家工程院院士。曾任Google Cloud AI/ML首席科学家。",
  },
  {
    id: "ti4",
    name: "Demis Hassabis",
    institution: "Google DeepMind",
    discipline: "人工通用智能",
    hIndex: 98,
    influenceScore: 96,
    cooperationStatus: "potential",
    cooperationLabel: "意向中",
    topAwards: ["诺贝尔化学奖", "FRS"],
    recentPapers: 6,
    aiAnalysis:
      "Hassabis博士领导的DeepMind在AI for Science方面成果卓著。建议通过AlphaFold相关的蛋白质研究方向寻求合作切入点，与我院生物计算课题组对接。",
    profile:
      "Google DeepMind联合创始人兼CEO。2024年诺贝尔化学奖获得者（AlphaFold）。在强化学习、神经科学与AI交叉领域做出突破性贡献。",
  },
  {
    id: "ti5",
    name: "朱松纯",
    institution: "北京大学",
    discipline: "认知AI",
    hIndex: 112,
    influenceScore: 92,
    cooperationStatus: "active",
    cooperationLabel: "合作中",
    topAwards: ["Helmholtz Prize", "ACM Fellow"],
    recentPapers: 18,
    aiAnalysis:
      "朱松纯教授在通用人工智能理论方面国内领先。当前合作项目进展顺利，建议扩展合作范围至具身智能和认知推理方向，共同申请科技部重点研发计划。",
    profile:
      "北京大学人工智能研究院院长，讲席教授。曾任UCLA统计系与计算机系教授20余年。在视觉认知、场景理解和通用AI理论方面有深厚积累。Marr Prize获得者。",
  },
];

export const mockMobilityEvents: MobilityEvent[] = [
  {
    id: "am1",
    talentName: "赵伟强",
    fromInstitution: "清华大学",
    toInstitution: "我院",
    direction: "强化学习",
    impact: "high",
    impactLabel: "重大利好",
    date: "2025-01-15",
    type: "inflow",
    typeLabel: "流入",
    aiAnalysis:
      "赵伟强教授从清华大学加盟我院，将显著增强我院在强化学习方向的研究实力。建议为其配备3名博士生和1名博士后，优先安排其参与国家重点研发项目申报。其在清华的研究团队中有2名学生有意随行，建议积极争取。",
    detail:
      "赵伟强，清华大学计算机系副教授，强化学习方向知名学者。发表NeurIPS/ICML论文22篇。因获得我院人才特聘计划支持，决定全职加盟。预计2月正式入职。",
  },
  {
    id: "am2",
    talentName: "孙梦瑶",
    fromInstitution: "我院",
    toInstitution: "上海交通大学",
    direction: "自然语言处理",
    impact: "high",
    impactLabel: "重大损失",
    date: "2025-01-08",
    type: "outflow",
    typeLabel: "流出",
    aiAnalysis:
      "孙梦瑶教授的离职对我院NLP方向影响重大，她带走了3个在研项目和2名核心博士生。建议紧急启动NLP方向人才补充计划，同时与孙教授保持学术联系，争取后续合作可能。短期内可安排其他教师接手在研课题。",
    detail:
      "孙梦瑶，我院NLP方向学术带头人，副教授。上海交通大学以长聘教授岗位、实验室主任职位及200万安家费将其挖走。她在我院工作6年，培养硕博士15人。",
  },
  {
    id: "am3",
    talentName: "陈国栋",
    fromInstitution: "浙江大学",
    toInstitution: "我院",
    direction: "计算机视觉",
    impact: "medium",
    impactLabel: "正面影响",
    date: "2024-12-20",
    type: "inflow",
    typeLabel: "流入",
    aiAnalysis:
      "陈国栋博士以特聘研究员身份加盟，填补了我院在3D视觉方向的空白。建议安排其与现有CV团队整合，共同开展跨方向合作研究。可推荐其申报北京市科技新星计划。",
    detail:
      "陈国栋，浙江大学博士后出站，3D计算机视觉方向。在CVPR/ICCV发表论文12篇，获CVPR 2024最佳论文提名。我院以特聘研究员岗位和50万启动经费引进。",
  },
  {
    id: "am4",
    talentName: "林志远",
    fromInstitution: "北京大学",
    toInstitution: "中国科学院",
    direction: "AI for Science",
    impact: "medium",
    impactLabel: "值得关注",
    date: "2024-12-10",
    type: "external",
    typeLabel: "外部",
    aiAnalysis:
      "林志远教授从北大转入中科院，反映出AI for Science方向人才竞争加剧。我院该方向目前有2名教师，建议关注北大因此空出的合作机会，同时加强与中科院的联系。",
    detail:
      "林志远，北京大学前沿计算研究中心副教授，AI for Science方向。中科院以研究员岗位+重大科学装置使用权吸引其加盟。此举将影响北大在AI+生物方向的布局。",
  },
  {
    id: "am5",
    talentName: "黄晓峰",
    fromInstitution: "我院",
    toInstitution: "华为2012实验室",
    direction: "大模型训练",
    impact: "medium",
    impactLabel: "人才流失",
    date: "2024-11-28",
    type: "outflow",
    typeLabel: "流出",
    aiAnalysis:
      "黄晓峰副教授转投产业界，薪资是原来的4倍。这反映了大模型方向高校人才向产业流失的趋势。建议出台产学研融合政策，允许教师在保留教职的同时参与企业研发，从机制上减少人才流失。",
    detail:
      "黄晓峰，我院副教授，大模型分布式训练方向。华为2012实验室以年薪200万+股票期权将其挖走。其在我院负责的GPU集群管理和大模型训练平台工作需要紧急交接。",
  },
];

export const mockReturnCandidates: TalentCandidate[] = [
  {
    id: "rc1",
    name: "张明远",
    institution: "MIT CSAIL",
    country: "美国",
    direction: "具身智能",
    intention: "high",
    intentionLabel: "高意向",
    status: "已接触",
    yearsAbroad: 8,
    publications: 42,
    aiStrategy:
      "张明远博士近期在社交媒体提及回国意向，且其配偶已回国任职。建议院长亲自发出邀请函，提供实验室启动经费500万元及博士生名额5个，安排下月校园参观。",
    profile:
      "MIT计算机科学与人工智能实验室资深研究科学家，具身智能方向领军人物。发表ICRA/RSS顶会论文42篇，Google Scholar引用量8200+。近期获得NSF Career Award。",
  },
  {
    id: "rc2",
    name: "李思琪",
    institution: "Stanford HAI",
    country: "美国",
    direction: "AI安全与对齐",
    intention: "high",
    intentionLabel: "高意向",
    status: "面谈中",
    yearsAbroad: 6,
    publications: 35,
    aiStrategy:
      "李思琪教授已确认参加下月北京AI安全论坛，这是面对面沟通的最佳时机。建议提供长聘教授岗位，年薪80万+安家费，并承诺组建AI安全实验室。",
    profile:
      "斯坦福人工智能研究所副教授，AI安全方向权威学者。NeurIPS/ICML最佳论文奖获得者。曾任OpenAI安全团队顾问。",
  },
  {
    id: "rc3",
    name: "王浩然",
    institution: "Google DeepMind",
    country: "英国",
    direction: "多模态大模型",
    intention: "medium",
    intentionLabel: "中意向",
    status: "初步沟通",
    yearsAbroad: 10,
    publications: 58,
    aiStrategy:
      "王浩然在DeepMind工作稳定但近期关注国内发展。建议通过学术合作（联合发表论文、联合培养博士生）建立长期联系，逐步提升回国意向。",
    profile:
      "Google DeepMind高级研究科学家，多模态学习方向核心成员。参与Gemini项目研发。Nature Machine Intelligence发表3篇论文。",
  },
  {
    id: "rc4",
    name: "陈雨桐",
    institution: "CMU Robotics Institute",
    country: "美国",
    direction: "机器人学习",
    intention: "high",
    intentionLabel: "高意向",
    status: "即将回国",
    yearsAbroad: 5,
    publications: 28,
    aiStrategy:
      "陈雨桐已获得国家级青年人才计划资助，预计3个月内回国。建议尽快落实实验室空间（200平米）、设备采购预算及行政支持，确保其顺利入职。",
    profile:
      "CMU机器人研究所博士后研究员，机器人强化学习方向新锐学者。CoRL最佳论文奖。已获批国家海外高层次青年人才引进计划。",
  },
  {
    id: "rc5",
    name: "刘芳华",
    institution: "ETH Zurich",
    country: "瑞士",
    direction: "计算机视觉",
    intention: "low",
    intentionLabel: "低意向",
    status: "持续关注",
    yearsAbroad: 12,
    publications: 76,
    aiStrategy:
      "刘芳华教授在ETH任正教授，短期回国可能性较低。建议采取柔性引才策略：聘为兼职教授，每年来校2-3次进行学术交流和研究生指导。",
    profile:
      "苏黎世联邦理工学院正教授，计算机视觉方向国际顶尖学者。CVPR/ICCV/ECCV发表论文76篇，H指数62。IEEE Fellow。",
  },
];
