// ══════════════════════════════════════════
//  공유 앱 상태
// ══════════════════════════════════════════
export const S = {
  currentUser:    localStorage.getItem('kps_auth_user') || null,
  adminMode:      localStorage.getItem('kps_admin') === '1',
  currentPhase:   0,       // 0=초급  1=중급  2=고급
  currentDay:     1,
  completedDays:  [],      // 현재 페이즈의 완료된 날
  completedDates: {},      // { dayNum: 'YYYY-MM-DD' } 완료 날짜 기록
  watchStatus:    {},      // flat: { idx: bool }
  timerStatus:    {},      // flat: { idx: seconds }
  timerIntervals: {},
  nextStepAction: null,
};

// 유저 전체 공통 키 (페이즈 무관)
export function lsKey(k){ return `kps_${S.currentUser}_${k}`; }
// 현재 페이즈 전용 키
export function pKey(k){ return `kps_${S.currentUser}_p${S.currentPhase}_${k}`; }
export function fmt(sec){ const m=Math.floor(sec/60),r=sec%60; return `${m}:${r<10?'0':''}${r}`; }

export function todayStr(){ return new Date().toISOString().slice(0,10); }

export function initUserState(){
  S.currentPhase   = parseInt(localStorage.getItem(lsKey('phase'))) || 0;
  S.currentDay     = parseInt(localStorage.getItem(pKey('day')))    || 1;
  S.completedDays  = JSON.parse(localStorage.getItem(pKey('done')))  || [];
  S.completedDates = JSON.parse(localStorage.getItem(pKey('dates'))) || {};
}

export function saveCompletedDate(day){
  S.completedDates[day] = todayStr();
  localStorage.setItem(pKey('dates'), JSON.stringify(S.completedDates));
}

export function loadDayState(){
  S.watchStatus = JSON.parse(localStorage.getItem(pKey(`watch_${S.currentDay}`))) || {};
  S.timerStatus = JSON.parse(localStorage.getItem(pKey(`timer_${S.currentDay}`))) || {};
}

export function saveDayState(){
  localStorage.setItem(pKey(`watch_${S.currentDay}`), JSON.stringify(S.watchStatus));
  localStorage.setItem(pKey(`timer_${S.currentDay}`), JSON.stringify(S.timerStatus));
}
