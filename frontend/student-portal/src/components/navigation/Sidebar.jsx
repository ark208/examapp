import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  ExamIcon,
  HelpCircleIcon,
  UserIcon,
  LogOutIcon,
  ServerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard',    path: '/',        icon: DashboardIcon },
  { label: 'My Exams',     path: '/exams',   icon: ExamIcon, livePulse: true },
  { label: 'Profile & Help', path: '/profile', icon: HelpCircleIcon },
];

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { user, logout } = useAuth();

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">
            <ServerIcon size={18} color="#ffffff" />
          </span>
          {!isCollapsed && (
            <div className="sidebar-brand-info">
              <span className="sidebar-brand-name">ExamLAN</span>
              <span className="sidebar-brand-edition">STUDENT PORTAL</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav" aria-label="Student Navigation">
        <ul className="sidebar-menu">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="sidebar-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="sidebar-icon-wrapper">
                    <Icon size={18} />
                    {item.livePulse && <span className="sidebar-live-dot" />}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="sidebar-link-text">{item.label}</span>
                      {item.livePulse && (
                        <span className="sidebar-live-pill">LIVE</span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card" title={user?.rollNo || user?.rollNumber}>
          <div className="sidebar-avatar">
            <UserIcon size={16} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-user-meta">
              <span className="sidebar-user-name">{user?.name || 'Student'}</span>
              <span className="sidebar-user-dept">{user?.rollNo || user?.rollNumber || ''}</span>
            </div>
          )}
          {!isCollapsed && (
            <button
              type="button"
              className="sidebar-logout-btn"
              onClick={logout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOutIcon size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
