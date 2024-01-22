import { Link } from '../../vendor/modules/Router.js';
import { div, span, h1 } from '../../vendor/modules/HTMLElements.js';

interface props {
  title: 'string',
  section: 'string'
}

export const TopBarView = 

(props: props): Function => 
(e: Function, x: Function, {component: c, block}: {component: Function, block: Function}): void => {

  block('top-bar', () => {
    e(div, { class: 'top-bar dark-theme' })
      e(div, { class: 'content-section container top-bar-content-container' })
        e(h1, { class: 'heading  dot-grid' });
          e(span, { text: props.title }); x(span)
          e(span, { class: 'font-serif', text: props.section }); x(span)
        x(h1)
        e(div, { class: 'close' })
          c(Link('', '/'))
        x(div)
      x(div)
    x(div)
  }, undefined, 'section')

}
