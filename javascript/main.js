const popupOverlay = document.getElementById('popupOverlay');
const closeButton = document.querySelector('.close-button');

// 關閉彈出視窗
closeButton.addEventListener('click', () => {
    popupOverlay.classList.add('hidden');
});

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
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
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
  const mediaQuery = window.matchMedia('(max-width: 768px)');
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
    if (!window.matchMedia('(max-width: 768px)').matches) {
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
let nextDom=document.getElementById('next');
let prevDom=document.getElementById('prev');
let carouselDom=document.querySelector('.carousel');
let listItemDom=document.querySelector('.carousel .list');
let thumbnailDom=document.querySelector('.carousel .thumbnail');
let timeRunning=1000;
let runTimeOut;
nextDom.onclick=function(){
  showSlider('next');
}
prevDom.onclick=function(){
  showSlider('prev');
}
function showSlider(type){
  let itemSlider=document.querySelectorAll('.carousel .list .item');
  let itemThumbnail=document.querySelectorAll('.carousel .thumbnail .item');
  if(type==='next'){
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(itemThumbnail[0]);
    carouselDom.classList.add('next');
  }
  else{
    let positionLastItem=itemSlider.length-1;
    listItemDom.prepend(itemSlider[positionLastItem]);
    thumbnailDom.prepend(itemThumbnail[positionLastItem]);
    carouselDom.classList.add('prev');
  }
  clearTimeout(runTimeOut);
  runTimeOut=setTimeout(()=>{
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
  },timeRunning);
}
$(document).ready(function () {
  var mySwiper = new Swiper(".swiper", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
      }
    }
  });
  $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
    mySwiper.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
  });
});