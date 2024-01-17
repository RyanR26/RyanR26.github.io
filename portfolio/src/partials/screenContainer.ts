import { div } from '../../vendor/modules/HTMLElements.js';
import { TopBarView } from './topBar.js';
import { ScrollToTopButton } from '../partials/scrollToTopButton.ts';

interface props {
  title: string,
  section: string,
  colorTheme: string,
  children: Function,
  scrollPosition?: number
}

export const ScreenContainerView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  e(div, { class: `screen-container ${props.colorTheme}` })

    c({ TopBarView }, { props: {
      title: props.title,
      section: props.section
    }})

    props.children()

    if (props.scrollPosition) {
      c(ScrollToTopButton(props.scrollPosition))
    }

  x(div)
}
    