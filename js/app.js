(()=>{var ou=Object.defineProperty;var lu=(e,t,i)=>t in e?ou(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var Re=(e,t,i)=>lu(e,typeof t!="symbol"?t+"":t,i);var Le=window.gsap,vt=window.ScrollTrigger;Le.registerPlugin(vt);vt.config({ignoreMobileResize:!0});var je={lenis:null,reduced:window.matchMedia("(prefers-reduced-motion: reduce)").matches,webgl:!0,ready:!1,velocity:0},$o=()=>window.matchMedia("(hover: none), (pointer: coarse)").matches;var Yr=e=>String(e).padStart(2,"0"),Aa=e=>Math.min(1,Math.max(0,e)),kn=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Hn=new Set;function Ra(e){je.ready?e():Hn.add(e)}function Gn(){je.ready||(je.ready=!0,Hn.forEach(e=>e()),Hn.clear())}var vi={total:0,done:0},Qo=new Set,Jo=()=>Qo.forEach(e=>e(vi.total?vi.done/vi.total:1));function lr(e){vi.total++,Jo();let t=()=>{vi.done++,Jo()};return e.then(t,t),e}function el(e){Qo.add(e),e(vi.total?vi.done/vi.total:0)}var tl=()=>vi.total,wa=[],il=new Set;function Rt(e,t){wa[e]=t;let i=0;for(let r=0;r<wa.length;r++)(wa[r]??0)>0&&(i=r);il.forEach(r=>r(i,wa[i]??0))}function rl(e){il.add(e)}var Ko="light";function hr(e){if(e===Ko)return;Ko=e;let t=document.getElementById("nav");t&&(t.dataset.theme=e)}function It(e,t,i="top top+=32"){let r=e.parentElement,a=r&&r.classList.contains("pin-spacer")?r:e;return vt.create({trigger:a,start:i,end:"bottom top+=32",onToggle:n=>n.isActive&&hr(t)})}function Ca(e){if(je.lenis){je.lenis.scrollTo(e,{duration:1.4});return}typeof e=="number"?window.scrollTo({top:e}):document.querySelector(e)?.scrollIntoView()}var cr=JSON.parse(document.getElementById("site-config").textContent);function Pa(e){return location.protocol==="file:"&&window.__EMBED&&window.__EMBED[e]?window.__EMBED[e]:e}function al(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0);let e=window.scrollY;if(!je.reduced&&window.Lenis){let t=new window.Lenis({lerp:.12,wheelMultiplier:1,smoothWheel:!0,autoRaf:!1});je.lenis=t,t.on("scroll",vt.update)}Le.ticker.add(t=>{je.lenis?.raf(t*1e3);let i=window.scrollY;je.velocity+=(i-e-je.velocity)*.2,e=i}),Le.ticker.lagSmoothing(0),document.querySelectorAll("[data-scroll-to]").forEach(t=>t.addEventListener("click",i=>{i.preventDefault();let r=t.dataset.scrollTo;Ca(r==="0"?0:r)}))}function nl(){if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;document.documentElement.classList.add("has-cursor");let t=document.querySelector(".cursor__ring"),i=document.querySelector(".cursor__dot"),r=t.querySelector(".label"),a={x:innerWidth/2,y:innerHeight/2},n={...a},s=!1,l=1,o=1;window.addEventListener("pointermove",h=>{a.x=h.clientX,a.y=h.clientY,s||(s=!0,n.x=a.x,n.y=a.y,Le.to([t,i],{opacity:1,duration:.3}));let c=h.target.closest?.("a, button, input, textarea, [data-cursor]"),d=c?.dataset.cursor??"";o=c?d?3.2:1.9:1,r.textContent!==d&&(r.textContent=d)},{passive:!0}),document.addEventListener("pointerleave",()=>{s=!1,Le.to([t,i],{opacity:0,duration:.3})}),Le.ticker.add(()=>{n.x+=(a.x-n.x)*.18,n.y+=(a.y-n.y)*.18,l+=(o-l)*.16,t.style.transform=`translate3d(${n.x-18}px, ${n.y-18}px, 0) scale(${l})`,i.style.transform=`translate3d(${a.x-3}px, ${a.y-3}px, 0)`,r.style.opacity=l>2.5?"1":"0"})}var hu=1400;function sl(){let e=document.getElementById("preloader");if(je.reduced){e.remove(),Gn();return}let t=document.documentElement,i=e.querySelector(".preloader__count"),r=e.querySelector(".preloader__dot"),a=e.querySelector(".preloader__logo");t.classList.add("is-loading"),je.lenis?.stop();let n=performance.now(),s=n,l=0,o=0,h=!1,c=!1;document.fonts?.ready.then(()=>h=!0),el(m=>l=m),setTimeout(()=>tl()===0&&(l=1),500),setTimeout(()=>l=1,9e3);let d=()=>{let m=performance.now(),g=1-Math.pow(.92,Math.min(10,(m-s)/1e3*60));s=m;let v=Math.min(l*.97+(h?.03:0),(m-n)/hu,1);o+=(v-o)*g,i.textContent=String(Math.round(o*100)).padStart(3,"0"),!c&&v>=.999&&o>.985&&u()};Le.ticker.add(d);function u(){c=!0,Le.ticker.remove(d),i.textContent="100",Le.timeline({defaults:{ease:"expo.inOut"},onComplete:()=>{t.classList.remove("is-loading"),e.remove()}}).to(r,{scale:1.6,duration:.35,ease:"power2.out"}).to(a,{yPercent:-18,opacity:0,duration:.9},"<0.1").to(i,{yPercent:100,opacity:0,duration:.6},"<").to(r,{scale:90,duration:1.1,ease:"expo.in"},"<0.1").add(()=>{Gn(),je.lenis?.start()},"-=0.15").to(e,{opacity:0,duration:.5,ease:"power1.out"})}}function ol(){let e=document.getElementById("nav"),t=document.getElementById("nav-num"),i=document.getElementById("nav-name"),r=document.getElementById("nav-line"),a=[...document.querySelectorAll("[data-section]")].map(s=>s.dataset.section);document.getElementById("nav-total").textContent=Yr(a.length);let n=0;rl((s,l)=>{if(r.style.transform=`scaleX(${Math.min(1,(s+l)/a.length)})`,s===n)return;n=s;let o=()=>{t.textContent=Yr(s+1),i.textContent=a[s]};if(je.reduced)return o();Le.timeline().to([t,i],{yPercent:-100,duration:.22,ease:"power2.in"}).add(o).fromTo([t,i],{yPercent:100},{yPercent:0,duration:.45,ease:"expo.out"})}),Ra(()=>{je.reduced||Le.fromTo(e,{yPercent:-100},{yPercent:0,duration:1.1,ease:"expo.out",delay:.4})})}var cu=0,ll=1,uu=2;var hn=1,du=2,ra=3,Ki=0,kt=1,ni=2,Ei=0,sa=1,hl=2,cl=3,ul=4,pu=5;var Er=100,mu=101,fu=102,gu=103,vu=104,_u=200,xu=201,yu=202,Su=203,Mh=204,bh=205,Mu=206,bu=207,Tu=208,Eu=209,wu=210,Au=211,Ru=212,Cu=213,Pu=214,Cs=0,Ps=1,Is=2,ha=3,Ls=4,Ns=5,Ds=6,Us=7,Th=0,Iu=1,Lu=2,di=0,Eh=1,wh=2,Ah=3,An=4,Rh=5,Ch=6,Ph=7;var Ih=300,$i=301,Br=302,Wn=303,Xn=304,Rn=306,Os=1e3,Ut=1001,Bs=1002,Ct=1003,Nu=1004;var Ia=1005;var ht=1006,jn=1007;var Qt=1008;var Yt=1009,Lh=1010,Nh=1011,ca=1012,Mo=1013,pi=1014,ei=1015,zt=1016,bo=1017,To=1018,ua=1020,Dh=35902,Uh=35899,Oh=1021,Bh=1022,Ot=1023,Ai=1026,Yi=1027,Fh=1028,Eo=1029,Qi=1030,wo=1031;var Ao=1033,cn=33776,un=33777,dn=33778,pn=33779,Fs=35840,zs=35841,Vs=35842,Hs=35843,ks=36196,Gs=37492,Ws=37496,Xs=37488,js=37489,_n=37490,qs=37491,Ys=37808,Zs=37809,Js=37810,Ks=37811,$s=37812,Qs=37813,eo=37814,to=37815,io=37816,ro=37817,ao=37818,no=37819,so=37820,oo=37821,lo=36492,ho=36494,co=36495,uo=36283,po=36284,xn=36285,mo=36286;var yn=2300,fo=2301,qn=2302,dl=2303,pl=2400,ml=2401,fl=2402;var Du=3200;var go=0,Uu=1,Zt="",Dt="srgb",er="srgb-linear",Sn="linear",lt="srgb";var Yn=7680;var Ou=519,Bu=512,Fu=513,zu=514,Ro=515,Vu=516,Hu=517,Co=518,ku=519,Gu=35044;var gl="300 es",si=2e3,da=2001;function Wu(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Xu(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Mn(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function ju(){let e=Mn("canvas");return e.style.display="block",e}var vl={},Fr=null;function _l(...e){let t="THREE."+e.shift();Fr?Fr("log",t,...e):console.log(t,...e)}function zh(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let i=e[1];i&&i.isStackTrace?e[0]+=" "+i.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ue(...e){e=zh(e);let t="THREE."+e.shift();if(Fr)Fr("warn",t,...e);else{let i=e[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...e)}}function He(...e){e=zh(e);let t="THREE."+e.shift();if(Fr)Fr("error",t,...e);else{let i=e[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...e)}}function Pr(...e){let t=e.join(" ");t in vl||(vl[t]=!0,Ue(...e))}function qu(e,t,i){return new Promise(function(r,a){function n(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(n,i);break;default:r()}}setTimeout(n,i)})}var Yu={[Cs]:Ps,[Is]:Ds,[Ls]:Us,[ha]:Ns,[Ps]:Cs,[Ds]:Is,[Us]:Ls,[Ns]:ha},ir=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,n=r.length;a<n;a++)r[a].call(this,e);e.target=null}}},Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var mn=Math.PI/180,vo=180/Math.PI;function Gr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Lt[e&255]+Lt[e>>8&255]+Lt[e>>16&255]+Lt[e>>24&255]+"-"+Lt[t&255]+Lt[t>>8&255]+"-"+Lt[t>>16&15|64]+Lt[t>>24&255]+"-"+Lt[i&63|128]+Lt[i>>8&255]+"-"+Lt[i>>16&255]+Lt[i>>24&255]+Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]).toLowerCase()}function Je(e,t,i){return Math.max(t,Math.min(i,e))}function Zu(e,t){return(e%t+t)%t}function Zn(e,t,i){return(1-i)*e+i*t}function Zr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ht(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Lr,Q=(Lr=class{constructor(t=0,i=0){this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let i=this.x,r=this.y,a=t.elements;return this.x=a[0]*i+a[3]*r+a[6],this.y=a[1]*i+a[4]*r+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Je(this.x,t.x,i.x),this.y=Je(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Je(this.x,t,i),this.y=Je(this.y,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Je(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Je(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){let r=Math.cos(i),a=Math.sin(i),n=this.x-t.x,s=this.y-t.y;return this.x=n*r-s*a+t.x,this.y=n*a+s*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Lr.prototype.isVector2=!0,Lr),Ri=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,n,s){let l=i[r+0],o=i[r+1],h=i[r+2],c=i[r+3],d=a[n+0],u=a[n+1],m=a[n+2],g=a[n+3];if(c!==g||l!==d||o!==u||h!==m){let v=l*d+o*u+h*m+c*g;v<0&&(d=-d,u=-u,m=-m,g=-g,v=-v);let f=1-s;if(v<.9995){let p=Math.acos(v),y=Math.sin(p);f=Math.sin(f*p)/y,s=Math.sin(s*p)/y,l=l*f+d*s,o=o*f+u*s,h=h*f+m*s,c=c*f+g*s}else{l=l*f+d*s,o=o*f+u*s,h=h*f+m*s,c=c*f+g*s;let p=1/Math.sqrt(l*l+o*o+h*h+c*c);l*=p,o*=p,h*=p,c*=p}}e[t]=l,e[t+1]=o,e[t+2]=h,e[t+3]=c}static multiplyQuaternionsFlat(e,t,i,r,a,n){let s=i[r],l=i[r+1],o=i[r+2],h=i[r+3],c=a[n],d=a[n+1],u=a[n+2],m=a[n+3];return e[t]=s*m+h*c+l*u-o*d,e[t+1]=l*m+h*d+o*c-s*u,e[t+2]=o*m+h*u+s*d-l*c,e[t+3]=h*m-s*c-l*d-o*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,n=e._order,s=Math.cos,l=Math.sin,o=s(i/2),h=s(r/2),c=s(a/2),d=l(i/2),u=l(r/2),m=l(a/2);switch(n){case"XYZ":this._x=d*h*c+o*u*m,this._y=o*u*c-d*h*m,this._z=o*h*m+d*u*c,this._w=o*h*c-d*u*m;break;case"YXZ":this._x=d*h*c+o*u*m,this._y=o*u*c-d*h*m,this._z=o*h*m-d*u*c,this._w=o*h*c+d*u*m;break;case"ZXY":this._x=d*h*c-o*u*m,this._y=o*u*c+d*h*m,this._z=o*h*m+d*u*c,this._w=o*h*c-d*u*m;break;case"ZYX":this._x=d*h*c-o*u*m,this._y=o*u*c+d*h*m,this._z=o*h*m-d*u*c,this._w=o*h*c+d*u*m;break;case"YZX":this._x=d*h*c+o*u*m,this._y=o*u*c+d*h*m,this._z=o*h*m-d*u*c,this._w=o*h*c-d*u*m;break;case"XZY":this._x=d*h*c-o*u*m,this._y=o*u*c-d*h*m,this._z=o*h*m+d*u*c,this._w=o*h*c+d*u*m;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+n)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],l=t[9],o=t[2],h=t[6],c=t[10],d=i+s+c;if(d>0){let u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(a-o)*u,this._z=(n-r)*u}else if(i>s&&i>c){let u=2*Math.sqrt(1+i-s-c);this._w=(h-l)/u,this._x=.25*u,this._y=(r+n)/u,this._z=(a+o)/u}else if(s>c){let u=2*Math.sqrt(1+s-i-c);this._w=(a-o)/u,this._x=(r+n)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+c-i-s);this._w=(n-r)/u,this._x=(a+o)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=t._x,l=t._y,o=t._z,h=t._w;return this._x=i*h+n*s+r*o-a*l,this._y=r*h+n*l+a*s-i*o,this._z=a*h+n*o+i*l-r*s,this._w=n*h-i*s-r*l-a*o,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,n=e._w,s=this.dot(e);s<0&&(i=-i,r=-r,a=-a,n=-n,s=-s);let l=1-t;if(s<.9995){let o=Math.acos(s),h=Math.sin(o);l=Math.sin(l*o)/h,t=Math.sin(t*o)/h,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+n*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+a*t,this._w=this._w*l+n*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Nr,C=(Nr=class{constructor(t=0,i=0,r=0){this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(xl.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(xl.setFromAxisAngle(t,i))}applyMatrix3(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[3]*r+n[6]*a,this.y=n[1]*i+n[4]*r+n[7]*a,this.z=n[2]*i+n[5]*r+n[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=t.elements,s=1/(n[3]*i+n[7]*r+n[11]*a+n[15]);return this.x=(n[0]*i+n[4]*r+n[8]*a+n[12])*s,this.y=(n[1]*i+n[5]*r+n[9]*a+n[13])*s,this.z=(n[2]*i+n[6]*r+n[10]*a+n[14])*s,this}applyQuaternion(t){let i=this.x,r=this.y,a=this.z,n=t.x,s=t.y,l=t.z,o=t.w,h=2*(s*a-l*r),c=2*(l*i-n*a),d=2*(n*r-s*i);return this.x=i+o*h+s*d-l*c,this.y=r+o*c+l*h-n*d,this.z=a+o*d+n*c-s*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let i=this.x,r=this.y,a=this.z,n=t.elements;return this.x=n[0]*i+n[4]*r+n[8]*a,this.y=n[1]*i+n[5]*r+n[9]*a,this.z=n[2]*i+n[6]*r+n[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Je(this.x,t.x,i.x),this.y=Je(this.y,t.y,i.y),this.z=Je(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Je(this.x,t,i),this.y=Je(this.y,t,i),this.z=Je(this.z,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Je(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){let r=t.x,a=t.y,n=t.z,s=i.x,l=i.y,o=i.z;return this.x=a*o-n*l,this.y=n*s-r*o,this.z=r*l-a*s,this}projectOnVector(t){let i=t.lengthSq();if(i===0)return this.set(0,0,0);let r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return Jn.copy(this).projectOnVector(t),this.sub(Jn)}reflect(t){return this.sub(Jn.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;let r=this.dot(t)/i;return Math.acos(Je(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let i=this.x-t.x,r=this.y-t.y,a=this.z-t.z;return i*i+r*r+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){let a=Math.sin(i)*t;return this.x=a*Math.sin(r),this.y=Math.cos(i)*t,this.z=a*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){let i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=a,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nr.prototype.isVector3=!0,Nr),Jn=new C,xl=new Ri,Dr,Ye=(Dr=class{constructor(t,i,r,a,n,s,l,o,h){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,l,o,h)}set(t,i,r,a,n,s,l,o,h){let c=this.elements;return c[0]=t,c[1]=a,c[2]=l,c[3]=i,c[4]=n,c[5]=o,c[6]=r,c[7]=s,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],l=r[3],o=r[6],h=r[1],c=r[4],d=r[7],u=r[2],m=r[5],g=r[8],v=a[0],f=a[3],p=a[6],y=a[1],E=a[4],_=a[7],S=a[2],w=a[5],R=a[8];return n[0]=s*v+l*y+o*S,n[3]=s*f+l*E+o*w,n[6]=s*p+l*_+o*R,n[1]=h*v+c*y+d*S,n[4]=h*f+c*E+d*w,n[7]=h*p+c*_+d*R,n[2]=u*v+m*y+g*S,n[5]=u*f+m*E+g*w,n[8]=u*p+m*_+g*R,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],l=t[5],o=t[6],h=t[7],c=t[8];return i*s*c-i*l*h-r*n*c+r*l*o+a*n*h-a*s*o}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],l=t[5],o=t[6],h=t[7],c=t[8],d=c*s-l*h,u=l*o-c*n,m=h*n-s*o,g=i*d+r*u+a*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=d*v,t[1]=(a*h-c*r)*v,t[2]=(l*r-a*s)*v,t[3]=u*v,t[4]=(c*i-a*o)*v,t[5]=(a*n-l*i)*v,t[6]=m*v,t[7]=(r*o-h*i)*v,t[8]=(s*i-r*n)*v,this}transpose(){let t,i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,a,n,s,l){let o=Math.cos(n),h=Math.sin(n);return this.set(r*o,r*h,-r*(o*s+h*l)+s+t,-a*h,a*o,-a*(-h*s+o*l)+l+i,0,0,1),this}scale(t,i){return Pr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kn.makeScale(t,i)),this}rotate(t){return Pr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kn.makeRotation(-t)),this}translate(t,i){return Pr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kn.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<9;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Dr.prototype.isMatrix3=!0,Dr),Kn=new Ye,yl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sl=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ju(){let e={enabled:!0,workingColorSpace:er,spaces:{},convert:function(a,n,s){return this.enabled===!1||n===s||!n||!s||(this.spaces[n].transfer===lt&&(a.r=wi(a.r),a.g=wi(a.g),a.b=wi(a.b)),this.spaces[n].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[n].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===lt&&(a.r=Ir(a.r),a.g=Ir(a.g),a.b=Ir(a.b))),a},workingToColorSpace:function(a,n){return this.convert(a,this.workingColorSpace,n)},colorSpaceToWorking:function(a,n){return this.convert(a,n,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Zt?Sn:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,n=this.workingColorSpace){return a.fromArray(this.spaces[n].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,n,s){return a.copy(this.spaces[n].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,n){return Pr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,n)},toWorkingColorSpace:function(a,n){return Pr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,n)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[er]:{primaries:t,whitePoint:r,transfer:Sn,toXYZ:yl,fromXYZ:Sl,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:t,whitePoint:r,transfer:lt,toXYZ:yl,fromXYZ:Sl,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),e}var it=Ju();function wi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ir(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var ur,Ku=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ur===void 0&&(ur=Mn("canvas")),ur.width=e.width,ur.height=e.height;let r=ur.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ur}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Mn("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let n=0;n<a.length;n++)a[n]=wi(a[n]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(wi(t[i]/255)*255):t[i]=wi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},$u=0,Po=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=Gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let n=0,s=r.length;n<s;n++)r[n].isDataTexture?a.push($n(r[n].image)):a.push($n(r[n]))}else a=$n(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function $n(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Ku.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}var Qu=0,Qn=new C,Wt=class fn extends ir{constructor(t=fn.DEFAULT_IMAGE,i=fn.DEFAULT_MAPPING,r=Ut,a=Ut,n=ht,s=Qt,l=Ot,o=Yt,h=fn.DEFAULT_ANISOTROPY,c=Zt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Gr(),this.name="",this.source=new Po(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qn).x}get height(){return this.source.getSize(Qn).y}get depth(){return this.source.getSize(Qn).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Ue(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let a=this[i];if(a===void 0){Ue(`Texture.setValues(): property '${i}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ih)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Os:t.x=t.x-Math.floor(t.x);break;case Ut:t.x=t.x<0?0:1;break;case Bs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Os:t.y=t.y-Math.floor(t.y);break;case Ut:t.y=t.y<0?0:1;break;case Bs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Ih;Wt.DEFAULT_ANISOTROPY=1;var Ur,at=(Ur=class{constructor(t=0,i=0,r=0,a=1){this.x=t,this.y=i,this.z=r,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,a){return this.x=t,this.y=i,this.z=r,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let i=this.x,r=this.y,a=this.z,n=this.w,s=t.elements;return this.x=s[0]*i+s[4]*r+s[8]*a+s[12]*n,this.y=s[1]*i+s[5]*r+s[9]*a+s[13]*n,this.z=s[2]*i+s[6]*r+s[10]*a+s[14]*n,this.w=s[3]*i+s[7]*r+s[11]*a+s[15]*n,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,a,n,s=t.elements,l=s[0],o=s[4],h=s[8],c=s[1],d=s[5],u=s[9],m=s[2],g=s[6],v=s[10];if(Math.abs(o-c)<.01&&Math.abs(h-m)<.01&&Math.abs(u-g)<.01){if(Math.abs(o+c)<.1&&Math.abs(h+m)<.1&&Math.abs(u+g)<.1&&Math.abs(l+d+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;let p=(l+1)/2,y=(d+1)/2,E=(v+1)/2,_=(o+c)/4,S=(h+m)/4,w=(u+g)/4;return p>y&&p>E?p<.01?(r=0,a=.707106781,n=.707106781):(r=Math.sqrt(p),a=_/r,n=S/r):y>E?y<.01?(r=.707106781,a=0,n=.707106781):(a=Math.sqrt(y),r=_/a,n=w/a):E<.01?(r=.707106781,a=.707106781,n=0):(n=Math.sqrt(E),r=S/n,a=w/n),this.set(r,a,n,i),this}let f=Math.sqrt((g-u)*(g-u)+(h-m)*(h-m)+(c-o)*(c-o));return Math.abs(f)<.001&&(f=1),this.x=(g-u)/f,this.y=(h-m)/f,this.z=(c-o)/f,this.w=Math.acos((l+d+v-1)/2),this}setFromMatrixPosition(t){let i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Je(this.x,t.x,i.x),this.y=Je(this.y,t.y,i.y),this.z=Je(this.z,t.z,i.z),this.w=Je(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Je(this.x,t,i),this.y=Je(this.y,t,i),this.z=Je(this.z,t,i),this.w=Je(this.w,t,i),this}clampLength(t,i){let r=this.length();return this.divideScalar(r||1).multiplyScalar(Je(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ur.prototype.isVector4=!0,Ur),ed=class extends ir{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ht,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},a=new Wt(r),n=i.count;for(let s=0;s<n;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:ht,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Po(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vt=class extends ed{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Vh=class extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var td=class extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ji,Ke=(Ji=class{constructor(t,i,r,a,n,s,l,o,h,c,d,u,m,g,v,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,a,n,s,l,o,h,c,d,u,m,g,v,f)}set(t,i,r,a,n,s,l,o,h,c,d,u,m,g,v,f){let p=this.elements;return p[0]=t,p[4]=i,p[8]=r,p[12]=a,p[1]=n,p[5]=s,p[9]=l,p[13]=o,p[2]=h,p[6]=c,p[10]=d,p[14]=u,p[3]=m,p[7]=g,p[11]=v,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ji().fromArray(this.elements)}copy(t){let i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){let i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){let i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return this.determinantAffine()===0?(t.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let i=this.elements,r=t.elements,a=1/dr.setFromMatrixColumn(t,0).length(),n=1/dr.setFromMatrixColumn(t,1).length(),s=1/dr.setFromMatrixColumn(t,2).length();return i[0]=r[0]*a,i[1]=r[1]*a,i[2]=r[2]*a,i[3]=0,i[4]=r[4]*n,i[5]=r[5]*n,i[6]=r[6]*n,i[7]=0,i[8]=r[8]*s,i[9]=r[9]*s,i[10]=r[10]*s,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){let i=this.elements,r=t.x,a=t.y,n=t.z,s=Math.cos(r),l=Math.sin(r),o=Math.cos(a),h=Math.sin(a),c=Math.cos(n),d=Math.sin(n);if(t.order==="XYZ"){let u=s*c,m=s*d,g=l*c,v=l*d;i[0]=o*c,i[4]=-o*d,i[8]=h,i[1]=m+g*h,i[5]=u-v*h,i[9]=-l*o,i[2]=v-u*h,i[6]=g+m*h,i[10]=s*o}else if(t.order==="YXZ"){let u=o*c,m=o*d,g=h*c,v=h*d;i[0]=u+v*l,i[4]=g*l-m,i[8]=s*h,i[1]=s*d,i[5]=s*c,i[9]=-l,i[2]=m*l-g,i[6]=v+u*l,i[10]=s*o}else if(t.order==="ZXY"){let u=o*c,m=o*d,g=h*c,v=h*d;i[0]=u-v*l,i[4]=-s*d,i[8]=g+m*l,i[1]=m+g*l,i[5]=s*c,i[9]=v-u*l,i[2]=-s*h,i[6]=l,i[10]=s*o}else if(t.order==="ZYX"){let u=s*c,m=s*d,g=l*c,v=l*d;i[0]=o*c,i[4]=g*h-m,i[8]=u*h+v,i[1]=o*d,i[5]=v*h+u,i[9]=m*h-g,i[2]=-h,i[6]=l*o,i[10]=s*o}else if(t.order==="YZX"){let u=s*o,m=s*h,g=l*o,v=l*h;i[0]=o*c,i[4]=v-u*d,i[8]=g*d+m,i[1]=d,i[5]=s*c,i[9]=-l*c,i[2]=-h*c,i[6]=m*d+g,i[10]=u-v*d}else if(t.order==="XZY"){let u=s*o,m=s*h,g=l*o,v=l*h;i[0]=o*c,i[4]=-d,i[8]=h*c,i[1]=u*d+v,i[5]=s*c,i[9]=m*d-g,i[2]=g*d-m,i[6]=l*c,i[10]=v*d+u}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(id,t,rd)}lookAt(t,i,r){let a=this.elements;return Xt.subVectors(t,i),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Ii.crossVectors(r,Xt),Ii.lengthSq()===0&&(Math.abs(r.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Ii.crossVectors(r,Xt)),Ii.normalize(),La.crossVectors(Xt,Ii),a[0]=Ii.x,a[4]=La.x,a[8]=Xt.x,a[1]=Ii.y,a[5]=La.y,a[9]=Xt.y,a[2]=Ii.z,a[6]=La.z,a[10]=Xt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){let r=t.elements,a=i.elements,n=this.elements,s=r[0],l=r[4],o=r[8],h=r[12],c=r[1],d=r[5],u=r[9],m=r[13],g=r[2],v=r[6],f=r[10],p=r[14],y=r[3],E=r[7],_=r[11],S=r[15],w=a[0],R=a[4],x=a[8],T=a[12],N=a[1],P=a[5],D=a[9],G=a[13],I=a[2],z=a[6],Z=a[10],k=a[14],le=a[3],j=a[7],q=a[11],ee=a[15];return n[0]=s*w+l*N+o*I+h*le,n[4]=s*R+l*P+o*z+h*j,n[8]=s*x+l*D+o*Z+h*q,n[12]=s*T+l*G+o*k+h*ee,n[1]=c*w+d*N+u*I+m*le,n[5]=c*R+d*P+u*z+m*j,n[9]=c*x+d*D+u*Z+m*q,n[13]=c*T+d*G+u*k+m*ee,n[2]=g*w+v*N+f*I+p*le,n[6]=g*R+v*P+f*z+p*j,n[10]=g*x+v*D+f*Z+p*q,n[14]=g*T+v*G+f*k+p*ee,n[3]=y*w+E*N+_*I+S*le,n[7]=y*R+E*P+_*z+S*j,n[11]=y*x+E*D+_*Z+S*q,n[15]=y*T+E*G+_*k+S*ee,this}multiplyScalar(t){let i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){let t=this.elements,i=t[0],r=t[4],a=t[8],n=t[12],s=t[1],l=t[5],o=t[9],h=t[13],c=t[2],d=t[6],u=t[10],m=t[14],g=t[3],v=t[7],f=t[11],p=t[15],y=o*m-h*u,E=l*m-h*d,_=l*u-o*d,S=s*m-h*c,w=s*u-o*c,R=s*d-l*c;return i*(v*y-f*E+p*_)-r*(g*y-f*S+p*w)+a*(g*E-v*S+p*R)-n*(g*_-v*w+f*R)}determinantAffine(){let t=this.elements,i=t[0],r=t[4],a=t[8],n=t[1],s=t[5],l=t[9],o=t[2],h=t[6],c=t[10];return i*(s*c-l*h)-r*(n*c-l*o)+a*(n*h-s*o)}transpose(){let t=this.elements,i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=i,a[14]=r),this}invert(){let t=this.elements,i=t[0],r=t[1],a=t[2],n=t[3],s=t[4],l=t[5],o=t[6],h=t[7],c=t[8],d=t[9],u=t[10],m=t[11],g=t[12],v=t[13],f=t[14],p=t[15],y=i*l-r*s,E=i*o-a*s,_=i*h-n*s,S=r*o-a*l,w=r*h-n*l,R=a*h-n*o,x=c*v-d*g,T=c*f-u*g,N=c*p-m*g,P=d*f-u*v,D=d*p-m*v,G=u*p-m*f,I=y*G-E*D+_*P+S*N-w*T+R*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(l*G-o*D+h*P)*z,t[1]=(a*D-r*G-n*P)*z,t[2]=(v*R-f*w+p*S)*z,t[3]=(u*w-d*R-m*S)*z,t[4]=(o*N-s*G-h*T)*z,t[5]=(i*G-a*N+n*T)*z,t[6]=(f*_-g*R-p*E)*z,t[7]=(c*R-u*_+m*E)*z,t[8]=(s*D-l*N+h*x)*z,t[9]=(r*N-i*D-n*x)*z,t[10]=(g*w-v*_+p*y)*z,t[11]=(d*_-c*w-m*y)*z,t[12]=(l*T-s*P-o*x)*z,t[13]=(i*P-r*T+a*x)*z,t[14]=(v*E-g*S-f*y)*z,t[15]=(c*S-d*E+u*y)*z,this}scale(t){let i=this.elements,r=t.x,a=t.y,n=t.z;return i[0]*=r,i[4]*=a,i[8]*=n,i[1]*=r,i[5]*=a,i[9]*=n,i[2]*=r,i[6]*=a,i[10]*=n,i[3]*=r,i[7]*=a,i[11]*=n,this}getMaxScaleOnAxis(){let t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,a))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){let i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){let i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){let r=Math.cos(i),a=Math.sin(i),n=1-r,s=t.x,l=t.y,o=t.z,h=n*s,c=n*l;return this.set(h*s+r,h*l-a*o,h*o+a*l,0,h*l+a*o,c*l+r,c*o-a*s,0,h*o-a*l,c*o+a*s,n*o*o+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,a,n,s){return this.set(1,r,n,0,t,1,s,0,i,a,1,0,0,0,0,1),this}compose(t,i,r){let a=this.elements,n=i._x,s=i._y,l=i._z,o=i._w,h=n+n,c=s+s,d=l+l,u=n*h,m=n*c,g=n*d,v=s*c,f=s*d,p=l*d,y=o*h,E=o*c,_=o*d,S=r.x,w=r.y,R=r.z;return a[0]=(1-(v+p))*S,a[1]=(m+_)*S,a[2]=(g-E)*S,a[3]=0,a[4]=(m-_)*w,a[5]=(1-(u+p))*w,a[6]=(f+y)*w,a[7]=0,a[8]=(g+E)*R,a[9]=(f-y)*R,a[10]=(1-(u+v))*R,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,i,r){let a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];let n=this.determinantAffine();if(n===0)return r.set(1,1,1),i.identity(),this;let s=dr.set(a[0],a[1],a[2]).length(),l=dr.set(a[4],a[5],a[6]).length(),o=dr.set(a[8],a[9],a[10]).length();n<0&&(s=-s),ii.copy(this);let h=1/s,c=1/l,d=1/o;return ii.elements[0]*=h,ii.elements[1]*=h,ii.elements[2]*=h,ii.elements[4]*=c,ii.elements[5]*=c,ii.elements[6]*=c,ii.elements[8]*=d,ii.elements[9]*=d,ii.elements[10]*=d,i.setFromRotationMatrix(ii),r.x=s,r.y=l,r.z=o,this}makePerspective(t,i,r,a,n,s,l=si,o=!1){let h=this.elements,c=2*n/(i-t),d=2*n/(r-a),u=(i+t)/(i-t),m=(r+a)/(r-a),g,v;if(o)g=n/(s-n),v=s*n/(s-n);else if(l===si)g=-(s+n)/(s-n),v=-2*s*n/(s-n);else if(l===da)g=-s/(s-n),v=-s*n/(s-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=d,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=v,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,i,r,a,n,s,l=si,o=!1){let h=this.elements,c=2/(i-t),d=2/(r-a),u=-(i+t)/(i-t),m=-(r+a)/(r-a),g,v;if(o)g=1/(s-n),v=s/(s-n);else if(l===si)g=-2/(s-n),v=-(s+n)/(s-n);else if(l===da)g=-1/(s-n),v=-n/(s-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=c,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=d,h[9]=0,h[13]=m,h[2]=0,h[6]=0,h[10]=g,h[14]=v,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){let i=this.elements,r=t.elements;for(let a=0;a<16;a++)if(i[a]!==r[a])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){let r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}},Ji.prototype.isMatrix4=!0,Ji),dr=new C,ii=new Ke,id=new C(0,0,0),rd=new C(1,1,1),Ii=new C,La=new C,Xt=new C,Ml=new Ke,bl=new Ri,zr=class Hh{constructor(t=0,i=0,r=0,a=Hh.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,a=this._order){return this._x=t,this._y=i,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let a=t.elements,n=a[0],s=a[4],l=a[8],o=a[1],h=a[5],c=a[9],d=a[2],u=a[6],m=a[10];switch(i){case"XYZ":this._y=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(o,h)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-s,h)):(this._y=0,this._z=Math.atan2(o,n));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(o,n)):(this._x=0,this._z=Math.atan2(-s,h));break;case"YZX":this._z=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-Je(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(l,n)):(this._x=Math.atan2(-c,m),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Ml.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ml,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return bl.setFromEuler(this),this.setFromQuaternion(bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zr.DEFAULT_ORDER="XYZ";var kh=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ad=0,Tl=new C,pr=new Ri,_i=new Ke,Na=new C,Jr=new C,nd=new C,sd=new Ri,El=new C(1,0,0),wl=new C(0,1,0),Al=new C(0,0,1),Rl={type:"added"},od={type:"removed"},mr={type:"childadded",child:null},es={type:"childremoved",child:null},Jt=class gn extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();let t=new C,i=new zr,r=new Ri,a=new C(1,1,1);function n(){r.setFromEuler(i,!1)}function s(){i.setFromQuaternion(r,void 0,!1)}i._onChange(n),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ke},normalMatrix:{value:new Ye}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return pr.setFromAxisAngle(t,i),this.quaternion.multiply(pr),this}rotateOnWorldAxis(t,i){return pr.setFromAxisAngle(t,i),this.quaternion.premultiply(pr),this}rotateX(t){return this.rotateOnAxis(El,t)}rotateY(t){return this.rotateOnAxis(wl,t)}rotateZ(t){return this.rotateOnAxis(Al,t)}translateOnAxis(t,i){return Tl.copy(t).applyQuaternion(this.quaternion),this.position.add(Tl.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(El,t)}translateY(t){return this.translateOnAxis(wl,t)}translateZ(t){return this.translateOnAxis(Al,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Na.copy(t):Na.set(t,i,r);let a=this.parent;this.updateWorldMatrix(!0,!1),Jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Jr,Na,this.up):_i.lookAt(Na,Jr,this.up),this.quaternion.setFromRotationMatrix(_i),a&&(_i.extractRotation(a.matrixWorld),pr.setFromRotationMatrix(_i),this.quaternion.premultiply(pr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(He("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rl),mr.child=t,this.dispatchEvent(mr),mr.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(od),es.child=t,this.dispatchEvent(es),es.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rl),mr.child=t,this.dispatchEvent(mr),mr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,a=this.children.length;r<a;r++){let n=this.children[r].getObjectByProperty(t,i);if(n!==void 0)return n}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,t,nd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jr,sd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,a=t.z,n=this.matrix.elements;n[12]+=i-n[0]*i-n[4]*r-n[8]*a,n[13]+=r-n[1]*i-n[5]*r-n[9]*a,n[14]+=a-n[2]*i-n[6]*r-n[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i,r=!1){let a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),i===!0){let n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateWorldMatrix(!1,!0,r)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,a.name=this.name,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.visible=this.visible,a.frustumCulled=this.frustumCulled,a.renderOrder=this.renderOrder,a.static=this.static,a.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(l=>({...l})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function n(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let o=l.shapes;if(Array.isArray(o))for(let h=0,c=o.length;h<c;h++){let d=o[h];n(t.shapes,d)}else n(t.shapes,o)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let o=0,h=this.material.length;o<h;o++)l.push(n(t.materials,this.material[o]));a.material=l}else a.material=n(t.materials,this.material);if(this.children.length>0){a.children=[];for(let l=0;l<this.children.length;l++)a.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let l=0;l<this.animations.length;l++){let o=this.animations[l];a.animations.push(n(t.animations,o))}}if(i){let l=s(t.geometries),o=s(t.materials),h=s(t.textures),c=s(t.images),d=s(t.shapes),u=s(t.skeletons),m=s(t.animations),g=s(t.nodes);l.length>0&&(r.geometries=l),o.length>0&&(r.materials=o),h.length>0&&(r.textures=h),c.length>0&&(r.images=c),d.length>0&&(r.shapes=d),u.length>0&&(r.skeletons=u),m.length>0&&(r.animations=m),g.length>0&&(r.nodes=g)}return r.object=a,r;function s(l){let o=[];for(let h in l){let c=l[h];delete c.metadata,o.push(c)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let a=t.children[r];this.add(a.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Jt.DEFAULT_UP=new C(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Da=class extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ld={type:"move"},ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Da,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Da,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Da,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,n=null,s=this._targetRay,l=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){n=!0;for(let g of e.hand.values()){let v=t.getJointPose(g,i),f=this._getHandJoint(o,g);v!==null&&(f.matrix.fromArray(v.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=v.radius),f.visible=v!==null}let h=o.joints["index-finger-tip"],c=o.joints["thumb-tip"],d=h.position.distanceTo(c.position),u=.02,m=.005;o.inputState.pinching&&d>u+m?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&d<=u-m&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));s!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(ld)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),o!==null&&(o.visible=n!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Da;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Ua={h:0,s:0,l:0};function is(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?e+(t-e)*6*i:i<1/2?t:i<2/3?e+(t-e)*6*(2/3-i):e}var We=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=it.workingColorSpace){if(e=Zu(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,n=2*i-a;this.r=is(n,a,e+1/3),this.g=is(n,a,e),this.b=is(n,a,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,t=Dt){function i(a){a!==void 0&&parseFloat(a)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,n=r[1],s=r[2];switch(n){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],n=a.length;if(n===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(n===6)return this.setHex(parseInt(a,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){let i=Gh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}copyLinearToSRGB(e){return this.r=Ir(e.r),this.g=Ir(e.g),this.b=Ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return it.workingToColorSpace(Nt.copy(this),e),Math.round(Je(Nt.r*255,0,255))*65536+Math.round(Je(Nt.g*255,0,255))*256+Math.round(Je(Nt.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Nt.copy(this),t);let i=Nt.r,r=Nt.g,a=Nt.b,n=Math.max(i,r,a),s=Math.min(i,r,a),l,o,h=(s+n)/2;if(s===n)l=0,o=0;else{let c=n-s;switch(o=h<=.5?c/(n+s):c/(2-n-s),n){case i:l=(r-a)/c+(r<a?6:0);break;case r:l=(a-i)/c+2;break;case a:l=(i-r)/c+4;break}l/=6}return e.h=l,e.s=o,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Dt){it.workingToColorSpace(Nt.copy(this),e);let t=Nt.r,i=Nt.g,r=Nt.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(Ua);let i=Zn(Li.h,Ua.h,t),r=Zn(Li.s,Ua.s,t),a=Zn(Li.l,Ua.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nt=new We;We.NAMES=Gh;var rr=class extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zr,this.environmentIntensity=1,this.environmentRotation=new zr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ri=new C,xi=new C,rs=new C,yi=new C,fr=new C,gr=new C,Cl=new C,as=new C,ns=new C,ss=new C,os=new at,ls=new at,hs=new at,wr=class Ar{constructor(t=new C,i=new C,r=new C){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,a){a.subVectors(r,i),ri.subVectors(t,i),a.cross(ri);let n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(t,i,r,a,n){ri.subVectors(a,i),xi.subVectors(r,i),rs.subVectors(t,i);let s=ri.dot(ri),l=ri.dot(xi),o=ri.dot(rs),h=xi.dot(xi),c=xi.dot(rs),d=s*h-l*l;if(d===0)return n.set(0,0,0),null;let u=1/d,m=(h*o-l*c)*u,g=(s*c-l*o)*u;return n.set(1-m-g,g,m)}static containsPoint(t,i,r,a){return this.getBarycoord(t,i,r,a,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(t,i,r,a,n,s,l,o){return this.getBarycoord(t,i,r,a,yi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(n,yi.x),o.addScaledVector(s,yi.y),o.addScaledVector(l,yi.z),o)}static getInterpolatedAttribute(t,i,r,a,n,s){return os.setScalar(0),ls.setScalar(0),hs.setScalar(0),os.fromBufferAttribute(t,i),ls.fromBufferAttribute(t,r),hs.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(os,n.x),s.addScaledVector(ls,n.y),s.addScaledVector(hs,n.z),s}static isFrontFacing(t,i,r,a){return ri.subVectors(r,i),xi.subVectors(t,i),ri.cross(xi).dot(a)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,a){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,i,r,a){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ri.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),ri.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ar.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ar.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,a,n){return Ar.getInterpolation(t,this.a,this.b,this.c,i,r,a,n)}containsPoint(t){return Ar.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ar.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){let r=this.a,a=this.b,n=this.c,s,l;fr.subVectors(a,r),gr.subVectors(n,r),as.subVectors(t,r);let o=fr.dot(as),h=gr.dot(as);if(o<=0&&h<=0)return i.copy(r);ns.subVectors(t,a);let c=fr.dot(ns),d=gr.dot(ns);if(c>=0&&d<=c)return i.copy(a);let u=o*d-c*h;if(u<=0&&o>=0&&c<=0)return s=o/(o-c),i.copy(r).addScaledVector(fr,s);ss.subVectors(t,n);let m=fr.dot(ss),g=gr.dot(ss);if(g>=0&&m<=g)return i.copy(n);let v=m*h-o*g;if(v<=0&&h>=0&&g<=0)return l=h/(h-g),i.copy(r).addScaledVector(gr,l);let f=c*g-m*d;if(f<=0&&d-c>=0&&m-g>=0)return Cl.subVectors(n,a),l=(d-c)/(d-c+(m-g)),i.copy(a).addScaledVector(Cl,l);let p=1/(f+v+u);return s=v*p,l=u*p,i.copy(r).addScaledVector(fr,s).addScaledVector(gr,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Fi=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let n=0,s=a.count;n<s;n++)e.isMesh===!0?e.getVertexPosition(n,ai):ai.fromBufferAttribute(a,n),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Oa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Oa.copy(i.boundingBox)),Oa.applyMatrix4(e.matrixWorld),this.union(Oa)}let r=e.children;for(let a=0,n=r.length;a<n;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kr),Ba.subVectors(this.max,Kr),vr.subVectors(e.a,Kr),_r.subVectors(e.b,Kr),xr.subVectors(e.c,Kr),Ni.subVectors(_r,vr),Di.subVectors(xr,_r),Gi.subVectors(vr,xr);let t=[0,-Ni.z,Ni.y,0,-Di.z,Di.y,0,-Gi.z,Gi.y,Ni.z,0,-Ni.x,Di.z,0,-Di.x,Gi.z,0,-Gi.x,-Ni.y,Ni.x,0,-Di.y,Di.x,0,-Gi.y,Gi.x,0];return!cs(t,vr,_r,xr,Ba)||(t=[1,0,0,0,1,0,0,0,1],!cs(t,vr,_r,xr,Ba))?!1:(Fa.crossVectors(Ni,Di),t=[Fa.x,Fa.y,Fa.z],cs(t,vr,_r,xr,Ba))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Si=[new C,new C,new C,new C,new C,new C,new C,new C],ai=new C,Oa=new Fi,vr=new C,_r=new C,xr=new C,Ni=new C,Di=new C,Gi=new C,Kr=new C,Ba=new C,Fa=new C,Wi=new C;function cs(e,t,i,r,a){for(let n=0,s=e.length-3;n<=s;n+=3){Wi.fromArray(e,n);let l=a.x*Math.abs(Wi.x)+a.y*Math.abs(Wi.y)+a.z*Math.abs(Wi.z),o=t.dot(Wi),h=i.dot(Wi),c=r.dot(Wi);if(Math.max(-Math.max(o,h,c),Math.min(o,h,c))>l)return!1}return!0}var Ti=hd();function hd(){let e=new ArrayBuffer(4),t=new Float32Array(e),i=new Uint32Array(e),r=new Uint32Array(512),a=new Uint32Array(512);for(let o=0;o<256;++o){let h=o-127;h<-27?(r[o]=0,r[o|256]=32768,a[o]=24,a[o|256]=24):h<-14?(r[o]=1024>>-h-14,r[o|256]=1024>>-h-14|32768,a[o]=-h-1,a[o|256]=-h-1):h<=15?(r[o]=h+15<<10,r[o|256]=h+15<<10|32768,a[o]=13,a[o|256]=13):h<128?(r[o]=31744,r[o|256]=64512,a[o]=24,a[o|256]=24):(r[o]=31744,r[o|256]=64512,a[o]=13,a[o|256]=13)}let n=new Uint32Array(2048),s=new Uint32Array(64),l=new Uint32Array(64);for(let o=1;o<1024;++o){let h=o<<13,c=0;for(;(h&8388608)===0;)h<<=1,c-=8388608;h&=-8388609,c+=947912704,n[o]=h|c}for(let o=1024;o<2048;++o)n[o]=939524096+(o-1024<<13);for(let o=1;o<31;++o)s[o]=o<<23;s[31]=1199570944,s[32]=2147483648;for(let o=33;o<63;++o)s[o]=2147483648+(o-32<<23);s[63]=3347054592;for(let o=1;o<64;++o)o!==32&&(l[o]=1024);return{floatView:t,uint32View:i,baseTable:r,shiftTable:a,mantissaTable:n,exponentTable:s,offsetTable:l}}function cd(e){Math.abs(e)>65504&&Ue("DataUtils.toHalfFloat(): Value out of range."),e=Je(e,-65504,65504),Ti.floatView[0]=e;let t=Ti.uint32View[0],i=t>>23&511;return Ti.baseTable[i]+((t&8388607)>>Ti.shiftTable[i])}function ud(e){let t=e>>10;return Ti.uint32View[0]=Ti.mantissaTable[Ti.offsetTable[t]+(e&1023)]+Ti.exponentTable[t],Ti.floatView[0]}var za=class{static toHalfFloat(e){return cd(e)}static fromHalfFloat(e){return ud(e)}},bt=new C,Va=new Q,dd=0,ti=class extends ir{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Gu,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Va.fromBufferAttribute(this,t),Va.applyMatrix3(e),this.setXY(t,Va.x,Va.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),i=Ht(i,this.array),r=Ht(r,this.array),a=Ht(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Wh=class extends ti{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Xh=class extends ti{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ne=class extends ti{constructor(e,t,i){super(new Float32Array(e),t,i)}},pd=new Fi,$r=new C,us=new C,zi=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):pd.setFromPoints(e).getCenter(i);let r=0;for(let a=0,n=e.length;a<n;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);let t=$r.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector($r,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(us.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(us)),this.expandByPoint($r.copy(e.center).sub(us))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},md=0,$t=new Ke,ds=new Jt,yr=new C,jt=new Fi,Qr=new Fi,At=new C,mt=class jh extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wu(t)?Xh:Wh)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){let i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);let r=this.attributes.normal;if(r!==void 0){let n=new Ye().getNormalMatrix(t);r.applyNormalMatrix(n),r.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return $t.makeRotationFromQuaternion(t),this.applyMatrix4($t),this}rotateX(t){return $t.makeRotationX(t),this.applyMatrix4($t),this}rotateY(t){return $t.makeRotationY(t),this.applyMatrix4($t),this}rotateZ(t){return $t.makeRotationZ(t),this.applyMatrix4($t),this}translate(t,i,r){return $t.makeTranslation(t,i,r),this.applyMatrix4($t),this}scale(t,i,r){return $t.makeScale(t,i,r),this.applyMatrix4($t),this}lookAt(t){return ds.lookAt(t),ds.updateMatrix(),this.applyMatrix4(ds.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(t){let i=this.getAttribute("position");if(i===void 0){let r=[];for(let a=0,n=t.length;a<n;a++){let s=t[a];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ne(r,3))}else{let r=Math.min(t.length,i.count);for(let a=0;a<r;a++){let n=t[a];i.setXYZ(a,n.x,n.y,n.z||0)}t.length>i.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,a=i.length;r<a;r++){let n=i[r];jt.setFromBufferAttribute(n),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zi);let t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let r=this.boundingSphere.center;if(jt.setFromBufferAttribute(t),i)for(let n=0,s=i.length;n<s;n++){let l=i[n];Qr.setFromBufferAttribute(l),this.morphTargetsRelative?(At.addVectors(jt.min,Qr.min),jt.expandByPoint(At),At.addVectors(jt.max,Qr.max),jt.expandByPoint(At)):(jt.expandByPoint(Qr.min),jt.expandByPoint(Qr.max))}jt.getCenter(r);let a=0;for(let n=0,s=t.count;n<s;n++)At.fromBufferAttribute(t,n),a=Math.max(a,r.distanceToSquared(At));if(i)for(let n=0,s=i.length;n<s;n++){let l=i[n],o=this.morphTargetsRelative;for(let h=0,c=l.count;h<c;h++)At.fromBufferAttribute(l,h),o&&(yr.fromBufferAttribute(t,h),At.add(yr)),a=Math.max(a,r.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let r=i.position,a=i.normal,n=i.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==r.count)&&(s=new ti(new Float32Array(4*r.count),4),this.setAttribute("tangent",s));let l=[],o=[];for(let x=0;x<r.count;x++)l[x]=new C,o[x]=new C;let h=new C,c=new C,d=new C,u=new Q,m=new Q,g=new Q,v=new C,f=new C;function p(x,T,N){h.fromBufferAttribute(r,x),c.fromBufferAttribute(r,T),d.fromBufferAttribute(r,N),u.fromBufferAttribute(n,x),m.fromBufferAttribute(n,T),g.fromBufferAttribute(n,N),c.sub(h),d.sub(h),m.sub(u),g.sub(u);let P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(P),f.copy(d).multiplyScalar(m.x).addScaledVector(c,-g.x).multiplyScalar(P),l[x].add(v),l[T].add(v),l[N].add(v),o[x].add(f),o[T].add(f),o[N].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let x=0,T=y.length;x<T;++x){let N=y[x],P=N.start,D=N.count;for(let G=P,I=P+D;G<I;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let E=new C,_=new C,S=new C,w=new C;function R(x){S.fromBufferAttribute(a,x),w.copy(S);let T=l[x];E.copy(T),E.sub(S.multiplyScalar(S.dot(T))).normalize(),_.crossVectors(w,T);let N=_.dot(o[x])<0?-1:1;s.setXYZW(x,E.x,E.y,E.z,N)}for(let x=0,T=y.length;x<T;++x){let N=y[x],P=N.start,D=N.count;for(let G=P,I=P+D;G<I;G+=3)R(t.getX(G+0)),R(t.getX(G+1)),R(t.getX(G+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==i.count)r=new ti(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let u=0,m=r.count;u<m;u++)r.setXYZ(u,0,0,0);let a=new C,n=new C,s=new C,l=new C,o=new C,h=new C,c=new C,d=new C;if(t)for(let u=0,m=t.count;u<m;u+=3){let g=t.getX(u+0),v=t.getX(u+1),f=t.getX(u+2);a.fromBufferAttribute(i,g),n.fromBufferAttribute(i,v),s.fromBufferAttribute(i,f),c.subVectors(s,n),d.subVectors(a,n),c.cross(d),l.fromBufferAttribute(r,g),o.fromBufferAttribute(r,v),h.fromBufferAttribute(r,f),l.add(c),o.add(c),h.add(c),r.setXYZ(g,l.x,l.y,l.z),r.setXYZ(v,o.x,o.y,o.z),r.setXYZ(f,h.x,h.y,h.z)}else for(let u=0,m=i.count;u<m;u+=3)a.fromBufferAttribute(i,u+0),n.fromBufferAttribute(i,u+1),s.fromBufferAttribute(i,u+2),c.subVectors(s,n),d.subVectors(a,n),c.cross(d),r.setXYZ(u+0,c.x,c.y,c.z),r.setXYZ(u+1,c.x,c.y,c.z),r.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)At.fromBufferAttribute(t,i),At.normalize(),t.setXYZ(i,At.x,At.y,At.z)}toNonIndexed(){function t(l,o){let h=l.array,c=l.itemSize,d=l.normalized,u=new h.constructor(o.length*c),m=0,g=0;for(let v=0,f=o.length;v<f;v++){l.isInterleavedBufferAttribute?m=o[v]*l.data.stride+l.offset:m=o[v]*c;for(let p=0;p<c;p++)u[g++]=h[m++]}return new ti(u,c,d)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let i=new jh,r=this.index.array,a=this.attributes;for(let l in a){let o=a[l],h=t(o,r);i.setAttribute(l,h)}let n=this.morphAttributes;for(let l in n){let o=[],h=n[l];for(let c=0,d=h.length;c<d;c++){let u=h[c],m=t(u,r);o.push(m)}i.morphAttributes[l]=o}i.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let l=0,o=s.length;l<o;l++){let h=s[l];i.addGroup(h.start,h.count,h.materialIndex)}return i}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let h in o)o[h]!==void 0&&(t[h]=o[h]);return t}t.data={attributes:{}};let i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});let r=this.attributes;for(let o in r){let h=r[o];t.data.attributes[o]=h.toJSON(t.data)}let a={},n=!1;for(let o in this.morphAttributes){let h=this.morphAttributes[o],c=[];for(let d=0,u=h.length;d<u;d++){let m=h[d];c.push(m.toJSON(t.data))}c.length>0&&(a[o]=c,n=!0)}n&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let l=this.boundingSphere;return l!==null&&(t.data.boundingSphere=l.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let i={};this.name=t.name;let r=t.index;r!==null&&this.setIndex(r.clone());let a=t.attributes;for(let h in a){let c=a[h];this.setAttribute(h,c.clone(i))}let n=t.morphAttributes;for(let h in n){let c=[],d=n[h];for(let u=0,m=d.length;u<m;u++)c.push(d[u].clone(i));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let h=0,c=s.length;h<c;h++){let d=s[h];this.addGroup(d.start,d.count,d.materialIndex)}let l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var b_=new C;var ps=new C,fd=new C,gd=new Ye,Oi=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=ps.subVectors(i,t).cross(fd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(ps),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let n=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(n<0||n>1)?null:t.copy(e.start).addScaledVector(r,n)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||gd.getNormalMatrix(e),r=this.coplanarPoint(ps).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},vd=0,Wr=class extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Gr(),this.name="",this.type="Material",this.blending=sa,this.side=Ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mh,this.blendDst=bh,this.blendEquation=Er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=ha,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let n=[];for(let s in a){let l=a[s];delete l.metadata,n.push(l)}return n}if(t){let a=r(e.textures),n=r(e.images);a.length>0&&(i.textures=a),n.length>0&&(i.images=n)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new We().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Oi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Q().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var T_=new C,E_=new C,w_=new C,A_=new Q,R_=new Q,C_=new Ke,P_=new C,I_=new C,L_=new C,N_=new Q,D_=new Q,U_=new Q;var O_=new C,B_=new C;var Mi=new C,ms=new C,Ha=new C,ka=new C,Cn=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ms.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),ka.copy(this.origin).sub(ms);let a=e.distanceTo(t)*.5,n=-this.direction.dot(Ha),s=ka.dot(this.direction),l=-ka.dot(Ha),o=ka.lengthSq(),h=Math.abs(1-n*n),c,d,u,m;if(h>0)if(c=n*l-s,d=n*s-l,m=a*h,c>=0)if(d>=-m)if(d<=m){let g=1/h;c*=g,d*=g,u=c*(c+n*d+2*s)+d*(n*c+d+2*l)+o}else d=a,c=Math.max(0,-(n*d+s)),u=-c*c+d*(d+2*l)+o;else d=-a,c=Math.max(0,-(n*d+s)),u=-c*c+d*(d+2*l)+o;else d<=-m?(c=Math.max(0,-(-n*a+s)),d=c>0?-a:Math.min(Math.max(-a,-l),a),u=-c*c+d*(d+2*l)+o):d<=m?(c=0,d=Math.min(Math.max(-a,-l),a),u=d*(d+2*l)+o):(c=Math.max(0,-(n*a+s)),d=c>0?a:Math.min(Math.max(-a,-l),a),u=-c*c+d*(d+2*l)+o);else d=n>0?-a:a,c=Math.max(0,-(n*d+s)),u=-c*c+d*(d+2*l)+o;return i&&i.copy(this.origin).addScaledVector(this.direction,c),r&&r.copy(ms).addScaledVector(Ha,d),u}intersectSphere(e,t){if(e.radius<0)return null;Mi.subVectors(e.center,this.origin);let i=Mi.dot(this.direction),r=Mi.dot(Mi)-i*i,a=e.radius*e.radius;if(r>a)return null;let n=Math.sqrt(a-r),s=i-n,l=i+n;return l<0?null:s<0?this.at(l,t):this.at(s,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,n,s,l,o=1/this.direction.x,h=1/this.direction.y,c=1/this.direction.z,d=this.origin;return o>=0?(i=(e.min.x-d.x)*o,r=(e.max.x-d.x)*o):(i=(e.max.x-d.x)*o,r=(e.min.x-d.x)*o),h>=0?(a=(e.min.y-d.y)*h,n=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,n=(e.min.y-d.y)*h),i>n||a>r||((a>i||isNaN(i))&&(i=a),(n<r||isNaN(r))&&(r=n),c>=0?(s=(e.min.z-d.z)*c,l=(e.max.z-d.z)*c):(s=(e.max.z-d.z)*c,l=(e.min.z-d.z)*c),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,i,r,a){let n=this.origin,s=this.direction,l=s.x,o=s.y,h=s.z,c=e.x-n.x,d=e.y-n.y,u=e.z-n.z,m=t.x-n.x,g=t.y-n.y,v=t.z-n.z,f=i.x-n.x,p=i.y-n.y,y=i.z-n.z,E=Math.abs(l),_=Math.abs(o),S=Math.abs(h),w,R,x,T,N,P,D,G,I,z,Z,k;if(E>=_&&E>=S?(x=l,P=c,I=m,k=f,l>=0?(w=o,R=h,T=d,N=u,D=g,G=v,z=p,Z=y):(w=h,R=o,T=u,N=d,D=v,G=g,z=y,Z=p)):_>=S?(x=o,P=d,I=g,k=p,o>=0?(w=h,R=l,T=u,N=c,D=v,G=m,z=y,Z=f):(w=l,R=h,T=c,N=u,D=m,G=v,z=f,Z=y)):(x=h,P=u,I=v,k=y,h>=0?(w=l,R=o,T=c,N=d,D=m,G=g,z=f,Z=p):(w=o,R=l,T=d,N=c,D=g,G=m,z=p,Z=f)),x===0)return null;let le=w/x,j=R/x,q=1/x,ee=T-le*P,Be=N-j*P,be=D-le*I,nt=G-j*I,Xe=z-le*k,Y=Z-j*k,re=Xe*nt-Y*be,se=ee*Y-Be*Xe,Ce=be*Be-nt*ee;if(r){if(re<0||se<0||Ce<0)return null}else if((re<0||se<0||Ce<0)&&(re>0||se>0||Ce>0))return null;let Fe=re+se+Ce;if(Fe===0)return null;let de=q*(re*P+se*I+Ce*k);return(Fe>0?de<0:de>0)?null:this.at(de/Fe,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qh=class extends Wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zr,this.combine=Th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pl=new Ke,Xi=new Cn,Ga=new zi,Il=new C,Wa=new C,Xa=new C,ja=new C,fs=new C,qa=new C,Ll=new C,Ya=new C,Pt=class extends Jt{constructor(e=new mt,t=new qh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,n=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(a&&s){qa.set(0,0,0);for(let l=0,o=a.length;l<o;l++){let h=s[l],c=a[l];h!==0&&(fs.fromBufferAttribute(c,e),n?qa.addScaledVector(fs,h):qa.addScaledVector(fs.sub(t),h))}t.add(qa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(a),Xi.copy(e.ray).recast(e.near),!(Ga.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Ga,Il)===null||Xi.origin.distanceToSquared(Il)>(e.far-e.near)**2))&&(Pl.copy(a).invert(),Xi.copy(e.ray).applyMatrix4(Pl),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,i){let r,a=this.geometry,n=this.material,s=a.index,l=a.attributes.position,o=a.attributes.uv,h=a.attributes.uv1,c=a.attributes.normal,d=a.groups,u=a.drawRange;if(s!==null)if(Array.isArray(n))for(let m=0,g=d.length;m<g;m++){let v=d[m],f=n[v.materialIndex],p=Math.max(v.start,u.start),y=Math.min(s.count,Math.min(v.start+v.count,u.start+u.count));for(let E=p,_=y;E<_;E+=3){let S=s.getX(E),w=s.getX(E+1),R=s.getX(E+2);r=Za(this,f,e,i,o,h,c,S,w,R),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{let m=Math.max(0,u.start),g=Math.min(s.count,u.start+u.count);for(let v=m,f=g;v<f;v+=3){let p=s.getX(v),y=s.getX(v+1),E=s.getX(v+2);r=Za(this,n,e,i,o,h,c,p,y,E),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(n))for(let m=0,g=d.length;m<g;m++){let v=d[m],f=n[v.materialIndex],p=Math.max(v.start,u.start),y=Math.min(l.count,Math.min(v.start+v.count,u.start+u.count));for(let E=p,_=y;E<_;E+=3){let S=E,w=E+1,R=E+2;r=Za(this,f,e,i,o,h,c,S,w,R),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{let m=Math.max(0,u.start),g=Math.min(l.count,u.start+u.count);for(let v=m,f=g;v<f;v+=3){let p=v,y=v+1,E=v+2;r=Za(this,n,e,i,o,h,c,p,y,E),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}};function _d(e,t,i,r,a,n,s,l){let o;if(t.side===kt?o=r.intersectTriangle(s,n,a,!0,l):o=r.intersectTriangle(a,n,s,t.side===Ki,l),o===null)return null;Ya.copy(l),Ya.applyMatrix4(e.matrixWorld);let h=i.ray.origin.distanceTo(Ya);return h<i.near||h>i.far?null:{distance:h,point:Ya.clone(),object:e}}function Za(e,t,i,r,a,n,s,l,o,h){e.getVertexPosition(l,Wa),e.getVertexPosition(o,Xa),e.getVertexPosition(h,ja);let c=_d(e,t,i,r,Wa,Xa,ja,Ll);if(c){let d=new C;wr.getBarycoord(Ll,Wa,Xa,ja,d),a&&(c.uv=wr.getInterpolatedAttribute(a,l,o,h,d,new Q)),n&&(c.uv1=wr.getInterpolatedAttribute(n,l,o,h,d,new Q)),s&&(c.normal=wr.getInterpolatedAttribute(s,l,o,h,d,new C),c.normal.dot(r.direction)>0&&c.normal.multiplyScalar(-1));let u={a:l,b:o,c:h,normal:new C,materialIndex:0};wr.getNormal(Wa,Xa,ja,u.normal),c.face=u,c.barycoord=d}return c}var F_=new at,z_=new at,V_=new at,H_=new at,k_=new Ke,G_=new C,W_=new zi,X_=new Ke,j_=new Cn;var Bi=class extends Wt{constructor(e=null,t=1,i=1,r,a,n,s,l,o=Ct,h=Ct,c,d){super(null,n,s,l,o,h,r,a,c,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},q_=new Ke,Y_=new Ke;var Z_=new Ke,J_=new Ke;var K_=new Fi,$_=new Ke,Q_=new Pt,ex=new zi;var ji=new zi,xd=new Q(.5,.5),Ja=new C,Vr=class{constructor(e=new Oi,t=new Oi,i=new Oi,r=new Oi,a=new Oi,n=new Oi){this.planes=[e,t,i,r,a,n]}set(e,t,i,r,a,n){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(n),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=si,i=!1){let r=this.planes,a=e.elements,n=a[0],s=a[1],l=a[2],o=a[3],h=a[4],c=a[5],d=a[6],u=a[7],m=a[8],g=a[9],v=a[10],f=a[11],p=a[12],y=a[13],E=a[14],_=a[15];if(r[0].setComponents(o-n,u-h,f-m,_-p).normalize(),r[1].setComponents(o+n,u+h,f+m,_+p).normalize(),r[2].setComponents(o+s,u+c,f+g,_+y).normalize(),r[3].setComponents(o-s,u-c,f-g,_-y).normalize(),i)r[4].setComponents(l,d,v,E).normalize(),r[5].setComponents(o-l,u-d,f-v,_-E).normalize();else if(r[4].setComponents(o-l,u-d,f-v,_-E).normalize(),t===si)r[5].setComponents(o+l,u+d,f+v,_+E).normalize();else if(t===da)r[5].setComponents(l,d,v,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){ji.center.set(0,0,0);let t=xd.distanceTo(e.center);return ji.radius=.7071067811865476+t,ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ja.x=r.normal.x>0?e.max.x:e.min.x,Ja.y=r.normal.y>0?e.max.y:e.min.y,Ja.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Nl=new Ke,yd=class Yh{constructor(){this.coordinateSystem=si,this._frustums=[],this._count=0}setFromArrayCamera(t){let i=t.cameras,r=this._frustums;for(let a=0;a<i.length;a++){let n=i[a];Nl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),r[a]===void 0&&(r[a]=new Vr),r[a].setFromProjectionMatrix(Nl,n.coordinateSystem,n.reversedDepth)}return this._count=i.length,this}intersectsObject(t){let i=this._frustums;for(let r=0;r<this._count;r++)if(i[r].intersectsObject(t))return!0;return!1}intersectsSprite(t){let i=this._frustums;for(let r=0;r<this._count;r++)if(i[r].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let i=this._frustums;for(let r=0;r<this._count;r++)if(i[r].intersectsSphere(t))return!0;return!1}intersectsBox(t){let i=this._frustums;for(let r=0;r<this._count;r++)if(i[r].intersectsBox(t))return!0;return!1}containsPoint(t){let i=this._frustums;for(let r=0;r<this._count;r++)if(i[r].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let i=this._frustums,r=t._frustums;for(let a=0;a<t._count;a++)i[a]===void 0&&(i[a]=new Vr),i[a].copy(r[a]);return this._count=t._count,this}clone(){return new Yh().copy(this)}};var Sd=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,i,r){let a=this.pool,n=this.list;this.index>=a.length&&a.push({start:-1,count:-1,z:-1,index:-1});let s=a[this.index];n.push(s),this.index++,s.start=e,s.count=t,s.z=i,s.index=r}reset(){this.list.length=0,this.index=0}},tx=new Ke,ix=new We(1,1,1),rx=new Vr,ax=new yd,nx=new Fi,sx=new zi,ox=new C,lx=new C,hx=new C,cx=new Sd,ux=new Pt;var Io=class extends Wr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bn=new C,Tn=new C,Dl=new Ke,ea=new Cn,Ka=new zi,gs=new C,Ul=new C,Md=class extends Jt{constructor(e=new mt,t=new Io){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)bn.fromBufferAttribute(t,r-1),Tn.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=bn.distanceTo(Tn);e.setAttribute("lineDistance",new Ne(i,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,n=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(r),Ka.radius+=a,e.ray.intersectsSphere(Ka)===!1)return;Dl.copy(r).invert(),ea.copy(e.ray).applyMatrix4(Dl);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,o=this.isLineSegments?2:1,h=i.index,c=i.attributes.position;if(h!==null){let d=Math.max(0,n.start),u=Math.min(h.count,n.start+n.count);for(let m=d,g=u-1;m<g;m+=o){let v=h.getX(m),f=h.getX(m+1),p=$a(this,e,ea,l,v,f,m);p&&t.push(p)}if(this.isLineLoop){let m=h.getX(u-1),g=h.getX(d),v=$a(this,e,ea,l,m,g,u-1);v&&t.push(v)}}else{let d=Math.max(0,n.start),u=Math.min(c.count,n.start+n.count);for(let m=d,g=u-1;m<g;m+=o){let v=$a(this,e,ea,l,m,m+1,m);v&&t.push(v)}if(this.isLineLoop){let m=$a(this,e,ea,l,u-1,d,u-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let n=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=r}}}}};function $a(e,t,i,r,a,n,s){let l=e.geometry.attributes.position;if(bn.fromBufferAttribute(l,a),Tn.fromBufferAttribute(l,n),i.distanceSqToSegment(bn,Tn,gs,Ul)>r)return;gs.applyMatrix4(e.matrixWorld);let o=t.ray.origin.distanceTo(gs);if(!(o<t.near||o>t.far))return{distance:o,point:Ul.clone().applyMatrix4(e.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:e}}var Ol=new C,Bl=new C,Zh=class extends Md{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,a=t.count;r<a;r+=2)Ol.fromBufferAttribute(t,r),Bl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ol.distanceTo(Bl);e.setAttribute("lineDistance",new Ne(i,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var dx=new Ke,px=new Cn,mx=new zi,fx=new C;var Jh=class extends Wt{constructor(e=[],t=$i,i,r,a,n,s,l,o,h){super(e,t,i,r,a,n,s,l,o,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Kh=class extends Wt{constructor(e,t,i,r,a,n,s,l,o){super(e,t,i,r,a,n,s,l,o),this.isCanvasTexture=!0,this.needsUpdate=!0}};var pa=class extends Wt{constructor(e,t,i=pi,r,a,n,s=Ct,l=Ct,o,h=Ai,c=1){if(h!==Ai&&h!==Yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:c};super(d,r,a,n,s,l,h,i,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Po(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},bd=class extends pa{constructor(e,t=pi,i=$i,r,a,n=Ct,s=Ct,l,o=Ai){let h={width:e,height:e,depth:1},c=[h,h,h,h,h,h];super(e,e,t,i,r,a,n,s,l,o),this.image=c,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},$h=class extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Pn=class Qh extends mt{constructor(t=1,i=1,r=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:a,heightSegments:n,depthSegments:s};let l=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);let o=[],h=[],c=[],d=[],u=0,m=0;g("z","y","x",-1,-1,r,i,t,s,n,0),g("z","y","x",1,-1,r,i,-t,s,n,1),g("x","z","y",1,1,t,r,i,a,s,2),g("x","z","y",1,-1,t,r,-i,a,s,3),g("x","y","z",1,-1,t,i,r,a,n,4),g("x","y","z",-1,-1,t,i,-r,a,n,5),this.setIndex(o),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(d,2));function g(v,f,p,y,E,_,S,w,R,x,T){let N=_/R,P=S/x,D=_/2,G=S/2,I=w/2,z=R+1,Z=x+1,k=0,le=0,j=new C;for(let q=0;q<Z;q++){let ee=q*P-G;for(let Be=0;Be<z;Be++){let be=Be*N-D;j[v]=be*y,j[f]=ee*E,j[p]=I,h.push(j.x,j.y,j.z),j[v]=0,j[f]=0,j[p]=w>0?1:-1,c.push(j.x,j.y,j.z),d.push(Be/R),d.push(1-q/x),k+=1}}for(let q=0;q<x;q++)for(let ee=0;ee<R;ee++){let Be=u+ee+z*q,be=u+ee+z*(q+1),nt=u+(ee+1)+z*(q+1),Xe=u+(ee+1)+z*q;o.push(Be,be,Xe),o.push(be,nt,Xe),le+=6}l.addGroup(m,le,T),m+=le,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qh(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Td=class ec extends mt{constructor(t=1,i=1,r=4,a=8,n=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:i,capSegments:r,radialSegments:a,heightSegments:n},i=Math.max(0,i),r=Math.max(1,Math.floor(r)),a=Math.max(3,Math.floor(a)),n=Math.max(1,Math.floor(n));let s=[],l=[],o=[],h=[],c=i/2,d=Math.PI/2*t,u=i,m=2*d+u,g=r*2+n,v=a+1,f=new C,p=new C;for(let y=0;y<=g;y++){let E=0,_=0,S=0,w=0;if(y<=r){let T=y/r,N=T*Math.PI/2;_=-c-t*Math.cos(N),S=t*Math.sin(N),w=-t*Math.cos(N),E=T*d}else if(y<=r+n){let T=(y-r)/n;_=-c+T*i,S=t,w=0,E=d+T*u}else{let T=(y-r-n)/r,N=T*Math.PI/2;_=c+t*Math.sin(N),S=t*Math.cos(N),w=t*Math.sin(N),E=d+u+T*d}let R=Math.max(0,Math.min(1,E/m)),x=0;y===0?x=.5/a:y===g&&(x=-.5/a);for(let T=0;T<=a;T++){let N=T/a,P=N*Math.PI*2,D=Math.sin(P),G=Math.cos(P);p.x=-S*G,p.y=_,p.z=S*D,l.push(p.x,p.y,p.z),f.set(-S*G,w,S*D),f.normalize(),o.push(f.x,f.y,f.z),h.push(N+x,R)}if(y>0){let T=(y-1)*v;for(let N=0;N<a;N++){let P=T+N,D=T+N+1,G=y*v+N,I=y*v+N+1;s.push(P,D,G),s.push(D,I,G)}}}this.setIndex(s),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(o,3)),this.setAttribute("uv",new Ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ec(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Ed=class tc extends mt{constructor(t=1,i=32,r=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:r,thetaLength:a},i=Math.max(3,i);let n=[],s=[],l=[],o=[],h=new C,c=new Q;s.push(0,0,0),l.push(0,0,1),o.push(.5,.5);for(let d=0,u=3;d<=i;d++,u+=3){let m=r+d/i*a;h.x=t*Math.cos(m),h.y=t*Math.sin(m),s.push(h.x,h.y,h.z),l.push(0,0,1),c.x=(s[u]/t+1)/2,c.y=(s[u+1]/t+1)/2,o.push(c.x,c.y)}for(let d=1;d<=i;d++)n.push(d,d+1,0);this.setIndex(n),this.setAttribute("position",new Ne(s,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tc(t.radius,t.segments,t.thetaStart,t.thetaLength)}},In=class ic extends mt{constructor(t=1,i=1,r=1,a=32,n=1,s=!1,l=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:i,height:r,radialSegments:a,heightSegments:n,openEnded:s,thetaStart:l,thetaLength:o};let h=this;a=Math.floor(a),n=Math.floor(n);let c=[],d=[],u=[],m=[],g=0,v=[],f=r/2,p=0;y(),s===!1&&(t>0&&E(!0),i>0&&E(!1)),this.setIndex(c),this.setAttribute("position",new Ne(d,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(m,2));function y(){let _=new C,S=new C,w=0,R=(i-t)/r;for(let x=0;x<=n;x++){let T=[],N=x/n,P=N*(i-t)+t;for(let D=0;D<=a;D++){let G=D/a,I=G*o+l,z=Math.sin(I),Z=Math.cos(I);S.x=P*z,S.y=-N*r+f,S.z=P*Z,d.push(S.x,S.y,S.z),_.set(z,R,Z).normalize(),u.push(_.x,_.y,_.z),m.push(G,1-N),T.push(g++)}v.push(T)}for(let x=0;x<a;x++)for(let T=0;T<n;T++){let N=v[T][x],P=v[T+1][x],D=v[T+1][x+1],G=v[T][x+1];(t>0||T!==0)&&(c.push(N,P,G),w+=3),(i>0||T!==n-1)&&(c.push(P,D,G),w+=3)}h.addGroup(p,w,0),p+=w}function E(_){let S=g,w=new Q,R=new C,x=0,T=_===!0?t:i,N=_===!0?1:-1;for(let D=1;D<=a;D++)d.push(0,f*N,0),u.push(0,N,0),m.push(.5,.5),g++;let P=g;for(let D=0;D<=a;D++){let G=D/a*o+l,I=Math.cos(G),z=Math.sin(G);R.x=T*z,R.y=f*N,R.z=T*I,d.push(R.x,R.y,R.z),u.push(0,N,0),w.x=I*.5+.5,w.y=z*.5*N+.5,m.push(w.x,w.y),g++}for(let D=0;D<a;D++){let G=S+D,I=P+D;_===!0?c.push(I,I+1,G):c.push(I+1,I,G),x+=3}h.addGroup(p,x,_===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ic(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wd=class rc extends In{constructor(t=1,i=1,r=32,a=1,n=!1,s=0,l=Math.PI*2){super(0,t,i,r,a,n,s,l),this.type="ConeGeometry",this.parameters={radius:t,height:i,radialSegments:r,heightSegments:a,openEnded:n,thetaStart:s,thetaLength:l}}static fromJSON(t){return new rc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},va=class ac extends mt{constructor(t=[],i=[],r=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:i,radius:r,detail:a};let n=[],s=[];l(a),h(r),c(),this.setAttribute("position",new Ne(n,3)),this.setAttribute("normal",new Ne(n.slice(),3)),this.setAttribute("uv",new Ne(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function l(y){let E=new C,_=new C,S=new C;for(let w=0;w<i.length;w+=3)m(i[w+0],E),m(i[w+1],_),m(i[w+2],S),o(E,_,S,y)}function o(y,E,_,S){let w=S+1,R=[];for(let x=0;x<=w;x++){R[x]=[];let T=y.clone().lerp(_,x/w),N=E.clone().lerp(_,x/w),P=w-x;for(let D=0;D<=P;D++)D===0&&x===w?R[x][D]=T:R[x][D]=T.clone().lerp(N,D/P)}for(let x=0;x<w;x++)for(let T=0;T<2*(w-x)-1;T++){let N=Math.floor(T/2);T%2===0?(u(R[x][N+1]),u(R[x+1][N]),u(R[x][N])):(u(R[x][N+1]),u(R[x+1][N+1]),u(R[x+1][N]))}}function h(y){let E=new C;for(let _=0;_<n.length;_+=3)E.x=n[_+0],E.y=n[_+1],E.z=n[_+2],E.normalize().multiplyScalar(y),n[_+0]=E.x,n[_+1]=E.y,n[_+2]=E.z}function c(){let y=new C;for(let E=0;E<n.length;E+=3){y.x=n[E+0],y.y=n[E+1],y.z=n[E+2];let _=f(y)/2/Math.PI+.5,S=p(y)/Math.PI+.5;s.push(_,1-S)}g(),d()}function d(){for(let y=0;y<s.length;y+=6){let E=s[y+0],_=s[y+2],S=s[y+4],w=Math.max(E,_,S),R=Math.min(E,_,S);w>.9&&R<.1&&(E<.2&&(s[y+0]+=1),_<.2&&(s[y+2]+=1),S<.2&&(s[y+4]+=1))}}function u(y){n.push(y.x,y.y,y.z)}function m(y,E){let _=y*3;E.x=t[_+0],E.y=t[_+1],E.z=t[_+2]}function g(){let y=new C,E=new C,_=new C,S=new C,w=new Q,R=new Q,x=new Q;for(let T=0,N=0;T<n.length;T+=9,N+=6){y.set(n[T+0],n[T+1],n[T+2]),E.set(n[T+3],n[T+4],n[T+5]),_.set(n[T+6],n[T+7],n[T+8]),w.set(s[N+0],s[N+1]),R.set(s[N+2],s[N+3]),x.set(s[N+4],s[N+5]),S.copy(y).add(E).add(_).divideScalar(3);let P=f(S);v(w,N+0,y,P),v(R,N+2,E,P),v(x,N+4,_,P)}}function v(y,E,_,S){S<0&&y.x===1&&(s[E]=y.x-1),_.x===0&&_.z===0&&(s[E]=S/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ac(t.vertices,t.indices,t.radius,t.detail)}},Ad=class nc extends va{constructor(t=1,i=0){let r=(1+Math.sqrt(5))/2,a=1/r,n=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-a,-r,0,-a,r,0,a,-r,0,a,r,-a,-r,0,-a,r,0,a,-r,0,a,r,0,-r,0,-a,r,0,-a,-r,0,a,r,0,a],s=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(n,s,t,i),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new nc(t.radius,t.detail)}},Qa=new C,en=new C,vs=new C,tn=new wr,Rd=class extends mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(mn*t),a=e.getIndex(),n=e.getAttribute("position"),s=a?a.count:n.count,l=[0,0,0],o=["a","b","c"],h=new Array(3),c={},d=[];for(let u=0;u<s;u+=3){a?(l[0]=a.getX(u),l[1]=a.getX(u+1),l[2]=a.getX(u+2)):(l[0]=u,l[1]=u+1,l[2]=u+2);let{a:m,b:g,c:v}=tn;if(m.fromBufferAttribute(n,l[0]),g.fromBufferAttribute(n,l[1]),v.fromBufferAttribute(n,l[2]),tn.getNormal(vs),h[0]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[2]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let f=0;f<3;f++){let p=(f+1)%3,y=h[f],E=h[p],_=tn[o[f]],S=tn[o[p]],w=`${y}_${E}`,R=`${E}_${y}`;R in c&&c[R]?(vs.dot(c[R].normal)<=r&&(d.push(_.x,_.y,_.z),d.push(S.x,S.y,S.z)),c[R]=null):w in c||(c[w]={index0:l[f],index1:l[p],normal:vs.clone()})}}for(let u in c)if(c[u]){let{index0:m,index1:g}=c[u];Qa.fromBufferAttribute(n,m),en.fromBufferAttribute(n,g),d.push(Qa.x,Qa.y,Qa.z),d.push(en.x,en.y,en.z)}this.setAttribute("position",new Ne(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},mi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let n=1;n<=e;n++)i=this.getPoint(n/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,a=i.length,n;t?n=t:n=e*i[a-1];let s=0,l=a-1,o;for(;s<=l;)if(r=Math.floor(s+(l-s)/2),o=i[r]-n,o<0)s=r+1;else if(o>0)l=r-1;else{l=r;break}if(r=l,i[r]===n)return r/(a-1);let h=i[r],c=i[r+1]-h,d=(n-h)/c;return(r+d)/(a-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),n=this.getPoint(r),s=t||(a.isVector2?new Q:new C);return s.copy(n).sub(a).normalize(),s}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new C,r=[],a=[],n=[],s=new C,l=new Ke;for(let u=0;u<=e;u++){let m=u/e;r[u]=this.getTangentAt(m,new C)}a[0]=new C,n[0]=new C;let o=Number.MAX_VALUE,h=Math.abs(r[0].x),c=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=o&&(o=h,i.set(1,0,0)),c<=o&&(o=c,i.set(0,1,0)),d<=o&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),n[0].crossVectors(r[0],a[0]);for(let u=1;u<=e;u++){if(a[u]=a[u-1].clone(),n[u]=n[u-1].clone(),s.crossVectors(r[u-1],r[u]),s.length()>Number.EPSILON){s.normalize();let m=Math.acos(Je(r[u-1].dot(r[u]),-1,1));a[u].applyMatrix4(l.makeRotationAxis(s,m))}n[u].crossVectors(r[u],a[u])}if(t===!0){let u=Math.acos(Je(a[0].dot(a[e]),-1,1));u/=e,r[0].dot(s.crossVectors(a[0],a[e]))>0&&(u=-u);for(let m=1;m<=e;m++)a[m].applyMatrix4(l.makeRotationAxis(r[m],u*m)),n[m].crossVectors(r[m],a[m])}return{tangents:r,normals:a,binormals:n}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Lo=class extends mi{constructor(e=0,t=0,i=1,r=1,a=0,n=Math.PI*2,s=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=n,this.aClockwise=s,this.aRotation=l}getPoint(e,t=new Q){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,n=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(n?a=0:a=r),this.aClockwise===!0&&!n&&(a===r?a=-r:a=a-r);let s=this.aStartAngle+e*a,l=this.aX+this.xRadius*Math.cos(s),o=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let h=Math.cos(this.aRotation),c=Math.sin(this.aRotation),d=l-this.aX,u=o-this.aY;l=d*h-u*c+this.aX,o=d*c+u*h+this.aY}return i.set(l,o)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Cd=class extends Lo{constructor(e,t,i,r,a,n){super(e,t,i,i,r,a,n),this.isArcCurve=!0,this.type="ArcCurve"}};function No(){let e=0,t=0,i=0,r=0;function a(n,s,l,o){e=n,t=l,i=-3*n+3*s-2*l-o,r=2*n-2*s+l+o}return{initCatmullRom:function(n,s,l,o,h){a(s,l,h*(l-n),h*(o-s))},initNonuniformCatmullRom:function(n,s,l,o,h,c,d){let u=(s-n)/h-(l-n)/(h+c)+(l-s)/c,m=(l-s)/c-(o-s)/(c+d)+(o-l)/d;u*=c,m*=c,a(s,l,u,m)},calc:function(n){let s=n*n,l=s*n;return e+t*n+i*s+r*l}}}var Fl=new C,zl=new C,_s=new No,xs=new No,ys=new No,Pd=class extends mi{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new C){let i=t,r=this.points,a=r.length,n=(a-(this.closed?0:1))*e,s=Math.floor(n),l=n-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/a)+1)*a:l===0&&s===a-1&&(s=a-2,l=1);let o,h;this.closed||s>0?o=r[(s-1)%a]:(zl.subVectors(r[0],r[1]).add(r[0]),o=zl);let c=r[s%a],d=r[(s+1)%a];if(this.closed||s+2<a?h=r[(s+2)%a]:(Fl.subVectors(r[a-1],r[a-2]).add(r[a-1]),h=Fl),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(c),u),g=Math.pow(c.distanceToSquared(d),u),v=Math.pow(d.distanceToSquared(h),u);g<1e-4&&(g=1),m<1e-4&&(m=g),v<1e-4&&(v=g),_s.initNonuniformCatmullRom(o.x,c.x,d.x,h.x,m,g,v),xs.initNonuniformCatmullRom(o.y,c.y,d.y,h.y,m,g,v),ys.initNonuniformCatmullRom(o.z,c.z,d.z,h.z,m,g,v)}else this.curveType==="catmullrom"&&(_s.initCatmullRom(o.x,c.x,d.x,h.x,this.tension),xs.initCatmullRom(o.y,c.y,d.y,h.y,this.tension),ys.initCatmullRom(o.z,c.z,d.z,h.z,this.tension));return i.set(_s.calc(l),xs.calc(l),ys.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vl(e,t,i,r,a){let n=(r-t)*.5,s=(a-i)*.5,l=e*e,o=e*l;return(2*i-2*r+n+s)*o+(-3*i+3*r-2*n-s)*l+n*e+i}function Id(e,t){let i=1-e;return i*i*t}function Ld(e,t){return 2*(1-e)*e*t}function Nd(e,t){return e*e*t}function oa(e,t,i,r){return Id(e,t)+Ld(e,i)+Nd(e,r)}function Dd(e,t){let i=1-e;return i*i*i*t}function Ud(e,t){let i=1-e;return 3*i*i*e*t}function Od(e,t){return 3*(1-e)*e*e*t}function Bd(e,t){return e*e*e*t}function la(e,t,i,r,a){return Dd(e,t)+Ud(e,i)+Od(e,r)+Bd(e,a)}var sc=class extends mi{constructor(e=new Q,t=new Q,i=new Q,r=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Q){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(la(e,r.x,a.x,n.x,s.x),la(e,r.y,a.y,n.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fd=class extends mi{constructor(e=new C,t=new C,i=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new C){let i=t,r=this.v0,a=this.v1,n=this.v2,s=this.v3;return i.set(la(e,r.x,a.x,n.x,s.x),la(e,r.y,a.y,n.y,s.y),la(e,r.z,a.z,n.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},oc=class extends mi{constructor(e=new Q,t=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zd=class extends mi{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lc=class extends mi{constructor(e=new Q,t=new Q,i=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Q){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(oa(e,r.x,a.x,n.x),oa(e,r.y,a.y,n.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hc=class extends mi{constructor(e=new C,t=new C,i=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new C){let i=t,r=this.v0,a=this.v1,n=this.v2;return i.set(oa(e,r.x,a.x,n.x),oa(e,r.y,a.y,n.y),oa(e,r.z,a.z,n.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},cc=class extends mi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){let i=t,r=this.points,a=(r.length-1)*e,n=Math.floor(a),s=a-n,l=r[n===0?n:n-1],o=r[n],h=r[n>r.length-2?r.length-1:n+1],c=r[n>r.length-3?r.length-1:n+2];return i.set(Vl(s,l.x,o.x,h.x,c.x),Vl(s,l.y,o.y,h.y,c.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Q().fromArray(r))}return this}},En=Object.freeze({__proto__:null,ArcCurve:Cd,CatmullRomCurve3:Pd,CubicBezierCurve:sc,CubicBezierCurve3:Fd,EllipseCurve:Lo,LineCurve:oc,LineCurve3:zd,QuadraticBezierCurve:lc,QuadraticBezierCurve3:hc,SplineCurve:cc}),Vd=class extends mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new En[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let n=r[a]-i,s=this.curves[a],l=s.getLength(),o=l===0?0:1-n/l;return s.getPointAt(o,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let n=a[r],s=n.isEllipseCurve?e*2:n.isLineCurve||n.isLineCurve3?1:n.isSplineCurve?e*n.points.length:e,l=n.getPoints(s);for(let o=0;o<l.length;o++){let h=l[o];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new En[r.type]().fromJSON(r))}return this}},Hl=class extends Vd{constructor(e){super(),this.type="Path",this.currentPoint=new Q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new oc(this.currentPoint.clone(),new Q(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new lc(this.currentPoint.clone(),new Q(e,t),new Q(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,n){let s=new sc(this.currentPoint.clone(),new Q(e,t),new Q(i,r),new Q(a,n));return this.curves.push(s),this.currentPoint.set(a,n),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new cc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,n){let s=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+s,t+l,i,r,a,n),this}absarc(e,t,i,r,a,n){return this.absellipse(e,t,i,i,r,a,n),this}ellipse(e,t,i,r,a,n,s,l){let o=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+o,t+h,i,r,a,n,s,l),this}absellipse(e,t,i,r,a,n,s,l){let o=new Lo(e,t,i,r,a,n,s,l);if(this.curves.length>0){let c=o.getPoint(0);c.equals(this.currentPoint)||this.lineTo(c.x,c.y)}this.curves.push(o);let h=o.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},uc=class extends Hl{constructor(e){super(e),this.uuid=Gr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Hl().fromJSON(r))}return this}};function Hd(e,t,i=2){let r=t&&t.length,a=r?t[0]*i:e.length,n=dc(e,0,a,i,!0),s=[];if(!n||n.next===n.prev)return s;let l,o,h;if(r&&(n=jd(e,t,n,i)),e.length>80*i){l=e[0],o=e[1];let c=l,d=o;for(let u=i;u<a;u+=i){let m=e[u],g=e[u+1];m<l&&(l=m),g<o&&(o=g),m>c&&(c=m),g>d&&(d=g)}h=Math.max(c-l,d-o),h=h!==0?32767/h:0}return ma(n,s,i,l,o,h,0),s}function dc(e,t,i,r,a){let n;if(a===rp(e,t,i,r)>0)for(let s=t;s<i;s+=r)n=kl(s/r|0,e[s],e[s+1],n);else for(let s=i-r;s>=t;s-=r)n=kl(s/r|0,e[s],e[s+1],n);return n&&Hr(n,n.next)&&(ga(n),n=n.next),n}function tr(e,t){if(!e)return e;t||(t=e);let i=e,r;do if(r=!1,!i.steiner&&(Hr(i,i.next)||_t(i.prev,i,i.next)===0)){if(ga(i),i=t=i.prev,i===i.next)break;r=!0}else i=i.next;while(r||i!==t);return t}function ma(e,t,i,r,a,n,s){if(!e)return;!s&&n&&Kd(e,r,a,n);let l=e;for(;e.prev!==e.next;){let o=e.prev,h=e.next;if(n?Gd(e,r,a,n):kd(e)){t.push(o.i,e.i,h.i),ga(e),e=h.next,l=h.next;continue}if(e=h,e===l){s?s===1?(e=Wd(tr(e),t),ma(e,t,i,r,a,n,2)):s===2&&Xd(e,t,i,r,a,n):ma(tr(e),t,i,r,a,n,1);break}}}function kd(e){let t=e.prev,i=e,r=e.next;if(_t(t,i,r)>=0)return!1;let a=t.x,n=i.x,s=r.x,l=t.y,o=i.y,h=r.y,c=Math.min(a,n,s),d=Math.min(l,o,h),u=Math.max(a,n,s),m=Math.max(l,o,h),g=r.next;for(;g!==t;){if(g.x>=c&&g.x<=u&&g.y>=d&&g.y<=m&&aa(a,l,n,o,s,h,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gd(e,t,i,r){let a=e.prev,n=e,s=e.next;if(_t(a,n,s)>=0)return!1;let l=a.x,o=n.x,h=s.x,c=a.y,d=n.y,u=s.y,m=Math.min(l,o,h),g=Math.min(c,d,u),v=Math.max(l,o,h),f=Math.max(c,d,u),p=_o(m,g,t,i,r),y=_o(v,f,t,i,r),E=e.prevZ,_=e.nextZ;for(;E&&E.z>=p&&_&&_.z<=y;){if(E.x>=m&&E.x<=v&&E.y>=g&&E.y<=f&&E!==a&&E!==s&&aa(l,c,o,d,h,u,E.x,E.y)&&_t(E.prev,E,E.next)>=0||(E=E.prevZ,_.x>=m&&_.x<=v&&_.y>=g&&_.y<=f&&_!==a&&_!==s&&aa(l,c,o,d,h,u,_.x,_.y)&&_t(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;E&&E.z>=p;){if(E.x>=m&&E.x<=v&&E.y>=g&&E.y<=f&&E!==a&&E!==s&&aa(l,c,o,d,h,u,E.x,E.y)&&_t(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;_&&_.z<=y;){if(_.x>=m&&_.x<=v&&_.y>=g&&_.y<=f&&_!==a&&_!==s&&aa(l,c,o,d,h,u,_.x,_.y)&&_t(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Wd(e,t){let i=e;do{let r=i.prev,a=i.next.next;!Hr(r,a)&&mc(r,i,i.next,a)&&fa(r,a)&&fa(a,r)&&(t.push(r.i,i.i,a.i),ga(i),ga(i.next),i=e=a),i=i.next}while(i!==e);return tr(i)}function Xd(e,t,i,r,a,n){let s=e;do{let l=s.next.next;for(;l!==s.prev;){if(s.i!==l.i&&ep(s,l)){let o=fc(s,l);s=tr(s,s.next),o=tr(o,o.next),ma(s,t,i,r,a,n,0),ma(o,t,i,r,a,n,0);return}l=l.next}s=s.next}while(s!==e)}function jd(e,t,i,r){let a=[];for(let n=0,s=t.length;n<s;n++){let l=t[n]*r,o=n<s-1?t[n+1]*r:e.length,h=dc(e,l,o,r,!1);h===h.next&&(h.steiner=!0),a.push(Qd(h))}a.sort(qd);for(let n=0;n<a.length;n++)i=Yd(a[n],i);return i}function qd(e,t){let i=e.x-t.x;if(i===0&&(i=e.y-t.y,i===0)){let r=(e.next.y-e.y)/(e.next.x-e.x),a=(t.next.y-t.y)/(t.next.x-t.x);i=r-a}return i}function Yd(e,t){let i=Zd(e,t);if(!i)return t;let r=fc(i,e);return tr(r,r.next),tr(i,i.next)}function Zd(e,t){let i=t,r=e.x,a=e.y,n=-1/0,s;if(Hr(e,i))return i;do{if(Hr(e,i.next))return i.next;if(a<=i.y&&a>=i.next.y&&i.next.y!==i.y){let d=i.x+(a-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(d<=r&&d>n&&(n=d,s=i.x<i.next.x?i:i.next,d===r))return s}i=i.next}while(i!==t);if(!s)return null;let l=s,o=s.x,h=s.y,c=1/0;i=s;do{if(r>=i.x&&i.x>=o&&r!==i.x&&pc(a<h?r:n,a,o,h,a<h?n:r,a,i.x,i.y)){let d=Math.abs(a-i.y)/(r-i.x);fa(i,e)&&(d<c||d===c&&(i.x>s.x||i.x===s.x&&Jd(s,i)))&&(s=i,c=d)}i=i.next}while(i!==l);return s}function Jd(e,t){return _t(e.prev,e,t.prev)<0&&_t(t.next,e,e.next)<0}function Kd(e,t,i,r){let a=e;do a.z===0&&(a.z=_o(a.x,a.y,t,i,r)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==e);a.prevZ.nextZ=null,a.prevZ=null,$d(a)}function $d(e){let t,i=1;do{let r=e,a;e=null;let n=null;for(t=0;r;){t++;let s=r,l=0;for(let h=0;h<i&&(l++,s=s.nextZ,!!s);h++);let o=i;for(;l>0||o>0&&s;)l!==0&&(o===0||!s||r.z<=s.z)?(a=r,r=r.nextZ,l--):(a=s,s=s.nextZ,o--),n?n.nextZ=a:e=a,a.prevZ=n,n=a;r=s}n.nextZ=null,i*=2}while(t>1);return e}function _o(e,t,i,r,a){return e=(e-i)*a|0,t=(t-r)*a|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Qd(e){let t=e,i=e;do(t.x<i.x||t.x===i.x&&t.y<i.y)&&(i=t),t=t.next;while(t!==e);return i}function pc(e,t,i,r,a,n,s,l){return(a-s)*(t-l)>=(e-s)*(n-l)&&(e-s)*(r-l)>=(i-s)*(t-l)&&(i-s)*(n-l)>=(a-s)*(r-l)}function aa(e,t,i,r,a,n,s,l){return!(e===s&&t===l)&&pc(e,t,i,r,a,n,s,l)}function ep(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!tp(e,t)&&(fa(e,t)&&fa(t,e)&&ip(e,t)&&(_t(e.prev,e,t.prev)||_t(e,t.prev,t))||Hr(e,t)&&_t(e.prev,e,e.next)>0&&_t(t.prev,t,t.next)>0)}function _t(e,t,i){return(t.y-e.y)*(i.x-t.x)-(t.x-e.x)*(i.y-t.y)}function Hr(e,t){return e.x===t.x&&e.y===t.y}function mc(e,t,i,r){let a=an(_t(e,t,i)),n=an(_t(e,t,r)),s=an(_t(i,r,e)),l=an(_t(i,r,t));return!!(a!==n&&s!==l||a===0&&rn(e,i,t)||n===0&&rn(e,r,t)||s===0&&rn(i,e,r)||l===0&&rn(i,t,r))}function rn(e,t,i){return t.x<=Math.max(e.x,i.x)&&t.x>=Math.min(e.x,i.x)&&t.y<=Math.max(e.y,i.y)&&t.y>=Math.min(e.y,i.y)}function an(e){return e>0?1:e<0?-1:0}function tp(e,t){let i=e;do{if(i.i!==e.i&&i.next.i!==e.i&&i.i!==t.i&&i.next.i!==t.i&&mc(i,i.next,e,t))return!0;i=i.next}while(i!==e);return!1}function fa(e,t){return _t(e.prev,e,e.next)<0?_t(e,t,e.next)>=0&&_t(e,e.prev,t)>=0:_t(e,t,e.prev)<0||_t(e,e.next,t)<0}function ip(e,t){let i=e,r=!1,a=(e.x+t.x)/2,n=(e.y+t.y)/2;do i.y>n!=i.next.y>n&&i.next.y!==i.y&&a<(i.next.x-i.x)*(n-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next;while(i!==e);return r}function fc(e,t){let i=xo(e.i,e.x,e.y),r=xo(t.i,t.x,t.y),a=e.next,n=t.prev;return e.next=t,t.prev=e,i.next=a,a.prev=i,r.next=i,i.prev=r,n.next=r,r.prev=n,r}function kl(e,t,i,r){let a=xo(e,t,i);return r?(a.next=r.next,a.prev=r,r.next.prev=a,r.next=a):(a.prev=a,a.next=a),a}function ga(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function xo(e,t,i){return{i:e,x:t,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rp(e,t,i,r){let a=0;for(let n=t,s=i-r;n<i;n+=r)a+=(e[s]-e[n])*(e[n+1]+e[s+1]),s=n;return a}var ap=class{static triangulate(e,t,i=2){return Hd(e,t,i)}},Zi=class gc{static area(t){let i=t.length,r=0;for(let a=i-1,n=0;n<i;a=n++)r+=t[a].x*t[n].y-t[n].x*t[a].y;return r*.5}static isClockWise(t){return gc.area(t)<0}static triangulateShape(t,i){let r=[],a=[],n=[];Gl(t),Wl(r,t);let s=t.length;i.forEach(Gl);for(let o=0;o<i.length;o++)a.push(s),s+=i[o].length,Wl(r,i[o]);let l=ap.triangulate(r,a);for(let o=0;o<l.length;o+=3)n.push(l.slice(o,o+3));return n}};function Gl(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Wl(e,t){for(let i=0;i<t.length;i++)e.push(t[i].x),e.push(t[i].y)}var np=class vc extends mt{constructor(t=new uc([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),i={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:i},t=Array.isArray(t)?t:[t];let r=this,a=[],n=[];for(let l=0,o=t.length;l<o;l++){let h=t[l];s(h)}this.setAttribute("position",new Ne(a,3)),this.setAttribute("uv",new Ne(n,2)),this.computeVertexNormals();function s(l){let o=[],h=i.curveSegments!==void 0?i.curveSegments:12,c=i.steps!==void 0?i.steps:1,d=i.depth!==void 0?i.depth:1,u=i.bevelEnabled!==void 0?i.bevelEnabled:!0,m=i.bevelThickness!==void 0?i.bevelThickness:.2,g=i.bevelSize!==void 0?i.bevelSize:m-.1,v=i.bevelOffset!==void 0?i.bevelOffset:0,f=i.bevelSegments!==void 0?i.bevelSegments:3,p=i.extrudePath,y=i.UVGenerator!==void 0?i.UVGenerator:sp,E,_=!1,S,w,R,x;if(p){E=p.getSpacedPoints(c),_=!0,u=!1;let te=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(c,te),w=new C,R=new C,x=new C}u||(f=0,m=0,g=0,v=0);let T=l.extractPoints(h),N=T.shape,P=T.holes;if(!Zi.isClockWise(N)){N=N.reverse();for(let te=0,$=P.length;te<$;te++){let oe=P[te];Zi.isClockWise(oe)&&(P[te]=oe.reverse())}}function D(te){let $=10000000000000001e-36,oe=te[0];for(let _e=1;_e<=te.length;_e++){let xe=_e%te.length,Ee=te[xe],Oe=Ee.x-oe.x,Ge=Ee.y-oe.y,qe=Oe*Oe+Ge*Ge,L=Math.max(Math.abs(Ee.x),Math.abs(Ee.y),Math.abs(oe.x),Math.abs(oe.y)),pt=$*L*L;if(qe<=pt){te.splice(xe,1),_e--;continue}oe=Ee}}D(N),P.forEach(D);let G=P.length,I=N;for(let te=0;te<G;te++){let $=P[te];N=N.concat($)}function z(te,$,oe){return $||He("ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector($,oe)}let Z=N.length;function k(te,$,oe){let _e,xe,Ee,Oe=te.x-$.x,Ge=te.y-$.y,qe=oe.x-te.x,L=oe.y-te.y,pt=Oe*Oe+Ge*Ge,tt=Oe*L-Ge*qe;if(Math.abs(tt)>Number.EPSILON){let Qe=Math.sqrt(pt),A=Math.sqrt(qe*qe+L*L),M=$.x-Ge/Qe,U=$.y+Oe/Qe,W=oe.x-L/A,K=oe.y+qe/A,ue=((W-M)*L-(K-U)*qe)/(Oe*L-Ge*qe);_e=M+Oe*ue-te.x,xe=U+Ge*ue-te.y;let pe=_e*_e+xe*xe;if(pe<=2)return new Q(_e,xe);Ee=Math.sqrt(pe/2)}else{let Qe=!1;Oe>Number.EPSILON?qe>Number.EPSILON&&(Qe=!0):Oe<-Number.EPSILON?qe<-Number.EPSILON&&(Qe=!0):Math.sign(Ge)===Math.sign(L)&&(Qe=!0),Qe?(_e=-Ge,xe=Oe,Ee=Math.sqrt(pt)):(_e=Oe,xe=Ge,Ee=Math.sqrt(pt/2))}return new Q(_e/Ee,xe/Ee)}let le=[];for(let te=0,$=I.length,oe=$-1,_e=te+1;te<$;te++,oe++,_e++)oe===$&&(oe=0),_e===$&&(_e=0),le[te]=k(I[te],I[oe],I[_e]);let j=[],q,ee=le.concat();for(let te=0,$=G;te<$;te++){let oe=P[te];q=[];for(let _e=0,xe=oe.length,Ee=xe-1,Oe=_e+1;_e<xe;_e++,Ee++,Oe++)Ee===xe&&(Ee=0),Oe===xe&&(Oe=0),q[_e]=k(oe[_e],oe[Ee],oe[Oe]);j.push(q),ee=ee.concat(q)}let Be;if(f===0)Be=Zi.triangulateShape(I,P);else{let te=[],$=[];for(let oe=0;oe<f;oe++){let _e=oe/f,xe=m*Math.cos(_e*Math.PI/2),Ee=g*Math.sin(_e*Math.PI/2)+v;for(let Oe=0,Ge=I.length;Oe<Ge;Oe++){let qe=z(I[Oe],le[Oe],Ee);se(qe.x,qe.y,-xe),_e===0&&te.push(qe)}for(let Oe=0,Ge=G;Oe<Ge;Oe++){let qe=P[Oe];q=j[Oe];let L=[];for(let pt=0,tt=qe.length;pt<tt;pt++){let Qe=z(qe[pt],q[pt],Ee);se(Qe.x,Qe.y,-xe),_e===0&&L.push(Qe)}_e===0&&$.push(L)}}Be=Zi.triangulateShape(te,$)}let be=Be.length,nt=g+v;for(let te=0;te<Z;te++){let $=u?z(N[te],ee[te],nt):N[te];_?(R.copy(S.normals[0]).multiplyScalar($.x),w.copy(S.binormals[0]).multiplyScalar($.y),x.copy(E[0]).add(R).add(w),se(x.x,x.y,x.z)):se($.x,$.y,0)}for(let te=1;te<=c;te++)for(let $=0;$<Z;$++){let oe=u?z(N[$],ee[$],nt):N[$];_?(R.copy(S.normals[te]).multiplyScalar(oe.x),w.copy(S.binormals[te]).multiplyScalar(oe.y),x.copy(E[te]).add(R).add(w),se(x.x,x.y,x.z)):se(oe.x,oe.y,d/c*te)}for(let te=f-1;te>=0;te--){let $=te/f,oe=m*Math.cos($*Math.PI/2),_e=g*Math.sin($*Math.PI/2)+v;for(let xe=0,Ee=I.length;xe<Ee;xe++){let Oe=z(I[xe],le[xe],_e);se(Oe.x,Oe.y,d+oe)}for(let xe=0,Ee=P.length;xe<Ee;xe++){let Oe=P[xe];q=j[xe];for(let Ge=0,qe=Oe.length;Ge<qe;Ge++){let L=z(Oe[Ge],q[Ge],_e);_?se(L.x,L.y+E[c-1].y,E[c-1].x+oe):se(L.x,L.y,d+oe)}}}Xe(),Y();function Xe(){let te=a.length/3;if(u){let $=0,oe=Z*$;for(let _e=0;_e<be;_e++){let xe=Be[_e];Ce(xe[2]+oe,xe[1]+oe,xe[0]+oe)}$=c+f*2,oe=Z*$;for(let _e=0;_e<be;_e++){let xe=Be[_e];Ce(xe[0]+oe,xe[1]+oe,xe[2]+oe)}}else{for(let $=0;$<be;$++){let oe=Be[$];Ce(oe[2],oe[1],oe[0])}for(let $=0;$<be;$++){let oe=Be[$];Ce(oe[0]+Z*c,oe[1]+Z*c,oe[2]+Z*c)}}r.addGroup(te,a.length/3-te,0)}function Y(){let te=a.length/3,$=0;re(I,$),$+=I.length;for(let oe=0,_e=P.length;oe<_e;oe++){let xe=P[oe];re(xe,$),$+=xe.length}r.addGroup(te,a.length/3-te,1)}function re(te,$){let oe=te.length;for(;--oe>=0;){let _e=oe,xe=oe-1;xe<0&&(xe=te.length-1);for(let Ee=0,Oe=c+f*2;Ee<Oe;Ee++){let Ge=Z*Ee,qe=Z*(Ee+1),L=$+_e+Ge,pt=$+xe+Ge,tt=$+xe+qe,Qe=$+_e+qe;Fe(L,pt,tt,Qe)}}}function se(te,$,oe){o.push(te),o.push($),o.push(oe)}function Ce(te,$,oe){de(te),de($),de(oe);let _e=a.length/3,xe=y.generateTopUV(r,a,_e-3,_e-2,_e-1);$e(xe[0]),$e(xe[1]),$e(xe[2])}function Fe(te,$,oe,_e){de(te),de($),de(_e),de($),de(oe),de(_e);let xe=a.length/3,Ee=y.generateSideWallUV(r,a,xe-6,xe-3,xe-2,xe-1);$e(Ee[0]),$e(Ee[1]),$e(Ee[3]),$e(Ee[1]),$e(Ee[2]),$e(Ee[3])}function de(te){a.push(o[te*3+0]),a.push(o[te*3+1]),a.push(o[te*3+2])}function $e(te){n.push(te.x),n.push(te.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),i=this.parameters.shapes,r=this.parameters.options;return op(i,r,t)}static fromJSON(t,i){let r=[];for(let n=0,s=t.shapes.length;n<s;n++){let l=i[t.shapes[n]];r.push(l)}let a=t.options.extrudePath;return a!==void 0&&(t.options.extrudePath=new En[a.type]().fromJSON(a)),new vc(r,t.options)}},sp={generateTopUV:function(e,t,i,r,a){let n=t[i*3],s=t[i*3+1],l=t[r*3],o=t[r*3+1],h=t[a*3],c=t[a*3+1];return[new Q(n,s),new Q(l,o),new Q(h,c)]},generateSideWallUV:function(e,t,i,r,a,n){let s=t[i*3],l=t[i*3+1],o=t[i*3+2],h=t[r*3],c=t[r*3+1],d=t[r*3+2],u=t[a*3],m=t[a*3+1],g=t[a*3+2],v=t[n*3],f=t[n*3+1],p=t[n*3+2];return Math.abs(l-c)<Math.abs(s-h)?[new Q(s,1-o),new Q(h,1-d),new Q(u,1-g),new Q(v,1-p)]:[new Q(l,1-o),new Q(c,1-d),new Q(m,1-g),new Q(f,1-p)]}};function op(e,t,i){if(i.shapes=[],Array.isArray(e))for(let r=0,a=e.length;r<a;r++){let n=e[r];i.shapes.push(n.uuid)}else i.shapes.push(e.uuid);return i.options=Object.assign({},t),t.extrudePath!==void 0&&(i.options.extrudePath=t.extrudePath.toJSON()),i}var lp=class _c extends va{constructor(t=1,i=0){let r=(1+Math.sqrt(5))/2,a=[-1,r,0,1,r,0,-1,-r,0,1,-r,0,0,-1,r,0,1,r,0,-1,-r,0,1,-r,r,0,-1,r,0,1,-r,0,-1,-r,0,1],n=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,n,t,i),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new _c(t.radius,t.detail)}},Do=class xc extends mt{constructor(t=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],i=12,r=0,a=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:i,phiStart:r,phiLength:a},i=Math.floor(i),a=Je(a,0,Math.PI*2);let n=[],s=[],l=[],o=[],h=[],c=1/i,d=new C,u=new Q,m=new C,g=new C,v=new C,f=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:f=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,m.x=p*1,m.y=-f,m.z=p*0,v.copy(m),m.normalize(),o.push(m.x,m.y,m.z);break;case t.length-1:o.push(v.x,v.y,v.z);break;default:f=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,m.x=p*1,m.y=-f,m.z=p*0,g.copy(m),m.x+=v.x,m.y+=v.y,m.z+=v.z,m.normalize(),o.push(m.x,m.y,m.z),v.copy(g)}for(let y=0;y<=i;y++){let E=r+y*c*a,_=Math.sin(E),S=Math.cos(E);for(let w=0;w<=t.length-1;w++){d.x=t[w].x*_,d.y=t[w].y,d.z=t[w].x*S,s.push(d.x,d.y,d.z),u.x=y/i,u.y=w/(t.length-1),l.push(u.x,u.y);let R=o[3*w+0]*_,x=o[3*w+1],T=o[3*w+0]*S;h.push(R,x,T)}}for(let y=0;y<i;y++)for(let E=0;E<t.length-1;E++){let _=E+y*t.length,S=_,w=_+t.length,R=_+t.length+1,x=_+1;n.push(S,w,x),n.push(R,x,w)}this.setIndex(n),this.setAttribute("position",new Ne(s,3)),this.setAttribute("uv",new Ne(l,2)),this.setAttribute("normal",new Ne(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xc(t.points,t.segments,t.phiStart,t.phiLength)}},hp=class yc extends va{constructor(t=1,i=0){let r=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(r,a,t,i),this.type="OctahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new yc(t.radius,t.detail)}},Uo=class Sc extends mt{constructor(t=1,i=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:a};let n=t/2,s=i/2,l=Math.floor(r),o=Math.floor(a),h=l+1,c=o+1,d=t/l,u=i/o,m=[],g=[],v=[],f=[];for(let p=0;p<c;p++){let y=p*u-s;for(let E=0;E<h;E++){let _=E*d-n;g.push(_,-y,0),v.push(0,0,1),f.push(E/l),f.push(1-p/o)}}for(let p=0;p<o;p++)for(let y=0;y<l;y++){let E=y+h*p,_=y+h*(p+1),S=y+1+h*(p+1),w=y+1+h*p;m.push(E,_,w),m.push(_,S,w)}this.setIndex(m),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sc(t.width,t.height,t.widthSegments,t.heightSegments)}},cp=class Mc extends mt{constructor(t=.5,i=1,r=32,a=1,n=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:r,phiSegments:a,thetaStart:n,thetaLength:s},r=Math.max(3,r),a=Math.max(1,a);let l=[],o=[],h=[],c=[],d=t,u=(i-t)/a,m=new C,g=new Q;for(let v=0;v<=a;v++){for(let f=0;f<=r;f++){let p=n+f/r*s;m.x=d*Math.cos(p),m.y=d*Math.sin(p),o.push(m.x,m.y,m.z),h.push(0,0,1),g.x=(m.x/i+1)/2,g.y=(m.y/i+1)/2,c.push(g.x,g.y)}d+=u}for(let v=0;v<a;v++){let f=v*(r+1);for(let p=0;p<r;p++){let y=p+f,E=y,_=y+r+1,S=y+r+2,w=y+1;l.push(E,_,w),l.push(_,S,w)}}this.setIndex(l),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},up=class bc extends mt{constructor(t=new uc([new Q(0,.5),new Q(-.5,-.5),new Q(.5,-.5)]),i=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:i};let r=[],a=[],n=[],s=[],l=0,o=0;if(Array.isArray(t)===!1)h(t);else for(let c=0;c<t.length;c++)h(t[c]),this.addGroup(l,o,c),l+=o,o=0;this.setIndex(r),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(n,3)),this.setAttribute("uv",new Ne(s,2));function h(c){let d=a.length/3,u=c.extractPoints(i),m=u.shape,g=u.holes;Zi.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,p=g.length;f<p;f++){let y=g[f];Zi.isClockWise(y)===!0&&(g[f]=y.reverse())}let v=Zi.triangulateShape(m,g);for(let f=0,p=g.length;f<p;f++){let y=g[f];m=m.concat(y)}for(let f=0,p=m.length;f<p;f++){let y=m[f];a.push(y.x,y.y,0),n.push(0,0,1),s.push(y.x,y.y)}for(let f=0,p=v.length;f<p;f++){let y=v[f],E=y[0]+d,_=y[1]+d,S=y[2]+d;r.push(E,_,S),o+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),i=this.parameters.shapes;return dp(i,t)}static fromJSON(t,i){let r=[];for(let a=0,n=t.shapes.length;a<n;a++){let s=i[t.shapes[a]];r.push(s)}return new bc(r,t.curveSegments)}};function dp(e,t){if(t.shapes=[],Array.isArray(e))for(let i=0,r=e.length;i<r;i++){let a=e[i];t.shapes.push(a.uuid)}else t.shapes.push(e.uuid);return t}var pp=class Tc extends mt{constructor(t=1,i=32,r=16,a=0,n=Math.PI*2,s=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:a,phiLength:n,thetaStart:s,thetaLength:l},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));let o=Math.min(s+l,Math.PI),h=0,c=[],d=new C,u=new C,m=[],g=[],v=[],f=[];for(let p=0;p<=r;p++){let y=[],E=p/r,_=s+E*l,S=t*Math.cos(_),w=Math.sqrt(t*t-S*S),R=0;p===0&&s===0?R=.5/i:p===r&&o===Math.PI&&(R=-.5/i);for(let x=0;x<=i;x++){let T=x/i,N=a+T*n;d.x=-w*Math.cos(N),d.y=S,d.z=w*Math.sin(N),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),f.push(T+R,1-E),y.push(h++)}c.push(y)}for(let p=0;p<r;p++)for(let y=0;y<i;y++){let E=c[p][y+1],_=c[p][y],S=c[p+1][y],w=c[p+1][y+1];(p!==0||s>0)&&m.push(E,_,w),(p!==r-1||o<Math.PI)&&m.push(_,S,w)}this.setIndex(m),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(v,3)),this.setAttribute("uv",new Ne(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},mp=class Ec extends va{constructor(t=1,i=0){let r=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],a=[2,1,0,0,3,2,1,3,0,2,3,1];super(r,a,t,i),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:i}}static fromJSON(t){return new Ec(t.radius,t.detail)}},fp=class wc extends mt{constructor(t=1,i=.4,r=12,a=48,n=Math.PI*2,s=0,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:i,radialSegments:r,tubularSegments:a,arc:n,thetaStart:s,thetaLength:l},r=Math.floor(r),a=Math.floor(a);let o=[],h=[],c=[],d=[],u=new C,m=new C,g=new C;for(let v=0;v<=r;v++){let f=s+v/r*l;for(let p=0;p<=a;p++){let y=p/a*n;m.x=(t+i*Math.cos(f))*Math.cos(y),m.y=(t+i*Math.cos(f))*Math.sin(y),m.z=i*Math.sin(f),h.push(m.x,m.y,m.z),u.x=t*Math.cos(y),u.y=t*Math.sin(y),g.subVectors(m,u).normalize(),c.push(g.x,g.y,g.z),d.push(p/a),d.push(v/r)}}for(let v=1;v<=r;v++)for(let f=1;f<=a;f++){let p=(a+1)*v+f-1,y=(a+1)*(v-1)+f-1,E=(a+1)*(v-1)+f,_=(a+1)*v+f;o.push(p,y,_),o.push(y,E,_)}this.setIndex(o),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},gp=class Ac extends mt{constructor(t=1,i=.4,r=64,a=8,n=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:i,tubularSegments:r,radialSegments:a,p:n,q:s},r=Math.floor(r),a=Math.floor(a);let l=[],o=[],h=[],c=[],d=new C,u=new C,m=new C,g=new C,v=new C,f=new C,p=new C;for(let E=0;E<=r;++E){let _=E/r*n*Math.PI*2;y(_,n,s,t,m),y(_+.01,n,s,t,g),f.subVectors(g,m),p.addVectors(g,m),v.crossVectors(f,p),p.crossVectors(v,f),v.normalize(),p.normalize();for(let S=0;S<=a;++S){let w=S/a*Math.PI*2,R=-i*Math.cos(w),x=i*Math.sin(w);d.x=m.x+(R*p.x+x*v.x),d.y=m.y+(R*p.y+x*v.y),d.z=m.z+(R*p.z+x*v.z),o.push(d.x,d.y,d.z),u.subVectors(d,m).normalize(),h.push(u.x,u.y,u.z),c.push(E/r),c.push(S/a)}}for(let E=1;E<=r;E++)for(let _=1;_<=a;_++){let S=(a+1)*(E-1)+(_-1),w=(a+1)*E+(_-1),R=(a+1)*E+_,x=(a+1)*(E-1)+_;l.push(S,w,x),l.push(w,R,x)}this.setIndex(l),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(c,2));function y(E,_,S,w,R){let x=Math.cos(E),T=Math.sin(E),N=S/_*E,P=Math.cos(N);R.x=w*(2+P)*.5*x,R.y=w*(2+P)*T*.5,R.z=w*Math.sin(N)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ac(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}},vp=class Rc extends mt{constructor(t=new hc(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),i=64,r=1,a=8,n=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:i,radius:r,radialSegments:a,closed:n};let s=t.computeFrenetFrames(i,n);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let l=new C,o=new C,h=new Q,c=new C,d=[],u=[],m=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Ne(d,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(m,2));function v(){for(let E=0;E<i;E++)f(E);f(n===!1?i:0),y(),p()}function f(E){c=t.getPointAt(E/i,c);let _=s.normals[E],S=s.binormals[E];for(let w=0;w<=a;w++){let R=w/a*Math.PI*2,x=Math.sin(R),T=-Math.cos(R);o.x=T*_.x+x*S.x,o.y=T*_.y+x*S.y,o.z=T*_.z+x*S.z,o.normalize(),u.push(o.x,o.y,o.z),l.x=c.x+r*o.x,l.y=c.y+r*o.y,l.z=c.z+r*o.z,d.push(l.x,l.y,l.z)}}function p(){for(let E=1;E<=i;E++)for(let _=1;_<=a;_++){let S=(a+1)*(E-1)+(_-1),w=(a+1)*E+(_-1),R=(a+1)*E+_,x=(a+1)*(E-1)+_;g.push(S,w,x),g.push(w,R,x)}}function y(){for(let E=0;E<=i;E++)for(let _=0;_<=a;_++)h.x=E/i,h.y=_/a,m.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Rc(new En[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},_p=class extends mt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,r=new C,a=new C;if(e.index!==null){let n=e.attributes.position,s=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:s.count,materialIndex:0}]);for(let o=0,h=l.length;o<h;++o){let c=l[o],d=c.start,u=c.count;for(let m=d,g=d+u;m<g;m+=3)for(let v=0;v<3;v++){let f=s.getX(m+v),p=s.getX(m+(v+1)%3);r.fromBufferAttribute(n,f),a.fromBufferAttribute(n,p),Xl(r,a,i)===!0&&(t.push(r.x,r.y,r.z),t.push(a.x,a.y,a.z))}}}else{let n=e.attributes.position;for(let s=0,l=n.count/3;s<l;s++)for(let o=0;o<3;o++){let h=3*s+o,c=3*s+(o+1)%3;r.fromBufferAttribute(n,h),a.fromBufferAttribute(n,c),Xl(r,a,i)===!0&&(t.push(r.x,r.y,r.z),t.push(a.x,a.y,a.z))}}this.setAttribute("position",new Ne(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Xl(e,t,i){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,a=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return i.has(r)===!0||i.has(a)===!0?!1:(i.add(r),i.add(a),!0)}var gx=Object.freeze({__proto__:null,BoxGeometry:Pn,CapsuleGeometry:Td,CircleGeometry:Ed,ConeGeometry:wd,CylinderGeometry:In,DodecahedronGeometry:Ad,EdgesGeometry:Rd,ExtrudeGeometry:np,IcosahedronGeometry:lp,LatheGeometry:Do,OctahedronGeometry:hp,PlaneGeometry:Uo,PolyhedronGeometry:va,RingGeometry:cp,ShapeGeometry:up,SphereGeometry:pp,TetrahedronGeometry:mp,TorusGeometry:fp,TorusKnotGeometry:gp,TubeGeometry:vp,WireframeGeometry:_p});function kr(e){let t={};for(let i in e){t[i]={};for(let r in e[i]){let a=e[i][r];if(jl(a))a.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=a.clone();else if(Array.isArray(a))if(jl(a[0])){let n=[];for(let s=0,l=a.length;s<l;s++)n[s]=a[s].clone();t[i][r]=n}else t[i][r]=a.slice();else t[i][r]=a}}return t}function Ft(e){let t={};for(let i=0;i<e.length;i++){let r=kr(e[i]);for(let a in r)t[a]=r[a]}return t}function jl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function xp(e){let t=[];for(let i=0;i<e.length;i++)t.push(e[i].clone());return t}function Cc(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:it.workingColorSpace}var yp={clone:kr,merge:Ft},Sp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gt=class extends Wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sp,this.fragmentShader=Mp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=kr(e.uniforms),this.uniformsGroups=xp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new We().setHex(r.value);break;case"v2":this.uniforms[i].value=new Q().fromArray(r.value);break;case"v3":this.uniforms[i].value=new C().fromArray(r.value);break;case"v4":this.uniforms[i].value=new at().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ke().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},bp=class extends Gt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Tp=class extends Wr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=go,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Pc=class extends Tp{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new We(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new We(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new We(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ep=class extends Wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wp=class extends Wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Sr(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Ss(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var _a=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];i:{e:{let n;t:{r:if(!(e<r)){for(let s=i+2;;){if(r===void 0){if(e<a)break r;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(a=r,r=t[++i],e<r)break e}n=t.length;break t}if(!(e>=a)){let s=t[1];e<s&&(i=2,a=s);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=a,a=t[--i-1],e>=a)break e}n=i,i=0;break t}break i}for(;i<n;){let s=i+n>>>1;e<t[s]?n=s:i=s+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let n=0;n!==r;++n)t[n]=i[a+n];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ap=class extends _a{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pl,endingEnd:pl}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,n=e+1,s=r[a],l=r[n];if(s===void 0)switch(this.getSettings_().endingStart){case ml:a=e,s=2*t-i;break;case fl:a=r.length-2,s=t+r[a]-r[a+1];break;default:a=e,s=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ml:n=e,l=2*i-t;break;case fl:n=1,l=i+r[1]-r[0];break;default:n=e-1,l=t}let o=(i-t)*.5,h=this.valueSize;this._weightPrev=o/(t-s),this._weightNext=o/(l-i),this._offsetPrev=a*h,this._offsetNext=n*h}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,l=e*s,o=l-s,h=this._offsetPrev,c=this._offsetNext,d=this._weightPrev,u=this._weightNext,m=(i-t)/(r-t),g=m*m,v=g*m,f=-d*v+2*d*g-d*m,p=(1+d)*v+(-1.5-2*d)*g+(-.5+d)*m+1,y=(-1-u)*v+(1.5+u)*g+.5*m,E=u*v-u*g;for(let _=0;_!==s;++_)a[_]=f*n[h+_]+p*n[o+_]+y*n[l+_]+E*n[c+_];return a}},Rp=class extends _a{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,l=e*s,o=l-s,h=(i-t)/(r-t),c=1-h;for(let d=0;d!==s;++d)a[d]=n[o+d]*c+n[l+d]*h;return a}},Cp=class extends _a{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Pp=class extends _a{interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,l=e*s,o=l-s,h=this.inTangents,c=this.outTangents;if(!h||!c){let m=(i-t)/(r-t),g=1-m;for(let v=0;v!==s;++v)a[v]=n[o+v]*g+n[l+v]*m;return a}let d=s*2,u=e-1;for(let m=0;m!==s;++m){let g=n[o+m],v=n[l+m],f=u*d+m*2,p=c[f],y=c[f+1],E=e*d+m*2,_=h[E],S=h[E+1],w=Lp(i,t,p,_,r);a[m]=Ic(w,g,y,S,v)}return a}};function Ic(e,t,i,r,a){let n=1-e;return n*n*n*t+3*n*n*e*i+3*n*e*e*r+e*e*e*a}function Ip(e,t,i,r,a){let n=1-e;return 3*n*n*(i-t)+6*n*e*(r-i)+3*e*e*(a-r)}function Lp(e,t,i,r,a){let n=(e-t)/(a-t);for(let s=0;s<8;s++){let l=Ic(n,t,i,r,a)-e;if(Math.abs(l)<1e-10)break;let o=Ip(n,t,i,r,a);if(Math.abs(o)<1e-10)break;n=Math.max(0,Math.min(1,n-l/o))}return n}var fi=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Sr(t,this.TimeBufferType),this.values=Sr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Sr(e.times,Array),values:Sr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Ss(e.settings)&&(i.settings={inTangents:Sr(e.settings.inTangents,Array),outTangents:Sr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Cp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Rp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ap(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Pp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case yn:t=this.InterpolantFactoryMethodDiscrete;break;case fo:t=this.InterpolantFactoryMethodLinear;break;case qn:t=this.InterpolantFactoryMethodSmooth;break;case dl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ue("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return yn;case this.InterpolantFactoryMethodLinear:return fo;case this.InterpolantFactoryMethodSmooth:return qn;case this.InterpolantFactoryMethodBezier:return dl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Ss(this.settings)&&(ql(this.settings.inTangents,e),ql(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,a=0,n=r-1;for(;a!==r&&i[a]<e;)++a;for(;n!==-1&&i[n]>t;)--n;if(++n,a!==0||n!==r){a>=n&&(n=Math.max(n,1),a=n-1);let s=this.getValueSize();this.times=i.slice(a,n),this.values=this.values.slice(a*s,n*s)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let n=null;for(let s=0;s!==a;s++){let l=i[s];if(typeof l=="number"&&isNaN(l)){He("KeyframeTrack: Time is not a valid number.",this,s,l),e=!1;break}if(n!==null&&n>l){He("KeyframeTrack: Out of order keys.",this,s,l,n),e=!1;break}n=l}if(r!==void 0&&Xu(r))for(let s=0,l=r.length;s!==l;++s){let o=r[s];if(isNaN(o)){He("KeyframeTrack: Value is not a valid number.",this,s,o),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===qn,a=e.length-1,n=1;for(let s=1;s<a;++s){let l=!1,o=e[s],h=e[s+1];if(o!==h&&(s!==1||o!==e[0]))if(r)l=!0;else{let c=s*i,d=c-i,u=c+i;for(let m=0;m!==i;++m){let g=t[c+m];if(g!==t[d+m]||g!==t[u+m]){l=!0;break}}}if(l){if(s!==n){e[n]=e[s];let c=s*i,d=n*i;for(let u=0;u!==i;++u)t[d+u]=t[c+u]}++n}}if(a>0){e[n]=e[a];for(let s=a*i,l=n*i,o=0;o!==i;++o)t[l+o]=t[s+o];++n}return n!==e.length?(this.times=e.slice(0,n),this.values=t.slice(0,n*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ss(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ql(e,t){for(let i=0,r=e.length;i!==r;i+=2)e[i]*=t}fi.prototype.ValueTypeName="";fi.prototype.TimeBufferType=Float32Array;fi.prototype.ValueBufferType=Float32Array;fi.prototype.DefaultInterpolation=fo;var xa=class extends fi{constructor(e,t,i){super(e,t,i)}};xa.prototype.ValueTypeName="bool";xa.prototype.ValueBufferType=Array;xa.prototype.DefaultInterpolation=yn;xa.prototype.InterpolantFactoryMethodLinear=void 0;xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Np=class extends fi{constructor(e,t,i,r){super(e,t,i,r)}};Np.prototype.ValueTypeName="color";var Dp=class extends fi{constructor(e,t,i,r){super(e,t,i,r)}};Dp.prototype.ValueTypeName="number";var Up=class extends _a{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,n=this.sampleValues,s=this.valueSize,l=(i-t)/(r-t),o=e*s;for(let h=o+s;o!==h;o+=4)Ri.slerpFlat(a,0,n,o-s,n,o,l);return a}},Lc=class extends fi{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Up(this.times,this.values,this.getValueSize(),e)}};Lc.prototype.ValueTypeName="quaternion";Lc.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends fi{constructor(e,t,i){super(e,t,i)}};ya.prototype.ValueTypeName="string";ya.prototype.ValueBufferType=Array;ya.prototype.DefaultInterpolation=yn;ya.prototype.InterpolantFactoryMethodLinear=void 0;ya.prototype.InterpolantFactoryMethodSmooth=void 0;var Op=class extends fi{constructor(e,t,i,r){super(e,t,i,r)}};Op.prototype.ValueTypeName="vector";var Yl={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Zl(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Zl(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Zl(e){try{let t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Bp=class{constructor(e,t,i){let r=this,a=!1,n=0,s=0,l,o=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){s++,a===!1&&r.onStart!==void 0&&r.onStart(h,n,s),a=!0},this.itemEnd=function(h){n++,r.onProgress!==void 0&&r.onProgress(h,n,s),n===s&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,c){return o.push(h,c),this},this.removeHandler=function(h){let c=o.indexOf(h);return c!==-1&&o.splice(c,2),this},this.getHandler=function(h){for(let c=0,d=o.length;c<d;c+=2){let u=o[c],m=o[c+1];if(u.global&&(u.lastIndex=0),u.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fp=new Bp,Oo=class{constructor(e){this.manager=e!==void 0?e:Fp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Oo.DEFAULT_MATERIAL_NAME="__DEFAULT";var bi={},zp=class extends Error{constructor(e,t){super(e),this.response=t}},Vp=class extends Oo{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=Yl.get(`file:${e}`);if(a!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(a),this.manager.itemEnd(e)},0);return}if(bi[e]!==void 0){bi[e].push({onLoad:t,onProgress:i,onError:r});return}bi[e]=[],bi[e].push({onLoad:t,onProgress:i,onError:r});let n=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),s=this.mimeType,l=this.responseType;fetch(n).then(o=>{if(o.status===200||o.status===0){if(o.status===0&&Ue("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||o.body===void 0||o.body.getReader===void 0)return o;let h=bi[e],c=o.body.getReader(),d=o.headers.get("X-File-Size")||o.headers.get("Content-Length"),u=d?parseInt(d):0,m=u!==0,g=0,v=new ReadableStream({start(f){p();function p(){c.read().then(({done:y,value:E})=>{if(y)f.close();else{g+=E.byteLength;let _=new ProgressEvent("progress",{lengthComputable:m,loaded:g,total:u});for(let S=0,w=h.length;S<w;S++){let R=h[S];R.onProgress&&R.onProgress(_)}f.enqueue(E),p()}},y=>{f.error(y)})}}});return new Response(v)}else throw new zp(`fetch for "${o.url}" responded with ${o.status}: ${o.statusText}`,o)}).then(o=>{switch(l){case"arraybuffer":return o.arrayBuffer();case"blob":return o.blob();case"document":return o.text().then(h=>new DOMParser().parseFromString(h,s));case"json":return o.json();default:if(s==="")return o.text();{let h=/charset="?([^;"\s]*)"?/i.exec(s),c=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(c);return o.arrayBuffer().then(u=>d.decode(u))}}}).then(o=>{Yl.add(`file:${e}`,o);let h=bi[e];delete bi[e];for(let c=0,d=h.length;c<d;c++){let u=h[c];u.onLoad&&u.onLoad(o)}}).catch(o=>{let h=bi[e];if(h===void 0)throw this.manager.itemError(e),o;delete bi[e];for(let c=0,d=h.length;c<d;c++){let u=h[c];u.onError&&u.onError(o)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Hp=class extends Oo{constructor(e){super(e)}load(e,t,i,r){let a=this,n=new Bi,s=new Vp(this.manager);return s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setPath(this.path),s.setWithCredentials(a.withCredentials),s.load(e,function(l){let o;try{o=a.parse(l)}catch(h){r!==void 0?r(h):He(h);return}a._applyTexData(n,o),t&&t(n,o)},i,r),n}createDataTexture(e){let t=new Bi;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Ut,e.wrapT=t.wrapT!==void 0?t.wrapT:Ut,e.magFilter=t.magFilter!==void 0?t.magFilter:ht,e.minFilter=t.minFilter!==void 0?t.minFilter:ht,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Qt),t.mipmapCount===1&&(e.minFilter=ht),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}};var kp=class extends Jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Ms=new Ke,Jl=new C,Kl=new C,Gp=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new Ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vr,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Jl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jl),Kl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Ms.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Ms,e.coordinateSystem,e.reversedDepth);let a=this._frameExtents,n=r?r.z/a.x:1,s=r?r.w/a.y:1,l=r?r.x/a.x:0,o=r?r.y/a.y:0;e.coordinateSystem===da||e.reversedDepth?t.set(.5*n,0,0,.5*n+l,0,.5*s,0,.5*s+o,0,0,1,0,0,0,0,1):t.set(.5*n,0,0,.5*n+l,0,.5*s,0,.5*s+o,0,0,.5,.5,0,0,0,1),t.multiply(Ms)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},nn=new C,sn=new Ri,hi=new C,ar=class extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(nn,sn,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nn,sn,hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(nn,sn,hi),hi.x===1&&hi.y===1&&hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nn,sn,hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ui=new C,$l=new Q,Ql=new Q,qt=class extends ar{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(mn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(mn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,$l,Ql),t.subVectors(Ql,$l)}setViewOffset(e,t,i,r,a,n){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(mn*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,n=this.view;if(this.view!==null&&this.view.enabled){let l=n.fullWidth,o=n.fullHeight;a+=n.offsetX*r/l,t-=n.offsetY*i/o,r*=n.width/l,i*=n.height/o}let s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Sa=class extends ar{constructor(e=-1,t=1,i=1,r=-1,a=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=n,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,n){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,n=i+e,s=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let o=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=o*this.view.offsetX,n=a+o*this.view.width,s-=h*this.view.offsetY,l=s-h*this.view.height}this.projectionMatrix.makeOrthographic(a,n,s,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Wp=class extends Gp{constructor(){super(new Sa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},nr=class extends kp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new Wp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var vx=new Ke,_x=new Ke,xx=new Ke;var Mr=-90,br=1,Xp=class extends Jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new qt(Mr,br,e,t);r.layers=this.layers,this.add(r);let a=new qt(Mr,br,e,t);a.layers=this.layers,this.add(a);let n=new qt(Mr,br,e,t);n.layers=this.layers,this.add(n);let s=new qt(Mr,br,e,t);s.layers=this.layers,this.add(s);let l=new qt(Mr,br,e,t);l.layers=this.layers,this.add(l);let o=new qt(Mr,br,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,n,s,l]=t;for(let o of t)this.remove(o);if(e===si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===da)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,n,s,l,o,h]=this.children,c=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,n),e.setRenderTarget(i,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(c,d,u),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},jp=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var yx=new C,Sx=new Ri,Mx=new C,bx=new C,Tx=new C;var Ex=new C,wx=new Ri,Ax=new C,Rx=new C;var Bo="\\[\\]\\.:\\/",qp=new RegExp("["+Bo+"]","g"),Fo="[^"+Bo+"]",Yp="[^"+Bo.replace("\\.","")+"]",Zp=/((?:WC+[\/:])*)/.source.replace("WC",Fo),Jp=/(WCOD+)?/.source.replace("WCOD",Yp),Kp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fo),$p=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fo),Qp=new RegExp("^"+Zp+Jp+Kp+$p+"$"),em=["material","materials","bones","map"],tm=class{constructor(e,t,i){let r=i||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},yt=class Rr{constructor(t,i,r){this.path=i,this.parsedPath=r||Rr.parseTrackName(i),this.node=Rr.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new Rr.Composite(t,i,r):new Rr(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(qp,"")}static parseTrackName(t){let i=Qp.exec(t);if(i===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let n=r.nodeName.substring(a+1);em.indexOf(n)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=n)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(n){for(let s=0;s<n.length;s++){let l=n[s];if(l.name===i||l.uuid===i)return l;let o=r(l.children);if(o)return o}return null},a=r(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)t[i++]=r[a]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let a=0,n=r.length;a!==n;++a)r[a]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,a=i.propertyName,n=i.propertyIndex;if(t||(t=Rr.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ue("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let h=i.objectIndex;switch(r){case"materials":if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let c=0;c<t.length;c++)if(t[c].name===h){h=c;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(h!==void 0){if(t[h]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let s=t[a];if(s===void 0){let h=i.nodeName;He("PropertyBinding: Trying to update property for track: "+h+"."+a+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(n!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[n]!==void 0&&(n=t.morphTargetDictionary[n])}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=n}else s.fromArray!==void 0&&s.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(o=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=a;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=tm;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Cx=new Float32Array(1);var Px=new Ke;var Or,Ix=(Or=class{constructor(t,i,r,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,i,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,i=0){for(let r=0;r<4;r++)this.elements[r]=t[r+i];return this}set(t,i,r,a){let n=this.elements;return n[0]=t,n[2]=i,n[1]=r,n[3]=a,this}},Or.prototype.isMatrix2=!0,Or),Lx=new Q;var Nx=new C,Dx=new C,Ux=new C,Ox=new C,Bx=new C,Fx=new C,zx=new C;var Vx=new C;var Hx=new C,kx=new Ke,Gx=new Ke;var Wx=new C,Xx=new We,jx=new We;var qx=new C,Yx=new C,Zx=new C;var Jx=new C,Kx=new ar;var $x=new Fi;var Qx=new C;function eh(e,t,i,r){let a=im(r);switch(i){case Oh:return e*t;case Fh:return e*t/a.components*a.byteLength;case Eo:return e*t/a.components*a.byteLength;case Qi:return e*t*2/a.components*a.byteLength;case wo:return e*t*2/a.components*a.byteLength;case Bh:return e*t*3/a.components*a.byteLength;case Ot:return e*t*4/a.components*a.byteLength;case Ao:return e*t*4/a.components*a.byteLength;case cn:case un:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case dn:case pn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case zs:case Hs:return Math.max(e,16)*Math.max(t,8)/4;case Fs:case Vs:return Math.max(e,8)*Math.max(t,8)/2;case ks:case Gs:case Xs:case js:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ws:case _n:case qs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ys:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Zs:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Js:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ks:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case $s:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Qs:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case eo:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case to:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case io:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ro:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ao:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case no:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case so:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case oo:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case lo:case ho:case co:return Math.ceil(e/4)*Math.ceil(t/4)*16;case uo:case po:return Math.ceil(e/4)*Math.ceil(t/4)*8;case xn:case mo:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function im(e){switch(e){case Yt:case Lh:return{byteLength:1,components:1};case ca:case Nh:case zt:return{byteLength:2,components:1};case bo:case To:return{byteLength:2,components:4};case pi:case Mo:case ei:return{byteLength:4,components:1};case Dh:case Uh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Nc(){let e=null,t=!1,i=null,r=null;function a(n,s){r=e.requestAnimationFrame(a),i(n,s)}return{start:function(){t!==!0&&i!==null&&e!==null&&(r=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(n){i=n},setContext:function(n){e=n}}}function rm(e){let t=new WeakMap;function i(l,o){let h=l.array,c=l.usage,d=h.byteLength,u=e.createBuffer();e.bindBuffer(o,u),e.bufferData(o,h,c),l.onUploadCallback();let m;if(h instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)m=e.HALF_FLOAT;else if(h instanceof Uint16Array)l.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=e.SHORT;else if(h instanceof Uint32Array)m=e.UNSIGNED_INT;else if(h instanceof Int32Array)m=e.INT;else if(h instanceof Int8Array)m=e.BYTE;else if(h instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,o,h){let c=o.array,d=o.updateRanges;if(e.bindBuffer(h,l),d.length===0)e.bufferSubData(h,0,c);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){let g=d[u],v=d[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){let v=d[m];e.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}o.clearUpdateRanges()}o.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function n(l){l.isInterleavedBufferAttribute&&(l=l.data);let o=t.get(l);o&&(e.deleteBuffer(o.buffer),t.delete(l))}function s(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let c=t.get(l);(!c||c.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let h=t.get(l);if(h===void 0)t.set(l,i(l,o));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,o),h.version=l.version}}return{get:a,remove:n,update:s}}var am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,um=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,pm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_m=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Am=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ym=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Jm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Km=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$m=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,af=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,lf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,df=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ff=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_f=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Af=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Rf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,If=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Df=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Uf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Of=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ff=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$f=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,eg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,dg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ag=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Og=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:am,alphahash_pars_fragment:nm,alphamap_fragment:sm,alphamap_pars_fragment:om,alphatest_fragment:lm,alphatest_pars_fragment:hm,aomap_fragment:cm,aomap_pars_fragment:um,batching_pars_vertex:dm,batching_vertex:pm,begin_vertex:mm,beginnormal_vertex:fm,bsdfs:gm,iridescence_fragment:vm,bumpmap_pars_fragment:_m,clipping_planes_fragment:xm,clipping_planes_pars_fragment:ym,clipping_planes_pars_vertex:Sm,clipping_planes_vertex:Mm,color_fragment:bm,color_pars_fragment:Tm,color_pars_vertex:Em,color_vertex:wm,common:Am,cube_uv_reflection_fragment:Rm,defaultnormal_vertex:Cm,displacementmap_pars_vertex:Pm,displacementmap_vertex:Im,emissivemap_fragment:Lm,emissivemap_pars_fragment:Nm,colorspace_fragment:Dm,colorspace_pars_fragment:Um,envmap_fragment:Om,envmap_common_pars_fragment:Bm,envmap_pars_fragment:Fm,envmap_pars_vertex:zm,envmap_physical_pars_fragment:Jm,envmap_vertex:Vm,fog_vertex:Hm,fog_pars_vertex:km,fog_fragment:Gm,fog_pars_fragment:Wm,gradientmap_pars_fragment:Xm,lightmap_pars_fragment:jm,lights_lambert_fragment:qm,lights_lambert_pars_fragment:Ym,lights_pars_begin:Zm,lights_toon_fragment:Km,lights_toon_pars_fragment:$m,lights_phong_fragment:Qm,lights_phong_pars_fragment:ef,lights_physical_fragment:tf,lights_physical_pars_fragment:rf,lights_fragment_begin:af,lights_fragment_maps:nf,lights_fragment_end:sf,lightprobes_pars_fragment:of,logdepthbuf_fragment:lf,logdepthbuf_pars_fragment:hf,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:uf,map_fragment:df,map_pars_fragment:pf,map_particle_fragment:mf,map_particle_pars_fragment:ff,metalnessmap_fragment:gf,metalnessmap_pars_fragment:vf,morphinstance_vertex:_f,morphcolor_vertex:xf,morphnormal_vertex:yf,morphtarget_pars_vertex:Sf,morphtarget_vertex:Mf,normal_fragment_begin:bf,normal_fragment_maps:Tf,normal_pars_fragment:Ef,normal_pars_vertex:wf,normal_vertex:Af,normalmap_pars_fragment:Rf,clearcoat_normal_fragment_begin:Cf,clearcoat_normal_fragment_maps:Pf,clearcoat_pars_fragment:If,iridescence_pars_fragment:Lf,opaque_fragment:Nf,packing:Df,premultiplied_alpha_fragment:Uf,project_vertex:Of,dithering_fragment:Bf,dithering_pars_fragment:Ff,roughnessmap_fragment:zf,roughnessmap_pars_fragment:Vf,shadowmap_pars_fragment:Hf,shadowmap_pars_vertex:kf,shadowmap_vertex:Gf,shadowmask_pars_fragment:Wf,skinbase_vertex:Xf,skinning_pars_vertex:jf,skinning_vertex:qf,skinnormal_vertex:Yf,specularmap_fragment:Zf,specularmap_pars_fragment:Jf,tonemapping_fragment:Kf,tonemapping_pars_fragment:$f,transmission_fragment:Qf,transmission_pars_fragment:eg,uv_pars_fragment:tg,uv_pars_vertex:ig,uv_vertex:rg,worldpos_vertex:ag,background_vert:ng,background_frag:sg,backgroundCube_vert:og,backgroundCube_frag:lg,cube_vert:hg,cube_frag:cg,depth_vert:ug,depth_frag:dg,distance_vert:pg,distance_frag:mg,equirect_vert:fg,equirect_frag:gg,linedashed_vert:vg,linedashed_frag:_g,meshbasic_vert:xg,meshbasic_frag:yg,meshlambert_vert:Sg,meshlambert_frag:Mg,meshmatcap_vert:bg,meshmatcap_frag:Tg,meshnormal_vert:Eg,meshnormal_frag:wg,meshphong_vert:Ag,meshphong_frag:Rg,meshphysical_vert:Cg,meshphysical_frag:Pg,meshtoon_vert:Ig,meshtoon_frag:Lg,points_vert:Ng,points_frag:Dg,shadow_vert:Ug,shadow_frag:Og,sprite_vert:Bg,sprite_frag:Fg},me={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ui={basic:{uniforms:Ft([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Ft([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Ft([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Ft([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Ft([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new We(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Ft([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Ft([me.points,me.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Ft([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Ft([me.common,me.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Ft([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Ft([me.sprite,me.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Ft([me.common,me.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Ft([me.lights,me.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};ui.physical={uniforms:Ft([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var on={r:0,b:0,g:0},zg=new Ke,Dc=new Ye;Dc.set(-1,0,0,0,1,0,0,0,1);function Vg(e,t,i,r,a,n){let s=new We(0),l=a===!0?0:1,o,h,c=null,d=0,u=null;function m(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){let _=y.backgroundBlurriness>0;E=t.get(E,_)}return E}function g(y){let E=!1,_=m(y);_===null?f(s,l):_&&_.isColor&&(f(_,1),E=!0);let S=e.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,n):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,n),(e.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function v(y,E){let _=m(E);_&&(_.isCubeTexture||_.mapping===Rn)?(h===void 0&&(h=new Pt(new Pn(1,1,1),new Gt({name:"BackgroundCubeMaterial",uniforms:kr(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(E.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(Dc),h.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,(c!==_||d!==_.version||u!==e.toneMapping)&&(h.material.needsUpdate=!0,c=_,d=_.version,u=e.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(o===void 0&&(o=new Pt(new Uo(2,2),new Gt({name:"BackgroundMaterial",uniforms:kr(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(o)),o.material.uniforms.t2D.value=_,o.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,o.material.toneMapped=it.getTransfer(_.colorSpace)!==lt,_.matrixAutoUpdate===!0&&_.updateMatrix(),o.material.uniforms.uvTransform.value.copy(_.matrix),(c!==_||d!==_.version||u!==e.toneMapping)&&(o.material.needsUpdate=!0,c=_,d=_.version,u=e.toneMapping),o.layers.enableAll(),y.unshift(o,o.geometry,o.material,0,0,null))}function f(y,E){y.getRGB(on,Cc(e)),i.buffers.color.setClear(on.r,on.g,on.b,E,n)}function p(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return s},setClearColor:function(y,E=1){s.set(y),l=E,f(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,f(s,l)},render:g,addToRenderList:v,dispose:p}}function Hg(e,t){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},a=u(null),n=a,s=!1;function l(P,D,G,I,z){let Z=!1,k=d(P,I,G,D);n!==k&&(n=k,h(n.object)),Z=m(P,I,G,z),Z&&g(P,I,G,z),z!==null&&t.update(z,e.ELEMENT_ARRAY_BUFFER),(Z||s)&&(s=!1,_(P,D,G,I),z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function o(){return e.createVertexArray()}function h(P){return e.bindVertexArray(P)}function c(P){return e.deleteVertexArray(P)}function d(P,D,G,I){let z=I.wireframe===!0,Z=r[D.id];Z===void 0&&(Z={},r[D.id]=Z);let k=P.isInstancedMesh===!0?P.id:0,le=Z[k];le===void 0&&(le={},Z[k]=le);let j=le[G.id];j===void 0&&(j={},le[G.id]=j);let q=j[z];return q===void 0&&(q=u(o()),j[z]=q),q}function u(P){let D=[],G=[],I=[];for(let z=0;z<i;z++)D[z]=0,G[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:G,attributeDivisors:I,object:P,attributes:{},index:null}}function m(P,D,G,I){let z=n.attributes,Z=D.attributes,k=0,le=G.getAttributes();for(let j in le)if(le[j].location>=0){let q=z[j],ee=Z[j];if(ee===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(ee=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(ee=P.instanceColor)),q===void 0||q.attribute!==ee||ee&&q.data!==ee.data)return!0;k++}return n.attributesNum!==k||n.index!==I}function g(P,D,G,I){let z={},Z=D.attributes,k=0,le=G.getAttributes();for(let j in le)if(le[j].location>=0){let q=Z[j];q===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));let ee={};ee.attribute=q,q&&q.data&&(ee.data=q.data),z[j]=ee,k++}n.attributes=z,n.attributesNum=k,n.index=I}function v(){let P=n.newAttributes;for(let D=0,G=P.length;D<G;D++)P[D]=0}function f(P){p(P,0)}function p(P,D){let G=n.newAttributes,I=n.enabledAttributes,z=n.attributeDivisors;G[P]=1,I[P]===0&&(e.enableVertexAttribArray(P),I[P]=1),z[P]!==D&&(e.vertexAttribDivisor(P,D),z[P]=D)}function y(){let P=n.newAttributes,D=n.enabledAttributes;for(let G=0,I=D.length;G<I;G++)D[G]!==P[G]&&(e.disableVertexAttribArray(G),D[G]=0)}function E(P,D,G,I,z,Z,k){k===!0?e.vertexAttribIPointer(P,D,G,z,Z):e.vertexAttribPointer(P,D,G,I,z,Z)}function _(P,D,G,I){v();let z=I.attributes,Z=G.getAttributes(),k=D.defaultAttributeValues;for(let le in Z){let j=Z[le];if(j.location>=0){let q=z[le];if(q===void 0&&(le==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),le==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),q!==void 0){let ee=q.normalized,Be=q.itemSize,be=t.get(q);if(be===void 0)continue;let nt=be.buffer,Xe=be.type,Y=be.bytesPerElement,re=Xe===e.INT||Xe===e.UNSIGNED_INT||q.gpuType===Mo;if(q.isInterleavedBufferAttribute){let se=q.data,Ce=se.stride,Fe=q.offset;if(se.isInstancedInterleavedBuffer){for(let de=0;de<j.locationSize;de++)p(j.location+de,se.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let de=0;de<j.locationSize;de++)f(j.location+de);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let de=0;de<j.locationSize;de++)E(j.location+de,Be/j.locationSize,Xe,ee,Ce*Y,(Fe+Be/j.locationSize*de)*Y,re)}else{if(q.isInstancedBufferAttribute){for(let se=0;se<j.locationSize;se++)p(j.location+se,q.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let se=0;se<j.locationSize;se++)f(j.location+se);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let se=0;se<j.locationSize;se++)E(j.location+se,Be/j.locationSize,Xe,ee,Be*Y,Be/j.locationSize*se*Y,re)}}else if(k!==void 0){let ee=k[le];if(ee!==void 0)switch(ee.length){case 2:e.vertexAttrib2fv(j.location,ee);break;case 3:e.vertexAttrib3fv(j.location,ee);break;case 4:e.vertexAttrib4fv(j.location,ee);break;default:e.vertexAttrib1fv(j.location,ee)}}}}y()}function S(){T();for(let P in r){let D=r[P];for(let G in D){let I=D[G];for(let z in I){let Z=I[z];for(let k in Z)c(Z[k].object),delete Z[k];delete I[z]}}delete r[P]}}function w(P){if(r[P.id]===void 0)return;let D=r[P.id];for(let G in D){let I=D[G];for(let z in I){let Z=I[z];for(let k in Z)c(Z[k].object),delete Z[k];delete I[z]}}delete r[P.id]}function R(P){for(let D in r){let G=r[D];for(let I in G){let z=G[I];if(z[P.id]===void 0)continue;let Z=z[P.id];for(let k in Z)c(Z[k].object),delete Z[k];delete z[P.id]}}}function x(P){for(let D in r){let G=r[D],I=P.isInstancedMesh===!0?P.id:0,z=G[I];if(z!==void 0){for(let Z in z){let k=z[Z];for(let le in k)c(k[le].object),delete k[le];delete z[Z]}delete G[I],Object.keys(G).length===0&&delete r[D]}}}function T(){N(),s=!0,n!==a&&(n=a,h(n.object))}function N(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:T,resetDefaultState:N,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:f,disableUnusedAttributes:y}}function kg(e,t,i){let r;function a(o){r=o}function n(o,h){e.drawArrays(r,o,h),i.update(h,r,1)}function s(o,h,c){c!==0&&(e.drawArraysInstanced(r,o,h,c),i.update(h,r,c))}function l(o,h,c){if(c===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,o,0,h,0,c);let d=0;for(let u=0;u<c;u++)d+=h[u];i.update(d,r,1)}this.setMode=a,this.render=n,this.renderInstances=s,this.renderMultiDraw=l}function Gg(e,t,i,r){let a;function n(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(R){return!(R!==Ot&&r.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(R){let x=R===zt&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Yt&&R!==ei&&!x&&r.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function o(R){if(R==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=i.precision!==void 0?i.precision:"highp",c=o(h);c!==h&&(Ue("WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);let d=i.logarithmicDepthBuffer===!0,u=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");i.reversedDepthBuffer===!0&&u===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),p=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),E=e.getParameter(e.MAX_VARYING_VECTORS),_=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),w=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:o,textureFormatReadable:s,textureTypeReadable:l,precision:h,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:_,maxSamples:S,samples:w}}function Wg(e){let t=this,i=null,r=0,a=!1,n=!1,s=new Oi,l=new Ye,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let m=d.length!==0||u||r!==0||a;return a=u,r=d.length,m},this.beginShadows=function(){n=!0,c(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,u){i=c(d,u,0)},this.setState=function(d,u,m){let g=d.clippingPlanes,v=d.clipIntersection,f=d.clipShadows,p=e.get(d);if(!a||g===null||g.length===0||n&&!f)n?c(null):h();else{let y=n?0:r,E=y*4,_=p.clippingState||null;o.value=_,_=c(g,u,E,m);for(let S=0;S!==E;++S)_[S]=i[S];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function h(){o.value!==i&&(o.value=i,o.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function c(d,u,m,g){let v=d!==null?d.length:0,f=null;if(v!==0){if(f=o.value,g!==!0||f===null){let p=m+v*4,y=u.matrixWorldInverse;l.getNormalMatrix(y),(f===null||f.length<p)&&(f=new Float32Array(p));for(let E=0,_=m;E!==v;++E,_+=4)s.copy(d[E]).applyMatrix4(y,l),s.normal.toArray(f,_),f[_+3]=s.constant}o.value=f,o.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,f}}var Cr=4,Xg=6,jg=20,qg=256,ta=new Sa,th=new We,bs=null,Ts=0,Es=0,ws=!1,Yg=new C,qi=new C,wn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){let{size:n=256,position:s=Yg}=a;bs=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(n);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,s),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ah(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bs,Ts,Es),this._renderer.xr.enabled=ws,e.scissorTest=!1,Tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$i||e.mapping===Br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bs=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ht,minFilter:ht,generateMipmaps:!1,type:zt,format:Ot,colorSpace:er,depthBuffer:!1},r=ih(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ih(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Zg(a)),this._blurMaterial=Kg(a,e,t),this._ggxMaterial=Jg(a,e,t)}return r}_compileMaterial(e){let t=new Pt(new mt,e);this._renderer.compile(t,ta)}_sceneToCubeUV(e,t,i,r,a){let n=new qt(90,1,t,i),s=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],o=this._renderer,h=o.autoClear,c=o.toneMapping;o.getClearColor(th),o.toneMapping=di,o.autoClear=!1,o.state.buffers.depth.getReversed()&&(o.setRenderTarget(r),o.clearDepth(),o.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new Pn,new qh({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,m=!1,g=e.background;g?g.isColor&&(u.color.copy(g),e.background=null,m=!0):(u.color.copy(th),m=!0);for(let v=0;v<6;v++){let f=v%3;f===0?(n.up.set(0,s[v],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x+l[v],a.y,a.z)):f===1?(n.up.set(0,0,s[v]),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y+l[v],a.z)):(n.up.set(0,s[v],0),n.position.set(a.x,a.y,a.z),n.lookAt(a.x,a.y,a.z+l[v]));let p=this._cubeSize;Tr(r,f*p,v>2?p:0,p,p),o.setRenderTarget(r),m&&o.render(d,n),o.render(e,n)}o.toneMapping=c,o.autoClear=h,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===$i||e.mapping===Br;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ah()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rh());let a=r?this._cubemapMaterial:this._equirectMaterial,n=this._lodMeshes[0];n.material=a;let s=a.uniforms;s.envMap.value=e;let l=this._cubeSize;Tr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(n,ta)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,a=this._pingPongRenderTarget,n=this._ggxMaterial,s=this._lodMeshes[i];s.material=n;let l=n.uniforms,o=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),c=Math.sqrt(o*o-h*h),d=o*1.25,u=c*d,{_lodMax:m}=this,g=this._sizeLods[i],v=3*g*(i>m-Cr?i-m+Cr:0),f=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=u,l.mipInt.value=m-t,Tr(a,v,f,3*g,2*g),r.setRenderTarget(a),r.render(s,ta),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=m-i,Tr(e,v,f,3*g,2*g),r.setRenderTarget(e),r.render(s,ta)}_blur(e,t,i,r){let a=this._pingPongRenderTarget,n=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,n),this._blurPass(a,e,i,i,n)}_blurPass(e,t,i,r,a){let n=this._renderer,s=this._blurMaterial,l=this._lodMeshes[r];l.material=s;let o=s.uniforms;o.envMap.value=e.texture,o.sigma.value=a,o.mipInt.value=this._lodMax-i;let h=this._sizeLods[r],c=3*h*(r>this._lodMax-Cr?r-this._lodMax+Cr:0),d=4*(this._cubeSize-h);Tr(t,c,d,3*h,2*h),n.setRenderTarget(t),n.render(l,ta)}};function Zg(e){let t=[],i=[],r=e,a=e-Cr+1+Xg;for(let n=0;n<a;n++){let s=Math.pow(2,r);t.push(s);let l=1/(s-2),o=-l,h=1+l,c=[o,o,h,o,h,h,o,o,h,h,o,h],d=6,u=6,m=3,g=new Float32Array(m*u*d),v=new Float32Array(m*u*d);for(let p=0;p<d;p++){let y=p%3*2/3-1,E=p>2?0:-1,_=[y,E,0,y+2/3,E,0,y+2/3,E+1,0,y,E,0,y+2/3,E+1,0,y,E+1,0];g.set(_,m*u*p);for(let S=0;S<u;S++){let w=c[S*2]*2-1,R=c[S*2+1]*2-1;p===0?qi.set(1,R,w):p===1?qi.set(-w,1,-R):p===2?qi.set(-w,R,1):p===3?qi.set(-1,R,-w):p===4?qi.set(-w,-1,R):qi.set(w,R,-1),qi.toArray(v,(p*u+S)*m)}}let f=new mt;f.setAttribute("position",new ti(g,m)),f.setAttribute("outputDirection",new ti(v,m)),i.push(new Pt(f,null)),r>Cr&&r--}return{lodMeshes:i,sizeLods:t}}function ih(e,t,i){let r=new Vt(e,t,i);return r.texture.mapping=Rn,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Tr(e,t,i,r,a){e.viewport.set(t,i,r,a),e.scissor.set(t,i,r,a)}function Jg(e,t,i){return new Gt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ln(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Kg(e,t,i){return new Gt({name:"SphericalGaussianBlur",defines:{SAMPLES:jg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ln(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function rh(){return new Gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ln(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function ah(){return new Gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ln(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Ln(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Uc=class extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Jh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Pn(5,5,5),a=new Gt({name:"CubemapFromEquirect",uniforms:kr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:kt,blending:Ei});a.uniforms.tEquirect.value=t;let n=new Pt(r,a),s=t.minFilter;return t.minFilter===Qt&&(t.minFilter=ht),new Xp(1,10,this).update(e,n),t.minFilter=s,n.geometry.dispose(),n.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let a=e.getRenderTarget();for(let n=0;n<6;n++)e.setRenderTarget(this,n),e.clear(t,i,r);e.setRenderTarget(a)}};function $g(e){let t=new WeakMap,i=new WeakMap,r=null;function a(u,m=!1){return u==null?null:m?s(u):n(u)}function n(u){if(u&&u.isTexture){let m=u.mapping;if(m===Wn||m===Xn)if(t.has(u)){let g=t.get(u).texture;return l(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new Uc(g.height);return v.fromEquirectangularTexture(e,u),t.set(u,v),u.addEventListener("dispose",h),l(v.texture,u.mapping)}else return null}}return u}function s(u){if(u&&u.isTexture){let m=u.mapping,g=m===Wn||m===Xn,v=m===$i||m===Br;if(g||v){let f=i.get(u),p=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return r===null&&(r=new wn(e)),f=g?r.fromEquirectangular(u,f):r.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,i.set(u,f),f.texture;if(f!==void 0)return f.texture;{let y=u.image;return g&&y&&y.height>0||v&&y&&o(y)?(r===null&&(r=new wn(e)),f=g?r.fromEquirectangular(u):r.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,i.set(u,f),u.addEventListener("dispose",c),f.texture):null}}}return u}function l(u,m){return m===Wn?u.mapping=$i:m===Xn&&(u.mapping=Br),u}function o(u){let m=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&m++;return m===g}function h(u){let m=u.target;m.removeEventListener("dispose",h);let g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function c(u){let m=u.target;m.removeEventListener("dispose",c);let g=i.get(m);g!==void 0&&(i.delete(m),g.dispose())}function d(){t=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:d}}function Qg(e){let t={};function i(r){if(t[r]!==void 0)return t[r];let a=e.getExtension(r);return t[r]=a,a}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){let a=i(r);return a===null&&Pr("WebGLRenderer: "+r+" extension not supported."),a}}}function e0(e,t,i,r){let a={},n=new WeakMap;function s(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",s),delete a[u.id];let m=n.get(u);m&&(t.remove(m),n.delete(u)),r.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,i.memory.geometries--}function l(d,u){return a[u.id]===!0||(u.addEventListener("dispose",s),a[u.id]=!0,i.memory.geometries++),u}function o(d){let u=d.attributes;for(let m in u)t.update(u[m],e.ARRAY_BUFFER)}function h(d){let u=[],m=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(m!==null){let y=m.array;v=m.version;for(let E=0,_=y.length;E<_;E+=3){let S=y[E+0],w=y[E+1],R=y[E+2];u.push(S,w,w,R,R,S)}}else{let y=g.array;v=g.version;for(let E=0,_=y.length/3-1;E<_;E+=3){let S=E+0,w=E+1,R=E+2;u.push(S,w,w,R,R,S)}}let f=new(g.count>=65535?Xh:Wh)(u,1);f.version=v;let p=n.get(d);p&&t.remove(p),n.set(d,f)}function c(d){let u=n.get(d);if(u){let m=d.index;m!==null&&u.version<m.version&&h(d)}else h(d);return n.get(d)}return{get:l,update:o,getWireframeAttribute:c}}function t0(e,t,i){let r;function a(d){r=d}let n,s;function l(d){n=d.type,s=d.bytesPerElement}function o(d,u){e.drawElements(r,u,n,d*s),i.update(u,r,1)}function h(d,u,m){m!==0&&(e.drawElementsInstanced(r,u,n,d*s,m),i.update(u,r,m))}function c(d,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,u,0,n,d,0,m);let g=0;for(let v=0;v<m;v++)g+=u[v];i.update(g,r,1)}this.setMode=a,this.setIndex=l,this.render=o,this.renderInstances=h,this.renderMultiDraw=c}function i0(e){let t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(n,s,l){switch(i.calls++,s){case e.TRIANGLES:i.triangles+=l*(n/3);break;case e.LINES:i.lines+=l*(n/2);break;case e.LINE_STRIP:i.lines+=l*(n-1);break;case e.LINE_LOOP:i.lines+=l*n;break;case e.POINTS:i.points+=l*n;break;default:He("WebGLInfo: Unknown draw mode:",s);break}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:a,update:r}}function r0(e,t,i){let r=new WeakMap,a=new at;function n(s,l,o){let h=s.morphTargetInfluences,c=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,d=c!==void 0?c.length:0,u=r.get(l);if(u===void 0||u.count!==d){let m=function(){x.dispose(),r.delete(l),l.removeEventListener("dispose",m)};u!==void 0&&u.texture.dispose();let g=l.morphAttributes.position!==void 0,v=l.morphAttributes.normal!==void 0,f=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],y=l.morphAttributes.normal||[],E=l.morphAttributes.color||[],_=0;g===!0&&(_=1),v===!0&&(_=2),f===!0&&(_=3);let S=l.attributes.position.count*_,w=1;S>t.maxTextureSize&&(w=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let R=new Float32Array(S*w*4*d),x=new Vh(R,S,w,d);x.type=ei,x.needsUpdate=!0;let T=_*4;for(let N=0;N<d;N++){let P=p[N],D=y[N],G=E[N],I=S*w*4*N;for(let z=0;z<P.count;z++){let Z=z*T;g===!0&&(a.fromBufferAttribute(P,z),R[I+Z+0]=a.x,R[I+Z+1]=a.y,R[I+Z+2]=a.z,R[I+Z+3]=0),v===!0&&(a.fromBufferAttribute(D,z),R[I+Z+4]=a.x,R[I+Z+5]=a.y,R[I+Z+6]=a.z,R[I+Z+7]=0),f===!0&&(a.fromBufferAttribute(G,z),R[I+Z+8]=a.x,R[I+Z+9]=a.y,R[I+Z+10]=a.z,R[I+Z+11]=G.itemSize===4?a.w:1)}}u={count:d,texture:x,size:new Q(S,w)},r.set(l,u),l.addEventListener("dispose",m)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(e,"morphTexture",s.morphTexture,i);else{let m=0;for(let v=0;v<h.length;v++)m+=h[v];let g=l.morphTargetsRelative?1:1-m;o.getUniforms().setValue(e,"morphTargetBaseInfluence",g),o.getUniforms().setValue(e,"morphTargetInfluences",h)}o.getUniforms().setValue(e,"morphTargetsTexture",u.texture,i),o.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:n}}function a0(e,t,i,r,a){let n=new WeakMap;function s(h){let c=a.render.frame,d=h.geometry,u=t.get(h,d);if(n.get(u)!==c&&(t.update(u),n.set(u,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),n.get(h)!==c&&(i.update(h.instanceMatrix,e.ARRAY_BUFFER),h.instanceColor!==null&&i.update(h.instanceColor,e.ARRAY_BUFFER),n.set(h,c))),h.isSkinnedMesh){let m=h.skeleton;n.get(m)!==c&&(m.update(),n.set(m,c))}return u}function l(){n=new WeakMap}function o(h){let c=h.target;c.removeEventListener("dispose",o),r.releaseStatesOfObject(c),i.remove(c.instanceMatrix),c.instanceColor!==null&&i.remove(c.instanceColor)}return{update:s,dispose:l}}var n0={[Eh]:"LINEAR_TONE_MAPPING",[wh]:"REINHARD_TONE_MAPPING",[Ah]:"CINEON_TONE_MAPPING",[An]:"ACES_FILMIC_TONE_MAPPING",[Ch]:"AGX_TONE_MAPPING",[Ph]:"NEUTRAL_TONE_MAPPING",[Rh]:"CUSTOM_TONE_MAPPING"};function s0(e,t,i,r,a,n){let s=new Vt(t,i,{type:e,depthBuffer:a,stencilBuffer:n,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,o=null,h=new mt;h.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Ne([0,2,0,0,2,0],2));let c=new bp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Pt(h,c),u=new Sa(-1,1,1,-1,0,1),m=null,g=null,v=!1,f,p=null,y=[],E=!1;this.setSize=function(_,S){s.setSize(_,S),l!==null&&l.setSize(_,S),o!==null&&o.setSize(_,S);for(let w=0;w<y.length;w++){let R=y[w];R.setSize&&R.setSize(_,S)}},this.setEffects=function(_){y=_,E=y.length>0&&y[0].isRenderPass===!0;let S=s.width,w=s.height;y.length>0&&l===null&&(l=new Vt(S,w,{type:zt,depthBuffer:!1,stencilBuffer:!1}),o=new Vt(S,w,{type:zt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<y.length;R++){let x=y[R];x.setSize&&x.setSize(S,w)}},this.begin=function(_,S){if(v||_.toneMapping===di&&y.length===0)return!1;if(p=S,S!==null){let w=S.width,R=S.height;(s.width!==w||s.height!==R)&&this.setSize(w,R)}return E===!1&&_.setRenderTarget(s),f=_.toneMapping,_.toneMapping=di,!0},this.hasRenderPass=function(){return E},this.end=function(_,S){_.toneMapping=f,v=!0;let w=s,R=l;for(let x=0;x<y.length;x++){let T=y[x];T.enabled!==!1&&(T.render(_,R,w,S),T.needsSwap!==!1&&(w=R,R=R===l?o:l))}if(m!==_.outputColorSpace||g!==_.toneMapping){m=_.outputColorSpace,g=_.toneMapping,c.defines={},it.getTransfer(m)===lt&&(c.defines.SRGB_TRANSFER="");let x=n0[g];x&&(c.defines[x]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,_.setRenderTarget(p),_.render(d,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),l!==null&&l.dispose(),o!==null&&o.dispose(),h.dispose(),c.dispose()}}var Oc=new Wt,yo=new pa(1,1),Bc=new Vh,Fc=new td,zc=new Jh,nh=[],sh=[],oh=new Float32Array(16),lh=new Float32Array(9),hh=new Float32Array(4);function Xr(e,t,i){let r=e[0];if(r<=0||r>0)return e;let a=t*i,n=nh[a];if(n===void 0&&(n=new Float32Array(a),nh[a]=n),t!==0){r.toArray(n,0);for(let s=1,l=0;s!==t;++s)l+=i,e[s].toArray(n,l)}return n}function Et(e,t){if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(e[i]!==t[i])return!1;return!0}function wt(e,t){for(let i=0,r=t.length;i<r;i++)e[i]=t[i]}function Nn(e,t){let i=sh[t];i===void 0&&(i=new Int32Array(t),sh[t]=i);for(let r=0;r!==t;++r)i[r]=e.allocateTextureUnit();return i}function o0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function l0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Et(i,t))return;e.uniform2fv(this.addr,t),wt(i,t)}}function h0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Et(i,t))return;e.uniform3fv(this.addr,t),wt(i,t)}}function c0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Et(i,t))return;e.uniform4fv(this.addr,t),wt(i,t)}}function u0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Et(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),wt(i,t)}else{if(Et(i,r))return;hh.set(r),e.uniformMatrix2fv(this.addr,!1,hh),wt(i,r)}}function d0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Et(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),wt(i,t)}else{if(Et(i,r))return;lh.set(r),e.uniformMatrix3fv(this.addr,!1,lh),wt(i,r)}}function p0(e,t){let i=this.cache,r=t.elements;if(r===void 0){if(Et(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),wt(i,t)}else{if(Et(i,r))return;oh.set(r),e.uniformMatrix4fv(this.addr,!1,oh),wt(i,r)}}function m0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function f0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Et(i,t))return;e.uniform2iv(this.addr,t),wt(i,t)}}function g0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Et(i,t))return;e.uniform3iv(this.addr,t),wt(i,t)}}function v0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Et(i,t))return;e.uniform4iv(this.addr,t),wt(i,t)}}function _0(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function x0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Et(i,t))return;e.uniform2uiv(this.addr,t),wt(i,t)}}function y0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Et(i,t))return;e.uniform3uiv(this.addr,t),wt(i,t)}}function S0(e,t){let i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Et(i,t))return;e.uniform4uiv(this.addr,t),wt(i,t)}}function M0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a);let n;this.type===e.SAMPLER_2D_SHADOW?(yo.compareFunction=i.isReversedDepthBuffer()?Co:Ro,n=yo):n=Oc,i.setTexture2D(t||n,a)}function b0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture3D(t||Fc,a)}function T0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTextureCube(t||zc,a)}function E0(e,t,i){let r=this.cache,a=i.allocateTextureUnit();r[0]!==a&&(e.uniform1i(this.addr,a),r[0]=a),i.setTexture2DArray(t||Bc,a)}function w0(e){switch(e){case 5126:return o0;case 35664:return l0;case 35665:return h0;case 35666:return c0;case 35674:return u0;case 35675:return d0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return f0;case 35668:case 35672:return g0;case 35669:case 35673:return v0;case 5125:return _0;case 36294:return x0;case 36295:return y0;case 36296:return S0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return T0;case 36289:case 36303:case 36311:case 36292:return E0}}function A0(e,t){e.uniform1fv(this.addr,t)}function R0(e,t){let i=Xr(t,this.size,2);e.uniform2fv(this.addr,i)}function C0(e,t){let i=Xr(t,this.size,3);e.uniform3fv(this.addr,i)}function P0(e,t){let i=Xr(t,this.size,4);e.uniform4fv(this.addr,i)}function I0(e,t){let i=Xr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function L0(e,t){let i=Xr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function N0(e,t){let i=Xr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function D0(e,t){e.uniform1iv(this.addr,t)}function U0(e,t){e.uniform2iv(this.addr,t)}function O0(e,t){e.uniform3iv(this.addr,t)}function B0(e,t){e.uniform4iv(this.addr,t)}function F0(e,t){e.uniform1uiv(this.addr,t)}function z0(e,t){e.uniform2uiv(this.addr,t)}function V0(e,t){e.uniform3uiv(this.addr,t)}function H0(e,t){e.uniform4uiv(this.addr,t)}function k0(e,t,i){let r=this.cache,a=t.length,n=Nn(i,a);Et(r,n)||(e.uniform1iv(this.addr,n),wt(r,n));let s;this.type===e.SAMPLER_2D_SHADOW?s=yo:s=Oc;for(let l=0;l!==a;++l)i.setTexture2D(t[l]||s,n[l])}function G0(e,t,i){let r=this.cache,a=t.length,n=Nn(i,a);Et(r,n)||(e.uniform1iv(this.addr,n),wt(r,n));for(let s=0;s!==a;++s)i.setTexture3D(t[s]||Fc,n[s])}function W0(e,t,i){let r=this.cache,a=t.length,n=Nn(i,a);Et(r,n)||(e.uniform1iv(this.addr,n),wt(r,n));for(let s=0;s!==a;++s)i.setTextureCube(t[s]||zc,n[s])}function X0(e,t,i){let r=this.cache,a=t.length,n=Nn(i,a);Et(r,n)||(e.uniform1iv(this.addr,n),wt(r,n));for(let s=0;s!==a;++s)i.setTexture2DArray(t[s]||Bc,n[s])}function j0(e){switch(e){case 5126:return A0;case 35664:return R0;case 35665:return C0;case 35666:return P0;case 35674:return I0;case 35675:return L0;case 35676:return N0;case 5124:case 35670:return D0;case 35667:case 35671:return U0;case 35668:case 35672:return O0;case 35669:case 35673:return B0;case 5125:return F0;case 36294:return z0;case 36295:return V0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}var q0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=w0(t.type)}},Y0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=j0(t.type)}},Z0=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,n=r.length;a!==n;++a){let s=r[a];s.setValue(e,t[s.id],i)}}},As=/(\w+)(\])?(\[|\.)?/g;function ch(e,t){e.seq.push(t),e.map[t.id]=t}function J0(e,t,i){let r=e.name,a=r.length;for(As.lastIndex=0;;){let n=As.exec(r),s=As.lastIndex,l=n[1],o=n[2]==="]",h=n[3];if(o&&(l=l|0),h===void 0||h==="["&&s+2===a){ch(i,h===void 0?new q0(l,e,t):new Y0(l,e,t));break}else{let c=i.map[l];c===void 0&&(c=new Z0(l),ch(i,c)),i=c}}}var vn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){let s=e.getActiveUniform(t,n),l=e.getUniformLocation(t,s.name);J0(s,l,this)}let r=[],a=[];for(let n of this.seq)n.type===e.SAMPLER_2D_SHADOW||n.type===e.SAMPLER_CUBE_SHADOW||n.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(n):a.push(n);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,n=t.length;a!==n;++a){let s=t[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let n=e[r];n.id in t&&i.push(n)}return i}};function uh(e,t,i){let r=e.createShader(t);return e.shaderSource(r,i),e.compileShader(r),r}var K0=37297,$0=0;function Q0(e,t){let i=e.split(`
`),r=[],a=Math.max(t-6,0),n=Math.min(t+6,i.length);for(let s=a;s<n;s++){let l=s+1;r.push(`${l===t?">":" "} ${l}: ${i[s]}`)}return r.join(`
`)}var dh=new Ye;function ev(e){it._getMatrix(dh,it.workingColorSpace,e);let t=`mat3( ${dh.elements.map(i=>i.toFixed(4))} )`;switch(it.getTransfer(e)){case Sn:return[t,"LinearTransferOETF"];case lt:return[t,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function ph(e,t,i){let r=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(r&&a==="")return"";let n=/ERROR: 0:(\d+)/.exec(a);if(n){let s=parseInt(n[1]);return i.toUpperCase()+`

`+a+`

`+Q0(e.getShaderSource(t),s)}else return a}function tv(e,t){let i=ev(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}var iv={[Eh]:"Linear",[wh]:"Reinhard",[Ah]:"Cineon",[An]:"ACESFilmic",[Ch]:"AgX",[Ph]:"Neutral",[Rh]:"Custom"};function rv(e,t){let i=iv[t];return i===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}var ln=new C;function av(){it.getLuminanceCoefficients(ln);let e=ln.x.toFixed(4),t=ln.y.toFixed(4),i=ln.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nv(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(na).join(`
`)}function sv(e){let t=[];for(let i in e){let r=e[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function ov(e,t){let i={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){let n=e.getActiveAttrib(t,a),s=n.name,l=1;n.type===e.FLOAT_MAT2&&(l=2),n.type===e.FLOAT_MAT3&&(l=3),n.type===e.FLOAT_MAT4&&(l=4),i[s]={type:n.type,location:e.getAttribLocation(t,s),locationSize:l}}return i}function na(e){return e!==""}function mh(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fh(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function So(e){return e.replace(lv,cv)}var hv=new Map;function cv(e,t){let i=Ze[t];if(i===void 0){let r=hv.get(t);if(r!==void 0)i=Ze[r],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return So(i)}var uv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gh(e){return e.replace(uv,dv)}function dv(e,t,i,r){let a="";for(let n=parseInt(t);n<parseInt(i);n++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function vh(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var pv={[hn]:"SHADOWMAP_TYPE_PCF",[ra]:"SHADOWMAP_TYPE_VSM"};function mv(e){return pv[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var fv={[$i]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE",[Rn]:"ENVMAP_TYPE_CUBE_UV"};function gv(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":fv[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var vv={[Br]:"ENVMAP_MODE_REFRACTION"};function _v(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":vv[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var xv={[Th]:"ENVMAP_BLENDING_MULTIPLY",[Iu]:"ENVMAP_BLENDING_MIX",[Lu]:"ENVMAP_BLENDING_ADD"};function yv(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":xv[e.combine]||"ENVMAP_BLENDING_NONE"}function Sv(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function Mv(e,t,i,r){let a=e.getContext(),n=i.defines,s=i.vertexShader,l=i.fragmentShader,o=mv(i),h=gv(i),c=_v(i),d=yv(i),u=Sv(i),m=nv(i),g=sv(n),v=a.createProgram(),f,p,y=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(na).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(na).join(`
`),p.length>0&&(p+=`
`)):(f=[vh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+c:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+o:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),p=[vh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.envMap?"#define "+c:"",i.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+o:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==di?"#define TONE_MAPPING":"",i.toneMapping!==di?Ze.tonemapping_pars_fragment:"",i.toneMapping!==di?rv("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,tv("linearToOutputTexel",i.outputColorSpace),av(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(na).join(`
`)),s=So(s),s=mh(s,i),s=fh(s,i),l=So(l),l=mh(l,i),l=fh(l,i),s=gh(s),l=gh(l),i.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",i.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=y+f+s,_=y+p+l,S=uh(a,a.VERTEX_SHADER,E),w=uh(a,a.FRAGMENT_SHADER,_);a.attachShader(v,S),a.attachShader(v,w),i.index0AttributeName!==void 0?a.bindAttribLocation(v,0,i.index0AttributeName):i.hasPositionAttribute===!0&&a.bindAttribLocation(v,0,"position"),a.linkProgram(v);function R(P){if(e.debug.checkShaderErrors){let D=a.getProgramInfoLog(v)||"",G=a.getShaderInfoLog(S)||"",I=a.getShaderInfoLog(w)||"",z=D.trim(),Z=G.trim(),k=I.trim(),le=!0,j=!0;if(a.getProgramParameter(v,a.LINK_STATUS)===!1)if(le=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,v,S,w);else{let q=ph(a,S,"vertex"),ee=ph(a,w,"fragment");He("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(v,a.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+q+`
`+ee)}else z!==""?Ue("WebGLProgram: Program Info Log:",z):(Z===""||k==="")&&(j=!1);j&&(P.diagnostics={runnable:le,programLog:z,vertexShader:{log:Z,prefix:f},fragmentShader:{log:k,prefix:p}})}a.deleteShader(S),a.deleteShader(w),x=new vn(a,v),T=ov(a,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let N=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=a.getProgramParameter(v,K0)),N},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(v),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=$0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=w,this}var bv=0,Tv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Ev(e),t.set(e,i)),i}},Ev=class{constructor(e){this.id=bv++,this.code=e,this.usedTimes=0}};function wv(e){return e===Qi||e===_n||e===xn}function Av(e,t,i,r,a,n){let s=new kh,l=new Tv,o=new Set,h=[],c=new Map,d=r.logarithmicDepthBuffer,u=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return o.add(x),x===0?"uv":`uv${x}`}function v(x,T,N,P,D,G){let I=P.fog,z=D.geometry,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,le=t.get(x.envMap||Z,k),j=le&&le.mapping===Rn?le.image.height:null,q=m[x.type];x.precision!==null&&(u=r.getMaxPrecision(x.precision),u!==x.precision&&Ue("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Be=ee!==void 0?ee.length:0,be=0;z.morphAttributes.position!==void 0&&(be=1),z.morphAttributes.normal!==void 0&&(be=2),z.morphAttributes.color!==void 0&&(be=3);let nt,Xe,Y,re;if(q){let Tt=ui[q];nt=Tt.vertexShader,Xe=Tt.fragmentShader}else{nt=x.vertexShader,Xe=x.fragmentShader;let Tt=l.getVertexShaderStage(x),ot=l.getFragmentShaderStage(x);l.update(x,Tt,ot),Y=Tt.id,re=ot.id}let se=e.getRenderTarget(),Ce=e.state.buffers.depth.getReversed(),Fe=D.isInstancedMesh===!0,de=D.isBatchedMesh===!0,$e=!!x.map,te=!!x.matcap,$=!!le,oe=!!x.aoMap,_e=!!x.lightMap,xe=!!x.bumpMap&&x.wireframe===!1,Ee=!!x.normalMap,Oe=!!x.displacementMap,Ge=!!x.emissiveMap,qe=!!x.metalnessMap,L=!!x.roughnessMap,pt=x.anisotropy>0,tt=x.clearcoat>0,Qe=x.dispersion>0,A=x.retroreflectivity>0,M=x.iridescence>0,U=x.sheen>0,W=x.transmission>0,K=pt&&!!x.anisotropyMap,ue=tt&&!!x.clearcoatMap,pe=tt&&!!x.clearcoatNormalMap,F=tt&&!!x.clearcoatRoughnessMap,he=M&&!!x.iridescenceMap,fe=M&&!!x.iridescenceThicknessMap,Te=U&&!!x.sheenColorMap,ne=U&&!!x.sheenRoughnessMap,Ie=!!x.specularMap,De=!!x.specularColorMap,ke=!!x.specularIntensityMap,st=W&&!!x.transmissionMap,B=W&&!!x.thicknessMap,J=!!x.gradientMap,ie=!!x.alphaMap,ye=x.alphaTest>0,we=!!x.alphaHash,ae=!!x.extensions,ve=di;x.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ve=e.toneMapping);let Ve={shaderID:q,shaderType:x.type,shaderName:x.name,vertexShader:nt,fragmentShader:Xe,defines:x.defines,customVertexShaderID:Y,customFragmentShaderID:re,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:de,batchingColor:de&&D._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&D.instanceColor!==null,instancingMorph:Fe&&D.morphTexture!==null,outputColorSpace:se===null?e.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:$e,matcap:te,envMap:$,envMapMode:$&&le.mapping,envMapCubeUVHeight:j,aoMap:oe,lightMap:_e,bumpMap:xe,normalMap:Ee,displacementMap:Oe,emissiveMap:Ge,normalMapObjectSpace:Ee&&x.normalMapType===Uu,normalMapTangentSpace:Ee&&x.normalMapType===go,packedNormalMap:Ee&&x.normalMapType===go&&wv(x.normalMap.format),metalnessMap:qe,roughnessMap:L,anisotropy:pt,anisotropyMap:K,clearcoat:tt,clearcoatMap:ue,clearcoatNormalMap:pe,clearcoatRoughnessMap:F,dispersion:Qe,retroreflection:A,iridescence:M,iridescenceMap:he,iridescenceThicknessMap:fe,sheen:U,sheenColorMap:Te,sheenRoughnessMap:ne,specularMap:Ie,specularColorMap:De,specularIntensityMap:ke,transmission:W,transmissionMap:st,thicknessMap:B,gradientMap:J,opaque:x.transparent===!1&&x.blending===sa&&x.alphaToCoverage===!1,alphaMap:ie,alphaTest:ye,alphaHash:we,combine:x.combine,mapUv:$e&&g(x.map.channel),aoMapUv:oe&&g(x.aoMap.channel),lightMapUv:_e&&g(x.lightMap.channel),bumpMapUv:xe&&g(x.bumpMap.channel),normalMapUv:Ee&&g(x.normalMap.channel),displacementMapUv:Oe&&g(x.displacementMap.channel),emissiveMapUv:Ge&&g(x.emissiveMap.channel),metalnessMapUv:qe&&g(x.metalnessMap.channel),roughnessMapUv:L&&g(x.roughnessMap.channel),anisotropyMapUv:K&&g(x.anisotropyMap.channel),clearcoatMapUv:ue&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:pe&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ne&&g(x.sheenRoughnessMap.channel),specularMapUv:Ie&&g(x.specularMap.channel),specularColorMapUv:De&&g(x.specularColorMap.channel),specularIntensityMapUv:ke&&g(x.specularIntensityMap.channel),transmissionMapUv:st&&g(x.transmissionMap.channel),thicknessMapUv:B&&g(x.thicknessMap.channel),alphaMapUv:ie&&g(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ee||pt),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!z.attributes.uv&&($e||ie),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&Ee===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:be,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&N.length>0,shadowMapType:e.shadowMap.type,toneMapping:ve,decodeVideoTexture:$e&&x.map.isVideoTexture===!0&&it.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:Ge&&x.emissiveMap.isVideoTexture===!0&&it.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ni,flipSided:x.side===kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||de)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ve.vertexUv1s=o.has(1),Ve.vertexUv2s=o.has(2),Ve.vertexUv3s=o.has(3),o.clear(),Ve}function f(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let N in x.defines)T.push(N),T.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(p(T,x),y(T,x),T.push(e.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function y(x,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.retroreflection&&s.enable(24),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),T.packedNormalMap&&s.enable(22),T.vertexNormals&&s.enable(23),x.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),T.numLightProbeGrids>0&&s.enable(22),T.hasPositionAttribute&&s.enable(23),x.push(s.mask)}function E(x){let T=m[x.type],N;if(T){let P=ui[T];N=yp.clone(P.uniforms)}else N=x.uniforms;return N}function _(x,T){let N=c.get(T);return N!==void 0?++N.usedTimes:(N=new Mv(e,T,x,a),h.push(N),c.set(T,N)),N}function S(x){if(--x.usedTimes===0){let T=h.indexOf(x);h[T]=h[h.length-1],h.pop(),c.delete(x.cacheKey),x.destroy()}}function w(x){l.remove(x)}function R(){l.dispose()}return{getParameters:v,getProgramCacheKey:f,getUniforms:E,acquireProgram:_,releaseProgram:S,releaseShaderCache:w,programs:h,dispose:R}}function Rv(){let e=new WeakMap;function t(s){return e.has(s)}function i(s){let l=e.get(s);return l===void 0&&(l={},e.set(s,l)),l}function r(s){e.delete(s)}function a(s,l,o){e.get(s)[l]=o}function n(){e=new WeakMap}return{has:t,get:i,remove:r,update:a,dispose:n}}function Cv(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function _h(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function xh(){let e=[],t=0,i=[],r=[],a=[];function n(){t=0,i.length=0,r.length=0,a.length=0}function s(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function l(u,m,g,v,f,p){let y=e[t];return y===void 0?(y={id:u.id,object:u,geometry:m,material:g,materialVariant:s(u),groupOrder:v,renderOrder:u.renderOrder,z:f,group:p},e[t]=y):(y.id=u.id,y.object=u,y.geometry=m,y.material=g,y.materialVariant=s(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=f,y.group=p),t++,y}function o(u,m,g,v,f,p,y){y.reversedDepth===!0&&(f=-f);let E=l(u,m,g,v,f,p);g.transmission>0?r.push(E):g.transparent===!0?a.push(E):i.push(E)}function h(u,m,g,v,f,p){let y=l(u,m,g,v,f,p);g.transmission>0?r.unshift(y):g.transparent===!0?a.unshift(y):i.unshift(y)}function c(u,m){i.length>1&&i.sort(u||Cv),r.length>1&&r.sort(m||_h),a.length>1&&a.sort(m||_h)}function d(){for(let u=t,m=e.length;u<m;u++){let g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:i,transmissive:r,transparent:a,init:n,push:o,unshift:h,finish:d,sort:c}}function Pv(){let e=new WeakMap;function t(r,a){let n=e.get(r),s;return n===void 0?(s=new xh,e.set(r,[s])):a>=n.length?(s=new xh,n.push(s)):s=n[a],s}function i(){e=new WeakMap}return{get:t,dispose:i}}function Iv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={direction:new C,color:new We};break;case"SpotLight":i={position:new C,direction:new C,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new C,color:new We,distance:0,decay:0};break;case"HemisphereLight":i={direction:new C,skyColor:new We,groundColor:new We};break;case"RectAreaLight":i={color:new We,position:new C,halfWidth:new C,halfHeight:new C};break}return e[t.id]=i,i}}}function Lv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=i,i}}}var Nv=0;function Dv(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Uv(e){let t=new Iv,i=Lv(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new C);let a=new C,n=new Ke,s=new Ke;function l(h){let c=0,d=0,u=0;for(let D=0;D<9;D++)r.probe[D].set(0,0,0);let m=0,g=0,v=0,f=0,p=0,y=0,E=0,_=0,S=0,w=0,R=0,x=0,T=0,N=0;h.sort(Dv);for(let D=0,G=h.length;D<G;D++){let I=h[D],z=I.color,Z=I.intensity,k=I.distance,le=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Qi?le=I.shadow.map.texture:le=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)c+=z.r*Z,d+=z.g*Z,u+=z.b*Z;else if(I.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(I.sh.coefficients[j],Z);N++}else if(I.isSunLight){let j=t.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let q=I.shadow,ee=i.get(I);ee.shadowIntensity=q.intensity,ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),r.sunShadow[g]=ee,r.sunShadowMap[g]=le;let Be=q.getViewportCount();for(let be=0;be<Be;be++)r.sunShadowMatrix[v+be]=q.getMatrix(be),r.sunShadowCascade[v+be]=q._cascadeData[be];v+=Be,g++}r.sun[m]=j,m++}else if(I.isDirectionalLight){let j=t.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let q=I.shadow,ee=i.get(I);ee.shadowIntensity=q.intensity,ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,r.directionalShadow[f]=ee,r.directionalShadowMap[f]=le,r.directionalShadowMatrix[f]=I.shadow.matrix,S++}r.directional[f]=j,f++}else if(I.isSpotLight){let j=t.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(z).multiplyScalar(Z),j.distance=k,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,r.spot[y]=j;let q=I.shadow;if(I.map&&(r.spotLightMap[x]=I.map,x++,q.updateMatrices(I),I.castShadow&&T++),r.spotLightMatrix[y]=q.matrix,I.castShadow){let ee=i.get(I);ee.shadowIntensity=q.intensity,ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,r.spotShadow[y]=ee,r.spotShadowMap[y]=le,R++}y++}else if(I.isRectAreaLight){let j=t.get(I);j.color.copy(z).multiplyScalar(Z),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),r.rectArea[E]=j,E++}else if(I.isPointLight){let j=t.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity),j.distance=I.distance,j.decay=I.decay,I.castShadow){let q=I.shadow,ee=i.get(I);ee.shadowIntensity=q.intensity,ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,ee.shadowCameraNear=q.camera.near,ee.shadowCameraFar=q.camera.far,r.pointShadow[p]=ee,r.pointShadowMap[p]=le,r.pointShadowMatrix[p]=I.shadow.matrix,w++}r.point[p]=j,p++}else if(I.isHemisphereLight){let j=t.get(I);j.skyColor.copy(I.color).multiplyScalar(Z),j.groundColor.copy(I.groundColor).multiplyScalar(Z),r.hemi[_]=j,_++}}E>0&&(e.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=me.LTC_FLOAT_1,r.rectAreaLTC2=me.LTC_FLOAT_2):(r.rectAreaLTC1=me.LTC_HALF_1,r.rectAreaLTC2=me.LTC_HALF_2)),r.ambient[0]=c,r.ambient[1]=d,r.ambient[2]=u;let P=r.hash;(P.sunLength!==m||P.directionalLength!==f||P.pointLength!==p||P.spotLength!==y||P.rectAreaLength!==E||P.hemiLength!==_||P.numSunShadows!==g||P.numDirectionalShadows!==S||P.numPointShadows!==w||P.numSpotShadows!==R||P.numSpotMaps!==x||P.numLightProbes!==N)&&(r.sun.length=m,r.directional.length=f,r.spot.length=y,r.rectArea.length=E,r.point.length=p,r.hemi.length=_,r.sunShadow.length=g,r.sunShadowMap.length=g,r.sunShadowMatrix.length=v,r.sunShadowCascade.length=v,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.directionalShadowMatrix.length=S,r.pointShadow.length=w,r.pointShadowMap.length=w,r.pointShadowMatrix.length=w,r.spotShadow.length=R,r.spotShadowMap.length=R,r.spotLightMatrix.length=R+x-T,r.spotLightMap.length=x,r.numSpotLightShadowsWithMaps=T,r.numLightProbes=N,P.sunLength=m,P.directionalLength=f,P.pointLength=p,P.spotLength=y,P.rectAreaLength=E,P.hemiLength=_,P.numSunShadows=g,P.numDirectionalShadows=S,P.numPointShadows=w,P.numSpotShadows=R,P.numSpotMaps=x,P.numLightProbes=N,r.version=Nv++)}function o(h,c){let d=0,u=0,m=0,g=0,v=0,f=0,p=c.matrixWorldInverse;for(let y=0,E=h.length;y<E;y++){let _=h[y];if(_.isSunLight){let S=r.sun[d];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(p),d++}else if(_.isDirectionalLight){let S=r.directional[u];S.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),u++}else if(_.isSpotLight){let S=r.spot[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),g++}else if(_.isRectAreaLight){let S=r.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),s.identity(),n.copy(_.matrixWorld),n.premultiply(p),s.extractRotation(n),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),v++}else if(_.isPointLight){let S=r.point[m];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),m++}else if(_.isHemisphereLight){let S=r.hemi[f];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(p),f++}}}return{setup:l,setupView:o,state:r}}function yh(e){let t=new Uv(e),i=[],r=[],a=[];function n(u){d.camera=u,i.length=0,r.length=0,a.length=0}function s(u){i.push(u)}function l(u){r.push(u)}function o(u){a.push(u)}function h(){t.setup(i)}function c(u){t.setupView(i,u)}let d={lightsArray:i,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:d,setupLights:h,setupLightsView:c,pushLight:s,pushShadow:l,pushLightProbeGrid:o}}function Ov(e){let t=new WeakMap;function i(a,n=0){let s=t.get(a),l;return s===void 0?(l=new yh(e),t.set(a,[l])):n>=s.length?(l=new yh(e),s.push(l)):l=s[n],l}function r(){t=new WeakMap}return{get:i,dispose:r}}var Bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,zv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Vv=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Sh=new Ke,ia=new C,Rs=new C;function Hv(e,t,i){let r=new Vr,a=new Q,n=new Q,s=new at,l=new Ep,o=new wp,h={},c=i.maxTextureSize,d={[Ki]:kt,[kt]:Ki,[ni]:ni},u=new Gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:Bv,fragmentShader:Fv}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let g=new mt;g.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Pt(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hn;let p=this.type;this.render=function(w,R,x){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;this.type===du&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=hn);let T=e.getRenderTarget(),N=e.getActiveCubeFace(),P=e.getActiveMipmapLevel(),D=e.state;D.setBlending(Ei),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let G=p!==this.type;G&&R.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=w.length;I<z;I++){let Z=w[I],k=Z.shadow;if(k===void 0){Ue("WebGLShadowMap:",Z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;a.copy(k.mapSize);let le=k.getFrameExtents();a.multiply(le),n.copy(k.mapSize),(a.x>c||a.y>c)&&(a.x>c&&(n.x=Math.floor(c/le.x),a.x=n.x*le.x,k.mapSize.x=n.x),a.y>c&&(n.y=Math.floor(c/le.y),a.y=n.y*le.y,k.mapSize.y=n.y));let j=e.state.buffers.depth.getReversed();if(k.camera._reversedDepth=j,k.map===null||G===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ra){if(Z.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Vt(a.x,a.y,{format:Qi,type:zt,minFilter:ht,magFilter:ht,generateMipmaps:!1}),k.map.texture.name=Z.name+".shadowMap",k.map.depthTexture=new pa(a.x,a.y,ei),k.map.depthTexture.name=Z.name+".shadowMapDepth",k.map.depthTexture.format=Ai,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct}else Z.isPointLight?(k.map=new Uc(a.x),k.map.depthTexture=new bd(a.x,pi)):(k.map=new Vt(a.x,a.y),k.map.depthTexture=new pa(a.x,a.y,pi)),k.map.depthTexture.name=Z.name+".shadowMap",k.map.depthTexture.format=Ai,this.type===hn?(k.map.depthTexture.compareFunction=j?Co:Ro,k.map.depthTexture.minFilter=ht,k.map.depthTexture.magFilter=ht):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ct,k.map.depthTexture.magFilter=Ct);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==a.x||k.map.height!==a.y)&&k.map.setSize(a.x,a.y);let q=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();Z.isPointLight!==!0&&k.updateMatrices(Z,x);for(let ee=0;ee<q;ee++){let Be=k.getCamera(ee);if(Z.isPointLight){let be=k.camera,nt=k.matrix,Xe=Z.distance||be.far;Xe!==be.far&&(be.far=Xe,be.updateProjectionMatrix()),ia.setFromMatrixPosition(Z.matrixWorld),be.position.copy(ia),Rs.copy(be.position),Rs.add(zv[ee]),be.up.copy(Vv[ee]),be.lookAt(Rs),be.updateMatrixWorld(),nt.makeTranslation(-ia.x,-ia.y,-ia.z),Sh.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Sh,be.coordinateSystem,be.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)e.setRenderTarget(k.map,ee),e.clear();else{ee===0&&(e.setRenderTarget(k.map),e.clear());let be=k.getViewport(ee);s.set(n.x*be.x,n.y*be.y,n.x*be.z,n.y*be.w),D.viewport(s)}r=k.getFrustum(ee),_(R,x,Be,Z,this.type)}k.isPointLightShadow!==!0&&this.type===ra&&y(k,x),k.needsUpdate=!1}p=this.type,f.needsUpdate=!1,e.setRenderTarget(T,N,P)};function y(w,R){let x=t.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null?w.mapPass=new Vt(a.x,a.y,{format:Qi,type:zt}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,e.setRenderTarget(w.mapPass),e.clear(),e.renderBufferDirect(R,null,x,u,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value.set(w.map.width,w.map.height),m.uniforms.radius.value=w.radius,e.setRenderTarget(w.map),e.clear(),e.renderBufferDirect(R,null,x,m,v,null)}function E(w,R,x,T){let N=null,P=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)N=P;else if(N=x.isPointLight===!0?o:l,e.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let D=N.uuid,G=R.uuid,I=h[D];I===void 0&&(I={},h[D]=I);let z=I[G];z===void 0&&(z=N.clone(),I[G]=z,R.addEventListener("dispose",S)),N=z}if(N.visible=R.visible,N.wireframe=R.wireframe,T===ra?N.side=R.shadowSide!==null?R.shadowSide:R.side:N.side=R.shadowSide!==null?R.shadowSide:d[R.side],N.alphaMap=R.alphaMap,N.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,N.map=R.map,N.clipShadows=R.clipShadows,N.clippingPlanes=R.clippingPlanes,N.clipIntersection=R.clipIntersection,N.displacementMap=R.displacementMap,N.displacementScale=R.displacementScale,N.displacementBias=R.displacementBias,N.wireframeLinewidth=R.wireframeLinewidth,N.linewidth=R.linewidth,x.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let D=e.properties.get(N);D.light=x}return N}function _(w,R,x,T,N){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===ra)&&(!w.frustumCulled||w.intersectsFrustum(r))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);let D=t.update(w),G=w.material;if(Array.isArray(G)){let I=D.groups;for(let z=0,Z=I.length;z<Z;z++){let k=I[z],le=G[k.materialIndex];if(le&&le.visible){let j=E(w,le,T,N);w.onBeforeShadow(e,w,R,x,D,j,k),e.renderBufferDirect(x,null,D,j,w,k),w.onAfterShadow(e,w,R,x,D,j,k)}}}else if(G.visible){let I=E(w,G,T,N);w.onBeforeShadow(e,w,R,x,D,I,null),e.renderBufferDirect(x,null,D,I,w,null),w.onAfterShadow(e,w,R,x,D,I,null)}}let P=w.children;for(let D=0,G=P.length;D<G;D++)_(P[D],R,x,T,N)}function S(w){w.target.removeEventListener("dispose",S);for(let R in h){let x=h[R],T=w.target.uuid;T in x&&(x[T].dispose(),delete x[T])}}}function kv(e,t){function i(){let B=!1,J=new at,ie=null,ye=new at(0,0,0,0);return{setMask:function(we){ie!==we&&!B&&(e.colorMask(we,we,we,we),ie=we)},setLocked:function(we){B=we},setClear:function(we,ae,ve,Ve,Tt){Tt===!0&&(we*=Ve,ae*=Ve,ve*=Ve),J.set(we,ae,ve,Ve),ye.equals(J)===!1&&(e.clearColor(we,ae,ve,Ve),ye.copy(J))},reset:function(){B=!1,ie=null,ye.set(-1,0,0,0)}}}function r(){let B=!1,J=!1,ie=null,ye=null,we=null;return{setReversed:function(ae){if(J!==ae){let ve=t.get("EXT_clip_control");ae?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),J=ae;let Ve=we;we=null,this.setClear(Ve)}},getReversed:function(){return J},setTest:function(ae){ae?se(e.DEPTH_TEST):Ce(e.DEPTH_TEST)},setMask:function(ae){ie!==ae&&!B&&(e.depthMask(ae),ie=ae)},setFunc:function(ae){if(J&&(ae=Yu[ae]),ye!==ae){switch(ae){case Cs:e.depthFunc(e.NEVER);break;case Ps:e.depthFunc(e.ALWAYS);break;case Is:e.depthFunc(e.LESS);break;case ha:e.depthFunc(e.LEQUAL);break;case Ls:e.depthFunc(e.EQUAL);break;case Ns:e.depthFunc(e.GEQUAL);break;case Ds:e.depthFunc(e.GREATER);break;case Us:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}ye=ae}},setLocked:function(ae){B=ae},setClear:function(ae){we!==ae&&(we=ae,J&&(ae=1-ae),e.clearDepth(ae))},reset:function(){B=!1,ie=null,ye=null,we=null,J=!1}}}function a(){let B=!1,J=null,ie=null,ye=null,we=null,ae=null,ve=null,Ve=null,Tt=null;return{setTest:function(ot){B||(ot?se(e.STENCIL_TEST):Ce(e.STENCIL_TEST))},setMask:function(ot){J!==ot&&!B&&(e.stencilMask(ot),J=ot)},setFunc:function(ot,oi,gi){(ie!==ot||ye!==oi||we!==gi)&&(e.stencilFunc(ot,oi,gi),ie=ot,ye=oi,we=gi)},setOp:function(ot,oi,gi){(ae!==ot||ve!==oi||Ve!==gi)&&(e.stencilOp(ot,oi,gi),ae=ot,ve=oi,Ve=gi)},setLocked:function(ot){B=ot},setClear:function(ot){Tt!==ot&&(e.clearStencil(ot),Tt=ot)},reset:function(){B=!1,J=null,ie=null,ye=null,we=null,ae=null,ve=null,Ve=null,Tt=null}}}let n=new i,s=new r,l=new a,o=new WeakMap,h=new WeakMap,c={},d={},u={},m=new WeakMap,g=[],v=null,f=!1,p=null,y=null,E=null,_=null,S=null,w=null,R=null,x=new We(0,0,0),T=0,N=!1,P=null,D=null,G=null,I=null,z=null,Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,le=0,j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=le>=1):j.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=le>=2);let q=null,ee={},Be=e.getParameter(e.SCISSOR_BOX),be=e.getParameter(e.VIEWPORT),nt=new at().fromArray(Be),Xe=new at().fromArray(be);function Y(B,J,ie,ye){let we=new Uint8Array(4),ae=e.createTexture();e.bindTexture(B,ae),e.texParameteri(B,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(B,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let ve=0;ve<ie;ve++)B===e.TEXTURE_3D||B===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,ye,0,e.RGBA,e.UNSIGNED_BYTE,we):e.texImage2D(J+ve,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,we);return ae}let re={};re[e.TEXTURE_2D]=Y(e.TEXTURE_2D,e.TEXTURE_2D,1),re[e.TEXTURE_CUBE_MAP]=Y(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[e.TEXTURE_2D_ARRAY]=Y(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),re[e.TEXTURE_3D]=Y(e.TEXTURE_3D,e.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),l.setClear(0),se(e.DEPTH_TEST),s.setFunc(ha),xe(!1),Ee(ll),se(e.CULL_FACE),oe(Ei);function se(B){c[B]!==!0&&(e.enable(B),c[B]=!0)}function Ce(B){c[B]!==!1&&(e.disable(B),c[B]=!1)}function Fe(B,J){return u[B]!==J?(e.bindFramebuffer(B,J),u[B]=J,B===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=J),B===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=J),!0):!1}function de(B,J){let ie=g,ye=!1;if(B){ie=m.get(J),ie===void 0&&(ie=[],m.set(J,ie));let we=B.textures;if(ie.length!==we.length||ie[0]!==e.COLOR_ATTACHMENT0){for(let ae=0,ve=we.length;ae<ve;ae++)ie[ae]=e.COLOR_ATTACHMENT0+ae;ie.length=we.length,ye=!0}}else ie[0]!==e.BACK&&(ie[0]=e.BACK,ye=!0);ye&&e.drawBuffers(ie)}function $e(B){return v!==B?(e.useProgram(B),v=B,!0):!1}let te={[Er]:e.FUNC_ADD,[mu]:e.FUNC_SUBTRACT,[fu]:e.FUNC_REVERSE_SUBTRACT};te[gu]=e.MIN,te[vu]=e.MAX;let $={[_u]:e.ZERO,[xu]:e.ONE,[yu]:e.SRC_COLOR,[Mh]:e.SRC_ALPHA,[wu]:e.SRC_ALPHA_SATURATE,[Tu]:e.DST_COLOR,[Mu]:e.DST_ALPHA,[Su]:e.ONE_MINUS_SRC_COLOR,[bh]:e.ONE_MINUS_SRC_ALPHA,[Eu]:e.ONE_MINUS_DST_COLOR,[bu]:e.ONE_MINUS_DST_ALPHA,[Au]:e.CONSTANT_COLOR,[Ru]:e.ONE_MINUS_CONSTANT_COLOR,[Cu]:e.CONSTANT_ALPHA,[Pu]:e.ONE_MINUS_CONSTANT_ALPHA};function oe(B,J,ie,ye,we,ae,ve,Ve,Tt,ot){if(B===Ei){f===!0&&(Ce(e.BLEND),f=!1);return}if(f===!1&&(se(e.BLEND),f=!0),B!==pu){if(B!==p||ot!==N){if((y!==Er||S!==Er)&&(e.blendEquation(e.FUNC_ADD),y=Er,S=Er),ot)switch(B){case sa:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case hl:e.blendFunc(e.ONE,e.ONE);break;case cl:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ul:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:He("WebGLState: Invalid blending: ",B);break}else switch(B){case sa:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case hl:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case cl:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ul:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",B);break}E=null,_=null,w=null,R=null,x.set(0,0,0),T=0,p=B,N=ot}return}we=we||J,ae=ae||ie,ve=ve||ye,(J!==y||we!==S)&&(e.blendEquationSeparate(te[J],te[we]),y=J,S=we),(ie!==E||ye!==_||ae!==w||ve!==R)&&(e.blendFuncSeparate($[ie],$[ye],$[ae],$[ve]),E=ie,_=ye,w=ae,R=ve),(Ve.equals(x)===!1||Tt!==T)&&(e.blendColor(Ve.r,Ve.g,Ve.b,Tt),x.copy(Ve),T=Tt),p=B,N=!1}function _e(B,J){B.side===ni?Ce(e.CULL_FACE):se(e.CULL_FACE);let ie=B.side===kt;J&&(ie=!ie),xe(ie),B.blending===sa&&B.transparent===!1?oe(Ei):oe(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),s.setFunc(B.depthFunc),s.setTest(B.depthTest),s.setMask(B.depthWrite),n.setMask(B.colorWrite);let ye=B.stencilWrite;l.setTest(ye),ye&&(l.setMask(B.stencilWriteMask),l.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),l.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Ge(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):Ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(B){P!==B&&(B?e.frontFace(e.CW):e.frontFace(e.CCW),P=B)}function Ee(B){B!==cu?(se(e.CULL_FACE),B!==D&&(B===ll?e.cullFace(e.BACK):B===uu?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Ce(e.CULL_FACE),D=B}function Oe(B){B!==G&&(k&&e.lineWidth(B),G=B)}function Ge(B,J,ie){B?(se(e.POLYGON_OFFSET_FILL),(I!==J||z!==ie)&&(I=J,z=ie,s.getReversed()&&(J=-J),e.polygonOffset(J,ie))):Ce(e.POLYGON_OFFSET_FILL)}function qe(B){B?se(e.SCISSOR_TEST):Ce(e.SCISSOR_TEST)}function L(B){B===void 0&&(B=e.TEXTURE0+Z-1),q!==B&&(e.activeTexture(B),q=B)}function pt(B,J,ie){ie===void 0&&(q===null?ie=e.TEXTURE0+Z-1:ie=q);let ye=ee[ie];ye===void 0&&(ye={type:void 0,texture:void 0},ee[ie]=ye),(ye.type!==B||ye.texture!==J)&&(q!==ie&&(e.activeTexture(ie),q=ie),e.bindTexture(B,J||re[B]),ye.type=B,ye.texture=J)}function tt(){let B=ee[q];B!==void 0&&B.type!==void 0&&(e.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Qe(){try{e.compressedTexImage2D(...arguments)}catch(B){He("WebGLState:",B)}}function A(){try{e.compressedTexImage3D(...arguments)}catch(B){He("WebGLState:",B)}}function M(){try{e.texSubImage2D(...arguments)}catch(B){He("WebGLState:",B)}}function U(){try{e.texSubImage3D(...arguments)}catch(B){He("WebGLState:",B)}}function W(){try{e.compressedTexSubImage2D(...arguments)}catch(B){He("WebGLState:",B)}}function K(){try{e.compressedTexSubImage3D(...arguments)}catch(B){He("WebGLState:",B)}}function ue(){try{e.texStorage2D(...arguments)}catch(B){He("WebGLState:",B)}}function pe(){try{e.texStorage3D(...arguments)}catch(B){He("WebGLState:",B)}}function F(){try{e.texImage2D(...arguments)}catch(B){He("WebGLState:",B)}}function he(){try{e.texImage3D(...arguments)}catch(B){He("WebGLState:",B)}}function fe(B){return d[B]!==void 0?d[B]:e.getParameter(B)}function Te(B,J){d[B]!==J&&(e.pixelStorei(B,J),d[B]=J)}function ne(B){nt.equals(B)===!1&&(e.scissor(B.x,B.y,B.z,B.w),nt.copy(B))}function Ie(B){Xe.equals(B)===!1&&(e.viewport(B.x,B.y,B.z,B.w),Xe.copy(B))}function De(B,J){let ie=h.get(J);ie===void 0&&(ie=new WeakMap,h.set(J,ie));let ye=ie.get(B);ye===void 0&&(ye=e.getUniformBlockIndex(J,B.name),ie.set(B,ye))}function ke(B,J){let ie=h.get(J).get(B);o.get(J)!==ie&&(e.uniformBlockBinding(J,ie,B.__bindingPointIndex),o.set(J,ie))}function st(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),s.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),c={},d={},q=null,ee={},u={},m=new WeakMap,g=[],v=null,f=!1,p=null,y=null,E=null,_=null,S=null,w=null,R=null,x=new We(0,0,0),T=0,N=!1,P=null,D=null,G=null,I=null,z=null,nt.set(0,0,e.canvas.width,e.canvas.height),Xe.set(0,0,e.canvas.width,e.canvas.height),n.reset(),s.reset(),l.reset()}return{buffers:{color:n,depth:s,stencil:l},enable:se,disable:Ce,bindFramebuffer:Fe,drawBuffers:de,useProgram:$e,setBlending:oe,setMaterial:_e,setFlipSided:xe,setCullFace:Ee,setLineWidth:Oe,setPolygonOffset:Ge,setScissorTest:qe,activeTexture:L,bindTexture:pt,unbindTexture:tt,compressedTexImage2D:Qe,compressedTexImage3D:A,texImage2D:F,texImage3D:he,pixelStorei:Te,getParameter:fe,updateUBOMapping:De,uniformBlockBinding:ke,texStorage2D:ue,texStorage3D:pe,texSubImage2D:M,texSubImage3D:U,compressedTexSubImage2D:W,compressedTexSubImage3D:K,scissor:ne,viewport:Ie,reset:st}}function Gv(e,t,i,r,a,n,s){let l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Q,c=new WeakMap,d=new Set,u,m=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,M){return g?new OffscreenCanvas(A,M):Mn("canvas")}function f(A,M,U){let W=1,K=Qe(A);if((K.width>U||K.height>U)&&(W=U/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ue=Math.floor(W*K.width),pe=Math.floor(W*K.height);u===void 0&&(u=v(ue,pe));let F=M?v(ue,pe):u;return F.width=ue,F.height=pe,F.getContext("2d").drawImage(A,0,0,ue,pe),Ue("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ue+"x"+pe+")."),F}else return"data"in A&&Ue("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function p(A){return A.generateMipmaps}function y(A){e.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(A,M,U,W,K,ue=!1){if(A!==null){if(e[A]!==void 0)return e[A];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let pe;W&&(pe=t.get("EXT_texture_norm16"),pe||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let F=M;if(M===e.RED&&(U===e.FLOAT&&(F=e.R32F),U===e.HALF_FLOAT&&(F=e.R16F),U===e.UNSIGNED_BYTE&&(F=e.R8),U===e.UNSIGNED_SHORT&&pe&&(F=pe.R16_EXT),U===e.SHORT&&pe&&(F=pe.R16_SNORM_EXT)),M===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(F=e.R8UI),U===e.UNSIGNED_SHORT&&(F=e.R16UI),U===e.UNSIGNED_INT&&(F=e.R32UI),U===e.BYTE&&(F=e.R8I),U===e.SHORT&&(F=e.R16I),U===e.INT&&(F=e.R32I)),M===e.RG&&(U===e.FLOAT&&(F=e.RG32F),U===e.HALF_FLOAT&&(F=e.RG16F),U===e.UNSIGNED_BYTE&&(F=e.RG8),U===e.UNSIGNED_SHORT&&pe&&(F=pe.RG16_EXT),U===e.SHORT&&pe&&(F=pe.RG16_SNORM_EXT)),M===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(F=e.RG8UI),U===e.UNSIGNED_SHORT&&(F=e.RG16UI),U===e.UNSIGNED_INT&&(F=e.RG32UI),U===e.BYTE&&(F=e.RG8I),U===e.SHORT&&(F=e.RG16I),U===e.INT&&(F=e.RG32I)),M===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(F=e.RGB8UI),U===e.UNSIGNED_SHORT&&(F=e.RGB16UI),U===e.UNSIGNED_INT&&(F=e.RGB32UI),U===e.BYTE&&(F=e.RGB8I),U===e.SHORT&&(F=e.RGB16I),U===e.INT&&(F=e.RGB32I)),M===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(F=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(F=e.RGBA16UI),U===e.UNSIGNED_INT&&(F=e.RGBA32UI),U===e.BYTE&&(F=e.RGBA8I),U===e.SHORT&&(F=e.RGBA16I),U===e.INT&&(F=e.RGBA32I)),M===e.RGB&&(U===e.UNSIGNED_SHORT&&pe&&(F=pe.RGB16_EXT),U===e.SHORT&&pe&&(F=pe.RGB16_SNORM_EXT),U===e.UNSIGNED_INT_5_9_9_9_REV&&(F=e.RGB9_E5),U===e.UNSIGNED_INT_10F_11F_11F_REV&&(F=e.R11F_G11F_B10F)),M===e.RGBA){let he=ue?Sn:it.getTransfer(K);U===e.FLOAT&&(F=e.RGBA32F),U===e.HALF_FLOAT&&(F=e.RGBA16F),U===e.UNSIGNED_BYTE&&(F=he===lt?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT&&pe&&(F=pe.RGBA16_EXT),U===e.SHORT&&pe&&(F=pe.RGBA16_SNORM_EXT),U===e.UNSIGNED_SHORT_4_4_4_4&&(F=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(F=e.RGB5_A1)}return(F===e.R16F||F===e.R32F||F===e.RG16F||F===e.RG32F||F===e.RGBA16F||F===e.RGBA32F)&&t.get("EXT_color_buffer_float"),F}function S(A,M){let U;return A?M===null||M===pi||M===ua?U=e.DEPTH24_STENCIL8:M===ei?U=e.DEPTH32F_STENCIL8:M===ca&&(U=e.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===pi||M===ua?U=e.DEPTH_COMPONENT24:M===ei?U=e.DEPTH_COMPONENT32F:M===ca&&(U=e.DEPTH_COMPONENT16),U}function w(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ct&&A.minFilter!==ht?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function R(A){let M=A.target;M.removeEventListener("dispose",R),T(M),M.isVideoTexture&&c.delete(M),M.isHTMLTexture&&d.delete(M)}function x(A){let M=A.target;M.removeEventListener("dispose",x),P(M)}function T(A){let M=r.get(A);if(M.__webglInit===void 0)return;let U=A.source,W=m.get(U);if(W){let K=W[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&N(A),Object.keys(W).length===0&&m.delete(U)}r.remove(A)}function N(A){let M=r.get(A);e.deleteTexture(M.__webglTexture);let U=A.source,W=m.get(U);delete W[M.__cacheKey],s.memory.textures--}function P(A){let M=r.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),r.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(M.__webglFramebuffer[W]))for(let K=0;K<M.__webglFramebuffer[W].length;K++)e.deleteFramebuffer(M.__webglFramebuffer[W][K]);else e.deleteFramebuffer(M.__webglFramebuffer[W]);M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer[W])}else{if(Array.isArray(M.__webglFramebuffer))for(let W=0;W<M.__webglFramebuffer.length;W++)e.deleteFramebuffer(M.__webglFramebuffer[W]);else e.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&e.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let W=0;W<M.__webglColorRenderbuffer.length;W++)M.__webglColorRenderbuffer[W]&&e.deleteRenderbuffer(M.__webglColorRenderbuffer[W]);M.__webglDepthRenderbuffer&&e.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let U=A.textures;for(let W=0,K=U.length;W<K;W++){let ue=r.get(U[W]);ue.__webglTexture&&(e.deleteTexture(ue.__webglTexture),s.memory.textures--),r.remove(U[W])}r.remove(A)}let D=0;function G(){D=0}function I(){return D}function z(A){D=A}function Z(){let A=D;return A>=a.maxTextures&&Ue("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+a.maxTextures),D+=1,A}function k(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function le(A,M){let U=r.get(A);if(A.isVideoTexture&&pt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&U.__version!==A.version){let W=A.image;if(W===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(U,A,M);return}}else A.isExternalTexture&&(U.__webglTexture=A.sourceTexture?A.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+M)}function j(A,M){let U=r.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){Ce(U,A,M);return}else A.isExternalTexture&&(U.__webglTexture=A.sourceTexture?A.sourceTexture:null);i.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+M)}function q(A,M){let U=r.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){Ce(U,A,M);return}i.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+M)}function ee(A,M){let U=r.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&U.__version!==A.version){Fe(U,A,M);return}i.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+M)}let Be={[Os]:e.REPEAT,[Ut]:e.CLAMP_TO_EDGE,[Bs]:e.MIRRORED_REPEAT},be={[Ct]:e.NEAREST,[Nu]:e.NEAREST_MIPMAP_NEAREST,[Ia]:e.NEAREST_MIPMAP_LINEAR,[ht]:e.LINEAR,[jn]:e.LINEAR_MIPMAP_NEAREST,[Qt]:e.LINEAR_MIPMAP_LINEAR},nt={[Bu]:e.NEVER,[ku]:e.ALWAYS,[Fu]:e.LESS,[Ro]:e.LEQUAL,[zu]:e.EQUAL,[Co]:e.GEQUAL,[Vu]:e.GREATER,[Hu]:e.NOTEQUAL};function Xe(A,M){if(M.type===ei&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===ht||M.magFilter===jn||M.magFilter===Ia||M.magFilter===Qt||M.minFilter===ht||M.minFilter===jn||M.minFilter===Ia||M.minFilter===Qt)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,Be[M.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,Be[M.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,Be[M.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,be[M.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,be[M.minFilter]),M.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,nt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ct||M.minFilter!==Ia&&M.minFilter!==Qt||M.type===ei&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function Y(A,M){let U=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",R));let W=M.source,K=m.get(W);K===void 0&&(K={},m.set(W,K));let ue=k(M);if(ue!==A.__cacheKey){K[ue]===void 0&&(K[ue]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,U=!0),K[ue].usedTimes++;let pe=K[A.__cacheKey];pe!==void 0&&(K[A.__cacheKey].usedTimes--,pe.usedTimes===0&&N(M)),A.__cacheKey=ue,A.__webglTexture=K[ue].texture}return U}function re(A,M,U){return Math.floor(Math.floor(A/U)/M)}function se(A,M,U,W){let K=A.updateRanges;if(K.length===0)i.texSubImage2D(e.TEXTURE_2D,0,0,0,M.width,M.height,U,W,M.data);else{K.sort((fe,Te)=>fe.start-Te.start);let ue=0;for(let fe=1;fe<K.length;fe++){let Te=K[ue],ne=K[fe],Ie=Te.start+Te.count,De=re(ne.start,M.width,4),ke=re(Te.start,M.width,4);ne.start<=Ie+1&&De===ke&&re(ne.start+ne.count-1,M.width,4)===De?Te.count=Math.max(Te.count,ne.start+ne.count-Te.start):(++ue,K[ue]=ne)}K.length=ue+1;let pe=i.getParameter(e.UNPACK_ROW_LENGTH),F=i.getParameter(e.UNPACK_SKIP_PIXELS),he=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,M.width);for(let fe=0,Te=K.length;fe<Te;fe++){let ne=K[fe],Ie=Math.floor(ne.start/4),De=Math.ceil(ne.count/4),ke=Ie%M.width,st=Math.floor(Ie/M.width),B=De;i.pixelStorei(e.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(e.UNPACK_SKIP_ROWS,st),i.texSubImage2D(e.TEXTURE_2D,0,ke,st,B,1,U,W,M.data)}A.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,pe),i.pixelStorei(e.UNPACK_SKIP_PIXELS,F),i.pixelStorei(e.UNPACK_SKIP_ROWS,he)}}function Ce(A,M,U){let W=e.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(W=e.TEXTURE_2D_ARRAY),M.isData3DTexture&&(W=e.TEXTURE_3D);let K=Y(A,M),ue=M.source;i.bindTexture(W,A.__webglTexture,e.TEXTURE0+U);let pe=r.get(ue);if(ue.version!==pe.__version||K===!0){if(i.activeTexture(e.TEXTURE0+U),!(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)){let J=it.getPrimaries(it.workingColorSpace),ie=M.colorSpace===Zt?null:it.getPrimaries(M.colorSpace),ye=M.colorSpace===Zt||J===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}i.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment);let F=f(M.image,!1,a.maxTextureSize);F=tt(M,F);let he=n.convert(M.format,M.colorSpace),fe=n.convert(M.type),Te=_(M.internalFormat,he,fe,M.normalized,M.colorSpace,M.isVideoTexture);Xe(W,M);let ne,Ie=M.mipmaps,De=M.isVideoTexture!==!0,ke=pe.__version===void 0||K===!0,st=ue.dataReady,B=w(M,F);if(M.isDepthTexture)Te=S(M.format===Yi,M.type),ke&&(De?i.texStorage2D(e.TEXTURE_2D,1,Te,F.width,F.height):i.texImage2D(e.TEXTURE_2D,0,Te,F.width,F.height,0,he,fe,null));else if(M.isDataTexture)if(Ie.length>0){De&&ke&&i.texStorage2D(e.TEXTURE_2D,B,Te,Ie[0].width,Ie[0].height);for(let J=0,ie=Ie.length;J<ie;J++)ne=Ie[J],De?st&&i.texSubImage2D(e.TEXTURE_2D,J,0,0,ne.width,ne.height,he,fe,ne.data):i.texImage2D(e.TEXTURE_2D,J,Te,ne.width,ne.height,0,he,fe,ne.data);M.generateMipmaps=!1}else De?(ke&&i.texStorage2D(e.TEXTURE_2D,B,Te,F.width,F.height),st&&se(M,F,he,fe)):i.texImage2D(e.TEXTURE_2D,0,Te,F.width,F.height,0,he,fe,F.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){De&&ke&&i.texStorage3D(e.TEXTURE_2D_ARRAY,B,Te,Ie[0].width,Ie[0].height,F.depth);for(let J=0,ie=Ie.length;J<ie;J++)if(ne=Ie[J],M.format!==Ot)if(he!==null)if(De){if(st)if(M.layerUpdates.size>0){let ye=eh(ne.width,ne.height,M.format,M.type);for(let we of M.layerUpdates){let ae=ne.data.subarray(we*ye/ne.data.BYTES_PER_ELEMENT,(we+1)*ye/ne.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,we,ne.width,ne.height,1,he,ae)}}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ne.width,ne.height,F.depth,he,ne.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,Te,ne.width,ne.height,F.depth,0,ne.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?st&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ne.width,ne.height,F.depth,he,fe,ne.data):i.texImage3D(e.TEXTURE_2D_ARRAY,J,Te,ne.width,ne.height,F.depth,0,he,fe,ne.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{De&&ke&&i.texStorage2D(e.TEXTURE_2D,B,Te,Ie[0].width,Ie[0].height);for(let J=0,ie=Ie.length;J<ie;J++)ne=Ie[J],M.format!==Ot?he!==null?De?st&&i.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ne.width,ne.height,he,ne.data):i.compressedTexImage2D(e.TEXTURE_2D,J,Te,ne.width,ne.height,0,ne.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?st&&i.texSubImage2D(e.TEXTURE_2D,J,0,0,ne.width,ne.height,he,fe,ne.data):i.texImage2D(e.TEXTURE_2D,J,Te,ne.width,ne.height,0,he,fe,ne.data)}else if(M.isDataArrayTexture)if(De){if(ke&&i.texStorage3D(e.TEXTURE_2D_ARRAY,B,Te,F.width,F.height,F.depth),st)if(M.layerUpdates.size>0){let J=eh(F.width,F.height,M.format,M.type);for(let ie of M.layerUpdates){let ye=F.data.subarray(ie*J/F.data.BYTES_PER_ELEMENT,(ie+1)*J/F.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ie,F.width,F.height,1,he,fe,ye)}M.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,he,fe,F.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,Te,F.width,F.height,F.depth,0,he,fe,F.data);else if(M.isData3DTexture)De?(ke&&i.texStorage3D(e.TEXTURE_3D,B,Te,F.width,F.height,F.depth),st&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,he,fe,F.data)):i.texImage3D(e.TEXTURE_3D,0,Te,F.width,F.height,F.depth,0,he,fe,F.data);else if(M.isFramebufferTexture){if(ke)if(De)i.texStorage2D(e.TEXTURE_2D,B,Te,F.width,F.height);else{let J=F.width,ie=F.height;for(let ye=0;ye<B;ye++)i.texImage2D(e.TEXTURE_2D,ye,Te,J,ie,0,he,fe,null),J>>=1,ie>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in e){let J=e.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),F.parentNode!==J){J.appendChild(F),d.add(M),J.onpaint=ie=>{let ye=ie.changedElements;for(let we of d)ye.includes(we.image)&&(we.needsUpdate=!0)},J.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,F);else{let ie=e.RGBA,ye=e.RGBA,we=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,ie,ye,we,F)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(De&&ke){let J=Qe(Ie[0]);i.texStorage2D(e.TEXTURE_2D,B,Te,J.width,J.height)}for(let J=0,ie=Ie.length;J<ie;J++)ne=Ie[J],De?st&&i.texSubImage2D(e.TEXTURE_2D,J,0,0,he,fe,ne):i.texImage2D(e.TEXTURE_2D,J,Te,he,fe,ne);M.generateMipmaps=!1}else if(De){if(ke){let J=Qe(F);i.texStorage2D(e.TEXTURE_2D,B,Te,J.width,J.height)}st&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,he,fe,F)}else i.texImage2D(e.TEXTURE_2D,0,Te,he,fe,F);p(M)&&y(W),pe.__version=ue.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Fe(A,M,U){if(M.image.length!==6)return;let W=Y(A,M),K=M.source;i.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+U);let ue=r.get(K);if(K.version!==ue.__version||W===!0){i.activeTexture(e.TEXTURE0+U);let pe=it.getPrimaries(it.workingColorSpace),F=M.colorSpace===Zt?null:it.getPrimaries(M.colorSpace),he=M.colorSpace===Zt||pe===F?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let fe=M.isCompressedTexture||M.image[0].isCompressedTexture,Te=M.image[0]&&M.image[0].isDataTexture,ne=[];for(let ae=0;ae<6;ae++)!fe&&!Te?ne[ae]=f(M.image[ae],!0,a.maxCubemapSize):ne[ae]=Te?M.image[ae].image:M.image[ae],ne[ae]=tt(M,ne[ae]);let Ie=ne[0],De=n.convert(M.format,M.colorSpace),ke=n.convert(M.type),st=_(M.internalFormat,De,ke,M.normalized,M.colorSpace),B=M.isVideoTexture!==!0,J=ue.__version===void 0||W===!0,ie=K.dataReady,ye=w(M,Ie);Xe(e.TEXTURE_CUBE_MAP,M);let we;if(fe){B&&J&&i.texStorage2D(e.TEXTURE_CUBE_MAP,ye,st,Ie.width,Ie.height);for(let ae=0;ae<6;ae++){we=ne[ae].mipmaps;for(let ve=0;ve<we.length;ve++){let Ve=we[ve];M.format!==Ot?De!==null?B?ie&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,0,0,Ve.width,Ve.height,De,Ve.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,st,Ve.width,Ve.height,0,Ve.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ie&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,0,0,Ve.width,Ve.height,De,ke,Ve.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve,st,Ve.width,Ve.height,0,De,ke,Ve.data)}}}else{if(we=M.mipmaps,B&&J){we.length>0&&ye++;let ae=Qe(ne[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,ye,st,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Te){B?ie&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ne[ae].width,ne[ae].height,De,ke,ne[ae].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,st,ne[ae].width,ne[ae].height,0,De,ke,ne[ae].data);for(let ve=0;ve<we.length;ve++){let Ve=we[ve].image[ae].image;B?ie&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,0,0,Ve.width,Ve.height,De,ke,Ve.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,st,Ve.width,Ve.height,0,De,ke,Ve.data)}}else{B?ie&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,De,ke,ne[ae]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,st,De,ke,ne[ae]);for(let ve=0;ve<we.length;ve++){let Ve=we[ve];B?ie&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,0,0,De,ke,Ve.image[ae]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ve+1,st,De,ke,Ve.image[ae])}}}p(M)&&y(e.TEXTURE_CUBE_MAP),ue.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function de(A,M,U,W,K,ue){let pe=n.convert(U.format,U.colorSpace),F=n.convert(U.type),he=_(U.internalFormat,pe,F,U.normalized,U.colorSpace),fe=r.get(M),Te=r.get(U);if(Te.__renderTarget=M,!fe.__hasExternalTextures){let ne=Math.max(1,M.width>>ue),Ie=Math.max(1,M.height>>ue);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?i.texImage3D(K,ue,he,ne,Ie,M.depth,0,pe,F,null):i.texImage2D(K,ue,he,ne,Ie,0,pe,F,null)}i.bindFramebuffer(e.FRAMEBUFFER,A),L(M)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,W,K,Te.__webglTexture,0,qe(M)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,W,K,Te.__webglTexture,ue),i.bindFramebuffer(e.FRAMEBUFFER,null)}function $e(A,M,U){if(e.bindRenderbuffer(e.RENDERBUFFER,A),M.depthBuffer){let W=M.depthTexture,K=W&&W.isDepthTexture?W.type:null,ue=S(M.stencilBuffer,K),pe=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;L(M)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,qe(M),ue,M.width,M.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,qe(M),ue,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,ue,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,pe,e.RENDERBUFFER,A)}else{let W=M.textures;for(let K=0;K<W.length;K++){let ue=W[K],pe=n.convert(ue.format,ue.colorSpace),F=n.convert(ue.type),he=_(ue.internalFormat,pe,F,ue.normalized,ue.colorSpace);L(M)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,qe(M),he,M.width,M.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,qe(M),he,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,he,M.width,M.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function te(A,M,U){let W=M.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(e.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=r.get(M.depthTexture);if(K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W){if(K.__webglInit===void 0&&(K.__webglInit=!0,M.depthTexture.addEventListener("dispose",R)),K.__webglTexture===void 0){K.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,K.__webglTexture),Xe(e.TEXTURE_CUBE_MAP,M.depthTexture);let fe=n.convert(M.depthTexture.format),Te=n.convert(M.depthTexture.type),ne;M.depthTexture.format===Ai?ne=e.DEPTH_COMPONENT24:M.depthTexture.format===Yi&&(ne=e.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,ne,M.width,M.height,0,fe,Te,null)}}else le(M.depthTexture,0);let ue=K.__webglTexture,pe=qe(M),F=W?e.TEXTURE_CUBE_MAP_POSITIVE_X+U:e.TEXTURE_2D,he=M.depthTexture.format===Yi?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(M.depthTexture.format===Ai)L(M)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,he,F,ue,0,pe):e.framebufferTexture2D(e.FRAMEBUFFER,he,F,ue,0);else if(M.depthTexture.format===Yi)L(M)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,he,F,ue,0,pe):e.framebufferTexture2D(e.FRAMEBUFFER,he,F,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $(A){let M=r.get(A),U=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let W=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),W){let K=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),M.__depthDisposeCallback=K}M.__boundDepthTexture=W}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(U)for(let W=0;W<6;W++)te(M.__webglFramebuffer[W],A,W);else{let W=A.texture.mipmaps;W&&W.length>0?te(M.__webglFramebuffer[0],A,0):te(M.__webglFramebuffer,A,0)}else if(U){M.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(i.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[W]),M.__webglDepthbuffer[W]===void 0)M.__webglDepthbuffer[W]=e.createRenderbuffer(),$e(M.__webglDepthbuffer[W],A,!1);else{let K=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ue=M.__webglDepthbuffer[W];e.bindRenderbuffer(e.RENDERBUFFER,ue),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,ue)}}else{let W=A.texture.mipmaps;if(W&&W.length>0?i.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=e.createRenderbuffer(),$e(M.__webglDepthbuffer,A,!1);else{let K=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ue=M.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ue),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,ue)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}function oe(A,M,U){let W=r.get(A);M!==void 0&&de(W.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&$(A)}function _e(A){let M=A.texture,U=r.get(A),W=r.get(M);A.addEventListener("dispose",x);let K=A.textures,ue=A.isWebGLCubeRenderTarget===!0,pe=K.length>1;if(pe||(W.__webglTexture===void 0&&(W.__webglTexture=e.createTexture()),W.__version=M.version,s.memory.textures++),ue){U.__webglFramebuffer=[];for(let F=0;F<6;F++)if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer[F]=[];for(let he=0;he<M.mipmaps.length;he++)U.__webglFramebuffer[F][he]=e.createFramebuffer()}else U.__webglFramebuffer[F]=e.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer=[];for(let F=0;F<M.mipmaps.length;F++)U.__webglFramebuffer[F]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(pe)for(let F=0,he=K.length;F<he;F++){let fe=r.get(K[F]);fe.__webglTexture===void 0&&(fe.__webglTexture=e.createTexture(),s.memory.textures++)}if(A.samples>0&&L(A)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let F=0;F<K.length;F++){let he=K[F];U.__webglColorRenderbuffer[F]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[F]);let fe=n.convert(he.format,he.colorSpace),Te=n.convert(he.type),ne=_(he.internalFormat,fe,Te,he.normalized,he.colorSpace,A.isXRRenderTarget===!0),Ie=qe(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ie,ne,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+F,e.RENDERBUFFER,U.__webglColorRenderbuffer[F])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),$e(U.__webglDepthRenderbuffer,A,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ue){i.bindTexture(e.TEXTURE_CUBE_MAP,W.__webglTexture),Xe(e.TEXTURE_CUBE_MAP,M);for(let F=0;F<6;F++)if(M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)de(U.__webglFramebuffer[F][he],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+F,he);else de(U.__webglFramebuffer[F],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);p(M)&&y(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(pe){for(let F=0,he=K.length;F<he;F++){let fe=K[F],Te=r.get(fe),ne=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ne=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(ne,Te.__webglTexture),Xe(ne,fe),de(U.__webglFramebuffer,A,fe,e.COLOR_ATTACHMENT0+F,ne,0),p(fe)&&y(ne)}i.unbindTexture()}else{let F=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(F=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(F,W.__webglTexture),Xe(F,M),M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)de(U.__webglFramebuffer[he],A,M,e.COLOR_ATTACHMENT0,F,he);else de(U.__webglFramebuffer,A,M,e.COLOR_ATTACHMENT0,F,0);p(M)&&y(F),i.unbindTexture()}A.depthBuffer&&$(A)}function xe(A){let M=A.textures;for(let U=0,W=M.length;U<W;U++){let K=M[U];if(p(K)){let ue=E(A),pe=r.get(K).__webglTexture;i.bindTexture(ue,pe),y(ue),i.unbindTexture()}}}let Ee=[],Oe=[];function Ge(A){if(A.samples>0){if(L(A)===!1){let M=A.textures,U=A.width,W=A.height,K=e.COLOR_BUFFER_BIT,ue=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,pe=r.get(A),F=M.length>1;if(F)for(let fe=0;fe<M.length;fe++)i.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let he=A.texture.mipmaps;he&&he.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let fe=0;fe<M.length;fe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),F){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,pe.__webglColorRenderbuffer[fe]);let Te=r.get(M[fe]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Te,0)}e.blitFramebuffer(0,0,U,W,0,0,U,W,K,e.NEAREST),o===!0&&(Ee.length=0,Oe.length=0,Ee.push(e.COLOR_ATTACHMENT0+fe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(Ee.push(ue),Oe.push(ue),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Oe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ee))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),F)for(let fe=0;fe<M.length;fe++){i.bindFramebuffer(e.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.RENDERBUFFER,pe.__webglColorRenderbuffer[fe]);let Te=r.get(M[fe]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,pe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+fe,e.TEXTURE_2D,Te,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&o){let M=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[M])}}}function qe(A){return Math.min(a.maxSamples,A.samples)}function L(A){let M=r.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function pt(A){let M=s.render.frame;c.get(A)!==M&&(c.set(A,M),A.update())}function tt(A,M){let U=A.colorSpace,W=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||U!==er&&U!==Zt&&(it.getTransfer(U)===lt?(W!==Ot||K!==Yt)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",U)),M}function Qe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(h.width=A.naturalWidth||A.width,h.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(h.width=A.displayWidth,h.height=A.displayHeight):(h.width=A.width,h.height=A.height),h}this.allocateTextureUnit=Z,this.resetTextureUnits=G,this.getTextureUnits=I,this.setTextureUnits=z,this.setTexture2D=le,this.setTexture2DArray=j,this.setTexture3D=q,this.setTextureCube=ee,this.rebindTextures=oe,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=de,this.useMultisampledRTT=L,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function Wv(e,t){function i(r,a=Zt){let n,s=it.getTransfer(a);if(r===Yt)return e.UNSIGNED_BYTE;if(r===bo)return e.UNSIGNED_SHORT_4_4_4_4;if(r===To)return e.UNSIGNED_SHORT_5_5_5_1;if(r===Dh)return e.UNSIGNED_INT_5_9_9_9_REV;if(r===Uh)return e.UNSIGNED_INT_10F_11F_11F_REV;if(r===Lh)return e.BYTE;if(r===Nh)return e.SHORT;if(r===ca)return e.UNSIGNED_SHORT;if(r===Mo)return e.INT;if(r===pi)return e.UNSIGNED_INT;if(r===ei)return e.FLOAT;if(r===zt)return e.HALF_FLOAT;if(r===Oh)return e.ALPHA;if(r===Bh)return e.RGB;if(r===Ot)return e.RGBA;if(r===Ai)return e.DEPTH_COMPONENT;if(r===Yi)return e.DEPTH_STENCIL;if(r===Fh)return e.RED;if(r===Eo)return e.RED_INTEGER;if(r===Qi)return e.RG;if(r===wo)return e.RG_INTEGER;if(r===Ao)return e.RGBA_INTEGER;if(r===cn||r===un||r===dn||r===pn)if(s===lt)if(n=t.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(r===cn)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===un)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===dn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===pn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=t.get("WEBGL_compressed_texture_s3tc"),n!==null){if(r===cn)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===un)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===dn)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===pn)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Fs||r===zs||r===Vs||r===Hs)if(n=t.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(r===Fs)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===zs)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Vs)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Hs)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ks||r===Gs||r===Ws||r===Xs||r===js||r===_n||r===qs)if(n=t.get("WEBGL_compressed_texture_etc"),n!==null){if(r===ks||r===Gs)return s===lt?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(r===Ws)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(r===Xs)return n.COMPRESSED_R11_EAC;if(r===js)return n.COMPRESSED_SIGNED_R11_EAC;if(r===_n)return n.COMPRESSED_RG11_EAC;if(r===qs)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Ys||r===Zs||r===Js||r===Ks||r===$s||r===Qs||r===eo||r===to||r===io||r===ro||r===ao||r===no||r===so||r===oo)if(n=t.get("WEBGL_compressed_texture_astc"),n!==null){if(r===Ys)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Zs)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Js)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ks)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===$s)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Qs)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===eo)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===to)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===io)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ro)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ao)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===no)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===so)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===oo)return s===lt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===lo||r===ho||r===co)if(n=t.get("EXT_texture_compression_bptc"),n!==null){if(r===lo)return s===lt?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ho)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===co)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===uo||r===po||r===xn||r===mo)if(n=t.get("EXT_texture_compression_rgtc"),n!==null){if(r===uo)return n.COMPRESSED_RED_RGTC1_EXT;if(r===po)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===xn)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===mo)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ua?e.UNSIGNED_INT_24_8:e[r]!==void 0?e[r]:null}return{convert:i}}var Xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new $h(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Gt({vertexShader:Xv,fragmentShader:jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new Uo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yv=class extends ir{constructor(e,t){super();let i=this,r=null,a=1,n=null,s="local-floor",l=1,o=null,h=null,c=null,d=null,u=null,m=null,g=typeof XRWebGLBinding<"u",v=new qv,f={},p=t.getContextAttributes(),y=null,E=null,_=[],S=[],w=new Q,R=null,x=null,T=new qt;T.viewport=new at;let N=new qt;N.viewport=new at;let P=[T,N],D=new jp,G=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let re=_[Y];return re===void 0&&(re=new ts,_[Y]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Y){let re=_[Y];return re===void 0&&(re=new ts,_[Y]=re),re.getGripSpace()},this.getHand=function(Y){let re=_[Y];return re===void 0&&(re=new ts,_[Y]=re),re.getHandSpace()};function z(Y){let re=S.indexOf(Y.inputSource);if(re===-1)return;let se=_[re];se!==void 0&&(se.update(Y.inputSource,Y.frame,o||n),se.dispatchEvent({type:Y.type,data:Y.inputSource}))}function Z(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",k);for(let Y=0;Y<_.length;Y++){let re=S[Y];re!==null&&(S[Y]=null,_[Y].disconnect(re))}G=null,I=null,v.reset();for(let Y in f)delete f[Y];if(e.setRenderTarget(y),u=null,d=null,c=null,r=null,E=null,Xe.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(w.width,w.height,!1),x!==null){let Y=x.camera;Y.fov=x.fov,Y.zoom=x.zoom,Y.updateProjectionMatrix(),x=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){a=Y,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){s=Y,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||n},this.setReferenceSpace=function(Y){o=Y},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return c===null&&g&&(c=new XRWebGLBinding(r,t)),c},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",k),p.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(w),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,se=null,Ce=null;p.depth&&(Ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=p.stencil?Yi:Ai,se=p.stencil?ua:pi);let Fe={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:a};c=this.getBinding(),d=c.createProjectionLayer(Fe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new Vt(d.textureWidth,d.textureHeight,{format:Ot,type:Yt,depthTexture:new pa(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let re={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};u=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),E=new Vt(u.framebufferWidth,u.framebufferHeight,{format:Ot,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),o=null,n=await r.requestReferenceSpace(s),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function k(Y){for(let re=0;re<Y.removed.length;re++){let se=Y.removed[re],Ce=S.indexOf(se);Ce>=0&&(S[Ce]=null,_[Ce].disconnect(se))}for(let re=0;re<Y.added.length;re++){let se=Y.added[re],Ce=S.indexOf(se);if(Ce===-1){for(let de=0;de<_.length;de++)if(de>=S.length){S.push(se),Ce=de;break}else if(S[de]===null){S[de]=se,Ce=de;break}if(Ce===-1)break}let Fe=_[Ce];Fe&&Fe.connect(se)}}let le=new C,j=new C;function q(Y,re,se){le.setFromMatrixPosition(re.matrixWorld),j.setFromMatrixPosition(se.matrixWorld);let Ce=le.distanceTo(j),Fe=re.projectionMatrix.elements,de=se.projectionMatrix.elements,$e=Fe[14]/(Fe[10]-1),te=Fe[14]/(Fe[10]+1),$=(Fe[9]+1)/Fe[5],oe=(Fe[9]-1)/Fe[5],_e=(Fe[8]-1)/Fe[0],xe=(de[8]+1)/de[0],Ee=$e*_e,Oe=$e*xe,Ge=Ce/(-_e+xe),qe=Ge*-_e;if(re.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(qe),Y.translateZ(Ge),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Fe[10]===-1)Y.projectionMatrix.copy(re.projectionMatrix),Y.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let L=$e+Ge,pt=te+Ge,tt=Ee-qe,Qe=Oe+(Ce-qe),A=$*te/pt*L,M=oe*te/pt*L;Y.projectionMatrix.makePerspective(tt,Qe,A,M,L,pt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ee(Y,re){re===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(re.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let re=Y.near,se=Y.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(se=v.depthFar)),D.near=N.near=T.near=re,D.far=N.far=T.far=se,(G!==D.near||I!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),G=D.near,I=D.far),D.layers.mask=Y.layers.mask|6,T.layers.mask=D.layers.mask&-5,N.layers.mask=D.layers.mask&-3;let Ce=Y.parent,Fe=D.cameras;ee(D,Ce);for(let de=0;de<Fe.length;de++)ee(Fe[de],Ce);Fe.length===2?q(D,T,N):D.projectionMatrix.copy(T.projectionMatrix),x===null&&Y.isPerspectiveCamera&&(x={camera:Y,fov:Y.fov,zoom:Y.zoom}),Be(Y,D,Ce)};function Be(Y,re,se){se===null?Y.matrix.copy(re.matrixWorld):(Y.matrix.copy(se.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(re.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(re.projectionMatrix),Y.projectionMatrixInverse.copy(re.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(D)},this.getCameraTexture=function(Y){return f[Y]};let be=null;function nt(Y,re){if(h=re.getViewerPose(o||n),m=re,h!==null){let se=h.views;u!==null&&(e.setRenderTargetFramebuffer(E,u.framebuffer),e.setRenderTarget(E));let Ce=!1;se.length!==D.cameras.length&&(D.cameras.length=0,Ce=!0);for(let de=0;de<se.length;de++){let $e=se[de],te=null;if(u!==null)te=u.getViewport($e);else{let oe=c.getViewSubImage(d,$e);te=oe.viewport,de===0&&(e.setRenderTargetTextures(E,oe.colorTexture,oe.depthStencilTexture),e.setRenderTarget(E))}let $=P[de];$===void 0&&($=new qt,$.layers.enable(de),$.viewport=new at,P[de]=$),$.matrix.fromArray($e.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray($e.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(te.x,te.y,te.width,te.height),de===0&&(D.matrix.copy($.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ce===!0&&D.cameras.push($)}let Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){c=i.getBinding();let de=c.getDepthInformation(se[0]);de&&de.isValid&&de.texture&&v.init(de,r.renderState)}if(Fe&&Fe.includes("camera-access")&&g){e.state.unbindTexture(),c=i.getBinding();for(let de=0;de<se.length;de++){let $e=se[de].camera;if($e){let te=f[$e];te||(te=new $h,f[$e]=te);let $=c.getCameraImage($e);te.sourceTexture=$}}}}for(let se=0;se<_.length;se++){let Ce=S[se],Fe=_[se];Ce!==null&&Fe!==void 0&&Fe.update(Ce,re,o||n)}be&&be(Y,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),m=null}let Xe=new Nc;Xe.setAnimationLoop(nt),this.setAnimationLoop=function(Y){be=Y},this.dispose=function(){}}},Zv=new Ke,Vc=new Ye;Vc.set(-1,0,0,0,1,0,0,0,1);function Jv(e,t){function i(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function r(f,p){p.color.getRGB(f.fogColor.value,Cc(e)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function a(f,p,y,E,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?n(f,p):p.isMeshLambertMaterial?(n(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(n(f,p),d(f,p)):p.isMeshPhongMaterial?(n(f,p),c(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(n(f,p),u(f,p),p.isMeshPhysicalMaterial&&m(f,p,_)):p.isMeshMatcapMaterial?(n(f,p),g(f,p)):p.isMeshDepthMaterial?n(f,p):p.isMeshDistanceMaterial?(n(f,p),v(f,p)):p.isMeshNormalMaterial?n(f,p):p.isLineBasicMaterial?(s(f,p),p.isLineDashedMaterial&&l(f,p)):p.isPointsMaterial?o(f,p,y,E):p.isSpriteMaterial?h(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function n(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,i(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,i(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,i(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===kt&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,i(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===kt&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,i(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,i(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,i(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);let y=t.get(p),E=y.envMap,_=y.envMapRotation;E&&(f.envMap.value=E,f.envMapRotation.value.setFromMatrix4(Zv.makeRotationFromEuler(_)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Vc),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,i(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,i(p.aoMap,f.aoMapTransform))}function s(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,i(p.map,f.mapTransform))}function l(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function o(f,p,y,E){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*y,f.scale.value=E*.5,p.map&&(f.map.value=p.map,i(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,i(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,i(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,i(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function d(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,i(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,i(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,y){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,i(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,i(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,i(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,i(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,i(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===kt&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.retroreflectivity>0&&(f.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,i(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,i(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,i(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,i(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,i(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,i(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,i(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function v(f,p){let y=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function Kv(e,t,i,r){let a={},n={},s=[],l=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function o(_,S){let w=S.program;r.uniformBlockBinding(_,w)}function h(_,S){let w=a[_.id];w===void 0&&(f(_),w=c(_),a[_.id]=w,_.addEventListener("dispose",y));let R=S.program;r.updateUBOMapping(_,R);let x=t.render.frame;n[_.id]!==x&&(u(_),n[_.id]=x)}function c(_){let S=d();_.__bindingPointIndex=S;let w=e.createBuffer(),R=_.__size,x=_.usage;return e.bindBuffer(e.UNIFORM_BUFFER,w),e.bufferData(e.UNIFORM_BUFFER,R,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,S,w),w}function d(){for(let _=0;_<l;_++)if(s.indexOf(_)===-1)return s.push(_),_;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let S=a[_.id],w=_.uniforms,R=_.__cache;e.bindBuffer(e.UNIFORM_BUFFER,S);for(let x=0,T=w.length;x<T;x++){let N=w[x];if(Array.isArray(N))for(let P=0,D=N.length;P<D;P++)m(N[P],x,P,R);else m(N,x,0,R)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(_,S,w,R){if(v(_,S,w,R)===!0){let x=_.__offset,T=_.value;if(Array.isArray(T)){let N=0;for(let P=0;P<T.length;P++){let D=T[P],G=p(D);g(D,_.__data,N),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(N+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,_.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,_.__data)}}function g(_,S,w){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,w)}function v(_,S,w,R){let x=_.value,T=S+"_"+w;if(R[T]===void 0)return typeof x=="number"||typeof x=="boolean"?R[T]=x:ArrayBuffer.isView(x)?R[T]=x.slice():R[T]=x.clone(),!0;{let N=R[T];if(typeof x=="number"||typeof x=="boolean"){if(N!==x)return R[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(N.equals(x)===!1)return N.copy(x),!0}}return!1}function f(_){let S=_.uniforms,w=0,R=16;for(let T=0,N=S.length;T<N;T++){let P=Array.isArray(S[T])?S[T]:[S[T]];for(let D=0,G=P.length;D<G;D++){let I=P[D],z=Array.isArray(I.value)?I.value:[I.value];for(let Z=0,k=z.length;Z<k;Z++){let le=z[Z],j=p(le),q=w%R,ee=q%j.boundary,Be=q+ee;w+=ee,Be!==0&&R-Be<j.storage&&(w+=R-Be),I.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=j.storage}}}let x=w%R;return x>0&&(w+=R-x),_.__size=w,_.__cache={},this}function p(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",_),S}function y(_){let S=_.target;S.removeEventListener("dispose",y);let w=s.indexOf(S.__bindingPointIndex);s.splice(w,1),e.deleteBuffer(a[S.id]),delete a[S.id],delete n[S.id]}function E(){for(let _ in a)e.deleteBuffer(a[_]);s=[],a={},n={}}return{bind:o,update:h,dispose:E}}var $v=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ci=null;function Qv(){return ci===null&&(ci=new Bi($v,16,16,Qi,zt),ci.name="DFG_LUT",ci.minFilter=ht,ci.magFilter=ht,ci.wrapS=Ut,ci.wrapT=Ut,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}var Dn=class{constructor(e={}){let{canvas:t=ju(),context:i=null,depth:r=!0,stencil:a=!1,alpha:n=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:o=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:c=!1,reversedDepthBuffer:d=!1,outputBufferType:u=Yt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=n;let g=u,v=new Set([Ao,wo,Eo]),f=new Set([Yt,pi,ca,ua,bo,To]),p=new Uint32Array(4),y=new Int32Array(4),E=new C,_=null,S=null,w=[],R=[],x=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,N=!1,P=null,D=null,G=null,I=null;this._outputColorSpace=Dt;let z=0,Z=0,k=null,le=-1,j=null,q=new at,ee=new at,Be=null,be=new We(0),nt=0,Xe=t.width,Y=t.height,re=1,se=null,Ce=null,Fe=new at(0,0,Xe,Y),de=new at(0,0,Xe,Y),$e=!1,te=new Vr,$=!1,oe=!1,_e=new Ke,xe=new C,Ee=new at,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function qe(){return k===null?re:1}let L=i;function pt(b,O){return t.getContext(b,O)}let tt,Qe,A,M,U,W,K,ue,pe,F,he,fe,Te,ne,Ie,De,ke,st,B,J,ie,ye,we;try{let b={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:o,powerPreference:h,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r186"),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",Tt,!1),t.addEventListener("webglcontextcreationerror",ot,!1),L===null){let O="webgl2";if(L=pt(O,b),L===null)throw pt(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ae()}catch(b){throw t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",ot,!1),He("WebGLRenderer: "+b.message),b}function ae(){tt=new Qg(L),tt.init(),ie=new Wv(L,tt),Qe=new Gg(L,tt,e,ie),A=new kv(L,tt),Qe.reversedDepthBuffer&&d&&A.buffers.depth.setReversed(!0),D=L.createFramebuffer(),G=L.createFramebuffer(),I=L.createFramebuffer(),M=new i0(L),U=new Rv,W=new Gv(L,tt,A,U,Qe,ie,M),K=new $g(T),ue=new rm(L),ye=new Hg(L,ue),pe=new e0(L,ue,M,ye),F=new a0(L,pe,ue,ye,M),st=new r0(L,Qe,W),Ie=new Wg(U),he=new Av(T,K,tt,Qe,ye,Ie),fe=new Jv(T,U),Te=new Pv,ne=new Ov(tt),ke=new Vg(T,K,A,F,m,l),De=new Hv(T,F,Qe),we=new Kv(L,M,Qe,A),B=new kg(L,tt,M),J=new t0(L,tt,M),M.programs=he.programs,T.capabilities=Qe,T.extensions=tt,T.properties=U,T.renderLists=Te,T.shadowMap=De,T.state=A,T.info=M}g!==Yt&&(x=new s0(g,t.width,t.height,s,r,a));let ve=new Yv(T,L);this.xr=ve,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(b){b!==void 0&&(re=b,this.setSize(Xe,Y,!1))},this.getSize=function(b){return b.set(Xe,Y)},this.setSize=function(b,O,X=!0){if(ve.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}Xe=b,Y=O,t.width=Math.floor(b*re),t.height=Math.floor(O*re),X===!0&&(t.style.width=b+"px",t.style.height=O+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(Xe*re,Y*re).floor()},this.setDrawingBufferSize=function(b,O,X){Xe=b,Y=O,re=X,t.width=Math.floor(b*X),t.height=Math.floor(O*X),this.setViewport(0,0,b,O)},this.setEffects=function(b){if(g===Yt){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let O=0;O<b.length;O++)if(b[O].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(q)},this.getViewport=function(b){return b.copy(Fe)},this.setViewport=function(b,O,X,H){b.isVector4?Fe.set(b.x,b.y,b.z,b.w):Fe.set(b,O,X,H),A.viewport(q.copy(Fe).multiplyScalar(re).round())},this.getScissor=function(b){return b.copy(de)},this.setScissor=function(b,O,X,H){b.isVector4?de.set(b.x,b.y,b.z,b.w):de.set(b,O,X,H),A.scissor(ee.copy(de).multiplyScalar(re).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(b){A.setScissorTest($e=b)},this.setOpaqueSort=function(b){se=b},this.setTransparentSort=function(b){Ce=b},this.getClearColor=function(b){return b.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,X=!0){let H=0;if(b){let V=!1;if(k!==null){let ce=k.texture.format;V=v.has(ce)}if(V){let ce=k.texture.type,ge=f.has(ce),Se=ke.getClearColor(),Me=ke.getClearAlpha(),ze=Se.r,et=Se.g,rt=Se.b;ge?(p[0]=ze,p[1]=et,p[2]=rt,p[3]=Me,L.clearBufferuiv(L.COLOR,0,p)):(y[0]=ze,y[1]=et,y[2]=rt,y[3]=Me,L.clearBufferiv(L.COLOR,0,y))}else H|=L.COLOR_BUFFER_BIT}O&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),P=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",Tt,!1),t.removeEventListener("webglcontextcreationerror",ot,!1),ke.dispose(),Te.dispose(),ne.dispose(),U.dispose(),K.dispose(),F.dispose(),ye.dispose(),we.dispose(),he.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Ho),ve.removeEventListener("sessionend",ko),Hi.stop()};function Ve(b){b.preventDefault(),_l("WebGLRenderer: Context Lost."),N=!0}function Tt(){_l("WebGLRenderer: Context Restored."),N=!1;let b=M.autoReset,O=De.enabled,X=De.autoUpdate,H=De.needsUpdate,V=De.type;ae(),M.autoReset=b,De.enabled=O,De.autoUpdate=X,De.needsUpdate=H,De.type=V}function ot(b){He("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function oi(b){let O=b.target;O.removeEventListener("dispose",oi),gi(O)}function gi(b){tu(b),U.remove(b)}function tu(b){let O=U.get(b).programs;O!==void 0&&(O.forEach(function(X){he.releaseProgram(X)}),b.isShaderMaterial&&he.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,X,H,V,ce){O===null&&(O=Oe);let ge=V.isMesh&&V.matrixWorld.determinantAffine()<0,Se=au(b,O,X,H,V);A.setMaterial(H,ge);let Me=X.index,ze=1;if(H.wireframe===!0){if(Me=pe.getWireframeAttribute(X),Me===void 0)return;ze=2}let et=X.drawRange,rt=X.attributes.position,Pe=et.start*ze,ct=(et.start+et.count)*ze;ce!==null&&(Pe=Math.max(Pe,ce.start*ze),ct=Math.min(ct,(ce.start+ce.count)*ze)),Me!==null?(Pe=Math.max(Pe,0),ct=Math.min(ct,Me.count)):rt!=null&&(Pe=Math.max(Pe,0),ct=Math.min(ct,rt.count));let Mt=ct-Pe;if(Mt<0||Mt===1/0)return;ye.setup(V,H,Se,X,Me);let ft,gt=B;if(Me!==null&&(ft=ue.get(Me),gt=J,gt.setIndex(ft)),V.isMesh)H.wireframe===!0?(A.setLineWidth(H.wireframeLinewidth*qe()),gt.setMode(L.LINES)):gt.setMode(L.TRIANGLES);else if(V.isLine){let xt=H.linewidth;xt===void 0&&(xt=1),A.setLineWidth(xt*qe()),V.isLineSegments?gt.setMode(L.LINES):V.isLineLoop?gt.setMode(L.LINE_LOOP):gt.setMode(L.LINE_STRIP)}else V.isPoints?gt.setMode(L.POINTS):V.isSprite&&gt.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))gt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let xt=V._multiDrawStarts,Ae=V._multiDrawCounts,Bt=V._multiDrawCount,ki=Me?ue.get(Me).bytesPerElement:1,Kt=U.get(H).currentProgram.getUniforms();for(let li=0;li<Bt;li++)Kt.setValue(L,"_gl_DrawID",li),gt.render(xt[li]/ki,Ae[li])}else if(V.isInstancedMesh)gt.renderInstances(Pe,Mt,V.count);else if(X.isInstancedBufferGeometry){let xt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,xt);gt.renderInstances(Pe,Mt,Ae)}else gt.render(Pe,Mt)};function Vo(b,O,X,H){P!==null&&b.isNodeMaterial&&P.setObject(H,b),$===!0&&Ie.setState(b,X,!1),b.transparent===!0&&b.side===ni&&b.forceSinglePass===!1?(b.side=kt,b.needsUpdate=!0,Ea(b,O,H),b.side=Ki,b.needsUpdate=!0,Ea(b,O,H),b.side=ni):Ea(b,O,H)}this.compile=function(b,O,X=null){X===null&&(X=b),P!==null&&P.renderStart(b,O,X),S=ne.get(X),S.init(O),R.push(S),X.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),b!==X&&b.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),S.setupLights(),P!==null&&P.updateLights(S.state.lightsArray),oe=this.localClippingEnabled,$=Ie.init(this.clippingPlanes,oe),$===!0&&Ie.setGlobalState(this.clippingPlanes,O),P!==null&&De.render(S.state.shadowsArray,X,O);let H=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let ce=V.material;if(ce)if(Array.isArray(ce))for(let ge=0;ge<ce.length;ge++){let Se=ce[ge];Vo(Se,X,O,V),H.add(Se)}else Vo(ce,X,O,V),H.add(ce)}),S=R.pop(),P!==null&&P.renderEnd(),H},this.compileAsync=function(b,O,X=null){let H=this.compile(b,O,X);return new Promise(V=>{function ce(){if(H.forEach(function(ge){let Se=U.get(ge).currentProgram;(Se===void 0||Se.isReady())&&H.delete(ge)}),H.size===0){V(b);return}setTimeout(ce,10)}tt.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let zn=null;function iu(b){zn&&zn(b)}function Ho(){Hi.stop()}function ko(){Hi.start()}let Hi=new Nc;Hi.setAnimationLoop(iu),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(b){zn=b,ve.setAnimationLoop(b),b===null?Hi.stop():Hi.start()},ve.addEventListener("sessionstart",Ho),ve.addEventListener("sessionend",ko),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;P!==null&&P.renderStart(b,O);let X=ve.enabled===!0&&ve.isPresenting===!0,H=x!==null&&(k===null||X)&&x.begin(T,k);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(O),O=ve.getCamera()),b.isScene===!0&&b.onBeforeRender(T,b,O,k),S=ne.get(b,R.length),S.init(O),S.state.textureUnits=W.getTextureUnits(),R.push(S),_e.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),te.setFromProjectionMatrix(_e,si,O.reversedDepth),oe=this.localClippingEnabled,$=Ie.init(this.clippingPlanes,oe),_=Te.get(b,w.length),_.init(),w.push(_),ve.enabled===!0&&ve.isPresenting===!0){let ce=T.xr.getDepthSensingMesh();ce!==null&&Vn(ce,O,-1/0,T.sortObjects)}Vn(b,O,0,T.sortObjects),_.finish(),P!==null&&P.updateLights(S.state.lightsArray),T.sortObjects===!0&&_.sort(se,Ce),Ge=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,Ge&&ke.addToRenderList(_,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$===!0&&Ie.beginShadows();let V=S.state.shadowsArray;if(De.render(V,b,O),$===!0&&Ie.endShadows(),(H&&x.hasRenderPass())===!1){let ce=_.opaque,ge=_.transmissive;if(S.setupLights(),O.isArrayCamera){let Se=O.cameras;if(ge.length>0)for(let Me=0,ze=Se.length;Me<ze;Me++){let et=Se[Me];Wo(ce,ge,b,et)}Ge&&ke.render(b);for(let Me=0,ze=Se.length;Me<ze;Me++){let et=Se[Me];Go(_,b,et,et.viewport)}}else ge.length>0&&Wo(ce,ge,b,O),Ge&&ke.render(b),Go(_,b,O)}k!==null&&Z===0&&(W.updateMultisampleRenderTarget(k),W.updateRenderTargetMipmap(k)),H&&x.end(T),b.isScene===!0&&b.onAfterRender(T,b,O),ye.resetDefaultState(),le=-1,j=null,R.pop(),R.length>0?(S=R[R.length-1],W.setTextureUnits(S.state.textureUnits),$===!0&&Ie.setGlobalState(T.clippingPlanes,S.state.camera)):S=null,w.pop(),w.length>0?_=w[w.length-1]:_=null,P!==null&&P.renderEnd()};function Vn(b,O,X,H){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(te)){H&&Ee.setFromMatrixPosition(b.matrixWorld).applyMatrix4(_e);let ce=F.update(b),ge=b.material;ge.visible&&_.push(b,ce,ge,X,Ee.z,null,O)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(te))){let ce=F.update(b),ge=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ee.copy(b.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Ee.copy(ce.boundingSphere.center)),Ee.applyMatrix4(b.matrixWorld).applyMatrix4(_e)),Array.isArray(ge)){let Se=ce.groups;for(let Me=0,ze=Se.length;Me<ze;Me++){let et=Se[Me],rt=ge[et.materialIndex];rt&&rt.visible&&_.push(b,ce,rt,X,Ee.z,et,O)}}else ge.visible&&_.push(b,ce,ge,X,Ee.z,null,O)}}let V=b.children;for(let ce=0,ge=V.length;ce<ge;ce++)Vn(V[ce],O,X,H)}function Go(b,O,X,H){let{opaque:V,transmissive:ce,transparent:ge}=b;S.setupLightsView(X),$===!0&&Ie.setGlobalState(T.clippingPlanes,X),H&&A.viewport(q.copy(H)),V.length>0&&Ta(V,O,X),ce.length>0&&Ta(ce,O,X),ge.length>0&&Ta(ge,O,X),A.buffers.depth.setTest(!0),A.buffers.depth.setMask(!0),A.buffers.color.setMask(!0),A.setPolygonOffset(!1)}function Wo(b,O,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){let rt=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new Vt(1,1,{generateMipmaps:!0,type:rt?zt:Yt,minFilter:Qt,samples:Math.max(4,Qe.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let V=S.state.transmissionRenderTarget[H.id],ce=H.viewport||q;V.setSize(ce.z*T.transmissionResolutionScale,ce.w*T.transmissionResolutionScale);let ge=T.getRenderTarget(),Se=T.getActiveCubeFace(),Me=T.getActiveMipmapLevel();T.setRenderTarget(V),T.getClearColor(be),nt=T.getClearAlpha(),nt<1&&T.setClearColor(16777215,.5),T.clear(),Ge&&ke.render(X);let ze=T.toneMapping;T.toneMapping=di;let et=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),$===!0&&Ie.setGlobalState(T.clippingPlanes,H),Ta(b,X,H),W.updateMultisampleRenderTarget(V),W.updateRenderTargetMipmap(V),tt.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let Pe=0,ct=O.length;Pe<ct;Pe++){let Mt=O[Pe],{object:ft,geometry:gt,material:xt,group:Ae}=Mt;if(xt.side===ni&&ft.layers.test(H.layers)){let Bt=xt.side;xt.side=kt,xt.needsUpdate=!0,Xo(ft,X,H,gt,xt,Ae),xt.side=Bt,xt.needsUpdate=!0,rt=!0}}rt===!0&&(W.updateMultisampleRenderTarget(V),W.updateRenderTargetMipmap(V))}T.setRenderTarget(ge,Se,Me),T.setClearColor(be,nt),et!==void 0&&(H.viewport=et),T.toneMapping=ze}function Ta(b,O,X){let H=O.isScene===!0?O.overrideMaterial:null;for(let V=0,ce=b.length;V<ce;V++){let ge=b[V],{object:Se,geometry:Me,group:ze}=ge,et=ge.material;et.allowOverride===!0&&H!==null&&(et=H),Se.layers.test(X.layers)&&Xo(Se,O,X,Me,et,ze)}}function Xo(b,O,X,H,V,ce){P!==null&&V.isNodeMaterial&&P.setObject(b,V),b.onBeforeRender(T,O,X,H,V,ce),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(T,O,X,H,b,ce),V.transparent===!0&&V.side===ni&&V.forceSinglePass===!1?(V.side=kt,V.needsUpdate=!0,T.renderBufferDirect(X,O,H,V,b,ce),V.side=Ki,V.needsUpdate=!0,T.renderBufferDirect(X,O,H,V,b,ce),V.side=ni):T.renderBufferDirect(X,O,H,V,b,ce),b.onAfterRender(T,O,X,H,V,ce)}function Ea(b,O,X){O.isScene!==!0&&(O=Oe);let H=U.get(b),V=S.state.lights,ce=S.state.shadowsArray,ge=V.state.version,Se=he.getParameters(b,V.state,ce,O,X,S.state.lightProbeGridArray),Me=he.getProgramCacheKey(Se),ze=H.programs;H.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;let et=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;H.envMap=K.get(b.envMap||H.environment,et),H.envMapRotation=H.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,ze===void 0&&(b.addEventListener("dispose",oi),ze=new Map,H.programs=ze);let rt=ze.get(Me);if(rt!==void 0){if(H.currentProgram===rt&&H.lightsStateVersion===ge)return qo(b,Se),rt}else Se.uniforms=he.getUniforms(b),P!==null&&b.isNodeMaterial&&P.build(b,X,Se),b.onBeforeCompile(Se,T),rt=he.acquireProgram(Se,Me),ze.set(Me,rt),H.uniforms=Se.uniforms;let Pe=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pe.clippingPlanes=Ie.uniform),qo(b,Se),H.needsLights=su(b),H.lightsStateVersion=ge,H.needsLights&&(Pe.ambientLightColor.value=V.state.ambient,Pe.lightProbe.value=V.state.probe,Pe.sunLights.value=V.state.sun,Pe.sunLightShadows.value=V.state.sunShadow,Pe.directionalLights.value=V.state.directional,Pe.directionalLightShadows.value=V.state.directionalShadow,Pe.spotLights.value=V.state.spot,Pe.spotLightShadows.value=V.state.spotShadow,Pe.rectAreaLights.value=V.state.rectArea,Pe.ltc_1.value=V.state.rectAreaLTC1,Pe.ltc_2.value=V.state.rectAreaLTC2,Pe.pointLights.value=V.state.point,Pe.pointLightShadows.value=V.state.pointShadow,Pe.hemisphereLights.value=V.state.hemi,Pe.sunShadowMatrix.value=V.state.sunShadowMatrix,Pe.sunShadowCascade.value=V.state.sunShadowCascade,Pe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pe.spotLightMatrix.value=V.state.spotLightMatrix,Pe.spotLightMap.value=V.state.spotLightMap,Pe.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=rt,H.uniformsList=null,rt}function jo(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=vn.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function qo(b,O){let X=U.get(b);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function ru(b,O){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;E.setFromMatrixPosition(O.matrixWorld);for(let X=0,H=b.length;X<H;X++){let V=b[X];if(V.texture!==null&&V.boundingBox.containsPoint(E))return V}return null}function au(b,O,X,H,V){O.isScene!==!0&&(O=Oe),W.resetTextureUnits();let ce=O.fog,ge=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,Se=k===null?T.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:it.workingColorSpace,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,ze=K.get(H.envMap||ge,Me),et=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,rt=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!X.morphAttributes.position,ct=!!X.morphAttributes.normal,Mt=!!X.morphAttributes.color,ft=di;H.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(ft=T.toneMapping);let gt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,xt=gt!==void 0?gt.length:0,Ae=U.get(H),Bt=S.state.lights;if($===!0&&(oe===!0||b!==j)){let dt=b===j&&H.id===le;Ie.setState(H,b,dt)}let ki=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Bt.state.version||Ae.outputColorSpace!==Se||V.isBatchedMesh&&Ae.batching===!1||!V.isBatchedMesh&&Ae.batching===!0||V.isBatchedMesh&&Ae.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Ae.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Ae.instancing===!1||!V.isInstancedMesh&&Ae.instancing===!0||V.isSkinnedMesh&&Ae.skinning===!1||!V.isSkinnedMesh&&Ae.skinning===!0||V.isInstancedMesh&&Ae.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ae.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ae.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ae.instancingMorph===!1&&V.morphTexture!==null||Ae.envMap!==ze||H.fog===!0&&Ae.fog!==ce||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Ie.numPlanes||Ae.numIntersection!==Ie.numIntersection)||Ae.vertexAlphas!==et||Ae.vertexTangents!==rt||Ae.morphTargets!==Pe||Ae.morphNormals!==ct||Ae.morphColors!==Mt||Ae.toneMapping!==ft||Ae.morphTargetsCount!==xt||!!Ae.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ki=!0):(ki=!0,Ae.__version=H.version);let Kt=Ae.currentProgram;ki===!0&&(Kt=Ea(H,O,V),P&&H.isNodeMaterial&&P.onUpdateProgram(H,Kt,Ae));let li=!1,Ci=!1,sr=!1,ut=Kt.getUniforms(),St=Ae.uniforms;if(A.useProgram(Kt.program)&&(li=!0,Ci=!0,sr=!0),H.id!==le&&(le=H.id,Ci=!0),Ae.needsLights){let dt=ru(S.state.lightProbeGridArray,V);Ae.lightProbeGrid!==dt&&(Ae.lightProbeGrid=dt,Ci=!0)}if(li||j!==b){A.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ut.setValue(L,"projectionMatrix",b.projectionMatrix),ut.setValue(L,"viewMatrix",b.matrixWorldInverse);let dt=ut.map.cameraPosition;dt!==void 0&&dt.setValue(L,xe.setFromMatrixPosition(b.matrixWorld)),Qe.logarithmicDepthBuffer&&ut.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ut.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,Ci=!0,sr=!0)}if(Ae.needsLights&&(Bt.state.sunShadowMap.length>0&&ut.setValue(L,"sunShadowMap",Bt.state.sunShadowMap,W),Bt.state.directionalShadowMap.length>0&&ut.setValue(L,"directionalShadowMap",Bt.state.directionalShadowMap,W),Bt.state.spotShadowMap.length>0&&ut.setValue(L,"spotShadowMap",Bt.state.spotShadowMap,W),Bt.state.pointShadowMap.length>0&&ut.setValue(L,"pointShadowMap",Bt.state.pointShadowMap,W)),V.isSkinnedMesh){ut.setOptional(L,V,"bindMatrix"),ut.setOptional(L,V,"bindMatrixInverse");let dt=V.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),ut.setValue(L,"boneTexture",dt.boneTexture,W))}V.isBatchedMesh&&(ut.setOptional(L,V,"batchingTexture"),ut.setValue(L,"batchingTexture",V._matricesTexture,W),ut.setOptional(L,V,"batchingIdTexture"),ut.setValue(L,"batchingIdTexture",V._indirectTexture,W),ut.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&ut.setValue(L,"batchingColorTexture",V._colorsTexture,W));let Pi=X.morphAttributes;if((Pi.position!==void 0||Pi.normal!==void 0||Pi.color!==void 0)&&st.update(V,X,Kt),(Ci||Ae.receiveShadow!==V.receiveShadow)&&(Ae.receiveShadow=V.receiveShadow,ut.setValue(L,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(St.envMapIntensity.value=O.environmentIntensity),St.dfgLUT!==void 0&&(St.dfgLUT.value=Qv()),Ci){if(ut.setValue(L,"toneMappingExposure",T.toneMappingExposure),Ae.needsLights&&nu(St,sr),ce&&H.fog===!0&&fe.refreshFogUniforms(St,ce),fe.refreshMaterialUniforms(St,H,re,Y,S.state.transmissionRenderTarget[b.id]),Ae.needsLights&&Ae.lightProbeGrid){let dt=Ae.lightProbeGrid;St.probesSH.value=dt.texture,St.probesMin.value.copy(dt.boundingBox.min),St.probesMax.value.copy(dt.boundingBox.max),St.probesResolution.value.copy(dt.resolution)}vn.upload(L,jo(Ae),St,W)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(vn.upload(L,jo(Ae),St,W),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ut.setValue(L,"center",V.center),ut.setValue(L,"modelViewMatrix",V.modelViewMatrix),ut.setValue(L,"normalMatrix",V.normalMatrix),ut.setValue(L,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){let dt=H.uniformsGroups;for(let qr=0,or=dt.length;qr<or;qr++){let Zo=dt[qr];we.update(Zo,Kt),we.bind(Zo,Kt)}}return Kt}function nu(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.sunLights.needsUpdate=O,b.sunLightShadows.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function su(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(b,O,X){let H=U.get(b);H.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),U.get(b.texture).__webglTexture=O,U.get(b.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let X=U.get(b);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,X=0){k=b,z=O,Z=X;let H=null,V=!1,ce=!1;if(b){let ge=U.get(b);if(ge.__useDefaultFramebuffer!==void 0){A.bindFramebuffer(L.FRAMEBUFFER,ge.__webglFramebuffer),q.copy(b.viewport),ee.copy(b.scissor),Be=b.scissorTest,A.viewport(q),A.scissor(ee),A.setScissorTest(Be),le=-1;return}else if(ge.__webglFramebuffer===void 0)W.setupRenderTarget(b);else if(ge.__hasExternalTextures)W.rebindTextures(b,U.get(b.texture).__webglTexture,U.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let ze=b.depthTexture;if(ge.__boundDepthTexture!==ze){if(ze!==null&&U.has(ze)&&(b.width!==ze.image.width||b.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(b)}}let Se=b.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(ce=!0);let Me=U.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Me[O])?H=Me[O][X]:H=Me[O],V=!0):b.samples>0&&W.useMultisampledRTT(b)===!1?H=U.get(b).__webglMultisampledFramebuffer:Array.isArray(Me)?H=Me[X]:H=Me,q.copy(b.viewport),ee.copy(b.scissor),Be=b.scissorTest}else q.copy(Fe).multiplyScalar(re).floor(),ee.copy(de).multiplyScalar(re).floor(),Be=$e;if(X!==0&&(H=D),A.bindFramebuffer(L.FRAMEBUFFER,H)&&A.drawBuffers(b,H),A.viewport(q),A.scissor(ee),A.setScissorTest(Be),V){let ge=U.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,ge.__webglTexture,X)}else if(ce){let ge=O;for(let Se=0;Se<b.textures.length;Se++){let Me=U.get(b.textures[Se]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Se,Me.__webglTexture,X,ge)}}else if(b!==null&&X!==0){let ge=U.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ge.__webglTexture,X)}le=-1};function Yo(b){let O=U.get(b);return(O.__readFormat!==b.format||O.__readType!==b.type)&&(O.__readFormat=b.format,O.__readType=b.type,O.__formatReadable=Qe.textureFormatReadable(b.format),O.__typeReadable=Qe.textureTypeReadable(b.type)),O}this.readRenderTargetPixels=function(b,O,X,H,V,ce,ge,Se=0){if(!(b&&b.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=U.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){A.bindFramebuffer(L.FRAMEBUFFER,Me);try{let ze=b.textures[Se],et=ze.format,rt=ze.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Se);let Pe=Yo(ze);if(Pe.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-H&&X>=0&&X<=b.height-V&&L.readPixels(O,X,H,V,ie.convert(et),ie.convert(rt),ce)}finally{let ze=k!==null?U.get(k).__webglFramebuffer:null;A.bindFramebuffer(L.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(b,O,X,H,V,ce,ge,Se=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=U.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me)if(O>=0&&O<=b.width-H&&X>=0&&X<=b.height-V){A.bindFramebuffer(L.FRAMEBUFFER,Me);let ze=b.textures[Se],et=ze.format,rt=ze.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Se);let Pe=Yo(ze);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ct=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ct),L.bufferData(L.PIXEL_PACK_BUFFER,ce.byteLength,L.STREAM_READ),L.readPixels(O,X,H,V,ie.convert(et),ie.convert(rt),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Mt=k!==null?U.get(k).__webglFramebuffer:null;A.bindFramebuffer(L.FRAMEBUFFER,Mt);let ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await qu(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ct),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ce),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(ct),L.deleteSync(ft),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,X=0){let H=Math.pow(2,-X),V=Math.floor(b.image.width*H),ce=Math.floor(b.image.height*H),ge=O!==null?O.x:0,Se=O!==null?O.y:0;W.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,ge,Se,V,ce),A.unbindTexture()},this.copyTextureToTexture=function(b,O,X=null,H=null,V=0,ce=0){let ge,Se,Me,ze,et,rt,Pe,ct,Mt,ft=b.isCompressedTexture?b.mipmaps[ce]:b.image;if(X!==null)ge=X.max.x-X.min.x,Se=X.max.y-X.min.y,Me=X.isBox3?X.max.z-X.min.z:1,ze=X.min.x,et=X.min.y,rt=X.isBox3?X.min.z:0;else{let St=Math.pow(2,-V);ge=Math.floor(ft.width*St),Se=Math.floor(ft.height*St),b.isDataArrayTexture?Me=ft.depth:b.isData3DTexture?Me=Math.floor(ft.depth*St):Me=1,ze=0,et=0,rt=0}H!==null?(Pe=H.x,ct=H.y,Mt=H.z):(Pe=0,ct=0,Mt=0);let gt=ie.convert(O.format),xt=ie.convert(O.type),Ae;O.isData3DTexture?(W.setTexture3D(O,0),Ae=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(W.setTexture2DArray(O,0),Ae=L.TEXTURE_2D_ARRAY):(W.setTexture2D(O,0),Ae=L.TEXTURE_2D),A.activeTexture(L.TEXTURE0),A.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),A.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),A.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);let Bt=A.getParameter(L.UNPACK_ROW_LENGTH),ki=A.getParameter(L.UNPACK_IMAGE_HEIGHT),Kt=A.getParameter(L.UNPACK_SKIP_PIXELS),li=A.getParameter(L.UNPACK_SKIP_ROWS),Ci=A.getParameter(L.UNPACK_SKIP_IMAGES);A.pixelStorei(L.UNPACK_ROW_LENGTH,ft.width),A.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ft.height),A.pixelStorei(L.UNPACK_SKIP_PIXELS,ze),A.pixelStorei(L.UNPACK_SKIP_ROWS,et),A.pixelStorei(L.UNPACK_SKIP_IMAGES,rt);let sr=b.isDataArrayTexture||b.isData3DTexture,ut=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let St=U.get(b),Pi=U.get(O),dt=U.get(St.__renderTarget),qr=U.get(Pi.__renderTarget);A.bindFramebuffer(L.READ_FRAMEBUFFER,dt.__webglFramebuffer),A.bindFramebuffer(L.DRAW_FRAMEBUFFER,qr.__webglFramebuffer);for(let or=0;or<Me;or++)sr&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(b).__webglTexture,V,rt+or),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,U.get(O).__webglTexture,ce,Mt+or)),L.blitFramebuffer(ze,et,ge,Se,Pe,ct,ge,Se,L.DEPTH_BUFFER_BIT,L.NEAREST);A.bindFramebuffer(L.READ_FRAMEBUFFER,null),A.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||b.isRenderTargetTexture||U.has(b)){let St=U.get(b),Pi=U.get(O);A.bindFramebuffer(L.READ_FRAMEBUFFER,G),A.bindFramebuffer(L.DRAW_FRAMEBUFFER,I);for(let dt=0;dt<Me;dt++)sr?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,St.__webglTexture,V,rt+dt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,St.__webglTexture,V),ut?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pi.__webglTexture,ce,Mt+dt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pi.__webglTexture,ce),V!==0?L.blitFramebuffer(ze,et,ge,Se,Pe,ct,ge,Se,L.COLOR_BUFFER_BIT,L.NEAREST):ut?L.copyTexSubImage3D(Ae,ce,Pe,ct,Mt+dt,ze,et,ge,Se):L.copyTexSubImage2D(Ae,ce,Pe,ct,ze,et,ge,Se);A.bindFramebuffer(L.READ_FRAMEBUFFER,null),A.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ut?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ae,ce,Pe,ct,Mt,ge,Se,Me,gt,xt,ft.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,ce,Pe,ct,Mt,ge,Se,Me,gt,ft.data):L.texSubImage3D(Ae,ce,Pe,ct,Mt,ge,Se,Me,gt,xt,ft):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ce,Pe,ct,ge,Se,gt,xt,ft.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ce,Pe,ct,ft.width,ft.height,gt,ft.data):L.texSubImage2D(L.TEXTURE_2D,ce,Pe,ct,ge,Se,gt,xt,ft);A.pixelStorei(L.UNPACK_ROW_LENGTH,Bt),A.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ki),A.pixelStorei(L.UNPACK_SKIP_PIXELS,Kt),A.pixelStorei(L.UNPACK_SKIP_ROWS,li),A.pixelStorei(L.UNPACK_SKIP_IMAGES,Ci),ce===0&&O.generateMipmaps&&L.generateMipmap(Ae),A.unbindTexture()},this.initRenderTarget=function(b){U.get(b).__webglFramebuffer===void 0&&W.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?W.setTextureCube(b,0):b.isData3DTexture?W.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?W.setTexture2DArray(b,0):W.setTexture2D(b,0),A.unbindTexture()},this.resetState=function(){z=0,Z=0,k=null,A.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}},Hc=class extends Hp{constructor(e){super(e),this.type=zt}parse(e){let t=function(v,f){switch(v){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(f||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(f||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(f||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(f||""))}},i=function(v,f,p){f=f||1024;let y=v.pos,E=-1,_=0,S="",w=String.fromCharCode.apply(null,new Uint16Array(v.subarray(y,y+128)));for(;0>(E=w.indexOf(`
`))&&_<f&&y<v.byteLength;)S+=w,_+=w.length,y+=128,w=String.fromCharCode.apply(null,new Uint16Array(v.subarray(y,y+128)));return-1<E?(p!==!1&&(v.pos+=_+E+1),S+w.slice(0,E)):!1},r=function(v){let f=/^#\?(\S+)/,p=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,y=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,E=/^\s*FORMAT=(\S+)\s*$/,_=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,S={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},w,R;for((v.pos>=v.byteLength||!(w=i(v)))&&t(1,"no header found"),(R=w.match(f))||t(3,"bad initial token"),S.valid|=1,S.programtype=R[1],S.string+=w+`
`;w=i(v),w!==!1;){if(S.string+=w+`
`,w.charAt(0)==="#"){S.comments+=w+`
`;continue}if((R=w.match(p))&&(S.gamma=parseFloat(R[1])),(R=w.match(y))&&(S.exposure=parseFloat(R[1])),(R=w.match(E))&&(S.valid|=2,S.format=R[1]),(R=w.match(_))&&(S.valid|=4,S.height=parseInt(R[1],10),S.width=parseInt(R[2],10)),S.valid&2&&S.valid&4)break}return S.valid&2||t(3,"missing format specifier"),S.valid&4||t(3,"missing image size specifier"),S},a=function(v,f,p){let y=f;if(y<8||y>32767||v[0]!==2||v[1]!==2||v[2]&128)return new Uint8Array(v);y!==(v[2]<<8|v[3])&&t(3,"wrong scanline width");let E=new Uint8Array(4*f*p);E.length||t(4,"unable to allocate buffer space");let _=0,S=0,w=4*y,R=new Uint8Array(4),x=new Uint8Array(w),T=p;for(;T>0&&S<v.byteLength;){S+4>v.byteLength&&t(1),R[0]=v[S++],R[1]=v[S++],R[2]=v[S++],R[3]=v[S++],(R[0]!=2||R[1]!=2||(R[2]<<8|R[3])!=y)&&t(3,"bad rgbe scanline format");let N=0,P;for(;N<w&&S<v.byteLength;){P=v[S++];let G=P>128;if(G&&(P-=128),(P===0||N+P>w)&&t(3,"bad scanline data"),G){let I=v[S++];for(let z=0;z<P;z++)x[N++]=I}else x.set(v.subarray(S,S+P),N),N+=P,S+=P}let D=y;for(let G=0;G<D;G++){let I=0;E[_]=x[G+I],I+=y,E[_+1]=x[G+I],I+=y,E[_+2]=x[G+I],I+=y,E[_+3]=x[G+I],_+=4}T--}return E},n=function(v,f,p,y){let E=v[f+3],_=Math.pow(2,E-128)/255;p[y+0]=v[f+0]*_,p[y+1]=v[f+1]*_,p[y+2]=v[f+2]*_,p[y+3]=1},s=function(v,f,p,y){let E=v[f+3],_=Math.pow(2,E-128)/255;p[y+0]=za.toHalfFloat(Math.min(v[f+0]*_,65504)),p[y+1]=za.toHalfFloat(Math.min(v[f+1]*_,65504)),p[y+2]=za.toHalfFloat(Math.min(v[f+2]*_,65504)),p[y+3]=za.toHalfFloat(1)},l=new Uint8Array(e);l.pos=0;let o=r(l),h=o.width,c=o.height,d=a(l.subarray(l.pos),h,c),u,m,g;switch(this.type){case ei:g=d.length/4;let v=new Float32Array(g*4);for(let p=0;p<g;p++)n(d,p*4,v,p*4);u=v,m=ei;break;case zt:g=d.length/4;let f=new Uint16Array(g*4);for(let p=0;p<g;p++)s(d,p*4,f,p*4);u=f,m=zt;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:h,height:c,data:u,header:o.string,gamma:o.gamma,exposure:o.exposure,type:m,colorSpace:er,minFilter:ht,magFilter:ht,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}};var e_=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,t_=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform float uDt;
uniform float uDissipation;
void main(){
  vec2 v0 = texture2D(uVel, vUv).xy;
  // forward
  vec2 spotNew = vUv - v0 * uDt;
  vec2 vOld = texture2D(uVel, spotNew).xy;
  // backward
  vec2 spotOld = spotNew + vOld * uDt;
  vec2 err = spotOld - vUv;
  // compensated
  vec2 spotNew2 = vUv - err * 0.5;
  vec2 v2 = texture2D(uVel, spotNew2).xy;
  vec2 spotOld2 = spotNew2 - v2 * uDt;
  vec2 vel = texture2D(uVel, spotOld2).xy;
  gl_FragColor = vec4(vel * uDissipation, 0.0, 1.0);
}
`,i_=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform vec2 uPoint;
uniform vec2 uForce;
uniform float uRadius;
uniform float uAspect;
void main(){
  vec2 v = texture2D(uVel, vUv).xy;
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float g = exp(-dot(d, d) / (uRadius * uRadius));
  gl_FragColor = vec4(v + uForce * g, 0.0, 1.0);
}
`,r_=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uVel;
uniform vec2 uPx;
void main(){
  float L = texture2D(uVel, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uVel, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uVel, vUv - vec2(0.0, uPx.y)).y;
  float T = texture2D(uVel, vUv + vec2(0.0, uPx.y)).y;
  // in cell units
  float div = 0.5 * ((R - L) / uPx.x + (T - B) / uPx.y);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`,a_=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uDiv;
uniform vec2 uPx;
void main(){
  float L = texture2D(uPressure, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uPx.y)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uPx.y)).x;
  float div = texture2D(uDiv, vUv).x;
  gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}
`,n_=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uVel;
uniform vec2 uPx;
void main(){
  float L = texture2D(uPressure, vUv - vec2(uPx.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uPx.x, 0.0)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uPx.y)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uPx.y)).x;
  vec2 v = texture2D(uVel, vUv).xy;
  v -= 0.5 * vec2((R - L) * uPx.x, (T - B) * uPx.y);
  gl_FragColor = vec4(v, 0.0, 1.0);
}
`;function Ma(e,t){return new Vt(e,t,{type:zt,format:Ot,minFilter:ht,magFilter:ht,wrapS:Ut,wrapT:Ut,depthBuffer:!1,stencilBuffer:!1})}var Un=class{constructor(t,i,r,a={}){Re(this,"iterations");Re(this,"dissipation");Re(this,"scale");Re(this,"renderer");Re(this,"scene",new rr);Re(this,"camera",new ar);Re(this,"quad");Re(this,"vel");Re(this,"pres");Re(this,"div");Re(this,"px",new Q);Re(this,"aspect",1);Re(this,"mats");this.renderer=t,this.scale=a.scale??.1,this.iterations=a.iterations??4,this.dissipation=a.dissipation??.96;let[n,s]=this.dims(i,r);this.vel=[Ma(n,s),Ma(n,s)],this.pres=[Ma(n,s),Ma(n,s)],this.div=Ma(n,s),this.px.set(1/n,1/s),this.aspect=i/r;let l=(h,c)=>new Gt({vertexShader:e_,fragmentShader:h,uniforms:c,depthTest:!1,depthWrite:!1});this.mats={advect:l(t_,{uVel:{value:null},uDt:{value:0},uDissipation:{value:this.dissipation}}),splat:l(i_,{uVel:{value:null},uPoint:{value:new Q},uForce:{value:new Q},uRadius:{value:.05},uAspect:{value:1}}),div:l(r_,{uVel:{value:null},uPx:{value:this.px}}),jacobi:l(a_,{uPressure:{value:null},uDiv:{value:null},uPx:{value:this.px}}),grad:l(n_,{uPressure:{value:null},uVel:{value:null},uPx:{value:this.px}})};let o=new mt;o.setAttribute("position",new Ne([-1,-1,0,3,-1,0,-1,3,0],3)),o.setAttribute("uv",new Ne([0,0,2,0,0,2],2)),this.quad=new Pt(o,this.mats.advect),this.quad.frustumCulled=!1,this.scene.add(this.quad),this.clear()}dims(t,i){return[Math.max(16,Math.round(t*this.scale)),Math.max(16,Math.round(i*this.scale))]}get texture(){return this.vel[0].texture}resize(t,i){let[r,a]=this.dims(t,i);this.aspect=t/i,!(r===this.vel[0].width&&a===this.vel[0].height)&&([...this.vel,...this.pres,this.div].forEach(n=>n.setSize(r,a)),this.px.set(1/r,1/a),this.clear())}clear(){let t=this.renderer.getRenderTarget(),i=new We;this.renderer.getClearColor(i);let r=this.renderer.getClearAlpha();this.renderer.setClearColor(0,0),[...this.vel,...this.pres,this.div].forEach(a=>{this.renderer.setRenderTarget(a),this.renderer.clear(!0,!1,!1)}),this.renderer.setClearColor(i,r),this.renderer.setRenderTarget(t)}pass(t,i){this.quad.material=t,this.renderer.setRenderTarget(i),this.renderer.render(this.scene,this.camera)}swapVel(){this.vel.reverse()}step(t,i,r,a=.05){let n=this.renderer.getRenderTarget(),s=this.renderer,l=s.autoClear;if(s.autoClear=!1,this.mats.advect.uniforms.uVel.value=this.vel[0].texture,this.mats.advect.uniforms.uDt.value=t,this.pass(this.mats.advect,this.vel[1]),this.swapVel(),i&&r&&r.lengthSq()>1e-8){let o=this.mats.splat.uniforms;o.uVel.value=this.vel[0].texture,o.uPoint.value.copy(i),o.uForce.value.copy(r),o.uRadius.value=a,o.uAspect.value=this.aspect,this.pass(this.mats.splat,this.vel[1]),this.swapVel()}this.mats.div.uniforms.uVel.value=this.vel[0].texture,this.pass(this.mats.div,this.div);for(let o=0;o<this.iterations;o++)this.mats.jacobi.uniforms.uPressure.value=this.pres[0].texture,this.mats.jacobi.uniforms.uDiv.value=this.div.texture,this.pass(this.mats.jacobi,this.pres[1]),this.pres.reverse();this.mats.grad.uniforms.uPressure.value=this.pres[0].texture,this.mats.grad.uniforms.uVel.value=this.vel[0].texture,this.pass(this.mats.grad,this.vel[1]),this.swapVel(),s.autoClear=l,s.setRenderTarget(n)}dispose(){[...this.vel,...this.pres,this.div].forEach(t=>t.dispose()),Object.values(this.mats).forEach(t=>t.dispose()),this.quad.geometry.dispose()}};var kc=new Map;function On(e,t=1400){let i=kc.get(e);if(i)return i;let r=new Promise((a,n)=>{let s=new Image;s.decoding="async",s.onload=()=>{let l=Math.min(1,t/Math.max(s.naturalWidth,s.naturalHeight)),o=Math.round(s.naturalWidth*l),h=Math.round(s.naturalHeight*l),c=document.createElement("canvas");c.width=o,c.height=h;let d=c.getContext("2d",{willReadFrequently:!0});d.drawImage(s,0,0,o,h);let u=d.getImageData(0,0,o,h).data,m=o,g=h,v=0,f=0;for(let p=0;p<h;p++)for(let y=0;y<o;y++)u[(p*o+y)*4+3]>127&&(y<m&&(m=y),y>v&&(v=y),p<g&&(g=p),p>f&&(f=p));a({src:e,img:s,width:o,height:h,data:u,bbox:{x0:m,y0:g,x1:v+1,y1:f+1}})},s.onerror=n,s.src=Pa(e)});return kc.set(e,r),r}function Bn(e,t,i=96){let{data:r,width:a,bbox:n}=e,s=t==="y"?n.y0:n.x0,l=t==="y"?n.y1:n.x1,o=t==="y"?n.x0:n.y0,h=t==="y"?n.x1:n.y1,c=l-s,d=[],u=[];for(let p=0;p<i;p++){let y=Math.min(l-1,Math.round(s+(p+.5)/i*c)),E=1/0,_=-1/0;for(let S=o;S<h;S++){let w=t==="y"?S:y;r[((t==="y"?y:S)*a+w)*4+3]>127&&(S<E&&(E=S),S>_&&(_=S))}d.push(E),u.push(_)}let m=d.map((p,y)=>Number.isFinite(p)?(p+u[y])/2:NaN).filter(p=>!Number.isNaN(p));m.sort((p,y)=>p-y);let g=m[Math.floor(m.length/2)]??(o+h)/2,v=d.map((p,y)=>Number.isFinite(p)?Math.max(g-p,u[y]-g)/c:0);v=v.map((p,y)=>{let E=v[Math.max(0,y-1)],_=v[Math.min(v.length-1,y+1)];return p*.5+(E+_)*.25});let f=[[0,0]];return v.forEach((p,y)=>f.push([Math.max(.002,p),(y+.5)/i])),f.push([0,1]),{points:f,center:g,start:s,length:c}}var Gc=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;var s_=new We("#44b6c7"),o_=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,l_=`
precision highp float;
varying vec2 vUv;

uniform vec2 uRes;          // css px
uniform float uDpr;
uniform float uTime;
uniform vec2 uMouse;        // eased, uv
uniform float uMouseAmt;

uniform sampler2D uVel;
uniform float uThreshold;

uniform sampler2D uWire;

uniform sampler2D uHero;
uniform vec4 uHeroRect;     // x, y, w, h in uv (y up, x,y = bottom-left)
uniform vec2 uHeroTexel;    // 1 / texture size

uniform sampler2D uMa;
uniform vec4 uMaRect;
uniform sampler2D uX;
uniform vec4 uXRect;
uniform vec3 uDot;          // centre uv.xy, radius in css px
uniform float uWordAlpha;

uniform float uFlood;
uniform vec2 uFloodCenter;

${Gc}

// palette (logo colours + tints/shades mixed with white or black only)
const vec3 WHITE = vec3(1.0);
const vec3 INK   = vec3(0.0);
const vec3 TEAL  = vec3(0.2667, 0.7137, 0.7804);   // #44b6c7
const vec3 BLUE  = vec3(0.0196, 0.5098, 0.7843);   // #0582c8

vec3 tealMix(float t){ return t < 0.0 ? TEAL * (1.0 + t) : mix(TEAL, WHITE, t); }  // t<0 -> black
vec3 blueMix(float t){ return t < 0.0 ? BLUE * (1.0 + t) : mix(BLUE, WHITE, t); }

vec4 sampleRect(sampler2D t, vec4 r, vec2 uv){
  vec2 l = (uv - r.xy) / r.zw;
  if (l.x < 0.0 || l.y < 0.0 || l.x > 1.0 || l.y > 1.0) return vec4(0.0);
  return texture2D(t, l);
}

float lum(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main(){
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // ---------------- contour field (shared by both sides) ----------------
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  vec2 dm = p - m;
  float dist = length(dm);
  float push = exp(-dist * dist / 0.045) * 0.16 * uMouseAmt;
  vec2 q = p - normalize(dm + 1e-5) * push;
  float t = uTime * 0.035;
  float n = snoise(vec3(q * 1.35, t)) * 0.72 + snoise(vec3(q * 2.9 + 7.3, t * 1.3)) * 0.28;
  float bands = 7.0;
  float f = (n * 0.5 + 0.5) * bands;
  float fw = fwidth(f);
  float fr = fract(f);
  float line = 1.0 - smoothstep(0.0, fw * 1.25, min(fr, 1.0 - fr));
  float band = floor(f);

  // ---------------- hero cutout ----------------
  vec2 hl = (uv - uHeroRect.xy) / uHeroRect.zw;
  bool inHero = all(greaterThanEqual(hl, vec2(0.0))) && all(lessThanEqual(hl, vec2(1.0)));
  vec4 hero = inHero ? texture2D(uHero, hl) : vec4(0.0);

  // ---------------- wordmark ----------------
  vec4 ma = sampleRect(uMa, uMaRect, uv);
  vec4 xx = sampleRect(uX, uXRect, uv);
  vec2 dp = (uv - uDot.xy) * uRes;
  float dd = length(dp) - uDot.z;
  float dotA = 1.0 - smoothstep(-0.75, 0.75, dd * uDpr) ;
  dotA *= step(0.0, uDot.z);
  ma.a *= uWordAlpha; xx.a *= uWordAlpha; dotA *= uWordAlpha;

  // ================= PAPER =================
  vec3 paper = WHITE;
  paper = mix(paper, tealMix(0.55), line * 0.9);
  // wordmark ink
  paper = mix(paper, ma.rgb / max(ma.a, 1e-4), ma.a);
  paper = mix(paper, xx.rgb / max(xx.a, 1e-4), xx.a);
  paper = mix(paper, TEAL, dotA);
  // contact shadow
  vec2 sh = (uv - vec2(uHeroRect.x + uHeroRect.z * 0.5, uHeroRect.y + uHeroRect.w * 0.02)) * vec2(aspect, 1.0);
  float shadow = exp(-pow(sh.x / (uHeroRect.z * aspect * 0.34), 2.0) - pow(sh.y / 0.018, 2.0));
  paper *= 1.0 - shadow * 0.28;
  // photo (neutralised \u2013 no foreign hues on the page)
  vec3 photo = mix(vec3(lum(hero.rgb)), hero.rgb, 0.35);
  paper = mix(paper, photo, hero.a);

  // ================= NIGHT =================
  // filled bands: shades of teal / blue mixed with black, a few lighter
  float bi = mod(band, 7.0);
  vec3 night =
    bi < 0.5 ? INK :
    bi < 1.5 ? blueMix(-0.86) :
    bi < 2.5 ? tealMix(-0.78) :
    bi < 3.5 ? blueMix(-0.62) :
    bi < 4.5 ? tealMix(-0.55) :
    bi < 5.5 ? blueMix(-0.38) :
               tealMix(-0.22);
  night = mix(night, tealMix(-0.25), line * 0.55);
  // vignette toward the object keeps the centre readable
  vec2 hc = (uv - (uHeroRect.xy + uHeroRect.zw * 0.5)) * vec2(aspect, 1.0);
  night *= 0.7 + 0.3 * smoothstep(0.1, 0.9, length(hc));

  // inverted wordmark (ink becomes light)
  night = mix(night, WHITE, ma.a * 0.92);
  night = mix(night, blueMix(0.62), xx.a * 0.95);
  night = mix(night, TEAL, dotA);

  // x-ray duotone of the cutout
  float l = lum(hero.rgb);
  vec3 duo = mix(blueMix(-0.82), tealMix(0.35), smoothstep(0.03, 0.75, l));
  // rim light: opaque here, transparent a few px up-left
  vec2 o = uHeroTexel * 7.0;
  float aL = texture2D(uHero, hl + vec2(-o.x, o.y * 0.6)).a;
  float aR = texture2D(uHero, hl + vec2(o.x, o.y * 0.3)).a;
  float aD = texture2D(uHero, hl + vec2(0.0, -o.y)).a;
  float rimKey = hero.a * (1.0 - aL);
  float rimFill = hero.a * (1.0 - min(aR, aD)) * 0.45;
  vec3 xray = duo + tealMix(0.55) * (rimKey * 1.35 + rimFill);
  night = mix(night, xray, hero.a * 0.94);
  // soft glow around the object
  float glow = 0.0;
  glow += texture2D(uHero, hl + uHeroTexel * vec2(24.0, 0.0)).a;
  glow += texture2D(uHero, hl - uHeroTexel * vec2(24.0, 0.0)).a;
  glow += texture2D(uHero, hl + uHeroTexel * vec2(0.0, 24.0)).a;
  glow += texture2D(uHero, hl - uHeroTexel * vec2(0.0, 24.0)).a;
  night += TEAL * 0.08 * glow * (1.0 - hero.a) * float(inHero);

  // wireframe lathe
  vec4 wire = texture2D(uWire, uv);
  night = mix(night, tealMix(0.25), wire.a * 0.7);

  // ================= MASK =================
  vec2 vel = texture2D(uVel, uv).xy;
  float speed = length(vel);
  float fFluid = speed / uThreshold - 1.0;

  vec2 fc = (uv - uFloodCenter) * vec2(aspect, 1.0);
  float fFlood = -1e3;
  if (uFlood > 0.0005) {
    float nd = snoise(vec3(fc * 2.2, uTime * 0.15)) * 0.14 + snoise(vec3(fc * 6.0, uTime * 0.3)) * 0.04;
    fFlood = (uFlood * 1.9 - (length(fc) + nd)) * 6.0;
  }

  float field = max(fFluid, fFlood);
  float fwf = max(fwidth(field), 1e-4);
  float night01 = smoothstep(-0.5 * fwf, 0.5 * fwf, field);
  float rim = 1.0 - smoothstep(0.0, 1.6 * uDpr, abs(field) / fwf);

  vec3 col = mix(paper, night, night01);
  col = mix(col, tealMix(0.1), rim);

  gl_FragColor = vec4(col, 1.0);
}
`,Fn=class{constructor(t,i){Re(this,"renderer");Re(this,"canvas");Re(this,"opts");Re(this,"fluid");Re(this,"scene",new rr);Re(this,"camera",new ar);Re(this,"mat");Re(this,"wireRT");Re(this,"wireScene",new rr);Re(this,"wireCam",new Sa(0,1,1,0,-2e3,2e3));Re(this,"wire");Re(this,"cutout");Re(this,"heroTex");Re(this,"ma");Re(this,"x");Re(this,"dotBase",new C);Re(this,"heroBase",new at);Re(this,"w",1);Re(this,"h",1);Re(this,"dpr",1);Re(this,"pointer",new Q(.5,.5));Re(this,"pointerPrev",new Q(.5,.5));Re(this,"eased",new Q(.5,.5));Re(this,"lastMove",-1e9);Re(this,"idleW",1);Re(this,"hasPointer",!1);Re(this,"force",new Q);Re(this,"effective",new Q(.5,.5));Re(this,"effectivePrev",new Q(.5,.5));Re(this,"progress",0);Re(this,"time",0);Re(this,"ready",!1);Re(this,"heroLayout",{cx:0,cy:0,heroH:0});this.canvas=t,this.opts=i,this.renderer=new Dn({canvas:t,antialias:!1,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setClearColor(16777215,1),this.renderer.outputColorSpace=er;let r=t.getBoundingClientRect();this.w=Math.max(1,r.width),this.h=Math.max(1,r.height),this.maxDpr=Math.min(window.devicePixelRatio||1,i.mobile?1.25:1.5),this.dpr=this.maxDpr,this.frameAvg=16.7,this.frameCount=0,this.renderer.setPixelRatio(this.dpr),this.renderer.setSize(this.w,this.h,!1),this.fluid=new Un(this.renderer,this.w,this.h,{scale:.1,iterations:4,dissipation:.96}),this.wireRT=new Vt(this.w*this.dpr,this.h*this.dpr,{depthBuffer:!0,samples:0});let a=new Bi(new Uint8Array([0,0,0,0]),1,1);a.needsUpdate=!0,this.mat=new Gt({vertexShader:o_,fragmentShader:l_,depthTest:!1,depthWrite:!1,uniforms:{uRes:{value:new Q(this.w,this.h)},uDpr:{value:this.dpr},uTime:{value:0},uMouse:{value:this.eased},uMouseAmt:{value:0},uVel:{value:this.fluid.texture},uThreshold:{value:.16},uWire:{value:this.wireRT.texture},uHero:{value:a},uHeroRect:{value:new at(2,2,.1,.1)},uHeroTexel:{value:new Q(1,1)},uMa:{value:a},uMaRect:{value:new at(2,2,.1,.1)},uX:{value:a},uXRect:{value:new at(2,2,.1,.1)},uDot:{value:new C(2,2,-1)},uWordAlpha:{value:1},uFlood:{value:0},uFloodCenter:{value:new Q(.5,.5)}}});let n=new mt;n.setAttribute("position",new Ne([-1,-1,0,3,-1,0,-1,3,0],3)),n.setAttribute("uv",new Ne([0,0,2,0,0,2],2));let s=new Pt(n,this.mat);s.frustumCulled=!1,this.scene.add(s)}async load(){let[t]=await Promise.all([On(this.opts.heroSrc,1600),this.loadFonts()]);this.cutout=t;let i=new Wt(t.img);i.colorSpace=Zt,i.minFilter=Qt,i.magFilter=ht,i.anisotropy=4,i.needsUpdate=!0,this.heroTex=i,this.mat.uniforms.uHero.value=i,this.mat.uniforms.uHeroTexel.value.set(1/t.width,1/t.height),this.buildWire(t),this.layout(),this.ready=!0}async loadFonts(){let{fontSans:t,fontSerif:i}=this.opts;try{await Promise.all([document.fonts.load(`800 120px ${t}`),document.fonts.load(`italic 300 120px ${i}`)])}catch{}}buildWire(t){let i=Bn(t,"y",64),r=i.points.map(([c,d])=>[c,.5-d]),a=[],n=64,s=22;for(let c=2;c<r.length-1;c+=3){let[d,u]=r[c];for(let m=0;m<n;m++){let g=m/n*Math.PI*2,v=(m+1)/n*Math.PI*2;a.push(Math.sin(g)*d,u,Math.cos(g)*d,Math.sin(v)*d,u,Math.cos(v)*d)}}for(let c=0;c<s;c++){let d=c/s*Math.PI*2;for(let u=0;u<r.length-1;u++){let[m,g]=r[u],[v,f]=r[u+1];a.push(Math.sin(d)*m,g,Math.cos(d)*m,Math.sin(d)*v,f,Math.cos(d)*v)}}let l=new mt;l.setAttribute("position",new Ne(a,3));let o=new Io({color:s_,transparent:!0,opacity:.75});this.wire=new Zh(l,o);let h=t.bbox;this.wire.userData.axisOffset=(i.center-(h.x0+h.x1)/2)/(h.y1-h.y0),this.wireScene.add(this.wire)}makeGlyph(t,i,r,a,n,s){let l=document.createElement("canvas"),o=l.getContext("2d"),h=f=>{o.font=i.replace("{size}",`${f}px`),"fontStretch"in o&&(o.fontStretch=r)};h(s);let c=o.measureText(t),d=s;if(n){let f=c.actualBoundingBoxAscent+c.actualBoundingBoxDescent;d=s*n/Math.max(1,f),h(d),c=o.measureText(t)}let u=Math.ceil(d*.04),m=c.actualBoundingBoxLeft+c.actualBoundingBoxRight,g=c.actualBoundingBoxAscent+c.actualBoundingBoxDescent,v=this.dpr;return l.width=Math.ceil((m+u*2)*v),l.height=Math.ceil((g+u*2)*v),h(d*v),o.fillStyle=a,o.textBaseline="alphabetic",o.fillText(t,(u+c.actualBoundingBoxLeft)*v,(u+c.actualBoundingBoxAscent)*v),{canvas:l,w:m,h:g,pad:u,ascent:c.actualBoundingBoxAscent,descent:c.actualBoundingBoxDescent}}toTex(t,i){i?.tex.dispose();let r=new Kh(t);return r.colorSpace=Zt,r.premultiplyAlpha=!1,r.minFilter=ht,r.generateMipmaps=!1,r}layout(){if(!this.cutout)return;let{w:t,h:i}=this,r=t<768,a=this.opts.fontSans,n=this.opts.fontSerif,s=this.makeGlyph(this.opts.text.ma,`800 {size} ${a}`,"expanded","#44b6c7",null,200),l=s.ascent,o=this.makeGlyph(this.opts.text.x,`italic 300 {size} ${n}`,"normal","#0582c8",l*2.03,200),h=s.w/l+.1+o.w/l+.12+.34,d=t*(r?.92:.9)/h;d=Math.min(d,i*(r?.3:.62)/2.03);let u=d/l,m=this.makeGlyph(this.opts.text.ma,`800 {size} ${a}`,"expanded","#44b6c7",null,200*u),g=this.makeGlyph(this.opts.text.x,`italic 300 {size} ${n}`,"normal","#0582c8",d*2.03,200),v=m.w+d*.1+g.w+d*.12+d*.34,f=(t-v)/2,p=r?i*.3:i*.5+d*.42,y=f-m.pad,E=p-m.ascent-m.pad,_=this.rectUV(y,E,m.w+m.pad*2,m.h+m.pad*2),S=p-d*1.08,w=f+m.w+d*.1,R=this.rectUV(w-g.pad,S-g.pad,g.w+g.pad*2,g.h+g.pad*2),x=d*.17,T=w+g.w+d*.12+x*.5,N=p+d*.47;this.ma={tex:this.toTex(m.canvas,this.ma),rect:_.clone(),base:_},this.x={tex:this.toTex(g.canvas,this.x),rect:R.clone(),base:R},this.mat.uniforms.uMa.value=this.ma.tex,this.mat.uniforms.uX.value=this.x.tex,this.dotBase.set(T/t,1-N/i,x);let P=this.cutout.bbox,D=this.cutout.width,G=this.cutout.height,I=P.y1-P.y0,z=r?i*.4:Math.min(i*.58,t*.46),Z=z/I,k=D*Z,le=G*Z,j=t/2,q=i*(r?.62:.52),ee=(P.x0+P.x1)/2*Z,Be=(P.y0+P.y1)/2*Z,be=j-ee,nt=q-Be;this.heroBase.set(be/t,1-(nt+le)/i,k/t,le/i),this.mat.uniforms.uFloodCenter.value.set(j/t,1-q/i),this.heroLayout={cx:j,cy:q,heroH:z},this.applyProgress()}rectUV(t,i,r,a){return new at(t/this.w,1-(i+a)/this.h,r/this.w,a/this.h)}setPointer(t,i){let r=this.canvas.getBoundingClientRect();this.pointer.set((t-r.left)/r.width,1-(i-r.top)/r.height),this.hasPointer||(this.hasPointer=!0,this.pointerPrev.copy(this.pointer)),this.lastMove=this.time}setProgress(t){this.progress=t,this.applyProgress()}applyProgress(){let t=this.progress,i=d=>d<.5?4*d*d*d:1-Math.pow(-2*d+2,3)/2,r=d=>Math.min(1,Math.max(0,d)),a=i(r(t/.62)),n=this.mat.uniforms;this.ma&&this.x&&(this.ma.rect.copy(this.ma.base),this.ma.rect.x-=a*.42,this.ma.rect.y+=a*.06,this.x.rect.copy(this.x.base),this.x.rect.x+=a*.38,this.x.rect.y-=a*.1,n.uMaRect.value.copy(this.ma.rect),n.uXRect.value.copy(this.x.rect)),n.uDot.value.set(this.dotBase.x+a*.2,this.dotBase.y+a*.34,this.dotBase.z*(1+a*.6)),n.uWordAlpha.value=1-r((t-.45)/.3),n.uFlood.value=Math.pow(r((t-.04)/.62),1.4);let s=i(r((t-.35)/.6)),l=1-s*.2,o=this.heroBase,h=o.x+o.z/2,c=o.y+o.w/2;n.uHeroRect.value.set(h-o.z*l/2,c-o.w*l/2+s*.1,o.z*l,o.w*l)}resize(){let t=this.canvas.getBoundingClientRect(),i=Math.max(1,t.width),r=Math.max(1,t.height);Math.abs(i-this.w)<1&&Math.abs(r-this.h)<1||(this.w=i,this.h=r,this.renderer.setSize(i,r,!1),this.wireRT.setSize(i*this.dpr,r*this.dpr),this.fluid.resize(i,r),this.mat.uniforms.uRes.value.set(i,r),this.layout())}adapt(t){if(this.frameAvg+=(t*1e3-this.frameAvg)*.05,++this.frameCount<45)return;let i=this.dpr;this.frameAvg>22&&this.dpr>.6?i=Math.max(.6,this.dpr-.2):this.frameAvg<12&&this.dpr<this.maxDpr&&(i=Math.min(this.maxDpr,this.dpr+.1)),i!==this.dpr&&(this.dpr=i,this.frameCount=0,this.renderer.setPixelRatio(i),this.renderer.setSize(this.w,this.h,!1),this.wireRT.setSize(Math.round(this.w*i),Math.round(this.h*i)),this.mat.uniforms.uDpr.value=i,this.layout())}render(t){if(this.adapt(t),!this.ready)return;t=Math.min(t,1/30),this.time+=t;let i=this.mat.uniforms;i.uTime.value=this.time;let r=this.time-this.lastMove>1.6||!this.hasPointer;this.idleW+=((r?1:0)-this.idleW)*(r?.02:.2);let a=this.time,n=this.heroLayout,s=n.cx/this.w+Math.sin(a*.62)*.26+Math.sin(a*1.7)*.03,l=1-n.cy/this.h+Math.sin(a*.93+1.2)*.2;if(this.effectivePrev.copy(this.effective),this.effective.set(this.pointer.x*(1-this.idleW)+s*this.idleW,this.pointer.y*(1-this.idleW)+l*this.idleW),this.eased.lerp(this.effective,1-Math.pow(.001,t)),i.uMouseAmt.value+=((this.opts.reduced?0:1)-i.uMouseAmt.value)*.05,!this.opts.reduced){this.force.subVectors(this.effective,this.effectivePrev).divideScalar(Math.max(t,.001)),this.force.multiplyScalar(1-this.idleW*.35);let o=6;this.force.length()>o&&this.force.setLength(o),this.fluid.step(t,this.effective,this.force,this.w<768?.07:.05)}if(i.uVel.value=this.fluid.texture,this.wire){let o=i.uHeroRect.value,h=this.cutout,c=h.bbox,d=o.w*(c.y1-c.y0)/h.height,u=o.y+o.w*(1-(c.y0+c.y1)/2/h.height),m=o.x+o.z*((c.x0+c.x1)/2/h.width),g=d*this.h;this.wireCam.left=0,this.wireCam.right=this.w,this.wireCam.top=this.h,this.wireCam.bottom=0,this.wireCam.updateProjectionMatrix(),this.wire.position.set(m*this.w+this.wire.userData.axisOffset*g,u*this.h,0),this.wire.scale.setScalar(g),this.wire.rotation.set(.16+(this.eased.y-.5)*.25,a*.35+(this.eased.x-.5)*.8,0);let v=this.renderer;v.setRenderTarget(this.wireRT),v.setClearColor(0,0),v.clear(),v.render(this.wireScene,this.wireCam),v.setClearColor(16777215,1)}this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)}dispose(){this.fluid.dispose(),this.wireRT.dispose(),this.mat.dispose(),this.heroTex?.dispose(),this.ma?.tex.dispose(),this.x?.tex.dispose(),this.wire?.geometry.dispose(),this.wire?.material?.dispose(),this.renderer.dispose()}};function Wc(){let e=document.getElementById("start"),t=document.getElementById("hero-canvas"),i=document.getElementById("hero-corners"),r=e.querySelectorAll("[data-intro]"),a=null;if(je.webgl)try{a=new Fn(t,{heroSrc:cr.hero,fontSans:'"Archivo"',fontSerif:'"Newsreader"',text:{ma:t.dataset.wordMa||"ma",x:t.dataset.wordX||"x"},reduced:je.reduced,mobile:window.innerWidth<768||$o()}),lr(a.load())}catch{a=null,document.documentElement.classList.add("no-webgl")}let n=performance.now();if(Le.ticker.add(()=>{let l=performance.now(),o=(l-n)/1e3;if(n=l,!a)return;let h=e.getBoundingClientRect();h.bottom>0&&h.top<window.innerHeight&&a.render(o)}),window.addEventListener("pointermove",l=>a?.setPointer(l.clientX,l.clientY),{passive:!0}),window.addEventListener("resize",()=>a?.resize()),je.reduced){vt.create({trigger:e,start:"top top",end:"bottom top",onUpdate:l=>Rt(0,l.progress)});return}Le.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:e,start:"top top",end:()=>`+=${window.innerHeight*1.2}`,pin:!0,scrub:!0,invalidateOnRefresh:!0,onUpdate:l=>{a?.setProgress(l.progress),Rt(0,l.progress),hr(l.progress>.32?"dark":"light")}}}).to(i,{opacity:0,duration:.25},.05).fromTo(r,{opacity:0,y:60},{opacity:1,y:0,stagger:.06,duration:.3,ease:"power2.out"},.55).to({},{duration:.1}),Ra(()=>Le.from(i.children,{opacity:0,y:14,stagger:.07,duration:1,ease:"expo.out",delay:.2}))}var Xc=new Map;function jc(e){let t=Xc.get(e);if(t)return t;let i=cr.equipment[e],r=On(i.src,1024).then(a=>d_(e,a,i.axis));return Xc.set(e,r),r}function h_(e,t,i){let r=Math.min(1,Math.max(0,(i-e)/(t-e)));return r*r*(3-2*r)}function c_(e){let{width:t,height:i,data:r}=e,a=new Uint8Array(t*i*4),n=new Uint8Array(t*i*4),s=0,l=0,o=0,h=0;for(let g=0;g<t*i;g++)r[g*4+3]>200&&(s+=r[g*4],l+=r[g*4+1],o+=r[g*4+2],h++);s/=h||1,l/=h||1,o/=h||1;let c=1234567,d=()=>(c=c*16807%2147483647)/2147483647;for(let g=0;g<i;g++)for(let v=0;v<t;v++){let f=(g*t+v)*4,p=((i-1-g)*t+v)*4,y=r[f+3],E=y>8?r[f]:s,_=y>8?r[f+1]:l,S=y>8?r[f+2]:o,w=Math.max(E,_,S),R=Math.min(E,_,S),x=w>0?(w-R)/w:0,T=(.2126*E+.7152*_+.0722*S)/255,N=.12,P=.16+Math.pow(T,.75)*.95;E=(T+(E/255-T)*N)*P*255,_=(T+(_/255-T)*N)*P*255,S=(T+(S/255-T)*N)*P*255,a[p]=Math.min(255,E),a[p+1]=Math.min(255,_),a[p+2]=Math.min(255,S),a[p+3]=y;let D=h_(.35,.8,T),G=Math.min(1,.52-D*.34+x*.4+(d()-.5)*.08),I=Math.min(1,Math.max(0,(1-x*2.2)*(.78+D*.22)));n[p]=255,n[p+1]=Math.round(Math.max(.06,G)*255),n[p+2]=Math.round(I*255),n[p+3]=255}let u=new Bi(a,t,i,Ot);u.colorSpace=Dt;let m=new Bi(n,t,i,Ot);m.colorSpace=Zt;for(let g of[u,m])g.generateMipmaps=!0,g.minFilter=Qt,g.magFilter=ht,g.wrapS=g.wrapT=Ut,g.anisotropy=8,g.needsUpdate=!0;return{map:u,orm:m}}function u_(e,t,i,r,a){let n=e.attributes.position,s=new Float32Array(n.count*2);for(let l=0;l<n.count;l++){let o=n.getX(l),h=n.getY(l),c=r+o*i,d=a-h*i;s[l*2]=c/t.width,s[l*2+1]=1-d/t.height}e.setAttribute("uv",new ti(s,2))}function d_(e,t,i){let{map:r,orm:a}=c_(t),n=t.bbox,s=n.x1-n.x0,l=n.y1-n.y0,o;if(i==="disc"){let u=s,m=.16,g=new In(.5,.5,m,96,1,!1);g.rotateX(Math.PI/2);let v=l-u*.1,f=g.attributes.position,p=new Float32Array(f.count*2),y=(n.x0+n.x1)/2,E=n.y0+v/2;for(let _=0;_<f.count;_++){let S=f.getX(_),w=f.getY(_),R=y+S*u,x=E-w*v;p[_*2]=R/t.width,p[_*2+1]=1-x/t.height}g.setAttribute("uv",new ti(p,2)),o=g}else{let u=Bn(t,i,128),m=u.length,g=u.points.map(([y,E])=>new Q(y,.5-E)).reverse(),v=new Do(g,128),f,p;i==="x"?(v.rotateZ(-Math.PI/2),v.rotateY(Math.PI),f=u.start+m/2,p=u.center):(f=u.center,p=u.start+m/2),v.computeVertexNormals(),u_(v,t,m,f,p),o=v}o.computeBoundingBox();let h=new C;o.boundingBox.getSize(h);let c=1/Math.max(h.x,h.y,h.z);o.scale(c,c,c),o.computeBoundingBox(),o.boundingBox.getSize(h);let d=new C;return o.boundingBox.getCenter(d),o.translate(-d.x,-d.y,-d.z),{key:e,geometry:o,map:r,orm:a,size:h}}function qc(e){return new Pc({map:e.map,roughnessMap:e.orm,metalnessMap:e.orm,roughness:1,metalness:.92,clearcoat:.35,clearcoatRoughness:.28,alphaTest:.5,side:ni,envMapIntensity:1})}var zo=class{constructor(){Re(this,"renderer",null);Re(this,"canvas",null);Re(this,"envMap",null);Re(this,"envPromise",null);Re(this,"views",new Set);Re(this,"drewLast",!0);Re(this,"time",0);Re(this,"last",0);Re(this,"onResize",()=>{this.renderer&&this.renderer.setSize(window.innerWidth,window.innerHeight,!1)});Re(this,"tick",()=>{let t=this.renderer;if(!t)return;let i=performance.now(),r=Math.min(.05,(i-this.last)/1e3);this.last=i,this.time+=r;let a=window.innerWidth,n=window.innerHeight,s=[];for(let l of this.views){let o=l.el.getBoundingClientRect();o.bottom<0||o.top>n||o.right<0||o.left>a||o.width<2||o.height<2||s.push([l,o])}if(!(!s.length&&!this.drewLast)){this.drewLast=s.length>0,t.setScissorTest(!1),t.clear(!0,!0,!1),t.setScissorTest(!0);for(let[l,o]of s){l.update?.(this.time,r,o);let h=o.width/o.height;Math.abs(l.camera.aspect-h)>1e-4&&(l.camera.aspect=h,l.camera.updateProjectionMatrix());let c=n-o.bottom;t.setViewport(o.left,c,o.width,o.height),t.setScissor(o.left,c,o.width,o.height),t.render(l.scene,l.camera)}}})}mount(){if(this.renderer)return;let t=document.createElement("canvas");t.setAttribute("aria-hidden","true"),t.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:30;",document.body.appendChild(t),this.canvas=t;try{let i=new Dn({canvas:t,antialias:!0,alpha:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<768?1.25:1.5)),i.setSize(window.innerWidth,window.innerHeight,!1),i.setClearColor(0,0),i.toneMapping=An,i.toneMappingExposure=1.15,i.outputColorSpace=Dt,i.setScissorTest(!0),this.renderer=i}catch{t.remove(),this.canvas=null;return}window.addEventListener("resize",this.onResize),Le.ticker.add(this.tick),this.last=performance.now()}loadEnv(){if(this.envPromise)return this.envPromise;this.mount();let t=this.renderer;return t?(this.envPromise=lr(new Hc().loadAsync(Pa(cr.hdri)).then(i=>{let r=new wn(t),a=r.fromEquirectangular(i).texture;return i.dispose(),r.dispose(),this.envMap=a,a})).catch(()=>null),this.envPromise):this.envPromise=Promise.resolve(null)}createScene(){let t=new rr;return t.environmentIntensity=1.2,t.environmentRotation.set(0,Math.PI/2,0),this.loadEnv().then(i=>{i&&(t.environment=i)}),t}add(t){return this.mount(),this.views.add(t),()=>{this.views.delete(t)}}},ba=new zo;function jr(e,t,{fov:i=30,distance:r=2.6,setup:a,frame:n}={}){if(ba.mount(),!ba.renderer)return null;let s=ba.createScene(),l=new qt(i,1,.1,100);l.position.set(0,0,r);let o=[],h=lr(Promise.all(t.map(c=>jc(c))).then(c=>(o=c.map(d=>{let u=new Pt(d.geometry,qc(d));return u.userData.key=d.key,s.add(u),u}),o)));return a?.({scene:s,camera:l}),ba.add({el:e,scene:s,camera:l,update:(c,d,u)=>{o.length&&n?.(c,d,o,u)}}),{scene:s,camera:l,ready:h}}function Yc(){let e=document.getElementById("bereiche"),t=[...e.querySelectorAll("[data-area]")],i=[...e.querySelectorAll("[data-glow]")],r=[...e.querySelectorAll("[data-seg]")],a=e.querySelector("[data-count]"),n=t.length,s={a:0,spin:0};if(je.reduced){vt.create({trigger:e,start:"top top",end:"bottom top",onUpdate:h=>Rt(1,h.progress)}),It(e,"light");return}je.webgl&&jr(e.querySelector('[data-view="areas"]'),t.map(h=>h.dataset.equipment),{fov:26,distance:3.1,setup:({scene:h})=>{let c=new nr("#44b6c7",2.2);c.position.set(-2,1.5,-2);let d=new nr("#ffffff",.6);d.position.set(2,2,3),h.add(c,d)},frame:(h,c,d)=>{s.spin+=c*.35,d.forEach((u,m)=>{let g=s.a-m,v=1-Aa(Math.abs(g)*1.9),f=u.userData.key;u.visible=v>.001;let p=f==="dumbbell"?.95:f==="plate"?.78:.82;u.scale.setScalar(p*(.55+.45*kn(v))),u.position.set(0,-g*.9,0),u.rotation.set((f==="plate"?-.25:.12)+Math.sin(h*.6)*.04,s.spin+m*1.3+g*2.4,f==="dumbbell"?.18:0)})}});let l=0,o=h=>{if(h===l)return;let c=l;l=h;let d=h>c?1:-1;Le.to(t[c],{autoAlpha:0,duration:.35,ease:"power2.in"}),Le.to(t[c].querySelectorAll("[data-rise]"),{yPercent:-40*d,duration:.35,ease:"power2.in"}),Le.fromTo(t[h],{autoAlpha:0},{autoAlpha:1,duration:.5,delay:.15}),Le.fromTo(t[h].querySelectorAll("[data-rise]"),{yPercent:60*d},{yPercent:0,duration:.8,ease:"expo.out",stagger:.035,delay:.15}),i.forEach((m,g)=>Le.to(m,{opacity:g===h?1:0,duration:.8,ease:"power2.inOut"})),a.textContent=Yr(h+1);let u=t[h].dataset.tint==="dark";e.dataset.dark=u?"1":"0",hr(u?"dark":"light")};vt.create({trigger:e,start:"top top",end:()=>`+=${window.innerHeight*.7*n}`,pin:!0,invalidateOnRefresh:!0,onUpdate:h=>{let c=h.progress*(n-1),d=Math.floor(c);s.a=Math.min(n-1,d+kn(Aa((c-d-.3)/.4))),o(Math.min(n-1,Math.round(c))),r.forEach((u,m)=>u.style.transform=`scaleX(${Aa(c-m+1)})`),Rt(1,h.progress)},onToggle:h=>h.isActive&&hr(t[l].dataset.tint==="dark"?"dark":"light")})}function Zc(){let e=document.getElementById("methode"),t=[...e.querySelectorAll("[data-panel]")],i=[...e.querySelectorAll("[data-tab]")],r=document.getElementById("method-ring"),a=document.getElementById("method-deg"),n=t.length,s={p:0,turn:0,px:0,py:0,tx:0,ty:0},l='<circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" stroke-width="0.3"/>';for(let d=0;d<72;d++){let u=d%18===0?9:d%6===0?6:4;l+=`<line x1="100" y1="2" x2="100" y2="${u}" stroke="${d===0?"#44b6c7":"currentColor"}" stroke-width="${d===0?1:.3}" transform="rotate(${d*5} 100 100)"/>`}if(r.innerHTML=l,t.forEach(d=>d.querySelector(".bar b").style.setProperty("--v",d.dataset.bar)),je.reduced){vt.create({trigger:e,start:"top top",end:"bottom top",onUpdate:d=>Rt(2,d.progress)}),It(e,"light");return}je.webgl&&jr(e.querySelector('[data-view="method"]'),[e.dataset.equipment||"dumbbell"],{fov:18,distance:3.7,setup:({scene:d})=>{let u=new nr("#44b6c7",1.6);u.position.set(-3,2,-3),d.add(u)},frame:(d,u,[m])=>{let g=1-Math.pow(.0025,u);s.turn+=(s.p*Math.PI*2-s.turn)*g,s.px+=(s.tx-s.px)*g*.6,s.py+=(s.ty-s.py)*g*.6,m.rotation.set(.28+s.py*.22,s.turn+s.px*.35,.08-s.px*.06),m.position.set(s.px*.05,-s.py*.03,0);let v=(s.turn*180/Math.PI%360+360)%360;a.textContent=String(Math.round(v)).padStart(3,"0"),r.style.transform=`rotate(${-s.turn*180/Math.PI}deg)`}}),window.addEventListener("pointermove",d=>{s.tx=d.clientX/innerWidth*2-1,s.ty=d.clientY/innerHeight*2-1},{passive:!0});let o=-1,h=d=>{if(d===o)return;let u=o;o=d,i.forEach((m,g)=>m.setAttribute("aria-selected",String(g===d))),u>=0&&Le.to(t[u],{autoAlpha:0,y:-24,duration:.3,ease:"power2.in"}),Le.fromTo(t[d],{autoAlpha:0,y:32},{autoAlpha:1,y:0,duration:.7,delay:u>=0?.15:0,ease:"expo.out"}),Le.fromTo(t[d].querySelector(".bar b"),{scaleX:0},{scaleX:+t[d].dataset.bar,duration:1.1,delay:.25,ease:"expo.out"})};t.forEach((d,u)=>u&&Le.set(d,{autoAlpha:0})),h(0);let c=vt.create({trigger:e,start:"top top",end:()=>`+=${window.innerHeight*.7*n}`,pin:!0,invalidateOnRefresh:!0,onUpdate:d=>{s.p=d.progress,h(Math.min(n-1,Math.floor(d.progress*n*.9999))),Rt(2,d.progress)}});It(e,"light"),i.forEach((d,u)=>d.addEventListener("click",()=>Ca(c.start+(u+.5)/n*(c.end-c.start))))}function Jc(){let e=document.getElementById("geschichte"),t=[...e.querySelectorAll("[data-year]")],i=[...e.querySelectorAll("[data-photo]")],r=[...e.querySelectorAll("[data-text]")],a=[...e.querySelectorAll("[data-rail]")],n=document.getElementById("story-fill"),s=t.length;if(e.querySelectorAll("[data-current-year]").forEach(h=>h.textContent=String(new Date().getFullYear())),t.forEach(h=>h.innerHTML=[...h.textContent.trim()].map(c=>`<span>${c}</span>`).join("")),je.reduced){vt.create({trigger:e,start:"top top",end:"bottom top",onUpdate:h=>Rt(3,h.progress)}),It(e,"dark");return}t.forEach((h,c)=>c&&Le.set(h.children,{yPercent:110}));let l=0,o=h=>{if(h===l)return;let c=l;l=h;let d=h>c?1:-1;Le.to(t[c].children,{yPercent:-110*d,duration:.5,stagger:.04,ease:"power3.in"}),Le.fromTo(t[h].children,{yPercent:110*d},{yPercent:0,duration:.9,stagger:.06,ease:"expo.out",delay:.2}),i.forEach((u,m)=>u.style.zIndex=m===h?2:m===c?1:0),Le.fromTo(i[h],{clipPath:d>0?"inset(100% 0% 0% 0%)":"inset(0% 0% 100% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1,ease:"expo.inOut"}),Le.fromTo(i[h].querySelector("img"),{scale:1.25},{scale:1.06,duration:1.4,ease:"expo.out"}),Le.to(r[c],{autoAlpha:0,y:-20*d,duration:.3,ease:"power2.in"}),Le.fromTo(r[h],{autoAlpha:0,y:30*d},{autoAlpha:1,y:0,duration:.8,delay:.3,ease:"expo.out"}),a.forEach((u,m)=>u.setAttribute("aria-current",String(m===h)))};vt.create({trigger:e,start:"top top",end:()=>`+=${window.innerHeight*.65*s}`,pin:!0,invalidateOnRefresh:!0,onUpdate:h=>{o(Math.round(h.progress*(s-1))),n&&(n.style.transform=`scaleY(${h.progress})`),Rt(3,h.progress)}}),It(e,"dark")}function Kc(){let e=document.getElementById("stimmen"),t=[...e.querySelectorAll("[data-quote]")],i=[...e.querySelectorAll("[data-qdot]")],r=t.length;t.forEach(o=>{let h=o.querySelector("blockquote"),c=h.querySelector(".quote__mark"),d=h.textContent.replace(c.textContent,"").trim().split(/\s+/);h.innerHTML="",h.append(c),d.forEach(u=>{let m=document.createElement("span");m.className="w",m.innerHTML=`<span data-w>${u}&nbsp;</span>`,h.append(m)})});let a=[...e.querySelectorAll("[data-marquee]")].map(o=>{let h=o.querySelector(".marquee__track"),c=document.createElement("div");return c.className="marquee__inner",o.append(c),c.append(h,h.cloneNode(!0),h.cloneNode(!0)),{inner:c,dir:+o.dataset.marquee,x:0}});if(je.reduced){vt.create({trigger:e,start:"top top",end:"bottom top",onUpdate:o=>Rt(4,o.progress)}),It(e,"light");return}let n=1;Le.ticker.add((o,h)=>{let c=e.getBoundingClientRect();if(c.bottom<0||c.top>innerHeight)return;let d=je.velocity;Math.abs(d)>.5&&(n=Math.sign(d));let u=(.6+Math.min(Math.abs(d)*.45,22))*n*(h/16.67),m=Math.max(-8,Math.min(8,d*.25));a.forEach(g=>{let v=g.inner.scrollWidth/3;g.x=((g.x+u*g.dir*(g.dir<0?.85:1))%v+v)%v,g.inner.style.transform=`translate3d(${-g.x}px,0,0) skewX(${-m}deg)`})});let s=0;t.forEach((o,h)=>h&&Le.set(o,{autoAlpha:0}));let l=o=>{if(o===s)return;let h=s;s=o;let c=o>h?1:-1;Le.to(t[h],{autoAlpha:0,duration:.35,ease:"power2.in"}),Le.to(t[h].querySelectorAll("[data-w]"),{yPercent:-100*c,duration:.35,stagger:.008,ease:"power2.in"}),Le.set(t[o],{autoAlpha:1}),Le.fromTo(t[o].querySelectorAll("[data-w]"),{yPercent:110*c},{yPercent:0,duration:.8,stagger:.016,ease:"expo.out",delay:.15}),i.forEach((d,u)=>d.setAttribute("aria-current",String(u===o)))};vt.create({trigger:e,start:"top top",end:()=>`+=${window.innerHeight*.6*r}`,pin:!0,invalidateOnRefresh:!0,onUpdate:o=>{l(Math.min(r-1,Math.round(o.progress*(r-1)))),Rt(4,o.progress)}}),It(e,"light")}function $c(){let e=document.getElementById("studio"),t=document.getElementById("studio-facts"),i=[...e.querySelectorAll("[data-num]")],r=[...e.querySelectorAll("[data-fact]")],a=[...e.querySelectorAll("[data-offer]")];if(vt.create({trigger:e,start:"top top",endTrigger:document.getElementById("kontakt"),end:"bottom bottom",onUpdate:s=>Rt(5,Math.max(.001,s.progress))}),je.reduced){It(e,"light");return}je.webgl&&a.forEach((s,l)=>{let o=s.querySelector("[data-view]"),h={v:0},c=l*1.7;s.addEventListener("pointerenter",()=>Le.to(h,{v:1,duration:.6})),s.addEventListener("pointerleave",()=>Le.to(h,{v:0,duration:.8})),jr(o,[o.dataset.equipment],{fov:24,distance:3.3,setup:({scene:d})=>{let u=new nr("#44b6c7",1.8);u.position.set(-2,1,-2),d.add(u)},frame:(d,u,[m])=>{c+=u*(.35+h.v*1.6);let g=m.userData.key;m.rotation.set(g==="plate"?-.3:.14,c,g==="dumbbell"?.2:0),m.position.y=Math.sin(d*.9+l)*.025,m.scale.setScalar(g==="dumbbell"?.92:.74)}})}),i.forEach(s=>s.textContent="0");let n=Le.timeline({scrollTrigger:{trigger:t,start:"top top",end:()=>`+=${window.innerHeight*.6}`,pin:!0,scrub:.5,invalidateOnRefresh:!0}});i.forEach((s,l)=>{let o={v:0},h=+s.dataset.num;n.to(o,{v:h,duration:.6,ease:"power1.out",onUpdate:()=>s.textContent=String(Math.round(o.v))},l*.06)}),n.to({},{duration:.2}),Le.from(r,{y:60,opacity:0,stagger:.08,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:t,start:"top 55%"}}),Le.from(a,{y:80,opacity:0,stagger:.1,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:e.querySelector(".offers"),start:"top 80%"}}),It(e,"light")}function Qc(){let e=document.getElementById("kontakt");It(e,"dark","top 45%"),document.getElementById("year").textContent=String(new Date().getFullYear());let t=document.getElementById("contact-form"),i=document.getElementById("form-note");t.addEventListener("submit",a=>{t.getAttribute("action")&&t.getAttribute("action")!=="#"||(a.preventDefault(),i.textContent=i.dataset.success,t.querySelector("button").disabled=!0)});let r=document.getElementById("closing");r.innerHTML=[...r.textContent].map(a=>`<span aria-hidden="true">${a}</span>`).join(""),!je.reduced&&Le.from(r.children,{yPercent:105,duration:1.2,stagger:.025,ease:"expo.out",scrollTrigger:{trigger:r,start:"top 92%"}})}var eu=document.documentElement;je.reduced&&eu.classList.add("reduced");try{let e=document.createElement("canvas");je.webgl=!!e.getContext("webgl2")}catch{je.webgl=!1}je.webgl||eu.classList.add("no-webgl");al();nl();ol();Wc();Yc();Zc();Jc();Kc();$c();Qc();sl();document.fonts?.ready.then(()=>vt.refresh());window.addEventListener("load",()=>vt.refresh());})();
