document.addEventListener('DOMContentLoaded', function() {
    // 차트 및 그래프를 위한 설정
    initBrokerCharts();
    
    // 대시보드 데이터 로드
    loadBrokerData();
    
    // 매물 관리 기능
    initPropertyManagement();
    
    // 프랜차이즈 카드 이벤트
    initFranchiseCards();
});

function initBrokerCharts() {
    // 브로커 대시보드 차트 초기화
    console.log('브로커 차트 초기화됨');
    
    // 품질 점수 차트 업데이트
    updateQualityChart({
        overall: 78,
        photoQuality: 85,
        infoCompleteness: 92,
        pricingTransparency: 70,
        responseTime: 65
    });
}

function updateQualityChart(data) {
    // 품질 점수 차트 업데이트
    const qualityItems = document.querySelectorAll('.quality-progress');
    
    if (qualityItems.length >= 4) {
        qualityItems[0].style.width = `${data.photoQuality}%`;
        qualityItems[1].style.width = `${data.infoCompleteness}%`;
        qualityItems[2].style.width = `${data.pricingTransparency}%`;
        qualityItems[3].style.width = `${data.responseTime}%`;
    }
    
    // 원형 차트 업데이트 (CSS conic-gradient)
    const chartCircle = document.querySelector('.chart-circle');
    if (chartCircle) {
        chartCircle.style.background = `conic-gradient(#3498db 0% ${data.overall}%, #f1f1f1 ${data.overall}% 100%)`;
    }
    
    const percentageElement = document.querySelector('.chart-percentage');
    if (percentageElement) {
        percentageElement.textContent = `${data.overall}%`;
    }
}

function loadBrokerData() {
    // 더미 데이터 로드
    const listedProperties = generateDummyData('property', 28);
    const propertyViews = generateDummyData('view', 324);
    const completedTours = generateDummyData('tour', 12);
    const signedContracts = generateDummyData('contract', 5);
    
    console.log('브로커 대시보드 데이터 로드됨', {
        listedProperties,
        propertyViews,
        completedTours,
        signedContracts
    });
}

function initPropertyManagement() {
    // 매물 관리 기능
    const propertyItems = document.querySelectorAll('.property-item');
    
    propertyItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('매물 항목 클릭됨:', this);
            // 매물 상세 정보 보기 등의 기능 구현
        });
    });
}

function initFranchiseCards() {
    // 프랜차이즈 카드 기능
    const franchiseButtons = document.querySelectorAll('.franchise-action button');
    
    franchiseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const franchiseCard = this.closest('.franchise-card');
            const franchiseName = franchiseCard.querySelector('h4').textContent;
            console.log(`${franchiseName}에 매물 제안 버튼 클릭됨`);
            // 매물 제안 모달 등 표시
        });
    });
}
