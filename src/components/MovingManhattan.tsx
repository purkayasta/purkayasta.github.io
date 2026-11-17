/** Repeating, independently drifting layers, like a view from across the Hudson. */
export function MovingManhattan() {
  return (
    <div
      className="moving-manhattan"
      role="img"
      aria-label="Animated Manhattan skyline across the Hudson, with drifting clouds and a passing ferry"
    >
      <div className="drawn-moon" />
      <div className="city-clouds" />
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hudson-water" x2="0" y2="1">
            <stop stopColor="#365064" />
            <stop offset="1" stopColor="#152a3b" />
          </linearGradient>
          <pattern
            id="city-lit-windows"
            width="13"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="4"
              y="5"
              width="2"
              height="3"
              fill="#dfc493"
              opacity=".55"
            />
          </pattern>
          <path
            id="manhattan-blocks"
            d="M0 202V142H18V125H40V156H53V112H68V102H79V78H85V48H88V78H95V102H106V112H120V155H138V136H155V157H173V108H194V93H200V62H203V93H211V108H227V152H244V122H263V145H280V92L293 57L306 92V146H320V132H340V110H359V143H376V129H400V202Z"
          />
          <g id="manhattan-layer">
            <use href="#manhattan-blocks" fill="#162d40" />
            <use href="#manhattan-blocks" fill="url(#city-lit-windows)" />
            <path
              d="M0 199H400"
              stroke="#b8a17b"
              strokeOpacity=".45"
              strokeWidth="1"
            />
          </g>
          <g id="distant-blocks">
            <path
              d="M0 200V147H23V126H44V153H65V138H86V115H105V150H124V130H141V110H156V142H177V121H191V148H211V126H236V104H253V135H276V119H298V149H321V120H348V134H371V112H400V200Z"
              fill="#516779"
              opacity=".65"
            />
          </g>
          <g id="river-light">
            <path
              d="M8 210h25m27 8h31m25-11h9m26 19h40m21-13h25m38 15h15m26-20h22m-211 28h15m46-3h25m71 9h30"
              fill="none"
              stroke="#c2b494"
              strokeWidth="1"
              strokeOpacity=".25"
            />
          </g>
        </defs>
        <g className="skyline-far">
          <use href="#distant-blocks" />
          <use href="#distant-blocks" x="400" />
        </g>
        <g className="skyline-near">
          <use href="#manhattan-layer" />
          <use href="#manhattan-layer" x="400" />
        </g>
        <path d="M0 202H400V250H0Z" fill="url(#hudson-water)" />
        <g className="water-drift">
          <use href="#river-light" />
          <use href="#river-light" x="400" />
        </g>
        <g className="hudson-ferry">
          <path d="M0 224H27L23 229H5Z" fill="#c9d6d9" />
          <path d="M5 218H21V224H5Z" fill="#b3c4ce" />
          <path d="M8 215H17V218H8Z" fill="#a6b8c4" />
          <path d="M8 220h11" stroke="#35536b" strokeWidth="2" />
          <path d="M-12 231H19" stroke="#9bb9c5" strokeOpacity=".45" />
        </g>
      </svg>
      <div className="drawn-city-mist" />
    </div>
  );
}
