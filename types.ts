
export enum ProjectStatus {
  DRAFT = '草拟中',
  PUBLISHED = '招标中',
  BIDDING = '投标中',
  EVALUATING = '评标中',
  AWARDED = '已定标',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export interface Project {
  id: string;
  title: string;
  code: string;
  budget: number;
  deadline: string;
  status: ProjectStatus;
  category: string;
  description: string;
  owner: string;
  publishDate: string;
}

export interface Bidder {
  id: string;
  name: string;
  price: number;
  score?: number;
  submissionTime: string;
  qualification: '合格' | '不合格';
  documents: string[];
}

export interface AnalysisResult {
  summary: string;
  risks: string[];
  suggestions: string[];
  score: number;
}
