// enhanced script v2
document.addEventListener('DOMContentLoaded', function(){
  // projects data (10)
  const projects = [
    {id:'p1', title:'ServerBoost', tags:['Performance','Java','Spigot'], short:'Async chunk management and TPS stabilizer.', img:'assets/plugin_1.svg'},
    {id:'p2', title:'TradeMaster', tags:['Economy','Java','Bukkit'], short:'Configurable trading system with GUIs.', img:'assets/plugin_2.svg'},
    {id:'p3', title:'SkyWarsPlus', tags:['Minigame','Java','Paper'], short:'Team-based SkyWars with powerups.', img:'assets/plugin_3.svg'},
    {id:'p4', title:'VoteRewardsX', tags:['Rewards','Java','MySQL'], short:'Reward system integrated with voting', img:'assets/plugin_4.svg'},
    {id:'p5', title:'AntiCheatLite', tags:['Security','Java','Spigot'], short:'Lightweight anti-cheat with low false positives', img:'assets/plugin_5.svg'},
    {id:'p6', title:'BuildGuard', tags:['Protection','Java','WorldGuard'], short:'Advanced build protection tools', img:'assets/plugin_6.svg'},
    {id:'p7', title:'AutoAnnouncer', tags:['Utility','Java'], short:'Custom scheduled announcements', img:'assets/plugin_7.svg'},
    {id:'p8', title:'ShopBridge', tags:['Economy','Java','Shop'], short:'Integrates with multiple economy plugins', img:'assets/plugin_8.svg'},
    {id:'p9', title:'QuestChain', tags:['Gameplay','Java'], short:'Configurable quest system', img:'assets/plugin_9.svg'},
    {id:'p10', title:'WarpManager', tags:['Utility','Java'], short:'Fast warp management with cooldowns', img:'assets/plugin_10.svg'}
  ];

  // render projects on projects page
  const grid = document.getElementById('projects-grid');
  if(grid){
    projects.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card reveal';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title} preview" loading="lazy">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="title">${p.title}</div>
          <div class="badge">Coming soon</div>
        </div>
        <div class="meta">${p.tags.join(' • ')}</div>
        <div style="flex:1">${p.short}</div>
        <div style="margin-top:8px;display:flex;gap:8px"><a class="btn btn-primary" href="mailto:thijskurk@example.com?subject=Interesse%20in%20${encodeURIComponent(p.title)}">Interesse</a><a class="btn btn-ghost" data-id="${p.id}" href="#">Details</a></div>
      `;
      grid.appendChild(card);
    });
  }

  // inject featured on index page (first 3)
  const featuredGrid = document.getElementById('featured-grid');
  if(featuredGrid){
    projects.slice(0,3).forEach(p=>{
      const el = document.createElement('article');
      el.className='card reveal';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.title} preview" loading="lazy">
        <div class="title">${p.title}</div>
        <div class="meta">${p.tags.join(' • ')}</div>
        <div style="margin-top:8px">${p.short}</div>
        <div style="margin-top:8px"><a class="btn btn-ghost" data-id="${p.id}" href="#">Details</a></div>
      `;
      featuredGrid.appendChild(el);
    });
  }

  // overlay for details (delegated)
  function createOverlay(){
    const overlay = document.createElement('div');
    overlay.id='pk-overlay';
    overlay.style.display='grid';
    overlay.style.placeItems='center';
    overlay.style.position='fixed';
    overlay.style.inset='0';
    overlay.style.background='linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.9))';
    overlay.style.zIndex='120';
    overlay.innerHTML = `
      <div class="modal" style="width:92%;max-width:880px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-weight:800;font-size:20px" id="pk-title"></div>
          <div><button id="pk-close" class="btn">Close</button></div>
        </div>
        <div id="pk-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('pk-close').addEventListener('click', ()=> overlay.remove());
    return overlay;
  }

  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[data-id]');
    if(!a) return;
    e.preventDefault();
    const id = a.dataset.id;
    const p = projects.find(x=>x.id===id);
    if(!p) return;
    let ov = document.getElementById('pk-overlay');
    if(!ov) ov = createOverlay();
    document.getElementById('pk-title').textContent = p.title;
    document.getElementById('pk-body').innerHTML = `
      <img src="${p.img}" style="width:100%;border-radius:10px;margin-bottom:12px" alt="${p.title}">
      <div style="margin-bottom:8px"><strong>Tags:</strong> ${p.tags.join(', ')}</div>
      <div style="margin-bottom:10px">${p.short} — uitgebreide beschrijving kan hier ingevuld worden.</div>
      <div style="font-size:13px;color:rgba(234,240,255,0.7)">Technologieën: Java • Spigot/Paper • Maven • MySQL</div>
      <div style="margin-top:12px"><a class="btn btn-primary" href="mailto:thijskurk@example.com?subject=Interesse%20in%20${encodeURIComponent(p.title)}">Neem contact op</a></div>
    `;
  });

  // contact form demo
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Dankje! Je bericht is lokaal verwerkt (demo).';
      contactForm.reset();
    });
  }

  // reveal on scroll but hide when scrolling up: track scroll direction
  let lastY = window.scrollY;
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.12});

  reveals.forEach(r=>observer.observe(r));

  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    const down = y > lastY;
    lastY = y;
    reveals.forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(!down){
        // scrolling up: hide if element is above a threshold so it will reveal again on scroll down
        if(rect.bottom < window.innerHeight*0.45){
          el.classList.remove('visible');
        }
      }
    });
  }, {passive:true});

  // moving background words animation (small subtle movement)
  const bgWords = document.querySelectorAll('.bg-words span');
  if(bgWords.length){
    let t=0;
    setInterval(()=>{
      t+=0.04;
      bgWords.forEach((el,i)=>{
        const s = Math.sin(t*2 + i);
        el.style.transform = `translateX(${s*18}px) skewX(${ -6 + s*4 }deg) scale(${1+Math.abs(s)*0.03})`;
      });
    },30);
  }

});
