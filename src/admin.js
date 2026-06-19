// ══════════════════════════════════════════
//  관리자(작업) 모드
// ══════════════════════════════════════════
import { S, lsKey, pKey, loadDayState } from './state.js';
import { isAdminUser } from './auth.js';

export function isAdmin(){ return isAdminUser() && S.adminMode; }

export function toggleAdmin(){
  if(!isAdminUser()){ window.showToast('관리자 계정으로 로그인해야 해요.'); return; }
  S.adminMode = !S.adminMode;
  localStorage.setItem('kps_admin', S.adminMode ? '1' : '0');
  renderAdminBar();
  window.initApp();
  if(S.adminMode) window.showToast('🔧 작업 모드 ON — 모든 날 접근 가능!');
  else            window.showToast('✅ 작업 모드 OFF — 일반 모드로 전환');
}

let _badgeTaps=0, _badgeTimer=null;
export function onBadgeTap(){
  if(!isAdminUser()) return;
  _badgeTaps++;
  clearTimeout(_badgeTimer);
  _badgeTimer=setTimeout(()=>{ _badgeTaps=0; },1500);
  if(_badgeTaps>=5){ _badgeTaps=0; toggleAdmin(); }
}

export function renderAdminBar(){
  let bar = document.getElementById('admin-bar');
  if(!S.adminMode){
    if(bar) bar.remove();
    return;
  }
  if(!bar){
    bar=document.createElement('div');
    bar.id='admin-bar';
    document.body.insertAdjacentElement('afterbegin', bar);
  }
  bar.style.cssText='position:sticky;top:0;z-index:9999;background:linear-gradient(90deg,#7c3aed,#4f46e5);color:#fff;padding:0;font-family:inherit;';
  bar.innerHTML=`
    <div style="display:flex;align-items:center;gap:0;overflow-x:auto;" class="no-scrollbar">
      <div style="display:flex;align-items:center;gap:7px;padding:9px 14px;background:rgba(0,0,0,.25);flex-shrink:0;border-right:1px solid rgba(255,255,255,.15);">
        <span style="font-size:.75rem;font-weight:900;letter-spacing:.05em;">🔧 작업 모드</span>
      </div>
      <div style="display:flex;gap:4px;padding:7px 10px;flex-shrink:0;border-right:1px solid rgba(255,255,255,.15);">
        <span style="font-size:.68rem;font-weight:700;opacity:.7;align-self:center;margin-right:4px;">바로가기:</span>
        ${[1,2,3,4,5,6,7,10,15,20,25,30].map(d=>`
          <button onclick="adminJump(${d})"
            style="min-width:30px;height:26px;border:none;border-radius:6px;font-size:.68rem;font-weight:800;cursor:pointer;font-family:inherit;
                   background:${S.currentDay===d?'#fff':'rgba(255,255,255,.2)'};
                   color:${S.currentDay===d?'#4f46e5':'#fff'};flex-shrink:0;">
            ${d}
          </button>`).join('')}
      </div>
      <div style="display:flex;gap:6px;padding:7px 10px;flex-shrink:0;margin-left:auto;">
        <button onclick="adminCompleteDay()"
          style="padding:5px 11px;border:1.5px solid rgba(255,255,255,.5);border-radius:8px;font-size:.7rem;font-weight:800;cursor:pointer;font-family:inherit;background:rgba(255,255,255,.15);color:#fff;white-space:nowrap;">
          ✅ 현재 날 완료
        </button>
        <button onclick="adminCompleteAll()"
          style="padding:5px 11px;border:1.5px solid rgba(255,255,255,.5);border-radius:8px;font-size:.7rem;font-weight:800;cursor:pointer;font-family:inherit;background:rgba(255,255,255,.15);color:#fff;white-space:nowrap;">
          ⚡ 전체 완료
        </button>
        <button onclick="showResetConfirm()"
          style="padding:5px 11px;border:1.5px solid rgba(255,180,100,.6);border-radius:8px;font-size:.7rem;font-weight:800;cursor:pointer;font-family:inherit;background:rgba(255,150,50,.25);color:#ffd580;white-space:nowrap;">
          🔄 초기화
        </button>
        <button onclick="toggleAdmin()"
          style="padding:5px 11px;border:none;border-radius:8px;font-size:.7rem;font-weight:800;cursor:pointer;font-family:inherit;background:rgba(255,100,100,.6);color:#fff;white-space:nowrap;">
          ✕ 모드 끄기
        </button>
      </div>
    </div>
  `;
}

export function adminJump(d){
  S.currentDay=d;
  localStorage.setItem(pKey('day'),d);
  window.initApp();
}

export function adminCompleteDay(){
  if(!S.completedDays.includes(S.currentDay)){
    S.completedDays.push(S.currentDay);
    localStorage.setItem(pKey('done'),JSON.stringify(S.completedDays));
  }
  const skillCount = S.currentPhase===2 ? 2 : 3;
  const watchData={}; for(let i=0;i<skillCount;i++) watchData[i]=true;
  localStorage.setItem(pKey(`watch_${S.currentDay}`), JSON.stringify(watchData));
  loadDayState(); window.initApp();
  window.showToast(`✅ ${['초급','중급','고급'][S.currentPhase]} Day ${S.currentDay} 완료 처리됨`);
}

export function adminCompleteAll(){
  const all=Array.from({length:30},(_,i)=>i+1);
  const skillCount = S.currentPhase===2 ? 2 : 3;
  const watchData={}; for(let i=0;i<skillCount;i++) watchData[i]=true;
  for(let d=1;d<=30;d++) localStorage.setItem(pKey(`watch_${d}`), JSON.stringify(watchData));
  S.completedDays=all;
  localStorage.setItem(pKey('done'),JSON.stringify(S.completedDays));
  loadDayState(); window.initApp();
  window.showToast(`⚡ ${['초급','중급','고급'][S.currentPhase]} 30일 전체 완료 처리됨`);
}
