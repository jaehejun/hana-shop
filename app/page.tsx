// 기본 홈 페이지 컴포넌트. 루트 경로('/')에 해당하는 페이지 내용

// 실제 화면에 보여질 UI를 정의
// React 컴포넌트 형태로 작성하며 서버 컴포넌트가 기본
// 클라이언트 상태나 이벤트가 필요하면 'use client' 지시어를 붙여 클라이언트 컴포넌트로 만들 수 있음

// URL 경로와 파일명이 매핑되어 자동 라우팅됨
// page.tsx 파일이 여러 개 있으면 각각 다른 경로의 페이지가 됨
// 예: app/about/page.tsx는 /about 페이지

export default function HomePage() {
  return (
    <h1>홈 페이지 입니다!</h1>
  );
}