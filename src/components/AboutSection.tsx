import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-intro">
        <div className="about-eyebrow mono">ABOUT THIS REGION</div>
        <h2 className="about-title">More than RVs</h2>
        <p className="about-lede">
          South Bend and Elkhart sit at the center of a five-county region
          spanning Northern Indiana and Southwest Michigan, home to around
          730,000 people. It's a region defined as much by what it makes as
          by where it sits. Manufacturing is still the single largest
          employer here, built on recreational vehicle production, even as
          healthcare, logistics, and a fast-growing venture capital scene
          reshape what the local economy looks like year to year.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-block">
          <h3 className="about-block-title">People</h3>
          <p>
            Population growth was nearly flat in 2024, adding about 520
            residents. That's a modest number, but it followed two years of
            decline, so it counts as real progress. Over the past decade the
            region has added roughly 5,500 people in total, slower than
            Indiana or the U.S. overall, but a clear recovery from the
            pandemic-era dip.
          </p>
          <p>
            The region is also getting more diverse. Since 2014, the
            Hispanic population has grown by nearly 40 percent, and the
            number of residents identifying as two or more races is up 25
            percent. Today, just over a quarter of the region identifies as
            non-White, closing in on the national average. Youth make up a
            bigger share of the population here than in most comparable
            places, and the median age sits at 38.4.
          </p>
        </div>

        <div className="about-block">
          <h3 className="about-block-title">Workforce and Education</h3>
          <p>
            The regional labor force totaled 353,363 in 2024, holding
            roughly steady even as unemployment ticked up to 4.9 percent,
            its highest point in three years. Wages and productivity have
            both grown: the average private-sector wage now sits at $56,767
            and GDP per worker has climbed to $127,183, though still short
            of matching the national figure.
          </p>
          <p>
            Education keeps trending up. The share of residents with a
            bachelor's degree or higher rose from 23 to 28 percent over the
            last decade, and 37 percent now hold an associate's degree or
            higher. For the first time in years, the region is also seeing
            net positive migration, meaning more people are choosing to
            move in than move out.
          </p>
        </div>

        <div className="about-block">
          <h3 className="about-block-title">Jobs and Industry</h3>
          <p>
            Manufacturing remains the backbone of the regional economy,
            with 98,714 jobs in 2024, still the largest sector by a wide
            margin even after losing about 5,000 positions since 2019.
            Healthcare has picked up the slack in places, growing to 45,290
            jobs. Retail, government, and education round out the region's
            other major employers.
          </p>
          <p>
            On the innovation side, the region has launched 151
            innovation-driven startups against a goal of 275, up from a
            baseline of just 9. Patent activity and startup employment
            share are both trending upward too, real momentum, even if the
            region hasn't hit its own targets yet.
          </p>
        </div>

        <div className="about-block">
          <h3 className="about-block-title">Wages and Cost of Living</h3>
          <p>
            Average hourly earnings reached $26.71 in 2023, up 4.8 percent
            from the year before. Registered nurses saw the strongest wage
            growth of any occupation, up nearly 39 percent since 2019,
            while more traditional production roles grew more slowly.
          </p>
          <p>
            What makes the numbers stretch further here is cost of living:
            the region runs about 5.5 percent below the national average.
            Home prices reflect that too. The median listing price was
            $280,816 in late 2024, well below the U.S. median of $402,501,
            and new home construction is picking back up, with the most
            building permits issued since 2021.
          </p>
        </div>
      </div>
    </section>
  );
}
