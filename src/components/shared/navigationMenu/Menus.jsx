import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import getIcon from "@/utils/getIcon";

const Menus = ({ data }) => {
  const [openMenus, setOpenMenus] = useState({
    main: null,
    sub: null,
    nested: null,
    super: null,
  });

  const [activePath, setActivePath] = useState({
    main: "",
    sub: "",
    nested: "",
    super: "",
  });

  const location = useLocation();
  const currentPortal = localStorage.getItem("selectedPortal")
    ? JSON.parse(localStorage.getItem("selectedPortal"))?.id
    : null;
  const currentRole = localStorage.getItem("role");

  const handleMenuToggle = (e, level, name) => {
    e.preventDefault();
    e.stopPropagation();

    setOpenMenus((prev) => ({
      ...prev,
      [level]: prev[level] === name ? null : name,
      // Close child menus when parent closes
      ...(level === "main" && { sub: null, nested: null, super: null }),
      ...(level === "sub" && { nested: null, super: null }),
      ...(level === "nested" && { super: null }),
    }));
  };

  // Auto-open menus based on current route
  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    setActivePath({
      main: pathParts[0] || "",
      sub: pathParts[1] || "",
      nested: pathParts[2] || "",
      super: pathParts[3] || "",
    });

    // Find matching menu items
    const activeMain = data.find(
      (item) =>
        item.path?.includes(pathParts[0]) ||
        item.name.toLowerCase().replace(/\s+/g, "-") === pathParts[0]
    );

    if (activeMain) {
      setOpenMenus((prev) => ({ ...prev, main: activeMain.name }));

      if (activeMain.dropdownMenu && pathParts[1]) {
        const activeSub = activeMain.dropdownMenu.find(
          (sub) =>
            sub.path?.includes(pathParts[1]) ||
            sub.name.toLowerCase().replace(/\s+/g, "-") === pathParts[1]
        );

        if (activeSub) {
          setOpenMenus((prev) => ({ ...prev, sub: activeSub.name }));

          if (activeSub.subdropdownMenu && pathParts[2]) {
            const activeNested = activeSub.subdropdownMenu.find(
              (nested) =>
                nested.path?.includes(pathParts[2]) ||
                nested.name.toLowerCase().replace(/\s+/g, "-") === pathParts[2]
            );
            if (activeNested) {
              setOpenMenus((prev) => ({ ...prev, nested: activeNested.name }));

              if (activeNested.superdropdownMenu && pathParts[3]) {
                const activeSuper = activeNested.superdropdownMenu.find(
                  (superItem) =>
                    superItem.path?.includes(pathParts[3]) ||
                    superItem.name.toLowerCase().replace(/\s+/g, "-") ===
                      pathParts[3]
                );
                if (activeSuper) {
                  setOpenMenus((prev) => ({
                    ...prev,
                    super: activeSuper.name,
                  }));
                }
              }
            }
          }
        }
      }
    }
  }, [location.pathname, data]);

  const shouldDisplayItem = (item) => {
    const portalAccess =
      !item.portals ||
      item.portals.length === 0 ||
      (currentPortal && item.portals.includes(currentPortal));

    const roleAccess =
      !item.roles ||
      item.roles.length === 0 ||
      (currentRole && item.roles.includes(currentRole));

    return portalAccess && roleAccess;
  };

  const renderMenuItems = (items, level = "main") => {
    return items.filter(shouldDisplayItem).map((item) => {
      const {
        id,
        name,
        path,
        icon,
        dropdownMenu,
        subdropdownMenu,
        superdropdownMenu,
      } = item;

      // Skip items with no path and no children
      if (!path && !dropdownMenu && !subdropdownMenu && !superdropdownMenu)
        return null;

      const isActive =
        (level === "main" &&
          activePath.main &&
          (path?.includes(activePath.main) ||
            name.toLowerCase().replace(/\s+/g, "-") === activePath.main)) ||
        (level === "sub" &&
          activePath.sub &&
          (path?.includes(activePath.sub) ||
            name.toLowerCase().replace(/\s+/g, "-") === activePath.sub)) ||
        (level === "nested" &&
          activePath.nested &&
          (path?.includes(activePath.nested) ||
            name.toLowerCase().replace(/\s+/g, "-") === activePath.nested)) ||
        (level === "super" &&
          activePath.super &&
          (path?.includes(activePath.super) ||
            name.toLowerCase().replace(/\s+/g, "-") === activePath.super));

      // Simple menu item without dropdown
      if (!dropdownMenu && !subdropdownMenu && !superdropdownMenu) {
        return (
          <li key={id} className={`nxl-item ${isActive ? "active" : ""}`}>
            <Link
              to={path}
              className="nxl-link text-capitalize"
              onClick={() =>
                setOpenMenus({
                  main: level === "main" ? name : openMenus.main,
                  sub: level === "sub" ? name : openMenus.sub,
                  nested: level === "nested" ? name : openMenus.nested,
                  super: null,
                })
              }
            >
              {icon && <span className="nxl-micon">{getIcon(icon)}</span>}
              <span className="nxl-mtext">{name}</span>
            </Link>
          </li>
        );
      }

      // Menu item with dropdown
      const hasChildren =
        dropdownMenu?.length > 0 ||
        subdropdownMenu?.length > 0 ||
        superdropdownMenu?.length > 0;

      return (
        <li
          key={id}
          className={`nxl-item nxl-hasmenu ${isActive ? "active" : ""} ${
            openMenus[level] === name ? "nxl-trigger" : ""
          }`}
        >
          <Link
            to={path || "#"}
            className="nxl-link text-capitalize"
            onClick={(e) => handleMenuToggle(e, level, name)}
          >
            {icon && <span className="nxl-micon">{getIcon(icon)}</span>}
            <span className="nxl-mtext">{name}</span>
            {hasChildren && (
              <span className="nxl-arrow">
                <FiChevronRight />
              </span>
            )}
          </Link>

          {hasChildren && (
            <ul
              className={`nxl-submenu ${
                openMenus[level] === name
                  ? "nxl-menu-visible"
                  : "nxl-menu-hidden"
              }`}
            >
              {dropdownMenu && renderMenuItems(dropdownMenu, "sub")}

              {subdropdownMenu &&
                !superdropdownMenu &&
                renderMenuItems(subdropdownMenu, "nested")}

              {/* Special case for items with both subdropdown and superdropdown */}
              {subdropdownMenu && superdropdownMenu && (
                <li className="nxl-item nxl-hasmenu">
                  <Link
                    to={path || "#"}
                    className="nxl-link text-capitalize"
                    onClick={(e) => handleMenuToggle(e, "nested", name)}
                  >
                    <span className="nxl-mtext">{name}</span>
                    <span className="nxl-arrow">
                      <FiChevronRight />
                    </span>
                  </Link>
                  <ul
                    className={`nxl-submenu ${
                      openMenus.nested === name
                        ? "nxl-menu-visible"
                        : "nxl-menu-hidden"
                    }`}
                  >
                    {subdropdownMenu
                      .filter(shouldDisplayItem)
                      .map((nestedItem) => {
                        if (nestedItem.superdropdownMenu) {
                          return (
                            <li
                              key={nestedItem.id}
                              className={`nxl-item nxl-hasmenu ${
                                openMenus.super === nestedItem.name
                                  ? "nxl-trigger"
                                  : ""
                              }`}
                            >
                              <Link
                                to={nestedItem.path || "#"}
                                className="nxl-link"
                                onClick={(e) =>
                                  handleMenuToggle(e, "super", nestedItem.name)
                                }
                              >
                                {nestedItem.name}
                                <span className="nxl-arrow">
                                  <FiChevronRight />
                                </span>
                              </Link>
                              <ul
                                className={`nxl-submenu ${
                                  openMenus.super === nestedItem.name
                                    ? "nxl-menu-visible"
                                    : "nxl-menu-hidden"
                                }`}
                              >
                                {nestedItem.superdropdownMenu
                                  .filter(shouldDisplayItem)
                                  .map((superItem) => (
                                    <li
                                      key={superItem.id}
                                      className={`nxl-item ${
                                        activePath.super ===
                                        superItem.name
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <Link
                                        to={superItem.path}
                                        className="nxl-link"
                                        onClick={() =>
                                          setOpenMenus((prev) => ({
                                            ...prev,
                                            super: superItem.name,
                                          }))
                                        }
                                      >
                                        {superItem.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          );
                        }
                        return (
                          <li
                            key={nestedItem.id}
                            className={`nxl-item ${
                              activePath.nested ===
                              nestedItem.name.toLowerCase().replace(/\s+/g, "-")
                                ? "active"
                                : ""
                            }`}
                          >
                            <Link
                              to={nestedItem.path}
                              className="nxl-link"
                              onClick={() =>
                                setOpenMenus((prev) => ({
                                  ...prev,
                                  nested: nestedItem.name,
                                }))
                              }
                            >
                              {nestedItem.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              )}
            </ul>
          )}
        </li>
      );
    });
  };

  return <ul className="nxl-nav">{renderMenuItems(data)}</ul>;
};

export default Menus;
