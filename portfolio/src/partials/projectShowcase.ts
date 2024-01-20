
import { div, ul, li, span, video, source, img, dl, dt, dd } from '../../vendor/modules/HTMLElements.js';
import { Carousel } from './carousel.ts';

interface props {
  project: {
    brand: string,
    name: string,
    summary: string,
    role: string,
    objective?: string,
    details: string | InnerHTML,
    techList: string[],
    media: object[],
    placeholderImg: string
  },
  index: number
}

export const ProjectShowcaseView =

(props: props): Function => 
(e: Function, x: Function, {component: c, block}: {component: Function, block: Function}): void => {

  const id = `${props.project.name.replace(/ /g, '-').toLowerCase()}`;

  e(div, { id, class: `project-showcase ${props.index % 2 == 0 ? 'dark-theme' : ''}` }, { key: id })
    e(div, { class: 'container-full spacer-zero intro-animation intro-animation-scale' })

      c(Carousel(
        `carouselProject${props.index + 1}`, 
        props.project.media, 

        (media: { type: string, url: string, poster?: string, background?: string }, 
        index: number,
        carouselProps: { activeIndex: number }) => {

          e(div, { class: 'project-media-container ' })

            if (media.background) {
              e(div, { class: 'blurred-image-background', style: { 'background-image': `url(${media.background})` }}); x(div)
            }

            if (media.type === 'image') {
              e(img, { 
                src: media.url, 
                loading: 'lazy', 
                class:  media.background ? 'image-contain' : '', 
                alt: `${props.project.brand} - ${props.project.name} - project image`
              })
            }
            else if (media.type === 'video') {
              e(video, { 
                  class: `video ${media.background ? 'image-contain' : ''} ${index === carouselProps.activeIndex ? 'playing' : 'stopped'}`, 
                  controls: true, 
                  autoplay: false,
                  muted: true,
                  playsInline: true,
                  loop: true,
                  ...( media.poster ? { poster: media.poster } : {})
                }, 
                )
                e(source, { src: media.url, type: 'video/mp4'})
              x(video)
            }
          x(div)
        }
      ))
    x(div)

    block(`project-details-${props.index}`, () => {
      e(div, { class: 'container spacer intro-animation intro-animation-fade' })
        e(div, { class: 'content-section' })
          e(div, { class: 'project-title underline spacer margin'})
            e(span, { class: 'text-subheading' , text: props.project.brand }); x(span)
            e(span, { class: '', text: ' - ' + props.project.name }); x(span)
          x(div)

          e(ul, { class: 'tech-list spacer'})
            props.project.techList.forEach((techName: string) => {
              e(li, { class: 'tech-name font-small', text: techName }); x(li)
            })
          x(ul)
          
          e(div, { class: 'project-detail project-summary spacer-sm' })
            e(span, { class: 'project-detail-title spacer-sm', text: 'Summary:' }); x(span)
            e(span, { class: 'font-small', text: props.project.summary }); x(span)
          x(div)
          e(div, { class: 'project-detail project-role spacer-sm' })
            e(span, { class: 'project-detail-title spacer-sm', text: 'Role:' }); x(span)
            e(span, { class: 'font-small spacer-sm', text: props.project.role }); x(span)
          x(div)

          e(dl)
            e(dt, { class: 'project-detail-title spacer-sm', text: 'Objective:' }); x(dt)
            e(dd, { class: 'font-small spacer-sm', text: props.project.objective }); x(dd)
            e(dt, { class: 'project-detail-title spacer-sm', text: 'Details:' }); x(dt)
            e(dd, { class: 'font-small spacer', innerHTML: props.project.details }); x(dd)
          x(dl)

        x(div)
      x(div)
    })

  x(div)

}