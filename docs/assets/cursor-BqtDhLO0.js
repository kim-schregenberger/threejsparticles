import{S as C,T as f,c as b,O as R,W as I,M as A,l as v,m as M,n as S,R as T,V as r,o as z,a as w,j as _,U as l,A as D,b as j}from"./OrbitControls-BA4IOhgA.js";var F=`uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

attribute float aIntensity;
attribute float aAngle;

varying vec3 vColor;

void main()
{
    
    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;
    
    newPosition += displacement;

    
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    
    float pictureIntensity = texture(uPictureTexture, uv).r;

    
    gl_PointSize = 0.15 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    
    vColor = vec3(pow(pictureIntensity, 2.0));
}`,L=`varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - vec2(0.5));

    if(distanceToCenter > 0.5)
        discard;

    gl_FragColor = vec4(vColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;const p=document.querySelector("canvas.webgl.cursor"),c=new C,O=new f,n={width:window.innerWidth,height:window.innerHeight,pixelRatio:Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,n.pixelRatio=Math.min(window.devicePixelRatio,2),g.uniforms.uResolution.value.set(n.width*n.pixelRatio,n.height*n.pixelRatio),i.aspect=n.width/n.height,i.updateProjectionMatrix(),o.setSize(n.width,n.height),o.setPixelRatio(n.pixelRatio)});const i=new b(35,n.width/n.height,.1,100);i.position.set(0,0,18);c.add(i);const d=new R(i,p);d.enableDamping=!0;d.enableZoom=!1;const o=new I({canvas:p,antialias:!0});o.setClearColor("#181818");o.setSize(n.width,n.height);o.setPixelRatio(n.pixelRatio);const e={};e.canvas=document.createElement("canvas");e.canvas.width=28;e.canvas.height=28;e.canvas.style.position="fixed";e.canvas.style.width="256px";e.canvas.style.height="256px";e.canvas.style.top=0;e.canvas.style.left=0;e.canvas.style.zIndex=10;e.canvas.style.display="none";const W=document.querySelector(".canv");W.append(e.canvas);e.context=e.canvas.getContext("2d");e.context.fillRect(0,0,e.canvas.width,e.canvas.height);e.glowImage=new Image;e.glowImage.src="./glow.png";e.interactivePlane=new A(new v(10,10),new M({color:"red",side:S}));e.interactivePlane.visible=!1;c.add(e.interactivePlane);e.raycaster=new T;e.screenCursor=new r(9999,9999);e.canvasCursor=new r(9999,9999);e.canvasCursorPrevious=new r(9999,9999);window.addEventListener("pointermove",t=>{e.screenCursor.x=t.clientX/n.width*2-1,e.screenCursor.y=-(t.clientY/n.height)*2+1});e.texture=new z(e.canvas);const a=new v(10,10,128,128);a.setIndex(null);a.deleteAttribute("normal");const m=new Float32Array(a.attributes.position.count),h=new Float32Array(a.attributes.position.count);for(let t=0;t<a.attributes.position.count;t++)m[t]=Math.random(),h[t]=Math.random()*Math.PI*2;a.setAttribute("aIntensity",new w(m,1));a.setAttribute("aAngle",new w(h,1));const g=new _({vertexShader:F,fragmentShader:L,uniforms:{uResolution:new l(new r(n.width*n.pixelRatio,n.height*n.pixelRatio)),uPictureTexture:new l(O.load("./picture-7.png")),uDisplacementTexture:new l(e.texture)},blending:D}),q=new j(a,g);c.add(q);const x=()=>{d.update(),e.raycaster.setFromCamera(e.screenCursor,i);const t=e.raycaster.intersectObject(e.interactivePlane);if(t.length){const u=t[0].uv;e.canvasCursor.x=u.x*e.canvas.width,e.canvasCursor.y=(1-u.y)*e.canvas.height}e.context.globalCompositeOperation="source-over",e.context.globalAlpha=.02,e.context.fillRect(0,0,e.canvas.width,e.canvas.height);const y=e.canvasCursorPrevious.distanceTo(e.canvasCursor);e.canvasCursorPrevious.copy(e.canvasCursor);const P=Math.min(y*.05,1),s=e.canvas.width*.25;e.context.globalCompositeOperation="lighten",e.context.globalAlpha=P,e.context.drawImage(e.glowImage,e.canvasCursor.x-s*.5,e.canvasCursor.y-s*.5,s,s),e.texture.needsUpdate=!0,o.render(c,i),window.requestAnimationFrame(x)};x();
//# sourceMappingURL=cursor-BqtDhLO0.js.map
