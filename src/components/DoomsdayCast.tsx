import type { CSSProperties } from "react";
const heroes = [
  { name: "Doctor Doom", color: "#a0bd9a", kind: "doom" },
  { name: "Iron Man", color: "#c08a66", kind: "iron" },
  { name: "Captain America", color: "#89a7c4", kind: "cap" },
  { name: "Thor", color: "#c1cbd3", kind: "thor" },
  { name: "Hulk", color: "#91ae79", kind: "hulk" },
  { name: "Black Panther", color: "#a39ab8", kind: "panther" },
];

export function DoomsdayCast() {
  return (
    <section
      className="doomsday-cast"
      aria-label="Marvel-inspired character illustrations"
    >
      <div className="doom-cast-heading">
        <span>DOOM IS COMING.</span>
        <small>A Marvel-inspired tribute · illustrated favorites</small>
      </div>
      <div className="hero-lineup">
        {heroes.map((hero) => (
          <figure
            key={hero.kind}
            style={{ "--hero-color": hero.color } as CSSProperties}
          >
            <svg viewBox="0 0 100 100" role="img" aria-label={hero.name}>
              <circle
                cx="50"
                cy="48"
                r="35"
                fill="currentColor"
                opacity=".05"
              />
              {hero.kind === "doom" && (
                <>
                  <path
                    d="M14 95L23 39Q27 9 50 7Q74 9 78 39L88 95Z"
                    fill="#304c3c"
                    stroke="#6b8d71"
                  />
                  <path d="M29 95L34 36Q50 15 67 36L73 95" fill="#14291d" />
                  <path
                    d="M34 33L50 26 66 33V66L50 78 34 66Z"
                    fill="#a4b3a7"
                    stroke="#d0d8cf"
                    strokeWidth="1"
                  />
                  <path
                    d="M38 44L46 47M54 47L62 44"
                    stroke="#17231b"
                    strokeWidth="5"
                  />
                  <path
                    d="M50 46V58H55M42 63H58M42 67H58"
                    fill="none"
                    stroke="#465c4b"
                    strokeWidth="2"
                  />
                  <circle cx="30" cy="83" r="4" fill="#b7a878" />
                  <circle cx="70" cy="83" r="4" fill="#b7a878" />
                </>
              )}
              {hero.kind === "iron" && (
                <>
                  <path d="M20 94L26 75 41 69H59L74 75 80 94" fill="#7f3c36" />
                  <path
                    d="M30 29L41 20H59L70 29V61L59 76H41L30 61Z"
                    fill="#ab5143"
                  />
                  <path
                    d="M36 31L44 27H56L64 31 60 48 64 60 56 69H44L36 60 40 48Z"
                    fill="#ceb47e"
                  />
                  <path
                    d="M37 44L46 46M54 46L63 44"
                    stroke="#d6f1f3"
                    strokeWidth="3"
                  />
                  <circle cx="50" cy="87" r="5" fill="#b1d8de" />
                </>
              )}
              {hero.kind === "cap" && (
                <>
                  <circle cx="50" cy="50" r="32" fill="#a5504c" />
                  <circle cx="50" cy="50" r="25" fill="#cbd1ce" />
                  <circle cx="50" cy="50" r="18" fill="#4b6e8b" />
                  <path
                    d="M50 35L54 45 65 46 57 53 60 64 50 58 40 64 43 53 35 46 46 45Z"
                    fill="#e0e7e3"
                  />
                </>
              )}
              {hero.kind === "thor" && (
                <>
                  <path d="M25 92L29 65H71L77 92Z" fill="#813f42" />
                  <path d="M39 47L53 40 70 69 56 77Z" fill="#6b4e39" />
                  <path
                    d="M22 29L60 16 77 46 38 59Z"
                    fill="#a5b2bb"
                    stroke="#d6dcdf"
                  />
                  <path
                    d="M29 32L56 23M39 50L68 41"
                    stroke="#d6dcdf"
                    strokeWidth="2"
                  />
                  <path
                    d="M73 12L66 24 77 22 70 34"
                    fill="none"
                    stroke="#a6c8de"
                    strokeWidth="2"
                  />
                </>
              )}
              {hero.kind === "hulk" && (
                <>
                  <path d="M15 94L23 74 39 67H61L77 74 85 94" fill="#5f7954" />
                  <path
                    d="M29 28L42 19H61L72 30 69 62 59 76H41L30 63Z"
                    fill="#8ba774"
                  />
                  <path
                    d="M28 36L30 24 43 16H63L74 29 71 39 63 30 55 34 47 28 39 34Z"
                    fill="#293b2e"
                  />
                  <path
                    d="M35 43L46 46M55 46L66 42"
                    stroke="#34452e"
                    strokeWidth="4"
                  />
                  <path d="M41 62H59" stroke="#33482f" strokeWidth="3" />
                </>
              )}
              {hero.kind === "panther" && (
                <>
                  <path d="M19 95L26 76 41 68H59L74 76 81 95" fill="#333743" />
                  <path
                    d="M29 27L31 12 43 24H58L70 12 72 29 69 62 50 78 31 62Z"
                    fill="#303641"
                    stroke="#9694a5"
                  />
                  <path
                    d="M35 44L45 48M55 48L65 44M36 30L43 37M64 30L57 37M37 59L46 64M63 59L54 64"
                    stroke="#c3becf"
                    strokeWidth="2"
                  />
                  <path
                    d="M34 80L39 87 44 83 50 91 56 83 61 87 66 80"
                    fill="none"
                    stroke="#aaa7bb"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
            <figcaption>{hero.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
