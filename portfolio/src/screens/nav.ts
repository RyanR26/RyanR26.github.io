import * as data from '../data/nav.json';
import { nav, div, span, ul, li, a, button } from '../../vendor/modules/HTMLElements.js';
import { Link } from '../../vendor/modules/Router.js';
import { Debounce } from '../../vendor/modules/time.js';

interface navData {
  snippet: string,
  name: string,
  path?: string,
  className?: string,
  links?: {
    label: string,
    url: string,
    type: string,
    img: string
  }[]
}

interface props {
  routeTransition: string,
  clock: object,
  contactShow: boolean,
  hoveredItem: string,
  viewportSize: string,
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

const aboutData: navData = data.about;
const workData: navData = data.work;
const skillsetData: navData = data.skillset;
const personalProjectsData: navData = data.personal_projects;
const contactData: navData = data.contact;

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
      Debounce(100, 'setHoverItem'),
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
      Debounce(100, 'resetHoverItem'),
      ['state', {
        path: ['hoveredItem'],
        value: null
      }])
  },
})

export const NavView = 

(props: props, actions: actions): Function => 
(e: Function, x: Function, {component: c}: {component: Function}): void => {


  const navItem = (name: string, path: string='/', className?: string): void => {
    const dataAttributeValue: string = path.replace('/', '').replace('-', '_');
    e(div, { 
      class: `nav-item route-link ${className || ''} ${props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`,
      data: [`section=${dataAttributeValue}`],
      onmouseenter: actions.NavActions.setHoveredItem,
      onmouseleave: actions.NavActions.resetHoveredItem
    }, { key: 'key_' + dataAttributeValue })
      e(div)
        c(Link(name, path, 'dot-grid'))
      x(div)
    x(div)
  }

  const contentItem = (children: Function, key: string, id?: string): void => {
    e(div, { 
      class: `nav-item content-item ${ props.routeTransition === 'in' ? 'fade-out' : 'fade-in'}`,
      ...( id ? {
        data: [`section=${id}`],
        onmouseenter: actions.NavActions.setHoveredItem,
        onmouseleave: actions.NavActions.resetHoveredItem
      } : null)
    }, { key: 'key_' + key })
      children()
    x(div)
  }

  const mainContent = (): void => {
    e(div, { class: `nav-item content-container ${ props.routeTransition === 'in' ? 'transition-in' : 'transition-out'}`}, { key : 'main-content'})
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

  const heading = (): void => {
    e(div, { class: 'center stack-content' })
      e(div, { class: 'pink-text', text: data.heading.title }); x(div)
      e(div, { class: 'font-xsmall', text: data.heading.subtitle }); x(div)
    x(div)
  }

  const dynamicTextInfo = (): void => {
    const navData: any = data[props.hoveredItem as keyof typeof data];
    e(div, { class: 'info-snippet center font-xsmall' }, { key: props.hoveredItem })
      if (!!navData) {
        e(div, { text: navData.snippet }); x(div)
      }
    x(div)
}

  const contact = (): void => {
    if (props.contactShow ) {
      e(div)
        e(ul, { class: 'contact-links'})
          contactData.links?.forEach(link => {
            e(li);
              e(a, { 
                class: 'font-xsmall', 
                text: link.label, 
                href: link.url, 
                ...(link.type === 'external' ? { target: '_blank' } : {}),
                ...(link.type === 'download' ? { download: link.url } : {})
              })
              x(a)
            x(li)
          })
        x(li)
      x(div)
    } 
    else {
      e(button, { text: contactData.name, onclick: actions.NavActions.showContact }); x(button)
    }
  }

  const footer = (): void => {
    e(div, { class: 'bottom-right font-xxsmall', text: data.footer.content })
    x(div)
  }

  const viewportLarge: boolean = props.viewportSize === 'large';

  e(nav, { class: `nav ${!viewportLarge ? 'nav-small' : ''}` })

    contentItem(heading, 'heading')

    navItem(aboutData.name, aboutData.path, aboutData.className)

    if (viewportLarge) {
      contentItem(dynamicTextInfo, 'dynamicTextInfo')
    }

    navItem(personalProjectsData.name, personalProjectsData.path, personalProjectsData.className)

    if (viewportLarge) {
      mainContent()
    }

    navItem(workData.name, workData.path, workData.className)

    contentItem(contact, 'contact', contactData.name)

    navItem(skillsetData.name, skillsetData.path, skillsetData.className)

    if (viewportLarge) {
      contentItem(footer, 'footer')
    }

  x(nav)
  
}