import{S as k,c as E,O as R,W as B,B as _,i as P,a as h,j as F,A as j,b as G,C as L}from"./OrbitControls-BA4IOhgA.js";import{G as W}from"./lil-gui.esm-DNkUmkFf.js";var I=`uniform float uTime;
uniform float uSize;

attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;

void main()
{
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
    
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
     * Color
     */
    vColor = color;
}`,O=`varying vec3 vColor;

void main()
{
    
    
    
    

    
    
    
    

    
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}`;const y=new W;y.domElement.style.display="none";document.addEventListener("keydown",o=>{if(o.key==="h"||o.key==="H"){const i=y.domElement;i.style.display==="none"?i.style.display="block":i.style.display="none"}});const C=document.querySelector("canvas.webgl"),g=new k,e={};e.count=2e5;e.size=.005;e.radius=9;e.branches=2;e.spin=1;e.randomness=1;e.randomnessPower=6;e.insideColor="#2e3133";e.outsideColor="#3a0d2a";let s=null,w=null,u=null;const v=()=>{u!==null&&(s.dispose(),w.dispose(),g.remove(u)),s=new _;const o=new Float32Array(e.count*3),i=new Float32Array(e.count*3),c=new Float32Array(e.count*3),p=new Float32Array(e.count*1),x=new P(e.insideColor),z=new P(e.outsideColor);for(let l=0;l<e.count;l++){const t=l*3,r=Math.random()*e.radius,f=l%e.branches/e.branches*Math.PI*2,S=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*r,A=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*r,T=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*r;o[t]=Math.cos(f)*r,o[t+1]=0,o[t+2]=Math.sin(f)*r,i[t]=S,i[t+1]=A,i[t+2]=T;const m=x.clone();m.lerp(z,r/e.radius),c[t]=m.r,c[t+1]=m.g,c[t+2]=m.b,p[l]=Math.random()}s.setAttribute("position",new h(o,3)),s.setAttribute("aRandomness",new h(i,3)),s.setAttribute("color",new h(c,3)),s.setAttribute("aScale",new h(p,1)),w=new F({depthWrite:!1,blending:j,vertexColors:!0,uniforms:{uTime:{value:0},uSize:{value:30*d.getPixelRatio()}},vertexShader:I,fragmentShader:O}),u=new G(s,w),g.add(u)};document.getElementById("increaseBranches").addEventListener("click",()=>{e.branches=Math.min(e.branches+1,8),v()});document.getElementById("decreaseBranches").addEventListener("click",()=>{e.branches=Math.max(e.branches-1,1),v()});const n={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,a.aspect=n.width/n.height,a.updateProjectionMatrix(),d.setSize(n.width,n.height),d.setPixelRatio(Math.min(window.devicePixelRatio,2))});const a=new E(75,n.width/n.height,.1,100);a.position.x=3;a.position.y=3;a.position.z=3;g.add(a);const b=new R(a,C);b.enableDamping=!0;const d=new B({canvas:C});d.setSize(n.width,n.height);d.setPixelRatio(Math.min(window.devicePixelRatio,2));v();const H=new L,M=()=>{const o=H.getElapsedTime();w.uniforms.uTime.value=o*.5,b.update(),d.render(g,a),window.requestAnimationFrame(M)};M();
//# sourceMappingURL=animate-CDgwST4w.js.map
