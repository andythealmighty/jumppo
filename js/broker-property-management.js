document.addEventListener('DOMContentLoaded', function() {
    // 매물 등록 모달 제어
    const addPropertyBtn = document.getElementById('btn-add-property');
    const propertyModal = document.getElementById('property-modal');
    const modalClose = propertyModal.querySelector('.modal-close');
    const cancelBtn = propertyModal.querySelector('.cancel-property');
    
    addPropertyBtn.addEventListener('click', function() {
        propertyModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    });
    
    function closePropertyModal() {
        propertyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closePropertyModal);
    cancelBtn.addEventListener('click', closePropertyModal);
    
    // 모달 외부 클릭 시 닫기
    propertyModal.addEventListener('click', function(event) {
        if (event.target === propertyModal) {
            closePropertyModal();
        }
    });
    
    // 매물 등록 폼 제출
    const propertyForm = document.getElementById('property-form');
    propertyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            title: document.getElementById('property-title').value,
            type: document.getElementById('property-type').value,
            floor: document.getElementById('property-floor').value,
            address: document.getElementById('property-address').value,
            area: document.getElementById('property-area').value,
            rent: document.getElementById('property-rent').value,
            description: document.getElementById('property-description').value
        };
        
        console.log('등록된 매물 정보:', formData);
        
        // 실제 구현에서는 API 호출로 데이터 저장
        // 성공 시 아래 코드 실행
        alert('매물이 성공적으로 등록되었습니다.');
        closePropertyModal();
        
        // 폼 초기화
        propertyForm.reset();
    });
    
    // 주소 검색 버튼 이벤트
    const addressSearchBtn = document.querySelector('.btn-address-search');
    addressSearchBtn.addEventListener('click', function() {
        // 주소 검색 API 연동 (예: 카카오 우편번호 서비스)
        alert('주소 검색 기능은 실제 구현 시 카카오 우편번호 서비스 등을 연동합니다.');
    });
    
    // 이미지 업로드 기능
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = uploadArea.querySelector('input[type="file"]');
    const uploadPreview = document.querySelector('.upload-preview');
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragging');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragging');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragging');
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        if (!files.length) return;
        
        uploadPreview.innerHTML = ''; // 기존 프리뷰 삭제
        
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'preview-remove';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    previewItem.remove();
                });
                
                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                uploadPreview.appendChild(previewItem);
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // 매물 카드 내의 버튼 이벤트
    document.querySelectorAll('.property-card .property-actions button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const propertyCard = this.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('h4').textContent;
            
            if (action.includes('수정')) {
                alert(`${propertyTitle} 수정 페이지로 이동합니다.`);
            } else if (action.includes('성과')) {
                alert(`${propertyTitle}의 성과 분석 데이터를 확인합니다.`);
            } else if (action.includes('매칭')) {
                alert(`${propertyTitle}와 매칭된 프랜차이즈 목록을 확인합니다.`);
            }
        });
    });
});
