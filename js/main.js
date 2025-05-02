// 공통 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 사이드바 토글
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').prepend(mobileToggle);
    
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('show');
        this.innerHTML = sidebar.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // 사이드바 내부의 모든 링크에 이벤트 추가
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            // 링크 클릭 확인
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A' || e.target.parentElement.parentElement.tagName === 'A') {
                console.log('사이드바 링크 클릭됨:', e.target);
                
                // 모바일에서 클릭 후 사이드바 닫기
                if (window.innerWidth <= 768) {
                    this.classList.remove('show');
                    const mobileToggle = document.querySelector('.mobile-toggle');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // 방문 기록 저장
                localStorage.setItem('previousPage', window.location.href);
            }
        });
    }
    
    // 외부 클릭 시 사이드바 닫기
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.mobile-toggle');
        
        if (sidebar && sidebar.classList.contains('show') && 
            !sidebar.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
            sidebar.classList.remove('show');
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // 사용자 프로필 드롭다운
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.preventDefault();
            // 프로필 드롭다운 구현 (추후 개발)
        });
    }
    
    // 현재 페이지 사이드바 링크 활성화
    highlightCurrentPageInSidebar();
    
    // 이미지 로드 최적화
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.complete) {
            img.classList.add('img-loading');
        }
        
        img.onload = function() {
            this.classList.remove('img-loading');
        };
        
        img.onerror = function() {
            this.src = 'assets/placeholder.jpg';
            this.classList.remove('img-loading');
        };
    });
    
    // 스크롤 이벤트 최적화
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    }, 10));
});

// 현재 페이지의 사이드바 링크 활성화하는 함수
function highlightCurrentPageInSidebar() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 더미 데이터 생성 함수
function generateDummyData(type, count) {
    // 타입별로 더미 데이터를 생성하는 로직
    // 실제 구현 시 더 복잡한 데이터를 생성할 수 있음
    return Array(count).fill().map((_, i) => {
        return {
            id: i + 1,
            name: `${type} ${i + 1}`,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        };
    });
}

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// franchise-ai-matching.js 개선
// AI 매칭 결과 로딩 애니메이션 개선
function showAiLoadingAnimation() {
    const resultsLoading = document.querySelector('.results-loading');
    const resultsContent = document.querySelector('.results-content');
    
    if (resultsLoading && resultsContent) {
        resultsLoading.style.display = 'flex';
        resultsContent.style.display = 'none';
        
        // 로딩 텍스트 타이핑 효과
        const loadingTexts = [
            "데이터 수집 중...",
            "매물 분석 중...",
            "조건 매칭 점수 계산 중...",
            "최적의 매물 선별 중..."
        ];
        
        const loadingText = document.querySelector('.loading-text p');
        let textIndex = 0;
        
        const loadingInterval = setInterval(() => {
            loadingText.textContent = loadingTexts[textIndex];
            textIndex = (textIndex + 1) % loadingTexts.length;
        }, 1500);
        
        return loadingInterval;
    }
    
    return null;
}
