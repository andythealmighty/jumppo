document.addEventListener('DOMContentLoaded', function() {
    // 차트 및 그래프를 위한 설정
    initCharts();
    
    // 대시보드 데이터 로드
    loadDashboardData();
    
    // 조건 카드 스와이프 기능
    initConditionCards();
    
    // 매물 지도 초기화
    initPropertyMap();
    
    // 탭 전환 기능
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchPanels = document.querySelectorAll('.search-panel');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 활성 탭 변경
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 해당 패널 표시
            const targetPanel = this.dataset.tab;
            searchPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(targetPanel).classList.add('active');
        });
    });
    
    // 예시 프롬프트 클릭 시 입력창에 추가
    const examplePrompts = document.querySelectorAll('.example-prompt');
    const aiTextarea = document.getElementById('ai-query');
    
    examplePrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            aiTextarea.value = this.textContent;
            aiTextarea.focus();
        });
    });
    
    // 검색 버튼 클릭 이벤트
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            console.log('필터 검색 실행');
            // 실제 구현에서는 필터 값을 수집하여 API 호출
            showSearchResults();
        });
    }
    
    // AI 매칭 버튼 클릭 이벤트
    const aiSearchButton = document.querySelector('.btn-ai-search');
    if (aiSearchButton) {
        aiSearchButton.addEventListener('click', function() {
            const query = aiTextarea.value.trim();
            if (query) {
                console.log('AI 매칭 실행:', query);
                // 실제 구현에서는 AI 매칭 API 호출
                showSearchResults();
                
                // 로딩 표시 예시
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 매칭 중...';
                this.disabled = true;
                
                // 3초 후 원래 상태로 복구 (데모용)
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-magic"></i> AI 매칭 시작';
                    this.disabled = false;
                }, 3000);
            } else {
                alert('매물 조건을 입력해주세요.');
                aiTextarea.focus();
            }
        });
    }
    
    // 검색 결과 표시 함수
    function showSearchResults() {
        const resultsSection = document.querySelector('.search-results-section');
        const analysisSection = document.querySelector('.market-analysis-section');
        
        if (resultsSection && analysisSection) {
            resultsSection.style.display = 'block';
            analysisSection.style.display = 'block';
            
            // 스크롤 애니메이션
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // 지도 마커 클릭 이벤트
    const mapMarkers = document.querySelectorAll('.map-marker');
    const propertyCards = document.querySelectorAll('.property-card');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const propertyId = this.dataset.propertyId;
            
            // 해당 매물 카드 하이라이트
            propertyCards.forEach(card => {
                card.classList.remove('highlighted');
                if (card.dataset.propertyId === propertyId) {
                    card.classList.add('highlighted');
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    });
    
    // 기본적으로 검색 결과 섹션 숨기기 (초기 상태)
    const initialResults = document.querySelector('.search-results-section');
    const initialAnalysis = document.querySelector('.market-analysis-section');
    
    if (initialResults && initialAnalysis) {
        initialResults.style.display = 'none';
        initialAnalysis.style.display = 'none';
    }
});

function initCharts() {
    // 차트 라이브러리가 있다면 여기서 초기화
    console.log('차트 초기화됨');
}

function loadDashboardData() {
    // 더미 데이터 로드
    const viewedProperties = generateDummyData('property', 152);
    const matchedInterests = generateDummyData('match', 36);
    const completedTours = generateDummyData('tour', 18);
    const signedContracts = generateDummyData('contract', 7);
    
    console.log('대시보드 데이터 로드됨', {
        viewedProperties,
        matchedInterests,
        completedTours,
        signedContracts
    });
    
    // 실제 구현에서는 API를 통해 데이터를 가져올 수 있음
}

function initConditionCards() {
    // 조건 카드 상호작용 기능
    const conditionCards = document.querySelectorAll('.condition-card');
    
    conditionCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('조건 카드 클릭됨:', this);
            // 여기서 카드 선택/세부정보 보기 등의 기능 구현
        });
    });
}

function initPropertyMap() {
    // 지도 초기화 (실제로는 Google Maps나 Kakao Maps 등 사용)
    console.log('지도 초기화됨');
    
    // 더미 위치 데이터
    const locations = [
        { lat: 37.5665, lng: 126.9780, title: '서울역', type: 'commercial' },
        { lat: 37.5286, lng: 127.0329, title: '강남역', type: 'office' },
        { lat: 37.5566, lng: 126.9240, title: '홍대입구역', type: 'retail' },
        { lat: 37.4954, lng: 127.0276, title: '판교역', type: 'office' }
    ];
    
    console.log('지도에 표시될 위치:', locations);
}

// 조건 카드 드래그앤드롭 기능
function initDragAndDrop() {
    const conditionCards = document.querySelectorAll('.condition-card');
    
    conditionCards.forEach(card => {
        card.setAttribute('draggable', 'true');
        
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.id);
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    });
    
    const cardContainers = document.querySelectorAll('.condition-cards');
    
    cardContainers.forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(container, e.clientY);
            
            if (afterElement) {
                container.insertBefore(draggingCard, afterElement);
            } else {
                container.appendChild(draggingCard);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.condition-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 알림 시스템 추가
function initNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    const notifications = [
        { 
            title: '새로운 매물 알림', 
            message: '설정하신 조건에 맞는 3개의 신규 매물이 등록되었습니다.', 
            time: '10분 전',
            read: false
        },
        { 
            title: '투어 일정 변경', 
            message: '강남역 인근 카페 매물 투어 일정이 변경되었습니다.', 
            time: '1시간 전',
            read: false
        },
        { 
            title: '계약서 서명 요청', 
            message: '홍대입구역 매물 계약서 서명이 필요합니다.', 
            time: '3시간 전',
            read: true
        }
    ];
    
    if (notificationsList) {
        notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            
            item.innerHTML = `
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${notification.time}</span>
                </div>
                <button class="btn-mark-read" aria-label="읽음 표시">
                    <i class="fas fa-check"></i>
                </button>
            `;
            
            notificationsList.appendChild(item);
        });
        
        // 읽음 표시 버튼 이벤트
        const readButtons = document.querySelectorAll('.btn-mark-read');
        readButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.notification-item').classList.add('read');
                this.closest('.notification-item').classList.remove('unread');
                
                // 읽지 않은 알림 수 업데이트
                updateUnreadNotificationCount();
            });
        });
    }
    
    updateUnreadNotificationCount();
}

function updateUnreadNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}
