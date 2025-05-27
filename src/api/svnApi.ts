import axiosInstance from './axios';
import qs from 'qs';

/**
 * 모든 SVN 서버의 루트(최상위) 디렉토리 파일/폴더 이름을 반환
 * @param token JWT 토큰
 */
export const fetchSvnRoots = async (token: string): Promise<Record<string, string[]>> => {
  const res = await axiosInstance.get<Record<string, string[]>>('/api/svn/roots', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * 여러 서버/ROOT에서 특정 경로의 하위 목록을 MERGE하여 반환 (GET)
 * @param token JWT 토큰
 * @param roots 서버/프로젝트명 배열
 * @param path 하위 경로
 */
export const fetchChildren = async (token: string, roots: string[], path: string = ''): Promise<any[]> => {
  const res = await axiosInstance.get('/api/svn/children', {
    headers: { Authorization: `Bearer ${token}` },
    params: { roots, path },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  return res.data as any[];
}; 