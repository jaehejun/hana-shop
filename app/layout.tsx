// 앱의 공통 레이아웃을 정의하는 컴포넌트. 
// app/layout.tsx는 루트 레이아웃으로 모든 페이지에 공통으로 적용됨
// 기본적으로 서버 컴포넌트

// 모든 페이지에 공통으로 적용되는 UI 구조(헤더,푸터) 등 정의
// <html>, <body> 태그 같은 최상위 태그를 감싸서 문서 구조를 정의
// 전역 스타일이나 폰트, 메타데이터 설정도 여기서 할 수 있음

// 여러 하위 폴더에 각각 layout.tsx를 두면, URL 경로에 따라 중첩된 레이아웃이 적용됨
// 예: /about/layout.tsx는 /about/* 경로에만 적용


// export default : 이 파일에서 기본으로 내보내는 값(함수, 객체 등)
// function RootLayout : RootLayout이라는 이름의 함수 선언, React 컴포넌트로 사용 가능
// 가독성과 유지보수를 위해 컴포넌트명과 파일명 일치시키는게 좋음

// return ~ : 함수 내부에서 JSX(JavaScript XML, HTML 태그처럼 생긴 코드를 쓸 수 있게 해주는 문법) 반환
// -> React가 화면에 렌더링
// 함수가 React 컴포넌트 역할할 때는 JSX를 반환해야 함
// 실제로는 Babel 같은 도구가 JSX를 React.createElement 호출로 변환해 브라우저가 이해할 수 있게 만들어줌

// children : RootLayout 컴포넌트가 감싸는 다른 컴포넌트나 요소들(자식 컴포넌트)
// {children}: 객체 구조 분해 할당 문법을 사용해 함수 인자로 받은 객체에서 children 프로퍼티를 추출
// {children:React.ReactNode}: 타입 선언 부분. children 타입이 React.ReactNode임을 명시
// React.ReactNode는 React에서 렌더링 가능한 모든 타입(문자열, 숫자, JSX, null 등)을 포함하는 타입

// Next.js App Router 동작 방식
// 1. 경로기반: 파일 시스템 기반 라우팅을 사용해 app 폴더 구조를 보고 어떤 페이지를 보여줄지 결정
// 2. 레이아웃 찾기: 사용자가 특정 URL로 접속하면 Next.js는 해당 경로와 그 상위 경로에 있는 모든 layout.tsx 파일 찾는다
// 3. 페이지 찾기: 해당 경로에 대응하는 page.tsx 파일을 찾는다
// 4. 자동 중첩: 가장 바깥쪽 레이아웃(app/layout.tsx) 컴포넌트를 렌더링
//              그 안의 {children} 자리에는 그 다음 하위 레이아웃(app/about/layout.tsx 등)이나 
//              page.tsx 컴포넌트의 렌더링 결과물을 넣어줌

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>헤더 영역</header>
        <main>{children}</main>   {/*여기에 자식 페이지가 렌더링됨*/}
        <footer>푸터 영역</footer>
      </body>
    </html>
  );
}