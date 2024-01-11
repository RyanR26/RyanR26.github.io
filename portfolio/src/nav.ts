import * as data from './data/nav.json';
import { nav, div, span, ul, li, a, button } from '../vendor/modules/HTMLElements.js';
import { Link } from '../vendor/modules/Router.js';
import { ClockView } from './clock.ts';
import { Debounce } from '../vendor/modules/time.js';


interface props {
  routeTransition: string,
  clock: object,
  contactShow: boolean,
  hoveredItem: string,
  router: {
    current: string,
    next: string
  }
}

interface actions {
  NavActions: {
    showContact: Function,
    setHoveredItem: Function,
    resetHoveredItem: Function
  }
}

interface dispatch {
  stamp: Function,
  msgs: Function,
  done: Function
}

export const NavState = {
  contactShow: false,
  hoveredItem: null
}

export const NavActions = (dispatch: dispatch) => ({

  showContact() {
    dispatch.msgs(
      ['state', {
        path: ['contactShow'],
        value: true
      }])
  },

  setHoveredItem(e: Event) {
    dispatch
    .stamp({
      id: 'set-hovered-item'
    })
    .msgs(
      ['cancel', {
        id: 'reset-hovered-item'
      }],
      Debounce(250, 'setHoverItem'),
      ['state', {
        path: ['hoveredItem'],
        value: (e.target as HTMLButtonElement).dataset.section
      }])
  },

  resetHoveredItem() {
    dispatch
    .stamp({
      id: 'reset-hovered-item'
    })
    .msgs(
      ['cancel', {
        id: 'set-hovered-item'
      }],
      Debounce(250, 'resetHoverItem'),
      ['state', {
        path: ['hoveredItem'],
        value: null
      }])
  },
})

export const NavView = 

(props: props, actions: actions): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {

  const navItem = (name: string, path: string, className?: string): void => {
    e(div, { 
      class: `nav-item ${className || ''} ${ props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`,
      data: [`section=${path.replace('/', '').split('-')[0]}`],
      onmouseenter: actions.NavActions.setHoveredItem,
      onmouseleave: actions.NavActions.resetHoveredItem
    })
      e(div)
        c(Link(name, path, 'dot-grid'))
      x(div)
    x(div)
  }

  const contentItem = (children: Function, id?: string): void => {
    e(div, { 
      class: `nav-item content-item ${ props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`,
      ...( id ? {
        data: [`section=${id}`],
        onmouseenter: actions.NavActions.setHoveredItem,
        onmouseleave: actions.NavActions.resetHoveredItem
      } : null)
    })
      children()
    x(div)
  }

  const mainContent = (): void => {
    e(div, { class: `nav-item content-container ${ props.routeTransition === 'in' ? 'transition-in' : 'transition-out'}`})
      e(div, { class: 'logo-container' }); 
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

    // contentItem(() => c({ ClockView }, { props: { ...props.clock }}))

    contentItem(() => {
      e(div, { class: 'center stack-content' })
        e(div, { class: 'pink-text', text: data.name }); x(div)
        e(div, { class: 'font-xsmall', text: data.main }); x(div)
      x(div)
    })

    navItem('about', '/about', 'pink-background')

    contentItem(() => {
      e(div, { class: 'info-snippet center font-xsmall' }, { key: props.hoveredItem })
        e(div, { text: data[(props.hoveredItem as keyof typeof data)] }); x(div)
      x(div)
    })

    navItem('personal projects', '/personal-projects', 'red-background')

    mainContent()

    navItem('work', '/work', 'purple-background')

    contentItem(() => {
      if (props.contactShow ) {
        e(div)
          e(ul, { class: 'contact-links'})
            e(li);
              e(a, { text: 'email', href: 'mailto:ryanrudman@yahoo.co.uk'}); x(a)
            x(li)
            e(li, { text: 'whatsapp'}); x(li)
            e(li, { text: 'github'}); x(li)
            e(li, { text: 'linkedIn'}); x(li)
          x(li)
        x(div)
      } else {
        e(button, { class: 'bottom-lef', text: 'CONTACT', onclick: actions.NavActions.showContact })
        x(button)
      }
    }, 'contact')

    navItem('skills & abilities', '/skills', 'green-background')

    contentItem(() => {
      e(div, { class: 'bottom-right font-xsmall', text: 'Built with Karbon UI framework'})
      x(div)
    })
  x(nav)
  
}