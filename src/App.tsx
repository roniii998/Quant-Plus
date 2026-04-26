import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import LiveTicker from './components/LiveTicker';
import FeatureSequence from './components/FeatureSequence';
import ArchitectureSection from './components/ArchitectureSection';
import MetricsSection from './components/MetricsSection';
import ComparisonTable from './components/ComparisonTable';
import BrokerConnection from './components/BrokerConnection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
      </div>
      <div className="relative z-0 pt-12">
        <LiveTicker />
      </div>
      <div className="relative z-0">
        <FeatureSequence />
      </div>
      <div className="relative z-30">
        <ArchitectureSection />
      </div>
      <div className="relative z-30">
        <MetricsSection />
      </div>
      <div className="relative z-30">
        <ComparisonTable />
      </div>
      <div className="relative z-30">
        <BrokerConnection />
      </div>
      <div className="relative z-30">
        <HowItWorks />
      </div>
      <div className="relative z-30">
        <Testimonials />
      </div>
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}

export default App;
