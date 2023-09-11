const video = document.getElementById('Video');
const currentTimeDisplay = document.getElementById('current-time');

let isPlaying = false;

video.addEventListener('click', () => {
    if (isPlaying) {
        video.pause();
    } else {
        video.play();
    }
    isPlaying = !isPlaying;
});

video.addEventListener('ended', () => {
    video.currentTime = 0;
    isPlaying = false;
});

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((currentTime % 1) * 1000).toString().padStart(3, '0');
    currentTimeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
});
