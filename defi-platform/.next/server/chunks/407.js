"use strict";exports.id=407,exports.ids=[407],exports.modules={27407:(e,r,t)=>{t.d(r,{Accordion:()=>en,AccordionContent:()=>el,AccordionItem:()=>eo,AccordionTrigger:()=>ei});var a=t(60687),n=t(43210),o=t(11273),i=t(9510),l=t(98599),s=t(70569),d=t(65551),c=t(14163),p=t(66156),f=t(46059),u=t(96963),m="Collapsible",[x,h]=(0,o.A)(m),[b,v]=x(m),w=n.forwardRef((e,r)=>{let{__scopeCollapsible:t,open:o,defaultOpen:i,disabled:l,onOpenChange:s,...p}=e,[f=!1,m]=(0,d.i)({prop:o,defaultProp:i,onChange:s});return(0,a.jsx)(b,{scope:t,disabled:l,contentId:(0,u.B)(),open:f,onOpenToggle:n.useCallback(()=>m(e=>!e),[m]),children:(0,a.jsx)(c.sG.div,{"data-state":R(f),"data-disabled":l?"":void 0,...p,ref:r})})});w.displayName=m;var j="CollapsibleTrigger",y=n.forwardRef((e,r)=>{let{__scopeCollapsible:t,...n}=e,o=v(j,t);return(0,a.jsx)(c.sG.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":R(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...n,ref:r,onClick:(0,s.m)(e.onClick,o.onOpenToggle)})});y.displayName=j;var g="CollapsibleContent",A=n.forwardRef((e,r)=>{let{forceMount:t,...n}=e,o=v(g,e.__scopeCollapsible);return(0,a.jsx)(f.C,{present:t||o.open,children:({present:e})=>(0,a.jsx)(N,{...n,ref:r,present:e})})});A.displayName=g;var N=n.forwardRef((e,r)=>{let{__scopeCollapsible:t,present:o,children:i,...s}=e,d=v(g,t),[f,u]=n.useState(o),m=n.useRef(null),x=(0,l.s)(r,m),h=n.useRef(0),b=h.current,w=n.useRef(0),j=w.current,y=d.open||f,A=n.useRef(y),N=n.useRef(void 0);return n.useEffect(()=>{let e=requestAnimationFrame(()=>A.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,p.N)(()=>{let e=m.current;if(e){N.current=N.current||{transitionDuration:e.style.transitionDuration,animationName:e.style.animationName},e.style.transitionDuration="0s",e.style.animationName="none";let r=e.getBoundingClientRect();h.current=r.height,w.current=r.width,A.current||(e.style.transitionDuration=N.current.transitionDuration,e.style.animationName=N.current.animationName),u(o)}},[d.open,o]),(0,a.jsx)(c.sG.div,{"data-state":R(d.open),"data-disabled":d.disabled?"":void 0,id:d.contentId,hidden:!y,...s,ref:x,style:{"--radix-collapsible-content-height":b?`${b}px`:void 0,"--radix-collapsible-content-width":j?`${j}px`:void 0,...e.style},children:y&&i})});function R(e){return e?"open":"closed"}var C=t(43),I="Accordion",k=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[_,D,O]=(0,i.N)(I),[G,T]=(0,o.A)(I,[O,h]),H=h(),P=n.forwardRef((e,r)=>{let{type:t,...n}=e;return(0,a.jsx)(_.Provider,{scope:e.__scopeAccordion,children:"multiple"===t?(0,a.jsx)(F,{...n,ref:r}):(0,a.jsx)(z,{...n,ref:r})})});P.displayName=I;var[B,E]=G(I),[S,q]=G(I,{collapsible:!1}),z=n.forwardRef((e,r)=>{let{value:t,defaultValue:o,onValueChange:i=()=>{},collapsible:l=!1,...s}=e,[c,p]=(0,d.i)({prop:t,defaultProp:o,onChange:i});return(0,a.jsx)(B,{scope:e.__scopeAccordion,value:c?[c]:[],onItemOpen:p,onItemClose:n.useCallback(()=>l&&p(""),[l,p]),children:(0,a.jsx)(S,{scope:e.__scopeAccordion,collapsible:l,children:(0,a.jsx)(U,{...s,ref:r})})})}),F=n.forwardRef((e,r)=>{let{value:t,defaultValue:o,onValueChange:i=()=>{},...l}=e,[s=[],c]=(0,d.i)({prop:t,defaultProp:o,onChange:i}),p=n.useCallback(e=>c((r=[])=>[...r,e]),[c]),f=n.useCallback(e=>c((r=[])=>r.filter(r=>r!==e)),[c]);return(0,a.jsx)(B,{scope:e.__scopeAccordion,value:s,onItemOpen:p,onItemClose:f,children:(0,a.jsx)(S,{scope:e.__scopeAccordion,collapsible:!0,children:(0,a.jsx)(U,{...l,ref:r})})})}),[K,L]=G(I),U=n.forwardRef((e,r)=>{let{__scopeAccordion:t,disabled:o,dir:i,orientation:d="vertical",...p}=e,f=n.useRef(null),u=(0,l.s)(f,r),m=D(t),x="ltr"===(0,C.jH)(i),h=(0,s.m)(e.onKeyDown,e=>{if(!k.includes(e.key))return;let r=e.target,t=m().filter(e=>!e.ref.current?.disabled),a=t.findIndex(e=>e.ref.current===r),n=t.length;if(-1===a)return;e.preventDefault();let o=a,i=n-1,l=()=>{(o=a+1)>i&&(o=0)},s=()=>{(o=a-1)<0&&(o=i)};switch(e.key){case"Home":o=0;break;case"End":o=i;break;case"ArrowRight":"horizontal"===d&&(x?l():s());break;case"ArrowDown":"vertical"===d&&l();break;case"ArrowLeft":"horizontal"===d&&(x?s():l());break;case"ArrowUp":"vertical"===d&&s()}let c=o%n;t[c].ref.current?.focus()});return(0,a.jsx)(K,{scope:t,disabled:o,direction:i,orientation:d,children:(0,a.jsx)(_.Slot,{scope:t,children:(0,a.jsx)(c.sG.div,{...p,"data-orientation":d,ref:u,onKeyDown:o?void 0:h})})})}),$="AccordionItem",[J,M]=G($),Q=n.forwardRef((e,r)=>{let{__scopeAccordion:t,value:n,...o}=e,i=L($,t),l=E($,t),s=H(t),d=(0,u.B)(),c=n&&l.value.includes(n)||!1,p=i.disabled||e.disabled;return(0,a.jsx)(J,{scope:t,open:c,disabled:p,triggerId:d,children:(0,a.jsx)(w,{"data-orientation":i.orientation,"data-state":er(c),...s,...o,ref:r,disabled:p,open:c,onOpenChange:e=>{e?l.onItemOpen(n):l.onItemClose(n)}})})});Q.displayName=$;var V="AccordionHeader",W=n.forwardRef((e,r)=>{let{__scopeAccordion:t,...n}=e,o=L(I,t),i=M(V,t);return(0,a.jsx)(c.sG.h3,{"data-orientation":o.orientation,"data-state":er(i.open),"data-disabled":i.disabled?"":void 0,...n,ref:r})});W.displayName=V;var X="AccordionTrigger",Y=n.forwardRef((e,r)=>{let{__scopeAccordion:t,...n}=e,o=L(I,t),i=M(X,t),l=q(X,t),s=H(t);return(0,a.jsx)(_.ItemSlot,{scope:t,children:(0,a.jsx)(y,{"aria-disabled":i.open&&!l.collapsible||void 0,"data-orientation":o.orientation,id:i.triggerId,...s,...n,ref:r})})});Y.displayName=X;var Z="AccordionContent",ee=n.forwardRef((e,r)=>{let{__scopeAccordion:t,...n}=e,o=L(I,t),i=M(Z,t),l=H(t);return(0,a.jsx)(A,{role:"region","aria-labelledby":i.triggerId,"data-orientation":o.orientation,...l,...n,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});function er(e){return e?"open":"closed"}ee.displayName=Z;let et=(0,t(62688).A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);var ea=t(96241);let en=P,eo=n.forwardRef(({className:e,...r},t)=>(0,a.jsx)(Q,{ref:t,className:(0,ea.cn)("border-b",e),...r}));eo.displayName="AccordionItem";let ei=n.forwardRef(({className:e,children:r,...t},n)=>(0,a.jsx)(W,{className:"flex",children:(0,a.jsxs)(Y,{ref:n,className:(0,ea.cn)("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",e),...t,children:[r,(0,a.jsx)(et,{className:"h-4 w-4 shrink-0 transition-transform duration-200"})]})}));ei.displayName=Y.displayName;let el=n.forwardRef(({className:e,children:r,...t},n)=>(0,a.jsx)(ee,{ref:n,className:"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...t,children:(0,a.jsx)("div",{className:(0,ea.cn)("pb-4 pt-0",e),children:r})}));el.displayName=ee.displayName}};