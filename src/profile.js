// ══════════════════════════════════════════
//  개인 프로필 + 갤러리 관리자 시스템
// ══════════════════════════════════════════
import { S } from './state.js';
import { isAdmin } from './admin.js';
import { makeAvatarSVG } from './avatar.js';
import { t, getLang } from './i18n.js';

// ── 아바타 가져오기 (다른 유저 포함) ──
function getAvatarOf(username){
  return JSON.parse(localStorage.getItem(`kps_${username}_avatar`)||'null')||{};
}

// ── 유저 오브젝트를 배열로 변환 ──
function getUsersArray(){
  const obj=JSON.parse(localStorage.getItem('kps_users')||'{}');
  return Object.entries(obj).map(([username,data])=>({username,...data}));
}

// ── 유저 실명 가져오기 ──
function getUserName(username){
  const obj=JSON.parse(localStorage.getItem('kps_users')||'{}');
  const u=obj[username];
  if(!u) return '';
  if(getLang()==='en' && u.nameEn) return u.nameEn;
  return u.name||'';
}

function getTotalDays(username){
  let t=0;
  for(let p=0;p<3;p++) t+=(JSON.parse(localStorage.getItem(`kps_${username}_p${p}_done`)||'[]')).length;
  return t;
}

function getChallengeBadge(username, compact=false){
  const total = getTotalDays(username);
  if(total >= 90){
    return compact
      ? `<div style="font-size:.58rem;color:#a07c10;font-weight:800;margin-top:2px;">🏆 ${t('badge.compact_done')}</div>`
      : `<span style="background:#fef9ec;color:#a07c10;font-size:.66rem;font-weight:800;padding:3px 10px;border-radius:10px;display:inline-block;">🏆 ${t('badge.done_full')}</span>`;
  } else if(total > 0){
    return compact
      ? `<div style="font-size:.58rem;color:#166534;font-weight:800;margin-top:2px;">⚡ ${total}/90</div>`
      : `<span style="background:#f0fdf4;color:#166534;font-size:.66rem;font-weight:800;padding:3px 10px;border-radius:10px;display:inline-block;">⚡ ${total}/90${t('badge.in_progress')}</span>`;
  } else {
    return compact
      ? `<div style="font-size:.58rem;color:#94a3b8;margin-top:2px;">🌱 ${t('badge.not_started')}</div>`
      : `<span style="background:#f8faff;color:#94a3b8;font-size:.66rem;font-weight:800;padding:3px 10px;border-radius:10px;display:inline-block;">🌱 ${t('badge.not_started_full')}</span>`;
  }
}

function extractYTId(url){
  const m=url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return m?m[1]:null;
}

// ── Community 페이지 팀 리더 아바타 동기화 ──
export function renderLeaderAvatar(){
  const area = document.getElementById('leader-avatar-area');
  if(area){
    const av = getAvatarOf('kpsrope');
    if(av.animal) area.innerHTML = makeAvatarSVG(av, 60, 80);
  }
  const ctr = document.getElementById('leader-challenge-badge-ctr');
  if(ctr) ctr.innerHTML = getChallengeBadge('kpsrope');
  const nameEl = document.getElementById('leader-name');
  if(nameEl) nameEl.textContent = getUserName('kpsrope') || (getLang()==='en' ? 'Sihyung Lee' : '이시형');
}

// ══════════════════════════════════════════
//  개인 프로필 페이지
// ══════════════════════════════════════════
export function showProfilePage(username){
  document.getElementById('profile-overlay')?.remove();
  const isOwn = username===S.currentUser;
  const av = getAvatarOf(username);
  const posts = getProfilePosts(username);
  const days = getTotalDays(username);
  const realName = getUserName(username);

  const overlay=document.createElement('div');
  overlay.id='profile-overlay';
  overlay.style.cssText='position:fixed;inset:0;z-index:28000;background:#f0f5ff;overflow-y:auto;font-family:inherit;';

  overlay.innerHTML=`
    <div style="background:#fff;position:sticky;top:0;z-index:1;box-shadow:0 2px 8px rgba(0,0,0,.08);padding:12px 18px;display:flex;align-items:center;justify-content:space-between;">
      <button onclick="document.getElementById('profile-overlay').remove()"
        style="display:flex;align-items:center;gap:6px;background:none;border:none;color:#64748b;font-size:.84rem;font-weight:800;cursor:pointer;font-family:inherit;padding:0;">
        ${t('profile.back')}
      </button>
      <span style="font-size:.8rem;font-weight:900;color:var(--navy);">${isOwn?t('profile.my'):t('profile.view')}</span>
      <div style="width:80px;"></div>
    </div>

    <div style="max-width:600px;margin:0 auto;padding:20px 16px 60px;">

      <!-- 프로필 카드 -->
      <div style="background:#fff;border-radius:20px;padding:28px 24px;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:16px;text-align:center;">
        <div style="width:80px;height:100px;margin:0 auto 12px;border-radius:16px;border:3px solid var(--gold);overflow:hidden;background:#eef2ff;display:flex;align-items:center;justify-content:center;">
          ${makeAvatarSVG(av,74,94,'_prof')}
        </div>
        <div style="font-size:1.3rem;font-weight:900;color:var(--navy);">${username}</div>
        ${realName?`<div style="font-size:.92rem;font-weight:700;color:#475569;margin-top:3px;">${realName}</div>`:''}
        <div style="margin-top:8px;">${getChallengeBadge(username)}</div>
        <div style="font-size:.72rem;color:#94a3b8;margin-top:6px;">KPS Jump Rope Club Member</div>
        <div style="display:flex;justify-content:center;gap:24px;margin-top:16px;">
          <div style="text-align:center;">
            <div style="font-size:1.2rem;font-weight:900;color:var(--navy);">${days}</div>
            <div style="font-size:.66rem;color:#94a3b8;margin-top:2px;">${t('profile.days_done')}</div>
          </div>
          <div style="width:1px;background:#e2e8f0;"></div>
          <div style="text-align:center;">
            <div style="font-size:1.2rem;font-weight:900;color:var(--navy);">${posts.length}</div>
            <div style="font-size:.66rem;color:#94a3b8;margin-top:2px;">${t('profile.posts')}</div>
          </div>
        </div>
      </div>

      <!-- 게시물 작성 (본인만) -->
      ${isOwn?`
      <div style="background:#fff;border-radius:16px;padding:18px;box-shadow:0 2px 8px rgba(0,0,0,.05);margin-bottom:16px;border:1.5px solid #e0e7ff;">
        <div style="font-size:.8rem;font-weight:900;color:var(--navy);margin-bottom:10px;">${t('profile.new_post')}</div>
        <textarea id="pf-text" placeholder="${t('profile.post_ph')}"
          style="width:100%;box-sizing:border-box;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;resize:none;height:80px;outline:none;-webkit-user-select:text;user-select:text;"
          onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center;">
          <input id="pf-media" type="text" placeholder="${t('profile.media_ph')}"
            style="flex:1;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:.76rem;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
          <button onclick="submitProfilePost('${username}')"
            style="padding:9px 16px;background:var(--navy);color:#fff;border:none;border-radius:8px;font-size:.76rem;font-weight:900;cursor:pointer;font-family:inherit;white-space:nowrap;">
            ${t('profile.post_btn')}
          </button>
        </div>
      </div>`:''}

      <!-- 피드 -->
      <div style="font-size:.72rem;font-weight:900;color:#94a3b8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;">${t('profile.posts')}</div>
      <div id="pf-feed">${renderFeed(posts,isOwn)}</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function renderFeed(posts, isOwn){
  if(!posts.length) return `
    <div style="text-align:center;padding:36px;background:#fff;border-radius:16px;color:#94a3b8;">
      <div style="font-size:2rem;margin-bottom:8px;">📝</div>
      <div style="font-size:.82rem;font-weight:700;">${t('profile.no_posts')}</div>
      ${isOwn?`<div style="font-size:.72rem;margin-top:4px;">${t('profile.first_post')}</div>`:''}
    </div>`;
  return posts.map((p,i)=>{
    const isYT = p.mediaUrl&&(p.mediaUrl.includes('youtube.com')||p.mediaUrl.includes('youtu.be'));
    const ytId = isYT?extractYTId(p.mediaUrl):null;
    return `
    <div style="background:#fff;border-radius:14px;padding:16px;box-shadow:0 1px 6px rgba(0,0,0,.05);margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <span style="font-size:.74rem;font-weight:900;color:var(--navy);">🪢 ${p.author}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:.68rem;color:#94a3b8;">${p.date}</span>
          ${isOwn?`<button onclick="deleteProfilePost('${p.author}',${i})" style="background:none;border:none;color:#cbd5e1;font-size:.7rem;cursor:pointer;padding:0;" title="${getLang()==='en'?'Delete':'삭제'}">✕</button>`:''}
        </div>
      </div>
      ${p.text?`<div style="font-size:.82rem;color:#334155;line-height:1.7;margin-bottom:${p.mediaUrl?'10px':'0'};">${p.text}</div>`:''}
      ${ytId?`<div style="aspect-ratio:16/9;border-radius:10px;overflow:hidden;margin-top:4px;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen style="display:block;border:none;"></iframe></div>`:''}
      ${p.mediaUrl&&!isYT?`<img src="${p.mediaUrl}" style="width:100%;border-radius:10px;object-fit:cover;max-height:280px;display:block;" onerror="this.style.display='none'">`:''}
    </div>`;
  }).join('');
}

export function submitProfilePost(username){
  if(username!==S.currentUser) return;
  const text=(document.getElementById('pf-text')?.value||'').trim();
  const mediaUrl=(document.getElementById('pf-media')?.value||'').trim();
  if(!text&&!mediaUrl){ window.showToast?.(t('profile.toast_need')); return; }
  const posts=getProfilePosts(username);
  posts.unshift({ id:Date.now(), text, mediaUrl, author:username, date:new Date().toLocaleDateString('ko-KR') });
  localStorage.setItem(`kps_profile_${username}_posts`, JSON.stringify(posts));
  if(document.getElementById('pf-text')) document.getElementById('pf-text').value='';
  if(document.getElementById('pf-media')) document.getElementById('pf-media').value='';
  const feed=document.getElementById('pf-feed');
  if(feed) feed.innerHTML=renderFeed(posts,true);
  window.showToast?.(t('profile.toast_posted'));
}

export function deleteProfilePost(username, idx){
  if(username!==S.currentUser&&!isAdmin()) return;
  const posts=getProfilePosts(username);
  posts.splice(idx,1);
  localStorage.setItem(`kps_profile_${username}_posts`, JSON.stringify(posts));
  const feed=document.getElementById('pf-feed');
  if(feed) feed.innerHTML=renderFeed(posts, username===S.currentUser);
}

function getProfilePosts(username){
  return JSON.parse(localStorage.getItem(`kps_profile_${username}_posts`)||'[]');
}

// ══════════════════════════════════════════
//  멤버 목록 렌더링 (페이지네이션 포함)
// ══════════════════════════════════════════
const MEMBERS_PER_PAGE = 9;
const _memberPages = {};

export function renderMemberGrid(containerId, page){
  if(page !== undefined) _memberPages[containerId] = page;
  const currentPage = _memberPages[containerId] || 0;

  const el = document.getElementById(containerId);
  if(!el) return;
  const users = JSON.parse(localStorage.getItem('kps_users')||'{}');
  const names = Object.keys(users);
  if(!names.length){ el.innerHTML=`<div style="color:#94a3b8;font-size:.8rem;">${t('profile.no_members')}</div>`; return; }

  const en = getLang()==='en';
  const totalPages = Math.ceil(names.length / MEMBERS_PER_PAGE);
  const safePage   = Math.min(currentPage, totalPages - 1);
  _memberPages[containerId] = safePage;
  const pageNames  = names.slice(safePage * MEMBERS_PER_PAGE, (safePage + 1) * MEMBERS_PER_PAGE);

  const grid = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
    ${pageNames.map(u=>{
      const av = getAvatarOf(u);
      const isAdmin2 = users[u]?.isAdmin;
      const displayName = en ? (users[u]?.nameEn || users[u]?.name || '') : (users[u]?.name || '');
      return `<button onclick="showProfilePage('${u}')" style="background:${isAdmin2?'linear-gradient(135deg,#fef9ec,#fef3d0)':'#f8faff'};border:${isAdmin2?'2px solid var(--gold)':'2px solid #e2e8f0'};border-radius:14px;padding:14px 10px;text-align:center;cursor:pointer;font-family:inherit;transition:all .2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
        <div style="width:44px;height:54px;margin:0 auto 8px;border-radius:10px;overflow:hidden;border:1.5px solid ${isAdmin2?'var(--gold)':'#e2e8f0'};background:#fff;display:flex;align-items:center;justify-content:center;">
          ${makeAvatarSVG(av,40,50,'_m'+u)}
        </div>
        <div style="font-size:.74rem;font-weight:900;color:var(--navy);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;">${u}</div>
        ${displayName?`<div style="font-size:.62rem;color:#64748b;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${displayName}</div>`:''}
        ${isAdmin2?`<div style="font-size:.6rem;color:#a07c10;font-weight:700;margin-top:2px;">${t('profile.leader')}</div>`:''}
        ${getChallengeBadge(u, true)}
      </button>`;
    }).join('')}
  </div>`;

  const pager = totalPages > 1 ? `
    <div style="display:flex;justify-content:center;align-items:center;gap:10px;margin-top:14px;">
      <button onclick="window.renderMemberGrid('${containerId}',${safePage-1})"
        ${safePage===0?'disabled':''}
        style="padding:6px 14px;border:1.5px solid #e2e8f0;border-radius:8px;background:#fff;font-size:.76rem;font-weight:700;cursor:pointer;font-family:inherit;${safePage===0?'opacity:.4;':''}">← Prev</button>
      <span style="font-size:.74rem;color:#64748b;font-weight:700;">${safePage+1} / ${totalPages}</span>
      <button onclick="window.renderMemberGrid('${containerId}',${safePage+1})"
        ${safePage===totalPages-1?'disabled':''}
        style="padding:6px 14px;border:1.5px solid #e2e8f0;border-radius:8px;background:#fff;font-size:.76rem;font-weight:700;cursor:pointer;font-family:inherit;${safePage===totalPages-1?'opacity:.4;':''}">Next →</button>
    </div>` : '';

  el.innerHTML = grid + pager;
}

// ══════════════════════════════════════════
//  갤러리 (관리자 전용 업로드)
// ══════════════════════════════════════════
export function renderGalleryPage(){
  renderGalleryGrid();
}

function getGalleryItems(){
  return JSON.parse(localStorage.getItem('kps_gallery_items')||'[]');
}

function renderGalleryGrid(){
  const el=document.getElementById('gallery-dynamic-grid');
  if(!el) return;
  const items=getGalleryItems();
  if(!items.length){
    el.innerHTML=`
      <div style="text-align:center;padding:32px;background:#f8faff;border-radius:14px;margin-top:12px;">
        <div style="font-size:2rem;margin-bottom:8px;">📸</div>
        <div style="font-size:.8rem;font-weight:700;color:#64748b;">${t('gallery.empty')}</div>
        ${isAdmin()?`<div style="font-size:.72rem;color:#94a3b8;margin-top:4px;">${t('gallery.admin_hint')}</div>`:''}
      </div>`;
    return;
  }
  el.innerHTML=`<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px;">
    ${items.map((item,i)=>{
      const isYT=item.mediaUrl&&(item.mediaUrl.includes('youtube.com')||item.mediaUrl.includes('youtu.be'));
      const ytId=isYT?extractYTId(item.mediaUrl):null;
      return `<div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
        ${ytId?`<div style="aspect-ratio:16/9;"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen style="display:block;border:none;"></iframe></div>`
          :item.mediaUrl?`<img src="${item.mediaUrl}" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" onerror="this.parentElement.querySelector('.no-img').style.display='flex';this.style.display='none'"><div class="no-img" style="display:none;aspect-ratio:16/9;background:#f1f5f9;align-items:center;justify-content:center;font-size:2rem;">📷</div>`
          :`<div style="aspect-ratio:16/9;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">📷</div>`}
        <div style="padding:10px 12px;">
          <div style="font-size:.82rem;font-weight:900;color:var(--navy);">${item.title}</div>
          ${item.desc?`<div style="font-size:.72rem;color:#64748b;margin-top:3px;line-height:1.5;">${item.desc}</div>`:''}
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
            <span style="font-size:.66rem;color:#94a3b8;">${item.date}</span>
            ${isAdmin()?`<button onclick="deleteGalleryItem(${i})" style="background:none;border:none;color:#fca5a5;font-size:.68rem;cursor:pointer;font-family:inherit;font-weight:700;">${t('gallery.delete')}</button>`:''}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

export function showAdminGalleryUpload(){
  if(!isAdmin()){ window.showToast?.(getLang()==='en'?'Admins only!':'관리자만 업로드할 수 있어요!'); return; }
  document.getElementById('gallery-upload-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='gallery-upload-modal';
  modal.style.cssText='position:fixed;inset:0;z-index:29000;background:rgba(15,32,64,.8);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit;';
  modal.innerHTML=`
    <div style="background:#fff;border-radius:20px;padding:28px 24px;width:100%;max-width:420px;">
      <div style="font-size:1rem;font-weight:900;color:var(--navy);margin-bottom:18px;">📤 갤러리 업로드 (관리자)</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input id="gu-title" type="text" placeholder="제목 (예: 첫 번째 연습 현장)"
          style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.84rem;outline:none;-webkit-user-select:text;user-select:text;"
          onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        <textarea id="gu-desc" placeholder="설명 (선택 사항)"
          style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.84rem;resize:none;height:70px;outline:none;-webkit-user-select:text;user-select:text;"
          onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
        <input id="gu-url" type="text" placeholder="이미지 URL 또는 YouTube 링크"
          style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.84rem;outline:none;-webkit-user-select:text;user-select:text;"
          onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        <div style="display:flex;gap:8px;margin-top:6px;">
          <button onclick="document.getElementById('gallery-upload-modal').remove()"
            style="flex:1;padding:12px;background:#f1f5f9;border:none;border-radius:10px;font-size:.84rem;font-weight:700;font-family:inherit;cursor:pointer;color:#64748b;">취소</button>
          <button onclick="submitGalleryUpload()"
            style="flex:2;padding:12px;background:linear-gradient(135deg,var(--navy),#1565c0);color:#fff;border:none;border-radius:10px;font-size:.84rem;font-weight:900;font-family:inherit;cursor:pointer;">업로드 완료</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('gu-title').focus();
}

export function submitGalleryUpload(){
  const title=(document.getElementById('gu-title')?.value||'').trim();
  const desc=(document.getElementById('gu-desc')?.value||'').trim();
  const mediaUrl=(document.getElementById('gu-url')?.value||'').trim();
  if(!title){ window.showToast?.('제목을 입력해주세요!'); return; }
  const items=getGalleryItems();
  items.unshift({ id:Date.now(), title, desc, mediaUrl, authorId:S.currentUser, date:new Date().toLocaleDateString('ko-KR') });
  localStorage.setItem('kps_gallery_items', JSON.stringify(items));
  document.getElementById('gallery-upload-modal')?.remove();
  renderGalleryGrid();
  window.showToast?.(t('toast.gallery_upload'));
}

export function deleteGalleryItem(idx){
  if(!isAdmin()) return;
  const items=getGalleryItems();
  items.splice(idx,1);
  localStorage.setItem('kps_gallery_items', JSON.stringify(items));
  renderGalleryGrid();
  window.showToast?.(t('toast.gallery_deleted'));
}

// ══════════════════════════════════════════
//  Connect 달력 스케줄 (클릭 편집)
// ══════════════════════════════════════════
let _calYear = new Date().getFullYear();
let _calMonth = new Date().getMonth();
let _selectedDayType = null;

function getScheduleEvents(){
  return JSON.parse(localStorage.getItem('kps_schedule_events')||'{}');
}

function _calDateStr(y,m,d){
  return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

const _evTypes = {
  special:{ emoji:'⭐', label:'특별행사', labelEn:'Special Event',  bg:'#fef9ec', border:'#f59e0b', color:'#92400e' },
  holiday:{ emoji:'🚫', label:'취소/휴일', labelEn:'Cancelled',     bg:'#fef2f2', border:'#ef4444', color:'#991b1b' },
  extra:  { emoji:'➕', label:'추가연습',  labelEn:'Extra Practice', bg:'#f0fdf4', border:'#22c55e', color:'#166534' },
  notice: { emoji:'📢', label:'공지사항',  labelEn:'Notice',        bg:'#f5f3ff', border:'#7c3aed', color:'#4c1d95' },
};

export function renderScheduleCalendar(){ _drawScheduleCalendar(); }
export function calPrevMonth(){ _calMonth--; if(_calMonth<0){_calMonth=11;_calYear--;} _drawScheduleCalendar(); }
export function calNextMonth(){ _calMonth++; if(_calMonth>11){_calMonth=0;_calYear++;} _drawScheduleCalendar(); }

function _drawScheduleCalendar(){
  const el=document.getElementById('connect-calendar');
  if(!el) return;
  const adm=isAdmin();
  const now=new Date();
  const year=_calYear, month=_calMonth;
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const events=getScheduleEvents();
  const todayStr=now.toISOString().slice(0,10);
  const _ws=JSON.parse(localStorage.getItem('kps_weekly_schedule')||'null');
  const _dowKey={0:'sat_sun',1:'mon',2:'tue',3:'wed',4:'thu',5:'fri',6:'sat_sun'};
  const isPrac=d=>{
    const dow=new Date(year,month,d).getDay();
    if(_ws?.days){const k=_dowKey[dow]; return _ws.days[k]?.type==='practice';}
    return dow===1||dow===3||dow===5;
  };

  let html=`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <button onclick="calPrevMonth()" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-size:.9rem;color:var(--navy);display:flex;align-items:center;justify-content:center;font-family:inherit;">◀</button>
      <div style="text-align:center;">
        <div style="font-size:.95rem;font-weight:900;color:var(--navy);">${MONTHS[month]} ${year}</div>
        ${adm?`<div style="font-size:.6rem;color:#94a3b8;margin-top:2px;">${t('cal.admin_hint')}</div>`:''}
      </div>
      <button onclick="calNextMonth()" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-size:.9rem;color:var(--navy);display:flex;align-items:center;justify-content:center;font-family:inherit;">▶</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
      <span style="display:flex;align-items:center;gap:3px;font-size:.62rem;font-weight:700;color:#475569;"><span style="width:9px;height:9px;border-radius:2px;background:#eef2ff;border:1px solid #c7d2fe;display:inline-block;"></span>${t('cal.practice')}</span>
      <span style="display:flex;align-items:center;gap:3px;font-size:.62rem;font-weight:700;color:#475569;"><span style="width:9px;height:9px;border-radius:50%;background:var(--coral);display:inline-block;"></span>${t('cal.today')}</span>
      <span style="display:flex;align-items:center;gap:3px;font-size:.62rem;font-weight:700;color:#475569;"><span style="width:9px;height:9px;border-radius:2px;background:#fef9ec;border:1px solid #f59e0b;display:inline-block;"></span>${t('cal.special')}</span>
      <span style="display:flex;align-items:center;gap:3px;font-size:.62rem;font-weight:700;color:#475569;"><span style="width:9px;height:9px;border-radius:2px;background:#fef2f2;border:1px solid #ef4444;display:inline-block;"></span>${t('cal.cancel')}</span>
      <span style="display:flex;align-items:center;gap:3px;font-size:.62rem;font-weight:700;color:#475569;"><span style="width:9px;height:9px;border-radius:2px;background:#f0fdf4;border:1px solid #22c55e;display:inline-block;"></span>${t('cal.extra')}</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;margin-bottom:3px;">
      ${[t('cal.day_sun'),t('cal.day_mon'),t('cal.day_tue'),t('cal.day_wed'),t('cal.day_thu'),t('cal.day_fri'),t('cal.day_sat')].map((d,i)=>`<div style="font-size:.64rem;font-weight:900;color:${i===0?'#ef4444':i===6?'#3b82f6':'#94a3b8'};padding:4px 0;">${d}</div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">`;

  for(let i=0;i<firstDay;i++) html+=`<div></div>`;

  for(let d=1;d<=daysInMonth;d++){
    const dStr=_calDateStr(year,month,d);
    const isToday=dStr===todayStr;
    const isPracDay=isPrac(d);
    const dow=new Date(year,month,d).getDay();
    const ev=events[dStr];
    const cfg=ev?(_evTypes[ev.type]||_evTypes.notice):null;

    let cellBg, cellColor, cellBorder;
    let badge='';

    if(isToday){
      cellBg='var(--coral)'; cellColor='#fff'; cellBorder='none';
    } else if(cfg){
      cellBg=cfg.bg; cellColor=cfg.color; cellBorder=`1.5px solid ${cfg.border}`;
      badge=`<span style="font-size:.62rem;display:block;line-height:1.1;margin-top:1px;">${cfg.emoji}</span>`;
    } else if(isPracDay){
      cellBg='#eef2ff'; cellColor='#4f46e5'; cellBorder='1.5px solid #c7d2fe';
      badge=`<span style="display:block;width:4px;height:4px;background:#4f46e5;border-radius:50%;margin:2px auto 0;"></span>`;
    } else {
      cellBg='transparent'; cellColor=dow===0?'#ef4444':dow===6?'#3b82f6':'#475569'; cellBorder='1.5px solid transparent';
    }

    html+=`<div
      ${adm?`onclick="showDayEditor('${dStr}')"`:'' }
      style="padding:4px 2px;border-radius:8px;background:${cellBg};color:${cellColor};border:${cellBorder};
        min-height:38px;display:flex;flex-direction:column;align-items:center;justify-content:center;
        font-size:.73rem;font-weight:${isToday||isPracDay||ev?'900':'600'};text-align:center;
        box-sizing:border-box;${adm?'cursor:pointer;transition:opacity .15s;':''}"
      ${adm?`onmouseover="this.style.opacity='.65'" onmouseout="this.style.opacity='1'"`:''}>
      ${d}${badge}
    </div>`;
  }

  html+=`</div>`;

  const upcoming=Object.entries(events)
    .filter(([d])=>d>=todayStr)
    .sort(([a],[b])=>a.localeCompare(b))
    .slice(0,6);

  if(upcoming.length){
    const DAYS=[t('cal.day_sun'),t('cal.day_mon'),t('cal.day_tue'),t('cal.day_wed'),t('cal.day_thu'),t('cal.day_fri'),t('cal.day_sat')];
    html+=`<div style="margin-top:18px;padding-top:14px;border-top:1.5px solid #f1f5f9;">
      <div style="font-size:.72rem;font-weight:900;color:var(--navy);margin-bottom:9px;">${t('cal.upcoming')}</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
      ${upcoming.map(([d,e])=>{
        const c=_evTypes[e.type]||_evTypes.notice;
        const dobj=new Date(d+'T00:00:00');
        const dlbl=`${d.slice(5).replace('-','/')} (${DAYS[dobj.getDay()]})`;
        return `<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:${c.bg};border-radius:10px;border-left:3px solid ${c.border};cursor:${adm?'pointer':'default'};"
          ${adm?`onclick="showDayEditor('${d}')"`:''}>
          <span style="font-size:.82rem;flex-shrink:0;">${c.emoji}</span>
          <div style="flex:1;min-width:0;">
            <div style="font-size:.76rem;font-weight:900;color:${c.color};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.title||(getLang()==='en'?(c.labelEn||c.label):c.label)}</div>
            ${e.note?`<div style="font-size:.68rem;color:#64748b;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.note}</div>`:''}
          </div>
          <span style="font-size:.64rem;color:#94a3b8;flex-shrink:0;font-weight:700;">${dlbl}</span>
        </div>`;
      }).join('')}
      </div>
    </div>`;
  }

  el.innerHTML=html;
}

export function showDayEditor(dateStr){
  if(!isAdmin()) return;
  const events=getScheduleEvents();
  const ev=events[dateStr]||null;
  _selectedDayType=ev?.type||null;

  const dobj=new Date(dateStr+'T00:00:00');
  const DAY_KO=['일','월','화','수','목','금','토'];
  const dlabel=`${dateStr.replace(/-/g,'.')} (${DAY_KO[dobj.getDay()]})`;

  document.getElementById('day-editor-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='day-editor-modal';
  modal.style.cssText='position:fixed;inset:0;z-index:29000;background:rgba(15,32,64,.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit;';

  modal.innerHTML=`
    <div style="background:#fff;border-radius:22px;padding:26px 22px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.35);">
      <div style="font-size:.64rem;font-weight:700;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px;">📅 일정 편집 (관리자)</div>
      <div style="font-size:1.05rem;font-weight:900;color:var(--navy);margin-bottom:20px;">${dlabel}</div>

      <div style="font-size:.68rem;font-weight:900;color:#64748b;letter-spacing:.04em;margin-bottom:8px;">이벤트 종류</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-bottom:18px;">
        ${Object.entries(_evTypes).map(([k,t])=>`
          <button id="type-btn-${k}" onclick="selectDayType('${k}')"
            style="padding:10px 8px;border:2px solid ${ev?.type===k?t.border:'#e2e8f0'};
              border-radius:12px;background:${ev?.type===k?t.bg:'#fafafa'};
              color:${ev?.type===k?t.color:'#64748b'};
              font-size:.76rem;font-weight:800;font-family:inherit;cursor:pointer;
              display:flex;align-items:center;justify-content:center;gap:5px;transition:all .15s;">
            ${t.emoji} ${t.label}
          </button>
        `).join('')}
      </div>

      <div style="font-size:.68rem;font-weight:900;color:#64748b;margin-bottom:6px;">제목</div>
      <input id="day-ev-title" type="text" placeholder="예: 학교 행사로 연습 취소"
        value="${ev?.title||''}"
        style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.83rem;outline:none;margin-bottom:13px;-webkit-user-select:text;user-select:text;"
        onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">

      <div style="font-size:.68rem;font-weight:900;color:#64748b;margin-bottom:6px;">메모 <span style="font-weight:500;color:#94a3b8;">(선택)</span></div>
      <textarea id="day-ev-note" placeholder="장소 변경, 준비물, 추가 안내 등..."
        style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.83rem;resize:none;height:68px;outline:none;margin-bottom:18px;-webkit-user-select:text;user-select:text;"
        onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">${ev?.note||''}</textarea>

      <div style="display:flex;gap:7px;">
        ${ev?`<button onclick="deleteDayEvent('${dateStr}')"
          style="padding:11px 14px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:10px;font-size:.74rem;font-weight:800;font-family:inherit;cursor:pointer;color:#dc2626;flex-shrink:0;">🗑️</button>`:''}
        <button onclick="document.getElementById('day-editor-modal')?.remove()"
          style="flex:1;padding:11px;background:#f1f5f9;border:none;border-radius:10px;font-size:.78rem;font-weight:700;font-family:inherit;cursor:pointer;color:#64748b;">취소</button>
        <button onclick="saveDayEvent('${dateStr}')"
          style="flex:2;padding:11px;background:linear-gradient(135deg,#1a3560,#2563eb);color:#fff;border:none;border-radius:10px;font-size:.8rem;font-weight:900;font-family:inherit;cursor:pointer;">저장</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  setTimeout(()=>document.getElementById('day-ev-title')?.focus(), 60);
}

export function selectDayType(type){
  _selectedDayType=type;
  Object.entries(_evTypes).forEach(([k,t])=>{
    const btn=document.getElementById(`type-btn-${k}`);
    if(!btn) return;
    if(k===type){
      btn.style.borderColor=t.border;
      btn.style.background=t.bg;
      btn.style.color=t.color;
    } else {
      btn.style.borderColor='#e2e8f0';
      btn.style.background='#fafafa';
      btn.style.color='#64748b';
    }
  });
}

export function saveDayEvent(dateStr){
  if(!isAdmin()) return;
  const type=_selectedDayType;
  const title=(document.getElementById('day-ev-title')?.value||'').trim();
  const note=(document.getElementById('day-ev-note')?.value||'').trim();
  if(!type){ window.showToast?.('이벤트 종류를 선택해주세요!'); return; }
  if(!title){ window.showToast?.('제목을 입력해주세요!'); return; }
  const events=getScheduleEvents();
  events[dateStr]={type,title,note};
  localStorage.setItem('kps_schedule_events',JSON.stringify(events));
  _selectedDayType=null;
  document.getElementById('day-editor-modal')?.remove();
  _drawScheduleCalendar();
  window.showToast?.('✅ 일정이 저장됐어요!');
}

export function deleteDayEvent(dateStr){
  if(!isAdmin()) return;
  const events=getScheduleEvents();
  delete events[dateStr];
  localStorage.setItem('kps_schedule_events',JSON.stringify(events));
  document.getElementById('day-editor-modal')?.remove();
  _drawScheduleCalendar();
  window.showToast?.('🗑️ 일정이 삭제됐어요.');
}

// ══════════════════════════════════════════
//  Connect 주간 연습 스케줄 편집
// ══════════════════════════════════════════
const _wsDayOrder=['mon','tue','wed','thu','fri','sat_sun'];
const _wsDefaults={
  mon:    {label:'월',   labelEn:'Mon',     en:'Monday',    type:'practice', time:'3:30 – 4:30 PM', note:''},
  tue:    {label:'화',   labelEn:'Tue',     en:'Tuesday',   type:'rest',     time:'',               note:''},
  wed:    {label:'수',   labelEn:'Wed',     en:'Wednesday', type:'practice', time:'3:30 – 4:30 PM', note:''},
  thu:    {label:'목',   labelEn:'Thu',     en:'Thursday',  type:'rest',     time:'',               note:''},
  fri:    {label:'금',   labelEn:'Fri',     en:'Friday',    type:'practice', time:'3:30 – 4:30 PM', note:''},
  sat_sun:{label:'토·일',labelEn:'Sat-Sun', en:'Weekend',   type:'free',     time:'',               note:'자율 연습 🏃', noteEn:'Self Practice 🏃'},
};
let _wsCurrentTypes={};

function getWeeklySchedule(){
  const s=JSON.parse(localStorage.getItem('kps_weekly_schedule')||'null');
  if(!s) return {days:{..._wsDefaults},venue:'School Gym',teacher:'Sihyung Lee'};
  return s;
}

export function renderWeeklySchedule(){
  const areaEl=document.getElementById('weekly-schedule-area');
  const btnEl=document.getElementById('weekly-schedule-edit-btn');
  if(!areaEl) return;
  const adm=isAdmin();
  const sched=getWeeklySchedule();

  if(btnEl) btnEl.innerHTML=adm
    ?`<button onclick="showWeeklyScheduleEditor()" style="padding:6px 13px;background:rgba(124,58,237,.1);border:1.5px solid #7c3aed;border-radius:8px;font-size:.7rem;font-weight:800;color:#7c3aed;cursor:pointer;font-family:inherit;">🔧 편집</button>`
    :'';

  let html='<div style="display:flex;flex-direction:column;gap:8px;">';
  _wsDayOrder.forEach(key=>{
    const day={..._wsDefaults[key],...(sched.days?.[key]||{})};
    const isPrac=day.type==='practice';
    const isFri=key==='fri'&&isPrac;
    const bg=isPrac?(isFri?'#f0fdf4':'#f0f5ff'):'#f8faff';
    const bc=isPrac?(isFri?'#2e7d32':'#4f46e5'):'#e2e8f0';
    const lc=isPrac?(isFri?'#2e7d32':'#4f46e5'):'#94a3b8';
    const nc=isPrac?'var(--navy)':'#94a3b8';
    const tbg=isPrac?(isFri?'#dcfce7':'#e0e7ff'):'transparent';
    let right='';
    if(isPrac&&day.time) right=`<span style="font-size:.78rem;font-weight:800;color:#64748b;background:${tbg};padding:4px 10px;border-radius:8px;">${day.time}</span>`;
    else if(day.type==='rest') right=`<span style="font-size:.78rem;color:#cbd5e1;padding:4px 10px;">${t('sched.rest')}</span>`;
    else if(day.note) right=`<span style="font-size:.78rem;color:#94a3b8;padding:4px 10px;">${getLang()==='en'?(day.noteEn||day.note):day.note}</span>`;
    html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:${bg};border-radius:12px;border-left:4px solid ${bc};">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:.8rem;font-weight:${isPrac?'900':'700'};color:${lc};min-width:28px;">${getLang()==='en'?(day.labelEn||day.label):day.label}</span>
        <span style="font-size:.82rem;font-weight:700;color:${nc};">${day.en}</span>
      </div>
      ${right}
    </div>`;
  });
  html+='</div>';

  const v=sched.venue||'', teacher=sched.teacher||'';
  if(v||teacher) html+=`<div style="margin-top:12px;padding:10px 14px;background:#fffbeb;border-radius:10px;border:1px solid #fde68a;font-size:.75rem;color:#92400e;font-weight:700;">
    📍 ${v?`${t('sched.venue_label')}: ${v}`:''}${v&&teacher?' · ':''}${teacher?`${t('sched.teacher_label')}: ${teacher}`:''}
  </div>`;

  areaEl.innerHTML=html;
}

export function showWeeklyScheduleEditor(){
  if(!isAdmin()) return;
  const sched=getWeeklySchedule();
  _wsCurrentTypes={};
  _wsDayOrder.forEach(k=>{ _wsCurrentTypes[k]=sched.days?.[k]?.type||_wsDefaults[k].type; });

  document.getElementById('ws-editor-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='ws-editor-modal';
  modal.style.cssText='position:fixed;inset:0;z-index:29000;background:rgba(15,32,64,.88);backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;font-family:inherit;';

  const typeLabels={practice:'🔵 연습',rest:'⬜ 휴일',free:'🏃 자율'};

  modal.innerHTML=`
    <div style="background:#fff;border-radius:22px;padding:26px 22px;width:100%;max-width:420px;margin:auto;">
      <div style="font-size:.64rem;font-weight:700;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px;">🔧 관리자 편집</div>
      <div style="font-size:1rem;font-weight:900;color:var(--navy);margin-bottom:20px;">주간 연습 스케줄</div>

      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
        ${_wsDayOrder.map(key=>{
          const day={..._wsDefaults[key],...(sched.days?.[key]||{})};
          return `<div style="background:#f8faff;border-radius:12px;padding:12px 14px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="font-size:.82rem;font-weight:900;color:var(--navy);min-width:32px;">${day.label}</span>
              <span style="font-size:.74rem;color:#64748b;">${day.en}</span>
            </div>
            <div style="display:flex;gap:5px;margin-bottom:8px;">
              ${['practice','rest','free'].map(t=>`
                <button onclick="wsSetType('${key}','${t}')" id="wstype-${key}-${t}"
                  style="flex:1;padding:6px 3px;border:1.5px solid ${day.type===t?'#4f46e5':'#e2e8f0'};border-radius:8px;background:${day.type===t?'#eef2ff':'#fff'};color:${day.type===t?'#4f46e5':'#64748b'};font-size:.67rem;font-weight:800;font-family:inherit;cursor:pointer;transition:all .15s;">
                  ${typeLabels[t]}
                </button>
              `).join('')}
            </div>
            <div id="ws-time-${key}" style="display:${day.type==='practice'?'block':'none'};">
              <input type="text" id="wstime-${key}" placeholder="예: 3:30 – 4:30 PM" value="${day.time||''}"
                style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:.8rem;outline:none;-webkit-user-select:text;user-select:text;"
                onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#e2e8f0'">
            </div>
            <div id="ws-note-${key}" style="display:${day.type==='free'?'block':'none'};">
              <input type="text" id="wsnote-${key}" placeholder="예: 자율 연습 🏃" value="${day.note||''}"
                style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:.8rem;outline:none;-webkit-user-select:text;user-select:text;"
                onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#e2e8f0'">
            </div>
          </div>`;
        }).join('')}
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">📍 장소</label>
          <input id="ws-venue" type="text" value="${sched.venue||''}" placeholder="School Gym (학교 체육관)"
            style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        </div>
        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">👤 담당자</label>
          <input id="ws-teacher" type="text" value="${sched.teacher||''}" placeholder="이시형 선생님 팀장"
            style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        </div>
      </div>

      <div style="display:flex;gap:7px;">
        <button onclick="document.getElementById('ws-editor-modal')?.remove()"
          style="flex:1;padding:12px;background:#f1f5f9;border:none;border-radius:10px;font-size:.8rem;font-weight:700;font-family:inherit;cursor:pointer;color:#64748b;">취소</button>
        <button onclick="saveWeeklySchedule()"
          style="flex:2;padding:12px;background:linear-gradient(135deg,#1a3560,#2563eb);color:#fff;border:none;border-radius:10px;font-size:.82rem;font-weight:900;font-family:inherit;cursor:pointer;">저장</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
}

export function wsSetType(key, type){
  _wsCurrentTypes[key]=type;
  ['practice','rest','free'].forEach(t=>{
    const btn=document.getElementById(`wstype-${key}-${t}`);
    if(!btn) return;
    if(t===type){ btn.style.borderColor='#4f46e5'; btn.style.background='#eef2ff'; btn.style.color='#4f46e5'; }
    else { btn.style.borderColor='#e2e8f0'; btn.style.background='#fff'; btn.style.color='#64748b'; }
  });
  const tEl=document.getElementById(`ws-time-${key}`);
  const nEl=document.getElementById(`ws-note-${key}`);
  if(tEl) tEl.style.display=type==='practice'?'block':'none';
  if(nEl) nEl.style.display=type==='free'?'block':'none';
}

export function saveWeeklySchedule(){
  if(!isAdmin()) return;
  const sched={days:{},venue:'',teacher:''};
  _wsDayOrder.forEach(key=>{
    const def=_wsDefaults[key];
    const type=_wsCurrentTypes[key]||def.type;
    const time=(document.getElementById(`wstime-${key}`)?.value||'').trim();
    const note=(document.getElementById(`wsnote-${key}`)?.value||'').trim();
    sched.days[key]={...def,type,time,note};
  });
  sched.venue=(document.getElementById('ws-venue')?.value||'').trim();
  sched.teacher=(document.getElementById('ws-teacher')?.value||'').trim();
  localStorage.setItem('kps_weekly_schedule',JSON.stringify(sched));
  _wsCurrentTypes={};
  document.getElementById('ws-editor-modal')?.remove();
  renderWeeklySchedule();
  renderFooterSchedule();
  window.showToast?.(t('sched.saved'));
}

export function renderFooterSchedule(){
  const el=document.getElementById('footer-schedule-time');
  if(!el) return;
  const sched=getWeeklySchedule();
  const pracDays=_wsDayOrder
    .filter(k=>k!=='sat_sun')
    .map(k=>({..._wsDefaults[k],...(sched.days?.[k]||{})}))
    .filter(d=>d.type==='practice');
  if(!pracDays.length){ el.textContent=t('sched.no_practice'); } else {
    const groups={};
    pracDays.forEach(d=>{ const t=d.time||''; if(!groups[t]) groups[t]=[]; groups[t].push(getLang()==='en'?(d.labelEn||d.label):d.label); });
    el.textContent=Object.entries(groups).map(([t,labels])=>`${labels.join('·')}${t?' '+t:''}`).join(' / ');
  }
  const venueEl=document.getElementById('footer-venue-info');
  if(venueEl && sched.venue) venueEl.textContent='🏃 '+sched.venue;
}

// ══════════════════════════════════════════
//  Stage — Grand Showcase 시연 공연
// ══════════════════════════════════════════
function getShowcase(){
  return JSON.parse(localStorage.getItem('kps_showcase')||'null') || {
    videoUrl:'', song:'', artist:'', date:'', venue:'', desc:'', techniques:[], performers:[]
  };
}

export function renderShowcasePage(){
  const el=document.getElementById('showcase-dynamic');
  if(!el) return;
  const data=getShowcase();
  const adm=isAdmin();
  const ytId=data.videoUrl?extractYTId(data.videoUrl):null;
  const hasContent=ytId||data.song||data.desc||data.techniques?.length||data.performers?.length||data.date||data.venue;

  let html='';

  if(!hasContent && !adm){
    el.innerHTML=`<div style="text-align:center;padding:48px 20px;">
      <div style="font-size:4rem;margin-bottom:14px;">🎭</div>
      <div style="font-size:.95rem;font-weight:900;color:var(--navy);">${t('stage.empty.title')}</div>
      <div style="font-size:.8rem;color:#94a3b8;margin-top:8px;line-height:1.7;">${t('stage.empty.desc').replace('\n','<br>')}</div>
    </div>`;
    return;
  }

  // 영상 카드
  html+=`<div style="background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;">${t('showcase.video')}</div>
      ${adm?`<button onclick="showShowcaseEditor()" style="padding:6px 13px;background:rgba(124,58,237,.1);border:1.5px solid #7c3aed;border-radius:8px;font-size:.7rem;font-weight:800;color:#7c3aed;cursor:pointer;font-family:inherit;">🔧 편집</button>`:''}
    </div>
    ${ytId
      ?`<div style="aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;box-shadow:0 6px 24px rgba(0,0,0,.2);">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}?rel=0" frameborder="0" allowfullscreen style="display:block;border:none;"></iframe>
        </div>`
      :`<div style="aspect-ratio:16/9;border-radius:12px;background:linear-gradient(135deg,#0a0a1a,#1a0d2e);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;">
          <div style="font-size:2.8rem;">🎬</div>
          <div style="font-size:.78rem;color:rgba(255,255,255,.45);font-weight:700;">${adm?'편집 버튼으로 영상을 추가하세요':t('showcase.video_pending')}</div>
        </div>`
    }
    ${data.song||data.artist?`
      <div style="margin-top:13px;padding:12px 16px;background:linear-gradient(135deg,#0f0f2e,#1e1b4b);border-radius:12px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:1.5rem;">🎵</span>
        <div>
          <div style="font-size:.84rem;font-weight:900;color:#fff;">${data.song||t('showcase.song_default')}</div>
          ${data.artist?`<div style="font-size:.72rem;color:rgba(255,255,255,.5);margin-top:2px;">${data.artist}</div>`:''}
        </div>
      </div>`:''}
  </div>`;

  // 공연 소개
  if(data.desc){
    html+=`<div style="background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;">${t('showcase.desc_section')}</div>
      <p style="font-size:.84rem;color:#475569;line-height:1.85;white-space:pre-wrap;margin:0;">${data.desc}</p>
    </div>`;
  }

  // 시연 기술
  if(data.techniques?.length){
    const palette=['#4f46e5','#7c3aed','#0ea5e9','#059669','#d97706','#dc2626','#db2777'];
    html+=`<div style="background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:13px;">${t('showcase.lineup')}</div>
      <div style="display:flex;flex-wrap:wrap;gap:7px;">
        ${data.techniques.map((t,i)=>{
          const c=palette[i%palette.length];
          return `<span style="padding:7px 15px;background:${c}18;border:1.5px solid ${c}50;border-radius:20px;font-size:.77rem;font-weight:800;color:${c};">${t}</span>`;
        }).join('')}
      </div>
    </div>`;
  }

  // 선발 멤버
  const allUsers=getUsersArray();
  const selected=allUsers.filter(u=>(data.performers||[]).includes(u.username));
  if(selected.length){
    html+=`<div style="background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:5px;">${t('showcase.performers_title')} (${selected.length})</div>
      <div style="font-size:.72rem;color:#94a3b8;margin-bottom:14px;">${t('showcase.click_hint')}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
        ${selected.map(u=>{
          const av=getAvatarOf(u.username);
          const svg=av.animal?makeAvatarSVG(av,58,76):`<svg width="58" height="76" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg"><rect x="21" y="10" width="58" height="56" rx="3" fill="#c9a227"/><text x="50" y="52" text-anchor="middle" font-size="34" fill="#fff">?</text></svg>`;
          return `<div onclick="showProfilePage('${u.username}')"
            style="background:linear-gradient(135deg,#fef9ec,#fffbf0);border-radius:14px;padding:14px 10px;text-align:center;border:1.5px solid #fde68a;cursor:pointer;transition:transform .15s;box-shadow:0 2px 8px rgba(201,162,39,.1);"
            onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
            <div style="width:54px;height:70px;margin:0 auto 8px;border-radius:10px;overflow:hidden;background:#fff;border:2px solid var(--gold);">${svg}</div>
            <div style="font-size:.74rem;font-weight:900;color:var(--navy);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.username}</div>
            <span style="display:inline-block;margin-top:5px;background:linear-gradient(135deg,#c9a227,#e8a800);color:#fff;font-size:.6rem;font-weight:900;padding:2px 8px;border-radius:10px;">${t('showcase.selected')}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  } else if(adm){
    html+=`<div style="background:#fff;border-radius:18px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:16px;">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;">${t('showcase.performers_title')}</div>
      <div style="text-align:center;padding:20px;color:#94a3b8;font-size:.8rem;">편집 버튼에서 선발 멤버를 추가하세요</div>
    </div>`;
  }

  // 공연 정보
  if(data.date||data.venue){
    html+=`<div style="background:linear-gradient(135deg,#0a0a1a,#0f0f2e);border-radius:18px;padding:22px 20px;box-shadow:0 4px 24px rgba(0,0,0,.25);">
      <div style="font-size:.72rem;font-weight:900;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;">${t('showcase.info')}</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${data.date?`<div style="display:flex;align-items:center;gap:14px;">
          <div style="width:38px;height:38px;border-radius:10px;background:rgba(201,162,39,.15);border:1px solid rgba(201,162,39,.3);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;">📅</div>
          <div><div style="font-size:.65rem;color:rgba(255,255,255,.4);font-weight:700;margin-bottom:2px;">${t('showcase.date_label')}</div>
          <div style="font-size:.9rem;font-weight:900;color:#fff;">${data.date}</div></div>
        </div>`:''}
        ${data.venue?`<div style="display:flex;align-items:center;gap:14px;">
          <div style="width:38px;height:38px;border-radius:10px;background:rgba(201,162,39,.15);border:1px solid rgba(201,162,39,.3);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;">📍</div>
          <div><div style="font-size:.65rem;color:rgba(255,255,255,.4);font-weight:700;margin-bottom:2px;">${t('showcase.venue_label')}</div>
          <div style="font-size:.9rem;font-weight:900;color:#fff;">${data.venue}</div></div>
        </div>`:''}
      </div>
    </div>`;
  }

  if(adm && !hasContent){
    html=`<div style="text-align:center;padding:32px 20px;background:#fff;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,.07);">
      <div style="font-size:3rem;margin-bottom:12px;">🎭</div>
      <div style="font-size:.88rem;font-weight:900;color:var(--navy);">아직 공연 정보가 없어요</div>
      <div style="font-size:.76rem;color:#94a3b8;margin-top:6px;margin-bottom:16px;">편집 버튼으로 공연 영상·멤버·정보를 추가해보세요</div>
      <button onclick="showShowcaseEditor()" style="padding:10px 22px;background:linear-gradient(135deg,#1a1a2e,#2563eb);color:#fff;border:none;border-radius:12px;font-size:.82rem;font-weight:900;font-family:inherit;cursor:pointer;">🔧 편집 시작</button>
    </div>`;
  }

  el.innerHTML=html;
}

export function showShowcaseEditor(){
  if(!isAdmin()) return;
  const data=getShowcase();
  const allUsers=getUsersArray().filter(u=>!u.isAdmin);

  document.getElementById('showcase-editor-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='showcase-editor-modal';
  modal.style.cssText='position:fixed;inset:0;z-index:29000;background:rgba(15,32,64,.88);backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;font-family:inherit;';

  modal.innerHTML=`
    <div style="background:#fff;border-radius:22px;padding:26px 22px;width:100%;max-width:420px;margin:auto;">
      <div style="font-size:.64rem;font-weight:700;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px;">🔧 관리자 편집</div>
      <div style="font-size:1rem;font-weight:900;color:var(--navy);margin-bottom:20px;">Grand Showcase 설정</div>

      <div style="display:flex;flex-direction:column;gap:13px;">
        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">🎬 공연 영상 YouTube URL</label>
          <input id="sc-video" type="text" placeholder="https://youtube.com/watch?v=..." value="${data.videoUrl||''}"
            style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div>
            <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">🎵 노래 제목</label>
            <input id="sc-song" type="text" placeholder="곡명" value="${data.song||''}"
              style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
              onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
          </div>
          <div>
            <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">🎤 아티스트</label>
            <input id="sc-artist" type="text" placeholder="가수명" value="${data.artist||''}"
              style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
              onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
          </div>
        </div>

        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">💬 공연 소개</label>
          <textarea id="sc-desc" placeholder="공연 소개, 관람 안내, 분위기 설명 등..."
            style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;resize:none;height:80px;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">${data.desc||''}</textarea>
        </div>

        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">🎯 시연 기술 <span style="font-weight:500;">(쉼표로 구분)</span></label>
          <input id="sc-techniques" type="text" placeholder="이중뛰기, 교차뛰기, 3중뛰기, 이단뛰기..."
            value="${(data.techniques||[]).join(', ')}"
            style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
            onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div>
            <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">📅 공연 날짜</label>
            <input id="sc-date" type="text" placeholder="2026-09-01" value="${data.date||''}"
              style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
              onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
          </div>
          <div>
            <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:5px;">📍 공연 장소</label>
            <input id="sc-venue" type="text" placeholder="School Hall" value="${data.venue||''}"
              style="width:100%;box-sizing:border-box;padding:10px 13px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:.82rem;outline:none;-webkit-user-select:text;user-select:text;"
              onfocus="this.style.borderColor='var(--navy)'" onblur="this.style.borderColor='#e2e8f0'">
          </div>
        </div>

        <div>
          <label style="font-size:.68rem;font-weight:900;color:#64748b;display:block;margin-bottom:8px;">👑 선발 멤버 선택</label>
          <div style="display:flex;flex-direction:column;gap:5px;max-height:170px;overflow-y:auto;padding-right:2px;">
            ${allUsers.length
              ? allUsers.map(u=>{
                  const sel=(data.performers||[]).includes(u.username);
                  return `<label style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;border:1.5px solid ${sel?'var(--gold)':'#e2e8f0'};background:${sel?'#fef9ec':'#fafafa'};cursor:pointer;transition:all .15s;">
                    <input type="checkbox" value="${u.username}" class="sc-perf-cb" ${sel?'checked':''} style="width:16px;height:16px;accent-color:#c9a227;flex-shrink:0;">
                    <span style="font-size:.8rem;font-weight:800;color:${sel?'#92400e':'var(--navy)'};">${u.username}</span>
                    ${sel?'<span style="margin-left:auto;font-size:.62rem;background:var(--gold);color:#fff;padding:2px 7px;border-radius:8px;font-weight:900;">선발</span>':''}
                  </label>`;
                }).join('')
              : '<div style="text-align:center;color:#94a3b8;font-size:.8rem;padding:12px;">등록된 팀원이 없어요</div>'
            }
          </div>
        </div>
      </div>

      <div style="display:flex;gap:7px;margin-top:20px;">
        <button onclick="document.getElementById('showcase-editor-modal')?.remove()"
          style="flex:1;padding:12px;background:#f1f5f9;border:none;border-radius:10px;font-size:.8rem;font-weight:700;font-family:inherit;cursor:pointer;color:#64748b;">취소</button>
        <button onclick="saveShowcaseData()"
          style="flex:2;padding:12px;background:linear-gradient(135deg,#0a0a1a,#2563eb);color:#fff;border:none;border-radius:10px;font-size:.82rem;font-weight:900;font-family:inherit;cursor:pointer;">저장</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
}

export function saveShowcaseData(){
  if(!isAdmin()) return;
  const videoUrl=(document.getElementById('sc-video')?.value||'').trim();
  const song=(document.getElementById('sc-song')?.value||'').trim();
  const artist=(document.getElementById('sc-artist')?.value||'').trim();
  const desc=(document.getElementById('sc-desc')?.value||'').trim();
  const techStr=(document.getElementById('sc-techniques')?.value||'').trim();
  const techniques=techStr?techStr.split(',').map(s=>s.trim()).filter(Boolean):[];
  const date=(document.getElementById('sc-date')?.value||'').trim();
  const venue=(document.getElementById('sc-venue')?.value||'').trim();
  const performers=[...document.querySelectorAll('.sc-perf-cb:checked')].map(cb=>cb.value);
  const data={videoUrl,song,artist,desc,techniques,date,venue,performers};
  localStorage.setItem('kps_showcase',JSON.stringify(data));
  document.getElementById('showcase-editor-modal')?.remove();
  renderShowcasePage();
  window.showToast?.(t('toast.showcase_saved'));
}
