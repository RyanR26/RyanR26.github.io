import { section, h2, h3 } from '../vendor/modules/HTMLElements.js';

interface props {
  intro: 'string',
  subIntro: 'string',
}

export const SectionIntroView = 

(props: props): Function => 
(e: Function, x: Function): void => {

  e(section, { class: 'container'})
    e(h2, { class: 'content-section underline text-heading', text: props.intro }); x(h2)
  x(section)
  e(section, { class: 'container'})
    e(h3, { class: 'content-section underline text-subheading font-serif', text: props.subIntro }); x(h3)
  x(section)
}