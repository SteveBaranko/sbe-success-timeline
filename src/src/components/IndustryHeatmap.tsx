import { Fragment, useMemo, useState } from "react";
import { companies, type Company } from "../data/companies";
import { industryColor } from "../data/industryColors";
import "./IndustryHeatmap.css";

interface Cell {
  industry: string;
  decadeLabel: string;
  companies: Company[];
}

const UNKNOWN_LABEL = "Undated";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export default function IndustryHeatmap() {
  const [active, setActive] = useState<Cell | null>(null);
  const [pinned, setPinned] = useState<Cell | null>(null);

  const { industries, decadeLabels, matrix, maxCount } = useMemo(() => {
    const dated = companies.filter((c) => c.foundedYear !== null);
    const undated = companies.filter((c) => c.foundedYear === null);

    const minDecade =
      Math.floor(Math.min(...dated.map((c) => c.foundedYear as number)) / 10) *
      10;
    const maxDecade =
      Math.floor(Math.max(...dated.map((c) => c.foundedYear as number)) / 10) *
      10;

    const decadeLabels: string[] = [];
    for (let d = minDecade; d <= maxDecade; d += 10) {
      decadeLabels.push(`${d}s`);
    }
    decadeLabels.push(UNKNOWN_LABEL);

    const industryTotals = new Map<string, number>();
    for (const c of companies) {
      industryTotals.set(c.industry, (industryTotals.get(c.industry) ?? 0) + 1);
    }
    const industries = Array.from(industryTotals.keys()).sort(
      (a, b) => (industryTotals.get(b) ?? 0) - (industryTotals.get(a) ?? 0)
    );

    const matrix = new Map<string, Cell>();
    for (const ind of industries) {
      for (const label of decadeLabels) {
        matrix.set(`${ind}|${label}`, {
          industry: ind,
          decadeLabel: label,
          companies: [],
        });
      }
    }
    for (const c of dated) {
      const decade = Math.floor((c.foundedYear as number) / 10) * 10;
      const key = `${c.industry}|${decade}s`;
      matrix.get(key)?.companies.push(c);
    }
    for (const c of undated) {
      const key = `${c.industry}|${UNKNOWN_LABEL}`;
      matrix.get(key)?.companies.push(c);
    }

    let maxCount = 0;
    for (const cell of matrix.values()) {
      maxCount = Math.max(maxCount, cell.companies.length);
    }

    return { industries, decadeLabels, matrix, maxCount };
  }, []);

  const shown = pinned ?? active;

  return (
    <section className="heat-section" id="breakdown">
      <div className="heat-header">
        <div>
          <div className="heat-eyebrow mono">INDUSTRY BREAKDOWN</div>
          <h2 className="heat-title">Where the region's exits came from</h2>
        </div>
        <p className="heat-sub">
          Each row is an industry, each column a decade of founding. Darker
          cells mean more companies founded in that industry that decade.
          Hover a cell for the list; click to pin it.
        </p>
      </div>

      <div className="heat-grid-wrap">
        <div
          className="heat-grid"
          style={{
            gridTemplateColumns: `160px repeat(${decadeLabels.length}, 1fr)`,
          }}
        >
          <div className="heat-corner" />
          {decadeLabels.map((label) => (
            <div key={label} className="heat-col-label mono">
              {label}
            </div>
          ))}

          {industries.map((ind) => (
            <Fragment key={ind}>
              <div className="heat-row-label">
                <span
                  className="heat-row-dot"
                  style={{ background: industryColor(ind) }}
                />
                {ind}
              </div>
              {decadeLabels.map((label) => {
                const cell = matrix.get(`${ind}|${label}`)!;
                const count = cell.companies.length;
                const [r, g, b] = hexToRgb(industryColor(ind));
                const alpha = count === 0 ? 0.04 : 0.22 + 0.68 * (count / maxCount);
                const isShown =
                  shown?.industry === ind && shown?.decadeLabel === label;
                return (
                  <button
                    key={`${ind}-${label}`}
                    className={`heat-cell ${isShown ? "is-active" : ""} ${
                      count === 0 ? "is-empty" : ""
                    }`}
                    style={{
                      background: `rgba(${r}, ${g}, ${b}, ${alpha})`,
                      color: alpha > 0.55 ? "#fff" : "var(--ink)",
                    }}
                    onMouseEnter={() => setActive(cell)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() =>
                      setPinned(
                        pinned &&
                          pinned.industry === ind &&
                          pinned.decadeLabel === label
                          ? null
                          : cell
                      )
                    }
                    disabled={count === 0}
                    aria-label={`${ind}, ${label}, ${count} companies`}
                  >
                    {count > 0 ? count : ""}
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className={`heat-detail ${shown ? "is-open" : ""}`}>
        {shown && shown.companies.length > 0 && (
          <>
            <div className="heat-detail-title mono">
              {shown.industry} · {shown.decadeLabel}
            </div>
            <div className="heat-detail-list">
              {shown.companies.map((c) => (
                <div key={c.slug} className="heat-detail-item">
                  <span className="heat-detail-name">{c.name}</span>
                  <span className="heat-detail-meta mono">
                    {c.foundedDisplay ?? "???"} · {c.location}
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
