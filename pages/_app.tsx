import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import GymFloatingDock from '@/components/ui/gym-floating-dock';
// import { PerformanceMonitor } from '@/components/ui/performance-monitor'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FitPro Center - Premium Fitness Experience</title>
        <meta
          content="Transform your body with premium fitness equipment, expert trainers, and a supportive community at FitPro Center."
          name="description"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="dark min-h-screen bg-background">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
        <GymFloatingDock position="bottom-right" />

        {/* Performance Monitors - Disabled */}
        {/* {process.env.NODE_ENV === 'development' && (
          <PerformanceMonitor 
            showDebugInfo={true}
            position="bottom-right"
          />
        )} */}
      </div>
    </>
  );
}
