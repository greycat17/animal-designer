'use client';

import type { CSSProperties } from 'react';

/* ================================================================
   Shared SVG wrapper – ensures consistent sizing
   ================================================================ */
function SvgWrap({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '1em', height: '1em', overflow: 'visible', ...style }}
    >
      {children}
    </svg>
  );
}

/* ================================================================
   RABBIT 兔子
   ================================================================ */
export function CartoonRabbit({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* ears */}
      <ellipse cx="36" cy="18" rx="7" ry="20" fill="#F5F5F5" />
      <ellipse cx="36" cy="18" rx="4" ry="15" fill="#FFB6C1" />
      <ellipse cx="64" cy="18" rx="7" ry="20" fill="#F5F5F5" />
      <ellipse cx="64" cy="18" rx="4" ry="15" fill="#FFB6C1" />
      {/* body */}
      <ellipse cx="50" cy="72" rx="20" ry="18" fill="#F5F5F5" />
      {/* head */}
      <circle cx="50" cy="44" r="20" fill="#F5F5F5" />
      {/* eyes */}
      <circle cx="42" cy="41" r="3" fill="#2D3436" />
      <circle cx="58" cy="41" r="3" fill="#2D3436" />
      <circle cx="43" cy="40" r="1" fill="#fff" />
      <circle cx="59" cy="40" r="1" fill="#fff" />
      {/* cheeks */}
      <circle cx="36" cy="49" r="4" fill="#FFB6C1" opacity="0.5" />
      <circle cx="64" cy="49" r="4" fill="#FFB6C1" opacity="0.5" />
      {/* nose + mouth */}
      <ellipse cx="50" cy="48" rx="2.5" ry="2" fill="#FFB6C1" />
      <path d="M48 51 Q50 54 52 51" stroke="#2D3436" strokeWidth="1" fill="none" />
      {/* buck tooth */}
      <rect x="48" y="51" width="4" height="3" rx="1" fill="#fff" />
      {/* feet */}
      <ellipse cx="40" cy="88" rx="8" ry="5" fill="#F5F5F5" />
      <ellipse cx="60" cy="88" rx="8" ry="5" fill="#F5F5F5" />
    </SvgWrap>
  );
}

/* ================================================================
   CAT 小猫
   ================================================================ */
export function CartoonCat({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* tail */}
      <path d="M72 70 Q88 55 82 38" stroke="#FF9F43" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* body */}
      <ellipse cx="50" cy="72" rx="20" ry="18" fill="#FF9F43" />
      {/* head */}
      <circle cx="50" cy="42" r="22" fill="#FF9F43" />
      {/* ears */}
      <polygon points="32,28 28,6 46,22" fill="#FF9F43" />
      <polygon points="34,26 31,12 44,22" fill="#FFB6C1" />
      <polygon points="68,28 72,6 54,22" fill="#FF9F43" />
      <polygon points="66,26 69,12 56,22" fill="#FFB6C1" />
      {/* eyes */}
      <ellipse cx="41" cy="40" rx="3.5" ry="4" fill="#2D3436" />
      <ellipse cx="59" cy="40" rx="3.5" ry="4" fill="#2D3436" />
      <circle cx="42" cy="39" r="1.2" fill="#fff" />
      <circle cx="60" cy="39" r="1.2" fill="#fff" />
      {/* nose */}
      <polygon points="50,46 47,49 53,49" fill="#FFB6C1" />
      {/* mouth */}
      <path d="M47 49 Q50 53 53 49" stroke="#2D3436" strokeWidth="1" fill="none" />
      {/* whiskers */}
      <line x1="24" y1="44" x2="38" y2="46" stroke="#2D3436" strokeWidth="0.8" />
      <line x1="24" y1="48" x2="38" y2="48" stroke="#2D3436" strokeWidth="0.8" />
      <line x1="62" y1="46" x2="76" y2="44" stroke="#2D3436" strokeWidth="0.8" />
      <line x1="62" y1="48" x2="76" y2="48" stroke="#2D3436" strokeWidth="0.8" />
      {/* cheeks */}
      <circle cx="35" cy="48" r="4" fill="#FFB6C1" opacity="0.4" />
      <circle cx="65" cy="48" r="4" fill="#FFB6C1" opacity="0.4" />
      {/* paws */}
      <ellipse cx="38" cy="88" rx="7" ry="5" fill="#FF9F43" />
      <ellipse cx="62" cy="88" rx="7" ry="5" fill="#FF9F43" />
    </SvgWrap>
  );
}

/* ================================================================
   DOG 小狗
   ================================================================ */
export function CartoonDog({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* tail */}
      <path d="M72 62 Q85 50 80 38" stroke="#C4A882" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* body */}
      <ellipse cx="50" cy="72" rx="22" ry="18" fill="#C4A882" />
      {/* belly */}
      <ellipse cx="50" cy="76" rx="14" ry="10" fill="#F5E6D0" />
      {/* head */}
      <circle cx="50" cy="40" r="22" fill="#C4A882" />
      {/* floppy ears */}
      <ellipse cx="28" cy="38" rx="10" ry="18" fill="#A0845C" />
      <ellipse cx="72" cy="38" rx="10" ry="18" fill="#A0845C" />
      {/* face patch */}
      <ellipse cx="50" cy="46" rx="14" ry="10" fill="#F5E6D0" />
      {/* eyes */}
      <circle cx="41" cy="38" r="3.5" fill="#2D3436" />
      <circle cx="59" cy="38" r="3.5" fill="#2D3436" />
      <circle cx="42" cy="37" r="1.2" fill="#fff" />
      <circle cx="60" cy="37" r="1.2" fill="#fff" />
      {/* nose */}
      <ellipse cx="50" cy="45" rx="4" ry="3" fill="#2D3436" />
      <ellipse cx="50" cy="44" rx="1.5" ry="1" fill="#555" />
      {/* mouth + tongue */}
      <path d="M46 48 Q50 52 54 48" stroke="#2D3436" strokeWidth="1" fill="none" />
      <ellipse cx="50" cy="52" rx="3" ry="4" fill="#FF6B6B" />
      {/* cheeks */}
      <circle cx="36" cy="45" r="3" fill="#FFB6C1" opacity="0.4" />
      <circle cx="64" cy="45" r="3" fill="#FFB6C1" opacity="0.4" />
      {/* paws */}
      <ellipse cx="38" cy="88" rx="8" ry="5" fill="#C4A882" />
      <ellipse cx="62" cy="88" rx="8" ry="5" fill="#C4A882" />
    </SvgWrap>
  );
}

/* ================================================================
   FROG 青蛙
   ================================================================ */
export function CartoonFrog({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* body */}
      <ellipse cx="50" cy="65" rx="28" ry="22" fill="#7EC850" />
      {/* belly */}
      <ellipse cx="50" cy="70" rx="18" ry="14" fill="#C8E6A0" />
      {/* eye bumps */}
      <circle cx="36" cy="38" r="12" fill="#7EC850" />
      <circle cx="64" cy="38" r="12" fill="#7EC850" />
      {/* eyeballs */}
      <circle cx="36" cy="36" r="8" fill="#fff" />
      <circle cx="64" cy="36" r="8" fill="#fff" />
      <circle cx="37" cy="35" r="4" fill="#2D3436" />
      <circle cx="65" cy="35" r="4" fill="#2D3436" />
      <circle cx="38" cy="34" r="1.5" fill="#fff" />
      <circle cx="66" cy="34" r="1.5" fill="#fff" />
      {/* wide mouth */}
      <path d="M28 58 Q50 72 72 58" stroke="#2D3436" strokeWidth="1.5" fill="none" />
      {/* cheeks */}
      <circle cx="30" cy="56" r="5" fill="#FFB6C1" opacity="0.35" />
      <circle cx="70" cy="56" r="5" fill="#FFB6C1" opacity="0.35" />
      {/* front legs */}
      <ellipse cx="28" cy="82" rx="10" ry="6" fill="#7EC850" />
      <ellipse cx="72" cy="82" rx="10" ry="6" fill="#7EC850" />
    </SvgWrap>
  );
}

/* ================================================================
   DINOSAUR 恐龙
   ================================================================ */
export function CartoonDino({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* tail */}
      <path d="M75 60 Q92 55 90 42" stroke="#6BCB77" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* body */}
      <ellipse cx="48" cy="65" rx="24" ry="20" fill="#6BCB77" />
      {/* belly */}
      <ellipse cx="46" cy="70" rx="15" ry="12" fill="#A8E6A0" />
      {/* head */}
      <circle cx="38" cy="38" r="18" fill="#6BCB77" />
      {/* spikes */}
      <polygon points="50,18 54,28 46,28" fill="#4CAF50" />
      <polygon points="60,22 64,32 56,32" fill="#4CAF50" />
      <polygon points="68,30 72,40 64,40" fill="#4CAF50" />
      {/* eyes */}
      <circle cx="32" cy="34" r="4" fill="#fff" />
      <circle cx="33" cy="33" r="2.5" fill="#2D3436" />
      <circle cx="34" cy="32" r="1" fill="#fff" />
      <circle cx="44" cy="34" r="4" fill="#fff" />
      <circle cx="45" cy="33" r="2.5" fill="#2D3436" />
      <circle cx="46" cy="32" r="1" fill="#fff" />
      {/* mouth */}
      <path d="M28 44 Q38 50 48 44" stroke="#2D3436" strokeWidth="1.2" fill="none" />
      {/* cheek */}
      <circle cx="28" cy="42" r="3" fill="#FFB6C1" opacity="0.4" />
      {/* legs */}
      <rect x="34" y="80" width="10" height="12" rx="5" fill="#6BCB77" />
      <rect x="54" y="80" width="10" height="12" rx="5" fill="#6BCB77" />
      {/* small arms */}
      <ellipse cx="28" cy="58" rx="6" ry="4" fill="#6BCB77" transform="rotate(-20 28 58)" />
    </SvgWrap>
  );
}

/* ================================================================
   SNAIL 蜗牛
   ================================================================ */
export function CartoonSnail({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* body / foot */}
      <ellipse cx="45" cy="78" rx="30" ry="10" fill="#D4A574" />
      {/* head area */}
      <circle cx="22" cy="68" r="12" fill="#D4A574" />
      {/* eye stalks */}
      <line x1="18" y1="60" x2="12" y2="42" stroke="#D4A574" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="60" x2="30" y2="42" stroke="#D4A574" strokeWidth="3" strokeLinecap="round" />
      {/* eyeballs */}
      <circle cx="12" cy="40" r="5" fill="#fff" />
      <circle cx="12" cy="39" r="2.5" fill="#2D3436" />
      <circle cx="30" cy="40" r="5" fill="#fff" />
      <circle cx="30" cy="39" r="2.5" fill="#2D3436" />
      {/* shell */}
      <circle cx="58" cy="58" r="24" fill="#FF9F43" />
      <circle cx="58" cy="58" r="18" fill="#FFB74D" />
      <path d="M58 40 Q72 50 62 62 Q52 72 48 58 Q44 46 58 44" stroke="#E08A2D" strokeWidth="2" fill="none" />
      {/* cheeks */}
      <circle cx="16" cy="72" r="3" fill="#FFB6C1" opacity="0.5" />
      {/* smile */}
      <path d="M18 72 Q22 76 26 72" stroke="#2D3436" strokeWidth="1" fill="none" />
    </SvgWrap>
  );
}

/* ================================================================
   FISH 小鱼
   ================================================================ */
export function CartoonFish({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* tail */}
      <polygon points="78,50 95,35 95,65" fill="#45B7D1" />
      {/* body */}
      <ellipse cx="48" cy="50" rx="30" ry="20" fill="#45B7D1" />
      {/* belly */}
      <ellipse cx="45" cy="55" rx="20" ry="10" fill="#B3E5FC" />
      {/* dorsal fin */}
      <path d="M40 30 Q50 18 60 30" fill="#3A9FBF" />
      {/* eye */}
      <circle cx="34" cy="45" r="5" fill="#fff" />
      <circle cx="35" cy="44" r="3" fill="#2D3436" />
      <circle cx="36" cy="43" r="1" fill="#fff" />
      {/* cheek */}
      <circle cx="30" cy="52" r="3" fill="#FFB6C1" opacity="0.4" />
      {/* mouth */}
      <circle cx="20" cy="50" r="3" fill="#FF8A80" />
      {/* scales hint */}
      <path d="M45 42 Q50 46 45 50" stroke="#3A9FBF" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M55 42 Q60 46 55 50" stroke="#3A9FBF" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M50 50 Q55 54 50 58" stroke="#3A9FBF" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* pectoral fin */}
      <ellipse cx="42" cy="60" rx="6" ry="4" fill="#3A9FBF" transform="rotate(20 42 60)" />
    </SvgWrap>
  );
}

/* ================================================================
   DRAGONFLY 蜻蜓
   ================================================================ */
export function CartoonDragonfly({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* wings */}
      <ellipse cx="32" cy="38" rx="20" ry="8" fill="#B3E5FC" opacity="0.6" transform="rotate(-15 32 38)" />
      <ellipse cx="68" cy="38" rx="20" ry="8" fill="#B3E5FC" opacity="0.6" transform="rotate(15 68 38)" />
      <ellipse cx="34" cy="50" rx="18" ry="7" fill="#B3E5FC" opacity="0.5" transform="rotate(-10 34 50)" />
      <ellipse cx="66" cy="50" rx="18" ry="7" fill="#B3E5FC" opacity="0.5" transform="rotate(10 66 50)" />
      {/* body */}
      <ellipse cx="50" cy="42" rx="8" ry="12" fill="#4ECDC4" />
      {/* tail */}
      <ellipse cx="50" cy="65" rx="4" ry="18" fill="#4ECDC4" />
      <ellipse cx="50" cy="80" rx="3" ry="6" fill="#3DBDB4" />
      {/* head */}
      <circle cx="50" cy="28" r="10" fill="#4ECDC4" />
      {/* big eyes */}
      <circle cx="42" cy="26" r="6" fill="#fff" />
      <circle cx="43" cy="25" r="3.5" fill="#2D3436" />
      <circle cx="44" cy="24" r="1.2" fill="#fff" />
      <circle cx="58" cy="26" r="6" fill="#fff" />
      <circle cx="59" cy="25" r="3.5" fill="#2D3436" />
      <circle cx="60" cy="24" r="1.2" fill="#fff" />
      {/* smile */}
      <path d="M46 32 Q50 35 54 32" stroke="#2D3436" strokeWidth="0.8" fill="none" />
    </SvgWrap>
  );
}

/* ================================================================
   SQUIRREL 松鼠 (full body)
   ================================================================ */
export function CartoonSquirrel({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* big fluffy tail */}
      <path d="M65 50 Q90 30 82 55 Q78 75 65 70" fill="#D4883E" />
      <path d="M67 52 Q85 36 80 56 Q76 72 66 68" fill="#E8A855" />
      {/* body */}
      <ellipse cx="45" cy="68" rx="16" ry="18" fill="#D4883E" />
      {/* belly */}
      <ellipse cx="44" cy="72" rx="10" ry="12" fill="#F5E6D0" />
      {/* head */}
      <circle cx="45" cy="40" r="16" fill="#D4883E" />
      {/* ears */}
      <polygon points="34,28 30,14 40,24" fill="#D4883E" />
      <polygon points="56,28 60,14 50,24" fill="#D4883E" />
      <polygon points="35,27 32,18 39,24" fill="#FFB6C1" />
      <polygon points="55,27 58,18 51,24" fill="#FFB6C1" />
      {/* eyes */}
      <circle cx="39" cy="38" r="3" fill="#2D3436" />
      <circle cx="51" cy="38" r="3" fill="#2D3436" />
      <circle cx="40" cy="37" r="1" fill="#fff" />
      <circle cx="52" cy="37" r="1" fill="#fff" />
      {/* nose */}
      <circle cx="45" cy="44" r="2" fill="#2D3436" />
      {/* cheeks */}
      <circle cx="35" cy="44" r="3" fill="#FFB6C1" opacity="0.4" />
      <circle cx="55" cy="44" r="3" fill="#FFB6C1" opacity="0.4" />
      {/* paws holding acorn */}
      <circle cx="45" cy="62" r="4" fill="#8B6914" />
      <ellipse cx="45" cy="58" rx="3" ry="2" fill="#A07D1A" />
      {/* feet */}
      <ellipse cx="38" cy="85" rx="7" ry="4" fill="#D4883E" />
      <ellipse cx="52" cy="85" rx="7" ry="4" fill="#D4883E" />
    </SvgWrap>
  );
}

/* ================================================================
   FLOWER 1 花朵1 — 粉色五瓣花
   ================================================================ */
export function Flower1({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* stem */}
      <path d="M50 55 Q48 72 50 95" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="42" cy="72" rx="10" ry="5" fill="#7EC850" transform="rotate(-30 42 72)" />
      <ellipse cx="58" cy="80" rx="10" ry="5" fill="#7EC850" transform="rotate(25 58 80)" />
      {/* petals */}
      <circle cx="50" cy="22" r="10" fill="#FF85A1" />
      <circle cx="64" cy="32" r="10" fill="#FF85A1" />
      <circle cx="60" cy="48" r="10" fill="#FF85A1" />
      <circle cx="40" cy="48" r="10" fill="#FF85A1" />
      <circle cx="36" cy="32" r="10" fill="#FF85A1" />
      {/* center */}
      <circle cx="50" cy="36" r="8" fill="#FFD93D" />
      <circle cx="48" cy="34" r="2" fill="#FFE082" />
    </SvgWrap>
  );
}

/* ================================================================
   FLOWER 2 花朵2 — 蓝色雏菊
   ================================================================ */
export function Flower2({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* stem */}
      <path d="M50 52 Q52 70 48 95" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="40" cy="68" rx="12" ry="4" fill="#7EC850" transform="rotate(-40 40 68)" />
      <ellipse cx="56" cy="78" rx="10" ry="4" fill="#7EC850" transform="rotate(30 56 78)" />
      {/* petals (elongated) */}
      <ellipse cx="50" cy="18" rx="6" ry="12" fill="#96C" />
      <ellipse cx="65" cy="28" rx="6" ry="12" fill="#96C" transform="rotate(60 65 28)" />
      <ellipse cx="65" cy="46" rx="6" ry="12" fill="#96C" transform="rotate(120 65 46)" />
      <ellipse cx="50" cy="52" rx="6" ry="12" fill="#96C" transform="rotate(180 50 52)" />
      <ellipse cx="35" cy="46" rx="6" ry="12" fill="#96C" transform="rotate(240 35 46)" />
      <ellipse cx="35" cy="28" rx="6" ry="12" fill="#96C" transform="rotate(300 35 28)" />
      {/* center */}
      <circle cx="50" cy="35" r="7" fill="#FFD93D" />
    </SvgWrap>
  );
}

/* ================================================================
   FLOWER 3 花朵3 — 红色郁金香
   ================================================================ */
export function Flower3({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* stem */}
      <path d="M50 50 L50 95" stroke="#4CAF50" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* leaves (long, wrapping) */}
      <path d="M50 70 Q30 62 28 78 Q30 88 50 82" fill="#7EC850" />
      <path d="M50 60 Q70 52 72 68 Q70 78 50 72" fill="#7EC850" />
      {/* tulip petals */}
      <path d="M35 45 Q35 18 50 15 Q65 18 65 45 Q58 52 50 52 Q42 52 35 45Z" fill="#FF6B6B" />
      <path d="M42 42 Q42 22 50 18 Q50 22 50 42 Q46 48 42 42Z" fill="#FF8A80" opacity="0.6" />
      <path d="M58 42 Q58 22 50 18 Q50 22 50 42 Q54 48 58 42Z" fill="#E55555" opacity="0.4" />
    </SvgWrap>
  );
}

/* ================================================================
   FLOWER 4 花朵4 — 黄色小花
   ================================================================ */
export function Flower4({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* stem */}
      <path d="M50 50 Q48 70 50 95" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* leaf */}
      <ellipse cx="40" cy="70" rx="10" ry="4" fill="#7EC850" transform="rotate(-35 40 70)" />
      {/* petals */}
      <circle cx="50" cy="20" r="9" fill="#FFD93D" />
      <circle cx="62" cy="30" r="9" fill="#FFD93D" />
      <circle cx="58" cy="44" r="9" fill="#FFD93D" />
      <circle cx="42" cy="44" r="9" fill="#FFD93D" />
      <circle cx="38" cy="30" r="9" fill="#FFD93D" />
      {/* center */}
      <circle cx="50" cy="33" r="7" fill="#FF9F43" />
      <circle cx="48" cy="31" r="2" fill="#FFB74D" />
    </SvgWrap>
  );
}

/* ================================================================
   FLOWER 5 花朵5 — 薰衣草
   ================================================================ */
export function Flower5({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* stem */}
      <path d="M50 45 L50 95" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="42" cy="72" rx="10" ry="3" fill="#7EC850" transform="rotate(-30 42 72)" />
      <ellipse cx="58" cy="82" rx="10" ry="3" fill="#7EC850" transform="rotate(30 58 82)" />
      {/* lavender clusters */}
      <circle cx="50" cy="12" r="5" fill="#B39DDB" />
      <circle cx="44" cy="20" r="5" fill="#CE93D8" />
      <circle cx="56" cy="20" r="5" fill="#B39DDB" />
      <circle cx="48" cy="28" r="5" fill="#CE93D8" />
      <circle cx="54" cy="28" r="5" fill="#B39DDB" />
      <circle cx="44" cy="36" r="5" fill="#CE93D8" />
      <circle cx="56" cy="36" r="5" fill="#B39DDB" />
      <circle cx="50" cy="42" r="4" fill="#CE93D8" />
    </SvgWrap>
  );
}

/* ================================================================
   LAKE 湖泊 — 卡通椭圆形湖面
   ================================================================ */
export function CartoonLake({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* water body */}
      <ellipse cx="50" cy="58" rx="42" ry="26" fill="#45B7D1" />
      {/* lighter center */}
      <ellipse cx="48" cy="55" rx="30" ry="18" fill="#74CBE6" />
      {/* shine */}
      <ellipse cx="38" cy="48" rx="12" ry="6" fill="#B3E5FC" opacity="0.6" />
      {/* wave lines */}
      <path d="M25 55 Q32 50 40 55 Q48 60 56 55" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M40 65 Q48 60 56 65 Q64 70 72 65" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* shore grass left */}
      <path d="M10 50 Q8 38 12 30" stroke="#7EC850" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M14 52 Q15 40 18 34" stroke="#6BCB77" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* shore grass right */}
      <path d="M88 48 Q90 36 86 28" stroke="#7EC850" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M84 50 Q83 38 80 32" stroke="#6BCB77" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* small reed */}
      <line x1="12" y1="30" x2="12" y2="26" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="12" cy="24" rx="2" ry="3" fill="#8B6914" />
    </SvgWrap>
  );
}

/* ================================================================
   GRASS 小草 — 卡通草丛
   ================================================================ */
export function CartoonGrass({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* grass blades */}
      <path d="M50 90 Q48 55 38 20" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q52 50 60 15" stroke="#6BCB77" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q44 60 28 35" stroke="#7EC850" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q56 58 72 30" stroke="#4CAF50" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q46 65 22 50" stroke="#6BCB77" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q54 65 78 48" stroke="#7EC850" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* base mound */}
      <ellipse cx="50" cy="90" rx="18" ry="6" fill="#7EC850" />
    </SvgWrap>
  );
}

/* ================================================================
   BOY 卡通小男孩 — 完整人物
   ================================================================ */
export function CartoonBoy({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* hair */}
      <ellipse cx="50" cy="22" rx="20" ry="18" fill="#5D4037" />
      <path d="M30 22 Q30 8 50 6 Q70 8 70 22" fill="#5D4037" />
      {/* head */}
      <circle cx="50" cy="26" r="17" fill="#FFCC99" />
      {/* hair fringe */}
      <path d="M33 20 Q38 12 50 14 Q62 12 67 20" fill="#5D4037" />
      {/* eyes */}
      <circle cx="43" cy="26" r="2.5" fill="#333" />
      <circle cx="57" cy="26" r="2.5" fill="#333" />
      <circle cx="44" cy="25" r="0.8" fill="#fff" />
      <circle cx="58" cy="25" r="0.8" fill="#fff" />
      {/* smile */}
      <path d="M44 32 Q50 37 56 32" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="37" cy="30" r="3" fill="#FFB6C1" opacity="0.5" />
      <circle cx="63" cy="30" r="3" fill="#FFB6C1" opacity="0.5" />
      {/* neck */}
      <rect x="46" y="42" width="8" height="5" rx="2" fill="#FFCC99" />
      {/* body / T-shirt */}
      <path d="M34 48 Q34 44 46 44 L54 44 Q66 44 66 48 L66 68 Q66 70 64 70 L36 70 Q34 70 34 68 Z" fill="#4A90D9" />
      {/* T-shirt collar */}
      <path d="M44 44 Q50 48 56 44" stroke="#3A7BC8" strokeWidth="1.5" fill="none" />
      {/* arms */}
      <path d="M34 50 L24 60 L26 62" stroke="#FFCC99" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 50 L76 60 L74 62" stroke="#FFCC99" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* shorts */}
      <rect x="36" y="68" width="28" height="14" rx="3" fill="#8B6914" />
      <line x1="50" y1="68" x2="50" y2="82" stroke="#7A5C12" strokeWidth="1.5" />
      {/* legs */}
      <rect x="38" y="80" width="8" height="12" rx="3" fill="#FFCC99" />
      <rect x="54" y="80" width="8" height="12" rx="3" fill="#FFCC99" />
      {/* shoes */}
      <ellipse cx="42" cy="94" rx="7" ry="4" fill="#E74C3C" />
      <ellipse cx="58" cy="94" rx="7" ry="4" fill="#E74C3C" />
    </SvgWrap>
  );
}

/* ================================================================
   GIRL 卡通小女孩 — 完整人物
   ================================================================ */
export function CartoonGirl({ style }: { style?: CSSProperties }) {
  return (
    <SvgWrap style={style}>
      {/* hair back */}
      <ellipse cx="50" cy="24" rx="22" ry="20" fill="#4A2800" />
      {/* pigtails */}
      <circle cx="26" cy="20" r="8" fill="#4A2800" />
      <circle cx="74" cy="20" r="8" fill="#4A2800" />
      {/* hair ties */}
      <circle cx="26" cy="14" r="3" fill="#FF69B4" />
      <circle cx="74" cy="14" r="3" fill="#FF69B4" />
      {/* head */}
      <circle cx="50" cy="26" r="17" fill="#FFD5B8" />
      {/* hair fringe */}
      <path d="M33 20 Q38 10 50 12 Q62 10 67 20" fill="#4A2800" />
      {/* eyes */}
      <circle cx="43" cy="26" r="2.5" fill="#333" />
      <circle cx="57" cy="26" r="2.5" fill="#333" />
      <circle cx="44" cy="25" r="0.8" fill="#fff" />
      <circle cx="58" cy="25" r="0.8" fill="#fff" />
      {/* eyelashes */}
      <path d="M40 23 L39 21" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <path d="M60 23 L61 21" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      {/* smile */}
      <path d="M44 32 Q50 37 56 32" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="37" cy="30" r="3.5" fill="#FFB6C1" opacity="0.6" />
      <circle cx="63" cy="30" r="3.5" fill="#FFB6C1" opacity="0.6" />
      {/* neck */}
      <rect x="46" y="42" width="8" height="5" rx="2" fill="#FFD5B8" />
      {/* dress */}
      <path d="M36 46 Q36 44 46 44 L54 44 Q64 44 64 46 L64 60 L72 82 Q72 84 70 84 L30 84 Q28 84 28 82 L36 60 Z" fill="#FF69B4" />
      {/* dress collar */}
      <path d="M42 44 Q50 48 58 44" stroke="#FF85C8" strokeWidth="1.5" fill="none" />
      {/* dress pattern - small bow */}
      <circle cx="50" cy="52" r="2.5" fill="#FF85C8" />
      <path d="M46 52 Q48 50 50 52 Q52 50 54 52" fill="#FF85C8" />
      {/* arms */}
      <path d="M36 48 L26 58 L28 60" stroke="#FFD5B8" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M64 48 L74 58 L72 60" stroke="#FFD5B8" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* legs */}
      <rect x="40" y="82" width="7" height="10" rx="3" fill="#FFD5B8" />
      <rect x="53" y="82" width="7" height="10" rx="3" fill="#FFD5B8" />
      {/* shoes */}
      <ellipse cx="43" cy="94" rx="7" ry="4" fill="#FF1493" />
      <ellipse cx="57" cy="94" rx="7" ry="4" fill="#FF1493" />
    </SvgWrap>
  );
}
