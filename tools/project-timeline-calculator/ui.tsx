"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, ProjectSettings, TimelineCalculation, ExecutionType } from "./types";
import {
  createEmptyTask,
  calculateTimeline,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToJSON,
  downloadFile,
  formatNumber,
  getTaskPresets,
  getProjectPresets,
  generateGanttData,
  debounce,
  generateId
} from "./logic";
import ProjectTimelineCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ProjectTimelineCalculatorUI() {
  const [tasks, setTasks] = useState<Task[]>([createEmptyTask()]);
  const [settings, setSettings] = useState<ProjectSettings>({
    workingDaysPerWeek: 7,
    startDate: new Date().toISOString().split('T')[0]
  });
  
  // Results
  const [calculation, setCalculation] = useState<TimelineCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showGantt, setShowGantt] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const taskPresets = getTaskPresets();
  const projectPresets = getProjectPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      const result = calculateTimeline(tasks, settings);
      setCalculation(result);
    }, 150),
    [tasks, settings]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [tasks, settings, debouncedCalculate]);

  const handleAddTask = () => {
    setTasks([...tasks, createEmptyTask()]);
  };

  const handleRemoveTask = (id: string) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleDuplicateTask = (task: Task) => {
    const newTask = { 
      ...task, 
      id: generateId(),
      name: `${task.name} (Copy)`,
      dependencies: [...task.dependencies]
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (id: string, field: keyof Task, value: any) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const handleApplyTaskPreset = (preset: any) => {
    const newTask: Task = {
      ...createEmptyTask(),
      name: preset.name,
      duration: preset.duration
    };
    setTasks([...tasks, newTask]);
  };

  const handleApplyProjectPreset = (preset: any) => {
    const newTasks = preset.tasks.map((taskData: any) => ({
      ...createEmptyTask(),
      name: taskData.name,
      duration: taskData.duration,
      executionType: taskData.executionType,
      dependencies: []
    }));
    
    // Set up sequential dependencies for the preset
    for (let i = 1; i < newTasks.length; i++) {
      if (newTasks[i-1].executionType === "sequential") {
        newTasks[i].dependencies = [newTasks[i-1].id];
      }
    }
    
    setTasks(newTasks);
  };

  const handleReset = () => {
    setTasks([createEmptyTask()]);
    setSettings({
      workingDaysPerWeek: 7,
      startDate: new Date().toISOString().split('T')[0]
    });
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Project Duration: ${calculation.totalDuration} days | Completion: ${calculation.completionDate} | Tasks: ${calculation.tasks.length}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      const projectName = `Project ${new Date().toLocaleDateString()}`;
      saveToHistory(calculation, projectName);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'project_timeline.txt');
    }
  };

  const handleExportJSON = () => {
    if (calculation) {
      const json = exportToJSON(calculation);
      downloadFile(json, 'project_timeline.json', 'application/json');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: TimelineCalculation) => {
    setTasks(calc.tasks);
    setSettings(calc.settings);
    setShowHistory(false);
  };

  const getAvailableDependencies = (currentTaskId: string) => {
    return tasks.filter(task => task.id !== currentTaskId && task.name.trim());
  };

  const ganttData = calculation ? generateGanttData(calculation) : [];

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Project Timeline Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate project duration with task dependencies and parallel execution. Get completion dates and critical path analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Project Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Project Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={settings.startDate}
                  onChange={(e) => setSettings({...settings, startDate: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days per Week</label>
                <select
                  value={settings.workingDaysPerWeek}
                  onChange={(e) => setSettings({...settings, workingDaysPerWeek: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={5}>5 days (Mon-Fri)</option>
                  <option value={6}>6 days (Mon-Sat)</option>
                  <option value={7}>7 days (Every day)</option>
                </select>
              </div>
            </div>

            {/* Results Display */}
            {calculation && !calculation.errorMessage && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Project Duration
                  </p>
                  <div className="text-3xl font-bold mb-1">
                    {calculation.totalDuration} days
                  </div>
                  <div className="text-sm text-primary-100">
                    Completion: {new Date(calculation.completionDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Tasks:</span>
                    <span className="font-semibold">{calculation.tasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Critical Path:</span>
                    <span className="font-semibold">{calculation.criticalPath.length} tasks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Working Days:</span>
                    <span className="font-semibold">{settings.workingDaysPerWeek}/week</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {calculation?.errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{calculation.errorMessage}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleAddTask}
                className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
              >
                ➕ Add Task
              </button>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                🔄 Reset All
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📜 {showHistory ? 'Hide' : 'Show'} History
              </button>
              {calculation && !calculation.errorMessage && (
                <button
                  onClick={() => setShowGantt(!showGantt)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 {showGantt ? 'Hide' : 'Show'} Timeline
                </button>
              )}
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tasks List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Project Tasks
                </h3>
                <span className="text-sm text-gray-600">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="divide-y divide-gray-100">
                {tasks.map((task, index) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      {/* Task Name */}
                      <div className="md:col-span-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Task Name</label>
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) => handleUpdateTask(task.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          placeholder={`Task ${index + 1}`}
                        />
                      </div>

                      {/* Duration */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Duration (days)</label>
                        <input
                          type="number"
                          value={task.duration || ''}
                          onChange={(e) => handleUpdateTask(task.id, 'duration', parseFloat(e.target.value) || 1)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          placeholder="1"
                          min="0.1"
                          step="0.5"
                        />
                      </div>

                      {/* Dependencies */}
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Depends On</label>
                        <select
                          multiple
                          value={task.dependencies}
                          onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => option.value);
                            handleUpdateTask(task.id, 'dependencies', selected);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          size={2}
                        >
                          <option value="">No dependencies</option>
                          {getAvailableDependencies(task.id).map(dep => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Execution Type */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                        <select
                          value={task.executionType}
                          onChange={(e) => handleUpdateTask(task.id, 'executionType', e.target.value as ExecutionType)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                        >
                          <option value="sequential">Sequential</option>
                          <option value="parallel">Parallel</option>
                        </select>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex items-end gap-1">
                        <button
                          onClick={() => handleDuplicateTask(task)}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => handleRemoveTask(task.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                          disabled={tasks.length === 1}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Task Timeline Info */}
                    {calculation && !calculation.errorMessage && task.name && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Start: Day {task.actualStart + 1} | End: Day {task.actualFinish}
                        </span>
                        {calculation.criticalPath.includes(task.id) && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            Critical Path
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt Chart */}
            {showGantt && calculation && !calculation.errorMessage && ganttData.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Project Timeline
                </h3>
                
                <div className="overflow-x-auto">
                  <div className="min-w-full" style={{ minWidth: `${Math.max(600, calculation.totalDuration * 30)}px` }}>
                    {/* Timeline Header */}
                    <div className="flex items-center mb-4">
                      <div className="w-48 text-sm font-medium text-gray-700">Task</div>
                      <div className="flex-1 flex">
                        {Array.from({ length: Math.ceil(calculation.totalDuration) }, (_, i) => (
                          <div key={i} className="flex-1 text-center text-xs text-gray-500 border-l border-gray-200 px-1">
                            Day {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Bars */}
                    <div className="space-y-2">
                      {ganttData.map((bar) => (
                        <div key={bar.taskId} className="flex items-center">
                          <div className="w-48 text-sm text-gray-900 pr-4 truncate">
                            {bar.taskName}
                          </div>
                          <div className="flex-1 relative h-8">
                            <div
                              className="absolute top-1 h-6 rounded flex items-center justify-center text-white text-xs font-medium"
                              style={{
                                left: `${(bar.startDay / calculation.totalDuration) * 100}%`,
                                width: `${(bar.duration / calculation.totalDuration) * 100}%`,
                                backgroundColor: bar.color,
                                minWidth: '20px'
                              }}
                            >
                              {bar.duration}d
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-600">Critical Path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Regular Tasks</span>
                  </div>
                </div>
              </div>
            )}

            {/* Task Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Tasks
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {taskPresets.slice(0, 8).map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyTaskPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {preset.duration} day{preset.duration !== 1 ? 's' : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Project Templates
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {projectPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyProjectPreset(preset)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-1">{preset.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{preset.description}</div>
                    <div className="text-xs text-gray-500">
                      {preset.tasks.length} tasks
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {calculation && !calculation.errorMessage && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export TXT
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export JSON
                </button>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {entry.projectName || 'Untitled Project'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.totalDuration} days | {entry.calculation.tasks.length} tasks | Completion: {entry.calculation.completionDate}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <ProjectTimelineCalculatorSEO />
      <RelatedTools
        currentTool="project-timeline-calculator"
        tools={['construction-cost-estimator', 'labor-cost-calculator', 'material-cost-calculator']}
      />
    </>
  );
}