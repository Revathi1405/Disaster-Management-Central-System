/* ==========================================================================
   RescueLink Home / Dashboard View
   Full landing page with Problem Statement, Key Challenges, Features, Workflow,
   and Stakeholder Overview.
   ========================================================================== */

export function renderHomeView(state, navigateTo) {
  return `
    <div class="page-container">
      <!-- Hero Banner Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">⚡ Real-Time Emergency Coordination Engine</div>
          <h1 class="hero-title">Centralized Disaster Response & <span>Rescue Management</span></h1>
          <p class="hero-subtitle">
            RescueLink bridges the gap between disaster victims, emergency responders, hospitals, shelters, and government command centers through live GIS tracking, automated resource allocation, and multi-agency communication.
          </p>
          <div class="hero-actions">
            <button class="btn btn-sos btn-lg" id="home-sos-cta">
              🚨 Report Emergency SOS
            </button>
            <button class="btn btn-primary btn-lg" id="home-command-cta">
              📡 Launch GIS Command Monitor
            </button>
            <button class="btn btn-outline btn-lg" style="color:#ffffff; border-color:#475569;" id="home-about-cta">
              ℹ️ View System Architecture
            </button>
          </div>
        </div>
      </section>

      <!-- Problem Statement & Importance Section -->
      <section class="card" style="margin-bottom: 2.5rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
          <div>
            <div class="badge badge-critical" style="margin-bottom: 0.75rem;">Problem Statement</div>
            <h2 style="font-size: 1.75rem; color: #0f172a; margin-bottom: 1rem;">Fragmented Communication Kills Precious Seconds</h2>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
              Disaster operations involve multiple independent organizations currently relying on scattered phone calls, WhatsApp groups, paper records, and isolated departmental portals. This leads to severe delays, duplicate rescue dispatches, and zero operational visibility.
            </p>
            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 1rem; border-radius: 6px; font-size: 0.9rem; color: #991b1b;">
              <strong>Critical Impact:</strong> Extended response times, redundant rescue deployments, wasted hospital capacity, and preventable casualties during extreme disasters.
            </div>
          </div>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem;">
            <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 1rem;">Why Real-Time Coordination Matters</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem;">
              <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <span style="background-color: #dcfce7; color: #15803d; font-weight: bold; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">✓</span>
                <div>
                  <strong style="color: #0f172a;">Sub-5-Second Incident Processing:</strong> Direct geo-tagged distress routing from citizens to command officers.
                </div>
              </li>
              <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <span style="background-color: #dcfce7; color: #15803d; font-weight: bold; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">✓</span>
                <div>
                  <strong style="color: #0f172a;">Smart Proximity Matching:</strong> Automated AI recommendation of nearest rescue teams, boats, and ambulances.
                </div>
              </li>
              <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <span style="background-color: #dcfce7; color: #15803d; font-weight: bold; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">✓</span>
                <div>
                  <strong style="color: #0f172a;">Single Source of Operational Truth:</strong> Real-time map displaying incidents, responders, hospital beds, and shelter stock.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Key Challenges Highlight (6 Cards Requirement) -->
      <section style="margin-bottom: 3rem;">
        <div class="section-header">
          <h2>Major Operational Challenges Solved</h2>
          <p>RescueLink directly tackles the root causes identified in government disaster analysis.</p>
        </div>

        <div class="grid-3">
          <div class="challenge-card">
            <div class="challenge-icon">⏱️</div>
            <h4>1. Delayed Emergency Reporting</h4>
            <p>Traditional phone helplines freeze during high call volumes. RescueLink provides instant multi-channel SOS reporting with automatic GPS coordinates.</p>
          </div>

          <div class="challenge-card">
            <div class="challenge-icon">🗺️</div>
            <h4>2. Poor Situational Awareness</h4>
            <p>Commanders lack live spatial tracking of flooding boundaries and team locations. Our GIS dashboard plots real-time markers for full visual visibility.</p>
          </div>

          <div class="challenge-card">
            <div class="challenge-icon">📡</div>
            <h4>3. Fragmented Communication</h4>
            <p>Agencies operate in departmental silos. RescueLink integrates Police, NDRF, Fire, Hospitals, and NGOs into one unified broadcast channel.</p>
          </div>

          <div class="challenge-card">
            <div class="challenge-icon">📦</div>
            <h4>4. Inefficient Resource Allocation</h4>
            <p>Heavy machinery and motorboats are often sent to low-priority zones. Automated proximity rules dispatch optimal resources where needed most.</p>
          </div>

          <div class="challenge-card">
            <div class="challenge-icon">🚒</div>
            <h4>5. Difficulty Coordinating Rescue Teams</h4>
            <p>Multiple rescue units redundantly attend the same reported incident. Real-time lifecycle tracking ensures single team ownership per incident.</p>
          </div>

          <div class="challenge-card">
            <div class="challenge-icon">📊</div>
            <h4>6. Lack of Real-Time Information</h4>
            <p>Shelter shortages and ICU bed availability are updated via manual paper logs. Live dashboards sync medical and camp capacity in real time.</p>
          </div>
        </div>
      </section>

      <!-- Main Features Grid -->
      <section style="margin-bottom: 3rem;">
        <div class="section-header">
          <h2>Main System Modules & Capabilities</h2>
          <p>Built according to the 6 core functional modules and shared infrastructure services.</p>
        </div>

        <div class="grid-3">
          <div class="card card-hover" id="feat-incidents" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">📋</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Incident Management</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Capture distress reports, validate data, verify truthfulness, prioritize severity, and track complete lifecycle from Reported to Closed.
            </p>
          </div>

          <div class="card card-hover" id="feat-rescue" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">🚒</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Rescue Coordination</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Proximity-based auto-dispatch engine matching NDRF, Fire, and EMT squads with turn-by-turn navigation and live mission updates.
            </p>
          </div>

          <div class="card card-hover" id="feat-resources" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">📦</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Resource Management</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Real-time inventory tracking for motorboats, excavators, de-watering pumps, mobile generators, and emergency medical trauma kits.
            </p>
          </div>

          <div class="card card-hover" id="feat-hospitals" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">🏥</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Hospitals & Shelters</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Monitor available general/ICU beds, ambulance fleets, relief camp occupancy, food stock days, and clean water logistics.
            </p>
          </div>

          <div class="card card-hover" id="feat-volunteers" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">🤝</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Volunteer Mobilization</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Skill-matrix registration matching qualified volunteers (First Aid, Search & Rescue, Logistics) with active ground tasks.
            </p>
          </div>

          <div class="card card-hover" id="feat-notifications" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 1.8rem;">🔔</span>
              <span class="badge badge-info">Core Module</span>
            </div>
            <h3 class="card-title">Notification & Alerts</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
              Multi-channel emergency broadcaster distributing instant SMS warnings, browser push notifications, and email alerts.
            </p>
          </div>
        </div>
      </section>

      <!-- Stakeholder Overview Table/Cards -->
      <section class="card" style="margin-bottom: 3rem;">
        <div class="card-header">
          <h2 style="font-size: 1.5rem; color: #0f172a;">Stakeholder Ecosystem Overview</h2>
          <span class="badge badge-dark">7 User Roles Integrated</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Stakeholder Role</th>
                <th>Primary System Responsibility</th>
                <th>Key Operations</th>
                <th>System View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Disaster Victims / Citizens</strong></td>
                <td>Report emergency incidents & request rescue</td>
                <td>Submit GPS SOS, attach photos, view public shelters & emergency helplines</td>
                <td><span class="badge badge-low">Citizen Portal</span></td>
              </tr>
              <tr>
                <td><strong>Rescue Teams (NDRF/SDRF/Fire)</strong></td>
                <td>Execute ground rescue missions</td>
                <td>Accept dispatches, navigate routes, update operational status (En-Route ➔ On-Scene)</td>
                <td><span class="badge badge-info">Rescue Ops</span></td>
              </tr>
              <tr>
                <td><strong>Hospitals / Medical Corps</strong></td>
                <td>Manage medical emergency admissions</td>
                <td>Update ICU & General bed counters, dispatch ambulances, receive casualty alerts</td>
                <td><span class="badge badge-medium">Hospital Hub</span></td>
              </tr>
              <tr>
                <td><strong>Relief Shelters / Camp Admins</strong></td>
                <td>Host displaced victims & distribute supplies</td>
                <td>Log camp occupancy %, track food/water stock, submit supply replenishment requests</td>
                <td><span class="badge badge-high">Shelter Portal</span></td>
              </tr>
              <tr>
                <td><strong>Volunteers & NGOs</strong></td>
                <td>Support community relief & distribution</td>
                <td>Register skill capabilities, claim relief tasks, assist in food & first-aid camps</td>
                <td><span class="badge badge-info">Volunteer Hub</span></td>
              </tr>
              <tr>
                <td><strong>Control Room Officers</strong></td>
                <td>Command & verify disaster operations</td>
                <td>Verify incidents, authorize team dispatches, broadcast alerts, monitor GIS maps</td>
                <td><span class="badge badge-critical">Command Center</span></td>
              </tr>
              <tr>
                <td><strong>System Administrators</strong></td>
                <td>Platform security & system maintenance</td>
                <td>Manage user roles (RBAC), configure API integrations, inspect audit logs (FR17)</td>
                <td><span class="badge badge-dark">Admin Panel</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Emergency Response Workflow Diagram -->
      <section style="margin-bottom: 3rem;">
        <div class="section-header">
          <h2>End-to-End Emergency Response Workflow</h2>
          <p>Sequential processing pipeline from citizen report to post-disaster audit log.</p>
        </div>

        <div class="workflow-steps-container">
          <div class="workflow-step-card">
            <div class="step-num">1</div>
            <h4 style="margin-top: 0.5rem; margin-bottom: 0.35rem; color: #0f172a;">Report & Capture</h4>
            <p style="font-size: 0.85rem; color: #64748b;">Citizen submits SOS with automatic GPS tagging and incident category.</p>
          </div>

          <div class="workflow-step-card">
            <div class="step-num">2</div>
            <h4 style="margin-top: 0.5rem; margin-bottom: 0.35rem; color: #0f172a;">Verify & Prioritize</h4>
            <p style="font-size: 0.85rem; color: #64748b;">Control Room verifies report authenticity and sets priority (Critical/High).</p>
          </div>

          <div class="workflow-step-card">
            <div class="step-num">3</div>
            <h4 style="margin-top: 0.5rem; margin-bottom: 0.35rem; color: #0f172a;">Recommend & Dispatch</h4>
            <p style="font-size: 0.85rem; color: #64748b;">System auto-recommends closest rescue team; Commander dispatches unit.</p>
          </div>

          <div class="workflow-step-card">
            <div class="step-num">4</div>
            <h4 style="margin-top: 0.5rem; margin-bottom: 0.35rem; color: #0f172a;">Execute & Resolve</h4>
            <p style="font-size: 0.85rem; color: #64748b;">Responders rescue victims, route to hospitals/shelters, and log resolution.</p>
          </div>
        </div>

        <!-- Black Back & Next Navigation Buttons at bottom of Workflow Section -->
        <div class="step-navigation-bar">
          <button class="btn btn-step-black" id="home-back-step" disabled>
            ← Back (Overview)
          </button>
          <span class="step-info-text">Step 1 of 10 • System Navigation Overview</span>
          <button class="btn btn-step-black" id="home-next-step">
            Next Section: Report Emergency SOS →
          </button>
        </div>
      </section>
    </div>
  `;
}

export function attachHomeEvents(navigateTo, store) {
  document.getElementById('home-sos-cta')?.addEventListener('click', () => navigateTo('report'));
  document.getElementById('home-command-cta')?.addEventListener('click', () => navigateTo('monitoring'));
  document.getElementById('home-about-cta')?.addEventListener('click', () => navigateTo('about'));

  document.getElementById('feat-incidents')?.addEventListener('click', () => navigateTo('incidents'));
  document.getElementById('feat-rescue')?.addEventListener('click', () => navigateTo('rescue'));
  document.getElementById('feat-resources')?.addEventListener('click', () => navigateTo('resources'));
  document.getElementById('feat-hospitals')?.addEventListener('click', () => navigateTo('hospitals'));
  document.getElementById('feat-volunteers')?.addEventListener('click', () => navigateTo('volunteers'));
  document.getElementById('feat-notifications')?.addEventListener('click', () => navigateTo('notifications'));

  // Step Navigation Buttons (Black Buttons)
  document.getElementById('home-next-step')?.addEventListener('click', () => navigateTo('report'));
}
