const hljs = require('highlight.js')
const markDownIt = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + markDownIt.utils.escapeHtml(str) + '</code></pre>'
  }
})

export default async function markdownToHtml (markdown: any) {
  const renderMarkdown: string = markDownIt.render(markdown)
  return renderMarkdown.replaceAll('<a href', '<a target="_blank" href')
}
