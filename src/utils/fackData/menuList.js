export const menuList = [
  // Dashboard menu - fixed duplicate dropdownMenu property
  {
    id: 1,
    name: "dashboard",
    path: "#",
    icon: "feather-home",
    roles: ["superadmin", "admin"],
    portals: [
      "cms",
      "eduroam",
      "dns",
      "user-management",
      "web-hosting",
      "email-hosting",
      "ticketing",
    ],
    dropdownMenu: [
      {
        id: 11,
        name: "CMS",
        path: "/cms/dashboard",
      },
      {
        id: 12,
        name: "Eduroam",
        path: "/eduroam/dashboard",
      },
      {
        id: 13,
        name: "DNS",
        path: "/dns/dashboard",
      },
      {
        id: 14,
        name: "Web Hosting",
        path: "/web-hosting/dashboard",
      },
    ],
  },

  // Reports menu - fixed ID conflicts (was using 21-24 which conflicted with dashboard)
  {
    id: 2,
    name: "reports",
    path: "#",
    icon: "feather-cast",
    portals: ["cms"],
    dropdownMenu: [
      {
        id: 21,
        name: "Sales Report",
        path: "/reports/sales",
      },
      {
        id: 22,
        name: "Leads Report",
        path: "/reports/leads",
      },
      {
        id: 23,
        name: "Project Report",
        path: "/reports/project",
      },
      {
        id: 24,
        name: "Timesheets Report",
        path: "/reports/timesheets",
      },
    ],
  },

  // About Us menu - fixed structure and IDs
  {
    id: 3,
    name: "ABOUT US",
    path: "#",
    icon: "feather-power",
    portals: ["cms"],
    dropdownMenu: [
      {
        id: 31,
        name: "About us",
        path: "#",
        subdropdownMenu: [
          { id: 311, name: "History", path: "/about/history" },
          { id: 312, name: "Vision", path: "/about/vision" },
          { id: 313, name: "Mission", path: "/about/mission" },
          { id: 314, name: "Corporate Highlights", path: "/about/highlights" },
          { id: 315, name: "Centers", path: "/about/centers" },
          { id: 316, name: "Act & Rules", path: "/about/act-rules" },
        ],
      },
      {
        id: 32,
        name: "Who is Who",
        path: "#",
        subdropdownMenu: [
          { id: 321, name: "Minister", path: "/who-is-who/minister" },
          {
            id: 322,
            name: "Minister of State",
            path: "/who-is-who/minister-state",
          },
          { id: 323, name: "Secretary", path: "/who-is-who/secretary" },
          {
            id: 324,
            name: "Director General",
            path: "/who-is-who/director-general",
            superdropdownMenu: [
              {
                id: 3241,
                name: "Profile",
                path: "/who-is-who/director-general/profile",
              },
              {
                id: 3242,
                name: "Gallery",
                path: "/who-is-who/director-general/gallery",
              },
              {
                id: 3243,
                name: "Talks",
                path: "/who-is-who/director-general/talks",
              },
            ],
          },
          {
            id: 325,
            name: "Group Coordinator",
            path: "/who-is-who/group-coordinator",
          },
          { id: 326, name: "HoDs", path: "/who-is-who/hods" },
          { id: 327, name: "Directory", path: "/who-is-who/directory" },
        ],
      },
      {
        id: 33,
        name: "Governing Council",
        path: "/about/governing-council",
      },
      {
        id: 34,
        name: "Executive Council",
        path: "/about/executive-council",
      },
      {
        id: 35,
        name: "Divisions",
        path: "/about/divisions",
      },
      {
        id: 36,
        name: "Directory",
        path: "/about/directory",
      },
      {
        id: 37,
        name: "Organization Chart",
        path: "/about/organization-chart",
      },
    ],
  },

  // Payment menu - fixed structure
  {
    id: 4,
    name: "payment",
    path: "#",
    icon: "feather-dollar-sign",
    portals: ["cms", "ticketing", "web-hosting", "email-hosting"],
    dropdownMenu: [
      { id: 41, name: "Payments", path: "/payment/list" },
      { id: 42, name: "Invoice View", path: "/payment/view" },
      { id: 43, name: "Invoice Create", path: "/payment/create" },
    ],
  },

  // Settings menu - simplified
  {
    id: 5,
    name: "settings",
    path: "/settings",
    icon: "feather-settings",
    roles: ["superadmin"],
    portals: [
      "cms",
      "web-hosting",
      "dns",
      "user-management",
      "email-hosting",
      "ticketing",
    ],
  },

  // Eduroam menus - fixed IDs and structure
  {
    id: 6,
    name: "institutions",
    path: "#",
    icon: "feather-building",
    roles: ["superadmin"],
    portals: ["eduroam"],
    dropdownMenu: [
      { id: 61, name: "All Institutions", path: "/institutions/list" },
      { id: 62, name: "Add Institution", path: "/institutions/add" },
    ],
  },
  {
    id: 7,
    name: "institution admins",
    path: "#",
    icon: "feather-user-check",
    roles: ["superadmin"],
    portals: ["eduroam"],
    dropdownMenu: [
      { id: 71, name: "All Admins", path: "/admins/list" },
      { id: 72, name: "Add Admin", path: "/admins/add" },
    ],
  },

  // User Management - fixed IDs and structure
  {
    id: 8,
    name: "user management",
    path: "#",
    icon: "feather-users",
    roles: ["superadmin", "admin"],
    portals: ["user-management"],
    dropdownMenu: [
      { id: 81, name: "All Users", path: "/users/list" },
      { id: 82, name: "Add User", path: "/users/add" },
      {
        id: 83,
        name: "User Roles",
        path: "/users/roles",
        roles: ["superadmin"],
      },
      {
        id: 84,
        name: "Permissions",
        path: "/users/permissions",
        roles: ["superadmin"],
      },
      { id: 85, name: "Deactivated Users", path: "/users/deactivated" },
      { id: 86, name: "Profile Settings", path: "/users/profile-settings" },
    ],
  },

  // DNS Management - fixed structure
  {
    id: 10,
    name: "dns management",
    path: "#",
    icon: "feather-globe",
    roles: ["superadmin", "admin"],
    portals: ["dns"],
    dropdownMenu: [
      { id: 101, name: "DNS Records", path: "/dns/records" },
      { id: 102, name: "Add DNS Record", path: "/dns/add" },
      {
        id: 103,
        name: "Zone Management",
        path: "/dns/zones",
        roles: ["superadmin"],
      },
      {
        id: 104,
        name: "DNS Settings",
        path: "/dns/settings",
        roles: ["superadmin"],
      },
    ],
  },
];
