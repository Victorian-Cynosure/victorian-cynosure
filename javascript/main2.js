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
      path: '../json/instagram.json'
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
      path: '../json/youtube-2.json'
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
  let progress=document.getElementById("progress");
  let song=document.getElementById("song");
  const logoImg = document.querySelector('.logo-img');
  song.loop = true;
  song.addEventListener('loadedmetadata', function() {
    progress.max = song.duration;
    progress.value = 0;
    console.log("Duration set:", song.duration); // Debug log
  });
  let musicanimation = lottie.loadAnimation({
      container: document.getElementById('music-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '../json/playPause.json'
  });
  musicanimation.addEventListener('DOMLoaded', () => {
    const svgElement = musicContainer.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
        path.style.stroke = '#ffffff';
    });
});
song.addEventListener('ended', function() {
  song.currentTime = 0;
  song.play();
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
  },100);
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
const initializeAudio = () => {
  // Set up audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  // Add event listener for user interaction
  const playAudio = () => {
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
