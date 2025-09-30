'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '../../types'
import { apiClient } from '../../lib/api'
import toast from 'react-hot-toast'
import { sanitizeData, isValidationError } from '../../lib/errorUtils'
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Code, 
  Briefcase, 
  Award,
  Star,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    // Fetch user data in background - no loading state
    const fetchUser = async () => {
      try {
        const userData = await apiClient.users.getMe()
        const sanitizedUserData = {
          ...userData,
          profile_data: sanitizeData(userData.profile_data || {})
        }
        setUser(sanitizedUserData)
      } catch (error) {
        console.error('Dashboard fetch error:', error)
        // Don't redirect on error, just log it
      }
    }

    fetchUser()

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUser()
    }

    window.addEventListener('profileUpdated', handleProfileUpdate)

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const profileData = user?.profile_data || {}
  
  
  // Ensure all fields are properly typed and not error objects
  const safeProfileData = {
    name: typeof profileData.name === 'string' && !isValidationError(profileData.name) ? profileData.name : '',
    phone: typeof profileData.phone === 'string' && !isValidationError(profileData.phone) ? profileData.phone : '',
    linkedin: typeof profileData.linkedin === 'string' && !isValidationError(profileData.linkedin) ? profileData.linkedin : '',
    github: typeof profileData.github === 'string' && !isValidationError(profileData.github) ? profileData.github : '',
    skills: Array.isArray(profileData.skills) ? profileData.skills.filter(skill => 
      typeof skill === 'string' && !isValidationError(skill)
    ) : [],
    projects: Array.isArray(profileData.projects) ? profileData.projects.filter(project => 
      project && typeof project === 'object' && 
      !isValidationError(project) &&
      typeof project.title === 'string' && 
      typeof project.description === 'string' &&
      Array.isArray(project.technologies)
    ) : [],
    experience: Array.isArray(profileData.experience) ? profileData.experience.filter(exp => 
      exp && typeof exp === 'object' && 
      !isValidationError(exp) &&
      typeof exp.role === 'string' && 
      typeof exp.company === 'string' &&
      typeof exp.description === 'string' &&
      typeof exp.duration === 'string'
    ) : []
  }
  
  const hasProfileData = safeProfileData.name || safeProfileData.phone || safeProfileData.linkedin || safeProfileData.github || safeProfileData.skills?.length || safeProfileData.projects?.length || safeProfileData.experience?.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Career Navigator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Edit Profile
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

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {safeProfileData.name || user?.email?.split('@')[0] || 'Student'}! 👋
          </h1>
          <p className="text-white/80 text-lg">
            Here's your professional profile overview
          </p>
        </div>

        {!hasProfileData ? (
          /* Empty State */
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
            <p className="text-white/80 mb-6">
              Add your skills, projects, and experience to get better job matches and showcase your potential.
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Build Your Profile
            </Link>
          </div>
        ) : (
          /* Profile Overview */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <UserIcon className="w-6 h-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeProfileData.name && (
                    <div className="flex items-center text-white/90">
                      <UserIcon className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="font-medium">{safeProfileData.name}</span>
                    </div>
                  )}
                  {safeProfileData.phone && (
                    <div className="flex items-center text-white/90">
                      <Phone className="w-4 h-4 mr-2 text-green-400" />
                      <span>{safeProfileData.phone}</span>
                    </div>
                  )}
                  {safeProfileData.linkedin && (
                    <div className="flex items-center text-white/90">
                      <Linkedin className="w-4 h-4 mr-2 text-blue-400" />
                      <a 
                        href={safeProfileData.linkedin.startsWith('http') ? safeProfileData.linkedin : `https://${safeProfileData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition-colors flex items-center"
                      >
                        LinkedIn Profile
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {safeProfileData.github && (
                    <div className="flex items-center text-white/90">
                      <Github className="w-4 h-4 mr-2 text-gray-400" />
                      <a 
                        href={safeProfileData.github.startsWith('http') ? safeProfileData.github : `https://${safeProfileData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300 transition-colors flex items-center"
                      >
                        GitHub Profile
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Card */}
              {safeProfileData.skills && safeProfileData.skills.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <Code className="w-6 h-6 text-purple-400 mr-3" />
                    <h2 className="text-xl font-bold text-white">Skills ({safeProfileData.skills.length})</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {safeProfileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Card */}
              {safeProfileData.projects && safeProfileData.projects.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-orange-400 mr-3" />
                    <h2 className="text-xl font-bold text-white">Projects ({safeProfileData.projects.length})</h2>
                  </div>
                  <div className="space-y-4">
                    {safeProfileData.projects.map((project, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-white/80 mb-3">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Card */}
              {safeProfileData.experience && safeProfileData.experience.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-green-400 mr-3" />
                    <h2 className="text-xl font-bold text-white">Work Experience ({safeProfileData.experience.length})</h2>
                  </div>
                  <div className="space-y-4">
                    {safeProfileData.experience.map((exp, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                          <span className="text-white/60 text-sm">{exp.duration}</span>
                        </div>
                        <p className="text-blue-300 font-medium mb-2">{exp.company}</p>
                        <p className="text-white/80">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/profile"
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300">
                    <Briefcase className="w-4 h-4 mr-2" />
                    View Jobs
                  </button>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Profile Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Skills</span>
                    <span className="text-white font-bold">{safeProfileData.skills?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Projects</span>
                    <span className="text-white font-bold">{safeProfileData.projects?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Experience</span>
                    <span className="text-white font-bold">{safeProfileData.experience?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Profile Complete</span>
                    <span className="text-green-400 font-bold">
                      {Math.round(((safeProfileData.name ? 1 : 0) + (safeProfileData.phone ? 1 : 0) + (safeProfileData.linkedin ? 1 : 0) + (safeProfileData.github ? 1 : 0) + (safeProfileData.skills?.length ? 1 : 0) + (safeProfileData.projects?.length ? 1 : 0) + (safeProfileData.experience?.length ? 1 : 0)) / 7 * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
