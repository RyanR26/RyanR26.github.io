import * as data from './work.json';
import { div, section, ul, li, span, img } from '../vendor/modules/HTMLElements.js';
import { ScreenContainerView } from './screenContainer.js';
import { LazyImage } from '../vendor/modules/lazyImage.js';
import { Link, Switch, Route } from '../vendor/modules/Router.js';
import { Carousel } from './carousel.ts';

export const WorkView = 

(): Function => 
(e: Function, x: Function, {component: c}: {component: Function, lazy: Function}): void => {
  
  c({ ScreenContainerView }, { props: {
    title: data.title,
    section: data.section,
    children: () => {

      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-heading', 
          text: data.intro })
        x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-subheading font-serif', 
          text: data.subIntro })
        x(div)
      x(section)
      e(section, { class: 'container'})
        e(div, { class: 'content-section underline text-container', 
          text: data.content })
        x(div)
      x(section)
      e(section, { class: 'container'})
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
        e(div, { class: 'container'})
          e(div, { class: 'content-section underline', text: data.showcase.heading }); x(div)

          c(Carousel(
            'carouselProjectOne', 
            data.showcase.projects[0].images, 
            (image: string) => {
              e(div); 
                e(img, { src: image, loading: 'lazy', style: { width: '100%'} })
              x(div)
          }
          ))

        x(div)
      x(section)
    }
  }})
}