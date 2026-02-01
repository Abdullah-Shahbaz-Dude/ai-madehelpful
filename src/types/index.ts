export interface Prompt {
  id: string
  title: string
  description: string
  tool: 'ChatGPT' | 'Midjourney' | 'Claude' | 'Other'
  tags: string[]
}

export interface Tutorial {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
}

export interface Tool {
  id: string
  name: string
  category: string
  iconColor: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'PDF' | 'Template' | 'Blueprint'
  downloadUrl?: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}
