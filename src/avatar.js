// ══════════════════════════════════════════
//  아바타 시스템 + 상점 + 프로필
// ══════════════════════════════════════════
import { S, lsKey } from './state.js';
import { getLang } from './i18n.js';

export const ANIMAL_TYPES=[
  // 기본 동물
  {id:'bear',     name:'곰돌이',  en:'Bear',    emoji:'🐻'},
  {id:'cat',      name:'야옹이',  en:'Cat',     emoji:'🐱'},
  {id:'bunny',    name:'토끼',    en:'Bunny',   emoji:'🐰'},
  {id:'fox',      name:'여우',    en:'Fox',     emoji:'🦊'},
  {id:'pig',      name:'꿀꿀이',  en:'Pig',     emoji:'🐷'},
  {id:'dog',      name:'강아지',  en:'Dog',     emoji:'🐶'},
  {id:'koala',    name:'코알라',  en:'Koala',   emoji:'🐨'},
  {id:'panda',    name:'판다',    en:'Panda',   emoji:'🐼'},
  // 추가 동물
  {id:'lion',     name:'사자',    en:'Lion',    emoji:'🦁'},
  {id:'tiger',    name:'호랑이',  en:'Tiger',   emoji:'🐯'},
  {id:'hamster',  name:'햄스터',  en:'Hamster', emoji:'🐹'},
  {id:'frog',     name:'개구리',  en:'Frog',    emoji:'🐸'},
  {id:'duck',     name:'오리',    en:'Duck',    emoji:'🐥'},
  {id:'dragon',   name:'드래곤',  en:'Dragon',  emoji:'🐲'},
  {id:'wolf',     name:'늑대',    en:'Wolf',    emoji:'🐺'},
  {id:'chick',    name:'병아리',  en:'Chick',   emoji:'🐣'},
];
export const BODY_COLORS=[
  {id:'brown',    c:'#c07844',l:'갈색',  lEn:'Brown'},
  {id:'beige',    c:'#e0c080',l:'베이지',lEn:'Beige'},
  {id:'gray',     c:'#909098',l:'회색',  lEn:'Grey'},
  {id:'white',    c:'#f0ece4',l:'흰색',  lEn:'White'},
  {id:'orange',   c:'#e07030',l:'주황',  lEn:'Orange'},
  {id:'pink',     c:'#e890a0',l:'핑크',  lEn:'Pink'},
  {id:'blue',     c:'#6090d8',l:'파랑',  lEn:'Blue'},
  {id:'mint',     c:'#60b890',l:'민트',  lEn:'Mint'},
  {id:'purple',   c:'#9060c0',l:'보라',  lEn:'Purple'},
  {id:'yellow',   c:'#d8b030',l:'노랑',  lEn:'Yellow'},
  {id:'black',    c:'#404048',l:'검정',  lEn:'Black'},
  {id:'red',      c:'#c85050',l:'빨강',  lEn:'Red'},
  {id:'lime',     c:'#78c050',l:'라임',  lEn:'Lime'},
  {id:'sky',      c:'#50c4e8',l:'하늘',  lEn:'Sky'},
  {id:'teal',     c:'#30a898',l:'청록',  lEn:'Teal'},
  {id:'lavender', c:'#a890d0',l:'라벤더',lEn:'Lavender'},
];
export const EYE_TYPES=[
  {id:'round',    l:'동그란 눈 ⚫',lEn:'Round ⚫'},
  {id:'sparkle',  l:'반짝이 눈 ✨',lEn:'Sparkle ✨'},
  {id:'sleepy',   l:'졸린 눈 😪',  lEn:'Sleepy 😪'},
  {id:'wink',     l:'윙크 눈 😉',  lEn:'Wink 😉'},
  {id:'star',     l:'별빛 눈 ⭐',  lEn:'Star ⭐'},
  {id:'heart',    l:'하트 눈 💖',  lEn:'Heart 💖'},
  {id:'angry',    l:'화난 눈 😠',  lEn:'Angry 😠'},
  {id:'cool',     l:'쿨한 눈 😎',  lEn:'Cool 😎'},
  {id:'teary',    l:'눈물 눈 😢',  lEn:'Teary 😢'},
  {id:'surprised',l:'놀란 눈 😲',  lEn:'Surprised 😲'},
];
export const MOUTH_TYPES=[
  {id:'smile',   l:'웃는 입 😊', lEn:'Smile 😊'},
  {id:'big',     l:'활짝 웃음 😄',lEn:'Grin 😄'},
  {id:'cat',     l:'고양이 입 w', lEn:'Cat w'},
  {id:'tongue',  l:'메롱 😛',    lEn:'Tongue 😛'},
  {id:'sad',     l:'슬픈 입 😢', lEn:'Sad 😢'},
  {id:'oh',      l:'놀란 입 😮', lEn:'Oh 😮'},
  {id:'tiny',    l:'작은 입 🙂', lEn:'Tiny 🙂'},
  {id:'cool',    l:'쿨 표정 😏', lEn:'Cool 😏'},
];
export const BG_TYPES=[
  {id:'none',    l:'없음',     lEn:'None',       c1:'#f8faff', c2:'#f0f5ff'},
  {id:'sky',     l:'하늘 ☁️',  lEn:'Sky ☁️',     c1:'#b8e4ff', c2:'#e8f4ff'},
  {id:'sunset',  l:'노을 🌅',  lEn:'Sunset 🌅',  c1:'#ffd580', c2:'#ff8a65'},
  {id:'mint',    l:'민트 🌿',  lEn:'Mint 🌿',    c1:'#b2f5ea', c2:'#e6fffa'},
  {id:'galaxy',  l:'우주 🌌',  lEn:'Galaxy 🌌',  c1:'#1a1a4e', c2:'#4a1060'},
  {id:'field',   l:'잔디밭 ⛳', lEn:'Field ⛳',   c1:'#87ceeb', c2:'#90d16e'},
  {id:'pink',    l:'핑크 🌸',  lEn:'Pink 🌸',    c1:'#fce4ec', c2:'#f8bbd0'},
  {id:'rainbow', l:'무지개 🌈', lEn:'Rainbow 🌈',c1:'#ffb3ba', c2:'#baffc9'},
];
export const SHOP_ITEMS=[
  // ── 모자 (50) ──
  {id:'hat_cap',       name:'야구 모자',        en:'Baseball Cap',     cat:'hat', price:15, color:'#2980b9', emoji:'🧢'},
  {id:'hat_crown',     name:'왕관',             en:'Crown',            cat:'hat', price:50, color:'#f1c40f', emoji:'👑'},
  {id:'hat_bow',       name:'리본 머리띠',      en:'Ribbon Headband',  cat:'hat', price:20, color:'#e91e63', emoji:'🎀'},
  {id:'hat_beanie',    name:'비니 모자',        en:'Beanie',           cat:'hat', price:15, color:'#1a1a2e', emoji:'🎩'},
  {id:'hat_witch',     name:'마법사 모자',      en:'Wizard Hat',       cat:'hat', price:40, color:'#6c3483', emoji:'🪄'},
  {id:'hat_flower',    name:'꽃 머리핀',        en:'Flower Pin',       cat:'hat', price:12, color:'#e91e63', emoji:'🌸'},
  {id:'hat_party',     name:'파티 모자',        en:'Party Hat',        cat:'hat', price:20, color:'#f39c12', emoji:'🎉'},
  {id:'hat_halo',      name:'천사 후광',        en:'Angel Halo',       cat:'hat', price:40, color:'#f1c40f', emoji:'👼'},
  {id:'hat_helmet',    name:'스포츠 헬멧',      en:'Sports Helmet',    cat:'hat', price:35, color:'#e74c3c', emoji:'⛑️'},
  {id:'hat_catears',   name:'고양이 귀 머리띠', en:'Cat Ear Band',     cat:'hat', price:20, color:'#e91e63', emoji:'🐱'},
  {id:'hat_tophat',    name:'탑햇',             en:'Top Hat',          cat:'hat', price:45, color:'#1a1a2e', emoji:'🎩'},
  {id:'hat_beret',     name:'베레모',           en:'Beret',            cat:'hat', price:18, color:'#c0392b', emoji:'🟥'},
  {id:'hat_cowboy',    name:'카우보이 모자',    en:'Cowboy Hat',       cat:'hat', price:30, color:'#a0522d', emoji:'🤠'},
  {id:'hat_pirate',    name:'해적 삼각모',      en:'Pirate Hat',       cat:'hat', price:35, color:'#2c3e50', emoji:'🏴‍☠️'},
  {id:'hat_chef',      name:'요리사 모자',      en:'Chef Hat',         cat:'hat', price:22, color:'#ffffff', emoji:'👨‍🍳'},
  {id:'hat_santa',     name:'산타 모자',        en:'Santa Hat',        cat:'hat', price:25, color:'#c0392b', emoji:'🎅'},
  {id:'hat_graduation',name:'학사모',           en:'Graduation Cap',   cat:'hat', price:40, color:'#1a1a2e', emoji:'🎓'},
  {id:'hat_headband',  name:'운동 머리띠',      en:'Sports Headband',  cat:'hat', price:10, color:'#e74c3c', emoji:'🎽'},
  {id:'hat_tiara',     name:'티아라',           en:'Tiara',            cat:'hat', price:55, color:'#f1c40f', emoji:'💍'},
  {id:'hat_antler',    name:'사슴 뿔',          en:'Reindeer Antlers', cat:'hat', price:28, color:'#8b4513', emoji:'🦌'},
  {id:'hat_bunnyears', name:'토끼귀 머리띠',    en:'Bunny Ear Band',   cat:'hat', price:15, color:'#f8c8d4', emoji:'🐰'},
  {id:'hat_devil',     name:'악마 뿔',          en:'Devil Horns',      cat:'hat', price:30, color:'#8e44ad', emoji:'😈'},
  {id:'hat_mushroom',  name:'버섯 모자',        en:'Mushroom Hat',     cat:'hat', price:20, color:'#e74c3c', emoji:'🍄'},
  {id:'hat_propeller', name:'프로펠러 모자',    en:'Propeller Hat',    cat:'hat', price:18, color:'#3498db', emoji:'🌀'},
  {id:'hat_straw',     name:'밀짚 모자',        en:'Straw Hat',        cat:'hat', price:15, color:'#d4a820', emoji:'👒'},
  {id:'hat_warrior',   name:'전사 투구',        en:'Warrior Helmet',   cat:'hat', price:50, color:'#7f8c8d', emoji:'⚔️'},
  {id:'hat_astronaut', name:'우주비행사 헬멧',  en:'Astronaut Helmet', cat:'hat', price:65, color:'#ecf0f1', emoji:'🚀'},
  {id:'hat_diamond_crown',name:'다이아 왕관',   en:'Diamond Crown',    cat:'hat', price:80, color:'#5dade2', emoji:'💎'},
  {id:'hat_flower_crown', name:'꽃 화환',       en:'Flower Crown',     cat:'hat', price:22, color:'#e91e63', emoji:'🌺'},
  {id:'hat_fox_ears',  name:'여우귀 머리띠',    en:'Fox Ear Band',     cat:'hat', price:20, color:'#e67e22', emoji:'🦊'},
  {id:'hat_bear_ears', name:'곰귀 머리띠',      en:'Bear Ear Band',    cat:'hat', price:18, color:'#a0522d', emoji:'🐻'},
  {id:'hat_ushanka',   name:'러시아 모자',      en:'Ushanka',          cat:'hat', price:28, color:'#8b4513', emoji:'🎿'},
  {id:'hat_hardhat',   name:'공사장 헬멧',      en:'Hard Hat',         cat:'hat', price:20, color:'#f39c12', emoji:'⛏️'},
  {id:'hat_ninja',     name:'닌자 두건',        en:'Ninja Hood',       cat:'hat', price:35, color:'#2c3e50', emoji:'🥷'},
  {id:'hat_laurel',    name:'월계관',           en:'Laurel Wreath',    cat:'hat', price:45, color:'#27ae60', emoji:'🌿'},
  {id:'hat_captain',   name:'선장 모자',        en:'Captain Hat',      cat:'hat', price:38, color:'#1a3560', emoji:'⚓'},
  {id:'hat_turban',    name:'터번',             en:'Turban',           cat:'hat', price:25, color:'#2980b9', emoji:'🧕'},
  {id:'hat_headphone', name:'헤드폰',           en:'Headphones',       cat:'hat', price:40, color:'#2c3e50', emoji:'🎧'},
  {id:'hat_ear_muffs', name:'귀마개',           en:'Ear Muffs',        cat:'hat', price:15, color:'#e91e63', emoji:'🎀'},
  {id:'hat_sailor',    name:'선원 모자',        en:'Sailor Hat',       cat:'hat', price:22, color:'#1a3560', emoji:'⚓'},
  {id:'hat_horns',     name:'용 뿔',            en:'Dragon Horns',     cat:'hat', price:35, color:'#27ae60', emoji:'🐲'},
  {id:'hat_ice_crown', name:'얼음 왕관',        en:'Ice Crown',        cat:'hat', price:60, color:'#5dade2', emoji:'❄️'},
  {id:'hat_star_band', name:'별 머리띠',        en:'Star Headband',    cat:'hat', price:18, color:'#f1c40f', emoji:'⭐'},
  {id:'hat_pumpkin',   name:'호박 모자',        en:'Pumpkin Hat',      cat:'hat', price:25, color:'#e67e22', emoji:'🎃'},
  {id:'hat_bandana',   name:'반다나',           en:'Bandana',          cat:'hat', price:12, color:'#e74c3c', emoji:'🔴'},
  {id:'hat_music_note',name:'음표 머리핀',      en:'Music Note Pin',   cat:'hat', price:15, color:'#2c3e50', emoji:'🎵'},
  {id:'hat_rainbow_bow',name:'무지개 리본',     en:'Rainbow Ribbon',   cat:'hat', price:22, color:'#e91e63', emoji:'🌈'},
  {id:'hat_bubble',    name:'방울 모자',        en:'Bubble Hat',       cat:'hat', price:20, color:'#85c1e9', emoji:'🫧'},
  {id:'hat_lion_mane', name:'사자 갈기 모자',   en:'Lion Mane Hat',    cat:'hat', price:42, color:'#f39c12', emoji:'🦁'},
  {id:'hat_sunhat',    name:'썬 햇',            en:'Sun Hat',          cat:'hat', price:18, color:'#f8c471', emoji:'☀️'},
  // ── 상의 (35) ──
  {id:'top_tshirt',    name:'줄넘기 티셔츠',    en:'Jump Rope Tee',      cat:'top', price:20, color:'#3498db', emoji:'👕'},
  {id:'top_jacket',    name:'스포츠 재킷',      en:'Sports Jacket',      cat:'top', price:35, color:'#a07040', emoji:'🧥'},
  {id:'top_cape',      name:'영웅 망토',        en:'Hero Cape',          cat:'top', price:50, color:'#8e44ad', emoji:'🦸'},
  {id:'top_hoodie',    name:'후드티',           en:'Hoodie',             cat:'top', price:28, color:'#e67e22', emoji:'🧡'},
  {id:'top_suit',      name:'정장',             en:'Suit',               cat:'top', price:60, color:'#1a3560', emoji:'👔'},
  {id:'top_tanktop',   name:'민소매',           en:'Tank Top',           cat:'top', price:15, color:'#e74c3c', emoji:'🎽'},
  {id:'top_sportswear',name:'스포츠 유니폼',    en:'Sports Uniform',     cat:'top', price:35, color:'#1abc9c', emoji:'🏅'},
  {id:'top_vest',      name:'조끼',             en:'Vest',               cat:'top', price:22, color:'#f39c12', emoji:'🦺'},
  {id:'top_sailor',    name:'선원복',           en:'Sailor Uniform',     cat:'top', price:30, color:'#1a3560', emoji:'⚓'},
  {id:'top_sweater',   name:'스웨터',           en:'Sweater',            cat:'top', price:28, color:'#e74c3c', emoji:'🧶'},
  {id:'top_armor',     name:'갑옷',             en:'Armour',             cat:'top', price:55, color:'#7f8c8d', emoji:'⚔️'},
  {id:'top_tracksuit', name:'트랙수트',         en:'Tracksuit',          cat:'top', price:30, color:'#e74c3c', emoji:'🏃'},
  {id:'top_jersey',    name:'저지',             en:'Jersey',             cat:'top', price:25, color:'#3498db', emoji:'🏆'},
  {id:'top_blazer',    name:'블레이저',         en:'Blazer',             cat:'top', price:40, color:'#2c3e50', emoji:'👔'},
  {id:'top_apron',     name:'앞치마',           en:'Apron',              cat:'top', price:18, color:'#ecf0f1', emoji:'👨‍🍳'},
  {id:'top_lab',       name:'실험복',           en:'Lab Coat',           cat:'top', price:25, color:'#ecf0f1', emoji:'🔬'},
  {id:'top_ninja',     name:'닌자복',           en:'Ninja Outfit',       cat:'top', price:40, color:'#2c3e50', emoji:'🥷'},
  {id:'top_wizard',    name:'마법사 로브',      en:'Wizard Robe',        cat:'top', price:50, color:'#6c3483', emoji:'🪄'},
  {id:'top_superhero', name:'슈퍼히어로',       en:'Superhero Suit',     cat:'top', price:55, color:'#e74c3c', emoji:'🦸'},
  {id:'top_pirate',    name:'해적 셔츠',        en:'Pirate Shirt',       cat:'top', price:32, color:'#2c3e50', emoji:'🏴‍☠️'},
  {id:'top_punk',      name:'펑크 재킷',        en:'Punk Jacket',        cat:'top', price:38, color:'#2c3e50', emoji:'🎸'},
  {id:'top_tropical',  name:'트로피컬 셔츠',    en:'Tropical Shirt',     cat:'top', price:20, color:'#e74c3c', emoji:'🌺'},
  {id:'top_longsleeve',name:'긴팔 티',          en:'Long Sleeve Tee',    cat:'top', price:18, color:'#5dade2', emoji:'👕'},
  {id:'top_santa',     name:'산타복 상의',      en:'Santa Top',          cat:'top', price:30, color:'#c0392b', emoji:'🎅'},
  {id:'top_iceking',   name:'얼음 왕 갑옷',     en:'Ice King Armour',    cat:'top', price:70, color:'#5dade2', emoji:'❄️'},
  {id:'top_rainbow',   name:'무지개 상의',      en:'Rainbow Top',        cat:'top', price:35, color:'#e91e63', emoji:'🌈'},
  {id:'top_polo',      name:'폴로 셔츠',        en:'Polo Shirt',         cat:'top', price:22, color:'#27ae60', emoji:'🎽'},
  {id:'top_striped',   name:'줄무늬 상의',      en:'Striped Top',        cat:'top', price:20, color:'#e74c3c', emoji:'👕'},
  {id:'top_basketball',name:'농구 유니폼',      en:'Basketball Uniform', cat:'top', price:28, color:'#e67e22', emoji:'🏀'},
  {id:'top_baseball',  name:'야구 유니폼',      en:'Baseball Uniform',   cat:'top', price:28, color:'#1a3560', emoji:'⚾'},
  {id:'top_denim',     name:'데님 재킷',        en:'Denim Jacket',       cat:'top', price:35, color:'#2471a3', emoji:'🧥'},
  {id:'top_windbreaker',name:'바람막이',        en:'Windbreaker',        cat:'top', price:30, color:'#3498db', emoji:'🌬️'},
  {id:'top_school',    name:'교복 상의',        en:'School Top',         cat:'top', price:25, color:'#1a3560', emoji:'🏫'},
  {id:'top_floral',    name:'꽃무늬 블라우스',  en:'Floral Blouse',      cat:'top', price:22, color:'#e91e63', emoji:'🌸'},
  {id:'top_dragon',    name:'드래곤 갑옷',      en:'Dragon Armour',      cat:'top', price:75, color:'#27ae60', emoji:'🐲'},
  // ── 하의 (35) ──
  {id:'bot_shorts',    name:'운동 반바지',       en:'Athletic Shorts',    cat:'bottom', price:15, color:'#c8a87a', emoji:'🩳'},
  {id:'bot_pants',     name:'트레이닝 바지',     en:'Training Pants',     cat:'bottom', price:20, color:'#34495e', emoji:'👖'},
  {id:'bot_skirt',     name:'스포츠 치마',       en:'Sports Skirt',       cat:'bottom', price:25, color:'#e91e63', emoji:'👗'},
  {id:'bot_overalls',  name:'멜빵 바지',         en:'Overalls',           cat:'bottom', price:30, color:'#3498db', emoji:'🩱'},
  {id:'bot_jeans',     name:'청바지',            en:'Jeans',              cat:'bottom', price:22, color:'#2471a3', emoji:'👖'},
  {id:'bot_leggings',  name:'레깅스',            en:'Leggings',           cat:'bottom', price:18, color:'#8e44ad', emoji:'🩲'},
  {id:'bot_bloomers',  name:'블루머 반바지',      en:'Bloomers',           cat:'bottom', price:15, color:'#c8a87a', emoji:'🩳'},
  {id:'bot_trackpants',name:'트랙 바지',         en:'Track Pants',        cat:'bottom', price:20, color:'#e74c3c', emoji:'🏃'},
  {id:'bot_joggers',   name:'조거 팬츠',         en:'Joggers',            cat:'bottom', price:22, color:'#2c3e50', emoji:'👖'},
  {id:'bot_miniskirt', name:'미니 스커트',       en:'Mini Skirt',         cat:'bottom', price:20, color:'#e91e63', emoji:'👗'},
  {id:'bot_tutu',      name:'튜튜 치마',         en:'Tutu Skirt',         cat:'bottom', price:30, color:'#f8c8d4', emoji:'🩰'},
  {id:'bot_sweatpants',name:'스웨트 팬츠',       en:'Sweatpants',         cat:'bottom', price:18, color:'#7f8c8d', emoji:'👖'},
  {id:'bot_cargo',     name:'카고 바지',         en:'Cargo Pants',        cat:'bottom', price:28, color:'#5d6d7e', emoji:'🪖'},
  {id:'bot_tights',    name:'타이츠',            en:'Tights',             cat:'bottom', price:15, color:'#1a1a2e', emoji:'🩲'},
  {id:'bot_yoga',      name:'요가 바지',         en:'Yoga Pants',         cat:'bottom', price:20, color:'#8e44ad', emoji:'🧘'},
  {id:'bot_swim',      name:'수영복 하의',       en:'Swim Bottoms',       cat:'bottom', price:18, color:'#3498db', emoji:'🩱'},
  {id:'bot_basketball',name:'농구 반바지',       en:'Basketball Shorts',  cat:'bottom', price:20, color:'#e67e22', emoji:'🏀'},
  {id:'bot_soccer',    name:'축구 반바지',       en:'Football Shorts',    cat:'bottom', price:18, color:'#27ae60', emoji:'⚽'},
  {id:'bot_pleated',   name:'주름 치마',         en:'Pleated Skirt',      cat:'bottom', price:25, color:'#9b59b6', emoji:'👗'},
  {id:'bot_bell',      name:'나팔 바지',         en:'Flared Pants',       cat:'bottom', price:22, color:'#2980b9', emoji:'👖'},
  {id:'bot_capri',     name:'카프리 바지',       en:'Capri Pants',        cat:'bottom', price:20, color:'#3498db', emoji:'👖'},
  {id:'bot_board',     name:'보드 반바지',       en:'Board Shorts',       cat:'bottom', price:18, color:'#e67e22', emoji:'🏄'},
  {id:'bot_compression',name:'압축 타이츠',      en:'Compression Tights', cat:'bottom', price:22, color:'#2c3e50', emoji:'🩲'},
  {id:'bot_bubble',    name:'버블 스커트',       en:'Bubble Skirt',       cat:'bottom', price:28, color:'#e91e63', emoji:'🫧'},
  {id:'bot_rainbow',   name:'무지개 치마',       en:'Rainbow Skirt',      cat:'bottom', price:30, color:'#e91e63', emoji:'🌈'},
  {id:'bot_striped',   name:'줄무늬 바지',       en:'Striped Pants',      cat:'bottom', price:18, color:'#e74c3c', emoji:'👖'},
  {id:'bot_culottes',  name:'컬로트',            en:'Culottes',           cat:'bottom', price:22, color:'#9b59b6', emoji:'👗'},
  {id:'bot_wrap',      name:'랩 스커트',         en:'Wrap Skirt',         cat:'bottom', price:20, color:'#e67e22', emoji:'👗'},
  {id:'bot_school',    name:'교복 하의',         en:'School Bottom',      cat:'bottom', price:22, color:'#2c3e50', emoji:'🏫'},
  {id:'bot_ninja',     name:'닌자 하의',         en:'Ninja Bottoms',      cat:'bottom', price:30, color:'#2c3e50', emoji:'🥷'},
  {id:'bot_armor',     name:'갑옷 하의',         en:'Armour Bottoms',     cat:'bottom', price:45, color:'#7f8c8d', emoji:'⚔️'},
  {id:'bot_santa',     name:'산타복 하의',       en:'Santa Bottoms',      cat:'bottom', price:25, color:'#c0392b', emoji:'🎅'},
  {id:'bot_dragon',    name:'드래곤 하의',       en:'Dragon Bottoms',     cat:'bottom', price:55, color:'#27ae60', emoji:'🐲'},
  {id:'bot_iceking',   name:'얼음 왕 하의',      en:'Ice King Bottoms',   cat:'bottom', price:60, color:'#5dade2', emoji:'❄️'},
  {id:'bot_pleated2',  name:'체크 치마',         en:'Plaid Skirt',        cat:'bottom', price:25, color:'#c0392b', emoji:'🏫'},
  // ── 악세서리 (55) ──
  {id:'acc_glasses',   name:'멋진 선글라스',     en:'Cool Sunglasses',  cat:'acc', price:15, color:'#2c3e50', emoji:'🕶️'},
  {id:'acc_medal',     name:'금메달',            en:'Gold Medal',       cat:'acc', price:30, color:'#f39c12', emoji:'🏅'},
  {id:'acc_wings',     name:'천사 날개',         en:'Angel Wings',      cat:'acc', price:60, color:'#95a5a6', emoji:'🪽'},
  {id:'acc_rope',      name:'점프 로프',         en:'Jump Rope',        cat:'acc', price:10, color:'#e67e22', emoji:'🪢'},
  {id:'acc_star',      name:'별 지팡이',         en:'Star Wand',        cat:'acc', price:40, color:'#f1c40f', emoji:'⭐'},
  {id:'acc_balloon',   name:'풍선',              en:'Balloon',          cat:'acc', price:15, color:'#e74c3c', emoji:'🎈'},
  {id:'acc_candy',     name:'사탕',              en:'Candy',            cat:'acc', price:8,  color:'#e91e63', emoji:'🍬'},
  {id:'acc_scarf',     name:'목도리',            en:'Scarf',            cat:'acc', price:20, color:'#e74c3c', emoji:'🧣'},
  {id:'acc_trophy',    name:'트로피',            en:'Trophy',           cat:'acc', price:50, color:'#f1c40f', emoji:'🏆'},
  {id:'acc_lightning', name:'번개 에너지',       en:'Lightning',        cat:'acc', price:15, color:'#f1c40f', emoji:'⚡'},
  {id:'acc_fire',      name:'불꽃 오라',         en:'Flame Aura',       cat:'acc', price:30, color:'#ff5500', emoji:'🔥'},
  {id:'acc_bow_tie',   name:'나비 넥타이',       en:'Bow Tie',          cat:'acc', price:12, color:'#e74c3c', emoji:'🎀'},
  {id:'acc_necklace',  name:'목걸이',            en:'Necklace',         cat:'acc', price:20, color:'#f1c40f', emoji:'📿'},
  {id:'acc_backpack',  name:'배낭',              en:'Backpack',         cat:'acc', price:25, color:'#3498db', emoji:'🎒'},
  {id:'acc_umbrella',  name:'우산',              en:'Umbrella',         cat:'acc', price:18, color:'#2980b9', emoji:'☂️'},
  {id:'acc_book',      name:'책',                en:'Book',             cat:'acc', price:15, color:'#27ae60', emoji:'📚'},
  {id:'acc_guitar',    name:'기타',              en:'Guitar',           cat:'acc', price:45, color:'#8b4513', emoji:'🎸'},
  {id:'acc_sword',     name:'검',                en:'Sword',            cat:'acc', price:50, color:'#7f8c8d', emoji:'⚔️'},
  {id:'acc_shield',    name:'방패',              en:'Shield',           cat:'acc', price:40, color:'#2980b9', emoji:'🛡️'},
  {id:'acc_wand',      name:'마법 지팡이',       en:'Magic Wand',       cat:'acc', price:35, color:'#8e44ad', emoji:'🪄'},
  {id:'acc_microphone',name:'마이크',            en:'Microphone',       cat:'acc', price:30, color:'#2c3e50', emoji:'🎤'},
  {id:'acc_heart_glasses',name:'하트 선글라스',  en:'Heart Glasses',    cat:'acc', price:18, color:'#e91e63', emoji:'🩷'},
  {id:'acc_lantern',   name:'랜턴',              en:'Lantern',          cat:'acc', price:22, color:'#e74c3c', emoji:'🏮'},
  {id:'acc_gem',       name:'보석',              en:'Gem',              cat:'acc', price:35, color:'#5dade2', emoji:'💎'},
  {id:'acc_clover',    name:'네잎 클로버',       en:'Four-Leaf Clover', cat:'acc', price:12, color:'#27ae60', emoji:'🍀'},
  {id:'acc_music_note',name:'음표',              en:'Music Note',       cat:'acc', price:10, color:'#1a1a2e', emoji:'🎵'},
  {id:'acc_heart_balloon',name:'하트 풍선',      en:'Heart Balloon',    cat:'acc', price:20, color:'#e91e63', emoji:'🩷'},
  {id:'acc_ice_cream', name:'아이스크림',        en:'Ice Cream',        cat:'acc', price:12, color:'#f8c8d4', emoji:'🍦'},
  {id:'acc_donut',     name:'도넛',              en:'Donut',            cat:'acc', price:10, color:'#f39c12', emoji:'🍩'},
  {id:'acc_sunflower', name:'해바라기',          en:'Sunflower',        cat:'acc', price:15, color:'#f1c40f', emoji:'🌻'},
  {id:'acc_butterfly', name:'나비',              en:'Butterfly',        cat:'acc', price:20, color:'#e91e63', emoji:'🦋'},
  {id:'acc_snowflake', name:'눈꽃',              en:'Snowflake',        cat:'acc', price:18, color:'#5dade2', emoji:'❄️'},
  {id:'acc_soccer_ball',name:'축구공',           en:'Soccer Ball',      cat:'acc', price:15, color:'#1a1a2e', emoji:'⚽'},
  {id:'acc_basketball_ball',name:'농구공',       en:'Basketball',       cat:'acc', price:15, color:'#e67e22', emoji:'🏀'},
  {id:'acc_skateboard',name:'스케이트보드',      en:'Skateboard',       cat:'acc', price:35, color:'#e74c3c', emoji:'🛹'},
  {id:'acc_diamond',   name:'다이아몬드',        en:'Diamond',          cat:'acc', price:80, color:'#5dade2', emoji:'💎'},
  {id:'acc_coin_bag',  name:'코인 주머니',       en:'Coin Bag',         cat:'acc', price:20, color:'#f1c40f', emoji:'💰'},
  {id:'acc_potion',    name:'물약',              en:'Potion',           cat:'acc', price:25, color:'#9b59b6', emoji:'🧪'},
  {id:'acc_scroll',    name:'두루마리',          en:'Scroll',           cat:'acc', price:22, color:'#f39c12', emoji:'📜'},
  {id:'acc_leaf',      name:'나뭇잎 부채',       en:'Leaf Fan',         cat:'acc', price:12, color:'#27ae60', emoji:'🍃'},
  {id:'acc_rainbow',   name:'무지개',            en:'Rainbow',          cat:'acc', price:30, color:'#e91e63', emoji:'🌈'},
  {id:'acc_camera',    name:'카메라',            en:'Camera',           cat:'acc', price:25, color:'#2c3e50', emoji:'📸'},
  {id:'acc_pizza',     name:'피자 조각',         en:'Pizza Slice',      cat:'acc', price:10, color:'#e67e22', emoji:'🍕'},
  {id:'acc_apple',     name:'사과',              en:'Apple',            cat:'acc', price:8,  color:'#e74c3c', emoji:'🍎'},
  {id:'acc_mushroom',  name:'버섯',              en:'Mushroom',         cat:'acc', price:12, color:'#e74c3c', emoji:'🍄'},
  {id:'acc_cloud',     name:'구름',              en:'Cloud',            cat:'acc', price:15, color:'#85c1e9', emoji:'☁️'},
  {id:'acc_flower_bouquet',name:'꽃다발',        en:'Flower Bouquet',   cat:'acc', price:20, color:'#e91e63', emoji:'💐'},
  {id:'acc_devil_tail',name:'악마 꼬리',         en:'Devil Tail',       cat:'acc', price:28, color:'#8e44ad', emoji:'😈'},
  {id:'acc_monocle',   name:'모노클',            en:'Monocle',          cat:'acc', price:22, color:'#f1c40f', emoji:'🔍'},
  {id:'acc_crown_acc', name:'미니 왕관 악세서리',en:'Mini Crown',       cat:'acc', price:35, color:'#f1c40f', emoji:'👑'},
  {id:'acc_bow_arrow', name:'활과 화살',         en:'Bow & Arrow',      cat:'acc', price:40, color:'#8b4513', emoji:'🏹'},
  {id:'acc_heart_wand',name:'하트 지팡이',       en:'Heart Wand',       cat:'acc', price:30, color:'#e91e63', emoji:'💖'},
  {id:'acc_gamepad',   name:'게임 컨트롤러',     en:'Game Controller',  cat:'acc', price:25, color:'#2c3e50', emoji:'🎮'},
  {id:'acc_ice_wand',  name:'얼음 지팡이',       en:'Ice Wand',         cat:'acc', price:45, color:'#5dade2', emoji:'❄️'},
  {id:'acc_fire_sword',name:'불꽃 검',           en:'Flame Sword',      cat:'acc', price:65, color:'#ff5500', emoji:'🔥'},
];
export const COINS_PER_DAY = 5;

function iname(item){ return getLang()==='en'?(item.en||item.name):item.name; }
function ilabel(obj){ return getLang()==='en'?(obj.lEn||obj.l):obj.l; }

// ── 아바타/코인/인벤토리 상태 ──
export function getAvatar(){ return JSON.parse(localStorage.getItem(lsKey('avatar'))||'null')||{}; }
export function saveAvatar(av){ localStorage.setItem(lsKey('avatar'),JSON.stringify(av)); }
export function getCoins(){ return parseInt(localStorage.getItem(lsKey('coins'))||'0'); }
export function addCoins(n){
  const now=getCoins()+n;
  localStorage.setItem(lsKey('coins'),now);
  updateCoinDisplay();
  window.showToast(getLang()==='en'?`🎉 +${n} 💰 coins earned! (Total: ${now})`:`🎉 +${n} 💰 코인 획득! (총 ${now}코인)`);
}
export function spendCoins(n){ const c=getCoins(); if(c<n) return false; localStorage.setItem(lsKey('coins'),c-n); updateCoinDisplay(); return true; }
export function getInventory(){ return JSON.parse(localStorage.getItem(lsKey('inv'))||'[]'); }
export function addToInventory(id){ const inv=getInventory(); if(!inv.includes(id)){inv.push(id);localStorage.setItem(lsKey('inv'),JSON.stringify(inv));} }
export function hasItem(id){ return getInventory().includes(id); }
export function updateCoinDisplay(){ const el=document.getElementById('coin-display'); if(el) el.textContent=`$${getCoins()}`; }

// ── SVG 아바타 생성 ──
export function makeAvatarSVG(av,w=100,h=130,uidSuffix=''){
  av=av||{};
  const animal=av.animal||'bear';
  const cid=av.color||'brown';
  const bc=(BODY_COLORS.find(x=>x.id===cid)||BODY_COLORS[0]).c;
  const lidColor=animal==='panda'?'rgba(20,20,20,.85)':bc;
  const es=av.eyes||'round';
  const eq=av.equipped||{};
  const hatI=SHOP_ITEMS.find(x=>x.id===eq.hat);
  const topI=SHOP_ITEMS.find(x=>x.id===eq.top);
  const botI=SHOP_ITEMS.find(x=>x.id===eq.bottom);
  const accI=SHOP_ITEMS.find(x=>x.id===eq.accessory);
  const tc=topI?.color||'#5bb8ff';
  const boc=botI?.color||'#7f96a8';
  const ex1=36,ey1=37,ex2=64,ey2=37;

  const earMap={
    bear:`
      <ellipse cx="28" cy="10" rx="10" ry="9" fill="${bc}"/>
      <ellipse cx="72" cy="10" rx="10" ry="9" fill="${bc}"/>
      <ellipse cx="28" cy="11" rx="6" ry="5.5" fill="rgba(255,160,160,.75)"/>
      <ellipse cx="72" cy="11" rx="6" ry="5.5" fill="rgba(255,160,160,.75)"/>`,
    cat:`
      <polygon points="21,12 29,0 45,12" fill="${bc}"/>
      <polygon points="55,12 71,0 79,12" fill="${bc}"/>
      <polygon points="24,12 29,4 41,12" fill="rgba(255,140,140,.7)"/>
      <polygon points="59,12 71,4 76,12" fill="rgba(255,140,140,.7)"/>`,
    bunny:`
      <rect x="30" y="-10" width="14" height="28" rx="3" fill="${bc}"/>
      <rect x="56" y="-10" width="14" height="28" rx="3" fill="${bc}"/>
      <rect x="33" y="-8" width="8" height="22" rx="2" fill="rgba(255,165,165,.7)"/>
      <rect x="59" y="-8" width="8" height="22" rx="2" fill="rgba(255,165,165,.7)"/>`,
    fox:`
      <polygon points="21,12 30,0 45,12" fill="${bc}"/>
      <polygon points="55,12 70,0 79,12" fill="${bc}"/>
      <polygon points="25,12 30,4 42,12" fill="rgba(255,255,255,.9)"/>
      <polygon points="58,12 70,4 75,12" fill="rgba(255,255,255,.9)"/>`,
    pig:`
      <ellipse cx="23" cy="24" rx="8" ry="7.5" fill="${bc}"/>
      <ellipse cx="77" cy="24" rx="8" ry="7.5" fill="${bc}"/>
      <ellipse cx="23" cy="25" rx="4.5" ry="4" fill="rgba(255,150,170,.75)"/>
      <ellipse cx="77" cy="25" rx="4.5" ry="4" fill="rgba(255,150,170,.75)"/>`,
    dog:`
      <rect x="12" y="22" width="14" height="28" rx="7" fill="${bc}"/>
      <rect x="74" y="22" width="14" height="28" rx="7" fill="${bc}"/>`,
    koala:`
      <ellipse cx="16" cy="28" rx="13" ry="12" fill="${bc}"/>
      <ellipse cx="84" cy="28" rx="13" ry="12" fill="${bc}"/>
      <ellipse cx="16" cy="29" rx="8" ry="7" fill="rgba(255,255,255,.45)"/>
      <ellipse cx="84" cy="29" rx="8" ry="7" fill="rgba(255,255,255,.45)"/>`,
    panda:`
      <ellipse cx="28" cy="10" rx="10" ry="9" fill="rgba(20,20,20,.92)"/>
      <ellipse cx="72" cy="10" rx="10" ry="9" fill="rgba(20,20,20,.92)"/>`,
    lion:`
      <rect x="7" y="14" width="86" height="56" rx="4" fill="#c47800" opacity="0.7"/>
      <rect x="12" y="18" width="76" height="48" rx="4" fill="#e8a020" opacity="0.5"/>
      <rect x="20" y="4" width="16" height="10" rx="2" fill="${bc}"/>
      <rect x="64" y="4" width="16" height="10" rx="2" fill="${bc}"/>`,
    tiger:`
      <polygon points="21,12 29,0 45,12" fill="${bc}"/>
      <polygon points="55,12 71,0 79,12" fill="${bc}"/>
      <polygon points="24,12 29,4 41,12" fill="rgba(255,140,140,.68)"/>
      <polygon points="59,12 71,4 76,12" fill="rgba(255,140,140,.68)"/>`,
    hamster:`
      <ellipse cx="26" cy="22" rx="9" ry="8.5" fill="${bc}"/>
      <ellipse cx="74" cy="22" rx="9" ry="8.5" fill="${bc}"/>
      <ellipse cx="26" cy="23" rx="5" ry="4.5" fill="rgba(255,165,165,.65)"/>
      <ellipse cx="74" cy="23" rx="5" ry="4.5" fill="rgba(255,165,165,.65)"/>`,
    frog:`
      <ellipse cx="36" cy="10" rx="11" ry="10" fill="${bc}"/>
      <ellipse cx="64" cy="10" rx="11" ry="10" fill="${bc}"/>
      <ellipse cx="36" cy="10" rx="6" ry="5.5" fill="rgba(255,255,255,.3)"/>
      <ellipse cx="64" cy="10" rx="6" ry="5.5" fill="rgba(255,255,255,.3)"/>`,
    duck:``,
    dragon:`
      <polygon points="28,12 36,0 42,12" fill="#22aa44"/>
      <polygon points="58,12 64,0 72,12" fill="#22aa44"/>
      <polygon points="29,12 36,3 41,12" fill="${bc}" opacity="0.65"/>
      <polygon points="59,12 64,3 71,12" fill="${bc}" opacity="0.65"/>`,
    wolf:`
      <polygon points="18,12 26,0 40,12" fill="${bc}"/>
      <polygon points="60,12 74,0 82,12" fill="${bc}"/>
      <polygon points="21,12 26,4 37,12" fill="rgba(255,255,255,.5)"/>
      <polygon points="63,12 74,4 79,12" fill="rgba(255,255,255,.5)"/>`,
    chick:`
      <polygon points="28,12 36,0 44,12" fill="${bc}"/>
      <polygon points="56,12 64,0 72,12" fill="${bc}"/>`,
  };

  const eyeMap={
    round:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="6.5" fill="#3a78c0"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="6.5" fill="#3a78c0"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex1+3.5}" cy="${ey1-2}" r="2.5" fill="white"/>
      <circle cx="${ex2+3.5}" cy="${ey2-2}" r="2.5" fill="white"/>
      <circle cx="${ex1-2}" cy="${ey1+3}" r="1" fill="rgba(255,255,255,.55)"/>
      <circle cx="${ex2-2}" cy="${ey2+3}" r="1" fill="rgba(255,255,255,.55)"/>`,
    sparkle:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="6.5" fill="#6030d8"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="6.5" fill="#6030d8"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex1+3}" cy="${ey1-2}" r="2.5" fill="white"/>
      <circle cx="${ex2+3}" cy="${ey2-2}" r="2.5" fill="white"/>
      <circle cx="${ex1-2}" cy="${ey1+3}" r="1.2" fill="rgba(255,255,255,.7)"/>
      <circle cx="${ex2-2}" cy="${ey2+3}" r="1.2" fill="rgba(255,255,255,.7)"/>
      <circle cx="${ex1-13}" cy="${ey1-11}" r="3" fill="rgba(255,255,255,.9)"/>
      <circle cx="${ex2+13}" cy="${ey2-11}" r="3" fill="rgba(255,255,255,.9)"/>
      <circle cx="${ex1-17}" cy="${ey1-4}" r="1.8" fill="rgba(200,180,255,.8)"/>
      <circle cx="${ex2+17}" cy="${ey2-4}" r="1.8" fill="rgba(200,180,255,.8)"/>`,
    sleepy:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+4}" r="6.5" fill="#3a78c0"/>
      <circle cx="${ex2}" cy="${ey2+4}" r="6.5" fill="#3a78c0"/>
      <circle cx="${ex1}" cy="${ey1+4}" r="4" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+4}" r="4" fill="#0e1428"/>
      <path d="M${ex1-10},${ey1+0.5} A10,10 0 0,0 ${ex1+10},${ey1+0.5} Z" fill="${lidColor}"/>
      <path d="M${ex2-10},${ey2+0.5} A10,10 0 0,0 ${ex2+10},${ey2+0.5} Z" fill="${lidColor}"/>
      <path d="M${ex1-9},${ey1+1.5} Q${ex1},${ey1+8} ${ex1+9},${ey1+1.5}" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M${ex2-9},${ey2+1.5} Q${ex2},${ey2+8} ${ex2+9},${ey2+1.5}" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>`,
    wink:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="6.5" fill="#3a78c0"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex1+3.5}" cy="${ey1-2}" r="2.5" fill="white"/>
      <path d="M${ex2-9},${ey2+1} Q${ex2},${ey2+9} ${ex2+9},${ey2+1}" fill="none" stroke="rgba(0,0,0,.65)" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M${ex2-7},${ey2-2} Q${ex2},${ey2+5} ${ex2+7},${ey2-2}" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2" stroke-linecap="round"/>`,
    star:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <path d="M${ex1},${ey1-8} L${ex1+2},${ey1-2.9} L${ex1+7.6},${ey1-2.5} L${ex1+3.3},${ey1+1.1} L${ex1+4.7},${ey1+6.5} L${ex1},${ey1+3.5} L${ex1-4.7},${ey1+6.5} L${ex1-3.3},${ey1+1.1} L${ex1-7.6},${ey1-2.5} L${ex1-2},${ey1-2.9} Z" fill="#f0b000"/>
      <path d="M${ex2},${ey2-8} L${ex2+2},${ey2-2.9} L${ex2+7.6},${ey2-2.5} L${ex2+3.3},${ey2+1.1} L${ex2+4.7},${ey2+6.5} L${ex2},${ey2+3.5} L${ex2-4.7},${ey2+6.5} L${ex2-3.3},${ey2+1.1} L${ex2-7.6},${ey2-2.5} L${ex2-2},${ey2-2.9} Z" fill="#f0b000"/>
      <circle cx="${ex1-2}" cy="${ey1-4}" r="2" fill="rgba(255,255,255,.65)"/>
      <circle cx="${ex2-2}" cy="${ey2-4}" r="2" fill="rgba(255,255,255,.65)"/>`,
    heart:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1-4}" cy="${ey1-2}" r="6" fill="#e91e63"/>
      <circle cx="${ex1+4}" cy="${ey1-2}" r="6" fill="#e91e63"/>
      <polygon points="${ex1-8},${ey1+1} ${ex1+8},${ey1+1} ${ex1},${ey1+9}" fill="#e91e63"/>
      <circle cx="${ex2-4}" cy="${ey2-2}" r="6" fill="#e91e63"/>
      <circle cx="${ex2+4}" cy="${ey2-2}" r="6" fill="#e91e63"/>
      <polygon points="${ex2-8},${ey2+1} ${ex2+8},${ey2+1} ${ex2},${ey2+9}" fill="#e91e63"/>
      <circle cx="${ex1-6}" cy="${ey1-7}" r="2" fill="rgba(255,255,255,.45)"/>
      <circle cx="${ex2-6}" cy="${ey2-7}" r="2" fill="rgba(255,255,255,.45)"/>`,
    angry:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="6.5" fill="#cc2030"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="6.5" fill="#cc2030"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex1+3}" cy="${ey1-1}" r="2" fill="white"/>
      <circle cx="${ex2+3}" cy="${ey2-1}" r="2" fill="white"/>
      <path d="M${ex1-10},${ey1-12} L${ex1+8},${ey1-6}" stroke="#0e1428" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M${ex2-8},${ey2-6} L${ex2+10},${ey2-12}" stroke="#0e1428" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    cool:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="#101828"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="#101828"/>
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="rgba(40,90,220,.3)"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="rgba(40,90,220,.3)"/>
      <ellipse cx="${ex1+3}" cy="${ey1-3}" rx="4" ry="3" fill="rgba(255,255,255,.28)" transform="rotate(-20,${ex1+3},${ey1-3})"/>
      <ellipse cx="${ex2+3}" cy="${ey2-3}" rx="4" ry="3" fill="rgba(255,255,255,.28)" transform="rotate(-20,${ex2+3},${ey2-3})"/>
      <path d="M${ex1-10},${ey1+1} A10,10 0 0,0 ${ex1+10},${ey1+1} Z" fill="${lidColor}"/>
      <path d="M${ex2-10},${ey2+1} A10,10 0 0,0 ${ex2+10},${ey2+1} Z" fill="${lidColor}"/>
      <path d="M${ex1-10},${ey1+1} Q${ex1},${ey1-5} ${ex1+10},${ey1+1}" fill="none" stroke="rgba(0,0,0,.6)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M${ex2-10},${ey2+1} Q${ex2},${ey2-5} ${ex2+10},${ey2+1}" fill="none" stroke="rgba(0,0,0,.6)" stroke-width="2.5" stroke-linecap="round"/>`,
    teary:`
      <circle cx="${ex1}" cy="${ey1}" r="10" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="10" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="6.5" fill="#78aaee"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="6.5" fill="#78aaee"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="4" fill="#0e1428"/>
      <circle cx="${ex1+3.5}" cy="${ey1-2}" r="2.5" fill="white"/>
      <circle cx="${ex2+3.5}" cy="${ey2-2}" r="2.5" fill="white"/>
      <ellipse cx="${ex1-1}" cy="${ey1+16}" rx="3" ry="7" fill="#60a8ff" opacity="0.9"/>
      <ellipse cx="${ex2-1}" cy="${ey2+16}" rx="3" ry="7" fill="#60a8ff" opacity="0.9"/>`,
    surprised:`
      <circle cx="${ex1}" cy="${ey1}" r="12" fill="white"/>
      <circle cx="${ex2}" cy="${ey2}" r="12" fill="white"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="8.5" fill="#3a78c0"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="8.5" fill="#3a78c0"/>
      <circle cx="${ex1}" cy="${ey1+1}" r="5.5" fill="#0e1428"/>
      <circle cx="${ex2}" cy="${ey2+1}" r="5.5" fill="#0e1428"/>
      <circle cx="${ex1+4}" cy="${ey1-3}" r="3" fill="white"/>
      <circle cx="${ex2+4}" cy="${ey2-3}" r="3" fill="white"/>
      <path d="M${ex1-12},${ey1-16} L${ex1+12},${ey1-15}" stroke="#0e1428" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M${ex2-12},${ey2-15} L${ex2+12},${ey2-16}" stroke="#0e1428" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  };

  // 동물별 입 위치 (null = faceMap 자체 입 사용)
  const _mouthY={bear:55,cat:55,bunny:56,fox:56,pig:61,dog:55,koala:63,
    panda:56,lion:59,tiger:55,hamster:50,frog:null,duck:null,
    dragon:60,wolf:58,chick:null};
  const _mouthW={bear:7,cat:6,bunny:6,fox:6,pig:7,dog:7,koala:6,
    panda:7,lion:8,tiger:6,hamster:4,dragon:7,wolf:8};
  const mt=av.mouth||'smile';
  function mkMouth(cx,my,w){
    if(!my) return '';
    switch(mt){
      case 'big':
        return `<path d="M${cx-w-1},${my} Q${cx},${my+9} ${cx+w+1},${my}" stroke="rgba(0,0,0,.5)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
                <path d="M${cx-w},${my+1} Q${cx},${my+7} ${cx+w},${my+1}" fill="rgba(255,100,100,.5)"/>`;
      case 'cat':
        return `<path d="M${cx-w+2},${my+2} Q${cx},${my+7} ${cx+w-2},${my+2}" stroke="rgba(0,0,0,.45)" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M${cx-w+2},${my+2} Q${cx-2},${my-4} ${cx},${my}" stroke="rgba(0,0,0,.45)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <path d="M${cx+w-2},${my+2} Q${cx+2},${my-4} ${cx},${my}" stroke="rgba(0,0,0,.45)" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
      case 'tongue':
        return `<path d="M${cx-w},${my} Q${cx},${my+7} ${cx+w},${my}" stroke="rgba(0,0,0,.4)" stroke-width="2" fill="none" stroke-linecap="round"/>
                <ellipse cx="${cx}" cy="${my+9}" rx="${w-1}" ry="${w-2}" fill="#ff8080" opacity="0.9"/>
                <line x1="${cx}" y1="${my+4}" x2="${cx}" y2="${my+14}" stroke="rgba(160,0,0,.28)" stroke-width="1.4"/>`;
      case 'sad':
        return `<path d="M${cx-w},${my+6} Q${cx},${my} ${cx+w},${my+6}" stroke="rgba(0,0,0,.45)" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
      case 'oh':
        return `<ellipse cx="${cx}" cy="${my+4}" rx="${Math.max(w-3,3)}" ry="${Math.max(w-2,4)}" fill="rgba(0,0,0,.55)"/>`;
      case 'tiny':
        return `<path d="M${cx-3},${my+3} Q${cx},${my+7} ${cx+3},${my+3}" stroke="rgba(0,0,0,.45)" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      case 'cool':
        return `<path d="M${cx-w+1},${my+4} Q${cx},${my+9} ${cx+w-1},${my+4}" stroke="rgba(0,0,0,.42)" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
      default: // smile
        return `<path d="M${cx-w},${my} Q${cx},${my+8} ${cx+w},${my}" stroke="rgba(0,0,0,.45)" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    }
  }
  const mouthSVG=mkMouth(50,_mouthY[animal],_mouthW[animal]||6);

  const faceMap={
    bear:`
      <ellipse cx="50" cy="51" rx="14" ry="10.5" fill="rgba(255,255,255,.38)"/>
      <ellipse cx="50" cy="46" rx="5.5" ry="4.5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.5" cy="44.8" r="1.6" fill="rgba(255,255,255,.5)"/>
      <path d="M50,50 L50,54" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>`,
    cat:`
      <ellipse cx="50" cy="51" rx="13" ry="10" fill="rgba(255,255,255,.35)"/>
      <path d="M46,47 L50,51 L54,47 Z" fill="rgba(0,0,0,.65)"/>
      <line x1="18" y1="50.5" x2="37" y2="50" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>
      <line x1="18" y1="54.5" x2="37" y2="53.5" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>
      <line x1="82" y1="50.5" x2="63" y2="50" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>
      <line x1="82" y1="54.5" x2="63" y2="53.5" stroke="rgba(0,0,0,.22)" stroke-width="1.2"/>`,
    bunny:`
      <ellipse cx="50" cy="51" rx="14" ry="10" fill="rgba(255,255,255,.35)"/>
      <circle cx="50" cy="47" r="4.5" fill="rgba(255,110,130,.92)"/>
      <circle cx="48.5" cy="45.8" r="1.8" fill="rgba(255,255,255,.55)"/>
      <path d="M50,51.5 L50,55" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`,
    fox:`
      <ellipse cx="50" cy="52" rx="17" ry="13" fill="rgba(255,255,255,.55)"/>
      <ellipse cx="50" cy="47" rx="5" ry="4.2" fill="rgba(0,0,0,.65)"/>
      <circle cx="48" cy="45.8" r="1.6" fill="rgba(255,255,255,.5)"/>
      <path d="M50,51 L50,55" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`,
    pig:`
      <ellipse cx="50" cy="53" rx="16" ry="12" fill="rgba(255,155,175,.78)"/>
      <circle cx="44" cy="54" r="4.5" fill="rgba(0,0,0,.42)"/>
      <circle cx="56" cy="54" r="4.5" fill="rgba(0,0,0,.42)"/>
      <circle cx="42.8" cy="52.8" r="1.8" fill="rgba(255,255,255,.38)"/>
      <circle cx="54.8" cy="52.8" r="1.8" fill="rgba(255,255,255,.38)"/>`,
    dog:`
      <ellipse cx="50" cy="51" rx="14" ry="11" fill="rgba(255,255,255,.38)"/>
      <ellipse cx="50" cy="46" rx="6.5" ry="5.5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.8" cy="44.8" r="2" fill="rgba(255,255,255,.48)"/>
      <circle cx="52.5" cy="44.8" r="2" fill="rgba(255,255,255,.48)"/>`,
    koala:`
      <ellipse cx="50" cy="49" rx="11" ry="10.5" fill="rgba(0,0,0,.72)"/>
      <circle cx="47.2" cy="47.2" r="2.5" fill="rgba(255,255,255,.42)"/>
      <path d="M50,59 L50,63" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`,
    panda:`
      <ellipse cx="50" cy="47" rx="5.5" ry="4.5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.5" cy="45.8" r="1.6" fill="rgba(255,255,255,.5)"/>
      <path d="M50,51 L50,55" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>`,
    lion:`
      <ellipse cx="50" cy="52" rx="18" ry="13" fill="rgba(255,240,215,.65)"/>
      <ellipse cx="50" cy="48" rx="7" ry="5.5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.2" cy="46.5" r="2" fill="rgba(255,255,255,.5)"/>
      <path d="M50,53 L50,57" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>
      <line x1="20" y1="51" x2="36" y2="50.5" stroke="rgba(0,0,0,.2)" stroke-width="1.2"/>
      <line x1="20" y1="55" x2="36" y2="54" stroke="rgba(0,0,0,.2)" stroke-width="1.2"/>
      <line x1="80" y1="51" x2="64" y2="50.5" stroke="rgba(0,0,0,.2)" stroke-width="1.2"/>
      <line x1="80" y1="55" x2="64" y2="54" stroke="rgba(0,0,0,.2)" stroke-width="1.2"/>`,
    tiger:`
      <ellipse cx="50" cy="51" rx="13" ry="10" fill="rgba(255,255,255,.38)"/>
      <ellipse cx="50" cy="47" rx="5.5" ry="4.5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.8" cy="45.8" r="1.6" fill="rgba(255,255,255,.5)"/>
      <path d="M25,32 L34,37" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M22,40 L31,42" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M75,32 L66,37" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78,40 L69,42" stroke="rgba(0,0,0,.45)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M44,14 L46,22" stroke="rgba(0,0,0,.35)" stroke-width="2" stroke-linecap="round"/>
      <path d="M50,12 L50,21" stroke="rgba(0,0,0,.35)" stroke-width="2" stroke-linecap="round"/>
      <path d="M56,14 L54,22" stroke="rgba(0,0,0,.35)" stroke-width="2" stroke-linecap="round"/>`,
    hamster:`
      <ellipse cx="26" cy="50" rx="14" ry="11" fill="rgba(255,215,190,.7)"/>
      <ellipse cx="74" cy="50" rx="14" ry="11" fill="rgba(255,215,190,.7)"/>
      <ellipse cx="50" cy="46" rx="4" ry="3" fill="rgba(255,100,130,.85)"/>`,
    frog:`
      <path d="M28,56 Q50,70 72,56" stroke="rgba(0,0,0,.5)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M29,56 Q50,67 71,56" fill="none" stroke="rgba(255,80,80,.35)" stroke-width="2"/>
      <circle cx="45" cy="48" r="2.5" fill="rgba(0,0,0,.45)"/>
      <circle cx="55" cy="48" r="2.5" fill="rgba(0,0,0,.45)"/>`,
    duck:`
      <ellipse cx="50" cy="51" rx="14" ry="8" fill="#f5a020"/>
      <path d="M36,51 Q50,58 64,51" stroke="#d08015" stroke-width="1.5" fill="none"/>
      <ellipse cx="50" cy="48" rx="11" ry="5.2" fill="#f0980f"/>`,
    dragon:`
      <ellipse cx="50" cy="50" rx="14" ry="10" fill="rgba(255,255,255,.28)"/>
      <ellipse cx="50" cy="46" rx="6" ry="5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.5" cy="44.5" r="2" fill="rgba(255,255,255,.5)"/>
      <path d="M43,54 L42,58 L45,55 L44,59 L49,56" stroke="#ff5500" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"/>
      <path d="M57,54 L58,58 L55,55 L56,59 L51,56" stroke="#ff5500" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.72"/>`,
    wolf:`
      <ellipse cx="50" cy="52" rx="18" ry="14" fill="rgba(255,255,255,.45)"/>
      <ellipse cx="50" cy="47" rx="6" ry="5" fill="rgba(0,0,0,.65)"/>
      <circle cx="47.8" cy="45.5" r="1.8" fill="rgba(255,255,255,.5)"/>
      <path d="M50,52 L50,56" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>`,
    chick:`
      <path d="M44,51 L50,56 L56,51 Z" fill="#f4a020"/>
      <path d="M44,51 L50,53.5 L56,51" stroke="#d08010" stroke-width="0.8" fill="none"/>
      <ellipse cx="33" cy="50" rx="9" ry="7" fill="rgba(255,180,180,.5)"/>
      <ellipse cx="67" cy="50" rx="9" ry="7" fill="rgba(255,180,180,.5)"/>`,
  };

  const bellyMap={
    bear:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.38)"/>`,
    cat:`<ellipse cx="50" cy="83" rx="9" ry="8" fill="rgba(255,255,255,.38)"/>`,
    bunny:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.42)"/>`,
    fox:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.42)"/>`,
    pig:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,200,210,.55)"/>`,
    dog:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.38)"/>`,
    koala:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.32)"/>`,
    panda:`<ellipse cx="50" cy="83" rx="11" ry="10" fill="rgba(30,30,30,.08)"/>`,
    lion:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,240,215,.5)"/>`,
    tiger:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.38)"/>`,
    hamster:`<ellipse cx="50" cy="83" rx="11" ry="9" fill="rgba(255,215,190,.55)"/>`,
    frog:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.32)"/>`,
    duck:`<ellipse cx="50" cy="83" rx="9" ry="8" fill="rgba(255,255,220,.5)"/>`,
    dragon:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,255,255,.25)"/>`,
    wolf:`<ellipse cx="50" cy="83" rx="11" ry="9" fill="rgba(255,255,255,.48)"/>`,
    chick:`<ellipse cx="50" cy="83" rx="10" ry="9" fill="rgba(255,245,200,.55)"/>`,
  };

  const defTop=`<rect x="29" y="70" width="42" height="28" rx="8" fill="${tc}"/>
    <rect x="14" y="70" width="15" height="26" rx="7" fill="${tc}"/>
    <rect x="71" y="70" width="15" height="26" rx="7" fill="${tc}"/>`;
  const topMap={
    top_tshirt:defTop,
    top_jacket:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q15,77 16,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q85,77 84,92 L71,87 Z" fill="${tc}"/>
      <line x1="50" y1="72" x2="50" y2="104" stroke="rgba(255,255,255,.45)" stroke-width="1.8"/>
      <circle cx="50" cy="77" r="2.2" fill="rgba(255,255,255,.8)"/>
      <circle cx="50" cy="84" r="2.2" fill="rgba(255,255,255,.8)"/>
      <circle cx="50" cy="91" r="2.2" fill="rgba(255,255,255,.8)"/>
      <circle cx="50" cy="98" r="2.2" fill="rgba(255,255,255,.8)"/>`,
    top_cape:`<rect x="31" y="70" width="38" height="33" rx="7" fill="#e74c3c"/>
      <path d="M28,70 L50,66 L72,70 L84,130 L50,118 L16,130 Z" fill="${tc}" opacity="0.93"/>`,
    top_hoodie:`<rect x="29" y="70" width="42" height="34" rx="11" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <ellipse cx="50" cy="74" rx="12" ry="7.5" fill="rgba(0,0,0,.15)"/>
      <circle cx="50" cy="90" r="5" fill="rgba(0,0,0,.12)"/>`,
    top_suit:`<rect x="29" y="70" width="42" height="34" rx="8" fill="${tc}"/>
      <path d="M29,73 Q16,77 17,92 L29,86 Z" fill="${tc}"/>
      <path d="M71,73 Q84,77 83,92 L71,86 Z" fill="${tc}"/>
      <path d="M42,70 Q50,80 58,70" fill="rgba(255,255,255,.9)"/>
      <rect x="47" y="80" width="6" height="8" rx="2" fill="rgba(220,50,50,.7)"/>`,
    top_tanktop:`<rect x="33" y="70" width="34" height="34" rx="9" fill="${tc}"/>
      <path d="M33,74 Q21,82 22,91 L33,88 Z" fill="${tc}"/>
      <path d="M67,74 Q79,82 78,91 L67,88 Z" fill="${tc}"/>`,
    top_sportswear:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <line x1="35" y1="70" x2="35" y2="104" stroke="rgba(255,255,255,.38)" stroke-width="3.5"/>
      <line x1="65" y1="70" x2="65" y2="104" stroke="rgba(255,255,255,.38)" stroke-width="3.5"/>`,
    top_vest:`<rect x="34" y="70" width="32" height="34" rx="7" fill="${tc}"/>
      <path d="M34,70 Q26,76 28,92 L34,88 Z" fill="${tc}"/>
      <path d="M66,70 Q74,76 72,92 L66,88 Z" fill="${tc}"/>`,
    top_sailor:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <path d="M36,70 L50,88 L64,70" stroke="white" stroke-width="3" fill="none"/>
      <rect x="36" y="68" width="28" height="5" rx="2" fill="rgba(255,255,255,.5)"/>`,
    top_sweater:`<rect x="29" y="70" width="42" height="34" rx="11" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <path d="M30,78 L70,78 M30,83 L70,83 M30,88 L70,88 M30,93 L70,93 M30,98 L70,98" stroke="rgba(0,0,0,.1)" stroke-width="1.5"/>`,
    top_armor:`<rect x="28" y="70" width="44" height="34" rx="5" fill="${tc}"/>
      <path d="M28,73 Q14,78 15,92 L28,87 Z" fill="${tc}"/>
      <path d="M72,73 Q86,78 85,92 L72,87 Z" fill="${tc}"/>
      <rect x="28" y="70" width="44" height="34" rx="5" fill="rgba(255,255,255,.12)"/>
      <line x1="50" y1="70" x2="50" y2="104" stroke="rgba(0,0,0,.2)" stroke-width="2"/>
      <path d="M28,80 L72,80" stroke="rgba(0,0,0,.15)" stroke-width="2"/>`,
    top_tracksuit:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <line x1="29" y1="78" x2="71" y2="78" stroke="white" stroke-width="3" opacity="0.7"/>
      <line x1="29" y1="95" x2="71" y2="95" stroke="white" stroke-width="3" opacity="0.7"/>`,
    top_jersey:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <text x="50" y="93" text-anchor="middle" font-size="14" font-weight="900" fill="rgba(255,255,255,.85)" font-family="Arial">10</text>`,
    top_blazer:`<rect x="28" y="70" width="44" height="34" rx="8" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <path d="M40,70 Q50,82 60,70" fill="rgba(255,255,255,.85)"/>
      <rect x="46" y="82" width="8" height="10" rx="2" fill="rgba(255,255,255,.15)"/>`,
    top_apron:`<rect x="29" y="70" width="42" height="34" rx="9" fill="rgba(255,255,255,.6)"/>
      <rect x="38" y="70" width="24" height="40" rx="5" fill="${tc}"/>
      <rect x="40" y="68" width="20" height="5" rx="2.5" fill="${tc}"/>`,
    top_lab:`<rect x="28" y="70" width="44" height="34" rx="8" fill="white"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="white"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="white"/>
      <line x1="50" y1="72" x2="50" y2="104" stroke="rgba(200,200,200,.5)" stroke-width="2"/>
      <rect x="33" y="84" width="10" height="6" rx="2" fill="${tc}" opacity="0.6"/>`,
    top_ninja:`<rect x="28" y="70" width="44" height="34" rx="5" fill="${tc}"/>
      <path d="M28,73 Q14,78 15,92 L28,87 Z" fill="${tc}"/>
      <path d="M72,73 Q86,78 85,92 L72,87 Z" fill="${tc}"/>
      <path d="M28,78 L72,78" stroke="rgba(255,255,255,.2)" stroke-width="3"/>`,
    top_wizard:`<rect x="28" y="70" width="44" height="34" rx="9" fill="${tc}"/>
      <path d="M28,73 Q14,78 15,92 L28,87 Z" fill="${tc}"/>
      <path d="M72,73 Q86,78 85,92 L72,87 Z" fill="${tc}"/>
      <circle cx="50" cy="82" r="7" fill="rgba(255,220,50,.22)" stroke="rgba(255,220,50,.5)" stroke-width="1.5"/>
      <path d="M46,79 L54,79 M50,75 L50,83" stroke="rgba(255,220,50,.8)" stroke-width="2" stroke-linecap="round"/>`,
    top_superhero:`<rect x="28" y="70" width="44" height="34" rx="8" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <path d="M28,68 L50,64 L72,68 L82,130 L50,118 L18,130 Z" fill="${tc}" opacity="0.85"/>
      <path d="M42,82 L50,76 L58,82 L55,90 L45,90 Z" fill="rgba(255,220,0,.8)"/>`,
    top_pirate:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <line x1="29" y1="78" x2="71" y2="78" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
      <line x1="29" y1="86" x2="71" y2="86" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
      <line x1="29" y1="94" x2="71" y2="94" stroke="rgba(255,255,255,.4)" stroke-width="3"/>`,
    top_punk:`<rect x="28" y="70" width="44" height="34" rx="5" fill="${tc}"/>
      <path d="M28,73 Q14,78 15,92 L28,87 Z" fill="${tc}"/>
      <path d="M72,73 Q86,78 85,92 L72,87 Z" fill="${tc}"/>
      <circle cx="38" cy="80" r="3.5" fill="#c0c0c0"/>
      <circle cx="48" cy="76" r="3.5" fill="#c0c0c0"/>
      <circle cx="58" cy="76" r="3.5" fill="#c0c0c0"/>
      <line x1="50" y1="70" x2="50" y2="104" stroke="rgba(255,255,255,.15)" stroke-width="2"/>`,
    top_tropical:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <circle cx="38" cy="80" r="5" fill="rgba(255,100,100,.5)"/>
      <circle cx="54" cy="76" r="4" fill="rgba(100,255,100,.5)"/>
      <circle cx="64" cy="85" r="5" fill="rgba(255,220,50,.5)"/>
      <circle cx="44" cy="90" r="4" fill="rgba(100,200,255,.5)"/>`,
    top_longsleeve:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <rect x="14" y="74" width="20" height="30" rx="8" fill="${tc}"/>
      <rect x="66" y="74" width="20" height="30" rx="8" fill="${tc}"/>`,
    top_santa:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <rect x="29" y="70" width="42" height="6" rx="3" fill="white"/>
      <line x1="29" y1="70" x2="71" y2="70" stroke="white" stroke-width="7"/>
      <circle cx="50" cy="80" r="3.5" fill="white"/>
      <circle cx="50" cy="90" r="3.5" fill="white"/>`,
    top_iceking:`<rect x="27" y="70" width="46" height="34" rx="6" fill="${tc}" opacity="0.88"/>
      <path d="M27,72 Q12,77 13,92 L27,87 Z" fill="${tc}" opacity="0.88"/>
      <path d="M73,72 Q88,77 87,92 L73,87 Z" fill="${tc}" opacity="0.88"/>
      <rect x="27" y="70" width="46" height="34" rx="6" fill="rgba(255,255,255,.18)"/>
      <path d="M40,78 L50,72 L60,78 M40,88 L50,82 L60,88" stroke="rgba(255,255,255,.6)" stroke-width="2" fill="none"/>`,
    top_rainbow:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <line x1="29" y1="75" x2="71" y2="75" stroke="#e74c3c" stroke-width="3"/>
      <line x1="29" y1="80" x2="71" y2="80" stroke="#f39c12" stroke-width="3"/>
      <line x1="29" y1="85" x2="71" y2="85" stroke="#f1c40f" stroke-width="3"/>
      <line x1="29" y1="90" x2="71" y2="90" stroke="#27ae60" stroke-width="3"/>
      <line x1="29" y1="95" x2="71" y2="95" stroke="#3498db" stroke-width="3"/>`,
    top_polo:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <path d="M44,70 Q50,76 56,70" fill="white" opacity="0.85"/>
      <line x1="50" y1="76" x2="50" y2="84" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>`,
    top_striped:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <line x1="29" y1="77" x2="71" y2="77" stroke="white" stroke-width="4" opacity="0.5"/>
      <line x1="29" y1="87" x2="71" y2="87" stroke="white" stroke-width="4" opacity="0.5"/>
      <line x1="29" y1="97" x2="71" y2="97" stroke="white" stroke-width="4" opacity="0.5"/>`,
    top_basketball:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <text x="50" y="93" text-anchor="middle" font-size="12" font-weight="900" fill="rgba(255,255,255,.85)" font-family="Arial">23</text>
      <line x1="29" y1="78" x2="71" y2="78" stroke="rgba(255,255,255,.4)" stroke-width="2"/>`,
    top_baseball:`<rect x="28" y="70" width="44" height="34" rx="8" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <path d="M44,70 Q50,82 56,70" fill="rgba(255,255,255,.8)"/>
      <circle cx="50" cy="90" r="5" fill="rgba(255,255,255,.3)"/>`,
    top_denim:`<rect x="28" y="70" width="44" height="34" rx="9" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <line x1="50" y1="72" x2="50" y2="104" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
      <line x1="30" y1="84" x2="70" y2="84" stroke="rgba(255,255,255,.2)" stroke-width="1.5"/>`,
    top_windbreaker:`<rect x="28" y="70" width="44" height="34" rx="9" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <line x1="28" y1="73" x2="72" y2="73" stroke="rgba(255,255,255,.5)" stroke-width="3"/>
      <line x1="50" y1="70" x2="50" y2="104" stroke="rgba(255,255,255,.3)" stroke-width="2"/>`,
    top_school:`<rect x="28" y="70" width="44" height="34" rx="8" fill="${tc}"/>
      <path d="M28,73 Q14,77 15,92 L28,86 Z" fill="${tc}"/>
      <path d="M72,73 Q86,77 85,92 L72,86 Z" fill="${tc}"/>
      <path d="M40,70 Q50,82 60,70" fill="rgba(255,255,255,.85)"/>
      <rect x="46" y="82" width="8" height="12" rx="2" fill="#c0392b" opacity="0.7"/>`,
    top_floral:`<rect x="29" y="70" width="42" height="34" rx="9" fill="${tc}"/>
      <path d="M29,73 Q16,78 17,92 L29,87 Z" fill="${tc}"/>
      <path d="M71,73 Q84,78 83,92 L71,87 Z" fill="${tc}"/>
      <circle cx="38" cy="78" r="5" fill="rgba(255,255,255,.4)"/>
      <circle cx="52" cy="84" r="6" fill="rgba(255,255,255,.4)"/>
      <circle cx="64" cy="76" r="5" fill="rgba(255,255,255,.4)"/>
      <circle cx="42" cy="92" r="4" fill="rgba(255,255,255,.4)"/>`,
    top_dragon:`<rect x="27" y="70" width="46" height="34" rx="6" fill="${tc}"/>
      <path d="M27,72 Q12,77 13,92 L27,87 Z" fill="${tc}"/>
      <path d="M73,72 Q88,77 87,92 L73,87 Z" fill="${tc}"/>
      <path d="M35,74 L50,68 L65,74" stroke="rgba(255,255,255,.45)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M35,82 L50,76 L65,82" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  };
  const topSVG=topI?(topMap[topI.id]||defTop):'';

  const defBot=`<rect x="29" y="98" width="19" height="26" rx="9" fill="${boc}"/><rect x="52" y="98" width="19" height="26" rx="9" fill="${boc}"/>`;
  const botMap={
    bot_shorts:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="18" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="18" rx="7" fill="${boc}"/>`,
    bot_pants:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="24" rx="7" fill="${boc}"/>`,
    bot_skirt:`<path d="M24,100 L76,100 L82,128 L18,128 Z" fill="${boc}"/>
      <rect x="29" y="97" width="42" height="8" rx="4" fill="${boc}" opacity="0.88"/>`,
    bot_overalls:`<rect x="30" y="99" width="40" height="8" rx="4" fill="${boc}"/>
      <rect x="30" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <rect x="40" y="71" width="8" height="34" rx="4" fill="${boc}" opacity="0.72"/>
      <rect x="52" y="71" width="8" height="34" rx="4" fill="${boc}" opacity="0.72"/>
      <rect x="41" y="82" width="18" height="12" rx="4" fill="${boc}" opacity="0.65"/>`,
    bot_jeans:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <line x1="39" y1="112" x2="39" y2="128" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
      <line x1="61" y1="112" x2="61" y2="128" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>`,
    bot_leggings:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <rect x="30" y="104" width="18" height="26" rx="5" fill="${boc}"/>
      <rect x="52" y="104" width="18" height="26" rx="5" fill="${boc}"/>
      <line x1="39" y1="106" x2="39" y2="130" stroke="rgba(255,255,255,.2)" stroke-width="1.2"/>
      <line x1="61" y1="106" x2="61" y2="130" stroke="rgba(255,255,255,.2)" stroke-width="1.2"/>`,
    bot_bloomers:`<path d="M28,100 L72,100 L78,120 L52,117 L48,117 L22,120 Z" fill="${boc}"/>
      <rect x="29" y="97" width="42" height="8" rx="4" fill="${boc}" opacity="0.88"/>
      <path d="M50,117 L50,120" stroke="rgba(0,0,0,.15)" stroke-width="2"/>`,
    bot_trackpants:`<rect x="29" y="99" width="42" height="8" rx="4" fill="${boc}" opacity="0.85"/>
      <rect x="29" y="104" width="19" height="26" rx="7" fill="${boc}"/>
      <rect x="52" y="104" width="19" height="26" rx="7" fill="${boc}"/>
      <line x1="29" y1="99" x2="71" y2="99" stroke="white" stroke-width="3" opacity="0.4"/>`,
    bot_joggers:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="22" rx="8" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="22" rx="8" fill="${boc}"/>
      <rect x="30" y="122" width="19" height="5" rx="4" fill="${boc}" opacity="0.7"/>
      <rect x="51" y="122" width="19" height="5" rx="4" fill="${boc}" opacity="0.7"/>`,
    bot_miniskirt:`<path d="M28,100 L72,100 L76,118 L24,118 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>`,
    bot_tutu:`<rect x="30" y="100" width="40" height="6" rx="3" fill="${boc}"/>
      <path d="M20,104 Q50,96 80,104 L82,115 Q50,107 18,115 Z" fill="${boc}" opacity="0.7"/>
      <path d="M18,110 Q50,102 82,110 L84,122 Q50,114 16,122 Z" fill="${boc}" opacity="0.6"/>
      <path d="M16,118 Q50,110 84,118 L86,128 Q50,120 14,128 Z" fill="${boc}" opacity="0.5"/>`,
    bot_sweatpants:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="25" rx="8" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="25" rx="8" fill="${boc}"/>`,
    bot_cargo:`<rect x="29" y="100" width="42" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="29" y="104" width="19" height="26" rx="6" fill="${boc}"/>
      <rect x="52" y="104" width="19" height="26" rx="6" fill="${boc}"/>
      <rect x="30" y="110" width="10" height="8" rx="2" fill="${boc}" opacity="0.65"/>
      <rect x="60" y="110" width="10" height="8" rx="2" fill="${boc}" opacity="0.65"/>`,
    bot_tights:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <rect x="30" y="104" width="19" height="28" rx="4" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="28" rx="4" fill="${boc}"/>`,
    bot_yoga:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <rect x="30" y="104" width="18" height="27" rx="5" fill="${boc}"/>
      <rect x="52" y="104" width="18" height="27" rx="5" fill="${boc}"/>
      <line x1="39" y1="106" x2="39" y2="131" stroke="rgba(255,255,255,.2)" stroke-width="1.5"/>
      <line x1="61" y1="106" x2="61" y2="131" stroke="rgba(255,255,255,.2)" stroke-width="1.5"/>`,
    bot_swim:`<rect x="31" y="101" width="38" height="6" rx="3" fill="${boc}" opacity="0.85"/>
      <rect x="31" y="105" width="17" height="15" rx="7" fill="${boc}"/>
      <rect x="52" y="105" width="17" height="15" rx="7" fill="${boc}"/>`,
    bot_basketball:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="18" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="18" rx="7" fill="${boc}"/>
      <line x1="30" y1="110" x2="71" y2="110" stroke="rgba(255,255,255,.3)" stroke-width="2"/>`,
    bot_soccer:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="18" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="18" rx="7" fill="${boc}"/>`,
    bot_pleated:`<path d="M25,100 L75,100 L80,128 L20,128 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <line x1="33" y1="102" x2="30" y2="128" stroke="rgba(0,0,0,.1)" stroke-width="2"/>
      <line x1="42" y1="101" x2="40" y2="128" stroke="rgba(0,0,0,.1)" stroke-width="2"/>
      <line x1="51" y1="100" x2="50" y2="128" stroke="rgba(0,0,0,.1)" stroke-width="2"/>
      <line x1="60" y1="101" x2="60" y2="128" stroke="rgba(0,0,0,.1)" stroke-width="2"/>
      <line x1="69" y1="102" x2="70" y2="128" stroke="rgba(0,0,0,.1)" stroke-width="2"/>`,
    bot_bell:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <path d="M30,104 L28,128 L38,128 L40,104 Z" fill="${boc}"/>
      <path d="M60,104 L62,128 L72,128 L70,104 Z" fill="${boc}"/>`,
    bot_capri:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="20" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="20" rx="7" fill="${boc}"/>`,
    bot_board:`<rect x="28" y="100" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="28" y="104" width="20" height="18" rx="7" fill="${boc}"/>
      <rect x="52" y="104" width="20" height="18" rx="7" fill="${boc}"/>
      <line x1="35" y1="107" x2="35" y2="120" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
      <line x1="65" y1="107" x2="65" y2="120" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`,
    bot_compression:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <rect x="30" y="104" width="18" height="28" rx="4" fill="${boc}"/>
      <rect x="52" y="104" width="18" height="28" rx="4" fill="${boc}"/>
      <line x1="36" y1="106" x2="34" y2="132" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <line x1="64" y1="106" x2="66" y2="132" stroke="rgba(255,255,255,.18)" stroke-width="2"/>`,
    bot_bubble:`<rect x="29" y="100" width="42" height="6" rx="3" fill="${boc}"/>
      <ellipse cx="39" cy="113" rx="12" ry="10" fill="${boc}"/>
      <ellipse cx="61" cy="113" rx="12" ry="10" fill="${boc}"/>`,
    bot_rainbow:`<path d="M24,100 L76,100 L82,128 L18,128 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <line x1="26" y1="108" x2="74" y2="108" stroke="#e74c3c" stroke-width="2.5" opacity="0.6"/>
      <line x1="24" y1="115" x2="76" y2="115" stroke="#f39c12" stroke-width="2.5" opacity="0.6"/>
      <line x1="22" y1="122" x2="78" y2="122" stroke="#27ae60" stroke-width="2.5" opacity="0.6"/>`,
    bot_striped:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="26" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="26" rx="7" fill="${boc}"/>
      <line x1="30" y1="110" x2="71" y2="110" stroke="white" stroke-width="3" opacity="0.35"/>
      <line x1="30" y1="118" x2="71" y2="118" stroke="white" stroke-width="3" opacity="0.35"/>`,
    bot_culottes:`<path d="M26,100 L74,100 L78,122 L54,120 L46,120 L22,122 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>`,
    bot_wrap:`<path d="M24,100 L76,100 L80,128 L20,128 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <line x1="50" y1="100" x2="44" y2="128" stroke="rgba(0,0,0,.12)" stroke-width="2"/>`,
    bot_school:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="24" rx="7" fill="${boc}"/>
      <line x1="30" y1="110" x2="71" y2="110" stroke="rgba(255,255,255,.3)" stroke-width="2"/>`,
    bot_ninja:`<rect x="29" y="100" width="42" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="29" y="104" width="19" height="28" rx="4" fill="${boc}"/>
      <rect x="52" y="104" width="19" height="28" rx="4" fill="${boc}"/>`,
    bot_armor:`<rect x="28" y="100" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="28" y="104" width="20" height="26" rx="5" fill="${boc}"/>
      <rect x="52" y="104" width="20" height="26" rx="5" fill="${boc}"/>
      <rect x="28" y="104" width="44" height="26" rx="5" fill="rgba(255,255,255,.1)"/>
      <line x1="50" y1="104" x2="50" y2="130" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`,
    bot_santa:`<rect x="30" y="100" width="40" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="30" y="104" width="19" height="20" rx="7" fill="${boc}"/>
      <rect x="51" y="104" width="19" height="20" rx="7" fill="${boc}"/>
      <rect x="30" y="100" width="40" height="5" rx="2.5" fill="white" opacity="0.8"/>`,
    bot_dragon:`<rect x="28" y="100" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <rect x="28" y="104" width="20" height="28" rx="5" fill="${boc}"/>
      <rect x="52" y="104" width="20" height="28" rx="5" fill="${boc}"/>
      <path d="M34,106 L46,106 M34,112 L46,112" stroke="rgba(255,255,255,.3)" stroke-width="2" stroke-linecap="round"/>
      <path d="M54,106 L66,106 M54,112 L66,112" stroke="rgba(255,255,255,.3)" stroke-width="2" stroke-linecap="round"/>`,
    bot_iceking:`<rect x="28" y="100" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.85"/>
      <rect x="28" y="104" width="20" height="28" rx="5" fill="${boc}" opacity="0.85"/>
      <rect x="52" y="104" width="20" height="28" rx="5" fill="${boc}" opacity="0.85"/>
      <rect x="28" y="104" width="44" height="28" rx="5" fill="rgba(255,255,255,.2)"/>`,
    bot_pleated2:`<path d="M25,100 L75,100 L80,128 L20,128 Z" fill="${boc}"/>
      <rect x="28" y="97" width="44" height="7" rx="3.5" fill="${boc}" opacity="0.88"/>
      <path d="M30,100 L28,128 M40,100 L38,128 M50,100 L50,128 M60,100 L62,128 M70,100 L72,128" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/>`,
  };
  const botSVG=botI?(botMap[botI.id]||defBot):defBot;

  const hatMap={
    hat_cap:`<path d="M19,26 Q19,7 50,6 Q81,7 81,26 Z" fill="${hatI?.color}"/>
      <rect x="18" y="24" width="64" height="7" rx="3.5" fill="${hatI?.color}"/>
      <ellipse cx="69" cy="24" rx="19" ry="4.5" fill="${hatI?.color}"/>`,
    hat_crown:`<rect x="19" y="25" width="62" height="7" rx="2.5" fill="${hatI?.color}"/>
      <path d="M19,25 L19,12 L34,20 L50,6 L66,20 L81,12 L81,25 Z" fill="${hatI?.color}"/>
      <circle cx="50" cy="7" r="5" fill="#e74c3c"/>
      <circle cx="34" cy="20" r="4" fill="#3498db"/>
      <circle cx="66" cy="20" r="4" fill="#2ecc71"/>`,
    hat_bow:`<path d="M25,18 L39,8 L50,18 L39,28 Z" fill="${hatI?.color}"/>
      <path d="M75,18 L61,8 L50,18 L61,28 Z" fill="${hatI?.color}"/>
      <circle cx="50" cy="18" r="8" fill="white"/>
      <circle cx="50" cy="18" r="5" fill="${hatI?.color}"/>`,
    hat_beanie:`<path d="M19,28 Q18,7 50,5 Q82,7 81,28 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="28" rx="31" ry="6.5" fill="${hatI?.color}" opacity="0.85"/>
      <circle cx="50" cy="5" r="7" fill="${hatI?.color}" opacity="0.75"/>`,
    hat_witch:`<ellipse cx="50" cy="30" rx="33" ry="7" fill="${hatI?.color}"/>
      <path d="M37,30 Q44,12 50,2 Q56,12 63,30 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="24" rx="7" ry="2.5" fill="rgba(130,0,200,.5)"/>
      <circle cx="50" cy="2" r="3.5" fill="#b040f0"/>`,
    hat_flower:`<ellipse cx="50" cy="9" rx="8" ry="6" fill="${hatI?.color}"/>
      <ellipse cx="39" cy="9" rx="7" ry="5" fill="${hatI?.color}" opacity="0.85"/>
      <ellipse cx="61" cy="9" rx="7" ry="5" fill="${hatI?.color}" opacity="0.85"/>
      <ellipse cx="44" cy="3" rx="7" ry="5" fill="${hatI?.color}"/>
      <ellipse cx="56" cy="3" rx="7" ry="5" fill="${hatI?.color}"/>
      <circle cx="50" cy="7" r="5" fill="#fff4a0"/>`,
    hat_party:`<path d="M37,32 L50,2 L63,32 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="32" rx="13" ry="5" fill="${hatI?.color}" opacity="0.7"/>
      <circle cx="50" cy="2" r="4" fill="rgba(255,255,255,.9)"/>
      <circle cx="40" cy="25" r="2.5" fill="#e74c3c"/>
      <circle cx="53" cy="16" r="2.5" fill="#2ecc71"/>
      <circle cx="46" cy="22" r="2" fill="#3498db"/>
      <circle cx="58" cy="23" r="2" fill="#f39c12"/>`,
    hat_halo:`
      <ellipse cx="50" cy="6" rx="24" ry="7" fill="none" stroke="${hatI?.color}" stroke-width="5" opacity="0.9"/>
      <ellipse cx="50" cy="6" rx="24" ry="7" fill="none" stroke="rgba(255,255,200,.7)" stroke-width="2"/>
      <line x1="41" y1="9" x2="40" y2="17" stroke="${hatI?.color}" stroke-width="2" opacity="0.55"/>
      <line x1="59" y1="9" x2="60" y2="17" stroke="${hatI?.color}" stroke-width="2" opacity="0.55"/>`,
    hat_helmet:`
      <path d="M19,30 Q18,4 50,3 Q82,4 81,30 Z" fill="${hatI?.color}"/>
      <rect x="18" y="27" width="64" height="8" rx="4" fill="${hatI?.color}" opacity="0.85"/>
      <line x1="32" y1="5" x2="32" y2="30" stroke="rgba(255,255,255,.28)" stroke-width="2.5"/>
      <line x1="50" y1="3" x2="50" y2="30" stroke="rgba(255,255,255,.28)" stroke-width="2.5"/>
      <line x1="68" y1="5" x2="68" y2="30" stroke="rgba(255,255,255,.28)" stroke-width="2.5"/>`,
    hat_catears:`
      <rect x="18" y="27" width="64" height="6" rx="3" fill="${hatI?.color}"/>
      <path d="M24,27 L31,8 L41,27 Z" fill="${hatI?.color}"/>
      <path d="M59,27 L69,8 L76,27 Z" fill="${hatI?.color}"/>
      <path d="M27,26 L31,12 L39,26 Z" fill="rgba(255,200,220,.72)"/>
      <path d="M61,26 L69,12 L73,26 Z" fill="rgba(255,200,220,.72)"/>`,
    hat_tophat:`<rect x="29" y="14" width="42" height="18" rx="3" fill="${hatI?.color}"/>
      <rect x="22" y="30" width="56" height="6" rx="3" fill="${hatI?.color}"/>
      <rect x="32" y="12" width="36" height="5" rx="2" fill="rgba(255,255,255,.18)"/>`,
    hat_beret:`<ellipse cx="50" cy="20" rx="26" ry="16" fill="${hatI?.color}"/>
      <ellipse cx="62" cy="12" rx="5" ry="4" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="29" rx="27" ry="5" fill="${hatI?.color}" opacity="0.7"/>`,
    hat_cowboy:`<ellipse cx="50" cy="28" rx="34" ry="8" fill="${hatI?.color}"/>
      <path d="M24,27 Q24,6 50,5 Q76,6 76,27 Z" fill="${hatI?.color}"/>
      <path d="M26,18 Q18,28 16,28" stroke="${hatI?.color}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M74,18 Q82,28 84,28" stroke="${hatI?.color}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    hat_pirate:`<path d="M20,28 L30,8 L70,8 L80,28 Z" fill="${hatI?.color}"/>
      <rect x="20" y="26" width="60" height="6" rx="3" fill="${hatI?.color}" opacity="0.7"/>
      <circle cx="50" cy="12" r="5" fill="white"/>
      <path d="M47,9 L53,9 M50,6 L50,12" stroke="${hatI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    hat_chef:`<path d="M24,30 Q22,10 50,6 Q78,10 76,30 Z" fill="${hatI?.color}"/>
      <rect x="22" y="27" width="56" height="7" rx="2" fill="#ddd"/>
      <ellipse cx="50" cy="6" rx="12" ry="9" fill="${hatI?.color}"/>`,
    hat_santa:`<path d="M24,30 Q26,14 50,8 L72,25 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="30" rx="28" ry="6" fill="white"/>
      <circle cx="72" cy="25" r="5" fill="white"/>`,
    hat_graduation:`<rect x="20" y="28" width="60" height="8" rx="2" fill="${hatI?.color}"/>
      <rect x="28" y="12" width="44" height="18" rx="2" fill="${hatI?.color}"/>
      <line x1="50" y1="12" x2="65" y2="22" stroke="#f1c40f" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="65" cy="22" r="4" fill="#f1c40f"/>`,
    hat_headband:`<rect x="18" y="26" width="64" height="8" rx="4" fill="${hatI?.color}"/>`,
    hat_tiara:`<rect x="26" y="27" width="48" height="5" rx="2.5" fill="${hatI?.color}"/>
      <path d="M26,27 L32,14 L38,27 Z" fill="${hatI?.color}"/>
      <path d="M44,27 L50,11 L56,27 Z" fill="${hatI?.color}"/>
      <path d="M62,27 L68,14 L74,27 Z" fill="${hatI?.color}"/>
      <circle cx="50" cy="11" r="3.5" fill="white"/>
      <circle cx="32" cy="14" r="2.5" fill="white"/>
      <circle cx="68" cy="14" r="2.5" fill="white"/>`,
    hat_antler:`<path d="M30,28 L26,14 L22,8 M26,14 L20,12 M26,14 L24,6" stroke="${hatI?.color}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M70,28 L74,14 L78,8 M74,14 L80,12 M74,14 L76,6" stroke="${hatI?.color}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    hat_bunnyears:`<rect x="20" y="28" width="60" height="5" rx="2.5" fill="${hatI?.color}"/>
      <ellipse cx="35" cy="10" rx="7" ry="18" fill="${hatI?.color}"/>
      <ellipse cx="65" cy="10" rx="7" ry="18" fill="${hatI?.color}"/>
      <ellipse cx="35" cy="10" rx="4" ry="13" fill="rgba(255,180,200,.65)"/>
      <ellipse cx="65" cy="10" rx="4" ry="13" fill="rgba(255,180,200,.65)"/>`,
    hat_devil:`<path d="M28,28 L22,14 L34,24 Z" fill="${hatI?.color}"/>
      <path d="M72,28 L78,14 L66,24 Z" fill="${hatI?.color}"/>`,
    hat_mushroom:`<ellipse cx="50" cy="22" rx="30" ry="18" fill="${hatI?.color}"/>
      <path d="M32,24 Q32,35 35,35 L65,35 Q68,35 68,24 Z" fill="#fde8d8"/>
      <circle cx="38" cy="16" r="5" fill="rgba(255,255,255,.5)"/>
      <circle cx="55" cy="12" r="4" fill="rgba(255,255,255,.5)"/>
      <circle cx="66" cy="19" r="3" fill="rgba(255,255,255,.5)"/>`,
    hat_propeller:`<rect x="22" y="27" width="56" height="7" rx="3.5" fill="${hatI?.color}"/>
      <path d="M26,18 Q24,8 50,6 Q76,8 74,18 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="5" rx="4" ry="3" fill="#aaa"/>
      <rect x="42" y="2" width="16" height="4" rx="2" fill="#5dade2" transform="rotate(-20,50,4)"/>
      <rect x="42" y="2" width="16" height="4" rx="2" fill="#e74c3c" transform="rotate(70,50,4)"/>`,
    hat_straw:`<ellipse cx="50" cy="26" rx="36" ry="7" fill="${hatI?.color}"/>
      <path d="M26,24 Q26,10 50,8 Q74,10 74,24 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="24" rx="25" ry="4" fill="rgba(0,0,0,.1)"/>`,
    hat_warrior:`<path d="M16,28 Q15,4 50,2 Q85,4 84,28 Z" fill="${hatI?.color}"/>
      <rect x="16" y="25" width="68" height="8" rx="3" fill="${hatI?.color}" opacity="0.7"/>
      <path d="M44,2 L44,28" stroke="rgba(255,255,255,.25)" stroke-width="3"/>
      <path d="M50,2 L50,28" stroke="rgba(255,255,255,.25)" stroke-width="3"/>
      <path d="M56,2 L56,28" stroke="rgba(255,255,255,.25)" stroke-width="3"/>
      <rect x="40" y="24" width="20" height="8" rx="2" fill="${hatI?.color}" opacity="0.85"/>`,
    hat_astronaut:`<path d="M14,30 Q12,2 50,0 Q88,2 86,30 Z" fill="rgba(220,230,240,.95)" stroke="${hatI?.color}" stroke-width="2"/>
      <rect x="14" y="27" width="72" height="7" rx="3.5" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="16" rx="22" ry="17" fill="rgba(100,180,255,.25)" stroke="rgba(100,160,255,.5)" stroke-width="1.5"/>`,
    hat_diamond_crown:`<rect x="19" y="27" width="62" height="6" rx="2.5" fill="${hatI?.color}"/>
      <path d="M19,27 L19,12 L31,21 L50,4 L69,21 L81,12 L81,27 Z" fill="${hatI?.color}"/>
      <circle cx="50" cy="5" r="5.5" fill="white" opacity="0.8"/>
      <circle cx="31" cy="21" r="3.5" fill="white" opacity="0.7"/>
      <circle cx="69" cy="21" r="3.5" fill="white" opacity="0.7"/>`,
    hat_flower_crown:`<rect x="20" y="28" width="60" height="5" rx="2.5" fill="${hatI?.color}"/>
      <circle cx="28" cy="24" r="7" fill="#e74c3c"/>
      <circle cx="40" cy="18" r="7" fill="#f39c12"/>
      <circle cx="52" cy="15" r="7" fill="#e91e63"/>
      <circle cx="64" cy="18" r="7" fill="#9b59b6"/>
      <circle cx="74" cy="24" r="7" fill="#3498db"/>
      <circle cx="28" cy="24" r="3" fill="#fff7a0"/>
      <circle cx="40" cy="18" r="3" fill="#fff7a0"/>
      <circle cx="52" cy="15" r="3" fill="#fff7a0"/>
      <circle cx="64" cy="18" r="3" fill="#fff7a0"/>
      <circle cx="74" cy="24" r="3" fill="#fff7a0"/>`,
    hat_fox_ears:`<rect x="20" y="28" width="60" height="5" rx="2.5" fill="${hatI?.color}"/>
      <path d="M22,27 L28,6 L40,27 Z" fill="${hatI?.color}"/>
      <path d="M60,27 L72,6 L78,27 Z" fill="${hatI?.color}"/>
      <path d="M25,26 L29,12 L38,26 Z" fill="rgba(255,255,255,.6)"/>
      <path d="M62,26 L71,12 L75,26 Z" fill="rgba(255,255,255,.6)"/>`,
    hat_bear_ears:`<rect x="20" y="28" width="60" height="5" rx="2.5" fill="${hatI?.color}"/>
      <circle cx="30" cy="20" r="11" fill="${hatI?.color}"/>
      <circle cx="70" cy="20" r="11" fill="${hatI?.color}"/>
      <circle cx="30" cy="20" r="7" fill="rgba(255,165,140,.45)"/>
      <circle cx="70" cy="20" r="7" fill="rgba(255,165,140,.45)"/>`,
    hat_ushanka:`<path d="M20,28 Q20,12 50,10 Q80,12 80,28 Z" fill="${hatI?.color}"/>
      <rect x="14" y="24" width="72" height="8" rx="4" fill="${hatI?.color}" opacity="0.85"/>
      <ellipse cx="50" cy="28" rx="32" ry="5" fill="${hatI?.color}" opacity="0.7"/>`,
    hat_hardhat:`<path d="M17,28 Q16,8 50,6 Q84,8 83,28 Z" fill="${hatI?.color}"/>
      <rect x="14" y="25" width="72" height="7" rx="3.5" fill="${hatI?.color}" opacity="0.8"/>
      <rect x="40" y="6" width="20" height="5" rx="2" fill="rgba(255,255,255,.4)"/>`,
    hat_ninja:`<rect x="15" y="20" width="70" height="14" rx="3" fill="${hatI?.color}"/>
      <rect x="15" y="14" width="70" height="8" rx="3" fill="${hatI?.color}" opacity="0.85"/>
      <path d="M85,20 Q95,26 90,34 L80,30 Z" fill="${hatI?.color}"/>`,
    hat_laurel:`<path d="M18,28 Q12,16 18,10 Q24,4 30,10 Q36,4 42,10 Q48,4 50,10 Q52,4 58,10 Q64,4 70,10 Q76,4 82,10 Q88,16 82,28" fill="none" stroke="${hatI?.color}" stroke-width="6" stroke-linecap="round"/>`,
    hat_captain:`<path d="M22,28 Q22,10 50,8 Q78,10 78,28 Z" fill="${hatI?.color}"/>
      <rect x="20" y="25" width="60" height="7" rx="3.5" fill="${hatI?.color}" opacity="0.8"/>
      <ellipse cx="62" cy="24" rx="16" ry="4" fill="${hatI?.color}"/>
      <path d="M38,18 L46,18 M50,14 L50,22" stroke="rgba(255,220,0,.9)" stroke-width="2.5" stroke-linecap="round"/>`,
    hat_turban:`<path d="M20,28 Q20,10 50,8 Q80,10 80,28 Z" fill="${hatI?.color}"/>
      <path d="M20,20 Q35,14 50,16 Q65,14 80,20" stroke="rgba(255,255,255,.4)" stroke-width="5" fill="none"/>
      <circle cx="50" cy="12" r="6" fill="rgba(255,255,180,.7)"/>`,
    hat_headphone:`<rect x="24" y="26" width="52" height="6" rx="3" fill="${hatI?.color}"/>
      <path d="M24,28 Q22,10 50,8 Q78,10 76,28" stroke="${hatI?.color}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="14" y="22" width="12" height="14" rx="6" fill="${hatI?.color}"/>
      <rect x="74" y="22" width="12" height="14" rx="6" fill="${hatI?.color}"/>`,
    hat_ear_muffs:`<path d="M24,30 Q22,16 50,14 Q78,16 76,30" stroke="${hatI?.color}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="30" r="9" fill="${hatI?.color}"/>
      <circle cx="78" cy="30" r="9" fill="${hatI?.color}"/>`,
    hat_sailor:`<path d="M22,28 Q22,12 50,10 Q78,12 78,28 Z" fill="${hatI?.color}"/>
      <rect x="18" y="25" width="64" height="7" rx="3.5" fill="white"/>
      <rect x="18" y="25" width="64" height="3" rx="1.5" fill="${hatI?.color}"/>
      <rect x="18" y="30" width="64" height="2" rx="1" fill="${hatI?.color}"/>`,
    hat_horns:`<path d="M28,28 L20,4 Q30,12 38,28 Z" fill="${hatI?.color}"/>
      <path d="M72,28 L80,4 Q70,12 62,28 Z" fill="${hatI?.color}"/>`,
    hat_ice_crown:`<rect x="20" y="27" width="60" height="6" rx="2.5" fill="${hatI?.color}" opacity="0.85"/>
      <path d="M20,27 L20,14 L30,22 L40,10 L50,22 L60,10 L70,22 L80,14 L80,27 Z" fill="${hatI?.color}" opacity="0.75"/>
      <path d="M20,27 L20,14 L30,22 L40,10 L50,22 L60,10 L70,22 L80,14 L80,27 Z" fill="rgba(255,255,255,.35)"/>`,
    hat_star_band:`<rect x="18" y="26" width="64" height="7" rx="3.5" fill="${hatI?.color}"/>
      <path d="M50,10 l2.8,5.8 l6.2,0 l-5,3.8 l1.9,5.8 l-5.9,-4 l-5.9,4 l1.9,-5.8 l-5,-3.8 l6.2,0 Z" fill="${hatI?.color}"/>
      <path d="M30,14 l2,4.2 l4.4,0 l-3.6,2.7 l1.4,4.2 l-4.2,-2.9 l-4.2,2.9 l1.4,-4.2 l-3.6,-2.7 l4.4,0 Z" fill="${hatI?.color}" opacity="0.7"/>
      <path d="M70,14 l2,4.2 l4.4,0 l-3.6,2.7 l1.4,4.2 l-4.2,-2.9 l-4.2,2.9 l1.4,-4.2 l-3.6,-2.7 l4.4,0 Z" fill="${hatI?.color}" opacity="0.7"/>`,
    hat_pumpkin:`<path d="M32,28 Q30,10 42,8 Q50,6 58,8 Q70,10 68,28 Z" fill="${hatI?.color}"/>
      <path d="M24,22 Q22,10 32,8" stroke="${hatI?.color}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M76,22 Q78,10 68,8" stroke="${hatI?.color}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M46,8 L48,3 L52,3 L54,8" stroke="${hatI?.color}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    hat_bandana:`<path d="M18,32 Q50,20 82,32 L82,36 Q50,24 18,36 Z" fill="${hatI?.color}"/>
      <path d="M18,32 Q50,22 82,32" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/>`,
    hat_music_note:`<rect x="20" y="26" width="60" height="6" rx="3" fill="${hatI?.color}"/>
      <path d="M46,8 L46,20 Q42,18 40,20 Q38,22 40,24 Q44,26 46,22 L46,14 L56,11 L56,22 Q52,20 50,22 Q48,24 50,26 Q54,28 56,24 L56,8 Z" fill="${hatI?.color}"/>`,
    hat_rainbow_bow:`<path d="M20,22 L34,10 L50,22 L34,34 Z" fill="#e74c3c"/>
      <path d="M80,22 L66,10 L50,22 L66,34 Z" fill="#3498db"/>
      <circle cx="50" cy="22" r="9" fill="white"/>
      <circle cx="50" cy="22" r="6" fill="${hatI?.color}"/>`,
    hat_bubble:`<ellipse cx="50" cy="18" rx="26" ry="18" fill="${hatI?.color}" opacity="0.6"/>
      <ellipse cx="50" cy="18" rx="26" ry="18" fill="rgba(255,255,255,.3)" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/>
      <ellipse cx="40" cy="10" rx="8" ry="5" fill="rgba(255,255,255,.45)" transform="rotate(-20,40,10)"/>`,
    hat_lion_mane:`<circle cx="50" cy="38" r="40" fill="#c47800" opacity="0.75"/>
      <circle cx="50" cy="38" r="35" fill="#e8a020" opacity="0.6"/>`,
    hat_sunhat:`<ellipse cx="50" cy="26" rx="38" ry="8" fill="${hatI?.color}"/>
      <path d="M24,25 Q24,10 50,8 Q76,10 76,25 Z" fill="${hatI?.color}"/>
      <ellipse cx="50" cy="25" rx="27" ry="4.5" fill="rgba(0,0,0,.12)"/>
      <path d="M24,26 Q50,20 76,26" stroke="rgba(255,255,255,.3)" stroke-width="2" fill="none"/>`,
  };
  const hatSVG=hatI?(hatMap[hatI.id]||''):'';

  const accMap={
    acc_glasses:`<circle cx="${ex1}" cy="${ey1}" r="11" fill="rgba(180,220,255,.12)" stroke="${accI?.color}" stroke-width="2.5"/>
      <circle cx="${ex2}" cy="${ey2}" r="11" fill="rgba(180,220,255,.12)" stroke="${accI?.color}" stroke-width="2.5"/>
      <line x1="19" y1="${ey1}" x2="25" y2="${ey1}" stroke="${accI?.color}" stroke-width="2.2"/>
      <line x1="47" y1="${ey1}" x2="53" y2="${ey1}" stroke="${accI?.color}" stroke-width="2.2"/>
      <line x1="75" y1="${ey2}" x2="81" y2="${ey2}" stroke="${accI?.color}" stroke-width="2.2"/>`,
    acc_medal:`<line x1="50" y1="70" x2="50" y2="87" stroke="#c0c8d0" stroke-width="2.5"/>
      <circle cx="50" cy="93" r="10" fill="${accI?.color}"/>
      <circle cx="50" cy="93" r="7" fill="#fff7e0"/>
      <text x="50" y="97" text-anchor="middle" font-size="9" fill="${accI?.color}" font-weight="bold">★</text>`,
    acc_wings:`<path d="M29,84 Q6,66 3,50 Q10,70 25,81 Z" fill="rgba(255,255,255,.95)" stroke="#c8d4e0" stroke-width="1.2"/>
      <path d="M71,84 Q94,66 97,50 Q90,70 75,81 Z" fill="rgba(255,255,255,.95)" stroke="#c8d4e0" stroke-width="1.2"/>`,
    acc_rope:`<path d="M11,107 Q30,96 50,100 Q70,104 89,93" fill="none" stroke="${accI?.color}" stroke-width="3.8" stroke-linecap="round"/>`,
    acc_star:`<line x1="50" y1="72" x2="54" y2="94" stroke="#d4a020" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="56" cy="100" r="8.5" fill="${accI?.color}"/>
      <path d="M56,92 l2,4 l4.2,0 l-3.4,2.6 l1.3,4 l-4,-2.8 l-4,2.8 l1.3,-4 l-3.4,-2.6 l4.2,0 Z" fill="white"/>`,
    acc_balloon:`<line x1="50" y1="72" x2="47" y2="60" stroke="#aaa" stroke-width="1.5"/>
      <circle cx="47" cy="51" r="12" fill="${accI?.color}" opacity="0.9"/>
      <ellipse cx="43" cy="47" rx="4.5" ry="3" fill="rgba(255,255,255,.42)"/>`,
    acc_candy:`<rect x="55" y="60" width="5" height="20" rx="2.5" fill="#d8d8d8"/>
      <rect x="55" y="58" width="5" height="5" rx="2" fill="${accI?.color}"/>
      <rect x="55" y="66" width="5" height="5" rx="2" fill="${accI?.color}"/>
      <rect x="55" y="74" width="5" height="5" rx="2" fill="${accI?.color}"/>
      <circle cx="57" cy="55" r="8.5" fill="${accI?.color}"/>
      <ellipse cx="53" cy="51" rx="4" ry="3" fill="rgba(255,255,255,.42)"/>`,
    acc_scarf:`<path d="M22,64 Q50,55 78,64 Q82,70 78,72 Q50,63 22,72 Q18,70 22,64 Z" fill="${accI?.color}"/>
      <path d="M27,72 Q32,76 30,86 L20,90 L18,80 Z" fill="${accI?.color}"/>`,
    acc_trophy:`<rect x="72" y="82" width="4" height="18" rx="2" fill="${accI?.color}" opacity="0.88"/>
      <rect x="68" y="98" width="12" height="4" rx="2" fill="${accI?.color}"/>
      <circle cx="74" cy="76" r="10" fill="${accI?.color}"/>
      <circle cx="74" cy="76" r="6.5" fill="rgba(255,255,220,.82)"/>
      <path d="M68,78 Q64,70 66,78" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M80,78 Q84,70 82,78" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_lightning:`<path d="M55,28 L44,50 L52,50 L41,72 L60,46 L51,46 Z" fill="${accI?.color}" opacity="0.92"/>
      <path d="M55,28 L44,50 L52,50 L41,72 L60,46 L51,46 Z" fill="white" opacity="0.25"/>`,
    acc_fire:`<path d="M50,18 Q56,28 60,24 Q62,36 55,38 Q63,36 62,46 Q57,54 50,55 Q43,54 38,46 Q37,36 45,38 Q38,36 40,24 Q44,28 50,18 Z" fill="${accI?.color}" opacity="0.88"/>
      <path d="M50,26 Q53,32 55,29 Q56,37 52,39 Q56,37 55,44 Q52,49 50,50 Q48,49 45,44 Q44,37 48,39 Q44,37 45,29 Q47,32 50,26 Z" fill="#ffe060" opacity="0.72"/>`,
    acc_bow_tie:`<path d="M26,63 L38,56 L50,63 L38,70 Z" fill="${accI?.color}"/>
      <path d="M74,63 L62,56 L50,63 L62,70 Z" fill="${accI?.color}"/>
      <circle cx="50" cy="63" r="5" fill="${accI?.color}" opacity="0.85"/>
      <circle cx="50" cy="63" r="3" fill="rgba(255,255,255,.4)"/>`,
    acc_necklace:`<path d="M28,68 Q50,80 72,68" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="78" r="5" fill="${accI?.color}"/>
      <circle cx="40" cy="75" r="3" fill="${accI?.color}" opacity="0.7"/>
      <circle cx="60" cy="75" r="3" fill="${accI?.color}" opacity="0.7"/>`,
    acc_backpack:`<rect x="35" y="70" width="22" height="30" rx="6" fill="${accI?.color}" opacity="0.88"/>
      <rect x="38" y="72" width="16" height="12" rx="3" fill="rgba(255,255,255,.25)"/>
      <line x1="35" y1="73" x2="35" y2="100" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`,
    acc_umbrella:`<path d="M50,30 Q22,40 22,55 Q22,56 30,56 Q30,40 50,36 Q70,40 70,56 Q78,56 78,55 Q78,40 50,30 Z" fill="${accI?.color}" opacity="0.88"/>
      <line x1="50" y1="36" x2="50" y2="90" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M50,88 Q45,95 52,95" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_book:`<rect x="32" y="75" width="22" height="28" rx="3" fill="${accI?.color}"/>
      <rect x="36" y="75" width="18" height="28" rx="2" fill="rgba(255,255,255,.85)"/>
      <line x1="38" y1="82" x2="52" y2="82" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>
      <line x1="38" y1="87" x2="52" y2="87" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>
      <line x1="38" y1="92" x2="52" y2="92" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>`,
    acc_guitar:`<ellipse cx="64" cy="96" rx="10" ry="12" fill="${accI?.color}"/>
      <ellipse cx="64" cy="82" rx="7" ry="8" fill="${accI?.color}"/>
      <line x1="64" y1="68" x2="64" y2="108" stroke="${accI?.color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="74" x2="68" y2="74" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
      <line x1="60" y1="77" x2="68" y2="77" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
      <line x1="60" y1="80" x2="68" y2="80" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>`,
    acc_sword:`<line x1="68" y1="40" x2="38" y2="110" stroke="${accI?.color}" stroke-width="4" stroke-linecap="round"/>
      <line x1="58" y1="62" x2="48" y2="70" stroke="${accI?.color}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="40" cy="112" rx="4" ry="5" fill="${accI?.color}" opacity="0.7"/>`,
    acc_shield:`<path d="M25,72 L25,94 Q25,106 38,112 L50,117 L62,112 Q75,106 75,94 L75,72 Z" fill="${accI?.color}" opacity="0.88"/>
      <path d="M30,75 L30,93 Q30,103 40,108 L50,112 L60,108 Q70,103 70,93 L70,75 Z" fill="rgba(255,255,255,.2)"/>
      <path d="M50,76 L50,112 M30,90 L70,90" stroke="rgba(255,255,255,.4)" stroke-width="2.5"/>`,
    acc_wand:`<line x1="38" y1="36" x2="64" y2="110" stroke="${accI?.color}" stroke-width="4" stroke-linecap="round"/>
      <path d="M38,36 l3,8 l8,0 l-6.5,4.5 l2.5,7.5 l-7,-5 l-7,5 l2.5,-7.5 l-6.5,-4.5 l8,0 Z" fill="${accI?.color}"/>`,
    acc_microphone:`<ellipse cx="65" cy="76" rx="7" ry="10" fill="${accI?.color}"/>
      <line x1="65" y1="86" x2="65" y2="105" stroke="${accI?.color}" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M58,100 Q65,108 72,100" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_heart_glasses:`<path d="M${ex1-5},${ey1-2} Q${ex1-5},${ey1-9} ${ex1},${ey1-4} Q${ex1+5},${ey1-9} ${ex1+5},${ey1-2} L${ex1},${ey1+3} Z" fill="${accI?.color}" opacity="0.85"/>
      <path d="M${ex2-5},${ey2-2} Q${ex2-5},${ey2-9} ${ex2},${ey2-4} Q${ex2+5},${ey2-9} ${ex2+5},${ey2-2} L${ex2},${ey2+3} Z" fill="${accI?.color}" opacity="0.85"/>
      <line x1="${ex1+5}" y1="${ey1}" x2="${ex2-5}" y2="${ey2}" stroke="${accI?.color}" stroke-width="2"/>`,
    acc_lantern:`<line x1="64" y1="70" x2="64" y2="78" stroke="${accI?.color}" stroke-width="2.5"/>
      <rect x="56" y="78" width="16" height="22" rx="5" fill="${accI?.color}" opacity="0.85"/>
      <rect x="58" y="80" width="12" height="18" rx="3" fill="rgba(255,240,150,.7)"/>`,
    acc_gem:`<path d="M50,30 L62,42 L56,58 L44,58 L38,42 Z" fill="${accI?.color}" opacity="0.88"/>
      <path d="M50,30 L62,42 L50,44 Z" fill="rgba(255,255,255,.4)"/>
      <path d="M38,42 L50,44 L44,58 Z" fill="rgba(0,0,0,.1)"/>`,
    acc_clover:`<circle cx="50" cy="34" r="7" fill="${accI?.color}"/>
      <circle cx="50" cy="50" r="7" fill="${accI?.color}"/>
      <circle cx="42" cy="42" r="7" fill="${accI?.color}"/>
      <circle cx="58" cy="42" r="7" fill="${accI?.color}"/>
      <line x1="50" y1="50" x2="50" y2="70" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_music_note:`<path d="M58,30 L58,55 Q54,52 50,54 Q46,56 46,60 Q46,64 50,64 Q54,64 58,61 L58,38 L68,35 L68,48 Q64,45 60,47 Q58,30 58,30 Z" fill="${accI?.color}" opacity="0.88"/>`,
    acc_heart_balloon:`<path d="M50,32 Q44,26 42,32 Q40,40 50,46 Q60,40 58,32 Q56,26 50,32 Z" fill="${accI?.color}" opacity="0.88"/>
      <line x1="50" y1="46" x2="50" y2="80" stroke="#aaa" stroke-width="1.5"/>`,
    acc_ice_cream:`<rect x="47" y="58" width="6" height="20" rx="3" fill="#f5deb3"/>
      <ellipse cx="50" cy="58" rx="10" ry="12" fill="${accI?.color}" opacity="0.9"/>
      <ellipse cx="46" cy="53" rx="5" ry="4" fill="rgba(255,255,255,.4)"/>`,
    acc_donut:`<ellipse cx="62" cy="82" rx="11" ry="8" fill="${accI?.color}" opacity="0.9"/>
      <ellipse cx="62" cy="82" rx="5" ry="4" fill="#f8e8d0"/>
      <circle cx="57" cy="78" r="1.5" fill="#e91e63" opacity="0.7"/>
      <circle cx="64" cy="76" r="1.5" fill="#3498db" opacity="0.7"/>
      <circle cx="68" cy="82" r="1.5" fill="#f39c12" opacity="0.7"/>`,
    acc_sunflower:`<circle cx="60" cy="68" r="10" fill="${accI?.color}"/>
      <circle cx="60" cy="68" r="6" fill="#8b4513"/>
      <ellipse cx="60" cy="55" rx="4" ry="7" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="73" cy="58" rx="4" ry="7" fill="${accI?.color}" opacity="0.8" transform="rotate(60,73,58)"/>
      <ellipse cx="73" cy="78" rx="4" ry="7" fill="${accI?.color}" opacity="0.8" transform="rotate(-60,73,78)"/>
      <ellipse cx="60" cy="81" rx="4" ry="7" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="47" cy="78" rx="4" ry="7" fill="${accI?.color}" opacity="0.8" transform="rotate(60,47,78)"/>
      <ellipse cx="47" cy="58" rx="4" ry="7" fill="${accI?.color}" opacity="0.8" transform="rotate(-60,47,58)"/>
      <line x1="60" y1="78" x2="58" y2="110" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_butterfly:`<path d="M50,60 Q34,46 28,52 Q24,58 36,64 Q44,68 50,68 Z" fill="${accI?.color}" opacity="0.85"/>
      <path d="M50,60 Q66,46 72,52 Q76,58 64,64 Q56,68 50,68 Z" fill="${accI?.color}" opacity="0.85"/>
      <path d="M50,68 Q36,72 30,80 Q28,88 40,84 Q46,82 50,80 Z" fill="${accI?.color}" opacity="0.7"/>
      <path d="M50,68 Q64,72 70,80 Q72,88 60,84 Q54,82 50,80 Z" fill="${accI?.color}" opacity="0.7"/>
      <line x1="50" y1="58" x2="50" y2="82" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round"/>`,
    acc_snowflake:`<line x1="50" y1="28" x2="50" y2="70" stroke="${accI?.color}" stroke-width="2.5"/>
      <line x1="28" y1="49" x2="72" y2="49" stroke="${accI?.color}" stroke-width="2.5"/>
      <line x1="34" y1="34" x2="66" y2="64" stroke="${accI?.color}" stroke-width="2.5"/>
      <line x1="34" y1="64" x2="66" y2="34" stroke="${accI?.color}" stroke-width="2.5"/>
      <circle cx="50" cy="49" r="4" fill="${accI?.color}"/>`,
    acc_soccer_ball:`<circle cx="62" cy="96" r="13" fill="${accI?.color}" stroke="white" stroke-width="1.5"/>
      <path d="M62,84 L60,90 L64,90 Z M55,92 L58,96 L55,100 M69,92 L66,96 L69,100 M58,102 L62,98 L66,102" fill="rgba(0,0,0,.4)"/>`,
    acc_basketball_ball:`<circle cx="62" cy="96" r="13" fill="${accI?.color}"/>
      <path d="M50,96 Q62,84 74,96" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>
      <path d="M50,96 Q62,108 74,96" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>
      <line x1="62" y1="83" x2="62" y2="109" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>`,
    acc_skateboard:`<rect x="28" y="100" width="44" height="8" rx="4" fill="${accI?.color}"/>
      <circle cx="36" cy="110" r="4" fill="#555"/>
      <circle cx="64" cy="110" r="4" fill="#555"/>`,
    acc_diamond:`<path d="M50,22 L64,34 L60,52 L40,52 L36,34 Z" fill="${accI?.color}" opacity="0.9"/>
      <path d="M50,22 L64,34 L50,38 Z" fill="rgba(255,255,255,.45)"/>
      <path d="M36,34 L50,38 L40,52 Z" fill="rgba(0,0,0,.08)"/>
      <path d="M50,38 L64,34 L60,52 Z" fill="rgba(0,0,0,.05)"/>`,
    acc_coin_bag:`<ellipse cx="62" cy="96" rx="12" ry="14" fill="${accI?.color}" opacity="0.88"/>
      <line x1="62" y1="82" x2="60" y2="76" stroke="${accI?.color}" stroke-width="3" stroke-linecap="round"/>
      <text x="62" y="101" text-anchor="middle" font-size="10" font-weight="900" fill="rgba(255,255,255,.85)">$</text>`,
    acc_potion:`<ellipse cx="62" cy="92" rx="10" ry="12" fill="${accI?.color}" opacity="0.85"/>
      <rect x="59" y="78" width="6" height="12" rx="3" fill="${accI?.color}" opacity="0.7"/>
      <rect x="57" y="76" width="10" height="5" rx="2" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="62" cy="92" rx="5" ry="5" fill="rgba(255,255,255,.35)"/>`,
    acc_scroll:`<rect x="38" y="72" width="24" height="30" rx="3" fill="#f5deb3"/>
      <rect x="36" y="70" width="6" height="34" rx="3" fill="${accI?.color}" opacity="0.8"/>
      <rect x="58" y="70" width="6" height="34" rx="3" fill="${accI?.color}" opacity="0.8"/>
      <line x1="42" y1="80" x2="58" y2="80" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>
      <line x1="42" y1="86" x2="58" y2="86" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>
      <line x1="42" y1="92" x2="58" y2="92" stroke="${accI?.color}" stroke-width="1.5" opacity="0.5"/>`,
    acc_leaf:`<path d="M58,40 Q80,50 72,72 Q60,80 50,72 Q38,62 42,46 Q50,38 58,40 Z" fill="${accI?.color}" opacity="0.88"/>
      <line x1="54" y1="44" x2="52" y2="72" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
      <line x1="46" y1="52" x2="62" y2="58" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>
      <line x1="44" y1="60" x2="64" y2="64" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>`,
    acc_rainbow:`<path d="M24,65 Q24,38 50,38 Q76,38 76,65" fill="none" stroke="#e74c3c" stroke-width="5" stroke-linecap="round"/>
      <path d="M28,65 Q28,44 50,44 Q72,44 72,65" fill="none" stroke="#f39c12" stroke-width="5" stroke-linecap="round"/>
      <path d="M32,65 Q32,50 50,50 Q68,50 68,65" fill="none" stroke="#f1c40f" stroke-width="5" stroke-linecap="round"/>
      <path d="M36,65 Q36,54 50,54 Q64,54 64,65" fill="none" stroke="#27ae60" stroke-width="5" stroke-linecap="round"/>
      <path d="M40,65 Q40,58 50,58 Q60,58 60,65" fill="none" stroke="#3498db" stroke-width="5" stroke-linecap="round"/>`,
    acc_camera:`<rect x="36" y="74" width="28" height="22" rx="4" fill="${accI?.color}"/>
      <circle cx="50" cy="85" r="7" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/>
      <circle cx="50" cy="85" r="4" fill="rgba(0,0,0,.4)"/>
      <rect x="42" y="70" width="10" height="6" rx="2" fill="${accI?.color}" opacity="0.8"/>
      <circle cx="60" cy="78" r="2" fill="rgba(255,255,180,.8)"/>`,
    acc_pizza:`<path d="M64,68 L80,100 L48,100 Z" fill="${accI?.color}" opacity="0.88"/>
      <path d="M64,68 L80,100 L48,100 Z" fill="rgba(255,100,50,.3)"/>
      <circle cx="62" cy="87" r="3" fill="#c0392b" opacity="0.7"/>
      <circle cx="70" cy="92" r="2.5" fill="#c0392b" opacity="0.7"/>`,
    acc_apple:`<ellipse cx="62" cy="90" rx="11" ry="13" fill="${accI?.color}" opacity="0.9"/>
      <ellipse cx="55" cy="88" rx="5" ry="4" fill="rgba(255,255,255,.3)"/>
      <path d="M62,77 Q60,72 63,70 Q66,72 62,77" fill="${accI?.color}" stroke="rgba(0,0,0,.2)" stroke-width="1"/>
      <line x1="63" y1="71" x2="65" y2="66" stroke="${accI?.color}" stroke-width="1.5" stroke-linecap="round"/>`,
    acc_mushroom:`<ellipse cx="62" cy="80" rx="14" ry="10" fill="${accI?.color}" opacity="0.9"/>
      <path d="M52,80 Q52,92 56,94 L68,94 Q72,92 72,80 Z" fill="#fde8d8"/>
      <circle cx="56" cy="75" r="3" fill="rgba(255,255,255,.5)"/>
      <circle cx="66" cy="73" r="2.5" fill="rgba(255,255,255,.5)"/>`,
    acc_cloud:`<ellipse cx="50" cy="50" rx="20" ry="12" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="38" cy="55" rx="14" ry="10" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="62" cy="55" rx="14" ry="10" fill="${accI?.color}" opacity="0.8"/>
      <ellipse cx="50" cy="60" rx="22" ry="8" fill="${accI?.color}" opacity="0.8"/>`,
    acc_flower_bouquet:`<line x1="50" y1="68" x2="50" y2="110" stroke="${accI?.color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="60" r="8" fill="${accI?.color}"/>
      <circle cx="40" cy="65" r="7" fill="#e74c3c" opacity="0.85"/>
      <circle cx="60" cy="65" r="7" fill="#f39c12" opacity="0.85"/>
      <circle cx="44" cy="54" r="6" fill="#9b59b6" opacity="0.85"/>
      <circle cx="56" cy="54" r="6" fill="#3498db" opacity="0.85"/>
      <circle cx="50" cy="60" r="3" fill="#fff7a0"/>
      <circle cx="40" cy="65" r="3" fill="#fff7a0"/>
      <circle cx="60" cy="65" r="3" fill="#fff7a0"/>`,
    acc_devil_tail:`<path d="M72,100 Q84,90 82,76 Q78,68 72,74 Q68,80 74,86 Q80,90 72,100" fill="none" stroke="${accI?.color}" stroke-width="4" stroke-linecap="round"/>
      <path d="M72,100 L76,106 L68,104 Z" fill="${accI?.color}"/>`,
    acc_monocle:`<circle cx="${ex2}" cy="${ey2}" r="12" fill="rgba(180,220,255,.1)" stroke="${accI?.color}" stroke-width="2.5"/>
      <line x1="${ex2+12}" y1="${ey2+4}" x2="${ex2+20}" y2="${ey2+14}" stroke="${accI?.color}" stroke-width="2"/>`,
    acc_crown_acc:`<rect x="20" y="25" width="60" height="6" rx="2.5" fill="${accI?.color}" opacity="0.88"/>
      <path d="M20,25 L20,14 L32,20 L50,8 L68,20 L80,14 L80,25 Z" fill="${accI?.color}" opacity="0.88"/>
      <circle cx="50" cy="9" r="4.5" fill="rgba(255,255,255,.8)"/>`,
    acc_bow_arrow:`<line x1="34" y1="40" x2="66" y2="100" stroke="${accI?.color}" stroke-width="3" stroke-linecap="round"/>
      <path d="M28,52 Q40,46 46,56" fill="none" stroke="${accI?.color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="28" y1="52" x2="46" y2="56" stroke="${accI?.color}" stroke-width="2"/>`,
    acc_heart_wand:`<line x1="38" y1="50" x2="62" y2="110" stroke="${accI?.color}" stroke-width="4" stroke-linecap="round"/>
      <path d="M38,44 Q32,38 34,44 Q34,52 38,58 Q42,52 42,44 Q44,38 38,44 Z" fill="${accI?.color}" opacity="0.88"/>`,
    acc_gamepad:`<rect x="34" y="78" width="32" height="22" rx="8" fill="${accI?.color}" opacity="0.88"/>
      <circle cx="56" cy="84" r="3" fill="rgba(255,255,255,.6)"/>
      <circle cx="62" cy="90" r="3" fill="rgba(255,255,255,.6)"/>
      <line x1="40" y1="86" x2="40" y2="92" stroke="rgba(255,255,255,.7)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="37" y1="89" x2="43" y2="89" stroke="rgba(255,255,255,.7)" stroke-width="2.5" stroke-linecap="round"/>`,
    acc_ice_wand:`<line x1="38" y1="36" x2="64" y2="110" stroke="${accI?.color}" stroke-width="4" stroke-linecap="round"/>
      <path d="M38,36 l3,8 l8,0 l-6.5,4.5 l2.5,7.5 l-7,-5 l-7,5 l2.5,-7.5 l-6.5,-4.5 l8,0 Z" fill="${accI?.color}" opacity="0.85"/>
      <path d="M38,36 l3,8 l8,0 l-6.5,4.5 l2.5,7.5 l-7,-5 l-7,5 l2.5,-7.5 l-6.5,-4.5 l8,0 Z" fill="rgba(255,255,255,.4)"/>`,
    acc_fire_sword:`<line x1="68" y1="38" x2="38" y2="108" stroke="${accI?.color}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M68,38 Q76,44 68,50 Q58,44 68,38 Z" fill="#ffe060" opacity="0.85"/>
      <line x1="58" y1="62" x2="48" y2="70" stroke="${accI?.color}" stroke-width="8" stroke-linecap="round"/>`,
  };
  const accSVG=accI?(accMap[accI.id]||''):'';

  const ears=earMap[animal]||earMap.bear;
  const face=faceMap[animal]||faceMap.bear;
  const belly=topI?'':(bellyMap[animal]||'');
  const blushY={bear:54,cat:54,bunny:54,fox:56,pig:58,dog:54,koala:52,panda:48,
    lion:56,tiger:54,hamster:55,frog:52,duck:54,dragon:53,wolf:57,chick:49}[animal]||54;
  const pandaPatches=animal==='panda'
    ?`<ellipse cx="${ex1}" cy="${ey1}" rx="11" ry="10" fill="rgba(20,20,20,.85)"/>
       <ellipse cx="${ex2}" cy="${ey2}" rx="11" ry="10" fill="rgba(20,20,20,.85)"/>`:'';
  const showDefaultBrows = !['angry','cool','surprised'].includes(es);

  // 배경 그라디언트 + 3D 셰이딩 defs
  const bgId=av.bg||'none';
  const bgData=BG_TYPES.find(x=>x.id===bgId)||BG_TYPES[0];
  const uid=`${animal}${cid}${uidSuffix}`.replace(/[^a-z0-9]/g,'').slice(0,18);
  const svgDefs=`<defs>
    <linearGradient id="avBg_${bgId}" x1="0%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="${bgData.c1}"/>
      <stop offset="100%" stop-color="${bgData.c2}"/>
    </linearGradient>
    <radialGradient id="rhl_${uid}" cx="36%" cy="26%" r="68%">
      <stop offset="0%" stop-color="rgba(255,255,255,.52)"/>
      <stop offset="55%" stop-color="rgba(255,255,255,.06)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,.12)"/>
    </radialGradient>
    <radialGradient id="rbhl_${uid}" cx="36%" cy="30%" r="62%">
      <stop offset="0%" stop-color="rgba(255,255,255,.44)"/>
      <stop offset="55%" stop-color="rgba(255,255,255,.04)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,.1)"/>
    </radialGradient>
    <radialGradient id="rsh_${uid}" cx="50%" cy="92%" r="58%">
      <stop offset="0%" stop-color="rgba(0,0,0,.2)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
    <radialGradient id="blsh_${uid}" cx="50%" cy="38%" r="50%">
      <stop offset="0%" stop-color="#ff5fa0" stop-opacity=".78"/>
      <stop offset="100%" stop-color="#ff5fa0" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
  const bgRect=`<rect x="0" y="0" width="100" height="130" rx="14" fill="url(#avBg_${bgId})"/>
  ${bgId==='field'?'<rect x="0" y="85" width="100" height="45" rx="0" fill="#90d16e" opacity="0.6"/>':''}`;

  return `<svg width="${w}" height="${h}" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
    ${svgDefs}
    ${bgRect}
    <ellipse cx="50" cy="126" rx="22" ry="4.5" fill="rgba(0,0,0,.13)"/>
    ${accI?.id==='acc_wings'?accSVG:''}
    <rect x="14" y="68" width="15" height="28" rx="7" fill="${bc}"/>
    <rect x="71" y="68" width="15" height="28" rx="7" fill="${bc}"/>
    <rect x="29" y="68" width="42" height="30" rx="8" fill="${bc}"/>
    ${belly}
    ${topSVG}
    ${botSVG}
    <ellipse cx="38" cy="126" rx="9" ry="3.5" fill="rgba(28,28,42,.72)"/>
    <ellipse cx="62" cy="126" rx="9" ry="3.5" fill="rgba(28,28,42,.72)"/>
    <rect x="14" y="68" width="15" height="28" rx="7" fill="url(#rbhl_${uid})"/>
    <rect x="71" y="68" width="15" height="28" rx="7" fill="url(#rbhl_${uid})"/>
    ${ears}
    <rect x="21" y="10" width="58" height="56" rx="27" fill="${bc}" stroke="rgba(0,0,0,.06)" stroke-width="1.5"/>
    <rect x="21" y="10" width="58" height="56" rx="27" fill="url(#rhl_${uid})"/>
    <rect x="21" y="10" width="58" height="56" rx="27" fill="url(#rsh_${uid})"/>
    ${pandaPatches}
    ${eyeMap[es]||eyeMap.round}
    ${showDefaultBrows?`
    <path d="M27,27 Q35,21 43,27" stroke="rgba(0,0,0,.52)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M57,27 Q65,21 73,27" stroke="rgba(0,0,0,.52)" stroke-width="3" fill="none" stroke-linecap="round"/>
    `:''}
    <ellipse cx="20" cy="${blushY}" rx="11" ry="8" fill="url(#blsh_${uid})"/>
    <ellipse cx="80" cy="${blushY}" rx="11" ry="8" fill="url(#blsh_${uid})"/>
    ${face}
    ${mouthSVG}
    ${hatSVG}
    ${accI&&accI.id!=='acc_wings'&&accI.id!=='acc_rope'?accSVG:''}
    ${accI?.id==='acc_rope'?accSVG:''}
  </svg>`;
}

function makeItemPreviewSVG(item, w=52, h=68, baseAvOverride=null){
  const baseAv = baseAvOverride || getAvatar() || {};
  const animal = baseAv.animal || 'bear';
  const color  = baseAv.color  || 'brown';
  const eyes   = baseAv.eyes   || 'round';
  const mouth  = baseAv.mouth  || 'smile';
  const catKey = {hat:'hat', top:'top', bottom:'bottom', acc:'accessory'}[item.cat];
  const equipped = catKey ? {[catKey]: item.id} : {};
  const suffix = 'pv'+item.id.replace(/[^a-z0-9]/g,'');
  return makeAvatarSVG({animal, color, eyes, mouth, bg:'none', equipped}, w, h, suffix);
}

// ── 캐릭터 생성/편집 UI (탭 구조) ──
let _avTmp={animal:'bear',color:'brown',eyes:'round',mouth:'smile',bg:'none',equipped:{}};
let _avTab='base';

const AV_TABS=[
  {id:'base',  l:'🐾 베이스',lEn:'🐾 Base'},
  {id:'face',  l:'😊 얼굴',  lEn:'😊 Face'},
  {id:'outfit',l:'👕 의상',  lEn:'👕 Outfit'},
  {id:'bg',    l:'🌈 배경',  lEn:'🌈 Background'},
];

function _avTabContent(){
  const en=getLang()==='en';
  switch(_avTab){
    case 'base': return `
      <div style="margin-bottom:16px;">
        <div style="font-size:.76rem;font-weight:900;color:var(--navy);margin-bottom:8px;">${en?'🐾 Choose Animal':'🐾 동물 선택'}</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
          ${ANIMAL_TYPES.map(a=>`<button onclick="avSetAnimal('${a.id}')" id="an-${a.id}"
            style="padding:7px 3px;border-radius:11px;border:2.5px solid ${a.id===_avTmp.animal?'var(--gold)':'#e2e8f0'};background:${a.id===_avTmp.animal?'#fef9ec':'#fff'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all .15s;font-family:inherit;">
            <span style="font-size:1.4rem;line-height:1.2;">${a.emoji}</span>
            <span style="font-size:.58rem;font-weight:700;color:#475569;">${iname(a)}</span>
          </button>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-size:.76rem;font-weight:900;color:var(--navy);margin-bottom:8px;">${en?'🎨 Fur / Skin Colour':'🎨 털/피부 색상'}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${BODY_COLORS.map(c=>`<button onclick="avSetBodyColor('${c.id}')" id="bc-${c.id}"
            style="width:32px;height:32px;border-radius:50%;background:${c.c};border:3px solid ${c.id===_avTmp.color?'var(--gold)':'#e2e8f0'};cursor:pointer;transition:border .15s;box-shadow:inset 0 0 0 2px rgba(0,0,0,.08);" title="${ilabel(c)}"></button>`).join('')}
        </div>
      </div>`;
    case 'face': return `
      <div style="margin-bottom:16px;">
        <div style="font-size:.76rem;font-weight:900;color:var(--navy);margin-bottom:8px;">${en?'👀 Eye Shape':'👀 눈 모양'}</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">
          ${EYE_TYPES.map(e=>`<button onclick="avSetEyes('${e.id}')" id="ey-${e.id}"
            style="padding:8px 6px;border-radius:10px;border:2px solid ${e.id===_avTmp.eyes?'var(--navy)':'#e2e8f0'};background:${e.id===_avTmp.eyes?'var(--navy)':'#fff'};color:${e.id===_avTmp.eyes?'#fff':'#475569'};font-size:.68rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;">${ilabel(e)}</button>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-size:.76rem;font-weight:900;color:var(--navy);margin-bottom:8px;">${en?'👄 Mouth / Expression':'👄 입/표정'}</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">
          ${MOUTH_TYPES.map(m=>`<button onclick="avSetMouth('${m.id}')" id="mo-${m.id}"
            style="padding:8px 6px;border-radius:10px;border:2px solid ${m.id===(_avTmp.mouth||'smile')?'#e91e63':'#e2e8f0'};background:${m.id===(_avTmp.mouth||'smile')?'#e91e63':'#fff'};color:${m.id===(_avTmp.mouth||'smile')?'#fff':'#475569'};font-size:.68rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;">${ilabel(m)}</button>`).join('')}
        </div>
      </div>`;
    case 'outfit': return `
      <div style="font-size:.72rem;color:#64748b;margin-bottom:10px;">${en?'Equip or unequip shop items.':'상점에서 구매한 아이템을 장착/해제하세요.'}</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">
        ${(()=>{
          const inv=getInventory();
          if(!inv.length) return `<div style="grid-column:1/-1;text-align:center;color:#94a3b8;font-size:.8rem;padding:20px 0;">${en?'No items yet!<br>Tap the shop button below 🛒':'아직 아이템이 없어요!<br>하단 상점 버튼을 눌러보세요 🛒'}</div>`;
          return inv.map(id=>{
            const it=SHOP_ITEMS.find(x=>x.id===id); if(!it) return '';
            const eq=Object.values(_avTmp.equipped||{}).includes(id);
            const catBgC={hat:'#e0e7ff',top:'#dcfce7',bottom:'#ffedd5',acc:'#f3e8ff'}[it.cat]||'#f0f5ff';
            return `<div style="background:#fff;border-radius:12px;border:2px solid ${eq?'var(--gold)':'#e2e8f0'};display:flex;flex-direction:column;">
              <div style="background:${catBgC};border-radius:10px 10px 0 0;padding:4px 2px 2px;text-align:center;flex-shrink:0;display:flex;align-items:center;justify-content:center;min-height:68px;">
                ${makeItemPreviewSVG(it,48,62,_avTmp)}
              </div>
              <div style="padding:5px 6px 7px;text-align:center;display:flex;flex-direction:column;">
                <div style="font-size:.6rem;font-weight:800;color:#334155;margin-bottom:4px;line-height:1.3;">${iname(it)}</div>
                <button onclick="avToggleEquipCreator('${id}')" style="width:100%;padding:5px;border:none;border-radius:7px;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;background:${eq?'#f43f5e':'#22c55e'};color:#fff;">${eq?(en?'Off':'해제'):(en?'Equip':'장착')}</button>
              </div>
            </div>`;
          }).join('');
        })()}
      </div>`;
    case 'bg': return `
      <div style="margin-bottom:8px;">
        <div style="font-size:.76rem;font-weight:900;color:var(--navy);margin-bottom:8px;">${en?'🌈 Background':'🌈 배경 선택'}</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
          ${BG_TYPES.map(b=>`<button onclick="avSetBg('${b.id}')" id="bg-${b.id}"
            style="padding:7px 4px;border-radius:11px;border:2.5px solid ${b.id===(_avTmp.bg||'none')?'var(--gold)':'#e2e8f0'};background:${b.id===(_avTmp.bg||'none')?'#fef9ec':'#fff'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .15s;font-family:inherit;">
            <span style="display:block;width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,${b.c1},${b.c2});border:1px solid rgba(0,0,0,.08);"></span>
            <span style="font-size:.6rem;font-weight:700;color:#475569;">${ilabel(b)}</span>
          </button>`).join('')}
        </div>
      </div>`;
    default: return '';
  }
}

export function showAvatarCreator(isEdit=false){
  _avTmp=isEdit?{...getAvatar()}:{animal:'bear',color:'brown',eyes:'round',mouth:'smile',bg:'none',equipped:{}};
  if(!_avTmp.mouth) _avTmp.mouth='smile';
  if(!_avTmp.bg) _avTmp.bg='none';
  _avTab='base';
  document.getElementById('av-creator')?.remove();
  const ov=document.createElement('div');
  ov.id='av-creator';
  ov.style.cssText='position:fixed;inset:0;z-index:20000;background:linear-gradient(135deg,#1a3560 0%,#1565c0 60%,#0f2040 100%);display:flex;align-items:center;justify-content:center;padding:16px;font-family:\'Noto Sans KR\',sans-serif;overflow-y:auto;';
  ov.innerHTML=`
  <div style="background:#fff;border-radius:24px;width:100%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,.35);overflow:hidden;display:flex;flex-direction:column;max-height:95vh;">
    <!-- 헤더 -->
    <div style="background:linear-gradient(135deg,var(--navy),#1565c0);padding:16px 20px;text-align:center;color:#fff;flex-shrink:0;">
      <div style="font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;">${getLang()==='en'?'Create Your Character 🎨':'나만의 캐릭터 만들기 🎨'}</div>
      <div style="font-size:.72rem;opacity:.75;margin-top:3px;">${isEdit?(getLang()==='en'?'Edit your character!':'캐릭터를 수정해요!'):(getLang()==='en'?'Customise your animal friend!':'나만의 동물 친구를 꾸며보세요!')}</div>
    </div>
    <!-- 프리뷰 + 탭 레이아웃 -->
    <div style="display:flex;flex:1;min-height:0;">
      <!-- 좌측 프리뷰 -->
      <div style="width:130px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:14px 10px;background:#f8faff;border-right:1px solid #e2e8f0;">
        <div>
          <div id="av-preview" style="background:#f0f5ff;border-radius:16px;padding:5px;border:3px solid var(--gold);display:inline-block;">
            ${makeAvatarSVG(_avTmp,90,117)}
          </div>
          <div style="font-size:.62rem;color:#94a3b8;text-align:center;margin-top:6px;font-weight:600;">${getLang()==='en'?'Preview':'미리보기'}</div>
        </div>
        <div style="width:100%;margin-top:8px;">
          <button onclick="avSave(${isEdit})"
            style="width:100%;padding:10px 6px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--navy),#1565c0);color:#fff;font-size:.75rem;font-weight:900;cursor:pointer;font-family:inherit;box-shadow:0 3px 10px rgba(26,53,96,.3);margin-bottom:6px;">
            ${isEdit?(getLang()==='en'?'✅ Done':'✅ 완료'):(getLang()==='en'?'🎉 Done!':'🎉 완성!')}
          </button>
          <button onclick="showShop()"
            style="width:100%;padding:7px 6px;border:1.5px solid #e2e8f0;border-radius:10px;background:#fff;color:var(--navy);font-size:.68rem;font-weight:800;cursor:pointer;font-family:inherit;">
            ${getLang()==='en'?'🛒 Shop':'🛒 상점'}
          </button>
        </div>
      </div>
      <!-- 우측 탭 + 콘텐츠 -->
      <div style="flex:1;display:flex;flex-direction:column;min-width:0;">
        <!-- 탭 바 -->
        <div style="display:flex;border-bottom:2px solid #e2e8f0;flex-shrink:0;background:#fff;">
          ${AV_TABS.map(tab=>`<button onclick="avSwitchTab('${tab.id}')" id="avtab-${tab.id}"
            style="flex:1;padding:10px 2px;border:none;font-size:.64rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;transition:all .2s;background:${_avTab===tab.id?'#eff6ff':'#fff'};color:${_avTab===tab.id?'var(--navy)':'#94a3b8'};border-bottom:${_avTab===tab.id?'2px solid var(--navy)':'2px solid transparent'};margin-bottom:-2px;">${ilabel(tab)}</button>`).join('')}
        </div>
        <!-- 탭 콘텐츠 -->
        <div id="av-tab-content" style="flex:1;overflow-y:auto;padding:14px;" class="no-scrollbar">
          ${_avTabContent()}
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(ov);
}

function _avRefreshPreview(){ document.getElementById('av-preview').innerHTML=makeAvatarSVG(_avTmp,90,117); }
function _avRefreshTabContent(){ const el=document.getElementById('av-tab-content'); if(el) el.innerHTML=_avTabContent(); }

export function avSwitchTab(tab){
  _avTab=tab;
  document.querySelectorAll('[id^="avtab-"]').forEach(b=>{
    const s=b.id==='avtab-'+tab;
    b.style.background=s?'#eff6ff':'#fff';
    b.style.color=s?'var(--navy)':'#94a3b8';
    b.style.borderBottom=s?'2px solid var(--navy)':'2px solid transparent';
  });
  _avRefreshTabContent();
}
export function avSetAnimal(id){
  _avTmp.animal=id;
  document.querySelectorAll('[id^="an-"]').forEach(b=>{ const s=b.id==='an-'+id; b.style.borderColor=s?'var(--gold)':'#e2e8f0'; b.style.background=s?'#fef9ec':'#fff'; });
  _avRefreshPreview();
}
export function avSetBodyColor(id){
  _avTmp.color=id;
  document.querySelectorAll('[id^="bc-"]').forEach(b=>{ b.style.borderColor=b.id==='bc-'+id?'var(--gold)':'#e2e8f0'; });
  _avRefreshPreview();
}
export function avSetEyes(id){
  _avTmp.eyes=id;
  document.querySelectorAll('[id^="ey-"]').forEach(b=>{ const s=b.id==='ey-'+id; b.style.background=s?'var(--navy)':'#fff'; b.style.color=s?'#fff':'#475569'; b.style.borderColor=s?'var(--navy)':'#e2e8f0'; });
  _avRefreshPreview();
}
export function avSetMouth(id){
  _avTmp.mouth=id;
  document.querySelectorAll('[id^="mo-"]').forEach(b=>{ const s=b.id==='mo-'+id; b.style.background=s?'#e91e63':'#fff'; b.style.color=s?'#fff':'#475569'; b.style.borderColor=s?'#e91e63':'#e2e8f0'; });
  _avRefreshPreview();
}
export function avSetBg(id){
  _avTmp.bg=id;
  document.querySelectorAll('[id^="bg-"]').forEach(b=>{ const s=b.id==='bg-'+id; b.style.borderColor=s?'var(--gold)':'#e2e8f0'; b.style.background=s?'#fef9ec':'#fff'; });
  _avRefreshPreview();
}
export function avSave(isEdit){
  if(!_avTmp.equipped) _avTmp.equipped={};
  saveAvatar(_avTmp);
  document.getElementById('av-creator')?.remove();
  window.renderUserBadge();
  if(!isEdit) window.initApp();
}

// ── 상점 UI ──
let _shopCat='hat';
let _tryOn={};  // { hat:'hat_xxx', top:'top_xxx', ... } — temporary try-on state, never saved

function _shopAvPreview(){
  const av=getAvatar();
  return makeAvatarSVG({...av,equipped:{...(av.equipped||{}),..._tryOn}},52,68,'shopv');
}

export function showShop(){
  _tryOn={};
  document.getElementById('av-shop')?.remove();
  const _en=getLang()==='en';
  const cats=[{id:'hat',l:'🎩 모자',lEn:'🎩 Hats'},{id:'top',l:'👕 상의',lEn:'👕 Tops'},{id:'bottom',l:'👖 하의',lEn:'👖 Bottoms'},{id:'acc',l:'💎 악세서리',lEn:'💎 Accessories'}];
  const ov=document.createElement('div');
  ov.id='av-shop';
  ov.style.cssText='position:fixed;inset:0;z-index:25000;background:rgba(15,32,64,.88);display:flex;align-items:center;justify-content:center;padding:16px;font-family:\'Noto Sans KR\',sans-serif;';
  ov.innerHTML=`
  <div style="background:#f8faff;border-radius:24px;width:100%;max-width:440px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.4);overflow:hidden;">
    <div style="background:linear-gradient(135deg,var(--navy),#1565c0);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div style="font-size:1rem;font-weight:900;color:#fff;">${_en?'🛒 Item Shop':'🛒 아이템 상점'}</div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="background:rgba(255,255,255,.2);padding:5px 12px;border-radius:20px;color:#fff;font-size:.82rem;font-weight:800;">$<span id="shop-coin-display">${getCoins()}</span></div>
        <button onclick="document.getElementById('av-shop').remove()" style="background:rgba(255,255,255,.2);border:none;color:#fff;border-radius:50%;width:28px;height:28px;font-size:.9rem;cursor:pointer;font-weight:900;">✕</button>
      </div>
    </div>
    <div style="background:#fff;padding:8px 14px 8px 12px;display:flex;align-items:center;gap:10px;border-bottom:2px solid #f0f5ff;flex-shrink:0;">
      <div id="shop-av-preview" style="width:52px;height:68px;flex-shrink:0;">${_shopAvPreview()}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:.65rem;font-weight:900;color:var(--navy);letter-spacing:.03em;">${_en?'👁 PREVIEW':'👁 미리보기'}</div>
        <div style="font-size:.59rem;color:#94a3b8;margin-top:2px;line-height:1.4;">${_en?'Tap "Try" on any item to see it on your character!':'아이템의 입어보기 버튼을 눌러보세요!'}</div>
      </div>
    </div>
    <div style="display:flex;border-bottom:2px solid #e2e8f0;flex-shrink:0;background:#fff;">
      ${cats.map(c=>`<button onclick="avShopCat('${c.id}')" id="scat-${c.id}"
        style="flex:1;padding:10px 4px;border:none;font-size:.72rem;font-weight:800;cursor:pointer;font-family:inherit;background:${_shopCat===c.id?'var(--navy)':'#fff'};color:${_shopCat===c.id?'#fff':'#64748b'};transition:all .2s;">${ilabel(c)}</button>`).join('')}
    </div>
    <div id="shop-grid" style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,1fr);align-content:start;gap:8px;padding:12px;overflow-y:auto;" class="no-scrollbar">
      ${buildShopGrid(_shopCat)}
    </div>
  </div>`;
  document.body.appendChild(ov);
}

export function buildShopGrid(cat){
  const admin=S.adminMode;
  const catBg={hat:'linear-gradient(135deg,#e0e7ff,#c7d2fe)',top:'linear-gradient(135deg,#dcfce7,#bbf7d0)',bottom:'linear-gradient(135deg,#ffedd5,#fed7aa)',acc:'linear-gradient(135deg,#f3e8ff,#e9d5ff)'};
  const bg=catBg[cat]||'linear-gradient(135deg,#f0f5ff,#e0e7ff)';
  return SHOP_ITEMS.filter(x=>x.cat===cat).map(item=>{
    const owned=hasItem(item.id);
    const equipped=Object.values(getAvatar().equipped||{}).includes(item.id);
    const ok=admin||getCoins()>=item.price;
    const _en=getLang()==='en';
    const catKey={hat:'hat',top:'top',bottom:'bottom',acc:'accessory'}[item.cat];
    const trying=_tryOn[catKey]===item.id;
    const borderColor=equipped?'var(--gold)':trying?'#f59e0b':owned?'#4ade80':'#e2e8f0';
    const badge=equipped
      ?`<span style="position:absolute;top:5px;right:5px;background:var(--gold);color:#fff;font-size:.52rem;font-weight:900;padding:2px 5px;border-radius:5px;">${_en?'ON':'착용'}</span>`
      :trying?`<span style="position:absolute;top:5px;right:5px;background:#f59e0b;color:#fff;font-size:.52rem;font-weight:900;padding:2px 5px;border-radius:5px;">${_en?'TRY':'착입'}</span>`
      :owned?`<span style="position:absolute;top:5px;right:5px;background:#4ade80;color:#14532d;font-size:.52rem;font-weight:900;padding:2px 5px;border-radius:5px;">${_en?'✓':'보유'}</span>`:'';
    const tryBtn=`<button onclick="avTryOn('${item.id}')" style="width:100%;padding:5px 4px;border:2px solid ${trying?'#f59e0b':'#e2e8f0'};border-radius:9px;font-size:.63rem;font-weight:900;cursor:pointer;font-family:inherit;background:${trying?'#fef3c7':'#f8faff'};color:${trying?'#b45309':'#64748b'};margin-top:4px;">${trying?(_en?'👁 On':'착입중'):(_en?'👁 Try':'입어보기')}</button>`;
    const actionBtn=owned
      ?`<button onclick="avToggleEquip('${item.id}')" style="width:100%;padding:7px 4px;border:none;border-radius:9px;font-size:.68rem;font-weight:900;cursor:pointer;font-family:inherit;background:${equipped?'#f43f5e':'#22c55e'};color:#fff;margin-top:6px;">${equipped?(_en?'Unequip':'해제'):(_en?'Equip':'장착')}</button>`
      :`${tryBtn}<button onclick="avBuy('${item.id}')" style="width:100%;padding:6px 4px;border:none;border-radius:9px;font-size:.68rem;font-weight:900;cursor:pointer;font-family:inherit;background:${admin?'#7c3aed':ok?'var(--navy)':'#cbd5e1'};color:${ok||admin?'#fff':'#64748b'};margin-top:4px;">${admin?'🔧 Free':ok?(_en?`Buy 💰${item.price}`:item.price+'💰'):(_en?`💰${item.price}`:'💰'+item.price)}</button>`;
    return `<div style="background:#fff;border-radius:14px;border:2px solid ${borderColor};box-shadow:0 2px 8px rgba(0,0,0,.06);display:flex;flex-direction:column;">
      <div style="background:${bg};border-radius:12px 12px 0 0;padding:4px 4px 2px;text-align:center;position:relative;flex-shrink:0;display:flex;align-items:center;justify-content:center;min-height:76px;">
        ${badge}
        ${makeItemPreviewSVG(item,52,68)}
      </div>
      <div style="padding:6px 6px 8px;text-align:center;display:flex;flex-direction:column;">
        <div style="font-size:.68rem;font-weight:900;color:#1e293b;line-height:1.3;min-height:2em;display:flex;align-items:center;justify-content:center;">${iname(item)}</div>
        ${!owned?`<div style="font-size:.64rem;font-weight:700;color:${ok||admin?'#f59e0b':'#94a3b8'};margin-top:2px;">${admin?'':'💰 '+item.price+' coins'}</div>`:''}
        ${actionBtn}
      </div>
    </div>`;
  }).join('');
}

export function avShopCat(cat){
  _shopCat=cat;
  document.querySelectorAll('[id^="scat-"]').forEach(b=>{ const s=b.id==='scat-'+cat; b.style.background=s?'var(--navy)':'#fff'; b.style.color=s?'#fff':'#64748b'; });
  const grid=document.getElementById('shop-grid');
  if(grid) grid.innerHTML=buildShopGrid(cat);
}

export function avBuy(id){
  const item=SHOP_ITEMS.find(x=>x.id===id);
  if(!item||hasItem(id)) return;
  if(S.adminMode){
    addToInventory(id);
    window.showToast(`🔧 [작업모드] ${item.name} 무료 지급!`);
  } else {
    if(!spendCoins(item.price)){ window.showToast(getLang()==='en'?'💸 Not enough coins! Complete more days!':'💸 달러가 부족해요! 도장을 더 받아보세요!'); return; }
    addToInventory(id);
    window.showToast(getLang()==='en'?`🎉 ${iname(item)} purchased!`:`🎉 ${iname(item)} 구매 완료!`);
  }
  const sc=document.getElementById('shop-coin-display');
  if(sc) sc.textContent=getCoins();
  avShopCat(_shopCat);
}

export function avTryOn(id){
  const item=SHOP_ITEMS.find(x=>x.id===id);
  if(!item) return;
  const catKey={hat:'hat',top:'top',bottom:'bottom',acc:'accessory'}[item.cat];
  if(_tryOn[catKey]===id){ delete _tryOn[catKey]; }
  else { _tryOn[catKey]=id; }
  const previewEl=document.getElementById('shop-av-preview');
  if(previewEl) previewEl.innerHTML=_shopAvPreview();
  avShopCat(_shopCat);
}

export function avToggleEquipCreator(id){
  const item=SHOP_ITEMS.find(x=>x.id===id);
  if(!item) return;
  if(!_avTmp.equipped) _avTmp.equipped={};
  const catKey={hat:'hat',top:'top',bottom:'bottom',acc:'accessory'}[item.cat];
  if(_avTmp.equipped[catKey]===id){ delete _avTmp.equipped[catKey]; window.showToast(`${iname(item)} ${getLang()==='en'?'unequipped':'해제됨'}`); }
  else { _avTmp.equipped[catKey]=id; window.showToast(`✨ ${iname(item)} ${getLang()==='en'?'equipped!':'장착!'}`); }
  _avRefreshPreview();
  _avRefreshTabContent();
}

export function avToggleEquip(id){
  const item=SHOP_ITEMS.find(x=>x.id===id);
  if(!item) return;
  const av=getAvatar();
  if(!av.equipped) av.equipped={};
  const catKey={hat:'hat',top:'top',bottom:'bottom',acc:'accessory'}[item.cat];
  if(av.equipped[catKey]===id){ delete av.equipped[catKey]; window.showToast(`${iname(item)} ${getLang()==='en'?'unequipped':'해제됨'}`); }
  else { av.equipped[catKey]=id; window.showToast(`✨ ${iname(item)} ${getLang()==='en'?'equipped!':'장착!'}`); }
  saveAvatar(av);
  window.renderUserBadge();
  avShopCat(_shopCat);
}

// ── 프로필 UI ──
export function showAvatarProfile(){
  document.getElementById('av-profile')?.remove();
  const av=getAvatar();
  const inv=getInventory();
  const ov=document.createElement('div');
  ov.id='av-profile';
  ov.style.cssText='position:fixed;inset:0;z-index:25000;background:rgba(15,32,64,.88);display:flex;align-items:center;justify-content:center;padding:16px;font-family:\'Noto Sans KR\',sans-serif;';
  const invHTML=inv.length
    ?inv.map(id=>{
        const it=SHOP_ITEMS.find(x=>x.id===id); if(!it) return '';
        const eq=Object.values(av.equipped||{}).includes(id);
        return `<div onclick="avToggleEquipProfile('${id}')" style="padding:8px;border-radius:12px;border:2px solid ${eq?'var(--gold)':'#e2e8f0'};background:${eq?'#fef9ec':'#fff'};text-align:center;cursor:pointer;">
          <div style="font-size:1.5rem;">${it.emoji}</div>
          <div style="font-size:.6rem;font-weight:700;color:#64748b;margin-top:2px;">${eq?(getLang()==='en'?'Equipped':'장착중'):(getLang()==='en'?'Equip':'착용')}</div>
        </div>`;
      }).join('')
    :`<div style="grid-column:1/-1;text-align:center;color:#94a3b8;font-size:.8rem;padding:20px;">${getLang()==='en'?'No items yet!<br>Buy some from the shop 🛒':'아직 아이템이 없어요!<br>상점에서 구매해보세요 🛒'}</div>`;

  let streak=0;
  for(let i=S.currentDay;i>=1;i--){ if(S.completedDays.includes(i)) streak++; else break; }

  ov.innerHTML=`
  <div style="background:#f8faff;border-radius:24px;width:100%;max-width:380px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.4);" class="no-scrollbar">
    <div style="background:linear-gradient(135deg,var(--navy),#1565c0);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div style="font-size:1rem;font-weight:900;color:#fff;">${getLang()==='en'?'👤 My Profile':'👤 내 프로필'}</div>
      <button onclick="document.getElementById('av-profile').remove()" style="background:rgba(255,255,255,.2);border:none;color:#fff;border-radius:50%;width:28px;height:28px;font-size:.9rem;cursor:pointer;font-weight:900;">✕</button>
    </div>
    <div style="padding:20px;text-align:center;">
      <div style="display:inline-block;background:#f0f5ff;border-radius:18px;padding:6px;border:3px solid var(--gold);box-shadow:0 4px 16px rgba(0,0,0,.1);margin-bottom:10px;">
        ${makeAvatarSVG(av,100,130)}
      </div>
      <div style="font-size:1.1rem;font-weight:900;color:var(--navy);">${S.currentUser}</div>
      <div style="display:flex;justify-content:center;gap:10px;margin:12px 0;flex-wrap:wrap;">
        <div style="background:#eef2ff;border-radius:10px;padding:8px 14px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:900;color:var(--navy);">${S.completedDays.length}</div>
          <div style="font-size:.65rem;color:#64748b;">${getLang()==='en'?'Days Done':'완료 일수'}</div>
        </div>
        <div style="background:#fef9ec;border-radius:10px;padding:8px 14px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:900;color:#a07c10;">$${getCoins()}</div>
          <div style="font-size:.65rem;color:#64748b;">${getLang()==='en'?'My Coins':'보유 코인'}</div>
        </div>
        <div style="background:#fff0f0;border-radius:10px;padding:8px 14px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:900;color:var(--coral);">🔥 ${streak}</div>
          <div style="font-size:.65rem;color:#64748b;">${getLang()==='en'?'Streak':'연속 일수'}</div>
        </div>
      </div>
    </div>
    <div style="padding:0 20px 16px;">
      <div style="font-size:.8rem;font-weight:900;color:var(--navy);margin-bottom:10px;">${getLang()==='en'?'🎒 My Items (tap to equip/unequip)':'🎒 내 아이템 (탭하면 장착/해제)'}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">${invHTML}</div>
    </div>
    <div style="padding:0 20px 20px;display:flex;gap:8px;">
      <button onclick="document.getElementById('av-profile').remove();showAvatarCreator(true)"
        style="flex:1;padding:11px;border:2px solid var(--navy);border-radius:12px;background:#fff;color:var(--navy);font-size:.78rem;font-weight:800;cursor:pointer;font-family:inherit;">
        ${getLang()==='en'?'✏️ Edit Avatar':'✏️ 아바타 수정'}
      </button>
      <button onclick="document.getElementById('av-profile').remove();showShop()"
        style="flex:1;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,var(--navy),#1565c0);color:#fff;font-size:.78rem;font-weight:800;cursor:pointer;font-family:inherit;">
        ${getLang()==='en'?'🛒 Go to Shop':'🛒 상점 가기'}
      </button>
    </div>
  </div>`;
  document.body.appendChild(ov);
}

export function avToggleEquipProfile(id){
  avToggleEquip(id);
  document.getElementById('av-profile')?.remove();
  showAvatarProfile();
}
