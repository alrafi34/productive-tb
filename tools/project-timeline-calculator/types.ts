export type ExecutionType = "sequential" | "parallel";

export interface Task {
  id: string;
  name: string;
  duration: number; // in days
  dependencies: string[]; // array of task IDs
  executionType: ExecutionType;
  
  // Calculated values
  earliestStart: number;
  earliestFinish: number;
  actualStart: number;
  actualFinish: number;
}

export interface ProjectSettings {
  workingDaysPerWeek: number;
  startDate: string;
}

export interface TimelineCalculation {
  id: string;
  timestamp: number;
  tasks: Task[];
  settings: ProjectSettings;
  
  // Calculated results
  totalDuration: number; // in days
  completionDate: string;
  criticalPath: string[];
  hasCircularDependency: boolean;
  errorMessage?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: TimelineCalculation;
  projectName?: string;
}

export interface TaskPreset {
  name: string;
  duration: number;
  category: string;
  description: string;
}

export interface ProjectPreset {
  name: string;
  description: string;
  tasks: Omit<Task, 'id' | 'earliestStart' | 'earliestFinish' | 'actualStart' | 'actualFinish'>[];
}

export interface GanttBarData {
  taskId: string;
  taskName: string;
  startDay: number;
  duration: number;
  isCritical: boolean;
  color: string;
}