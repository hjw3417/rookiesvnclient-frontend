import React from 'react';
import styles from './SidebarTabs.module.css';

interface SidebarTabsProps {
  activeTab: string;
  onTabHover: (tab: string | null) => void;
  onTabClick: (tab: string) => void;
  visible?: boolean;
}

const tabs = [
  { key: 'svn', label: 'svn', color: '#ff914d' },
  // { key: 'db', label: 'db', color: '#5fa8d3' }, // db 탭은 당장 숨김
];

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, onTabHover, onTabClick, visible }) => {
  if (visible) return null;
  return (
    <div className={styles.sidebarTabs}>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={styles.tab + (activeTab === tab.key ? ' ' + styles.active : '')}
          style={{ background: tab.color }}
          onMouseEnter={() => onTabHover(tab.key)}
          onMouseLeave={() => onTabHover(null)}
          onClick={() => onTabClick(tab.key)}
        >
          <span className={styles.tabLabel}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SidebarTabs; 