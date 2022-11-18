export function roll (dom,domParent) {
  let times1 = setInterval(() => {

    const { top, right, bottom, left } = dom.getBoundingClientRect();
    const bottom1 = domParent.getBoundingClientRect().bottom;
    // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
    // console.log(bottom);
    // console.log(bottom1);
    dom.style.transition = ''
    // console.log((bottom / bottom1));
    if (domParent.offsetHeight < (dom.offsetHeight - 12)) {
      if (bottom + domParent.offsetHeight > bottom1) {
        // swiper.style.transform = 'translate(100px, 0)'
        this.distance += domParent.offsetHeight / 3000
        dom.style.top = -this.distance + 'px'
      } else if (bottom + domParent.offsetHeight <= bottom1) {
        dom.style.transition = 'all 1s'
        dom.style.top = '0px'
        this.distance = 0
        clearInterval(times1);
        times1 = null;
        setTimeout(() => {
          this.roll()
        }, 4000);
      }
    }
  }, 2)
}
export function rollRepeat () {
  this.times1 = setInterval(() => {
    let swiper = document.getElementById('swi')
    let text = document.querySelector('.txt')
    const { top, right, bottom, left } = swiper.getBoundingClientRect();
    const bottom1 = text.getBoundingClientRect().bottom;
    // console.log(Math.ceil(swiper.offsetHeight / text.offsetHeight));
    // console.log(bottom);
    // console.log(bottom1);
    swiper.style.transition = ''
    // console.log((bottom / bottom1));
    if (text.offsetHeight < (swiper.offsetHeight - 12)) {
      if (bottom + text.offsetHeight > bottom1) {
        // swiper.style.transform = 'translate(100px, 0)'
        this.distance += text.offsetHeight / 3000
        swiper.style.top = -this.distance + 'px'
      } else if (bottom + text.offsetHeight <= bottom1) {
        swiper.style.transition = 'all 1s'
        swiper.style.top = '0px'
        this.distance = 0
        clearInterval(this.times1);
        this.times1 = null;
        setTimeout(() => {
          this.roll()
        }, 4000);
      }
    }
  }, 2)
}