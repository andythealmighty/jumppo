document.addEventListener('DOMContentLoaded', function() {
    // 예시 프롬프트 클릭 시 입력창에 추가
    const examplePrompts = document.querySelectorAll('.example-prompt');
    const aiTextarea = document.getElementById('ai-query');
    
    examplePrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            aiTextarea.value = this.textContent;
            aiTextarea.focus();
        });
    });
    
    // 히스토리 항목 로드
    const historyLoadBtns = document.querySelectorAll('.btn-history-load');
    historyLoadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const historyItem = this.closest('.history-item');
            const queryText = historyItem.querySelector('.history-query').textContent;
            aiTextarea.value = queryText;
            aiTextarea.focus();
        });
    });
    
    // 고급 옵션 토글
    const optionsHeader = document.querySelector('.options-header');
    if (optionsHeader) {
        optionsHeader.addEventListener('click', function() {
            const options = this.closest('.ai-advanced-options');
            options.classList.toggle('expanded');
        });
    }
    
    // AI 매칭 설명 토글
    const explanationHeader = document.querySelector('.explanation-header');
    if (explanationHeader) {
        explanationHeader.addEventListener('click', function() {
            const explanation = this.closest('.matching-explanation');
            explanation.classList.toggle('expanded');
        });
    }
    
    // AI 매칭 시작 버튼
    const aiSearchBtn = document.querySelector('.btn-ai-search');
    if (aiSearchBtn) {
        aiSearchBtn.addEventListener('click', function() {
            const query = aiTextarea.value.trim();
            if (query) {
                // 로딩 UI 표시
                document.querySelector('.results-loading').style.display = 'flex';
                document.querySelector('.results-content').style.display = 'none';
                
                // 실제 구현에서는 API 호출
                console.log('AI 매칭 실행:', query);
                
                // 3초 후 결과 표시 (데모용)
                setTimeout(() => {
                    document.querySelector('.results-loading').style.display = 'none';
                    document.querySelector('.results-content').style.display = 'block';
                    
                    // 결과 요약에 쿼리 표시
                    const highlightEl = document.querySelector('.results-summary .highlight');
                    if (highlightEl) {
                        const shortQuery = query.length > 30 ? query.substring(0, 30) + '...' : query;
                        highlightEl.textContent = shortQuery;
                    }
                    
                    // 설명 섹션 초기 상태 설정
                    const explanationEl = document.querySelector('.matching-explanation');
                    if (explanationEl) explanationEl.classList.add('expanded');
                    
                    // 페이지 스크롤
                    document.querySelector('.ai-results-section').scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            } else {
                alert('매물 조건을 입력해주세요.');
                aiTextarea.focus();
            }
        });
    }
    
    // 더 많은 매물 보기 버튼
    const showMoreBtn = document.querySelector('.btn-show-more');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            // 실제 구현에서는 추가 매물 로드 후 표시
            alert('추가 매물 로드 기능은 준비 중입니다.');
        });
    }
});
