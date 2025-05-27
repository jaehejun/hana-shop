// 이 파일은  서버에서 실행됨

// Next.js 서버 요청/응답 타입 import
import { NextRequest, NextResponse } from "next/server";


// // Prisma Client 인스턴스 생성 (DB와 통신하기 위해 필요)
// import { PrismaClient } from "@prisma/client";

// // Prisma 클라이언트 객체 생성
// const prisma = new PrismaClient();

// Prisma 클라이언트 인스턴스를 가져오는 유틸리티 파일을 임포트
import prisma from "@/lib/prisma"; // prisma.ts 파일에서 PrismaClient 인스턴스를 가져옴

// POST 요청을 처리하는 API 라우트 함수
// request 객체는 클라이언트에서 보낸 요청 정보를 담고 있음
export async function POST(request: NextRequest) {
    try {
        // 1. 클라이언트에서 보낸 요청 본문(body) 데이터 읽어서 JSON으로 파싱
        const newProduct = await request.json();

        console.log('새로운 상품 등록 요청:', newProduct);

        if (!newProduct.name || !newProduct.description || !newProduct.price) {
            // 필수 필드가 누락된 경우
            return NextResponse.json(
                { error: '모든 필드를 입력해주세요.' },
                { status: 400 }
            );
        }

        // 2. Prisma를 사용해 데이터베이스에 새 상품 레코드 생성
        const createdProduct = await prisma.product.create({
            data: { // 생성할 데이터 객체
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,// page.tsx에서 숫자로 변환해서 보냄냄
                imageUrl: newProduct.imageUrl,
                // createdAt, updatedAt 필드는 schema.prisma에서 default로 자동 생성됨
            },
        });

        // 3. 성공 응답 반환
        // NextResponse.json은 JSON 형태로 응답을 반환하는 Next.js 서버 함수
        return NextResponse.json(
            { message: '상품이 성공적으로 등록되었습니다.', product: createdProduct },
            { status: 201 } // HTTP 상태 코드 201 Created(자원 생성 성공시 관례적으로 사용)
        );
    } catch (error) {
        // 4. 에러 발생 시 에러 응답 반환
        console.error('상품 등록 API 오류 : ', error);
        return NextResponse.json(
            { message: '상품 등록 중 오류가 발생했습니다.' },
            { status: 500 } // HTTP 상태 코드 500 Internal Server Error
        );
    }
}