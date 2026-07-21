const track = document.querySelector(".gallery-track");
const nextButton = document.querySelector(".gallery-arrow.next");
const prevButton = document.querySelector(".gallery-arrow.prev");

let currentIndex = 0;

function getVisibleImages() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 4;
}

function getGap() {
  return track ? parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0 : 0;
}

function updateGallery() {
  if (!track || track.children.length === 0) return;

  const visibleImages = getVisibleImages();
  const maxIndex = Math.max(track.children.length - visibleImages, 0);
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  const imageWidth = track.children[0].offsetWidth;
  const moveAmount = currentIndex * (imageWidth + getGap());

  track.style.transform = `translate3d(-${moveAmount}px, 0, 0)`;

  if (prevButton) prevButton.disabled = currentIndex === 0;
  if (nextButton) nextButton.disabled = currentIndex === maxIndex;
}

if (track && nextButton && prevButton) {
  nextButton.addEventListener("click", () => {
    currentIndex += 1;
    updateGallery();
  });

  prevButton.addEventListener("click", () => {
    currentIndex -= 1;
    updateGallery();
  });

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updateGallery();
  });

  window.addEventListener("load", updateGallery);
  updateGallery();
}
