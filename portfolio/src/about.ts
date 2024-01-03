import * as data from './about.json';
import { div, section } from '../vendor/modules/HTMLElements.js';
import { TopBarView } from './topBar.js';

export const AboutView = 
  (): Function => 
  (e: Function, x: Function, {component: c}: {component: Function}): void => {
    
    e(div, { class: 'screen-container' })

      c({ TopBarView }, { props: {
        title: data.title,
        section: data.section
      }})

      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-heading', text: data.intro }); x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-subheading text-serif', text: data.subIntro }); x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section text-container' }); 
          e(div, { innerHTML: data.professionalContent }); x(div)
          e(div, { innerHTML: data.personalContent }); x(div)
        x(div)
      x(section)
    x(div)
}