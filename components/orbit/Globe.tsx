"use client";

import { useEffect, useRef, useState } from "react";
import { LAND } from "./land";
import { MARKETS } from "./markets";

type Vec = [number, number, number];
const RAD = Math.PI / 180;
const TAU = Math.PI * 2;
const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const vector = (lon: number, lat: number): Vec => {
  const l = lon * RAD;
  const p = lat * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};
const marketVectors = MARKETS.map(m => vector(m.lon, m.lat));
const focus = (i: number) => ({
  yaw: (MARKETS[i].lon - 10) * RAD,
  pitch: clamp(MARKETS[i].lat * 0.74 - 10, -45, 52) * RAD,
});
const initial = focus(0);
const wrapDistance = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
const shadows = [
  "#294838", "#355b49", "#47705a", "#5d8b6a", "#74a37c", "#8db889",
  "#a9cf9c", "#c6e8ac", "#daf2b9",
];

function gridLines() {
  const lines: Vec[][] = [];
  for (let lat = -60; lat <= 60; lat += 20) {
    lines.push(Array.from({ length: 121 }, (_, j) => vector(-180 + j * 3, lat)));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    lines.push(Array.from({ length: 61 }, (_, j) => vector(lon, -90 + j * 3)));
  }
  return lines;
}

function OrbitIcon({ kind }: { kind: "plus" | "minus" | "reset" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {kind !== "reset" ? (
        <path d={kind === "plus" ? "M4.5 10h11M10 4.5v11" : "M4.5 10h11"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <><path d="M4.1 9A6.1 6.1 0 1 1 5.4 14M4.1 9V4.6M4.1 9h4.3" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" /></>
      )}
    </svg>
  );
}

export function Globe() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pins = useRef<(HTMLButtonElement | null)[]>([]);
  const wake = useRef<() => void>(() => {});
  const selected = useRef(0);
  const scene = useRef({
    yaw: initial.yaw, pitch: initial.pitch, zoom: 1,
    targetYaw: initial.yaw, targetPitch: initial.pitch, targetZoom: 1,
    dragging: false, settledAt: 0,
  });
  const market = MARKETS[active];

  function selectMarket(next: number) {
    selected.current = next;
    setActive(next);
    const view = focus(next);
    Object.assign(scene.current, {
      targetYaw: view.yaw, targetPitch: view.pitch, settledAt: performance.now() + 700,
    });
    wake.current();
  }
  function scale(delta: number) {
    scene.current.targetZoom = clamp(scene.current.targetZoom + delta, 0.79, 1.17);
    wake.current();
  }
  function reset() {
    scene.current.targetZoom = 1;
    selectMarket(0);
  }

  useEffect(() => {
    const el = canvas.current;
    const container = stage.current;
    if (!el || !container) return;
    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactScreen = window.matchMedia("(max-width: 780px)");
    const bytes = Uint8Array.from(window.atob(LAND), c => c.charCodeAt(0));
    const coordinates = new DataView(bytes.buffer);
    const land: Array<{ v: Vec; shade: number; size: number }> = [];
    for (let n = 0; n < bytes.length; n += 4) {
      const lon = coordinates.getInt16(n, true) / 100;
      const lat = coordinates.getInt16(n + 2, true) / 100;
      land.push({ v: vector(lon, lat), shade: Math.sin(n * 32.157) * 0.9, size: 0.85 + (Math.sin(n * 9.94) + 1) * 0.22 });
    }
    const grids = gridLines();
    const traces = [
      { angle: -0.43, width: 1.43, height: 0.37, color: "rgba(176,229,170," },
      { angle: 0.23, width: 1.34, height: 0.45, color: "rgba(174,226,199," },
    ];
    const stars = Array.from({ length: 97 }, (_, i) => {
      const fract = (v: number) => v - Math.floor(v);
      return { x: fract(Math.sin(i * 31.671) * 9013.123), y: fract(Math.sin(i * 73.92 + 52) * 9000.8), s: i % 19 === 0 ? 1.05 : 0.56, a: 0.12 + (i % 8) * 0.028 };
    });
    let visible = true;
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let motionUntil = 0;
    const state = scene.current;

    function draw(now: number) {
      frame = 0;
      if (!width || !height || !ctx) return;
      const reduced = reducedMotion.matches;
      const ambientMotion = !reduced && !compactScreen.matches;
      const animate = ambientMotion || (!reduced && (state.dragging || now < motionUntil));
      const rate = animate ? (state.dragging ? 0.36 : 0.102) : 1;
      state.yaw += wrapDistance(state.yaw, state.targetYaw) * rate;
      state.pitch += (state.targetPitch - state.pitch) * rate;
      state.zoom += (state.targetZoom - state.zoom) * rate;
      const still = state.dragging || !ambientMotion || now < state.settledAt;
      const breathe = still ? 0 : Math.sin(now / 3300) * 0.055;
      const cyaw = Math.cos(state.yaw + breathe);
      const syaw = Math.sin(state.yaw + breathe);
      const cpitch = Math.cos(state.pitch);
      const spitch = Math.sin(state.pitch);
      const cx = width * 0.506;
      const cy = height * 0.515;
      const radius = Math.min(width * 0.33, height * 0.404) * state.zoom;

      function project(v: Vec): [number, number, number] {
        const [x, y, z] = v;
        const zr = x * syaw + z * cyaw;
        return [cx + radius * (x * cyaw - z * syaw), cy - radius * (y * cpitch - zr * spitch), y * spitch + zr * cpitch];
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const aura = ctx.createRadialGradient(cx - radius * 0.1, cy, radius * 0.65, cx, cy, radius * 1.72);
      aura.addColorStop(0, "rgba(120,204,124,.16)");
      aura.addColorStop(0.64, "rgba(92,143,98,.04)");
      aura.addColorStop(1, "rgba(67,111,75,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        ctx.fillStyle = "rgba(222,253,227," + star.a + ")";
        ctx.beginPath();
        ctx.arc(width * star.x, height * star.y, star.s, 0, TAU);
        ctx.fill();
      }

      for (const orbit of traces) {
        ctx.strokeStyle = orbit.color + ".14)";
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * orbit.width, radius * orbit.height, orbit.angle, Math.PI, TAU);
        ctx.stroke();
      }

      const surface = ctx.createRadialGradient(cx - radius * 0.46, cy - radius * 0.49, radius * 0.04, cx + radius * 0.17, cy + radius * 0.16, radius * 1.18);
      surface.addColorStop(0, "#315440");
      surface.addColorStop(0.41, "#18352b");
      surface.addColorStop(0.82, "#0b1d1c");
      surface.addColorStop(1, "#0a1512");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fillStyle = surface;
      ctx.fill();

      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(166,215,184,.155)";
      ctx.beginPath();
      for (const line of grids) {
        let connected = false;
        for (const v of line) {
          const [x, y, z] = project(v);
          if (z < 0.025) {
            connected = false;
            continue;
          }
          if (connected) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          connected = true;
        }
      }
      ctx.stroke();

      const buckets: number[][] = shadows.map(() => []);
      for (const dot of land) {
        const [x, y, z] = project(dot.v);
        if (z < 0.065) continue;
        const nx = (x - cx) / radius;
        const ny = (y - cy) / radius;
        const light = clamp(Math.round(2.85 + 3.65 * z - 1.55 * nx - 2.8 * ny + dot.shade), 0, shadows.length - 1);
        const s = dot.size * (0.64 + 0.42 * z) * clamp(radius / 170, 0.68, 1.12);
        buckets[light].push(x, y, s);
      }
      for (let j = 0; j < buckets.length; j++) {
        const bucket = buckets[j];
        ctx.beginPath();
        for (let i = 0; i < bucket.length; i += 3) {
          const [x, y, q] = [bucket[i], bucket[i + 1], bucket[i + 2]];
          ctx.moveTo(x + q, y);
          ctx.arc(x, y, q, 0, TAU);
        }
        ctx.fillStyle = shadows[j];
        ctx.fill();
      }

      const edge = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius * 0.9, cy + radius);
      edge.addColorStop(0, "rgba(196,246,170,.85)");
      edge.addColorStop(0.32, "rgba(171,228,152,.56)");
      edge.addColorStop(0.68, "rgba(118,206,159,.20)");
      edge.addColorStop(1, "rgba(93,165,129,.22)");
      ctx.strokeStyle = edge;
      ctx.lineWidth = 1.28;
      ctx.shadowColor = "#a9e389";
      ctx.shadowBlur = 9;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 0.2, 0, TAU);
      ctx.stroke();
      ctx.shadowBlur = 0;

      for (const [i, orbit] of traces.entries()) {
        ctx.strokeStyle = orbit.color + (i ? ".23)" : ".47)");
        ctx.lineWidth = i ? 0.7 : 1.05;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * orbit.width, radius * orbit.height, orbit.angle, 0, Math.PI);
        ctx.stroke();
        const theta = ambientMotion ? (now / (i ? 5650 : 4100) + i * 2) % Math.PI : 0.42 + i;
        const dx = radius * orbit.width * Math.cos(theta);
        const dy = radius * orbit.height * Math.sin(theta);
        const tx = cx + dx * Math.cos(orbit.angle) - dy * Math.sin(orbit.angle);
        const ty = cy + dx * Math.sin(orbit.angle) + dy * Math.cos(orbit.angle);
        ctx.beginPath();
        ctx.fillStyle = i ? "#b8e5ce" : "#dbfb9a";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 13;
        ctx.arc(tx, ty, i ? 1.9 : 2.65, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const positions = marketVectors.map((v, i) => ({ i, coords: project(v) }));
      const activePin = selected.current;
      positions.sort((a, b) => Number(b.i === activePin) - Number(a.i === activePin) || b.coords[2] - a.coords[2]);
      const occupied: Array<[number, number]> = [];
      for (const { i, coords: [x, y, z] } of positions) {
        const button = pins.current[i];
        if (!button) continue;
        const show = z > 0.22 && !occupied.some(([a, b]) => (x - a) ** 2 + (y - b) ** 2 < 30 ** 2);
        if (button.hidden === show) button.hidden = !show;
        if (show) {
          button.style.transform = "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px) translate(-50%,-50%)";
          occupied.push([x, y]);
        }
      }
      if (visible && animate) frame = requestAnimationFrame(draw);
    }

    function requestDraw() {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    }
    wake.current = () => {
      motionUntil = performance.now() + 700;
      requestDraw();
    };
    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      requestDraw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
      else if (frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { rootMargin: "50px" });
    viewObserver.observe(container);
    reducedMotion.addEventListener("change", requestDraw);
    compactScreen.addEventListener("change", requestDraw);
    resize();
    setReady(true);

    let last: [number, number] | null = null;
    function start(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      el?.setPointerCapture(e.pointerId);
      state.dragging = true;
      last = [e.clientX, e.clientY];
      el?.classList.add("is-dragging");
      wake.current();
    }
    function move(e: PointerEvent) {
      if (!last || !state.dragging) return;
      state.targetYaw -= (e.clientX - last[0]) * 0.0069;
      state.targetPitch = clamp(state.targetPitch + (e.clientY - last[1]) * 0.0066, -1.36, 1.36);
      last = [e.clientX, e.clientY];
      requestDraw();
    }
    function end() {
      last = null;
      state.dragging = false;
      state.settledAt = performance.now() + 1600;
      el?.classList.remove("is-dragging");
      wake.current();
    }
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("lostpointercapture", end);
    return () => {
      observer.disconnect();
      viewObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", requestDraw);
      compactScreen.removeEventListener("change", requestDraw);
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("lostpointercapture", end);
      wake.current = () => {};
    };
  }, []);

  return (
    <div className="atlas" aria-label="Interactive market explorer with fictional data">
      <div className="atlas-top">
        <span className="atlas-label"><span className="reticle" aria-hidden="true" /> Market explorer</span>
        <span className="atlas-demo-tag">Fictional data</span>
      </div>
      <div className="globe-stage" ref={stage}>
        <div className={"globe-fallback" + (ready ? " is-ready" : "")} aria-hidden="true"><i /><i /></div>
        <canvas
          className="globe-canvas"
          ref={canvas}
          tabIndex={0}
          aria-label="Rotate the globe with the arrow keys or drag it. Use + and − to zoom."
          onKeyDown={(e) => {
            const state = scene.current;
            switch (e.key) {
              case "ArrowLeft": state.targetYaw -= 0.17; break;
              case "ArrowRight": state.targetYaw += 0.17; break;
              case "ArrowUp": state.targetPitch = clamp(state.targetPitch + 0.14, -1.36, 1.36); break;
              case "ArrowDown": state.targetPitch = clamp(state.targetPitch - 0.14, -1.36, 1.36); break;
              case "+": case "=": scale(0.1); break;
              case "-": scale(-0.1); break;
              default: return;
            }
            e.preventDefault();
            wake.current();
          }}
        />
        {MARKETS.map((m, i) => (
          <button
            key={m.code}
            type="button"
            ref={(el) => { pins.current[i] = el; }}
            className={"globe-pin" + (active === i ? " active" : "")}
            hidden
            aria-label={"See " + m.name + " finding"}
            aria-pressed={active === i}
            onClick={() => selectMarket(i)}
          >
            <span className="pin-inner" /><span className="pin-code">{m.tag}</span>
          </button>
        ))}
        <div className="stage-guide" aria-hidden="true"><span className="guide-lines" /> Drag to rotate</div>
        <div className="globe-controls" aria-label="Globe controls">
          <button type="button" onClick={() => scale(-0.1)} aria-label="Zoom out"><OrbitIcon kind="minus" /></button>
          <button type="button" onClick={() => scale(0.1)} aria-label="Zoom in"><OrbitIcon kind="plus" /></button>
          <button type="button" onClick={reset} aria-label="Reset globe"><OrbitIcon kind="reset" /></button>
        </div>
      </div>
      <div className="atlas-content">
        <div className="market-tabs" role="group" aria-label="Pick a market">
          {MARKETS.map((m, i) => (
            <button key={m.code} type="button" aria-pressed={active === i} aria-label={m.name} onClick={() => selectMarket(i)}>{m.tag}</button>
          ))}
        </div>
        <div className="market-disc" aria-live="polite" aria-atomic="true">
          <div className="market-metric">
            <span>{market.name}</span>
            <strong>{market.roas}</strong>
            <small>Reported Search ROAS</small>
          </div>
          <div className="market-finding">
            <span className="finding-tag">{market.theme}</span>
            <strong>{market.finding}</strong>
            <p>{market.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
