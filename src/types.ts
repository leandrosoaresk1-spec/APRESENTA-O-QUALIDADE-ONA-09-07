/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RMByArea {
  area: string;
  count: number;
  color?: string;
}

export interface RMType {
  title: string;
  category: string;
}

export interface RMAttentionPoint {
  id: string;
  text: string;
  type: 'critical' | 'warning' | 'info';
}

export interface DocumentPending {
  area: string;
  count: number;
  items: string[];
}

export interface ActionPlan {
  id: string;
  title: string;
  area: string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  actionNeeded: string;
}

export interface ActionPlanGuideline {
  text: string;
  isImportant?: boolean;
}

export interface ONAPendingItem {
  id: string;
  title: string;
  responsible: string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  details: string;
  requirement?: string;
  steps?: { name: string; completed: boolean }[];
  progress?: number;
}

export interface PresentationData {
  metadata: {
    title: string;
    subtitle: string;
    date: string;
    author: string;
  };
  comparative: {
    dates: {
      past: string;
      current: string;
    };
    metrics: {
      rm: { past: number; current: number; change: string; trend: 'up' | 'down' | 'stable' };
      documentation: { past: number; current: number; change: string; trend: 'up' | 'down' | 'stable' };
      actionPlans: { past: number; current: number; change: string; trend: 'up' | 'down' | 'stable' };
    };
    insight: string;
  };
  rmSlide: {
    byArea: RMByArea[];
    mainIssues: string[];
    attentionPoints: RMAttentionPoint[];
  };
  documentationSlide: {
    byArea: DocumentPending[];
    observation: string;
  };
  actionPlansSlide: {
    plans: ActionPlan[];
    guidelines: ActionPlanGuideline[];
  };
  onaSlide: {
    items: ONAPendingItem[];
  };
  nextStepsSlide: {
    steps: { text: string; completed: boolean; category: string }[];
  };
}
