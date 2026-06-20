// ════════════════════════════════════════════════════════
//  AvatarCreator — 캐릭터 커스터마이징 컴포넌트 (React + Tailwind)
// ════════════════════════════════════════════════════════
import { useState } from 'react';

// ── 1. 데이터 ──────────────────────────────────────────

const ANIMALS = [
  { id: 'bear',   name: '곰돌이',   emoji: '🐻' },
  { id: 'cat',    name: '야옹이',   emoji: '🐱' },
  { id: 'bunny',  name: '토끼',     emoji: '🐰' },
  { id: 'fox',    name: '여우',     emoji: '🦊' },
  { id: 'dog',    name: '강아지',   emoji: '🐶' },
  { id: 'koala',  name: '코알라',   emoji: '🐨' },
  { id: 'panda',  name: '판다',     emoji: '🐼' },
  { id: 'tiger',  name: '호랑이',   emoji: '🐯' },
  { id: 'wolf',   name: '늑대',     emoji: '🐺' },
  { id: 'lion',   name: '사자',     emoji: '🦁' },
  { id: 'hamster',name: '햄스터',   emoji: '🐹' },
  { id: 'frog',   name: '개구리',   emoji: '🐸' },
];

const COLORS = [
  { id: 'brown',    label: '갈색',     hex: '#c07844' },
  { id: 'beige',    label: '베이지',   hex: '#e0c080' },
  { id: 'gray',     label: '회색',     hex: '#909098' },
  { id: 'white',    label: '흰색',     hex: '#f0ece4' },
  { id: 'orange',   label: '주황',     hex: '#e07030' },
  { id: 'pink',     label: '핑크',     hex: '#e890a0' },
  { id: 'blue',     label: '파랑',     hex: '#6090d8' },
  { id: 'mint',     label: '민트',     hex: '#60b890' },
  { id: 'purple',   label: '보라',     hex: '#9060c0' },
  { id: 'yellow',   label: '노랑',     hex: '#d8b030' },
  { id: 'black',    label: '검정',     hex: '#404048' },
  { id: 'lavender', label: '라벤더',   hex: '#a890d0' },
  { id: 'sky',      label: '하늘',     hex: '#50c4e8' },
  { id: 'lime',     label: '라임',     hex: '#78c050' },
  // 그라데이션 (CSS gradient id로 처리)
  { id: 'grad_sunset', label: '선셋',   gradient: ['#ff9a9e','#fecfef'] },
  { id: 'grad_ocean',  label: '오션',   gradient: ['#a1c4fd','#c2e9fb'] },
  { id: 'grad_forest', label: '숲속',   gradient: ['#a8edea','#fed6e3'] },
];

const EYES = [
  { id: 'round',    label: '동그란 눈 ⚫' },
  { id: 'sparkle',  label: '반짝이 눈 ✨' },
  { id: 'sleepy',   label: '졸린 눈 😪' },
  { id: 'wink',     label: '윙크 눈 😉' },
  { id: 'star',     label: '별빛 눈 ⭐' },
  { id: 'heart',    label: '하트 눈 💖' },
  { id: 'angry',    label: '화난 눈 😠' },
  { id: 'teary',    label: '눈물 눈 😢' },
];

const MOUTHS = [
  { id: 'smile',   label: '웃는 입 😊' },
  { id: 'big',     label: '활짝 웃음 😄' },
  { id: 'cat',     label: '고양이 입 w' },
  { id: 'tongue',  label: '메롱 😛' },
  { id: 'sad',     label: '슬픈 입 😢' },
  { id: 'oh',      label: '놀란 입 😮' },
  { id: 'cool',    label: '쿨 표정 😎' },
  { id: 'tiny',    label: '작은 입 🙂' },
];

const HEADWEAR = [
  { id: 'none',       label: '없음',         emoji: '—' },
  { id: 'cap',        label: '야구 모자',    emoji: '🧢' },
  { id: 'crown',      label: '왕관',         emoji: '👑' },
  { id: 'bow',        label: '리본',         emoji: '🎀' },
  { id: 'headphone',  label: '헤드폰',       emoji: '🎧' },
  { id: 'witch',      label: '마법사 모자',  emoji: '🪄' },
  { id: 'catears',    label: '고양이 귀',    emoji: '🐱' },
  { id: 'halo',       label: '천사 후광',    emoji: '👼' },
];

const OUTFITS = [
  { id: 'none',        label: '없음',          emoji: '—' },
  { id: 'tshirt',      label: '티셔츠',        emoji: '👕' },
  { id: 'hoodie',      label: '후드티',        emoji: '🧡' },
  { id: 'overalls',    label: '멜빵바지',      emoji: '🩱' },
  { id: 'explorer',    label: '탐험가 조끼',   emoji: '🎒' },
  { id: 'sportwear',   label: '운동복',        emoji: '🏅' },
  { id: 'jumprope',    label: '줄넘기 유니폼', emoji: '🪢' },
  { id: 'cape',        label: '영웅 망토',     emoji: '🦸' },
];

const BACKGROUNDS = [
  { id: 'white',       label: '흰 배경',      css: '#ffffff' },
  { id: 'sky',         label: '하늘',         css: 'linear-gradient(160deg,#a8edea,#bde0fe)' },
  { id: 'sunset',      label: '노을',         css: 'linear-gradient(160deg,#f9ca6b,#e86ca8)' },
  { id: 'mint',        label: '민트',         css: 'linear-gradient(160deg,#b2f5ea,#e6fffa)' },
  { id: 'galaxy',      label: '우주',         css: 'linear-gradient(160deg,#1a1a4e,#6b21a8)' },
  { id: 'playground',  label: '운동장',       css: 'linear-gradient(180deg,#87ceeb 60%,#90d16e 60%)' },
  { id: 'heart',       label: '하트 패턴',    css: '#ffe4f3' },
  { id: 'rainbow',     label: '무지개',       css: 'linear-gradient(160deg,#ff9a9e,#fad0c4,#ffecd2)' },
];

// ── 2. SVG 레이어 함수 ────────────────────────────────

function getBodyColor(colorId) {
  const c = COLORS.find(x => x.id === colorId);
  if (!c) return '#c07844';
  if (c.gradient) return `url(#bodyGrad_${colorId})`;
  return c.hex;
}

function BackgroundLayer({ bgId }) {
  const bg = BACKGROUNDS.find(x => x.id === bgId) || BACKGROUNDS[0];
  const isHeart = bgId === 'heart';
  return (
    <>
      {/* SVG defs용 그라디언트는 상위에서 처리 */}
      <rect x="0" y="0" width="200" height="220" rx="20"
        fill={bgId === 'galaxy' ? '#1a1a4e' : bgId === 'playground' ? '#87ceeb' : bg.css.startsWith('#') ? bg.css : 'url(#bgGrad)'}
      />
      {bgId === 'playground' && <rect x="0" y="132" width="200" height="88" rx="0" fill="#90d16e"/>}
      {isHeart && (
        <>
          {[30,70,110,150,50,90,130].map((x,i)=>(
            <text key={i} x={x} y={[30,60,40,30,90,80,100][i]} fontSize="14" opacity="0.3" fill="#e91e63">♥</text>
          ))}
        </>
      )}
    </>
  );
}

function EarLayer({ animal, bc }) {
  switch(animal) {
    case 'cat': case 'tiger': return (
      <>
        <polygon points="33,55 43,28 55,55" fill={bc}/>
        <polygon points="145,55 157,28 167,55" fill={bc}/>
        <polygon points="37,53 43,35 51,53" fill="rgba(255,140,140,.65)"/>
        <polygon points="149,53 157,35 163,53" fill="rgba(255,140,140,.65)"/>
      </>
    );
    case 'bunny': return (
      <>
        <ellipse cx="72" cy="28" rx="16" ry="32" fill={bc} transform="rotate(-8,72,28)"/>
        <ellipse cx="128" cy="28" rx="16" ry="32" fill={bc} transform="rotate(8,128,28)"/>
        <ellipse cx="72" cy="28" rx="9" ry="23" fill="rgba(255,165,165,.6)" transform="rotate(-8,72,28)"/>
        <ellipse cx="128" cy="28" rx="9" ry="23" fill="rgba(255,165,165,.6)" transform="rotate(8,128,28)"/>
      </>
    );
    case 'fox': return (
      <>
        <polygon points="28,60 42,22 60,60" fill={bc}/>
        <polygon points="140,60 158,22 172,60" fill={bc}/>
        <polygon points="32,58 42,32 56,58" fill="rgba(255,255,255,.7)"/>
        <polygon points="144,58 158,32 168,58" fill="rgba(255,255,255,.7)"/>
      </>
    );
    case 'dog': return (
      <>
        <ellipse cx="46" cy="80" rx="20" ry="36" fill={bc} transform="rotate(-16,46,80)"/>
        <ellipse cx="154" cy="80" rx="20" ry="36" fill={bc} transform="rotate(16,154,80)"/>
      </>
    );
    case 'koala': return (
      <>
        <ellipse cx="35" cy="68" rx="28" ry="32" fill={bc}/>
        <ellipse cx="165" cy="68" rx="28" ry="32" fill={bc}/>
        <ellipse cx="35" cy="68" rx="16" ry="20" fill="rgba(255,255,255,.3)"/>
        <ellipse cx="165" cy="68" rx="16" ry="20" fill="rgba(255,255,255,.3)"/>
      </>
    );
    case 'panda': return (
      <>
        <circle cx="52" cy="44" r="22" fill="rgba(20,20,20,.9)"/>
        <circle cx="148" cy="44" r="22" fill="rgba(20,20,20,.9)"/>
      </>
    );
    case 'lion': return (
      <>
        <circle cx="100" cy="96" r="72" fill="#9a5c00" opacity="0.72"/>
        <circle cx="100" cy="96" r="64" fill="#c47800" opacity="0.8"/>
        <circle cx="100" cy="90" r="56" fill="#e8a020" opacity="0.5"/>
        <circle cx="52" cy="40" r="18" fill={bc}/>
        <circle cx="148" cy="40" r="18" fill={bc}/>
        <circle cx="52" cy="40" r="10" fill="rgba(255,165,165,.48)"/>
        <circle cx="148" cy="40" r="10" fill="rgba(255,165,165,.48)"/>
      </>
    );
    case 'hamster': return (
      <>
        <circle cx="50" cy="56" r="24" fill={bc}/>
        <circle cx="150" cy="56" r="24" fill={bc}/>
        <circle cx="50" cy="56" r="15" fill="rgba(255,165,165,.48)"/>
        <circle cx="150" cy="56" r="15" fill="rgba(255,165,165,.48)"/>
      </>
    );
    case 'frog': return (
      <>
        <circle cx="68" cy="36" r="22" fill={bc}/>
        <circle cx="132" cy="36" r="22" fill={bc}/>
      </>
    );
    case 'wolf': return (
      <>
        <polygon points="30,60 42,22 58,58" fill={bc}/>
        <polygon points="142,58 158,22 170,60" fill={bc}/>
        <polygon points="34,58 43,30 54,57" fill="rgba(255,255,255,.4)"/>
        <polygon points="146,57 157,30 166,58" fill="rgba(255,255,255,.4)"/>
      </>
    );
    default: // bear
      return (
        <>
          <circle cx="52" cy="36" r="22" fill={bc}/>
          <circle cx="148" cy="36" r="22" fill={bc}/>
          <circle cx="52" cy="36" r="13" fill="rgba(255,165,165,.52)"/>
          <circle cx="148" cy="36" r="13" fill="rgba(255,165,165,.52)"/>
        </>
      );
  }
}

function BodyLayer({ animal, colorId }) {
  const bc = getBodyColor(colorId);
  const isPanda = animal === 'panda';
  return (
    <>
      {/* 귀 (머리 뒤) */}
      <EarLayer animal={animal} bc={bc}/>
      {/* 몸통 */}
      <ellipse cx="100" cy="168" rx="42" ry="32" fill={bc}/>
      {/* 팔 */}
      <ellipse cx="56" cy="162" rx="18" ry="12" fill={bc} transform="rotate(-30,56,162)"/>
      <ellipse cx="144" cy="162" rx="18" ry="12" fill={bc} transform="rotate(30,144,162)"/>
      {/* 목 */}
      <rect x="88" y="128" width="24" height="18" rx="8" fill={bc}/>
      {/* 머리 */}
      {isPanda
        ? <circle cx="100" cy="100" r="54" fill="#f0ece4"/>
        : <circle cx="100" cy="100" r="54" fill={bc}/>
      }
      {isPanda && (
        <>
          <ellipse cx="72" cy="86" rx="22" ry="20" fill="rgba(20,20,20,.85)"/>
          <ellipse cx="128" cy="86" rx="22" ry="20" fill="rgba(20,20,20,.85)"/>
        </>
      )}
      {/* 배 */}
      <ellipse cx="100" cy="165" rx="26" ry="22" fill="rgba(255,255,255,.28)"/>
    </>
  );
}

function EyesLayer({ eyeId }) {
  const ex1 = 72, ey1 = 90, ex2 = 128, ey2 = 90;
  switch(eyeId) {
    case 'sparkle': return (
      <>
        <circle cx={ex1} cy={ey1} r="15" fill="white"/>
        <circle cx={ex2} cy={ey2} r="15" fill="white"/>
        <circle cx={ex1} cy={ey1} r="10" fill="#6040e0"/>
        <circle cx={ex2} cy={ey2} r="10" fill="#6040e0"/>
        <circle cx={ex1} cy={ey1} r="6" fill="#1a1a2e"/>
        <circle cx={ex2} cy={ey2} r="6" fill="#1a1a2e"/>
        <circle cx={ex1+4} cy={ey1-4} r="4" fill="white"/>
        <circle cx={ex2+4} cy={ey2-4} r="4" fill="white"/>
        <circle cx={ex1-3} cy={ey1+4} r="2" fill="white"/>
        <circle cx={ex2-3} cy={ey2+4} r="2" fill="white"/>
      </>
    );
    case 'sleepy': return (
      <>
        <circle cx={ex1} cy={ey1} r="14" fill="white"/>
        <circle cx={ex2} cy={ey2} r="14" fill="white"/>
        <circle cx={ex1} cy={ey1+4} r="10" fill="#1a1a2e"/>
        <circle cx={ex2} cy={ey2+4} r="10" fill="#1a1a2e"/>
        <circle cx={ex1+4} cy={ey1+2} r="3" fill="white"/>
        <circle cx={ex2+4} cy={ey2+2} r="3" fill="white"/>
        <rect x={ex1-15} y={ey1-15} width="30" height="17" rx="8" fill="#c07844" opacity="0.7"/>
        <rect x={ex2-15} y={ey2-15} width="30" height="17" rx="8" fill="#c07844" opacity="0.7"/>
      </>
    );
    case 'wink': return (
      <>
        <circle cx={ex1} cy={ey1} r="14" fill="white"/>
        <circle cx={ex1} cy={ey1+1} r="9.5" fill="#1a1a2e"/>
        <circle cx={ex1+4} cy={ey1-3} r="4" fill="white"/>
        <path d={`M${ex2-12},${ey2+1} Q${ex2},${ey2-12} ${ex2+12},${ey2+1}`} stroke="#1a1a2e" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      </>
    );
    case 'star': return (
      <>
        <circle cx={ex1} cy={ey1} r="15" fill="white"/>
        <circle cx={ex2} cy={ey2} r="15" fill="white"/>
        <path d={`M${ex1},${ey1-12} l4,8 l8.5,0 l-7,5.5 l2.7,8.5 l-8.2,-5.5 l-8.2,5.5 l2.7,-8.5 l-7,-5.5 l8.5,0 Z`} fill="#f4c430"/>
        <path d={`M${ex2},${ey2-12} l4,8 l8.5,0 l-7,5.5 l2.7,8.5 l-8.2,-5.5 l-8.2,5.5 l2.7,-8.5 l-7,-5.5 l8.5,0 Z`} fill="#f4c430"/>
      </>
    );
    case 'heart': return (
      <>
        <circle cx={ex1} cy={ey1} r="15" fill="white"/>
        <circle cx={ex2} cy={ey2} r="15" fill="white"/>
        {[ex1, ex2].map((cx, i) => (
          <g key={i}>
            <circle cx={cx-4.5} cy={ey1-3} r="6.5" fill="#e91e63"/>
            <circle cx={cx+4.5} cy={ey1-3} r="6.5" fill="#e91e63"/>
            <path d={`M${cx-10},${ey1-1} L${cx},${ey1+10} L${cx+10},${ey1-1} Z`} fill="#e91e63"/>
          </g>
        ))}
      </>
    );
    case 'angry': return (
      <>
        <circle cx={ex1} cy={ey1} r="13" fill="white"/>
        <circle cx={ex2} cy={ey2} r="13" fill="white"/>
        <circle cx={ex1} cy={ey1+2} r="8.5" fill="#1a1a2e"/>
        <circle cx={ex2} cy={ey2+2} r="8.5" fill="#1a1a2e"/>
        <circle cx={ex1+3} cy={ey1} r="3.5" fill="white"/>
        <circle cx={ex2+3} cy={ey2} r="3.5" fill="white"/>
        <path d={`M${ex1-14},${ey1-18} L${ex1+14},${ey1-11}`} stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
        <path d={`M${ex2-14},${ey2-11} L${ex2+14},${ey2-18}`} stroke="#1a1a2e" strokeWidth="6" strokeLinecap="round"/>
      </>
    );
    case 'teary': return (
      <>
        <circle cx={ex1} cy={ey1} r="14" fill="white"/>
        <circle cx={ex2} cy={ey2} r="14" fill="white"/>
        <circle cx={ex1} cy={ey1+1} r="9.5" fill="#1a1a2e"/>
        <circle cx={ex2} cy={ey2+1} r="9.5" fill="#1a1a2e"/>
        <circle cx={ex1+4} cy={ey1-3} r="4" fill="white"/>
        <circle cx={ex2+4} cy={ey2-3} r="4" fill="white"/>
        <ellipse cx={ex1-2} cy={ey1+20} rx="5" ry="7" fill="#60a8ff" opacity="0.82"/>
        <line x1={ex1-2} y1={ey1+12} x2={ex1-2} y2={ey1+26} stroke="#60a8ff" strokeWidth="4.5" strokeLinecap="round" opacity="0.78"/>
        <ellipse cx={ex2-2} cy={ey2+20} rx="5" ry="7" fill="#60a8ff" opacity="0.82"/>
        <line x1={ex2-2} y1={ey2+12} x2={ex2-2} y2={ey2+26} stroke="#60a8ff" strokeWidth="4.5" strokeLinecap="round" opacity="0.78"/>
      </>
    );
    default: // round
      return (
        <>
          <circle cx={ex1} cy={ey1} r="14" fill="white"/>
          <circle cx={ex2} cy={ey2} r="14" fill="white"/>
          <circle cx={ex1} cy={ey1+1} r="9.5" fill="#1a1a2e"/>
          <circle cx={ex2} cy={ey2+1} r="9.5" fill="#1a1a2e"/>
          <circle cx={ex1+4} cy={ey1-3} r="4.5" fill="white"/>
          <circle cx={ex2+4} cy={ey2-3} r="4.5" fill="white"/>
          <circle cx={ex1-2} cy={ey1+4} r="2" fill="white"/>
          <circle cx={ex2-2} cy={ey2+4} r="2" fill="white"/>
        </>
      );
  }
}

function MouthLayer({ mouthId, animal }) {
  const my = animal === 'frog' ? 120 : animal === 'pig' ? 122 : 116;
  switch(mouthId) {
    case 'big': return (
      <>
        <path d={`M70,${my} Q100,${my+24} 130,${my}`} stroke="rgba(0,0,0,.5)" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d={`M76,${my+4} Q100,${my+18} 124,${my+4}`} fill="rgba(255,100,100,.6)"/>
        <ellipse cx="100" cy={my+13} rx="16" ry="8" fill="rgba(200,40,60,.45)"/>
      </>
    );
    case 'cat': return (
      <>
        <path d={`M88,${my+2} Q100,${my+8} 112,${my+2}`} stroke="rgba(0,0,0,.45)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d={`M88,${my+2} Q94,${my-4} 100,${my}`} stroke="rgba(0,0,0,.45)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d={`M112,${my+2} Q106,${my-4} 100,${my}`} stroke="rgba(0,0,0,.45)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </>
    );
    case 'tongue': return (
      <>
        <path d={`M80,${my} Q100,${my+16} 120,${my}`} stroke="rgba(0,0,0,.4)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="100" cy={my+14} rx="12" ry="9" fill="#ff8080" opacity="0.9"/>
        <line x1="100" y1={my+8} x2="100" y2={my+22} stroke="rgba(180,0,0,.35)" strokeWidth="2"/>
      </>
    );
    case 'sad': return (
      <path d={`M78,${my+12} Q100,${my} 122,${my+12}`} stroke="rgba(0,0,0,.45)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    );
    case 'oh': return (
      <ellipse cx="100" cy={my+8} rx="12" ry="14" fill="rgba(0,0,0,.55)"/>
    );
    case 'cool': return (
      <path d={`M82,${my+6} Q100,${my+14} 118,${my+6}`} stroke="rgba(0,0,0,.42)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
    );
    case 'tiny': return (
      <path d={`M94,${my+6} Q100,${my+12} 106,${my+6}`} stroke="rgba(0,0,0,.45)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    );
    default: // smile
      return (
        <path d={`M76,${my} Q100,${my+20} 124,${my}`} stroke="rgba(0,0,0,.45)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      );
  }
}

function FaceDetailsLayer({ animal, colorId }) {
  const bc = getBodyColor(colorId);
  const blushY = { bear:100, cat:100, bunny:100, fox:104, pig:110, dog:100,
    koala:96, panda:96, tiger:100, lion:106, hamster:104,
    frog:100, wolf:108, hamster:105 }[animal] || 100;

  const noseEl = (() => {
    if (['pig'].includes(animal)) return (
      <>
        <ellipse cx="100" cy="108" rx="22" ry="16" fill="rgba(255,155,175,.7)"/>
        <circle cx="91" cy="108" r="7" fill="rgba(0,0,0,.4)"/>
        <circle cx="109" cy="108" r="7" fill="rgba(0,0,0,.4)"/>
      </>
    );
    if (animal === 'frog') return (
      <>
        <circle cx="90" cy="96" r="6" fill="rgba(0,0,0,.38)"/>
        <circle cx="110" cy="96" r="6" fill="rgba(0,0,0,.38)"/>
      </>
    );
    return (
      <>
        <ellipse cx="100" cy="107" rx="10" ry="8" fill="rgba(0,0,0,.55)"/>
        <circle cx="95.5" cy="105.5" r="3" fill="rgba(255,255,255,.45)"/>
      </>
    );
  })();

  return (
    <>
      {/* 뺨 홍조 */}
      <ellipse cx="44" cy={blushY} rx="20" ry="13" fill="#ffb3c6" opacity="0.48"/>
      <ellipse cx="156" cy={blushY} rx="20" ry="13" fill="#ffb3c6" opacity="0.48"/>
      {/* 코 */}
      {noseEl}
      {/* 기본 눈썹 */}
      <path d="M53,74 Q72,67 90,74" stroke="rgba(0,0,0,.4)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M110,74 Q128,67 147,74" stroke="rgba(0,0,0,.4)" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </>
  );
}

function HeadwearLayer({ headwear, colorId }) {
  const c = COLORS.find(x => x.id === colorId);
  const hc = c?.hex || '#e74c3c';
  switch(headwear) {
    case 'cap': return (
      <>
        <path d="M36,58 Q38,14 100,12 Q162,14 164,58 Z" fill={hc}/>
        <rect x="34" y="52" width="132" height="14" rx="7" fill={hc}/>
        <ellipse cx="140" cy="52" rx="40" ry="9" fill={hc} opacity="0.82"/>
      </>
    );
    case 'crown': return (
      <>
        <rect x="37" y="54" width="126" height="14" rx="5" fill={hc}/>
        <path d="M37,54 L37,28 L67,44 L100,12 L133,44 L163,28 L163,54 Z" fill={hc}/>
        <circle cx="100" cy="12" r="10" fill="#e74c3c"/>
        <circle cx="67" cy="44" r="8" fill="#3498db"/>
        <circle cx="133" cy="44" r="8" fill="#2ecc71"/>
      </>
    );
    case 'bow': return (
      <>
        <path d="M50,44 L78,18 L100,42 L78,66 Z" fill={hc}/>
        <path d="M150,44 L122,18 L100,42 L122,66 Z" fill={hc}/>
        <circle cx="100" cy="42" r="16" fill="white"/>
        <circle cx="100" cy="42" r="10" fill={hc}/>
      </>
    );
    case 'headphone': return (
      <>
        <path d="M46,70 Q46,22 100,20 Q154,22 154,70" stroke="#333" strokeWidth="10" fill="none"/>
        <rect x="36" y="64" width="22" height="32" rx="10" fill="#333"/>
        <rect x="142" y="64" width="22" height="32" rx="10" fill="#333"/>
        <rect x="38" y="66" width="18" height="28" rx="8" fill={hc}/>
        <rect x="144" y="66" width="18" height="28" rx="8" fill={hc}/>
      </>
    );
    case 'witch': return (
      <>
        <ellipse cx="100" cy="64" rx="66" ry="14" fill={hc}/>
        <path d="M74,64 Q88,30 100,4 Q112,30 126,64 Z" fill={hc}/>
        <ellipse cx="100" cy="48" rx="14" ry="5" fill="rgba(130,0,200,.5)"/>
        <circle cx="100" cy="4" r="7" fill="#b040f0"/>
      </>
    );
    case 'catears': return (
      <>
        <rect x="34" y="58" width="132" height="12" rx="6" fill={hc}/>
        <path d="M46,58 L60,20 L80,58 Z" fill={hc}/>
        <path d="M120,58 L140,20 L154,58 Z" fill={hc}/>
        <path d="M50,56 L60,28 L76,56 Z" fill="rgba(255,200,220,.75)"/>
        <path d="M124,56 L140,28 L150,56 Z" fill="rgba(255,200,220,.75)"/>
      </>
    );
    case 'halo': return (
      <>
        <ellipse cx="100" cy="14" rx="48" ry="14" fill="none" stroke={hc} strokeWidth="10" opacity="0.88"/>
        <ellipse cx="100" cy="14" rx="48" ry="14" fill="none" stroke="rgba(255,255,200,.7)" strokeWidth="4"/>
        <line x1="82" y1="20" x2="80" y2="36" stroke={hc} strokeWidth="4" opacity="0.5"/>
        <line x1="118" y1="20" x2="120" y2="36" stroke={hc} strokeWidth="4" opacity="0.5"/>
      </>
    );
    default:
      return null;
  }
}

function OutfitLayer({ outfit, colorId }) {
  const c = COLORS.find(x => x.id === colorId);
  const oc = c?.hex || '#3498db';
  const bot = '#546e7a';
  switch(outfit) {
    case 'hoodie': return (
      <>
        <rect x="56" y="142" width="88" height="64" rx="22" fill={oc}/>
        <path d="M56,150 Q28,158 30,182 L56,172 Z" fill={oc}/>
        <path d="M144,150 Q172,158 170,182 L144,172 Z" fill={oc}/>
        <ellipse cx="100" cy="148" rx="24" ry="15" fill="rgba(0,0,0,.14)"/>
        <circle cx="100" cy="174" r="10" fill="rgba(0,0,0,.1)"/>
        <rect x="62" y="200" width="34" height="44" rx="14" fill={bot}/>
        <rect x="104" y="200" width="34" height="44" rx="14" fill={bot}/>
      </>
    );
    case 'overalls': return (
      <>
        <rect x="56" y="200" width="35" height="44" rx="13" fill={oc}/>
        <rect x="109" y="200" width="35" height="44" rx="13" fill={oc}/>
        <rect x="56" y="196" width="88" height="16" rx="8" fill={oc}/>
        <rect x="80" y="144" width="16" height="60" rx="8" fill={oc} opacity="0.75"/>
        <rect x="104" y="144" width="16" height="60" rx="8" fill={oc} opacity="0.75"/>
        <rect x="80" y="162" width="40" height="24" rx="8" fill={oc} opacity="0.65"/>
        <path d="M56,150 Q30,156 32,178 L56,168 Z" fill={oc} opacity="0.75"/>
        <path d="M144,150 Q170,156 168,178 L144,168 Z" fill={oc} opacity="0.75"/>
      </>
    );
    case 'explorer': return (
      <>
        <rect x="60" y="144" width="80" height="60" rx="16" fill={oc}/>
        <path d="M60,150 Q32,158 34,180 L60,170 Z" fill={oc}/>
        <path d="M140,150 Q168,158 166,180 L140,170 Z" fill={oc}/>
        <rect x="74" y="152" width="52" height="42" rx="6" fill="rgba(255,255,255,.18)"/>
        <line x1="100" y1="144" x2="100" y2="204" stroke="rgba(255,255,255,.4)" strokeWidth="3.5"/>
        <circle cx="100" cy="162" r="5" fill="rgba(255,255,255,.7)"/>
        <circle cx="100" cy="176" r="5" fill="rgba(255,255,255,.7)"/>
        <rect x="62" y="202" width="34" height="42" rx="13" fill={bot}/>
        <rect x="104" y="202" width="34" height="42" rx="13" fill={bot}/>
      </>
    );
    case 'sportwear': return (
      <>
        <rect x="56" y="142" width="88" height="62" rx="18" fill={oc}/>
        <path d="M56,148 Q30,156 32,178 L56,168 Z" fill={oc}/>
        <path d="M144,148 Q170,156 168,178 L144,168 Z" fill={oc}/>
        <line x1="68" y1="142" x2="68" y2="204" stroke="rgba(255,255,255,.35)" strokeWidth="7"/>
        <line x1="132" y1="142" x2="132" y2="204" stroke="rgba(255,255,255,.35)" strokeWidth="7"/>
        <rect x="62" y="202" width="34" height="42" rx="13" fill={bot}/>
        <rect x="104" y="202" width="34" height="42" rx="13" fill={bot}/>
      </>
    );
    case 'jumprope': return (
      <>
        <rect x="56" y="142" width="88" height="62" rx="18" fill={oc}/>
        <path d="M56,148 Q30,156 32,178 L56,168 Z" fill={oc}/>
        <path d="M144,148 Q170,156 168,178 L144,168 Z" fill={oc}/>
        <text x="100" y="180" textAnchor="middle" fontSize="18" fill="rgba(255,255,255,.8)">🪢</text>
        <rect x="68" y="143" width="64" height="8" rx="4" fill="rgba(255,255,255,.3)"/>
        <rect x="62" y="202" width="34" height="42" rx="13" fill={bot}/>
        <rect x="104" y="202" width="34" height="42" rx="13" fill={bot}/>
      </>
    );
    case 'cape': return (
      <>
        <rect x="62" y="142" width="76" height="60" rx="14" fill="#e74c3c"/>
        <path d="M56,142 L100,132 L144,142 L168,260 L100,236 L32,260 Z" fill={oc} opacity="0.92"/>
        <rect x="62" y="202" width="34" height="42" rx="13" fill={bot}/>
        <rect x="104" y="202" width="34" height="42" rx="13" fill={bot}/>
      </>
    );
    default: // tshirt
      return (
        <>
          <rect x="58" y="142" width="84" height="62" rx="18" fill={oc}/>
          <path d="M58,148 Q30,158 32,180 L58,170 Z" fill={oc}/>
          <path d="M142,148 Q170,158 168,180 L142,170 Z" fill={oc}/>
          <rect x="62" y="202" width="34" height="42" rx="13" fill={bot}/>
          <rect x="104" y="202" width="34" height="42" rx="13" fill={bot}/>
        </>
      );
  }
}

// ── 3. SVG 그라디언트 defs ────────────────────────────

function SvgDefs({ colorId, bgId }) {
  const c = COLORS.find(x => x.id === colorId);
  const bg = BACKGROUNDS.find(x => x.id === bgId) || BACKGROUNDS[0];
  const isGradBg = !bg.css.startsWith('#') && bg.css.includes('gradient');
  const bgColors = isGradBg
    ? (bg.css.match(/#[a-fA-F0-9]{6}/g) || ['#87ceeb','#bde0fe'])
    : ['#fff','#fff'];

  return (
    <defs>
      {c?.gradient && (
        <linearGradient id={`bodyGrad_${colorId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.gradient[0]}/>
          <stop offset="100%" stopColor={c.gradient[1]}/>
        </linearGradient>
      )}
      {isGradBg && (
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={bgColors[0]}/>
          <stop offset="100%" stopColor={bgColors[1] || bgColors[0]}/>
        </linearGradient>
      )}
    </defs>
  );
}

// ── 4. 아바타 프리뷰 ─────────────────────────────────

function AvatarPreview({ config }) {
  const { animal, color, eyes, mouth, headwear, outfit, background, outfitColor, headwearColor } = config;
  return (
    <svg
      width="200" height="220"
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.22))' }}
    >
      <SvgDefs colorId={color} bgId={background}/>
      {/* 레이어 1: 배경 */}
      <BackgroundLayer bgId={background}/>
      {/* 레이어 2: 의상 (몸통 뒤 망토 등) */}
      {outfit === 'cape' && <OutfitLayer outfit={outfit} colorId={outfitColor || color}/>}
      {/* 레이어 3: 몸통 + 귀 */}
      <BodyLayer animal={animal} colorId={color}/>
      {/* 레이어 4: 의상 (망토 제외) */}
      {outfit !== 'cape' && outfit !== 'none' && (
        <OutfitLayer outfit={outfit} colorId={outfitColor || color}/>
      )}
      {/* 레이어 5: 얼굴 디테일 (눈썹, 코, 홍조) */}
      <FaceDetailsLayer animal={animal} colorId={color}/>
      {/* 레이어 6: 눈 */}
      <EyesLayer eyeId={eyes}/>
      {/* 레이어 7: 입 */}
      <MouthLayer mouthId={mouth} animal={animal}/>
      {/* 레이어 8: 모자/헤어 */}
      {headwear !== 'none' && (
        <HeadwearLayer headwear={headwear} colorId={headwearColor || '#e74c3c'}/>
      )}
    </svg>
  );
}

// ── 5. 탭 정의 ───────────────────────────────────────

const TABS = [
  { id: 'base',   label: '🐾 베이스' },
  { id: 'face',   label: '😊 얼굴' },
  { id: 'outfit', label: '👕 의상' },
  { id: 'head',   label: '🎩 머리' },
  { id: 'bg',     label: '🌈 배경' },
];

// ── 6. 선택 그리드 컴포넌트 ──────────────────────────

function SelectGrid({ items, selected, onSelect, renderItem, cols = 4 }) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {items.map(item => {
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              relative p-2 rounded-xl border-2 transition-all duration-150 text-center cursor-pointer
              flex flex-col items-center gap-1
              ${isSelected
                ? 'border-yellow-400 bg-yellow-50 shadow-md scale-105'
                : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            {isSelected && (
              <span className="absolute top-0.5 right-0.5 text-yellow-400 text-xs font-bold">✓</span>
            )}
            {renderItem(item)}
          </button>
        );
      })}
    </div>
  );
}

function ColorDot({ color }) {
  const c = COLORS.find(x => x.id === color);
  if (!c) return null;
  const bg = c.gradient
    ? `linear-gradient(135deg, ${c.gradient[0]}, ${c.gradient[1]})`
    : c.hex;
  return (
    <span
      className="block w-7 h-7 rounded-full mx-auto border-2 border-white shadow"
      style={{ background: bg }}
    />
  );
}

// ── 7. 메인 컴포넌트 ─────────────────────────────────

const DEFAULT_CONFIG = {
  animal: 'bear',
  color: 'brown',
  eyes: 'round',
  mouth: 'smile',
  headwear: 'none',
  outfit: 'tshirt',
  background: 'sky',
  outfitColor: 'blue',
  headwearColor: 'red',
};

export default function AvatarCreator({ onSave }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('base');

  const set = (key) => (val) => setConfig(prev => ({ ...prev, [key]: val }));

  const renderTabContent = () => {
    switch(activeTab) {
      case 'base':
        return (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">🐾 동물 선택</p>
              <SelectGrid
                items={ANIMALS}
                selected={config.animal}
                onSelect={set('animal')}
                cols={4}
                renderItem={(a) => (
                  <>
                    <span className="text-2xl">{a.emoji}</span>
                    <span className="text-[0.6rem] font-bold text-slate-600">{a.name}</span>
                  </>
                )}
              />
            </div>
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">🎨 털/피부 색상</p>
              <div className="grid grid-cols-8 gap-2">
                {COLORS.map(c => {
                  const bg = c.gradient
                    ? `linear-gradient(135deg, ${c.gradient[0]}, ${c.gradient[1]})`
                    : c.hex;
                  return (
                    <button
                      key={c.id}
                      onClick={() => set('color')(c.id)}
                      title={c.label}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${config.color === c.id ? 'border-yellow-400 scale-110 shadow-lg' : 'border-white shadow'}`}
                      style={{ background: bg }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'face':
        return (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">👀 눈 모양</p>
              <SelectGrid
                items={EYES}
                selected={config.eyes}
                onSelect={set('eyes')}
                cols={2}
                renderItem={(e) => (
                  <span className="text-[0.7rem] font-bold text-slate-600">{e.label}</span>
                )}
              />
            </div>
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">👄 입/표정</p>
              <SelectGrid
                items={MOUTHS}
                selected={config.mouth}
                onSelect={set('mouth')}
                cols={2}
                renderItem={(m) => (
                  <span className="text-[0.7rem] font-bold text-slate-600">{m.label}</span>
                )}
              />
            </div>
          </div>
        );

      case 'outfit':
        return (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">👕 의상 선택</p>
              <SelectGrid
                items={OUTFITS}
                selected={config.outfit}
                onSelect={set('outfit')}
                cols={4}
                renderItem={(o) => (
                  <>
                    <span className="text-xl">{o.emoji}</span>
                    <span className="text-[0.58rem] font-bold text-slate-600 leading-tight text-center">{o.label}</span>
                  </>
                )}
              />
            </div>
            {config.outfit !== 'none' && (
              <div>
                <p className="text-xs font-black text-slate-700 mb-2">🎨 의상 색상</p>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.filter(c => !c.gradient).map(c => (
                    <button
                      key={c.id}
                      onClick={() => set('outfitColor')(c.id)}
                      title={c.label}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${config.outfitColor === c.id ? 'border-yellow-400 scale-110 shadow-lg' : 'border-white shadow'}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'head':
        return (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-black text-slate-700 mb-2">🎩 머리 액세서리</p>
              <SelectGrid
                items={HEADWEAR}
                selected={config.headwear}
                onSelect={set('headwear')}
                cols={4}
                renderItem={(h) => (
                  <>
                    <span className="text-xl">{h.emoji}</span>
                    <span className="text-[0.6rem] font-bold text-slate-600 leading-tight text-center">{h.label}</span>
                  </>
                )}
              />
            </div>
            {config.headwear !== 'none' && (
              <div>
                <p className="text-xs font-black text-slate-700 mb-2">🎨 액세서리 색상</p>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.filter(c => !c.gradient).map(c => (
                    <button
                      key={c.id}
                      onClick={() => set('headwearColor')(c.id)}
                      title={c.label}
                      className={`w-8 h-8 rounded-full border-4 transition-all ${config.headwearColor === c.id ? 'border-yellow-400 scale-110 shadow-lg' : 'border-white shadow'}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'bg':
        return (
          <div>
            <p className="text-xs font-black text-slate-700 mb-2">🌈 배경 선택</p>
            <SelectGrid
              items={BACKGROUNDS}
              selected={config.background}
              onSelect={set('background')}
              cols={4}
              renderItem={(b) => (
                <>
                  <span
                    className="block w-10 h-10 rounded-lg border border-slate-200 mx-auto mb-1"
                    style={{ background: b.css }}
                  />
                  <span className="text-[0.6rem] font-bold text-slate-600">{b.label}</span>
                </>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-5 text-center text-white">
          <h1 className="text-xl font-black" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
            나만의 캐릭터 만들기 🎨
          </h1>
          <p className="text-xs opacity-75 mt-1">원하는 옵션을 선택해 나만의 캐릭터를 꾸며보세요!</p>
        </div>

        <div className="flex flex-col md:flex-row">

          {/* 좌측: 프리뷰 + 저장 버튼 */}
          <div className="flex flex-col items-center justify-between p-6 md:w-56 flex-shrink-0 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white rounded-2xl p-3 shadow-lg border-4 border-yellow-300">
                <AvatarPreview config={config}/>
              </div>
              <p className="text-xs text-slate-400 font-medium">미리보기</p>
            </div>
            <div className="mt-4 w-full space-y-2">
              <button
                onClick={() => onSave?.(config)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 text-white text-sm font-black shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                ✅ 완성!
              </button>
              <button
                onClick={() => setConfig(DEFAULT_CONFIG)}
                className="w-full py-2 rounded-xl border border-slate-300 text-slate-500 text-xs font-bold hover:bg-slate-100 transition-all"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 우측: 탭 + 옵션 */}
          <div className="flex-1 flex flex-col min-h-0">

            {/* 탭 바 */}
            <div className="flex border-b border-slate-200 bg-white flex-shrink-0 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 py-3 px-2 text-xs font-black transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50'
                      : 'text-slate-400 hover:text-slate-600'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 옵션 패널 */}
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '420px' }}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
