import { fetchSvnRoots } from '../api/svnApi';

export interface ProjectLookupItem {
  projectName: string;
  serverName: string;
  status: 'connected';
}

/**
 * 드롭다운(lookup)용 프로젝트 리스트 데이터 가공
 * /roots API 응답: { [serverName: string]: string[] }
 */
export const getProjectLookupList = async (token: string): Promise<ProjectLookupItem[]> => {
  const roots: Record<string, string[]> = await fetchSvnRoots(token);
  const result: ProjectLookupItem[] = [];
  Object.entries(roots).forEach(([serverName, items]) => {
    items.forEach((projectName) => {
      result.push({
        projectName,
        serverName,
        status: 'connected',
      });
    });
  });
  return result;
}; 