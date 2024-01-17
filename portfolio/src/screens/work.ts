import * as data from '../data/work.json';
import { div, section, ul, li, span, h4, a } from '../../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from '../partials/screenContainer.ts';
import { SectionIntroView } from '../partials/sectionIntro.ts';
import { LazyImage } from '../../vendor/modules/lazyImage.js';
import { ProjectShowcaseView } from '../partials/projectShowcase.ts';

interface props {
  scrollPosition: number
}

interface brand { 
  name: string,
  url: string, 
  img: string, 
  placeholderImg: string 
}

export const WorkView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function, lazy: Function}): void => {
  
  c({ ScreenContainerView }, { 
    props: {
      title: data.title,
      section: data.section,
      colorTheme: data.colorTheme,
      scrollPosition: props.scrollPosition,
      children: () => {

        c({ SectionIntroView }, {
          props: {
            intro: data.intro,
            subIntro: data.subIntro
        }})

        e(section, { class: 'container'})
          e(div, { class: 'content-section underline text-container' })
            e(div, { class: 'three-quarter-width', text: data.content });  x(div)
          x(div)
        x(section)
        e(section, { class: 'container spacer-lg'})
          e(ul, { class: 'client-tiles' })

            data.brands.forEach((brand: brand) => {
              e(li, { class: 'client-tile intro-animation intro-animation-fade' }); 

                c(LazyImage({
                  url: brand.img, 
                  placeholderUrl: brand.placeholderImg, 
                  alText: `${brand.name} logo`, 
                  classes: 'client-logo'
                }));

                e(span, { class: 'client-name', text: brand.name }); x(span)

                if (brand.url !== '') {
                  e(a, { href: brand.url, target: '_blank' }); x(a)
                }
              x(li)
            })
          x(ul)
        x(section)
        e(section)
          e(div, { class: 'dark-theme' })
            e(div, { class: 'container no-padding-bottom'})
              e(h4, { class: 'content-section underline', text: data.showcase.heading }); x(h4)
            x(div)
          x(div)
          e(div, { class: 'project-showcase-container' })

            data.showcase.projects.forEach((
              project: object, 
              index: number) => {

                c({ ProjectShowcaseView }, { 
                  props: {
                    project,
                    index
                }})
            })
          x(div)
        x(section)

      }
  }})
}