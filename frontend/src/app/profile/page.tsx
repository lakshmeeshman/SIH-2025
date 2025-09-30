'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, UserProfileData } from '../../types'
import { apiClient } from '../../lib/api'
import SkillsEditor from '../../components/SkillsEditor'
import ProjectsEditor from '../../components/ProjectsEditor'
import ExperienceEditor from '../../components/ExperienceEditor'
import toast from 'react-hot-toast'
import { sanitizeData, extractErrorMessage } from '../../lib/errorUtils'
import {
  User as UserIcon,
  Mail,
  Phone,
  Linkedin,
  Github,
  Save,
  ArrowLeft,
  Edit3,
  Sparkles
} from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profileData, setProfileData] = useState<UserProfileData>({})
  const [loading, setLoading] = useState(false) // Start with false
  const [saving, setSaving] = useState(false)
  const router = useRouter()


  const handleProfileUpdate = (updatedData: Partial<UserProfileData>) => {
    const sanitizedData = sanitizeData(updatedData)
    if (sanitizedData) {
      setProfileData(prev => ({ ...prev, ...sanitizedData }))
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await apiClient.users.updateMe({ profile_data: profileData })
      toast.success('Profile updated successfully!')
      
      // Trigger a custom event to notify dashboard of the update
      window.dispatchEvent(new CustomEvent('profileUpdated'))
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error, 'Failed to update profile')
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  // Remove loading check - profile page should work immediately

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-white flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Career Navigator
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Edit Your Profile
          </h1>
          <p className="text-white/80 text-lg">
            Build your professional profile to get better job matches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-6">
                <UserIcon className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-xl font-bold text-white">Basic Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileData.name || ''}
                    onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profileData.phone || ''}
                    onChange={(e) => handleProfileUpdate({ phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-white/90 mb-2">
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                    <input
                      type="url"
                      id="linkedin"
                      value={profileData.linkedin || ''}
                      onChange={(e) => handleProfileUpdate({ linkedin: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-white/90 mb-2">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      id="github"
                      value={profileData.github || ''}
                      onChange={(e) => handleProfileUpdate({ github: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Editor */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <SkillsEditor
                skills={profileData.skills || []}
                onUpdate={(skills) => handleProfileUpdate({ skills })}
              />
            </div>

            {/* Projects Editor */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <ProjectsEditor
                projects={profileData.projects || []}
                onUpdate={(projects) => handleProfileUpdate({ projects })}
              />
            </div>

            {/* Experience Editor */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <ExperienceEditor
                experience={profileData.experience || []}
                onUpdate={(experience) => handleProfileUpdate({ experience })}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>

            {/* Profile Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Profile Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Basic Info</span>
                  <span className="text-white font-bold">
                    {((profileData.name ? 1 : 0) + (profileData.phone ? 1 : 0) + (profileData.linkedin ? 1 : 0) + (profileData.github ? 1 : 0)) / 4 * 100}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Skills</span>
                  <span className="text-white font-bold">{profileData.skills?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Projects</span>
                  <span className="text-white font-bold">{profileData.projects?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Experience</span>
                  <span className="text-white font-bold">{profileData.experience?.length || 0}</span>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Overall Complete</span>
                    <span className="text-green-400 font-bold">
                      {Math.round(((profileData.name ? 1 : 0) + (profileData.phone ? 1 : 0) + (profileData.linkedin ? 1 : 0) + (profileData.github ? 1 : 0) + (profileData.skills?.length ? 1 : 0) + (profileData.projects?.length ? 1 : 0) + (profileData.experience?.length ? 1 : 0)) / 7 * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">💡 Tips</h3>
              <div className="space-y-2 text-sm text-white/80">
                <p>• Add specific skills that match job requirements</p>
                <p>• Include detailed project descriptions</p>
                <p>• Highlight your most relevant experience</p>
                <p>• Keep your LinkedIn and GitHub profiles updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
