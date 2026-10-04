/* ==========================================================================
   RescueLink Report Emergency View (SOS Wizard)
   Multi-step emergency reporting wizard with auto GPS capture simulation,
   media preview, tracking ID generation, and Black Back/Next navigation.
   ========================================================================== */

export function renderReportView(state) {
  return `
    <div class="page-container">
      <div style="max-width: 800px; margin: 0 auto;">
        
        <!-- Header Title -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <span class="badge badge-critical" style="margin-bottom: 0.5rem;">Citizen SOS Portal</span>
          <h1 style="font-size: 2.25rem; color: #0f172a;">Report Disaster Emergency</h1>
          <p style="color: #64748b;">Direct high-priority dispatch link to Government Disaster Control Room.</p>
        </div>

        <!-- Wizard Progress Bar -->
        <div class="wizard-progress-bar">
          <div class="wizard-step-indicator active" id="ind-step-1">
            <div class="step-circle">1</div>
            <span class="step-label">Location & Type</span>
          </div>
          <div class="wizard-step-indicator" id="ind-step-2">
            <div class="step-circle">2</div>
            <span class="step-label">Details & Severity</span>
          </div>
          <div class="wizard-step-indicator" id="ind-step-3">
            <div class="step-circle">3</div>
            <span class="step-label">Contact & Submit</span>
          </div>
        </div>

        <!-- SOS Form Card Container -->
        <div class="card" style="box-shadow: var(--shadow-lg);">
          
          <!-- STEP 1: Emergency Type & GPS Location -->
          <div id="wizard-step-1" class="wizard-step-content">
            <h3 style="font-size: 1.25rem; color: #0f172a; margin-bottom: 1rem;">Step 1: Select Disaster Type & Location</h3>
            
            <div class="form-group">
              <label class="form-label">Select Emergency Category <span style="color: #dc2626;">*</span></label>
              <div class="category-selector-grid">
                <div class="cat-btn selected" data-category="Flood">
                  <div class="cat-icon">🌊</div>
                  <div class="cat-title">Flood / Rising Water</div>
                </div>
                <div class="cat-btn" data-category="Fire">
                  <div class="cat-icon">🔥</div>
                  <div class="cat-title">Fire / Explosion</div>
                </div>
                <div class="cat-btn" data-category="Building Collapse">
                  <div class="cat-icon">🏢</div>
                  <div class="cat-title">Building Collapse</div>
                </div>
                <div class="cat-btn" data-category="Landslide">
                  <div class="cat-icon">⛰️</div>
                  <div class="cat-title">Landslide / Mudslide</div>
                </div>
                <div class="cat-btn" data-category="Medical Emergency">
                  <div class="cat-icon">🚑</div>
                  <div class="cat-title">Medical Crisis</div>
                </div>
                <div class="cat-btn" data-category="Earthquake">
                  <div class="cat-icon">🌋</div>
                  <div class="cat-title">Earthquake / Tremor</div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Incident Location & GPS Coordinates <span style="color: #dc2626;">*</span></label>
              <div style="display: flex; gap: 0.75rem; margin-bottom: 0.5rem;">
                <input type="text" id="report-location-input" class="form-control" value="Sector 4, Riverside Colony, Mumbai (Lat: 19.0760, Lng: 72.8777)" placeholder="Enter street address or landmark">
                <button type="button" class="btn btn-primary" id="btn-auto-gps">
                  📍 Auto-Capture GPS
                </button>
              </div>
              <small style="color: #64748b; font-size: 0.8rem;">
                ℹ️ Simulated GPS precision: $\pm 5\text{ meters}$. Coordinates will be routed to nearest rescue unit.
              </small>
            </div>
          </div>

          <!-- STEP 2: Details & Severity -->
          <div id="wizard-step-2" class="wizard-step-content" style="display: none;">
            <h3 style="font-size: 1.25rem; color: #0f172a; margin-bottom: 1rem;">Step 2: Emergency Details & Impact Severity</h3>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="report-severity">Severity Level <span style="color: #dc2626;">*</span></label>
                <select id="report-severity" class="form-select">
                  <option value="Critical">🔴 CRITICAL (Immediate Life Risk / Trapped Victims)</option>
                  <option value="High" selected>🟠 HIGH (Severe Injury / Fast Escalation)</option>
                  <option value="Medium">🟡 MEDIUM (Property Damage / Moderate Risk)</option>
                  <option value="Low">🟢 LOW (Minor Assistance Needed)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="report-victims">Estimated Victims Affected <span style="color: #dc2626;">*</span></label>
                <input type="number" id="report-victims" class="form-control" value="5" min="1" max="500">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="report-description">Detailed Description & Hazards</label>
              <textarea id="report-description" class="form-textarea" placeholder="Describe trapped people, water depth, blocked roads, or hazardous materials..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Attach Photo / Ground Media (Optional)</label>
              <input type="file" id="report-photo" class="form-control" accept="image/*">
              <div id="photo-preview-box" style="margin-top: 0.5rem; display: none;">
                <img id="photo-img-preview" src="" alt="Ground photo" style="max-height: 140px; border-radius: 8px; border: 1px solid #cbd5e1;">
              </div>
            </div>
          </div>

          <!-- STEP 3: Contact & Submit -->
          <div id="wizard-step-3" class="wizard-step-content" style="display: none;">
            <h3 style="font-size: 1.25rem; color: #0f172a; margin-bottom: 1rem;">Step 3: Reporter Information & Verification</h3>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="report-name">Your Full Name</label>
                <input type="text" id="report-name" class="form-control" value="Rajesh Kumar" placeholder="Reporter name">
              </div>

              <div class="form-group">
                <label class="form-label" for="report-phone">Mobile Phone Number <span style="color: #dc2626;">*</span></label>
                <input type="tel" id="report-phone" class="form-control" value="+91 98765 43210" placeholder="+91 XXXXX XXXXX">
              </div>
            </div>

            <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
              <strong style="color: #c2410c; font-size: 0.9rem;">⚠️ Declaration:</strong>
              <p style="font-size: 0.825rem; color: #9a3412; margin-top: 0.2rem;">
                Submitting false emergency distress reports is punishable under the National Disaster Management Act. All reports are verified by Control Room officers before dispatch.
              </p>
            </div>

            <button type="button" class="btn btn-sos btn-lg" id="btn-submit-sos" style="width: 100%;">
              🚨 TRANSMIT EMERGENCY SOS REPORT NOW
            </button>
          </div>

          <!-- SUCCESS CONFIRMATION SCREEN -->
          <div id="wizard-step-success" class="wizard-step-content" style="display: none; text-align: center; padding: 2rem 1rem;">
            <div style="width: 70px; height: 70px; background-color: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem auto;">
              ✓
            </div>
            <h2 style="color: #0f172a; font-size: 1.8rem; margin-bottom: 0.5rem;">SOS Emergency Report Transmitted!</h2>
            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem;">
              Your incident report has been registered in the RescueLink Central Database and routed to the District Control Room.
            </p>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; max-width: 450px; margin: 0 auto 2rem auto;">
              <div style="font-size: 0.8rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Unique Incident Tracking ID</div>
              <div id="success-tracking-id" style="font-size: 2rem; font-weight: 800; color: #dc2626; letter-spacing: 1px; margin: 0.2rem 0;">
                #INC-8095
              </div>
              <div class="badge badge-high" id="success-status-badge">Status: Reported ➔ Awaiting Verification</div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
              <button class="btn btn-primary" id="btn-view-incidents-list">
                📋 View Incident Queue
              </button>
              <button class="btn btn-outline" id="btn-new-report">
                ➕ Submit Another Report
              </button>
            </div>
          </div>

        </div>

        <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
        <div class="step-navigation-bar" id="report-step-nav">
          <button class="btn btn-step-black" id="report-back-btn">
            ← Black Back Button
          </button>
          <span class="step-info-text" id="report-step-text">Step 1 of 3</span>
          <button class="btn btn-step-black" id="report-next-btn">
            Black Next Button →
          </button>
        </div>

      </div>
    </div>
  `;
}

export function attachReportEvents(navigateTo, store) {
  let currentStep = 1;
  let selectedCategory = 'Flood';

  // Category Selector Cards
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-btn').forEach(c => c.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      selectedCategory = target.dataset.category;
    });
  });

  // Auto GPS Button Simulation
  document.getElementById('btn-auto-gps')?.addEventListener('click', () => {
    const locInput = document.getElementById('report-location-input');
    if (locInput) {
      locInput.value = 'Auto-Captured GPS: Lat 19.0760, Lng 72.8777 (Sector 4 Riverside)';
      locInput.style.borderColor = '#16a34a';
    }
  });

  // Photo Upload Preview
  document.getElementById('report-photo')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const previewBox = document.getElementById('photo-preview-box');
        const img = document.getElementById('photo-img-preview');
        if (previewBox && img) {
          img.src = evt.target.result;
          previewBox.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  });

  // Step Wizard UI Switcher Function
  const updateWizardUI = () => {
    document.querySelectorAll('.wizard-step-content').forEach(s => s.style.display = 'none');
    const activeStepEl = document.getElementById(`wizard-step-${currentStep}`);
    if (activeStepEl) activeStepEl.style.display = 'block';

    // Indicators
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById(`ind-step-${i}`);
      if (ind) {
        if (i === currentStep) {
          ind.className = 'wizard-step-indicator active';
        } else if (i < currentStep) {
          ind.className = 'wizard-step-indicator completed';
        } else {
          ind.className = 'wizard-step-indicator';
        }
      }
    }

    // Step Nav Button Text & State
    const backBtn = document.getElementById('report-back-btn');
    const nextBtn = document.getElementById('report-next-btn');
    const stepText = document.getElementById('report-step-text');

    if (stepText) stepText.textContent = `Step ${currentStep} of 3`;

    if (backBtn) {
      backBtn.disabled = currentStep === 1;
    }

    if (nextBtn) {
      if (currentStep === 3) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = `Next Step (${currentStep + 1}) →`;
      }
    }
  };

  // Black Back & Next Button Listeners
  document.getElementById('report-back-btn')?.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizardUI();
    }
  });

  document.getElementById('report-next-btn')?.addEventListener('click', () => {
    if (currentStep < 3) {
      currentStep++;
      updateWizardUI();
    }
  });

  // Final SOS Submission Action
  document.getElementById('btn-submit-sos')?.addEventListener('click', () => {
    const locationVal = document.getElementById('report-location-input')?.value;
    const severityVal = document.getElementById('report-severity')?.value;
    const victimsVal = document.getElementById('report-victims')?.value;
    const descVal = document.getElementById('report-description')?.value;
    const nameVal = document.getElementById('report-name')?.value;
    const phoneVal = document.getElementById('report-phone')?.value;

    const newReport = store.addIncident({
      category: selectedCategory,
      severity: severityVal,
      location: locationVal,
      victimsCount: victimsVal,
      description: descVal,
      reporterName: nameVal,
      reporterPhone: phoneVal
    });

    // Hide Wizard Steps & Show Success Screen
    document.querySelectorAll('.wizard-step-content').forEach(s => s.style.display = 'none');
    const successScreen = document.getElementById('wizard-step-success');
    if (successScreen) successScreen.style.display = 'block';

    const trackingIdEl = document.getElementById('success-tracking-id');
    if (trackingIdEl) trackingIdEl.textContent = `#${newReport.id}`;

    const navBar = document.getElementById('report-step-nav');
    if (navBar) navBar.style.display = 'none';
  });

  document.getElementById('btn-view-incidents-list')?.addEventListener('click', () => navigateTo('incidents'));
  document.getElementById('btn-new-report')?.addEventListener('click', () => {
    currentStep = 1;
    const navBar = document.getElementById('report-step-nav');
    if (navBar) navBar.style.display = 'flex';
    updateWizardUI();
  });
}
