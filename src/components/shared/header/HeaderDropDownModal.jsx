import React, { Fragment } from "react";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import getIcon from "@/utils/getIcon";

const menuData = [
  // ... (keep your existing menuData array as is)
];

const HeaderDropDownModal = () => {
  return (
    <div className="dropdown nxl-h-item nxl-lavel-menu">
      <div className="dropdown-menu nxl-h-dropdown">
        {menuData.map((menu, index) => (
          <Fragment key={index}>
            <div className="dropdown nxl-level-menu">
              <Link to="#" className="dropdown-item text-capitalize">
                <span className="hstack">
                  <i>{getIcon(menu.icon)}</i>
                  <span>{menu.name}</span>
                </span>
                <i className="ms-auto me-0">
                  <FiChevronRight />
                </i>
              </Link>
              <div className="dropdown-menu nxl-h-dropdown">
                {menu.subMenu.map((subItem, subIndex) => (
                  <div key={subIndex} className="dropdown nxl-level-menu">
                    <Link
                      to={subItem.path}
                      className="dropdown-item text-capitalize"
                    >
                      <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                      <span>{subItem.name}</span>
                      {subItem.subSubMenu && (
                        <i className="ms-auto me-0">
                          <FiChevronRight />
                        </i>
                      )}
                    </Link>
                    {subItem.subSubMenu && (
                      <div className="dropdown-menu nxl-h-dropdown">
                        {subItem.subSubMenu.map((subSubItem, subSubIndex) => (
                          <Link
                            key={subSubIndex}
                            to={subSubItem.path}
                            className="dropdown-item text-capitalize"
                          >
                            <span>{subSubItem.name}</span>
                          </Link>
                        ))}
                        {/* Add New Items option for sub-submenu */}
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item">
                          <i>
                            <FiPlus />
                          </i>
                          <span>Add New {subItem.name} Item</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                {/* Add New Items option for submenu */}
                <div className="dropdown-divider"></div>
                <Link to="#" className="dropdown-item">
                  <i>
                    <FiPlus />
                  </i>
                  <span>Add New {menu.name} Item</span>
                </Link>
              </div>
            </div>
            {index === 0 && <div className="dropdown-divider"></div>}
          </Fragment>
        ))}
        <div className="dropdown-divider"></div>
        <Link to="#" className="dropdown-item">
          <i>
            <FiPlus />
          </i>
          <span>Add New Items</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderDropDownModal;
