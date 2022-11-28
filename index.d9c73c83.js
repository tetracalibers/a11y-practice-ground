import{S as le,i as oe,s as ie,e as m,c as p,a as V,d as k,b as o,f as E,g as me,h as d,l as C,n as be,r as Ee,j as ee,k as te,m as re,t as ae,o as ne,p as se,q as Z,u as B,v as x,w as L}from"./chunks/index.5fbc50c1.js";import{c as $}from"./chunks/math.7b0a8da1.js";/* empty css                              */import{g as Ge}from"./chunks/media.0ad86a33.js";function Oe(t){let e,r,a,s;return{c(){e=m("div"),r=m("button"),this.h()},l(n){e=p(n,"DIV",{class:!0,role:!0,"aria-valuenow":!0,"aria-valuemin":!0,"aria-valuemax":!0,"aria-label":!0});var l=V(e);r=p(l,"BUTTON",{type:!0,class:!0}),V(r).forEach(k),l.forEach(k),this.h()},h(){o(r,"type","button"),o(r,"class","ColorPicker-slider__indicator svelte-18rsstn"),E(r,"--preview-color",t[5].preview),E(r,"--pos-x",t[5].left),o(e,"class","ColorPicker-slider svelte-18rsstn"),o(e,"role","slider"),o(e,"aria-valuenow",t[2]),o(e,"aria-valuemin",t[0]),o(e,"aria-valuemax",t[1]),o(e,"aria-label",t[3]),E(e,"--gradient",t[4].gradient)},m(n,l){me(n,e,l),d(e,r),a||(s=[C(r,"keydown",t[10]),C(e,"click",t[6]),C(e,"mousedown",t[7]),C(e,"mousemove",t[8]),C(e,"mouseup",t[9]),C(e,"touchstart",t[7]),C(e,"touchmove",t[8]),C(e,"touchend",t[9])],a=!0)},p(n,[l]){l&32&&E(r,"--preview-color",n[5].preview),l&32&&E(r,"--pos-x",n[5].left),l&4&&o(e,"aria-valuenow",n[2]),l&1&&o(e,"aria-valuemin",n[0]),l&2&&o(e,"aria-valuemax",n[1]),l&8&&o(e,"aria-label",n[3]),l&16&&E(e,"--gradient",n[4].gradient)},i:be,o:be,d(n){n&&k(e),a=!1,Ee(s)}}}function Ke(t,e,r){let{calcFn:a}=e,{setValueFn:s}=e,{min:n}=e,{max:l}=e,{step:u=1}=e,{largeStep:i=u*10}=e,{value:g}=e,{label:h}=e,{slider:b}=e,{indicator:P}=e,D=!1;const y=f=>{const T=a(f);s(T)},U=f=>{D=!0,y(f),f.preventDefault()},c=f=>{D&&y(f),f.preventDefault()},v=f=>{D=!1,f.preventDefault()},_=f=>{switch(f.key){case"Right":case"ArrowRight":case"Up":case"ArrowUp":s($(g+u,n,l));return;case"Left":case"ArrowLeft":case"Down":case"ArrowDown":s($(g-u,n,l));return;case"PageUp":s($(g+i,n,l));return;case"PageDown":s($(g-i,n,l));return;case"Home":s(l);return;case"End":s(n);return;default:return}};return t.$$set=f=>{"calcFn"in f&&r(11,a=f.calcFn),"setValueFn"in f&&r(12,s=f.setValueFn),"min"in f&&r(0,n=f.min),"max"in f&&r(1,l=f.max),"step"in f&&r(13,u=f.step),"largeStep"in f&&r(14,i=f.largeStep),"value"in f&&r(2,g=f.value),"label"in f&&r(3,h=f.label),"slider"in f&&r(4,b=f.slider),"indicator"in f&&r(5,P=f.indicator)},[n,l,g,h,b,P,y,U,c,v,_,a,s,u,i]}class je extends le{constructor(e){super(),oe(this,e,Ke,Oe,ie,{calcFn:11,setValueFn:12,min:0,max:1,step:13,largeStep:14,value:2,label:3,slider:4,indicator:5})}}const Ue=t=>{const{s:e,v:r}=t.hsva,a=e,s=100-r;return[a,s]},We=t=>{const{h:e}=t.hsva;return e/360*100},Xe=(t,e,r)=>{const{width:a,height:s,left:n,top:l}=t.getBoundingClientRect(),u=$(e-n,0,a),i=$(r-l,0,s);return{x:u,y:i,width:a,height:s}},Se=t=>{const e=t.currentTarget,{clientX:r,clientY:a}=Ge(t);return Xe(e,r,a)};function qe(t){let e,r;return e=new je({props:{min:0,max:360,label:"hue",value:t[0].hsva.h??0,slider:{gradient:t[4]},indicator:{left:t[3],preview:t[2]},calcFn:t[5],setValueFn:t[1]}}),{c(){ee(e.$$.fragment)},l(a){te(e.$$.fragment,a)},m(a,s){re(e,a,s),r=!0},p(a,[s]){const n={};s&1&&(n.value=a[0].hsva.h??0),s&12&&(n.indicator={left:a[3],preview:a[2]}),s&2&&(n.setValueFn=a[1]),e.$set(n)},i(a){r||(ae(e.$$.fragment,a),r=!0)},o(a){ne(e.$$.fragment,a),r=!1},d(a){se(e,a)}}}function ze(t,e,r){let a,s,n,l,{color:u}=e,{setValueFn:i}=e;const g="linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",h=b=>{const{x:P,width:D}=Se(b);return Math.round(P/D*360)};return t.$$set=b=>{"color"in b&&r(0,u=b.color),"setValueFn"in b&&r(1,i=b.setValueFn)},t.$$.update=()=>{t.$$.dirty&1&&r(6,a=[u.rgba.r,u.rgba.g,u.rgba.b].join(", ")),t.$$.dirty&1&&r(7,s=We(u)),t.$$.dirty&128&&r(3,n=(s??0)+"%"),t.$$.dirty&64&&r(2,l=`rgb(${a})`)},[u,i,l,n,g,h,a,s]}class Ye extends le{constructor(e){super(),oe(this,e,ze,qe,ie,{color:0,setValueFn:1})}}function Je(t){let e,r;return e=new je({props:{min:0,max:100,label:"opacity",value:t[0].rgba.a??100,slider:{gradient:t[4]},indicator:{left:t[3],preview:t[2]},calcFn:t[5],setValueFn:t[1]}}),{c(){ee(e.$$.fragment)},l(a){te(e.$$.fragment,a)},m(a,s){re(e,a,s),r=!0},p(a,[s]){const n={};s&1&&(n.value=a[0].rgba.a??100),s&16&&(n.slider={gradient:a[4]}),s&12&&(n.indicator={left:a[3],preview:a[2]}),s&2&&(n.setValueFn=a[1]),e.$set(n)},i(a){r||(ae(e.$$.fragment,a),r=!0)},o(a){ne(e.$$.fragment,a),r=!1},d(a){se(e,a)}}}function Qe(t,e,r){let a,s,n,l,{color:u}=e,{setValueFn:i}=e;const g=h=>{const{x:b,width:P}=Se(h);return Math.round(b/P*100)};return t.$$set=h=>{"color"in h&&r(0,u=h.color),"setValueFn"in h&&r(1,i=h.setValueFn)},t.$$.update=()=>{t.$$.dirty&1&&r(6,a=[u.rgba.r,u.rgba.g,u.rgba.b].join(", ")),t.$$.dirty&64&&r(4,s=`linear-gradient(to left, rgba(${a}, 1), rgba(${a}, 0))`),t.$$.dirty&1&&r(3,n=(u.hsva.a??100)+"%"),t.$$.dirty&64&&r(2,l=`rgb(${a})`)},[u,i,l,n,s,g,a]}class Ze extends le{constructor(e){super(),oe(this,e,Qe,Je,ie,{color:0,setValueFn:1})}}function xe(t){let e,r,a,s,n,l,u;return{c(){e=m("div"),r=m("div"),a=Z("Use up, down, left and right arrow keys to select."),s=B(),n=m("button"),this.h()},l(i){e=p(i,"DIV",{class:!0,role:!0,"aria-label":!0});var g=V(e);r=p(g,"DIV",{class:!0});var h=V(r);a=x(h,"Use up, down, left and right arrow keys to select."),h.forEach(k),s=L(g),n=p(g,"BUTTON",{type:!0,class:!0}),V(n).forEach(k),g.forEach(k),this.h()},h(){o(r,"class","visually-hidden"),o(n,"type","button"),o(n,"class","ColorPicker-xy-picker-plane__indicator svelte-t25hyt"),E(n,"--preview-color",t[1]),E(n,"--pos-x",(t[0]?.[0]??0)+"%"),E(n,"--pos-y",(t[0]?.[1]??0)+"%"),o(e,"class","ColorPicker-xy-picker-plane svelte-t25hyt"),o(e,"role","application"),o(e,"aria-label","Saturation and brightness"),E(e,"--bg-color",t[2])},m(i,g){me(i,e,g),d(e,r),d(r,a),d(e,s),d(e,n),l||(u=[C(n,"keydown",t[7]),C(e,"click",t[3]),C(e,"mousedown",t[4]),C(e,"mousemove",t[5]),C(e,"mouseup",t[6]),C(e,"touchstart",t[4]),C(e,"touchmove",t[5]),C(e,"touchend",t[6])],l=!0)},p(i,[g]){g&2&&E(n,"--preview-color",i[1]),g&1&&E(n,"--pos-x",(i[0]?.[0]??0)+"%"),g&1&&E(n,"--pos-y",(i[0]?.[1]??0)+"%"),g&4&&E(e,"--bg-color",i[2])},i:be,o:be,d(i){i&&k(e),l=!1,Ee(u)}}}function $e(t,e,r){let a,s,n,{color:l}=e,{setValueFn:u}=e,i=Ue(l);const g=c=>{const{x:v,y:_,width:f,height:T}=Se(c),R=v/f*100,F=100-_/T*100;return[R,F]};let h=!1;const b=c=>{const v=g(c);u(...v),r(0,i=Ue(l))},P=c=>{h=!0,b(c),c.preventDefault()},D=c=>{h&&b(c),c.preventDefault()},y=c=>{h=!1,c.preventDefault()},U=c=>{switch(c.key){case"Right":case"ArrowRight":r(0,i=[i[0]+1,i[1]]);break;case"Left":case"ArrowLeft":r(0,i=[i[0]-1,i[1]]);break;case"Up":case"ArrowUp":r(0,i=[i[0],i[1]-1]);break;case"Down":case"ArrowDown":r(0,i=[i[0],i[1]+1]);break;default:return}const _=i[0],f=100-i[1];u(_,f)};return t.$$set=c=>{"color"in c&&r(8,l=c.color),"setValueFn"in c&&r(9,u=c.setValueFn)},t.$$.update=()=>{t.$$.dirty&256&&r(10,a=[l.rgba.r,l.rgba.g,l.rgba.b].join(", ")),t.$$.dirty&256&&r(2,s=`hsl(${l.hsva.h}, 100%, 50%)`),t.$$.dirty&1024&&r(1,n=`rgb(${a})`)},[i,n,s,b,P,D,y,U,l,u,a]}class et extends le{constructor(e){super(),oe(this,e,$e,xe,ie,{color:8,setValueFn:9})}}const O=t=>{const{r:e,g:r,b:a,a:s}=t,n=e.toString(16).padStart(2,"0"),l=r.toString(16).padStart(2,"0"),u=a.toString(16).padStart(2,"0"),i=s===100?"":s.toString(16).padStart(2,"0");return"#"+n+l+u+i},tt=t=>{if(t.length===4){const e=Number("0x"+t[1]+t[1]),r=Number("0x"+t[2]+t[2]),a=Number("0x"+t[3]+t[3]);return{r:e,g:r,b:a,a:100}}if(t.length>6){const e=Number("0x"+t[1]+t[2]),r=Number("0x"+t[3]+t[4]),a=Number("0x"+t[5]+t[6]),s=t.length===9?Number("0x"+t[7]+t[8]):100;return{r:e,g:r,b:a,a:s}}return{r:0,g:0,b:0,a:100}},rt=(t,e,r,a,s)=>e===0?0:t===a?120+(s-r)/e*60:t===s?240+(r-a)/e*60:t===r?(a-s)/e*60+(a<=s?360:0):0,Re=t=>{let{r:e,g:r,b:a,a:s}=t;const n=Math.max(e,r,a),l=Math.min(e,r,a),u=n-l,i=n/255*100,g=n===0?0:u/n*100;return{h:rt(n,u,e,r,a),s:g,v:i,a:s}},He=t=>{let{h:e,s:r,v:a,a:s}=t;r/=100,a/=100;const n=Math.floor(e/60),l=e/60-n,u=a*(1-r),i=a*(1-r*l),g=a*(1-r*(1-l)),h=n%6,b=Math.round([a,i,u,u,g,a][h]*255),P=Math.round([g,a,a,i,u,u][h]*255),D=Math.round([u,u,g,a,a,i][h]*255);return{r:b,g:P,b:D,a:s}},at=t=>{const e=/rgb\((\d+),\s?(\d+),\s?(\d+),\s?(\d+)\)/i.exec(t),r=Number(e?.[1]??0),a=Number(e?.[2]??0),s=Number(e?.[3]??0),n=Number(e?.[4]??100);return{r,g:a,b:s,a:n}},Me=t=>{if(t.startsWith("#")){const e=t,r=tt(t),a=Re(r);return{hex:e,rgba:r,hsva:a}}if(t.startsWith("rgb")){const e=at(t),r=O(e),a=Re(e);return{hex:r,rgba:e,hsva:a}}return{hex:"#000000",rgba:{r:0,g:0,b:0,a:100},hsva:{h:0,s:0,v:0,a:100}}};function nt(t){let e,r,a,s,n,l,u,i,g,h,b,P,D,y,U,c,v,_,f,T,R,F,H,pe,K,W,_e,ke,I,ue,we,X,q,Ce,ye,N,ce,Ve,z,Y,Fe,Pe,A,fe,M,De,Ie;return a=new et({props:{color:t[0],setValueFn:t[3]}}),n=new Ye({props:{color:t[0],setValueFn:t[4]}}),u=new Ze({props:{color:t[0],setValueFn:t[5]}}),{c(){e=m("div"),r=m("div"),ee(a.$$.fragment),s=B(),ee(n.$$.fragment),l=B(),ee(u.$$.fragment),i=B(),g=m("div"),h=m("div"),b=m("label"),P=Z("Hex"),D=B(),y=m("input"),c=B(),v=m("div"),_=m("div"),f=m("label"),T=Z("R"),R=B(),F=m("input"),pe=B(),K=m("div"),W=m("label"),_e=Z("G"),ke=B(),I=m("input"),we=B(),X=m("div"),q=m("label"),Ce=Z("B"),ye=B(),N=m("input"),Ve=B(),z=m("div"),Y=m("label"),Fe=Z("A(%)"),Pe=B(),A=m("input"),this.h()},l(w){e=p(w,"DIV",{class:!0});var S=V(e);r=p(S,"DIV",{class:!0});var j=V(r);te(a.$$.fragment,j),s=L(j),te(n.$$.fragment,j),l=L(j),te(u.$$.fragment,j),j.forEach(k),i=L(S),g=p(S,"DIV",{class:!0});var J=V(g);h=p(J,"DIV",{class:!0});var Q=V(h);b=p(Q,"LABEL",{class:!0,for:!0});var Ne=V(b);P=x(Ne,"Hex"),Ne.forEach(k),D=L(Q),y=p(Q,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0}),Q.forEach(k),c=L(J),v=p(J,"DIV",{class:!0});var G=V(v);_=p(G,"DIV",{});var ge=V(_);f=p(ge,"LABEL",{class:!0,for:!0});var Ae=V(f);T=x(Ae,"R"),Ae.forEach(k),R=L(ge),F=p(ge,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0,inputmode:!0,pattern:!0}),ge.forEach(k),pe=L(G),K=p(G,"DIV",{});var de=V(K);W=p(de,"LABEL",{class:!0,for:!0});var Be=V(W);_e=x(Be,"G"),Be.forEach(k),ke=L(de),I=p(de,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0,inputmode:!0,pattern:!0}),de.forEach(k),we=L(G),X=p(G,"DIV",{});var he=V(X);q=p(he,"LABEL",{class:!0,for:!0});var Le=V(q);Ce=x(Le,"B"),Le.forEach(k),ye=L(he),N=p(he,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0,inputmode:!0,pattern:!0}),he.forEach(k),Ve=L(G),z=p(G,"DIV",{});var ve=V(z);Y=p(ve,"LABEL",{class:!0,for:!0});var Te=V(Y);Fe=x(Te,"A(%)"),Te.forEach(k),Pe=L(ve),A=p(ve,"INPUT",{type:!0,id:!0,class:!0,placeholder:!0,inputmode:!0,pattern:!0}),ve.forEach(k),G.forEach(k),J.forEach(k),S.forEach(k),this.h()},h(){o(r,"class","ly-vertical svelte-1k9apmf"),o(b,"class","ColorPicker__input-label svelte-1k9apmf"),o(b,"for","id-ColorPicker__input--hex"),o(y,"type","text"),o(y,"id","id-ColorPicker__input--hex"),o(y,"class","ColorPicker__input --hex svelte-1k9apmf"),o(y,"placeholder","hex"),y.value=U=t[0].hex,o(h,"class","svelte-1k9apmf"),o(f,"class","ColorPicker__input-label svelte-1k9apmf"),o(f,"for","id-ColorPicker__input--rgba-r"),o(F,"type","text"),o(F,"id","id-ColorPicker__input--rgba-r"),o(F,"class","ColorPicker__input --rgba svelte-1k9apmf"),o(F,"placeholder","R"),F.value=H=t[0].rgba.r,o(F,"inputmode","numeric"),o(F,"pattern","[0-9]*"),o(W,"class","ColorPicker__input-label svelte-1k9apmf"),o(W,"for","id-ColorPicker__input--rgba-g"),o(I,"type","text"),o(I,"id","id-ColorPicker__input--rgba-g"),o(I,"class","ColorPicker__input --rgba svelte-1k9apmf"),o(I,"placeholder","G"),I.value=ue=t[0].rgba.g,o(I,"inputmode","numeric"),o(I,"pattern","[0-9]*"),o(q,"class","ColorPicker__input-label svelte-1k9apmf"),o(q,"for","id-ColorPicker__input--rgba-b"),o(N,"type","text"),o(N,"id","id-ColorPicker__input--rgba-b"),o(N,"class","ColorPicker__input --rgba svelte-1k9apmf"),o(N,"placeholder","B"),N.value=ce=t[0].rgba.b,o(N,"inputmode","numeric"),o(N,"pattern","[0-9]*"),o(Y,"class","ColorPicker__input-label svelte-1k9apmf"),o(Y,"for","id-ColorPicker__input--rgba-a"),o(A,"type","text"),o(A,"id","id-ColorPicker__input--rgba-a"),o(A,"class","ColorPicker__input --rgba svelte-1k9apmf"),o(A,"placeholder","A"),A.value=fe=t[0].rgba.a,o(A,"inputmode","numeric"),o(A,"pattern","[0-9]*"),o(v,"class","ly-horizontal svelte-1k9apmf"),o(g,"class","ly-switch svelte-1k9apmf"),o(e,"class","ColorPicker svelte-1k9apmf")},m(w,S){me(w,e,S),d(e,r),re(a,r,null),d(r,s),re(n,r,null),d(r,l),re(u,r,null),d(e,i),d(e,g),d(g,h),d(h,b),d(b,P),d(h,D),d(h,y),d(g,c),d(g,v),d(v,_),d(_,f),d(f,T),d(_,R),d(_,F),d(v,pe),d(v,K),d(K,W),d(W,_e),d(K,ke),d(K,I),d(v,we),d(v,X),d(X,q),d(q,Ce),d(X,ye),d(X,N),d(v,Ve),d(v,z),d(z,Y),d(Y,Fe),d(z,Pe),d(z,A),M=!0,De||(Ie=[C(y,"input",t[1]),C(F,"input",t[8]),C(I,"input",t[9]),C(N,"input",t[10]),C(A,"input",t[11])],De=!0)},p(w,[S]){const j={};S&1&&(j.color=w[0]),a.$set(j);const J={};S&1&&(J.color=w[0]),n.$set(J);const Q={};S&1&&(Q.color=w[0]),u.$set(Q),(!M||S&1&&U!==(U=w[0].hex)&&y.value!==U)&&(y.value=U),(!M||S&1&&H!==(H=w[0].rgba.r)&&F.value!==H)&&(F.value=H),(!M||S&1&&ue!==(ue=w[0].rgba.g)&&I.value!==ue)&&(I.value=ue),(!M||S&1&&ce!==(ce=w[0].rgba.b)&&N.value!==ce)&&(N.value=ce),(!M||S&1&&fe!==(fe=w[0].rgba.a)&&A.value!==fe)&&(A.value=fe)},i(w){M||(ae(a.$$.fragment,w),ae(n.$$.fragment,w),ae(u.$$.fragment,w),M=!0)},o(w){ne(a.$$.fragment,w),ne(n.$$.fragment,w),ne(u.$$.fragment,w),M=!1},d(w){w&&k(e),se(a),se(n),se(u),De=!1,Ee(Ie)}}}function st(t,e,r){let{color:a="#ECC5FB"}=e,{onChange:s=()=>{}}=e,n=Me(a);const l=c=>{r(0,n=Me(c)),s(c)},u=c=>{let _=c.target.value;_.startsWith("#")||(_="#"+_),l(_)},i=(c,v)=>{const _=c.target,f=Number(_.value),{r:T,g:R,b:F,a:H}=n.rgba;switch(v){case"r":l(O({r:f??0,g:R,b:F,a:H}));return;case"g":l(O({r:T,g:f??0,b:F,a:H}));return;case"b":l(O({r:T,g:R,b:f??0,a:H}));return;case"a":l(O({r:T,g:R,b:F,a:f??100}));return;default:return}},g=(c,v)=>{const _=He({...n.hsva,s:c,v});l(O(_))},h=c=>{const v={...n.hsva,h:c},_=He(v);l(O(_))},b=c=>{const v={...n.rgba,a:c};l(O(v))},P=c=>i(c,"r"),D=c=>i(c,"g"),y=c=>i(c,"b"),U=c=>i(c,"a");return t.$$set=c=>{"color"in c&&r(6,a=c.color),"onChange"in c&&r(7,s=c.onChange)},[n,u,i,g,h,b,a,s,P,D,y,U]}class lt extends le{constructor(e){super(),oe(this,e,st,nt,ie,{color:6,onChange:7})}}function ot(t){let e,r,a;return r=new lt({props:{color:t[0],onChange:t[1]}}),{c(){e=m("div"),ee(r.$$.fragment),this.h()},l(s){e=p(s,"DIV",{class:!0});var n=V(e);te(r.$$.fragment,n),n.forEach(k),this.h()},h(){o(e,"class","preview-container svelte-1e70cuc"),E(e,"--bg",t[0])},m(s,n){me(s,e,n),re(r,e,null),a=!0},p(s,[n]){const l={};n&1&&(l.color=s[0]),r.$set(l),n&1&&E(e,"--bg",s[0])},i(s){a||(ae(r.$$.fragment,s),a=!0)},o(s){ne(r.$$.fragment,s),a=!1},d(s){s&&k(e),se(r)}}}function it(t,e,r){let a;const s=n=>{r(0,a=n)};return r(0,a="#ECC5FB"),[a,s]}class dt extends le{constructor(e){super(),oe(this,e,it,ot,ie,{})}}export{dt as default};
