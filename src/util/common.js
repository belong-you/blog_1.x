export default {
  scroll () {
    if (window.innerWidth > 768) {
      let num;
      window.onscroll = () => {
        num = document.documentElement.scrollTop + 'px';
        return num;
      }
    }
  }
}