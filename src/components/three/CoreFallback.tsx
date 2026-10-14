export function CoreFallback() {
  return <div className="core-fallback" role="img" aria-label="Schematic of the developer energy core">
    <svg viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <defs><radialGradient id="coreGlow"><stop stopColor="#c9b9ff" stopOpacity=".35"/><stop offset="1" stopColor="#7660c2" stopOpacity="0"/></radialGradient><linearGradient id="ringStroke"><stop stopColor="#d4c5ff"/><stop offset=".5" stopColor="#60577f"/><stop offset="1" stopColor="#a2e6ea"/></linearGradient></defs>
      <circle cx="300" cy="300" r="230" fill="url(#coreGlow)"/>
      <g stroke="url(#ringStroke)"><ellipse cx="300" cy="300" rx="224" ry="91" transform="rotate(-28 300 300)"/><ellipse cx="300" cy="300" rx="213" ry="100" transform="rotate(47 300 300)"/><ellipse cx="300" cy="300" rx="200" ry="90" transform="rotate(103 300 300)"/><circle cx="300" cy="300" r="119" strokeOpacity=".25"/><path d="m300 170 114 65v130l-114 65-114-65V235Zm0 0v260m-114-195 228 130m0-130L186 365m0-130h228M186 365h228" strokeOpacity=".65"/></g>
      <circle cx="300" cy="300" r="47" fill="url(#coreGlow)" stroke="#cabbff" strokeWidth=".5"/>
      <g fill="#cabbff"><circle cx="123" cy="211" r="5"/><circle cx="412" cy="405" r="4"/><circle cx="301" cy="90" r="3"/></g>
    </svg><span className="eyebrow">CORE SCHEMATIC / LOW-POWER VIEW</span>
  </div>
}
