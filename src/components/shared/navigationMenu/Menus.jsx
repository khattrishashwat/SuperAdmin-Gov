import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import getIcon from "@/utils/getIcon";

const Menus = ({ data }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [activeParent, setActiveParent] = useState("");
  const [activeChild, setActiveChild] = useState("");
  const pathName = useLocation().pathname;

  const handleMainMenu = (e, name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleDropdownMenu = (e, name) => {
    e.stopPropagation();
    if (openSubDropdown === name) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(name);
    }
  };

  useEffect(() => {
    if (pathName !== "/") {
      const pathParts = pathName.split("/").filter(Boolean);
      setActiveParent(pathParts[0]);
      setActiveChild(pathParts[1]);
      setOpenDropdown(pathParts[0]);
      setOpenSubDropdown(pathParts[1]);
    } else {
      setActiveParent("dashboard");
      setOpenDropdown("dashboard");
    }
  }, [pathName]);

  return (
    <>
      {data.map((menuItem) => {
        const {
          id,
          name,
          path,
          icon,
          dropdownMenu,
          roles, // Added roles in case you need role-based rendering
          portals, // Added portals in case you need portal-based rendering
        } = menuItem;

        // Skip rendering if no path and no dropdown menu
        if (!path && !dropdownMenu) return null;

        // For simple menu items without dropdown
        if (!dropdownMenu) {
          return (
            <li
              key={id}
              className={`nxl-item ${pathName === path ? "active" : ""}`}
            >
              <Link to={path} className="nxl-link text-capitalize">
                <span className="nxl-micon">{getIcon(icon)}</span>
                <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                  {name}
                </span>
              </Link>
            </li>
          );
        }

        // For menu items with dropdown
        return (
          <li
            key={id}
            onClick={(e) => handleMainMenu(e, name)}
            className={`nxl-item nxl-hasmenu ${
              activeParent === name.toLowerCase().replace(/\s+/g, "-")
                ? "active nxl-trigger"
                : ""
            }`}
          >
            <Link to={path || "#"} className="nxl-link text-capitalize">
              <span className="nxl-micon">{getIcon(icon)}</span>
              <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                {name}
              </span>
              <span className="nxl-arrow fs-16">
                <FiChevronRight />
              </span>
            </Link>

            {dropdownMenu && (
              <ul
                className={`nxl-submenu ${
                  openDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"
                }`}
              >
                {dropdownMenu.map((subMenu) => {
                  const { id, name, path, subdropdownMenu } = subMenu;

                  // For submenu items with nested dropdown
                  if (subdropdownMenu && subdropdownMenu.length > 0) {
                    return (
                      <Fragment key={id}>
                        <li
                          className={`nxl-item nxl-hasmenu ${
                            activeChild ===
                            name.toLowerCase().replace(/\s+/g, "-")
                              ? "active"
                              : ""
                          }`}
                          onClick={(e) => handleDropdownMenu(e, name)}
                        >
                          <Link
                            to={path || "#"}
                            className="nxl-link text-capitalize"
                          >
                            <span className="nxl-mtext">{name}</span>
                            <span className="nxl-arrow">
                              <FiChevronRight />
                            </span>
                          </Link>
                          <ul
                            className={`nxl-submenu ${
                              openSubDropdown === name
                                ? "nxl-menu-visible"
                                : "nxl-menu-hidden"
                            }`}
                          >
                            {subdropdownMenu.map((nestedItem) => (
                              <li
                                key={nestedItem.id}
                                className={`nxl-item ${
                                  pathName === nestedItem.path ? "active" : ""
                                }`}
                              >
                                <Link
                                  className="nxl-link text-capitalize"
                                  to={nestedItem.path}
                                >
                                  {nestedItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </Fragment>
                    );
                  }

                  // For simple submenu items
                  return (
                    <li
                      key={id}
                      className={`nxl-item ${
                        pathName === path ? "active" : ""
                      }`}
                    >
                      <Link className="nxl-link" to={path}>
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Menus;
