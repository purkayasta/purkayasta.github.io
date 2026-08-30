export function PixelIcon({ rows, className = 'h-3 w-3' }: { rows: string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      className={`${className} shrink-0`}
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        [...row].map((px, x) =>
          px === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null,
        ),
      )}
    </svg>
  )
}
