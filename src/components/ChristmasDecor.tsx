export function ChristmasDecor() {
  return (
    <div className="christmas-decor" aria-hidden="true">
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none">
        <path
          d="M0 8Q150 62 300 18T600 18T900 18T1200 8"
          fill="none"
          stroke="#486049"
          strokeWidth="1.5"
        />
        {Array.from({ length: 24 }, (_, i) => {
          const x = 25 + i * 50;
          const y = 14 + 21 * Math.abs(Math.sin((x / 300) * Math.PI));
          return (
            <g
              key={i}
              className="christmas-bulb"
              style={{ animationDelay: `${i % 5}s` }}
            >
              <path d={`M${x} ${y - 5}v8`} stroke="#486049" strokeWidth="1.5" />
              <ellipse
                cx={x}
                cy={y + 6}
                rx="3"
                ry="5"
                fill={["#edca83", "#ae6d65", "#8aa786"][i % 3]}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
