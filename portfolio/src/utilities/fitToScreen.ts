export function fitToScreen(element: HTMLElement, offsetElements=[], useMinHeight: boolean) {

  function setSize() {
    let offsetElementsHeight = 0;
    offsetElements.forEach((el: HTMLElement) => { offsetElementsHeight += el ? el.clientHeight : 0 });
    const vh = (window.innerHeight - offsetElementsHeight) * 0.01;
    element.style.setProperty('--vh', `${vh}px`);
    if (useMinHeight) {
      element.style.setProperty('min-height', 'calc(var(--vh, 1vh) * 100)');
    } else {
      element.style.setProperty('min-height', 'none');
      element.style.setProperty('height', 'calc(var(--vh, 1vh) * 100)');
    }
  };

  return {
    init() {
      setSize();
      window.addEventListener('resize', setSize);
    },

    destroy() {
      window.removeEventListener('resize', setSize);
      element.style.removeProperty('--vh');
      element.style.removeProperty('height');
      element.style.removeProperty('min-height');
      element.style.setProperty('height', 'auto');
    }
  }
};
