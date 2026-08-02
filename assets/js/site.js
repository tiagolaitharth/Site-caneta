const HERO_CONTENT={eyebrow:"Artools Precision Pen",titleLine1:"A CANETA",titleLine2:"MAIS AVANÇADA",titleLine3:"DO MUNDO.",description:"Uma nova forma de escrever, criar e registrar ideias — com a precisão que acompanha o ritmo do seu pensamento.",primaryButton:"Conhecer a caneta",secondaryButton:"Ver em movimento"};
document.querySelectorAll('[data-content]').forEach(el=>el.textContent=HERO_CONTENT[el.dataset.content]);
const video=document.querySelector('#pen-video'), stage=document.querySelector('#stage'), number=document.querySelector('#progress-number'), fill=document.querySelector('.progress-fill'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateProgress(progress){number.textContent=String(Math.round(progress*100)).padStart(2,'0');fill.style.height=(progress*100)+'%'}
let videoDuration=0, requestedTime=0, renderedTime=-1, seekFrame=0;
const videoFrame=1/24;
function driveVideo(){
  seekFrame=0;
  if(!videoDuration||video.seeking)return;
  const delta=requestedTime-video.currentTime;
  if(Math.abs(delta)<videoFrame*.55)return;
  const step=Math.sign(delta)*Math.min(Math.abs(delta)*.32,.24);
  const nextFrame=Math.min(videoDuration-.04,Math.max(0,Math.round((video.currentTime+step)/videoFrame)*videoFrame));
  if(Math.abs(nextFrame-renderedTime)<videoFrame*.55)return;
  try{renderedTime=nextFrame;video.currentTime=nextFrame}catch(e){}
}
function requestVideoDrive(){if(!seekFrame)seekFrame=requestAnimationFrame(driveVideo)}
video.addEventListener('loadedmetadata',()=>{document.documentElement.classList.add('is-ready');videoDuration=video.duration;video.pause();video.currentTime=0;
  if(window.gsap){gsap.from('.topbar',{y:-18,opacity:0,duration:.55,ease:'power3.out'})}});
video.addEventListener('error',()=>document.querySelector('.video-fallback').textContent='Não foi possível carregar o vídeo.');
if(reduced){video.pause();}
const experience=document.querySelector('.experience');
const contentParts=[...document.querySelectorAll('.eyebrow,.title-line,.description,.actions')];
let parallaxFrame=0;
function renderParallax(){
  parallaxFrame=0;
  const travel=Math.max(1,experience.offsetHeight-innerHeight);
  const scrollOffset=Math.max(0,-experience.getBoundingClientRect().top);
  const progress=Math.min(1,Math.max(0,scrollOffset/travel));
  requestedTime=Math.min(Math.max(0,videoDuration-.04),progress*videoDuration);
  requestVideoDrive();
  video.style.transform=`scale(${1+progress*.025})`;
  const textProgress=Math.min(1,scrollOffset/(innerHeight*.58));
  contentParts.forEach((part,index)=>{
    const local=Math.min(1,Math.max(0,(textProgress-index*.055)/.68));
    const eased=1-Math.pow(1-local,3);
    part.style.transform=`translate3d(0,${-eased*(28+index*7)}px,0)`;
    part.style.opacity=String(1-eased);
  });
  updateProgress(progress);
}
function requestParallax(){if(!parallaxFrame)parallaxFrame=requestAnimationFrame(renderParallax)}
addEventListener('scroll',requestParallax,{passive:true});
addEventListener('resize',requestParallax,{passive:true});
video.addEventListener('seeked',requestVideoDrive);
renderParallax();
const storyObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.12,rootMargin:'-3% 0px -3% 0px'});
document.querySelectorAll('.story-reveal').forEach(element=>storyObserver.observe(element));
if(!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('.cap-card').forEach(card=>{
    let cardFrame=0,pointerX=0,pointerY=0;
    card.addEventListener('pointermove',event=>{
      const bounds=card.getBoundingClientRect();
      pointerX=event.clientX-bounds.left;pointerY=event.clientY-bounds.top;
      if(cardFrame)return;
      cardFrame=requestAnimationFrame(()=>{
        cardFrame=0;
        const x=pointerX/bounds.width,y=pointerY/bounds.height;
        card.style.setProperty('--mx',`${pointerX}px`);card.style.setProperty('--my',`${pointerY}px`);
        card.style.setProperty('--rx',`${(0.5-y)*5}deg`);card.style.setProperty('--ry',`${(x-0.5)*6}deg`);
      });
    },{passive:true});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')},{passive:true});
  });
  const finaleCard=document.querySelector('.finale-card');
  finaleCard.addEventListener('pointermove',event=>{const bounds=finaleCard.getBoundingClientRect();finaleCard.style.setProperty('--fx',`${event.clientX-bounds.left}px`);finaleCard.style.setProperty('--fy',`${event.clientY-bounds.top}px`)},{passive:true});
}
const finale=document.querySelector('.finale'),finaleImage=document.querySelector('.finale-bg');
let finaleFrame=0;
function renderFinale(){finaleFrame=0;if(reduced)return;const bounds=finale.getBoundingClientRect();if(bounds.bottom<0||bounds.top>innerHeight)return;const offset=Math.max(-26,Math.min(26,(innerHeight*.5-(bounds.top+bounds.height*.5))*.035));finaleImage.style.transform=`translate3d(0,${offset}px,0) scale(1.02)`}
function requestFinale(){if(!finaleFrame)finaleFrame=requestAnimationFrame(renderFinale)}
addEventListener('scroll',requestFinale,{passive:true});addEventListener('resize',requestFinale,{passive:true});renderFinale();

