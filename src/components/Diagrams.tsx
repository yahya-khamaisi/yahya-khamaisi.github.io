/**
 * Simplified redraws of company architecture diagrams. The originals name
 * internal endpoints, model IDs and systems, so these keep only the shape.
 */
import type { ReactNode } from 'react'
import { ArrowRight, ArrowRightLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/** One box in a diagram; `hl` outlines the step that matters. */
function Box({ children, note, hl, className }: { children: ReactNode; note?: string; hl?: boolean; className?: string }) {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center rounded-lg border bg-muted px-2 py-2 text-center text-xs font-semibold', hl && 'border-chart-2', className)}>
      {children}
      {note && <small className="font-normal text-muted-foreground">{note}</small>}
    </div>
  )
}

/** Arrows point with the reading direction, so they flip in Arabic. */
function Arrow({ both, className }: { both?: boolean; className?: string }) {
  const Icon = both ? ArrowRightLeft : ArrowRight
  return <Icon aria-hidden="true" className={cn('size-3.5 self-center justify-self-center text-muted-foreground rtl:-scale-x-100', className)} />
}

export function OcrFlow() {
  return (
    <div role="img" aria-label="OCR flow: upload, classify, route to one of four layouts, one JSON schema" className="flex flex-col gap-1.5">
      <div className="flex items-stretch gap-1.5">
        <Box>Upload</Box>
        <Arrow />
        <Box>Classify</Box>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <Box>A</Box>
        <Box>B</Box>
        <Box>C</Box>
        <Box note="RTL">D</Box>
      </div>
      <Box hl>One JSON schema</Box>
    </div>
  )
}

export function ChatbotFlow() {
  const row = 'flex items-stretch gap-1.5'
  return (
    <div role="img" aria-label="Serverless RAG flow: PDFs to vectors, chat to Lambda to LLM" className="flex flex-col gap-1.5">
      <div className={row}>
        <Box>PDFs</Box>
        <Arrow />
        <Box>Loader</Box>
        <Arrow />
        <Box>Vectors</Box>
      </div>
      <div className={row}>
        <Box>Chat</Box>
        <Arrow both />
        <Box>Lambda</Box>
        <Arrow />
        <Box hl>LLM</Box>
      </div>
    </div>
  )
}

export function RenewalFlow() {
  const big = 'px-3 py-3 text-sm'
  return (
    <Card
      role="img"
      aria-label="Renewal flow: staff portal or website assistant, guardrails, renewal agent, renewal service and payment"
      className="flex-row items-center gap-3 p-8 max-md:flex-col max-md:items-stretch"
    >
      <div className="flex flex-1 flex-col gap-2.5">
        <Box className={big} note="internal chat">Staff portal</Box>
        <Box className={big} note="for customers">Website assistant</Box>
      </div>
      <Arrow className="max-md:rotate-90" />
      <Box className={big} note="masking · consent">Guardrails</Box>
      <Arrow className="max-md:rotate-90" />
      <Box className={big} note="Azure AI Foundry" hl>Renewal agent</Box>
      <Arrow className="max-md:rotate-90" />
      <div className="flex flex-1 flex-col gap-2.5">
        <Box className={big} note="quote">Renewal service</Box>
        <Box className={big}>Payment</Box>
      </div>
    </Card>
  )
}
