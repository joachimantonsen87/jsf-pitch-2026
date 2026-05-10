// Render del business case Viladecans BF
const M = window.MODEL;

// Helpers
const fmt = (n, opts = {}) => {
  const { decimals = 0, suffix = '', prefix = '' } = opts;
  if (n === null || n === undefined || isNaN(n)) return '—';
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  const str = abs.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${sign}${prefix}${str}${suffix}`;
};
const eur = n => fmt(n, { suffix: ' €' });
const pct = s => s;

// =============== KPIs (vista REAL CASH para el socio) ===============
document.getElementById('kpi-equity').textContent = eur(M.inversion.equity);
document.getElementById('kpi-ebitda').textContent = eur(M.flujos[2].ebitdaReal);
document.getElementById('kpi-tir').textContent = M.retorno.tirRealConVenta;
document.getElementById('kpi-mom').textContent = M.retorno.momRealConVenta;
document.getElementById('kpi-payback').textContent = M.retorno.paybackMeses || M.retorno.payback;
document.getElementById('kpi-dscr').textContent = M.flujos[0].dscr.toFixed(1) + 'x';

// =============== Inversión ===============
document.getElementById('cap-capex').textContent = eur(M.inversion.capexIVA);
document.getElementById('cap-wc').textContent = eur(M.inversion.workingCapital);
document.getElementById('cap-total').textContent = eur(M.inversion.capexIVA + M.inversion.workingCapital);
document.getElementById('cap-renting').textContent = eur(M.inversion.renting);
document.getElementById('cap-prestamo').textContent = eur(M.inversion.prestamo);
document.getElementById('cap-equity').textContent = eur(M.inversion.equity);
document.getElementById('cap-apa').textContent = M.inversion.apalancamientoTotal;

// =============== Servicio deuda ===============
document.getElementById('renting-base').textContent = eur(M.inversion.cuotaRentingBaseMes);
document.getElementById('renting-iva').textContent = eur(M.inversion.cuotaRentingConIVAMes);
document.getElementById('loan-mes').textContent = eur(M.inversion.cuotaPrestamoMes);
document.getElementById('cuota-total').textContent = eur(M.inversion.cuotaTotalMes);
document.getElementById('cuota-anio').textContent = eur(M.inversion.cuotaTotalAnio);
const totalIntereses = M.amort.reduce((a, b) => a + b.int, 0);
document.getElementById('loan-int').textContent = eur(totalIntereses);

const amortBody = document.getElementById('amort-body');
amortBody.innerHTML = M.amort.map(a => `
  <tr>
    <td>Año ${a.y}</td>
    <td class="num">${eur(a.int)}</td>
    <td class="num">${eur(a.prin)}</td>
    <td class="num">${eur(a.saldo)}</td>
  </tr>
`).join('');

// =============== P&L ===============
const plBody = document.getElementById('pl-body');
plBody.innerHTML = M.flujos.map(f => `
  <tr>
    <td><strong>Año ${f.y}</strong></td>
    <td>${f.socios}</td>
    <td class="num">${eur(f.ventas)}</td>
    <td class="num">${eur(f.gastos)}</td>
    <td class="num">${eur(f.margen)}</td>
    <td class="num">${eur(f.ivaPagado)}</td>
    <td class="num"><strong>${eur(f.ebitda)}</strong></td>
  </tr>
`).join('');

// =============== Cash Flow (con CF Books y CF Real) ===============
const cfBody = document.getElementById('cf-body');
cfBody.innerHTML = M.flujos.map(f => `
  <tr>
    <td><strong>Año ${f.y}</strong></td>
    <td class="num">${eur(f.ebitda)}</td>
    <td class="num">${eur(f.intereses)}</td>
    <td class="num">${eur(f.principal)}</td>
    <td>${(f.tipoIS * 100).toFixed(0)}%</td>
    <td class="num">${eur(f.impuestos)}</td>
    <td class="num">${eur(f.cf)}</td>
    <td class="num"><strong style="color:var(--accent-soft)">${eur(f.cfReal)}</strong></td>
    <td class="num">${f.dscr.toFixed(1)}x</td>
  </tr>
`).join('');

// =============== Retorno (dual: Books + Real Cash) ===============
const cfAcum1_7_books = M.flujos.slice(0, 7).reduce((a, b) => a + b.cf, 0);
const cfAcum1_7_real = M.flujos.slice(0, 7).reduce((a, b) => a + b.cfReal, 0);

// Books column
document.getElementById('ret-equity-b').textContent = eur(M.retorno.equity);
document.getElementById('ret-cf-b').textContent = eur(cfAcum1_7_books);
document.getElementById('ret-valor-b').textContent = eur(M.retorno.valorVentaY7);
document.getElementById('ret-deuda-b').textContent = eur(M.retorno.deudaPendienteY7);
document.getElementById('ret-neto-b').textContent = eur(M.retorno.valorNetoY7);
document.getElementById('ret-total-b').textContent = eur(M.retorno.totalBooksConVenta);
document.getElementById('ret-tir-b').textContent = M.retorno.tirBooksConVenta;
document.getElementById('ret-mom-b').textContent = M.retorno.momBooksConVenta;

// Real cash column
document.getElementById('ret-equity').textContent = eur(M.retorno.equity);
document.getElementById('ret-cf').textContent = eur(cfAcum1_7_real);
document.getElementById('ret-valor').textContent = eur(M.retorno.valorVentaY7);
document.getElementById('ret-deuda').textContent = eur(M.retorno.deudaPendienteY7);
document.getElementById('ret-neto').textContent = eur(M.retorno.valorNetoY7);
document.getElementById('ret-total').textContent = eur(M.retorno.totalRealConVenta);
document.getElementById('ret-tir').textContent = M.retorno.tirRealConVenta;
document.getElementById('ret-mom').textContent = M.retorno.momRealConVenta;
document.getElementById('ret-pay').textContent = M.retorno.paybackMeses || M.retorno.payback;

// Sin venta
document.getElementById('ret-sin-total-b').textContent = eur(M.retorno.totalBooksSinVenta);
document.getElementById('ret-sin-total').textContent = eur(M.retorno.totalRealSinVenta);
document.getElementById('ret-sin-tir').textContent = M.retorno.tirRealSinVenta;
document.getElementById('ret-sin-mom').textContent = M.retorno.momRealSinVenta;

// =============== Mensual (M1-M24) ===============
const mesBody = document.getElementById('mes-body');
mesBody.innerHTML = M.simMensual.slice(0, 24).map(m => `
  <tr>
    <td><strong>M${m.mesGlobal}</strong> · Año ${m.anio}/Mes ${m.mes}</td>
    <td>${m.socios}</td>
    <td class="num">${eur(m.ventas)}</td>
    <td class="num">${eur(m.gastos)}</td>
    <td class="num">${eur(m.cashEnB || 0)}</td>
    <td class="num">${eur(m.ivaPagadoCash)}</td>
    <td class="num">${eur(m.cashFlow)}</td>
    <td class="num"><strong style="color:var(--accent-soft)">${eur(m.cashFlowReal)}</strong></td>
    <td class="num">${eur(m.creditoIVA)}</td>
  </tr>
`).join('');

// =============== Charts ===============
Chart.defaults.color = '#a3a3a0';
Chart.defaults.borderColor = '#2a2a2a';
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif";

// Gráfico evolución socios M1-M24
const sociosLabels = M.simMensual.slice(0, 24).map(m => `M${m.mesGlobal}`);
const sociosData = M.simMensual.slice(0, 24).map(m => m.socios);
new Chart(document.getElementById('chart-socios'), {
  type: 'line',
  data: {
    labels: sociosLabels,
    datasets: [{
      label: 'Socios Viladecans',
      data: sociosData,
      borderColor: '#ff4d2e',
      backgroundColor: 'rgba(255, 77, 46, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: '#ff4d2e',
      pointBorderColor: '#0a0a0a',
      pointBorderWidth: 2,
      pointRadius: 4,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: ctx => `${ctx.parsed.y} socios` } }
    },
    scales: {
      y: { beginAtZero: false, min: 180, ticks: { stepSize: 50 } },
      x: { grid: { display: false } }
    }
  }
});

// Gráfico P&L por año
new Chart(document.getElementById('chart-pl'), {
  type: 'bar',
  data: {
    labels: M.flujos.map(f => `Año ${f.y}`),
    datasets: [
      {
        label: 'Ventas',
        data: M.flujos.map(f => f.ventas),
        backgroundColor: 'rgba(255, 77, 46, 0.85)',
        borderRadius: 6,
      },
      {
        label: 'Gastos',
        data: M.flujos.map(f => f.gastos),
        backgroundColor: 'rgba(163, 163, 160, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'EBITDA caja',
        data: M.flujos.map(f => f.ebitda),
        backgroundColor: 'rgba(245, 183, 0, 0.95)',
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

// Cash flow del socio
new Chart(document.getElementById('chart-cf'), {
  type: 'bar',
  data: {
    labels: M.flujos.map(f => `Año ${f.y}`),
    datasets: [{
      label: 'CF socio (post servicio deuda + impuestos)',
      data: M.flujos.map(f => f.cf),
      backgroundColor: M.flujos.map((f, i) => i < 7 ? 'rgba(46, 204, 113, 0.85)' : 'rgba(46, 204, 113, 0.5)'),
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: ctx => `${ctx.parsed.y.toLocaleString('es-ES')} €` } }
    },
    scales: {
      y: { ticks: { callback: v => (v/1000) + 'K €' } },
      x: { grid: { display: false } }
    }
  }
});

// =============== CSV downloads ===============
function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadFile(content, filename) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

window.downloadCSV = function(type) {
  let csv = '';
  if (type === 'anual') {
    csv = 'Año,Socios fin año,Ventas,Gastos books,Gastos real cash,Cash en B,Margen,Brooklyn fees,% Brooklyn,Personal anual,Renting anual,Canon renovación,IVA pagado cash,EBITDA books,EBITDA real cash,Intereses préstamo,Principal préstamo,Tipo IS,Impuestos,Resultado neto,CF books,CF real cash,DSCR\n';
    csv += M.flujos.map(f => [
      f.y, f.socios, f.ventas, f.gastosBooks, f.gastosReal, f.cashEnB,
      f.margen, f.brooklynFees, f.brooklynPct, f.personalAnual, f.rentingAnual, f.canonRenovacion,
      f.ivaPagado, f.ebitda, f.ebitdaReal,
      f.intereses, f.principal, (f.tipoIS*100)+'%', f.impuestos, f.neto, f.cf, f.cfReal, f.dscr.toFixed(2)
    ].map(csvEscape).join(',')).join('\n');
    downloadFile(csv, 'viladecans-bf-pl-anual.csv');
  } else if (type === 'mensual') {
    csv = 'Mes Global,Año,Mes,Socios,Ventas,Gastos books,Gastos real,Cash en B,Margen books,Brooklyn fees,Personal,Renting,Canon renovación,IVA pagado cash,CF books,CF real,Crédito IVA restante\n';
    csv += M.simMensual.map(m => [
      m.mesGlobal, m.anio, m.mes, m.socios, m.ventas, m.gastos, m.gastosReal, m.cashEnB || 0,
      m.margen, m.brooklynFees, m.personal, m.renting, m.canonRenovacion,
      m.ivaPagadoCash, m.cashFlow, m.cashFlowReal, m.creditoIVA
    ].map(csvEscape).join(',')).join('\n');
    downloadFile(csv, 'viladecans-bf-detalle-mensual.csv');
  } else if (type === 'amort') {
    csv = 'PRÉSTAMO (Banco B · 100K · 10 años · 4,5%)\nAño,Intereses,Principal,Saldo pendiente fin año\n';
    csv += M.amort.map(a => [a.y, a.int, a.prin, a.saldo].map(csvEscape).join(',')).join('\n');
    csv += '\n\nRENTING (Banco A · 100K + IVA · 7 años · 4,5% · res. 1%)\nAño,Cuota base,Cuota con IVA,IVA cuota,Interés implícito\n';
    csv += M.amortRenting.map(a => [a.y, a.cuotaBase, a.cuotaConIVA, a.ivaCuota, a.interesImplicito].map(csvEscape).join(',')).join('\n');
    downloadFile(csv, 'viladecans-bf-financiacion.csv');
  }
};
