import { nav, div, span } from '../vendor/modules/HTMLElements.js';
import { Link } from '../vendor/modules/Router.js';
import { ClockView } from './clock.js';

interface props {
  routeTransition: string,
  clock: object
}

export const NavView = 

(props: props): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  const navItem = (name: string, path: string, className?: string): void => {
    e(div, { class: `nav-item ${className || ''} ${ props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`})
      e(div)
        c(Link(name, path, 'dot-grid'))
      x(div)
    x(div)
  }

  const contentItem = (children: Function): void => {
    e(div, { class: `nav-item content-item ${ props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`})
      children()
    x(div)
  }

  const mainContent = (): void => {
    e(div, { class: `nav-item content-container ${ props.routeTransition === 'in' ? 'transition-in' : 'transition-out'}`})
      e(div); 
        logo()
      x(div) 
    x(div)
  }

  const logo = (): void => {
    e(div, { class: 'logo rotate'})
      e(span, { text: 'R' }); x(span)
      e(span, { text: 'R' }); x(span)
    x(div)
  }

  e(nav, { class: 'nav' })
    contentItem(() => c({ ClockView }, { props: { ...props.clock }}))
    navItem('about', '/about', 'pink')
    navItem('projects', '/projects')
    navItem('personal projects', '/peronsal-projects', 'red')
    mainContent()
    navItem('work', '/work', 'purple')
    navItem('test3', '/test3')
    navItem('skills & abilities', '/skills', 'green')
    contentItem(() => {
      e(div, { class: 'bottom-right', text: 'Built with Karbon UI framework'})
      x(div)
    })
  x(nav)
  
}