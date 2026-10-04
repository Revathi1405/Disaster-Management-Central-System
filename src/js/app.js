/* ==========================================================================
   RescueLink Main Application Entry & Router
   ========================================================================== */

import { store } from './state.js';
import { renderHomeView, attachHomeEvents } from './views/homeView.js';
import { renderDashboardView, attachDashboardEvents } from './views/dashboardView.js';
import { renderWorkflowView, attachWorkflowEvents } from './views/workflowView.js';
import { renderReportView, attachReportEvents } from './views/reportView.js';
import { renderIncidentsView, attachIncidentsEvents } from './views/incidentsView.js';
import { renderRescueView, attachRescueEvents } from './views/rescueView.js';
import { renderResourcesView, attachResourcesEvents } from './views/resourcesView.js';
import { renderHospitalsSheltersView, attachHospitalsSheltersEvents } from './views/hospitalsSheltersView.js';
import { renderVolunteersView, attachVolunteersEvents } from './views/volunteersView.js';
import { renderNotificationsView, attachNotificationsEvents } from './views/notificationsView.js';
import { renderMonitoringView, attachMonitoringEvents } from './views/monitoringView.js';
import { renderAboutView, attachAboutEvents } from './views/aboutView.js';

// View Registry
const VIEWS = {
  home: { render: renderHomeView, attach: attachHomeEvents },
  dashboard: { render: renderDashboardView, attach: attachDashboardEvents },
  workflow: { render: renderWorkflowView, attach: attachWorkflowEvents },
  report: { render: renderReportView, attach: attachReportEvents },
  incidents: { render: renderIncidentsView, attach: attachIncidentsEvents },
  rescue: { render: renderRescueView, attach: attachRescueEvents },
  resources: { render: renderResourcesView, attach: attachResourcesEvents },
  hospitals: { render: renderHospitalsSheltersView, attach: attachHospitalsSheltersEvents },
  volunteers: { render: renderVolunteersView, attach: attachVolunteersEvents },
  notifications: { render: renderNotificationsView, attach: attachNotificationsEvents },
  monitoring: { render: renderMonitoringView, attach: attachMonitoringEvents },
  about: { render: renderAboutView, attach: attachAboutEvents }
};

// Navigation Function
export function navigateTo(viewName) {
  if (!VIEWS[viewName]) viewName = 'home';
  store.setView(viewName);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Core Router Engine
function renderApp() {
  const state = store.getState();
  const currentView = state.currentView || 'home';
  const viewObj = VIEWS[currentView] || VIEWS['home'];

  const appContent = document.getElementById('app-content');
  if (appContent) {
    appContent.innerHTML = viewObj.render(state, navigateTo);
    viewObj.attach(navigateTo, store);
  }

  // Update Nav Link States
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.dataset.view === currentView) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Sync Role Dropdown
  const roleSelect = document.getElementById('user-role-select');
  if (roleSelect && roleSelect.value !== state.currentRole) {
    roleSelect.value = state.currentRole;
  }
}

// Initialize Application Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Subscribe State
  store.subscribe(() => {
    renderApp();
  });

  // Desktop & Mobile Navigation Click Handlers
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-view]');
    if (target) {
      e.preventDefault();
      const viewName = target.dataset.view;
      navigateTo(viewName);

      // Close mobile drawer if open
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) drawer.classList.remove('open');
    }
  });

  // Brand Logo Click -> Home
  document.getElementById('nav-brand')?.addEventListener('click', () => navigateTo('home'));
  document.getElementById('header-sos-btn')?.addEventListener('click', () => navigateTo('report'));

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');

  mobileBtn?.addEventListener('click', () => {
    if (drawer) drawer.classList.add('open');
  });

  closeDrawerBtn?.addEventListener('click', () => {
    if (drawer) drawer.classList.remove('open');
  });

  // Role Selector Listener
  document.getElementById('user-role-select')?.addEventListener('change', (e) => {
    store.setRole(e.target.value);
  });

  // Close Prototype Disclaimer Bar
  document.getElementById('close-disclaimer')?.addEventListener('click', (e) => {
    const bar = e.target.closest('.demo-disclaimer-bar');
    if (bar) bar.style.display = 'none';
  });

  // Initial Render
  renderApp();
});
