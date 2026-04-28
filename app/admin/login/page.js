'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur inconnue.'); setLoading(false); return }
      router.push('/admin/pricing')
    } catch {
      setError('Erreur réseau.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <span style={{ fontSize: 22, fontWeight: 900, color: '#1A1A2E', fontFamily: 'Inter, sans-serif' }}>
            Dépannage<span style={{ color: '#FF6B35' }}>.be</span>
          </span>
        </div>

        <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl mx-auto mb-4">
          <Lock size={22} color="#FF6B35" />
        </div>
        <h1 className="text-xl font-bold text-center mb-1" style={{ color: '#1A1A2E' }}>
          Accès Administration
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Espace réservé aux administrateurs
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full h-12 border border-gray-200 rounded-xl px-4 pr-12 text-sm focus:outline-none focus:border-orange-400 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full h-12 rounded-xl font-bold text-white text-sm transition-opacity disabled:opacity-50"
            style={{ background: loading || !password ? '#ccc' : '#FF6B35', cursor: loading || !password ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
