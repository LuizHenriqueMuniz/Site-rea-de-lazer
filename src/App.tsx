import { useState, useEffect, useRef } from "react";
import logoImg from "@/imports/logo_area.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8c97a";

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0L7.5 4.5H12L8.25 7.25L9.75 12L6 9L2.25 12L3.75 7.25L0 4.5H4.5L6 0Z" fill={GOLD} />
      </svg>
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "O Espaço", href: "#espaco" },
    { label: "Comodidades", href: "#comodidades" },
    { label: "Galeria", href: "#galeria" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}22` : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <img src={logoImg} alt="Espaço Andreluz" className="h-10 w-10 object-contain" />
          <div className="hidden sm:block leading-tight">
            <p className="font-display text-base font-semibold" style={{ color: GOLD, letterSpacing: "0.05em" }}>ESPAÇO</p>
            <p className="font-display text-xs tracking-widest text-white/50 uppercase">Andreluz</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              className="text-[12px] font-medium tracking-widest uppercase text-white/60 hover:text-[#c9a84c] transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contato"
          className="hidden md:inline-flex items-center gap-2 border text-[12px] font-semibold tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:bg-[#c9a84c] hover:text-black"
          style={{ borderColor: GOLD, color: GOLD }}>
          Reservar
        </a>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: GOLD }} />
            <span className={`block h-px transition-all ${mobileOpen ? "opacity-0" : ""}`} style={{ background: GOLD }} />
            <span className={`block h-px transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: GOLD }} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 border-t px-6 pb-8 pt-6 flex flex-col gap-5" style={{ borderColor: `${GOLD}22` }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-[13px] font-medium tracking-widest uppercase text-white/60">{l.label}</a>
          ))}
          <a href="#contato"
            className="mt-2 text-center border text-[12px] font-semibold tracking-widest uppercase py-3 transition-colors"
            style={{ borderColor: GOLD, color: GOLD }}>
            Reservar
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { ref, inView } = useInView(0.05);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0">
        <img
          src="/images/frente recortada.webp"
          alt="Dentro do Espaço Andreluz"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 30%, transparent 60%, #0a0a0a 100%)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${GOLD}08 0%, transparent 70%)` }} />
      </div>

      <div
        ref={ref}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 flex flex-col items-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <img src={logoImg} alt="Espaço Andreluz" className="w-36 h-36 object-contain mb-8 drop-shadow-2xl" />

        <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-6" style={{ color: GOLD }}>
          Área de Lazer Exclusiva
        </p>

        <h1
          className="font-display font-light text-white mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "-0.01em", lineHeight: 1.05 }}
        >
          Momentos que<br />
          <em style={{ color: GOLD, fontStyle: "italic" }}>ficam para sempre</em>
        </h1>

        <GoldDivider />

        <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto leading-relaxed mt-6 mb-10 font-light">
          Um refúgio completo para celebrar, descansar e criar memórias com quem você ama.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#contato"
            className="px-8 py-3.5 text-[12px] font-semibold tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: GOLD, color: "#0a0a0a" }}>
            Verificar Disponibilidade
          </a>
          <a href="#espaco"
            className="flex items-center gap-2 text-[12px] font-medium tracking-widest uppercase transition-colors duration-200 hover:opacity-80"
            style={{ color: GOLD }}>
            Conhecer o espaço
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: `${GOLD}60` }}>
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="espaco" className="py-28 px-6" style={{ background: "#0f0e0c" }}>
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div>
            <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>O Espaço</p>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
              Um lugar feito para<br /><em style={{ color: GOLD }}>celebrar</em>
            </h2>
            <GoldDivider />
            <p className="text-white/55 leading-relaxed mt-6 mb-5 font-light">
              O Espaço Andreluz foi pensado em cada detalhe para proporcionar uma experiência única de lazer e confraternização. Com ótima localização, fácil acesso e estrutura completa, é o lugar perfeito para reunir família e amigos.
            </p>
            <p className="text-white/55 leading-relaxed font-light">
              Ideal para aniversários, casamentos, confraternizações, chás de bebê e qualquer ocasião especial que mereça um espaço à altura da memória que você quer criar.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { n: "2", label: "Quartos" },
                { n: "2", label: "Banheiros" },
                { n: "1", label: "Piscina" },
                { n: "1", label: "Espaço Gourmet" },
              ].map((s) => (
                <div key={s.label} className="border p-4" style={{ borderColor: `${GOLD}30` }}>
                  <p className="font-display font-semibold text-3xl" style={{ color: GOLD }}>{s.n}</p>
                  <p className="text-[12px] tracking-widest uppercase text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/dentro.webp"
              alt="Dentro do Espaço Andreluz"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 border-b border-l" style={{ borderColor: GOLD }} />
            <div className="absolute -top-4 -right-4 w-28 h-28 border-t border-r" style={{ borderColor: GOLD }} />
          </div>
        </div>
      </div>
    </section>
  );
}

const AMENITIES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 18C4 12 8 8 14 8C20 8 24 12 24 18" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 20h24" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 22v2M24 22v2" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 8V6M14 8V4M18 8V6" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Piscina",
    desc: "Piscina espaçosa com área de lazer ao redor, perfeita para relaxar e se refrescar em dias quentes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="14" width="20" height="10" rx="1" stroke={GOLD} strokeWidth="1.5" />
        <path d="M8 14V10a6 6 0 0112 0v4" stroke={GOLD} strokeWidth="1.5" />
        <path d="M10 20h8M14 17v6" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="14" cy="6" r="2" stroke={GOLD} strokeWidth="1.2" />
      </svg>
    ),
    title: "Espaço Gourmet Completo",
    desc: "Cozinha equipada, churrasqueira, bancadas e tudo que você precisa para preparar refeições memoráveis.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="16" rx="1" stroke={GOLD} strokeWidth="1.5" />
        <path d="M9 8V6a5 5 0 0110 0v2" stroke={GOLD} strokeWidth="1.5" />
        <path d="M4 13h20" stroke={GOLD} strokeWidth="1.2" />
        <rect x="11" y="16" width="6" height="5" rx="0.5" stroke={GOLD} strokeWidth="1.2" />
      </svg>
    ),
    title: "2 Quartos",
    desc: "Dois quartos confortáveis e bem decorados, ideais para hóspedes que queiram pernoitar.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 24V10a2 2 0 012-2h4v16" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 24V6h8a2 2 0 012 2v16" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 24h20" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 12h3M15 16h3" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "2 Banheiros",
    desc: "Dois banheiros modernos e espaçosos para o conforto de todos os convidados.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke={GOLD} strokeWidth="1.5" />
        <path d="M14 8v6l4 3" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 5l1.5 1.5M22 5l-1.5 1.5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Ótima Localização",
    desc: "Endereço privilegiado com fácil acesso, próximo a vias principais e pontos de referência.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L5 9v10l9 5 9-5V9L14 4z" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 4v20M5 9l9 5 9-5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Área Completa para Eventos",
    desc: "Espaço amplo para decoração, mesas, palco ou pista de dança — organize do seu jeito.",
  },
];

function Amenities() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="comodidades" className="py-28 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>Comodidades</p>
          <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
            Tudo para a perfeita<br /><em style={{ color: GOLD }}>experiência</em>
          </h2>
          <GoldDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: `${GOLD}18` }}>
          {AMENITIES.map((a, i) => (
            <AmenityCard key={a.title} a={a} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenityCard({ a, delay }: { a: typeof AMENITIES[0]; delay: number }) {
  const { ref, inView } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="p-8 flex flex-col gap-4 group hover:cursor-default transition-all duration-300"
      style={{
        background: "#0a0a0a",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, background 0.3s`,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#141209")}
      onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
    >
      <div>{a.icon}</div>
      <h3 className="font-display font-medium text-white text-xl">{a.title}</h3>
      <p className="text-white/45 text-[13px] leading-relaxed font-light">{a.desc}</p>
    </div>
  );
}

const GALLERY = [
  { src: "/images/piscina.webp", alt: "Piscina do Espaço Andreluz", span: "md:col-span-2" },
  { src: "/images/gourmet.webp", alt: "Espaço gourmet com churrasqueira", span: "" },
  { src: "/images/quarto1.webp", alt: "Quarto com duas camas e ar-condicionado", span: "" },
  { src: "/images/quarto2.webp", alt: "Quarto com beliche e ar-condicionado", span: "" },
  { src: "/images/banheiros.webp", alt: "Banheiro do Espaço Andreluz", span: "" },
];

function Gallery() {
  const { ref, inView } = useInView(0.05);
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-28 px-6" style={{ background: "#0f0e0c" }}>
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>Galeria</p>
          <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
            Veja nosso <em style={{ color: GOLD }}>espaço</em>
          </h2>
          <GoldDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {GALLERY.map((g, i) => (
            <GalleryItem key={i} g={g} delay={i * 0.08} onOpen={() => setAberta(i)} />
          ))}
        </div>
      </div>

      {aberta !== null && (
        <Lightbox index={aberta} onClose={() => setAberta(null)} onChange={setAberta} />
      )}
    </section>
  );
}

function GalleryItem({ g, delay, onOpen }: { g: typeof GALLERY[0]; delay: number; onOpen: () => void }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Ampliar foto: ${g.alt}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`relative overflow-hidden group cursor-zoom-in ${g.span}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.97)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        height: 260,
        background: "#141414",
      }}
    >
      <img
        src={g.src}
        alt={g.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
      >
        <p className="text-white/80 text-[12px] tracking-wide">{g.alt}</p>
      </div>
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const total = GALLERY.length;
  const g = GALLERY[index];
  const touchX = useRef<number | null>(null);

  const anterior = () => onChange((index - 1 + total) % total);
  const proxima = () => onChange((index + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
    };
    window.addEventListener("keydown", onKey);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowOriginal;
    };
  }, [index]);

  const botaoBase =
    "absolute flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#c9a84c] hover:text-black";
  const botaoStyle = { borderColor: `${GOLD}60`, color: GOLD, background: "rgba(10,10,10,0.6)" };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={g.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) {
          if (dx > 0) anterior();
          else proxima();
        }
      }}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className={`${botaoBase} top-4 right-4`}
        style={botaoStyle}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={(e) => {
          e.stopPropagation();
          anterior();
        }}
        className={`${botaoBase} left-3 top-1/2 -translate-y-1/2`}
        style={botaoStyle}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <figure className="w-full max-w-5xl px-16" onClick={(e) => e.stopPropagation()}>
        <img src={g.src} alt={g.alt} className="mx-auto max-h-[80vh] w-full object-contain" />
        <figcaption className="mt-3 text-center text-[13px] text-white/70">
          {g.alt} · {index + 1}/{total}
        </figcaption>
      </figure>

      <button
        type="button"
        aria-label="Próxima foto"
        onClick={(e) => {
          e.stopPropagation();
          proxima();
        }}
        className={`${botaoBase} right-3 top-1/2 -translate-y-1/2`}
        style={botaoStyle}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function Location() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="localizacao" className="py-28 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div>
            <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>Localização</p>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
              Onde estamos
            </h2>
            <GoldDivider />
            <p className="text-white/55 leading-relaxed mt-6 mb-8 font-light">
              O Espaço Andreluz conta com uma localização privilegiada, de fácil acesso por transporte próprio, próximo a vias principais e pontos de referência da região.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "📍", text: "Endereço disponível mediante reserva" },
                { icon: "🚗", text: "Amplo estacionamento gratuito" },
                { icon: "🕐", text: "Disponível todos os dias, sujeito a reserva" },
                { icon: "📞", text: "Atendimento via WhatsApp" },
              ].map((i) => (
                <div key={i.text} className="flex items-start gap-4 text-white/55 text-[14px] font-light">
                  <span className="text-lg mt-0.5">{i.icon}</span>
                  <span>{i.text}</span>
                </div>
              ))}
            </div>

            <a
              href="#contato"
              className="inline-flex items-center gap-2 mt-10 border text-[12px] font-semibold tracking-widest uppercase px-6 py-3 transition-all duration-200 hover:bg-[#c9a84c] hover:text-black"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              Solicitar endereço
            </a>
          </div>

          <div className="relative">
            <img
              src="/images/piscina.webp"
              alt="Piscina do Espaço Andreluz"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 border" style={{ borderColor: `${GOLD}30`, margin: "12px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

const WHATSAPP_NUMBER = "5517991127921"; // 55 + DDD + número, só dígitos. Ex.: "5517999998888"
const ENVIO_POR_EMAIL_ATIVO = false; // vire true quando o backend /api/reserva existir

function formatarTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function dataBR(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

function Contact() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ nome: "", telefone: "", data: "", evento: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const hoje = new Date().toLocaleDateString("en-CA"); // aaaa-mm-dd na data local

  function validar() {
    if (form.nome.trim().length < 2) return "Informe seu nome.";
    const tel = form.telefone.replace(/\D/g, "");
    if (tel.length < 10 || Number(tel.slice(0, 2)) < 11 || (tel.length === 11 && tel[2] !== "9")) {
      return "Informe um WhatsApp válido, com DDD.";
    }
    if (!form.data) return "Escolha a data do evento.";
    if (form.data < hoje) return "A data do evento não pode ser no passado.";
    if (form.evento.trim().length < 2) return "Informe o tipo de evento.";
    return "";
  }

  function montarMensagem() {
    return [
      "Olá! Gostaria de fazer uma reserva no Espaço Andreluz.",
      "",
      `*Nome:* ${form.nome.trim()}`,
      `*WhatsApp:* ${form.telefone}`,
      `*Data do evento:* ${dataBR(form.data)}`,
      `*Tipo de evento:* ${form.evento.trim()}`,
      `*Mensagem:* ${form.mensagem.trim() || "-"}`,
    ].join("\n");
  }

  function enviarWhatsApp() {
    const msg = validar();
    setErro(msg);
    if (msg) return;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(montarMensagem())}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function enviarMensagem() {
    const msg = validar();
    setErro(msg);
    if (msg) return;
    setEnviando(true);
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErro("Não foi possível enviar agora. Use o botão do WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contato" className="py-28 px-6" style={{ background: "#0f0e0c" }}>
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>Contato</p>
          <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1 }}>
            Faça sua <em style={{ color: GOLD }}>reserva</em>
          </h2>
          <GoldDivider />
          <p className="text-white/45 mt-6 font-light max-w-md mx-auto">
            Preencha o formulário abaixo e entraremos em contato para confirmar disponibilidade e condições.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-16 border" style={{ borderColor: `${GOLD}30` }}>
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-display text-2xl text-white mb-2">Mensagem enviada!</h3>
            <p className="text-white/50 font-light">Entraremos em contato em breve via WhatsApp.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              {[
                { key: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                { key: "telefone", label: "WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
                { key: "data", label: "Data do evento", type: "date", placeholder: "" },
                { key: "evento", label: "Tipo de evento", type: "text", placeholder: "Ex: Aniversário, Casamento..." },
              ].map((f) => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium tracking-widest uppercase" style={{ color: GOLD }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    min={f.type === "date" ? hoje : undefined}
                    inputMode={f.key === "telefone" ? "tel" : undefined}
                    onChange={(e) => {
                      const v = f.key === "telefone" ? formatarTelefone(e.target.value) : e.target.value;
                      setForm((p) => ({ ...p, [f.key]: v }));
                    }}
                    className="bg-transparent border px-4 py-3 text-white text-[14px] outline-none transition-colors focus:border-[#c9a84c] placeholder:text-white/20"
                    style={{ borderColor: `${GOLD}30`, colorScheme: "dark" }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[11px] font-medium tracking-widest uppercase" style={{ color: GOLD }}>
                  Mensagem
                </label>
                <textarea
                  rows={6}
                  maxLength={500}
                  placeholder="Conte mais sobre o seu evento, número de convidados, necessidades especiais..."
                  value={form.mensagem}
                  onChange={(e) => setForm((p) => ({ ...p, mensagem: e.target.value }))}
                  className="bg-transparent border px-4 py-3 text-white text-[14px] outline-none transition-colors focus:border-[#c9a84c] placeholder:text-white/20 resize-none flex-1"
                  style={{ borderColor: `${GOLD}30` }}
                />
              </div>

              {erro && (
                <p role="alert" className="text-[13px] text-red-400">
                  {erro}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={enviarWhatsApp}
                  className="flex items-center justify-center gap-3 py-4 text-[12px] font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: GOLD, color: "#0a0a0a" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Enviar via WhatsApp
                </button>
                <p className="text-white/30 text-[12px] text-center font-light">
                  O WhatsApp abre com a mensagem pronta. É só apertar enviar.
                </p>

                {ENVIO_POR_EMAIL_ATIVO && (
                  <button
                    type="button"
                    onClick={enviarMensagem}
                    disabled={enviando}
                    className="py-4 text-[12px] font-semibold tracking-widest uppercase border transition-all duration-200 hover:bg-white/5 disabled:opacity-50"
                    style={{ borderColor: `${GOLD}40`, color: GOLD }}
                  >
                    {enviando ? "Enviando..." : "Só enviar mensagem"}
                  </button>


                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

  );
}
function Footer() {
  return (
    <footer className="py-12 px-6 border-t" style={{ background: "#0a0a0a", borderColor: `${GOLD}18` }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Espaço Andreluz" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-display text-base font-semibold" style={{ color: GOLD }}>ESPAÇO ANDRELUZ</p>
            <p className="text-[11px] tracking-widest uppercase text-white/30">Área de Lazer</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 text-[12px] tracking-widest uppercase text-white/30">
          {[
            { label: "O Espaço", href: "#espaco" },
            { label: "Comodidades", href: "#comodidades" },
            { label: "Galeria", href: "#galeria" },
            { label: "Contato", href: "#contato" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[#c9a84c] transition-colors">{l.label}</a>
          ))}
        </div>

        <p className="text-[11px] text-white/20 tracking-wide">© 2026 Espaço Andreluz</p>
      </div>
    </footer>
  );
}
function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Vi o site do Espaço Andreluz e gostaria de mais informações.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ background: GOLD, color: "#0a0a0a" }}
    >
      {<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>}
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      <Nav />
      <Hero />
      <About />
      <Amenities />
      <Gallery />
      <Location />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}