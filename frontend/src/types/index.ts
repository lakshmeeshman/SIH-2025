export interface ProfileProject {
  title: string
  description: string
  technologies: string[]
}

export interface ProfileExperience {
  role: string
  company: string
  description: string
  duration: string
}

export interface UserProfileData {
  name?: string
  phone?: string
  linkedin?: string
  github?: string
  skills?: string[]
  projects?: ProfileProject[]
  experience?: ProfileExperience[]
}

export interface User {
  id: number
  email: string
  role: string
  profile_data?: UserProfileData
}

export interface UserProfileUpdate {
  profile_data: UserProfileData
}
