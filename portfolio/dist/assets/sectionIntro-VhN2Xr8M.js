import{s,d as e,c as a,a as i,L as u,e as r,f as d,g as h,j as f}from"./index-PYr0z4lB.js";const T=t=>(o,n,{component:c})=>{o(s,{class:"top-bar dark-theme"}),o(e,{class:"content-section container top-bar-content-container"}),o(a,{class:"heading  dot-grid"}),o(i,{text:t.title}),n(i),o(i,{class:"font-serif",text:t.section}),n(i),n(a),o(e,{class:"close"}),c(u("","/")),n(e),n(e),n(s)},m=t=>({scroll(){t.msgs(["effect",{def:()=>{window.scroll({top:0,left:0,behavior:"smooth"})}}])}}),g=(t,o)=>(n,c)=>{const l=t.threshold||400;t.scrollPosition>l&&(n(r,{class:"scroll-to-top",text:"scroll to top",onclick:o.ScrollToTopButtonActions.scroll},{key:"scroll-to-top"}),n(i),c(i),c(r))},w=t=>[{SrcollToTopButtonView:g},{props:{scrollPosition:t},actions:{ScrollToTopButtonActions:m}}],b=t=>(o,n,{component:c})=>{o(e,{class:`screen-container ${t.colorTheme}`}),c({TopBarView:T},{props:{title:t.title,section:t.section}}),t.children(),t.scrollPosition&&c(w(t.scrollPosition)),n(e)},B=t=>(o,n,{component:c})=>{const l=(t==null?void 0:t.underline)!==void 0?t.underline:!0;o(s,{class:"container"}),o(d,{class:"content-section underline text-heading",text:t.intro}),n(d),n(s),o(s,{class:"container"}),o(h,{class:"content-section underline text-subheading font-serif",text:t.subIntro}),n(h),n(s),o(s,{class:"container"}),o(e,{class:`content-section content-inline text-container ${l?"underline":""}`}),o(e,{class:"three-quarter-width",innerHTML:t.content}),n(e),o(e,{class:"logo-container-inline"}),c({LogoView:f}),n(e),n(e),n(s)};export{b as S,B as a};
