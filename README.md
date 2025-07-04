# lolipigeon
Site host

# 🕊️ pigeon's space

Rhythm Game Player & Developer의 개인 웹사이트입니다.

## Features
- 음악 플레이어
- 별 배경 효과
- 타이핑 애니메이션
- 패럴랙스 스크롤
- 간단한 마우스 파티클
- 슈팅스타 효과

## ✨ Features

- 🎵 **YouTube 기반 음악 플레이어** - 재생목록, 진행바, 볼륨 조절
- ⭐ **인터랙티브 별자리 배경** - 개수 조절 가능, 유성 효과
- 🎮 **실시간 CHUNITHM 스코어 위젯** - API 연동으로 실시간 데이터 표시
- 📱 **반응형 디자인** - 모바일/데스크톱 최적화
- 💬 **Discord ID 복사** - 원클릭 복사 기능

## 🚀 CHUNITHM API 연동

### 1. 프록시 서버 설정

```bash
# 의존성 설치
npm install

# 프록시 서버 실행
npm start
```

### 2. API 엔드포인트

- `GET /api/chunithm/{username}` - 사용자 프로필 정보
- `GET /health` - 서버 상태 확인
- `GET /cache/status` - 캐시 상태 확인
- `DELETE /cache/clear` - 캐시 클리어

### 3. 캐싱 시스템

- **캐시 시간**: 5분
- **자동 갱신**: 5분마다 자동 새로고침
- **에러 처리**: API 실패 시 더미 데이터 표시

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **API**: CHUNITHM API (chuni.xitora.cc)
- **Deployment**: GitHub Pages

## 📁 프로젝트 구조

```
lolipigeon/
├── index.html          # 메인 페이지
├── styles.css          # 스타일시트
├── stars.js            # 별자리 애니메이션
├── music-player.js     # 음악 플레이어
├── chunithm-widget.js  # CHUNITHM 위젯
├── proxy-server.js     # API 프록시 서버
├── package.json        # Node.js 의존성
├── songs.json          # 음악 재생목록
└── README.md           # 프로젝트 문서
```

## 🎮 CHUNITHM 위젯 기능

- **실시간 레이팅 표시**
- **목표 레이팅 진행률**
- **최근 스코어 목록** (SSS+, SSS 등급)
- **통계 정보** (총 플레이 수, 월간 플레이 수)
- **자동 새로고침** (5분마다)
- **수동 새로고침 버튼**

## 🎵 음악 플레이어 기능

- **YouTube 기반 재생**
- **재생목록 관리**
- **진행바 및 시간 표시**
- **볼륨 조절**
- **자동 재생**

## 🌟 별자리 배경 기능

- **동적 별 생성**
- **유성 효과**
- **별 개수 조절** (50-2000개)
- **반응형 애니메이션**

## 🔧 개발 환경 설정

### 로컬 개발

```bash
# 1. 저장소 클론
git clone https://github.com/pigeo-on2/lolipigeon.git
cd lolipigeon

# 2. 의존성 설치
npm install

# 3. 프록시 서버 실행 (터미널 1)
npm start

# 4. 웹 서버 실행 (터미널 2)
python -m http.server 8000

# 5. 브라우저에서 확인
# http://localhost:8000
```

### 프로덕션 배포

```bash
# GitHub Pages에 자동 배포
git push origin main
```

## 📊 API 응답 예시

```json
{
  "username": "lolipigeon",
  "rating": 15.23,
  "maxRating": 15.50,
  "recentScores": [
    {
      "song": "Aether Crest: Celestial",
      "score": 100.5,
      "level": 15,
      "grade": "SSS+",
      "playDate": "2024-01-15"
    }
  ],
  "totalPlays": 1247,
  "thisMonthPlays": 89
}
```

## 🔒 보안 고려사항

- **CORS 설정**: 허용된 도메인만 접근 가능
- **요청 제한**: 캐싱으로 API 호출 최소화
- **에러 처리**: API 실패 시 폴백 데이터 사용
- **HTTPS**: 프로덕션 환경에서 HTTPS 사용

## 🚀 성능 최적화

- **캐싱**: 5분간 API 응답 캐시
- **압축**: 정적 파일 압축
- **CDN**: GitHub Pages CDN 활용
- **이미지 최적화**: WebP 포맷 사용

## 📝 라이선스

MIT License

## 🤝 기여

Pull Request와 Issue를 환영합니다!

---

**pigeon** - Rhythm Game Player & Developer 🕊️

## Features
- 음악 플레이어
- 별 배경 효과
- 타이핑 애니메이션
- 패럴랙스 스크롤
