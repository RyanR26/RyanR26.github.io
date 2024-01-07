import { div } from '../vendor/modules/HTMLElements.js';
import { TopBarView } from './topBar.js';

interface props {
  title: 'string',
  section: 'string',
  children: Function
}

export const ScreenContainerView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  e(div, { class: `screen-container ${props.section}` })

    c({ TopBarView }, { props: {
      title: props.title,
      section: props.section
    }})

    props.children()

  x(div)
}
    