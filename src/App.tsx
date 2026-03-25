import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Trophy, Users, Tv, Globe, Heart, ShieldCheck, MapPin, Calendar, ArrowRight, CheckCircle2, Download } from 'lucide-react';

const AnimatedCounter = ({ target, suffix = '', isDecimal = false }: { target: number, suffix?: string, isDecimal?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('print');
    const handleChange = (e: MediaQueryListEvent) => setIsPrinting(e.matches);
    setIsPrinting(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isInView && !isPrinting) {
      let start: number | null = null;
      const duration = 1800;

      const tick = (now: number) => {
        if (!start) start = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = isDecimal ? Number((target * ease).toFixed(1)) : Math.round(target * ease);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    }
  }, [isInView, target, isDecimal, isPrinting]);

  const displayValue = isPrinting ? target : count;

  return <span ref={ref}>{isDecimal ? displayValue.toFixed(1) : displayValue}{suffix}</span>;
};

export default function App() {
  return (
    <div className="bg-black text-white font-inter text-[16px] leading-[1.6] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&q=80" 
            alt="Muay Thai" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.2)_0%,transparent_60%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
        </div>

        {/* Top Bar: Logo & Flag */}
        <div className="absolute top-8 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 w-full max-w-[1400px] mx-auto no-print">
          <div className="flex items-center gap-3">
            <img 
              src="https://www.federkombat.it/images/logo_scudetto.png" 
              alt="Federkombat Logo" 
              className="h-12 w-auto"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col items-start">
              <span className="font-bebas text-[24px] leading-none tracking-wider text-white">FEDERKOMBAT</span>
              <span className="font-inter text-[10px] tracking-[0.2em] text-gray uppercase">Federazione Ufficiale</span>
            </div>
          </div>
          <div className="flex h-6 w-10 rounded-sm overflow-hidden border border-white/20 shadow-lg">
            <div className="w-1/3 h-full bg-[#009246]"></div>
            <div className="w-1/3 h-full bg-[#F1F2F1]"></div>
            <div className="w-1/3 h-full bg-[#CE2B37]"></div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-6"
        >
          <span className="inline-block border border-gold/50 text-gold font-inter font-semibold text-[12px] tracking-[0.2em] uppercase py-2 px-6 rounded-full bg-gold/5 backdrop-blur-sm">
            Progetto di Sponsorizzazione
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 font-bebas text-[clamp(60px,12vw,140px)] leading-[0.85] tracking-wide mb-6"
        >
          <span className="text-white">ELITE BOXING</span><br/>
          <span className="text-gold">2026</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 font-inter font-light text-[clamp(18px,3vw,24px)] text-gray max-w-[800px] mb-12"
        >
          Il più grande evento internazionale di <strong className="text-white font-medium">IFMA Muay Thai</strong> e <strong className="text-white font-medium">Kickboxing</strong> in Italia.<br/>
          <span className="text-gold mt-2 block">Puglia • Sardegna • Toscana</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex flex-wrap justify-center gap-4 no-print"
        >
          <a href="#pacchetti" className="bg-gold hover:bg-gold-light text-black font-inter font-bold text-[14px] tracking-[0.1em] uppercase py-4 px-8 transition-all duration-300 clip-diagonal flex items-center gap-2">
            Diventa Sponsor <ArrowRight size={18} />
          </a>
          <a href="#progetto" className="bg-black-3 hover:bg-black-2 border border-white/10 text-white font-inter font-semibold text-[14px] tracking-[0.1em] uppercase py-4 px-8 transition-all duration-300 clip-diagonal">
            Scopri il Progetto
          </a>
          <button onClick={() => window.print()} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-inter font-semibold text-[14px] tracking-[0.1em] uppercase py-4 px-8 transition-all duration-300 clip-diagonal flex items-center gap-2">
            <Download size={18} /> Scarica PDF
          </button>
        </motion.div>
      </section>

      {/* HIGHLIGHTS BAR */}
      <section className="bg-black-2 border-y border-white/10 py-10 px-6 relative z-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {[
            { icon: <Tv size={24} className="text-gold mb-3" />, num: 1.18, unit: 'M+', label: 'Audience TV Stimata' },
            { icon: <Globe size={24} className="text-gold mb-3" />, num: 80, unit: '+', label: 'Nazioni Partecipanti' },
            { icon: <MapPin size={24} className="text-gold mb-3" />, num: 5, unit: '', label: 'Grandi Eventi Nazionali' },
            { icon: <Users size={24} className="text-gold mb-3" />, num: 500, unit: 'K+', label: 'Reach Social Mensile' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="flex justify-center">{stat.icon}</div>
              <div className="font-bebas text-[40px] md:text-[56px] leading-none text-white mb-1">
                <AnimatedCounter target={stat.num} isDecimal={stat.num % 1 !== 0} />
                <span className="text-gold">{stat.unit}</span>
              </div>
              <div className="font-inter font-medium text-[12px] text-gray uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* IL PROGETTO */}
      <section id="progetto" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-bebas text-[48px] md:text-[64px] leading-[0.9] mb-6">
              Un Ecosistema<br/>
              <span className="text-gold">Unico in Italia</span>
            </h2>
            <p className="text-gray text-[18px] mb-6">
              Elite Boxing, in collaborazione con <strong>Federkombat</strong> e <strong>IFMA</strong>, porta in Italia un circuito di 5 eventi di arti marziali di altissimo livello. 
            </p>
            <p className="text-gray text-[18px] mb-8">
              Non solo sport: è una piattaforma di comunicazione ad alto valore strategico, ideale per aziende che vogliono presidiare territori ad alta intensità emotiva e ottenere visibilità internazionale attraverso la trasmissione su <strong>DAZN</strong> e <strong>Sky</strong>.
            </p>
            <ul className="space-y-4">
              {[
                'Supporto ufficiale Federkombat & IFMA',
                'Titoli e cinture WMC in palio',
                'Oltre 130 federazioni nazionali coinvolte',
                'Visibilità in 220 paesi nel mondo'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <CheckCircle2 size={20} className="text-gold shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-black-3 border border-white/10 p-8 relative overflow-hidden clip-diagonal">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red/10 blur-[50px]"></div>
              
              <div className="h-full flex flex-col justify-center">
                <Trophy size={48} className="text-gold mb-6" />
                <h3 className="font-bebas text-[32px] mb-4">Il Fondatore</h3>
                <p className="text-gray text-[16px] mb-6">
                  <strong>Emanuele Sasanelli</strong>, Dirigente nazionale Muay Thai Federkombat e Referente WMC Italia. Dal 2009 guida il Team Sasanelli con l'obiettivo di valorizzare un ambiente sano e costruttivo, portando la Muay Thai italiana ai vertici mondiali.
                </p>
                <div className="font-inter font-semibold text-gold text-[14px] uppercase tracking-wider">
                  Direzione Tecnica & Organizzativa
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPATTO SOCIALE */}
      <section className="bg-black-2 py-24 px-6 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-bebas text-[48px] md:text-[64px] leading-[0.9] mb-4">
              Oltre il Ring:<br/>
              <span className="text-red">Impatto Sociale</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black-3 border border-white/10 p-8 md:p-12 mb-16 text-left relative overflow-hidden clip-diagonal"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red/5 blur-[80px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h3 className="font-bebas text-[32px] md:text-[40px] text-gold mb-6">Parola d'ordine: Inclusione</h3>
                <div className="space-y-4 text-gray text-[16px] md:text-[18px] font-light leading-relaxed">
                  <p>
                    La <strong className="text-white font-medium">ASD Bari Kombat</strong> crede fortemente che lo Sport debba essere accessibile a tutti, che nessuno debba avere impedimenti strutturali o sociali che ne impediscano lo svolgimento.
                  </p>
                  <p>
                    Per questo motivo la ASD Bari Kombat, sotto l'egida della <strong className="text-white font-medium">Federkombat (FSN)</strong> federazione nazionale di riferimento, ha iniziato un percorso supportato dalla stessa federazione, che nel gennaio 2022 ha firmato un protocollo d'intesa con il <strong className="text-white font-medium">Comitato Italiano Paralimpico (C.I.P)</strong>.
                  </p>
                  <p>
                    Obiettivo importante per la nostra ASD e per gli Sponsor, sarà la realizzazione di eventi periodici, con accesso gratuito ma con stretti protocolli organizzativi e certificati, che coinvolgeranno ragazzi portatori di Handicap siano essi fisici o psichici. Tutto sarà supportato da linee guida federali, con il coinvolgimento di tecnici federali appositamente formati ed iscritti alla nostra Federazione.
                  </p>
                  <p>
                    La scuola, ma soprattutto lo Sport deve essere in prima linea nel favorire l'integrazione di questi ragazzi nel tessuto sociale.
                  </p>
                  <p className="text-gold font-medium pt-2">
                    Gli Sponsor a tal proposito valorizzeranno gli eventi con la loro presenza; regaleranno giornate di sport a chi quotidianamente lotta per ricercare nel mondo un proprio spazio, regaleranno alle famiglie la gioia di trascorrere giornate all'insegna dell'unione e del Fairplay.
                  </p>
                </div>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-red/5 group">
                <iframe 
                  src="https://drive.google.com/file/d/1_MNCKZyctxY1zjw2EqO_DPF0JRdvIPH6/preview" 
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  title="Video Inclusione"
                ></iframe>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm font-inter bg-black/60 px-3 py-1.5 rounded-full pointer-events-none">
                  <Heart size={16} className="text-red" />
                  <span>Lo sport unisce, senza barriere.</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Heart size={32} className="text-red mb-4" />, 
                title: 'Inclusione CIP', 
                desc: 'Protocollo d\'intesa con il Comitato Italiano Paralimpico. Workshop gratuiti e attività sportive per 100-150 bambini con disabilità per ogni evento.' 
              },
              { 
                icon: <Users size={32} className="text-gold mb-4" />, 
                title: 'Parità di Genere', 
                desc: 'Circa il 30% dei match totali sono femminili, con titoli internazionali WMC in palio e un forte focus mediatico per valorizzare le donne nello sport.' 
              },
              { 
                icon: <ShieldCheck size={32} className="text-white mb-4" />, 
                title: 'Comunità Locali', 
                desc: 'Collaborazioni attive con scuole, palestre e associazioni del territorio per promuovere valori positivi, disciplina e integrazione sociale.' 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-black border border-white/5 p-8 hover:border-white/20 transition-colors"
              >
                {item.icon}
                <h3 className="font-bebas text-[28px] mb-3">{item.title}</h3>
                <p className="text-gray text-[15px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IL TOUR 2026 */}
      <section className="py-24 px-6 max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-bebas text-[48px] md:text-[64px] leading-[0.9] mb-4">
            Il Tour <span className="text-gold">2026</span>
          </h2>
          <p className="text-gray text-[18px]">5 grandi eventi in 3 regioni italiane, con copertura televisiva nazionale.</p>
        </motion.div>

        <div className="space-y-6">
          {[
            { date: 'Maggio 2026', city: 'Bari', region: 'Puglia', tv: 'Diretta DAZN', aud: '350.000' },
            { date: 'Giugno 2026', city: 'Bari', region: 'Puglia', tv: 'Differita Sky', aud: '200.000' },
            { date: 'Luglio 2026', city: 'Cagliari', region: 'Sardegna', tv: 'Diretta DAZN', aud: '300.000' },
            { date: 'Settembre 2026', city: 'Cagliari', region: 'Sardegna', tv: 'Differita Sky', aud: '180.000' },
            { date: 'Ottobre 2026', city: 'Grosseto', region: 'Toscana', tv: 'Differita Sky', aud: '150.000' },
          ].map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-black-3 border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gold/50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black-2 flex flex-col items-center justify-center border border-white/5 shrink-0">
                  <Calendar size={20} className="text-gold mb-1" />
                  <span className="font-bebas text-[18px] leading-none">{event.date.split(' ')[0].substring(0,3)}</span>
                </div>
                <div>
                  <h4 className="font-bebas text-[28px] leading-none mb-1">{event.city} <span className="text-gray font-inter font-normal text-[16px]">({event.region})</span></h4>
                  <p className="text-gold font-inter font-medium text-[14px]">{event.tv}</p>
                </div>
              </div>
              <div className="md:text-right w-full md:w-auto border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                <div className="font-inter text-[12px] text-gray uppercase tracking-wider mb-1">Audience Stimata</div>
                <div className="font-bebas text-[32px] leading-none">{event.aud}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PACCHETTI SPONSOR */}
      <section id="pacchetti" className="bg-black-2 py-24 px-6 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-bebas text-[48px] md:text-[64px] leading-[0.9] mb-4">
              Sponsorship <span className="text-gold">Packs</span>
            </h2>
            <p className="text-gray text-[18px] max-w-[700px] mx-auto">
              Una gamma strutturata di opportunità di partnership per rispondere a ogni strategia di investimento, garantendo visibilità premium e ritorno d'immagine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MAIN */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red/20 to-black-3 border border-red p-8 md:p-12 relative overflow-hidden lg:col-span-3 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-[0_0_40px_rgba(230,57,70,0.2)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red/20 blur-[100px] group-hover:bg-red/30 transition-all duration-500"></div>
              <div className="relative z-10 w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="font-inter font-bold text-[14px] tracking-[0.2em] text-red uppercase bg-red/10 px-4 py-1 rounded-full">Annuale</div>
                  <div className="flex items-center gap-2 text-gold"><Trophy size={18} /> Premium Partnership</div>
                </div>
                <h3 className="font-bebas text-[56px] md:text-[72px] leading-none mb-2 text-white drop-shadow-lg">MAIN SPONSOR</h3>
                <div className="font-bebas text-[40px] md:text-[48px] text-red leading-none mb-8">€ 100.000 <span className="text-[20px] text-gray font-inter font-normal">+ IVA</span></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    'Naming evento ("EVENTO PRESENTED BY AZIENDA")',
                    'Logo principale su tutti i materiali ufficiali',
                    'Visibilità massima in venue',
                    'Presenza su tutte le comunicazioni',
                    'Spot TV su DAZN (30")'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-red shrink-0 mt-0.5" />
                      <span className="text-gray-200 text-[15px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto text-center">
                <a href="#contatti" className="inline-block w-full md:w-auto bg-red hover:bg-red/80 text-white font-inter font-bold text-[16px] tracking-[0.1em] uppercase py-5 px-10 transition-all duration-300 clip-diagonal shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)] no-print whitespace-nowrap">
                  Richiedi Dettagli
                </a>
              </div>
            </motion.div>

            {[
              { name: 'DIAMOND', price: '50.000', type: 'Annuale', color: '#3498db', features: ['Logo primario', 'Visibilità venue (corner ring, LEDwall)', 'Social media dedicato', 'Backdrop ufficiale', 'Spot TV DAZN (15")'] },
              { name: 'EMERALD', price: '25.000', type: 'Annuale', color: '#2ecc71', features: ['Logo su materiali promozionali', 'Banner venue', 'Canali digitali evento', 'Premiazione atleta sul ring'] },
              { name: 'GOLD', price: '15.000', type: 'Singolo Evento', color: '#D4AF37', features: ['Logo su materiali promozionali', 'Banner all\'interno della venue', 'Visibilità digitale', 'Logo su ring'] },
              { name: 'SILVER', price: '5.000', type: 'Singolo Evento', color: '#bdc3c7', features: ['Logo su materiali selezionati', 'Visibilità sui social media', 'Presenza online'] },
              { name: 'BRONZE', price: '2.500', type: 'Singolo Evento', color: '#cd7f32', features: ['Riconoscimento ufficiale', 'Logo su materiali selezionati (poster, flyer)'] },
            ].map((pack, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black-3 border border-white/10 p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col"
                style={{ borderTopColor: pack.color, borderTopWidth: '4px' }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-[50px]" style={{ backgroundColor: pack.color }}></div>
                
                <div className="font-inter font-bold text-[12px] tracking-[0.2em] uppercase mb-3" style={{ color: pack.color }}>{pack.type}</div>
                <h3 className="font-bebas text-[40px] leading-none mb-2 text-white">{pack.name}</h3>
                <div className="font-bebas text-[32px] leading-none mb-8" style={{ color: pack.color }}>
                  € {pack.price} <span className="text-[16px] text-gray font-inter font-normal">+ IVA</span>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow relative z-10">
                  {pack.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: pack.color }} />
                      <span className="text-gray text-[14px] leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a href="#contatti" className="block w-full text-center border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-inter font-bold text-[13px] tracking-[0.1em] uppercase py-3 px-6 transition-all duration-300 no-print relative z-10">
                  Seleziona
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / CONTATTI */}
      <section id="contatti" className="relative py-32 px-6 text-center bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-[800px] mx-auto"
        >
          <h2 className="font-bebas text-[56px] md:text-[80px] leading-[0.9] mb-6">
            Entra nel Ring.<br/>
            <span className="text-gold">Diventa Partner.</span>
          </h2>
          <p className="text-gray text-[20px] mb-12">
            Contattaci per ricevere il dossier completo e valutare l'opportunità di partnership più adatta alla tua azienda.
          </p>
          
          <div className="bg-black-3 border border-white/10 p-8 md:p-12 inline-block text-left w-full max-w-[500px]">
            <h3 className="font-bebas text-[32px] mb-6 border-b border-white/10 pb-4">Contatti Ufficiali</h3>
            <div className="space-y-4">
              <div>
                <div className="font-inter font-bold text-[12px] tracking-[0.1em] text-gold uppercase mb-1">Referente</div>
                <div className="text-[18px] text-white">Emanuele Sasanelli</div>
                <div className="text-[14px] text-gray">Dirigente nazionale Muay Thai Federkombat</div>
              </div>
              <div className="pt-4 no-print">
                <a href="mailto:sponsor@eliteboxing.it" className="block w-full text-center bg-gold hover:bg-gold-light text-black font-inter font-bold text-[14px] tracking-[0.1em] uppercase py-4 px-8 transition-all duration-300 clip-diagonal">
                  Invia un'email
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8 px-6 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-bebas text-[24px] tracking-wider">ELITE <span className="text-gold">BOXING</span></div>
        <div className="font-inter text-[12px] text-gray uppercase tracking-wider">
          © 2026 Elite Boxing • Federkombat • IFMA
        </div>
      </footer>
    </div>
  );
}
