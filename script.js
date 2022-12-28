const tiktokVideoTag = document.querySelectorAll(".tiktokVideo");
const videoContainerTag = document.querySelector(".videoContainer");
const progressTag = document.querySelector(".current-playing-bar");
const mainContainerTag = document.querySelector(".mainContainer");
const videoPlayerTag = document.querySelectorAll('[data-pause-target]');
let playState = null;

// for (const video of tiktokVideoTag) {
//   video.addEventListener("click", () => {
//     if (video.classList.contains("active")) {
//       video.pause();
//       video.classList.remove("active");
//       const pauseBtnTag = document.querySelector(video.dataset.pauseTarget);
//       console.log(pauseBtnTag);
//       pauseBtnTag.classList.add("active");
//     } else {
//       video.play();
//       video.classList.add("active");
//       const pauseBtnTag = document.querySelector(video.dataset.pauseTarget);
//       console.log(pauseBtnTag);
//       pauseBtnTag.classList.remove("active");
//     }
//   });
// }

function progressLoop(playingVideo, currentTime) {
  const currentProgressWidth = (290 / playingVideo.duration) * currentTime;
  console.log(currentProgressWidth);
  progressTag.style.width = currentProgressWidth.toString() + "px";
}

let options = {
  root: mainContainerTag,
  rootMargin: "0px",
  threshold: 0.5,
};


let playPause = (video) => {
  video.addEventListener('click', () => {
    if(video.classList.contains('playing')){
      video.pause();
      video.classList.remove('playing');
    }else{
      video.play();
      video.classList.add('playing');
    }
  })
}

let callback= (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      let currentPlayingVideo = entry.target;
      currentPlayingVideo.currentTime = 0;
      let playingPromise = currentPlayingVideo.play();
      playingPromise.then(()=> {
        currentPlayingVideo.muted = false;
        currentPlayingVideo.classList.add('playing');
      })
      currentPlayingVideo.addEventListener('play', ()=>{
        progressLoop(currentPlayingVideo, currentPlayingVideo.currentTime);
      })
      let reactionContainer = document.querySelector(currentPlayingVideo.dataset.reactionTarget);
      reactionContainer.style.display = 'flex';
      let descriptionContainer = document.querySelector(currentPlayingVideo.dataset.descriptionTarget);
      descriptionContainer.style.display = 'block';
    }else{
      entry.target.pause();
      entry.target.currentTime = 0;
      entry.target.classList.remove('playing');
      let pauseBtn = document.querySelector(entry.target.dataset.pauseBtn);
      let reactionConatiner = document.querySelector(entry.target.dataset.reactionTarget);
      let descriptionContainer = document.querySelector(entry.target.dataset.descriptionTarget);
      if(pauseBtn.classList.contains('active')){
        pauseBtn.classList.remove('active')
      }
      reactionConatiner.style.display = 'none';
      descriptionContainer.style.display = 'none';
    }
  })
}

let observer = new IntersectionObserver(callback, options);
tiktokVideoTag.forEach((video) => {
  observer.observe(video);
});

console.log(videoPlayerTag)

videoPlayerTag.forEach((videoPlayer) => {
  videoPlayer.addEventListener('click', ()=> {
    const targetVd = document.querySelector(videoPlayer.dataset.pauseTarget);
    const pauseBtn = document.querySelector(videoPlayer.dataset.pauseBtn);
    if(targetVd.classList.contains('playing')){
      targetVd.pause();
      targetVd.classList.remove('playing');
      pauseBtn.classList.add('active');
    }else{
      targetVd.play();
      targetVd.classList.add('playing');
      targetVd.addEventListener('play', ()=>{
        progressLoop(targetVd, targetVd.currentTime);
      })
      pauseBtn.classList.remove('active');
    }
  })
})