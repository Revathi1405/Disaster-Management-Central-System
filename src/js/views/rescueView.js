/* ==========================================================================
   RescueLink Rescue Operations & Smart Matcher View
   Field team dispatches, smart proximity recommendation engine, and operational status updates.
   ========================================================================== */

export function renderRescueView(state) {
  const rescueTeams = state.rescueTeams || [];
  const incidents = state.incidents || [];
  const unassignedIncidents = incidents.filter(i => i.status === 'Reported' || i.status === 'Verified');

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR7 & FR8 Module</span>
        <h1 style="font-size: 2rem; color: #0f172a;">Rescue Operations & Dispatch Center</h1>
        <p style="color: #64748b;">Automated proximity team recommendation and field responder coordination.</p>
      </div>

      <!-- Top Operational Metrics Bar -->
      <div class="grid-4" style="margin-bottom: 2rem;">
        <div class="kpi-card">
          <span class="kpi-label">Active Field Units</span>
          <span class="kpi-value">${rescueTeams.length}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Currently Dispatched</span>
          <span class="kpi-value" style="color: #ea580c;">${rescueTeams.filter(t => t.status === 'En Route' || t.status === 'On Scene').length}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Idle / Ready Teams</span>
          <span class="kpi-value" style="color: #16a34a;">${rescueTeams.filter(t => t.status === 'Idle').length}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Pending Dispatch</span>
          <span class="kpi-value" style="color: #dc2626;">${unassignedIncidents.length}</span>
        </div>
      </div>

      <!-- Smart Proximity Dispatch Engine (2 Columns) -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Left: Unassigned Emergency Incidents Queue -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">1. Pending Emergencies Requiring Rescue</h3>
            <span class="badge badge-critical">${unassignedIncidents.length} Queued</span>
          </div>

          ${unassignedIncidents.length === 0 ? `
            <div style="padding: 2rem; text-align: center; color: #64748b;">
              ✓ All incidents have active assigned rescue teams!
            </div>
          ` : unassignedIncidents.map(inc => `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <strong style="color: #0f172a;">#${inc.id} - ${inc.category}</strong>
                <span class="badge badge-critical">${inc.severity}</span>
              </div>
              <p style="font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem;">
                📍 ${inc.location} • 👥 <strong>${inc.victimsCount} victims trapped</strong>
              </p>
              <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.75rem;">
                "${inc.description}"
              </div>
              
              <!-- Match Proximity Action -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 0.5rem;">
                <span style="font-size: 0.75rem; color: #0284c7; font-weight: bold;">Proximity Match Engine Active</span>
                <select class="form-select select-dispatch-team" data-inc-id="${inc.id}" style="width: auto; padding: 0.3rem 0.6rem; font-size: 0.8rem;">
                  <option value="">-- Select Rescue Team --</option>
                  ${rescueTeams.map(team => `
                    <option value="${team.id}">
                      ${team.name} (${team.status}) - ${team.equipment[0] || 'Standard Gear'}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Right: Active Rescue Units & Equipment Status -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">2. Rescue Teams & Field Equipment</h3>
            <span class="badge badge-dark">Live Roster</span>
          </div>

          ${rescueTeams.map(team => `
            <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid ${team.status === 'Idle' ? '#16a34a' : '#ea580c'}; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <strong style="color: #0f172a; font-size: 0.95rem;">${team.name}</strong>
                <span class="badge ${team.status === 'Idle' ? 'badge-low' : 'badge-high'}">${team.status}</span>
              </div>
              <div style="font-size: 0.85rem; color: #475569; margin-bottom: 0.4rem;">
                🏢 Agency: <strong>${team.agency}</strong> • 👥 Members: <strong>${team.membersCount}</strong>
              </div>
              <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem;">
                📍 Base Location: ${team.currentLocation}
              </div>
              <div style="font-size: 0.75rem; color: #334155; background-color: #f1f5f9; padding: 0.4rem 0.6rem; border-radius: 6px;">
                ⚙️ Gear: ${team.equipment.join(' • ')}
              </div>
              ${team.assignedIncidentId ? `
                <div style="margin-top: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; color: #dc2626; font-weight: bold;">Mission: #${team.assignedIncidentId}</span>
                  <button class="btn btn-sm btn-outline btn-complete-mission" data-team-id="${team.id}" data-inc-id="${team.assignedIncidentId}">
                    ✓ Complete Rescue Mission
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="rescue-back-btn">
          ← Back: Incidents Pipeline
        </button>
        <span class="step-info-text">Step 4 of 10 • Rescue Operations</span>
        <button class="btn btn-step-black" id="rescue-next-btn">
          Next Section: Emergency Resources →
        </button>
      </div>

    </div>
  `;
}

export function attachRescueEvents(navigateTo, store) {
  // Dispatch selector handler
  document.querySelectorAll('.select-dispatch-team').forEach(select => {
    select.addEventListener('change', (e) => {
      const incId = e.currentTarget.dataset.incId;
      const teamId = e.currentTarget.value;
      if (incId && teamId) {
        store.dispatchTeam(incId, teamId);
      }
    });
  });

  // Complete Mission handler
  document.querySelectorAll('.btn-complete-mission').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const incId = e.currentTarget.dataset.incId;
      if (incId) {
        store.updateIncidentStatus(incId, 'Resolved');
      }
    });
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('rescue-back-btn')?.addEventListener('click', () => navigateTo('incidents'));
  document.getElementById('rescue-next-btn')?.addEventListener('click', () => navigateTo('resources'));
}
