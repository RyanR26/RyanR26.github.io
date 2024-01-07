import * as data from './skills.json';
import { div, section, ul, li } from '../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from './screenContainer.js';

export const SkillsView = 

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