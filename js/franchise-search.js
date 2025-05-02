document.addEventListener('DOMContentLoaded', function() {
    // 결과 뷰 토글
    const viewOptions = document.querySelectorAll('.view-option');
    const resultViews = document.querySelectorAll('.results-view');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // 버튼 활성화
            viewOptions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 뷰 전환
            resultViews.forEach(view => view.classList.remove('active'));
            document.querySelector(`.${viewType}-view`).classList.add('active');
        });
    });
    
    // 필터 리셋 버튼
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const filterForm = document.querySelector('.filter-form');
            if (filterForm) filterForm.reset();
        });
    }
    
    // 페이지네이션
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('i')) {
                pageBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 여기서 실제 페이지 변경 로직 구현
                console.log('페이지 변경:', this.textContent);
            }
        });
    });
    
    // 매물 카드 관심 등록
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
            }
        });
    });
});
