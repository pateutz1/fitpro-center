import { useCallback, useEffect, useRef, useState } from 'react';

// Performance metrics interface
interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  animationCount: number;
  droppedFrames: number;
  memoryUsage?: number;
  renderTime: number;
  totalAnimationTime: number;
  averageFrameTime: number;
}

// Animation performance tracker
interface AnimationTracker {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number;
  frameCount: number;
  droppedFrames: number;
  component: string;
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    animationCount: 0,
    droppedFrames: 0,
    renderTime: 0,
    totalAnimationTime: 0,
    averageFrameTime: 0,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const [performanceLog, setPerformanceLog] = useState<AnimationTracker[]>([]);

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef(performance.now());
  const frameTimesRef = useRef<number[]>([]);
  const activeAnimationsRef = useRef<Map<string, AnimationTracker>>(new Map());

  // Get memory usage if available
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (
        performance as unknown as { memory: { usedJSHeapSize: number } }
      ).memory;
      return memory.usedJSHeapSize / 1_048_576; // Convert to MB
    }
    return;
  }, []);

  // Helper function to calculate average frame time
  const calculateAverageFrameTime = useCallback(() => {
    if (frameTimesRef.current.length === 0) {
      return 0;
    }
    return (
      frameTimesRef.current.reduce((a, b) => a + b, 0) /
      frameTimesRef.current.length
    );
  }, []);

  // Helper function to update frame metrics
  const updateFrameMetrics = useCallback(
    (fps: number, delta: number, now: number) => {
      const averageFrameTime = calculateAverageFrameTime();

      setMetrics((prev) => ({
        ...prev,
        fps,
        frameTime: delta / frameCountRef.current,
        averageFrameTime,
        animationCount: activeAnimationsRef.current.size,
        droppedFrames: Math.max(0, 60 - fps), // Assuming 60fps target
        memoryUsage: getMemoryUsage(),
      }));

      frameCountRef.current = 0;
      lastTimeRef.current = now;
      frameTimesRef.current = [];
    },
    [calculateAverageFrameTime, getMemoryUsage]
  );

  // Helper function to track frame time
  const trackFrameTime = useCallback((now: number) => {
    if (frameTimesRef.current.length > 0) {
      const lastFrameTime = frameTimesRef.current.at(-1);
      frameTimesRef.current.push(now - (lastFrameTime ?? now));
    } else {
      frameTimesRef.current.push(16.67); // Default 60fps frame time
    }
  }, []);

  // FPS calculation
  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;

    if (delta >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / delta);
      updateFrameMetrics(fps, delta, now);
    }

    frameCountRef.current++;
    trackFrameTime(now);

    if (isMonitoring) {
      animationFrameRef.current = requestAnimationFrame(calculateFPS);
    }
  }, [isMonitoring, updateFrameMetrics, trackFrameTime]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    startTimeRef.current = performance.now();
    lastTimeRef.current = performance.now();
    frameCountRef.current = 0;
    frameTimesRef.current = [];
    calculateFPS();
  }, [calculateFPS]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Track animation start
  const trackAnimationStart = useCallback((id: string, component: string) => {
    const tracker: AnimationTracker = {
      id,
      startTime: performance.now(),
      duration: 0,
      frameCount: 0,
      droppedFrames: 0,
      component,
    };

    activeAnimationsRef.current.set(id, tracker);

    setMetrics((prev) => ({
      ...prev,
      animationCount: activeAnimationsRef.current.size,
    }));
  }, []);

  // Track animation end
  const trackAnimationEnd = useCallback((id: string) => {
    const tracker = activeAnimationsRef.current.get(id);
    if (tracker) {
      const endTime = performance.now();
      const completedTracker = {
        ...tracker,
        endTime,
        duration: endTime - tracker.startTime,
      };

      activeAnimationsRef.current.delete(id);
      setPerformanceLog((prev) => [...prev, completedTracker]);

      setMetrics((prev) => ({
        ...prev,
        animationCount: activeAnimationsRef.current.size,
        totalAnimationTime: prev.totalAnimationTime + completedTracker.duration,
      }));
    }
  }, []);

  // Helper function to calculate FPS penalty
  const calculateFpsPenalty = useCallback((fps: number) => {
    if (fps < 30) {
      return 40;
    }
    if (fps < 45) {
      return 20;
    }
    if (fps < 55) {
      return 10;
    }
    return 0;
  }, []);

  // Helper function to calculate frame time penalty
  const calculateFrameTimePenalty = useCallback((averageFrameTime: number) => {
    if (averageFrameTime > 33) {
      return 20;
    }
    if (averageFrameTime > 20) {
      return 10;
    }
    return 0;
  }, []);

  // Helper function to calculate animation count penalty
  const calculateAnimationCountPenalty = useCallback(
    (animationCount: number) => {
      if (animationCount > 10) {
        return 15;
      }
      if (animationCount > 5) {
        return 5;
      }
      return 0;
    },
    []
  );

  // Helper function to calculate memory usage penalty
  const calculateMemoryPenalty = useCallback((memoryUsage?: number) => {
    if (memoryUsage && memoryUsage > 100) {
      return 10;
    }
    return 0;
  }, []);

  // Calculate performance score (0-100)
  const calculatePerformanceScore = useCallback(() => {
    let score = 100;

    score -= calculateFpsPenalty(metrics.fps);
    score -= calculateFrameTimePenalty(metrics.averageFrameTime);
    score -= calculateAnimationCountPenalty(metrics.animationCount);
    score -= calculateMemoryPenalty(metrics.memoryUsage);

    return Math.max(0, score);
  }, [
    metrics,
    calculateFpsPenalty,
    calculateFrameTimePenalty,
    calculateAnimationCountPenalty,
    calculateMemoryPenalty,
  ]);

  // Get performance recommendations
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations: string[] = [];

    if (metrics.fps < 45) {
      recommendations.push(
        'Consider reducing animation complexity or duration'
      );
    }

    if (metrics.animationCount > 8) {
      recommendations.push(
        'Too many simultaneous animations - consider staggering or reducing count'
      );
    }

    if (metrics.averageFrameTime > 25) {
      recommendations.push(
        'Frame times are high - optimize animation performance'
      );
    }

    if (metrics.memoryUsage && metrics.memoryUsage > 80) {
      recommendations.push(
        'High memory usage detected - check for animation memory leaks'
      );
    }

    const recentSlowAnimations = performanceLog
      .slice(-20)
      .filter((anim) => anim.duration > 150);
    if (recentSlowAnimations.length > 3) {
      recommendations.push(
        'Multiple slow animations detected - consider optimization'
      );
    }

    return recommendations;
  }, [metrics, performanceLog]);

  // Helper function to calculate average animation duration
  const calculateAverageAnimationDuration = useCallback(
    (animations: AnimationTracker[]) => {
      if (animations.length === 0) {
        return 0;
      }
      return (
        animations.reduce((sum, anim) => sum + anim.duration, 0) /
        animations.length
      );
    },
    []
  );

  // Helper function to get component usage statistics
  const getComponentUsageStats = useCallback(
    (animations: AnimationTracker[]) => {
      return animations.reduce(
        (stats, anim) => {
          stats[anim.component] = (stats[anim.component] || 0) + 1;
          return stats;
        },
        {} as Record<string, number>
      );
    },
    []
  );

  // Performance analysis
  const getPerformanceAnalysis = useCallback(() => {
    const recentAnimations = performanceLog.slice(-50); // Last 50 animations
    const averageDuration = calculateAverageAnimationDuration(recentAnimations);
    const slowAnimations = recentAnimations.filter(
      (anim) => anim.duration > 100
    );
    const componentStats = getComponentUsageStats(recentAnimations);

    return {
      averageAnimationDuration: averageDuration,
      slowAnimationsCount: slowAnimations.length,
      totalAnimations: recentAnimations.length,
      componentUsage: componentStats,
      performanceScore: calculatePerformanceScore(),
      recommendations: getPerformanceRecommendations(),
    };
  }, [
    performanceLog,
    calculateAverageAnimationDuration,
    getComponentUsageStats,
    calculatePerformanceScore,
    getPerformanceRecommendations,
  ]);

  // Export performance data
  const exportPerformanceData = useCallback(() => {
    const data = {
      metrics,
      performanceLog: performanceLog.slice(-100), // Last 100 animations
      analysis: getPerformanceAnalysis(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `animation-performance-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [metrics, performanceLog, getPerformanceAnalysis]);

  // Clear performance log
  const clearPerformanceLog = useCallback(() => {
    setPerformanceLog([]);
    activeAnimationsRef.current.clear();
    setMetrics((prev) => ({
      ...prev,
      animationCount: 0,
      totalAnimationTime: 0,
    }));
  }, []);

  // Auto-start monitoring in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    metrics,
    performanceLog,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    trackAnimationStart,
    trackAnimationEnd,
    getPerformanceAnalysis,
    exportPerformanceData,
    clearPerformanceLog,
  };
}

// Hook for component-specific performance tracking
export function useAnimationPerformance(componentName: string) {
  const { trackAnimationStart, trackAnimationEnd } = usePerformanceMonitoring();
  const animationIdRef = useRef<string>();

  const startTracking = useCallback(() => {
    const id = `${componentName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    animationIdRef.current = id;
    trackAnimationStart(id, componentName);
    return id;
  }, [componentName, trackAnimationStart]);

  const endTracking = useCallback(() => {
    if (animationIdRef.current) {
      trackAnimationEnd(animationIdRef.current);
      animationIdRef.current = undefined;
    }
  }, [trackAnimationEnd]);

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      endTracking();
    };
  }, [endTracking]);

  return { startTracking, endTracking };
}
