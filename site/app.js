(() => {
  'use strict';
  const config=window.HEATBANK_CONFIG;
  const application=document.getElementById('application-link');
  const note=document.getElementById('application-note');
  if(config?.applicationUrl && /^(https:\/\/|mailto:)/.test(config.applicationUrl)) {
    application.hidden=false;
    application.href=config.applicationUrl;
    application.removeAttribute('aria-disabled');
    application.replaceChildren(document.createTextNode(config.applicationLabel+' '));
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');application.append(arrow);
    note.textContent=config.applicationDescription;
    if(config.applicationUrl.startsWith('https:')){application.target='_blank';application.rel='noopener noreferrer';}
  } else { application.hidden=true;note.textContent='TestFlight 申请入口尚未开放，请稍后再来看看。'; }

  const track=document.getElementById('screens-track');
  const prev=document.getElementById('gallery-prev');
  const next=document.getElementById('gallery-next');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateControls=()=>{prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;};
  const move=direction=>track.scrollBy({left:direction*Math.max(270,track.clientWidth*.8),behavior:reduced.matches?'instant':'smooth'});
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('scroll',updateControls,{passive:true});
  new ResizeObserver(updateControls).observe(track);updateControls();

  const dialog=document.getElementById('image-dialog');
  const picture=document.getElementById('dialog-image');
  const error=document.getElementById('dialog-error');
  let trigger;
  const close=()=>dialog.close();
  document.querySelectorAll('.poster-link').forEach(link=>link.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||typeof dialog.showModal!=='function')return;
    event.preventDefault();trigger=link;
    error.hidden=true;picture.hidden=false;picture.alt=link.querySelector('img').alt;
    document.getElementById('dialog-title').textContent=link.dataset.galleryTitle;
    document.getElementById('dialog-direct').href=link.href;
    picture.src=link.href;dialog.showModal();document.body.style.overflow='hidden';
  }));
  picture.addEventListener('error',()=>{picture.hidden=true;error.hidden=false;});
  document.getElementById('dialog-close').addEventListener('click',close);
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus({preventScroll:true});});

  if('IntersectionObserver' in window && !reduced.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-pending');observer.unobserve(entry.target);}}),{threshold:.06});
    document.querySelectorAll('.feature,.insight-items article,.apply-inner').forEach(el=>{el.classList.add('reveal','is-pending');observer.observe(el);});
  }
})();
