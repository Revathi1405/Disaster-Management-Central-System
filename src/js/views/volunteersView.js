/* ==========================================================================
   RescueLink Volunteer & NGO Mobilization View
   Skill matrix registration, active community task assignment board, and task claiming.
   ========================================================================== */

export function renderVolunteersView(state) {
  const volunteers = state.volunteers || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR12 Module</span>
        <h1 style="font-size: 2rem; color: #0f172a;">Volunteer & NGO Mobilization Portal</h1>
        <p style="color: #64748b;">Skill-based volunteer registration and targeted task coordination.</p>
      </div>

      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Left: Volunteer Skill Matrix Registration Form -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Register as Emergency Volunteer</h3>
            <span class="badge badge-low">Community Action</span>
          </div>

          <form id="volunteer-reg-form">
            <div class="form-group">
              <label class="form-label" for="vol-name">Full Name <span style="color: #dc2626;">*</span></label>
              <input type="text" id="vol-name" class="form-control" placeholder="Enter your full name" required>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="vol-phone">Mobile Phone <span style="color: #dc2626;">*</span></label>
                <input type="tel" id="vol-phone" class="form-control" placeholder="+91 XXXXX XXXXX" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="vol-zone">Preferred Service Zone</label>
                <input type="text" id="vol-zone" class="form-control" placeholder="Sector / City District" value="District HQ">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Select Skills & Qualifications (FR12 Skill Matrix)</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.35rem;">
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="First Aid / EMT" checked> 🩺 First Aid / EMT
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="Search & Rescue"> 🏊 Search & Rescue
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="Logistics & Supply" checked> 📦 Logistics & Supply
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="Boat Operations"> 🚤 Boat Driver
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="Psychological Counseling"> 🧠 Counseling
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" class="vol-skill-chk" value="Language Translation"> 🗣️ Translator
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">
              🤝 Register & Join Active Relief Pool
            </button>
          </form>
        </div>

        <!-- Right: Active Community Relief Task Board -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Active Relief Tasks Queue</h3>
            <span class="badge badge-high">High Priority</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <strong style="color: #0f172a;">Food Packet Distribution</strong>
                <span class="badge badge-medium">Sector 4 Shelter</span>
              </div>
              <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
                Distribute 800 meal packets and clean drinking water to evacuated families.
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: #0284c7;">Req Skill: Logistics & Supply</span>
                <button class="btn btn-sm btn-outline btn-claim-task" data-task="Food Distribution Sector 4">
                  Accept Task
                </button>
              </div>
            </div>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <strong style="color: #0f172a;">First Aid Desk Support</strong>
                <span class="badge badge-critical">Shelter B</span>
              </div>
              <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
                Assist paramedics in treating minor cuts, dressing wounds, and logging patient vitals.
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: #0284c7;">Req Skill: First Aid / EMT</span>
                <button class="btn btn-sm btn-outline btn-claim-task" data-task="First Aid Desk Support">
                  Accept Task
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Volunteer Roster Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Registered Volunteer Roster</h3>
          <span class="badge badge-dark">Live Roster (${volunteers.length})</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Name & Contact</th>
                <th>Skill Capabilities</th>
                <th>Assigned Zone</th>
                <th>Deployment Status</th>
                <th>Current Assigned Task</th>
              </tr>
            </thead>
            <tbody>
              ${volunteers.map(vol => `
                <tr>
                  <td><strong style="color: #0f172a; font-family: monospace;">#${vol.id}</strong></td>
                  <td>
                    <strong style="color: #0f172a;">${vol.name}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;">${vol.phone}</div>
                  </td>
                  <td>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                      ${vol.skills.map(s => `<span class="badge badge-info" style="font-size: 0.65rem;">${s}</span>`).join('')}
                    </div>
                  </td>
                  <td>${vol.zone}</td>
                  <td><span class="badge ${vol.status === 'Assigned' ? 'badge-high' : 'badge-low'}">${vol.status}</span></td>
                  <td>${vol.currentTask ? `<strong style="color: #0f172a; font-size: 0.85rem;">${vol.currentTask}</strong>` : `<span style="color: #94a3b8;">Unassigned</span>`}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="volunteers-back-btn">
          ← Back: Hospitals & Shelters
        </button>
        <span class="step-info-text">Step 7 of 10 • Volunteers</span>
        <button class="btn btn-step-black" id="volunteers-next-btn">
          Next Section: Notifications & Alerts →
        </button>
      </div>

    </div>
  `;
}

export function attachVolunteersEvents(navigateTo, store) {
  // Form submission
  document.getElementById('volunteer-reg-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('vol-name')?.value;
    const phoneVal = document.getElementById('vol-phone')?.value;
    const zoneVal = document.getElementById('vol-zone')?.value;

    const selectedSkills = [];
    document.querySelectorAll('.vol-skill-chk:checked').forEach(chk => {
      selectedSkills.push(chk.value);
    });

    if (nameVal && phoneVal) {
      store.addVolunteer({
        name: nameVal,
        phone: phoneVal,
        zone: zoneVal,
        skills: selectedSkills
      });
      alert(`Volunteer ${nameVal} successfully registered in RescueLink Pool!`);
    }
  });

  // Task Claim Handler
  document.querySelectorAll('.btn-claim-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const taskName = e.currentTarget.dataset.task;
      const volId = prompt('Enter your Volunteer ID (e.g. VOL-103) to claim this task:', 'VOL-103');
      if (volId) {
        store.assignVolunteerTask(volId.trim(), taskName);
      }
    });
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('volunteers-back-btn')?.addEventListener('click', () => navigateTo('hospitals'));
  document.getElementById('volunteers-next-btn')?.addEventListener('click', () => navigateTo('notifications'));
}
