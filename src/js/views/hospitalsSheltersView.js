/* ==========================================================================
   RescueLink Hospitals & Relief Shelters Dual-Tab View
   Medical capacity tracking (Beds/ICU/Ambulances) and Relief Camp supply logistics.
   ========================================================================== */

export function renderHospitalsSheltersView(state) {
  const hospitals = state.hospitals || [];
  const shelters = state.shelters || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR10 & FR11 Module</span>
        <h1 style="font-size: 2rem; color: #0f172a;">Hospitals & Relief Shelters Hub</h1>
        <p style="color: #64748b;">Real-time medical bed availability, ambulance status, and relief camp supply management.</p>
      </div>

      <!-- Tab Navigation Header -->
      <div class="tab-container">
        <button class="tab-btn active" id="tab-btn-hospitals">🏥 Hospital Medical Capacity (FR10)</button>
        <button class="tab-btn" id="tab-btn-shelters">⛺ Relief Camp & Supply Logistics (FR11)</button>
      </div>

      <!-- TAB 1: HOSPITALS SECTION -->
      <div id="tab-content-hospitals" class="tab-content">
        <div class="grid-3" style="margin-bottom: 2rem;">
          ${hospitals.map(hosp => `
            <div class="card card-hover">
              <div class="card-header">
                <span class="badge badge-info">Hospital ID: ${hosp.id}</span>
                <span class="badge badge-dark">📞 ${hosp.contact}</span>
              </div>
              <h3 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 0.35rem;">${hosp.name}</h3>
              <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">📍 ${hosp.location}</p>

              <!-- Capacity Badges -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.85rem; color: #475569;">Available General Beds:</span>
                  <strong style="color: #16a34a; font-size: 1rem;">${hosp.availableBeds} / ${hosp.totalBeds}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.85rem; color: #475569;">ICU Beds Available:</span>
                  <strong style="color: ${hosp.icuBedsAvailable < 5 ? '#dc2626' : '#16a34a'}; font-size: 1rem;">${hosp.icuBedsAvailable} ICU Beds</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.85rem; color: #475569;">Ambulance Fleet:</span>
                  <strong style="color: #0284c7; font-size: 0.85rem;">${hosp.ambulancesAvailable} / ${hosp.ambulancesTotal} Available</strong>
                </div>
              </div>

              <button class="btn btn-outline btn-sm" style="width: 100%;" onclick="alert('Casualty routing alert sent to ${hosp.name}')">
                🚑 Route Inbound Emergency Casualty
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- TAB 2: RELIEF SHELTERS SECTION -->
      <div id="tab-content-shelters" class="tab-content" style="display: none;">
        <div class="grid-2" style="margin-bottom: 2rem;">
          ${shelters.map(shl => {
            const occPercent = Math.round((shl.currentOccupancy / shl.maxCapacity) * 100);
            const occBadge = occPercent > 85 ? 'badge-critical' : occPercent > 60 ? 'badge-high' : 'badge-low';

            return `
              <div class="card card-hover">
                <div class="card-header">
                  <span class="badge badge-dark">Shelter ID: ${shl.id}</span>
                  <span class="badge ${occBadge}">${occPercent}% Occupied</span>
                </div>
                <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 0.35rem;">${shl.name}</h3>
                <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">📍 ${shl.location}</p>

                <!-- Occupancy Bar -->
                <div style="font-size: 0.85rem; font-weight: bold; color: #334155; margin-bottom: 0.35rem;">
                  Current Occupancy: ${shl.currentOccupancy} / ${shl.maxCapacity} Evacuees
                </div>
                <div class="occupancy-meter">
                  <div class="occupancy-fill ${occPercent > 85 ? 'critical' : occPercent > 60 ? 'high' : ''}" style="width: ${occPercent}%;"></div>
                </div>

                <!-- Relief Supply Stock Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem;">
                  <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 0.6rem; border-radius: 6px; font-size: 0.8rem;">
                    🍱 <strong>Food Stock:</strong> ${shl.foodStockDays} Days Remaining
                  </div>
                  <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 0.6rem; border-radius: 6px; font-size: 0.8rem;">
                    💧 <strong>Clean Water:</strong> ${shl.waterLiters} Liters
                  </div>
                </div>

                <div style="margin-top: 1rem; border-top: 1px solid #f1f5f9; padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.8rem; color: #64748b;">Manager: <strong>${shl.managerName}</strong> (${shl.contact})</span>
                  <button class="btn btn-sm btn-sos" onclick="alert('Supply Replenishment Alert sent to Logistics Control!')">
                    🆘 Request Supplies
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="hospitals-back-btn">
          ← Back: Emergency Resources
        </button>
        <span class="step-info-text">Step 6 of 10 • Hospitals & Shelters</span>
        <button class="btn btn-step-black" id="hospitals-next-btn">
          Next Section: Volunteer Mobilization →
        </button>
      </div>

    </div>
  `;
}

export function attachHospitalsSheltersEvents(navigateTo, store) {
  const btnHosp = document.getElementById('tab-btn-hospitals');
  const btnShelter = document.getElementById('tab-btn-shelters');
  const contentHosp = document.getElementById('tab-content-hospitals');
  const contentShelter = document.getElementById('tab-content-shelters');

  btnHosp?.addEventListener('click', () => {
    btnHosp.classList.add('active');
    btnShelter.classList.remove('active');
    if (contentHosp) contentHosp.style.display = 'block';
    if (contentShelter) contentShelter.style.display = 'none';
  });

  btnShelter?.addEventListener('click', () => {
    btnShelter.classList.add('active');
    btnHosp.classList.remove('active');
    if (contentShelter) contentShelter.style.display = 'block';
    if (contentHosp) contentHosp.style.display = 'none';
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('hospitals-back-btn')?.addEventListener('click', () => navigateTo('resources'));
  document.getElementById('hospitals-next-btn')?.addEventListener('click', () => navigateTo('volunteers'));
}
