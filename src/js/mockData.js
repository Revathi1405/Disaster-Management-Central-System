/* ==========================================================================
   RescueLink Seed Data Store (Mock System Data)
   Authoritative seed dataset reflecting attached SRS and Structure Charts.
   ========================================================================== */

export const INITIAL_STATE = {
  // Current Active Role Simulation
  currentRole: 'control-room',

  // Active View Page
  currentView: 'home',

  // Incident Reports Dataset (FR3, FR4, FR5, FR9)
  incidents: [
    {
      id: 'INC-8091',
      category: 'Flood',
      severity: 'Critical',
      status: 'In Progress',
      location: 'Sector 4, Riverside Colony',
      lat: 19.0760,
      lng: 72.8777,
      description: 'Flash flood water level rose 6 feet. 45 residents trapped on rooftops.',
      victimsCount: 45,
      reporterName: 'Rajesh Kumar',
      reporterPhone: '+91 98765 43210',
      timestamp: '2026-10-04 17:45:10',
      assignedTeamId: 'TEAM-101',
      mediaUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'INC-8092',
      category: 'Building Collapse',
      severity: 'Critical',
      status: 'Assigned',
      location: 'Commercial Complex, Central Ave',
      lat: 19.0880,
      lng: 72.8890,
      description: '3-story old commercial structure collapsed after heavy downpour. Debris clearing required.',
      victimsCount: 12,
      reporterName: 'Ananya Sharma',
      reporterPhone: '+91 98123 45678',
      timestamp: '2026-10-04 18:10:22',
      assignedTeamId: 'TEAM-102',
      mediaUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'INC-8093',
      category: 'Landslide',
      severity: 'High',
      status: 'Verified',
      location: 'NH-102 Mountain Bypass Rd',
      lat: 19.0950,
      lng: 72.8650,
      description: 'Mudslide blocked main evacuation highway. 3 vehicles stuck.',
      victimsCount: 8,
      reporterName: 'Subinspector V. Nair',
      reporterPhone: '+91 94455 66778',
      timestamp: '2026-10-04 18:22:05',
      assignedTeamId: null,
      mediaUrl: null
    },
    {
      id: 'INC-8094',
      category: 'Fire',
      severity: 'High',
      status: 'Reported',
      location: 'Industrial Zone Depot 12',
      lat: 19.0620,
      lng: 72.8910,
      description: 'Short circuit triggered electrical transformer fire near chemical warehouse.',
      victimsCount: 4,
      reporterName: 'Security Desk Depot 12',
      reporterPhone: '+91 97788 99001',
      timestamp: '2026-10-04 18:31:00',
      assignedTeamId: null,
      mediaUrl: null
    },
    {
      id: 'INC-8090',
      category: 'Medical Emergency',
      severity: 'Medium',
      status: 'Resolved',
      location: 'Relief Camp B, Public School',
      lat: 19.0510,
      lng: 72.8420,
      description: 'Acute gastroenteritis outbreak among evacuees requiring immediate IV fluid supply.',
      victimsCount: 6,
      reporterName: 'Dr. Priya Desai',
      reporterPhone: '+91 93344 55667',
      timestamp: '2026-10-04 16:15:00',
      assignedTeamId: 'TEAM-104',
      mediaUrl: null
    }
  ],

  // Rescue Teams Dataset (FR6, FR7, FR8)
  rescueTeams: [
    {
      id: 'TEAM-101',
      name: 'NDRF Battalion 1 - Flood Relief',
      agency: 'NDRF',
      membersCount: 18,
      status: 'On Scene',
      currentLocation: 'Sector 4, Riverside Colony',
      lat: 19.0765,
      lng: 72.8780,
      equipment: ['2x Inflatable Motor Rafts', 'Life Jackets', 'Satellite Comm'],
      assignedIncidentId: 'INC-8091'
    },
    {
      id: 'TEAM-102',
      name: 'Fire & Rescue Squad 12',
      agency: 'Fire Department',
      membersCount: 12,
      status: 'En Route',
      currentLocation: 'En Route to Central Ave',
      lat: 19.0830,
      lng: 72.8850,
      equipment: ['Heavy Hydraulic Cutters', '2x Earthmovers', 'Thermal Camera'],
      assignedIncidentId: 'INC-8092'
    },
    {
      id: 'TEAM-103',
      name: 'SDRF Rapid Response Unit 3',
      agency: 'SDRF',
      membersCount: 15,
      status: 'Idle',
      currentLocation: 'District Command Base',
      lat: 19.0700,
      lng: 72.8600,
      equipment: ['High-Capacity De-watering Pump', 'Mobile Generator', 'First Aid Kits'],
      assignedIncidentId: null
    },
    {
      id: 'TEAM-104',
      name: 'EMT Medical Unit 5',
      agency: 'Medical Corps',
      membersCount: 6,
      status: 'Idle',
      currentLocation: 'City General Hospital Base',
      lat: 19.0500,
      lng: 72.8400,
      equipment: ['2x ALS Ambulances', 'Oxygen Tanks', 'Emergency Medicines'],
      assignedIncidentId: null
    }
  ],

  // Emergency Resources Inventory (FR6, FR7)
  resources: [
    { id: 'RES-01', name: 'Amphibious Rescue Motor Boats', category: 'Vehicles & Boats', total: 14, available: 6, location: 'Central Logistics Yard' },
    { id: 'RES-02', name: 'Heavy Hydraulic Excavators', category: 'Heavy Machinery', total: 8, available: 3, location: 'North Depot' },
    { id: 'RES-03', name: 'High-Output De-watering Pumps', category: 'Power & Pumps', total: 25, available: 18, location: 'Disaster Warehouse 2' },
    { id: 'RES-04', name: 'Mobile Diesel Generators (50 kVA)', category: 'Power & Pumps', total: 12, available: 5, location: 'District Command Base' },
    { id: 'RES-05', name: 'Advanced Trauma Trauma Kits', category: 'Medical Kits', total: 150, available: 95, location: 'City Medical Store' },
    { id: 'RES-06', name: 'Emergency Satellite Radios', category: 'Communication', total: 40, available: 22, location: 'Comm Headquarters' }
  ],

  // Hospitals Capacity Tracker (FR10)
  hospitals: [
    {
      id: 'HOSP-01',
      name: 'City Apex Memorial Hospital',
      location: 'Central District, M.G. Road',
      totalBeds: 450,
      availableBeds: 62,
      icuBedsAvailable: 8,
      ambulancesTotal: 10,
      ambulancesAvailable: 3,
      contact: '+91 22 2400 1100',
      lat: 19.0600,
      lng: 72.8500
    },
    {
      id: 'HOSP-02',
      name: 'Metropolitan Trauma & General Hospital',
      location: 'East Wing, Sector 8',
      totalBeds: 300,
      availableBeds: 28,
      icuBedsAvailable: 2,
      ambulancesTotal: 6,
      ambulancesAvailable: 1,
      contact: '+91 22 2511 2233',
      lat: 19.0800,
      lng: 72.8900
    },
    {
      id: 'HOSP-03',
      name: 'St. Jude Emergency Medical Center',
      location: 'South Coastal Road',
      totalBeds: 180,
      availableBeds: 45,
      icuBedsAvailable: 11,
      ambulancesTotal: 4,
      ambulancesAvailable: 2,
      contact: '+91 22 2288 4455',
      lat: 19.0400,
      lng: 72.8300
    }
  ],

  // Relief Shelters Capacity Tracker (FR11)
  shelters: [
    {
      id: 'SHL-01',
      name: 'Community Center Relief Camp A',
      location: 'High School Grounds, Sector 2',
      maxCapacity: 600,
      currentOccupancy: 420,
      foodStockDays: 4,
      waterLiters: 12000,
      medicalSuppliesStatus: 'Adequate',
      managerName: 'Suresh Patil',
      contact: '+91 98222 11000',
      lat: 19.0710,
      lng: 72.8650
    },
    {
      id: 'SHL-02',
      name: 'Indoor Sports Complex Shelter B',
      location: 'Stadium Road, North Ward',
      maxCapacity: 1200,
      currentOccupancy: 890,
      foodStockDays: 2,
      waterLiters: 8500,
      medicalSuppliesStatus: 'Low Stock - Requested',
      managerName: 'Meera Deshmukh',
      contact: '+91 98333 22111',
      lat: 19.0920,
      lng: 72.8750
    }
  ],

  // Volunteers Dataset (FR12)
  volunteers: [
    { id: 'VOL-101', name: 'Vikram Mehta', phone: '+91 98980 11223', skills: ['First Aid / EMT', 'Logistics & Supply'], zone: 'Sector 4', status: 'Assigned', currentTask: 'First Aid distribution at Shelter A' },
    { id: 'VOL-102', name: 'Sneha Kulkarni', phone: '+91 97654 33221', skills: ['Search & Rescue', 'Boat Operations'], zone: 'Riverside Area', status: 'Assigned', currentTask: 'Assisting NDRF Team 1' },
    { id: 'VOL-103', name: 'Rohan Gupta', phone: '+91 91234 56789', skills: ['Psychological Counseling', 'Language Translation'], zone: 'North Ward', status: 'Available', currentTask: null },
    { id: 'VOL-104', name: 'Pooja Verma', phone: '+91 99887 76655', skills: ['Logistics & Supply'], zone: 'Central District', status: 'Available', currentTask: null }
  ],

  // Emergency Notifications History (FR14)
  notifications: [
    { id: 'NOTIF-301', title: 'FLASH FLOOD EMERGENCY WARNING', message: 'Water levels rising rapidly in Riverside Colony. Evacuate immediately to Relief Camp A.', channel: 'SMS + Push', warningLevel: 'Critical', timestamp: '2026-10-04 17:50:00', recipient: 'All Citizens in Sector 4' },
    { id: 'NOTIF-302', title: 'DISPATCH ALERT: NDRF Unit 1', message: 'Proceed to Sector 4 Riverside Colony for 45 rooftop extractions.', channel: 'Push Alert', warningLevel: 'High', timestamp: '2026-10-04 17:52:15', recipient: 'NDRF Battalion 1' },
    { id: 'NOTIF-303', title: 'HOSPITAL BED CAPACITY ADVISORY', message: 'Metropolitan Hospital General Beds at 90% capacity. Divert non-critical patients to City Apex.', channel: 'Email + Push', warningLevel: 'Warning', timestamp: '2026-10-04 18:05:00', recipient: 'Ambulance Units & Responders' }
  ],

  // System Audit Logs (FR17)
  auditLogs: [
    { logId: 'LOG-9001', user: 'System Auto-Engine', action: 'Incident Captured & Geo-tagged', details: 'Incident #INC-8091 recorded at (19.0760, 72.8777)', timestamp: '2026-10-04 17:45:10' },
    { logId: 'LOG-9002', user: 'Control Room Officer (Cmdr. Singh)', action: 'Incident Verified & Classified', details: 'Incident #INC-8091 status changed to VERIFIED. Priority set to CRITICAL.', timestamp: '2026-10-04 17:48:30' },
    { logId: 'LOG-9003', user: 'Control Room Officer (Cmdr. Singh)', action: 'Rescue Team Dispatched', details: 'Dispatched TEAM-101 to INC-8091. Proximity score: 98%.', timestamp: '2026-10-04 17:52:00' },
    { logId: 'LOG-9004', user: 'Hospital Admin (City Apex)', action: 'Updated Bed Availability', details: 'ICU available beds updated to 8.', timestamp: '2026-10-04 18:00:12' }
  ],

  // Traceability Matrix (SRS Requirements Mapping)
  traceabilityMatrix: [
    { reqId: 'FR1', name: 'User Authentication & RBAC', problem: 'Data security concerns & unauthorized system access', nfr: 'Security' },
    { reqId: 'FR2', name: 'Manage User Profiles & Roles', problem: 'Fragmented role handling across departments', nfr: 'Security, Maintainability' },
    { reqId: 'FR3', name: 'Incident Reporting (GPS, Media)', problem: 'Delayed incident reporting & lack of ground media', nfr: 'Performance (<5s)' },
    { reqId: 'FR4', name: 'Verify & Prioritize Incidents', problem: 'Fake emergency reports & chaotic prioritization', nfr: 'Reliability' },
    { reqId: 'FR5', name: 'Manage Incident Lifecycle', problem: 'Duplicate rescue operations & lost incident status', nfr: 'Reliability' },
    { reqId: 'FR6', name: 'Register Rescue Resources', problem: 'Poor resource allocation & missing inventory visibility', nfr: 'Performance' },
    { reqId: 'FR7', name: 'Auto-Recommend Rescue Resources', problem: 'No intelligent decision support & manual dispatch bottlenecks', nfr: 'Performance' },
    { reqId: 'FR8', name: 'Dispatch & Monitor Rescue Units', problem: 'Manual rescue assignment & slow response time', nfr: 'Performance' },
    { reqId: 'FR9', name: 'Live GIS Map Location Tracking', problem: 'Poor situational awareness & blind operational command', nfr: 'Availability' },
    { reqId: 'FR10', name: 'Hospital Bed & Ambulance Status', problem: 'Lack of real-time medical capacity tracking', nfr: 'Performance' },
    { reqId: 'FR11', name: 'Shelter Capacity & Supply Logistics', problem: 'Unmanaged relief camps & supply shortages', nfr: 'Reliability' },
    { reqId: 'FR12', name: 'Volunteer Registration & Tasking', problem: 'Uncoordinated community volunteer efforts', nfr: 'Usability' },
    { reqId: 'FR13', name: 'Secure Stakeholder Communication', problem: 'Fragmented communication channels (WhatsApp, phone calls)', nfr: 'Security' },
    { reqId: 'FR14', name: 'Emergency Broadcast Notifications', problem: 'No automated alert system for disaster warnings', nfr: 'Availability' },
    { reqId: 'FR15', name: 'Operational Command Dashboards', problem: 'Limited operational visibility for authorities', nfr: 'Usability' },
    { reqId: 'FR16', name: 'Disaster Analytics & Reports', problem: 'No data-driven post-disaster audit evaluation', nfr: 'Performance' },
    { reqId: 'FR17', name: 'Centralized Records & Audit Logs', problem: 'Lack of centralized data & missing accountability logs', nfr: 'Reliability' },
    { reqId: 'FR18', name: 'System Administration Controls', problem: 'Inability to scale or configure multi-region parameters', nfr: 'Scalability' }
  ]
};
