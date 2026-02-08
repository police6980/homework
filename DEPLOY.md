# GitHub + Replit 배포 가이드

**GitHub**는 코드를 저장하는 창고이고, **Replit**은 그 코드를 가져와서 실행(호스팅)하는 공장입니다. 두 개를 연결하는 것이 가장 안정적이고 쉽습니다.

## 1단계: GitHub에 코드 올리기

1.  **GitHub 저장소 생성**:
    - 이미 생성하셨습니다: [https://github.com/police6980/homework](https://github.com/police6980/homework)

2.  **코드를 GitHub로 전송 (터미널 명령어)**:
    - VS Code나 터미널에서 프로젝트 폴더를 엽니다.
    - **수정사항이 생길 때마다 아래 3줄만 입력하면 됩니다:**

    ```bash
    git add .
    git commit -m "수정 내용 메모"
    git push
    ```

## 2단계: Replit에서 가져오기 (처음 한 번만)

1.  [Replit](https://replit.com/) 로그인.
2.  좌측 상단 `+ Create Repl` 클릭.
3.  우측 상단 **Import from GitHub** 버튼 클릭.
4.  저장소 주소 입력: `https://github.com/police6980/homework`
5.  **Language**: `Node.js`가 자동으로 선택됩니다. `Import from GitHub` 버튼 클릭.

## 3단계: 실행 및 확인

1.  Replit이 코드를 불러오고 패키지를 설치할 때까지 기다립니다.
2.  상단 중앙 **Run** 버튼 클릭.
3.  콘솔에 "Server running..."이 뜨면 성공!
4.  우측 화면(Webview)에 앱이 보입니다. 주소를 복사해서 사용하세요.

---

## 🔄 앱 업데이트 방법 (코드를 수정했을 때)

Replit에 파일을 다시 올릴 필요가 없습니다! **버튼 클릭 한 번이면 됩니다.**

1.  내 컴퓨터에서 코드를 수정하고 GitHub에 올린다 (`git push`).
2.  **Replit 화면**으로 이동한다.
3.  좌측 메뉴에서 **Gi** (Git 아이콘)을 클릭한다.
4.  **Pull** 버튼을 클릭한다. (GitHub의 최신 코드를 당겨옵니다)
5.  업데이트가 완료되면 다시 **Stop** 후 **Run**을 눌러 재시작한다.
