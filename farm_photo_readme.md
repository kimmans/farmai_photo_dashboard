# FarmAI - 딸기 농장 관리 앱 🍓

딸기 농장을 위한 AI 기반 농장 관리 및 모니터링 애플리케이션입니다.

## 📱 주요 기능

### 🌱 농장 관리
- **농장 정보 등록/수정**: 농장명, 위치 정보 관리
- **일일 촬영 미션**: 9개 부위별 사진 촬영 (과실, 잎, 화방, 병해충, 줄기, 배지, 온도계, 습도계, 와이드샷)
- **포인트 시스템**: 미션 완료 시 포인트 획득 (기본 500P, 보너스 X2/X3)

### 🤖 AI 컨설팅
- **실시간 AI 분석**: 촬영한 사진을 바탕으로 농장 관리 조언 제공
- **GPT-4o**: 과실과 병해충 사진을 분석하여 30자 이내 간단한 조언
- **팜AI 캐릭터**: 유머러스한 농장 인사말과 농담 제공

### 📊 미션 시스템
- **월별 캘린더**: 이번 달 미션 진행 상황 시각화
- **보상 시스템**: 5일, 10일, 15일, 20일, 25일, 30일 특별 보상
- **완료 추적**: 완료된 미션은 녹색으로 표시

## 🛠 기술 스택

### Frontend
- **Flutter**: 크로스 플랫폼 모바일 앱 개발
- **Dart**: 프로그래밍 언어

### Backend & Database
- **Supabase**: 
  - 사용자 인증 (Auth): 현재는 개발버전으로 완화된 규칙 적용용
  - 실시간 데이터베이스 (PostgreSQL)
  - 파일 스토리지 (Storage)

### AI & API
- **OpenAI GPT-4o**: AI 컨설팅 및 이미지 분석
- **HTTP**: API 통신

### 주요 패키지
```yaml
dependencies:
  flutter: sdk: flutter
  supabase_flutter: ^2.0.0
  image_picker: ^1.0.7
  intl: ^0.18.1
  http: ^1.1.0
```

## 📁 프로젝트 구조

```
lib/
├── main.dart                 # 앱 진입점 및 라우팅
├── gpt_prompt.dart          # OpenAI API 연동
├── screen/
│   ├── login_screen.dart    # 로그인/회원가입
│   ├── main_screen.dart     # 메인 화면 (캘린더, 포인트)
│   └── home_screen.dart     # 사진 촬영 화면
└── services/
    └── auth_service.dart    # 인증 서비스 (현재 미사용)
```

## 🚀 시작하기

### 필수 요구사항
- Flutter SDK 3.8.0 이상
- Android Studio / VS Code
- Supabase 계정
- OpenAI API 키

### 설치 및 실행

1. **저장소 클론**
```bash
git clone [repository-url]
cd farm_photo
```

2. **의존성 설치**
```bash
flutter pub get
```

3. **환경 설정**
   - `lib/main.dart`에서 Supabase URL과 API 키 설정
   - `lib/gpt_prompt.dart`에서 OpenAI API 키 설정

4. **앱 실행**
```bash
flutter run
```

## 🗄 데이터베이스 스키마

### Users 테이블
```sql
- id (UUID, Primary Key)
- name (Text)
- email (Text)
- phone (Text)
- point (Integer, Default: 0)
```

### Farms 테이블
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- name (Text)
- location (Text)
```

### Missions 테이블
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- farm_id (UUID, Foreign Key)
- date (Date)
- completed (Boolean)
- reward (Text, nullable)
- point (Integer)
```

### Mission_Photos 테이블
```sql
- id (UUID, Primary Key)
- mission_id (UUID, Foreign Key)
- part (Text)
- url (Text)
- uploaded_at (Timestamp)
```

## 🎨 UI/UX 특징

- **친근한 디자인**: 농장 테마의 초록색 계열 색상
- **직관적인 네비게이션**: 탭 기반 화면 전환
- **반응형 레이아웃**: 다양한 화면 크기 지원
- **로딩 상태 표시**: 사용자 경험 향상

## 🔧 개발 환경 설정

### Supabase 설정
1. Supabase 프로젝트 생성
2. 데이터베이스 테이블 생성
3. Storage 버킷 설정 (photos)
4. RLS (Row Level Security) 정책 설정

### OpenAI 설정
1. OpenAI API 키 발급
2. Vision API 사용 권한 확인
3. API 사용량 모니터링

## 📱 지원 플랫폼

- Android (API 21 이상)
- iOS (iOS 11.0 이상)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**FarmAI** - 딸기 농장의 스마트한 관리 파트너 🍓✨
