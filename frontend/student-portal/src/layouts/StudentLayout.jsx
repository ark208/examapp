import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import './StudentLayout.css';

export const StudentLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`app-layout ${isCollapsed ? 'sidebar-is-collapsed' : 'sidebar-is-expanded'}`}>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed((v) => !v)} />
      <div className="app-main-wrapper">
        <main className="app-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
