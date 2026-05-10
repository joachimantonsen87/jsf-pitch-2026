const G = window.GRUPO;

const fmt = n => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  return sign + abs.toLocaleString('es-ES');
};
const eur = n => fmt(n) + ' €';
const eurK = n => fmt(Math.round(n/1000)) + 'K €';

// =============== KPIs ===============
const totalCajaMes = G.estable.sb.ebitdaReal_mes + G.estable.vila.ebitdaReal_mes + G.estable.bcn.ebitdaReal_mes + G.estable.crossfit.ebitdaReal_mes;
const totalEbitdaAnual = G.estable.sb.ebitdaBooks_anual + G.estable.vila.ebitdaBooks_anual + G.estable.bcn.ebitdaBooks_anual + G.estable.crossfit.ebitdaBooks_anual;

document.getElementById('kpi-caja-mes').textContent = eur(totalCajaMes);
document.getElementById('kpi-ebitda').textContent = eur(totalEbitdaAnual);
document.getElementById('kpi-y7').textContent = eurK(G.resumenY7.total);
document.getElementById('kpi-y10').textContent = eurK(G.resumenY10.total);
document.getElementById('kpi-equity').textContent = eur(G.equityTotal.TOTAL_proyectos);
document.getElementById('kpi-mom').textContent = G.resumenY10.mom + 'x';

// =============== Clubs ===============
function renderClub(prefix, club) {
  document.getElementById(prefix + '-socios').textContent = club.socios + ' socios';
  document.getElementById(prefix + '-ventas').textContent = eur(club.ventas);
  document.getElementById(prefix + '-gastos').textContent = eur(club.gastos);
  document.getElementById(prefix + '-ebitda').textContent = eur(club.ebitdaReal_mes);
}
renderClub('sb', G.estable.sb);
renderClub('vila', G.estable.vila);
renderClub('bcn', G.estable.bcn);
renderClub('cf', G.estable.crossfit);

const totalSocios = G.estable.sb.socios + G.estable.vila.socios + G.estable.bcn.socios + G.estable.crossfit.socios;
const totalVentas = G.estable.sb.ventas + G.estable.vila.ventas + G.estable.bcn.ventas + G.estable.crossfit.ventas;
const totalGastos = G.estable.sb.gastos + G.estable.vila.gastos + G.estable.bcn.gastos + G.estable.crossfit.gastos;

document.getElementById('total-socios').textContent = totalSocios + ' socios';
document.getElementById('total-ventas').textContent = eur(totalVentas);
document.getElementById('total-gastos').textContent = eur(totalGastos);
document.getElementById('total-ebitda').textContent = eur(totalCajaMes);
document.getElementById('total-anual').textContent = eur(totalCajaMes * 12);

// =============== EBITDA summary ===============
const ebitdaReal = G.estable.sb.ebitdaReal_anual + G.estable.vila.ebitdaReal_anual + G.estable.bcn.ebitdaReal_anual + G.estable.crossfit.ebitdaReal_anual;
document.getElementById('ebitda-books').textContent = eur(totalEbitdaAnual);
document.getElementById('ebitda-real').textContent = eur(ebitdaReal);
document.getElementById('ebitda-diff').textContent = eur(totalEbitdaAnual - ebitdaReal);

// =============== Cash flow consolidado ===============
const cfBody = document.getElementById('cf-body');
cfBody.innerHTML = G.consolidado.map(c => `
  <tr>
    <td><strong>${c.año}</strong></td>
    <td class="num" style="${c.SB < 0 ? 'color:#ef4444' : ''}">${eur(c.SB)}</td>
    <td class="num" style="${c.Vila < 0 ? 'color:#ef4444' : ''}">${eur(c.Vila)}</td>
    <td class="num" style="${c.BCN < 0 ? 'color:#ef4444' : ''}">${eur(c.BCN)}</td>
    <td class="num" style="${c.CrossFit < 0 ? 'color:#ef4444' : (c.CrossFit === 0 ? 'color:#6b7280' : '')}">${c.CrossFit === 0 ? '—' : eur(c.CrossFit)}</td>
    <td class="num"><strong style="color:var(--accent-soft)">${eur(c.TOTAL)}</strong></td>
  </tr>
`).join('');

// =============== Salida Y7 ===============
document.getElementById('y7-sb').textContent = eur(G.venta2034.SB.neto);
document.getElementById('y7-vila').textContent = eur(G.venta2034.Vila.neto);
document.getElementById('y7-bcn').textContent = eur(G.venta2034.BCN.neto);
document.getElementById('y7-venta').textContent = eur(G.venta2034.TOTAL);
document.getElementById('y7-divs').textContent = eur(G.cashY7);
document.getElementById('y7-total').textContent = eur(G.resumenY7.total);
document.getElementById('y7-mom').textContent = G.resumenY7.mom + 'x';

// =============== Salida Y10 ===============
document.getElementById('y10-sb').textContent = eur(G.venta2037.SB.neto);
document.getElementById('y10-vila').textContent = eur(G.venta2037.Vila.neto);
document.getElementById('y10-bcn').textContent = eur(G.venta2037.BCN.neto);
document.getElementById('y10-cf').textContent = eur(G.venta2037.CrossFit.neto);
document.getElementById('y10-venta').textContent = eur(G.venta2037.TOTAL);
document.getElementById('y10-divs').textContent = eur(G.cashY10);
document.getElementById('y10-total').textContent = eur(G.resumenY10.total);
document.getElementById('y10-mom').textContent = G.resumenY10.mom + 'x';

document.getElementById('equity-total').textContent = eur(G.equityTotal.TOTAL_proyectos);

// =============== Charts ===============
Chart.defaults.color = '#a3a3a0';
Chart.defaults.borderColor = '#2a2a2a';
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif";

new Chart(document.getElementById('chart-ebitda'), {
  type: 'bar',
  data: {
    labels: ['Sant Boi (410)', 'Viladecans (370)', 'BF Virrei Amat (500)', 'CrossFit (200)', 'TOTAL'],
    datasets: [
      {
        label: 'EBITDA Books anual',
        data: [G.estable.sb.ebitdaBooks_anual, G.estable.vila.ebitdaBooks_anual, G.estable.bcn.ebitdaBooks_anual, G.estable.crossfit.ebitdaBooks_anual, totalEbitdaAnual],
        backgroundColor: 'rgba(255, 77, 46, 0.85)',
        borderRadius: 6,
      },
      {
        label: 'EBITDA Real Cash',
        data: [G.estable.sb.ebitdaReal_anual, G.estable.vila.ebitdaReal_anual, G.estable.bcn.ebitdaReal_anual, G.estable.crossfit.ebitdaReal_anual, ebitdaReal],
        backgroundColor: 'rgba(245, 183, 0, 0.85)',
        borderRadius: 6,
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('es-ES')} €` } }
    },
    scales: {
      y: { ticks: { callback: v => (v/1000) + 'K €' } },
      x: { grid: { display: false } }
    }
  }
});

new Chart(document.getElementById('chart-cf'), {
  type: 'bar',
  data: {
    labels: G.consolidado.map(c => c.año),
    datasets: [
      { label: 'Sant Boi', data: G.consolidado.map(c => c.SB), backgroundColor: 'rgba(59, 130, 246, 0.85)', borderRadius: 4 },
      { label: 'Viladecans', data: G.consolidado.map(c => c.Vila), backgroundColor: 'rgba(46, 204, 113, 0.85)', borderRadius: 4 },
      { label: 'BF Virrei Amat', data: G.consolidado.map(c => c.BCN), backgroundColor: 'rgba(168, 85, 247, 0.85)', borderRadius: 4 },
      { label: 'CrossFit', data: G.consolidado.map(c => c.CrossFit), backgroundColor: 'rgba(255, 77, 46, 0.85)', borderRadius: 4 },
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('es-ES')} €` } }
    },
    scales: {
      y: { stacked: true, ticks: { callback: v => (v/1000) + 'K €' } },
      x: { stacked: true, grid: { display: false } }
    }
  }
});
