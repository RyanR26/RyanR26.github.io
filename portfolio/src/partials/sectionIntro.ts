import { section, div, h2, h3 } from '../../vendor/modules/HTMLElements.js';
import { LogoView } from './logo.js';

interface props {
  intro: string,
  subIntro: string,
  content: InnerHTML,
  underline?: boolean
}

export const SectionIntroView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  const underline = props?.underline !== undefined ? props.underline : true;

  e(section, { class: 'container'})
    e(h2, { class: 'content-section underline text-heading', text: props.intro }); x(h2)
  x(section)
  e(section, { class: 'container'})
    e(h3, { class: 'content-section underline text-subheading font-serif', text: props.subIntro }); x(h3)
  x(section)
  e(section, { class: 'container'})
  
    e(div, { class: `content-section content-inline text-container ${underline ? 'underline' : ''}` })
      e(div, { class: 'three-quarter-width', innerHTML: props.content }); x(div)
      e(div, { class: 'logo-container-inline'})
        c({ LogoView })
      x(div)
    x(div)
  x(section)

}