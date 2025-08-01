import dynamic from 'next/dynamic';
import {
  type ComponentType,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

// Loading fallback component
const MotionLoadingFallback = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-surface/20 ${className}`}>
    <div className="flex h-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  </div>
);

// Lazy load advanced Motion components with proper loading states
export const LazyScrollLinkedAnimations = dynamic(
  () =>
    import('./scroll-linked-animations').then((mod) => ({
      default: mod.default,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-32" />,
    ssr: false, // Disable SSR for complex animations
  }
);

export const LazyScrollLinkedBackground = dynamic(
  () =>
    import('./scroll-linked-animations').then((mod) => ({
      default: mod.ScrollLinkedBackground,
    })),
  {
    loading: () => null, // Background component doesn't need loading state
    ssr: false,
  }
);

export const LazyScrollLinkedTextReveal = dynamic(
  () =>
    import('./scroll-linked-animations').then((mod) => ({
      default: mod.ScrollLinkedTextReveal,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-16" />,
    ssr: false,
  }
);

export const LazyScrollLinkedParallaxLayers = dynamic(
  () =>
    import('./scroll-linked-animations').then((mod) => ({
      default: mod.ScrollLinkedParallaxLayers,
    })),
  {
    loading: () => null,
    ssr: false,
  }
);

export const LazyScrollLinkedCounter = dynamic(
  () =>
    import('./scroll-linked-animations').then((mod) => ({
      default: mod.ScrollLinkedCounter,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-12 w-24" />,
    ssr: false,
  }
);

// Layout animations
export const LazyDynamicGrid = dynamic(
  () =>
    import('./layout-animations').then((mod) => ({ default: mod.DynamicGrid })),
  {
    loading: () => <MotionLoadingFallback className="h-64" />,
    ssr: false,
  }
);

export const LazySharedLayoutTransitions = dynamic(
  () =>
    import('./layout-animations').then((mod) => ({
      default: mod.SharedLayoutTransitions,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-48" />,
    ssr: false,
  }
);

export const LazyAnimatedTabs = dynamic(
  () =>
    import('./layout-animations').then((mod) => ({
      default: mod.AnimatedTabs,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-32" />,
    ssr: false,
  }
);

export const LazyReorderableList = dynamic(
  () =>
    import('./layout-animations').then((mod) => ({
      default: mod.ReorderableList,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-64" />,
    ssr: false,
  }
);

// Advanced physics components
export const LazyPhysicsSpring = dynamic(
  () =>
    import('./advanced-physics').then((mod) => ({
      default: mod.PhysicsSpring,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-48" />,
    ssr: false,
  }
);

export const LazyMouseTracker = dynamic(
  () =>
    import('./advanced-physics').then((mod) => ({ default: mod.MouseTracker })),
  {
    loading: () => <MotionLoadingFallback className="h-96" />,
    ssr: false,
  }
);

export const LazyTransformChains = dynamic(
  () =>
    import('./advanced-physics').then((mod) => ({
      default: mod.TransformChains,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-80" />,
    ssr: false,
  }
);

export const LazyGesturePhysics = dynamic(
  () =>
    import('./advanced-physics').then((mod) => ({
      default: mod.GesturePhysics,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-96" />,
    ssr: false,
  }
);

export const LazyPhysicsSimulation = dynamic(
  () =>
    import('./advanced-physics').then((mod) => ({
      default: mod.PhysicsSimulation,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-96" />,
    ssr: false,
  }
);

// Variants and staggered animations
export const LazyVariantsShowcase = dynamic(
  () =>
    import('./variants-staggered').then((mod) => ({
      default: mod.VariantsShowcase,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-64" />,
    ssr: false,
  }
);

export const LazyStaggeredPatterns = dynamic(
  () =>
    import('./variants-staggered').then((mod) => ({
      default: mod.StaggeredPatterns,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-48" />,
    ssr: false,
  }
);

export const LazyOrchestratedAnimations = dynamic(
  () =>
    import('./variants-staggered').then((mod) => ({
      default: mod.OrchestratedAnimations,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-32" />,
    ssr: false,
  }
);

export const LazyCoordinatedSequence = dynamic(
  () =>
    import('./variants-staggered').then((mod) => ({
      default: mod.CoordinatedSequence,
    })),
  {
    loading: () => <MotionLoadingFallback className="h-64" />,
    ssr: false,
  }
);

// Higher-order component for lazy loading with intersection observer
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: ComponentType<T>
) {
  return function LazyComponent(props: T) {
    const FallbackComponent = fallback;
    return (
      <Suspense
        fallback={
          FallbackComponent ? (
            <FallbackComponent {...props} />
          ) : (
            <MotionLoadingFallback />
          )
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}

// Intersection observer based lazy loading
export function withIntersectionLoading<T extends object>(
  Component: ComponentType<T>,
  options: IntersectionObserverInit = {}
) {
  return function IntersectionLazyComponent(props: T) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: options is a stable configuration prop
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
          ...options,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasLoaded]);

    return (
      <div ref={ref}>
        {isVisible ? (
          <Component {...props} />
        ) : (
          <MotionLoadingFallback className="h-32" />
        )}
      </div>
    );
  };
}

// Bundle size analyzer helper
export const getBundleInfo = () => {
  if (typeof window !== 'undefined') {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const totalSize = scripts.reduce((acc, script) => {
      const src = script.getAttribute('src');
      if (src?.includes('_next/static')) {
        // Estimate size based on script presence
        return acc + 1;
      }
      return acc;
    }, 0);

    return {
      totalScripts: scripts.length,
      nextScripts: totalSize,
      timestamp: Date.now(),
    };
  }
  return null;
};

// Preload critical components
export const preloadCriticalComponents = () => {
  if (typeof window !== 'undefined') {
    // Preload components that are likely to be used
    const criticalComponents = [
      () => import('./scroll-linked-animations'),
      () => import('./layout-animations'),
    ];

    for (const importFn of criticalComponents) {
      importFn().catch((_err) => {
        // Ignore preload errors - components will load on demand
      });
    }
  }
};

// Gallery components
export const LazyGalleryModal = dynamic(() => import('./gallery-modal'), {
  loading: () => <MotionLoadingFallback className="h-screen w-screen" />,
  ssr: false,
});

export const LazyFocusCards = dynamic(() => import('./focus-cards'), {
  loading: () => <MotionLoadingFallback className="h-96" />,
  ssr: false,
});

export const LazyGalleryTestimonials = dynamic(
  () => import('./gallery-testimonials'),
  {
    loading: () => <MotionLoadingFallback className="h-64" />,
    ssr: false,
  }
);

// Component registry for dynamic imports
export const MOTION_COMPONENTS = {
  'scroll-linked-animations': LazyScrollLinkedAnimations,
  'scroll-linked-background': LazyScrollLinkedBackground,
  'scroll-linked-text-reveal': LazyScrollLinkedTextReveal,
  'scroll-linked-parallax-layers': LazyScrollLinkedParallaxLayers,
  'scroll-linked-counter': LazyScrollLinkedCounter,
  'dynamic-grid': LazyDynamicGrid,
  'shared-layout-transitions': LazySharedLayoutTransitions,
  'animated-tabs': LazyAnimatedTabs,
  'reorderable-list': LazyReorderableList,
  'physics-spring': LazyPhysicsSpring,
  'mouse-tracker': LazyMouseTracker,
  'transform-chains': LazyTransformChains,
  'gesture-physics': LazyGesturePhysics,
  'physics-simulation': LazyPhysicsSimulation,
  'variants-showcase': LazyVariantsShowcase,
  'staggered-patterns': LazyStaggeredPatterns,
  'orchestrated-animations': LazyOrchestratedAnimations,
  'coordinated-sequence': LazyCoordinatedSequence,
  'gallery-modal': LazyGalleryModal,
  'focus-cards': LazyFocusCards,
  'gallery-testimonials': LazyGalleryTestimonials,
} as const;

export type MotionComponentKey = keyof typeof MOTION_COMPONENTS;
