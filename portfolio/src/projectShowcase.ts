
import { div, ul, li, span, video, source } from '../vendor/modules/HTMLElements.js';
import { LazyImage } from '../vendor/modules/lazyImage.js';
import { Carousel } from './carousel.ts';

interface props {
  project: {
    brand: string,
    name: string,
    summary: string,
    techList: string[],
    media: object[],
    placeholderImg: string
  },
  index: number
}

export const ProjectShowcaseView =

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  e(div, { class: 'project-showcase' })
    e(div, { class: 'container-full spacer-zero' })

      c(Carousel(
        `carouselProject${props.index + 1}`, 
        props.project.media, 

        (media: { type: string, url: string }, 
        index: number,
        carouselProps: { activeIndex: number } 
        ) => {

          e(div, { class: 'project-media-container'}); 

            if (media.type === 'image') {
              c(LazyImage({
                url: media.url, 
                placeholderUrl: props.project.placeholderImg,  
              }));
            }
            else if (media.type === 'video') {
              e(video, { 
                  class: `video ${index === carouselProps.activeIndex ? 'playing' : 'stopped'}`, 
                  controls: true, 
                  autoplay: false,
                  muted: true,
                  playsInline: true
                }, 
                { key: 'videoId' + index })
                e(source, { src: media.url, type: 'video/mp4'})
              x(video)
            }
          x(div)
        }
      ))
    x(div)
    e(div, { class: 'container spacer' })
      e(div, { class: 'content-section' })
        e(div, { class: 'project-title spacer'})
          e(span, { class: 'text-subheading' , text: props.project.brand }); x(span)
          e(span, { class: '', text: ' - ' + props.project.name }); x(span)
        x(div)
        e(ul, { class: 'tech-list spacer-sm'})

          props.project.techList.forEach((techName: string) => {
            e(li, { class: 'tech-name font-small', text: techName }); x(li)
          })
        x(ul)
        e(div, { class: 'font-small underline spacer', text: props.project.summary }); x(div)
      x(div)
    x(div)
  x(div)
}