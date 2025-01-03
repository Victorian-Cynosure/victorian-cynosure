document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.includes(window.location.pathname)) {
        e.preventDefault();
        const fragment = href.split('#')[1];
        const targetElement = document.getElementById(fragment);
        // Scroll into view if the target element exists
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
        path: '/json/instagram.json'
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
        path: '/json/youtube-2.json'
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
    let musicanimation = lottie.loadAnimation({
        container: document.getElementById('music-animation'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/json/playPause.json'
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
  const initializeAudio = () => {
    // Set up audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    // Add event listener for user interaction
    const playAudio = () => {
        song.play()
            .then(() => {
                // Successful autoplay
                isPlayingmusic = true;
                logoImg.classList.add('logo-spin');
                musicanimation.setDirection(-1);
                musicanimation.play();
                // Remove the event listeners once played
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
  const slides = document.querySelectorAll(".slide");
  const prevb = document.querySelector(".prev");
  const nextb = document.querySelector(".next");
  
  let active = Math.floor(slides.length / 2);

function updateSlideTransform() {
    slides.forEach((slide, index) => {
        const dif = index - active;
        slide.classList.remove("active");

        if (dif < 0) {
            slide.style.transform = `
                rotate(${dif * 5}deg) 
                translateY(${Math.abs(dif) * 50}px) 
                translateX(${dif * 100}%)
            `;
            slide.style.zIndex = dif;
        } else if (dif > 0) {
            slide.style.transform = `
                rotate(${dif * 5}deg) 
                translateY(${Math.abs(dif) * 50}px) 
                translateX(${dif * 100}%)
            `;
            slide.style.zIndex = -dif;
        } else {
            slide.style.transform = "rotate(0deg) translateY(0) translateX(0)";
            slide.style.zIndex = 0;
            slide.classList.add("active");
        }
    });
    prevb.disabled = active === 0;
    nextb.disabled = active === slides.length - 1;
    prevb.style.opacity = prevb.disabled ? "0.1" : "1";
    nextb.style.opacity = nextb.disabled ? "0.1" : "1";
}
function prevSlide(){
    active = (active - 1 + slides.length) % slides.length;
    updateSlideTransform();
}
function nextSlide(){
    active=(active+1)%slides.length;
    updateSlideTransform();
}

prevb.addEventListener("click",prevSlide);
nextb.addEventListener("click",nextSlide);
updateSlideTransform();

let scrollTimeout;

function handleMouseWheel(event){
  clearTimeout(scrollTimeout);
  scrollTimeout=setTimeout(()=>{
    if(event.deltaY>0){
      nextSlide();
    }
    else{
      prevSlide();
    }
  },400);
}
window.addEventListener("wheel",handleMouseWheel);