import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-grid">
        <div>
          <div className="about-eyebrow mono">ABOUT THIS REGION</div>
          <h2 className="about-title">More than RVs</h2>
        </div>
        <div className="about-body">
          <p>
            South Bend and Elkhart County sit at the center of a five-county
            region that builds most of the world's recreational vehicles,
            alongside a growing base of manufacturing, healthcare analytics,
            and technology companies. This page is a work in progress — a
            first pass at showing how many locally founded companies have
            grown into acquisitions, IPOs, and national brands.
          </p>
          <p className="about-note">
            Deeper coverage of the region's startup resources, funding
            landscape, and support organizations is coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
