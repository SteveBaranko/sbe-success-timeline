import { useEffect, useMemo, useState } from "react";
import { companies } from "../data/companies";
import { industryColor } from "../data/industryColors";
import "./FounderSpotlight.css";

const ROTATE_MS = 6000;

function initials(name: string): string {
  const cleaned = name.replace(/&/g, " ").replace(/[,()]/g, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function FounderSpotlight() {
  const featured = useMemo(
    () => companies.filter((c) => c.founderNames && c.founderBlurb),
    []
  );
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || featured.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, [autoplay, featured.length]);

  if (featured.length === 0) return null;
  const c = featured[index];
  const color = industryColor(c.industry);
  const goTo = (i: number) => {
    setAutoplay(false);
    setIndex(((i % featured.length) + featured.length) % featured.length);
  };

  return (
    <section
      className="spotlight"
      aria-roledescription="carousel"
      aria-label="Founder spotlight"
    >
      <div className="spotlight-inner">
        <div className="spotlight-eyebrow mono">
          FOUNDER SPOTLIGHT — {String(index + 1).padStart(2, "0")} /{" "}
          {String(featured.length).padStart(2, "0")}
        </div>

        <div className="spotlight-stage">
          <div className="spotlight-box" key={`founder-${c.slug}`}>
            <div
              className="spotlight-badge"
              style={{ borderColor: color, color }}
            >
              {initials(c.founderNames ?? c.name)}
            </div>
            <div className="spotlight-box-text">
              <div className="spotlight-kicker mono" style={{ color }}>
                FOUNDER
              </div>
              <h3 className="spotlight-name">{c.founderNames}</h3>
              <p className="spotlight-blurb">{c.founderBlurb}</p>
            </div>
          </div>

          <div className="spotlight-box" key={`company-${c.slug}`}>
            <div className="spotlight-box-text spotlight-box-text-full">
              <div className="spotlight-kicker mono" style={{ color }}>
                COMPANY
              </div>
              <h3 className="spotlight-company-name">
                {c.website ? (
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotlight-company-name-link"
                  >
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <div className="spotlight-company-meta mono">
                {c.location} · founded {c.foundedYear ?? "???"}
              </div>
              <span
                className="spotlight-tag"
                style={{ borderColor: color, color }}
              >
                {c.industry}
              </span>
            </div>
          </div>
        </div>

        <div className="spotlight-controls">
          <button
            className="spotlight-arrow"
            onClick={() => goTo(index - 1)}
            aria-label="Previous founder"
          >
            ←
          </button>
          <div className="spotlight-dots">
            {featured.map((f, i) => (
              <button
                key={f.slug}
                className={`spotlight-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Show ${f.founderNames}`}
              />
            ))}
          </div>
          <button
            className="spotlight-arrow"
            onClick={() => goTo(index + 1)}
            aria-label="Next founder"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
