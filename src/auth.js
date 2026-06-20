// ══════════════════════════════════════════
//  인증 시스템 + UI
// ══════════════════════════════════════════
import { S, lsKey, initUserState } from './state.js';
import { makeAvatarSVG, getAvatar, getCoins } from './avatar.js';
import { t, getLang } from './i18n.js';

const PW_SALT = '_kps2025rope';

export async function hashPw(pw){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw + PW_SALT));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

export async function ensureAdminAccount(){
  const users = JSON.parse(localStorage.getItem('kps_users')||'{}');
  users['kpsrope'] = { hash: await hashPw('12345678rope'), isAdmin: true, name:'이시형', nameEn:'Sihyung Lee' };
  localStorage.setItem('kps_users', JSON.stringify(users));
}

export function getUsers(){ return JSON.parse(localStorage.getItem('kps_users')||'{}'); }

export async function doLogin(id, pw){
  const users = getUsers();
  const cleanId = id.toLowerCase();
  if(!users[cleanId]) return t('err.no_user');
  const hash = await hashPw(pw);
  if(hash !== users[cleanId].hash) return t('err.wrong_pw');
  S.currentUser = cleanId;
  localStorage.setItem('kps_auth_user', cleanId);
  return null;
}

export async function doSignup(id, pw, pw2, name){
  if(!name||!name.trim()) return t('err.no_name');
  if(!/^[a-zA-Z0-9_]{3,16}$/.test(id)) return t('err.bad_id');
  if(pw.length < 6) return t('err.short_pw');
  if(pw !== pw2) return t('err.pw_mismatch');
  const users = getUsers();
  const cleanId = id.toLowerCase();
  if(users[cleanId]) return t('err.id_taken');
  users[cleanId] = { hash: await hashPw(pw), isAdmin: false, name: name.trim() };
  localStorage.setItem('kps_users', JSON.stringify(users));
  S.currentUser = cleanId;
  localStorage.setItem('kps_auth_user', cleanId);
  return null;
}

export function doLogout(){
  if(S.adminMode){
    // 작업모드 중 무료 구매한 테스트 아이템 초기화
    localStorage.removeItem(lsKey('inv'));
    const av = getAvatar();
    if(av){ av.equipped={}; localStorage.setItem(lsKey('avatar'),JSON.stringify(av)); }
    localStorage.removeItem('kps_admin');
  }
  S.currentUser = null;
  S.adminMode = false;
  localStorage.removeItem('kps_auth_user');
  renderHomePage();
}

export function isAdminUser(){
  const users = getUsers();
  return !!(S.currentUser && users[S.currentUser]?.isAdmin);
}

// ── 인증 UI ──
export const BADGE_SVG = `<svg width="52" height="52" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="#1a3560" stroke="#c9a227" stroke-width="2.5"/>
  <circle cx="50" cy="50" r="40" fill="none" stroke="#c9a227" stroke-width="1.2" stroke-dasharray="3,2"/>
  <path id="arc-top2" d="M18,50 A32,32 0 1,1 82,50" fill="none"/>
  <text font-family="Georgia,serif" font-size="8.5" font-weight="bold" fill="#c9a227" letter-spacing="2">
    <textPath href="#arc-top2" startOffset="8%">KEW PRIMARY SCHOOL</textPath>
  </text>
  <text x="50" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="bold" fill="#fff">K</text>
  <path id="arc-bot2" d="M24,63 A28,28 0 0,0 76,63" fill="none"/>
  <text font-family="Georgia,serif" font-size="8" font-weight="bold" fill="#c9a227" letter-spacing="2">
    <textPath href="#arc-bot2" startOffset="12%">BE WORTHY</textPath>
  </text>
  <text x="26" y="52" text-anchor="middle" font-size="7" fill="#c9a227">★</text>
  <text x="74" y="52" text-anchor="middle" font-size="7" fill="#c9a227">★</text>
</svg>`;

export function inputStyle(){ return `width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:12px;font-size:.9rem;font-family:'Noto Sans KR',sans-serif;outline:none;transition:border .2s;box-sizing:border-box;`; }

export function renderAuthScreen(mode='login'){
  document.getElementById('auth-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:linear-gradient(135deg,#1a3560 0%,#1565c0 60%,#0f2040 100%);display:flex;align-items:center;justify-content:center;padding:20px;font-family:\'Noto Sans KR\',sans-serif;';

  overlay.innerHTML = `
    <div style="background:#fff;border-radius:24px;padding:32px 26px;width:100%;max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,.35);">

      <!-- badge + title -->
      <div style="text-align:center;margin-bottom:26px;">
        ${BADGE_SVG}
        <div style="font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#1a3560;margin-top:10px;line-height:1.3;">${t('auth.challenge_title')}</div>
        <div style="font-size:.74rem;color:#94a3b8;margin-top:3px;">Kew Primary School · Melbourne</div>
      </div>

      <!-- login panel -->
      <div id="panel-login" style="display:${mode==='login'?'block':'none'}">
        <div style="font-size:1.05rem;font-weight:900;color:#1a3560;margin-bottom:18px;text-align:center;">${t('auth.login')}</div>
        <div style="margin-bottom:12px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.username')}</label>
          <input id="li-id" type="text" placeholder="${t('auth.username_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')document.getElementById('li-pw').focus()">
        </div>
        <div style="margin-bottom:6px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password')}</label>
          <input id="li-pw" type="password" placeholder="${t('auth.password_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')authLogin()">
        </div>
        <div id="li-err" style="font-size:.75rem;color:#dc2626;font-weight:700;min-height:18px;margin-bottom:10px;text-align:center;"></div>
        <button id="li-btn" onclick="authLogin()"
          style="width:100%;padding:14px;background:linear-gradient(135deg,#1a3560,#1565c0);color:#fff;border:none;border-radius:14px;font-size:.95rem;font-weight:900;font-family:inherit;cursor:pointer;transition:opacity .2s;margin-bottom:10px;">
          ${t('auth.login')}
        </button>
        <button onclick="switchPanel('signup')"
          style="width:100%;padding:11px;background:#f1f5f9;color:#475569;border:none;border-radius:12px;font-size:.82rem;font-weight:700;font-family:inherit;cursor:pointer;">
          ${t('auth.no_account')} <span style="color:#1565c0;font-weight:900;">${t('auth.signup')}</span>
        </button>
      </div>

      <!-- signup panel -->
      <div id="panel-signup" style="display:${mode==='signup'?'block':'none'}">
        <div style="font-size:1.05rem;font-weight:900;color:#1a3560;margin-bottom:18px;text-align:center;">${t('auth.signup')}</div>
        <div style="margin-bottom:11px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.fullname')} <span style="color:#94a3b8;font-weight:500;">${t('auth.fullname_hint')}</span></label>
          <input id="su-name" type="text" placeholder="${t('auth.fullname_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')document.getElementById('su-id').focus()">
        </div>
        <div style="margin-bottom:11px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.username')} <span style="color:#94a3b8;font-weight:500;">${t('auth.username_hint')}</span></label>
          <input id="su-id" type="text" placeholder="${t('auth.username_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')document.getElementById('su-pw').focus()">
        </div>
        <div style="margin-bottom:11px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password')} <span style="color:#94a3b8;font-weight:500;">${t('auth.password_hint')}</span></label>
          <input id="su-pw" type="password" placeholder="${t('auth.password_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')document.getElementById('su-pw2').focus()">
        </div>
        <div style="margin-bottom:6px;">
          <label style="font-size:.78rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password_confirm')}</label>
          <input id="su-pw2" type="password" placeholder="${t('auth.password_confirm_ph')}" style="${inputStyle()}"
            onkeydown="if(event.key==='Enter')authSignup()">
        </div>
        <div id="su-err" style="font-size:.75rem;color:#dc2626;font-weight:700;min-height:18px;margin-bottom:10px;text-align:center;"></div>
        <button id="su-btn" onclick="authSignup()"
          style="width:100%;padding:14px;background:linear-gradient(135deg,#2e7d32,#43a047);color:#fff;border:none;border-radius:14px;font-size:.95rem;font-weight:900;font-family:inherit;cursor:pointer;transition:opacity .2s;margin-bottom:10px;">
          ${t('auth.join')}
        </button>
        <button onclick="switchPanel('login')"
          style="width:100%;padding:11px;background:#f1f5f9;color:#475569;border:none;border-radius:12px;font-size:.82rem;font-weight:700;font-family:inherit;cursor:pointer;">
          ${t('auth.has_account')} <span style="color:#1565c0;font-weight:900;">${t('auth.login')}</span>
        </button>
      </div>

    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelectorAll('input').forEach(el=>{
    el.style.webkitUserSelect='auto';
    el.style.userSelect='auto';
  });
}

export function switchPanel(to){
  document.getElementById('panel-login').style.display = to==='login'?'block':'none';
  document.getElementById('panel-signup').style.display = to==='signup'?'block':'none';
}

export async function authLogin(){
  const btn = document.getElementById('li-btn');
  const err = document.getElementById('li-err');
  const id  = document.getElementById('li-id').value.trim();
  const pw  = document.getElementById('li-pw').value;
  err.textContent='';
  btn.textContent=t('auth.logging_in'); btn.disabled=true;
  const msg = await doLogin(id, pw);
  btn.textContent=t('auth.login'); btn.disabled=false;
  if(msg){ err.textContent=msg; return; }
  // 항상 일반모드로 시작 (작업모드는 배지 탭으로 수동 전환)
  S.adminMode = false;
  localStorage.removeItem('kps_admin');
  document.getElementById('auth-overlay')?.remove();
  initUserState();
  renderUserBadge();
  window.initApp();
}

export async function authSignup(){
  const btn  = document.getElementById('su-btn');
  const err  = document.getElementById('su-err');
  const name = document.getElementById('su-name').value.trim();
  const id   = document.getElementById('su-id').value.trim();
  const pw   = document.getElementById('su-pw').value;
  const pw2  = document.getElementById('su-pw2').value;
  err.textContent='';
  btn.textContent=t('auth.signing_up'); btn.disabled=true;
  const msg = await doSignup(id, pw, pw2, name);
  btn.textContent=t('auth.join'); btn.disabled=false;
  if(msg){ err.textContent=msg; return; }
  document.getElementById('auth-overlay')?.remove();
  initUserState();
  renderUserBadge();
  window.initApp();
}

export function switchHomePanel(to){
  const lp = document.getElementById('h-panel-login');
  const sp = document.getElementById('h-panel-signup');
  const lt = document.getElementById('h-tab-login');
  const st = document.getElementById('h-tab-signup');
  if(!lp) return;
  lp.style.display = to==='login'?'block':'none';
  sp.style.display = to==='signup'?'block':'none';
  if(lt){ lt.style.background=to==='login'?'#1a3560':'transparent'; lt.style.color=to==='login'?'#fff':'#64748b'; }
  if(st){ st.style.background=to==='signup'?'#1a3560':'transparent'; st.style.color=to==='signup'?'#fff':'#64748b'; }
}

// ── 홈 화면 ──
export function renderHomePage(){
  document.getElementById('home-overlay')?.remove();
  const el = document.createElement('div');
  el.id = 'home-overlay';
  el.style.cssText = `position:fixed;inset:0;z-index:5000;overflow-y:auto;font-family:'Noto Sans KR',sans-serif;`;
  el.innerHTML = _homeHTML();
  document.body.appendChild(el);
}

function _homeHTML(){
  const kpsAv = JSON.parse(localStorage.getItem('kps_kpsrope_avatar')||'null')||{};
  const leaderAvatarEl = kpsAv.animal
    ? `<div style="width:72px;height:88px;border-radius:18px;background:#f0f5ff;border:3px solid #c9a227;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;">${makeAvatarSVG(kpsAv,60,80)}</div>`
    : `<div style="width:72px;height:72px;border-radius:18px;background:linear-gradient(135deg,#1a3560,#2a4a80);border:3px solid #c9a227;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:2.1rem;">🏃</div>`;
  const scrollToAuth = `document.getElementById('home-overlay').scrollTo({top:0,behavior:'smooth'})`;

  const starData = [
    [5,8,.8,.25],[12,3,.6,.3],[20,15,1,.2],[8,25,.7,.28],[28,6,.9,.22],[35,18,.6,.32],[45,5,.8,.18],
    [55,12,.7,.26],[62,3,.5,.3],[72,8,.8,.24],[80,18,.6,.2],[88,5,.9,.28],[95,12,.7,.22],[3,35,.5,.3],
    [15,42,.8,.18],[25,38,.6,.25],[38,45,.7,.3],[50,30,.9,.2],[65,40,.6,.28],[82,35,.8,.22],
    [10,55,.7,.26],[30,62,.5,.3],[50,68,.8,.18],[70,58,.9,.24],[90,50,.6,.28],[18,75,.7,.2],
  ];
  const stars = starData.map(([x,y,r,o])=>`<circle cx="${x}%" cy="${y}%" r="${r}" fill="#fff" opacity="${o}"/>`).join('');
  const goldStars = [[40,10],[55,25],[70,15],[85,30],[25,22],[60,48]]
    .map(([x,y])=>`<circle cx="${x}%" cy="${y}%" r="1.1" fill="#c9a227" opacity="0.55"/>`).join('');

  const heroBadge = `<svg width="96" height="96" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#1a3560" stroke="#c9a227" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="40" fill="none" stroke="#c9a227" stroke-width="1.2" stroke-dasharray="3,2"/>
    <path id="h-arc-t" d="M18,50 A32,32 0 1,1 82,50" fill="none"/>
    <text font-family="Georgia,serif" font-size="8.5" font-weight="bold" fill="#c9a227" letter-spacing="2">
      <textPath href="#h-arc-t" startOffset="8%">KEW PRIMARY SCHOOL</textPath>
    </text>
    <text x="50" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="bold" fill="#fff">K</text>
    <path id="h-arc-b" d="M24,63 A28,28 0 0,0 76,63" fill="none"/>
    <text font-family="Georgia,serif" font-size="8" font-weight="bold" fill="#c9a227" letter-spacing="2">
      <textPath href="#h-arc-b" startOffset="12%">BE WORTHY</textPath>
    </text>
    <text x="26" y="52" text-anchor="middle" font-size="7" fill="#c9a227">★</text>
    <text x="74" y="52" text-anchor="middle" font-size="7" fill="#c9a227">★</text>
  </svg>`;

  const wsData = JSON.parse(localStorage.getItem('kps_weekly_schedule')||'null');
  const wsDef = {mon:{type:'practice'},tue:{type:'rest'},wed:{type:'practice'},thu:{type:'rest'},fri:{type:'practice'},sat_sun:{type:'free'}};
  const wsDays = wsData?.days || wsDef;
  const pracCount = Object.values(wsDays).filter(d=>d.type==='practice').length;
  const pracLabel = pracCount > 0 ? `${pracCount}x/week` : t('home.stat.weekly');

  const phases = [
    [t('phase.beginner'),'Day 1 – 30',t('phase.beginner_title'),t('phase.beginner_desc'),'#4f46e5'],
    [t('phase.intermediate'),'Day 31 – 60',t('phase.intermediate_title'),t('phase.intermediate_desc'),'#c9a227'],
    [t('phase.advanced'),'Day 61 – 90',t('phase.advanced_title'),t('phase.advanced_desc'),'#7c3aed'],
  ];
  const features = [
    ['🪢',t('home.feat1.title'),t('home.feat1.desc'),'#4f46e5'],
    ['🤝',t('home.feat2.title'),t('home.feat2.desc'),'#2e7d32'],
    ['🏆',t('home.feat3.title'),t('home.feat3.desc'),'#c9a227'],
    ['✨',t('home.feat4.title'),t('home.feat4.desc'),'#7c3aed'],
  ];

  const btnGold = `padding:15px 30px;background:linear-gradient(135deg,#c9a227,#e8b800);color:#0a0a1a;border:none;border-radius:14px;font-size:.93rem;font-weight:900;cursor:pointer;font-family:'Noto Sans KR',sans-serif;box-shadow:0 4px 18px rgba(201,162,39,.3);transition:transform .15s,box-shadow .15s;`;
  const btnOut = `padding:15px 26px;background:transparent;color:#fff;border:2px solid rgba(255,255,255,.32);border-radius:14px;font-size:.93rem;font-weight:700;cursor:pointer;font-family:'Noto Sans KR',sans-serif;transition:all .15s;`;

  const inp = inputStyle();
  const goLogin  = `${scrollToAuth};setTimeout(()=>window.switchHomePanel?.('login'),350)`;
  const goSignup = `${scrollToAuth};setTimeout(()=>window.switchHomePanel?.('signup'),350)`;
  const isLoggedIn = !!S.currentUser;
  const closeHome = `document.getElementById('home-overlay')?.remove()`;

  const navRight = isLoggedIn
    ? `<button onclick="${closeHome}" style="padding:8px 16px;background:rgba(201,162,39,.12);border:1.5px solid rgba(201,162,39,.42);border-radius:10px;color:#c9a227;font-size:.78rem;font-weight:800;cursor:pointer;font-family:'Noto Sans KR',sans-serif;" onmouseover="this.style.background='rgba(201,162,39,.22)'" onmouseout="this.style.background='rgba(201,162,39,.12)'">${t('auth.back_to_app_x')}</button>`
    : `<button onclick="${scrollToAuth}" style="padding:8px 16px;background:rgba(201,162,39,.1);border:1.5px solid rgba(201,162,39,.42);border-radius:10px;color:#c9a227;font-size:.78rem;font-weight:800;cursor:pointer;font-family:'Noto Sans KR',sans-serif;" onmouseover="this.style.background='rgba(201,162,39,.22)'" onmouseout="this.style.background='rgba(201,162,39,.1)'">${t('auth.login_signup')}</button>`;

  const authPanel = isLoggedIn
    ? `<div id="home-auth" style="width:100%;max-width:420px;background:#fff;border-radius:20px;padding:28px 32px;box-shadow:0 20px 60px rgba(0,0,0,.4);position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;">
        <div style="margin-bottom:20px;opacity:.9;">${BADGE_SVG}</div>
        <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#1a3560;margin-bottom:8px;">${t('auth.welcome')}${S.currentUser}!</div>
        <div style="font-size:.8rem;color:#94a3b8;margin-bottom:32px;">${t('auth.member_of')}</div>
        <button onclick="${closeHome}" style="width:100%;padding:14px;background:linear-gradient(135deg,#1a3560,#1565c0);color:#fff;border:none;border-radius:14px;font-size:.93rem;font-weight:900;font-family:'Noto Sans KR',sans-serif;cursor:pointer;margin-bottom:12px;">
          ${t('auth.back_to_app')}
        </button>
        <div style="font-size:.75rem;color:#cbd5e1;margin-top:4px;">${t('auth.back_hint')}</div>
      </div>`
    : `<div id="home-auth" style="width:100%;max-width:420px;background:#fff;border-radius:20px;padding:28px 32px;box-shadow:0 20px 60px rgba(0,0,0,.4);position:relative;z-index:1;">
        <div style="text-align:center;margin-bottom:24px;">
          ${BADGE_SVG}
          <div style="font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1a3560;margin-top:10px;line-height:1.3;">${t('auth.challenge_title')}</div>
          <div style="font-size:.72rem;color:#94a3b8;margin-top:2px;">Kew Primary School · Melbourne</div>
        </div>
        <div style="display:flex;background:#f1f5f9;border-radius:12px;padding:4px;margin-bottom:24px;">
          <button id="h-tab-login" onclick="window.switchHomePanel?.('login')"
            style="flex:1;padding:9px;border:none;border-radius:9px;font-size:.82rem;font-weight:800;cursor:pointer;font-family:'Noto Sans KR',sans-serif;background:#1a3560;color:#fff;transition:all .15s;">${t('auth.login')}</button>
          <button id="h-tab-signup" onclick="window.switchHomePanel?.('signup')"
            style="flex:1;padding:9px;border:none;border-radius:9px;font-size:.82rem;font-weight:800;cursor:pointer;font-family:'Noto Sans KR',sans-serif;background:transparent;color:#64748b;transition:all .15s;">${t('auth.join')}</button>
        </div>
        <div id="h-panel-login">
          <div style="margin-bottom:12px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.username')}</label>
            <input id="li-id" type="text" placeholder="${t('auth.username_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')document.getElementById('li-pw').focus()">
          </div>
          <div style="margin-bottom:6px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password')}</label>
            <input id="li-pw" type="password" placeholder="${t('auth.password_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')authLogin()">
          </div>
          <div id="li-err" style="font-size:.74rem;color:#dc2626;font-weight:700;min-height:18px;margin-bottom:10px;text-align:center;"></div>
          <button id="li-btn" onclick="authLogin()"
            style="width:100%;padding:13px;background:linear-gradient(135deg,#1a3560,#1565c0);color:#fff;border:none;border-radius:13px;font-size:.93rem;font-weight:900;font-family:'Noto Sans KR',sans-serif;cursor:pointer;margin-bottom:10px;">
            ${t('auth.login')}
          </button>
          <button onclick="window.switchHomePanel?.('signup')"
            style="width:100%;padding:10px;background:#f1f5f9;color:#475569;border:none;border-radius:11px;font-size:.8rem;font-weight:700;font-family:'Noto Sans KR',sans-serif;cursor:pointer;">
            ${t('auth.no_account')} <span style="color:#1565c0;font-weight:900;">${t('auth.join')}</span>
          </button>
        </div>
        <div id="h-panel-signup" style="display:none;">
          <div style="margin-bottom:10px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.fullname')} <span style="color:#94a3b8;font-weight:500;">${t('auth.fullname_hint')}</span></label>
            <input id="su-name" type="text" placeholder="${t('auth.fullname_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')document.getElementById('su-id').focus()">
          </div>
          <div style="margin-bottom:10px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.username')} <span style="color:#94a3b8;font-weight:500;">${t('auth.username_hint')}</span></label>
            <input id="su-id" type="text" placeholder="${t('auth.username_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')document.getElementById('su-pw').focus()">
          </div>
          <div style="margin-bottom:10px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password')} <span style="color:#94a3b8;font-weight:500;">${t('auth.password_hint')}</span></label>
            <input id="su-pw" type="password" placeholder="${t('auth.password_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')document.getElementById('su-pw2').focus()">
          </div>
          <div style="margin-bottom:6px;">
            <label style="font-size:.76rem;font-weight:700;color:#475569;display:block;margin-bottom:5px;">${t('auth.password_confirm')}</label>
            <input id="su-pw2" type="password" placeholder="${t('auth.password_confirm_ph')}" style="${inp}" onkeydown="if(event.key==='Enter')authSignup()">
          </div>
          <div id="su-err" style="font-size:.74rem;color:#dc2626;font-weight:700;min-height:18px;margin-bottom:10px;text-align:center;"></div>
          <button id="su-btn" onclick="authSignup()"
            style="width:100%;padding:13px;background:linear-gradient(135deg,#2e7d32,#43a047);color:#fff;border:none;border-radius:13px;font-size:.93rem;font-weight:900;font-family:'Noto Sans KR',sans-serif;cursor:pointer;margin-bottom:10px;">
            ${t('auth.join')}
          </button>
          <button onclick="window.switchHomePanel?.('login')"
            style="width:100%;padding:10px;background:#f1f5f9;color:#475569;border:none;border-radius:11px;font-size:.8rem;font-weight:700;font-family:'Noto Sans KR',sans-serif;cursor:pointer;">
            ${t('auth.has_account')} <span style="color:#1565c0;font-weight:900;">${t('auth.login')}</span>
          </button>
        </div>
      </div>`;

  return `
  <style>
    @media(max-width:560px){
      #home-hero{padding:48px 14px 36px!important;gap:18px!important;min-height:calc(100vh - 46px)!important}
      #home-auth{padding:18px 16px!important;border-radius:16px!important;margin:0 2px!important}
      #home-auth .font-display,#home-auth h2{font-size:1rem!important}
    }
    @media(max-width:400px){
      #home-hero{padding:36px 10px 28px!important;gap:14px!important}
      #home-auth{padding:16px 14px!important}
    }
  </style>

  <nav style="position:sticky;top:0;z-index:100;background:rgba(4,4,15,.93);backdrop-filter:blur(14px);border-bottom:1px solid rgba(201,162,39,.15);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
    <div style="display:flex;align-items:center;gap:8px;min-width:0;">
      <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;">
        <circle cx="50" cy="50" r="48" fill="#1a3560" stroke="#c9a227" stroke-width="2.5"/>
        <text x="50" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="bold" fill="#fff">K</text>
      </svg>
      <span style="font-size:.78rem;font-weight:900;color:#fff;letter-spacing:.01em;white-space:nowrap;">KPS Jump Rope Club</span>
    </div>
    <div style="flex-shrink:0;">${navRight}</div>
  </nav>

  <!-- ─── 센터 히어로: 브랜딩 + 로그인/가입 카드 세로 배치 ─── -->
  <section id="home-hero" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg,#04040f 0%,#080818 45%,#0c0a20 100%);padding:80px 20px 60px;position:relative;overflow:hidden;gap:32px;">

    <!-- 별 배경 -->
    <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" xmlns="http://www.w3.org/2000/svg">
      ${stars}${goldStars}
      <ellipse cx="50%" cy="0" rx="60%" ry="55%" fill="url(#hspot)" opacity=".09"/>
      <defs><radialGradient id="hspot" cx="50%" cy="0%" r="100%"><stop offset="0%" stop-color="#c9a227"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
    </svg>

    <!-- 브랜딩 (중앙 정렬) -->
    <div style="position:relative;z-index:1;text-align:center;max-width:520px;">
      <div style="display:inline-block;margin-bottom:20px;filter:drop-shadow(0 0 20px rgba(201,162,39,.3));">${heroBadge}</div>
      <div style="font-size:.6rem;font-weight:700;color:rgba(201,162,39,.7);letter-spacing:.24em;text-transform:uppercase;margin-bottom:14px;">✦ Kew Primary School · Melbourne ✦</div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5.5vw,3.8rem);font-weight:700;color:#fff;line-height:1.08;margin:0 0 6px;">${t('site.name')}</h1>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.2rem,3vw,1.8rem);font-weight:600;color:#c9a227;line-height:1.2;margin:0 0 16px;font-style:italic;">Jump Rope Club</h2>
      <div style="width:50px;height:1.5px;background:linear-gradient(90deg,transparent,#c9a227,transparent);margin:0 auto 14px;"></div>
      <p style="font-size:.86rem;color:rgba(255,255,255,.5);line-height:1.9;margin:0 auto;">${t('home.hero.desc')}</p>
    </div>

    <!-- 로그인/가입 카드 -->
    ${authPanel}

    <!-- scroll hint -->
    <div style="position:relative;z-index:1;color:rgba(255,255,255,.22);font-size:.66rem;letter-spacing:.14em;">∨ &nbsp; ${t('home.scroll_hint')}</div>
  </section>

  <!-- 통계 스트립 -->
  <div style="background:linear-gradient(90deg,#050510,#0c0820);border-top:1px solid rgba(201,162,39,.16);border-bottom:1px solid rgba(201,162,39,.16);">
    <div style="max-width:800px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);text-align:center;padding:0;">
      ${[['90 Days',t('home.stat.training')],['3 Levels',t('home.stat.levels')],[pracLabel,t('home.stat.weekly')],['Grand','Showcase']].map(([n,l],i)=>`
      <div style="padding:26px 10px;border-right:${i%2===0?'1px solid rgba(255,255,255,.06)':'none'};border-bottom:${i<2?'1px solid rgba(255,255,255,.06)':'none'};">
        <div style="font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700;color:#c9a227;">${n}</div>
        <div style="font-size:.63rem;color:rgba(255,255,255,.38);margin-top:4px;font-weight:600;letter-spacing:.05em;">${l}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- 클럽 소개 -->
  <section style="background:#fff;padding:72px 20px;">
    <div style="max-width:680px;margin:0 auto;">
      <div style="font-size:.63rem;font-weight:900;color:#c9a227;letter-spacing:.17em;text-transform:uppercase;margin-bottom:10px;text-align:center;">About the Club</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:700;color:#1a3560;text-align:center;margin:0 0 14px;line-height:1.3;">${t('home.about.title')}</h2>
      <p style="font-size:.87rem;color:#475569;line-height:2.1;text-align:center;margin:0 0 46px;">${t('home.about.desc')}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;">
        ${features.map(([em,t,d,c])=>`
        <div style="background:#f8faff;border-radius:16px;padding:22px 18px;border-left:4px solid ${c};" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 20px rgba(0,0,0,.07)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:1.5rem;margin-bottom:10px;">${em}</div>
          <div style="font-size:.83rem;font-weight:900;color:#1a3560;margin-bottom:6px;">${t}</div>
          <div style="font-size:.75rem;color:#64748b;line-height:1.85;">${d}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 3단계 훈련 -->
  <section style="background:linear-gradient(160deg,#060618,#0c0c26);padding:72px 20px;">
    <div style="max-width:680px;margin:0 auto;">
      <div style="font-size:.63rem;font-weight:900;color:rgba(201,162,39,.68);letter-spacing:.17em;text-transform:uppercase;margin-bottom:10px;text-align:center;">Training Program</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:700;color:#fff;text-align:center;margin:0 0 42px;line-height:1.3;">${t('home.training.title')}</h2>
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${phases.map(([lv,days,title,desc,c])=>`
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:24px;display:flex;gap:20px;align-items:flex-start;border-left:4px solid ${c};">
          <div style="flex-shrink:0;width:50px;height:50px;border-radius:12px;background:${c}1a;border:1.5px solid ${c}50;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:.63rem;font-weight:900;color:${c};">${lv}</span>
          </div>
          <div style="flex:1;">
            <div style="font-size:.64rem;font-weight:700;color:rgba(255,255,255,.36);margin-bottom:4px;">${days}</div>
            <div style="font-size:.9rem;font-weight:900;color:#fff;margin-bottom:6px;">${title}</div>
            <div style="font-size:.77rem;color:rgba(255,255,255,.46);line-height:1.8;">${desc}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- 팀 리더 -->
  <section style="background:#fff;padding:64px 20px;">
    <div style="max-width:680px;margin:0 auto;">
      <div style="font-size:.63rem;font-weight:900;color:#c9a227;letter-spacing:.17em;text-transform:uppercase;margin-bottom:10px;text-align:center;">Team Leader</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.4rem,3.5vw,2rem);font-weight:700;color:#1a3560;text-align:center;margin:0 0 30px;">${t('home.leader.title')}</h2>
      <div style="background:linear-gradient(135deg,#fef9ec,#fffbf0);border-radius:22px;padding:30px 26px;border:2px solid #e8d88a;box-shadow:0 4px 22px rgba(201,162,39,.1);">
        <div style="font-size:.63rem;font-weight:900;color:#a07c10;letter-spacing:.1em;text-transform:uppercase;margin-bottom:15px;">👑 Team Leader</div>
        <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
          ${leaderAvatarEl}
          <div>
            <div style="font-size:1.55rem;font-weight:900;color:#1a3560;line-height:1.1;">${t('leader.display_name')}</div>
            <div style="font-size:.75rem;color:#64748b;font-weight:700;margin-top:3px;">${t('leader.subtitle')}</div>
            <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;">
              <span style="background:#eef2ff;color:#4f46e5;font-size:.64rem;font-weight:800;padding:4px 10px;border-radius:8px;">${t('home.founder_badge')}</span>
              <span style="background:#f0fdf4;color:#166534;font-size:.64rem;font-weight:800;padding:4px 10px;border-radius:8px;">${t('home.leader_badge')}</span>
            </div>
          </div>
        </div>
        <p style="font-size:.85rem;color:#64748b;line-height:1.9;margin:18px 0 0;font-style:italic;border-top:1px solid #f0e8c0;padding-top:17px;">${t('comm.leader.quote')}</p>
      </div>
    </div>
  </section>

  <!-- 최종 CTA → 위로 스크롤 -->
  <section style="background:linear-gradient(160deg,#04040f,#0f0828);padding:88px 20px;text-align:center;">
    <div style="max-width:500px;margin:0 auto;">
      <div style="font-size:.62rem;font-weight:700;color:rgba(201,162,39,.62);letter-spacing:.22em;text-transform:uppercase;margin-bottom:16px;">${t('home.hero.ready')}</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:clamp(2rem,5.5vw,3rem);font-weight:700;color:#fff;line-height:1.2;margin:0 0 16px;">${t('home.hero.join_cta')}</h2>
      <p style="font-size:.84rem;color:rgba(255,255,255,.42);line-height:1.95;margin:0 0 42px;">${t('home.hero.join_desc')}</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <button onclick="${goSignup}"
          style="padding:14px 28px;background:linear-gradient(135deg,#c9a227,#e8b800);color:#0a0a1a;border:none;border-radius:14px;font-size:.93rem;font-weight:900;cursor:pointer;font-family:'Noto Sans KR',sans-serif;box-shadow:0 4px 18px rgba(201,162,39,.3);"
          onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
          ${t('home.hero.join_btn')}
        </button>
        <button onclick="${goLogin}"
          style="padding:14px 24px;background:transparent;color:#fff;border:2px solid rgba(255,255,255,.3);border-radius:14px;font-size:.93rem;font-weight:700;cursor:pointer;font-family:'Noto Sans KR',sans-serif;"
          onmouseover="this.style.borderColor='rgba(255,255,255,.6)';this.style.background='rgba(255,255,255,.06)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,.3)';this.style.background='transparent'">
          ${t('home.hero.login_btn')}
        </button>
      </div>
    </div>
  </section>

  <div style="background:#030309;border-top:1px solid rgba(201,162,39,.1);padding:22px 20px;text-align:center;">
    <div style="font-size:.7rem;color:rgba(255,255,255,.2);">© 2026 KPS Jump Rope Club — Kew Primary School, Melbourne. All Rights Reserved.</div>
  </div>
  `;
}

export function renderUserBadge(){
  const container = document.getElementById('user-badge-area');
  if(!container) return;
  const av = getAvatar();
  const users = JSON.parse(localStorage.getItem('kps_users')||'{}');
  const u = users[S.currentUser];
  const realName = (getLang()==='en' && u?.nameEn) ? u.nameEn : (u?.name || '');
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;">
      <button onclick="showAvatarProfile()"
        style="background:#f0f5ff;border:2.5px solid var(--gold);border-radius:12px;padding:2px;cursor:pointer;flex-shrink:0;width:46px;height:60px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.12);">
        ${makeAvatarSVG(av,40,52)}
      </button>
      <div id="badge-info-col">
        ${realName ? `<div style="font-size:.78rem;font-weight:900;color:${isAdminUser()?'#7c3aed':'var(--navy)'};">${isAdminUser()?'👑 ':''}${realName}</div>` : ''}
        <div style="font-size:${realName?'.65rem':'.72rem'};font-weight:${realName?'600':'900'};color:${realName?'#94a3b8':isAdminUser()?'#7c3aed':'var(--navy)'};">${realName?'@':''}${S.currentUser}</div>
        <div style="display:flex;align-items:center;gap:5px;margin-top:2px;">
          <span id="coin-display" style="font-size:.68rem;font-weight:800;color:var(--gold);">$${getCoins()}</span>
          <button onclick="showShop()" style="font-size:.62rem;font-weight:800;padding:2px 7px;border-radius:7px;border:1.5px solid var(--gold);background:#fef9ec;color:#a07c10;cursor:pointer;font-family:inherit;">${t('badge.shop')}</button>
        </div>
      </div>
      <button id="badge-logout-btn" onclick="doLogout()"
        style="background:#f1f5f9;border:1.5px solid #ddd;color:#64748b;border-radius:9px;padding:6px 10px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;"
        onmouseover="this.style.background='#fee2e2';this.style.color='#dc2626'"
        onmouseout="this.style.background='#f1f5f9';this.style.color='#64748b'">
        ${t('badge.logout')}
      </button>
    </div>
  `;
}
