// 헤더 스크롤 이벤트
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 히어로 섹션 이미지 초기화 (h-3.png만 사용)
function initHeroImage() {
    const heroBackground = document.getElementById('heroBackground');
    const heroSection = document.querySelector('.hero-section');
    if (!heroBackground || !heroSection) return;
    
    // 기존 내용 제거
    heroBackground.innerHTML = '';
    
    // h-3.png 이미지만 사용
    const slide = document.createElement('div');
    slide.className = 'hero-slide active';
    slide.style.backgroundImage = `url('images/h-3.png')`;
    heroBackground.appendChild(slide);
    
    // 이미지 비율 계산하여 높이 조정
    const img = new Image();
    img.onload = function() {
        const imageRatio = img.height / img.width;
        const sectionWidth = heroSection.offsetWidth || window.innerWidth;
        const calculatedHeight = sectionWidth * imageRatio;
        
        heroSection.style.height = `${calculatedHeight}px`;
        heroSection.style.minHeight = `${calculatedHeight}px`;
    };
    img.src = 'images/h-3.png';
}

// 화면 크기 변경 시 높이 재계산
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const img = new Image();
            img.onload = function() {
                const imageRatio = img.height / img.width;
                const sectionWidth = heroSection.offsetWidth || window.innerWidth;
                const calculatedHeight = sectionWidth * imageRatio;
                
                heroSection.style.height = `${calculatedHeight}px`;
                heroSection.style.minHeight = `${calculatedHeight}px`;
            };
            img.src = 'images/h-3.png';
        }
    }, 250);
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
    
    // 히어로 섹션 이미지 초기화
    initHeroImage();
});

