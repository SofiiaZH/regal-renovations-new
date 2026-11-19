// Public projects are read from a static JSON file committed by Pages CMS.
// No database, tokens or third-party runtime services are required.
const grid = document.getElementById('liveProjects');
const status = document.getElementById('projectsStatus');
const asset = value => {
  if (!value || typeof value !== 'string') return '';
  // CMS stores root-relative paths; resolve relative to this page so GitHub
  // project sites (/regal-renovations/) and the custom domain both work.
  if (/^(https?:)?\/\//i.test(value) || /^data:/i.test(value)) return '';
  return value.replace(/^\/+/, '');
};
function openProject(project) {
  const dialog = document.createElement('dialog');
  dialog.className = 'project-dialog';
  const close = document.createElement('button');
  close.className = 'dialog-close';
  close.textContent = 'Close ×';
  close.addEventListener('click', () => dialog.close());
  const title = document.createElement('h2'); title.textContent = project.title;
  const desc = document.createElement('p'); desc.textContent = project.description || '';
  const gallery = document.createElement('div'); gallery.className = 'project-detail-images';
  const paths = [project.cover_image, ...(Array.isArray(project.gallery) ? project.gallery : [])].filter(Boolean);
  for (const path of [...new Set(paths)]) {
    const src = asset(path); if (!src) continue;
    const img = document.createElement('img'); img.src = src; img.alt = project.title;
    img.loading = 'lazy'; gallery.append(img);
  }
  dialog.append(close, title, desc, gallery);
  document.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.showModal();
}
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error('Invalid project data');
    const projects = entries.filter(p => p && p.published === true && typeof p.title === 'string' && p.title.trim());
    if (!projects.length) { status.textContent = 'Our project gallery is coming soon.'; return; }
    status.hidden = true;
    for (const item of projects) {
      const card = document.createElement('article'); card.className = 'project-card';
      const src = asset(item.cover_image);
      if (src) { const photo = document.createElement('img'); photo.loading = 'lazy'; photo.alt = item.title; photo.src = src; card.append(photo); }
      const overlay = document.createElement('div'); overlay.className = 'project-overlay';
      const brand = document.createElement('span'); brand.textContent = 'Regal Renovations';
      const title = document.createElement('h3'); title.textContent = item.title;
      overlay.append(brand, title); card.append(overlay);
      card.tabIndex = 0; card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View ' + item.title);
      const show = () => openProject(item);
      card.addEventListener('click', show);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
      grid.append(card);
    }
  } catch (error) { console.error('Projects:', error); status.textContent = 'Unable to load projects at the moment.'; }
}
loadProjects();
