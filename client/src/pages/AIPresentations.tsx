"use client"
import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react";

import {
  Download,
  RefreshCw,
  FileText,
  Presentation,
  Wand2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Copy,
  Trash2,
  Plus,
} from "lucide-react"
import GlassmorphismButton from "@/components/ui/glassmorphism-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

// New interface for individual elements within a slide, mirroring Flask's JSON
interface SlideElement {
  type: "title" | "text" | "bullet_list" | "image" | "subtitle" // Add "subtitle"
  content?: string // For title, text, subtitle
  items?: string[] // For bullet_list
  position: {
    left: number
    top: number
    width: number
    height: number
  }
  style: {
    font_size: number
    font_weight: "normal" | "bold"
    color: string // Hex color
    alignment: "left" | "center" | "right"
  }
  src?: string // For image
  alt?: string // For image
}

// Updated Slide interface to directly reflect backend JSON structure
interface Slide {
  id: string
  slide_number: number
  layout_type: string
  background: {
    type: "gradient" | "solid"
    gradient?: string // Tailwind gradient classes
    color?: string // Hex color for solid backgrounds
  }
  elements: SlideElement[]
}

const AIPresentations = () => {
  const { toast } = useToast()
  const [presentationId, setPresentationId] = useState<string | null>(null)
  const [presentationTopic, setPresentationTopic] = useState<string>("AI Presentation") // New state for download filename
  const [savedPresentations, setSavedPresentations] = useState<any[]>([]);
  const [isLoadingPresentations, setIsLoadingPresentations] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  // Add state for dialog controls
  const [pendingDeletePresentation, setPendingDeletePresentation] = useState<string | null>(null)
  const [pendingDeleteSlide, setPendingDeleteSlide] = useState<number | null>(null)
  const [isLoadingSlides, setIsLoadingSlides] = useState(false)

  // Background styles array
  const backgroundStyles = [
    {
      name: "Purple Gradient",
      value: "from-purple-600 via-blue-600 to-indigo-700",
      type: "gradient",
    },
    {
      name: "Ocean Gradient",
      value: "from-blue-500 via-teal-500 to-cyan-600",
      type: "gradient",
    },
    {
      name: "Sunset Gradient",
      value: "from-orange-500 via-red-500 to-pink-600",
      type: "gradient",
    },
    {
      name: "Forest Gradient",
      value: "from-green-500 via-emerald-500 to-teal-600",
      type: "gradient",
    },
    {
      name: "Fire Gradient",
      value: "from-red-600 via-orange-500 to-yellow-500",
      type: "gradient",
    },
    {
      name: "Night Gradient",
      value: "from-gray-900 via-purple-900 to-violet-800",
      type: "gradient",
    },
    {
      name: "Aurora Gradient",
      value: "from-green-400 via-blue-500 to-purple-600",
      type: "gradient",
    },
    {
      name: "Space Gradient",
      value: "from-black via-purple-900 to-blue-900",
      type: "gradient",
    },
    { name: "Minimal White", value: "bg-white text-gray-900", type: "solid" },
    {
      name: "Professional Blue",
      value: "bg-blue-900 text-white",
      type: "solid",
    },
    { name: "Dark Mode", value: "bg-gray-900 text-white", type: "solid" },
    { name: "Clean Gray", value: "bg-gray-100 text-gray-900", type: "solid" },
  ];

  const [slides, setSlides] = useState<Slide[]>([
    // Initial dummy slide, will be replaced by AI generated content
    {
      id: "1",
      slide_number: 1,
      layout_type: "title",
      background: { type: "gradient", gradient: "from-purple-600 via-blue-600 to-indigo-700" },
      elements: [
        {
          type: "title",
          content: "Welcome to AI Presentations",
          position: { left: 0, top: 0, width: 0, height: 0 },
          style: { font_size: 40, font_weight: "bold", color: "#FFFFFF", alignment: "center" },
        },
        {
          type: "text",
          content: "Generate stunning slides with AI",
          position: { left: 0, top: 0, width: 0, height: 0 },
          style: { font_size: 20, font_weight: "normal", color: "#FFFFFF", alignment: "center" },
        },
      ],
    },
  ])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generateTopic, setGenerateTopic] = useState("")
  const [slideCount, setSlideCount] = useState(5)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [editorSubtitle, setEditorSubtitle] = useState("") // New state for subtitle

  const currentSlide = slides[currentSlideIndex]

  // Helper to extract title and content for the editor from the elements array
  const getEditorContent = (slide: Slide) => {
    let title = ""
    let subtitle = "" // Initialize subtitle
    let content = ""
    const contentElements: string[] = []

    slide.elements.forEach((el) => {
      if (el.type === "title" && el.content) {
        title = el.content
      } else if (el.type === "subtitle" && el.content) {
        // Extract subtitle
        subtitle = el.content
      } else if (el.type === "text" && el.content) {
        contentElements.push(el.content)
      } else if (el.type === "bullet_list" && el.items) {
        contentElements.push(el.items.map((item) => `• ${item}`).join("\n"))
      }
    })

    content = contentElements.join("\n\n")
    return { title, subtitle, content } // Return subtitle
  }
 
  const { title: editorTitle, subtitle: editorSubtitleValue, content: editorContent } = getEditorContent(currentSlide)

  // Update editorSubtitle state when currentSlide changes
  React.useEffect(() => {
    setEditorSubtitle(editorSubtitleValue)
  }, [editorSubtitleValue])

  // Update slide content and sync with backend
  const updateSlideContent = async (field: "title" | "subtitle" | "content", value: string) => {
    const updatedSlides = slides.map((slide, index) => {
      if (index === currentSlideIndex) {
        const newElements = slide.elements.map((el) => {
          if (field === "title" && el.type === "title") {
            return { ...el, content: value }
          }
          if (field === "subtitle" && el.type === "subtitle") {
            return { ...el, content: value }
          }
          if (field === "content" && (el.type === "text" || el.type === "bullet_list")) {
            if (el.type === "text") {
              return { ...el, content: value }
            } else if (el.type === "bullet_list") {
              return {
                ...el,
                items: value.split("\n").map((item) => (item.startsWith("•") ? item.substring(1).trim() : item.trim())),
              }
            }
          }
          return el
        })

        if (field === "subtitle" && !newElements.some((el) => el.type === "subtitle") && currentSlideIndex === 0) {
          newElements.push({
            type: "subtitle",
            content: value,
            position: { left: 0, top: 0, width: 0, height: 0 },
            style: {
              font_size: 24,
              font_weight: "normal",
              color: "#FFFFFF",
              alignment: "center",
            },
          })
        }

        if (field === "content" && !newElements.some((el) => el.type === "text" || el.type === "bullet_list")) {
          newElements.push({
            type: "text",
            content: value,
            position: { left: 0, top: 0, width: 0, height: 0 },
            style: {
              font_size: 16,
              font_weight: "normal",
              color: "#FFFFFF",
              alignment: "left",
            },
          })
        }

        return { ...slide, elements: newElements }
      }
      return slide
    })

    setSlides(updatedSlides)

    // Save to DB if presentationId exists
    if (presentationId && presentationTopic) {
      debouncedSave(presentationId, presentationTopic, { slides: updatedSlides });
    }
  }

  // Create new presentation
  const createNewPresentation = () => {
    setSlides([
        {
          id: `slide_${Date.now()}`,
        slide_number: 1,
        layout_type: "title",
        background: { type: "gradient", gradient: "from-purple-600 via-blue-600 to-indigo-700" },
        elements: [
          {
            type: "title",
            content: "New Presentation",
            position: { left: 0, top: 0, width: 0, height: 0 },
            style: { font_size: 40, font_weight: "bold", color: "#FFFFFF", alignment: "center" },
          },
        ],
      },
    ])
    setPresentationId(null)
    setCurrentSlideIndex(0)
    }

  // Add new slide
  const addSlide = () => {
    const randomBackground = backgroundStyles[Math.floor(Math.random() * backgroundStyles.length)]
    const newSlide: Slide = {
      id: Date.now().toString(),
      slide_number: slides.length + 1,
      layout_type: "content",
      background:
        randomBackground.type === "gradient"
          ? { type: "gradient", gradient: randomBackground.value }
          : { type: "solid", color: randomBackground.value },
      elements: [
        {
          type: "title",
          content: "New Slide Title",
          position: { left: 0, top: 0, width: 0, height: 0 },
          style: { font_size: 32, font_weight: "bold", color: "#FFFFFF", alignment: "center" },
        },
        {
          type: "text",
          content: "Add your content here...",
          position: { left: 0, top: 0, width: 0, height: 0 },
          style: { font_size: 18, font_weight: "normal", color: "#FFFFFF", alignment: "left" },
        },
      ],
    }
    setSlides((prev) => [...prev, newSlide])
    setCurrentSlideIndex(slides.length)
    toast({
      title: "Slide Added",
      description: "New slide has been created successfully.",
    })
  }

  // Duplicate slide
  const duplicateSlide = (index: number) => {
    const slideToClone = slides[index]
    const newSlide = {
      ...slideToClone,
      id: Date.now().toString(),
      slide_number: slides.length + 1,
      elements: slideToClone.elements.map((el) => ({
        ...el,
        content: el.content ? `${el.content} (Copy)` : el.content,
      })),
    }
    setSlides((prev) => [...prev.slice(0, index + 1), newSlide, ...prev.slice(index + 1)])
    toast({
      title: "Slide Duplicated",
      description: "Slide has been copied successfully.",
    })
  }

  // Generate presentation with AI via Flask backend
  const generatePresentation = async () => {
    if (!generateTopic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your presentation.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const PPT_API_URL = import.meta.env.VITE_PPT_API_URL;
      const createResponse = await fetch(`${PPT_API_URL}/create_presentation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: generateTopic,
          slides: slideCount,
        }),
      })

      if (!createResponse.ok) {
        const errorData = await createResponse.json()
        throw new Error(errorData.error || "Failed to initiate presentation generation.")
      }

      const createData = await createResponse.json()
      console.log("Backend create_presentation response:", createData)

      if (!createData.success || !createData.presentation_id) {
        throw new Error(createData.error || "Backend did not return a valid presentation ID.")
      }

      const newPresentationId = createData.presentation_id
      setPresentationId(newPresentationId)
      setPresentationTopic(createData.topic)

      const getJsonResponse = await fetch(`${PPT_API_URL}/get_presentation_json/${newPresentationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!getJsonResponse.ok) {
        const errorData = await getJsonResponse.json()
        throw new Error(errorData.error || "Failed to retrieve presentation JSON.")
      }

      const getJsonData = await getJsonResponse.json()
      console.log("Backend get_presentation_json response:", getJsonData)

      if (
        !getJsonData.success ||
        !getJsonData.json_data ||
        !Array.isArray(getJsonData.json_data.slides) ||
        getJsonData.json_data.slides.length === 0
      ) {
        throw new Error(getJsonData.error || "Retrieved presentation JSON is empty or malformed.")
      }

      const convertedSlides = getJsonData.json_data.slides.map((slide: any, index: number) => {
        const backgroundStyle = backgroundStyles[index % backgroundStyles.length]
        return {
          ...slide,
          background:
            backgroundStyle.type === "gradient"
              ? { type: "gradient", gradient: backgroundStyle.value }
              : { type: "solid", color: backgroundStyle.value },
          elements: slide.elements.map((el: any) => ({
            ...el,
            style: {
              ...el.style,
              color:
                backgroundStyle.type === "gradient" ||
                backgroundStyle.value.includes("bg-gray-900") ||
                backgroundStyle.value.includes("bg-blue-900")
                  ? "#FFFFFF"
                  : el.style.color,
            },
          })),
        }
      })

      setSlides(convertedSlides)
      setCurrentSlideIndex(0)
      setPresentationId(newPresentationId)
      setPresentationTopic(createData.topic)

      // Immediately save to DB after generation
      if (newPresentationId && createData.topic && getJsonData.json_data) {
        await savePresentation(newPresentationId, createData.topic, getJsonData.json_data);
      }

      toast({
        title: "Presentation Generated",
        description: `Successfully created ${convertedSlides.length} slides about ${createData.topic}.`,
      })
    } catch (error: any) {
      console.error("Error generating presentation:", error)
      toast({
        title: "Generation Failed",
        description: error.message || "There was an error generating your presentation.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setShowGenerateDialog(false)
      setGenerateTopic("")
    }
  }

  // Export presentation via Flask backend
  const exportPresentation = async (format: string) => {
    if (!presentationId) {
      toast({
        title: "No Presentation to Export",
        description: "Please generate a presentation first.",
        variant: "destructive",
      })
      return
    }

    setShowExportDialog(false)
    setIsDownloading(true)

    try {
      const PPT_API_URL = import.meta.env.VITE_PPT_API_URL;
      const response = await fetch(`${PPT_API_URL}/export_ppt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presentationId: presentationId,
          format: format,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to export presentation")
      }

      const blob = await response.blob()
      const sanitizedTopic = presentationTopic.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      const filename = `${sanitizedTopic || "presentation"}.${format}`

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: `${format.toUpperCase()} Download Complete`,
        description: `Your presentation has been downloaded as ${format.toUpperCase()}.`,
      })
    } catch (error: any) {
      console.error("Error exporting presentation:", error)
      toast({
        title: "Download Failed",
        description: error.message || "There was an error downloading your presentation.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Navigation
  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  // Get background classes for slide
  const getSlideBackgroundClasses = (slide: Slide) => {
    if (slide.background.type === "gradient" && slide.background.gradient) {
      return `bg-gradient-to-br ${slide.background.gradient}`
    } else if (slide.background.type === "solid" && slide.background.color) {
      return slide.background.color
    }
    return "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"
  }

  // Render individual slide elements
  const renderSlideElements = (elements: SlideElement[], isFullscreen: boolean, slideNumber: number, slide: Slide) => {
    const textElements = elements.filter(
      (el) => el.type === "title" || el.type === "text" || el.type === "bullet_list" || el.type === "subtitle",
    )
    const imageElements = elements.filter((el) => el.type === "image")

    const isTwoColumnLayout = imageElements.length > 0 && textElements.length > 0

    return (
      <div
        className={`h-full w-full relative flex flex-col justify-center items-center ${
          isTwoColumnLayout ? "md:grid md:grid-cols-2 md:gap-12" : "space-y-6"
        } ${isFullscreen ? "p-16" : "p-8"}`}
      >
        <div
          className={`absolute bottom-4 right-4 text-sm font-bold bg-black/50 px-3 py-1 rounded-full z-10 text-white`}
        >
          {slideNumber}
        </div>

        {isTwoColumnLayout ? (
          <>
            <div className="flex flex-col justify-center space-y-4 md:col-span-1">
              {textElements.map((element, elIndex) => {
                const baseStyle: React.CSSProperties = {
                  fontSize: element.style?.font_size
                    ? `${isFullscreen ? Math.min(element.style.font_size * 1.2, 36) : Math.min(element.style.font_size, 28)}px`
                    : undefined,
                  fontWeight: element.style?.font_weight || undefined,
                  color: element.style?.color || "#FFFFFF",
                  textAlign: element.style?.alignment || "left",
                }

                switch (element.type) {
                  case "title":
                    return (
                      <h1
                        key={elIndex}
                        className={`${isFullscreen ? "text-3xl" : "text-2xl"} font-bold leading-tight mb-4`}
                        style={baseStyle}
                      >
                        {element.content}
                      </h1>
                    )
                  case "subtitle":
                    return (
                      <p
                        key={elIndex}
                        className={`${isFullscreen ? "text-xl" : "text-lg"} leading-tight mb-3`}
                        style={baseStyle}
                      >
                        {element.content}
                      </p>
                    )
                  case "text":
                    return (
                      <p
                        key={elIndex}
                        className={`${isFullscreen ? "text-lg" : "text-base"} leading-relaxed`}
                        style={baseStyle}
                      >
                        {element.content}
                      </p>
                    )
                  case "bullet_list":
                    return (
                      <ul
                        key={elIndex}
                        className={`${isFullscreen ? "text-lg" : "text-base"} leading-relaxed list-disc list-inside text-left space-y-2`}
                        style={baseStyle}
                      >
                        {element.items?.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )
                  default:
                    return null
                }
              })}
            </div>
            <div className="flex items-center justify-center md:col-span-1">
              {imageElements.map((element, elIndex) => (
                <img
                  key={elIndex}
                  src={element.src || "/placeholder.svg"}
                  alt={element.alt || `Slide image ${elIndex + 1}`}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                  style={{
                    maxWidth: isFullscreen ? "85%" : "90%",
                    maxHeight: isFullscreen ? "400px" : "280px",
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          elements.map((element, elIndex) => {
            const baseStyle: React.CSSProperties = {
              fontSize: element.style?.font_size
                ? `${isFullscreen ? Math.min(element.style.font_size * 1.3, 48) : Math.min(element.style.font_size, 32)}px`
                : undefined,
              fontWeight: element.style?.font_weight || undefined,
              color: element.style?.color || "#FFFFFF",
              textAlign: element.style?.alignment || undefined,
            }

            switch (element.type) {
              case "title":
                return (
                  <h1
                    key={elIndex}
                    className={`${isFullscreen ? "text-4xl" : "text-3xl"} font-bold leading-tight mb-6`}
                    style={baseStyle}
                  >
                    {element.content}
                  </h1>
                )
              case "subtitle":
                return (
                  <p
                    key={elIndex}
                    className={`${isFullscreen ? "text-2xl" : "text-xl"} leading-tight mb-4`}
                    style={baseStyle}
                  >
                    {element.content}
                  </p>
                )
              case "text":
                return (
                  <p
                    key={elIndex}
                    className={`${isFullscreen ? "text-xl" : "text-lg"} max-w-4xl mx-auto leading-relaxed mb-4`}
                    style={baseStyle}
                  >
                    {element.content}
                  </p>
                )
              case "bullet_list":
                return (
                  <ul
                    key={elIndex}
                    className={`${isFullscreen ? "text-xl" : "text-lg"} max-w-4xl mx-auto leading-relaxed list-disc list-inside text-left space-y-2 mb-4`}
                    style={baseStyle}
                  >
                    {element.items?.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )
              case "image":
                return (
                  <img
                    key={elIndex}
                    src={element.src || "/placeholder.svg"}
                    alt={element.alt || `Slide image ${elIndex + 1}`}
                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                    style={{
                      maxWidth: isFullscreen ? "70%" : "60%",
                      maxHeight: isFullscreen ? "450px" : "300px",
                      margin: "auto",
                    }}
                  />
                )
              default:
                return null
            }
          })
        )}
      </div>
    )
  }

  // Fetch saved presentations on mount
  useEffect(() => {
    const fetchPresentations = async () => {
      setIsLoadingPresentations(true);
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/presentations`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to fetch presentations');
        const data = await res.json();
        setSavedPresentations(data);
      } catch (e) {
        setSavedPresentations([]);
      } finally {
        setIsLoadingPresentations(false);
      }
    };
    fetchPresentations();
  }, []);

  // Auto-load the most recent saved presentation if available
  useEffect(() => {
    if (!isLoadingPresentations && savedPresentations.length > 0) {
      const mostRecent = savedPresentations[0];
      setSlides(mostRecent.json_data.slides);
      setPresentationId(mostRecent.id);
      setPresentationTopic(mostRecent.topic);
      setCurrentSlideIndex(0);
    }
  }, [isLoadingPresentations, savedPresentations]);

  // Load a saved presentation
  const loadPresentation = async (id: string) => {
    setIsLoadingSlides(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/presentations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch presentation');
      const data = await res.json();
      setSlides(data.json_data.slides);
      setPresentationId(data.id);
      setPresentationTopic(data.topic);
      setCurrentSlideIndex(0);
    } catch (e) {
      // handle error
    } finally {
      setIsLoadingSlides(false);
    }
  };

  // Save a new presentation after generation
  const savePresentation = async (id: string, topic: string, json_data: any) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/presentations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, topic, json_data })
      });
      if (!res.ok) throw new Error('Failed to save presentation');
      const created = await res.json();
      setSavedPresentations(prev => [created, ...prev]);
      toast({ title: 'Presentation Saved', description: 'Presentation saved to your account.' });
    } catch (e) {
      toast({ title: 'Save Failed', description: 'Could not save presentation.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // Update an existing presentation (PUT)
  const updatePresentation = async (id: string, topic: string, json_data: any) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/presentations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topic, json_data })
      });
      if (!res.ok) throw new Error('Failed to update presentation');
      const updated = await res.json();
      setSavedPresentations(prev => prev.map(p => p.id === id ? updated : p));
      toast({ title: 'Saved!', description: 'Presentation updated.' });
    } catch (e) {
      toast({ title: 'Save Failed', description: 'Could not update presentation.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save on edit
  const debouncedSave = (id: string, topic: string, json_data: any) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updatePresentation(id, topic, json_data);
    }, 1000);
  };

  // Delete a presentation
  const deletePresentation = async (id: string) => {
    setIsLoadingPresentations(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/presentations/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to delete presentation');
      setSavedPresentations(prev => prev.filter(p => p.id !== id));
      if (presentationId === id) {
        // If deleted presentation is active, load another or fallback
        const remaining = savedPresentations.filter(p => p.id !== id);
        if (remaining.length > 0) {
          loadPresentation(remaining[0].id);
        } else {
          setSlides([
            {
              id: "1",
              slide_number: 1,
              layout_type: "title",
              background: { type: "gradient", gradient: "from-purple-600 via-blue-600 to-indigo-700" },
              elements: [
                {
                  type: "title",
                  content: "Welcome to AI Presentations",
                  position: { left: 0, top: 0, width: 0, height: 0 },
                  style: { font_size: 40, font_weight: "bold", color: "#FFFFFF", alignment: "center" },
                },
                {
                  type: "text",
                  content: "Generate stunning slides with AI",
                  position: { left: 0, top: 0, width: 0, height: 0 },
                  style: { font_size: 20, font_weight: "normal", color: "#FFFFFF", alignment: "center" },
                },
              ],
            },
          ]);
          setPresentationId(null);
          setPresentationTopic("AI Presentation");
        }
      }
      toast({ title: "Deleted", description: "Presentation deleted." });
    } catch (e) {
      toast({ title: "Delete Failed", description: "Could not delete presentation.", variant: "destructive" });
    } finally {
      setIsLoadingPresentations(false);
      setPendingDeletePresentation(null);
    }
  };

  // --- Slide delete API integration ---
  const deleteSlide = async (index: number) => {
    if (slides.length === 1) {
      toast({
        title: "Cannot Delete",
        description: "You need at least one slide in your presentation.",
        variant: "destructive",
      });
      setPendingDeleteSlide(null);
      return;
    }
    if (!presentationId) {
      // Local only (unsaved presentation)
      setSlides(prev => prev.filter((_, i) => i !== index));
      if (currentSlideIndex >= slides.length - 1) {
        setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
      }
      toast({ title: "Slide Deleted", description: "Slide has been removed from your presentation." });
      setPendingDeleteSlide(null);
      return;
    }
    try {
      const PPT_API_URL = import.meta.env.VITE_PPT_API_URL;
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${PPT_API_URL}/presentations/${presentationId}/slides/${index}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete slide');
      const updated = await res.json();
      setSlides(updated.json_data.slides);
      if (currentSlideIndex >= updated.json_data.slides.length) {
        setCurrentSlideIndex(Math.max(0, updated.json_data.slides.length - 1));
      }
      toast({ title: "Slide Deleted", description: "Slide has been removed from your presentation." });
    } catch (e) {
      toast({ title: "Delete Failed", description: "Could not delete slide.", variant: "destructive" });
    } finally {
      setPendingDeleteSlide(null);
    }
  };

  // --- Keyboard navigation for fullscreen mode ---
  const [showArrowHint, setShowArrowHint] = useState(false);
  useEffect(() => {
    if (isPreviewMode) {
      setShowArrowHint(true);
      const timeout = setTimeout(() => setShowArrowHint(false), 3000);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isPreviewMode, currentSlideIndex, slides.length]);

  // Render loading state while fetching presentations
  if (isLoadingPresentations) {
    return (
      <main className="relative z-10 pt-20 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-white">Loading your presentations…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI Presentations Studio
          </motion.h1>
          <motion.p
            className="text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Create stunning presentations with AI assistance and professional templates
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlassmorphismButton
              onClick={() => setShowExportDialog(true)}
              variant="outline"
              className="px-6 py-3"
              disabled={!presentationId}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </GlassmorphismButton>
            <GlassmorphismButton
              onClick={() => setShowGenerateDialog(true)}
              variant="outline"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-emerald-400 hover:border-emerald-300 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Generate
            </GlassmorphismButton>
          </div>
        </div>

        <AnimatePresence>
          {isPreviewMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black"
            >
              {showArrowHint && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-xl shadow-lg text-lg font-medium z-50"
                >
                  Use ← and → arrow keys to navigate slides
                </motion.div>
              )}
              <div className="w-screen h-screen flex items-center justify-center">
                <div
                  className={`w-full h-full flex flex-col justify-center overflow-hidden ${getSlideBackgroundClasses(currentSlide)}`}
                >
                  {renderSlideElements(currentSlide.elements, true, currentSlide.slide_number, currentSlide)}
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 bg-black/70 backdrop-blur-sm rounded-2xl px-8 py-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="text-white hover:bg-white/20 px-6 py-3 text-lg disabled:opacity-30"
                >
                  <ChevronLeft className="w-6 h-6 mr-2" />
                  Previous
                </Button>
                <div className="flex items-center space-x-4">
                  <span className="text-white bg-white/20 px-6 py-2 rounded-lg text-lg font-medium">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={nextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="text-white hover:bg-white/20 px-6 py-3 text-lg disabled:opacity-30"
                >
                  Next
                  <ChevronRight className="w-6 h-6 ml-2" />
                </Button>
                <div className="border-l border-white/30 pl-6 ml-2">
                  <button
                    onClick={() => setIsPreviewMode(false)}
                    className="text-white hover:bg-white/20 px-6 py-3 text-lg rounded-lg transition-all duration-200 flex items-center"
                  >
                    <Minimize2 className="w-6 h-6 mr-2" />
                    Exit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-white">Your Saved Presentations</h2>
          {isLoadingPresentations ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow animate-pulse">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              ))}
            </div>
          ) : savedPresentations.length === 0 ? (
            <div className="text-gray-400">No saved presentations yet.</div>
          ) : (
            <div className="space-y-3">
              {savedPresentations.map((pres) => (
                <div key={pres.id} className={`flex items-center gap-4 p-4 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow transition-all group ${pres.id === presentationId ? 'ring-2 ring-blue-400 border-blue-500' : ''}`}> 
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {pres.topic?.[0]?.toUpperCase() || 'P'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-semibold text-white">{pres.topic}</div>
                    <div className="text-xs text-gray-400 truncate">{pres.created_at ? new Date(pres.created_at).toLocaleString() : ''}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-blue-100/20 dark:hover:bg-blue-900/20"
                      aria-label="Load presentation"
                      onClick={() => loadPresentation(pres.id)}
                      disabled={pres.id === presentationId || isLoadingSlides}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300"
                          aria-label="Delete presentation"
                          disabled={isLoadingSlides}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Presentation?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete <span className="font-semibold">{pres.topic}</span>? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => { setPendingDeletePresentation(pres.id); deletePresentation(pres.id); }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`grid lg:grid-cols-3 gap-8 ${isPreviewMode ? "hidden" : ""}`}>
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-2xl min-h-[500px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isLoadingSlides ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-1/3 mb-2" />
                  <Skeleton className="h-96 w-full rounded-lg" />
                  <div className="flex space-x-2 mt-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-24 rounded" />)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={prevSlide} disabled={currentSlideIndex === 0}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm text-gray-300">
                        {currentSlideIndex + 1} / {slides.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextSlide}
                        disabled={currentSlideIndex === slides.length - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GlassmorphismButton onClick={() => setIsPreviewMode(true)} variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Fullscreen
                      </GlassmorphismButton>
                    </div>
                  </div>

                  <motion.div
                    className={`w-full rounded-lg border border-white/20 overflow-hidden shadow-xl ${getSlideBackgroundClasses(currentSlide)}`}
                    style={{
                      aspectRatio: "16/9",
                      minHeight: "400px",
                      maxHeight: "500px",
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderSlideElements(currentSlide.elements, false, currentSlide.slide_number, currentSlide)}
                  </motion.div>

                  <div className="flex space-x-2 overflow-x-auto pb-2 mt-4">
                    {slides.map((slide, index) => (
                      <motion.div
                        key={slide.id}
                        className={`relative flex-shrink-0 w-24 h-16 glassmorphism rounded cursor-pointer transition-all group overflow-hidden ${
                          currentSlideIndex === index ? "border-2 border-blue-500" : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setCurrentSlideIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className={`w-full h-full rounded flex items-center justify-center p-1 relative ${getSlideBackgroundClasses(slide)}`}
                        >
                          <span className="text-[8px] font-bold absolute top-0.5 left-0.5 z-10 text-white">
                            {index + 1}
                          </span>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
                            {slide.elements.map((el, elIdx) => {
                              if (el.type === "title" && el.content) {
                                return (
                                  <p key={elIdx} className="text-[6px] font-bold leading-tight truncate w-full text-white">
                                    {el.content}
                                  </p>
                                )
                              }
                              if (el.type === "subtitle" && el.content) {
                                return (
                                  <p key={elIdx} className="text-[5px] leading-tight truncate w-full text-white">
                                    {el.content}
                                  </p>
                                )
                              }
                              if ((el.type === "text" || el.type === "bullet_list") && (el.content || el.items)) {
                                const contentText = el.content || (el.items ? el.items[0] : "")
                                return (
                                  <p key={elIdx} className="text-[4px] truncate w-full text-white">
                                    {contentText}
                                  </p>
                                )
                              }
                              if (el.type === "image" && el.src) {
                                return (
                                  <img
                                    key={elIdx}
                                    src={el.src || "/placeholder.svg"}
                                    alt="thumb"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                  />
                                )
                              }
                              return null
                            })}
                          </div>

                          <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity space-x-0.5 z-20">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 bg-black/50 hover:bg-black/70 text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                duplicateSlide(index)
                              }}
                            >
                              <Copy className="w-2 h-2" />
                            </Button>
                            {slides.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 bg-black/50 hover:bg-black/70 text-red-400 hover:text-red-300"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setPendingDeleteSlide(index)
                                }}
                              >
                                <Trash2 className="w-2 h-2" />
                              </Button>
                            )}
                            <AlertDialog open={pendingDeleteSlide === index} onOpenChange={(open) => { if (!open) setPendingDeleteSlide(null) }}>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Slide?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this slide? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteSlide(index)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      className="flex-shrink-0 w-24 h-16 glassmorphism rounded cursor-pointer flex items-center justify-center hover:bg-white/10 transition-colors"
                      onClick={addSlide}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-xl p-6 space-y-6 border border-white/20 min-h-[300px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isLoadingSlides ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Edit Slide</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={editorTitle}
                        onChange={(e) => updateSlideContent("title", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Subtitle</Label>
                      <Input
                        value={editorSubtitle}
                        onChange={(e) => updateSlideContent("subtitle", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        placeholder="Add a subtitle (for title slide)"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Content</Label>
                      <Textarea
                        value={editorContent}
                        onChange={(e) => updateSlideContent("content", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
                        placeholder="Add your slide content..."
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent className="bg-white/10 backdrop-blur-xl border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Export Presentation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-300">Choose your export format:</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => exportPresentation("pdf")}
                  disabled={isDownloading}
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  <FileText className="w-6 h-6" />
                  <span>{isDownloading ? "Generating..." : "PDF"}</span>
                </Button>
                <Button
                  onClick={() => exportPresentation("pptx")}
                  disabled={isDownloading}
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                >
                  <Presentation className="w-6 h-6" />
                  <span>{isDownloading ? "Generating..." : "PPTX"}</span>
                </Button>
              </div>
              {isDownloading && (
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-400 text-sm">
                    Preparing your presentation for download...
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
          <DialogContent className="bg-white/10 backdrop-blur-xl border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Generate AI Presentation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Topic</Label>
                <Input
                  value={generateTopic}
                  onChange={(e) => setGenerateTopic(e.target.value)}
                  placeholder="e.g., Climate Change, Machine Learning, History of Art..."
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label className="text-white">Number of Slides</Label>
                <Input
                  type="number"
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number.parseInt(e.target.value) || 5)}
                  min="3"
                  max="20"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={generatePresentation}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Presentation
                  </>
                )}
              </Button>
              {isGenerating && (
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Creating your AI-powered presentation...
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}

export default AIPresentations
