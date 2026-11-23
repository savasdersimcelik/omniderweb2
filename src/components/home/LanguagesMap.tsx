const MAP_W = 198;
const MAP_H = 100;

function project(lat: number, lng: number) {
  return {
    x: (lng + 180) * (MAP_W / 360),
    y: (90 - lat) * (MAP_H / 180),
  };
}

function curve(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 11;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

const HUB = project(41.0082, 28.9784);

const PLACE_COORDS = [
  { key: "new-york", lat: 40.7128, lng: -74.006 },
  { key: "mexico-city", lat: 19.4326, lng: -99.1332 },
  { key: "sao-paulo", lat: -23.5505, lng: -46.6333 },
  { key: "berlin", lat: 52.52, lng: 13.405 },
  { key: "dubai", lat: 25.2048, lng: 55.2708 },
  { key: "tokyo", lat: 35.6762, lng: 139.6503 },
] as const;

type PlaceKey = (typeof PLACE_COORDS)[number]["key"];

type LanguagesMapProps = {
  places: Record<PlaceKey, string>;
  hubLabel: string;
};

export function LanguagesMap({ places, hubLabel }: LanguagesMapProps) {
  const points = PLACE_COORDS.map((place, index) => {
    const point = project(place.lat, place.lng);
    const align =
      point.x > 165 ? "end" : point.x < 36 ? "start" : "center";

    return {
      ...place,
      ...point,
      d: curve(point, HUB),
      label: places[place.key],
      align,
      index,
    };
  });

  return (
    <div className="languages-map">
      <div className="languages-map__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="languages-map__dots"
          src="/images/home/world-map.svg"
          alt=""
          width={1056}
          height={533}
          draggable={false}
        />

        <svg
          className="languages-map__routes"
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lang-route" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="8%" stopColor="#4f46e5" />
              <stop offset="92%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter
              id="lang-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {points.map((place) => (
            <g key={`route-${place.key}`}>
              <path
                className="languages-map__route"
                d={place.d}
                pathLength={1}
                style={{ ["--i" as string]: place.index }}
              />
              <circle
                className="languages-map__traveler"
                r="0.85"
                style={{
                  ["--i" as string]: place.index,
                  offsetPath: `path('${place.d}')`,
                }}
              />
            </g>
          ))}

          {points.map((place) => (
            <g key={`point-${place.key}`} className="languages-map__point">
              <circle
                className="languages-map__pulse"
                cx={place.x}
                cy={place.y}
                r="0.7"
              />
              <circle
                cx={place.x}
                cy={place.y}
                r="0.7"
                filter="url(#lang-glow)"
              />
            </g>
          ))}

          <g className="languages-map__point">
            <circle
              className="languages-map__pulse languages-map__pulse--hub"
              cx={HUB.x}
              cy={HUB.y}
              r="0.85"
            />
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r="0.9"
              filter="url(#lang-glow)"
            />
          </g>
        </svg>

        <div className="languages-map__labels">
          {points.map((place) => (
            <span
              key={`label-${place.key}`}
              className={`languages-map__label languages-map__label--${place.align}`}
              style={{
                left: `${(place.x / MAP_W) * 100}%`,
                top: `${(place.y / MAP_H) * 100}%`,
              }}
            >
              {place.label}
            </span>
          ))}
          <span
            className="languages-map__label languages-map__label--hub"
            style={{
              left: `${(HUB.x / MAP_W) * 100}%`,
              top: `${(HUB.y / MAP_H) * 100}%`,
            }}
          >
            {hubLabel}
          </span>
        </div>
      </div>

      <ul className="languages-map__legend">
        {points.map((place) => (
          <li key={`legend-${place.key}`}>{place.label}</li>
        ))}
        <li>{hubLabel}</li>
      </ul>
    </div>
  );
}
