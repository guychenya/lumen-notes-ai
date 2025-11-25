import { Note } from '../types';
import { parseMarkdown } from './markdown';

export const exportToHTML = (note: Note) => {
  const html = parseMarkdown(note.content);
  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${note.title || 'Untitled'}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11/styles/github-dark.min.css">
    <style>
        body {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        h1, h2, h3 { color: #10b981; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
        pre { background: #1a1a1a; padding: 16px; border-radius: 8px; overflow-x: auto; }
        pre code { background: transparent; color: #e5e7eb; }
        blockquote { border-left: 4px solid #10b981; padding-left: 16px; color: #666; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background: #f4f4f4; font-weight: 600; }
        img { max-width: 100%; height: auto; border-radius: 8px; }
        .wiki-link { color: #10b981; text-decoration: underline; }
    </style>
</head>
<body>
    <h1>${note.title || 'Untitled'}</h1>
    <p style="color: #999; font-size: 14px;">Exported from Notara • ${new Date(note.updatedAt).toLocaleDateString()}</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    ${html}
</body>
</html>
  `;
  
  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title || 'untitled'}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToDOCX = (note: Note) => {
  // Simple DOCX-like format (actually RTF for simplicity)
  const content = note.content
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
  
  const docContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset='utf-8'><title>${note.title}</title></head>
<body>
<h1>${note.title || 'Untitled'}</h1>
<p style="color: #999;">Exported from Notara • ${new Date(note.updatedAt).toLocaleDateString()}</p>
<hr>
${content}
</body>
</html>
  `;
  
  const blob = new Blob([docContent], { type: 'application/vnd.ms-word' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title || 'untitled'}.doc`;
  a.click();
  URL.revokeObjectURL(url);
};

export const batchExport = (notes: Note[], format: 'html' | 'docx' | 'md') => {
  notes.forEach(note => {
    if (format === 'html') exportToHTML(note);
    else if (format === 'docx') exportToDOCX(note);
    else {
      const blob = new Blob([note.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title || 'untitled'}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  });
};
