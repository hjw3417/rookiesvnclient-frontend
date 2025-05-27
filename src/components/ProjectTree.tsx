import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProjectTreeProps {
  childrenList: any[];
  selected: string[];
  allChildrenByRoot: { [root: string]: any[] };
  onFolderClick: (folderName: string) => void;
  onGoUp: () => void;
  currentPath: string[];
}

const ProjectTree: React.FC<ProjectTreeProps> = ({
  childrenList,
  selected,
  allChildrenByRoot,
  onFolderClick,
  onGoUp,
  currentPath,
}) => {
  const renderTree = (nodes: any[]) => (
    <ul style={{ listStyle: 'none', paddingLeft: 16, marginBottom: 0 }}>
      {nodes.map((child) => {
        const isDirectory = child.type === 'directory';
        // 어떤 root에 이 child.name이 포함되어 있는지 계산
        const existsProjects = selected.filter(
          proj => (allChildrenByRoot[proj.toLowerCase()] || []).some((c: any) => c.name === child.name)
        );
        const notExistsProjects = selected.filter(
          proj => !(allChildrenByRoot[proj.toLowerCase()] || []).some((c: any) => c.name === child.name)
        );

        const tooltip = (
          <Tooltip
            id={`tooltip-${child.name}`}
            style={{
              background: 'linear-gradient(135deg, #e0e7ef 0%, #2563eb 100%)',
              color: '#222',
              borderRadius: 12,
              padding: 14,
              minWidth: 200,
              fontSize: 12,
              textAlign: 'left',
              boxShadow: '0 4px 16px rgba(30,64,175,0.10)',
              border: 'none',
              lineHeight: 1.7,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13, color: '#2563eb', letterSpacing: 0.2 }}>
              exists project
            </div>
            <div style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {existsProjects.length > 0
                ? existsProjects.map(p => (
                    <span
                      key={p}
                      style={{
                        background: '#dbeafe',
                        color: '#2563eb',
                        borderRadius: 8,
                        padding: '2px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {p}
                    </span>
                  ))
                : <span style={{ color: '#b0b8c9', fontWeight: 400 }}>없음</span>
              }
            </div>
            <div style={{
              borderTop: '1px solid #e5e7eb',
              margin: '8px 0 8px 0',
              height: 0,
              width: '100%',
            }} />
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13, color: '#64748b', letterSpacing: 0.2 }}>
              not exists project
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {notExistsProjects.length > 0
                ? notExistsProjects.map(p => (
                    <span
                      key={p}
                      style={{
                        background: '#f1f5f9',
                        color: '#64748b',
                        borderRadius: 8,
                        padding: '2px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {p}
                    </span>
                  ))
                : <span style={{ color: '#b0b8c9', fontWeight: 400 }}>없음</span>
              }
            </div>
          </Tooltip>
        );

        return (
          <li key={child.name}>
            <OverlayTrigger placement="right" overlay={tooltip} delay={{ show: 0, hide: 0 }}>
              <span
                style={{
                  fontSize: 12,
                  cursor: isDirectory ? 'pointer' : 'default',
                  color: isDirectory ? undefined : '#888',
                  userSelect: 'none',
                }}
                onClick={isDirectory ? () => onFolderClick(child.name) : undefined}
              >
                {isDirectory ? '📁' : '📄'} {child.name}
              </span>
            </OverlayTrigger>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div style={{ borderTop: '1px solid #e3e6ea', paddingTop: 12 }}>
      {childrenList.length > 0 && (
        <>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: 'flex', alignItems: 'center' }}>
            {currentPath.length > 0 && (
              <Button variant="light" size="sm" onClick={onGoUp} style={{ marginRight: 8, padding: '2px 6px', fontSize: 10 }}>
                <ArrowBackIcon fontSize="inherit" style={{ fontSize: 14, marginRight: 2 }} /> 상위
              </Button>
            )}
            <span>하위 디렉토리/파일</span>
          </div>
          {renderTree(childrenList)}
        </>
      )}
    </div>
  );
};

export default ProjectTree; 