import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Palette,
  Type,
  Download,
  Heading1,
  Heading2,
  Heading3,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useState, useCallback } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface RichTextEditorProps {
  content?: string
  onUpdate?: (content: string) => void
  title?: string
  className?: string
}

const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat'
]

const fontSizes = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px'
]

const textFormats = [
  { label: 'Body', value: 'paragraph', icon: null },
  { label: 'Title', value: 'heading', level: 1, icon: Heading1 },
  { label: 'Heading', value: 'heading', level: 2, icon: Heading2 },
  { label: 'Subheading', value: 'heading', level: 3, icon: Heading3 },
]

const colors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000', '#800000'
]

export default function RichTextEditor({ content = '', onUpdate, title = 'Untitled Note', className = '' }: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[400px] p-6 bg-transparent text-white focus:outline-none',
      },
    },
  })

  const setFontFamily = useCallback((fontFamily: string) => {
    if (editor) {
      editor.chain().focus().setFontFamily(fontFamily).run()
    }
  }, [editor])

  const setFontSize = useCallback((fontSize: string) => {
    if (editor) {
      const selection = editor.state.selection
      if (selection.empty) {
        // If no text is selected, set the mark for future typing
        editor.chain().focus().setMark('textStyle', { fontSize }).run()
      } else {
        // If text is selected, apply the font size to the selection
        editor.chain().focus().setMark('textStyle', { fontSize }).run()
      }
    }
  }, [editor])

  const setTextFormat = useCallback((format: any) => {
    if (!editor) return
    
    if (format.value === 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else if (format.value === 'heading') {
      editor.chain().focus().setHeading({ level: format.level }).run()
    }
  }, [editor])

  const getCurrentFormat = useCallback(() => {
    if (!editor) return textFormats[0]
    
    if (editor.isActive('heading', { level: 1 })) {
      return textFormats.find(f => f.level === 1) || textFormats[0]
    } else if (editor.isActive('heading', { level: 2 })) {
      return textFormats.find(f => f.level === 2) || textFormats[0]
    } else if (editor.isActive('heading', { level: 3 })) {
      return textFormats.find(f => f.level === 3) || textFormats[0]
    }
    
    return textFormats[0] // Body/paragraph
  }, [editor])

  const setColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run()
    }
  }, [editor])

  const setHighlight = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setHighlight({ color }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }
      setLinkUrl('')
      setLinkText('')
      setIsLinkDialogOpen(false)
    }
  }, [editor, linkUrl, linkText])

  const exportToPDF = useCallback(async () => {
    if (!editor) return

    const editorElement = document.querySelector('.ProseMirror')
    if (!editorElement) return

    try {
      const canvas = await html2canvas(editorElement as HTMLElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add title
      pdf.setFontSize(16)
      pdf.setTextColor(0, 0, 0)
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.text(title, 20, 20)

      // Add content
      pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.setFillColor(255, 255, 255)
        pdf.rect(0, 0, 210, 297, 'F')
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${title}.pdf`)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
    }
  }, [editor, title])

  if (!editor) {
    return null
  }

  return (
    <div className={`glassmorphism-strong rounded-xl overflow-hidden shadow-xl ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-warm-400/20 p-4 space-y-3">
        {/* First Row - Basic Formatting */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <Bold className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <Italic className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-warm-400/30 mx-2" />

          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <List className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-warm-400/30 mx-2" />

          <Button
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className="p-2 hover:bg-warm-200/50"
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-warm-400/30 mx-2" />

          <Popover open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={editor.isActive('link') ? 'default' : 'ghost'}
                size="sm"
                className="p-2 hover:bg-warm-200/50"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 glassmorphism-strong border-warm-400/30">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-warm-800 font-medium">URL</label>
                  <Input
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="text-sm text-warm-800 font-medium">Text (optional)</label>
                  <Input
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Link text"
                    className="form-input"
                  />
                </div>
                <Button onClick={addLink} size="sm" className="w-full">
                  Add Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Second Row - Font and Color Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select onValueChange={(value) => {
            const format = textFormats.find(f => f.label === value)
            if (format) setTextFormat(format)
          }}>
            <SelectTrigger className="w-36 form-input border-2 hover:border-warm-500/60">
              <SelectValue placeholder={getCurrentFormat().label} />
            </SelectTrigger>
            <SelectContent className="glassmorphism-strong border-warm-400/30">
              {textFormats.map((format) => (
                <SelectItem key={format.label} value={format.label} className="text-warm-800 hover:bg-warm-200/50">
                  <div className="flex items-center">
                    {format.icon && <format.icon className="w-4 h-4 mr-2" />}
                    {format.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFontFamily}>
            <SelectTrigger className="w-40 form-input border-2 hover:border-warm-500/60">
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent className="glassmorphism-strong border-warm-400/30">
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font} className="text-warm-800 hover:bg-warm-200/50">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFontSize}>
            <SelectTrigger className="w-20 form-input border-2 hover:border-warm-500/60">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="glassmorphism-strong border-warm-400/30">
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size} className="text-warm-800 hover:bg-warm-200/50">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 border-2 border-warm-400/40 hover:border-warm-500/60 bg-warm-200/20">
                <Palette className="w-4 h-4" />
                <span className="ml-2 text-sm">Text Color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 glassmorphism-strong border-warm-400/30">
              <div className="grid grid-cols-8 gap-1 p-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColor(color)}
                    className="w-6 h-6 rounded border border-warm-400/30 hover:scale-110 transition-transform shadow-soft"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 border-2 border-warm-400/40 hover:border-warm-500/60 bg-warm-200/20">
                <Palette className="w-4 h-4" />
                <span className="ml-2 text-sm">Highlight</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 glassmorphism-strong border-warm-400/30">
              <div className="grid grid-cols-8 gap-1 p-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setHighlight(color)}
                    className="w-6 h-6 rounded border border-warm-400/30 hover:scale-110 transition-transform shadow-soft"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="ml-auto">
            <Button
              onClick={exportToPDF}
              className="glassmorphism-button border-2 border-transparent hover:border-warm-500/40"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] bg-warm-50 p-4 rounded-lg">
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .ProseMirror {
          outline: none;
          color: hsl(var(--text-primary));
        }
        
        .ProseMirror ul.tiptap-bullet-list {
          list-style-type: disc;
          margin-left: 1.5rem;
          padding-left: 0;
        }
        
        .ProseMirror ol.tiptap-ordered-list {
          list-style-type: decimal;
          margin-left: 1.5rem;
          padding-left: 0;
        }
        
        .ProseMirror li {
          margin: 0.5rem 0;
        }
        
        .ProseMirror a {
          color: hsl(var(--accent-brown));
          text-decoration: underline;
        }
        
        .ProseMirror a:hover {
          color: hsl(var(--accent-gold));
        }
        
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        .ProseMirror p {
          margin: 0.5rem 0;
        }
        
        .ProseMirror strong {
          font-weight: bold;
          color: hsl(var(--accent-brown));
        }
        
        .ProseMirror em {
          font-style: italic;
        }
        
        .ProseMirror u {
          text-decoration: underline;
        }
        
        .ProseMirror span[style*="font-size"] {
          display: inline !important;
        }
      `}</style>
    </div>
  )
}