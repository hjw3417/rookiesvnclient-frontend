import React from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader';

interface SidebarProps {
  visible: boolean;
  pinned: boolean;
  onPinToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ visible, pinned, onPinToggle, onClose, children }) => {
  return (
    <div
      className={
        styles.sidebar +
        (visible ? ' ' + styles.visible : '') +
        (pinned ? ' ' + styles.pinned : '')
      }
      onMouseLeave={() => {
        if (!pinned) onClose();
      }}
    >
      <SidebarHeader />
      <div className={styles.pinArea}>
        <button className={styles.pinBtn} onClick={onPinToggle} title={pinned ? '고정 해제' : '고정'}>
          {pinned ? '📌' : '📍'}
        </button>
      </div>
      <div className={styles.sidebarContent}>{children}</div>
    </div>
  );
};

export default Sidebar; 