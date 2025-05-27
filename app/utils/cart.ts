// 장바구니에 저장될 항목의 타입 정의

interface CartItem {
    productId: number; // 상품 ID
    name: string; // 상품 이름
    price: number; // 상품 가격
    imageUrl?: string | null; // 상품 이미지 URL (선택 사항)
    quantity: number; // 장바구니에 담긴 수량
}

// localStorage 키 이름
const CART_STORAGE_KEY = 'hana_shop_cart';

// 장바구니 데이터 불러오기 함수
export function getCart(): CartItem[] {
    // localStorage에서 장바구니 데이터를 가져와 JSON 파싱
    const cartData = localStorage.getItem(CART_STORAGE_KEY);

    if (cartData) {
        try {
            // JSON 문자열을 CartItem 배열로 변환
            // 에러 방지를 위해 파싱 결과가 배열인지 확인
            const parsedCart = JSON.parse(cartData);
            return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (error) {
            console.error('장바구니 데이터 파싱 오류:', error);
            return [];
        }
    }
    // localStorage에 데이터가 없으면 빈 배열 반환
    return [];
}

// 장바구니 데이터 저장 함수
function saveCart(cart: CartItem[]): void {
    // Javascript 객체 배열을 JSON 문자열로 변환하여 localStorage에 저장
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// 상품을 장바구니에 추가하는 함수
export function addToCart(
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl?: string | null;
    }): void {
    // 현재 장바구니 데이터 불러오기
    const cart = getCart();

    // 이미 장바구니에 있는 상품인지 확인
    const exisstingItem = cart.find(item => item.productId === product.id);

    if (exisstingItem) {
        // 이미 있는 상품이면 수량만 증가
        exisstingItem.quantity += 1;
    } else {
        // 없으면 새로운 항목으로 추가
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || null, // 이미지 URL이 없으면 null로 설정
            quantity: 1, // 새로 추가된 상품은 수량 1로 시작
        });
    }

    // 변경된 장바구니 데이터를 localStorage에 다시 저장
    saveCart(cart);
    console.log(`"${product.name}" 상품이 장바구니에 추가되었습니다.`);
}