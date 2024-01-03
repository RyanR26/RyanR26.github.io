import { Link } from '../vendor/modules/Router.js';
import { div, section, span } from '../vendor/modules/HTMLElements.js';

interface props {
  title: 'string',
  section: 'string'
}

export const TopBarView = (props: props): Function => (e: Function, x: Function, {component: c}: {component: Function}): void => {

  e(section, { class: 'container' })
    e(div, { class: 'content-section underline top-bar' })
      e(div, { class: 'text-subheading', text: props.title }); 
        e(span, { class: 'text-subheading text-serif', text: ' - ' + props.section }); x(span)
      x(div)
      e(div, { class: 'close' })
        c(Link('', '/'))
      x(div)
    x(div)
  x(section)
  
}
