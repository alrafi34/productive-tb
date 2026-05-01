import { Task, ProjectSettings, TimelineCalculation, ExecutionType, HistoryEntry, TaskPreset, ProjectPreset, GanttBarData } from "./types";

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Create empty task
export function createEmptyTask(): Task {
  return {
    id: generateId(),
    name: "",
    duration: 1,
    dependencies: [],
    executionType: "sequential",
    earliestStart: 0,
    earliestFinish: 0,
    actualStart: 0,
    actualFinish: 0
  };
}

// Validation
export function validateTasks(tasks: Task[]): string | null {
  // Check for empty names
  const emptyNames = tasks.filter(task => !task.name.trim());
  if (emptyNames.length > 0) {
    return "All tasks must have names";
  }

  // Check for invalid durations
  const invalidDurations = tasks.filter(task => task.duration <= 0);
  if (invalidDurations.length > 0) {
    return "All tasks must have positive durations";
  }

  // Check for circular dependencies
  const circularCheck = detectCircularDependencies(tasks);
  if (circularCheck) {
    return `Circular dependency detected: ${circularCheck}`;
  }

  return null;
}

// Detect circular dependencies using DFS
export function detectCircularDependencies(tasks: Task[]): string | null {
  const taskMap = new Map(tasks.map(task => [task.id, task]));
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(taskId: string, path: string[]): string | null {
    if (recursionStack.has(taskId)) {
      const cycleStart = path.indexOf(taskId);
      const cycle = path.slice(cycleStart).concat(taskId);
      return cycle.map(id => taskMap.get(id)?.name || id).join(" → ");
    }

    if (visited.has(taskId)) {
      return null;
    }

    visited.add(taskId);
    recursionStack.add(taskId);
    path.push(taskId);

    const task = taskMap.get(taskId);
    if (task) {
      for (const depId of task.dependencies) {
        const result = dfs(depId, [...path]);
        if (result) return result;
      }
    }

    recursionStack.delete(taskId);
    return null;
  }

  for (const task of tasks) {
    if (!visited.has(task.id)) {
      const result = dfs(task.id, []);
      if (result) return result;
    }
  }

  return null;
}

// Topological sort for task scheduling
export function topologicalSort(tasks: Task[]): Task[] {
  const taskMap = new Map(tasks.map(task => [task.id, task]));
  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();

  // Initialize
  tasks.forEach(task => {
    inDegree.set(task.id, 0);
    adjList.set(task.id, []);
  });

  // Build adjacency list and calculate in-degrees
  tasks.forEach(task => {
    task.dependencies.forEach(depId => {
      if (taskMap.has(depId)) {
        adjList.get(depId)?.push(task.id);
        inDegree.set(task.id, (inDegree.get(task.id) || 0) + 1);
      }
    });
  });

  // Kahn's algorithm
  const queue: string[] = [];
  const result: Task[] = [];

  // Add tasks with no dependencies
  inDegree.forEach((degree, taskId) => {
    if (degree === 0) {
      queue.push(taskId);
    }
  });

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const currentTask = taskMap.get(currentId);
    if (currentTask) {
      result.push(currentTask);
    }

    // Process neighbors
    adjList.get(currentId)?.forEach(neighborId => {
      const newDegree = (inDegree.get(neighborId) || 0) - 1;
      inDegree.set(neighborId, newDegree);
      if (newDegree === 0) {
        queue.push(neighborId);
      }
    });
  }

  return result;
}

// Calculate project timeline using Critical Path Method (CPM)
export function calculateTimeline(
  tasks: Task[],
  settings: ProjectSettings
): TimelineCalculation {
  const calculation: TimelineCalculation = {
    id: generateId(),
    timestamp: Date.now(),
    tasks: [...tasks],
    settings: { ...settings },
    totalDuration: 0,
    completionDate: "",
    criticalPath: [],
    hasCircularDependency: false
  };

  // Validate tasks
  const validationError = validateTasks(tasks);
  if (validationError) {
    calculation.errorMessage = validationError;
    calculation.hasCircularDependency = validationError.includes("Circular dependency");
    return calculation;
  }

  if (tasks.length === 0) {
    calculation.completionDate = settings.startDate;
    return calculation;
  }

  // Create task map for quick lookup
  const taskMap = new Map(tasks.map(task => [task.id, { ...task }]));

  // Forward pass - calculate earliest start and finish times
  const sortedTasks = topologicalSort(Array.from(taskMap.values()));

  sortedTasks.forEach(task => {
    const currentTask = taskMap.get(task.id)!;
    
    if (currentTask.dependencies.length === 0) {
      currentTask.earliestStart = 0;
    } else {
      let maxFinish = 0;
      currentTask.dependencies.forEach(depId => {
        const depTask = taskMap.get(depId);
        if (depTask) {
          maxFinish = Math.max(maxFinish, depTask.earliestFinish);
        }
      });
      currentTask.earliestStart = maxFinish;
    }
    
    currentTask.earliestFinish = currentTask.earliestStart + currentTask.duration;
    currentTask.actualStart = currentTask.earliestStart;
    currentTask.actualFinish = currentTask.earliestFinish;
  });

  // Calculate total project duration
  const maxFinish = Math.max(...Array.from(taskMap.values()).map(task => task.earliestFinish));
  calculation.totalDuration = maxFinish;

  // Calculate completion date
  const startDate = new Date(settings.startDate);
  const completionDate = addWorkingDays(startDate, maxFinish, settings.workingDaysPerWeek);
  calculation.completionDate = completionDate.toISOString().split('T')[0];

  // Find critical path (tasks with zero slack)
  const criticalTasks = Array.from(taskMap.values()).filter(task => 
    task.earliestFinish === maxFinish || 
    Array.from(taskMap.values()).some(t => 
      t.dependencies.includes(task.id) && t.earliestStart === task.earliestFinish
    )
  );
  
  calculation.criticalPath = criticalTasks.map(task => task.id);
  calculation.tasks = Array.from(taskMap.values());

  return calculation;
}

// Add working days to a date
export function addWorkingDays(startDate: Date, days: number, workingDaysPerWeek: number): Date {
  const result = new Date(startDate);
  let addedDays = 0;
  let totalDays = 0;

  while (addedDays < days) {
    totalDays++;
    const dayOfWeek = (result.getDay() + totalDays - 1) % 7;
    
    if (workingDaysPerWeek === 7 || 
        (workingDaysPerWeek === 6 && dayOfWeek !== 6) || 
        (workingDaysPerWeek === 5 && dayOfWeek < 5)) {
      addedDays++;
    }
  }

  result.setDate(result.getDate() + totalDays);
  return result;
}

// Format number
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

// Get task presets
export function getTaskPresets(): TaskPreset[] {
  return [
    { name: "Site Preparation", duration: 3, category: "Foundation", description: "Clear and level site" },
    { name: "Excavation", duration: 2, category: "Foundation", description: "Dig foundation" },
    { name: "Foundation", duration: 5, category: "Foundation", description: "Pour concrete foundation" },
    { name: "Framing", duration: 8, category: "Structure", description: "Build structural frame" },
    { name: "Roofing", duration: 4, category: "Structure", description: "Install roof structure" },
    { name: "Electrical Rough-in", duration: 3, category: "Systems", description: "Install electrical wiring" },
    { name: "Plumbing Rough-in", duration: 3, category: "Systems", description: "Install plumbing" },
    { name: "HVAC Installation", duration: 4, category: "Systems", description: "Install heating/cooling" },
    { name: "Insulation", duration: 2, category: "Finishing", description: "Install insulation" },
    { name: "Drywall", duration: 5, category: "Finishing", description: "Install and finish drywall" },
    { name: "Flooring", duration: 4, category: "Finishing", description: "Install flooring" },
    { name: "Interior Painting", duration: 3, category: "Finishing", description: "Paint interior walls" },
    { name: "Exterior Finishing", duration: 6, category: "Finishing", description: "Siding and exterior work" },
    { name: "Final Inspection", duration: 1, category: "Completion", description: "Final building inspection" }
  ];
}

// Get project presets
export function getProjectPresets(): ProjectPreset[] {
  return [
    {
      name: "Small House Construction",
      description: "Basic residential construction timeline",
      tasks: [
        { name: "Site Prep", duration: 3, dependencies: [], executionType: "sequential" },
        { name: "Foundation", duration: 5, dependencies: [], executionType: "sequential" },
        { name: "Framing", duration: 8, dependencies: [], executionType: "sequential" },
        { name: "Roofing", duration: 4, dependencies: [], executionType: "sequential" },
        { name: "Systems", duration: 6, dependencies: [], executionType: "sequential" },
        { name: "Finishing", duration: 10, dependencies: [], executionType: "sequential" }
      ]
    },
    {
      name: "Office Renovation",
      description: "Commercial office space renovation",
      tasks: [
        { name: "Planning & Permits", duration: 5, dependencies: [], executionType: "sequential" },
        { name: "Demolition", duration: 3, dependencies: [], executionType: "sequential" },
        { name: "Electrical Work", duration: 4, dependencies: [], executionType: "parallel" },
        { name: "Plumbing Work", duration: 3, dependencies: [], executionType: "parallel" },
        { name: "Flooring", duration: 5, dependencies: [], executionType: "sequential" },
        { name: "Painting & Finishing", duration: 4, dependencies: [], executionType: "sequential" }
      ]
    },
    {
      name: "Software Development",
      description: "Basic software project timeline",
      tasks: [
        { name: "Requirements", duration: 5, dependencies: [], executionType: "sequential" },
        { name: "Design", duration: 8, dependencies: [], executionType: "sequential" },
        { name: "Frontend Development", duration: 15, dependencies: [], executionType: "parallel" },
        { name: "Backend Development", duration: 12, dependencies: [], executionType: "parallel" },
        { name: "Testing", duration: 6, dependencies: [], executionType: "sequential" },
        { name: "Deployment", duration: 2, dependencies: [], executionType: "sequential" }
      ]
    }
  ];
}

// Generate Gantt chart data
export function generateGanttData(calculation: TimelineCalculation): GanttBarData[] {
  if (!calculation.tasks || calculation.tasks.length === 0) {
    return [];
  }

  const colors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#06B6D4", "#F97316", "#84CC16", "#EC4899", "#6B7280"
  ];

  return calculation.tasks.map((task, index) => ({
    taskId: task.id,
    taskName: task.name,
    startDay: task.actualStart,
    duration: task.duration,
    isCritical: calculation.criticalPath.includes(task.id),
    color: calculation.criticalPath.includes(task.id) ? "#EF4444" : colors[index % colors.length]
  }));
}

// History management
const STORAGE_KEY = "project-timeline-calculator-history";

export function saveToHistory(calculation: TimelineCalculation, projectName?: string): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      calculation,
      projectName
    };
    
    history.unshift(entry);
    
    // Keep only last 20 entries
    const trimmedHistory = history.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functions
export function exportToText(calculation: TimelineCalculation): string {
  const lines = [
    "PROJECT TIMELINE CALCULATION REPORT",
    "=" + "=".repeat(40),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Project Duration: ${calculation.totalDuration} days`,
    `Completion Date: ${calculation.completionDate}`,
    `Working Days per Week: ${calculation.settings.workingDaysPerWeek}`,
    "",
    "TASK BREAKDOWN:",
    "-".repeat(50),
  ];

  calculation.tasks.forEach((task, index) => {
    lines.push(
      `${index + 1}. ${task.name}`,
      `   Duration: ${task.duration} days`,
      `   Start: Day ${task.actualStart + 1}`,
      `   End: Day ${task.actualFinish}`,
      `   Dependencies: ${task.dependencies.length > 0 ? 
        task.dependencies.map(id => 
          calculation.tasks.find(t => t.id === id)?.name || id
        ).join(", ") : "None"}`,
      `   Critical: ${calculation.criticalPath.includes(task.id) ? "Yes" : "No"}`,
      ""
    );
  });

  if (calculation.criticalPath.length > 0) {
    lines.push(
      "CRITICAL PATH:",
      "-".repeat(20),
      calculation.criticalPath.map(id => 
        calculation.tasks.find(t => t.id === id)?.name || id
      ).join(" → "),
      ""
    );
  }

  lines.push(
    "Generated by Project Timeline Calculator",
    `Report generated on ${new Date().toLocaleString()}`
  );

  return lines.join("\n");
}

export function exportToJSON(calculation: TimelineCalculation): string {
  const exportData = {
    projectName: "Untitled Project",
    createdDate: new Date(calculation.timestamp).toISOString(),
    settings: calculation.settings,
    tasks: calculation.tasks.map(task => ({
      name: task.name,
      duration: task.duration,
      dependencies: task.dependencies.map(id => 
        calculation.tasks.find(t => t.id === id)?.name || id
      ),
      executionType: task.executionType
    })),
    results: {
      totalDuration: calculation.totalDuration,
      completionDate: calculation.completionDate,
      criticalPath: calculation.criticalPath.map(id => 
        calculation.tasks.find(t => t.id === id)?.name || id
      )
    }
  };

  return JSON.stringify(exportData, null, 2);
}

export function downloadFile(content: string, filename: string, mimeType: string = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}