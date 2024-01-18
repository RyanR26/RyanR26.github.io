import * as data from '../data/about.json';
import { div, section, span } from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.js';
import { SectionIntroView } from '../partials/sectionIntro.js';
import { LogoView } from '../partials/logo.js';

interface props {
  scrollPosition: number
}

export const AboutView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  c({ ScreenContainerView }, { props: {
    title: data.title,
    section: data.section,
    colorTheme: data.colorTheme,
    scrollPosition: props.scrollPosition,
    children: () => {

      c({ SectionIntroView }, {
        props: {
          intro: data.intro,
          subIntro: data.subIntro,
          content: data.professionalContent
      }})

      e(section, { class: 'container'})
        // e(div, { class: 'content-section content-inline text-container underline' }); 
        //   e(div, { class: 'three-quarter-width', innerHTML: data.professionalContent }); x(div)
        //   e(div, { class: 'logo-container-inline'})
        //     c({ LogoView })
        //   x(div)
        // x(div)

        e(div, { class: 'content-section text-container' });
          e(div, { class: 'font-xsmall font-serif', innerHTML: data.personalContent }); x(div)
        x(div)
      x(section)
    }
  }})
}