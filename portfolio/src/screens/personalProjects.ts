import * as data from '../data/personalProjects.json';
import { div, span, section, h4, ul, li, a, img} from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.js';
import { SectionIntroView } from '../partials/sectionIntro.js';

interface props {
  scrollPosition: number
}

interface project {  
  name: string,
  title: string,
  summary: string,
  usps: string[],
  links: { url: string, label: string, img: string }[]
}

export const PersonalProjectsView = 

(props: props): Function => 
(e: Function, x: Function, {component: c, block}: {component: Function, block: Function}): void => {

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
          content: data.content,
          underline: false
      }})

      block('personal-projects', () => {
        e(section, { class: 'dark-theme' })
          e(div, { class: 'container'})
            e(h4, { class: 'content-section underline', text: data.showcase.heading }); x(h4)
          x(div)
          e(div, { class: 'project-showcase-container spacer' })

            data.showcase.projects.forEach((
              project: project,
              index: number
              ) => {

                e(div, { class: 'container spacer-sm intro-animation intro-animation-fade' })
                  e(div, { class: `content-section ${index !== data.showcase.projects.length - 1 ? 'underline' : ''}` })
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
                          e(a, { 
                              class: `link ${link.url ? '' : 'link-disable'}`, 
                              text: link.label,
                              href: link.url, 
                              target: '_blank',
                              ...( link.url ? {} : { tabindex: '-1' })
                            }); 
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
      })
    }
  }})
}