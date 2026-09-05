'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileUp,
  Fingerprint,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Receipt,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRound,
  X,
} from 'lucide-react'

type View = 'vendor' | 'finance'
type UploadState = 'idle' | 'processing' | 'success'

const stages = ['PO Issued', 'Goods Receipted', 'Approved', 'Paid']

const invoices = [
  { id: 'INV-10482', vendor: 'Northstar Scientific', date: '18 Sep 2025', amount: '£12,480.00', status: 'Needs review', issue: 'Price variance', tone: 'amber' },
  { id: 'INV-10477', vendor: 'Campus Office Co.', date: '17 Sep 2025', amount: '£2,160.40', status: 'Awaiting GRV', issue: 'Goods not receipted', tone: 'slate' },
  { id: 'INV-10471', vendor: 'Brightline Facilities', date: '16 Sep 2025', amount: '£8,900.00', status: 'Exception', issue: 'Missing PO number', tone: 'amber' },
  { id: 'INV-10468', vendor: 'Lumen IT Services', date: '15 Sep 2025', amount: '£4,250.00', status: 'Vendor mismatch', issue: 'Bank details differ', tone: 'red' },
]

function StatusPill({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'amber' | 'green' | 'red' }) {
  const styles = { slate: 'bg-muted text-muted-foreground', amber: 'bg-amber-50 text-amber-700', green: 'bg-emerald-50 text-emerald-700', red: 'bg-red-50 text-red-700' }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>
}

function Sidebar({ view, onChange }: { view: View; onChange: (view: View) => void }) {
  return (
    <aside className="hidden w-[236px] shrink-0 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Receipt className="size-5" /></div>
        <div><p className="font-semibold tracking-tight">ProcureFlow</p><p className="text-[11px] text-muted-foreground">University Finance</p></div>
      </div>
      <div className="mt-10 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</div>
      <nav className="mt-3 space-y-1">
        <button onClick={() => onChange('vendor')} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${view === 'vendor' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><UploadCloud className="size-4" /> Vendor portal</button>
        <button onClick={() => onChange('finance')} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${view === 'finance' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><LayoutDashboard className="size-4" /> Finance manager</button>
      </nav>
      <div className="mt-auto rounded-xl border border-border bg-muted/50 p-3"><div className="flex items-center gap-2 text-xs font-semibold"><ShieldCheck className="size-4 text-emerald-600" /> Secure workspace</div><p className="mt-2 text-xs leading-5 text-muted-foreground">Your procurement data is encrypted and access-controlled.</p></div>
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4"><div className="flex size-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">JM</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Jordan Mitchell</p><p className="truncate text-[11px] text-muted-foreground">Finance operations</p></div><MoreHorizontal className="size-4 text-muted-foreground" /></div>
    </aside>
  )
}

function UploadBox() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [fileName, setFileName] = useState('')
  const processFile = (file?: File) => { if (!file) return; setFileName(file.name); setState('processing'); window.setTimeout(() => setState('success'), 1500) }
  return <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-4 flex items-start justify-between gap-4"><div><h2 className="font-semibold tracking-tight">Submit an invoice</h2><p className="mt-1 text-sm text-muted-foreground">Upload any Word, Excel, or PDF invoice. We&apos;ll do the rest.</p></div><div className="hidden rounded-lg bg-muted p-2 sm:block"><FileUp className="size-5 text-muted-foreground" /></div></div>
    <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); processFile(e.dataTransfer.files?.[0]) }} className="group flex min-h-[184px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/70 px-6 text-center transition-colors hover:border-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <input ref={inputRef} type="file" className="hidden" accept=".doc,.docx,.xls,.xlsx,.pdf" onChange={(e) => processFile(e.target.files?.[0])} />
      {state === 'idle' && <><div className="mb-3 flex size-11 items-center justify-center rounded-full bg-card shadow-sm"><UploadCloud className="size-5 text-muted-foreground" /></div><span className="text-sm font-semibold">Drop your invoice here</span><span className="mt-1 text-xs text-muted-foreground">or click to browse · DOCX, XLSX, PDF up to 10MB</span></>}
      {state === 'processing' && <><div className="mb-3 flex size-11 items-center justify-center rounded-full bg-amber-100"><Clock3 className="size-5 animate-spin text-amber-700" /></div><span className="text-sm font-semibold">Converting to PDF &amp; validating...</span><span className="mt-1 text-xs text-muted-foreground">Checking supplier, totals, and purchase order details</span></>}
      {state === 'success' && <><div className="mb-3 flex size-11 items-center justify-center rounded-full bg-emerald-100"><Check className="size-5 text-emerald-700" /></div><span className="text-sm font-semibold text-emerald-800">Invoice ready for review</span><span className="mt-1 text-xs text-muted-foreground">{fileName} · Converted and validated successfully</span></>}
    </button>
  </div>
}

function Stepper({ current = 2 }: { current?: number }) { return <div className="flex items-start"><div className="flex w-full items-start">{stages.map((stage, i) => <div key={stage} className="flex flex-1 items-start last:flex-none"><div className="flex flex-col items-center"><div className={`flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold ${i <= current ? 'border-primary bg-primary text-primary-foreground' : 'border-slate-200 bg-card text-slate-400'}`}>{i < current ? <Check className="size-4" /> : i + 1}</div><span className={`mt-2 whitespace-nowrap text-[11px] font-medium ${i <= current ? 'text-foreground' : 'text-muted-foreground'}`}>{stage}</span></div>{i < stages.length - 1 && <div className={`mt-4 h-0.5 w-full min-w-5 ${i < current ? 'bg-primary' : 'bg-slate-200'}`} />}</div>)}</div></div> }

function VendorView() {
  const [nudged, setNudged] = useState<Record<string, 'loading' | 'sent'>>({})
  const nudge = (id: string) => { setNudged((s) => ({ ...s, [id]: 'loading' })); window.setTimeout(() => setNudged((s) => ({ ...s, [id]: 'sent' })), 900) }
  return <>
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Vendor portal</p><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Good morning, Northstar Scientific</h1><p className="mt-2 text-sm text-muted-foreground">Submit invoices, check payment status, and keep things moving.</p></div><Button variant="outline" className="w-fit gap-2"><CircleHelp className="size-4" /> Help centre</Button></header>
    <div className="grid gap-5 xl:grid-cols-[1.02fr_.98fr]"><UploadBox /><div className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold tracking-tight">Invoice status</h2><p className="mt-1 text-sm text-muted-foreground">INV-10482 · £12,480.00</p></div><StatusPill tone="amber">Pending approval</StatusPill></div><Stepper current={2} /><div className="mt-7 rounded-lg border border-amber-200 bg-amber-50/70 p-3.5"><div className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-amber-700" /><div><p className="text-sm font-semibold text-amber-900">Waiting for approver action</p><p className="mt-1 text-xs leading-5 text-amber-800">Your invoice has passed validation and is queued for approval by the department budget holder.</p></div></div></div></div></div>
    <section className="mt-8"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-semibold tracking-tight">Recent invoices</h2><p className="mt-1 text-sm text-muted-foreground">A clear view of your payment pipeline.</p></div><button className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">View all <ArrowRight className="ml-1 inline size-3.5" /></button></div><div className="grid gap-3 xl:grid-cols-3">{[{id:'INV-10482', desc:'Lab equipment and supplies', amount:'£12,480.00', status:'Pending approval', tone:'amber' as const, action:'nudge'}, {id:'INV-10451', desc:'Research consumables', amount:'£3,240.00', status:'Paid · 12 Sep', tone:'green' as const, action:'paid'}, {id:'INV-10438', desc:'Annual calibration service', amount:'£890.00', status:'Vendor mismatch', tone:'red' as const, action:'error'}].map((item) => <div key={item.id} className="rounded-xl border border-border bg-card p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-muted"><FileCheck2 className="size-4 text-muted-foreground" /></div><div><p className="text-sm font-semibold">{item.id}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div></div><StatusPill tone={item.tone}>{item.status}</StatusPill></div><div className="mt-5 flex items-center justify-between border-t border-border pt-3"><span className="text-sm font-semibold">{item.amount}</span>{item.action === 'nudge' ? <Button size="sm" variant="outline" onClick={() => nudge(item.id)} disabled={!!nudged[item.id]}>{nudged[item.id] === 'loading' ? 'Sending...' : nudged[item.id] === 'sent' ? <><Check className="size-3.5 text-emerald-600" /> Reminder sent</> : <><Bell className="size-3.5" /> Help / Nudge approver</>}</Button> : item.action === 'error' ? <span className="flex items-center gap-1 text-xs font-semibold text-red-700"><AlertTriangle className="size-3.5" /> Action required</span> : <span className="text-xs font-medium text-muted-foreground">Payment complete</span>}</div></div>)}</div></section>
    <div className="mt-8 grid gap-4 md:grid-cols-2"><div className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card"><Search className="size-4 text-muted-foreground" /></div><div><p className="text-sm font-semibold">No other pending invoices</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Everything else is moving through the workflow as expected.</p></div></div><div className="flex items-center gap-4 rounded-xl border border-red-200 bg-red-50/60 p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100"><X className="size-4 text-red-700" /></div><div><p className="text-sm font-semibold text-red-900">Vendor mismatch</p><p className="mt-1 text-xs leading-5 text-red-800">INV-10438 needs an updated bank verification before payment can proceed.</p></div></div></div>
  </>
}

function TwoFactor({ onUnlock }: { onUnlock: () => void }) { const [code, setCode] = useState(''); const valid = code.length === 6; return <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"><div className="w-full max-w-[410px] rounded-2xl border border-border bg-card p-7 shadow-2xl"><div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><LockKeyhole className="size-5" /></div><h2 className="mt-5 text-xl font-semibold tracking-tight">Secure sign in</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Finance Manager access requires two-factor authentication. Enter the 6-digit code from your authenticator app.</p><label className="mt-6 block text-xs font-semibold text-foreground" htmlFor="otp">Verification code</label><input id="otp" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" className="mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 text-center text-lg tracking-[0.45em] outline-none ring-offset-background placeholder:tracking-normal focus-visible:ring-2 focus-visible:ring-ring" /><Button className="mt-5 h-10 w-full" disabled={!valid} onClick={onUnlock}><Fingerprint className="size-4" /> Verify &amp; continue</Button><p className="mt-4 text-center text-xs text-muted-foreground">Demo mode: enter any 6 digits</p></div></div> }

function FinanceView() {
  const [unlocked, setUnlocked] = useState(false)
  const [grv, setGrv] = useState<Record<string, 'loading' | 'sent'>>({})
  const request = (id: string) => { setGrv((s) => ({ ...s, [id]: 'loading' })); window.setTimeout(() => setGrv((s) => ({ ...s, [id]: 'sent' })), 900) }
  return <>{!unlocked && <TwoFactor onUnlock={() => setUnlocked(true)} />}<header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Finance manager</p><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Procurement control centre</h1><p className="mt-2 text-sm text-muted-foreground">Review exceptions, clear bottlenecks, and keep payments on track.</p></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Notifications"><Bell className="size-4" /></Button><Button className="gap-2"><Sparkles className="size-4" /> Run smart review</Button></div></header>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[['Pending invoices','24','Needs attention','amber'],['Due this week','£48,920','Across 9 invoices','slate'],['Avg. approval time','2.4 days','18% faster than last month','green'],['Exception rate','8.3%','4 invoices flagged','red']].map(([label,value,detail,tone]) => <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">{label}</p><span className={`size-2 rounded-full ${tone === 'amber' ? 'bg-amber-500' : tone === 'green' ? 'bg-emerald-500' : tone === 'red' ? 'bg-red-500' : 'bg-slate-300'}`} /></div><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p><p className={`mt-1 text-xs ${tone === 'green' ? 'text-emerald-700' : tone === 'red' ? 'text-red-700' : 'text-muted-foreground'}`}>{detail}</p></div>)}</div>
    <section className="mt-8 rounded-xl border border-border bg-card shadow-sm"><div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold tracking-tight">Smart exception queue</h2><p className="mt-1 text-sm text-muted-foreground">Prioritised by risk, value, and time in queue.</p></div><div className="flex gap-2"><Button variant="outline" size="sm"><span className="size-2 rounded-full bg-amber-500" /> Exceptions (4) <ChevronDown className="size-3.5" /></Button><Button variant="outline" size="sm" className="hidden sm:inline-flex"><Search className="size-3.5" /> Search</Button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted/50 text-xs text-muted-foreground"><tr><th className="px-5 py-3 font-medium">Invoice</th><th className="px-5 py-3 font-medium">Vendor</th><th className="px-5 py-3 font-medium">Submitted</th><th className="px-5 py-3 font-medium">Amount</th><th className="px-5 py-3 font-medium">Exception</th><th className="px-5 py-3 text-right font-medium">Action</th></tr></thead><tbody className="divide-y divide-border">{invoices.map((invoice) => <tr key={invoice.id} className="hover:bg-muted/30"><td className="px-5 py-4 font-semibold">{invoice.id}<div className="mt-1"><StatusPill tone={invoice.tone === 'red' ? 'red' : invoice.status === 'Awaiting GRV' ? 'slate' : 'amber'}>{invoice.status}</StatusPill></div></td><td className="px-5 py-4">{invoice.vendor}</td><td className="px-5 py-4 text-muted-foreground">{invoice.date}</td><td className="px-5 py-4 font-semibold">{invoice.amount}</td><td className="px-5 py-4"><span className={`flex items-center gap-2 text-xs font-semibold ${invoice.tone === 'red' ? 'text-red-700' : invoice.tone === 'amber' ? 'text-amber-700' : 'text-muted-foreground'}`}><AlertTriangle className="size-3.5" /> {invoice.issue}</span></td><td className="px-5 py-4 text-right">{invoice.issue === 'Goods not receipted' ? <Button size="sm" variant="outline" onClick={() => request(invoice.id)} disabled={!!grv[invoice.id]}>{grv[invoice.id] === 'loading' ? 'Requesting...' : grv[invoice.id] === 'sent' ? <><Check className="size-3.5 text-emerald-600" /> GRV requested</> : <><PackageCheck className="size-3.5" /> Request GRV approval</>}</Button> : <Button size="sm" variant="ghost">Review <ArrowRight className="size-3.5" /></Button>}</td></tr>)}</tbody></table></div><div className="flex items-center justify-between border-t border-border px-5 py-3"><p className="text-xs text-muted-foreground">Showing 4 of 24 pending invoices</p><button className="text-xs font-semibold underline-offset-4 hover:underline">View all invoices <ArrowRight className="ml-1 inline size-3" /></button></div></section>
    <div className="mt-5 flex items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card"><CheckCircle2 className="size-5 text-emerald-600" /></div><div><p className="text-sm font-semibold">No other high-risk exceptions</p><p className="mt-1 text-xs text-muted-foreground">The smart review queue is keeping your team focused on what needs human judgement.</p></div></div></>
}

export default function Page() {
  const [view, setView] = useState<View>('vendor')
  return <div className="min-h-screen bg-background text-foreground"><div className="flex min-h-screen"><Sidebar view={view} onChange={setView} /><div className="min-w-0 flex-1"><div className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-8"><div className="flex items-center gap-3 lg:hidden"><button className="rounded-md p-2 hover:bg-muted" aria-label="Open navigation"><Menu className="size-5" /></button><div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Receipt className="size-4" /></div><span className="text-sm font-semibold">ProcureFlow</span></div><div className="hidden text-xs font-medium text-muted-foreground lg:block">University of Cape Town, South Africa <span className="mx-2 text-border">/</span> Procurement workspace</div><div className="flex items-center gap-3"><div className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/50 p-1 sm:flex"><button onClick={() => setView('vendor')} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${view === 'vendor' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>Vendor portal</button><button onClick={() => setView('finance')} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${view === 'finance' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>Finance manager</button></div><div className="flex size-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">JM</div></div></div><main className="mx-auto max-w-[1360px] px-4 py-7 sm:px-8 sm:py-9">{view === 'vendor' ? <VendorView /> : <FinanceView />}</main></div></div></div>
}
