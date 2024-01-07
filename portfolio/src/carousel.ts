import { div, button } from '../vendor/modules/HTMLElements.js';

interface props { 
  id: string,
  activeIndex: number,
  transformOffset: number,
  items: object[],
  itemView: Function,
  config: { 
    controls: boolean
  }
}

interface actions { 
  [key: string]: { 
    next: Function, 
    resizeCarousel: Function
  }
}

interface state {
  [key: string]: any  
}

export const CarouselState = (id: string): object => ({
  [id]: {
    activeIndex: 0,
    transformOffset: 0,
    controls: true
  }
})

export const CarouselActions = (id: string): object => ({ 
  
  [id]: (dispatch: { msgs: Function}): object => ({

    next(direction: string, itemsLength: number, event: Event) {

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
            value: width * state[id].activeIndex
          }]
      )
      .done((output: string | undefined, success: boolean) => {
        console.log(output, success)
      })
    },

    resizeCarousel() {
      dispatch
      .msgs(
        ['state', {
          path: [id, ['activeIndex', 'transformOffset']],
          value: [0, 0]
        }]
      )
    }
  })
});

const CarouselFx = {

  getSlideWidth(element: Element) {
    return element.clientWidth;
  },

  getActiveItemEl(event: Event) {
    return (event.target as HTMLElement).closest('.carousel')!.querySelector('.active')
  },

  scrollIntoView(element: Element) {
    element.scrollIntoView({ 
      behavior: 'smooth',  
      block: 'nearest',
      inline: 'center' 
    });
  }
};

export const CarouselSubscriptions = (id: string, active: boolean, actions: actions): object => ({ 
    name: 'resize', 
    action: actions[id].resizeCarousel,
    when: active,
    key: id
});

export const CarouselView = 

(props: props, actions: actions): Function => 
(e: Function, x: Function): void => {
  
  e(div, { class: 'carousel', text: 'carousel container' })

    if (props.config.controls) {
      e(button, { 
        text: 'prev', 
        onclick: [actions[props.id].next, 'prev', props.items.length]})
      x(button)
      e(button, { 
        text: 'next', 
        onclick: [actions[props.id].next, 'next', props.items.length]})
      x(button)
    }
    e(div, { class: 'carousel-container', style: { overflow: 'hidden', width: '100%'}})
      e(div, { class: 'carousel-track', style: { transform: `translate3d(-${props.transformOffset}px, 0, 0)`} })

        props.items.map((item, index) => {
          e(div, { class: `carousel-item ${index === props.activeIndex ? 'active' : ''}`})
            props.itemView(item);
          x(div)
        });

      x(div)
    x(div)
  x(div)
}

export const Carousel = (
  id: string, 
  items: object[] | string[], 
  itemView: Function, 
  config?: { controls: boolean }
): object[] => [

  { CarouselView }, 
  { props: {
      id,
      config: config || { controls : true },
      items,
      itemView: (item: Function) => {
        itemView(item)
      }
    },
    mergeStateToProps: (state: { [key: string]: any }) => ({
      activeIndex: state[id].activeIndex,
      transformOffset: state[id].transformOffset
    })
}]