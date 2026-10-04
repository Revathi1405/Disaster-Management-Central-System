/* ==========================================================================
   RescueLink About System & Architecture Overview
   6-Layer Architectural Diagram, SRS Traceability Matrix (FR1-FR18), and Tech Stack.
   ========================================================================== */

export function renderAboutView(state) {
  const traceabilityMatrix = state.traceabilityMatrix || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-dark" style="margin-bottom: 0.4rem;">System Specification & SRS</span>
        <h1 style="font-size: 2rem; color: #0f172a;">About RescueLink Architecture</h1>
        <p style="color: #64748b;">Software engineering design principles, 6-tier architectural hierarchy, and requirements matrix.</p>
      </div>

      <!-- 6-Layer Architecture Stack Diagram -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="card-header">
          <h2 style="font-size: 1.35rem; color: #0f172a;">6-Layer Architectural Hierarchy Design</h2>
          <span class="badge badge-info">Multi-Tier Stack</span>
        </div>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1.25rem;">
          Designed according to the project specification: Presentation ➔ Application ➔ Business ➔ Data Access ➔ Database ➔ External Services.
        </p>

        <div class="architecture-layers-stack">
          
          <div class="arch-layer-card layer-1">
            <div>
              <div style="font-size: 0.75rem; color: #3b82f6; font-weight: bold; text-transform: uppercase;">Tier 1</div>
              <div class="layer-title">Presentation Layer (Web & Mobile UI)</div>
              <div class="layer-desc">Responsive Single Page Application, Leaflet GIS command map, Role Switcher views, SOS reporting wizard.</div>
            </div>
            <span class="badge badge-info">HTML5 • JS • CSS3</span>
          </div>

          <div class="arch-layer-card layer-2">
            <div>
              <div style="font-size: 0.75rem; color: #6366f1; font-weight: bold; text-transform: uppercase;">Tier 2</div>
              <div class="layer-title">Application Layer (API Gateway & Controllers)</div>
              <div class="layer-desc">Main Control Module, Request Router, Authentication Filters, Rate Limiting, Controller Endpoints.</div>
            </div>
            <span class="badge badge-dark">REST Endpoints</span>
          </div>

          <div class="arch-layer-card layer-3">
            <div>
              <div style="font-size: 0.75rem; color: #8b5cf6; font-weight: bold; text-transform: uppercase;">Tier 3</div>
              <div class="layer-title">Business Logic Layer (Core Domain Services)</div>
              <div class="layer-desc">Incident Lifecycle Manager, Proximity Resource Matcher, Alert Router, Hospital Capacity Tracker.</div>
            </div>
            <span class="badge badge-high">Business Engine</span>
          </div>

          <div class="arch-layer-card layer-4">
            <div>
              <div style="font-size: 0.75rem; color: #ec4899; font-weight: bold; text-transform: uppercase;">Tier 4</div>
              <div class="layer-title">Data Access Layer (DAL & Repositories)</div>
              <div class="layer-desc">Incident Repositories, GIS Spatial Query Handlers, User Credentials DAO, Audit Logger.</div>
            </div>
            <span class="badge badge-dark">ORM & DAOs</span>
          </div>

          <div class="arch-layer-card layer-5">
            <div>
              <div style="font-size: 0.75rem; color: #f43f5e; font-weight: bold; text-transform: uppercase;">Tier 5</div>
              <div class="layer-title">Database Layer (Cloud Persistence)</div>
              <div class="layer-desc">PostgreSQL relational DB with PostGIS spatial extension, Redis state cache, automated backups.</div>
            </div>
            <span class="badge badge-low">Cloud Database</span>
          </div>

          <div class="arch-layer-card layer-6">
            <div>
              <div style="font-size: 0.75rem; color: #10b981; font-weight: bold; text-transform: uppercase;">Tier 6</div>
              <div class="layer-title">External Services Layer (Third-Party Integrations)</div>
              <div class="layer-desc">OpenStreetMap GIS, OpenWeather API, Twilio SMS Gateway, Firebase Push Notifications.</div>
            </div>
            <span class="badge badge-info">External APIs</span>
          </div>

        </div>
      </div>

      <!-- SRS Traceability Matrix Table -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="card-header">
          <h2 style="font-size: 1.35rem; color: #0f172a;">SRS Requirements Traceability Matrix (FR1 - FR18)</h2>
          <span class="badge badge-dark">Software Specification</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Functional Requirement Name</th>
                <th>Addressed Business Problem</th>
                <th>Non-Functional Requirement</th>
              </tr>
            </thead>
            <tbody>
              ${traceabilityMatrix.map(item => `
                <tr>
                  <td><strong style="color: #0f172a; font-family: monospace;">${item.reqId}</strong></td>
                  <td><strong style="color: #0f172a;">${item.name}</strong></td>
                  <td>${item.problem}</td>
                  <td><span class="badge badge-info">${item.nfr}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="about-back-btn">
          ← Back: Disaster Monitoring
        </button>
        <span class="step-info-text">Step 10 of 10 • System Specification Completed</span>
        <button class="btn btn-step-black" id="about-next-btn">
          Return to Homepage Dashboard ↺
        </button>
      </div>

    </div>
  `;
}

export function attachAboutEvents(navigateTo, store) {
  // Black Back & Next Navigation Buttons
  document.getElementById('about-back-btn')?.addEventListener('click', () => navigateTo('monitoring'));
  document.getElementById('about-next-btn')?.addEventListener('click', () => navigateTo('home'));
}
