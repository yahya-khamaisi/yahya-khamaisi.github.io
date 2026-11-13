/**
 * Product screens rebuilt from each codebase's own labels and layout, with
 * shadcn components. Every value is a placeholder and is blurred on top of
 * that — no client data comes from the real systems. Screens stay in
 * English, like the apps themselves.
 */
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const R = ({ children }: { children: string }) => <span className="blur-sm select-none">{children}</span>

function Frame({ title, note = 'Internal', label, children }: { title: string; note?: string; label: string; children: ReactNode }) {
  return (
    <Card role="img" aria-label={label} dir="ltr" className="gap-0 py-0 text-left shadow-xl">
      <div className="flex h-8 items-center gap-2 border-b bg-muted px-3 text-xs text-muted-foreground">
        <span className="font-mono">{title}</span>
        <span className="ml-auto">{note}</span>
      </div>
      {children}
    </Card>
  )
}

function Side({ items, on }: { items: string[]; on: string }) {
  return (
    <div className="flex flex-col gap-1 border-r bg-muted/50 p-2 max-sm:hidden">
      {items.map((item) => (
        <Button key={item} variant={item === on ? 'default' : 'ghost'} size="sm" className="justify-start" tabIndex={-1}>
          {item}
        </Button>
      ))}
    </div>
  )
}

export function PortalScreen() {
  return (
    <Frame title="TE AI Portal · Group underwriting" label="TE AI Portal assessments screen with the agent chain">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <Side items={['Ask', 'Groups', 'Assessments', 'History']} on="Assessments" />
        <div className="flex min-w-0 flex-col gap-3 p-4 text-xs sm:col-span-3">
          <div className="flex items-center gap-2">
            <b className="text-sm">Underwriting workflow agents</b>
            <span className="ml-auto font-semibold text-chart-3">Done</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['Intake', 'Claims review', 'Medical findings', 'Diagnosis coding', 'Conclusion', 'Report'].map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Policy number</TableHead>
                <TableHead>Employer name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><R>P-00000000</R></TableCell>
                <TableCell><R>Employer Name LLC</R></TableCell>
                <TableCell className="text-chart-3">Ready</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><R>P-00000000</R></TableCell>
                <TableCell><R>Company Trading</R></TableCell>
                <TableCell className="text-muted-foreground">Reviewed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Card size="sm" className="gap-1.5 px-3">
            <b>Ask about this report</b>
            <span className="text-muted-foreground"><R>Three diagnosis groups account for most claims across members in this policy.</R></span>
            <Badge variant="secondary">Sources · 3</Badge>
          </Card>
        </div>
      </div>
    </Frame>
  )
}

export function AskScreen() {
  const source = (name: string, hint: string) => (
    <Card size="sm" className="gap-1 px-3">
      <b className="text-xs"><R>{name}</R></b>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </Card>
  )
  return (
    <Frame title="TE AI Portal · Individual underwriting · Ask" note="Internal · rebuilt from source" label="TE AI Portal Ask screen with threads, a cited answer and its sources">
      <div className="grid min-h-96 grid-cols-1 text-sm md:grid-cols-5">
        <div className="flex flex-col gap-1 border-r bg-muted/50 p-3 max-md:hidden">
          <Button size="sm" tabIndex={-1}>New thread</Button>
          <span className="px-2 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">Threads</span>
          <Button variant="secondary" size="sm" className="justify-start" tabIndex={-1}><R>Policy review</R></Button>
          <Button variant="ghost" size="sm" className="justify-start" tabIndex={-1}><R>Renewal question</R></Button>
          <Button variant="ghost" size="sm" className="justify-start" tabIndex={-1}><R>Claims summary</R></Button>
        </div>
        <div className="flex min-w-0 flex-col gap-3 p-5 md:col-span-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary">Report · <R>Assessment title</R></Badge>
            <Badge variant="outline">Clear selection</Badge>
          </div>
          <span className="max-w-xs self-end rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-primary-foreground">What are the key risks?</span>
          <div className="flex max-w-md flex-col gap-2 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3">
            <R>The assessment flags three risk areas for this member, each linked to findings in the uploaded medical documents and the claims history.</R>
            <R>A chronic condition noted in two reports, recent claims above the group average, and one pending diagnosis.</R>
          </div>
          <span className="text-xs text-muted-foreground">Responded in 6.2s · Helpful · Not helpful</span>
          <div className="mt-auto flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-muted-foreground">
            <span className="grow">Ask about this report…</span>
            <Button size="sm" tabIndex={-1}>Send</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 border-l p-4 max-md:hidden">
          <b>Sources</b>
          <span className="text-xs text-muted-foreground">What this answer read from</span>
          {source('medical_report.pdf', 'Open page 3')}
          {source('claims_history.xlsx', 'Open page 1')}
          {source('Assessment report', 'Saved assessment')}
        </div>
      </div>
    </Frame>
  )
}

export function ClaimsScreen() {
  const kpi = (label: string, value: string) => (
    <Card size="sm" className="gap-1 px-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <b className="text-lg whitespace-nowrap blur-sm select-none">{value}</b>
    </Card>
  )
  return (
    <Frame title="Claims Portal · Finance" label="Claims Portal finance dashboard">
      <div className="flex flex-col gap-3 bg-muted/50 p-4 text-xs">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kpi('Submitted', '1,240')}
          {kpi('Accepted', '1,108')}
          {kpi('Failed', '32')}
          {kpi('Amount paid', 'AED 00,000')}
        </div>
        <Card size="sm" className="gap-2 px-3">
          <b>Batches by status</b>
          {[['Paid', 46], ['Processed', 24], ['Uploaded', 18], ['Needs attention', 12]].map(([label, value]) => (
            <div key={label} className="grid grid-cols-3 items-center gap-2">
              <span className="text-muted-foreground">{label}</span>
              <Progress value={Number(value) * 2} className="col-span-2" />
            </div>
          ))}
        </Card>
        <Card size="sm" className="py-0">
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>Batch ref</TableHead>
                <TableHead>TPA</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><R>BR-0000</R></TableCell>
                <TableCell><R>TPA Name</R></TableCell>
                <TableCell><R>AED 00,000</R></TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><R>BR-0000</R></TableCell>
                <TableCell><R>TPA Name</R></TableCell>
                <TableCell><R>AED 00,000</R></TableCell>
                <TableCell className="text-destructive">Past target</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </Frame>
  )
}

export function VoucherScreen() {
  const rows: [string, string][] = [['Voucher title here', 'Gift'], ['Another voucher', 'Campaign'], ['Voucher title', 'Bundle']]
  return (
    <Frame title="Admin Portal · Voucher Dashboard" label="Voucher Dashboard table in the admin portal">
      <div className="flex flex-col gap-3 p-4 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button size="sm" tabIndex={-1}>Voucher</Button>
          <Button size="sm" variant="secondary" tabIndex={-1}>Merchant</Button>
          <Button size="sm" variant="secondary" tabIndex={-1}>Campaign</Button>
          <Button size="sm" className="ml-auto" tabIndex={-1}>New Voucher Creation</Button>
        </div>
        <Separator />
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              {['Voucher ID', 'Voucher title', 'Merchant', 'Type', 'Used', 'Expiry'].map((h) => (
                <TableHead key={h} className="uppercase">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(([title, type], i) => (
              <TableRow key={title} className={cn('animate-in fade-in slide-in-from-bottom-1 fill-mode-both', ['delay-150', 'delay-300', 'delay-500'][i])}>
                <TableCell><R>V00000</R></TableCell>
                <TableCell><R>{title}</R></TableCell>
                <TableCell><R>Merchant</R></TableCell>
                <TableCell>{type}</TableCell>
                <TableCell><R>000</R></TableCell>
                <TableCell><R>00/00/26</R></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Frame>
  )
}
