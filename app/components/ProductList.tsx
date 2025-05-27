// 상품 목록 렌더링 및 장바구니 기능

'use client'; // 이 컴포넌트는 클라이언트 사이드에서 실행되는 컴포넌트임을 명시

import { Product } from '@/lib/generated/prisma' // Prisma에서 Product 타입 가져오기

// 장바구니 기능을 구현할 유틸리티 함수나 훅 임포트
// import { useCart } from '@/hooks/useCart'; // 예시로 useCart 훅을 사용한다고 가정
import { addToCart } from '@/app/utils/cart'; // 예시 유틸 함수

//props로 받을 상품 목록의 타입 정의
interface ProductListProps {
    products: Product[]; // Prisma에서 가져온 Product 타입 배열을 받음
}

// ProductList 컴포넌트 (Client Component)
export default function ProductList({ products }: ProductListProps) {
    // 장바구니 관련 상태나 함수를 여기서 사용 (예: useCart 훅 사용 시)
    // const { addItem } = useCart(); // 예시로 장바구니에 아이템 추가하는 함수

    // "장바구니에 담기" 버튼 클릭 이벤트 핸들러
    const handleAddToCart = (product: Product) => {
        // TODO: 여기에 localStorage를 사용한 장바구니 추가 로직 구현
        console.log(`"${product.name}" 상품 장바구니에 담기 버튼 클릭!`);

        // 예: utils/cart.ts에 구현될 함수 호출
        addToCart(product); // 상품 객체 자체 또는 필요한 정보만 넘김

        alert(`${product.name} 상품이이 장바구니에 담겼습니다!`); // 알림
    };

    return (
        // 스타일링을 위한 컨테이너
        <div className="product-list-container">
            {/* 상품 목록이 비어있을 경우 메시지 표시 */}
            {products.length === 0? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                // 상품 목록을 순회하며 각 상품을 렌더링
                // 목록 형태로 표시
                <ul className="product-list">
                    {products.map((product) => (
                        // 각 상품 항목(li태그)
                        // key prop은 렌더링 시 필수
                        <li key={product.id} className="product-item">
                            {/* 상품 썸네일(선택사항) */}
                            {product.imageUrl && ( // imageUrl이 있을 때만 렌더링
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="product-thumbnail"
                                />
                            )}
                            // 상품 정보
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>가격: {product.price.toLocaleString()}원</p>
                            </div>

                            {/* 장바구니에 담기 버튼 */}
                            <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                                장바구니에 담기
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}