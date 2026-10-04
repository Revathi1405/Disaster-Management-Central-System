/* ==========================================================================
   RescueLink Notifications & Multi-Channel Broadcaster View
   Multi-channel emergency broadcaster (SMS, Push, Email) and chronological alert feed.
   ========================================================================== */

export function renderNotificationsView(state) {
  const notifications = state.notifications || [];

  return `
    <div class="page-container">
      
      <!-- Page Header -->
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-info" style="margin-bottom: 0.4rem;">FR14 & FR13 Module</span>
        <h1 style="font-size: 2rem; color: #0f172a;">Emergency Alert & Notification Console</h1>
        <p style="color: #64748b;">Multi-channel broadcast warnings across Push, SMS, and Email gateways.</p>
      </div>

      <div class="grid-2" style="margin-bottom: 2.5rem;">
        
        <!-- Left: Broadcaster Console (Authority View) -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">📡 Broadcast Emergency Warning</h3>
            <span class="badge badge-critical">Command Console</span>
          </div>

          <form id="broadcast-form">
            <div class="form-group">
              <label class="form-label" for="alert-title">Alert Title / Headline <span style="color: #dc2626;">*</span></label>
              <input type="text" id="alert-title" class="form-control" placeholder="e.g. FLASH FLOOD EVACUATION WARNING" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="alert-message">Emergency Warning Message <span style="color: #dc2626;">*</span></label>
              <textarea id="alert-message" class="form-textarea" placeholder="Detail danger zone boundaries, safe evacuation routes, or instructions..." required></textarea>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="alert-recipient">Target Recipient Group</label>
                <select id="alert-recipient" class="form-select">
                  <option value="All Citizens in Sector 4">All Citizens (Sector 4 Hazard Zone)</option>
                  <option value="All Field Rescue Teams">All Field Rescue Teams</option>
                  <option value="Hospital & EMT Commanders">Hospital & EMT Commanders</option>
                  <option value="All Registered Stakeholders">All Registered Stakeholders</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="alert-level">Warning Level</label>
                <select id="alert-level" class="form-select">
                  <option value="Critical" selected>🔴 Critical Emergency (Red Alert)</option>
                  <option value="High">🟠 High Warning (Amber Alert)</option>
                  <option value="Warning">🟡 General Advisory (Yellow)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Multi-Channel Distribution Gateways</label>
              <div style="display: flex; gap: 1rem; margin-top: 0.35rem;">
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" id="chk-sms" checked> 📱 SMS Gateway
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" id="chk-push" checked> 🔔 Browser Push Alert
                </label>
                <label style="font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                  <input type="checkbox" id="chk-email"> ✉️ Official Email
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-sos btn-lg" style="width: 100%;">
              🚨 TRANSMIT EMERGENCY BROADCAST ALERT
            </button>
          </form>
        </div>

        <!-- Right: Live Broadcast Feed -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Live Alert Feed History</h3>
            <span class="badge badge-dark">${notifications.length} Sent Alerts</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 500px; overflow-y: auto;">
            ${notifications.map(notif => {
              const badgeClass = notif.warningLevel === 'Critical' ? 'badge-critical' :
                                 notif.warningLevel === 'High' ? 'badge-high' : 'badge-amber';

              return `
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid ${notif.warningLevel === 'Critical' ? '#dc2626' : '#ea580c'}; border-radius: 8px; padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                    <strong style="color: #0f172a; font-size: 0.95rem;">${notif.title}</strong>
                    <span class="badge ${badgeClass}">${notif.warningLevel}</span>
                  </div>
                  <p style="font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem; line-height: 1.45;">
                    "${notif.message}"
                  </p>
                  <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 0.4rem;">
                    <span>Target: <strong>${notif.recipient}</strong></span>
                    <span>Channels: <strong>${notif.channel}</strong> • ${notif.timestamp}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

      <!-- BLACK BACK & NEXT STEP NAVIGATION BUTTONS -->
      <div class="step-navigation-bar">
        <button class="btn btn-step-black" id="notifications-back-btn">
          ← Back: Volunteers
        </button>
        <span class="step-info-text">Step 8 of 10 • Notifications & Alerts</span>
        <button class="btn btn-step-black" id="notifications-next-btn">
          Next Section: Disaster Monitoring →
        </button>
      </div>

    </div>
  `;
}

export function attachNotificationsEvents(navigateTo, store) {
  document.getElementById('broadcast-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleVal = document.getElementById('alert-title')?.value;
    const msgVal = document.getElementById('alert-message')?.value;
    const recipientVal = document.getElementById('alert-recipient')?.value;
    const levelVal = document.getElementById('alert-level')?.value;

    const channels = [];
    if (document.getElementById('chk-sms')?.checked) channels.push('SMS');
    if (document.getElementById('chk-push')?.checked) channels.push('Push');
    if (document.getElementById('chk-email')?.checked) channels.push('Email');

    if (titleVal && msgVal) {
      store.addNotification({
        title: titleVal,
        message: msgVal,
        recipient: recipientVal,
        warningLevel: levelVal,
        channel: channels.join(' + ') || 'SMS'
      });
      alert(`Emergency Alert "${titleVal}" broadcasted successfully!`);
    }
  });

  // Black Back & Next Navigation Buttons
  document.getElementById('notifications-back-btn')?.addEventListener('click', () => navigateTo('volunteers'));
  document.getElementById('notifications-next-btn')?.addEventListener('click', () => navigateTo('monitoring'));
}
