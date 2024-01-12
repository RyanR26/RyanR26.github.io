import * as data from '../data/about.json';
import { div, section } from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.js';
import { SectionIntroView } from '../partials/sectionIntro.js';

export const AboutView = 

(): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  c({ ScreenContainerView }, { props: {
    title: data.title,
    section: data.section,
    colorTheme: data.colorTheme,
    children: () => {

      c({ SectionIntroView }, {
        props: {
          intro: data.intro,
          subIntro: data.subIntro
      }})

      e(section, { class: 'container'})
        e(div, { class: 'content-section text-container' }); 
          e(div, { innerHTML: data.professionalContent }); x(div)
          e(div, { innerHTML: data.personalContent }); x(div)
        x(div)
      x(section)
    }
  }})
}