import{S as _,T as F,V as L,c as E,O as W,W as B,h as S,i as G,B as H,F as x,j as O,U as a,A as j,b as D,k as I}from"./OrbitControls-CXXwVEUl.js";import{G as U}from"./lil-gui.esm-DNkUmkFf.js";import{g as V}from"./index-DjKJqAo0.js";var q=`uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;
attribute float aTimeMultiplier;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main()
{
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    
    float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    explodingProgress = clamp(explodingProgress, 0.0, 1.0);
    explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0);
    newPosition *= explodingProgress;

    
    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2;

    
    float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    
    float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    float sizeTwinkling = sin(progress * 30.0) * 0.5 + 0.5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;

    
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0 / - viewPosition.z;
    
    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}`,Y=`uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{
    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    
    gl_FragColor = vec4(uColor, textureAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;const k=new U({width:340});k.domElement.style.display="none";document.addEventListener("keydown",n=>{if(n.key==="h"||n.key==="H"){const o=k.domElement;o.style.display==="none"?o.style.display="block":o.style.display="none"}});const R=document.querySelector("canvas.webgl"),w=new _,i=new F,e={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)};e.resolution=new L(e.width*e.pixelRatio,e.height*e.pixelRatio);window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,e.pixelRatio=Math.min(window.devicePixelRatio,2),e.resolution.set(e.width*e.pixelRatio,e.height*e.pixelRatio),t.aspect=e.width/e.height,t.updateProjectionMatrix(),l.setSize(e.width,e.height),l.setPixelRatio(e.pixelRatio)});const t=new E(25,e.width/e.height,.1,100);t.position.set(1.5,0,6);w.add(t);const A=new W(t,R);A.enableDamping=!0;const l=new B({canvas:R,antialias:!0});l.setSize(e.width,e.height);l.setPixelRatio(e.pixelRatio);const y=[i.load("./particles/1.png"),i.load("./particles/2.png"),i.load("./particles/3.png"),i.load("./particles/4.png"),i.load("./particles/5.png"),i.load("./particles/6.png"),i.load("./particles/7.png"),i.load("./particles/8.png")],J=(n,o,m,d,u,g)=>{const p=new Float32Array(n*3),v=new Float32Array(n),z=new Float32Array(n);for(let s=0;s<n;s++){const P=s*3,T=new I(u*(.75+Math.random()*.25),Math.random()*Math.PI,Math.random()*Math.PI*2),c=new S;c.setFromSpherical(T),p[P]=c.x,p[P+1]=c.y,p[P+2]=c.z,v[s]=Math.random(),z[s]=1+Math.random()}const r=new H;r.setAttribute("position",new x(p,3)),r.setAttribute("aSize",new x(v,1)),r.setAttribute("aTimeMultiplier",new x(z,1)),d.flipY=!1;const h=new O({vertexShader:q,fragmentShader:Y,uniforms:{uSize:new a(m),uResolution:new a(e.resolution),uTexture:new a(d),uColor:new a(g),uProgress:new a(0)},transparent:!0,depthWrite:!1,blending:j}),f=new D(r,h);f.position.copy(o),w.add(f);const C=()=>{w.remove(f),r.dispose(),h.dispose()};V.to(h.uniforms.uProgress,{value:1,ease:"linear",duration:3,onComplete:C})},M=()=>{const n=Math.round(400+Math.random()*1e3),o=new S((Math.random()-.5)*2,Math.random(),(Math.random()-.5)*2),m=.1+Math.random()*.1,d=y[Math.floor(Math.random()*y.length)],u=.5+Math.random(),g=new G;g.setHSL(Math.random(),1,.7),J(n,o,m,d,u,g)};M();window.addEventListener("click",M);window.addEventListener("touchstart",n=>{n.preventDefault(),M()});const b=()=>{A.update(),l.render(w,t),window.requestAnimationFrame(b)};b();
//# sourceMappingURL=click-Cg8wEIJ7.js.map
