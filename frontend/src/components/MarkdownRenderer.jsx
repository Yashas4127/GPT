import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function CodeBlock({ language, children }) {
  const { isDark } = useTheme()
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface-hover px-3 py-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-primary"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
          }}
          codeTagProps={{
            style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

function normalizeContent(content) {
  if (!content) return ''
  if (typeof content !== 'string') return String(content)

  return content
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
}

export default function MarkdownRenderer({ content }) {
  const normalized = normalizeContent(content)

  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (!inline && (match || String(children).includes('\n'))) {
              return <CodeBlock language={language}>{children}</CodeBlock>
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre({ children }) {
            return <>{children}</>
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  )
}
