// PrismaClient 인스턴스를 애플리케이션 코드에서 효율적으로 사용하기 위한 유틸리티 파일
// 싱글톤 패턴을 사용하여 PrismaClient 인스턴스를 재사용하고, 개발 모드에서만 전역 객체에 저장하는 방식으로 설정

// 1. PrismaClient 임포트 (경로가 다를 수 있는데, 네 프로젝트 구조에 맞게 쓰면 돼)
// '@/lib/generated/prisma' 이건 아마 네 프로젝트 설정에 따라 @/ 가 src/ 를 가리키고
// prisma generate 하면 생기는 클라이언트 파일 경로일 거야.
import { PrismaClient } from '@/lib/generated/prisma';

// 2. Node.js의 전역 객체(global)에 Prisma 인스턴스를 담을 공간을 준비
// global 은 Node.js 환경에서 어디서든 접근 가능한 전역 객체야. (브라우저의 window 같은 느낌) [[5]](https://velog.io/@leejaylight/node의-내장-객체-global), [[7]](https://poiemaweb.com/js-global-object)
// as unknown as ... 는 TypeScript 문법인데, global 객체에 우리가 원하는 속성(prisma)이 없더라도
// 거기에 우리가 나중에 PrismaClient 인스턴스를 추가할 거라고 TypeScript에게 알려주는(?) 트릭이야.
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// 3. PrismaClient 인스턴스 생성 또는 재사용 로직 (핵심!)
// const prisma = ... 이 부분이 최종적으로 우리가 사용할 prisma 객체가 됨
// globalForPrisma.prisma 가 이미 존재하면? (전에 인스턴스를 만들어서 global에 넣어놨다면)
//     그걸 재사용해! (globalForPrisma.prisma)
// || (OR 연산자)
// globalForPrisma.prisma 가 없으면?
//     new PrismaClient() 를 호출해서 새로운 인스턴스를 만들어!
const prisma = globalForPrisma.prisma || new PrismaClient();

// 4. 개발 모드에서만 생성된 인스턴스를 global에 저장
// process.env.NODE_ENV 는 환경 변수로, 개발 모드면 'development', 프로덕션이면 'production' 등의 값을 가져.
// 개발 모드일 때만 ( !== 'production')
//     방금 만들었거나 재사용한 prisma 인스턴스를 globalForPrisma.prisma 에 저장해놔.
//     이렇게 해야 HMR로 이 파일이 다시 로드되어도 3번 라인에서 기존 global.prisma 를 찾아서 재사용할 수 있어. [[10]](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-multiple-prisma-client-instances-in-development)
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;

// 5. 최종적으로 사용될 싱글톤 prisma 인스턴스를 외부에 공개 (export)
export default prisma;
