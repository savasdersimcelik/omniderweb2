"use client";

import { useId, useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

const BRAND = "#4f46e5";

export function WorldMap({
  dots = [],
  lineColor = BRAND,
  showLabels = true,
  labelClassName = "",
  animationDuration = 2,
  loop = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const gradientId = `path-gradient-${useId().replace(/:/g, "")}`;
  const glowId = `glow-${useId().replace(/:/g, "")}`;
  const shouldLoop = loop && !reduceMotion;

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    [],
  );

  const isDark = theme === "dark";

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: isDark ? "#a5b4fc66" : "#64748b55",
        shape: "circle",
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
      }),
    [map, isDark],
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const pins = useMemo(() => {
    const seen = new Map<
      string,
      { x: number; y: number; label?: string }
    >();

    for (const dot of dots) {
      for (const place of [dot.start, dot.end]) {
        const key = `${place.lat.toFixed(3)},${place.lng.toFixed(3)}`;
        if (!seen.has(key)) {
          seen.set(key, {
            ...projectPoint(place.lat, place.lng),
            label: place.label,
          });
        }
      }
    }

    return [...seen.values()];
  }, [dots]);

  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="relative aspect-2/1 w-full overflow-hidden rounded-lg bg-white font-sans md:aspect-2.5/1 lg:aspect-2/1 dark:bg-ink">
      {/* next/image rejects data URLs, so the generated map stays a plain image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full object-cover mask-[linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] select-none"
        alt=""
        height={495}
        width={1056}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-auto absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id={glowId}>
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime =
            (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          const path = createCurvedPath(startPoint, endPoint);

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="1"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                animate={
                  shouldLoop
                    ? { pathLength: [0, 0, 1, 1, 0] }
                    : { pathLength: 1 }
                }
                transition={
                  shouldLoop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: reduceMotion ? 0 : animationDuration,
                        delay: reduceMotion ? 0 : i * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />

              {shouldLoop ? (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{ offsetPath: `path('${path}')` }}
                />
              ) : null}
            </g>
          );
        })}

        {pins.map((pin, i) => (
          <g key={`pin-${pin.x}-${pin.y}`}>
            <motion.g
              onHoverStart={() =>
                setHoveredLocation(pin.label || `Location ${i}`)
              }
              onHoverEnd={() => setHoveredLocation(null)}
              className="cursor-pointer"
              whileHover={reduceMotion ? undefined : { scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <circle
                cx={pin.x}
                cy={pin.y}
                r="3"
                fill={lineColor}
                filter={`url(#${glowId})`}
                className="drop-shadow-lg"
              />
              {reduceMotion ? null : (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="3"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="3"
                    to="12"
                    dur="2s"
                    begin={`${(i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    begin={`${(i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </motion.g>

            {showLabels && pin.label ? (
              <motion.g
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.15 * i + 0.2,
                  duration: reduceMotion ? 0 : 0.45,
                }}
                className="pointer-events-none"
              >
                <foreignObject
                  x={pin.x - 78}
                  y={pin.y - 36}
                  width="156"
                  height="32"
                  className="hidden sm:block"
                >
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={`rounded-md border border-line bg-white/95 px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-ink shadow-sm ${labelClassName}`}
                    >
                      {pin.label}
                    </span>
                  </div>
                </foreignObject>
              </motion.g>
            ) : null}
          </g>
        ))}
      </svg>

      <AnimatePresence>
        {hoveredLocation ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 rounded-lg border border-line bg-white/90 px-3 py-2 text-sm font-medium text-ink backdrop-blur-sm sm:hidden"
          >
            {hoveredLocation}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
