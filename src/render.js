// ══════════════════════════════════════════
//  렌더링 + 동영상 / 타이머 / 도장
// ══════════════════════════════════════════
import { S, lsKey, pKey, fmt, saveDayState, todayStr, saveCompletedDate } from './state.js';
import { DB } from './data.js';
import { isAdmin } from './admin.js';
import { addCoins, COINS_PER_DAY } from './avatar.js';
import { t, getLang } from './i18n.js';

const _PHASE_KEYS = ['phase.beginner','phase.intermediate','phase.advanced'];
const PHASE_NAMES = ['초급','중급','고급']; // kept as fallback; use pn(i) for translated output
function pn(i){ return t(_PHASE_KEYS[i]); }
const PHASE_EMOJI  = ['🟢','🟡','🔴'];
const PHASE_COLOR  = ['var(--green)','#e65100','var(--coral)'];
const PHASE_BG     = ['#f0fdf4','#fff7ed','#fff1f2'];
const PHASE_BORDER = ['#bbf7d0','#fed7aa','#fecdd3'];
const PHASE_GRAD   = [
  'linear-gradient(135deg,#2e7d32,#43a047)',
  'linear-gradient(135deg,#e65100,#fb8c00)',
  'linear-gradient(135deg,#d95555,#c62828)',
];
const SKILL_COUNT  = [3, 3, 2]; // 초급/중급: 3기술, 고급: 2기술

function renderGuideItems(text){
  const items = text.split(/(?=[①②③④⑤⑥])/).filter(s => s.trim());
  if(items.length <= 1) return `<p style="font-weight:700;letter-spacing:-.01em;">${text}</p>`;
  return `<div style="display:flex;flex-direction:column;gap:5px;">${
    items.map(item => {
      const m = item.match(/^([①②③④⑤⑥])\s*([\s\S]*)/);
      if(!m) return `<div style="font-weight:700;">${item.trim()}</div>`;
      return `<div style="display:flex;align-items:flex-start;gap:7px;line-height:1.55;"><span style="flex-shrink:0;font-weight:900;color:#4f46e5;">${m[1]}</span><span style="font-weight:700;">${m[2].trim()}</span></div>`;
    }).join('')
  }</div>`;
}

function phaseDone(p){
  return (JSON.parse(localStorage.getItem(`kps_${S.currentUser}_p${p}_done`)||'[]')).length >= 30;
}

export function isDayUnlocked(d){
  if(isAdmin()) return true;
  if(d===1) return true;
  if(S.completedDays.includes(d)) return true; // 이미 완료한 날은 항상 접근 가능
  if(!S.completedDays.includes(d-1)) return false; // 이전 날 미완료면 잠금
  // 이전 날을 오늘 완료했으면 내일이 돼야 열림
  const prevDate = S.completedDates[d-1];
  if(!prevDate) return false;
  return todayStr() > prevDate;
}

export function renderStrip(){
  const strip = document.getElementById('days-strip');
  strip.innerHTML='';
  const accentDone = S.currentPhase===0?'#ecfdf5':S.currentPhase===1?'#fff7ed':'#fff1f2';
  const accentBorder = PHASE_BORDER[S.currentPhase];
  for(let i=1;i<=30;i++){
    const done=S.completedDays.includes(i), cur=i===S.currentDay, unlocked=isDayUnlocked(i);
    const btn=document.createElement('button');
    btn.style.cssText=`min-width:50px;height:50px;border-radius:14px;border:2px solid;font-size:.75rem;font-weight:800;font-family:inherit;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .2s;position:relative;`;
    if(cur){        btn.style.cssText+=`background:var(--navy);color:#fff;border-color:var(--navy);transform:scale(1.08);box-shadow:0 4px 12px rgba(26,53,96,.35);cursor:pointer;`; }
    else if(done){  btn.style.cssText+=`background:${accentDone};color:#065f46;border-color:${accentBorder};cursor:pointer;`; }
    else if(unlocked){ btn.style.cssText+=`background:#f1f5f9;color:#64748b;border-color:#e2e8f0;cursor:pointer;`; }
    else { btn.style.cssText+=`background:#f8f9fa;color:#cbd5e1;border-color:#e9ecef;cursor:not-allowed;opacity:.55;`; }
    btn.innerHTML=`<span style="font-size:.62rem;line-height:1;">${unlocked?'D-'+i:'🔒'}</span><span style="font-size:.7rem;">${unlocked?'':i}</span>`;
    if(done){
      const badge=document.createElement('span');
      badge.style.cssText=`position:absolute;bottom:-3px;right:-3px;background:${PHASE_COLOR[S.currentPhase]};color:#fff;border-radius:50%;width:14px;height:14px;font-size:8px;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff;font-weight:900;`;
      badge.textContent='✓';
      btn.appendChild(badge);
    }
    btn.onclick=()=>selectDay(i);
    strip.appendChild(btn);
  }
  setTimeout(()=>{ const a=strip.children[S.currentDay-1]; if(a) a.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}); },100);
}

export function renderPhaseBar(){
  const container = document.getElementById('phase-bar');
  if(!container) return;
  const adminOn = isAdmin();
  container.innerHTML = [0,1,2].map(i=>{
    const isCurrent = i === S.currentPhase;
    const doneCnt   = JSON.parse(localStorage.getItem(`kps_${S.currentUser}_p${i}_done`)||'[]').length;
    const unlocked  = adminOn || i===0 || (i===1 && phaseDone(0)) || (i===2 && phaseDone(1));
    const clickable = adminOn && !isCurrent;
    return `<div onclick="${clickable?`adminSwitchPhase(${i})`:''}" style="flex:1;padding:10px 6px;border-radius:12px;text-align:center;border:2px solid ${isCurrent?PHASE_BORDER[i]:'transparent'};background:${isCurrent?PHASE_BG[i]:'transparent'};transition:all .2s;${unlocked?'':'opacity:.4;'}${clickable?'cursor:pointer;':''}" ${clickable?'title="Click to switch phase"':''}>
      <div style="font-size:.82rem;font-weight:900;color:${isCurrent?PHASE_COLOR[i]:'#94a3b8'};">${PHASE_EMOJI[i]} ${pn(i)}${clickable?' ↗':''}${isCurrent?' ✦':''}</div>
      <div style="font-size:.68rem;color:${isCurrent?PHASE_COLOR[i]:'#94a3b8'};margin-top:2px;">${unlocked?doneCnt+'/30':t('phase.locked')}</div>
    </div>`;
  }).join('');
}

export function adminSwitchPhase(p){
  S.currentPhase = p;
  localStorage.setItem(`kps_${S.currentUser}_phase`, p);
  S.currentDay    = parseInt(localStorage.getItem(`kps_${S.currentUser}_p${p}_day`)) || 1;
  S.completedDays = JSON.parse(localStorage.getItem(`kps_${S.currentUser}_p${p}_done`)) || [];
  window.initApp();
  showToast(`🔧 ${PHASE_NAMES[p]} 페이즈로 이동`);
}

export function renderSkills(){
  const routine=DB.find(r=>r.day===S.currentDay)||DB[0];
  document.getElementById('routine-title').textContent=`📅 { ${pn(S.currentPhase)} Day ${S.currentDay} } ${t('ach.today.challenge')}`;
  const skills=S.currentPhase===0?routine.beginner:S.currentPhase===1?routine.intermediate:routine.advanced;
  const list=document.getElementById('skills-list');
  list.innerHTML='';
  skills.forEach((skill,idx)=>{
    if(S.watchStatus[idx]===undefined) S.watchStatus[idx]=false;
    if(S.timerStatus[idx]===undefined) S.timerStatus[idx]=300;
    const watched=S.watchStatus[idx], timerVal=S.timerStatus[idx];
    const accentColor=PHASE_COLOR[S.currentPhase];
    const accentBg=PHASE_BG[S.currentPhase];
    const accentBorder=PHASE_BORDER[S.currentPhase];
    const card=document.createElement('div');
    card.id=`card-${idx}`;
    card.style.cssText=`border-radius:18px;padding:20px;border:2px solid ${watched?accentBorder:'#e8edf5'};background:${watched?accentBg:'#fff'};transition:all .3s;box-shadow:0 2px 10px rgba(0,0,0,.04);`;
    card.className='slide-up';
    card.innerHTML=`
      <div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:.8rem;line-height:1.65;color:#1e1b4b;">
        <div style="display:flex;align-items:center;gap:6px;font-weight:900;color:#4f46e5;margin-bottom:6px;font-size:.78rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#4f46e5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          ${t('skill.how_to')}
        </div>
        ${renderGuideItems(getLang()==='en'?(skill.guideEn||skill.guide):skill.guide)}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:9px;">
          <span style="width:26px;height:26px;border-radius:50%;background:${watched?accentColor:'#e0e7ff'};color:${watched?'#fff':'#4f46e5'};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:.75rem;flex-shrink:0;">${watched?'✓':idx+1}</span>
          <span style="font-size:.95rem;font-weight:900;color:#1e293b;">${getLang()==='en'?(skill.nameEn||skill.name):skill.name}</span>
        </div>
        <span id="watch-badge-${idx}" style="font-size:.7rem;font-weight:900;padding:4px 10px;border-radius:20px;background:${watched?'#dcfce7':'#ffe4e6'};color:${watched?'#166534':'#9f1239'};">${watched?t('skill.watch_done'):t('skill.watch_pending')}</span>
      </div>
      <p style="font-size:.8rem;color:#64748b;margin-bottom:14px;padding-left:35px;line-height:1.6;">${getLang()==='en'?(skill.descEn||skill.desc):skill.desc}</p>
      <div style="position:relative;border-radius:14px;overflow:hidden;background:#0f0f1a;aspect-ratio:16/9;border:1.5px solid #1e293b;cursor:pointer;" onclick="watchVideo(${idx},'${skill.ytId}')">
        <img src="https://img.youtube.com/vi/${skill.ytId}/maxresdefault.jpg" onerror="this.src='https://img.youtube.com/vi/${skill.ytId}/hqdefault.jpg'" style="width:100%;height:100%;object-fit:cover;display:block;position:absolute;inset:0;"/>
        <div id="cover-${idx}" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .3s;background:${watched?'rgba(0,0,0,.15)':'rgba(0,0,0,.48)'};">
          ${watched
            ? `<div style="display:flex;flex-direction:column;align-items:center;gap:7px;"><div style="background:rgba(46,125,50,.92);border-radius:14px;padding:9px 18px;display:flex;align-items:center;gap:7px;color:#fff;font-size:.82rem;font-weight:800;box-shadow:0 2px 10px rgba(0,0,0,.3);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>${t('skill.overlay_done')}</div><span style="color:#fff;font-size:.68rem;font-weight:700;background:rgba(0,0,0,.55);padding:3px 11px;border-radius:10px;">${t('skill.overlay_hint')}</span></div>`
            : `<button onclick="event.stopPropagation();watchVideo(${idx},'${skill.ytId}')" style="width:64px;height:64px;background:rgba(220,20,20,.92);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-bottom:10px;box-shadow:0 4px 18px rgba(0,0,0,.4);transition:transform .15s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></button><div style="display:flex;flex-direction:column;align-items:center;gap:5px;"><span style="color:#fff;font-size:.78rem;font-weight:800;background:rgba(0,0,0,.72);padding:5px 14px;border-radius:20px;">${t('skill.watch_video')}</span><span style="color:#fbbf24;font-size:.7rem;font-weight:700;background:rgba(0,0,0,.6);padding:3px 10px;border-radius:12px;">${t('skill.watch_pct_req')}</span></div>`
          }
        </div>
      </div>
      <div style="margin-top:16px;background:#f8faff;border-radius:12px;padding:14px 16px;border:1.5px solid #e0e7ff;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:.8rem;color:#475569;font-weight:700;">${t('skill.practice')}</span>
          <span id="timer-${idx}" style="font-size:1.25rem;font-weight:900;color:${timerVal<300?'#16a34a':'#4f46e5'};font-family:monospace;">${timerVal<=0?t('skill.timer_done'):fmt(timerVal)}</span>
        </div>
        <button id="tbtn-${idx}" onclick="startTimer(${idx})" ${watched?'':'disabled'}
          style="width:100%;font-size:.84rem;font-weight:800;padding:12px 14px;border-radius:10px;border:none;cursor:${watched?'pointer':'not-allowed'};font-family:inherit;background:${watched?accentColor:'#e2e8f0'};color:${watched?'#fff':'#94a3b8'};transition:all .2s;letter-spacing:.01em;">
          ${timerVal<=0?t('skill.timer_retry'):t('skill.timer_start')}
        </button>
      </div>
    `;
    list.appendChild(card);
  });
}

export function updateStats(){
  let total=0;
  for(let p=0;p<3;p++) total += JSON.parse(localStorage.getItem(`kps_${S.currentUser}_p${p}_done`)||'[]').length;
  document.getElementById('stat-completed').textContent = S.completedDays.length;
  document.getElementById('stat-current').textContent   = `${pn(S.currentPhase)} D-${S.currentDay}`;
  document.getElementById('header-progress').textContent= `${total} / 90`;
  let streak=0;
  for(let i=S.currentDay;i>=1;i--){ if(S.completedDays.includes(i)) streak++; else break; }
  document.getElementById('stat-streak').textContent = `🔥 ${streak}`;
  document.getElementById('progress-text').textContent = `${total} ${t('ach.progress.text')}`;
}

export function updateStampBtn(){
  const count = SKILL_COUNT[S.currentPhase];
  let allDone = true;
  for(let i=0;i<count;i++){ if(!S.watchStatus[i]){allDone=false;break;} }
  const btn=document.getElementById('main-stamp-btn'), icon=document.getElementById('btn-icon'), txt=document.getElementById('btn-text');

  // 이미 완료된 날 → 도장/돈 잠금
  if(S.completedDays.includes(S.currentDay)){
    btn.disabled=true; btn.style.background='#bbf7d0'; btn.style.color='#166534'; btn.style.boxShadow='none'; btn.style.cursor='not-allowed';
    icon.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>'; icon.setAttribute('viewBox','0 0 24 24'); icon.setAttribute('stroke-width','2.5');
    txt.textContent=`✅ Day ${S.currentDay} (${S.completedDates[S.currentDay]||''})`;
    return;
  }

  if(allDone){
    btn.disabled=false; btn.style.cursor='pointer'; btn.style.transform='';
    btn.style.background=PHASE_GRAD[S.currentPhase]; btn.style.color='#fff';
    btn.style.boxShadow=`0 4px 16px ${S.currentPhase===0?'rgba(46,125,50,.35)':S.currentPhase===1?'rgba(230,81,0,.35)':'rgba(217,85,85,.35)'}`;
    txt.textContent=S.currentDay<30
      ? `${PHASE_EMOJI[S.currentPhase]} Day ${S.currentDay} — ${t('stamp.ready')}`
      : `${PHASE_EMOJI[S.currentPhase]} ${t('stamp.phase_done')}`;
    icon.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>'; icon.setAttribute('viewBox','0 0 24 24'); icon.setAttribute('stroke-width','2.5');
  } else {
    btn.disabled=true; btn.style.background='#e2e8f0'; btn.style.color='#94a3b8'; btn.style.boxShadow='none'; btn.style.cursor='not-allowed';
    icon.innerHTML='<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'; icon.setAttribute('stroke-width','2');
    txt.textContent=t('stamp.locked').replace('${count}', count);
  }
}

// ── YouTube IFrame API 로드 (최초 1회) ──
let _ytApiReady = false;
let _ytApiLoading = false;
const _ytApiCallbacks = [];
function loadYTApi(cb){
  if(_ytApiReady){ cb(); return; }
  _ytApiCallbacks.push(cb);
  if(_ytApiLoading) return;
  _ytApiLoading = true;
  window.onYouTubeIframeAPIReady = ()=>{
    _ytApiReady = true;
    _ytApiCallbacks.forEach(f=>f());
    _ytApiCallbacks.length = 0;
  };
  const s=document.createElement('script');
  s.src='https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
}

let _ytPlayer = null;
let _ytPollIv = null;
let _ytWatchIdx = -1;
let _ytAlreadyDone = false;

export function watchVideo(idx, videoId){
  // 이미 완료된 영상도 다시 볼 수 있게 모달 열기
  _openVideoModal(idx, videoId);
}

function _openVideoModal(idx, videoId){
  document.getElementById('yt-modal')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'yt-modal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:30000;background:rgba(0,0,0,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;';

  const alreadyWatched = !!S.watchStatus[idx];
  overlay.innerHTML = `
    <div style="width:100%;max-width:600px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span id="yt-status-label" style="font-size:.82rem;font-weight:800;color:#fff;background:rgba(255,255,255,.12);padding:5px 12px;border-radius:20px;">
          ${alreadyWatched ? t('skill.already_watched') : t('skill.watch_80pct')}
        </span>
        <button onclick="document.getElementById('yt-modal').remove();window._closeYtPlayer();"
          style="background:rgba(255,255,255,.15);border:none;color:#fff;border-radius:50%;width:36px;height:36px;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
      <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000;">
        <div id="yt-player-container"></div>
      </div>
      <div id="yt-progress-bar-wrap" style="margin-top:10px;height:6px;background:rgba(255,255,255,.2);border-radius:3px;overflow:hidden;">
        <div id="yt-progress-bar" style="height:100%;width:0%;background:#22c55e;border-radius:3px;transition:width .5s;"></div>
      </div>
      <div id="yt-progress-label" style="margin-top:6px;font-size:.72rem;color:rgba(255,255,255,.65);text-align:center;"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  _ytWatchIdx = idx;
  _ytAlreadyDone = alreadyWatched;

  loadYTApi(()=>{
    if(_ytPlayer){ _ytPlayer.destroy(); _ytPlayer=null; }
    _ytPlayer = new YT.Player('yt-player-container',{
      width:'100%', height:'100%',
      videoId,
      playerVars:{ autoplay:1, rel:0, modestbranding:1 },
      events:{
        onReady(e){ e.target.playVideo(); _startProgressPoll(); },
        onStateChange(e){ if(e.data===YT.PlayerState.ENDED) _onVideoProgress(1); }
      }
    });
  });
}

window._closeYtPlayer = function(){
  if(_ytPollIv){ clearInterval(_ytPollIv); _ytPollIv=null; }
  if(_ytPlayer){ try{ _ytPlayer.destroy(); }catch(e){} _ytPlayer=null; }
};

function _startProgressPoll(){
  if(_ytPollIv) clearInterval(_ytPollIv);
  _ytPollIv = setInterval(()=>{
    if(!_ytPlayer || typeof _ytPlayer.getCurrentTime!=='function') return;
    const cur = _ytPlayer.getCurrentTime();
    const dur = _ytPlayer.getDuration();
    if(!dur) return;
    const ratio = cur / dur;
    _onVideoProgress(ratio);
    const pct = Math.min(100, Math.round(ratio*100));
    const bar = document.getElementById('yt-progress-bar');
    const lbl = document.getElementById('yt-progress-label');
    if(bar) bar.style.width = pct+'%';
    if(lbl){
      if(_ytAlreadyDone){
        lbl.textContent = `${pct}${t('video.pct_watched')}`;
      } else {
        lbl.textContent = pct >= 80
          ? `✅ ${pct}${t('video.pct_done')}`
          : `${pct}${t('video.pct_hint')}`;
      }
    }
  },1000);
}

function _onVideoProgress(ratio){
  if(_ytAlreadyDone) return; // 이미 완료 → 진행률만 표시
  if(ratio < 0.8) return;
  if(S.watchStatus[_ytWatchIdx]) return;

  // 80% 달성 → 완료 처리
  clearInterval(_ytPollIv); _ytPollIv=null;
  S.watchStatus[_ytWatchIdx]=true;
  saveDayState();

  const lbl = document.getElementById('yt-status-label');
  if(lbl){ lbl.textContent=t('video.complete'); lbl.style.background='rgba(34,197,94,.3)'; }

  _markWatchedUI(_ytWatchIdx);
  window.showToast?.(t('toast.watch_done'));

  setTimeout(()=>{ document.getElementById('yt-modal')?.remove(); window._closeYtPlayer(); }, 1500);
}

function _markWatchedUI(idx){
  const badge=document.getElementById(`watch-badge-${idx}`);
  if(badge){ badge.style.background='#dcfce7'; badge.style.color='#166534'; badge.textContent=t('skill.watch_done'); }
  const tbtn=document.getElementById(`tbtn-${idx}`);
  if(tbtn){ tbtn.disabled=false; tbtn.style.background=PHASE_COLOR[S.currentPhase]; tbtn.style.color='#fff'; tbtn.style.cursor='pointer'; }
  const card=document.getElementById(`card-${idx}`);
  if(card){
    card.style.background=PHASE_BG[S.currentPhase]; card.style.borderColor=PHASE_BORDER[S.currentPhase];
    const numSpan=card.querySelector('span[style*="border-radius:50%"]');
    if(numSpan){ numSpan.style.background=PHASE_COLOR[S.currentPhase]; numSpan.style.color='#fff'; numSpan.textContent='✓'; }
  }
  const cover=document.getElementById(`cover-${idx}`);
  if(cover){
    cover.style.background='rgba(0,0,0,.15)';
    cover.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;gap:7px;"><div style="background:rgba(46,125,50,.92);border-radius:14px;padding:9px 18px;display:flex;align-items:center;gap:7px;color:#fff;font-size:.82rem;font-weight:800;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>${t('skill.overlay_done')}</div><span style="color:#fff;font-size:.68rem;font-weight:700;background:rgba(0,0,0,.55);padding:3px 11px;border-radius:10px;">${t('skill.overlay_hint')}</span></div>`;
  }
  updateStampBtn();
}

export function startTimer(idx){
  if(S.timerIntervals[idx]) clearInterval(S.timerIntervals[idx]);
  const display=document.getElementById(`timer-${idx}`), btn=document.getElementById(`tbtn-${idx}`);
  btn.disabled=true; btn.style.background='#e2e8f0'; btn.style.color='#94a3b8';
  let secs=S.timerStatus[idx]||300;
  if(secs<=0) secs=300;
  display.style.color='#dc2626';
  S.timerIntervals[idx]=setInterval(()=>{
    secs--; S.timerStatus[idx]=secs; saveDayState(); display.textContent=fmt(secs);
    if(secs<=0){
      clearInterval(S.timerIntervals[idx]); display.textContent=t('skill.timer_done'); display.style.color='#16a34a';
      btn.disabled=false; btn.textContent=t('skill.timer_retry');
      btn.style.background=PHASE_COLOR[S.currentPhase]; btn.style.color='#fff'; btn.style.cursor='pointer';
    }
  },1000);
}

export function handleStampClick(){
  const modal=document.getElementById('success-modal'), stamp=document.getElementById('stamp-mark');
  const title=document.getElementById('modal-title'), desc=document.getElementById('modal-desc'), actionBtn=document.getElementById('modal-action-btn');
  stamp.style.opacity='0'; void stamp.offsetWidth; stamp.style.opacity='1';
  stamp.classList.remove('stamp-in'); void stamp.offsetWidth; stamp.classList.add('stamp-in');

  // 현재 날 완료 처리
  if(!S.completedDays.includes(S.currentDay)){
    S.completedDays.push(S.currentDay);
    localStorage.setItem(pKey('done'), JSON.stringify(S.completedDays));
    saveCompletedDate(S.currentDay);
    addCoins(COINS_PER_DAY);
    window.showToast(t('toast.coins').replace('$5', `$${COINS_PER_DAY}`));
  }

  if(S.currentDay < 30){
    title.textContent=`${pn(S.currentPhase)} Day ${S.currentDay} ${PHASE_EMOJI[S.currentPhase]}`;
    desc.innerHTML=`Day ${S.currentDay} complete! Great work 💪<br>See you tomorrow!`;
    actionBtn.style.background=PHASE_GRAD[S.currentPhase];
    actionBtn.textContent=`${pn(S.currentPhase)} Day ${S.currentDay+1} ⚡`;
    S.nextStepAction=()=>{
      S.currentDay++;
      localStorage.setItem(pKey('day'), S.currentDay);
      window.initApp();
    };
  } else if(S.currentPhase < 2){
    const next=S.currentPhase+1;
    title.textContent=t('modal.phase_done');
    desc.innerHTML=`Amazing! <strong style="color:${PHASE_COLOR[S.currentPhase]};">${pn(S.currentPhase)} 30 Days</strong> complete!<br>${pn(next)} level is now unlocked! 🎉`;
    actionBtn.style.background=PHASE_GRAD[next];
    actionBtn.textContent=`${t('modal.next_btn')}`;
    S.nextStepAction=()=>{
      S.currentPhase=next;
      localStorage.setItem(lsKey('phase'), S.currentPhase);
      S.currentDay=1;
      S.completedDays=[];
      localStorage.setItem(pKey('day'), 1);
      window.initApp();
    };
  } else {
    title.textContent=t('modal.all_done');
    desc.innerHTML=t('modal.all_desc');
    actionBtn.style.background='linear-gradient(135deg,var(--navy),#1565c0)';
    actionBtn.textContent=t('modal.restart');
    S.nextStepAction=()=>{
      S.currentPhase=0;
      localStorage.setItem(lsKey('phase'), 0);
      S.currentDay=1;
      S.completedDays=[];
      localStorage.setItem(pKey('day'), 1);
      window.initApp();
    };
  }
  modal.style.display='flex';
}

export function executeNextStep(){ document.getElementById('success-modal').style.display='none'; if(S.nextStepAction){S.nextStepAction();S.nextStepAction=null;} }

export function selectDay(d){
  if(!isDayUnlocked(d)){ showToast(`🔒 ${pn(S.currentPhase)} Day ${d-1} must be completed first!`); return; }
  S.currentDay=d; localStorage.setItem(pKey('day'),d); window.initApp();
}

export function showToast(msg){
  let toast=document.getElementById('kps-toast');
  if(!toast){ toast=document.createElement('div'); toast.id='kps-toast'; toast.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(15,32,64,.92);color:#fff;padding:11px 20px;border-radius:14px;font-size:.82rem;font-weight:700;z-index:500;opacity:0;transition:all .3s;pointer-events:none;white-space:nowrap;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);'; document.body.appendChild(toast); }
  toast.textContent=msg; toast.style.opacity='1'; toast.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(toast._t);
  toast._t=setTimeout(()=>{ toast.style.opacity='0'; toast.style.transform='translateX(-50%) translateY(10px)'; },2200);
}

export function showResetConfirm(){ document.getElementById('confirm-modal').style.display='flex'; }
export function hideResetConfirm(){ document.getElementById('confirm-modal').style.display='none'; }
export function resetProgress(){
  S.currentPhase=0; S.currentDay=1; S.completedDays=[];
  localStorage.setItem(lsKey('phase'), 0);
  for(let p=0;p<3;p++){
    const pk=`kps_${S.currentUser}_p${p}_`;
    localStorage.removeItem(pk+'day');
    localStorage.removeItem(pk+'done');
    for(let d=1;d<=30;d++){
      localStorage.removeItem(pk+`watch_${d}`);
      localStorage.removeItem(pk+`timer_${d}`);
    }
  }
  hideResetConfirm(); window.initApp();
}
