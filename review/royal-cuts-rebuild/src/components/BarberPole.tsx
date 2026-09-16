import { useEffect, useRef, useState } from 'react';

export function PolePoster() {
 return <div className="pole-poster" aria-hidden="true"><div className="pole-finial"/><div className="pole-cap top"/><div className="pole-cylinder"><div className="pole-stripes"/><div className="pole-shine"/></div><div className="pole-cap bottom"/><div className="pole-foot"/></div>;
}
export default function BarberPole({motionOn}:{motionOn:boolean}) {
 const host=useRef<HTMLDivElement>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  if(!motionOn||window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches)return;
  let disposed=false;let cleanup=()=>{};
  async function setup(){
   const THREE=await import('three');
   const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
   if(disposed||!host.current)return;
   const el=host.current;
   let renderer:InstanceType<typeof THREE.WebGLRenderer>;
   try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
   renderer.setClearColor(0x000000,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
   const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(37,1,.1,30);camera.position.set(0,.2,6.3);
   const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
   const chrome=new THREE.MeshStandardMaterial({color:0xd9e0e4,metalness:1,roughness:.17});
   const darkChrome=new THREE.MeshStandardMaterial({color:0x52565b,metalness:1,roughness:.2});
   const paint=document.createElement('canvas');paint.width=512;paint.height=1024;const ctx=paint.getContext('2d')!;
   ctx.fillStyle='#eeeae0';ctx.fillRect(0,0,512,1024);ctx.fillStyle='#a52236';
   for(let y=-1200;y<1800;y+=256){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y+512);ctx.lineTo(512,y+640);ctx.lineTo(0,y+128);ctx.closePath();ctx.fill();}
   const texture=new THREE.CanvasTexture(paint);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
   const pole=new THREE.Group();pole.rotation.z=-.17;pole.rotation.x=.05;scene.add(pole);
   const insert=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,2.45,64),new THREE.MeshStandardMaterial({map:texture,roughness:.32,metalness:0,envMapIntensity:.3}));pole.add(insert);
   const glass=new THREE.Mesh(new THREE.CylinderGeometry(.455,.455,2.5,64,1,true),new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:.15,roughness:.08,transparent:true,opacity:.09,side:THREE.DoubleSide,depthWrite:false}));pole.add(glass);
   const add=(geo:InstanceType<typeof THREE.CylinderGeometry>|InstanceType<typeof THREE.SphereGeometry>,material:InstanceType<typeof THREE.Material>,y:number,scaleY=1)=>{const mesh=new THREE.Mesh(geo,material);mesh.position.y=y;mesh.scale.y=scaleY;pole.add(mesh);return mesh;};
   for(const dir of [-1,1]){
    add(new THREE.CylinderGeometry(.51,.51,.16,64),chrome,dir*1.3);
    add(new THREE.CylinderGeometry(.53,.53,.055,64),darkChrome,dir*1.41);
    add(new THREE.SphereGeometry(.515,64,32),chrome,dir*1.45,.37);
    add(new THREE.CylinderGeometry(.19,.25,.12,48),chrome,dir*1.66);
    add(new THREE.SphereGeometry(.105,32,16),chrome,dir*1.79);
   }
   scene.add(new THREE.HemisphereLight(0xffffff,0x651423,1.5));
   const key=new THREE.DirectionalLight(0xffffff,2.3);key.position.set(3,4,4);scene.add(key);
   const fill=new THREE.DirectionalLight(0xfce8da,1.2);fill.position.set(-3,0,3);scene.add(fill);
   el.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
   const resize=()=>{const {clientWidth:width,clientHeight:height}=el;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};resize();
   const observer=new ResizeObserver(resize);observer.observe(el);
   let visible=true;const intersection=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});intersection.observe(el);
   let pointerX=0,pointerY=0;const pointer=(e:PointerEvent)=>{const box=el.getBoundingClientRect();pointerX=(e.clientX-box.left)/box.width-.5;pointerY=(e.clientY-box.top)/box.height-.5;};
   const reset=()=>{pointerX=0;pointerY=0;};el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',reset);
   let raf=0;const start=performance.now();let last=0;
   function frame(now:number){raf=requestAnimationFrame(frame);if(!visible||document.hidden||now-last<30)return;last=now;const t=(now-start)/1000;texture.offset.y=t*.028;pole.rotation.y+=(pointerX*.3-pole.rotation.y)*.05;pole.rotation.x+=(pointerY*.12-pole.rotation.x)*.05;pole.position.y=Math.sin(t*.7)*.035;renderer.render(scene,camera);}
   raf=requestAnimationFrame(frame);setReady(true);
   const contextLost=(e:Event)=>{e.preventDefault();setReady(false);cancelAnimationFrame(raf);};renderer.domElement.addEventListener('webglcontextlost',contextLost);
   cleanup=()=>{cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',reset);renderer.domElement.removeEventListener('webglcontextlost',contextLost);scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(m=>m.dispose());}});texture.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();};
  }
  setup().catch(()=>{if(!disposed)setReady(false);});
  return()=>{disposed=true;cleanup();setReady(false);};
 },[motionOn]);
 return <div className={`pole-stage ${ready?'is-ready':''}`} ref={host} role="img" aria-label="A sculptural chrome barber pole with red and porcelain stripes"><PolePoster/></div>;
}
