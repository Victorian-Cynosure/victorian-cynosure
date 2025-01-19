document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const currentPage = window.location.pathname.split('/').pop();
    const linkPage = href.split('#')[0];
    
    // Debug output
    console.log('Current page:', currentPage);
    console.log('Link page:', linkPage);
    console.log('Full href:', href);
    
    if (linkPage === currentPage || linkPage === '') {
      e.preventDefault();
      const fragment = href.split('#')[1];
      const targetElement = document.getElementById(fragment);
      
      // Debug output
      console.log('Fragment:', fragment);
      console.log('Target found:', !!targetElement);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});
  const searchContainer = document.querySelector('.search');
  const searchInput = document.querySelector('.search_input');
  const lottiePlayer =  document.getElementById('search-icon');
  
  // 当搜索栏获得焦点时，添加动画效果
  searchInput.addEventListener('click', () => {
      searchContainer.classList.add('focused');
      lottiePlayer.setDirection(1);
      lottiePlayer.play();
  });
  
  // 当搜索栏失去焦点时，移除动画效果 
  searchInput.addEventListener('focusout', () => {
      lottiePlayer.setDirection(-1);
      lottiePlayer.play();
      
      setTimeout(() => {
          searchContainer.classList.remove('focused');
      }, 300); 
  });
  
  // 监听搜索输入
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        searchContainer.classList.add('focused');
    }
  });
  
  // 防止点击搜索栏时触发 blur 事件
  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  const animationContainer = document.getElementById('instagram-animation');
  let animation = lottie.loadAnimation({
      container: document.getElementById('instagram-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/victorian-cynosure/json/instagram.json'
  });
  animation.addEventListener('DOMLoaded', () => {
    const svgElement = animationContainer.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
        path.style.stroke = '#ffffff';
    });
});
  animationContainer.addEventListener('mouseenter', () => {
      animation.play(); 
  });
  animationContainer.addEventListener('click', () => {
    window.open('https://www.instagram.com/victorian_cynosure/');
  });
  animationContainer.addEventListener('mouseleave', () => {
      animation.stop(); 
  });
  const youtubeContainer = document.getElementById('youtube-animation');
  let youtubeanimation = lottie.loadAnimation({
      container: document.getElementById('youtube-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/victorian-cynosure/json/youtube-2.json'
  });
  youtubeanimation.addEventListener('DOMLoaded', () => {
    const svgElement = youtubeContainer.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
        path.style.stroke = '#ffffff';
    });
});
  youtubeContainer.addEventListener('mouseenter', () => {
    youtubeanimation.play(); 
  });
  youtubeContainer.addEventListener('click', () => {
    window.open('https://www.youtube.com/@VictorianCynosure1851');
  });
  youtubeContainer.addEventListener('mouseleave', () => {
    youtubeanimation.stop(); 
  });

  const musicContainer = document.getElementById('music-animation');
  let isPlayingmusic=true;
  const controlMusic = document.querySelectorAll('.control-music'); 
  let progress=document.getElementById("progress");
  let song=document.getElementById("song");
  const logoImg = document.querySelector('.logo-img');
  let musicanimation = lottie.loadAnimation({
      container: document.getElementById('music-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/victorian-cynosure/json/playPause.json'
  });
  musicanimation.addEventListener('DOMLoaded', () => {
    const svgElement = musicContainer.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
        path.style.stroke = '#ffffff';
    });
});
musicContainer.addEventListener('click', () => {
  if(isPlayingmusic){
    musicanimation.setDirection(1);
    musicanimation.play();
    song.pause();
    logoImg.classList.remove('logo-spin');
  }
  else{
    musicanimation.setDirection(-1);
    musicanimation.play();
    song.play();
    logoImg.classList.add('logo-spin');
  }
  isPlayingmusic=!isPlayingmusic
});
song.onloadedmetadata=function(){
  progress.max=song.duration;
  progress.value=song.currentTime;
}
if(song.play()){
  setInterval(()=>{
    progress.value=song.currentTime;
  },500);
}
progress.onchange=function(){
  song.play();
  song.currentTime=progress.value;
  isPlayingmusic=true;
  musicanimation.setDirection(-1);
  musicanimation.play();
  song.play();
  logoImg.classList.add('logo-spin');
}
const handleMediaQuery = () => {
  const mediaQuery = window.matchMedia('(max-width: 1024px)');
  function handleScreenChange(e) {
    if (e.matches) {
      // Force stop everything when on mobile
      song.pause();
      isPlayingmusic = false;
      logoImg.classList.remove('logo-spin');
      if (musicanimation) {
        musicanimation.setDirection(1);
        musicanimation.play();
      }
      
      // Add event listeners to prevent playing on mobile
      document.addEventListener('click', preventPlay);
      document.addEventListener('keydown', preventPlay);
      document.addEventListener('touchstart', preventPlay);
    } else {
      // Remove the preventPlay listeners when not on mobile
      document.removeEventListener('click', preventPlay);
      document.removeEventListener('keydown', preventPlay);
      document.removeEventListener('touchstart', preventPlay);
    }
  }

  function preventPlay(e) {
    if (mediaQuery.matches) {
      song.pause();
      isPlayingmusic = false;
      logoImg.classList.remove('logo-spin');
      e.stopPropagation();
    }
  }
  mediaQuery.addEventListener('change', handleScreenChange);
  
  // Initial check
  handleScreenChange(mediaQuery);
}
const initializeAudio = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  
  const playAudio = () => {
    // Check if we're on mobile before playing
    if (!window.matchMedia('(max-width: 1024px)').matches) {
      song.play()
        .then(() => {
          isPlayingmusic = true;
          logoImg.classList.add('logo-spin');
          musicanimation.setDirection(-1);
          musicanimation.play();
          document.removeEventListener('click', playAudio);
          document.removeEventListener('keydown', playAudio);
          document.removeEventListener('touchstart', playAudio);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          isPlayingmusic = false;
        });
    }
    else{
      song.pause();
    }
  };

  document.addEventListener('click', playAudio);
  document.addEventListener('keydown', playAudio);
  document.addEventListener('touchstart', playAudio);
  playAudio();
};
document.addEventListener('DOMContentLoaded', initializeAudio);

  musicanimation.addEventListener('DOMLoaded', () => {
    const svgElement = musicContainer.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
        path.style.stroke = '#ffffff';
    });
});
document.addEventListener('DOMContentLoaded', function() {
  // First slider
  function initializeSlider(sliderId,itemId ,nextId, prevId) {
    let items = document.querySelectorAll(`${sliderId} .${itemId}`);
    let next = document.getElementById(nextId);
    let prev = document.getElementById(prevId);
    let active = 0;

    function loadshow() {
      let stt = 0;
      items.forEach(item => {
        item.style.transform = '';
        item.style.opacity = '0.7';
        item.style.pointerEvents = 'none';
      });

      for(var i = active + 1; i < items.length; i++){
        stt++;
        items[i].style.transform = `translateX(${200 * stt}px) scale(${1-0.1*stt})`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt>2 ? 0 : 0.6;
      }

      stt = 0;
      for(var i = active - 1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(${-200 * stt}px) scale(${1-0.1*stt})`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt>2 ? 0 : 0.6;
      }

      items[active].style.filter = 'none'
      items[active].style.transform = 'translateX(0)';
      items[active].style.opacity = '1';
      items[active].style.zIndex = 1;
      items[active].style.pointerEvents = 'auto';
    }

    items.forEach((item, index) => {
      let isFlipped = false;
      
      item.addEventListener('click', () => {
        if(index === active) {
          isFlipped = !isFlipped;
          item.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        }
      });
    });

    next.onclick = function(){
      active = active + 1 < items.length ? active + 1 : 0;
      loadshow();
    }

    prev.onclick = function(){
      active = active - 1 >= 0 ? active - 1 : items.length-1;
      loadshow();
    }

    loadshow();
  }
  initializeSlider('.slider1','item', 'next1', 'prev1');  // First slider
  initializeSlider('.slider3','item2', 'next2', 'prev2');  // Second slider
});
$(document).ready(function () {
  // 載入書本頁面
  function loadBook() {
      for (let i = 1; i <= 33; i++) {
          $('#book').append(`
              <div class="page ${i === 1 ? 'hard' : ''}">
                  <img src="/victorian-cynosure/book/自主成發小冊6_page_${i}.jpg" 
                       alt="第 ${i} 頁"
                       style="width: 100%; height: 100%; object-fit: cover;">
              </div>
          `);
      }

      // 檢查螢幕寬度並設置適當的顯示模式
      function initializeBook() {
          const isMobile = window.matchMedia("(max-width: 1024px)").matches;
          
          $('#book').turn({
              display: isMobile ? 'single' : 'double', // 手機單頁，電腦雙頁
              acceleration: true,
              gradients: true,
              elevation: 0,
              autoCenter: true,
              separation: 0,
              duration: 600,
              corners: 'all',
              cornerSize: 200,
              allowTouchMove: true,
              when: {
                  turning: function(e, page, view) {
                      console.log(`翻頁到: ${page}`);
                  },
                  start: function(e, pageObject, corner) {
                      if (corner) {
                          $(this).turn('stop');
                      }
                  }
              }
          });
      }

      // 初始化書本
      initializeBook();

      // 監聽視窗大小變化
      $(window).on('resize', function() {
          // 銷毀現有的 turn.js 實例
          $('#book').turn('destroy');
          // 重新初始化
          initializeBook();
      });

      let isDragging = false;
      let startX = 0;

      $('#book').on('mousedown', function (e) {
          isDragging = true;
          startX = e.pageX;
          e.preventDefault();
      });

      $(document).on('mousemove', function (e) {
          if (!isDragging) return;

          let deltaX = e.pageX - startX;
          if (Math.abs(deltaX) > 50) {
              if (deltaX > 0) {
                  $('#book').turn('previous');
              } else {
                  $('#book').turn('next');
              }
              isDragging = false;
          }
      });

      $(document).on('mouseup', function () {
          isDragging = false;
      });
  }

  loadBook();

  // 綁定按鈕事件
  $('#prev').click(function () {
      $('#book').turn('previous');
  });

  $('#next').click(function () {
      $('#book').turn('next');
  });

  // 支援鍵盤左右鍵翻頁
  $(document).keydown(function (e) {
      if (e.keyCode == 37) {
          $('#book').turn('previous');
      } else if (e.keyCode == 39) {
          $('#book').turn('next');
      }
  });

  // 改進觸控支援
  $(window).on('touchstart', function (e) {
      var touch = e.originalEvent.touches[0];
      var x = touch.pageX;
      var width = $(window).width();

      if (x < width / 2) {
          $('#book').turn('previous');
      } else {
          $('#book').turn('next');
      }
      e.preventDefault();
  });
});

let cards = document.querySelectorAll(".card");
let content = document.querySelectorAll(".card-content");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
  let angleStep = 1;
  let angle = 0;
  cards.forEach((card, index) => {
    if (card.classList.contains("away")) {
      card.style.transform = `translateY(-120vh) rotate(-48deg)`;
    } else {
      card.style.transform = `rotate(${angle}deg)`;
      angle -= angleStep;
      card.style.zIndex = cards.length - index;
    }
  });
}

rotateCards();

let throttleTimer;
window.addEventListener("scroll", () => {
  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      handleScroll();
      throttleTimer = null;
    }, 50);
  }
});

function handleScroll() {
  let distance = window.innerHeight * 0.5;
  let topVal = stackArea.getBoundingClientRect().top;

  let index = -1 * (topVal / distance + 1);
  index = Math.floor(index);
  
  if (index >= -1 && index + 1 < content.length) {
    content[index + 1].style.opacity = "1";
  }
  content.forEach((item, idx) => {
    if (idx === index + 1) {
      item.style.opacity = "1"; // 显示当前内容
    } else {
      item.style.opacity = "0"; // 隐藏其他内容
    }
  });
  for (let i = 0; i < cards.length; i++) {
    if (i <= index) {
      cards[i].classList.add("away");
    } else {
      cards[i].classList.remove("away");
    }
  }
  rotateCards();
}