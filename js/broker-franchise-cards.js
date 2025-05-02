document.addEventListener('DOMContentLoaded', function() {
    // 매물 제안 모달 제어
    const matchBtns = document.querySelectorAll('.match-property');
    const matchModal = document.getElementById('match-property-modal');
    const modalClose = matchModal.querySelector('.modal-close');
    const cancelBtn = matchModal.querySelector('.cancel-match');
    
    matchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 프랜차이즈 이름 가져오기
            const franchiseCard = this.closest('.franchise-condition-card');
            const franchiseName = franchiseCard.querySelector('h3').textContent;
            
            // 모달 제목 업데이트
            matchModal.querySelector('.modal-header h3').textContent = `매물 제안하기 - ${franchiseName}`;
            
            // 모달 표시
            matchModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
        });
    });
    
    function closeMatchModal() {
        matchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeMatchModal);
    cancelBtn.addEventListener('click', closeMatchModal);
    
    // 모달 외부 클릭 시 닫기
    matchModal.addEventListener('click', function(event) {
        if (event.target === matchModal) {
            closeMatchModal();
        }
    });
    
    // 매물 선택 시 매칭 점수 업데이트
    const selectProperty = document.getElementById('select-property');
    selectProperty.addEventListener('change', function() {
        if (!this.value) return;
        
        // 실제 구현에서는 API 호출로 매칭 점수 계산
        // 예시로 임의의 점수를 표시
        const matchScores = {
            '강남대로 123 상가 2층': {
                total: 87,
                location: 90,
                area: 85,
                rent: 75
            },
            '테헤란로 456 오피스텔 3층': {
                total: 72,
                location: 80,
                area: 65,
                rent: 60
            },
            '홍대입구역 5번 출구 상가': {
                total: 95,
                location: 98,
                area: 92,
                rent: 85
            }
        };
        
        const score = matchScores[this.value];
        if (score) {
            document.querySelector('.match-score').textContent = `${score.total}%`;
            document.querySelector('.match-details p').textContent = 
                `이 매물은 프랜차이즈의 조건과 ${score.total}% 일치합니다.`;
            
            // 각 항목 점수 업데이트
            const criteriaElements = document.querySelectorAll('.match-criterion');
            criteriaElements[0].querySelector('.progress-bar').style.width = `${score.location}%`;
            criteriaElements[0].querySelector('.criterion-value').textContent = `${score.location}%`;
            
            criteriaElements[1].querySelector('.progress-bar').style.width = `${score.area}%`;
            criteriaElements[1].querySelector('.criterion-value').textContent = `${score.area}%`;
            
            criteriaElements[2].querySelector('.progress-bar').style.width = `${score.rent}%`;
            criteriaElements[2].querySelector('.criterion-value').textContent = `${score.rent}%`;
        }
    });
    
    // 매칭 제안 폼 제출
    const matchForm = document.getElementById('match-property-form');
    matchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const property = document.getElementById('select-property').value;
        const message = document.getElementById('match-message').value;
        
        if (!property) {
            alert('제안할 매물을 선택해주세요.');
            return;
        }
        
        // 실제 구현에서는 API 호출로 데이터 전송
        console.log('매물 제안 정보:', { property, message });
        
        // 성공 시 아래 코드 실행
        alert('매물 제안이 성공적으로 전송되었습니다.');
        closeMatchModal();
        
        // 폼 초기화
        matchForm.reset();
    });
    
    // 상세보기 버튼 이벤트
    const detailBtns = document.querySelectorAll('.view-detail');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const franchiseCard = this.closest('.franchise-condition-card');
            const franchiseName = franchiseCard.querySelector('h3').textContent;
            
            alert(`${franchiseName}의 상세 정보 페이지로 이동합니다.`);
            // 실제 구현에서는 해당 페이지로 이동
        });
    });
});
