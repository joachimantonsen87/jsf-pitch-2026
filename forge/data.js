// Forge Fitness Club — Pitch Deck Data
// Target 365 socios, equipo Jo Soc Fit (Carlos + Olivier + Joachim)

window.PITCH_DATA = {
  meta: {
    clubName: "FORGE",
    tagline: "Fitness Club",
    location: "Plaza Virrei Amat · Barcelona",
    date: "Mayo 2026",
  },

  heroMetrics: [
    { value: "250K€", label: "CapEx Total" },
    { value: "77,7%", label: "TIR Socio (7 años)" },
    { value: "11,0x", label: "Multiple on Money" },
    { value: "20 m", label: "Payback Equity" },
  ],

  // P&L 7 años (importes en €)
  pnl: [
    { year: 1, socios: 255, ventas: 191000, gastos: 137160, ebitda: 53840,  cfSocio: 35458,  dscr: 3.5 },
    { year: 2, socios: 360, ventas: 380300, gastos: 163338, ebitda: 194445, cfSocio: 154903, dscr: 12.5 },
    { year: 3, socios: 365, ventas: 437600, gastos: 169534, ebitda: 209719, cfSocio: 150239, dscr: 13.5 },
    { year: 4, socios: 365, ventas: 438000, gastos: 170448, ebitda: 209298, cfSocio: 149796, dscr: 13.5 },
    { year: 5, socios: 365, ventas: 438000, gastos: 171380, ebitda: 208528, cfSocio: 149086, dscr: 13.4 },
    { year: 6, socios: 365, ventas: 438000, gastos: 172331, ebitda: 207742, cfSocio: 148356, dscr: 13.4 },
    { year: 7, socios: 365, ventas: 438000, gastos: 173301, ebitda: 206940, cfSocio: 147609, dscr: 13.3 },
  ],

  // Curva socios mensual
  membersCurve: {
    y1: [40, 70, 95, 115, 135, 155, 175, 195, 210, 225, 240, 255],
    y2: [265, 275, 285, 295, 305, 315, 325, 335, 340, 348, 355, 360],
  },

  capex: {
    total: 250000,
    bankLoan: 125000,
    loanTerms: { tin: 4.5, years: 10, monthly: 1295 },
    equityTotal: 137000,
    workingCapital: 12000,
    perPartner: 45667,
    partnersCount: 3,
  },

  retornoSocio: {
    tir: "77,7%",
    mom: "11,04x",
    paybackMeses: 20,
    paybackAnos: "1,7",
    cajaTotalGrupo7y: 1512717,
    cajaPorSocio7y: 504239,
    valorVentaY7NetoDeuda: 577270,
    equityPorSocio: 45667,
  },

  hipotesis: {
    cuotaMedia: 95,
    cuotaMix: "Mensual 110€ + Trimestral 95€ + Anual 80€",
    targetEstable: 365,
    personalMes: 7500,
    alquilerMes: 2500,
    isInicial: 15,
    isPostBeneficio: 25,
  },

  zonas: [
    {
      n: "01",
      icon: "🏋️",
      nombre: "Performance Floor",
      m2: "~300 m²",
      desc: "Núcleo del club. Rigs de strength, sleds, ski erg, rowing, battle ropes. CrossFit, Hyrox y strength training en clases grupales de 15-18 personas y open box.",
      tags: ["CrossFit", "Hyrox", "Strength"],
    },
    {
      n: "02",
      icon: "🏃",
      nombre: "Endurance Lab",
      m2: "~70 m²",
      desc: "Curve runners, ski ergs y assault bikes. Espacio dedicado a preparación Hyrox y endurance training específico, separado del floor principal.",
      tags: ["Hyrox prep", "Endurance"],
    },
    {
      n: "03",
      icon: "🧊",
      nombre: "Recovery Lab",
      m2: "~60 m²",
      desc: "Cold plunge a 3-4°C, sauna finlandesa y zona de stretching y mobility. Pay per use o tier premium. Diferenciador real frente al box tradicional.",
      tags: ["Cold plunge", "Sauna", "Mobility"],
    },
    {
      n: "04",
      icon: "🩺",
      nombre: "Fisio Studio",
      m2: "~30 m²",
      desc: "Consulta de fisioterapeuta deportivo (profesional externo, alquiler 800€/mes). Prevención y recuperación integradas. Sesiones 50-60€.",
      tags: ["Fisio", "Prevención"],
    },
    {
      n: "05",
      icon: "🤝",
      nombre: "Comunidad",
      m2: "Pilar transversal",
      desc: "El verdadero foso defensivo. Eventos mensuales, retos internos, programación que crea identidad. La comunidad es lo que separa un club vivo de un gym vacío.",
      tags: ["Eventos", "Retos", "Identidad"],
    },
  ],

  disciplinas: [
    { icon: "🏆", nombre: "Hyrox Prep", desc: "El diferenciador. 1,3M atletas mundial proyectados 2026. Mercado virgen en zona Nou Barris." },
    { icon: "🏋️", nombre: "CrossFit", desc: "Clases programadas con coach + open box. Núcleo del modelo y motor de retención." },
    { icon: "🏃", nombre: "Endurance", desc: "Running funcional, intervalos, base aeróbica. Soporte directo a Hyrox y triatletas amateur." },
    { icon: "💪", nombre: "Strength", desc: "Olímpico y powerlifting. Programación específica para socios con foco en fuerza pura." },
    { icon: "🧘", nombre: "Mobility & Yoga", desc: "Yoga funcional y movilidad. Recovery activo integrado en la programación semanal." },
    { icon: "🥊", nombre: "Boxing Funcional", desc: "Cardio low stakes, técnica básica, alternativa para socios menos competitivos." },
  ],

  competidores: [
    {
      nombre: "Nou Barris Cross Training",
      direccion: "Carrer Argullós 72",
      distancia: "500 m",
      cuota: "~85 €",
      tipo: "Competidor directo",
      gap: "Posicionamiento básico, sin Hyrox ni recovery. Segmento distinto.",
    },
    {
      nombre: "CrossFit Horta",
      direccion: "Horta",
      distancia: "1,8 km",
      cuota: "n/d",
      tipo: "Otro barrio",
      gap: "Captación distinta, no compite por mismos socios.",
    },
    {
      nombre: "CrossFit RST Guinardó",
      direccion: "Guinardó",
      distancia: "2,0 km",
      cuota: "n/d",
      tipo: "Otro barrio",
      gap: "Captación distinta, no compite por mismos socios.",
    },
    {
      nombre: "HYBRD Academy",
      direccion: "Otra zona BCN",
      distancia: "Lejos",
      cuota: "Premium",
      tipo: "Único Hyrox oficial BCN",
      gap: "Mercado Hyrox totalmente abierto en Nou Barris.",
    },
  ],

  ubicacion: {
    plaza: "Plaza Virrei Amat",
    distrito: "Nou Barris (Vilapicina-La Torre Llobeta)",
    metros: ["L5 Vilapicina", "L5 Llucmajor", "L5 Virrei Amat"],
    poblacion15min: "200K hab",
    rentaMedia: "21.297 €/hab (Idescat 2022)",
    indexCatalunya: "111",
    perfil: "Profesionales 28-45, gentrificación activa",
    localObjetivo: "500-600 m², industrial reconvertido",
    rentaMensual: "2.400-2.800 €/mes",
  },

  equipo: [
    {
      iniciales: "OP",
      gradient: "linear-gradient(135deg, #FFB800, #ffe066)",
      nombre: "Olivier Philippe",
      rol: "Co-fundador · Finanzas y Estrategia",
      bio: "Más de 15 años en inversión inmobiliaria. Multi-emprendedor serial. Estructuración financiera y fundraising. Control de costes y optimización de márgenes.",
      capital: "45.667 €",
      quote: "Disciplina financiera y visión estratégica a largo plazo.",
    },
    {
      iniciales: "JA",
      gradient: "linear-gradient(135deg, #FF6B35, #FFB800)",
      nombre: "Joachim Antonsen",
      rol: "Co-fundador · Business Dev y Growth",
      bio: "Lead Partner Manager EMEA en Shopify. Partnerships multi-mercado (FR, ES, PT, GR). Socio en 3 clubs BF (Sant Boi, Viladecans, BF Virrei Amat abriendo sep 2027). Red de contactos internacional.",
      capital: "45.667 €",
      quote: "El growth engine que lleva el proyecto al siguiente nivel.",
    },
    {
      iniciales: "CM",
      gradient: "linear-gradient(135deg, #FF6B35, #ff8f66)",
      nombre: "Carlos Magretti Fernández",
      rol: "Gerente Operacional",
      bio: "Más de 10 años gestionando centros deportivos. Brooklyn Fitboxing TOP 5 mundial. Sant Boi: 300 socios en 6 meses, 10,7x vs plan inicial. Conversión 55% (vs 35-40% media de mercado).",
      capital: "45.667 €",
      quote: "El mejor operador de centros fitness que conocemos.",
    },
  ],

  trackRecord: {
    invertido: "220K€",
    facturacionY1: "266K€",
    ebitda: "77K€",
    socios6m: 300,
    extras: "Replicando Viladecans 23% menos inversión · Satisfacción 4,8/5 · Churn 5-6% · Fill rate 90-95%",
  },

  timing: [
    { trimestre: "Q3 2028", fase: "Decisión y búsqueda", desc: "Cierre de equipo, búsqueda activa de local 500-600m² en zona Virrei Amat." },
    { trimestre: "Q4 2028", fase: "Firma y financiación", desc: "Firma de local, cierre de préstamo bancario, inicio de obra." },
    { trimestre: "Q1-Q2 2029", fase: "Obra + soft opening", desc: "Reforma del local, equipamiento, contratación, comunidad early adopters." },
    { trimestre: "Verano 2029", fase: "Apertura oficial", desc: "Lanzamiento público. Objetivo 40 socios en mes 1." },
    { trimestre: "2029-2031", fase: "Ramp-up 30 meses", desc: "Curva hasta 365 socios estable en Y3. Operación cruzada con red BF." },
  ],

  riesgos: [
    {
      riesgo: "Competencia directa Nou Barris CT (500 m)",
      mitigacion: "Posicionamiento premium-mid 100-110€ vs su ~85€. Hyrox + Recovery + Fisio integrada. Segmentos distintos, no canibalizan.",
    },
    {
      riesgo: "Curva de socios más lenta de lo previsto",
      mitigacion: "Préstamo a 10 años + 12K working capital dan 24 meses de runway. Año 1 ya genera 54K EBITDA con 255 socios al cierre.",
    },
    {
      riesgo: "Coach lead crítico (modelo coach-driven)",
      mitigacion: "Carlos como COO con equity garantiza continuidad. Track record validado en Brooklyn Sant Boi (TOP 5 mundial). Equipo de coaches PT desde mes 1.",
    },
    {
      riesgo: "Saturación fitness Barcelona ciudad",
      mitigacion: "Foco en Nou Barris underserved en premium. Ningún operador en zona ofrece Hyrox + recovery. Demografía 200K hab valida la captura.",
    },
    {
      riesgo: "¿Canibalización con BF Virrei Amat (misma plaza)?",
      mitigacion: "Conceptos complementarios, no competidores. BF cardio/boxing 58€ vs FORGE CrossFit/Hyrox/Recovery 95€. Cross-selling natural entre los dos. ~500 socios BF en zona = base de leads pre-construida cuando FORGE abre 2029.",
    },
  ],

  oportunidad: {
    hyrox: { atletas2026: "1,3M", evento: "Hyrox Barcelona Fira · Nov 2026", crecimiento: "Mercado virgen en Nou Barris" },
    recovery: { yoy: "+30%", desc: "Demanda recovery + fisio integrada post-pandemia" },
    sinergiaBF: ["BF Sant Boi", "BF Viladecans", "BF Virrei Amat (sep 2027)"],
    sinergiaVirrei: "BF Virrei Amat abre sep 2027 en la MISMA Plaza Virrei Amat. FORGE abre verano 2029 con base de leads ya construida (~500 socios BF en zona). Cross-selling natural: BF cardio/boxing + FORGE CrossFit/Hyrox/Recovery. Mismo equipo operativo (Jo Soc Fit). Brand recognition compartido en barrio.",
  },
};
