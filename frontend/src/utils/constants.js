export const AI_MODELS = [
  { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini', description: 'Fast and efficient' },
  { id: 'openai/gpt-4o', label: 'GPT-4o', description: 'Most capable OpenAI model' },
  { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', description: 'Balanced reasoning' },
  { id: 'google/gemini-flash-1.5', label: 'Gemini Flash 1.5', description: 'Quick responses' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B', description: 'Free tier model' },
]

export const DEFAULT_MODEL = AI_MODELS[0].id

export const SUGGESTED_PROMPTS = [
  'Explain quantum computing in simple terms',
  'Write a Python function to merge two sorted lists',
  'Help me draft a professional email',
  'What are best practices for REST API design?',
]

export const APP_NAME = 'Nexus AI'
