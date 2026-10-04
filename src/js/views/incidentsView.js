/* ==========================================================================
   RescueLink Disaster Incidents Lifecycle View
   Data table and filterable incident pipeline tracking (Reported ➔ Verified ➔ Assigned ➔ In Progress ➔ Resolved ➔ Closed)
   ========================================================================== */

export function renderIncidentsView(state) {
  const incidents = state.incidents || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR3 - FR5 Module</span>
          <h1 style="font-size: 2rem; color: #0f172a;">Disaster Incident Management</h1>
          <p style="color: #64748b;">Centralized verification, prioritization, and lifecycle status tracking.</p>
        </div>
        <div>
          <button class="btn btn-sos" id="incidents-new-sos">
            🚨 Report New Incident SOS
          </button>
        </div>
      </div>

      <!-- Lifecycle Pipeline Overview Bar -->
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
        <div style="font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 0.75rem; text-transform: uppercase;">
          Incident Lifecycle Pipeline (FR5 Traceability)
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; text-align: center;">
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #dc2626;">1. REPORTED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #991b1b;">${incidents.filter(i => i.status === 'Reported').length}</div>
          </div>
          <div style="background-color: #fff7ed; border: 1px solid #fed7aa; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #ea580c;">2. VERIFIED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #c2410c;">${incidents.filter(i => i.status === 'Verified').length}</div>
          </div>
          <div style="background-color: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #d97706;">3. ASSIGNED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #b45309;">${incidents.filter(i => i.status === 'Assigned').length}</div>
          </div>
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #0284c7;">4. IN PROGRESS</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #0369a1;">${incidents.filter(i => i.status === 'In Progress').length}</div>
          </div>
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #16a34a;">5. RESOLVED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #15803d;">${incidents.filter(i => i.status === 'Resolved').length}</div>
          </div>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 0.6rem; border-radius: 8px;">
            <div style="font-size: 0.7rem; font-weight: bold; color: #64748b;">6. CLOSED</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #334155;">${incidents.filter(i => i.status === 'Closed').length}</div>
          </div>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="flex: 1; min-width: 220px;">
            <label for="incidents-search" class="sr-only">Search Incidents</label>
            <input type="text" id="incidents-search" class="form-control" placeholder="Search by Incident ID, location, description...">
          </div>
          <div style="width: 180px;">
            <label for="incidents-status-filter" class="sr-only">Filter by Status</label>
            <select id="incidents-status-filter" class="form-select">
              <option value="ALL">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Verified">Verified</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div style="width: 180px;">
            <label for="incidents-severity-filter" class="sr-only">Filter by Severity</label>
            <select id="incidents-severity-filter" class="form-select">
              <option value="ALL">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Incidents Data Table -->
      <div class="table-responsive">
        <table class="data-table" id="incidents-table">
          <thead>
            <tr>
              <th>ID & Timestamp</th>
              <th>Category & Description</th>
              <th>Location (GPS)</th>
              <th>Victims</th>
              <th>Severity</th>
              <th>Lifecycle Status</th>
              <th>Assigned Unit</th>
              <th>Control Actions</th>
            </tr>
          </thead>
          <tbody>
            ${incidents.length === 0 ? `
              <tr>
                <td colspan="8">
                  <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-title">No Incident Reports Registered</div>
                    <div class="empty-state-desc">Use the Report Emergency SOS button to record a new disaster incident.</div>
                  </div>
                </td>
              </tr>
            ` : incidents.map(inc => {
              const severityBadge = inc.severity === 'Critical' ? 'badge-critical' :
                                    inc.severity === 'High' ? 'badge-high' :
                                    inc.severity === 'Medium' ? 'badge-medium' : 'badge-low';

              const statusBadge = inc.status === 'Reported' ? 'badge-critical' :
                                  inc.status === 'Verified' ? 'badge-high' :
                                  inc.status === 'Assigned' ? 'badge-medium' :
                                  inc.status === 'In Progress' ? 'badge-info' : 'badge-low';

              return `
                <tr class="inc-row">
                  <td>
                    <strong style="color: #0f172a; font-family: monospace; font-size: 0.95rem;">#${inc.id}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;">${inc.timestamp}</div>
                  </td>
                  <td style="max-width: 250px;">
                    <strong style="color: #0f172a;">${inc.category}</strong>
                    <div style="font-size: 0.8rem; color: #475569; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${inc.description}">
                      ${inc.description}
                    </div>
                  </td>
                  <td>
                    <div style="font-size: 0.85rem; color: #0f172a;">${inc.location}</div>
                    <div style="font-size: 0.725rem; color: #0284c7; font-family: monospace;">(${inc.lat.toFixed(4)}, ${inc.lng.toFixed(4)})</div>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: #dc2626;">${inc.victimsCount} trapped</span>
                  </td>
                  <td><span class="badge ${severityBadge}">${inc.severity}</span></td>
                  <td><span class="badge ${statusBadge}">${inc.status}</span></td>
                  <td>
                    ${inc.assignedTeamId ? `<span class="badge badge-dark">${inc.assignedTeamId}</span>` : `<span style="color: #94a3b8; font-size: 0.8rem;">Unassigned</span>`}
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                      ${inc.status === 'Reported' ? `
                        <button class="btn btn-sm btn-outline btn-verify-inc" data-id="${inc.id}" style="color: #ea580c; border-color: #fed7aa;">
                          ✓ Verify
                        </button>
                      ` : ''}
                      ${inc.status === 'Verified' || inc.status === 'Reported' ? `
                        <button class="btn btn-sm btn-primary btn-dispatch-inc" data-id="${inc.id}">
                          🚒 Dispatch
                        </button>
                      ` : ''}
                      <button class="btn btn-sm btn-outline btn-status-inc" data-id="${inc.id}">
                        ⚙️ Update
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="incidents-back-btn">
          ← Back: Report Emergency
        </button>
        <span class="step-info-text">Step 4 of 12 • Incident Management</span>
        <button class="btn btn-step-black" id="incidents-next-btn">
          Next Section: Rescue Operations →
        </button>
      </div>

    </div>
  `;
}

export function attachIncidentsEvents(navigateTo, store) {
  document.getElementById('incidents-new-sos')?.addEventListener('click', () => navigateTo('report'));

  // Search & Filters
  const searchInput = document.getElementById('incidents-search');
  const statusFilter = document.getElementById('incidents-status-filter');
  const severityFilter = document.getElementById('incidents-severity-filter');

  const filterTable = () => {
    const sTerm = searchInput?.value.toLowerCase() || '';
    const stVal = statusFilter?.value || 'ALL';
    const svVal = severityFilter?.value || 'ALL';

    const rows = document.querySelectorAll('#incidents-table tbody tr.inc-row');
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const matchesSearch = text.includes(sTerm);
      const matchesStatus = stVal === 'ALL' || text.includes(stVal.toLowerCase());
      const matchesSeverity = svVal === 'ALL' || text.includes(svVal.toLowerCase());

      row.style.display = (matchesSearch && matchesStatus && matchesSeverity) ? '' : 'none';
    });
  };

  searchInput?.addEventListener('input', filterTable);
  statusFilter?.addEventListener('change', filterTable);
  severityFilter?.addEventListener('change', filterTable);

  // Action Handlers
  document.querySelectorAll('.btn-verify-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      store.verifyIncident(id);
    });
  });

  document.querySelectorAll('.btn-dispatch-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      navigateTo('rescue');
    });
  });

  document.querySelectorAll('.btn-status-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const nextStatus = prompt(`Enter new status for #${id}:\n(Reported, Verified, Assigned, In Progress, Resolved, Closed)`, 'In Progress');
      if (nextStatus) {
        store.updateIncidentStatus(id, nextStatus.trim());
      }
    });
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('incidents-back-btn')?.addEventListener('click', () => navigateTo('report'));
  document.getElementById('incidents-next-btn')?.addEventListener('click', () => navigateTo('rescue'));
}
