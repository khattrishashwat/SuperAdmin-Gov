import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Menus from "./Menus";
import { NavigationContext } from "../../../contentApi/navigationProvider";
import { menuList } from "@/utils/fackData/menuList";

const NavigationMenu = () => {
  const { navigationOpen, setNavigationOpen } = useContext(NavigationContext);
  const pathName = useLocation().pathname;
  const [portal, setPortal] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    setNavigationOpen(false);
    const savedPortal = localStorage.getItem("selectedPortal");
    if (savedPortal) {
      const portalData = JSON.parse(savedPortal);
      setPortal(portalData);

      const filtered = menuList.filter((item) => {
        const isForPortal =
          item.portals && item.portals.includes(portalData.id);

        const isCommon = !item.portals || item.portals.length === 0;

        return isForPortal || isCommon;
      });

      setFilteredMenu(filtered);
    } else {
      setFilteredMenu(
        menuList.filter((item) => !item.portals || item.portals.length === 0)
      );
    }
  }, [pathName, setNavigationOpen]);

  const getLogo = () => {
    if (!portal) {
      return {
        full: "/images/logo-full.png",
        abbr: "/images/logo-abbr.png",
      };
    }

    switch (portal.id) {
      case "cms":
        return {
          full: "/images/logos/ernet.png",
          abbr: "/images/logos/ernet.png",
        };
      case "eduroam":
        return {
          full: "/images/logos/eduroam-2.png",
          abbr: "/images/logos/eduroam-1.png",
        };
      case "dns":
        return {
          full: "/images/logos/dns-full.png",
          abbr: "/images/logos/dns-abbr.png",
        };
      case "web-hosting": 
        return {
          full: "/images/logos/web-hosting-full.png",
          abbr: "/images/logos/web-hosting-abbr.png",
        };
      case "email-hosting":
        return {
          full: "/images/logos/email-1.png",
          abbr: "/images/logos/email-2.png",
        };
      case "ticketing":
        return {
          full: "/images/logos/ticketing-1.png",
          abbr: "/images/logos/ticketing-2.png",
        };
      case "user-management":
        return {
          full: "/images/logos/user-management-full.png",
          abbr: "/images/logos/user-management-abbr.png",
        };
      default:
        return {
          full: "/images/logo-full.png",
          abbr: "/images/logo-abbr.png",
        };
    }
  };

  const logos = getLogo();

  return (
    <nav
      className={`nxl-navigation ${
        navigationOpen ? "mob-navigation-active" : ""
      }`}
    >
      <div className="navbar-wrapper">
        <div className="m-header">
          <Link to="/" className="b-brand">
            {/* Dynamic logo based on selected portal */}
            <img src={logos.full} alt="logo" className="logo logo-lg" />
            <img src={logos.abbr} alt="logo" className="logo logo-sm" />
          </Link>
        </div>

        <div className={`navbar-content`}>
          <PerfectScrollbar>
            <ul className="nxl-navbar">
              <li className="nxl-item nxl-caption">
                <label>Navigation</label>
              </li>
              <Menus data={filteredMenu} />
            </ul>

            <div style={{ height: "18px" }}></div>
          </PerfectScrollbar>
        </div>
      </div>
      <div
        onClick={() => setNavigationOpen(false)}
        className={`${navigationOpen ? "nxl-menu-overlay" : ""}`}
      ></div>
    </nav>
  );
};

export default NavigationMenu;
