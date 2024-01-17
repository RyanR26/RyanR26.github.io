import { button } from '../../vendor/modules/HTMLElements';

interface props {
  scrollPosition: number,
  threshold?: number
}

interface actions {
  ScrollToTopButtonActions: {
    scroll: Function
  }
}

const ScrollToTopButtonActions = (dispatch: { msgs: Function}) => ({
  scroll() {
    dispatch.msgs(
      ['effect', {
        def: () => {
          window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
           });
        }
    }])
  }
})

const SrcollToTopButtonView =

(props: props, actions: actions): Function => 
(e: Function, x: Function): void => {

  const threshold: number = props.threshold || 400;

  if (props.scrollPosition > threshold) {
    e(button, { 
      class: 'scroll-to-top', 
      text: 'scroll to top', 
      onclick: [actions.ScrollToTopButtonActions.scroll] 
    }, { key: 'scroll-to-top' }); 
    x(button)
  }
}

export const ScrollToTopButton = (scrollPosition: number) => [
  { SrcollToTopButtonView }, {
    props: { scrollPosition },
    actions: { ScrollToTopButtonActions }
  }
]
