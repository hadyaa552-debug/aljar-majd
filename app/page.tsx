"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/toaster"

const PHONE = "+201111136040"
const WA = "https://wa.me/201111136040"
const EMAIL = "apkzoz85@gmail.com"
const CC = "Ahmed.a.rahim23@gmail.com"

const BRITISH_IMGS = [
  "https://framerusercontent.com/images/Wg30qwvwd8d8jk9WpWCfrDwbw.jpg",
  "https://framerusercontent.com/images/Wg30qwvwd8d8jk9WpWCfrDwbw.jpg",
  "https://framerusercontent.com/images/Wg30qwvwd8d8jk9WpWCfrDwbw.jpg",
]
const SHERATON_IMGS = [
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
]

function LeadForm({ subject, btnText="Send Request" }: { subject: string; btnText?: string }) {
  const [form, setForm] = useState({ name:"", phone:"", project:"" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: subject, _captcha: "false", _template: "table", _cc: CC }),
      })
      if (res.ok) router.push("/thank-you")
      else throw new Error()
    } catch { toast({ title: "Error", variant: "destructive" }); setLoading(false) }
  }

  const inp = "w-full bg-transparent border-0 border-b border-primary/20 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"

  return (
    <form onSubmit={submit} className="space-y-1">
      <input placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className={inp} />
      <div className="h-2"/>
      <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required className={inp} dir="ltr" />
      <div className="h-2"/>
      <select value={form.project} onChange={e=>setForm({...form,project:e.target.value})}
        className="w-full bg-transparent border-0 border-b border-primary/20 py-3 text-sm text-muted-foreground outline-none cursor-pointer">
        <option value="">Select Project</option>
        <option value="british">Aljar British District — New Cairo</option>
        <option value="sheraton">Aljar Sheraton — Heliopolis</option>
        <option value="both">Both Projects</option>
      </select>
      <div className="h-4"/>
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-primary text-primary-foreground text-xs font-black tracking-widest uppercase hover:opacity-85 transition-opacity">
        {loading ? "Sending..." : btnText}
      </button>
    </form>
  )
}

function WaBtns({ msg }: { msg: string }) {
  return (
    <div className="flex gap-3 mt-5">
      <a href={`${WA}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
        className="flex-1 py-3 bg-green-500 text-white text-xs font-black tracking-widest uppercase text-center hover:opacity-85 transition-opacity">
        💬 WhatsApp
      </a>
      <a href={`tel:${PHONE}`}
        className="flex-1 py-3 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase text-center hover:border-primary transition-colors">
        📞 Call Now
      </a>
    </div>
  )
}

function ProjectSection({ id, num, name, location, desc, price, payment, imgs, details, features, reversed=false }:
  { id:string; num:string; name:string; location:string; desc:string; price:string; payment:string; imgs:string[]; details:{k:string;v:string}[]; features:string[]; reversed?:boolean }) {
  return (
    <section id={id} className="border-t border-primary/10">
      {/* Banner */}
      <div className="bg-secondary py-6 px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[8rem] font-black tracking-widest whitespace-nowrap" style={{color:"rgba(184,150,90,0.04)"}}>{name.toUpperCase()}</span>
        </div>
        <div className="relative">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{num}</p>
          <h2 className="text-2xl lg:text-3xl font-black tracking-wide">{name}</h2>
        </div>
        <div className="flex gap-8 relative">
          {[{v:price,l:"Starting Price"},{v:payment,l:"Payment Plan"}].map((s,i)=>(
            <div key={i} className="text-right">
              <div className="text-lg font-black text-primary">{s.v}</div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`grid lg:grid-cols-2 min-h-[80vh] ${reversed ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
        {/* Image */}
        <div className="relative overflow-hidden min-h-[55vw] lg:min-h-0">
          <img src={imgs[0]} alt={name} className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(13,10,7,.7) 0%, transparent 50%)"}} />
          <div className="absolute bottom-8 left-8 text-primary text-6xl font-black italic opacity-20 leading-none">{num.split(" — ")[0]}</div>
        </div>

        {/* Content */}
        <div className="bg-secondary flex flex-col justify-center px-8 lg:px-14 py-14">
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">ALJAR DEVELOPMENT</p>
          <h3 className="text-3xl font-black leading-tight mb-2">{name}</h3>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">{location}</p>
          <div className="w-8 h-px bg-primary mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{desc}</p>

          {/* Details */}
          <div className="mb-8 space-y-0">
            {details.map((d,i)=>(
              <div key={i} className="flex justify-between py-3 border-b border-primary/10">
                <span className="text-sm font-bold">{d.v}</span>
                <span className="text-xs text-muted-foreground">{d.k}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-8">
            {features.map((f,i)=>(
              <span key={i} className="text-xs font-semibold px-3 py-1.5 border border-primary/20 text-primary" style={{background:"rgba(184,150,90,.06)"}}>{f}</span>
            ))}
          </div>

          <WaBtns msg={`I'm interested in ${name} by ALJAR Development. Please send details.`} />
        </div>
      </div>

      {/* Gallery Strip */}
      <div className="grid grid-cols-3 h-48 gap-0.5">
        {imgs.map((src,i)=>(
          <div key={i} className="overflow-hidden">
            <img src={src} alt={`${name} ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              style={{objectPosition: i===0?"center":i===1?"30% center":"70% center"}} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>40)
    window.addEventListener("scroll",fn)
    return ()=>window.removeEventListener("scroll",fn)
  },[])
  const scroll = (id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})

  return (
    <>
      <Toaster />

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 h-16 lg:h-20 flex items-center px-6 lg:px-12 justify-between transition-all ${scrolled?"bg-background/98 backdrop-blur-lg border-b border-primary/10 shadow-lg":"bg-transparent"}`}>
        <div>
          <div className="text-base font-black tracking-widest uppercase">ALJAR</div>
          <div className="text-xs text-primary tracking-widest uppercase" style={{fontSize:".5rem",letterSpacing:"3px"}}>DEVELOPMENT • SINCE 1999</div>
        </div>
        <nav className="hidden lg:flex gap-10">
          {[["British District","british"],["Aljar Sheraton","sheraton"],["About","about"],["Contact","contact"]].map(([l,id])=>(
            <button key={id} onClick={()=>scroll(id)} className="text-xs font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors">{l}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE}`} className="hidden sm:block text-sm font-black" dir="ltr">01111136040</a>
          <button onClick={()=>scroll("contact")} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-black tracking-widest uppercase hover:opacity-85 transition-opacity">
            Enquire Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://framerusercontent.com/images/Wg30qwvwd8d8jk9WpWCfrDwbw.jpg" alt="ALJAR" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(13,10,7,.95) 0%, rgba(13,10,7,.6) 50%, rgba(13,10,7,.25) 100%)"}} />
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[12rem] font-black tracking-widest whitespace-nowrap" style={{color:"rgba(184,150,90,0.05)"}}>ALJAR</span>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20 pt-28">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase">ALJAR Development • Since 1999</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-none mb-4">
                Crafting<br/><span className="font-light text-muted-foreground">Landmark</span><br/>Communities
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                Two visionary addresses in Cairo — British standards in New Cairo and refined urban living in the heart of Heliopolis.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["New Cairo","Heliopolis","Hotel Finished","5% Down"].map((t,i)=>(
                  <span key={i} className="border border-primary/20 text-muted-foreground px-4 py-1.5 text-xs font-semibold tracking-wide">{t}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-0 border-t border-primary/10 pt-8">
                {[{v:"1999",l:"Founded"},{v:"70",l:"JBD Acres"},{v:"2",l:"Projects"}].map((s,i)=>(
                  <div key={i} className={`${i<2?"border-r border-primary/10 pr-6 mr-6":""}`}>
                    <div className="text-3xl font-black text-primary">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero Form */}
            <div className="bg-card/80 backdrop-blur-md border border-primary/15 p-8">
              <h2 className="text-lg font-black mb-1">Request Information</h2>
              <p className="text-muted-foreground text-xs mb-6">Our team will reach you within 24 hours</p>
              <LeadForm subject="New Lead – ALJAR Development" />
            </div>
          </div>
        </div>
      </section>

      {/* BRITISH DISTRICT */}
      <ProjectSection
        id="british" num="01 — NEW CAIRO • SUEZ ROAD"
        name="Aljar British District"
        location="NEW CAIRO — SUEZ ROAD — OPPOSITE OPEN AIR MALL"
        desc="Welcome to JBD, where British standards meet Egyptian soul. Spanning 70 acres in New Cairo, AlJar British District integrates wellness, education, and community into one purposeful address. In partnership with Aston University — the region's first British medical university — it offers hotel-finished residences, 80% green landscapes, and future-ready infrastructure. Built with intent, designed for legacy."
        price="EGP 4.1M"
        payment="5% DP / 7 Years"
        imgs={BRITISH_IMGS}
        details={[
          {k:"Location",v:"New Cairo — Suez Road"},
          {k:"Total Area",v:"70 Acres"},
          {k:"Unit Types",v:"Residential • Commercial • Hotel"},
          {k:"Education",v:"Aston University (UK) — Medical"},
          {k:"Hotel Operator",v:"Concorde Hotels & Resorts"},
          {k:"Payment Plan",v:"5% Down — 7 Years Interest Free"},
          {k:"Starting Price",v:"EGP 4,100,000"},
        ]}
        features={["Swimmable Lagoons","Aston University","Medical Hub","Clubhouse","80% Green","Hotel Managed","Smart Building","Open Air Mall"]}
      />

      {/* ALJAR SHERATON */}
      <ProjectSection
        id="sheraton" num="02 — HELIOPOLIS • SHERATON DISTRICT"
        name="Aljar Sheraton"
        location="SHERATON DISTRICT — HELIOPOLIS — EAST CAIRO"
        desc="Aljar Sheraton is a sanctuary of serenity and security positioned at the heart of the Sheraton District in Heliopolis. 160 luxury serviced units managed by Concorde El Salam Hotels — fully equipped with AC and modern kitchens. First phase fully delivered. Minutes from Cairo International Airport, directly behind City Centre Almaza."
        price="EGP 7.3M"
        payment="10–20% DP / 4–6 Years"
        imgs={SHERATON_IMGS}
        details={[
          {k:"Location",v:"Sheraton District — Heliopolis"},
          {k:"Unit Types",v:"1 BR • 2 BR • 3 BR Apartments"},
          {k:"Hotel Operator",v:"Concorde El Salam Hotels"},
          {k:"Nearby",v:"3 Min — Cairo International Airport"},
          {k:"Nearby",v:"Steps — City Centre Almaza"},
          {k:"Payment Plan",v:"10–20% Down / 4–6 Years"},
          {k:"Starting Price",v:"EGP 7,300,000"},
        ]}
        features={["Prime Heliopolis","Near Airport","City Centre Almaza","Concorde El Salam","Clubhouse","Swimming Pool","Landscaped Green","Underground Parking"]}
        reversed={true}
      />

      {/* ABOUT */}
      <section id="about" className="py-24 bg-secondary border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">About ALJAR</p>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
              Since 1999,<br/><span className="text-primary">Building</span> Legacies
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Since 1999, AlJAR (formerly Bunyan) has stood for excellence in real estate. We don't just develop properties — we create visionary, lifestyle-centered destinations across Egypt. With a portfolio spanning Cairo and Alexandria, AlJAR is synonymous with distinction, architectural integrity, and long-term value.
            </p>
            <div className="grid grid-cols-2 gap-px bg-primary/10">
              {[{v:"1999",l:"Founded"},{v:"25+",l:"Years Experience"},{v:"EGP 20B",l:"JBD Investment"},{v:"2",l:"Active Projects"}].map((s,i)=>(
                <div key={i} className="bg-secondary p-6">
                  <div className="text-2xl font-black text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://framerusercontent.com/images/Wg30qwvwd8d8jk9WpWCfrDwbw.jpg" alt="ALJAR" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grid lg:grid-cols-2 min-h-[70vh]">
        <div className="bg-background px-8 lg:px-14 py-20 flex flex-col justify-center border-r border-primary/10">
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-5">Get In Touch</p>
          <h2 className="text-4xl font-black leading-tight mb-4">We're Here<br/>to <span className="text-primary">Help</span></h2>
          <a href={`tel:${PHONE}`} className="text-2xl font-black hover:text-primary transition-colors block mb-8" dir="ltr">01111136040</a>
          <div className="space-y-0">
            {[
              {name:"Aljar British District",loc:"New Cairo — Suez Road"},
              {name:"Aljar Sheraton",loc:"Sheraton District — Heliopolis"},
            ].map((p,i)=>(
              <div key={i} className="flex justify-between py-4 border-b border-primary/10">
                <div>
                  <div className="font-black text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.loc}</div>
                </div>
                <div className="w-1.5 h-1.5 bg-primary self-center" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary px-8 lg:px-14 py-20 flex flex-col justify-center">
          <h3 className="text-2xl font-black mb-2">Book a Consultation</h3>
          <p className="text-muted-foreground text-sm mb-8">Our team will reach you within 24 hours</p>
          <LeadForm subject="New Lead – ALJAR Development (Contact)" btnText="Send Request" />
        </div>
      </section>

      <footer className="bg-background border-t border-primary/10 py-6 pb-20 lg:pb-6 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-black tracking-widest uppercase text-primary">ALJAR</span>
          <span className="text-xs text-muted-foreground ml-2">Development • Since 1999</span>
        </div>
        <span className="text-xs text-muted-foreground">© 2026 ALJAR Development | Grandeur Spaces – Authorized Agent</span>
      </footer>

      {/* Floats */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:flex flex-col gap-3">
        <a href={`tel:${PHONE}`} className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary-foreground"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent("I'm interested in ALJAR Development projects")}`} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden grid grid-cols-2 shadow-lg">
        <a href={`tel:${PHONE}`} className="flex items-center justify-center py-4 bg-primary text-primary-foreground font-black text-xs tracking-widest uppercase">📞 Call Now</a>
        <a href={`${WA}?text=${encodeURIComponent("I'm interested in ALJAR Development")}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center py-4 bg-green-500 text-white font-black text-xs tracking-widest uppercase">💬 WhatsApp</a>
      </div>
    </>
  )
}
