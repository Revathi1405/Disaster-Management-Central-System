/* ==========================================================================
   RescueLink Executive Operational Dashboard
   Unified Command Center Dashboard displaying all 9 core operational metrics:
   1. Active Disaster Incidents
   2. Critical/Priority Incidents
   3. Available Rescue Teams
   4. Active Rescue Operations
   5. Available Emergency Resources
   6. Nearby Hospitals & ICU Beds
   7. Available Shelters & Occupancy
   8. Registered Volunteers & Skills
   9. Recent Emergency Notifications
   Includes Leaflet GIS Map, Chart.js Visualizations, and Black Navigation Buttons.
   ========================================================================== */

import L from 'leaflet';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let dashboardMap = null;
let dashChart1 = null;
let dashChart2 = null;

export function renderDashboardView(state) {
  const incidents = state.incidents || [];
  const rescueTeams = state.rescueTeams || [];
  const resources = state.resources || [];
  const hospitals = state.hospitals || [];
  const shelters = state.shelters || [];
  const volunteers = state.volunteers || [];
  const notifications = state.notifications || [];

  const activeIncidents = incidents.filter(i => i.status !== 'Closed');
  const criticalIncidents = incidents.filter(i => i.severity === 'Critical' || i.severity === 'High');
  const availableTeams = rescueTeams.filter(t => t.status === 'Idle');
  const activeOps = rescueTeams.filter(t => t.status !== 'Idle');
  const totalBeds = hospitals.reduce((acc, h) => acc + h.availableBeds, 0);

  return `
    <div class="page-container">
      
      <!-- Operational Header Banner -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 2rem; border-radius: 14px; margin-bottom: 2rem; box-shadow: var(--shadow-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
              <span class="live-badge"><span class="pulse-dot"></span> LIVE COMMAND DASHBOARD</span>
              <span class="badge badge-dark" style="background: rgba(255,255,255,0.1); color: #cbd5e1;">DEMONSTRATION SYSTEM</span>
            </div>
            <h1 style="font-size: 2.25rem; color: #ffffff; margin-bottom: 0.2rem;">RescueLink Operational Control Dashboard</h1>
            <p style="color: #94a3b8; font-size: 0.95rem;">Real-time multi-agency disaster response status, resource allocation, and GIS monitoring.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-sos" id="dash-btn-sos">🚨 Report SOS</button>
            <button class="btn btn-primary" id="dash-btn-workflow">🔄 Test Workflow Simulator</button>
          </div>
        </div>
      </div>

      <!-- 9 KEY OPERATIONAL METRICS TOP BAR CARDS -->
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2rem;">
        
        <div class="kpi-card" style="border-top: 4px solid #dc2626;">
          <span class="kpi-label">1. Active Incidents</span>
          <span class="kpi-value" style="color: #dc2626;">${activeIncidents.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">Total Unclosed Reports</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #ea580c;">
          <span class="kpi-label">2. Critical / High Priority</span>
          <span class="kpi-value" style="color: #ea580c;">${criticalIncidents.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">Trapped Victims SOS</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #16a34a;">
          <span class="kpi-label">3. Available Teams</span>
          <span class="kpi-value" style="color: #16a34a;">${availableTeams.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">NDRF / Fire Ready</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #0284c7;">
          <span class="kpi-label">4. Active Rescue Ops</span>
          <span class="kpi-value" style="color: #0284c7;">${activeOps.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">En Route / On Scene</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #8b5cf6;">
          <span class="kpi-label">5. Resources Available</span>
          <span class="kpi-value" style="color: #8b5cf6;">${resources.reduce((acc, r) => acc + r.available, 0)}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">Boats, Pumps, Gear</span>
        </div>

      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem;">
        
        <div class="kpi-card" style="border-top: 4px solid #16a34a;">
          <span class="kpi-label">6. Available Hospital Beds</span>
          <span class="kpi-value" style="color: #16a34a;">${totalBeds}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">General + ICU Beds</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #d97706;">
          <span class="kpi-label">7. Available Shelters</span>
          <span class="kpi-value" style="color: #d97706;">${shelters.length} Camps</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">1,310 Occupants Hosted</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #0284c7;">
          <span class="kpi-label">8. Registered Volunteers</span>
          <span class="kpi-value" style="color: #0284c7;">${volunteers.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">First Aid & Logistics Pool</span>
        </div>

        <div class="kpi-card" style="border-top: 4px solid #dc2626;">
          <span class="kpi-label">9. Broadcast Alerts</span>
          <span class="kpi-value" style="color: #dc2626;">${notifications.length}</span>
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 0.2rem;">SMS + Push Dispatches</span>
        </div>

      </div>

      <!-- MAIN GIS LOCATION MAP & CRITICAL INCIDENTS FEED -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- GIS Map Canvas Card -->
        <div class="card" style="padding: 1rem; display: flex; flex-direction: column;">
          <div class="card-header" style="margin-bottom: 0.75rem;">
            <h3 class="card-title">🗺️ Live GIS Command Map Area</h3>
            <span class="badge badge-info">Spatial Signal Feed</span>
          </div>

          <div id="dash-map-container" style="height: 380px; width: 100%; border-radius: 8px; border: 1px solid #cbd5e1;"></div>

          <div style="display: flex; gap: 1rem; font-size: 0.75rem; color: #475569; margin-top: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <span>🔴 Critical Incident</span>
            <span>🟠 High Incident</span>
            <span>🚒 Rescue Team</span>
            <span>🏥 Hospital</span>
            <span>⛺ Relief Shelter</span>
          </div>
        </div>

        <!-- Critical / Priority Incidents List Card -->
        <div class="card" style="display: flex; flex-direction: column;">
          <div class="card-header">
            <h3 class="card-title">🚨 Critical & Priority Incidents Feed</h3>
            <span class="badge badge-critical">${criticalIncidents.length} High Priority</span>
          </div>

          <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; max-height: 380px;">
            ${criticalIncidents.map(inc => `
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 5px solid ${inc.severity === 'Critical' ? '#dc2626' : '#ea580c'}; border-radius: 8px; padding: 0.85rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <strong style="color: #0f172a; font-size: 0.95rem;">#${inc.id} - ${inc.category}</strong>
                  <span class="badge ${inc.severity === 'Critical' ? 'badge-critical' : 'badge-high'}">${inc.severity}</span>
                </div>
                <div style="font-size: 0.825rem; color: #475569; margin-bottom: 0.35rem;">
                  📍 ${inc.location} • 👥 <strong>${inc.victimsCount} victims trapped</strong>
                </div>
                <div style="font-size: 0.78rem; color: #64748b; line-height: 1.35; margin-bottom: 0.5rem;">
                  "${inc.description}"
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; border-top: 1px solid #f1f5f9; padding-top: 0.4rem;">
                  <span class="badge badge-dark">Status: ${inc.status}</span>
                  <span style="color: #0284c7; font-weight: bold;">Assigned: ${inc.assignedTeamId || 'None'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- AVAILABLE TEAMS & RESOURCES SUMMARY GRID -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Available & Deployed Rescue Teams Card -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🚒 Rescue Squads Roster</h3>
            <span class="badge badge-dark">${rescueTeams.length} Total Units</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Agency</th>
                  <th>Status</th>
                  <th>Equipment</th>
                </tr>
              </thead>
              <tbody>
                ${rescueTeams.map(t => `
                  <tr>
                    <td><strong style="color: #0f172a;">${t.name}</strong></td>
                    <td>${t.agency}</td>
                    <td><span class="badge ${t.status === 'Idle' ? 'badge-low' : 'badge-high'}">${t.status}</span></td>
                    <td style="font-size: 0.78rem; color: #475569;">${t.equipment[0] || 'Standard Gear'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Available Emergency Resources Inventory -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📦 Emergency Resources Stock</h3>
            <span class="badge badge-info">Inventory Ledger</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Category</th>
                  <th>Available</th>
                  <th>Total Stock</th>
                </tr>
              </thead>
              <tbody>
                ${resources.map(r => `
                  <tr>
                    <td><strong style="color: #0f172a;">${r.name}</strong></td>
                    <td><span class="badge badge-dark" style="font-size: 0.7rem;">${r.category}</span></td>
                    <td><strong style="color: #16a34a;">${r.available}</strong></td>
                    <td>${r.total}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- HOSPITALS & SHELTERS STATUS GRID -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Nearby Hospitals Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🏥 Nearby Hospital Capacity</h3>
            <span class="badge badge-low">Medical Support</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Gen Beds</th>
                  <th>ICU Beds</th>
                  <th>Ambulances</th>
                </tr>
              </thead>
              <tbody>
                ${hospitals.map(h => `
                  <tr>
                    <td><strong style="color: #0f172a;">${h.name}</strong></td>
                    <td><strong style="color: #16a34a;">${h.availableBeds} / ${h.totalBeds}</strong></td>
                    <td><strong style="color: ${h.icuBedsAvailable < 5 ? '#dc2626' : '#16a34a'};">${h.icuBedsAvailable} ICU</strong></td>
                    <td><span style="color: #0284c7;">${h.ambulancesAvailable} / ${h.ambulancesTotal}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Available Relief Shelters Table -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">⛺ Relief Camps & Stock</h3>
            <span class="badge badge-medium">Relief Logistics</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Shelter Camp Name</th>
                  <th>Occupancy</th>
                  <th>Food Stock</th>
                  <th>Water Volume</th>
                </tr>
              </thead>
              <tbody>
                ${shelters.map(s => {
                  const occP = Math.round((s.currentOccupancy / s.maxCapacity) * 100);
                  return `
                    <tr>
                      <td><strong style="color: #0f172a;">${s.name}</strong></td>
                      <td><span class="badge ${occP > 80 ? 'badge-critical' : 'badge-low'}">${s.currentOccupancy} (${occP}%)</span></td>
                      <td>${s.foodStockDays} Days</td>
                      <td>${s.waterLiters} Liters</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- VOLUNTEERS & NOTIFICATIONS STREAM -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Registered Volunteers Skill Matrix -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🤝 Volunteer Roster & Skills</h3>
            <span class="badge badge-dark">${volunteers.length} Active</span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Volunteer Name</th>
                  <th>Primary Skill</th>
                  <th>Zone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${volunteers.map(v => `
                  <tr>
                    <td><strong style="color: #0f172a;">${v.name}</strong></td>
                    <td><span class="badge badge-info" style="font-size: 0.7rem;">${v.skills[0] || 'General'}</span></td>
                    <td>${v.zone}</td>
                    <td><span class="badge ${v.status === 'Assigned' ? 'badge-high' : 'badge-low'}">${v.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Broadcast Notifications Feed -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🔔 Recent Emergency Broadcasts</h3>
            <span class="badge badge-dark">Broadcast Log</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 220px; overflow-y: auto;">
            ${notifications.map(n => `
              <div style="background-color: #f8fafc; border-left: 4px solid ${n.warningLevel === 'Critical' ? '#dc2626' : '#ea580c'}; padding: 0.65rem; border-radius: 6px; font-size: 0.825rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
                  <strong style="color: #0f172a;">${n.title}</strong>
                  <span class="badge ${n.warningLevel === 'Critical' ? 'badge-critical' : 'badge-high'}" style="font-size: 0.65rem;">${n.warningLevel}</span>
                </div>
                <div style="color: #475569; font-size: 0.78rem;">${n.message}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- ANALYTICS CHARTS CARD -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="card-header">
          <h3 class="card-title">📊 Operational Analytics & Performance Charts</h3>
          <span class="badge badge-info">Real-Time Evaluation</span>
        </div>

        <div class="grid-2">
          <div>
            <h4 style="font-size: 0.85rem; color: #475569; text-align: center; margin-bottom: 0.5rem;">Incident Response Latency (Minutes vs Time)</h4>
            <canvas id="dash-chart-1" style="max-height: 200px;"></canvas>
          </div>
          <div>
            <h4 style="font-size: 0.85rem; color: #475569; text-align: center; margin-bottom: 0.5rem;">Disaster Category Distribution</h4>
            <canvas id="dash-chart-2" style="max-height: 200px;"></canvas>
          </div>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="dash-back-btn">
          ← Back: Home Overview
        </button>
        <span class="step-info-text">RescueLink Executive Operational Dashboard</span>
        <button class="btn btn-step-black" id="dash-next-btn">
          Next Section: Workflow Simulator →
        </button>
      </div>

    </div>
  `;
}

export function attachDashboardEvents(navigateTo, store) {
  const state = store.getState();

  document.getElementById('dash-btn-sos')?.addEventListener('click', () => navigateTo('report'));
  document.getElementById('dash-btn-workflow')?.addEventListener('click', () => navigateTo('workflow'));

  // Initialize Map
  const mapContainer = document.getElementById('dash-map-container');
  if (mapContainer) {
    if (dashboardMap) {
      dashboardMap.remove();
      dashboardMap = null;
    }

    dashboardMap = L.map('dash-map-container').setView([19.0760, 72.8777], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors | RescueLink'
    }).addTo(dashboardMap);

    // Invalidate size after layout completes
    setTimeout(() => {
      if (dashboardMap) dashboardMap.invalidateSize();
    }, 250);

    // Incidents
    (state.incidents || []).forEach(inc => {
      const col = inc.severity === 'Critical' ? '#dc2626' : '#ea580c';
      L.circleMarker([inc.lat, inc.lng], {
        radius: 8,
        fillColor: col,
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(dashboardMap).bindPopup(`<strong>#${inc.id} - ${inc.category}</strong><br>${inc.location}`);
    });

    // Rescue Teams
    (state.rescueTeams || []).forEach(team => {
      L.circleMarker([team.lat, team.lng], {
        radius: 7,
        fillColor: '#0284c7',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(dashboardMap).bindPopup(`<strong>🚒 ${team.name}</strong><br>Status: ${team.status}`);
    });

    // Hospitals
    (state.hospitals || []).forEach(h => {
      L.circleMarker([h.lat, h.lng], {
        radius: 7,
        fillColor: '#16a34a',
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(dashboardMap).bindPopup(`<strong>🏥 ${h.name}</strong><br>Beds: ${h.availableBeds}`);
    });
  }

  // Render Charts
  const ctx1 = document.getElementById('dash-chart-1')?.getContext('2d');
  const ctx2 = document.getElementById('dash-chart-2')?.getContext('2d');

  if (dashChart1) dashChart1.destroy();
  if (dashChart2) dashChart2.destroy();

  if (ctx1) {
    dashChart1 = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '18:00'],
        datasets: [{
          label: 'Response Latency (Mins)',
          data: [14, 11, 8.2, 5.5, 4.2, 3.2],
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  if (ctx2) {
    dashChart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Flood', 'Fire', 'Building Collapse', 'Landslide', 'Medical'],
        datasets: [{
          data: [45, 20, 15, 12, 8],
          backgroundColor: ['#0284c7', '#dc2626', '#ea580c', '#d97706', '#16a34a']
        }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
  }

  // Black Back & Next Navigation Buttons
  document.getElementById('dash-back-btn')?.addEventListener('click', () => navigateTo('home'));
  document.getElementById('dash-next-btn')?.addEventListener('click', () => navigateTo('workflow'));
}
