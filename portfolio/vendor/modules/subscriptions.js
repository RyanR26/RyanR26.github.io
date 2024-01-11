export const Interval = (action, options) => {
  
  action();

  let interval = setInterval(function () {
      action();
  }, options.time)
  
  return () => {
    clearInterval(interval);
  } 
};

export const IntersectObserver = (action, options) => {

  console.log('INTERSECTION')

  let config = {
    root: options.root ? document.querySelector(options.root) : document,
    rootMargin: options.rootMargin || '0px',
    threshold: options.threshold || 1.0,
  };
  
  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      action(entry)
    });
  };

  let observer = new IntersectionObserver(callback, config);

  let target;
 
  setTimeout(() => {
    target = document.querySelectorAll(options.target);

    if (target) {
      target.forEach(targetEl => {
        observer.observe(targetEl);
      })
    }
  }, 100);


  return () => {
    if (target) {
      target.forEach(targetEl => {
        observer.disconnect(targetEl);
      })
    }
  } 
};