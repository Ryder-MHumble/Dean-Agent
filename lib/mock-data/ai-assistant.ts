import type { ChatMessage } from "@/lib/types/ai-assistant";

export const quickActions = [
  "今日日程概览",
  "生成周报草稿",
  "查看政策匹配",
  "人才动态摘要",
  "本周状态汇总",
];

export const initialMessage: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "早安，院长！今日有3项待办、1个日程冲突需要处理。有什么我可以帮您的吗？",
  timestamp: new Date(),
};

export function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("日程") || msg.includes("会议") || msg.includes("安排")) {
    return "今日共有4项安排：\n\n1. 09:00 Q3战略技术审查会 (ROI: 85) ✅ 已确认\n2. 11:00 内部运营审计 ✅ 已确认\n3. 14:00 人才引进委员会 ⚠️ 与部委电话会议冲突\n4. 16:00 审查伦理委员会报告 ⏰ 今日截止\n\n建议优先处理14:00的冲突，可授权副手代为出席人才引进委员会。";
  }

  if (msg.includes("政策") || msg.includes("申报")) {
    return "当前有3条高匹配度政策：\n\n1. 🔴 算力基础设施补贴（匹配度98%，剩余5天）\n   - 资金规模：500-1000万\n   - 建议：李副主任牵头紧急申报\n\n2. 🟡 新一代人工智能重大专项（匹配度85%，剩余12天）\n   - 资金规模：2000-5000万\n\n3. 🟢 科技伦理治理试点（匹配度72%，剩余20天）\n\n需要我起草申报材料吗？";
  }

  if (msg.includes("报告") || msg.includes("草稿") || msg.includes("周报")) {
    return "好的，我来为您生成本周工作报告草稿：\n\n📋 **本周工作总结**\n\n一、政策动态\n- 北京科委算力补贴政策发布，已启动申报\n- 科技部AI专项进入评审阶段\n\n二、内部管理\n- 大模型基座项目延期15天，已督办\n- Q1预算执行率提升至18%\n\n三、竞争态势\n- 清华AIR发布2篇具身智能顶会论文\n- 智源研究院获2亿专项资金\n\n报告已保存到草稿箱，需要我调整内容吗？";
  }

  if (msg.includes("人才") || msg.includes("招聘")) {
    return "人才动态摘要：\n\n📊 **人才引进**\n- 3名海外候选人进入终审阶段\n- Stanford张教授明确回国意向（薪酬谈判中）\n\n⚠️ **竞争预警**\n- 清华AIR从谷歌挖角2名高级研究员\n- 我院薪酬竞争力指数降至行业第4\n\n🎉 **人脉维护**\n- 王教授当选IEEE Fellow，建议发祝贺\n- 张院士近期有合作意向，建议安排拜访\n\n需要我安排相关会议吗？";
  }

  if (msg.includes("状态") || msg.includes("汇总") || msg.includes("总结")) {
    return "本周状态汇总：\n\n📌 **需要关注（2项）**\n1. 舆情动态：小红书出现实验室管理相关评论\n   → 公关处已介入处理\n2. 项目进度：大模型基座采购停滞15天\n   → 建议院长直接协调\n\n📋 **待跟进（2项）**\n1. 预算执行率仅12%（目标25%）\n2. 科技部专项申报材料准备度30%\n\n✅ **正常推进（1项）**\n1. 2名学生心理关注（学工处跟进中）";
  }

  return "收到！让我查看一下相关信息...\n\n目前我可以帮您：\n• 查看今日日程和冲突处理\n• 检索政策匹配机会\n• 生成工作报告草稿\n• 查看人才动态和竞争情报\n• 本周状态汇总\n\n请告诉我您需要了解什么？";
}
