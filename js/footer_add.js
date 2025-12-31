
$(function () {
    $("#footer-placeholder").load("footer.html");
    $("#reserveModal-placeholder").load("reserveModal.html");
});


(function() {
    // 페이지 로드 시 '빠른 예약' 버튼의 모든 기본 연결을 끊어버립니다.
    window.addEventListener("load", function() {
      const reserveBtn = document.getElementById('quickReserve');
      if (reserveBtn) {
        // 1. HTML에 적힌 tel: 링크가 시스템에 의해 가로채지는 것을 방지하기 위해 
        // 클릭 이벤트를 '최우선 순위(Capturing)'로 가로챕니다.
        reserveBtn.addEventListener('click', function(e) {
          
          if (window.innerWidth > 768) {
            // PC 환경: 시스템 팝업 차단 및 우리 팝업 열기
            e.preventDefault();
            e.stopImmediatePropagation(); // 다른 모든 스크립트(modoo 포함) 중단
            openReserveModal();
          } else {
            // 모바일 환경: 시스템 팝업이 뜨기 전에 '강제로' 전화걸기 실행
            // 시스템이 팝업을 띄울 틈을 주지 않고 바로 주소창을 바꿉니다.
            e.stopImmediatePropagation();
            window.location.href = "tel:02-512-2955";
          }
        }, true); // true 설정이 modoo 시스템보다 먼저 실행되게 합니다.
      }
    });
  })();

  // 팝업 함수들은 기존과 동일하게 유지
  function openReserveModal() {
    const modal = document.getElementById('reserveModal');
    if(modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReserveModal() {
    const modal = document.getElementById('reserveModal');
    if(modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }