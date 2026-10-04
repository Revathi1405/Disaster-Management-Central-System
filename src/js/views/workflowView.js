/* ==========================================================================
   RescueLink Interactive Emergency-Response Workflow Simulator
   Demonstrates the 13-step lifecycle from Victim SOS report to final Stakeholder Notification.
   Statuses: Reported, Under Verification, Verified, High Priority, Team Assigned,
             Rescue In Progress, Resolved, Rejected.
   ========================================================================== */

export function renderWorkflowView(state) {
  return `
    <div class="page-container">
      
      <!-- Section Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-critical" style="margin-bottom: 0.4rem;">Interactive Project Demonstration Module</span>
          <h1 style="font-size: 2.25rem; color: #0f172a;">13-Step Emergency Response Workflow</h1>
          <p style="color: #64748b;">Step-by-step lifecycle simulator demonstrating how RescueLink coordinates citizen SOS requests to final resolution.</p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-sos btn-sm" id="wf-btn-reset">
            🔄 Reset Simulator
          </button>
          <button class="btn btn-outline btn-sm" id="wf-btn-reject" style="color: #dc2626; border-color: #fecaca;">
            ❌ Simulate Rejection Path
          </button>
          <button class="btn btn-primary" id="wf-btn-next-step">
            ▶ Advance Next Workflow Step
          </button>
          <button class="btn btn-dark btn-sm" id="wf-btn-autoplay" style="background-color: #1e293b; color: #ffffff;">
            ⚡ Auto-Play Workflow
          </button>
        </div>
      </div>

      <!-- Live Status Banner -->
      <div class="card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Current Operational Status</div>
            <div id="wf-current-status-badge" style="margin-top: 0.25rem;">
              <span class="badge badge-critical" style="font-size: 1.1rem; padding: 0.4rem 1rem;">STATUS: REPORTED</span>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.75rem; color: #94a3b8;">Active Incident ID</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #38bdf8; font-family: monospace;" id="wf-active-inc-id">#INC-8890</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.75rem; color: #94a3b8;">Workflow Progress</div>
            <div style="font-size: 1.25rem; font-weight: bold; color: #f1f5f9;" id="wf-progress-text">Step 1 of 13</div>
          </div>
        </div>
      </div>

      <!-- 13-Step Visual Tracker Bar -->
      <div class="card" style="margin-bottom: 2rem; padding: 1.25rem; overflow-x: auto;">
        <div style="font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 1rem; text-transform: uppercase;">
          13-Step Lifecycle Pipeline (Click any step to inspect)
        </div>

        <div style="display: flex; gap: 0.4rem; min-width: 900px; justify-content: space-between;" id="wf-stepper-bar">
          <!-- Step Indicators rendered dynamically -->
        </div>
      </div>

      <!-- Active Stage Detailed Card (Split View) -->
      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Left: Stage Description & Active Role Panel -->
        <div class="card" style="border-top: 5px solid #2563eb;" id="wf-stage-card">
          <div class="card-header">
            <span class="badge badge-info" id="wf-stage-role">Role: Victim / Citizen</span>
            <span class="badge badge-dark" id="wf-stage-number">Step 1 / 13</span>
          </div>

          <h2 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 0.75rem;" id="wf-stage-title">
            1. Victim / Citizen Distress Signal
          </h2>

          <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;" id="wf-stage-desc">
            Disaster victim trapped in flash flood opens RescueLink mobile app and taps the high-priority SOS emergency button.
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;" id="wf-stage-payload">
            <!-- Dynamic Payload Details -->
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-step-black" id="wf-btn-prev-stage">
              ← Previous Step
            </button>
            <button class="btn btn-step-black" id="wf-btn-next-stage">
              Next Step →
            </button>
          </div>
        </div>

        <!-- Right: Multi-Stakeholder Live Notification Log -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🔔 Stakeholder Real-Time Alerts Log</h3>
            <span class="badge badge-dark">Live Broadcast Stream</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 400px; overflow-y: auto;" id="wf-alerts-stream">
            <!-- Dynamic Stakeholder Alerts -->
          </div>
        </div>

      </div>

      <!-- All Statuses Legend Overview Card -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="card-header">
          <h3 class="card-title">System Status State Legend</h3>
          <span class="badge badge-dark">Required States Audit</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-critical">Reported</span>
            <p style="font-size: 0.75rem; color: #7f1d1d; margin-top: 0.35rem;">SOS distress signal captured from citizen mobile device.</p>
          </div>
          <div style="background-color: #fff7ed; border: 1px solid #fed7aa; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-high">Under Verification</span>
            <p style="font-size: 0.75rem; color: #7c2d12; margin-top: 0.35rem;">Control Room officer validating GPS and caller identity.</p>
          </div>
          <div style="background-color: #fffbeb; border: 1px solid #fef08a; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-medium">Verified</span>
            <p style="font-size: 0.75rem; color: #713f12; margin-top: 0.35rem;">Confirmed authentic emergency incident.</p>
          </div>
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-critical">High Priority</span>
            <p style="font-size: 0.75rem; color: #7f1d1d; margin-top: 0.35rem;">Life-threatening trapped victims priority classification.</p>
          </div>
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-info">Team Assigned</span>
            <p style="font-size: 0.75rem; color: #0c4a6e; margin-top: 0.35rem;">Nearest NDRF/Fire team dispatched with turn navigation.</p>
          </div>
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-info">Rescue In Progress</span>
            <p style="font-size: 0.75rem; color: #0c4a6e; margin-top: 0.35rem;">Responders active on-scene executing extraction.</p>
          </div>
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-low">Resolved</span>
            <p style="font-size: 0.75rem; color: #14532d; margin-top: 0.35rem;">Victims safely evacuated to hospital & shelter camps.</p>
          </div>
          <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 0.75rem; border-radius: 8px;">
            <span class="badge badge-dark">Rejected</span>
            <p style="font-size: 0.75rem; color: #334155; margin-top: 0.35rem;">Identified as duplicate or false alert by Control Room.</p>
          </div>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="wf-page-back-btn">
          ← Back: Home Dashboard
        </button>
        <span class="step-info-text">Emergency Workflow Simulator</span>
        <button class="btn btn-step-black" id="wf-page-next-btn">
          Next Section: Report Emergency SOS →
        </button>
      </div>

    </div>
  `;
}

// 13 Workflow Steps Specification Data
const WORKFLOW_STEPS_DATA = [
  {
    step: 1,
    title: "1. Victim / Citizen Distress Signal",
    role: "Victim / Citizen",
    status: "Reported",
    badgeClass: "badge-critical",
    desc: "Disaster victim trapped in flash flood opens RescueLink mobile app and taps the high-priority SOS emergency button.",
    payload: `
      <strong>Event Payload:</strong> SOS Trigger Initiated<br>
      📍 Device Location: Sector 4 Riverside Colony<br>
      📱 Device ID: MOB-9942 (GPS Enabled)<br>
      Status Flag: <span class="badge badge-critical">Reported</span>
    `,
    alert: { role: "Victim App", msg: "🚨 SOS Signal transmitted to RescueLink Disaster Control Room." }
  },
  {
    step: 2,
    title: "2. Report Emergency Category",
    role: "Victim / Citizen",
    status: "Reported",
    badgeClass: "badge-critical",
    desc: "Citizen selects emergency category 'Flood / Rising Water' and auto-captures precise GPS coordinates.",
    payload: `
      <strong>Category Selected:</strong> 🌊 Flood / Rising Water<br>
      📍 Coordinates: Lat 19.0760, Lng 72.8777<br>
      Accuracy: $\\pm 4.2\\text{ meters}$
    `,
    alert: { role: "System Router", msg: "Category set to FLOOD. Geo-fencing confirmed." }
  },
  {
    step: 3,
    title: "3. Enter Emergency Details and Location",
    role: "Victim / Citizen",
    status: "Reported",
    badgeClass: "badge-critical",
    desc: "Citizen specifies 15 residents trapped on rooftops with fast rising water level and attaches ground photo.",
    payload: `
      <strong>Impact Payload:</strong> 15 Trapped Residents<br>
      Hazard Note: Water level rose 6 feet. High current.<br>
      Media Attached: ground_photo_sector4.jpg
    `,
    alert: { role: "Database Layer", msg: "Incident report stored in cloud database repository." }
  },
  {
    step: 4,
    title: "4. System Receives & Registers Incident",
    role: "Application Layer Server",
    status: "Under Verification",
    badgeClass: "badge-high",
    desc: "System auto-generates Incident ID #INC-8890, tags severity heuristics, and queues for Control Room officer.",
    payload: `
      <strong>System Record Generated:</strong> #INC-8890<br>
      Lifecycle State: <span class="badge badge-high">Under Verification</span><br>
      Control Queue: District Command Center Deck 1
    `,
    alert: { role: "Control Room Deck", msg: "🚨 NEW SOS ALERT QUEUED: #INC-8890 (Sector 4)" }
  },
  {
    step: 5,
    title: "5. Control Room Verifies Incident",
    role: "Control Room Commander",
    status: "Verified",
    badgeClass: "badge-medium",
    desc: "Command officer reviews live ground media and cross-references nearby reports to confirm authenticity.",
    payload: `
      <strong>Verification Check:</strong> CONFIRMED AUTHENTIC<br>
      Verified By: Cmdr. R. Singh (District HQ)<br>
      Lifecycle State: <span class="badge badge-medium">Verified</span>
    `,
    alert: { role: "Command Log", msg: "Cmdr. Singh verified incident #INC-8890." }
  },
  {
    step: 6,
    title: "6. Prioritize Incident Urgency",
    role: "Decision Support Engine",
    status: "High Priority",
    badgeClass: "badge-critical",
    desc: "Severity evaluation algorithm elevates priority to High Priority due to immediate life-threat on rooftops.",
    payload: `
      <strong>Priority Ranking:</strong> <span class="badge badge-critical">High Priority</span><br>
      Risk Score: 96 / 100<br>
      Required Response Time: $< 10\\text{ minutes}$
    `,
    alert: { role: "Priority Engine", msg: "Priority elevated to HIGH PRIORITY." }
  },
  {
    step: 7,
    title: "7. Identify Available Rescue Team",
    role: "Proximity Match Engine",
    status: "High Priority",
    badgeClass: "badge-critical",
    desc: "System scans active field units and identifies NDRF Battalion 1 (with 2x motor rafts) 1.8 km away.",
    payload: `
      <strong>Recommended Unit:</strong> NDRF Battalion 1<br>
      Distance: $1.8\\text{ km}$ (ETA: 6 mins)<br>
      Equipment Match: 2x Motor Rafts, Satellite Comm
    `,
    alert: { role: "Match Engine", msg: "Recommended NDRF Battalion 1 (Proximity Score 98%)." }
  },
  {
    step: 8,
    title: "8. Assign Rescue Team",
    role: "Control Room Commander",
    status: "Team Assigned",
    badgeClass: "badge-info",
    desc: "Command officer confirms dispatch. Dispatch order transmitted to NDRF squad leader's mobile terminal.",
    payload: `
      <strong>Dispatch Order Sent:</strong> TEAM-101 ➔ #INC-8890<br>
      Lifecycle State: <span class="badge badge-info">Team Assigned</span><br>
      Turn Navigation: GPS Route Pushed
    `,
    alert: { role: "NDRF Team 1", msg: "🚒 DISPATCH ALERT RECEIVED: Proceed to Sector 4 Riverside." }
  },
  {
    step: 9,
    title: "9. Rescue Operation Begins",
    role: "Rescue Team Leader",
    status: "Rescue In Progress",
    badgeClass: "badge-info",
    desc: "NDRF Squad Leader acknowledges dispatch, turns on siren beacons, and begins high-speed en-route navigation.",
    payload: `
      <strong>Operation Status:</strong> <span class="badge badge-info">Rescue In Progress</span><br>
      Telemetry: En Route (Current speed $45\\text{ km/h}$)<br>
      ETA to Scene: 4 minutes
    `,
    alert: { role: "Field Responder", msg: "NDRF Squad 1 en route to scene with motorboats." }
  },
  {
    step: 10,
    title: "10. Monitor Rescue Progress",
    role: "GIS Command Monitor",
    status: "Rescue In Progress",
    badgeClass: "badge-info",
    desc: "Rescue team arrives on scene, deploys motorboats, and conducts rooftop extractions under live GIS map monitoring.",
    payload: `
      <strong>Live Extraction Metric:</strong> 15 / 15 Residents Rescued<br>
      On-Scene Status: All victims safely loaded onto motor rafts<br>
      Medical Vitals: 2 minor hypothermia cases
    `,
    alert: { role: "GIS Tracking", msg: "On-Scene Update: 15 residents extracted safely." }
  },
  {
    step: 11,
    title: "11. Update Incident Status",
    role: "Rescue Team Leader",
    status: "Resolved",
    badgeClass: "badge-low",
    desc: "Responders transport rescued citizens to Relief Camp A and Apex Hospital. Squad leader updates status to Resolved.",
    payload: `
      <strong>Incident Status Update:</strong> <span class="badge badge-low">Resolved</span><br>
      Evacuation Target: 13 to Shelter Camp A, 2 to Apex Hospital<br>
      Casualty Count: 0 Casualties
    `,
    alert: { role: "Hospital & Shelter", msg: "🏥 Hospital & Shelter notified of incoming evacuees." }
  },
  {
    step: 12,
    title: "12. Close Rescue Operation",
    role: "Control Room Commander",
    status: "Resolved",
    badgeClass: "badge-dark",
    desc: "Control room commander reviews completed mission logs, verifies zero missing persons, and closes incident #INC-8890.",
    payload: `
      <strong>Final Lifecycle State:</strong> CLOSED & AUDITED<br>
      Total Operation Duration: 24 minutes<br>
      Audit Log Reference: #LOG-9088
    `,
    alert: { role: "Audit Engine", msg: "Incident #INC-8890 closed and archived in Audit Log." }
  },
  {
    step: 13,
    title: "13. Notify Relevant Stakeholders",
    role: "Notification Router",
    status: "Resolved",
    badgeClass: "badge-low",
    desc: "Automated SMS, Push, and Email notifications dispatched to citizen families, district authorities, and news feeds.",
    payload: `
      <strong>Multi-Channel Alerts Sent:</strong><br>
      📱 Victim SMS: "Rescue Complete. Family safe at Shelter A."<br>
      🏥 Hospital Alert: "2 minor cases admitted."<br>
      📊 Executive Report: Generated PDF Audit Summary
    `,
    alert: { role: "Broadcaster", msg: "✅ All stakeholders notified. Workflow complete!" }
  }
];

export function attachWorkflowEvents(navigateTo, store) {
  let currentStepIndex = 0; // 0-indexed (0 to 12)
  let isRejectedPath = false;
  let autoPlayTimer = null;

  const alertsHistory = [];

  const updateWorkflowUI = () => {
    const data = WORKFLOW_STEPS_DATA[currentStepIndex];
    if (!data) return;

    // Status Badge Top
    const statusBadgeContainer = document.getElementById('wf-current-status-badge');
    if (statusBadgeContainer) {
      if (isRejectedPath) {
        statusBadgeContainer.innerHTML = `<span class="badge badge-dark" style="font-size: 1.1rem; padding: 0.4rem 1rem;">STATUS: REJECTED (FALSE/DUPLICATE ALERT)</span>`;
      } else {
        statusBadgeContainer.innerHTML = `<span class="badge ${data.badgeClass}" style="font-size: 1.1rem; padding: 0.4rem 1rem;">STATUS: ${data.status.toUpperCase()}</span>`;
      }
    }

    // Progress text
    const progressText = document.getElementById('wf-progress-text');
    if (progressText) progressText.textContent = `Step ${currentStepIndex + 1} of 13`;

    // Active Card Text
    const stageRole = document.getElementById('wf-stage-role');
    const stageNum = document.getElementById('wf-stage-number');
    const stageTitle = document.getElementById('wf-stage-title');
    const stageDesc = document.getElementById('wf-stage-desc');
    const stagePayload = document.getElementById('wf-stage-payload');

    if (stageRole) stageRole.textContent = `Role: ${data.role}`;
    if (stageNum) stageNum.textContent = `Step ${currentStepIndex + 1} / 13`;
    if (stageTitle) stageTitle.textContent = isRejectedPath && currentStepIndex >= 4 ? `${data.title} [REJECTED]` : data.title;
    if (stageDesc) {
      stageDesc.textContent = isRejectedPath && currentStepIndex >= 4 ? 
        `[REJECTED PATH DEMO] Control Room flagged report as duplicate/false alert. Incident status updated to REJECTED.` : data.desc;
    }
    if (stagePayload) stagePayload.innerHTML = data.payload;

    // Append Alert to Stream
    if (!alertsHistory.some(a => a.step === data.step)) {
      alertsHistory.unshift({ step: data.step, ...data.alert });
    }

    const alertsStream = document.getElementById('wf-alerts-stream');
    if (alertsStream) {
      alertsStream.innerHTML = alertsHistory.map(a => `
        <div style="background-color: #f8fafc; border-left: 3px solid #2563eb; padding: 0.6rem 0.85rem; border-radius: 6px; font-size: 0.825rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
            <strong style="color: #0f172a;">${a.role}</strong>
            <span style="font-size: 0.7rem; color: #64748b;">Step ${a.step}</span>
          </div>
          <div style="color: #334155;">${a.msg}</div>
        </div>
      `).join('');
    }

    // Render Stepper Bar Buttons
    const stepperBar = document.getElementById('wf-stepper-bar');
    if (stepperBar) {
      stepperBar.innerHTML = WORKFLOW_STEPS_DATA.map((item, idx) => {
        const isActive = idx === currentStepIndex;
        const isPast = idx < currentStepIndex;
        const bg = isActive ? '#2563eb' : isPast ? '#10b981' : '#cbd5e1';

        return `
          <button class="btn-step-item" data-idx="${idx}" style="background-color: ${bg}; color: #ffffff; border: none; border-radius: 6px; padding: 0.4rem 0.5rem; font-size: 0.7rem; font-weight: bold; cursor: pointer; flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;" title="${item.title}">
            ${idx + 1}. ${item.status}
          </button>
        `;
      }).join('');

      // Add click listeners to stepper bar
      document.querySelectorAll('.btn-step-item').forEach(b => {
        b.addEventListener('click', (e) => {
          currentStepIndex = parseInt(e.currentTarget.dataset.idx);
          updateWorkflowUI();
        });
      });
    }
  };

  // Button Action Controls
  document.getElementById('wf-btn-next-step')?.addEventListener('click', () => {
    if (currentStepIndex < 12) {
      currentStepIndex++;
      updateWorkflowUI();
    }
  });

  document.getElementById('wf-btn-next-stage')?.addEventListener('click', () => {
    if (currentStepIndex < 12) {
      currentStepIndex++;
      updateWorkflowUI();
    }
  });

  document.getElementById('wf-btn-prev-stage')?.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateWorkflowUI();
    }
  });

  document.getElementById('wf-btn-reset')?.addEventListener('click', () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    currentStepIndex = 0;
    isRejectedPath = false;
    alertsHistory.length = 0;
    updateWorkflowUI();
  });

  document.getElementById('wf-btn-reject')?.addEventListener('click', () => {
    isRejectedPath = true;
    currentStepIndex = 4; // Step 5: Verification Rejection
    updateWorkflowUI();
  });

  document.getElementById('wf-btn-autoplay')?.addEventListener('click', () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    currentStepIndex = 0;
    updateWorkflowUI();

    autoPlayTimer = setInterval(() => {
      if (currentStepIndex < 12) {
        currentStepIndex++;
        updateWorkflowUI();
      } else {
        clearInterval(autoPlayTimer);
      }
    }, 2000);
  });

  // Black Back & Next Navigation Buttons at bottom
  document.getElementById('wf-page-back-btn')?.addEventListener('click', () => navigateTo('home'));
  document.getElementById('wf-page-next-btn')?.addEventListener('click', () => navigateTo('report'));

  // Initial UI Render
  updateWorkflowUI();
}
