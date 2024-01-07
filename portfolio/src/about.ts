import * as data from './about.json';
import { div, section } from '../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from './screenContainer.js';

export const AboutView = 

(): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  c({ ScreenContainerView }, { props: {
    title: data.title,
    section: data.section,
    children: () => {
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-heading', text: data.intro }); x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-subheading font-serif', text: data.subIntro }); x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section text-container' }); 
          e(div, { innerHTML: data.professionalContent }); x(div)
          e(div, { innerHTML: data.personalContent }); x(div)
        x(div)
      x(section)
    }
  }})
}