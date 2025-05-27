// app/products/page.tsx (Server Component) 상품 목록 페이지
// 이 파일은 기본적으로 서버에서 실행됨

import primsa from "@/lib/prisma"; // Prisma Client 인스턴스 가져오기

// Client Component로 상품 목록을 보여줄 컴포넌트를 import
import ProductList from '@/components/ProductList';

// 상품 목록 페이지 컴포넌트 (Server Component)
// asnyc 함수로 만들어서 await를 사용해 비동기 DB 작업 기다릴 수 있음
export default async function ProductsPage() {
    // 1. 데이터베이스에서 모든 상품 정보 가져오기
    // Prisma Client는 Server Component에서만 사용할 수 있음
    // findMany() 메서드로 Product 테이블의 모든 레코드를 조회
    // orderBy로 최신 상품이 먼저 보이도록 createdAt 기준 내림차순 정렬
    const products = await primsa.product.findMany({
        orderBy: {
            createdAt: 'desc', // 최신 상품이 먼저 보이도록 정렬
        },
    });

    // 가져온 데이터 확인(서버 터미널에 찍힘)
    console.log('상품 목록:', products);

    // 2. 가져온 데이터를 Client Component에 prop으로 넘겨서 렌더링
    // Server Component는 직접 사용자 인터렉션(클릭 이벤트 등)을 처리 못 하므로
    // 데이터만 가져와서 사용자 인터렉션이 필요한 Client Component에게 넘겨줌
    return (
        <div>
            <h1>상품 목록</h1>
            {/* Client Component인 ProductList 컴포넌트에 products prop으로 넘겨줌 */}
            <ProductList products={products} />
        </div>
    );
}