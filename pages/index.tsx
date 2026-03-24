import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '@/components/countdown';
import ParallaxCard from '@/components/parallax-card';
import PlanCard from '@/components/plan-card';
import Tooltip from '@/components/tooltip';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import Counter from '@/components/ui/counter';
import ExpandableCard from '@/components/ui/expandable-card';
import FaqSection from '@/components/ui/faq';
import MagneticButton from '@/components/ui/magnetic-button';
import ProgressRing, {
  ProgressRingPresets,
} from '@/components/ui/progress-ring';
import ScrollProgress from '@/components/ui/scroll-progress';
import ShinyButton from '@/components/ui/shiny-button';
import StaggeredList from '@/components/ui/staggered-list';
import TypingText from '@/components/ui/typing-text';
import { popularFAQs } from '@/data/faqData';
import {
  createAccessibleVariants,
  useMotionConfig,
} from '@/hooks/useMotionConfig';
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { useMultiParallax, useParallax } from '@/hooks/useParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTranslation } from '@/hooks/useTranslation';

interface StatItem {
  number: string | number;
  suffix?: string;
  label: string;
  tooltip: string;
  isCounter: boolean;
}

export default function Home() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const _motionConfig = useMotionConfig();
  // const { startTracking, endTracking } = useAnimationPerformance('HomePage')

  // Parallax hooks - disable for reduced motion
  const _scrollY = useMultiParallax();
  const _heroParallax = useParallax<HTMLDivElement>({
    speed: prefersReducedMotion ? 0 : 0.5,
  });
  const floatingParallax1 = useParallax<HTMLDivElement>({
    speed: prefersReducedMotion ? 0 : -0.3,
  });
  const floatingParallax2 = useParallax<HTMLDivElement>({
    speed: prefersReducedMotion ? 0 : -0.6,
  });
  const imageParallax = useParallax<HTMLDivElement>({
    speed: prefersReducedMotion ? 0 : 0.05,
  });

  // Accessible animation variants
  const heroVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 50, rotate: 5 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  });

  const _cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  });

  // Stats data with tooltip content
  const stats: StatItem[] = [
    {
      number: 'Opening',
      label: 'Soon',
      tooltip:
        'State-of-the-art facility opening Saturday, July 12th at 10 AM. Be part of our founding member community!',
      isCounter: false,
    },
    {
      number: 500,
      suffix: 'm²',
      label: 'Training Space',
      tooltip:
        'Spacious areas with dedicated zones for cardio, strength training, functional fitness, and group classes.',
      isCounter: true,
    },
    {
      number: 'Premium',
      label: 'Equipment',
      tooltip:
        'Latest generation fitness equipment from top manufacturers like Technogym, Life Fitness, and Hammer Strength.',
      isCounter: false,
    },
    {
      number: 'Extended',
      label: 'Access Hours',
      tooltip:
        'Extended hours to fit your schedule: Monday-Friday 6AM-11PM, Saturday 7AM-10PM, Sunday 7AM-8PM.',
      isCounter: false,
    },
  ];

  // Professional Icons Components with Gradients
  const _DumbbellIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="dumbbellGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#1e9b71" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path
        d="M7 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4m10 0h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4M7 8V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3m-9 0v8m9-8v8M10 8v8m4-8v8"
        stroke="url(#dumbbellGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );

  const _FitnessIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="fitnessGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        stroke="url(#fitnessGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="url(#fitnessGrad)"
        strokeWidth={1.5}
      />
    </svg>
  );

  const _PersonalTrainerIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trainerGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path
        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
        stroke="url(#trainerGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15 11l2-2 4 4"
        stroke="url(#trainerGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );

  const _TargetIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="targetGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#targetGrad)"
        strokeWidth={1.5}
      />
      <circle
        cx="12"
        cy="12"
        r="6"
        stroke="url(#targetGrad)"
        strokeWidth={1.5}
      />
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="url(#targetGrad)"
        strokeWidth={1.5}
      />
    </svg>
  );

  // Feature icons with Gradients
  const _EquipmentIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="equipmentGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#1e9b71" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        stroke="url(#equipmentGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const _TrainersIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trainersGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <path
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="url(#trainersGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const _ClassesIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="classesGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        stroke="url(#classesGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const _CommunityIcon = () => (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="communityGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        stroke="url(#communityGrad)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  return (
    <>
      <ScrollProgress />
      <div className="parallax-container overflow-hidden">
        {/* Hero Section */}
        <section className="section-transition hero-bg relative flex min-h-screen items-center justify-center pt-16 sm:pt-20 md:pt-24">
          {/* Background with Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(30, 155, 113, 0.3) 1px, transparent 0)',
                backgroundSize: '30px 30px sm:50px 50px',
              }}
            />
          </div>

          {/* Floating Elements with Parallax */}
          <div
            className="parallax-element parallax-float-1 absolute top-20 left-4 h-48 w-48 animate-float rounded-full bg-primary/5 blur-3xl sm:left-10 sm:h-72 sm:w-72"
            ref={floatingParallax1.ref}
            style={{ transform: floatingParallax1.transform }}
          />
          <div
            className="parallax-element parallax-float-2 absolute right-4 bottom-20 h-64 w-64 animate-float rounded-full bg-primary/3 blur-3xl sm:right-10 sm:h-96 sm:w-96"
            ref={floatingParallax2.ref}
            style={{
              transform: floatingParallax2.transform,
              animationDelay: '3s',
            }}
          />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hero-grid grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              {/* Left Content */}
              <motion.div
                animate="visible"
                className="hero-content text-center lg:text-left"
                initial="hidden"
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 400, damping: 25 }
                }
                variants={heroVariants}
              >
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-2 sm:mb-6 sm:px-4"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="font-medium text-primary text-sm sm:text-base">
                    ✨ Premium Fitness Experience
                  </span>
                </motion.div>

                <h1 className="hero-heading mb-4 font-bold font-display text-2xl leading-tight sm:mb-6 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  <span className="text-white">FITNESS IS NOT A</span>
                  <br />
                  <span className="text-white">DESTINATION IT</span>
                  <br />
                  <span className="text-white">IS A </span>
                  <AnimatedGradientText
                    animationDuration={4}
                    className="inline-block"
                    gradientFrom="from-[#1e9b71]"
                    gradientTo="to-[#3b82f6]"
                    gradientVia="via-[#10b981]"
                    variant="wave"
                  >
                    WAY OF LIFE.
                  </AnimatedGradientText>
                </h1>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto mb-6 max-w-xl text-sm text-white/70 leading-relaxed sm:mb-8 sm:text-base md:text-lg lg:mx-0 lg:text-base xl:text-lg"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p className="mb-4">
                    Explore our brand-new fitness center, equipped with the
                    latest machines and premium amenities to
                  </p>
                  <TypingText
                    className="font-semibold text-primary"
                    cursor="█"
                    deletingSpeed={40}
                    pauseDuration={2000}
                    startDelay={3000}
                    texts={[
                      'transform your body.',
                      'achieve your goals.',
                      'build strength.',
                      'improve your health.',
                      'boost your confidence.',
                      'kickstart your journey.',
                    ]}
                    typingSpeed={80}
                  />
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="hero-stats mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 md:gap-6 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {stats.map((stat, index) => (
                    <Tooltip
                      className="cursor-help"
                      content={stat.tooltip}
                      key={index}
                      placement="top"
                    >
                      <div className="text-center transition-transform duration-200 hover:scale-105 lg:text-left">
                        <div className="font-bold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
                          {stat.isCounter ? (
                            <Counter
                              className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl"
                              delay={500 + index * 100}
                              duration={2000 + index * 200}
                              suffix={stat.suffix || ''}
                              target={
                                typeof stat.number === 'number'
                                  ? stat.number
                                  : 0
                              }
                            />
                          ) : (
                            <span className="text-primary">{stat.number}</span>
                          )}
                        </div>
                        <div className="text-white/60 text-xs sm:text-sm">
                          {stat.label}
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="hero-buttons mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:gap-4 lg:flex-col lg:gap-3 xl:flex-row xl:gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link href="/contact">
                    <MagneticButton
                      className="w-full px-6 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base md:text-lg lg:w-full lg:px-6 lg:py-3 lg:text-base xl:w-auto xl:px-8 xl:py-4 xl:text-lg"
                      strength={0.4}
                    >
                      Get Started Today
                    </MagneticButton>
                  </Link>
                  <Link href="/about">
                    <MagneticButton
                      className="w-full border-2 border-primary bg-transparent px-6 py-3 text-sm text-primary hover:bg-primary hover:text-white sm:w-auto sm:px-8 sm:py-4 sm:text-base md:text-lg lg:w-full lg:px-6 lg:py-3 lg:text-base xl:w-auto xl:px-8 xl:py-4 xl:text-lg"
                      strength={0.3}
                    >
                      Watch Demo
                    </MagneticButton>
                  </Link>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="mb-6 text-center sm:mb-8">
                    <h3 className="mb-4 font-bold text-base text-white uppercase tracking-[0.15em] sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
                      {t('hero.countdown.title')}
                    </h3>
                  </div>
                  <Countdown
                    targetDate={(() => {
                      // Grand Opening: Saturday 12 July 2025 at 10:00 AM
                      const grandOpeningDate = new Date('2026-07-12T10:00:00');
                      return grandOpeningDate;
                    })()}
                  />
                </motion.div>
              </motion.div>

              {/* Right Content - Hero Image */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="hero-image-container relative order-first lg:order-last"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative text-center">
                  <div
                    className="parallax-element relative mx-auto h-80 w-80 sm:h-96 sm:w-96 md:h-[500px] md:w-[500px] lg:h-[450px] lg:w-[450px] xl:h-[750px] xl:w-[750px] 2xl:h-[1000px] 2xl:w-[1000px]"
                    ref={imageParallax.ref}
                    style={{ transform: imageParallax.transform }}
                  >
                    <Image
                      alt="Strength Training"
                      className="object-contain opacity-95 drop-shadow-2xl transition-opacity duration-300 hover:opacity-100"
                      fill
                      sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 450px, (max-width: 1280px) 750px, 1000px"
                      src="/images/fitness-activity.png"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="section-transition programs-bg fade-overlay relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="font-semibold text-primary text-xs sm:text-sm md:text-base lg:text-lg">
                OUR PROGRAMS
              </span>
              <h2 className="mt-2 mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                BUILD YOUR{' '}
                <AnimatedGradientText
                  animationDuration={3}
                  className="inline-block"
                  gradientFrom="from-[#1e9b71]"
                  gradientTo="to-[#8b5cf6]"
                  gradientVia="via-[#3b82f6]"
                  variant="glow"
                >
                  BEST BODY
                </AnimatedGradientText>
              </h2>
              <div className="mx-auto max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">
                <p className="mb-2">
                  Comprehensive fitness programs designed to help you
                </p>
                <TypingText
                  className="font-semibold text-emerald-400"
                  cursor="▌"
                  deletingSpeed={30}
                  pauseDuration={2000}
                  startDelay={1500}
                  texts={[
                    'build lean muscle mass.',
                    'lose weight effectively.',
                    'increase your strength.',
                    'improve your endurance.',
                    'enhance your flexibility.',
                    'achieve your goals.',
                  ]}
                  typingSpeed={60}
                />
              </div>
            </motion.div>

            {/* Main Content Container */}
            <div className="relative mx-auto max-w-7xl">
              {/* Man Rope Image - Large Background with Parallax */}
              <motion.div
                className="-translate-y-1/2 parallax-element parallax-bg-2 absolute bottom-0 left-0 z-0 hidden transform lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <Image
                  alt="Battle Rope Training"
                  className="h-auto w-80 opacity-90 drop-shadow-2xl lg:w-96 xl:w-[28rem]"
                  height={800}
                  priority
                  src="/images/man-rope.png"
                  width={600}
                />
              </motion.div>

              {/* Parallax Cards Grid - Positioned to work with rope man */}
              <div className="relative z-10 grid max-w-5xl gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:ml-64 lg:grid-cols-3 xl:ml-80">
                <ParallaxCard
                  delay={0}
                  description="Professional strength training designed to build lean muscle mass and increase power through progressive overload."
                  gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/5"
                  icon={
                    <div className="relative h-8 w-8">
                      <div
                        className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600"
                        style={{
                          WebkitMask:
                            'url(/images/programs/muscle.svg) no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url(/images/programs/muscle.svg) no-repeat center',
                          maskSize: 'contain',
                          filter:
                            'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                        }}
                      />
                    </div>
                  }
                  title="Pure Muscle"
                />

                <ParallaxCard
                  delay={0.1}
                  description="High-intensity cardio workouts to burn fat and improve cardiovascular health with dynamic exercises."
                  gradient="bg-gradient-to-br from-purple-500/20 to-purple-600/5"
                  icon={
                    <div className="relative h-8 w-8">
                      <div
                        className="h-full w-full bg-gradient-to-br from-purple-400 to-purple-600"
                        style={{
                          WebkitMask:
                            'url(/images/programs/cardio.svg) no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url(/images/programs/cardio.svg) no-repeat center',
                          maskSize: 'contain',
                          filter:
                            'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
                        }}
                      />
                    </div>
                  }
                  title="Cardio Training"
                />

                <ParallaxCard
                  delay={0.2}
                  description="Comprehensive health programs focusing on overall wellness and lifestyle transformation."
                  gradient="bg-gradient-to-br from-orange-500/20 to-orange-600/5"
                  icon={
                    <div className="relative h-8 w-8">
                      <div
                        className="h-full w-full bg-gradient-to-br from-orange-400 to-orange-600"
                        style={{
                          WebkitMask:
                            'url(/images/programs/health.svg) no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url(/images/programs/health.svg) no-repeat center',
                          maskSize: 'contain',
                          filter:
                            'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
                        }}
                      />
                    </div>
                  }
                  title="Health Fitness"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-transition features-bg fade-overlay section-blend relative overflow-hidden py-12 sm:py-16 lg:py-24">
          {/* Background Elements with Parallax */}
          <div className="parallax-element parallax-bg-1 absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60" />
          <div className="parallax-element parallax-float-1 absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/10 opacity-30 blur-3xl" />
          <div className="parallax-element parallax-float-2 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="mb-12 text-center sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-medium text-primary">
                  ✨ Why Choose FitPro Center
                </span>
              </motion.div>

              <h2 className="mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                EXPERIENCE THE{' '}
                <AnimatedGradientText
                  animationDuration={4}
                  className="inline-block"
                  gradientFrom="from-[#1e9b71]"
                  gradientTo="to-[#3b82f6]"
                  gradientVia="via-[#10b981]"
                  variant="shimmer"
                >
                  DIFFERENCE
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg lg:text-xl">
                Discover what sets us apart with premium facilities, expert
                guidance, and a community dedicated to helping you achieve
                extraordinary results.
              </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Features Grid */}
              <motion.div
                className="grid gap-4 sm:gap-5 md:gap-6"
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                {/* Elite Training Programs */}
                <motion.div
                  className="group glass-effect rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-emerald-400/50 bg-gradient-to-br from-black/40 to-black/20 shadow-emerald-500/60 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-emerald-500/80">
                        {/* Animated background glow */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, rgba(16, 185, 129, 0.3) 0%, rgba(20, 184, 166, 0.3) 50%, rgba(34, 197, 94, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(20, 184, 166, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(20, 184, 166, 0.3) 0%, rgba(34, 197, 94, 0.3) 50%, rgba(16, 185, 129, 0.3) 100%)',
                            ],
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-green-500/30"
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                        <div
                          className="relative z-10 h-7 w-7"
                          style={{
                            background: '#00ff88',
                            WebkitMask:
                              'url("/images/icons/fitness-level.svg") no-repeat center',
                            WebkitMaskSize: 'contain',
                            mask: 'url("/images/icons/fitness-level.svg") no-repeat center',
                            maskSize: 'contain',
                            filter:
                              'drop-shadow(0 0 16px rgba(0, 255, 136, 0.8))',
                          }}
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-bold text-white text-lg sm:text-xl transition-colors duration-300 group-hover:text-emerald-400">
                        Elite Training Programs
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed sm:text-base">
                        Scientifically designed workouts that adapt to your
                        fitness level, ensuring optimal progress and sustainable
                        results with our certified elite trainers.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Modern Facilities */}
                <motion.div
                  className="group glass-effect rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-blue-400/50 bg-gradient-to-br from-black/40 to-black/20 shadow-blue-500/60 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-blue-500/80">
                        {/* Animated background glow */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(14, 165, 233, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(14, 165, 233, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(6, 182, 212, 0.3) 0%, rgba(14, 165, 233, 0.3) 50%, rgba(59, 130, 246, 0.3) 100%)',
                            ],
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-sky-500/30"
                          transition={{
                            duration: 2.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                        <div
                          className="relative z-10 h-7 w-7"
                          style={{
                            background: '#00aaff',
                            WebkitMask:
                              'url("/images/icons/Facilities-icon.svg") no-repeat center',
                            WebkitMaskSize: 'contain',
                            mask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                            maskSize: 'contain',
                            filter:
                              'drop-shadow(0 0 16px rgba(0, 170, 255, 0.8))',
                          }}
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-bold text-white text-lg sm:text-xl transition-colors duration-300 group-hover:text-blue-400">
                        Modern Facilities
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed sm:text-base">
                        Brand new, spacious facilities with premium amenities
                        including luxurious locker rooms, private changing
                        areas, and refreshing shower facilities for your
                        comfort.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* State-of-the-Art Equipment */}
                <motion.div
                  className="group glass-effect rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-violet-400/50 bg-gradient-to-br from-black/40 to-black/20 shadow-lg shadow-violet-500/60 backdrop-blur-sm transition-all duration-300 group-hover:shadow-violet-500/80">
                        {/* Animated background glow */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(217, 70, 239, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(217, 70, 239, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(168, 85, 247, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.3) 50%, rgba(139, 92, 246, 0.3) 100%)',
                            ],
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30"
                          transition={{
                            duration: 3.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                        <div
                          className="relative z-10 h-7 w-7"
                          style={{
                            background: '#bb44ff',
                            WebkitMask:
                              'url("/images/icons/Facilities-icon.svg") no-repeat center',
                            WebkitMaskSize: 'contain',
                            mask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                            maskSize: 'contain',
                            filter:
                              'drop-shadow(0 0 16px rgba(187, 68, 255, 0.8))',
                          }}
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-bold text-white text-lg sm:text-xl transition-colors duration-300 group-hover:text-purple-400">
                        Premium Equipment
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed sm:text-base">
                        Latest generation fitness technology and
                        commercial-grade equipment from top brands, meticulously
                        maintained for optimal performance and safety.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Flexible Membership Plans */}
                <motion.div
                  className="group glass-effect rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-orange-400/50 bg-gradient-to-br from-black/40 to-black/20 shadow-lg shadow-orange-500/60 backdrop-blur-sm transition-all duration-300 group-hover:shadow-orange-500/80">
                        {/* Animated background glow */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, rgba(249, 115, 22, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(234, 179, 8, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(234, 179, 8, 0.3) 0%, rgba(249, 115, 22, 0.3) 50%, rgba(245, 158, 11, 0.3) 100%)',
                              'linear-gradient(45deg, rgba(245, 158, 11, 0.3) 0%, rgba(234, 179, 8, 0.3) 50%, rgba(249, 115, 22, 0.3) 100%)',
                            ],
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30"
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                        <div
                          className="relative z-10 h-7 w-7"
                          style={{
                            background: '#ff8800',
                            WebkitMask:
                              'url("/images/icons/membership-icon.svg") no-repeat center',
                            WebkitMaskSize: 'contain',
                            mask: 'url("/images/icons/membership-icon.svg") no-repeat center',
                            maskSize: 'contain',
                            filter:
                              'drop-shadow(0 0 16px rgba(255, 136, 0, 0.8))',
                          }}
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="mb-2 font-bold text-white text-lg sm:text-xl transition-colors duration-300 group-hover:text-orange-400">
                        Flexible Membership Plans
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed sm:text-base">
                        Choose from affordable membership options designed to
                        fit your lifestyle and budget, with no long-term
                        commitments and special grand opening discounts
                        available.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Image Section */}
              <motion.div
                className="relative order-first lg:order-last"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative">
                  {/* Main Image */}
                  <motion.div
                    className="relative h-[400px] overflow-hidden rounded-3xl sm:h-[500px] lg:h-[700px]"
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      alt="Professional fitness training at FitPro Center"
                      className="object-cover"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Floating Stats Cards */}
                    <motion.div
                      className="absolute top-6 right-6 rounded-2xl border border-white/15 bg-black/40 p-4 text-center backdrop-blur-sm"
                      initial={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <div className="font-bold text-2xl sm:text-3xl text-white">
                        <Counter
                          className="text-2xl sm:text-3xl"
                          delay={1200}
                          duration={2500}
                          suffix="m²"
                          target={500}
                        />
                      </div>
                      <div className="text-sm text-white">
                        Training Space
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-6 left-6 rounded-2xl border border-white/15 bg-black/40 p-4 text-center backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <div className="font-bold text-2xl text-primary sm:text-3xl">
                        NEW
                      </div>
                      <div className="text-sm text-white/80">Grand Opening</div>
                    </motion.div>
                  </motion.div>

                  {/* Background Decoration */}
                  <div className="-z-10 -right-8 absolute top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
                  <div className="-z-10 -bottom-8 -left-8 absolute h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Amenities Section */}
        <section className="section-transition amenities-bg fade-overlay relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-60" />
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 opacity-30 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-medium text-primary">
                  🏋️ Premium Amenities
                </span>
              </motion.div>

              <h2 className="mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                WORLD-CLASS{' '}
                <AnimatedGradientText
                  animationDuration={2}
                  className="inline-block"
                  gradientFrom="from-[#1e9b71]"
                  gradientTo="to-[#8b5cf6]"
                  gradientVia="via-[#3b82f6]"
                  variant="pulse"
                >
                  FACILITIES
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg">
                Experience luxury and functionality combined. Our premium
                amenities are designed to enhance your fitness journey and
                provide unmatched comfort and convenience.
              </p>
            </motion.div>

            <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Staggered List */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <StaggeredList
                  className="max-w-2xl"
                  items={[
                    '🏃‍♂️ Cardio Zone - Latest treadmills, ellipticals, and stationary bikes',
                    '🏋️‍♀️ Free Weights Area - Complete range of dumbbells and barbells',
                    '💪 Strength Training - Premium resistance machines and cable systems',
                    '🤸‍♂️ Functional Training - TRX, kettlebells, and functional movement tools',
                    '🧘‍♀️ Flexibility Zone - Dedicated stretching and yoga area',
                    '🚿 Luxury Locker Rooms - Spacious lockers with premium shower facilities',
                    '❄️ Climate Control - Advanced HVAC system for optimal comfort',
                    '🎵 Premium Sound System - Motivating music throughout the facility',
                    '📱 Smart Technology - Digital workout tracking and progress monitoring',
                    '🅿️ Free Parking - Convenient parking spaces for all members',
                  ]}
                />
              </motion.div>

              {/* Visual Content */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative h-[400px] overflow-hidden rounded-3xl sm:h-[500px] lg:h-[600px]">
                  <Image
                    alt="Premium gym facilities at FitPro Center"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Enhanced Floating amenity indicators */}
                  <motion.div
                    className="group absolute top-6 left-6 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-black/60 to-black/40 p-3 text-center shadow-xl shadow-black/30 backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: 2 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-cyan-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    {/* Content with icon */}
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <motion.div
                        className="text-cyan-400 opacity-90"
                        whileHover={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <title>24/7 Access</title>
                          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                      </motion.div>
                      <div>
                        <motion.div 
                          className="font-bold text-lg leading-none text-cyan-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          24/7
                        </motion.div>
                        <motion.div 
                          className="text-xs leading-none text-white/90"
                          whileHover={{ y: -1 }}
                        >
                          Access
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>

                  <motion.div
                    className="group absolute top-6 right-6 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-black/60 to-black/40 p-3 text-center shadow-xl shadow-black/30 backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: -2 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-blue-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                    
                    {/* Content without icon */}
                    <div className="relative z-10">
                      <motion.div 
                        className="font-bold text-lg leading-none text-blue-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        A/C
                      </motion.div>
                      <motion.div 
                        className="text-xs leading-none text-white/90"
                        whileHover={{ y: -1 }}
                      >
                        Climate
                      </motion.div>
                    </div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>

                  <motion.div
                    className="group absolute bottom-6 left-6 overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br from-black/70 to-black/50 p-3 text-center shadow-xl shadow-black/30 backdrop-blur-md"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateX: -5, rotateY: 2 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-emerald-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                    
                    {/* Content with icon */}
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <motion.div
                        className="text-emerald-400 opacity-90"
                        whileHover={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <title>Free Parking</title>
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 10c-.4-.6-1-1-1.7-1h-8.6c-.7 0-1.3.4-1.7 1L4.3 11.1C3.7 11.3 3 12.1 3 13v3c0 .6.4 1 1 1h2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                          <circle cx="7" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                          <circle cx="17" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                      </motion.div>
                      <div>
                        <motion.div 
                          className="font-bold text-lg leading-none text-emerald-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          FREE
                        </motion.div>
                        <motion.div 
                          className="text-xs leading-none text-white/90"
                          whileHover={{ y: -1 }}
                        >
                          Parking
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                </div>

                {/* Background decoration */}
                <div className="-z-10 -right-8 absolute top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
                <div className="-z-10 -bottom-8 -left-8 absolute h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Future Training Excellence Section */}
        <section className="section-transition training-bg fade-overlay section-blend relative overflow-hidden py-12 sm:py-16 lg:py-24">
          {/* Background Elements with Parallax */}
          <div className="parallax-element parallax-bg-1 absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-70" />
          <div className="parallax-element parallax-float-2 absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 opacity-40 blur-3xl" />
          <div className="parallax-element parallax-float-3 absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/10 opacity-40 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-6 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-medium text-blue-400">
                  🚀 Coming Soon
                </span>
              </motion.div>

              <h2 className="mb-6 font-bold font-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
                EXPERT GUIDANCE <span className="gradient-text">AWAITS</span>
              </h2>
              <p className="mx-auto max-w-3xl text-base text-white/70 leading-relaxed sm:text-lg lg:text-xl">
                We&apos;re assembling a team of elite fitness professionals who
                will provide personalized training, nutrition guidance, and
                motivation to help you achieve extraordinary results.
              </p>
            </motion.div>

            {/* Training Excellence Cards */}
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {/* Strength & Conditioning */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: 0,
                  type: 'spring',
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 to-primary/5 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:shadow-3xl"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(30, 155, 113, 0.3)',
                  }}
                >
                  {/* Icon Header */}
                  <div className="relative p-6 text-center sm:p-8">
                    <Tooltip
                      content="Progressive strength training with professional coaching to build muscle mass and increase power output safely and effectively."
                      placement="top"
                    >
                      <motion.div
                        className="relative mx-auto mb-4 flex h-20 w-20 cursor-help items-center justify-center overflow-hidden rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-emerald-500/40 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-emerald-400/60 sm:mb-6"
                        transition={{ duration: 0.3 }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {/* Animated background glow */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(34, 197, 94, 0.2) 100%)',
                              'linear-gradient(45deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(20, 184, 166, 0.2) 100%)',
                              'linear-gradient(45deg, rgba(20, 184, 166, 0.2) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(16, 185, 129, 0.2) 100%)',
                            ],
                          }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-green-400/20"
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                        <div
                          className="relative z-10 h-10 w-10"
                          style={{
                            background:
                              'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #22c55e 100%)',
                            WebkitMask:
                              'url("/images/icons/dumbbell.svg") no-repeat center',
                            WebkitMaskSize: 'contain',
                            mask: 'url("/images/icons/dumbbell.svg") no-repeat center',
                            maskSize: 'contain',
                            filter:
                              'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))',
                          }}
                        />
                      </motion.div>
                    </Tooltip>

                    <h3 className="mb-2 font-bold text-white text-xl sm:mb-3 sm:text-2xl">
                      Strength & Conditioning
                    </h3>
                    <p className="mb-4 text-sm text-white/70 leading-relaxed sm:mb-6 sm:text-base">
                      Expert-led strength training programs designed to build
                      muscle, increase power, and improve athletic performance.
                    </p>

                    {/* Future Features */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Powerlifting & Olympic Lifting
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Progressive Overload Programs
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Form & Technique Mastery
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 font-medium text-blue-400 text-xs">
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Functional Training */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-purple-500/5 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:shadow-3xl"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  {/* Icon Header */}
                  <div className="relative p-6 text-center sm:p-8">
                    <motion.div
                      className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 shadow-lg shadow-violet-500/40 backdrop-blur-sm transition-all duration-300 group-hover:shadow-violet-400/60 sm:mb-6"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(217, 70, 239, 0.2) 100%)',
                            'linear-gradient(45deg, rgba(217, 70, 239, 0.2) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(168, 85, 247, 0.2) 100%)',
                            'linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(217, 70, 239, 0.2) 50%, rgba(139, 92, 246, 0.2) 100%)',
                          ],
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-fuchsia-400/20"
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      />
                      <div
                        className="relative z-10 h-10 w-10"
                        style={{
                          background:
                            'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)',
                          WebkitMask:
                            'url("/images/icons/lightning-bolt.svg") no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url("/images/icons/lightning-bolt.svg") no-repeat center',
                          maskSize: 'contain',
                          filter:
                            'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))',
                        }}
                      />
                    </motion.div>

                    <h3 className="mb-2 font-bold text-white text-xl sm:mb-3 sm:text-2xl">
                      Functional Training
                    </h3>
                    <p className="mb-4 text-sm text-white/70 leading-relaxed sm:mb-6 sm:text-base">
                      Movement-based workouts that improve daily activities,
                      mobility, and overall functional fitness.
                    </p>

                    {/* Future Features */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          HIIT & Circuit Training
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Mobility & Flexibility
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Injury Prevention
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 font-medium text-blue-400 text-xs">
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Wellness & Recovery */}
              <motion.div
                className="group sm:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-blue-500/5 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:shadow-3xl"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  {/* Icon Header */}
                  <div className="relative p-6 text-center sm:p-8">
                    <motion.div
                      className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-sky-400/30 bg-gradient-to-br from-sky-500/20 to-blue-500/20 shadow-lg shadow-sky-500/40 backdrop-blur-sm transition-all duration-300 group-hover:shadow-sky-400/60 sm:mb-6"
                      transition={{ duration: 0.3 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(14, 165, 233, 0.2) 50%, rgba(6, 182, 212, 0.2) 100%)',
                            'linear-gradient(45deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(14, 165, 233, 0.2) 100%)',
                            'linear-gradient(45deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)',
                          ],
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-cyan-400/20"
                        transition={{
                          duration: 3.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      />
                      <div
                        className="relative z-10 h-10 w-10"
                        style={{
                          background:
                            'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #06b6d4 100%)',
                          WebkitMask:
                            'url("/images/icons/heart.svg") no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url("/images/icons/heart.svg") no-repeat center',
                          maskSize: 'contain',
                          filter:
                            'drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))',
                        }}
                      />
                    </motion.div>

                    <h3 className="mb-2 font-bold text-white text-xl sm:mb-3 sm:text-2xl">
                      Wellness & Recovery
                    </h3>
                    <p className="mb-4 text-sm text-white/70 leading-relaxed sm:mb-6 sm:text-base">
                      Holistic approach to health including nutrition guidance,
                      stress management, and recovery protocols.
                    </p>

                    {/* Future Features */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Nutrition Counseling
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Yoga & Mindfulness
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-white/80 text-xs sm:text-sm">
                          Recovery Protocols
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 font-medium text-blue-400 text-xs">
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              className="mt-12 text-center sm:mt-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                <h3 className="mb-4 font-bold text-2xl text-white sm:text-3xl">
                  Interested in{' '}
                  <span className="text-primary">Joining Our Team?</span>
                </h3>
                <p className="mb-6 text-sm text-white/70 leading-relaxed sm:mb-8 sm:text-base">
                  We&apos;re looking for passionate, certified fitness
                  professionals who share our commitment to excellence. If
                  you&apos;re ready to inspire and transform lives, we&apos;d
                  love to hear from you.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link href="/contact">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShinyButton
                        className="text-sm sm:text-base"
                        size="md"
                        variant="primary"
                      >
                        Apply to Join Our Team
                      </ShinyButton>
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      className="text-sm sm:text-base"
                      size="md"
                      variant="outline"
                    >
                      Learn More
                    </ShinyButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Facility Progress Section */}
        <section className="section-transition relative overflow-hidden py-12 sm:py-16 lg:py-24">
          {/* Simplified Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-50" />
          <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 opacity-20 blur-2xl" />
          <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/5 opacity-20 blur-2xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-20"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                <span className="font-medium text-blue-400">
                  🏗️ Construction Progress
                </span>
              </div>

              <h2 className="mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                FACILITY{' '}
                <AnimatedGradientText
                  animationDuration={3}
                  className="inline-block"
                  gradientFrom="from-[#3b82f6]"
                  gradientTo="to-[#1e40af]"
                  gradientVia="via-[#1d4ed8]"
                  variant="wave"
                >
                  COMPLETION
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg lg:text-xl">
                Track our progress as we put the finishing touches on our
                state-of-the-art facility. Each milestone brings us closer to
                opening day!
              </p>
            </motion.div>

            {/* Facility Progress Grid - Optimized */}
            <div className="mb-16 grid gap-6 sm:mb-20 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-4 lg:gap-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <ProgressRing
                  value={100}
                  {...ProgressRingPresets.facility}
                  className="mx-auto mb-4"
                  color="#10b981"
                  delay={100}
                  label="Equipment"
                />
                <h3 className="mb-2 font-semibold text-base text-white sm:text-lg">
                  Equipment Setup
                </h3>
                <p className="text-xs text-white/70 sm:text-sm">
                  All premium equipment installed and calibrated
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <ProgressRing
                  value={95}
                  {...ProgressRingPresets.facility}
                  className="mx-auto mb-4"
                  color="#8b5cf6"
                  delay={150}
                  label="Interior"
                />
                <h3 className="mb-2 font-semibold text-base text-white sm:text-lg">
                  Interior Design
                </h3>
                <p className="text-xs text-white/70 sm:text-sm">
                  Modern design and lighting nearly complete
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <ProgressRing
                  value={88}
                  {...ProgressRingPresets.facility}
                  className="mx-auto mb-4"
                  color="#f59e0b"
                  delay={200}
                  label="Systems"
                />
                <h3 className="mb-2 font-semibold text-base text-white sm:text-lg">
                  Tech Systems
                </h3>
                <p className="text-xs text-white/70 sm:text-sm">
                  Access control and audio systems installation
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <ProgressRing
                  value={75}
                  {...ProgressRingPresets.facility}
                  className="mx-auto mb-4"
                  color="#ef4444"
                  delay={250}
                  label="Final Touches"
                />
                <h3 className="mb-2 font-semibold text-base text-white sm:text-lg">
                  Final Details
                </h3>
                <p className="text-xs text-white/70 sm:text-sm">
                  Signage, cleaning, and finishing touches
                </p>
              </motion.div>
            </div>

            {/* Overall Progress - Optimized */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm sm:p-12">
                <ProgressRing
                  className="mx-auto mb-6"
                  color="#3b82f6"
                  delay={300}
                  duration={1500}
                  glowEffect={true}
                  gradient={true}
                  label="Overall Progress"
                  size="xl"
                  strokeWidth={12}
                  value={90}
                />
                <h3 className="mb-4 font-bold text-lg text-white sm:text-xl md:text-2xl lg:text-3xl">
                  Almost Ready to Open!
                </h3>
                <p className="text-sm text-white/70 leading-relaxed sm:text-base md:text-lg">
                  Our facility is 90% complete and on track for our grand
                  opening. The final 10% includes staff training, safety
                  inspections, and member onboarding preparations.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Ready Section */}
        <section className="section-transition success-bg fade-overlay section-blend relative overflow-hidden py-12 sm:py-16 lg:py-24">
          {/* Background Elements with Parallax */}
          <div className="parallax-element parallax-bg-2 absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-70" />
          <div className="parallax-element parallax-float-1 absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-primary/10 opacity-30 blur-3xl" />
          <div className="parallax-element parallax-float-3 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-medium text-primary">
                  ⏰ Opening Soon
                </span>
              </motion.div>

              <h2 className="mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                GET READY FOR{' '}
                <span className="gradient-text">SOMETHING AMAZING</span>
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg lg:text-xl">
                We&apos;re putting the finishing touches on our brand-new
                facility! Be among the first to experience premium equipment,
                modern amenities, and a welcoming community atmosphere.
              </p>
            </motion.div>

            {/* Pre-Opening Features */}
            <div className="mb-12 grid gap-4 sm:mb-16 sm:gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <motion.div
                className="group glass-effect rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-emerald-400/60 bg-gradient-to-br from-black/50 to-black/30 shadow-emerald-500/70 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-emerald-500/90"
                  transition={{ duration: 0.3 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(16, 185, 129, 0.35) 0%, rgba(20, 184, 166, 0.35) 50%, rgba(34, 197, 94, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.35) 50%, rgba(20, 184, 166, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(20, 184, 166, 0.35) 0%, rgba(34, 197, 94, 0.35) 50%, rgba(16, 185, 129, 0.35) 100%)',
                      ],
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/35 via-teal-500/35 to-green-500/35"
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <div
                    className="relative z-10 h-8 w-8"
                    style={{
                      background: '#00ff88',
                      WebkitMask:
                        'url("/images/icons/premium-icon.svg") no-repeat center',
                      WebkitMaskSize: 'contain',
                      mask: 'url("/images/icons/premium-icon.svg") no-repeat center',
                      maskSize: 'contain',
                      filter: 'drop-shadow(0 0 18px rgba(0, 255, 136, 0.9))',
                    }}
                  />
                </motion.div>
                <div className="text-center">
                  <div className="mb-2 font-bold text-2xl text-primary sm:text-3xl md:text-4xl">
                    500m²
                  </div>
                  <h3 className="mb-3 font-semibold text-white text-lg sm:text-xl">
                    Premium Space
                  </h3>
                  <p className="text-xs text-white/70 sm:text-sm md:text-base">
                    Spacious training areas with natural lighting and modern
                    ventilation for optimal comfort
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group glass-effect rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/30 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-violet-400/60 bg-gradient-to-br from-black/50 to-black/30 shadow-lg shadow-violet-500/70 backdrop-blur-sm transition-all duration-300 group-hover:shadow-violet-500/90"
                  transition={{ duration: 0.3 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.35) 50%, rgba(217, 70, 239, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(217, 70, 239, 0.35) 0%, rgba(139, 92, 246, 0.35) 50%, rgba(168, 85, 247, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(168, 85, 247, 0.35) 0%, rgba(217, 70, 239, 0.35) 50%, rgba(139, 92, 246, 0.35) 100%)',
                      ],
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/35 via-purple-500/35 to-fuchsia-500/35"
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <div
                    className="relative z-10 h-8 w-8"
                    style={{
                      background: '#bb44ff',
                      WebkitMask:
                        'url("/images/icons/new-Equipment.svg") no-repeat center',
                      WebkitMaskSize: 'contain',
                      mask: 'url("/images/icons/new-Equipment.svg") no-repeat center',
                      maskSize: 'contain',
                      filter: 'drop-shadow(0 0 18px rgba(187, 68, 255, 0.9))',
                    }}
                  />
                </motion.div>
                <div className="text-center">
                  <div className="mb-2 font-bold text-2xl text-purple-400 sm:text-3xl md:text-4xl">
                    Latest
                  </div>
                  <h3 className="mb-3 font-semibold text-white text-lg sm:text-xl">
                    Equipment
                  </h3>
                  <p className="text-xs text-white/70 sm:text-sm md:text-base">
                    Brand new commercial-grade fitness machines and free weights
                    from top manufacturers
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group glass-effect rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 sm:col-span-2 sm:p-8 lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-sky-400/60 bg-gradient-to-br from-black/50 to-black/30 shadow-lg shadow-sky-500/70 backdrop-blur-sm transition-all duration-300 group-hover:shadow-sky-500/90"
                  transition={{ duration: 0.3 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(59, 130, 246, 0.35) 0%, rgba(14, 165, 233, 0.35) 50%, rgba(6, 182, 212, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.35) 50%, rgba(14, 165, 233, 0.35) 100%)',
                        'linear-gradient(45deg, rgba(14, 165, 233, 0.35) 0%, rgba(6, 182, 212, 0.35) 50%, rgba(59, 130, 246, 0.35) 100%)',
                      ],
                    }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/35 via-blue-500/35 to-cyan-500/35"
                    transition={{
                      duration: 3.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <div
                    className="relative z-10 h-8 w-8"
                    style={{
                      background: '#0099ff',
                      WebkitMask:
                        'url("/images/icons/community.svg") no-repeat center',
                      WebkitMaskSize: 'contain',
                      mask: 'url("/images/icons/community.svg") no-repeat center',
                      maskSize: 'contain',
                      filter: 'drop-shadow(0 0 18px rgba(0, 153, 255, 0.9))',
                    }}
                  />
                </motion.div>
                <div className="text-center">
                  <div className="mb-2 font-bold text-2xl text-blue-400 sm:text-3xl md:text-4xl">
                    New
                  </div>
                  <h3 className="mb-3 font-semibold text-white text-lg sm:text-xl">
                    Community
                  </h3>
                  <p className="text-xs text-white/70 sm:text-sm md:text-base">
                    Join our growing community of fitness enthusiasts and be
                    part of something special from day one
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Opening Success Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm sm:p-12 lg:p-16">
                <motion.div
                  className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30"
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                >
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient
                        id="starGrad"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f0f9ff" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      stroke="url(#starGrad)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </motion.div>

                <h3 className="mb-6 font-bold text-lg text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  Reserve Your{' '}
                  <span className="gradient-text">Founding Membership</span>
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg lg:text-xl">
                  Secure your spot as a founding member of FitPro Center. Get
                  exclusive pre-opening rates, priority access, and special
                  benefits when we officially open our doors.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      className="text-base"
                      size="lg"
                      variant="primary"
                    >
                      Reserve Your Spot
                    </ShinyButton>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      className="text-base"
                      size="lg"
                      variant="outline"
                    >
                      Get Notified
                    </ShinyButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section-transition relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 opacity-30 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-purple-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="font-semibold text-primary text-sm sm:text-base lg:text-lg">
                OUR ACHIEVEMENTS
              </span>
              <h2 className="mt-2 mb-6 font-bold font-display text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                BUILT FOR <span className="gradient-text">SUCCESS</span>
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70 leading-relaxed sm:text-base md:text-lg">
                Every number tells a story of excellence. From our
                state-of-the-art facility to our commitment to member
                satisfaction, these achievements reflect our dedication to
                fitness excellence.
              </p>
            </motion.div>

            {/* Achievement Stats Grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4">
              <motion.div
                className="rounded-2xl border border-white/10 bg-surface/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/40 sm:p-8"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="mb-2 font-bold text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                  2025
                </div>
                <h3 className="mb-2 font-semibold text-xs text-white/90 sm:text-sm md:text-base">
                  Opening Year
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Brand new facility
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-surface/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/40 sm:p-8"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="mb-2 font-bold text-3xl text-primary sm:text-4xl lg:text-5xl">
                  Premium
                </div>
                <h3 className="mb-2 font-semibold text-sm text-white/90 sm:text-base">
                  Equipment
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Latest fitness technology
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-surface/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/40 sm:p-8"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="mb-2 font-bold text-3xl text-primary sm:text-4xl lg:text-5xl">
                  Coming
                  <br />
                  Soon
                </div>
                <h3 className="mb-2 font-semibold text-sm text-white/90 sm:text-base">
                  Expert Trainers
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Professional guidance
                </p>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-white/10 bg-surface/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-surface/40 sm:p-8"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="mb-2 font-bold text-4xl sm:text-5xl lg:text-6xl">
                  <Counter
                    className="text-4xl sm:text-5xl lg:text-6xl"
                    delay={400}
                    duration={1500}
                    suffix="%"
                    target={99}
                  />
                </div>
                <h3 className="mb-2 font-semibold text-sm text-white/90 sm:text-base">
                  Satisfaction
                </h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Member satisfaction rate
                </p>
              </motion.div>
            </div>

            {/* Additional Stats Row */}
            <motion.div
              className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 sm:mt-12 lg:grid-cols-3"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-center backdrop-blur-sm sm:p-6">
                <div className="mb-1 font-bold text-2xl sm:text-3xl">
                  <Counter
                    className="text-2xl sm:text-3xl"
                    delay={1300}
                    duration={2200}
                    suffix="m²"
                    target={500}
                  />
                </div>
                <div className="text-sm text-white/80">Training Space</div>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-4 text-center backdrop-blur-sm sm:p-6">
                <div className="mb-2 space-y-1">
                  <div className="font-semibold text-purple-300 text-sm">
                    Mon-Fri
                  </div>
                  <div className="font-bold text-lg text-purple-400">
                    6:00 - 23:00
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-white/60 text-xs">
                  <span>Sat: 7-22</span>
                  <span>Sun: 7-20</span>
                </div>
                <div className="mt-2 text-sm text-white/80">Access Hours</div>
              </div>

              <div className="col-span-2 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-4 text-center backdrop-blur-sm sm:p-6 lg:col-span-1">
                <div className="mb-1 font-bold text-2xl text-blue-400 sm:text-3xl">
                  Coming
                  <br />
                  Soon
                </div>
                <div className="text-sm text-white/80">Programs</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mt-2 mb-4 font-bold font-display text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Membership
              </h2>
              <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg lg:text-xl">
                Gym session walk can help. Physical activity stimulates
                <br className="hidden sm:block" />
                many brain chemicals that may leave you.
              </p>
            </motion.div>

            {/* Premium Plans - Silver, Gold, Platinum */}
            {(() => {
              const plans = [
                {
                  name: 'Silver',
                  price: '$29',
                  originalPrice: '$39',
                  gradient: 'from-gray-800/90 to-gray-900/90',
                  isPopular: false,
                  features: [
                    { text: 'Access to gym equipment', enabled: true },
                    { text: 'Locker room access', enabled: true },
                    { text: 'Basic workout plans', enabled: true },
                    { text: 'Group fitness classes', enabled: false },
                    { text: 'Personal trainer sessions', enabled: false },
                    { text: 'Nutrition consultation', enabled: false },
                    { text: 'Premium amenities', enabled: false },
                  ],
                },
                {
                  name: 'Gold',
                  price: '$49',
                  originalPrice: '$69',
                  gradient: 'from-[#1e9b71]/20 to-emerald-900/30',
                  isPopular: true,
                  features: [
                    { text: 'Access to gym equipment', enabled: true },
                    { text: 'Locker room access', enabled: true },
                    { text: 'Basic workout plans', enabled: true },
                    { text: 'Group fitness classes', enabled: true },
                    { text: 'Personal trainer sessions', enabled: true },
                    { text: 'Nutrition consultation', enabled: false },
                    { text: 'Premium amenities', enabled: false },
                  ],
                },
                {
                  name: 'Platinum',
                  price: '$89',
                  originalPrice: '$119',
                  gradient: 'from-slate-800/40 to-slate-900/40',
                  isPopular: false,
                  features: [
                    { text: 'Access to gym equipment', enabled: true },
                    { text: 'Locker room access', enabled: true },
                    { text: 'Basic workout plans', enabled: true },
                    { text: 'Group fitness classes', enabled: true },
                    { text: 'Personal trainer sessions', enabled: true },
                    { text: 'Nutrition consultation', enabled: true },
                    { text: 'Premium amenities', enabled: true },
                  ],
                },
              ];

              return (
                <div className="mx-auto mb-8 grid max-w-6xl gap-6 sm:mb-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                  {plans.map((plan, index) => (
                    <PlanCard
                      delay={index * 0.2}
                      features={plan.features}
                      gradient={plan.gradient}
                      isPopular={plan.isPopular}
                      key={plan.name}
                      name={plan.name}
                      originalPrice={plan.originalPrice}
                      price={plan.price}
                    />
                  ))}
                </div>
              );
            })()}

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link href="/prices">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShinyButton
                    className="text-sm sm:text-base"
                    size="md"
                    variant="secondary"
                  >
                    View All Plans
                  </ShinyButton>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Quick Answers Section - Alternative FAQ with ExpandableCard */}
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-60" />
          <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/10 opacity-30 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12 text-center sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-6 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-medium text-purple-400">
                  ❓ Quick Answers
                </span>
              </motion.div>

              <h2 className="mb-6 font-bold font-display text-3xl text-white sm:text-4xl md:text-5xl">
                MEMBERSHIP{' '}
                <AnimatedGradientText
                  animationDuration={2.5}
                  className="inline-block"
                  gradientFrom="from-[#8b5cf6]"
                  gradientTo="to-[#1e9b71]"
                  gradientVia="via-[#3b82f6]"
                  variant="glow"
                >
                  ESSENTIALS
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-3xl text-base text-white/70 leading-relaxed sm:text-lg">
                Everything you need to know about joining FitPro Center. Get instant
                answers to the most common questions about our facilities,
                memberships, and policies.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ExpandableCard
                content="We offer three flexible membership tiers: Silver ($29/month), Gold ($49/month), and Platinum ($89/month). Each plan includes different levels of access to equipment, classes, and premium amenities. All plans come with our grand opening discount and no long-term commitments required."
                summary="What membership plans do you offer?"
                title="Membership Options"
              />

              <ExpandableCard
                content="Once opened, FitPro Center will operate Monday-Friday 6AM-11PM, Saturday 7AM-10PM, and Sunday 7AM-8PM. We're planning to introduce 24/7 access for Gold and Platinum members after our initial launch period."
                summary="When is the gym open?"
                title="Operating Hours"
              />

              <ExpandableCard
                content="Our 500m² facility features the latest cardio machines, complete free weights section, premium resistance equipment, functional training area, luxury locker rooms with showers, climate control, premium sound system, and free parking for all members."
                summary="What equipment and amenities are available?"
                title="Equipment & Facilities"
              />

              <ExpandableCard
                content="Yes! Personal training sessions are included with Gold and Platinum memberships. Our certified trainers create customized workout plans, provide form guidance, and help you achieve your specific fitness goals with one-on-one attention."
                summary="Do you offer personal training services?"
                title="Personal Training"
              />

              <ExpandableCard
                content="We'll offer a variety of group classes including HIIT, yoga, spinning, strength training, and functional fitness. Class schedules will be available closer to our opening date, with early access for Gold and Platinum members."
                summary="What group fitness classes are available?"
                title="Group Classes"
              />

              <ExpandableCard
                content="FitPro Center officially opens Saturday, July 12th, 2025 at 10:00 AM! We're currently accepting founding member registrations with special pre-opening rates and exclusive benefits for early supporters."
                summary="When do you officially open?"
                title="Grand Opening"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <FaqSection
                data={popularFAQs}
                subtitle={t('faq.subtitles.general')}
                title={t('faq.titles.general')}
              />
            </motion.div>
          </div>
        </section>

        {/* Community CTA Section */}
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/10" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="glass-effect rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/20 p-6 text-center sm:rounded-3xl sm:p-8 lg:p-12"
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-4 font-bold font-display text-2xl text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                JOIN OUR{' '}
                <AnimatedGradientText
                  animationDuration={4}
                  className="inline-block"
                  gradientFrom="from-[#1e9b71]"
                  gradientTo="to-[#8b5cf6]"
                  gradientVia="via-[#3b82f6]"
                  variant="shimmer"
                >
                  COMMUNITY
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto mb-6 max-w-3xl text-sm text-white/80 sm:mb-8 sm:text-base lg:text-lg xl:text-xl">
                Get 15% off your first three months when you sign up for our
                newsletter. Receive workout tips, nutrition advice, and
                exclusive member benefits.
              </p>

              <motion.div
                className="mx-auto mb-6 flex max-w-md flex-col gap-3 sm:mb-8 sm:flex-row sm:gap-4"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <input
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 backdrop-blur-sm focus:border-primary focus:outline-none sm:px-6 sm:py-4 sm:text-base"
                  placeholder="Enter your email"
                  type="email"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShinyButton
                    className="whitespace-nowrap text-sm sm:text-base"
                    size="md"
                    variant="primary"
                  >
                    Get Started
                  </ShinyButton>
                </motion.div>
              </motion.div>

              <div className="text-white/60 text-xs sm:text-sm">
                No spam. Unsubscribe at any time. By signing up, you agree to
                our terms.
              </div>
            </motion.div>
          </div>
        </section>
      </div>

    </>
  );
}
