'use client'

import { useState } from 'react'
import { Plus, X, Edit2, Award, Building2, Calendar, Star } from 'lucide-react'
import { ProfileExperience } from '../types'

interface ExperienceEditorProps {
  experience: ProfileExperience[]
  onUpdate: (experience: ProfileExperience[]) => void
}

export default function ExperienceEditor({ experience, onUpdate }: ExperienceEditorProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    description: '',
    duration: ''
  })

  const resetForm = () => {
    setFormData({
      role: '',
      company: '',
      description: '',
      duration: ''
    })
    setIsAdding(false)
    setEditingIndex(null)
  }

  const handleSave = () => {
    if (formData.role.trim() && formData.company.trim() && formData.description.trim() && formData.duration.trim()) {
      const newExperience: ProfileExperience = {
        role: formData.role.trim(),
        company: formData.company.trim(),
        description: formData.description.trim(),
        duration: formData.duration.trim()
      }

      if (editingIndex !== null) {
        // Update existing experience
        const updatedExperience = [...experience]
        updatedExperience[editingIndex] = newExperience
        onUpdate(updatedExperience)
      } else {
        // Add new experience
        onUpdate([...experience, newExperience])
      }
      resetForm()
    }
  }

  const handleEdit = (index: number) => {
    const exp = experience[index]
    setFormData({
      role: exp.role,
      company: exp.company,
      description: exp.description,
      duration: exp.duration
    })
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleDelete = (index: number) => {
    onUpdate(experience.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-green-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Work Experience ({experience.length})</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-6 rounded-2xl mb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Role/Position</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Google"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., 6 months, Jan 2023 - Present"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your responsibilities and achievements"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!formData.role.trim() || !formData.company.trim() || !formData.description.trim() || !formData.duration.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {editingIndex !== null ? 'Update' : 'Add'} Experience
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <Star className="w-5 h-5 text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                </div>
                <div className="flex items-center mb-3">
                  <Building2 className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-blue-300 font-medium">{exp.company}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-purple-300 text-sm">{exp.duration}</span>
                </div>
                <p className="text-white/80">{exp.description}</p>
              </div>
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {experience.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg mb-2">No work experience added yet</p>
            <p className="text-white/50 text-sm">Click "Add Experience" to showcase your professional journey!</p>
          </div>
        )}
      </div>
    </div>
  )
}
