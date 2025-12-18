
// // DOM이 완전히 로드된 후 실행
//   document.addEventListener('DOMContentLoaded', function() {
    
//     // 1. 사이드 메뉴 내의 모든 링크(a)들을 선택
//     const sideMenuLinks = document.querySelectorAll('.side_menu .list_sitemenu a');
    
//     sideMenuLinks.forEach(function(link) {
//       link.addEventListener('click', function(e) {

//         if (window.innerWidth > 600) return;

//         // 2. 해당 페이지 내에 있는 '닫기 버튼'을 찾음
//         // 보통 .btn_close 또는 ._sideMenuClose 클래스를 사용함
//         const closeBtn = document.querySelector('.side_menu .btn_close') || 
//                          document.querySelector('._sideMenuClose');
        
//         if (closeBtn) {
//           // 3. 링크 클릭 시 닫기 버튼을 프로그램적으로 클릭함
//           closeBtn.click();
//         }
        
//         // 참고: 만약 같은 페이지 내 앵커 이동(#)이라면 
//         // 닫히는 애니메이션 시간을 위해 약간의 지연을 줄 수도 있습니다.
//       });
//     });
//   });

  document.addEventListener('DOMContentLoaded', function() {
    const allMenuLinks = document.querySelectorAll('.side_menu a');
    
    allMenuLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        
        if (window.innerWidth > 600) return;

        // data-role="toggleSubMenu" 속성이 있는지 확인 (진료과목 등 대메뉴)
        const isParentMenu = this.getAttribute('data-role') === 'toggleSubMenu';
        
        if (isParentMenu) {
          /* --- [A] 대메뉴(진료과목) 클릭 시 --- */
          e.preventDefault(); // 1. 페이지 이동 방지
          
          // 2. 부모 <li> 요소에 'is_open' 클래스를 토글 (넣었다 뺐다 함)
          const parentLi = this.closest('li');
          parentLi.classList.toggle('is_open');
          
          console.log('대메뉴 토글됨');

        } else {
          /* --- [B] 실제 세부 메뉴 클릭 시 --- */
          if (window.innerWidth <= 768) {
            const closeBtn = document.querySelector('.side_menu .btn_close') || 
                             document.querySelector('._sideMenuClose');
            if (closeBtn) {
              closeBtn.click(); // 사이드바 닫기
            }
          }
        }
      });
    });
  });
</script>
