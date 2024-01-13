import { div, button, span } from '../../vendor/modules/HTMLElements.js';
import { Delay, Debounce } from '../../vendor/modules/time.js';

interface props { 
  id: string,
  activeIndex: number,
  transformOffset: number,
  items: object[],
  itemView: Function,
  itemWidth: number | null,
  config: { 
    controls: boolean,
    pagination: boolean,
    gap: number
  }
}

interface actions { 
  [key: string]: { 
    next: Function, 
    resizeCarousel: Function,
    setCarouselItemWidth: Function
  }
}

interface state {
  [key: string]: any  
}

export const CarouselState = (id: string): object => ({
  [id]: {
    activeIndex: 0,
    transformOffset: 0,
    itemWidth: null,
    controls: true
  }
})

export const CarouselActions = (id: string): object => ({ 
  
  [id]: (dispatch: { msgs: Function}): object => {

    function next(direction: string, itemsLength: number, gap: number, event: Event) {

      event.preventDefault();

      dispatch
      .msgs(
        ['state', {
          path: [id, 'activeIndex'],
          value: (prevValue: number) => direction === 'next' ? 
            (prevValue === itemsLength - 1 ? 0 : prevValue + 1) : 
            (prevValue === 0 ? itemsLength - 1 : prevValue - 1)
        }],
        ['effect', {
          name: CarouselFx.getActiveItemEl,
          args: [event]
        }],
        (element: Element) => 
          ['control', {
            if: element instanceof Element,
            true: element,
            false: 'no "active" carousel element found',
          }],
        (element: Element) =>
          ['effect', {
            name: CarouselFx.getSlideWidth,
            args: [element]
          }],
        (width: number, state: state,) => 
          ['state', {
            path: [id, 'transformOffset'],
            value: (width + gap) * state[id].activeIndex
          }]
      )
      .done((output: string | undefined, success: boolean) => {
        console.log(output, success)
      })
    }

    function resizeCarousel() {
      dispatch
      .msgs(
        (state: state) =>
          ['control', {
            if: state[id].activeIndex !== 0
          }],
        ['state', {
          path: [id, ['activeIndex', 'transformOffset']],
          value: [0, 0]
        }]
      ).done(() => {
        setCarouselItemWidth();
      })
    }

    function setCarouselItemWidth() {

      dispatch
      .msgs(
        Debounce(100, id),
        Delay(100),
        ['effect', {
          name: CarouselFx.getContainerEl,
          args: [id]
        }],
        (width: number) => 
          ['state', {
            path: [id, 'itemWidth'],
            value: width
          }]
      )
    }

    return {
      next, 
      resizeCarousel,
      setCarouselItemWidth
    }
  }
});

const CarouselFx = {

  getSlideWidth(element: Element) {
    return element.clientWidth;
  },

  getActiveItemEl(event: Event) {
    return (event.target as HTMLElement).closest('.carousel')!.querySelector('.active');
  },

  getContainerEl(id: string) {
    return document.getElementById(id)?.clientWidth;
  }
};

const CarouselUpdate = (action: Function, options: { id: string }) => {

  let carouselEl: Element | null;

  const namedAction = () => {
    action()
  }

  setTimeout(() => {
    carouselEl = document.getElementById(options.id);

    if (carouselEl) {
      namedAction()
      window.addEventListener('resize', namedAction)
    }
  }, 100)

  return () => {
    window.removeEventListener('resize', namedAction)
  }
} 

export const CarouselSubscriptions = (id: string, actions: actions, watch: string): object => ({
  name: CarouselUpdate,
  action: actions[id].resizeCarousel,
  watch,
  options: {
    id
  },
  key: id
})

export const CarouselView = 

(props: props, actions: actions): Function => 
(e: Function, x: Function): void => {
  
  e(div, { id: props.id, class: 'carousel' })

    if (props.config.controls) {
      e(button, { 
        class: 'carousel-button prev',
        text: 'prev', 
        onclick: [actions[props.id].next, 'prev', props.items.length, props.config.gap]})
      x(button)
      e(button, { 
        class: 'carousel-button next',
        text: 'next', 
        onclick: [actions[props.id].next, 'next', props.items.length, props.config.gap]})
      x(button)
    }
    e(div, { class: 'carousel-container', style: { overflow: 'hidden', width: '100%'}})
      e(div, { class: 'carousel-track', style: { transform: `translate3d(-${props.transformOffset}px, 0, 0)`} })

        props.items.map((item, index) => {
          e(div, { 
            class: `carousel-item ${index === props.activeIndex ? 'active' : ''}`, 
            style: {
              ...(props.config.gap ? { 'margin-right': props.config.gap + 'px' } : {}),
              ...(props.itemWidth ? { width : props.itemWidth + 'px' } : {})
            }
          })
            props.itemView(item, index, props);
          x(div)
        });

      x(div)

      if (props.config.pagination) {
        e(div, { class: 'carousel-pagination' })
          e(span, { text: props.activeIndex + 1 }); x(span)
          e(span, { text: ' / ' }); x(div)
          e(span, { text: props.items.length }); x(span)
        x(div)
      }
    x(div)
  x(div)
}

export const Carousel = (
  id: string, 
  items: object[] | string[], 
  itemView: Function, 
  config?: { 
    controls: boolean ,
    gap: number
  }
): object[] => [

  { CarouselView }, 
  { props: {
      id,
      config: config || { controls : true, pagination: true, gap: 0 },
      items,
      itemView: (item: Function, index: number, props: object) => {
        itemView(item, index, props)
      }
    },
    mergeStateToProps: (state: { [key: string]: any }) => ({
      activeIndex: state[id].activeIndex,
      transformOffset: state[id].transformOffset,
      itemWidth: state[id].itemWidth
    }),
    subscribe: [id]
}]