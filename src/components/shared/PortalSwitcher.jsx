import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect, useState } from "react";
import { FiLayout, FiX } from "react-icons/fi";

const portals = [
  {
    id: "cms",
    name: "CMS",
    logo: "📝",
    path: "/cms/dashboard",
  },
  {
    id: "eduroam",
    name: "Eduroam",
    logo: "🎓",
    path: "/eduroam/dashboard",
  },
  {
    id: "dns",
    name: "DNS",
    logo: "🌐",
    path: "/dns/dashboard",
  },
  {
    id: "web-hosting",
    name: "Web Hosting",
    logo: "🖥️",
    path: "/web-hosting/dashboard",
  },
  {
    id: "email-hosting",
    name: "Email Hosting",
    logo: "✉️",
    path: "/email-hosting/dashboard",
  },
  {
    id: "ticketing",
    name: "Ticketing",
    logo: "🎫",
    path: "/dashboard/ticketing",
  },
  {
    id: " ",
    name: "User Management",
    logo: "👥",
    path: "/dashboard/user-management",
  },
  {
    id: "admin-management",
    name: "Admin Management",
    logo: "👥",
    path: "/dashboard/admin-management",
  },
];

const PortalSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState(portals[0]);

  const handlePortalChange = (portal) => {
    setSelectedPortal(portal);
    localStorage.setItem("selectedPortal", JSON.stringify(portal));
    window.location.href = portal.path;
    setOpen(false); // Close the portal selector after selection
  };

  // Load saved portal from localStorage on page load
  const loadSavedPortal = () => {
    const savedPortal = localStorage.getItem("selectedPortal");
    if (savedPortal) {
      try {
        const portal = JSON.parse(savedPortal);
        // Find the portal in our list to ensure it exists
        const foundPortal = portals.find((p) => p.id === portal.id);
        if (foundPortal) {
          setSelectedPortal(foundPortal);
        }
      } catch (e) {
        console.error("Failed to parse saved portal", e);
      }
    }
  };

  useEffect(() => {
    loadSavedPortal();
  }, []);

  return (
    <div className={`portal-selector ${open ? "portal-selector-open" : ""}`}>
      <div className="selector-handle">
        <button
          className="selector-open-trigger"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          aria-label="Open portal selector"
        >
          <i className="lh-1">
            <FiLayout size={16} />
          </i>
        </button>
      </div>

      {open && (
        <div className="selector-sidebar-wrapper">
          <div className="selector-sidebar-header px-4 ht-80 border-bottom d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Choose Your Portal</h5>
            <button
              className="selector-close-trigger d-flex"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              aria-label="Close portal selector"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="selector-sidebar-body position-relative p-4">
            <PerfectScrollbar>
              <div className="position-relative px-3 pb-3 pt-4 mt-3 mb-0 border border-gray-2">
                <label
                  className="py-1 px-2 fs-8 fw-bold text-uppercase text-muted text-spacing-2 bg-white border border-gray-2 position-absolute rounded-2"
                  style={{ top: "-12px" }}
                >
                  Portal
                </label>

                <div className="row g-2">
                  {portals.map((portal) => (
                    <div
                      key={portal.id}
                      className="col-6 text-center"
                      onClick={() => handlePortalChange(portal)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handlePortalChange(portal)
                      }
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="portal"
                        id={`portal-${portal.id}`}
                        checked={selectedPortal.id === portal.id}
                        onChange={() => {}}
                      />
                      <label
                        className="py-2 fs-9 fw-bold text-dark text-uppercase text-spacing-1 border border-gray-2 w-100 h-100 c-pointer position-relative d-flex flex-column align-items-center justify-content-center"
                        htmlFor={`portal-${portal.id}`}
                      >
                        <span className="fs-4 mb-1">{portal.logo}</span>
                        <span>{portal.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalSwitcher;
