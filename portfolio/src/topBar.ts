import { Link } from '../vendor/modules/Router.js';
import { div, section, span } from '../vendor/modules/HTMLElements.js';

interface props {
  title: 'string',
  section: 'string'
}

export const TopBarView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  e(section, { class: 'top-bar dark-theme' })
    e(div, { class: 'content-section container top-bar-content-container' })
      e(div, { class: 'heading text-subheading dot-grid', text: props.title }); 
        e(span, { class: 'text-subheading font-serif', text: ' - ' + props.section }); x(span)
      x(div)
      e(div, { class: 'close' })
        c(Link('', '/'))
      x(div)
    x(div)
  x(section)
}
