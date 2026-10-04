/* ==========================================================================
   RescueLink Emergency Resources Logistics View
   Inventory metrics, equipment allocation controls, and resource replenishment requests.
   ========================================================================== */

export function renderResourcesView(state) {
  const resources = state.resources || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR6 Module</span>
          <h1 style="font-size: 2rem; color: #0f172a;">Emergency Resource Management</h1>
          <p style="color: #64748b;">Centralized tracking of vehicles, heavy machinery, generators, and trauma kits.</p>
        </div>
        <div>
          <button class="btn btn-primary" id="btn-request-resource">
            📦 Submit Resource Allocation Request
          </button>
        </div>
      </div>

      <!-- Resource Categories Summary Grid -->
      <div class="grid-3" style="margin-bottom: 2.5rem;">
        ${resources.map(res => {
          const availPercent = Math.round((res.available / res.total) * 100);
          const badgeClass = availPercent > 50 ? 'badge-low' : availPercent > 20 ? 'badge-high' : 'badge-critical';

          return `
            <div class="card card-hover">
              <div class="card-header">
                <span class="badge badge-dark">${res.category}</span>
                <span class="badge ${badgeClass}">${availPercent}% Available</span>
              </div>
              <h3 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 0.5rem;">${res.name}</h3>
              
              <!-- Progress Occupancy Meter -->
              <div class="occupancy-meter">
                <div class="occupancy-fill ${availPercent < 30 ? 'critical' : availPercent < 60 ? 'high' : ''}" style="width: ${availPercent}%;"></div>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #475569; margin-top: 0.75rem;">
                <span>Available Units: <strong>${res.available}</strong></span>
                <span>Total Fleet: <strong>${res.total}</strong></span>
              </div>
              
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem; border-top: 1px solid #f1f5f9; padding-top: 0.5rem;">
                📍 Central Depot: ${res.location}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Resource Dispatch Log Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Live Resource Allocation Ledger</h3>
          <span class="badge badge-info">Real-Time Inventory</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Resource Asset ID</th>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Total Stock</th>
                <th>Available</th>
                <th>Deployed</th>
                <th>Depot Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${resources.map(res => `
                <tr>
                  <td><strong style="color: #0f172a; font-family: monospace;">#${res.id}</strong></td>
                  <td><strong style="color: #0f172a;">${res.name}</strong></td>
                  <td><span class="badge badge-dark">${res.category}</span></td>
                  <td><strong>${res.total}</strong></td>
                  <td><span style="color: #16a34a; font-weight: bold;">${res.available}</span></td>
                  <td><span style="color: #ea580c; font-weight: bold;">${res.total - res.available}</span></td>
                  <td>${res.location}</td>
                  <td>
                    <button class="btn btn-sm btn-outline btn-dispatch-res" data-id="${res.id}">
                      ⚙️ Allocate Unit
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="resources-back-btn">
          ← Back: Rescue Operations
        </button>
        <span class="step-info-text">Step 5 of 10 • Resource Management</span>
        <button class="btn btn-step-black" id="resources-next-btn">
          Next Section: Hospitals & Shelters →
        </button>
      </div>

    </div>
  `;
}

export function attachResourcesEvents(navigateTo, store) {
  document.getElementById('btn-request-resource')?.addEventListener('click', () => {
    alert('Resource Allocation Modal: Select equipment category and team assignment destination.');
  });

  document.querySelectorAll('.btn-dispatch-res').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const resId = e.currentTarget.dataset.id;
      alert(`Allocated 1 unit of Asset #${resId} to active rescue team.`);
    });
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('resources-back-btn')?.addEventListener('click', () => navigateTo('rescue'));
  document.getElementById('resources-next-btn')?.addEventListener('click', () => navigateTo('hospitals'));
}
