
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const analyzeTender = async (tenderContent: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `请作为一名资深的政府采购评审专家，分析以下招标文件的核心要点。请识别其中的：1. 技术门槛 2. 商务风险点 3. 预算合理性。内容如下：\n\n${tenderContent}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "项目背景与目标摘要" },
          risks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "潜在风险列表" 
          },
          suggestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "对供应商或评审专家的建议" 
          },
          score: { type: Type.NUMBER, description: "文档合规性评分 (0-100)" }
        },
        required: ["summary", "risks", "suggestions", "score"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const compareBids = async (tender: string, bids: string[]) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `请对比以下招标要求与多个供应商的投标方案，给出客观的优劣势分析报告。\n\n招标要求：${tender}\n\n供应商投标方案：\n${bids.join('\n---方案分隔---\n')}`,
    config: {
      systemInstruction: "你是一个极其公正的评标机器人，擅长从数百万字标书中提取关键差异。"
    }
  });
  return response.text;
};
