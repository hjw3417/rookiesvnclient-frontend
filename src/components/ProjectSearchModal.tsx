import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProjectLookupItem } from '../services/svnService';
import styles from './ProjectSearchModal.module.css';

interface ProjectSearchModalProps {
  show: boolean;
  onClose: () => void;
  projects: ProjectLookupItem[];
  selected: string[];
  onConfirm: (selected: string[]) => void;
}

const ProjectSearchModal: React.FC<ProjectSearchModalProps> = ({ show, onClose, projects, selected, onConfirm }) => {
  const [search, setSearch] = useState('');
  const [selectedList, setSelectedList] = useState<string[]>(selected);

  // selected prop이 바뀌면 내부 상태도 동기화
  useEffect(() => {
    setSelectedList(selected);
  }, [selected, show]);

  // 검색 필터링
  const filtered = useMemo(() =>
    projects.filter((item) =>
      item.projectName.toLowerCase().includes(search.toLowerCase())
    ), [projects, search]);

  const handleCheck = (name: string) => {
    setSelectedList((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
  const handleRemove = (name: string) => {
    setSelectedList((prev) => prev.filter((n) => n !== name));
  };
  const handleConfirm = () => {
    onConfirm(selectedList);
    onClose();
  };
  const handleClose = () => {
    setSearch('');
    setSelectedList(selected);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>사이트 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className={styles.searchBarWrap}>
          <Form.Control
            type="text"
            placeholder="검색어 입력"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <Button variant="primary" size="sm" className={styles.searchBtn} disabled>검색</Button>
        </Form.Group>
        <div className={styles.projectListWrap}>
          {filtered.map((item) => (
            <div key={item.projectName + item.serverName} className={styles.projectListItem}>
              <Form.Check
                type="checkbox"
                label={<span className={styles.projectLabel}>{item.projectName}</span>}
                checked={selectedList.includes(item.projectName)}
                onChange={() => handleCheck(item.projectName)}
              />
            </div>
          ))}
        </div>
        <div className={styles.selectedListWrap}>
          {selectedList.length > 0 && (
            <div className={styles.selectedListTitle}>선택된 프로젝트</div>
          )}
          <div className={styles.selectedList}>
            {selectedList.map((name) => (
              <div key={name} className={styles.selectedItem}>
                <span className={styles.selectedIcon}>📁</span>
                <span className={styles.selectedName}>{name}</span>
                <Button variant="link" size="sm" className={styles.removeBtn} onClick={() => handleRemove(name)}>X</Button>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
        <Button variant="primary" onClick={handleConfirm}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectSearchModal; 