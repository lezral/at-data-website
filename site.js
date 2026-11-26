'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu?.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 menu.querySelector('span').textContent = open ? '−' : '+';
 nav.classList.toggle('open', open);
});
document.addEventListener('keydown', e => {
 if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {menu.click(); menu.focus();}
});
const services = [
 ['Enablement','Build capability that stays with your team.','Build long-term data capabilities through data strategy, governance frameworks, data quality, documentation and training workshops.','Strategy · Governance · Training','enablement'],
 ['AI & intelligence automation','Put AI to work on a real business problem.','Identify practical opportunities for generative AI. Build tailored agents, search systems and workflows tuned specifically to your business.','AI agents · Search · Workflow automation','ai'],
 ['BI & data analytics','Turn information into better decisions.','Surface actionable insights through dashboards, automated reporting, alerts, KPI tracking and self-service analytics. Make better decisions with A/B testing, statistical analysis and conversion optimisation.','Dashboards · Reporting · Experimentation','analytics'],
 ['Data infrastructure','Start with a foundation you can trust.','Connect and transform your databases and data sources into a clean, reliable data layer that enables reporting and automation.','Integration · Data modelling · Pipelines','infrastructure']
];
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
 const item = services[Number(button.dataset.service)];
 document.querySelectorAll('[data-service]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
 ['service-label','service-title','service-copy','service-tags'].forEach((id,i) => document.getElementById(id).textContent = i === 0 ? item[i].toUpperCase() : item[i]);
 document.getElementById('service-contact').href = './contact.html?service=' + item[4];
}));
const form = document.getElementById('contact-form');
if (form) {
 const params = new URLSearchParams(location.search);
 const selected = params.get('service');
 if (['infrastructure','analytics','ai','enablement'].includes(selected)) form.elements.service.value = selected;
 const project = params.get('project');
 if (['Monash','Avocet','Conversations with data'].includes(project)) form.elements.message.value = `I’d like to hear more about your work with ${project}.`;
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const service = form.elements.service.selectedOptions[0].text;
  const subject = 'Let’s talk data' + (String(data.get('company')).trim() ? ' — ' + String(data.get('company')).trim() : '');
  const body = `Hi AT Data,\n\n${String(data.get('message')).trim()}\n\nName: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\nBusiness: ${String(data.get('company')).trim() || 'Not specified'}\nInterested in: ${service}\n\nI’d love to arrange a 30-minute conversation.`;
  const mailto = `mailto:info@atdata.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.getElementById('form-status');
  status.replaceChildren();
  const message = document.createElement('p');
  message.textContent = 'Your draft is ready. Open it in your email app, review it and send it to info@atdata.au.';
  const link = document.createElement('a'); link.href = mailto; link.textContent = 'Open email draft';
  const details = document.createElement('details');
  const summary = document.createElement('summary'); summary.textContent = 'No email app? View and copy your message';
  const preview = document.createElement('pre'); preview.className = 'email-preview'; preview.textContent = `To: info@atdata.au\nSubject: ${subject}\n\n${body}`;
  const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'copy-button'; copy.textContent = 'Copy email';
  copy.addEventListener('click', async () => {try {await navigator.clipboard.writeText(preview.textContent);copy.textContent='Copied';} catch {copy.textContent='Select and copy the message above';}});
  details.append(summary,preview,copy); status.append(message,link,details);
  // Draft only: no visitor data is transmitted or stored by the site.
 });
}

// Native dialogs provide focus containment, Escape to close and background inertness.
const caseDialog = document.getElementById('case-dialog');
if (caseDialog) {
 let caseTrigger;
 const assetBase = new URL('.', document.querySelector('script[src$="case-studies.js"]').src);
 const contactBase = new URL(document.querySelector('.nav-cta').href);
 function openCase(trigger) {
  const study = window.AT_DATA_CASE_STUDIES[trigger.dataset.case];
  if (!study) return;
  caseTrigger = trigger;
  document.getElementById('case-category').textContent = study.category;
  document.getElementById('case-title').textContent = study.title;
  document.getElementById('case-summary').textContent = study.summary;
  const gallery = document.getElementById('case-gallery');
  gallery.replaceChildren(...study.images.map(item => {
   const figure = document.createElement('figure');
   const image = document.createElement('img');
   image.src = new URL(item.src, assetBase).href; image.alt = item.alt;
   image.width = 960; image.height = 640;
   const caption = document.createElement('figcaption'); caption.textContent = item.caption;
   figure.append(image,caption); return figure;
  }));
  const narrative = document.getElementById('case-narrative');
  narrative.replaceChildren(...study.sections.map(item => {
   const section = document.createElement('section');
   const heading = document.createElement('h3'); heading.textContent = item.heading;
   const text = document.createElement('div');
   item.paragraphs.forEach(value => {const p = document.createElement('p'); p.textContent=value; text.append(p);});
   section.append(heading,text); return section;
  }));
  const contact = new URL(contactBase); contact.searchParams.set('project',study.title);
  document.getElementById('case-contact').href = contact.href;
  caseDialog.showModal(); caseDialog.scrollTop=0; document.body.classList.add('modal-open');
 }
 document.querySelectorAll('[data-case]').forEach(trigger => trigger.addEventListener('click',()=>openCase(trigger)));
 caseDialog.querySelector('.case-close').addEventListener('click',()=>caseDialog.close());
 caseDialog.addEventListener('click',event=>{
  const rect=caseDialog.getBoundingClientRect();
  if(event.target===caseDialog && (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)) caseDialog.close();
 });
 caseDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');caseTrigger?.focus();});
}
