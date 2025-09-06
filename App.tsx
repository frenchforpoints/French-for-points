
import React, { useMemo, useState } from "react";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Home,
  FileText,
  Send,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  Globe2,
  MapPin,
  ChevronRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

/**
 * Single-file app wired for deployment (no shadcn install needed — using minimal UI components)
 */

const PAGES = [
  { key: "home", label: "Home", icon: Home },
  { key: "programs", label: "Programs", icon: BookOpen },
  { key: "placement", label: "Placement Test", icon: Brain },
  { key: "resources", label: "Resources", icon: FileText },
  { key: "book", label: "Book", icon: Calendar },
] as const;

type PageKey = (typeof PAGES)[number]["key"] | "inquiry";
type InquiryData = { subject: string; body: string };

const BRAND = {
  primaryFrom: "from-indigo-700",
  primaryTo: "to-fuchsia-600",
  primaryText: "text-white",
  darkBtn: "bg-indigo-600 hover:bg-indigo-700 text-white",
  lightBtn: "bg-white text-indigo-900 hover:bg-white/90",
  chip: "bg-white/10 hover:bg-white/20 text-white",
};

const CONFIG = {
  gs: {
    webAppUrl: "https://script.google.com/macros/s/AKfycbwkftlsDysti8lVMucMUCLRtKn-D_L_Io0oOoLfTBFlva-eNqMf4rdOsJZWmTicDpcbRA/exec",
  },
  formspree: { freeBookFormId: "" },
  adminEmail: "frenchforpoints@gmail.com",
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any) {
    console.error("UI ErrorBoundary caught:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl my-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <div className="font-semibold">Something went wrong while loading the UI.</div>
          <p className="text-sm mt-2">
            Try refreshing. If it persists, disable tests and verify dependencies (icons, components).
          </p>
          <div className="text-xs mt-3">{String(this.state.error)}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [inquiryPrefill, setInquiryPrefill] = useState<InquiryData | null>(null);

  const goInquiry = (subject: string, body: string) => {
    setInquiryPrefill({ subject, body });
    setPage("inquiry");
  };

  return (
    <ErrorBoundary>
      <MotionConfig transition={{ type: "spring", stiffness: 160, damping: 18 }}>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
          <SiteHeader page={page} onNavigate={setPage} />
          <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:pt-10">
            <AnimatePresence mode="wait">
              {page === "home" && (
                <PageWrapper key="home">
                  <Hero onNavigate={setPage} />
                </PageWrapper>
              )}
              {page === "programs" && (
                <PageWrapper key="programs">
                  <Programs onInquiry={goInquiry} />
                </PageWrapper>
              )}
              {page === "placement" && (
                <PageWrapper key="placement">
                  <PlacementTest onInquiry={goInquiry} />
                </PageWrapper>
              )}
              {page === "resources" && (
                <PageWrapper key="resources">
                  <Resources />
                </PageWrapper>
              )}
              {page === "book" && (
                <PageWrapper key="book">
                  <Book />
                </PageWrapper>
              )}
              {page === "inquiry" && (
                <PageWrapper key="inquiry">
                  <Inquiry prefill={inquiryPrefill} onBack={() => setPage("programs")} />
                </PageWrapper>
              )}
            </AnimatePresence>
          </main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
      {children}
    </motion.div>
  );
}

function SiteHeader({ page, onNavigate }: { page: PageKey; onNavigate: (k: PageKey) => void }) {
  const navValue = (PAGES as readonly any[]).some((p) => p.key === page) ? (page as any) : "home";
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-700 text-white grid place-items-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-slate-900">French for Points</div>
              <div className="text-xs text-slate-500">TEF · TCF · TEFAQ — A0 → B2</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {PAGES.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                className={`rounded-2xl ${page === key ? BRAND.darkBtn : "text-slate-700"}`}
                onClick={() => onNavigate(key)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </nav>
          <div className="md:hidden">
            <select className="rounded-xl border-slate-300 text-sm p-2" value={navValue} onChange={(e) => onNavigate(e.target.value as PageKey)}>
              {PAGES.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold">French for Points</div>
          <p className="text-sm text-slate-600 mt-2">Personalized French lessons and TEF/TCF/TEFAQ prep. Target: NCLC 7–8.</p>
        </div>
        <div className="text-sm text-slate-600 space-y-2">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> frenchforpoints@gmail.com</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 647-806-5638</div>
          <div className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> www.frenchforpoints.com</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Toronto, Canada</div>
        </div>
        <div className="text-sm text-slate-600">© {new Date().getFullYear()} French for Points. All rights reserved.</div>
      </div>
    </footer>
  );
}

function Hero({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  return (
    <section>
      <div className={`rounded-3xl bg-gradient-to-br ${BRAND.primaryFrom} ${BRAND.primaryTo} ${BRAND.primaryText} p-8 md:p-12 shadow-xl`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <Badge className={`${BRAND.chip} rounded-2xl`}>New · Fall Session</Badge>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
              Get your <span className="underline decoration-emerald-300 decoration-4 underline-offset-4">TEF points</span> faster.
            </h1>
            <p className="mt-4 text-white/90 md:text-lg max-w-2xl">
              Focused lessons, real exam simulations, and precise tracking to aim for NCLC 7–8. Ideal for Canadian immigration.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className={`rounded-2xl ${BRAND.lightBtn}`} onClick={() => onNavigate("book")}>Book a call</Button>
              <Button className={`rounded-2xl ${BRAND.darkBtn}`} onClick={() => onNavigate("placement")}>Take the placement test</Button>
            </div>
            <ul className="mt-6 grid gap-3 md:grid-cols-3 text-sm text-white/90">
              {["Free diagnostic", "Personalized plan", "Progress tracking"].map((t, i) => (
                <li className="flex items-center gap-2" key={i}>
                  <CheckCircle2 className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <HeroCard onNavigate={onNavigate} />
          </div>
        </div>
      </div>
      <ValueProps />
      <CTA onNavigate={onNavigate} />
    </section>
  );
}

function HeroCard({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  return (
    <Card className="rounded-3xl shadow-2xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />What you’ll get</CardTitle>
        <CardDescription>Clear, measurable, motivating coaching.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {[
          { title: "Pathway A0 → B2", desc: "Progressive syllabus with weekly missions and spaced reviews." },
          { title: "TEF/TCF coaching", desc: "Strategies, timing, NCLC criteria, real simulations." },
          { title: "Detailed feedback", desc: "Targeted corrections (grammar, lexis, cohesion, pragmatics)." },
        ].map((it, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="mt-1"><ChevronRight className="h-5 w-5 text-slate-400" /></div>
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-slate-600">{it.desc}</div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className={`${BRAND.darkBtn} rounded-2xl w-full`} onClick={() => onNavigate("programs")}>Start now</Button>
      </CardFooter>
    </Card>
  );
}

function ValueProps() {
  const items = [
    { icon: GraduationCap, title: "TEF experts", desc: "Hands-on experience with official exams and NCLC criteria." },
    { icon: BookOpen, title: "Clear plan", desc: "Weekly goals, monthly reviews, and precise milestones." },
    { icon: Brain, title: "Active method", desc: "Role-plays, authentic tasks, instant feedback." },
  ];
  return (
    <div className="mt-10 grid md:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, title, desc }, i) => (
        <Card key={i} className="rounded-3xl hover:shadow-lg">
          <CardHeader className="space-y-2">
            <div className="h-11 w-11 grid place-items-center rounded-2xl bg-indigo-700 text-white"><Icon className="h-5 w-5" /></div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function CTA({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  return (
    <div className="mt-10 rounded-3xl border border-indigo-200 p-6 md:p-8 grid md:grid-cols-2 gap-6 bg-indigo-50">
      <div>
        <h3 className="text-xl font-semibold">Aiming for NCLC 7–8?</h3>
        <p className="text-slate-700 mt-2">Take the quick test to estimate your level and get an action plan.</p>
      </div>
      <div className="md:text-right">
        <Button className={`${BRAND.darkBtn} rounded-2xl`} onClick={() => onNavigate("placement")}>Take the test</Button>
      </div>
    </div>
  );
}

function Programs({ onInquiry }: { onInquiry: (subject: string, body: string) => void }) {
  const offers = [
    {
      name: "General – start from A0 (complete beginner)",
      price: "$200 / month",
      bullets: [
        "3 classes per week",
        "Occasional weekend conversation classes",
        "Solid foundations: pronunciation, everyday dialogues, visual vocab",
      ],
      badge: "Beginner",
    },
    {
      name: "TEF/TCF preparation (writing + speaking)",
      price: "$250 / month",
      bullets: [
        "Writing help/evaluation, guidance & materials",
        "Live speaking topics practice",
        "Advice to clear with NCLC 7 (or 5 depending on track)",
        "3 classes per week",
      ],
      badge: "Exam Prep",
    },
    {
      name: "Intensive classes",
      price: "$300 / month",
      bullets: [
        "Intensive schedule",
        "5 days a week",
        "Fast progress with structured reviews",
      ],
      badge: "Intensive",
    },
  ];

  function go(track: string) {
    const subject = `[Program Interest] ${track}`;
    const body = `Hey Hetvi, I am interested in this course (${track}) and would like to discuss further.
\n\nHere are a few details to help us get started:
\n• Current level (estimate):
\n• Goal (e.g., TEF/TCF, conversation, work/study):
\n• Target date:
\n• Weekly availability (days/times):
\n• Questions for you:
\n\nLooking forward to your guidance!
`;
    onInquiry(subject, body);
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Our programs</h2>
      <p className="text-slate-600 mt-2">Choose the path that fits your goals and pace.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {offers.map((o, i) => (
          <Card key={i} className="rounded-3xl hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{o.name}</CardTitle>
                <Badge className="rounded-2xl">{o.badge}</Badge>
              </div>
              <CardDescription>{o.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {o.bullets.map((p, idx) => (
                  <li className="flex gap-2" key={idx}><CheckCircle2 className="h-4 w-4 mt-0.5" /> {p}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`${BRAND.darkBtn} rounded-2xl w-full`} onClick={() => go(o.name)}>Select</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-sm text-slate-700 bg-amber-50 border border-amber-200 p-4 rounded-2xl">
        <strong>Note:</strong> Usually finishing each level takes about <strong>2.5 months</strong>, but it ultimately depends on the student.
      </div>
    </section>
  );
}

const QUESTIONS = [
  { q: "Choose the correct article: ____ maison est grande.", options: ["Le", "La", "Les"], a: 1 },
  { q: "Choose the correct article: ____ ami est gentil.", options: ["Le", "La", "L'"] , a: 2 },
  { q: "Choose the correct article: ____ enfants jouent.", options: ["Le", "La", "Les"], a: 2 },
  { q: "Passé composé: Hier, nous ____ au cinéma.", options: ["allons", "sommes allés", "allions"], a: 1 },
  { q: "Imparfait vs. passé composé: Quand j'étais petit, je ____ tous les jours.", options: ["ai joué", "jouais", "jouerai"], a: 1 },
  { q: "Futur proche: Ce soir, ils ____ réviser.", options: ["vont", "aller", "ira"], a: 0 },
  { q: "Find a synonym of 'rapide':", options: ["lent", "vite", "lourd"], a: 1 },
  { q: "Opposite of 'cher':", options: ["coûteux", "bon marché", "rare"], a: 1 },
  { q: "Choose the correct preposition: Je vais ____ Canada.", options: ["au", "en", "à"], a: 0 },
  { q: "Choose the correct preposition: Elle habite ____ Paris.", options: ["à", "au", "en"], a: 0 },
  { q: "Replace the object: Je vois Marie → Je ____ vois.", options: ["la", "lui", "leur"], a: 0 },
  { q: "Choose the correct pronoun: Il parle à Paul → Il ____ parle.", options: ["le", "lui", "leur"], a: 1 },
  { q: "Concordance: Si j'avais le temps, je ____ (voyager).", options: ["voyage", "voyagerai", "voyagerais"], a: 2 },
  { q: "Agreement: Elle est très ____ (heureux).", options: ["heureux", "heureuse", "heureuses"], a: 1 },
  { q: "Meaning: 'il pleut des cordes' means…", options: ["it's windy", "it's raining heavily", "it's sunny"], a: 1 },
] as const;

type Answer = number | null;

function niveauFromScore(score: number) {
  const total = QUESTIONS.length;
  const pct = (score / total) * 100;
  if (pct <= 20) return { label: "A1", conseil: "Revois les bases : articles, présent, vocabulaire quotidien." };
  if (pct <= 40) return { label: "A2", conseil: "Consolide le passé composé et les prépositions fréquentes." };
  if (pct <= 60) return { label: "B1", conseil: "Travaille la paraphrase et les temps du récit." };
  if (pct <= 80) return { label: "B2", conseil: "Affûte la précision lexicale et les structures conditionnelles." };
  return { label: "C1 (estimation)", conseil: "Passe à des tâches longues: synthèses, débats chronométrés." };
}

function mapToNCLC(level: string) {
  switch (level) {
    case "A1": return "NCLC 1";
    case "A2": return "NCLC 2–3";
    case "B1": return "NCLC 4–5";
    case "B2": return "NCLC 6–7";
    default: return "NCLC 8+ (estimation)";
  }
}

const DISPLAY_LABEL: Record<string, string> = {
  A1: "A1", A2: "A2", B1: "B1", B2: "B2", "C1 (estimation)": "C1 (estimate)",
};
const DISPLAY_ADVICE: Record<string, string> = {
  A1: "Review the basics: articles, present tense, daily vocab.",
  A2: "Consolidate passé composé and common prepositions.",
  B1: "Work on paraphrasing and narrative tenses.",
  B2: "Sharpen lexical precision and conditional structures.",
  "C1 (estimation)": "Tackle longer tasks: syntheses, timed debates.",
};

function PlacementTest({ onInquiry }: { onInquiry: (subject: string, body: string) => void }) {
  const [answers, setAnswers] = useState<Answer[]>(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => answers.reduce((acc, a, i) => acc + (a === QUESTIONS[i].a ? 1 : 0), 0), [answers]);
  const niveau = useMemo(() => niveauFromScore(score), [score]);
  const nclc = useMemo(() => mapToNCLC(niveau.label), [niveau]);
  const displayLabel = DISPLAY_LABEL[niveau.label] || niveau.label;
  const displayAdvice = DISPLAY_ADVICE[niveau.label] || "";

  const subject = `[Placement] My level result: ${displayLabel} (${nclc})`;
  const body = `Hey Hetvi, my placement test level is ${displayLabel} (${nclc}). I’m interested in your classes and would like to discuss the best plan.
\n\nDetails:
\n• Goal (immigration/school/career):
\n• Target exam/date:
\n• Weekly availability:
\n• Preferred start date:
\n• Questions:
\n\nThank you!`;

  return (
    <section>
      <h2 className="text-2xl font-bold flex items-center gap-2"><Brain className="h-6 w-6" /> Placement test (≈10–12 min)</h2>
      <p className="text-slate-700 mt-2">15 questions → CEFR estimate + NCLC correspondence. Receive an action plan based on your answers.</p>

      <div className="mt-6 grid gap-4">
        {QUESTIONS.map((item, idx) => (
          <Card key={idx} className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-base">Q{idx + 1}. {item.q}</CardTitle>
              <CardDescription>Select one answer.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {item.options.map((opt, optIdx) => (
                <label key={optIdx} className={`flex items-center gap-2 rounded-2xl border p-3 cursor-pointer ${answers[idx] === optIdx ? "border-indigo-700" : "border-slate-200"}`}>
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    className="accent-indigo-700"
                    checked={answers[idx] === optIdx}
                    onChange={() => {
                      const next = [...answers];
                      next[idx] = optIdx;
                      setAnswers(next);
                    }}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button className={`${BRAND.darkBtn} rounded-2xl`} onClick={() => setSubmitted(true)}>Show my level</Button>
        <Button className="rounded-2xl border" onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false); }}>Reset</Button>
      </div>

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-white">
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Score: {score}/{QUESTIONS.length} · Level: {displayLabel} · {nclc.replace("(estimation)", "(estimate)")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">Advice: {displayAdvice}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button className={`${BRAND.darkBtn} rounded-2xl`} onClick={() => onInquiry(subject, body)}>Book / Email with my level</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </section>
  );
}

// ---- Free book send helper with robust CORS fallbacks ----
async function sendFreeBookToGS(url: string, payload: { name: string; email: string; type: string }) {
  const json = JSON.stringify(payload);

  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: json });
    try {
      const data = await res.clone().json().catch(() => null);
      if (data && (data.ok === undefined || data.ok === true)) return { ok: true as const, mode: "cors-json" as const };
      const txt = await res.text().catch(() => ""); if (txt) return { ok: true as const, mode: "cors-text" as const };
    } catch {}
  } catch {}

  try {
    await fetch(url, { method: "POST", mode: "no-cors", body: json });
    return { ok: true as const, mode: "no-cors" as const };
  } catch (e) {
    return { ok: false as const, error: String(e) };
  }
}

function Resources() {
  const [freeName, setFreeName] = useState("");
  const [freeEmail, setFreeEmail] = useState("");
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [busy, setBusy] = useState(false);

  async function sendFreeBook(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setStatus(null);

    const name = freeName.trim();
    const email = freeEmail.trim();
    if (!name || !email) { setStatus({ ok: false, msg: "Please enter your name and email." }); return; }

    if (CONFIG.gs.webAppUrl) {
      try {
        setBusy(true)  # <-- will fix to true below
      except Exception:
        pass

        const result = await sendFreeBookToGS(CONFIG.gs.webAppUrl, { name, email, type: "free-book" });
        if (result.ok) {
          setStatus({ ok: true, msg: "Thanks! Check your inbox for the book link." });
          setFreeName("");
          setFreeEmail("");
        } else {
          setStatus({ ok: false, msg: "Could not reach the server. Please try again or email us directly." });
        }
      } catch (err) {
        console.error(err);
        setStatus({ ok: false, msg: "Network error. Please try again." });
      } finally {
        setBusy(false);
      }
      return;
    }

    const subject = encodeURIComponent("Free book request");
    const body = encodeURIComponent(`Hi Hetvi,\n\nPlease send the free book.\nName: ${name}\nEmail: ${email}\n\nThank you!`);
    const href = `mailto:${CONFIG.adminEmail}?subject=${subject}&body=${body}`;
    const a = document.createElement("a");
    a.href = href; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove();
    setStatus({ ok: true, msg: "Your email app should open. If not, use the email link in the footer." });
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Your first French lesson — start your journey here</h2>
      <p className="text-slate-700 mt-2">Read the lesson below (no downloads). When you're ready, book a call or take the placement test.</p>

      <Card className="mt-6 rounded-3xl">
        <CardHeader>
          <CardTitle>Lesson 1: Basics you’ll use from day one</CardTitle>
          <CardDescription>Greetings · Articles & gender · Essential verbs · Simple sentences · Mini practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-800">
          <div>
            <h4 className="font-semibold">1) Greetings</h4>
            <ul className="list-disc pl-6">
              <li>Bonjour — hello / good day</li>
              <li>Salut — hi</li>
              <li>Bonsoir — good evening</li>
              <li>Au revoir — goodbye</li>
              <li>Comment ça va ? — how are you? · Ça va bien / comme ci comme ça / ça ne va pas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">2) Articles & gender</h4>
            <p>Definite: <strong>le</strong> (m.), <strong>la</strong> (f.), <strong>l’</strong> (before vowel/h), <strong>les</strong> (pl.). Indefinite: <strong>un</strong>, <strong>une</strong>, <strong>des</strong>.</p>
            <p>Patterns: <em>-age, -ment, -eau</em> often masculine; <em>-tion, -sion, -té</em> often feminine.</p>
          </div>
          <div>
            <h4 className="font-semibold">3) Essential verbs (present)</h4>
            <ul className="list-disc pl-6">
              <li><strong>être</strong> (to be): je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont</li>
              <li><strong>avoir</strong> (to have): j’ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont</li>
              <li><strong>aller</strong> (to go): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">4) Build simple sentences</h4>
            <p>Pattern: <em>Subject + verb + complement</em> · Example: <strong>Je suis étudiant.</strong> / <strong>Elle a un livre.</strong> / <strong>Nous allons au parc.</strong></p>
          </div>
          <div>
            <h4 className="font-semibold">5) Mini practice</h4>
            <ul className="list-disc pl-6">
              <li>Choose the article: ____ école (→ l’), ____ voiture (→ la), ____ hôpital (→ l’).</li>
              <li>Translate: "I am a student" → <em>Je suis étudiant(e).</em></li>
              <li>Make a sentence with <em>aller</em>: <em>Je vais …</em></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-3xl">
        <CardHeader>
          <CardTitle>Get a free book</CardTitle>
          <CardDescription>Enter your name and email. We'll send the book automatically.</CardDescription>
        </CardHeader>
        <form onSubmit={sendFreeBook}>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">Full name</label>
              <Input placeholder="e.g. Hetvi Patel" value={freeName} onChange={(e) => setFreeName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <Input type="email" placeholder="you@email.com" value={freeEmail} onChange={(e) => setFreeEmail(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Button type="submit" disabled={busy} className={`${BRAND.darkBtn} rounded-2xl`}>{busy ? "Sending…" : "Get my free book"}</Button>
            {status && (<span className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-700"}`}>{status.msg}</span>)}
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

function Inquiry({ prefill, onBack }: { prefill: InquiryData | null; onBack: () => void }) {
  const calendly = "https://calendly.com/frenchforpoints/30min";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(prefill?.body || "");

  const subject = encodeURIComponent(prefill?.subject || "Program / Placement inquiry");

  function sendEmail() {
    const finalBody = (message || prefill?.body || "")
      .replace(/\{\{name\}\}/g, name || "<your name>")
      .replace(/\{\{email\}\}/g, email || "<your email>");
    const body = encodeURIComponent(finalBody);
    const href = `mailto:frenchforpoints@gmail.com?subject=${subject}&body=${body}`;
    const a = document.createElement("a"); a.href = href; a.style.display = "none"; document.body.appendChild(a); a.click(); a.remove();
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Send your interest & book a call</h2>
      <p className="text-slate-700 mt-2">Fill your details, send the email to me, then optionally book a 30‑minute call.</p>

      <Card className="mt-4 rounded-3xl">
        <CardHeader>
          <CardTitle>Message preview</CardTitle>
          <CardDescription>We prefilled the message. You can edit before sending.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="text-sm">Full name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Message</label>
            <Textarea rows={8} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button className={`${BRAND.darkBtn} rounded-2xl`} onClick={sendEmail}><Send className="h-4 w-4 mr-2" /> Send email</Button>
          <a href={calendly} target="_blank" rel="noreferrer"><Button className={`rounded-2xl ${BRAND.lightBtn}`}>Book 30‑min on Calendly</Button></a>
          <Button className="rounded-2xl" onClick={onBack}>Back</Button>
        </CardFooter>
      </Card>
    </section>
  );
}

function Book() {
  const calendly = "https://calendly.com/frenchforpoints/30min";
  return (
    <section>
      <h2 className="text-2xl font-bold">Book a call</h2>
      <div className="text-slate-700 mt-2 space-y-2">
        <p>In this session, we will discuss your learning goals, explore my teaching method and style, and determine the best approach for you to succeed with French for Points.</p>
        <p>Please come prepared with any questions you have about your French journey—whether it's about the program, my teaching style, or anything else you’re curious about. This session is all about understanding your needs and setting you up for success.</p>
        <p>I look forward to connecting with you and guiding you towards achieving your French goals!</p>
      </div>

      <Card className="mt-6 rounded-3xl border-indigo-200">
        <CardHeader>
          <CardTitle>Book your 30‑minute session</CardTitle>
          <CardDescription>Opens Calendly in a new tab.</CardDescription>
        </CardHeader>
        <CardFooter>
          <a href={calendly} target="_blank" rel="noreferrer"><Button className={`${BRAND.darkBtn} rounded-2xl`}>Book</Button></a>
        </CardFooter>
      </Card>
    </section>
  );
}

export function runTests() {
  type T = { name: string; pass: boolean; details?: string };
  const cases: T[] = [];
  const iconExports = { Home, BookOpen, GraduationCap, FileText, Send, CheckCircle2, Calendar, Mail, Phone, Globe2, MapPin, ChevronRight, Brain, Sparkles } as const;
  Object.entries(iconExports).forEach(([k, v]) => { cases.push({ name: `Icon export \`${k}\` is a function`, pass: typeof v === "function", details: typeof v }); });
  cases.push({ name: "PAGES length", pass: (PAGES as readonly any[]).length === 5, details: String((PAGES as readonly any[]).length) });
  return cases;
}

function DevTests() {
  const results = runTests();
  const passed = results.filter((r) => r.pass).length;
  return (
    <section className="mt-10">
      <Card className="rounded-3xl border-2">
        <CardHeader>
          <CardTitle>Dev Tests</CardTitle>
          <CardDescription>Append `?tests=1` to the URL to toggle.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-3">Results: {passed}/{results.length} passing</div>
          <ul className="text-sm grid gap-1">
            {results.map((r, i) => (
              <li key={i} className={`rounded-xl px-3 py-2 border ${r.pass ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                <span className="font-medium">{r.pass ? "PASS" : "FAIL"}</span> — {r.name}
                {r.details && <span className="text-slate-500"> · {r.details}</span>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
