import * as data from './data/work.json';
import { div, section, ul, li, span, h4 } from '../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from './screenContainer.ts';
import { SectionIntroView } from './sectionIntro.ts';
import { LazyImage } from '../vendor/modules/lazyImage.js';
import { Link, Switch, Route } from '../vendor/modules/Router.js';
import { ProjectShowcaseView } from './projectShowcase.ts';

export const WorkView = 

(): Function => 
(e: Function, x: Function, {component: c}: {component: Function, lazy: Function}): void => {
  
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
        e(div, { class: 'content-section underline text-container', 
          text: data.content })
        x(div)
      x(section)
      e(section, { class: 'container spacer'})
        e(ul, { class: 'client-tiles' })

          data.brands.forEach((brand: { 
            name: string,
            url: string, 
            img: string, 
            placeholderImg: string 
          }) => {
            e(li, { class: 'client-tile' }); 

              c(Link(brand.name, brand.url))

              c(LazyImage({
                url: brand.img, 
                placeholderUrl: brand.placeholderImg, 
                alText: `${brand.name} logo`, 
                classes: 'client-logo'
              }));

              e(span, { class: 'client-name', text: brand.name }); x(span)

              c(Switch(
                Route(brand.url, () => {
                  e(div, { class: 'overlay '})
                    e(div, { text: ' details'}); x(div)
                  x(div)
                })
              ))
            x(li)
          })
        x(ul)
      x(section)
      e(section, { class: 'dark-theme' })
        e(div, { class: 'container spacer-lg'})
          e(h4, { class: 'content-section underline', text: data.showcase.heading }); x(h4)
        x(div)
        e(div, { class: 'project-showcase-container' })

          data.showcase.projects.forEach((
            project: object, 
            index: number) => {

              c({  ProjectShowcaseView }, { 
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