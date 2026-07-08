import SiteHeader from "./components/SiteHeader";
import FounderSpotlight from "./components/FounderSpotlight";
import Timeline from "./components/Timeline";
import IndustryHeatmap from "./components/IndustryHeatmap";
import AboutSection from "./components/AboutSection";

function App() {
  return (
    <div className="app">
      <SiteHeader />
      <FounderSpotlight />
      <Timeline />
      <IndustryHeatmap />
      <AboutSection />
    </div>
  );
}

export default App;
