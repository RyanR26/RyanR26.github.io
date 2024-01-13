import * as data from '../data/personalProjects.json';
import { div, span, section, h4, ul, li, a, img} from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.js';
import { SectionIntroView } from '../partials/sectionIntro.js';

interface project {  
  name: string,
  title: string,
  summary: string,
  usps: string[],
  links: { url: string, label: string, img: string }[]
}

export const PersonalProjectsView = 

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
        e(div, { class: 'content-section', text: data.content }); x(div)
      x(section)

      e(section, { class: 'dark-theme' })
        e(div, { class: 'container'})
          e(h4, { class: 'content-section underline', text: data.showcase.heading }); x(h4)
        x(div)
        e(div, { class: 'project-showcase-container spacer' })

          data.showcase.projects.forEach((
            project: project) => {

              e(div, { class: 'container spacer-sm' })
                e(div, { class: 'content-section underline' })
                  e(div, { class: 'project-title spacer'})
                    e(span, { class: 'text-subheading' , text: project.name }); x(span)
                    e(span, { class: '', text: ' - ' + project.title }); x(span)
                  x(div)
                  e(ul, { class: 'tech-list spacer-sm'})
          
                    project.usps.forEach(usp => {
                      e(li, { class: 'tech-name font-small', text: usp }); x(li)
                    })
                  x(ul)
                  e(div, { class: 'font-small spacer-sm', innerHTML: project.summary }); x(div)
                  e(ul, { class: 'spacer-sm'})
          
                    project.links.forEach(link => {
                      e(li, { class: 'font-small' }); 
                        e(a, { class: 'link', text: link.label, href: link.url, target: '_blank' }); 
                          e(span, { class: 'link-icon' })
                            e(img, { src: link.img, alt: 'logo '})
                          x(span)
                        x(a)
                      x(li)
                    })
                  x(ul)
                x(div)
              x(div)
          })
        x(div)
      x(section)
    }
  }})
}