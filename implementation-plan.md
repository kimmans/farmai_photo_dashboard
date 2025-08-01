# FarmAI Dashboard 구현 계획 📋

Vue.js 기반의 FarmAI 대시보드 구현을 위한 단계별 작업 순서입니다.

## 🎯 구현 목표

농장에서 올라오는 사진들을 직관적이고 효율적으로 볼 수 있는 관리자/사용자 대시보드 구현

## 📋 구현 순서

### 1단계: 프로젝트 초기 설정
- [ ] **Vue.js 프로젝트 생성**
  - Vite + Vue.js 3 + TypeScript 템플릿으로 프로젝트 생성
  - 기본 의존성 설치 (Vue Router, Pinia, Tailwind CSS)
  - ESLint, Prettier 설정

- [ ] **환경 변수 설정**
  - `.env.local` 파일 생성
  - Supabase URL과 API 키 설정
  - 환경 변수 타입 정의

- [ ] **기본 프로젝트 구조 생성**
  - 폴더 구조 생성 (src/router, src/stores, src/components 등)
  - 기본 라우터 설정
  - 기본 레이아웃 컴포넌트

### 2단계: Supabase 연동
- [ ] **Supabase 클라이언트 설정**
  - `@supabase/supabase-js` 설치
  - Supabase 클라이언트 초기화
  - 타입 정의 생성 (Database 타입)

- [ ] **인증 시스템 구현**
  - 로그인/로그아웃 기능
  - 사용자 권한 관리
  - 보호된 라우트 설정
  - 인증 상태 관리 (Pinia Store)

### 3단계: 기본 레이아웃 및 네비게이션
- [ ] **레이아웃 컴포넌트**
  - Header 컴포넌트 (로고, 사용자 정보, 테마 토글)
  - Sidebar 컴포넌트 (네비게이션 메뉴)
  - Footer 컴포넌트
  - 반응형 디자인 적용

- [ ] **라우터 설정**
  - 메인 페이지들 라우팅 설정
  - 네비게이션 메뉴 구성
  - 라우트 가드 설정

### 4단계: 데이터 관리 (Pinia Store)
- [ ] **사용자 데이터 Store**
  - 사용자 목록 조회
  - 사용자 상세 정보
  - 사용자 통계 데이터

- [ ] **농장 데이터 Store**
  - 농장 목록 조회
  - 농장별 사진 통계
  - 농장 상세 정보

- [ ] **사진 데이터 Store**
  - 사진 목록 조회
  - 필터링 및 검색 기능
  - 사진 상세 정보

- [ ] **미션 데이터 Store**
  - 미션 현황 조회
  - 포인트 관리
  - 미션 통계

### 5단계: 메인 대시보드
- [ ] **통계 카드 컴포넌트**
  - 사용자 수, 농장 수, 총 포인트 표시
  - 실시간 데이터 업데이트
  - 애니메이션 효과

- [ ] **차트 컴포넌트**
  - 월별 사용자 증가율
  - 미션 완료율 차트
  - 사진 업로드 현황 차트
  - 지난 7일간 일별 미션에 참여하지 않은 유저를 보여주는 화면

### 6단계: 사진 관리 (핵심 기능) ⭐
- [ ] **사진 타임라인 뷰**
  - 캘린더 형태의 날짜별 사진 표시
  - 미션 완료일별 사진 그룹화
  - 타임라인 네비게이션


- [ ] **사진 필터 및 검색**
  - 날짜, 농장, 부위별 필터링
  - 실시간 검색 기능
  - 필터 조건 저장

- [ ] **사진 상세 뷰**
  - 라이트박스 기능
  - AI 분석 기능 추가(gpt-4o api 활용:사진 선택 후 ai 분석 버튼 누를 때)
  - 사진 메타데이터 표시

- [ ] **사진 비교 기능**
  - 같은 부위의 다른 날짜 사진 비교
  - 드래그 앤 드롭 기능
  - 병치 비교 뷰

### 7단계: 사용자 및 농장 관리
- [ ] **사용자 관리 페이지**
  - 사용자 목록 및 상세 정보
  - 포인트 관리 기능
  - 사용자 통계

- [ ] **농장 관리 페이지**
  - 농장별 정보 및 통계
  - 농장별 사진 현황
  - 농장별 미션 현황

### 8단계: 미션 관리
- [ ] **미션 현황 페이지**
  - 사용자별 미션 완료 상황
  - 보상 시스템 관리
  - 미션 통계 및 분석

### 9단계: UI/UX 개선
- [ ] **반응형 디자인 최적화**
  - 모바일, 태블릿, 데스크톱 지원
  - 모던하고 세련된 디자인


- [ ] **로딩 상태 및 에러 처리**
  - 스켈레톤 로딩
  - 에러 바운더리
  - 사용자 친화적 에러 메시지

- [ ] **성능 최적화**
  - 이미지 지연 로딩
  - 가상 스크롤링
  - 캐싱 전략

### 10단계: 배포 준비
- [ ] **빌드 최적화**
  - 번들 크기 최적화
  - 이미지 압축
  - 코드 스플리팅

- [ ] **환경 변수 설정**
  - 프로덕션 환경 변수
  - CI/CD 설정

- [ ] **배포 설정**
  - Vercel/Netlify 배포 설정
  - 자동 배포 파이프라인

## 🎯 우선순위

### 1순위 (핵심 기능) ⭐
- 1-4단계: 프로젝트 초기 설정 및 기본 구조
- 6단계: 사진 관리 (가장 중요한 기능)

### 2순위 (관리 기능)
- 5단계: 메인 대시보드
- 7-8단계: 사용자/농장/미션 관리

### 3순위 (완성도)
- 9-10단계: UI/UX 개선 및 배포

## 📝 진행 상황 체크리스트

### 현재 단계: 1단계 - 프로젝트 초기 설정
- [ ] Vue.js 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 기본 프로젝트 구조 생성

### 다음 단계: 2단계 - Supabase 연동
- [ ] Supabase 클라이언트 설정
- [ ] 인증 시스템 구현

## 🔧 기술 스택

- **Frontend**: Vue.js 3 + TypeScript + Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel/Netlify

## 📞 참고 사항

- 각 단계 완료 후 커밋 및 푸시
- 단계별 테스트 진행
- 코드 리뷰 및 리팩토링
- 문서 업데이트

---

**마지막 업데이트**: 2024년 현재
**진행 상황**: 1단계 시작 예정 