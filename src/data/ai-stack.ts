import { Sparkle, FlowArrow, Database, ChatCircleDots, Browser } from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'
export type StackStatus = 'Live' | 'Internal' | 'Beta'
export type StackLogo = { src: string; name: string }
export type StackNode = { id: string; name: string; what: string; stack?: string; status?: StackStatus; Icon: Icon; logos?: StackLogo[]; children?: StackNode[] }
export const aiStack: StackNode = {
 id: 'root', Icon: Sparkle, name: profile.name,
 what: 'CRM systems, connected applications and practical workflow automation.', stack: 'HighLevel · Zapier · Make · n8n',
 children: [
 { id: 'crm', Icon: Database, name: 'CRM pipelines', what: 'Structure lead stages, opportunities and custom fields.', stack: 'HighLevel' },
 { id: 'integrations', Icon: FlowArrow, name: 'App integrations', what: 'Connect business tools through webhooks, APIs and MCP.', stack: 'Zapier · Make · n8n' },
 { id: 'agents', Icon: ChatCircleDots, name: 'AI-assisted workflows', what: 'Configure lead follow-up, research and content tasks.', stack: 'Zapier AI agents · Codex · Claude Code' },
 { id: 'funnels', Icon: Browser, name: 'Funnels & websites', what: 'Build landing pages with lead capture and calendar integration.', stack: 'HighLevel · Lovable' },
 ]
}
