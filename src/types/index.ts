export interface User {
  id: string
  name: string
  mobile?: string
  role: 'user' | 'admin'
  avatar?: string
}

export type RequirementStatus = 'draft' | 'confirmed' | 'submitted' | 'developing' | 'completed' | 'rejected'

export type RequirementType = 'web' | 'mobile' | 'desktop' | 'system' | 'platform' | 'other'

export type IndustryType = 
  | 'finance'
  | 'education'
  | 'logistics'
  | 'retail'
  | 'healthcare'
  | 'manufacturing'
  | 'government'
  | 'internet'
  | 'other'

export interface Requirement {
  id: string
  name: string
  status: RequirementStatus
  type: RequirementType
  industry: IndustryType
  docContent: string
  pptUrl?: string
  prototypeUrl?: string
  codePackageUrl?: string
  manualUrl?: string
  deliveryFilesCount?: number
  createdAt: string
  updatedAt: string
  userId: string
  customer?: string
  submitter?: string
  rejectionReason?: string
}

export interface Case {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  industry: string
  scale: string
  completionDate: string
  isPublished?: boolean
  isRecommended?: boolean
  requirementId?: string
  isAnonymized?: boolean
}

export interface Testimonial {
  id: string
  content: string
  userName: string
  company: string
  position: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatSession {
  id: string
  requirementId?: string
  messages: Message[]
  progress: number
  createdAt: string
  updatedAt: string
  userName?: string
  summary?: string
  artifacts?: Artifact[]
}

export interface Artifact {
  id: string
  type: 'document' | 'prototype' | 'ppt'
  title: string
  url?: string
}

export interface Attachment {
  id: string
  requirementId: string
  fileName: string
  fileUrl: string
  fileType: 'image' | 'pdf' | 'zip' | 'document'
  category: 'meeting_minutes' | 'website_screenshot' | 'vi_spec' | 'other'
  uploadedAt: string
}