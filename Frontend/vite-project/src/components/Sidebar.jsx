import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="sidebar-menu">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>↕</span>
          Transactions
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>◎</span>
          Goals
        </NavLink>

        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>▥</span>
          Portfolio
        </NavLink>

        <NavLink
          to="/growth"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <span>↗</span>
          Round Up Growth
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;