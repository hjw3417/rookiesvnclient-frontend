import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getProjectLookupList, ProjectLookupItem } from '../services/svnService';
import SidebarTabs from '../components/SidebarTabs';
import Sidebar from '../components/Sidebar';
import ProjectSearchModal from '../components/ProjectSearchModal';
import AppHeader from '../components/AppHeader';
import { fetchChildren } from '../api/svnApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProjectTree from '../components/ProjectTree';

const SIDEBAR_WIDTH = 260;

const MainSection: React.FC<{ children?: React.ReactNode; sidebarWidth: number }> = ({ children, sidebarWidth }) => (
  <div
    style={{
      marginLeft: sidebarWidth,
      padding: 32,
      minHeight: '100vh',
      background: '#f6f7fa',
      transition: 'margin-left 0.22s cubic-bezier(.4,0,.2,1)',
      marginTop: 56,
    }}
  >
    {/* 상단 바, 본문, 하단 등 섹션 분리 가능 */}
    {children}
  </div>
);

const MainPage: React.FC = () => {
  const [lookupItems, setLookupItems] = useState<ProjectLookupItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [childrenList, setChildrenList] = useState<any[]>([]);

  // 사이드바 상태
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [activeTab, setActiveTab] = useState('svn');

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);

  // 프로젝트 목록을 버튼 클릭 시에만 불러오도록 변경
  const handleOpenModal = async () => {
    setModalOpen(true);
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwt') || '';
      const items = await getProjectLookupList(token);
      setLookupItems(items);
    } catch (e) {
      setError('프로젝트 목록을 불러오지 못했습니다.');
      setLookupItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 탭 hover/클릭 핸들러
  const handleTabHover = (tab: string | null) => {
    if (!sidebarPinned) setSidebarVisible(!!tab);
    if (tab) setActiveTab(tab);
  };
  const handleTabClick = (tab: string) => {
    setSidebarVisible(true);
    setActiveTab(tab);
  };
  const handlePinToggle = () => setSidebarPinned((p) => !p);
  const handleSidebarClose = () => setSidebarVisible(false);

  // 사이드바 width 동적 계산
  const sidebarWidth = sidebarVisible || sidebarPinned ? SIDEBAR_WIDTH : 0;

  // 프로젝트 검색 확인 핸들러
  const handleProjectConfirm = async (selectedList: string[]) => {
    setSelected(selectedList);
    setCurrentPath([]); // path 초기화
    setCurrentRoot(selectedList[0] || null); // 첫 번째 root만 사용 (UI 표시용)
    if (selectedList.length > 0) {
      fetchAndSetChildren(selectedList, []);
    } else {
      setChildrenList([]);
    }
  };

  const [allChildrenByRoot, setAllChildrenByRoot] = useState<{ [root: string]: any[] }>({});

  const fetchAndSetChildren = async (roots: string[], pathArr: string[]) => {
    const token = localStorage.getItem('jwt') || '';
    const path = pathArr.join('/');
    const childrenArr = await fetchChildren(token, roots, path); // 배열
    // allChildrenByRoot로 변환
    const byRoot: { [root: string]: any[] } = {};
    (childrenArr || []).forEach((item: any) => {
      byRoot[item.rootPath?.toLowerCase()] = item.children || [];
    });
    setAllChildrenByRoot(byRoot);
    // merged children만 childrenList로 사용
    const merged = Array.isArray(childrenArr) && childrenArr[0]?.children ? childrenArr[0].children : [];
    setChildrenList(merged);
  };

  const handleFolderClick = (folderName: string) => {
    if (selected.length === 0) return;
    const newPath = [...currentPath, folderName];
    setCurrentPath(newPath);
    fetchAndSetChildren(selected, newPath);
  };

  const handleGoUp = () => {
    if (selected.length === 0 || currentPath.length === 0) return;
    const newPath = currentPath.slice(0, -1);
    setCurrentPath(newPath);
    fetchAndSetChildren(selected, newPath);
  };

  const [currentPath, setCurrentPath] = useState<string[]>([]); // path 누적 관리
  const [currentRoot, setCurrentRoot] = useState<string | null>(null); // 단일 root 기준

  const extractRootName = (url: string) => url.split('/').pop()?.toLowerCase();

  return (
    <div>
      <AppHeader />
      <SidebarTabs activeTab={activeTab} onTabHover={handleTabHover} onTabClick={handleTabClick} visible={sidebarVisible} />
      <Sidebar
        visible={sidebarVisible}
        pinned={sidebarPinned}
        onPinToggle={handlePinToggle}
        onClose={handleSidebarClose}
      >
        {/* 검색/선택 영역 */}
        <div style={{ marginBottom: 16 }}>
          <Button variant="primary" size="sm" onClick={handleOpenModal} style={{ width: '100%', marginBottom: 12 }}>
            프로젝트 검색
          </Button>
          {selected.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {selected.map((name) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', background: '#f0f6ff', borderRadius: 16, padding: '2px 10px 2px 6px', fontSize: 10, border: '1px solid #b6d4fe' }}>
                  <span style={{ marginRight: 4, fontSize: 7 }}>📁</span>
                  <span style={{ marginRight: 4, fontSize: 8 }}>{name}</span>
                  <Button variant="link" size="sm" style={{ color: '#888', fontSize: 13, padding: '0 2px', marginLeft: 2 }} onClick={() => setSelected(selected.filter((n) => n !== name))}>X</Button>
                </div>
              ))}
            </div>
          )}
          <ProjectSearchModal
            show={modalOpen}
            onClose={() => setModalOpen(false)}
            projects={lookupItems}
            selected={selected}
            onConfirm={handleProjectConfirm}
          />
        </div>
        {/* 하단 children 리스트업 영역 */}
        <div style={{ borderTop: '1px solid #e3e6ea', paddingTop: 12 }}>
          <ProjectTree
            childrenList={childrenList}
            selected={selected}
            allChildrenByRoot={allChildrenByRoot}
            onFolderClick={handleFolderClick}
            onGoUp={handleGoUp}
            currentPath={currentPath}
          />
        </div>
      </Sidebar>
      <MainSection sidebarWidth={sidebarWidth}>
        {/* 메인 컨텐츠 영역 (추후 분리) */}
      </MainSection>
    </div>
  );
};

export default MainPage; 