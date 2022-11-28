const c=n=>"TouchEvent"in window&&n instanceof TouchEvent,e=n=>{const{clientX:t,clientY:o}=c(n)?n.touches[0]:n;return{clientX:t,clientY:o}};export{e as g};
