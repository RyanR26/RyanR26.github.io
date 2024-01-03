export const Interval = (action, options) => {
  
  action();
  
  let interval = setInterval(function () {
      action();
  }, options.time)
  
  return () => {
    clearInterval(interval);
  } 
};