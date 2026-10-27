# 데이터베이스 복원 가이드

## 개요

코드베이스 분석을 통해 `todo_v2` 스키마와 테이블 구조를 복원했습니다.

## 사용 방법

### 1. MySQL 접속 후 스크립트 실행

```bash
# 로컬 MySQL
mysql -u root -p < bEnd/quary/db-restore.sql

# 또는 MySQL 클라이언트에서
mysql -u scoda -p -h todo-db.cj244aokeu4x.ap-northeast-2.rds.amazonaws.com < bEnd/quary/db-restore.sql
```

### 2. Workbench 등 GUI에서 실행

`db-restore.sql` 파일을 열고 전체 스크립트를 실행합니다.

---

## 복원된 테이블 구조

### `users` 테이블

| 컬럼       | 타입         | 제약조건                  | 설명                   |
| ---------- | ------------ | ------------------------- | ---------------------- |
| id         | INT          | PK, AUTO_INCREMENT        | 기본키                 |
| username   | VARCHAR(20)  | NOT NULL                  | 사용자 실명            |
| nickname   | VARCHAR(20)  | UNIQUE, NOT NULL          | 닉네임                 |
| userId     | VARCHAR(10)  | UNIQUE, NOT NULL          | 로그인 ID              |
| password   | VARCHAR(255) | NOT NULL                  | 비밀번호               |
| email      | VARCHAR(255) | UNIQUE, NOT NULL          | 이메일 (Google 로그인) |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | 생성일시               |
| updated_at | TIMESTAMP    | ON UPDATE                 | 수정일시               |

**참조 파일:** `routes/user.js`, `routes/getUser.js`, `routes/userLogIO.js`

### `tasks` 테이블

| 컬럼       | 타입         | 제약조건           | 설명             |
| ---------- | ------------ | ------------------ | ---------------- |
| id         | INT          | PK, AUTO_INCREMENT | 기본키           |
| subject    | VARCHAR(100) | NOT NULL           | 태스크 제목      |
| memo       | TEXT         | NULL               | 태스크 메모      |
| userId     | VARCHAR(10)  | FK → users.userId  | 소유자 (CASCADE) |
| done       | TINYINT(1)   | DEFAULT 0          | 완료여부 (0/1)   |
| created_at | TIMESTAMP    | DEFAULT            | 생성일시         |
| updated_at | TIMESTAMP    | ON UPDATE          | 수정일시         |

**참조 파일:** `routes/task.js`

---

## 기존 스키마와의 변경사항

| 항목           | 기존 (test copy.erd.sql) | 복원본                       |
| -------------- | ------------------------ | ---------------------------- |
| tasks.userId   | UNIQUE (1:N 불가)        | INDEX만 (1:N 허용)           |
| tasks.done     | 없음                     | 추가 (doneTask API용)        |
| users.password | VARCHAR(10)              | VARCHAR(255) (해시 저장)     |
| users.email    | VARCHAR(35)              | VARCHAR(255) (Google 이메일) |
| charset        | utf8mb3                  | utf8mb4                      |

---

## 동시에 수정한 코드

1. **task.js** - `WHERE Id` → `WHERE id` (컬럼명 일치)
2. **index.js** - `/userSignup`의 `name` → `username` (스키마 일치, `name` 폴백 유지)

---

## 연결 설정

`.env` 파일의 `DB_NAME=todo_v2`와 `config/db.js`의 DB 연결 정보를 확인하세요.

```javascript
// DB: todo_v2
// Host: .env의 DB_HOST
```

RDS/AWS 사용 시 보안 그룹과 접근 권한을 확인하세요.
