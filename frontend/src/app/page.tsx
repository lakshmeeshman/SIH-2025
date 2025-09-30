'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { sanitizeData, extractErrorMessage } from '../lib/errorUtils'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loginMode, setLoginMode] = useState<'student' | 'admin' | null>(null)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [newStudentPassword, setNewStudentPassword] = useState('')
  const [students, setStudents] = useState<any[]>([])
  const router = useRouter()


  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedRole = localStorage.getItem('userRole')
    if (storedToken && storedRole) {
      setToken(storedToken)
      setUserRole(storedRole)
      if (storedRole === 'admin') {
        setShowAdminPanel(true)
      } else {
        router.push('/dashboard')
      }
    }
  }, [router])

  useEffect(() => {
    if (token && userRole === 'admin' && showAdminPanel) {
      fetchStudents()
    }
  }, [token, userRole, showAdminPanel])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      })
      
      const { access_token } = response.data
      localStorage.setItem('token', access_token)
      setToken(access_token)
      
      // Get user info to determine role
      const userResponse = await axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      
      const userRole = userResponse.data.role
      setUserRole(userRole)
      localStorage.setItem('userRole', userRole)
      
      if (userRole === 'admin') {
        setShowAdminPanel(true)
        toast.success('Admin login successful!')
      } else {
        router.push('/dashboard')
        toast.success('Student login successful!')
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error, 'Login failed. Please try again.')
      toast.error(errorMessage)
    }
  }

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await axios.post('http://localhost:8000/admin/create-student', {
        email: newStudentEmail,
        password: newStudentPassword,
        role: 'student'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      toast.success('Student account created successfully!')
      setNewStudentEmail('')
      setNewStudentPassword('')
      fetchStudents()
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error, 'Failed to create student account.')
      toast.error(errorMessage)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/list-students', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Sanitize the response data to remove any validation error objects
      const sanitizedStudents = response.data.map((student: any) => ({
        ...student,
        // Ensure no error objects are present
        profile_data: sanitizeData(student.profile_data || {})
      }))
      setStudents(sanitizedStudents)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  const handleDeleteStudent = async (studentId: number) => {
    try {
      await axios.delete(`http://localhost:8000/admin/delete-student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Student account deleted successfully!')
      fetchStudents()
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error, 'Failed to delete student account.')
      toast.error(errorMessage)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    setToken(null)
    setUserRole(null)
    setLoginMode(null)
    setShowAdminPanel(false)
    router.push('/')
  }

  if (token && userRole === 'admin' && showAdminPanel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create New Student */}
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Student</h2>
              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="student@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newStudentPassword}
                    onChange={(e) => setNewStudentPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Create Student Account
                </button>
              </form>
            </div>

            {/* Student Management */}
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Management</h2>
              <div className="space-y-4">
                {students.length > 0 ? (
                  <div className="space-y-3">
                    {students.map((student) => (
                      <div key={student.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{student.email}</p>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(student.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">No students found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (token && userRole === 'student') {
    return <div>Redirecting to dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Career Navigator
          </h1>
          <p className="text-xl text-gray-300">AI-Powered Job Matching Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Login */}
          <div className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.083 12.083 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Student Portal</h2>
                <p className="text-gray-300 mb-8">Access your profile and manage your career journey</p>
                
                {loginMode === 'student' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Sign In as Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMode(null)}
                      className="w-full text-gray-300 hover:text-white transition-colors"
                    >
                      Back to Selection
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setLoginMode('student')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Student Login
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Admin Login */}
          <div className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Admin Portal</h2>
                <p className="text-gray-300 mb-8">Manage student accounts and system administration</p>
                
                {loginMode === 'admin' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter admin email"
                      required
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter admin password"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Sign In as Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMode(null)}
                      className="w-full text-gray-300 hover:text-white transition-colors"
                    >
                      Back to Selection
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setLoginMode('admin')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Choose your role to access the appropriate portal
          </p>
        </div>
      </div>
    </div>
  )
}
