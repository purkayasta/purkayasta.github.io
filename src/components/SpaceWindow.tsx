import type { Theme } from "../hooks/useTheme";
import { useState } from "react";
import { MovingManhattan } from "./MovingManhattan";

export function SpaceWindow({ theme = "default" }: { theme?: Theme }) {
  const christmas = theme === "christmas";
  const [on, setOn] = useState(true);
  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.style.setProperty("--light", next ? "1" : "0");
  }
  return (
    <div className="desk-scene-wrap">
      <div className={`desk-scene ${on ? "lamp-on" : ""}`}>
        <div className="night-window">
          <div className="night-sky">
            <MovingManhattan />
            {theme === "thanksgiving" && (
              <div className="autumn-leaves" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${i * 14}%`,
                      animationDelay: `${-i * 2.1}s`,
                      animationDuration: `${11 + (i % 4)}s`,
                    }}
                  >
                    ❧
                  </span>
                ))}
              </div>
            )}
            {theme === "doomsday" && (
              <div className="doom-sky" aria-hidden="true">
                <div className="doom-rift" />
              </div>
            )}
            {christmas && (
              <div className="window-snow" aria-hidden="true">
                {Array.from({ length: 22 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      left: `${(i * 37) % 100}%`,
                      animationDuration: `${7 + (i % 7)}s`,
                      animationDelay: `${-i * 1.3}s`,
                      width: `${1.5 + (i % 3)}px`,
                      height: `${1.5 + (i % 3)}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="window-mullion vertical" aria-hidden="true" />
          <div className="window-mullion horizontal" aria-hidden="true" />
        </div>
        <svg className="desk-objects" viewBox="0 0 420 440" aria-hidden="true">
          <g transform="translate(0 80)">
            <defs>
              <linearGradient id="desk-surface" x2="0" y2="1">
                <stop stopColor="#645448" />
                <stop offset="1" stopColor="#302a27" />
              </linearGradient>
              <linearGradient id="lamp-metal">
                <stop stopColor="#6f7979" />
                <stop offset=".4" stopColor="#a3aaa3" />
                <stop offset="1" stopColor="#465459" />
              </linearGradient>
            </defs>
            {/* Simple wooden table with straight legs and a clean edge. */}
            <path d="M48 281H61V348H48ZM359 281H372V348H359Z" fill="#514a42" />
            <path
              d="M48 282H53V348H48ZM359 282H364V348H359Z"
              fill="#74695a"
              opacity=".65"
            />
            <path d="M35 258H385L413 278H7Z" fill="url(#desk-surface)" />
            <path d="M7 278H413V284H7Z" fill="#51483e" />
            {/* A soft pool follows the tabletop perspective beneath the lamp. */}
            <defs>
              <radialGradient id="lamp-pool">
                <stop stopColor="#f8e2a5" stopOpacity=".36" />
                <stop offset=".5" stopColor="#efd597" stopOpacity=".14" />
                <stop offset="1" stopColor="#efd597" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g className="lamp-projection" pointerEvents="none">
              <ellipse
                cx="254"
                cy="267"
                rx="76"
                ry="12"
                fill="url(#lamp-pool)"
              />
            </g>
            <g stroke="#73604e" strokeOpacity=".3">
              <path d="M50 267H374M25 275H390" />
            </g>
            {/* Cables follow the desk edge down to the under-table power strip. */}
            <g
              fill="none"
              stroke="#8b9699"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M108 256C170 273 290 251 390 259C413 265 411 290 352 289" />
              <path d="M338 256C364 252 401 258 402 270S389 290 366 289" />
              <path d="M389 289C418 288 414 240 393 215S380 191 379 181" />
            </g>
            {/* Wall outlet and the power strip's supply cable. */}
            <rect
              x="369"
              y="163"
              width="20"
              height="26"
              rx="3"
              fill="#89948f"
              stroke="#b4beb5"
              strokeWidth=".7"
            />
            <rect
              x="374"
              y="170"
              width="10"
              height="12"
              rx="2"
              fill="#344247"
            />
            <path d="M376 175h6v8h-6z" fill="#bac4be" />
            {/* Two slim monitors on matching stands. */}
            <g transform="translate(-45 0)">
              <path
                d="M149 235H157V259H149ZM247 235H255V259H247Z"
                fill="#89979e"
              />
              <path
                d="M136 259H171L178 263H129ZM234 259H268L275 263H227Z"
                fill="#9eabb2"
              />
              <rect
                x="107"
                y="178"
                width="92"
                height="61"
                rx="3"
                fill="#27343e"
                stroke="#82919b"
                strokeWidth="1"
              />
              <rect
                x="111"
                y="182"
                width="84"
                height="51"
                rx="1"
                fill="#10232c"
              />
              <rect
                x="205"
                y="178"
                width="92"
                height="61"
                rx="3"
                fill="#27343e"
                stroke="#82919b"
                strokeWidth="1"
              />
              <rect
                x="209"
                y="182"
                width="84"
                height="51"
                rx="1"
                fill="#15242f"
              />
              <g strokeWidth="1.4" strokeLinecap="round" opacity=".8">
                <path
                  d="M118 190h17m-17 6h31m-27 6h43m-43 6h21m-21 6h35m-39 6h22"
                  stroke="#8aafa6"
                />
                <path
                  d="M162 190h19m-23 6h25m-13 12h12m-28 12h25"
                  stroke="#b6a18a"
                />
                <path
                  d="M216 190h24m-24 6h52m-48 6h36m-36 6h52m-48 6h21m-29 6h34"
                  stroke="#8ea9be"
                />
                <path d="M260 190h24m-26 12h24m-28 18h28" stroke="#b2a0c1" />
              </g>
              {[153, 251].map((x) => (
                <g
                  key={x}
                  transform={`translate(${x - 1.7} 233.6) scale(.12)`}
                  fill="#d7e1e6"
                >
                  <path d="M13 5C14 1 17-1 20-1C20 2 18 5 14 6ZM23 16C23 11 27 9 27 9C25 6 22 6 21 6C18 6 17 8 14 8C12 8 10 6 8 6C3 6 0 10 0 16C0 23 5 32 9 32C11 32 12 30 15 30C17 30 19 32 21 32C24 32 28 26 29 22C26 21 23 19 23 16Z" />
                </g>
              ))}
            </g>
            {/* A small Christmas tree in the open left corner of the desk. */}
            {christmas && (
              <g transform="translate(34 228)">
                <path d="M-7 25H7L5 35H-5Z" fill="#a68468" />
                <path
                  d="M0-18L-11 1H-7L-16 15H-10L-20 27H20L10 15H16L7 1H11Z"
                  fill="#3b6653"
                />
                <path
                  d="M-10 6Q0 12 10 6M-15 19Q0 26 15 19"
                  fill="none"
                  stroke="#d0b47a"
                  strokeWidth="1"
                />
                <g fill="#d9b36b">
                  <circle cx="-6" cy="8" r="1.5" />
                  <circle cx="8" cy="20" r="1.5" />
                  <circle cx="-9" cy="23" r="1.5" />
                </g>
                <g fill="#bf7770">
                  <circle cx="4" cy="2" r="1.7" />
                  <circle cx="-1" cy="17" r="1.7" />
                </g>
                <path
                  d="M0-26L2-21 7-21 3-17 5-12 0-15-5-12-3-17-7-21-2-21Z"
                  fill="#e8ca88"
                />
              </g>
            )}
            {theme === "thanksgiving" && (
              <g transform="translate(34 249)">
                <path
                  d="M0-10q-3-8 2-11"
                  fill="none"
                  stroke="#8e9b6d"
                  strokeWidth="3"
                />
                <ellipse cy="3" rx="18" ry="13" fill="#b66f38" />
                <ellipse cy="3" rx="11" ry="13" fill="#d58d48" />
                <ellipse cy="3" rx="4" ry="13" fill="#e0a25b" />
              </g>
            )}
            {theme === "doomsday" && (
              <g transform="translate(34 244)">
                <path d="M-14 20H14L10 24H-10Z" fill="#76877b" />
                <path
                  d="M-11 15V-9Q0-22 11-9V15L0 22Z"
                  fill="#94a59a"
                  stroke="#c4d0c5"
                  strokeWidth=".7"
                />
                <path d="M-8-3L-2-1M2-1L8-3" stroke="#172e22" strokeWidth="3" />
                <path d="M-5 10H5M-5 13H5" stroke="#425c49" strokeWidth="1" />
                <path
                  d="M0 0V6H3"
                  fill="none"
                  stroke="#425c49"
                  strokeWidth="1"
                />
              </g>
            )}
            {/* Under-table power strip: two plugged sockets and one spare. */}
            <g transform="translate(0 23)">
              <rect
                x="343"
                y="259"
                width="49"
                height="15"
                rx="4"
                fill="#a8b3b0"
                stroke="#d6dfd5"
                strokeWidth=".7"
              />
              <rect
                x="348"
                y="262"
                width="9"
                height="9"
                rx="2"
                fill="#445557"
              />
              <rect
                x="362"
                y="262"
                width="9"
                height="9"
                rx="2"
                fill="#445557"
              />
              <path
                d="M378 263v3m4-3v3m-2 3h.1"
                stroke="#3c4e50"
                strokeWidth="1.3"
              />
              <circle cx="388" cy="266" r="1.3" className="power-strip-led" />
            </g>
            {/* Hot tea in a clear glass cup: amber tea, rim, handle, and saucer. */}
            <g transform="translate(24 0)">
              <ellipse
                cx="243"
                cy="264"
                rx="20"
                ry="4"
                fill="#8e9b9d"
                opacity=".65"
              />
              <path
                d="M230 238H253L251 258Q243 265 232 258Z"
                fill="#c4d8df"
                fillOpacity=".17"
                stroke="#c0d2d8"
                strokeWidth="1"
              />
              <path
                d="M232 245H251L249 257Q242 262 234 257Z"
                fill="#b5762d"
                fillOpacity=".8"
              />
              <ellipse cx="241.5" cy="245" rx="9.5" ry="2.5" fill="#d6a04a" />
              <ellipse
                cx="241.5"
                cy="238"
                rx="11.5"
                ry="3"
                fill="#1b292e"
                stroke="#c0d2d8"
                strokeWidth="1"
              />
              <path
                d="M253 242Q267 239 263 252Q260 258 252 254"
                fill="none"
                stroke="#bacdd2"
                strokeWidth="2"
              />
              <path
                d="M234 241L236 255"
                stroke="#e0eef0"
                strokeOpacity=".5"
                strokeWidth="1"
              />
            </g>
            {/* Thin dark frames, folded on the desk beside the MacBook. */}
            <g
              fill="#a7cbd4"
              fillOpacity=".08"
              stroke="#bbc7cb"
              strokeWidth="1.1"
              transform="translate(202 278) rotate(-5)"
            >
              <rect x="-19" y="-4" width="13" height="7" rx="3" />
              <rect x="0" y="-4" width="13" height="7" rx="3" />
              <path
                d="M-6-1Q-3-4 0-1M-19-2l-6-7 12-2M13-2l6-7-10-2"
                fill="none"
              />
            </g>
            <g
              fill="none"
              stroke="url(#lamp-metal)"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d="M321 251L336 207 303 170" />
            </g>
            <ellipse cx="321" cy="256" rx="25" ry="5" fill="#556260" />
            <circle cx="336" cy="207" r="5" fill="#747f78" />
            <path
              d="M303 159q-22-5-35 25l37 17q13-26-2-42z"
              fill="url(#lamp-metal)"
            />
            <ellipse
              cx="286"
              cy="193"
              rx="20"
              ry="5"
              transform="rotate(24 286 193)"
              className="lamp-bulb"
            />
          </g>
        </svg>
        <div className="cup-steam" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <button
          className="lamp-toggle"
          role="switch"
          aria-label="Wall light switch"
          aria-checked={on}
          onClick={toggle}
        >
          <span className="wall-rocker" aria-hidden="true">
            <span className="rocker-mark">I</span>
            <span className="rocker-mark">○</span>
          </span>
          <span className="toggle-label">{on ? "On" : "Off"}</span>
        </button>
      </div>
    </div>
  );
}
