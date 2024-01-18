import * as data from '../data/skills.json';
import { div, section, h4, ul, li } from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.ts';
import { SectionIntroView } from '../partials/sectionIntro.ts';

interface props {
  scrollPosition: number
}

export const SkillsView = 

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
          content: data.rolesIntro,
          underline: false
      }})
      
      e(section, { class: 'dark-theme'})
        e(div, { class: 'container intro-animation intro-animation-fade'})
          e(h4, { class: 'content-section underline', text: data.rolesHeading }); x(h4)
          e(div, { class: 'content-section text-container' }); 
            e(ul, { class: 'skills-list' })

              data.roles.forEach((role: string) => {
                e(li, { text: role }); x(li)
              })

            x(ul)
          x(div)
        x(div)
      x(section)
      e(section, { class: 'container intro-animation intro-animation-fade'})
        e(h4, { class: 'content-section underline', text: data.technologiesHeading }); x(h4)
        e(div, { class: 'content-section text-container' })
          e(ul, { class: 'skills-list technologies-list' })

            data.technologies.forEach((technology: string) => {
              e(li, { text: technology }); x(li)
            })

          x(ul)
        x(div)
        e(div, { class: 'content-section font-xsmall font-serif', text: data.technologiesFooter }); x(div)
      x(section)
    }
  }})
}