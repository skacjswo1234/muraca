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
    
    // 슬라이더 초기화
    initSlider(sliderTrack);
}

// 슬라이더 초기화 (터치 및 자동 슬라이드)
function initSlider(sliderTrack) {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let translateX = 0;
    let animationId = null;
    let lastTranslate = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastX = 0;
    
    // 모바일 감지
    const isMobile = window.innerWidth <= 1024;
    
    // 카드 너비 계산
    function getCardWidth() {
        const firstCard = sliderTrack.querySelector('.bread-card');
        if (firstCard) {
            const style = window.getComputedStyle(firstCard);
            const width = firstCard.offsetWidth;
            const gap = parseInt(window.getComputedStyle(sliderTrack).gap) || 20;
            return width + gap;
        }
        return 250; // 기본값
    }
    
    // 전체 트랙 너비 계산
    function getTotalWidth() {
        const cards = sliderTrack.querySelectorAll('.bread-card');
        const cardWidth = getCardWidth();
        return cards.length * cardWidth;
    }
    
    // 자동 슬라이드 애니메이션
    function startAutoSlide() {
        if (isDragging || !sliderTrack.classList.contains('auto-slide')) return;
        
        const totalWidth = getTotalWidth();
        const halfWidth = totalWidth / 2;
        const speed = isMobile ? 2 : 1; // 모바일이면 더 빠르게 (픽셀/프레임)
        
        function animate() {
            if (isDragging || !sliderTrack.classList.contains('auto-slide')) {
                return;
            }
            
            translateX -= speed;
            lastTranslate = translateX;
            
            // 절반 지나면 처음으로 리셋
            if (Math.abs(translateX) >= halfWidth) {
                translateX = 0;
                lastTranslate = 0;
            }
            
            sliderTrack.style.transform = `translateX(${translateX}px)`;
            animationId = requestAnimationFrame(animate);
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // 터치 시작
    function handleStart(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        
        startX = clientX;
        lastX = clientX;
        lastTime = Date.now();
        isDragging = true;
        velocity = 0;
        
        // 자동 슬라이드 중지
        sliderTrack.classList.remove('auto-slide');
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        // 현재 위치 가져오기
        const computedStyle = window.getComputedStyle(sliderTrack);
        const matrix = computedStyle.transform;
        if (matrix && matrix !== 'none') {
            const values = matrix.match(/matrix.*\((.+)\)/);
            if (values) {
                const nums = values[1].split(', ');
                translateX = parseFloat(nums[4] || nums[12] || 0);
                lastTranslate = translateX;
            }
        }
        
        sliderTrack.classList.add('dragging');
        
        if (!e.touches) {
            e.preventDefault();
        }
    }
    
    // 터치 이동
    function handleMove(e) {
        if (!isDragging) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 0) {
            velocity = (clientX - lastX) / deltaTime;
        }
        
        currentX = clientX;
        const diff = currentX - startX;
        translateX = lastTranslate + diff;
        
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        lastX = clientX;
        lastTime = currentTime;
        
        if (!e.touches && e.cancelable) {
            e.preventDefault();
        }
    }
    
    // 터치 종료
    function handleEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        lastTranslate = translateX;
        sliderTrack.classList.remove('dragging');
        
        // 관성 효과 (선택사항)
        // velocity를 사용하여 관성 스크롤 구현 가능
        
        // 자동 슬라이드 재시작
        setTimeout(() => {
            sliderTrack.classList.add('auto-slide');
            startAutoSlide();
        }, 100);
    }
    
    // 이벤트 리스너 추가
    sliderTrack.addEventListener('touchstart', handleStart, { passive: true });
    sliderTrack.addEventListener('touchmove', handleMove, { passive: false });
    sliderTrack.addEventListener('touchend', handleEnd, { passive: true });
    sliderTrack.addEventListener('touchcancel', handleEnd, { passive: true });
    
    // 마우스 이벤트 (데스크톱)
    sliderTrack.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    // 자동 슬라이드 시작
    sliderTrack.classList.add('auto-slide');
    startAutoSlide();
    
    // 호버 시 일시정지 (데스크톱)
    if (!isMobile) {
        sliderTrack.addEventListener('mouseenter', () => {
            sliderTrack.classList.remove('auto-slide');
        });
        sliderTrack.addEventListener('mouseleave', () => {
            sliderTrack.classList.add('auto-slide');
            startAutoSlide();
        });
    }
}
