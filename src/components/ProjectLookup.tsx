import React from 'react';
import { Form } from 'react-bootstrap';
import { ProjectLookupItem } from '../services/svnService';
import styles from './ProjectLookup.module.css';

interface ProjectLookupProps {
  lookupItems: ProjectLookupItem[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
}

const statusEmoji = {
  connected: '🟢 연결됨',
  disconnected: '🔴 연결실패',
};

const ProjectCheckbox: React.FC<{
  item: ProjectLookupItem;
  checked: boolean;
  onChange: () => void;
}> = ({ item, checked, onChange }) => {
  const [hover, setHover] = React.useState(false);
  const classNames = [
    styles.projectCheckboxItem,
    checked ? styles.projectCheckboxItemChecked : '',
    hover ? styles.projectCheckboxItemHover : '',
  ].join(' ');
  return (
    <div
      className={classNames}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onChange}
      title={`서버명: ${item.serverName}\n${statusEmoji[item.status]}`}
    >
      <Form.Check
        type="checkbox"
        label={<span className={styles.projectCheckboxLabel}>{item.projectName}</span>}
        checked={checked}
        onChange={onChange}
        style={{ marginBottom: 0, flex: 1 }}
      />
    </div>
  );
};

const ProjectLookup: React.FC<ProjectLookupProps> = ({ lookupItems, selectedItems, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const handleCheck = (projectName: string) => {
    if (selectedItems.includes(projectName)) {
      onChange(selectedItems.filter((item) => item !== projectName));
    } else {
      onChange([...selectedItems, projectName]);
    }
  };
  // 선택된 프로젝트 개수 표시
  const selectedCount = selectedItems.length;

  return (
    <div
      className={styles.projectLookupBox}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className={styles.projectLookupTitle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', minHeight: 28 }}>
        <span>프로젝트 선택</span>
        <span style={{ marginLeft: 8, color: '#0d6efd', fontWeight: 600, fontSize: 13 }}>
          {selectedCount > 0 ? `(${selectedCount})` : ''}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 16, color: '#bbb', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </div>
      <div
        className={styles.projectCheckboxList}
        style={{
          maxHeight: open ? 160 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.22s cubic-bezier(.4,0,.2,1), opacity 0.18s',
          overflowY: open ? 'auto' : 'hidden',
        }}
      >
        {lookupItems.map((item, idx) => (
          <ProjectCheckbox
            key={item.projectName + item.serverName + idx}
            item={item}
            checked={selectedItems.includes(item.projectName)}
            onChange={() => handleCheck(item.projectName)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectLookup; 