import { contact } from '../data/portfolio'
import { PixelIcon } from './PixelIcon'

const ICONS: Record<string, string[]> = {
  Email: [
    '........',
    '########',
    '##....##',
    '#.#..#.#',
    '#..##..#',
    '#......#',
    '########',
    '........',
  ],
  LinkedIn: [
    '........',
    '#.......',
    '........',
    '#..###..',
    '#..#..#.',
    '#..#..#.',
    '#..#..#.',
    '........',
  ],
  GitHub: [
    '..####..',
    '.######.',
    '##.##.##',
    '########',
    '.######.',
    '..####..',
    '.##..##.',
    '.#....#.',
  ],
  NuGet: [
    '........',
    '.######.',
    '.#.##.#.',
    '.######.',
    '.#.##.#.',
    '.#.##.#.',
    '.######.',
    '........',
  ],
  'Stack Overflow': [
    '.....##.',
    '....###.',
    '..####..',
    '.#####..',
    '........',
    '#.....#.',
    '#.....#.',
    '#######.',
  ],
  Hashnode: [
    '...##...',
    '..####..',
    '.##..##.',
    '##....##',
    '##....##',
    '.##..##.',
    '..####..',
    '...##...',
  ],
  Medium: [
    '........',
    '#.....#.',
    '##...##.',
    '#.#.#.#.',
    '#..#..#.',
    '#.....#.',
    '#.....#.',
    '........',
  ],
  Twitter: [
    '........',
    '##....##',
    '.##..##.',
    '..####..',
    '...##...',
    '..####..',
    '.##..##.',
    '##....##',
  ],
}

const LINKS: Array<[string, string]> = [
  ['Email', contact.email],
  ['LinkedIn', contact.linkedin],
  ['GitHub', contact.github],
  ['NuGet', contact.nuget],
  ['Stack Overflow', contact.stackoverflow],
  ['Hashnode', contact.hashnode],
  ['Medium', contact.medium],
  ['Twitter', contact.twitter],
]

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-4 gap-y-2 ${className}`}>
      {LINKS.map(([label, href]) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
        >
          <PixelIcon rows={ICONS[label]} />
          <span className="underline decoration-[var(--ink-soft)]/40 underline-offset-4 transition-colors group-hover:decoration-[var(--accent)]">
            {label}
          </span>
        </a>
      ))}
    </div>
  )
}
