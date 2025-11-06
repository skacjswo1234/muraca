// 헤더 스크롤 이벤트
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 히어로 섹션 이미지 슬라이드 전역 변수
let heroSlideInterval = null;
let heroCurrentSlide = 0;

// 히어로 섹션 이미지 슬라이드 초기화
function initHeroSlider() {
    const heroBackground = document.getElementById('heroBackground');
    const heroSection = document.querySelector('.hero-section');
    if (!heroBackground || !heroSection) return;
    
    // 기존 interval 정리
    if (heroSlideInterval) {
        clearInterval(heroSlideInterval);
        heroSlideInterval = null;
    }
    
    // 기존 슬라이드 제거
    heroBackground.innerHTML = '';
    
    // 모바일 여부 확인
    const isMobile = window.innerWidth <= 768;
    
    // 이미지 개수 설정 (모바일: 2개, PC: 4개)
    const imageCount = isMobile ? 2 : 4;
    
    // 모바일에서 이미지 비율 계산하여 높이 조정
    if (isMobile) {
        const firstImagePath = `images/h-3.png`;
        const img = new Image();
        img.onload = function() {
            const imageRatio = img.height / img.width;
            const sectionWidth = heroSection.offsetWidth || window.innerWidth;
            const calculatedHeight = sectionWidth * imageRatio;
            
            // 계산된 높이로 섹션 높이 설정
            heroSection.style.height = `${calculatedHeight}px`;
            heroSection.style.minHeight = `${calculatedHeight}px`;
        };
        img.src = firstImagePath;
    } else {
        // PC에서는 기본 높이 유지
        heroSection.style.height = '';
        heroSection.style.minHeight = '';
    }
    
    // 슬라이드 생성
    for (let i = 1; i <= imageCount; i++) {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        if (i === 1) {
            slide.classList.add('active');
        }
        
        // 모바일이면 h-3, h-4 사용, PC면 h-1 ~ h-4 사용
        const imagePath = isMobile 
            ? `images/h-${i + 2}.png`  // 모바일: h-3, h-4
            : `images/h-${i}.png`;     // PC: h-1 ~ h-4
        
        slide.style.backgroundImage = `url('${imagePath}')`;
        heroBackground.appendChild(slide);
    }
    
    // 슬라이드 전환 로직
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    heroCurrentSlide = 0;
    const slideInterval = 2500; // 2.5초
    
    function showNextSlide() {
        // 현재 슬라이드 제거
        slides[heroCurrentSlide].classList.remove('active');
        
        // 다음 슬라이드로 이동
        heroCurrentSlide = (heroCurrentSlide + 1) % slides.length;
        
        // 다음 슬라이드 표시
        slides[heroCurrentSlide].classList.add('active');
    }
    
    // 2.5초마다 슬라이드 전환
    heroSlideInterval = setInterval(showNextSlide, slideInterval);
}

// 화면 크기 변경 시 이미지 재설정 및 높이 재계산
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const heroSection = document.querySelector('.hero-section');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && heroSection) {
            // 모바일에서 이미지 비율로 높이 재계산
            const firstImagePath = `images/h-3.png`;
            const img = new Image();
            img.onload = function() {
                const imageRatio = img.height / img.width;
                const sectionWidth = heroSection.offsetWidth || window.innerWidth;
                const calculatedHeight = sectionWidth * imageRatio;
                
                heroSection.style.height = `${calculatedHeight}px`;
                heroSection.style.minHeight = `${calculatedHeight}px`;
            };
            img.src = firstImagePath;
        } else if (heroSection) {
            // PC에서는 기본 높이로 복원
            heroSection.style.height = '';
            heroSection.style.minHeight = '';
        }
        
        // 슬라이더 재초기화
        initHeroSlider();
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
    
    // 히어로 섹션 슬라이더 초기화
    initHeroSlider();
});

