// app/admin/new/page.tsx
// 상품 등록 페이지
// 사용자가 직접 입력하고 버튼을 클릭하는 클라이언트 사이드 기능이 필요 -> use client

'use client';   // 이 컴포넌트는 클라이언트 사이드에서 실행되는 클라이언트 컴포넌트임을 명시

// useState는 React에서 제공하는 Hook중 하나
// Client 컴포넌트에서 상태(state)를 관리하기 위해 사용
// 상태(state)란 컴포넌트 안에서 시간이 지남에 따라 변할 수 있는 데이터
// 상태가 변하면 React가 자동으로 컴포넌트를 다시 렌더링해서 화면을 업데이트
import { useState } from 'react';

export default function AddNewProductPage() {
    // 폼 입력 값들을 관리할 상태(state)
    // const [상태변수, 상태변경함수] = useState(초기값);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); // 가격은 문자열로 받아서 나중에 숫자로 변환
    const [imageUrl, setImageUrl] = useState('');

    // 폼 제출(submit) 이벤트 핸들러
    // async 함수로 정의하여 비동기 작업(예: API 호출, 파일 읽기, 시간지연) 가능
    // await 키워드를 사용하여 비동기 작업이 완료될 때까지 함수 실행을 잠시 멈추고 기다릴 수 있음
    // async 함수는 항상 Promise를 반환
    // Promise는 비동기 작업의 결과(성공 또는 실패)를 나타내는 객체

    // 브라우저는 어떤 이벤트가 발생하면 해당 이벤트 정보를 담고 있는 객체를 만들어 이벤트 핸들러 함수에 전달(event 인자)
    // event 객체 안에는 발생시간, 이벤트 타입(여기서는 'submit'),
    //                  이벤트가 발생한 요소(element, event.target 등, 여기선 HTMLFormElement),
    //                  이벤트 관련 메서드(여기선 event.preventDefault()) 등이 포함됨

    // React.FormEvent<HTMLFormElement>는 React에서 제공하는 타입으로 event 객체의 타입을 정의
    // <HTMLFormElement> <> 안에 있는건 제네릭(Generic) 문법
    // React.FormEvent는 어떤 종류의 HTML 요소에서 발생한 폼 이벤트인지 지정할 수 있음
    // -> <HTMLFormElement>는 HTML Form 요소에서 발생한 이벤트임을 나타냄
    // -> 이 타입을 지정해주면 TypeScript가 event.target같은 속성에 접근시 이 요소가 <form>임을 알 수 있음
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // (1) 동기 실행
        event.preventDefault(); // 기본 폼 제출 동작 막기(페이지 새로고침 방지)
                                // 싱글 페이지 어플리케이션(SPA)처럼 동작하게 하기 위함        

        // 입력 값 모으기 (2) 동기 실행
        const newProduct = {
            name,
            description,
            price: parseInt(price, 10), // 가격을 정수로 변환(Number(price)도 가능)
            imageUrl,
        };

        console.log('새로운 상품 등록:', newProduct); // (3) 동기 실행

        // TODO: 실제 API 호출로 상품 등록하기
        // 예: fetch('/api/admin/new', { method: 'POST', body: JSON.stringify(newProduct) })
        // 여기서는 콘솔에 출력만 하고 실제 API 호출은 생략
        // 성공하면 메시지 보여주거나 다른 페이지로 이동 등

        // 여기서부터 비동기 작업 시작
        try {   // (4) try 블록 시작 - 여기서 에러나면 catch 블록으로 점프

            // 1. 호출할 API 라우트 주소 설정 (Next.js의 API Route 활용)
            const apiUrl = '/api/admin/new';

            // 2. fetch API를 사용하여 POST 요청 보내기
            // 첫번째 인자로 URL, 두번째 인자로 요청 옵션 객체를 전달
            // 요청 옵션 객체에는 HTTP 메서드, 헤더, 본문(body) 등을 설정
            // fetch는 응답 객체(Response)를 포함하는 Promise를 반환

            // 첫 번째 await: fetch 호출 및 서버 응답 기다리기
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 요청 본문이 JSON임을 명시해 서버에 알림
                },
                body: JSON.stringify(newProduct), // 입력 값들을 JSON 문자열로 변환하여 요청 본문에 담기
            }); // (5) fetch Promise 반환 -> await가 기다림
                // fetch가 끝나면 response 변수에 응답(Response) 객체가 할당됨
                // 네트워크 오류 시 여기서 catch 블록으로 점프

            // 3. 서버 응답 처리
            // (5)fetch가 응답 받은 후 여기로 진입
            if (response.ok) { //응답 상태 코드가 200번대 성공일 경우
                // (6) 동기 실행 - 응답 status 확인

                // 두 번째 await(성공시): 응답 본문(body) 읽어서 JSON파싱 기다리기기
                const result = await response.json(); // 응답 본문을 JSON으로 파싱
                // (7) response.json() Promise 반환 -> await가 기다림
                // 응답 다 읽고 JSON 파싱 끝나면 결과가 할당된 result 객체 얻음
                // 파싱 오류 시 여기서 catch 블록으로 점프

                // (8) 동기 실행 - 파싱된 결과 출력
                console.log('상품 등록 성공:', result);

                // 성공적으로 등록되면 입력 필드 초기화
                // 입력 필드 초기화(선택사항)
                setName(''); // (9) 동기 실행
                setDescription(''); // (10) 동기 실행
                setPrice(''); // (11) 동기 실행
                setImageUrl(''); // (12) 동기 실행

                // 성공 메시지 보여주기 또는 다른 페이지로 이동(예: 등록된 상품 목록 페이지)
                // (13) 동기 실행
                alert('상품 등록 성공!'); // 간단하게 alert로 알림
                // router.push('/admin/products'); // 상품 목록 페이지로 이동(Next.js 라우터 사용시 router 필요)
            } else { //응답 상태 코드가 200번대가 아닐 경우 //(6) 동기 실행 - 응답 status 확인

                // 세 번째 await(실패시): 응답 본문(body) 읽어서 JSON 파싱 기다리기
                const errorResult = await response.json(); // 에러 응답 본문을 JSON으로 파싱
                // (14) response.json() Promise 반환 -> await가 기다림
                // 에러 본문 다 읽고 JSON 파싱끝나면 errorResult 객체 얻음
                // 파싱 오류 시 여기서 catch 블록으로 점프
                console.error('상품 등록 실패:', response.status, " : ", errorResult); // (15) 동기 실행 - 에러 출력
                alert(`상품 등록 실패: ${errorResult.message || '알 수 없는 오류'}`); // 에러 메시지 표시 (16) 동기 실행
            }
            // (4) 또는 (5),(7),(14)에서 오류가 발생하면 이 블록으로 점프
        } catch (error) { // fetch 요청 자체에서 발생한 네트워크 오류 등
            console.error('API 호출 중 에러 발생:', error); // (17) 동기 실행
            alert('상품 등록 중 네트워크 오류가 발생했습니다.'); // (18) 동기 실행
        }
    };

    return (
        <div>
            <h1>새 상품 등록</h1>
            {/* <form>태그: 폼 영역의 컨테이너, submit이벤트리스너(onSubmit)역할 */}
            {/* onSubmit={handleSubmit}: 폼에서 제출이벤트 발생 시 실행할 함수 지정 */}
            <form onSubmit={handleSubmit}>
                {/* 이름 라벨과 입력 필드 묶어주는 div */}
                <div> 
                    {/* 입력 필드의 id와 연결되는 label(접근성 향상) */}
                    {/* '상품명' 텍스트만 선택해도 자동으로 해당 입력 필드로 포커스가 이동 */}
                    <label htmlFor="name">상품명</label>
                    <input // 상품 이름 입력받는 칸
                        id="name" // label의 htmlFor 속성과 일치해야 연결됨
                        type="text" // 입력 타입: 일반 텍스트
                        value={name} // 상태 변수 name의 현재 값

                        // onChange: <input>,<textarea>,<select> 같은 폼 요소가 가지고 있는 이벤트 속성 중 하나나
                        // React의 JSX에서는 이 이벤트를 속성(prop)형태로 제공
                        // 이 input 요소에서 change 이벤트가 발생하면 {...} 안에 있는 함수 호출을 React가 처리
                        // {...} : onChange 속성에 할당되는 값으로 자바 스크립트 표현식
                        // (e): 이 함수가 이벤트 객체 e를 인자로 받음
                        // setName(e.target.value): e.target.value 값을 인자로 받아 setName 함수를 호출
                        onChange={(e) => setName(e.target.value)} // 입력 값 바뀔 때마다 setName 호출
                        required // 필수 입력 필드
                    />
                </div>
                <div>
                    <label htmlFor="description">상품 설명</label>
                    <textarea // 상품 설명 여러 줄 입력받는 칸
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required // 필수 입력 필드
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required // 필수 입력 필드
                        min="100" // 가격은 0 이상
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">이미지 URL</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required // 필수 입력 필드
                    />
                </div>
                {/* 폼 제출 이벤트를 발생시키는 트리거(trigger) 역할(반드시 form 안에 있어야 함) */}
                {/* 사용자가 버튼을 누르면 이 버튼이 속한 가장 가까운 <form>요소를 찾아서 해당 폼에 제출 이벤트 발생을 알림 */}
                <button type="submit">상품 등록</button>
            </form>
        </div>
    );
}