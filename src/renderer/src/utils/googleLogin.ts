import { chromium, Browser, Page } from 'playwright';

// Google 로그인을 위한 함수
export async function googleLogin(email: string, password: string) {
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: false }); // 브라우저를 헤드리스 모드가 아닌 일반 모드로 실행
    const page: Page = await browser.newPage(); // 새 페이지 생성

    // 구글 로그인 페이지로 이동
    await page.goto('https://accounts.google.com/');

    // 이메일 입력 필드에 이메일 주소 입력
    await page.type('input[type="email"]', email);
    await page.click('button[type="button"]'); // 다음 버튼 클릭

    // 패스워드 입력 필드에 비밀번호 입력
    await page.waitForSelector('input[type="password"]', { state: 'visible' });
    await page.type('input[type="password"]', password);
    await page.click('button[type="button"]'); // 로그인 버튼 클릭

    // 추가적인 처리를 위해 페이지 로드 완료 대기
    await page.waitForLoadState('networkidle');
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
  } finally {
    if (browser) {
      await browser.close(); // 브라우저 닫기
    }
  }
}

// 함수 사용 예시
googleLogin('your-email@gmail.com', 'your-password');
