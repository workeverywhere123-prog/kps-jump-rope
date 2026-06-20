// ══════════════════════════════════════════
//  진입점 — 모든 모듈을 조립하고 window에 노출
// ══════════════════════════════════════════
import './style.css';

import { S, lsKey, initUserState, loadDayState } from './state.js';
import { ensureAdminAccount, isAdminUser, renderAuthScreen, renderHomePage, switchHomePanel, renderUserBadge,
         authLogin, authSignup, switchPanel, doLogout } from './auth.js';
import { isAdmin, onBadgeTap, toggleAdmin, renderAdminBar,
         adminJump, adminCompleteDay, adminCompleteAll } from './admin.js';
import { renderStrip, renderPhaseBar, renderSkills, updateStats, updateStampBtn,
         watchVideo, startTimer, handleStampClick, executeNextStep,
         selectDay, adminSwitchPhase, showToast,
         showResetConfirm, hideResetConfirm, resetProgress } from './render.js';
import { showProfilePage, submitProfilePost, deleteProfilePost,
         renderLeaderAvatar,
         renderMemberGrid, renderGalleryPage, showAdminGalleryUpload,
         submitGalleryUpload, deleteGalleryItem,
         renderScheduleCalendar, calPrevMonth, calNextMonth,
         showDayEditor, selectDayType, saveDayEvent, deleteDayEvent,
         renderWeeklySchedule, showWeeklyScheduleEditor, wsSetType, saveWeeklySchedule, renderFooterSchedule,
         renderShowcasePage, showShowcaseEditor, saveShowcaseData } from './profile.js';
import { showAvatarCreator, showAvatarProfile, showShop,
         avSetAnimal, avSetBodyColor, avSetEyes, avSetMouth, avSetBg, avSwitchTab, avSave,
         avBuy, avTryOn, avToggleEquip, avToggleEquipCreator, avToggleEquipProfile, avShopCat, getAvatar } from './avatar.js';
import { applyI18n } from './i18n.js';

// ── 앱 초기화 ──────────────────────────────
function initApp(){
  document.getElementById('home-overlay')?.remove();
  Object.values(S.timerIntervals).forEach(clearInterval);
  S.timerIntervals = {};
  loadDayState();
  renderAdminBar();
  renderStrip();
  renderPhaseBar();
  renderSkills();
  updateStampBtn();
  updateStats();
  renderUserBadge();
  renderFooterSchedule();
  renderLeaderAvatar();
  const lastPage = localStorage.getItem('kps_last_page') || 'achievement';
  window.switchPage?.(lastPage);
  applyI18n();
}

// ── 전역 함수 노출 ─────────────────────────
window.applyI18n            = applyI18n;
window.initApp              = initApp;
window.watchVideo           = watchVideo;
window.startTimer           = startTimer;
window.handleStampClick     = handleStampClick;
window.executeNextStep      = executeNextStep;
window.selectDay            = selectDay;
window.adminSwitchPhase     = adminSwitchPhase;
window.showToast            = showToast;
window.showResetConfirm     = showResetConfirm;
window.hideResetConfirm     = hideResetConfirm;
window.resetProgress        = resetProgress;
window.onBadgeTap           = onBadgeTap;
window.toggleAdmin          = toggleAdmin;
window.adminJump            = adminJump;
window.adminCompleteDay     = adminCompleteDay;
window.adminCompleteAll     = adminCompleteAll;
window.authLogin            = authLogin;
window.authSignup           = authSignup;
window.switchPanel          = switchPanel;
window.doLogout             = doLogout;
window.renderAuthScreen     = renderAuthScreen;
window.renderHomePage       = renderHomePage;
window.switchHomePanel      = switchHomePanel;
window.renderUserBadge      = renderUserBadge;
window.showAvatarCreator    = showAvatarCreator;
window.showAvatarProfile    = showAvatarProfile;
window.showShop             = showShop;
window.avSetAnimal          = avSetAnimal;
window.avSetBodyColor       = avSetBodyColor;
window.avSetEyes            = avSetEyes;
window.avSetMouth           = avSetMouth;
window.avSetBg              = avSetBg;
window.avSwitchTab          = avSwitchTab;
window.avSave               = avSave;
window.avBuy                = avBuy;
window.avTryOn              = avTryOn;
window.avToggleEquip        = avToggleEquip
window.avToggleEquipCreator = avToggleEquipCreator;
window.avShopCat            = avShopCat;
window.avToggleEquipProfile = avToggleEquipProfile;
window.renderLeaderAvatar    = renderLeaderAvatar;
window.showProfilePage       = showProfilePage;
window.submitProfilePost     = submitProfilePost;
window.deleteProfilePost     = deleteProfilePost;
window.renderMemberGrid      = renderMemberGrid;
window.renderGalleryPage     = renderGalleryPage;
window.showAdminGalleryUpload= showAdminGalleryUpload;
window.submitGalleryUpload   = submitGalleryUpload;
window.deleteGalleryItem     = deleteGalleryItem;
window.renderWeeklySchedule   = renderWeeklySchedule;
window.renderFooterSchedule   = renderFooterSchedule;
window.showWeeklyScheduleEditor= showWeeklyScheduleEditor;
window.wsSetType               = wsSetType;
window.saveWeeklySchedule      = saveWeeklySchedule;
window.renderScheduleCalendar= renderScheduleCalendar;
window.calPrevMonth          = calPrevMonth;
window.calNextMonth          = calNextMonth;
window.showDayEditor         = showDayEditor;
window.selectDayType         = selectDayType;
window.saveDayEvent          = saveDayEvent;
window.deleteDayEvent        = deleteDayEvent;
window.renderShowcasePage    = renderShowcasePage;
window.showShowcaseEditor    = showShowcaseEditor;
window.saveShowcaseData      = saveShowcaseData;

// ── 진입점 ─────────────────────────────────
window.onload = async () => {
  await ensureAdminAccount();
  // 작업모드는 매 세션마다 수동으로 켜야 함 (자동 복원 안 함)
  localStorage.removeItem('kps_admin');
  S.adminMode = false;
  if(S.currentUser){
    initUserState();
    renderUserBadge();
    if(!getAvatar().animal){
      showAvatarCreator(false);
    } else {
      initApp();
    }
  } else {
    renderHomePage();
    applyI18n();
  }
};
