import * as data from '../data/skills.json';
import { div, section, ul, li } from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.ts';
import { SectionIntroView } from '../partials/sectionIntro.ts';

export const SkillsView = 

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
        e(div, { class: 'content-section underline', text: data.rolesIntro }); x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section text-container underline' }); 
          e(ul, { class: 'skills-list' })

            data.roles.forEach((role: string) => {
              e(li, { text: role })
              x(li)
            })

          x(ul)
        x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline', text: data.technologiesIntro }); x(div)
      x(section)
      e(section, { class: 'container'})
      e(div, { class: 'content-section text-container' }); 
        e(ul, { class: 'skills-list technologies-list' })

          data.technologies.forEach((technology: string) => {
            e(li, { text: technology })
            x(li)
          })

        x(ul)
      x(div)
    x(section)
    }
  }})
}