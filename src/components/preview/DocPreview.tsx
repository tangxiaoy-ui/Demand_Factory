import { useEffect, useState } from 'react'

interface DocPreviewProps {
  content: string
}

export function DocPreview({ content }: DocPreviewProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const convertMarkdownToHtml = (markdown: string): string => {
      let html = markdown
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-0 mb-4">$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 text-gray-700">$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 text-gray-700">$1</li>')
        .replace(/\n/gim, '<br>')

      return html
    }

    setHtml(convertMarkdownToHtml(content))
  }, [content])

  return (
    <div className="h-full overflow-y-auto p-6 hover-scroll">
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}