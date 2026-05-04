import { useState, useEffect, useCallback } from "react";

/* ═══════════ COURSE DATA ═══════════ */
const PLAN = [
  {w:1,p:1,d:[{n:1,t:"Your Insurance Skills ARE Sales Skills",tp:"Insurance vs B2B mapping, SaaS model"},{n:2,t:"How SaaS Companies Work",tp:"MRR, ARR, churn, pricing models"},{n:3,t:"The B2B Sales Organization",tp:"SDR/BDR/AE/CSM roles"},{n:4,t:"ICP & Buyer Personas",tp:"Ideal Customer Profile, firmographics"},{n:5,t:"SaaS Products Deep Dive",tp:"Product categories, demo walkthroughs"}]},
  {w:2,p:1,d:[{n:6,t:"Business Communication for Tech Sales",tp:"Email writing, AIDA framework"},{n:7,t:"Cold Email Foundations",tp:"PAS, BAB, QVC frameworks"},{n:8,t:"LinkedIn for B2B",tp:"Profile optimization, SSI score"},{n:9,t:"Phone Skills Transfer — Cold Calling",tp:"Pattern interrupt, permission-based"},{n:10,t:"Objection Handling",tp:"SaaS objections, reframing, LAER"}]},
  {w:3,p:1,d:[{n:11,t:"Market Research & Competitive Intel",tp:"TAM/SAM/SOM, Porter's, SWOT"},{n:12,t:"The SDR Daily Workflow",tp:"Activity metrics, time blocking"},{n:13,t:"Sales Metrics That Matter",tp:"Open rates, reply rates, pipeline math"},{n:14,t:"Qualification — BANT & MEDDIC",tp:"Budget, Authority, Need, Timeline"},{n:15,t:"Discovery Calls",tp:"SPIN selling, active listening"}]},
  {w:4,p:1,d:[{n:16,t:"Week 1-3 Revision + Practice",tp:"Review, fill gaps, Q&A"},{n:17,t:"Assessment #1 — Foundation Check",tp:"Quiz + role-play + ICP exercise"},{n:18,t:"Phase 1 Capstone",tp:"GTM Launch Document"},{n:19,t:"Capstone Review & Feedback",tp:"Peer review, mentor feedback"},{n:20,t:"Phase 1 Wrap-Up",tp:"Confidence check, Phase 2 prep"}]},
  {w:5,p:2,d:[{n:21,t:"CRM Fundamentals — HubSpot",tp:"Contacts, companies, deals, pipelines"},{n:22,t:"CRM — Salesforce Trailhead",tp:"Leads, opportunities, reports"},{n:23,t:"Data Hygiene & Lead Management",tp:"Deduplication, lead scoring"},{n:24,t:"Email Sequencing — Apollo.io",tp:"Multi-step sequences, A/B testing"},{n:25,t:"Email Sequencing — Instantly & Lemlist",tp:"Deliverability, SPF/DKIM"}]},
  {w:6,p:2,d:[{n:26,t:"Prospecting — Sales Navigator",tp:"Filters, Boolean search"},{n:27,t:"Prospecting — ZoomInfo, Lusha, Hunter",tp:"Email finding, enrichment"},{n:28,t:"Clay — AI Data Enrichment",tp:"Workflows, enrichment chains"},{n:29,t:"AI for Sales — ChatGPT",tp:"Prompt engineering for sales"},{n:30,t:"AI for Sales — Claude & Gemini",tp:"Comparing AI tools, prompt libs"}]},
  {w:7,p:2,d:[{n:31,t:"AI Research — Perplexity",tp:"Company research, competitor intel"},{n:32,t:"AI Content — LinkedIn & Battle Cards",tp:"AI content, personal brand"},{n:33,t:"Automation — Zapier",tp:"Triggers, actions, multi-step zaps"},{n:34,t:"Automation — Make & HubSpot",tp:"Complex automations, logic"},{n:35,t:"Calendly & Meeting Booking",tp:"Scheduling, CRM sync"}]},
  {w:8,p:2,d:[{n:36,t:"Outreach & Salesloft",tp:"Platform overview, sequences"},{n:37,t:"Week 5-7 Revision",tp:"Hands-on practice"},{n:38,t:"Assessment #2 — Tool Proficiency",tp:"CRM + sequence + automation"},{n:39,t:"Phase 2 Capstone",tp:"SDR Tech Stack Demo"},{n:40,t:"Phase 2 Wrap-Up",tp:"Feedback, Phase 3 prep"}]},
  {w:9,p:3,d:[{n:41,t:"Cold Email Mastery — Advanced",tp:"20 email variations"},{n:42,t:"Cold Calling Mastery",tp:"Role-play 20+ calls"},{n:43,t:"LinkedIn Social Selling at Scale",tp:"Voice notes, video messages"},{n:44,t:"Multi-Channel Campaign Design",tp:"14-day blueprints"},{n:45,t:"Inbound Lead Qualification",tp:"Lead scoring, MQL vs SQL"}]},
  {w:10,p:3,d:[{n:46,t:"ABM Fundamentals",tp:"Tiers, buying committee"},{n:47,t:"Building Target Account Lists",tp:"Selection, data sources"},{n:48,t:"Sales Analytics & Reporting",tp:"Dashboards, funnel math"},{n:49,t:"Campaign — List Building (Live)",tp:"200+ prospect list"},{n:50,t:"Campaign — Sequence Launch",tp:"Multi-channel outreach"}]},
  {w:11,p:3,d:[{n:51,t:"Campaign — Monitor & Optimize",tp:"Adjust messaging, A/B test"},{n:52,t:"Campaign — Results Analysis",tp:"ROI, compile results"},{n:53,t:"Revision + Practice",tp:"Peer coaching"},{n:54,t:"Assessment #3 — SDR Simulation",tp:"Full SDR day simulation"},{n:55,t:"Phase 3 Capstone",tp:"Campaign results presentation"}]},
  {w:12,p:3,d:[{n:56,t:"Capstone Review",tp:"Panel feedback"},{n:57,t:"Buffer — Strengthen Weak Areas",tp:"Personalized"},{n:58,t:"Buffer — Weakest Skill Drill",tp:"Targeted practice"},{n:59,t:"Buffer — Peer Teaching",tp:"Teach a concept"},{n:60,t:"Mid-Program Check",tp:"1-on-1 mentoring"}]},
  {w:13,p:4,d:[{n:61,t:"GTM Strategy Frameworks",tp:"PLG, SLG, Bowling Pin"},{n:62,t:"Revenue Operations",tp:"RevOps, full-funnel"},{n:63,t:"Sales Enablement",tp:"Battle cards, ROI calculators"},{n:64,t:"Negotiation Masterclass",tp:"BATNA, Chris Voss"},{n:65,t:"Advanced Objection Handling",tp:"Complex chains, trial closes"}]},
  {w:14,p:4,d:[{n:66,t:"LinkedIn Authority",tp:"Content plan, thought leadership"},{n:67,t:"Resume Building",tp:"SDR-optimized, ATS"},{n:68,t:"Portfolio Creation",tp:"Projects, campaign results"},{n:69,t:"Mock Interview #1 — Behavioral",tp:"STAR method"},{n:70,t:"Mock Interview #2 — Technical",tp:"Cold call test, demo"}]},
  {w:15,p:4,d:[{n:71,t:"Mock Interview #3 — Panel",tp:"Full panel simulation"},{n:72,t:"Job Search Strategy",tp:"Target companies"},{n:73,t:"Application Blitz Day 1",tp:"Apply to 15+ jobs"},{n:74,t:"Application Blitz Day 2",tp:"15+ more, outreach"},{n:75,t:"Final Revision & Prep",tp:"Complete review"}]},
  {w:16,p:4,d:[{n:76,t:"Final Written Exam",tp:"Comprehensive exam"},{n:77,t:"Final Capstone Presentation",tp:"Full portfolio"},{n:78,t:"Certification",tp:"GTM Engineer Certificate"},{n:79,t:"Career Counseling",tp:"Placement handoff"},{n:80,t:"Graduation Day",tp:"Alumni access, support"}]},
  {w:17,p:4,d:[{n:81,t:"Placement Support Week 1",tp:"Follow-ups, prep"},{n:82,t:"Mock Interview Refresher",tp:"Additional mocks"},{n:83,t:"Portfolio Refinement",tp:"Update based on feedback"},{n:84,t:"Network Building",tp:"LinkedIn outreach"},{n:85,t:"Placement Support Week 2",tp:"Active job search"}]},
  {w:18,p:4,d:[{n:86,t:"Advanced Interview Prep",tp:"Company-specific"},{n:87,t:"Salary Negotiation Workshop",tp:"Techniques, market rates"},{n:88,t:"Offer Evaluation",tp:"Comparing offers"},{n:89,t:"Final Check-In",tp:"Progress review"},{n:90,t:"Program Complete",tp:"Graduation, alumni support"}]},
];

const PC = {1:{bg:"#EFF6FF",a:"#2563EB",l:"Foundation",dk:"#1E40AF"},2:{bg:"#F5F3FF",a:"#7C3AED",l:"Tools & AI",dk:"#5B21B6"},3:{bg:"#ECFDF5",a:"#10B981",l:"Lead Gen & SDR",dk:"#065F46"},4:{bg:"#FFFBEB",a:"#F59E0B",l:"Advanced & Job Ready",dk:"#92400E"}};
const ST = {not_started:{l:"Not Started",c:"#94A3B8",bg:"#F1F5F9",i:"○"},completed:{l:"Completed",c:"#10B981",bg:"#D1FAE5",i:"✓"},in_progress:{l:"In Progress",c:"#F59E0B",bg:"#FEF3C7",i:"◐"},delayed:{l:"Delayed",c:"#EF4444",bg:"#FEE2E2",i:"⏱"},paused:{l:"Paused",c:"#8B5CF6",bg:"#EDE9FE",i:"⏸"},skipped:{l:"Skipped",c:"#6B7280",bg:"#E5E7EB",i:"⏭"}};

const fmtD = d => { if(!d) return "—"; return new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})};
const addD = (s,n) => { const d=new Date(s); d.setDate(d.getDate()+n); return d.toISOString().split("T")[0]};
const schD = (s,day) => s.startDate ? addD(s.startDate, day-1+(s.totalPausedDays||0)) : null;
const mkStudent = () => ({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:"",phone:"",email:"",city:"",background:"",startDate:new Date().toISOString().split("T")[0],notes:"",status:"active",pausedAt:null,totalPausedDays:0,pauseHistory:[],dayProgress:{},files:{},accessCode:Math.random().toString(36).slice(2,8).toUpperCase()});

const SUPABASE_URL = "https://phwhgmgoptszrtttjdft.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBod2hnbWdvcHRzenJ0dHRqZGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMzI4MTMsImV4cCI6MjA4OTYwODgxM30.fUFfrFiijP1WUXcmmO80E3q2ZBoRsor2jDMmEzjkpuI";

const sbFetch = async (path, opts = {}) => {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...opts,
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        ...(opts.headers || {}),
      },
    });
    const text = await res.text();
    if (!res.ok) { console.error("Supabase error:", res.status, text); return null; }
    return text ? JSON.parse(text) : [];
  } catch (e) { console.error("Supabase fetch error:", e); return null; }
};

const dbLoadAll = async () => {
  const rows = await sbFetch("students?select=id,data");
  if (!rows || !Array.isArray(rows)) return [];
  return rows.map(r => ({ ...r.data, id: r.id }));
};

const dbSaveStudent = async (s) => {
  // Use Supabase UPSERT (POST with on_conflict resolution)
  const result = await sbFetch("students", {
    method: "POST",
    headers: {
      "Prefer": "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: s.id, data: s, updated_at: new Date().toISOString() }),
  });
  if (result === null) console.error("Failed to save student:", s.id);
  return result;
};

const dbDeleteStudent = async (id) => {
  await sbFetch(`students?id=eq.${id}`, {
    method: "DELETE",
    headers: { "Prefer": "return=minimal" },
  });
};

/* ═══════════ SHARED STYLES ═══════════ */
const css = {
  wrap: {minHeight:"100vh",fontFamily:"'DM Sans','Segoe UI',sans-serif"},
  dark: {background:"#0B1120",color:"#F1F5F9"},
  light: {background:"#F8FAFC",color:"#1E293B"},
  mx: {maxWidth:960,margin:"0 auto",padding:"24px 16px"},
  card: (dark) => ({background:dark?"#111827":"#fff",borderRadius:12,border:`1px solid ${dark?"#1E293B":"#E2E8F0"}`,padding:20,marginBottom:12}),
  btn: (bg,c,border) => ({padding:"8px 18px",background:bg,color:c,border:border||"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .15s"}),
  input: (dark) => ({width:"100%",padding:"10px 12px",background:dark?"#0B1120":"#F1F5F9",border:`1px solid ${dark?"#334155":"#CBD5E1"}`,borderRadius:6,color:dark?"#F1F5F9":"#1E293B",fontSize:13,outline:"none",boxSizing:"border-box"}),
  tag: (bg,c) => ({display:"inline-block",padding:"3px 10px",background:bg,color:c,borderRadius:20,fontSize:11,fontWeight:600}),
};

export default function App() {
  const [role, setRole] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [view, setView] = useState("list");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(mkStudent());
  const [expWeek, setExpWeek] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loginForm, setLoginForm] = useState({name:"",phone:""});
  const [loginError, setLoginError] = useState("");
  const [trainerPw, setTrainerPw] = useState("");
  const [trainerError, setTrainerError] = useState("");
  const [trainerLogin, setTrainerLogin] = useState(false);
  const [tab, setTab] = useState("roadmap");
  const [ciLearning, setCiLearning] = useState("");
  const [ciMood, setCiMood] = useState("");
  const [ciStatus, setCiStatus] = useState("");
  const [dbStatus, setDbStatus] = useState("connecting"); // connecting, connected, error

  // Load from Supabase on mount
  useEffect(() => {
    (async () => {
      try {
        const d = await dbLoadAll();
        if (d !== null) { setStudents(d); setDbStatus("connected"); }
        else { setDbStatus("error"); }
      } catch (e) { console.error("Load error:", e); setDbStatus("error"); }
      setLoaded(true);
    })();
  }, []);

  // Sync helper — saves a single student to Supabase
  const syncStudent = useCallback(async (s) => {
    setSaving(true);
    const result = await dbSaveStudent(s);
    setSaving(false);
    if (result === null) setDbStatus("error"); else setDbStatus("connected");
  }, []);

  const student = students.find(s=>s.id===activeId);
  const getStats = s => { const c=Object.values(s.dayProgress||{}).filter(d=>d.status==="completed").length; const ip=Object.values(s.dayProgress||{}).filter(d=>d.status==="in_progress").length; const dl=Object.values(s.dayProgress||{}).filter(d=>d.status==="delayed").length; const sc=Object.values(s.dayProgress||{}).filter(d=>d.score>0); const avg=sc.length?(sc.reduce((a,b)=>a+b.score,0)/sc.length).toFixed(1):"—"; return{completed:c,inProgress:ip,delayed:dl,pct:Math.round(c/90*100),avg}; };

  const updateDay = (dayNum, key, val) => {
    setStudents(p => {
      const updated = p.map(s => { if(s.id!==activeId) return s; const dp={...s.dayProgress}; dp[dayNum]={...(dp[dayNum]||{}), [key]:val, updatedAt:new Date().toISOString()}; return{...s,dayProgress:dp}; });
      const s = updated.find(s=>s.id===activeId); if(s) syncStudent(s);
      return updated;
    });
  };

  const togglePause = () => {
    setStudents(p => {
      const updated = p.map(s => { if(s.id!==activeId) return s; if(s.status==="paused"){const pd=Math.ceil((Date.now()-new Date(s.pausedAt).getTime())/864e5); return{...s,status:"active",pausedAt:null,totalPausedDays:(s.totalPausedDays||0)+pd,pauseHistory:[...(s.pauseHistory||[]),{from:s.pausedAt,to:new Date().toISOString().split("T")[0],days:pd}]};} return{...s,status:"paused",pausedAt:new Date().toISOString().split("T")[0]}; });
      const s = updated.find(s=>s.id===activeId); if(s) syncStudent(s);
      return updated;
    });
    setConfirm(null);
  };

  const addDelay = d => {
    setStudents(p => {
      const updated = p.map(s => { if(s.id!==activeId) return s; return{...s,totalPausedDays:(s.totalPausedDays||0)+d,pauseHistory:[...(s.pauseHistory||[]),{type:"delay",days:d,addedAt:new Date().toISOString().split("T")[0]}]}; });
      const s = updated.find(s=>s.id===activeId); if(s) syncStudent(s);
      return updated;
    });
    setConfirm(null);
  };

  const saveStudent = () => {
    if(!form.name.trim()) return;
    setStudents(p => {
      const i = p.findIndex(s=>s.id===form.id);
      let updated; if(i>=0){updated=[...p]; updated[i]=form;} else {updated=[...p,form];}
      syncStudent(form);
      return updated;
    });
    setActiveId(form.id); setView("profile"); setEditMode(false);
  };

  const deleteStudent = (id) => {
    setStudents(p => p.filter(s=>s.id!==id));
    dbDeleteStudent(id);
    setView("list"); setActiveId(null); setConfirm(null);
  };

  const handleFileUpload = (dayNum, category, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setStudents(p => {
        const updated = p.map(s => {
          if (s.id !== activeId) return s;
          const files = { ...(s.files || {}) };
          if (!files[dayNum]) files[dayNum] = { exams: [], materials: [] };
          if (Array.isArray(files[dayNum])) files[dayNum] = { exams: [], materials: files[dayNum] };
          files[dayNum][category] = [...(files[dayNum][category] || []), { name: file.name, type: file.type, data: ev.target.result, uploadedAt: new Date().toISOString() }];
          return { ...s, files };
        });
        const s = updated.find(s=>s.id===activeId); if(s) syncStudent(s);
        return updated;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeFile = (dayNum, category, fileIdx) => {
    setStudents(p => {
      const updated = p.map(s => {
        if (s.id !== activeId) return s;
        const files = { ...(s.files || {}) };
        if (!files[dayNum]) return s;
        if (Array.isArray(files[dayNum])) files[dayNum] = { exams: [], materials: files[dayNum] };
        files[dayNum][category] = files[dayNum][category].filter((_, i) => i !== fileIdx);
        if (!files[dayNum].exams.length && !files[dayNum].materials.length) delete files[dayNum];
        return { ...s, files };
      });
      const s = updated.find(s=>s.id===activeId); if(s) syncStudent(s);
      return updated;
    });
  };

  const getDayFiles = (dayNum) => {
    const raw = student?.files?.[dayNum];
    if (!raw) return { exams: [], materials: [] };
    if (Array.isArray(raw)) return { exams: [], materials: raw };
    return { exams: raw.exams || [], materials: raw.materials || [] };
  };

  /* ═══════════ LOGIN SCREEN ═══════════ */
  if (!role) return (
    <div style={{...css.wrap,...css.dark,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
      <div style={{width:"100%",maxWidth:420,padding:"0 16px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:"#06B6D4",letterSpacing:4,marginBottom:8}}>STARTUP COACH</div>
          <h1 style={{margin:0,fontSize:28,fontWeight:800,background:"linear-gradient(135deg,#2563EB,#06B6D4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Learning Portal</h1>
          <p style={{color:"#64748B",fontSize:13,marginTop:6}}>90-Day GTM Engineer Program</p>
        </div>

        <div style={{display:"grid",gap:12}}>
          <div style={{...css.card(true),padding:24,border:trainerLogin?"1px solid #2563EB":"1px solid #1E293B"}}>
            <div onClick={()=>setTrainerLogin(!trainerLogin)} style={{cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:8}}>🎯</div>
              <div style={{color:"#F1F5F9",fontSize:16,fontWeight:700}}>Trainer Panel</div>
              <div style={{color:"#64748B",fontSize:12,marginTop:4}}>Manage students, upload files, track progress</div>
            </div>
            {trainerLogin && (
              <div style={{marginTop:16,display:"grid",gap:10}}>
                <input type="password" placeholder="Enter trainer password" value={trainerPw} onChange={e=>{setTrainerPw(e.target.value);setTrainerError("");}}
                  onKeyDown={e=>{if(e.key==="Enter"){if(trainerPw==="Trainer100"){setRole("trainer");setView("list");setTrainerError("");}else setTrainerError("Wrong password. Try again.");}}}
                  style={css.input(true)}/>
                {trainerError && <div style={{color:"#EF4444",fontSize:12,textAlign:"center"}}>{trainerError}</div>}
                <button onClick={()=>{if(trainerPw==="Trainer100"){setRole("trainer");setView("list");setTrainerError("");}else setTrainerError("Wrong password. Try again.");}}
                  style={{...css.btn("linear-gradient(135deg,#2563EB,#06B6D4)","#fff"),width:"100%",padding:"12px"}}>Login as Trainer</button>
              </div>
            )}
          </div>

          <div style={{...css.card(true),padding:24}}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:32,marginBottom:8}}>🎓</div>
              <div style={{color:"#F1F5F9",fontSize:16,fontWeight:700}}>Student Portal</div>
              <div style={{color:"#64748B",fontSize:12,marginTop:4}}>View your roadmap, files & scores</div>
            </div>
            <div style={{display:"grid",gap:10}}>
              <input placeholder="Your Full Name" value={loginForm.name} onChange={e=>setLoginForm(p=>({...p,name:e.target.value}))} style={css.input(true)}/>
              <input placeholder="Phone Number" value={loginForm.phone} onChange={e=>setLoginForm(p=>({...p,phone:e.target.value}))} style={css.input(true)}/>
              {loginError && <div style={{color:"#EF4444",fontSize:12,textAlign:"center"}}>{loginError}</div>}
              <button onClick={()=>{
                const s = students.find(s=>s.name.toLowerCase().trim()===loginForm.name.toLowerCase().trim() && s.phone.replace(/\s/g,"")===loginForm.phone.replace(/\s/g,""));
                if(s){setRole("student");setActiveId(s.id);setView("profile");setLoginError("");}
                else setLoginError("No matching student found. Check your name and phone number.");
              }} style={{...css.btn("linear-gradient(135deg,#2563EB,#06B6D4)","#fff"),width:"100%",padding:"12px"}}>Login as Student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const isDark = role === "trainer";
  const theme = isDark ? css.dark : css.light;
  const stats = student ? getStats(student) : null;

  /* ═══════════ TRAINER: STUDENT LIST ═══════════ */
  if (role === "trainer" && view === "list") return (
    <div style={{...css.wrap,...theme}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
      <div style={css.mx}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:11,color:"#06B6D4",letterSpacing:3}}>STARTUP COACH — TRAINER PANEL</div>
            <h1 style={{margin:"4px 0 0",fontSize:24,fontWeight:700}}>Student Dashboard</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {dbStatus==="error" && <span style={{fontSize:11,color:"#EF4444",fontWeight:600}}>⚠ DB Error</span>}
            {saving && <span style={{fontSize:11,color:"#F59E0B",fontWeight:600}}>⟳ Saving...</span>}
            {!saving && dbStatus==="connected" && <span style={{fontSize:11,color:"#10B981"}}>● Synced</span>}
            {dbStatus==="connecting" && <span style={{fontSize:11,color:"#94A3B8"}}>○ Connecting...</span>}
            <button onClick={()=>{setForm(mkStudent());setEditMode(true);setView("profile");}} style={css.btn("linear-gradient(135deg,#2563EB,#06B6D4)","#fff")}>+ New Student</button>
            <button onClick={()=>{setRole(null);setActiveId(null);}} style={css.btn("#1E293B","#94A3B8","1px solid #334155")}>Logout</button>
          </div>
        </div>

        {students.length===0 ? (
          <div style={{...css.card(true),textAlign:"center",padding:60}}>
            <div style={{fontSize:48,marginBottom:12}}>🎓</div>
            <p style={{color:"#94A3B8",fontSize:15}}>No students yet. Click "+ New Student" to begin.</p>
          </div>
        ) : (
          <div style={{display:"grid",gap:10}}>
            {students.map(s=>{const st=getStats(s); return(
              <div key={s.id} onClick={()=>{setActiveId(s.id);setView("profile");setEditMode(false);setTab("roadmap");}}
                style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",padding:"14px 18px",background:"#111827",borderRadius:10,border:"1px solid #1E293B",cursor:"pointer",transition:"all .2s"}}
                onMouseOver={e=>e.currentTarget.style.borderColor="#2563EB"} onMouseOut={e=>e.currentTarget.style.borderColor="#1E293B"}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                    <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#06B6D4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>{s.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <span style={{color:"#F1F5F9",fontWeight:600,fontSize:14}}>{s.name}</span>
                      {s.status==="paused"&&<span style={{...css.tag("#EDE9FE","#7C3AED"),marginLeft:8,fontSize:9}}>PAUSED</span>}
                      <div style={{color:"#64748B",fontSize:11}}>{s.background||"—"} • {s.city||"—"} • Started {fmtD(s.startDate)}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:14,fontSize:11,color:"#94A3B8",marginTop:6,paddingLeft:44}}>
                    <span><b style={{color:"#10B981"}}>{st.completed}</b>/90</span>
                    <span><b style={{color:"#F59E0B"}}>{st.inProgress}</b> active</span>
                    <span><b style={{color:"#EF4444"}}>{st.delayed}</b> delayed</span>
                    <span>Score: <b style={{color:"#06B6D4"}}>{st.avg}</b></span>
                    <span style={{color:"#475569"}}>Login: {s.name} / {s.phone}</span>
                  </div>
                </div>
                <div style={{width:50,height:50,borderRadius:"50%",background:`conic-gradient(#2563EB ${st.pct*3.6}deg,#1E293B ${st.pct*3.6}deg)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:"#111827",display:"flex",alignItems:"center",justifyContent:"center",color:"#F1F5F9",fontSize:12,fontWeight:700}}>{st.pct}%</div>
                </div>
              </div>
            );})}
          </div>
        )}
      </div>
    </div>
  );

  /* ═══════════ PROFILE VIEW (TRAINER + STUDENT) ═══════════ */
  const isTrainer = role === "trainer";

  return (
    <div style={{...css.wrap,...(isTrainer?css.dark:css.light)}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
      <div style={css.mx}>
        {/* Top Nav */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",gap:8}}>
            {isTrainer && <button onClick={()=>{setView("list");setEditMode(false);}} style={css.btn(isDark?"#1E293B":"#E2E8F0",isDark?"#94A3B8":"#475569",`1px solid ${isDark?"#334155":"#CBD5E1"}`)}>← Students</button>}
            {!isTrainer && <button onClick={()=>{setRole(null);setActiveId(null);}} style={css.btn("#E2E8F0","#475569","1px solid #CBD5E1")}>← Logout</button>}
          </div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:10,color:"#06B6D4",letterSpacing:3}}>{isTrainer?"STARTUP COACH — TRAINER PANEL":"STARTUP COACH — STUDENT PORTAL"}</div>
        </div>

        {/* Edit Form (Trainer Only) */}
        {editMode && isTrainer ? (
          <div style={css.card(isDark)}>
            <h2 style={{margin:"0 0 18px",fontSize:18,fontWeight:700}}>{form.name?"Edit Student":"New Student"}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[{k:"name",l:"Full Name",ph:"Rahul Sharma"},{k:"phone",l:"Phone",ph:"+91 98765 43210"},{k:"email",l:"Email",ph:"rahul@gmail.com"},{k:"city",l:"City",ph:"Mumbai"},{k:"background",l:"Previous Background",ph:"Insurance Sales"},{k:"startDate",l:"Start Date",type:"date"}].map(f=>(
                <div key={f.k}>
                  <label style={{display:"block",fontSize:11,color:isDark?"#94A3B8":"#64748B",marginBottom:3,fontWeight:600}}>{f.l}</label>
                  <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} type={f.type||"text"} placeholder={f.ph}
                    style={{...css.input(isDark), ...(f.type==="date"?{colorScheme:isDark?"dark":"light",cursor:"pointer"}:{})}}/>
                </div>
              ))}
            </div>
            <div style={{marginTop:12}}>
              <label style={{display:"block",fontSize:11,color:isDark?"#94A3B8":"#64748B",marginBottom:3,fontWeight:600}}>Notes</label>
              <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={2} placeholder="Notes..." style={{...css.input(isDark),resize:"vertical"}}/>
            </div>
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <button onClick={saveStudent} style={css.btn("linear-gradient(135deg,#2563EB,#06B6D4)","#fff")}>Save</button>
              <button onClick={()=>{setEditMode(false);if(!student)setView("list");}} style={css.btn(isDark?"#1E293B":"#E2E8F0",isDark?"#94A3B8":"#475569")}>Cancel</button>
            </div>
          </div>
        ) : student ? (
          <>
            {/* Profile Card */}
            <div style={css.card(isDark)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#06B6D4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:20,flexShrink:0}}>{student.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <h2 style={{margin:0,fontSize:19,fontWeight:700}}>{student.name}</h2>
                    <div style={{color:isDark?"#64748B":"#94A3B8",fontSize:12,marginTop:2}}>{student.background||"—"} • {student.city||"—"}</div>
                    {!isTrainer && <div style={{color:isDark?"#64748B":"#94A3B8",fontSize:11,marginTop:1}}>{student.email}</div>}
                  </div>
                </div>
                {isTrainer && (
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <button onClick={()=>{setForm(student);setEditMode(true);}} style={css.btn(isDark?"#1E293B":"#E2E8F0",isDark?"#94A3B8":"#64748B",`1px solid ${isDark?"#334155":"#CBD5E1"}`)}>Edit</button>
                    <button onClick={()=>setConfirm("pause")} style={css.btn(student.status==="paused"?"#7C3AED":isDark?"#1E293B":"#E2E8F0",student.status==="paused"?"#fff":isDark?"#94A3B8":"#64748B",`1px solid ${isDark?"#334155":"#CBD5E1"}`)}>{student.status==="paused"?"▶ Resume":"⏸ Pause"}</button>
                    <button onClick={()=>setConfirm("delay")} style={css.btn(isDark?"#1E293B":"#E2E8F0","#F59E0B",`1px solid ${isDark?"#334155":"#CBD5E1"}`)}>+ Delay</button>
                    <button onClick={()=>setConfirm("delete")} style={css.btn(isDark?"#1E293B":"#E2E8F0","#EF4444",`1px solid ${isDark?"#334155":"#CBD5E1"}`)}>Delete</button>
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
                {student.status==="paused"&&<span style={css.tag("#EDE9FE","#7C3AED")}>⏸ Paused since {fmtD(student.pausedAt)}</span>}
                {student.totalPausedDays>0&&<span style={css.tag("#FEF3C7","#92400E")}>+{student.totalPausedDays}d adjusted</span>}
                <span style={css.tag(isDark?"#0B1120":"#F1F5F9",isDark?"#64748B":"#94A3B8")}>Start: {fmtD(student.startDate)}</span>
                <span style={css.tag(isDark?"#0B1120":"#F1F5F9",isDark?"#64748B":"#94A3B8")}>End: {fmtD(schD(student,90))}</span>
              </div>
            </div>

            {/* Confirm Dialogs */}
            {confirm==="pause"&&<div style={{...css.card(isDark),textAlign:"center"}}><p style={{margin:"0 0 12px",fontSize:14}}>{student.status==="paused"?"Resume? Paused days shift schedule.":"Pause program? Future dates will shift."}</p><div style={{display:"flex",gap:8,justifyContent:"center"}}><button onClick={togglePause} style={css.btn("#2563EB","#fff")}>{student.status==="paused"?"Resume":"Pause"}</button><button onClick={()=>setConfirm(null)} style={css.btn(isDark?"#334155":"#E2E8F0",isDark?"#94A3B8":"#64748B")}>Cancel</button></div></div>}
            {confirm==="delay"&&<div style={{...css.card(isDark),textAlign:"center"}}><p style={{margin:"0 0 12px",fontSize:14}}>Add delay — all dates shift forward.</p><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>{[1,2,3,5,7,14].map(d=><button key={d} onClick={()=>addDelay(d)} style={css.btn(isDark?"#0B1120":"#FEF3C7","#F59E0B",`1px solid #F59E0B`)}>+{d}d</button>)}<button onClick={()=>setConfirm(null)} style={css.btn(isDark?"#334155":"#E2E8F0",isDark?"#94A3B8":"#64748B")}>Cancel</button></div></div>}
            {confirm==="delete"&&<div style={{...css.card(isDark),textAlign:"center"}}><p style={{margin:"0 0 12px",fontSize:14,color:"#EF4444",fontWeight:600}}>Delete {student.name}? This cannot be undone.</p><div style={{display:"flex",gap:8,justifyContent:"center"}}><button onClick={()=>deleteStudent(student.id)} style={css.btn("#EF4444","#fff")}>Yes, Delete</button><button onClick={()=>setConfirm(null)} style={css.btn(isDark?"#334155":"#E2E8F0",isDark?"#94A3B8":"#64748B")}>Cancel</button></div></div>}

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>
              {[{l:"Done",v:stats.completed,c:"#10B981"},{l:"Active",v:stats.inProgress,c:"#F59E0B"},{l:"Delayed",v:stats.delayed,c:"#EF4444"},{l:"Progress",v:stats.pct+"%",c:"#2563EB"},{l:"Avg Score",v:stats.avg,c:"#06B6D4"}].map((s,i)=>(
                <div key={i} style={{background:isDark?"#111827":"#fff",borderRadius:8,padding:"10px 8px",textAlign:"center",border:`1px solid ${isDark?"#1E293B":"#E2E8F0"}`}}>
                  <div style={{fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:9,color:"#94A3B8",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:isDark?"#1E293B":"#E2E8F0",borderRadius:6,height:6,marginBottom:16,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${stats.pct}%`,background:"linear-gradient(90deg,#2563EB,#06B6D4)",borderRadius:6,transition:"width .5s"}}/>
            </div>

            {/* Tab Switcher */}
            <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
              {["checkin","roadmap","files","history"].map(t=>(
                <button key={t} onClick={()=>setTab(t)}
                  style={{padding:"8px 16px",borderRadius:6,fontSize:12,fontWeight:tab===t?700:400,cursor:"pointer",
                    background:tab===t?(isDark?"#2563EB22":"#DBEAFE"):isDark?"#111827":"#F1F5F9",
                    color:tab===t?"#2563EB":isDark?"#64748B":"#94A3B8",
                    border:`1px solid ${tab===t?"#2563EB33":isDark?"#1E293B":"#E2E8F0"}`}}>
                  {t==="checkin"?"✅ Daily Check-In":t==="roadmap"?"📋 Roadmap":t==="files"?"📁 Files & Exams":"📜 History"}
                </button>
              ))}
            </div>

            {/* ═══ TAB: DAILY CHECK-IN ═══ */}
            {tab==="checkin"&&(()=>{
              const today = new Date().toISOString().split("T")[0];
              const checkins = student.checkIns || [];
              const todayLog = checkins.find(c=>c.date===today);
              const streak = (()=>{
                let s=0; const d=new Date();
                while(true){
                  const ds=d.toISOString().split("T")[0];
                  if(checkins.find(c=>c.date===ds&&c.status==="complete")){s++; d.setDate(d.getDate()-1);}
                  else break;
                } return s;
              })();

              const submitCheckin = (status, learning, mood) => {
                setStudents(p=>{
                  const updated=p.map(s=>{
                    if(s.id!==activeId) return s;
                    const logs=[...(s.checkIns||[]).filter(c=>c.date!==today),
                      {date:today,status,learning,mood,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),submittedAt:new Date().toISOString()}];
                    return{...s,checkIns:logs};
                  });
                  const s=updated.find(s=>s.id===activeId); if(s) syncStudent(s);
                  return updated;
                });
              };

              const [ciLearning2, setCiLearning2] = [ciLearning, setCiLearning];
              const [ciMood2, setCiMood2] = [ciMood, setCiMood];
              const [ciStatus2, setCiStatus2] = [ciStatus, setCiStatus];

              // Find today's day number based on schedule
              const todayDayNum = (()=>{
                if(!student.startDate) return null;
                const diff = Math.floor((new Date(today)-new Date(student.startDate))/86400000)+(student.totalPausedDays||0);
                return Math.min(Math.max(diff+1,1),90);
              })();
              const todayDayInfo = PLAN.flatMap(w=>w.d).find(d=>d.n===todayDayNum);

              const [ciLearning2, setCiLearning2] = [ciLearning, setCiLearning];
              const [ciMood2, setCiMood2] = [ciMood, setCiMood];
              const [ciStatus2, setCiStatus2] = [ciStatus, setCiStatus];

              return(
                <div>
                  {/* Student Check-In Card */}
                  {!isTrainer&&(
                    <div style={{...css.card(false),border:"1px solid #BFDBFE",background:"#EFF6FF",marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                        <div>
                          <div style={{fontSize:18,fontWeight:800,color:"#1E40AF"}}>Today's Check-In</div>
                          <div style={{fontSize:12,color:"#64748B",marginTop:2}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div>
                          {todayDayInfo&&<div style={{fontSize:11,color:"#2563EB",marginTop:3,fontWeight:600}}>Day {todayDayNum}: {todayDayInfo.t}</div>}
                        </div>
                        {streak>0&&<div style={{textAlign:"center",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:8,padding:"8px 14px"}}>
                          <div style={{fontSize:22,fontWeight:800,color:"#D97706"}}>{streak}</div>
                          <div style={{fontSize:9,color:"#92400E",fontWeight:600}}>DAY STREAK 🔥</div>
                        </div>}
                      </div>

                      {todayLog?.status==="complete"?(
                        <div style={{background:"#D1FAE5",border:"1px solid #6EE7B7",borderRadius:8,padding:14}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#065F46",marginBottom:6}}>✅ Checked in today!</div>
                          <div style={{fontSize:11,color:"#047857"}}>Mood: {todayLog.mood}  •  Submitted at {todayLog.time}</div>
                          {todayLog.learning&&<div style={{fontSize:12,color:"#1E293B",marginTop:8,fontStyle:"italic"}}>"{todayLog.learning}"</div>}
                        </div>
                      ):(
                        <div style={{display:"grid",gap:12}}>
                          <div>
                            <div style={{fontSize:12,fontWeight:700,color:"#1E293B",marginBottom:8}}>Where are you with today's lesson?</div>
                            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                              {[{v:"studying",l:"📖 Currently Studying",c:"#2563EB"},{v:"complete",l:"✅ Completed Today",c:"#10B981"},{v:"behind",l:"⏱ Running Behind",c:"#F59E0B"}].map(opt=>(
                                <button key={opt.v} onClick={()=>setCiStatus2(opt.v)}
                                  style={{padding:"8px 14px",borderRadius:6,fontSize:12,fontWeight:ciStatus2===opt.v?700:400,cursor:"pointer",
                                    background:ciStatus2===opt.v?opt.c+"22":"#F8FAFC",color:ciStatus2===opt.v?opt.c:"#64748B",
                                    border:`2px solid ${ciStatus2===opt.v?opt.c:"#E2E8F0"}`}}>{opt.l}</button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div style={{fontSize:12,fontWeight:700,color:"#1E293B",marginBottom:8}}>How are you feeling about the material?</div>
                            <div style={{display:"flex",gap:10}}>
                              {[{v:"💪",l:"Confident"},{v:"😐",l:"Okay"},{v:"😕",l:"Struggling"}].map(m=>(
                                <button key={m.v} onClick={()=>setCiMood2(m.v+" "+m.l)}
                                  style={{padding:"10px 16px",borderRadius:8,fontSize:13,cursor:"pointer",textAlign:"center",
                                    background:ciMood2===m.v+" "+m.l?"#DBEAFE":"#F8FAFC",
                                    border:`2px solid ${ciMood2===m.v+" "+m.l?"#2563EB":"#E2E8F0"}`}}>
                                  <div style={{fontSize:22}}>{m.v}</div>
                                  <div style={{fontSize:9,color:"#64748B",marginTop:2}}>{m.l}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div style={{fontSize:12,fontWeight:700,color:"#1E293B",marginBottom:6}}>What did you learn today? <span style={{fontWeight:400,color:"#94A3B8"}}>(2-3 lines)</span></div>
                            <textarea value={ciLearning2} onChange={e=>setCiLearning2(e.target.value)} rows={3}
                              placeholder="Write what stuck with you today — a concept, a framework, an example..."
                              style={{width:"100%",padding:"10px 12px",border:"1px solid #CBD5E1",borderRadius:6,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",background:"#fff",color:"#1E293B"}}/>
                          </div>
                          <button onClick={()=>{if(ciStatus2&&ciMood2){submitCheckin(ciStatus2,ciLearning2,ciMood2);}}}
                            disabled={!ciStatus2||!ciMood2}
                            style={{padding:"12px",background:ciStatus2&&ciMood2?"linear-gradient(135deg,#2563EB,#06B6D4)":"#E2E8F0",color:ciStatus2&&ciMood2?"#fff":"#94A3B8",border:"none",borderRadius:8,fontSize:14,fontWeight:700,cursor:ciStatus2&&ciMood2?"pointer":"not-allowed"}}>
                            Submit Today's Check-In
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trainer: See all check-ins */}
                  {isTrainer&&(
                    <div style={css.card(isDark)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                        <h3 style={{margin:0,fontSize:15,fontWeight:700}}>✅ Daily Check-In Log</h3>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{fontSize:11,color:"#F59E0B",fontWeight:600}}>🔥 {streak} day streak</span>
                          <span style={{fontSize:11,color:"#94A3B8"}}>{checkins.length} total entries</span>
                        </div>
                      </div>

                      {/* Alert if no check-in for 2+ days */}
                      {(()=>{
                        const last = checkins.sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
                        const daysSince = last ? Math.floor((new Date()-new Date(last.date))/86400000) : 999;
                        if(daysSince>=2) return(
                          <div style={{padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,marginBottom:12,fontSize:12,color:"#DC2626",fontWeight:600}}>
                            ⚠️ No check-in for {daysSince} days — consider reaching out to {student.name}
                          </div>
                        );
                        return null;
                      })()}

                      {checkins.length===0?(
                        <p style={{color:"#94A3B8",fontSize:12,textAlign:"center",padding:20}}>No check-ins yet.</p>
                      ):(
                        <div>
                          {[...checkins].sort((a,b)=>new Date(b.date)-new Date(a.date)).map((ci,i)=>(
                            <div key={i} style={{padding:"12px 0",borderTop:i?`1px solid ${isDark?"#1E293B":"#E2E8F0"}`:"none"}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                                <div style={{flex:1}}>
                                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                                    <span style={{fontSize:12,fontWeight:700}}>{new Date(ci.date).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}</span>
                                    <span style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,
                                      background:ci.status==="complete"?"#D1FAE5":ci.status==="studying"?"#DBEAFE":"#FEF3C7",
                                      color:ci.status==="complete"?"#065F46":ci.status==="studying"?"#1E40AF":"#92400E"}}>
                                      {ci.status==="complete"?"✅ Completed":ci.status==="studying"?"📖 Studying":"⏱ Behind"}
                                    </span>
                                    <span style={{fontSize:13}}>{ci.mood?.split(" ")[0]}</span>
                                    <span style={{fontSize:10,color:"#94A3B8"}}>{ci.time}</span>
                                  </div>
                                  {ci.learning&&<div style={{fontSize:11,color:isDark?"#94A3B8":"#475569",fontStyle:"italic",marginTop:2}}>"{ci.learning}"</div>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Student: Past check-ins */}
                  {!isTrainer&&checkins.length>0&&(
                    <div style={css.card(false)}>
                      <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700,color:"#1E293B"}}>Your Check-In History</h3>
                      {[...checkins].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,7).map((ci,i)=>(
                        <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 0",borderTop:i?`1px solid #E2E8F0`:"none"}}>
                          <span style={{fontSize:18}}>{ci.mood?.split(" ")[0]||"📝"}</span>
                          <div style={{flex:1}}>
                            <div style={{fontSize:12,fontWeight:600,color:"#1E293B"}}>{new Date(ci.date).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}</div>
                            {ci.learning&&<div style={{fontSize:11,color:"#64748B",fontStyle:"italic"}}>"{ci.learning}"</div>}
                          </div>
                          <span style={{padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,
                            background:ci.status==="complete"?"#D1FAE5":ci.status==="studying"?"#DBEAFE":"#FEF3C7",
                            color:ci.status==="complete"?"#065F46":ci.status==="studying"?"#1E40AF":"#92400E"}}>
                            {ci.status==="complete"?"✅ Done":ci.status==="studying"?"📖 Studied":"⏱ Behind"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ═══ TAB: ROADMAP ═══ */}
            {tab==="roadmap"&&(
              <div style={{display:"grid",gap:8}}>
                {PLAN.map(week=>{
                  const pc=PC[week.p]; const isExp=expWeek===week.w;
                  const wc=week.d.filter(d=>student.dayProgress?.[d.n]?.status==="completed").length;
                  const hasFiles = week.d.some(d => student.files?.[d.n]?.length > 0);
                  return(
                    <div key={week.w} style={{borderRadius:10,overflow:"hidden",border:`1px solid ${isExp?pc.a+"44":isDark?"#1E293B":"#E2E8F0"}`,background:isDark?"#111827":"#fff"}}>
                      <div onClick={()=>setExpWeek(isExp?null:week.w)}
                        style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",gap:10,alignItems:"center",padding:"12px 14px",cursor:"pointer",background:isExp?pc.a+"08":"transparent"}}>
                        <div style={{width:34,height:34,borderRadius:8,background:pc.a+"22",display:"flex",alignItems:"center",justifyContent:"center",color:pc.a,fontWeight:700,fontSize:12}}>W{week.w}</div>
                        <div>
                          <div style={{fontSize:13,fontWeight:600}}>Week {week.w} — <span style={{color:pc.a}}>Phase {week.p}: {pc.l}</span></div>
                          <div style={{color:"#64748B",fontSize:10,marginTop:2}}>Days {week.d[0].n}-{week.d[week.d.length-1].n} • {fmtD(schD(student,week.d[0].n))} → {fmtD(schD(student,week.d[week.d.length-1].n))}</div>
                        </div>
                        <div style={{display:"flex",gap:4,alignItems:"center"}}>
                          {hasFiles && <span style={{fontSize:10,color:"#F59E0B"}}>📎</span>}
                          <span style={{background:isDark?"#0B1120":"#F1F5F9",padding:"3px 8px",borderRadius:20,fontSize:10,color:wc===5?"#10B981":"#94A3B8",fontWeight:600}}>{wc}/5</span>
                        </div>
                        <div style={{color:"#64748B",fontSize:14}}>{isExp?"▾":"▸"}</div>
                      </div>
                      {isExp&&(
                        <div style={{padding:"0 14px 14px"}}>
                          {week.d.map(day=>{
                            const dp=student.dayProgress?.[day.n]||{}; const st=dp.status||"not_started"; const sc=ST[st];
                            const {exams, materials} = getDayFiles(day.n);
                            const hasExams = exams.length > 0;
                            const hasMaterials = materials.length > 0;
                            return(
                              <div key={day.n} style={{padding:"14px 0",borderTop:`1px solid ${isDark?"#1E293B":"#E2E8F0"}`}}>
                                {/* Day Header */}
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                                  <div style={{display:"flex",gap:10,flex:1}}>
                                    <div style={{textAlign:"center",flexShrink:0,width:42}}>
                                      <div style={{fontSize:17,fontWeight:700,color:pc.a}}>D{day.n}</div>
                                      <div style={{fontSize:8,color:"#64748B"}}>{fmtD(schD(student,day.n))}</div>
                                    </div>
                                    <div style={{flex:1}}>
                                      <div style={{fontSize:13,fontWeight:600}}>{day.t}</div>
                                      <div style={{color:"#64748B",fontSize:11,marginTop:2}}>{day.tp}</div>
                                    </div>
                                  </div>
                                  <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
                                    {hasExams && <span style={{padding:"2px 6px",background:"#FEE2E2",color:"#DC2626",borderRadius:4,fontSize:8,fontWeight:700}}>EXAM</span>}
                                    {hasMaterials && <span style={{padding:"2px 6px",background:"#DBEAFE",color:"#2563EB",borderRadius:4,fontSize:8,fontWeight:700}}>NOTES</span>}
                                    <div style={{padding:"3px 8px",background:sc.bg,color:sc.c,borderRadius:4,fontSize:9,fontWeight:700,whiteSpace:"nowrap"}}>{sc.i} {sc.l}</div>
                                  </div>
                                </div>

                                {/* ═══ TRAINER VIEW ═══ */}
                                {isTrainer && (
                                  <div style={{marginLeft:52,marginTop:10}}>
                                    {/* Status */}
                                    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>
                                      {Object.keys(ST).map(opt=>(
                                        <button key={opt} onClick={()=>updateDay(day.n,"status",opt)}
                                          style={{padding:"2px 7px",fontSize:9,borderRadius:4,cursor:"pointer",fontWeight:st===opt?700:400,
                                            background:st===opt?ST[opt].bg:isDark?"#0B1120":"#F8FAFC",color:st===opt?ST[opt].c:"#94A3B8",
                                            border:`1px solid ${st===opt?ST[opt].c+"44":isDark?"#334155":"#E2E8F0"}`}}>{ST[opt].i} {ST[opt].l}</button>
                                      ))}
                                    </div>
                                    {/* Notes + Score */}
                                    <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:10}}>
                                      <input placeholder="Day notes..." value={dp.notes||""} onChange={e=>updateDay(day.n,"notes",e.target.value)}
                                        style={{flex:1,padding:"5px 8px",background:isDark?"#0B1120":"#F8FAFC",border:`1px solid ${isDark?"#334155":"#E2E8F0"}`,borderRadius:4,color:isDark?"#CBD5E1":"#1E293B",fontSize:10,outline:"none"}}/>
                                      <span style={{fontSize:9,color:"#64748B"}}>Score:</span>
                                      <input type="number" min="0" max="100" value={dp.score||""} onChange={e=>updateDay(day.n,"score",parseInt(e.target.value)||0)} placeholder="—"
                                        style={{width:40,padding:"5px 3px",background:isDark?"#0B1120":"#F8FAFC",border:`1px solid ${isDark?"#334155":"#E2E8F0"}`,borderRadius:4,color:"#06B6D4",fontSize:11,textAlign:"center",outline:"none"}}/>
                                    </div>

                                    {/* ── EXAMS (Red/Orange theme) ── */}
                                    <div style={{background:isDark?"#1A0B0B":"#FFF7ED",border:`1px solid ${isDark?"#7F1D1D":"#FED7AA"}`,borderRadius:8,padding:12,marginBottom:8}}>
                                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:exams.length?8:0}}>
                                        <div style={{fontSize:12,fontWeight:700,color:"#EA580C"}}>📝 Exams & Assessments</div>
                                        <label style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",background:"linear-gradient(135deg,#EA580C,#DC2626)",borderRadius:6,cursor:"pointer",fontSize:11,fontWeight:600,color:"#fff"}}>
                                          ⬆ Upload Exam
                                          <input type="file" accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx" onChange={e=>handleFileUpload(day.n,"exams",e)} style={{display:"none"}}/>
                                        </label>
                                      </div>
                                      {exams.length > 0 ? exams.map((f,fi)=>(
                                        <div key={fi} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:isDark?"#111827":"#fff",borderRadius:6,marginBottom:4,border:`1px solid ${isDark?"#7F1D1D":"#FED7AA"}`}}>
                                          <span style={{fontSize:18}}>📝</span>
                                          <div style={{flex:1}}>
                                            <div style={{fontSize:12,fontWeight:600}}>{f.name}</div>
                                            <div style={{fontSize:9,color:"#94A3B8"}}>{fmtD(f.uploadedAt)}</div>
                                          </div>
                                          <button onClick={()=>removeFile(day.n,"exams",fi)} style={{padding:"4px 10px",background:"#FEE2E2",color:"#EF4444",border:"none",borderRadius:4,cursor:"pointer",fontSize:10,fontWeight:600}}>Remove</button>
                                        </div>
                                      )) : <div style={{fontSize:10,color:"#94A3B8",marginTop:4}}>No exams uploaded for this day</div>}
                                    </div>

                                    {/* ── STUDY MATERIAL (Blue/Green theme) ── */}
                                    <div style={{background:isDark?"#0B1120":"#F0FDF4",border:`1px solid ${isDark?"#1E3A2B":"#BBF7D0"}`,borderRadius:8,padding:12}}>
                                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:materials.length?8:0}}>
                                        <div style={{fontSize:12,fontWeight:700,color:isDark?"#10B981":"#065F46"}}>📚 Study Material</div>
                                        <label style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",background:"linear-gradient(135deg,#2563EB,#06B6D4)",borderRadius:6,cursor:"pointer",fontSize:11,fontWeight:600,color:"#fff"}}>
                                          ⬆ Upload Material
                                          <input type="file" accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx" onChange={e=>handleFileUpload(day.n,"materials",e)} style={{display:"none"}}/>
                                        </label>
                                      </div>
                                      {materials.length > 0 ? materials.map((f,fi)=>(
                                        <div key={fi} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:isDark?"#111827":"#fff",borderRadius:6,marginBottom:4,border:`1px solid ${isDark?"#1E293B":"#BBF7D0"}`}}>
                                          <span style={{fontSize:18}}>{f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}</span>
                                          <div style={{flex:1}}>
                                            <div style={{fontSize:12,fontWeight:600}}>{f.name}</div>
                                            <div style={{fontSize:9,color:"#94A3B8"}}>{fmtD(f.uploadedAt)}</div>
                                          </div>
                                          <button onClick={()=>removeFile(day.n,"materials",fi)} style={{padding:"4px 10px",background:"#FEE2E2",color:"#EF4444",border:"none",borderRadius:4,cursor:"pointer",fontSize:10,fontWeight:600}}>Remove</button>
                                        </div>
                                      )) : <div style={{fontSize:10,color:"#94A3B8",marginTop:4}}>No study material uploaded for this day</div>}
                                    </div>
                                  </div>
                                )}

                                {/* ═══ STUDENT VIEW ═══ */}
                                {!isTrainer && (
                                  <div style={{marginLeft:52,marginTop:10}}>
                                    {dp.notes && <div style={{fontSize:12,color:"#475569",background:"#F1F5F9",padding:"8px 12px",borderRadius:6,marginBottom:8,border:"1px solid #E2E8F0"}}>📝 <b>Trainer Note:</b> {dp.notes}</div>}
                                    {dp.score > 0 && <div style={{fontSize:12,marginBottom:8,padding:"6px 12px",background:"#ECFDF5",borderRadius:6,border:"1px solid #BBF7D0"}}>🏆 Your Score: <b style={{color:"#10B981",fontSize:16}}>{dp.score}/100</b></div>}

                                    {/* ── EXAMS (Student) ── */}
                                    {hasExams && (
                                      <div style={{background:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:8,padding:12,marginBottom:8}}>
                                        <div style={{fontSize:12,fontWeight:700,color:"#EA580C",marginBottom:8}}>📝 Exam / Assessment</div>
                                        {exams.map((f,fi)=>(
                                          <a key={fi} href={f.data} download={f.name}
                                            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#fff",borderRadius:6,marginBottom:4,border:"1px solid #FED7AA",textDecoration:"none",cursor:"pointer",transition:"all .15s"}}
                                            onMouseOver={e=>e.currentTarget.style.background="#FFF7ED"} onMouseOut={e=>e.currentTarget.style.background="#fff"}>
                                            <span style={{fontSize:24}}>📝</span>
                                            <div style={{flex:1}}>
                                              <div style={{fontSize:13,fontWeight:600,color:"#1E293B"}}>{f.name}</div>
                                              <div style={{fontSize:10,color:"#64748B"}}>Uploaded {fmtD(f.uploadedAt)}</div>
                                            </div>
                                            <div style={{padding:"6px 14px",background:"#EA580C",color:"#fff",borderRadius:6,fontSize:11,fontWeight:600}}>⬇ Download Exam</div>
                                          </a>
                                        ))}
                                      </div>
                                    )}

                                    {/* ── STUDY MATERIAL (Student) ── */}
                                    {hasMaterials && (
                                      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:12}}>
                                        <div style={{fontSize:12,fontWeight:700,color:"#1E40AF",marginBottom:8}}>📚 Study Material</div>
                                        {materials.map((f,fi)=>(
                                          <a key={fi} href={f.data} download={f.name}
                                            style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#fff",borderRadius:6,marginBottom:4,border:"1px solid #DBEAFE",textDecoration:"none",cursor:"pointer",transition:"all .15s"}}
                                            onMouseOver={e=>e.currentTarget.style.background="#EFF6FF"} onMouseOut={e=>e.currentTarget.style.background="#fff"}>
                                            <span style={{fontSize:24}}>{f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📎"}</span>
                                            <div style={{flex:1}}>
                                              <div style={{fontSize:13,fontWeight:600,color:"#1E293B"}}>{f.name}</div>
                                              <div style={{fontSize:10,color:"#64748B"}}>Uploaded {fmtD(f.uploadedAt)}</div>
                                            </div>
                                            <div style={{padding:"6px 14px",background:"#2563EB",color:"#fff",borderRadius:6,fontSize:11,fontWeight:600}}>⬇ Download</div>
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ═══ TAB: FILES ═══ */}
            {tab==="files"&&(
              <div style={css.card(isDark)}>
                {/* EXAMS SECTION */}
                <h3 style={{margin:"0 0 12px",fontSize:15,fontWeight:700,color:"#EA580C"}}>📝 All Exams & Assessments</h3>
                {(()=>{
                  const allExams = [];
                  Object.entries(student.files||{}).forEach(([dayNum,data])=>{
                    const d = Array.isArray(data) ? {exams:[],materials:data} : data;
                    (d.exams||[]).forEach((f,fi)=>allExams.push({dayNum:parseInt(dayNum),file:f,fi}));
                  });
                  if(!allExams.length) return <p style={{color:"#94A3B8",fontSize:12,textAlign:"center",padding:16,background:isDark?"#1A0B0B":"#FFF7ED",borderRadius:8,border:`1px solid ${isDark?"#7F1D1D":"#FED7AA"}`}}>{isTrainer?"No exams uploaded yet. Go to Roadmap → expand a day → upload under 'Exams & Assessments'.":"No exams available yet."}</p>;
                  return <div style={{marginBottom:8}}>{allExams.sort((a,b)=>a.dayNum-b.dayNum).map((item,i)=>{
                    const dayInfo = PLAN.flatMap(w=>w.d).find(d=>d.n===item.dayNum);
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:isDark?"#1A0B0B":"#FFF7ED",borderRadius:6,marginBottom:4,border:`1px solid ${isDark?"#7F1D1D":"#FED7AA"}`}}>
                        <span style={{fontSize:22}}>📝</span>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:13}}>{item.file.name}</div>
                          <div style={{color:"#64748B",fontSize:11}}>Day {item.dayNum}: {dayInfo?.t||"—"} • {fmtD(item.file.uploadedAt)}</div>
                        </div>
                        <a href={item.file.data} download={item.file.name} style={{...css.btn("#EA580C","#fff"),padding:"6px 14px",textDecoration:"none",fontSize:11}}>⬇ Download</a>
                        {isTrainer&&<button onClick={()=>removeFile(item.dayNum,"exams",item.fi)} style={{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:14}}>✕</button>}
                      </div>
                    );
                  })}</div>;
                })()}

                {/* STUDY MATERIAL SECTION */}
                <h3 style={{margin:"20px 0 12px",fontSize:15,fontWeight:700,color:"#2563EB"}}>📚 All Study Material</h3>
                {(()=>{
                  const allMats = [];
                  Object.entries(student.files||{}).forEach(([dayNum,data])=>{
                    const d = Array.isArray(data) ? {exams:[],materials:data} : data;
                    (d.materials||[]).forEach((f,fi)=>allMats.push({dayNum:parseInt(dayNum),file:f,fi}));
                  });
                  if(!allMats.length) return <p style={{color:"#94A3B8",fontSize:12,textAlign:"center",padding:16,background:isDark?"#0B1120":"#EFF6FF",borderRadius:8,border:`1px solid ${isDark?"#1E3A5F":"#BFDBFE"}`}}>{isTrainer?"No study material uploaded yet. Go to Roadmap → expand a day → upload under 'Study Material'.":"No study material available yet."}</p>;
                  return <div>{allMats.sort((a,b)=>a.dayNum-b.dayNum).map((item,i)=>{
                    const dayInfo = PLAN.flatMap(w=>w.d).find(d=>d.n===item.dayNum);
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:isDark?"#0B1120":"#EFF6FF",borderRadius:6,marginBottom:4,border:`1px solid ${isDark?"#1E3A5F":"#BFDBFE"}`}}>
                        <span style={{fontSize:22}}>{item.file.type?.includes("pdf")?"📄":item.file.type?.includes("image")?"🖼️":"📎"}</span>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:13}}>{item.file.name}</div>
                          <div style={{color:"#64748B",fontSize:11}}>Day {item.dayNum}: {dayInfo?.t||"—"} • {fmtD(item.file.uploadedAt)}</div>
                        </div>
                        <a href={item.file.data} download={item.file.name} style={{...css.btn("#2563EB","#fff"),padding:"6px 14px",textDecoration:"none",fontSize:11}}>⬇ Download</a>
                        {isTrainer&&<button onClick={()=>removeFile(item.dayNum,"materials",item.fi)} style={{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:14}}>✕</button>}
                      </div>
                    );
                  })}</div>;
                })()}
              </div>
            )}

            {/* ═══ TAB: HISTORY ═══ */}
            {tab==="history"&&(
              <div style={css.card(isDark)}>
                <h3 style={{margin:"0 0 14px",fontSize:15,fontWeight:700}}>📜 Schedule & Activity History</h3>
                {student.pauseHistory?.length>0 ? student.pauseHistory.map((h,i)=>(
                  <div key={i} style={{padding:"8px 0",borderTop:i?`1px solid ${isDark?"#1E293B":"#E2E8F0"}`:"none",fontSize:12,color:isDark?"#94A3B8":"#64748B"}}>
                    {h.type==="delay"?<span>📅 <b style={{color:"#F59E0B"}}>+{h.days} day delay</b> added on {fmtD(h.addedAt)}</span>
                    :<span>⏸ Paused {fmtD(h.from)} → {fmtD(h.to)} (<b style={{color:"#8B5CF6"}}>{h.days} days</b>)</span>}
                  </div>
                )) : <p style={{color:"#94A3B8",fontSize:13,textAlign:"center",padding:20}}>No schedule adjustments yet.</p>}
                {student.notes&&<div style={{marginTop:14,padding:"10px 12px",background:isDark?"#0B1120":"#F8FAFC",borderRadius:6,border:`1px solid ${isDark?"#1E293B":"#E2E8F0"}`}}><div style={{fontSize:11,color:"#64748B",marginBottom:4,fontWeight:600}}>Trainer Notes</div><div style={{fontSize:12}}>{student.notes}</div></div>}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
