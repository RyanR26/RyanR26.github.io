const lazyImageCache = {};

const loadImage = url => new Promise((resolve, reject) => {
  const img = new Image();
  // const loaded = () => resolve(img)
  img.addEventListener('load', () => resolve(img));
  img.addEventListener('error', (err) => reject(err));
  img.src = url;
});

const LazyImageActions = dispatch => ({
  rerender() {
    dispatch.msgs(
      state => ['state', { value: state }]
    )
  }
});

const LazyImageView = (props, actions) => {

  const cachedImg = lazyImageCache[props.url];
  
  let src = cachedImg ? [cachedImg, 'loaded'] : [props.placeholderUrl, 'loading'];

  if (!cachedImg) {
    let render;
    lazyImageCache[props.url] = props.url
    loadImage(props.url).then(img => {
      if (!render) {
        render = setTimeout(() => {
          actions.LazyImageActions.rerender();
        }, 100);
      } else {
        clearTimeout(render);
      }
    })
  };

  return (e) => {
    e('img', { 
      src: src[0], 
      class: `lazy-image ${src[1]} ${props.classes}`, 
      alt: props.altText || 'lazy image'
    })
  }
};

export const LazyImage = (props) => [
  { LazyImageView }, {
    props: { ...props },
    actions: { LazyImageActions }
  }
];