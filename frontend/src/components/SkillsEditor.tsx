'use client'

import { useState } from 'react'
import { Plus, X, Code, Star } from 'lucide-react'

interface SkillsEditorProps {
  skills: string[]
  onUpdate: (skills: string[]) => void
}

export default function SkillsEditor({ skills, onUpdate }: SkillsEditorProps) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && skills.length < 20) {
      onUpdate([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Code className="w-6 h-6 text-purple-400 mr-3" />
        <h2 className="text-xl font-bold text-white">Skills ({skills.length})</h2>
      </div>
      <div className="space-y-4">
        {/* Add new skill */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new skill (e.g., JavaScript, Python, React)"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            maxLength={50}
          />
          <button
            onClick={addSkill}
            disabled={!newSkill.trim() || skills.includes(newSkill.trim()) || skills.length >= 20}
            className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Skills list */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                <Star className="w-3 h-3 mr-2" />
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-8">
            <Code className="w-12 h-12 text-white/40 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No skills added yet. Add your first skill above to get started!</p>
          </div>
        )}

        {skills.length >= 20 && (
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
            <p className="text-amber-300 text-sm text-center">🎯 Maximum of 20 skills allowed. Focus on your most relevant skills!</p>
          </div>
        )}
      </div>
    </div>
  )
}
