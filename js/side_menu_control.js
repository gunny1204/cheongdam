
document.addEventListener("DOMContentLoaded", function () {
    // 사이드 메뉴 내부의 모든 링크 선택
    const sideMenuLinks = document.querySelectorAll('.area_side_menu .list_navbar a');

    // 네이버 모두(modoo!) 닫기 버튼 요소
    const closeBtn = document.querySelector('.btn_side_menu_close');

    sideMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            // 1. 닫기 버튼이 있다면 강제 클릭 트리거
            if (closeBtn) {
                setTimeout(() => {
                    closeBtn.click();
                }, 100);
            }

            // 2. 클래스 직접 제거 (더 확실한 방법)
            document.body.classList.remove('side_menu_open');

            // 3. 오버레이(배경) 및 사이드바 숨김 처리
            const sideMenuOverlay = document.querySelector('.aside_area');
            if (sideMenuOverlay) {
                // 부드럽게 닫히도록 스타일 조절 가능
                sideMenuOverlay.style.display = 'none';
            }
        });
    });
});
