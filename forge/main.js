// EL CLUB — Pitch Deck Renderer
// Renderiza data.js en el DOM, monta charts, scroll reveal.

(function () {
  const D = window.PITCH_DATA;
  const fmt = new Intl.NumberFormat('es-ES');
  const eur = (n) => fmt.format(n) + ' €';

  // ---- HERO METRICS ----
  const heroMetrics = document.getElementById('hero-metrics');
  if (heroMetrics) {
    heroMetrics.innerHTML = D.heroMetrics.map(m => `
      <div class="hero-metric-card">
        <div class="hero-metric-value">${m.value}</div>
        <div class="hero-metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  // ---- ZONAS ----
  const zonesGrid = document.getElementById('zones-grid');
  if (zonesGrid) {
    zonesGrid.innerHTML = D.zonas.map((z, i) => `
      <div class="zone-card glass reveal reveal-delay-${(i % 5) + 1}">
        <div class="zone-num">${z.n}</div>
        <div class="zone-icon">${z.icon}</div>
        <h3>${z.nombre}</h3>
        <div class="zone-m2">${z.m2}</div>
        <p>${z.desc}</p>
        <div class="zone-tags">
          ${z.tags.map(t => `<span class="zone-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // ---- DISCIPLINAS ----
  const discGrid = document.getElementById('disc-grid');
  if (discGrid) {
    discGrid.innerHTML = D.disciplinas.map((d, i) => `
      <div class="disc-card glass reveal reveal-delay-${(i % 5) + 1}">
        <div class="disc-icon">${d.icon}</div>
        <h4>${d.nombre}</h4>
        <p>${d.desc}</p>
      </div>
    `).join('');
  }

  // ---- COMPETIDORES ----
  const compGrid = document.getElementById('comp-grid');
  if (compGrid) {
    compGrid.innerHTML = D.competidores.map((c, i) => `
      <div class="comp-card glass reveal reveal-delay-${(i % 4) + 1}">
        <span class="comp-tag">${c.tipo}</span>
        <h4>${c.nombre}</h4>
        <div class="comp-meta">
          <span>${c.direccion}</span>
          <span class="comp-dist">${c.distancia}</span>
          <span>Cuota ${c.cuota}</span>
        </div>
        <p>${c.gap}</p>
      </div>
    `).join('');
  }

  // ---- P&L TABLE ----
  const pnlBody = document.querySelector('#pnl-table tbody');
  if (pnlBody) {
    pnlBody.innerHTML = D.pnl.map(r => `
      <tr>
        <td class="fin-year">Año ${r.year}</td>
        <td>${fmt.format(r.socios)}</td>
        <td>${eur(r.ventas)}</td>
        <td>${eur(r.gastos)}</td>
        <td><strong style="color:var(--accent-orange);">${eur(r.ebitda)}</strong></td>
        <td>${eur(r.cfSocio)}</td>
        <td>${r.dscr.toFixed(1)}x</td>
      </tr>
    `).join('');
  }

  // ---- EQUIPO ----
  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) {
    teamGrid.innerHTML = D.equipo.map((p, i) => `
      <div class="team-card glass reveal reveal-delay-${i + 1}">
        <div class="team-photo" style="background: ${p.gradient};">${p.iniciales}</div>
        <h3>${p.nombre}</h3>
        <div class="team-role">${p.rol}</div>
        <p>${p.bio}</p>
        ${p.quote ? `<div class="team-quote">"${p.quote}"</div>` : ''}
        <div class="team-capital">${p.capital}</div>
      </div>
    `).join('');
  }

  // ---- TIMING ----
  const timingList = document.getElementById('timing-list');
  if (timingList) {
    timingList.innerHTML = D.timing.map((t, i) => `
      <div class="timing-item glass reveal ${t.fase.toLowerCase().includes('apertura oficial') ? 'highlight' : ''}">
        <div class="timing-q">${t.trimestre}</div>
        <h4>${t.fase}</h4>
        <p>${t.desc}</p>
      </div>
    `).join('');
  }

  // ---- RIESGOS ----
  const riskGrid = document.getElementById('risk-grid');
  if (riskGrid) {
    riskGrid.innerHTML = D.riesgos.map((r, i) => `
      <div class="risk-card glass reveal reveal-delay-${(i % 4) + 1}">
        <span class="risk-label">Riesgo</span>
        <h4>${r.riesgo}</h4>
        <span class="mitig-label">Mitigación</span>
        <p>${r.mitigacion}</p>
      </div>
    `).join('');
  }

  // =====================================================
  // SCROLL REVEAL
  // =====================================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // =====================================================
  // CHARTS
  // =====================================================
  if (window.Chart) {
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#b0b8c8';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';

    // EBITDA + CF chart
    const ebitdaCanvas = document.getElementById('ebitda-chart');
    if (ebitdaCanvas) {
      new Chart(ebitdaCanvas, {
        type: 'bar',
        data: {
          labels: D.pnl.map(r => 'Año ' + r.year),
          datasets: [
            {
              label: 'EBITDA',
              data: D.pnl.map(r => r.ebitda),
              backgroundColor: 'rgba(255,107,53,0.85)',
              borderRadius: 6,
              barPercentage: 0.65,
            },
            {
              label: 'Cash Flow Socio',
              data: D.pnl.map(r => r.cfSocio),
              backgroundColor: 'rgba(255,184,0,0.85)',
              borderRadius: 6,
              barPercentage: 0.65,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { usePointStyle: true, pointStyle: 'rectRounded', padding: 16, font: { size: 12 } } },
            tooltip: {
              backgroundColor: 'rgba(15,21,32,0.95)',
              borderColor: 'rgba(255,107,53,0.3)',
              borderWidth: 1,
              padding: 12,
              callbacks: { label: (ctx) => ctx.dataset.label + ': ' + eur(ctx.parsed.y) },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => (v / 1000).toFixed(0) + 'K€' },
              grid: { color: 'rgba(255,255,255,0.04)' },
            },
            x: { grid: { display: false } },
          },
        },
      });
    }

    // Members curve chart
    const membersCanvas = document.getElementById('members-chart');
    if (membersCanvas) {
      const months = [...D.membersCurve.y1, ...D.membersCurve.y2];
      const labels = months.map((_, i) => 'M' + (i + 1));

      new Chart(membersCanvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Socios',
            data: months,
            borderColor: '#FF6B35',
            backgroundColor: (ctx) => {
              const { chartArea, ctx: c } = ctx.chart;
              if (!chartArea) return 'rgba(255,107,53,0.2)';
              const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, 'rgba(255,107,53,0.35)');
              g.addColorStop(1, 'rgba(255,107,53,0.02)');
              return g;
            },
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 3,
            pointBackgroundColor: '#FFB800',
            pointBorderColor: '#FF6B35',
            pointBorderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(15,21,32,0.95)',
              borderColor: 'rgba(255,107,53,0.3)',
              borderWidth: 1,
              padding: 12,
              callbacks: { label: (ctx) => ctx.parsed.y + ' socios' },
            },
          },
          scales: {
            y: { beginAtZero: true, max: 220, grid: { color: 'rgba(255,255,255,0.04)' } },
            x: { grid: { display: false } },
          },
        },
      });
    }
  }
})();
