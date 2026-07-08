import { useEffect, useMemo, useRef, useState } from "react";
import { companies as allCompanies, type Company } from "../data/companies";
import { industryColor } from "../data/industryColors";
import "./Timeline.css";

const PADDING_YEARS = 3;
const MIN_NODE_GAP = 30; // px, minimum horizontal gap before a node needs its own row
const ROW_HEIGHT = 28;
const AXIS_ZONE = 34; // px reserved below the axis line for tick marks + year labels
const NODE_START_GAP = 10; // px gap between axis line and the first row of dots

interface PlacedNode {
  company: Company;
  x: number;
  row: number;
}

function packNodes(sorted: { company: Company; x: number }[]): PlacedNode[] {
  const rowLastX: number[] = [];
  const placed: PlacedNode[] = [];
  for (const n of sorted) {
    let row = 0;
    while (row < rowLastX.length && n.x - rowLastX[row] < MIN_NODE_GAP) {
      row++;
    }
    rowLastX[row] = n.x;
    placed.push({ company: n.company, x: n.x, row });
  }
  return placed;
}

function pickTickStep(pxPerYear: number): number {
  // Choose spacing so labels never crowd, regardless of container width.
  const candidates = [5, 10, 20, 25];
  for (const step of candidates) {
    if (pxPerYear * step >= 46) {
      return step;
    }
  }
  return 25;
}

export default function Timeline() {
  const [hovered, setHovered] = useState<Company | null>(null);
  const [pinned, setPinned] = useState<Company | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(Math.round(entry.contentRect.width));
      }
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const dated = useMemo(
    () => allCompanies.filter((c) => c.foundedYear !== null),
    []
  );
  const undated = useMemo(
    () => allCompanies.filter((c) => c.foundedYear === null),
    []
  );

  const industries = useMemo(
    () => Array.from(new Set(allCompanies.map((c) => c.industry))).sort(),
    []
  );

  const minYear =
    Math.min(...dated.map((c) => c.foundedYear as number)) - PADDING_YEARS;
  const maxYearRaw = Math.max(
    ...dated.map((c) => c.foundedYear as number),
    new Date().getFullYear()
  );
  const maxYear = maxYearRaw + PADDING_YEARS;
  const span = maxYear - minYear;
  const safeWidth = width > 0 ? width : 960;
  const pxPerYear = safeWidth / span;
  const tickStep = pickTickStep(pxPerYear);

  const placed: PlacedNode[] = useMemo(() => {
    const sorted = [...dated]
      .sort((a, b) => (a.foundedYear as number) - (b.foundedYear as number))
      .map((c) => ({
        company: c,
        x: Math.round(((c.foundedYear as number) - minYear) * pxPerYear),
      }));
    return packNodes(sorted);
  }, [dated, minYear, pxPerYear]);

  const maxRow = placed.reduce((m, p) => Math.max(m, p.row), 0);
  const rulerHeight = AXIS_ZONE + NODE_START_GAP + (maxRow + 1) * ROW_HEIGHT + 8;

  const decadeBands = useMemo(() => {
    const bands: { x: number; w: number; shaded: boolean }[] = [];
    let start = Math.floor(minYear / 10) * 10;
    let i = 0;
    for (let y = start; y < maxYear; y += 10) {
      const from = Math.max(y, minYear);
      const to = Math.min(y + 10, maxYear);
      if (to > from) {
        bands.push({
          x: (from - minYear) * pxPerYear,
          w: (to - from) * pxPerYear,
          shaded: i % 2 === 1,
        });
      }
      i++;
    }
    return bands;
  }, [minYear, maxYear, pxPerYear]);

  const ticks = [];
  for (
    let y = Math.ceil(minYear / tickStep) * tickStep;
    y <= maxYear;
    y += tickStep
  ) {
    ticks.push(y);
  }

  const active = pinned ?? hovered;

  return (
    <section className="tl-section" id="timeline">
      <div className="tl-header">
        <div>
          <div className="tl-eyebrow mono">TIMELINE — 1940 TO PRESENT</div>
          <h2 className="tl-title">Founded here, built into something bigger</h2>
        </div>
        <div className="tl-sub-wrap">
          <p className="tl-sub">
            Each mark is a company founded in the South Bend–Elkhart region
            that later sold, merged, or exited. Hover a mark for the
            founder's story; click to pin it open.
          </p>
          <p className="tl-industries mono">
            {industries.map((ind, i) => (
              <span key={ind} className="tl-industries-item">
                <span
                  className="tl-industries-dot"
                  style={{ background: industryColor(ind) }}
                />
                {ind}
                {i < industries.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="tl-panel">
        <div className="tl-scroller" ref={scrollerRef}>
          <div className="tl-ruler" style={{ height: rulerHeight }}>
            {decadeBands.map((b, i) =>
              b.shaded ? (
                <div
                  key={i}
                  className="tl-band"
                  style={{ left: b.x, width: b.w }}
                />
              ) : null
            )}
            <div className="tl-ruler-line" style={{ bottom: AXIS_ZONE }} />
            {ticks.map((y) => (
              <div
                key={y}
                className="tl-tick"
                style={{ left: (y - minYear) * pxPerYear, height: AXIS_ZONE }}
              >
                <div className="tl-tick-mark" />
                <div className="tl-tick-label mono">{y}</div>
              </div>
            ))}

            {placed.map(({ company, x, row }) => {
              const color = industryColor(company.industry);
              return (
                <button
                  key={company.slug}
                  className={`tl-node ${
                    active?.slug === company.slug ? "is-active" : ""
                  }`}
                  style={{
                    left: x,
                    bottom: AXIS_ZONE + NODE_START_GAP + row * ROW_HEIGHT,
                    ["--node-color" as string]: color,
                  }}
                  onMouseEnter={() => setHovered(company)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(company)}
                  onBlur={() => setHovered(null)}
                  onClick={() =>
                    setPinned(pinned?.slug === company.slug ? null : company)
                  }
                  aria-label={`${company.name}, founded ${company.foundedYear}`}
                >
                  <span className="tl-node-stem" />
                  <span className="tl-node-dot" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {undated.length > 0 && (
        <div className="tl-undated">
          <div className="tl-undated-label mono">
            FOUNDING YEAR NOT YET CONFIRMED
          </div>
          <div className="tl-undated-chips">
            {undated.map((c) => (
              <button
                key={c.slug}
                className={`tl-chip ${
                  active?.slug === c.slug ? "is-active" : ""
                }`}
                style={{
                  ["--node-color" as string]: industryColor(c.industry),
                }}
                onMouseEnter={() => setHovered(c)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setPinned(pinned?.slug === c.slug ? null : c)}
              >
                {c.name}
                <span className="tl-chip-meta">{c.industry}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`tl-card ${active ? "is-open" : ""}`}>
        {active && (
          <>
            <button className="tl-card-close" onClick={() => setPinned(null)}>
              ×
            </button>
            <div
              className="tl-card-eyebrow mono"
              style={{ color: industryColor(active.industry) }}
            >
              {active.industry}
            </div>
            <h3 className="tl-card-title">
              {active.website ? (
                <a
                  href={active.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tl-card-title-link"
                >
                  {active.name}
                </a>
              ) : (
                active.name
              )}
            </h3>
            <div className="tl-card-meta mono">
              {active.location} · Founded {active.foundedDisplay ?? "???"}
            </div>
            {active.founderNames && (
              <div className="tl-card-founder">{active.founderNames}</div>
            )}
            <p className="tl-card-blurb">
              {active.founderBlurb ?? active.originBlurb}
            </p>
            <div className="tl-card-exits">
              {active.exits.map((ex, i) => (
                <div className="tl-card-exit" key={i}>
                  <span className="mono tl-card-exit-year">
                    {ex.yearDisplay ?? "???"}
                  </span>
                  <span>
                    Acquired by <strong>{ex.acquiredBy ?? "undisclosed"}</strong>
                    {ex.dealValue && ex.dealValue !== "Not disclosed" && (
                      <> · {ex.dealValue}</>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
