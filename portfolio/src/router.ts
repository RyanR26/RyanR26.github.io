import { Switch, Route } from '../vendor/modules/Router.js';
import { NavView } from './nav.ts';
import { div } from '../vendor/modules/HTMLElements.js';

export const RouterView = (props: object): Function => (e: Function, x: Function, { component: c }: { component: Function }): void => {

  c(Switch(

    Route('/', () => c({ NavView }, { props: { ...props }})),

    Route('/about', () => {
      e(div, { text: 'about me', class: 'screen-container'})
      x(div)
    }),

    Route('/contact', () => {
      e(div, { text: 'contact me', class: 'screen-container'})
      x(div)
    }),

    Route('/projects', () => {
      e(div, { text: 'projects', class: 'screen-container'})
      x(div)
    })

  ));
}