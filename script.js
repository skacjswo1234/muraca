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
});
