import { div, span } from '../../vendor/modules/HTMLElements';

interface props {
  rotate?: boolean
}

export const LogoView = 

(props: props): Function => 
(e: Function, x: Function): void => {  

  const key: string = `key_${props?.rotate ? 'rotate' : 'static'}`

  e(div, { class: `logo ${props?.rotate ? 'rotate' : ''}`}, { key })
    e(span, { text: 'R' }); x(span)
    e(span, { text: 'R' }); x(span)
  x(div)
} 