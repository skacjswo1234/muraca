// 헤더 스크롤 이벤트 및 탑 버튼 표시
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const topButton = document.getElementById('topButton');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (topButton) {
            topButton.classList.add('show');
        }
    } else {
        header.classList.remove('scrolled');
        if (topButton) {
            topButton.classList.remove('show');
        }
    }
});

// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // 메뉴 열기
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 메뉴 닫기
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }
    
    // 메뉴 링크 클릭 시 메뉴 닫기
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // 탑 버튼 클릭 시 맨 위로 스크롤
    const topButton = document.getElementById('topButton');
    if (topButton) {
        topButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 영상 무한재생 보장
    const desktopVideo = document.querySelector('.hero-video-desktop');
    const mobileVideo = document.querySelector('.hero-video-mobile');
    
    if (desktopVideo) {
        desktopVideo.loop = true;
        desktopVideo.play();
    }
    
    if (mobileVideo) {
        mobileVideo.loop = true;
        mobileVideo.play();
    }
    
    // 빵 이미지 카드 슬라이더 초기화
    initBreadSlider();
});

// 빵 이미지 카드 슬라이더 초기화 함수
function initBreadSlider() {
    const sliderTrack = document.getElementById('breadSliderTrack');
    if (!sliderTrack) return;
    
    // brad 폴더의 이미지 파일들 (d1.jpg ~ d20.jpg)
    const imageFiles = [];
    for (let i = 1; i <= 20; i++) {
        imageFiles.push(`images/brad/d${i}.jpg`);
    }
    
    // 이미지를 두 번 복제하여 무한 스크롤 효과 생성
    const allImages = [...imageFiles, ...imageFiles];
    
    // 카드 생성
    allImages.forEach((imagePath, index) => {
        const card = document.createElement('div');
        card.className = 'bread-card';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `빵 이미지 ${index + 1}`;
        img.loading = 'lazy';
        
        card.appendChild(img);
        sliderTrack.appendChild(card);
    });
    
    // 모바일 터치 스와이프 기능 추가
    initTouchSlider(sliderTrack);
}

// 터치 스와이프 기능 초기화
function initTouchSlider(sliderTrack) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTranslate = 0;
    let currentTranslate = 0;
    let animationStartTime = 0;
    let animationProgress = 0;
    
    // 모바일 감지 (모바일과 태블릿 모두 포함)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 1024;
    
    if (!isMobile) {
        sliderTrack.classList.add('draggable');
        return; // 모바일이 아니면 터치 기능 비활성화
    }
    
    // 현재 transform 값 가져오기
    function getCurrentTranslate() {
        const computedStyle = window.getComputedStyle(sliderTrack);
        const matrix = computedStyle.transform;
        
        if (matrix && matrix !== 'none') {
            const matrixType = matrix.includes('3d') ? '3d' : '2d';
            if (matrixType === '3d') {
                const matrixValues = matrix.match(/matrix3d\((.+)\)/)[1].split(', ');
                return parseFloat(matrixValues[12]) || 0;
            } else {
                const matrixValues = matrix.match(/matrix\((.+)\)/)[1].split(', ');
                return parseFloat(matrixValues[4]) || 0;
            }
        }
        return 0;
    }
    
    // 터치 시작
    function touchStart(e) {
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
        } else {
            startX = e.clientX;
            e.preventDefault();
        }
        
        // 현재 위치 저장
        initialTranslate = getCurrentTranslate();
        
        isDragging = true;
        sliderTrack.classList.add('dragging');
        
        // 애니메이션 일시 정지 및 현재 위치 고정
        sliderTrack.style.animationPlayState = 'paused';
        sliderTrack.style.transform = `translateX(${initialTranslate}px)`;
    }
    
    // 터치 이동
    function touchMove(e) {
        if (!isDragging) return;
        
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
        } else {
            currentX = e.clientX;
            if (e.cancelable) {
                e.preventDefault();
            }
        }
        
        const diff = currentX - startX;
        currentTranslate = initialTranslate + diff;
        
        // 실시간으로 이동
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    // 터치 종료
    function touchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        sliderTrack.classList.remove('dragging');
        
        // 현재 위치에서 애니메이션 재시작
        // CSS 애니메이션을 다시 시작하기 위해 transform을 제거하고
        // 애니메이션을 재시작
        const finalTranslate = currentTranslate;
        
        // 애니메이션을 재시작하기 위해 transform 제거
        sliderTrack.style.transform = '';
        
        // 애니메이션 재시작
        requestAnimationFrame(() => {
            sliderTrack.style.animationPlayState = 'running';
        });
    }
    
    // 이벤트 리스너 추가
    sliderTrack.addEventListener('touchstart', touchStart, { passive: true });
    sliderTrack.addEventListener('touchmove', touchMove, { passive: false });
    sliderTrack.addEventListener('touchend', touchEnd, { passive: true });
    
    // 마우스 이벤트도 추가 (데스크톱에서도 드래그 가능하게)
    sliderTrack.addEventListener('mousedown', touchStart);
    sliderTrack.addEventListener('mousemove', touchMove);
    sliderTrack.addEventListener('mouseup', touchEnd);
    sliderTrack.addEventListener('mouseleave', touchEnd);
}
