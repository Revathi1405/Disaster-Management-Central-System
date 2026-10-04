/* ==========================================================================
   RescueLink State Store & Mutation Handler
   ========================================================================== */

import { INITIAL_STATE } from './mockData.js';

class StateStore {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Set Current Active View
  setView(viewName) {
    this.state.currentView = viewName;
    this.notify();
  }

  // Set Current Role Simulation
  setRole(role) {
    this.state.currentRole = role;
    this.addAuditLog(`Role Switched`, `Switched active UI simulation mode to ${role.toUpperCase()}`);
    this.notify();
  }

  // Add New Citizen Incident Report (FR3)
  addIncident(reportData) {
    const newId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    const newIncident = {
      id: newId,
      category: reportData.category || 'General Emergency',
      severity: reportData.severity || 'High',
      status: 'Reported',
      location: reportData.location || 'Captured GPS Location',
      lat: reportData.lat || 19.0760 + (Math.random() - 0.5) * 0.05,
      lng: reportData.lng || 72.8777 + (Math.random() - 0.5) * 0.05,
      description: reportData.description || 'Emergency assistance requested by citizen.',
      victimsCount: parseInt(reportData.victimsCount) || 1,
      reporterName: reportData.reporterName || 'Citizen (Mobile App)',
      reporterPhone: reportData.reporterPhone || '+91 99000 00000',
      timestamp: timestamp,
      assignedTeamId: null,
      mediaUrl: reportData.mediaUrl || null
    };

    this.state.incidents.unshift(newIncident);
    this.addAuditLog('Citizen SOS Incident Reported', `Incident #${newId} reported at ${newIncident.location}`);
    this.notify();
    return newIncident;
  }

  // Verify Reported Incident (FR4)
  verifyIncident(incidentId) {
    const incident = this.state.incidents.find(i => i.id === incidentId);
    if (incident) {
      incident.status = 'Verified';
      this.addAuditLog('Incident Verified', `Incident #${incidentId} verified by Control Room`);
      this.notify();
    }
  }

  // Assign & Dispatch Rescue Team (FR7, FR8)
  dispatchTeam(incidentId, teamId) {
    const incident = this.state.incidents.find(i => i.id === incidentId);
    const team = this.state.rescueTeams.find(t => t.id === teamId);

    if (incident && team) {
      incident.status = 'Assigned';
      incident.assignedTeamId = teamId;
      team.status = 'En Route';
      team.assignedIncidentId = incidentId;

      this.addAuditLog('Rescue Team Dispatched', `Dispatched ${team.name} to Incident #${incidentId}`);
      
      // Auto Notification
      this.addNotification({
        title: `DISPATCH ALERT: ${team.name}`,
        message: `Proceed immediately to ${incident.location} for ${incident.category} rescue.`,
        channel: 'Push + SMS',
        warningLevel: 'High',
        recipient: team.name
      });

      this.notify();
    }
  }

  // Update Incident Status (FR5)
  updateIncidentStatus(incidentId, newStatus) {
    const incident = this.state.incidents.find(i => i.id === incidentId);
    if (incident) {
      incident.status = newStatus;
      if (newStatus === 'In Progress' && incident.assignedTeamId) {
        const team = this.state.rescueTeams.find(t => t.id === incident.assignedTeamId);
        if (team) team.status = 'On Scene';
      } else if (newStatus === 'Resolved' || newStatus === 'Closed') {
        if (incident.assignedTeamId) {
          const team = this.state.rescueTeams.find(t => t.id === incident.assignedTeamId);
          if (team) {
            team.status = 'Idle';
            team.assignedIncidentId = null;
          }
        }
      }
      this.addAuditLog('Incident Lifecycle Update', `Incident #${incidentId} status updated to ${newStatus.toUpperCase()}`);
      this.notify();
    }
  }

  // Add Broadcast Emergency Notification (FR14)
  addNotification(notifData) {
    const newNotif = {
      id: `NOTIF-${Math.floor(100 + Math.random() * 900)}`,
      title: notifData.title,
      message: notifData.message,
      channel: notifData.channel || 'SMS + Push',
      warningLevel: notifData.warningLevel || 'Warning',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      recipient: notifData.recipient || 'All Stakeholders'
    };

    this.state.notifications.unshift(newNotif);
    this.addAuditLog('Emergency Broadcast Sent', `Alert "${newNotif.title}" sent to ${newNotif.recipient}`);
    this.notify();
    return newNotif;
  }

  // Add Volunteer Registration (FR12)
  addVolunteer(volData) {
    const newVol = {
      id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
      name: volData.name,
      phone: volData.phone,
      skills: volData.skills || ['General Assistance'],
      zone: volData.zone || 'District HQ',
      status: 'Available',
      currentTask: null
    };

    this.state.volunteers.unshift(newVol);
    this.addAuditLog('Volunteer Registered', `New volunteer ${newVol.name} registered with skills: ${newVol.skills.join(', ')}`);
    this.notify();
  }

  // Assign Volunteer Task (FR12)
  assignVolunteerTask(volId, taskName) {
    const vol = this.state.volunteers.find(v => v.id === volId);
    if (vol) {
      vol.status = 'Assigned';
      vol.currentTask = taskName;
      this.addAuditLog('Volunteer Assigned Task', `Assigned task "${taskName}" to volunteer ${vol.name}`);
      this.notify();
    }
  }

  // Audit Logging (FR17)
  addAuditLog(action, details) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    this.state.auditLogs.unshift({
      logId: `LOG-${Math.floor(9000 + Math.random() * 1000)}`,
      user: `Active User (${this.state.currentRole.toUpperCase()})`,
      action: action,
      details: details,
      timestamp: timestamp
    });
  }
}

export const store = new StateStore();
