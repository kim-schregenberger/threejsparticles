import{S as R,T as A,B as F,a as Y,P as b,b as P,D as B,G as X,c as D,O as H,W as I,R as K,V as j,d as O,e as $,f as q,g as V,C as U}from"./OrbitControls-Cd1rOr5e.js";import{G as Z}from"./lil-gui.esm-DNkUmkFf.js";import{g as J}from"./index-DjKJqAo0.js";const f=new Z;f.domElement.style.display="none";document.addEventListener("keydown",e=>{if(e.key==="h"||e.key==="H"){const t=f.domElement;t.style.display==="none"?t.style.display="block":t.style.display="none"}});const o={materialColor:"#ffeded",sphereSegments:64,torusKnotSegments:200,boxSegments:20,torusSegments:40},G=document.querySelector("canvas.webgl"),s=new R,N=new A,Q=N.load("/textures/particles/14.webp"),g=(e,t,r)=>{const d=new b({size:r,sizeAttenuation:!0,color:t,transparent:!0,alphaTest:.5,depthWrite:!0});return new P(e,d)};let a,m,c,w;const i=4,_=()=>{a&&(s.remove(a),s.remove(m),s.remove(c),s.remove(w));const e=new O(1,o.sphereSegments,o.sphereSegments),t=new $(.6,.3,o.torusKnotSegments,50),r=new q(1.5,1.5,1.5,o.boxSegments,o.boxSegments,o.boxSegments),d=new V(.8,.4,o.torusSegments,150);a=g(e,o.materialColor,.02),m=g(t,o.materialColor,.02),c=g(r,o.materialColor,.02),w=g(d,o.materialColor,.02),M(),s.add(a,m,c,w)},M=()=>{window.innerWidth<=800?(a.position.set(0,-i*1,0),m.position.set(0,-i*2,0),c.position.set(0,-i*3,0),w.position.set(0,-i*4,0)):(a.position.set(-2,-i*1,0),m.position.set(2,-i*2,0),c.position.set(-2,-i*3,0),w.position.set(2,-i*4,0))};_();f.addColor(o,"materialColor").onChange(()=>{a.material.color.set(o.materialColor),m.material.color.set(o.materialColor),c.material.color.set(o.materialColor),w.material.color.set(o.materialColor)});const T=300,y=new Float32Array(T*3);for(let e=0;e<T;e++)y[e*3+0]=(Math.random()-.5)*10,y[e*3+1]=i*.5-Math.random()*i*5,y[e*3+2]=(Math.random()-.5)*10;const v=new F;v.setAttribute("position",new Y(y,3));const ee=new b({color:o.materialColor,sizeAttenuation:!0,size:.1,map:Q,transparent:!0,alphaTest:.5,depthWrite:!0}),te=new P(v,ee);s.add(te);const L=new B("#ffffff",3);L.position.set(1,1,0);s.add(L);const n={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,l.aspect=n.width/n.height,l.updateProjectionMatrix(),u.setSize(n.width,n.height),u.setPixelRatio(Math.min(window.devicePixelRatio,2)),M()});const h=new X;s.add(h);const l=new D(35,n.width/n.height,.1,100);l.position.z=6;h.add(l);const z=new H(l,G);z.enableDamping=!0;z.enableZoom=!1;const u=new I({canvas:G});u.setSize(n.width,n.height);u.setPixelRatio(Math.min(window.devicePixelRatio,2));const p={x:0,y:0},E=(e,t)=>{p.x=e/n.width-.5,p.y=t/n.height-.5};window.addEventListener("mousemove",e=>{E(e.clientX,e.clientY)});window.addEventListener("touchmove",e=>{e.touches.length>0&&E(e.touches[0].clientX,e.touches[0].clientY)});const oe=new U;let C=0;const k=()=>{const e=oe.getElapsedTime(),t=e-C;C=e,l.position.y=-scrollY/n.height*i;const r=p.x*.5,d=-p.y*.5;h.position.x+=(r-h.position.x)*5*t,h.position.y+=(d-h.position.y)*5*t,c.rotation.x+=t*.3,c.rotation.y+=t*.16,J.to(m.rotation,{x:p.y*Math.PI*2,y:p.x*Math.PI*2,duration:1,ease:"power2.out"}),u.render(s,l),window.requestAnimationFrame(k)};k();const S=new K,x=new j,W=(e,t)=>{x.x=e/n.width*2-1,x.y=-(t/n.height)*2+1,S.setFromCamera(x,l);const r=S.intersectObject(a);if(r.length>0){const d=r[0];ne(d)}};window.addEventListener("click",e=>{W(e.clientX,e.clientY)});window.addEventListener("touchend",e=>{e.changedTouches.length>0&&W(e.changedTouches[0].clientX,e.changedTouches[0].clientY)});function ne(e){const t=document.getElementById("particlePosition");t&&(t.innerHTML=`Position: (x: ${e.point.x.toFixed(2)}, y: ${e.point.y.toFixed(2)}, z: ${e.point.z.toFixed(2)})`)}
//# sourceMappingURL=main-BLnS4ITE.js.map
