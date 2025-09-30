'use client'

import { useState } from 'react'
import { Plus, X, Edit2, Briefcase, Code2, Star } from 'lucide-react'
import { ProfileProject } from '../types'

interface ProjectsEditorProps {
  projects: ProfileProject[]
  onUpdate: (projects: ProfileProject[]) => void
}

export default function ProjectsEditor({ projects, onUpdate }: ProjectsEditorProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [] as string[]
  })
  const [newTechnology, setNewTechnology] = useState('')

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: []
    })
    setNewTechnology('')
    setIsAdding(false)
    setEditingIndex(null)
  }

  const handleSave = () => {
    if (formData.title.trim() && formData.description.trim()) {
      const newProject: ProfileProject = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: formData.technologies
      }

      if (editingIndex !== null) {
        // Update existing project
        const updatedProjects = [...projects]
        updatedProjects[editingIndex] = newProject
        onUpdate(updatedProjects)
      } else {
        // Add new project
        onUpdate([...projects, newProject])
      }
      resetForm()
    }
  }

  const handleEdit = (index: number) => {
    const project = projects[index]
    setFormData({
      title: project.title,
      description: project.description,
      technologies: [...project.technologies]
    })
    setEditingIndex(index)
    setIsAdding(true)
  }

  const handleDelete = (index: number) => {
    onUpdate(projects.filter((_, i) => i !== index))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Briefcase className="w-6 h-6 text-orange-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-6 rounded-2xl mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter project title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Technologies</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Add technology"
                />
                <button
                  onClick={addTechnology}
                  disabled={!newTechnology.trim() || formData.technologies.includes(newTechnology.trim())}
                  className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  Add
                </button>
              </div>
              
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    >
                      <Code2 className="w-3 h-3 mr-1" />
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!formData.title.trim() || !formData.description.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {editingIndex !== null ? 'Update' : 'Add'} Project
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

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <Star className="w-5 h-5 text-orange-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </div>
                <p className="text-white/80 mb-4">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      >
                        <Code2 className="w-3 h-3 mr-1" />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-lg transition-all duration-300"
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

        {projects.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-lg mb-2">No projects added yet</p>
            <p className="text-white/50 text-sm">Click "Add Project" to showcase your work!</p>
          </div>
        )}
      </div>
    </div>
  )
}
