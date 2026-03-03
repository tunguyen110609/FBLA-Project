const API = 'http://localhost:3000/api';

let allBusinesses = []; // Store all fetched businesses

// ─── Fetch businesses from local API ───────────────────────────────────────
async function fetchBusinesses() {
  try {
    const response = await fetch(`${API}/businesses`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    allBusinesses = await response.json();
    renderBusinesses(allBusinesses);
  } catch (error) {
    console.error('Failed to load businesses:', error);
    document.getElementById('businessGrid').innerHTML = `
      <p style="text-align:center; color:#999; grid-column:1/-1;">
        Could not load businesses. Make sure your local server is running.
      </p>`;
  }
}

// ─── Render business cards ──────────────────────────────────────────────────
function renderBusinesses(businesses) {
  const grid = document.getElementById('businessGrid');

  if (businesses.length === 0) {
    grid.innerHTML = `
      <p style="text-align:center; color:#999; grid-column:1/-1;">
        No businesses found.
      </p>`;
    return;
  }

  grid.innerHTML = businesses.map(biz => `
    <div class="business-card">
      <h3 class="business-name">${biz.name}</h3>
      <span class="business-category">${biz.category}</span>
      <p class="business-description">${biz.description || ''}</p>
      ${biz.deals ? `<p class="business-deal">🏷️ ${biz.deals}</p>` : ''}
      <div class="business-rating">
        <span class="stars">${getStars(biz.rating)}</span>
        <span class="rating-value">${Number(biz.rating).toFixed(1)}</span>
        <span style="opacity:0.6; font-weight:400;">(${biz.num_ratings?.toLocaleString() ?? 0} reviews)</span>
      </div>
    </div>
  `).join('');
}

// ─── Generate star string from numeric rating ───────────────────────────────
function getStars(rating) {
  const full = Math.round(Number(rating) ?? 0);
  return '⭐'.repeat(Math.min(full, 5));
}

// ─── Filter + Sort ──────────────────────────────────────────────────────────
function applyFilters() {
  const query    = document.getElementById('searchInput').value.trim().toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const sort     = document.getElementById('sortFilter').value;

  let results = allBusinesses.filter(biz => {
    const matchesSearch   = !query ||
      biz.name.toLowerCase().includes(query) ||
      (biz.description ?? '').toLowerCase().includes(query);
    const matchesCategory = category === 'all' || biz.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === 'rating-high') {
    results.sort((a, b) => Number(b.rating) - Number(a.rating));
  } else if (sort === 'most-reviews') {
    results.sort((a, b) => (b.num_ratings ?? 0) - (a.num_ratings ?? 0));
  } else if (sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderBusinesses(results);
}

// ─── Event listeners ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  fetchBusinesses();

  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
  document.getElementById('sortFilter').addEventListener('change', applyFilters);
});