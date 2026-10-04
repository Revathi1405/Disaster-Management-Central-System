/* ==========================================================================
   RescueLink Disaster Monitoring & Command GIS View
   Interactive Leaflet GIS map dashboard, live audit log ticker, and response analytics.
   ========================================================================== */

import L from 'leaflet';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let activeMap = null;
let chartInstance1 = null;
let chartInstance2 = null;

export function renderMonitoringView(state) {
  const incidents = state.incidents || [];
  const rescueTeams = state.rescueTeams || [];
  const hospitals = state.hospitals || [];
  const auditLogs = state.auditLogs || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-critical" style="margin-bottom: 0.4rem;">FR9 & FR15 Module</span>
          <h1 style="font-size: 2rem; color: #0f172a;">Command Center GIS Monitoring</h1>
          <p style="color: #64748b;">Real-time spatial visualization of disaster incidents, rescue units, and resource hubs.</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline btn-sm" id="btn-recenter-map">
            🎯 Recenter Map
          </button>
          <button class="btn btn-primary btn-sm" id="btn-refresh-monitoring">
            🔄 Refresh Signals
          </button>
        </div>
      </div>

      <!-- Top KPI Summary Bar -->
      <div class="kpi-summary-grid">
        <div class="kpi-card" style="border-top: 4px solid #dc2626;">
          <span class="kpi-label">Active Emergencies</span>
          <span class="kpi-value" style="color: #dc2626;">${incidents.filter(i => i.status !== 'Closed').length}</span>
        </div>
        <div class="kpi-card" style="border-top: 4px solid #ea580c;">
          <span class="kpi-label">Rescue Teams Deployed</span>
          <span class="kpi-value" style="color: #ea580c;">${rescueTeams.filter(t => t.status !== 'Idle').length}</span>
        </div>
        <div class="kpi-card" style="border-top: 4px solid #16a34a;">
          <span class="kpi-label">Available Hospital Beds</span>
          <span class="kpi-value" style="color: #16a34a;">${hospitals.reduce((acc, h) => acc + h.availableBeds, 0)}</span>
        </div>
        <div class="kpi-card" style="border-top: 4px solid #0284c7;">
          <span class="kpi-label">Avg Incident Processing Time</span>
          <span class="kpi-value" style="color: #0284c7;">3.2s</span>
        </div>
      </div>

      <!-- Split View Map & Live Side Panel -->
      <div class="map-command-wrapper" style="margin-bottom: 2.5rem;">
        
        <!-- Interactive Leaflet Map Canvas -->
        <div style="position: relative;">
          <div id="map-container"></div>
          
          <!-- Map Legend Overlay -->
          <div style="position: absolute; bottom: 15px; left: 15px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(4px); color: #ffffff; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.75rem; z-index: 500; border: 1px solid #334155;">
            <div style="font-weight: bold; margin-bottom: 0.35rem; color: #38bdf8;">GIS Map Layers Legend</div>
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span>🔴 Critical Incident Pin</span>
              <span>🟠 High Severity Incident Pin</span>
              <span>🚒 Active Rescue Team Marker</span>
              <span>🏥 Hospital Facility</span>
              <span>⛺ Relief Shelter Camp</span>
            </div>
          </div>
        </div>

        <!-- Right Side: Live System Audit Log Ticker & Charts -->
        <div class="map-side-panel">
          
          <!-- Live Audit Log Ticker (FR17) -->
          <div class="card" style="flex: 1; padding: 1.25rem; display: flex; flex-direction: column;">
            <div class="card-header" style="margin-bottom: 0.75rem;">
              <h3 class="card-title" style="font-size: 0.95rem;">Central Audit Ticker (FR17)</h3>
              <span class="badge badge-dark">Live Log</span>
            </div>

            <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.6rem; max-height: 250px;">
              ${auditLogs.map(log => `
                <div style="background-color: #f8fafc; border-left: 3px solid #0284c7; padding: 0.5rem 0.65rem; border-radius: 4px; font-size: 0.78rem;">
                  <div style="display: flex; justify-content: space-between; color: #64748b; font-size: 0.7rem;">
                    <span>${log.timestamp}</span>
                    <strong style="color: #0f172a;">${log.user}</strong>
                  </div>
                  <strong style="color: #0f172a;">${log.action}</strong>
                  <div style="color: #475569; margin-top: 0.1rem;">${log.details}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

      <!-- Operational Analytics Section (FR16) -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="card-header">
          <h3 class="card-title">Disaster Response Analytics & Performance (FR16)</h3>
          <span class="badge badge-info">Post-Disaster Evaluation</span>
        </div>

        <div class="grid-2">
          <div>
            <h4 style="font-size: 0.9rem; color: #475569; margin-bottom: 0.75rem; text-align: center;">Average Response Time Trend (Minutes vs Time)</h4>
            <canvas id="chart-response-time" style="max-height: 220px;"></canvas>
          </div>

          <div>
            <h4 style="font-size: 0.9rem; color: #475569; margin-bottom: 0.75rem; text-align: center;">Incidents by Category Breakdown</h4>
            <canvas id="chart-incidents-cat" style="max-height: 220px;"></canvas>
          </div>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="monitoring-back-btn">
          ← Back: Notifications
        </button>
        <span class="step-info-text">Step 11 of 12 • Disaster Monitoring</span>
        <button class="btn btn-step-black" id="monitoring-next-btn">
          Next Section: About System Architecture →
        </button>
      </div>

    </div>
  `;
}

export function attachMonitoringEvents(navigateTo, store) {
  const state = store.getState();

  // Initialize Leaflet Map
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    if (activeMap) {
      activeMap.remove();
      activeMap = null;
    }

    const defaultLat = 19.0760;
    const defaultLng = 72.8777;

    activeMap = L.map('map-container').setView([defaultLat, defaultLng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors | RescueLink GIS'
    }).addTo(activeMap);

    // Invalidate map size after DOM animation/layout stabilizes
    setTimeout(() => {
      if (activeMap) activeMap.invalidateSize();
    }, 250);

    // Render Incident Markers (Red / Amber)
    (state.incidents || []).forEach(inc => {
      const markerColor = inc.severity === 'Critical' ? '#dc2626' : '#ea580c';
      const marker = L.circleMarker([inc.lat, inc.lng], {
        radius: 9,
        fillColor: markerColor,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(activeMap);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 0.2rem;">
          <strong style="color: ${markerColor};">#${inc.id} - ${inc.category}</strong><br>
          <span>📍 ${inc.location}</span><br>
          <span>👥 Trapped: <strong>${inc.victimsCount} victims</strong></span><br>
          <span style="font-size: 0.75rem; color: #64748b;">Status: ${inc.status}</span>
        </div>
      `);
    });

    // Render Rescue Teams Markers (Blue)
    (state.rescueTeams || []).forEach(team => {
      const marker = L.circleMarker([team.lat, team.lng], {
        radius: 8,
        fillColor: '#0284c7',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(activeMap);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 0.2rem;">
          <strong style="color: #0284c7;">🚒 ${team.name}</strong><br>
          <span>Agency: ${team.agency}</span><br>
          <span>Status: <strong>${team.status}</strong></span>
        </div>
      `);
    });

    // Render Hospitals Markers (Green)
    (state.hospitals || []).forEach(hosp => {
      const marker = L.circleMarker([hosp.lat, hosp.lng], {
        radius: 8,
        fillColor: '#16a34a',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(activeMap);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 0.2rem;">
          <strong style="color: #16a34a;">🏥 ${hosp.name}</strong><br>
          <span>Beds Available: <strong>${hosp.availableBeds}</strong></span><br>
          <span>ICU Beds: <strong>${hosp.icuBedsAvailable}</strong></span>
        </div>
      `);
    });
  }

  // Recenter map button
  document.getElementById('btn-recenter-map')?.addEventListener('click', () => {
    if (activeMap) activeMap.setView([19.0760, 72.8777], 12);
  });

  document.getElementById('btn-refresh-monitoring')?.addEventListener('click', () => {
    if (activeMap) activeMap.invalidateSize();
  });

  // Render Chart.js Performance Charts
  const ctx1 = document.getElementById('chart-response-time')?.getContext('2d');
  const ctx2 = document.getElementById('chart-incidents-cat')?.getContext('2d');

  if (chartInstance1) chartInstance1.destroy();
  if (chartInstance2) chartInstance2.destroy();

  if (ctx1) {
    chartInstance1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
        datasets: [{
          label: 'Response Time (Mins)',
          data: [14, 11, 8, 5.5, 4.2, 3.2],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  if (ctx2) {
    chartInstance2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Flood', 'Fire', 'Building Collapse', 'Landslide', 'Medical'],
        datasets: [{
          data: [45, 20, 15, 12, 8],
          backgroundColor: ['#0284c7', '#dc2626', '#ea580c', '#d97706', '#16a34a']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // Black Back & Next Navigation Buttons
  document.getElementById('monitoring-back-btn')?.addEventListener('click', () => navigateTo('notifications'));
  document.getElementById('monitoring-next-btn')?.addEventListener('click', () => navigateTo('about'));
}
