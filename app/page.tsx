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
  "/images/bird-view.jpg",
  "/images/gate-bird.jpg",
  "/images/pool-view.jpg",
  "/images/commercial.jpg",
]
const SHERATON_IMGS = [
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
  "https://framerusercontent.com/images/qxM5ygeRXtK5WBMNtrjYkFqUKE.jpg",
]

const t = {
  en: {
    navLinks: ["British District","Aljar Sheraton","About","Contact"],
    heroTag: "ALJAR Development • Since 1999",
    heroH1: ["Crafting", "Landmark", "Communities"],
    heroSub: "Two visionary addresses in Cairo — British standards in New Cairo and refined urban living in the heart of Heliopolis.",
    pills: ["New Cairo","Heliopolis","Hotel Finished","5% Down Payment"],
    stats: [{v:"1999",l:"Founded"},{v:"70",l:"JBD Acres"},{v:"2",l:"Projects"}],
    formTitle: "Request Information",
    formSub: "Our team will reach you within 24 hours",
    namePh: "Full Name *", phonePh: "Phone Number *",
    selectPh: "Select Project",
    opts: ["British District JBD — New Cairo","Aljar Sheraton — Heliopolis","Both Projects"],
    sendBtn: "Send Request",
    britishNum: "01 — NEW CAIRO • SUEZ ROAD",
    britishName: "Aljar British District",
    britishLoc: "NEW CAIRO — SUEZ ROAD — OPPOSITE OPEN AIR MALL",
    britishDesc: "Where Modern Egypt meets British Excellence. JBD spans 70 acres in New Cairo — Egypt's first real estate project tied to a British university. 67 residential buildings, only 20% built footprint, 80% greenery. Hotel-style finished units managed by Concorde El Salam. Designed by renowned architect Raef Fahmi with landscaping by ÖKOPLAN (Germany).",
    britishPrice: "EGP 4.1M", britishPayment: "5% DP / 7 Years",
    britishDetails: [
      {k:"Location",v:"New Cairo — Suez Road"},
      {k:"Total Area",v:"70 Acres — 67 Buildings"},
      {k:"Unit Size",v:"From 65 sqm — Fully Finished"},
      {k:"Building",v:"B+G+4 Floors+Roof"},
      {k:"Education",v:"Aston University (UK) — Medical"},
      {k:"Hotel Operator",v:"Concorde El Salam Hotels"},
      {k:"Architect",v:"Raef Fahmi Architects"},
      {k:"Payment",v:"5% Down — 7 Years Interest Free"},
    ],
    britishFeatures: ["Swimmable Lagoon","British University","Medical Hub (NHMC)","Clubhouse","80% Green","Hotel Managed","Underground Parking","Commercial Mall","Ökoplan Landscaping","Gated Community"],
    sheratonNum: "02 — HELIOPOLIS • SHERATON DISTRICT",
    sheratonName: "Aljar Sheraton",
    sheratonLoc: "SHERATON DISTRICT — HELIOPOLIS — EAST CAIRO",
    sheratonDesc: "A sanctuary of serenity in the heart of the Sheraton District. 160 luxury serviced units managed by Concorde El Salam Hotels — fully equipped with AC and modern kitchens. First phase fully delivered. 3 minutes from Cairo International Airport, directly behind City Centre Almaza.",
    sheratonPrice: "EGP 7.3M", sheratonPayment: "10–20% DP / 4–6 Years",
    sheratonDetails: [
      {k:"Location",v:"Sheraton District — Heliopolis"},
      {k:"Unit Types",v:"1 BR • 2 BR • 3 BR"},
      {k:"Hotel Operator",v:"Concorde El Salam Hotels"},
      {k:"Nearby",v:"3 Min — Cairo Airport"},
      {k:"Nearby",v:"Steps — City Centre Almaza"},
      {k:"Payment",v:"10–20% Down / 4–6 Years"},
      {k:"Starting Price",v:"EGP 7,300,000"},
    ],
    sheratonFeatures: ["Prime Heliopolis","Near Airport","City Centre Almaza","Concorde El Salam","Clubhouse","Swimming Pool","Landscaped Green","Underground Parking"],
    aboutTag: "About ALJAR",
    aboutH: ["Since 1999,","Building","Legacies"],
    aboutP: "Since 1999 (formerly Bunyan), ALJAR has stood for excellence across Cairo and Alexandria. We don't just develop properties — we create landmark destinations. JBD is Egypt's first real estate project tied to a British university, with a total investment of EGP 20 billion.",
    aboutStats: [{v:"1999",l:"Founded"},{v:"EGP 20B",l:"JBD Investment"},{v:"25+",l:"Years Experience"},{v:"2",l:"Active Projects"}],
    contactTag: "Get In Touch",
    contactH: ["We're Here","to Help"],
    projects: [{name:"Aljar British District (JBD)",loc:"New Cairo — Suez Road"},{name:"Aljar Sheraton",loc:"Sheraton District — Heliopolis"}],
    consultTitle: "Book a Consultation",
    consultSub: "Our team will reach you within 24 hours",
    footerCopy: "© 2026 ALJAR Development | Grandeur Spaces – Authorized Agent",
    callBtn: "📞 Call Now",
    waBtn: "💬 WhatsApp",
    wa: "I'm interested in ALJAR Development projects",
    waB: "I'm interested in Aljar British District (JBD)",
    waS: "I'm interested in Aljar Sheraton",
    enquireNow: "Enquire Now",
    gallery: "Gallery",
    registerTitle: "Register Your Details",
    registerSub: "Share your information today and our sales team will reach out shortly. 24 hours a day, 7 days a week.",
    getInTouch: "Get in touch for more information",
  },
  ar: {
    navLinks: ["بريتش ديستريكت","الجار شيراتون","عن الشركة","تواصل"],
    heroTag: "الجار للتطوير • منذ ١٩٩٩",
    heroH1: ["صياغة", "مجتمعات", "استثنائية"],
    heroSub: "عنوانان رائيان في القاهرة — المعايير البريطانية في القاهرة الجديدة والمعيشة الحضرية الراقية في قلب الهليوبوليس.",
    pills: ["القاهرة الجديدة","الهليوبوليس","تشطيب فندقي","٥٪ مقدم"],
    stats: [{v:"١٩٩٩",l:"التأسيس"},{v:"٧٠",l:"فدان JBD"},{v:"٢",l:"مشروع"}],
    formTitle: "طلب معلومات",
    formSub: "سيتواصل معك فريقنا خلال ٢٤ ساعة",
    namePh: "الاسم الكريم *", phonePh: "رقم الهاتف *",
    selectPh: "اختر المشروع",
    opts: ["بريتش ديستريكت — القاهرة الجديدة","الجار شيراتون — الهليوبوليس","كلا المشروعين"],
    sendBtn: "إرسال الطلب",
    britishNum: "٠١ — القاهرة الجديدة • طريق السويس",
    britishName: "الجار بريتش ديستريكت",
    britishLoc: "القاهرة الجديدة — طريق السويس — أمام أوبن إير مول",
    britishDesc: "حيث مصر الحديثة تلتقي بالتميز البريطاني. JBD على ٧٠ فدان في القاهرة الجديدة — أول مشروع عقاري مرتبط بجامعة بريطانية في مصر. ٦٧ مبنى سكني، ٢٠٪ فقط مساحة بناء، ٨٠٪ مساحات خضراء. وحدات كاملة التشطيب بأسلوب فندقي بإدارة كونكورد السلام.",
    britishPrice: "٤.١ مليون جنيه", britishPayment: "٥٪ مقدم / ٧ سنوات",
    britishDetails: [
      {k:"الموقع",v:"القاهرة الجديدة — طريق السويس"},
      {k:"المساحة الكلية",v:"٧٠ فداناً — ٦٧ مبنى"},
      {k:"المساحات",v:"من ٦٥ م² — تشطيب كامل"},
      {k:"الهيكل",v:"بدروم + أرضي + ٤ أدوار + روف"},
      {k:"التعليم",v:"جامعة أستون البريطانية — طب"},
      {k:"إدارة فندقية",v:"كونكورد السلام"},
      {k:"المصمم",v:"م. رائف فهمي"},
      {k:"السداد",v:"٥٪ مقدم — ٧ سنوات بدون فوائد"},
    ],
    britishFeatures: ["بحيرة للسباحة","جامعة بريطانية","مركز طبي NHMC","نادي رياضي","٨٠٪ مساحات خضراء","إدارة فندقية","جراج تحت الأرض","مول تجاري","تنسيق Ökoplan الألماني","كومباوند مغلق"],
    sheratonNum: "٠٢ — الهليوبوليس • حي الشيراتون",
    sheratonName: "الجار شيراتون",
    sheratonLoc: "حي الشيراتون — الهليوبوليس — شرق القاهرة",
    sheratonDesc: "ملاذ من الهدوء في قلب حي الشيراتون. ١٦٠ وحدة فاخرة بإدارة كونكورد السلام — تشطيب كامل مع تكييف ومطبخ. المرحلة الأولى سُلّمت بالكامل. ٣ دقائق من مطار القاهرة، مجاور مباشرة لسيتي سنتر ألماظة.",
    sheratonPrice: "٧.٣ مليون جنيه", sheratonPayment: "١٠–٢٠٪ مقدم / ٤–٦ سنوات",
    sheratonDetails: [
      {k:"الموقع",v:"حي الشيراتون — الهليوبوليس"},
      {k:"الوحدات",v:"١ غرفة • ٢ غرفة • ٣ غرف"},
      {k:"إدارة فندقية",v:"كونكورد السلام"},
      {k:"قريب من",v:"مطار القاهرة — ٣ دقائق"},
      {k:"قريب من",v:"سيتي سنتر ألماظة — خطوات"},
      {k:"السداد",v:"١٠–٢٠٪ مقدم / ٤–٦ سنوات"},
      {k:"السعر يبدأ من",v:"٧,٣٠٠,٠٠٠ جنيه"},
    ],
    sheratonFeatures: ["قلب الهليوبوليس","قريب من المطار","سيتي سنتر ألماظة","كونكورد السلام","نادي رياضي","حمام سباحة","مساحات خضراء","جراج تحت الأرض"],
    aboutTag: "عن الجار",
    aboutH: ["منذ ١٩٩٩،","نبني","الإرث"],
    aboutP: "منذ ١٩٩٩ (المعروفة سابقاً بـ بنيان)، قدمت الجار معياراً رفيعاً في التطوير العقاري بالقاهرة والإسكندرية. JBD هو أول مشروع عقاري في مصر مرتبط بجامعة بريطانية، باستثمار إجمالي يبلغ ٢٠ مليار جنيه.",
    aboutStats: [{v:"١٩٩٩",l:"التأسيس"},{v:"٢٠ مليار",l:"استثمار JBD"},{v:"+٢٥",l:"سنة خبرة"},{v:"٢",l:"مشروع نشط"}],
    contactTag: "تواصل معنا",
    contactH: ["نحن هنا","لمساعدتك"],
    projects: [{name:"الجار بريتش ديستريكت (JBD)",loc:"القاهرة الجديدة — طريق السويس"},{name:"الجار شيراتون",loc:"حي الشيراتون — الهليوبوليس"}],
    consultTitle: "احجز استشارة",
    consultSub: "سيتواصل معك فريقنا خلال ٢٤ ساعة",
    footerCopy: "© ٢٠٢٦ الجار للتطوير | Grandeur Spaces – وكيل معتمد",
    callBtn: "📞 اتصل الآن",
    waBtn: "💬 واتساب",
    wa: "مرحباً، أنا مهتم بمشروعات الجار للتطوير",
    waB: "مرحباً، أنا مهتم بمشروع الجار بريتش ديستريكت",
    waS: "مرحباً، أنا مهتم بمشروع الجار شيراتون",
    enquireNow: "استفسر الآن",
    gallery: "معرض الصور",
    registerTitle: "سجّل بياناتك",
    registerSub: "شارك معلوماتك وسيتواصل معك فريق المبيعات على الفور. ٢٤ ساعة يومياً.",
    getInTouch: "تواصل للمزيد من المعلومات",
  }
}

function LeadForm({ subject, lang, dark=false }: { subject: string; lang: "en"|"ar"; dark?: boolean }) {
  const [form, setForm] = useState({ name:"", phone:"", project:"" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const tx = t[lang]

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

  const inp = `w-full bg-transparent border-0 border-b py-3 text-sm outline-none transition-colors ${dark ? "border-white/20 text-white placeholder:text-white/30 focus:border-primary" : "border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary"}`

  return (
    <form onSubmit={submit} className="space-y-1">
      <input placeholder={tx.namePh} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className={inp} />
      <div className="h-2"/>
      <input type="tel" placeholder={tx.phonePh} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required className={inp} dir="ltr" />
      <div className="h-2"/>
      <select value={form.project} onChange={e=>setForm({...form,project:e.target.value})}
        className={`w-full bg-transparent border-0 border-b py-3 text-sm outline-none cursor-pointer ${dark ? "border-white/20 text-white/50" : "border-primary/20 text-muted-foreground"}`}>
        <option value="">{tx.selectPh}</option>
        {tx.opts.map((o,i)=><option key={i} value={o}>{o}</option>)}
      </select>
      <div className="h-4"/>
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-primary text-primary-foreground text-xs font-black tracking-widest uppercase hover:opacity-85 transition-opacity">
        {loading ? "..." : tx.sendBtn}
      </button>
    </form>
  )
}

function ContactBtns({ waMsg, lang }: { waMsg: string; lang: "en"|"ar" }) {
  const tx = t[lang]
  return (
    <div className="flex gap-3 mt-5">
      <a href={`${WA}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer"
        className="flex-1 py-3 bg-green-500 text-white text-xs font-black tracking-widest uppercase text-center hover:opacity-85 transition-opacity">
        {tx.waBtn}
      </a>
      <a href={`tel:${PHONE}`}
        className="flex-1 py-3 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase text-center hover:border-primary transition-colors">
        {tx.callBtn}
      </a>
    </div>
  )
}

function Slider({ imgs }: { imgs: string[] }) {
  const [idx, setIdx] = useState(0)
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%imgs.length),4000); return()=>clearInterval(t) },[imgs.length])
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 h-52">
      {imgs.map((src,i)=>(
        <div key={i} className="overflow-hidden">
          <img src={src} alt={`img ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      ))}
    </div>
  )
}

function ProjectSection({ id, num, name, loc, desc, price, payment, imgs, details, features, reversed=false, lang }:
  { id:string; num:string; name:string; loc:string; desc:string; price:string; payment:string; imgs:string[]; details:{k:string;v:string}[]; features:string[]; reversed?:boolean; lang:"en"|"ar" }) {
  const tx = t[lang]
  const isAr = lang === "ar"
  return (
    <section id={id} className="border-t border-primary/10">
      {/* Banner */}
      <div className="bg-card py-6 px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative overflow-hidden border-b border-primary/10" dir={isAr?"rtl":"ltr"}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[8rem] font-black tracking-widest whitespace-nowrap" style={{color:"rgba(184,150,90,0.05)"}}>{name}</span>
        </div>
        <div className="relative">
          <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{num}</p>
          <h2 className="text-2xl lg:text-3xl font-black tracking-wide">{name}</h2>
        </div>
        <div className={`flex gap-8 relative ${isAr?"":"text-right"}`}>
          {[{v:price,l:isAr?"السعر يبدأ من":"Starting Price"},{v:payment,l:isAr?"خطة السداد":"Payment Plan"}].map((s,i)=>(
            <div key={i} className={isAr?"text-right":"text-right"}>
              <div className="text-lg font-black text-primary">{s.v}</div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className={`grid lg:grid-cols-2 min-h-[75vh] ${reversed?"lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1":""}`}>
        <div className="relative overflow-hidden min-h-[55vw] lg:min-h-0">
          <img src={imgs[0]} alt={name} className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(13,10,7,.6) 0%, transparent 60%)"}} />
        </div>
        <div className="bg-card flex flex-col justify-center px-8 lg:px-14 py-14" dir={isAr?"rtl":"ltr"}>
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">ALJAR DEVELOPMENT</p>
          <h3 className="text-3xl font-black leading-tight mb-2">{name}</h3>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">{loc}</p>
          <div className="w-8 h-px bg-primary mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{desc}</p>
          <div className="mb-8 space-y-0">
            {details.map((d,i)=>(
              <div key={i} className="flex justify-between py-3 border-b border-primary/10">
                <span className="text-sm font-bold">{d.v}</span>
                <span className="text-xs text-muted-foreground">{d.k}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {features.map((f,i)=>(
              <span key={i} className="text-xs font-semibold px-3 py-1.5 border border-primary/20 text-primary" style={{background:"rgba(184,150,90,.06)"}}>{f}</span>
            ))}
          </div>
          <ContactBtns waMsg={id==="british"?tx.waB:tx.waS} lang={lang} />
        </div>
      </div>

      {/* Register + Gallery */}
      <div className="bg-background px-6 lg:px-12 py-12" dir={isAr?"rtl":"ltr"}>
        <div className="grid lg:grid-cols-2 gap-14 mb-10">
          <div>
            <h3 className="text-xl font-black mb-3">{tx.registerTitle}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tx.registerSub}</p>
            <p className="text-sm font-black mb-4">{tx.getInTouch}</p>
            <div className="flex gap-3">
              <a href={`${WA}?text=${encodeURIComponent(id==="british"?tx.waB:tx.waS)}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 flex items-center justify-center rounded hover:opacity-85 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={`tel:${PHONE}`} className="w-10 h-10 bg-primary flex items-center justify-center rounded hover:opacity-85 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            </div>
          </div>
          <LeadForm subject={`New Lead – ALJAR ${name}`} lang={lang} />
        </div>
        <Slider imgs={imgs} />
      </div>
    </section>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<"en"|"ar">("en")
  const isAr = lang === "ar"
  const tx = t[lang]

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>40)
    window.addEventListener("scroll",fn)
    return ()=>window.removeEventListener("scroll",fn)
  },[])
  const scroll = (id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})

  return (
    <div dir={isAr?"rtl":"ltr"}>
      <Toaster />

      {/* ANNOUNCEMENT BAR */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-primary text-primary-foreground py-2.5 px-4 text-center text-xs font-bold tracking-wide">
        {isAr
          ? "🔥 عرض لفترة محدودة — أسعار تبدأ من ٤ مليون جنيه فقط | اتصل الآن: 01111136040"
          : "🔥 Limited Time Offer — Prices Starting from 4M EGP Only | Call Now: 01111136040"}
      </div>

      {/* NAV */}
      <header className={`fixed top-8 inset-x-0 z-50 h-16 lg:h-20 flex items-center px-5 lg:px-10 justify-between transition-all ${scrolled?"bg-background/98 backdrop-blur-lg border-b border-primary/10 shadow-lg":"bg-transparent"}`}>
        <img src="/images/aljar-logo.svg" alt="ALJAR" className="h-8 lg:h-10 object-contain" />
        <nav className="hidden lg:flex gap-8">
          {tx.navLinks.map((l,i)=>(
            <button key={i} onClick={()=>scroll(["british","sheraton","about","contact"][i])}
              className={`text-xs font-semibold tracking-wide transition-colors ${scrolled?"text-muted-foreground hover:text-primary":"text-white/60 hover:text-white"}`}>{l}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={()=>setLang(l=>l==="en"?"ar":"en")}
            className={`border text-xs font-black px-4 py-1.5 transition-colors ${scrolled?"border-primary text-primary hover:bg-primary hover:text-primary-foreground":"border-white/30 text-white hover:bg-white/10"}`}>
            {isAr?"EN":"AR"}
          </button>
          <a href={`tel:${PHONE}`} className={`hidden sm:block text-sm font-black transition-colors ${scrolled?"text-foreground":"text-white"}`} dir="ltr">01111136040</a>
          <button onClick={()=>scroll("contact")} className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-black tracking-widest uppercase hover:opacity-85 transition-opacity">
            {tx.enquireNow}
          </button>
        </div>
      </header>

      {/* HERO — VIDEO */}
      <section className="relative min-h-screen flex items-end overflow-hidden" style={{paddingTop:'32px'}}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://framerusercontent.com/assets/i6dOUuwDp3W80LGE1s1AUdFUXQ8.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(13,10,7,.95) 0%, rgba(13,10,7,.5) 50%, rgba(13,10,7,.2) 100%)"}} />
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[10rem] font-black tracking-widest whitespace-nowrap" style={{color:"rgba(184,150,90,0.05)"}}>ALJAR</span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20 pt-28">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className={`flex items-center gap-3 mb-5 ${isAr?"flex-row-reverse justify-end":""}`}>
                <div className="w-6 h-px bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{tx.heroTag}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-none mb-4">
                {tx.heroH1[0]}<br/><span className="font-light text-white/50">{tx.heroH1[1]}</span><br/>{tx.heroH1[2]}
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">{tx.heroSub}</p>
              <div className={`flex flex-wrap gap-3 mb-10 ${isAr?"justify-end lg:justify-start":""}`}>
                {tx.pills.map((p,i)=>(
                  <span key={i} className="border border-primary/20 text-white/50 px-4 py-1.5 text-xs font-semibold tracking-wide">{p}</span>
                ))}
              </div>
              <div className={`grid grid-cols-3 gap-0 border-t border-white/10 pt-8 ${isAr?"text-right":""}`}>
                {tx.stats.map((s,i)=>(
                  <div key={i} className={i<2?"border-primary/10 pb-0 pr-6 mr-6":""} style={{borderRight: i<2 && !isAr?"1px solid rgba(184,150,90,.1)":"none", borderLeft: i<2 && isAr?"1px solid rgba(184,150,90,.1)":"none"}}>
                    <div className="text-3xl font-black text-primary">{s.v}</div>
                    <div className="text-xs text-white/30 mt-1 tracking-widest uppercase">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Form */}
            <div className="bg-card/80 backdrop-blur-md border border-primary/15 p-8">
              <h2 className="text-lg font-black mb-1">{tx.formTitle}</h2>
              <p className="text-muted-foreground text-xs mb-6">{tx.formSub}</p>
              <LeadForm subject="New Lead – ALJAR Development" lang={lang} dark={false} />
            </div>
          </div>
        </div>
      </section>

      {/* BRITISH */}
      <ProjectSection
        id="british" lang={lang}
        num={tx.britishNum} name={tx.britishName} loc={tx.britishLoc}
        desc={tx.britishDesc} price={tx.britishPrice} payment={tx.britishPayment}
        imgs={BRITISH_IMGS} details={tx.britishDetails} features={tx.britishFeatures}
      />

      {/* SHERATON */}
      <ProjectSection
        id="sheraton" lang={lang}
        num={tx.sheratonNum} name={tx.sheratonName} loc={tx.sheratonLoc}
        desc={tx.sheratonDesc} price={tx.sheratonPrice} payment={tx.sheratonPayment}
        imgs={SHERATON_IMGS} details={tx.sheratonDetails} features={tx.sheratonFeatures}
        reversed={!isAr}
      />

      {/* ABOUT */}
      <section id="about" className="py-24 bg-card border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center" dir={isAr?"rtl":"ltr"}>
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">{tx.aboutTag}</p>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
              {tx.aboutH[0]}<br/><span className="text-primary">{tx.aboutH[1]}</span><br/>{tx.aboutH[2]}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{tx.aboutP}</p>
            <div className="grid grid-cols-2 gap-px bg-primary/10">
              {tx.aboutStats.map((s,i)=>(
                <div key={i} className="bg-card p-6">
                  <div className="text-2xl font-black text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img src="/images/gate-bird.jpg" alt="ALJAR" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grid lg:grid-cols-2 min-h-[65vh]">
        <div className="bg-background px-8 lg:px-14 py-20 flex flex-col justify-center border-r border-primary/10" dir={isAr?"rtl":"ltr"}>
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-5">{tx.contactTag}</p>
          <h2 className="text-4xl font-black leading-tight mb-4">
            {tx.contactH[0]}<br/><span className="text-primary">{tx.contactH[1]}</span>
          </h2>
          <a href={`tel:${PHONE}`} className="text-2xl font-black hover:text-primary transition-colors block mb-8" dir="ltr">01111136040</a>
          <div className="space-y-0">
            {tx.projects.map((p,i)=>(
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
        <div className="bg-card px-8 lg:px-14 py-20 flex flex-col justify-center" dir={isAr?"rtl":"ltr"}>
          <h3 className="text-2xl font-black mb-2">{tx.consultTitle}</h3>
          <p className="text-muted-foreground text-sm mb-8">{tx.consultSub}</p>
          <LeadForm subject="New Lead – ALJAR Development (Contact)" lang={lang} />
        </div>
      </section>

      <footer className="bg-background border-t border-primary/10 py-6 pb-20 lg:pb-6 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-3">
        <img src="/images/aljar-logo.svg" alt="ALJAR" className="h-7 object-contain" />
        <span className="text-xs text-muted-foreground text-center">{tx.footerCopy}</span>
      </footer>

      {/* Floats */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:flex flex-col gap-3">
        <a href={`tel:${PHONE}`} className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-primary-foreground"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent(tx.wa)}`} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden grid grid-cols-2 shadow-lg">
        <a href={`tel:${PHONE}`} className="flex items-center justify-center py-4 bg-primary text-primary-foreground font-black text-xs tracking-widest uppercase">{tx.callBtn}</a>
        <a href={`${WA}?text=${encodeURIComponent(tx.wa)}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center py-4 bg-green-500 text-white font-black text-xs tracking-widest uppercase">{tx.waBtn}</a>
      </div>
    </div>
  )
}
