// ══════════════════════════════════════════
//  줄넘기 데이터베이스
// ══════════════════════════════════════════
export const DB = [
  {
    day:1,
    beginner:[
      { name:"양발 모아 뛰기",  nameEn:"Two-Feet Jump",
        guide:"① 무릎을 살짝 굽혀 충격을 흡수해요. ② 손목으로 줄을 가볍게 돌려요. ③ 발앞꿈치로 사뿐히 착지하세요!",
        guideEn:"① Bend knees slightly to absorb impact. ② Spin the rope lightly with your wrists. ③ Land softly on the balls of your feet!",
        desc:"가장 기본이 되는 필수 기술! 두 발을 모으고 리듬감을 익혀요.",
        descEn:"The essential foundation skill! Keep both feet together and find your rhythm.",
        ytId:"iWPrku-KVXo" },
      { name:"구보 뛰기",       nameEn:"Running Jump",
        guide:"① 제자리에서 조깅하듯 발을 번갈아 들어요. ② 다리를 뒤로 너무 높게 차지 마세요. ③ 가볍게 발을 통과시켜요.",
        guideEn:"① Alternate feet like jogging on the spot. ② Don't kick your legs too high behind you. ③ Pass the rope lightly under each foot.",
        desc:"걷거나 조깅하는 박자로 왼발, 오른발을 엇갈려 부드럽게 넘어요.",
        descEn:"Alternate left and right feet smoothly in a jogging rhythm.",
        ytId:"PMJnOY8G-n4" },
      { name:"좌우 벌려 뛰기",  nameEn:"Side-Step Jump",
        guide:"① 첫 점프에 다리를 어깨너비로 벌려요. ② 두 번째 점프에 다시 모아요. ③ 줄과 스텝이 꼬이지 않게 호흡을 맞춰요.",
        guideEn:"① Jump 1: spread legs shoulder-width apart. ② Jump 2: bring feet back together. ③ Keep the rope and steps in sync.",
        desc:"줄 한 바퀴마다 벌렸다가 모으기를 반복해 재미를 더해요.",
        descEn:"Spread and close with every rotation to add fun to your routine!",
        ytId:"kFuWxpdJtAY" }
    ],
    intermediate:[
      { name:"엇걸어 뛰기 (X자)", nameEn:"Criss Cross Jump",
        guide:"① 팔꿈치를 몸통에 붙여요. ② 줄이 내려올 때 손목을 X자로 교차해요. ③ 교차 상태로 뛰어넘고 바로 풀어요.",
        guideEn:"① Keep elbows close to your body. ② Cross your wrists into an X as the rope comes down. ③ Jump through the X then uncross immediately.",
        desc:"앞 가슴에 예쁜 X자 터널을 만들며 넘는 폼나는 기술이에요! (Criss Cross Tutorial)",
        descEn:"Create a beautiful X-shaped tunnel in front of your chest! (Criss Cross Tutorial)",
        ytId:"BUouJzDSpJQ" },
      { name:"뒤로 뛰기",        nameEn:"Backwards Jump",
        guide:"① 양손을 골반보다 살짝 앞으로 뻗어요. ② 줄을 뒤에서부터 힘차게 당겨 올려요. ③ 소리로 박자를 맞추며 넘어요.",
        guideEn:"① Extend both hands slightly in front of your hips. ② Pull the rope forward over your head from behind. ③ Use the sound to keep your beat.",
        desc:"보이지 않는 줄을 리듬과 소리만으로 넘는 도전! (Backwards Jump Tutorial)",
        descEn:"Jump a rope you can't see — guided only by rhythm and sound! (Backwards Jump Tutorial)",
        ytId:"Z2qLdkuk-V0" },
      { name:"이중 뛰기 (쌩쌩이)", nameEn:"Double Under",
        guide:"① 최대한 높게 뛰어올라요. ② 공중 최고점에서 손목을 아주 빠르게 두 번 돌려요. ③ 착지 시 무릎을 살짝 굽혀 충격을 흡수해요.",
        guideEn:"① Jump as high as possible. ② At the peak, spin your wrists very fast twice. ③ Bend your knees on landing to absorb impact.",
        desc:"한 번 점프에 줄을 두 번 통과시키는 고급 기술이에요! (Double Under Tutorial)",
        descEn:"Pass the rope under your feet twice in a single jump! (Double Under Tutorial)",
        ytId:"pQRnSYfliEc" }
    ],
    advanced:[
      { name:"되돌려 뛰기",      nameEn:"Uncross Jump",
        guide:"① X자 뛰기 직후 줄이 등 뒤로 갈 때 팔을 바깥으로 펼쳐요. ② 자연스럽게 다음 동작으로 이어가요.",
        guideEn:"① Right after the cross, spread your arms out when the rope goes behind you. ② Flow smoothly into the next move.",
        desc:"엇걸어 뛰기에서 매끄럽게 되돌아오는 연결 기술이에요! (Cross Tutorial)",
        descEn:"Smoothly return from the cross-arm position — a linking skill! (Cross Tutorial)",
        ytId:"HgdXnJvF3p8" },
      { name:"프리스타일 콤보",   nameEn:"Freestyle Combo",
        guide:"① 배운 기술들을 자유롭게 연결해요. ② 음악 박자에 맞춰 나만의 루틴을 만들어요.",
        guideEn:"① Connect the skills you've learned freely. ② Create your own routine to the beat of the music.",
        desc:"오늘 배운 모든 기술을 연결해 나만의 공연을 만들어요! (World Champion Tip)",
        descEn:"Combine everything you've learned into your own performance! (World Champion Tip)",
        ytId:"LgF3cjYLUYA" }
    ]
  }
];

const dayNames = {
  beginner:[["가볍게 뛰기","무릎 올려 뛰기","좌우 슬라이드"],["양발 점프 마스터","발목 스냅 연습","리듬 뛰기"],["스피드 기초","페이스 조절","연속성 훈련"],["30초 지속 뛰기","팔 자세 교정","발 착지 연습"],["50회 챌린지","협응력 트레이닝","균형 점프"]],
  intermediate:[["엇걸이 마스터","백워드 파워","리듬 이중뛰기"],["크로스 오버","역방향 구보","콤비네이션 기초"],["X자 연속","뒤로+앞으로","인터벌 이중"],["스피드 크로스","파워 백워드","이중 연속"],["크로스 플로우","백워드 리듬","이중 마스터"]],
  advanced:[["크로스 트리플","프리스타일 믹스"],["에어 콤보","스타일 루틴"],["파워 시리즈","퍼포먼스 콤보"],["스피드 아티스트","마스터 루틴"],["챔피언 퍼포먼스","파이널 콤보"]]
};
const dayNamesEn = {
  beginner:[["Light Jump","High-Knee Jump","Side Slide"],["Two-Feet Master","Ankle Snap","Rhythm Jump"],["Speed Basics","Pace Control","Consistency"],["30-Sec Endurance","Arm Form Fix","Landing Practice"],["50-Rep Challenge","Coordination","Balance Jump"]],
  intermediate:[["Criss-Cross Master","Backwards Power","Rhythm Double Under"],["Cross Over","Reverse Running","Combo Basics"],["X Consecutive","Back & Forward","Interval Double Under"],["Speed Cross","Power Backward","Double Under Streak"],["Cross Flow","Backward Rhythm","Double Under Master"]],
  advanced:[["Cross Triple","Freestyle Mix"],["Air Combo","Style Routine"],["Power Series","Performance Combo"],["Speed Artist","Master Routine"],["Champion Performance","Final Combo"]]
};
const guideTemplates = {
  beginner:["① 어깨 긴장을 풀어요. ② 손목으로 회전 관성을 만들어요. ③ 발앞꿈치로 가볍게 튀어요.","① 허벅지를 높게 올려요. ② 코어에 힘을 줘요. ③ 착지는 부드럽게요.","① 상체를 정면으로 고정해요. ② 좌우로 가볍게 이동해요. ③ 리듬을 타요."],
  intermediate:["① 팔꿈치를 붙여요. ② 손목으로 X자를 만들어요. ③ 착지 후 바로 풀어요.","① 소리로 박자를 들어요. ② 줄 끝이 닿는 순간 점프해요. ③ 일정한 리듬을 유지해요.","① 최대한 높이 뛰어요. ② 공중에서 빠르게 두 번 돌려요. ③ 착지 시 충격 흡수해요."],
  advanced:["① 최고 도약력을 유지해요. ② 공중에서 세 번 돌려요. ③ 착지 후 곧바로 연결해요.","① 배운 기술들을 연결해요. ② 음악 박자에 맞춰요. ③ 자신 있게 표현해요."]
};
const guideTemplatesEn = {
  beginner:["① Relax your shoulders. ② Use your wrists to create rotation. ③ Bounce lightly on the balls of your feet.","① Lift your thighs high. ② Engage your core. ③ Land softly.","① Keep your upper body facing forward. ② Move lightly left and right. ③ Go with the rhythm."],
  intermediate:["① Keep elbows tucked in. ② Cross your wrists into an X. ③ Uncross immediately after landing.","① Listen for the beat. ② Jump the moment the rope tip touches. ③ Keep a steady rhythm.","① Jump as high as you can. ② Spin fast twice in the air. ③ Absorb impact on landing."],
  advanced:["① Maintain maximum jump height. ② Spin the rope three times in the air. ③ Connect straight into the next move.","① Link the skills you've learned. ② Match the music beat. ③ Express yourself confidently."]
};
const descTemplates = {
  beginner:["순수하고 피로도 낮은 속도에서 근지구력을 키우는 코스.","높은 칼로리 소모를 이루어내는 하이클래스 체력 증진 코스.","민첩성과 방향 조절 감각을 함양하는 훈련."],
  intermediate:["X자 기술의 실수를 제로로 줄이는 크로스 오버 트레이닝.","뒤로 뛰기 속도 변주와 리듬 보정으로 하체 감각 활성화.","피로도를 조절하며 지속적인 이중 뛰기를 가능하게 하는 기술."],
  advanced:["순간 순발력을 극상으로 고도화시키는 공중 다단 연결 동작.","예술 줄넘기의 정점, 나만의 퍼포먼스를 완성해요."]
};
const descTemplatesEn = {
  beginner:["Build muscular endurance at a clean, low-fatigue pace.","A high-calorie fitness course to boost your stamina.","Training to develop agility and directional coordination."],
  intermediate:["Cross-over training to bring your X-skill errors to zero.","Activate lower-body awareness with backward jump speed and rhythm drills.","Technique to manage fatigue and maintain consistent double unders."],
  advanced:["Air multi-link movements to maximise explosive power.","The pinnacle of artistic jump rope — complete your own performance."]
};
const ytIds = {
  // 그룹0: 가볍게 뛰기·무릎 올려 뛰기·좌우 슬라이드 / 엇걸이 마스터·백워드 파워·리듬 이중뛰기 / 크로스 트리플·프리스타일 믹스
  // 그룹1: 양발 점프 마스터·발목 스냅 연습·리듬 뛰기 / 크로스 오버·역방향 구보·콤비네이션 기초 / 에어 콤보·스타일 루틴
  // 그룹2: 스피드 기초·페이스 조절·연속성 훈련 / X자 연속·뒤로+앞으로·인터벌 이중 / 파워 시리즈·퍼포먼스 콤보
  // 그룹3: 30초 지속 뛰기·팔 자세 교정·발 착지 연습 / 스피드 크로스·파워 백워드·이중 연속 / 스피드 아티스트·마스터 루틴
  // 그룹4: 50회 챌린지·협응력 트레이닝·균형 점프 / 크로스 플로우·백워드 리듬·이중 마스터 / 챔피언 퍼포먼스·파이널 콤보
  beginner:[
    // G0: 가볍게 뛰기 · 무릎 올려 뛰기 · 좌우 슬라이드
    ["Y3wzaWE9QRY","MII0QvoM9M8","c0EH5Ioj7TI"],
    // G1: 양발 점프 마스터 · 발목 스냅 연습 · 리듬 뛰기
    ["knhqqXCtoEU","s_nuLdHYmBY","Thv6ytxl_5Q"],
    // G2: 스피드 기초 · 페이스 조절 · 연속성 훈련
    ["Sz96SdflS9A","ZY0jYFiExZ4","fhBy8dadK7U"],
    // G3: 30초 지속 뛰기 · 팔 자세 교정 · 발 착지 연습
    ["sghe6XGeH5o","iWPrku-KVXo","XSY9AE72inM"],
    // G4: 50회 챌린지 · 협응력 트레이닝 · 균형 점프
    ["86iCOCtA4Ww","wcBSn1nq2BA","3_KpS7wnVvg"]
  ],
  intermediate:[
    // G0: 엇걸이 마스터 · 백워드 파워 · 리듬 이중뛰기
    ["9Pp1Q1ycYqY","Z2qLdkuk-V0","NsRvJORzFjs"],
    // G1: 크로스 오버 · 역방향 구보 · 콤비네이션 기초
    ["N6XdCUqpDvA","s_nuLdHYmBY","FCaWDpoWIqA"],
    // G2: X자 연속 · 뒤로+앞으로 · 인터벌 이중
    ["lqtFwOcoiAI","c0EH5Ioj7TI","u2JegYXx1D8"],
    // G3: 스피드 크로스 · 파워 백워드 · 이중 연속
    ["7cm359zShHw","Z2qLdkuk-V0","NsRvJORzFjs"],
    // G4: 크로스 플로우 · 백워드 리듬 · 이중 마스터
    ["9Pp1Q1ycYqY","Z2qLdkuk-V0","pQRnSYfliEc"]
  ],
  advanced:[
    // G0: 크로스 트리플 · 프리스타일 믹스
    ["P52bMIWTcWo","bPTIgCSMqA0"],
    // G1: 에어 콤보 · 스타일 루틴
    ["Nw-8wv6LlGE","FCaWDpoWIqA"],
    // G2: 파워 시리즈 · 퍼포먼스 콤보
    ["2-pHqrpCM8U","LgF3cjYLUYA"],
    // G3: 스피드 아티스트 · 마스터 루틴
    ["7cm359zShHw","bPTIgCSMqA0"],
    // G4: 챔피언 퍼포먼스 · 파이널 콤보
    ["ug7K-8X6pJk","31-scRay__M"]
  ]
};

for(let i=2;i<=30;i++){
  const gi=(i-2)%5;
  DB.push({
    day:i,
    beginner:   dayNames.beginner[gi].map((n,j)=>({ name:`${n} (D-${i})`, nameEn:`${dayNamesEn.beginner[gi][j]} (D-${i})`, guide:guideTemplates.beginner[j], guideEn:guideTemplatesEn.beginner[j], desc:descTemplates.beginner[j], descEn:descTemplatesEn.beginner[j], ytId:ytIds.beginner[gi][j] })),
    intermediate:dayNames.intermediate[gi].map((n,j)=>({ name:`${n} (D-${i})`, nameEn:`${dayNamesEn.intermediate[gi][j]} (D-${i})`, guide:guideTemplates.intermediate[j], guideEn:guideTemplatesEn.intermediate[j], desc:descTemplates.intermediate[j], descEn:descTemplatesEn.intermediate[j], ytId:ytIds.intermediate[gi][j] })),
    advanced:   dayNames.advanced[gi].map((n,j)=>({ name:`${n} (D-${i})`, nameEn:`${dayNamesEn.advanced[gi][j]} (D-${i})`, guide:guideTemplates.advanced[j], guideEn:guideTemplatesEn.advanced[j], desc:descTemplates.advanced[j], descEn:descTemplatesEn.advanced[j], ytId:ytIds.advanced[gi][j] }))
  });
}
