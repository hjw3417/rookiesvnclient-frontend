// SVN 루트 응답 DTO 타입 정의
export interface SvnRootResponseDto {
  success: boolean; // 성공 여부
  items: string[];  // 파일/폴더 이름 리스트
  message?: string; // 에러 메시지 또는 안내 메시지 (실패 시)
}

// 서버별 루트 응답 타입
export type SvnRootsResponse = {
  [serverName: string]: SvnRootResponseDto;
}; 