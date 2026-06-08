# K-Beauty 라오스 쇼핑몰 (UI 프로토타입)

한국 ↔ 라오스 양국간 뷰티 직거래 쇼핑몰의 화면 구성 프로토타입입니다.

## 🚀 외부에서 바로 실행 / 보기

### 1) Vercel 원클릭 배포 (영구 공유 URL)

아래 버튼을 누르면 본인 Vercel 계정으로 자동 배포되어 `https://kr-laos-shop-xxx.vercel.app` 형태의 영구 URL이 생성됩니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkkangmok700%2Fkr-laos-shop)

### 2) GitHub Codespaces (브라우저에서 즉시 실행)

GitHub에서 `Code` → `Codespaces` → `Create codespace on main` 클릭 → 자동으로 VS Code 환경이 브라우저에서 열림 → 터미널에서:

```bash
npm install
npm run dev
```

→ 포트 3000 자동 포워딩 → 외부 접속 가능한 URL 생성

### 3) 로컬에서 실행

```bash
git clone https://github.com/kkangmok700/kr-laos-shop.git
cd kr-laos-shop
npm install
npm run dev
```

http://localhost:3000

---

## 📱 구성된 화면

| 경로 | 화면 |
|---|---|
| `/` | **홈** — 배너, 카테고리, 베스트셀러, 신상품 |
| `/product/[id]` | **상품 상세** — 갤러리, 옵션, 리뷰, 탭 정보 |
| `/cart` | **장바구니** — 선택/수량/삭제, 무료배송 안내, 합계 |
| `/checkout` | **결제** — 라오스 배송지, 결제수단 3종, 주문완료 |

## ✨ 핵심 기능

- 🌐 **한국어 ↔ 라오스어** 실시간 전환 토글
- 💱 **KRW ↔ LAK** 통화 자동 환산
- 💄 **뷰티 상품 8종** 샘플 데이터 (스킨케어/메이크업/마스크팩/향수/헤어/바디)
- 📱 데스크톱/모바일 반응형
- 🛒 zustand로 장바구니 상태 유지 (localStorage)

## 🛠 기술 스택

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui 스타일
- zustand (상태 관리)
- lucide-react (아이콘)

## 🗺 향후 추가 예정

- 로그인 / 회원가입
- 마이페이지 / 주문 조회 / 배송 추적
- 판매자 관리자 화면
- 실제 결제 연동 (KakaoPay, BCEL One)
- 데이터베이스 연동 (상품/주문/회원)
