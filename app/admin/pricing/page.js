'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Pencil, Trash2, X, Save, ExternalLink,
  LogOut, TrendingUp, Euro, Clock, CheckCircle,
} from 'lucide-react'

/* ─── Supabase client ─────────────────────────────────────── */
function getSupabase() {
  if (typeof window === 'undefined') return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

/* ─── Constants ───────────────────────────────────────────── */
const TRADES = ['Plomberie', 'Électricité', 'Serrurerie', 'Chauffage']
const TRADE_STYLES = {
  Plomberie:   { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  Électricité: { bg: '#FEFCE8', text: '#A16207', dot: '#EAB308' },
  Serrurerie:  { bg: '#F5F3FF', text: '#6D28D9', dot: '#8B5CF6' },
  Chauffage:   { bg: '#FEF2F2', text: '#B91C1C', dot: '#EF4444' },
}

const EMPTY_ROW = { trade: 'Plomberie', problem: '', price_min: '', price_max: '', duration: '', active: true }

/* ─── Helpers ─────────────────────────────────────────────── */
function fmt(n) { return Number(n).toLocaleString('fr-BE') + ' €' }
function timeAgo(ts) {
  if (!ts) return '—'
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'À l\'instant'
  if (m < 60) return `Il y a ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `Il y a ${h}h`
  return new Date(ts).toLocaleDateString('fr-BE', { day: '2-digit', month: 'short' })
}

/* ─── Toast ───────────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold shadow-lg pointer-events-auto"
          style={{
            background: t.type === 'error' ? '#FEF2F2' : '#F0FDF4',
            color:      t.type === 'error' ? '#B91C1C' : '#15803D',
            border:     `1px solid ${t.type === 'error' ? '#FECACA' : '#BBF7D0'}`,
            animation: 'fadeUp 0.25s ease-out',
          }}
        >
          {t.type === 'error' ? '✗' : '✓'} {t.message}
        </div>
      ))}
    </div>
  )
}

/* ─── Trade Badge ─────────────────────────────────────────── */
function TradeBadge({ trade }) {
  const s = TRADE_STYLES[trade] || { bg: '#F5F5F5', text: '#555', dot: '#999' }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {trade}
    </span>
  )
}

/* ─── Duration Badge ──────────────────────────────────────── */
function DurationBadge({ duration }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
      <Clock size={10} /> {duration}
    </span>
  )
}

/* ─── Toggle Switch ───────────────────────────────────────── */
function ToggleSwitch({ active, onChange, disabled }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50"
      style={{ background: active ? '#22C55E' : '#D1D5DB' }}
    >
      <span className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform"
        style={{ transform: active ? 'translateX(18px)' : 'translateX(2px)' }} />
    </button>
  )
}

/* ─── Inline Edit Form ────────────────────────────────────── */
function EditForm({ data, onChange, onSave, onCancel, saving, isNew }) {
  const err = data.price_min && data.price_max && Number(data.price_min) >= Number(data.price_max)
    ? 'Le prix min doit être inférieur au prix max.' : ''

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-2">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Trade */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Métier</label>
          <select
            value={data.trade}
            onChange={e => onChange({ ...data, trade: e.target.value })}
            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-orange-400"
            style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
          >
            {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {/* Problem */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Prestation</label>
          <input type="text" placeholder="Ex: Fuite d'eau"
            value={data.problem}
            onChange={e => onChange({ ...data, problem: e.target.value })}
            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-orange-400"
            style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
          />
        </div>
        {/* Price min */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Prix min (€)</label>
          <input type="number" placeholder="89" min="0"
            value={data.price_min}
            onChange={e => onChange({ ...data, price_min: e.target.value })}
            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-orange-400"
            style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
          />
        </div>
        {/* Price max */}
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Prix max (€)</label>
          <input type="number" placeholder="149" min="0"
            value={data.price_max}
            onChange={e => onChange({ ...data, price_max: e.target.value })}
            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-orange-400"
            style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
          />
        </div>
        {/* Duration */}
        <div className="col-span-2">
          <label className="block text-xs font-bold text-gray-600 mb-1">Durée</label>
          <input type="text" placeholder="Ex: 1h–2h"
            value={data.duration}
            onChange={e => onChange({ ...data, duration: e.target.value })}
            className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:border-orange-400"
            style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A2E' }}
          />
        </div>
      </div>

      {err && <p className="text-xs text-red-500 mb-3">{err}</p>}

      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={saving || err || !data.problem.trim() || !data.price_min || !data.price_max || !data.duration.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-opacity"
          style={{ background: '#FF6B35', cursor: saving ? 'wait' : 'pointer' }}
        >
          <Save size={14} /> {saving ? 'Enregistrement...' : isNew ? 'Ajouter' : 'Enregistrer'}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          <X size={14} /> Annuler
        </button>
      </div>
    </div>
  )
}

/* ─── Confirm Delete Modal ────────────────────────────────── */
function ConfirmModal({ problem, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mx-auto mb-4">
          <Trash2 size={22} color="#EF4444" />
        </div>
        <h2 className="text-lg font-bold text-center mb-2" style={{ color: '#1A1A2E' }}>Supprimer ce tarif ?</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          &laquo;{problem}&raquo; sera définitivement supprimé.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Annuler
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#EF4444' }}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Stats Card ──────────────────────────────────────────── */
function StatsCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent + '15' }}>
        <Icon size={20} color={accent} />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500 font-medium truncate">{label}</div>
        <div className="text-xl font-black truncate" style={{ color: accent }}>{value}</div>
      </div>
    </div>
  )
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function AdminPricingPage() {
  const router = useRouter()
  const [rows,        setRows]        = useState([])
  const [loading,     setLoading]     = useState(true)
  const [filter,      setFilter]      = useState('Tous')
  const [editingId,   setEditingId]   = useState(null)
  const [editData,    setEditData]    = useState(null)
  const [deleteRow,   setDeleteRow]   = useState(null)
  const [saving,      setSaving]      = useState(false)
  const [showAdd,     setShowAdd]     = useState(false)
  const [newRow,      setNewRow]      = useState({ ...EMPTY_ROW })
  const [toasts,      setToasts]      = useState([])
  const [noSupabase,  setNoSupabase]  = useState(false)
  const supabaseRef = useRef(null)

  /* ── Toast helper ── */
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  /* ── Fetch data ── */
  const fetchRows = useCallback(async () => {
    const sb = supabaseRef.current
    if (!sb) return
    const { data, error } = await sb
      .from('price_matrix')
      .select('*')
      .order('trade')
      .order('problem')
    if (error) { addToast('Erreur de chargement.', 'error'); return }
    setRows(data || [])
    setLoading(false)
  }, [addToast])

  /* ── Init + realtime ── */
  useEffect(() => {
    const sb = getSupabase()
    if (!sb) { setNoSupabase(true); setLoading(false); return }
    supabaseRef.current = sb
    fetchRows()

    const channel = sb.channel('price_matrix_rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'price_matrix' }, () => fetchRows())
      .subscribe()
    return () => sb.removeChannel(channel)
  }, [fetchRows])

  /* ── Logout ── */
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  /* ── Toggle active ── */
  async function handleToggle(row) {
    const sb = supabaseRef.current
    if (!sb) return
    const { error } = await sb.from('price_matrix')
      .update({ active: !row.active, updated_at: new Date().toISOString() })
      .eq('id', row.id)
    if (error) { addToast('Erreur lors de la mise à jour.', 'error'); return }
    setRows(prev => prev.map(r => r.id === row.id ? { ...r, active: !r.active } : r))
  }

  /* ── Start edit ── */
  function startEdit(row) {
    setEditingId(row.id)
    setEditData({ trade: row.trade, problem: row.problem, price_min: row.price_min, price_max: row.price_max, duration: row.duration })
    setShowAdd(false)
  }

  /* ── Save edit ── */
  async function handleSaveEdit() {
    const sb = supabaseRef.current
    if (!sb) return
    setSaving(true)
    const { error } = await sb.from('price_matrix').update({
      trade:     editData.trade,
      problem:   editData.problem,
      price_min: Number(editData.price_min),
      price_max: Number(editData.price_max),
      duration:  editData.duration,
      updated_at: new Date().toISOString(),
    }).eq('id', editingId)
    setSaving(false)
    if (error) { addToast('Erreur lors de la sauvegarde.', 'error'); return }
    setRows(prev => prev.map(r => r.id === editingId ? { ...r, ...editData, price_min: Number(editData.price_min), price_max: Number(editData.price_max) } : r))
    setEditingId(null)
    addToast('Tarif mis à jour avec succès.')
  }

  /* ── Delete ── */
  async function handleDelete() {
    const sb = supabaseRef.current
    if (!sb || !deleteRow) return
    const { error } = await sb.from('price_matrix').delete().eq('id', deleteRow.id)
    if (error) { addToast('Erreur lors de la suppression.', 'error'); setDeleteRow(null); return }
    setRows(prev => prev.filter(r => r.id !== deleteRow.id))
    setDeleteRow(null)
    addToast('Service supprimé.')
  }

  /* ── Add new ── */
  async function handleAddSave() {
    const sb = supabaseRef.current
    if (!sb) return
    setSaving(true)
    const { data, error } = await sb.from('price_matrix').insert({
      trade:     newRow.trade,
      problem:   newRow.problem,
      price_min: Number(newRow.price_min),
      price_max: Number(newRow.price_max),
      duration:  newRow.duration,
      active:    true,
    }).select().single()
    setSaving(false)
    if (error) { addToast('Erreur lors de l\'ajout.', 'error'); return }
    setRows(prev => [...prev, data])
    setNewRow({ ...EMPTY_ROW })
    setShowAdd(false)
    addToast('Service ajouté avec succès.')
  }

  /* ── Computed stats ── */
  const activeRows = rows.filter(r => r.active)
  const avgMin = activeRows.length ? Math.round(activeRows.reduce((s, r) => s + r.price_min, 0) / activeRows.length) : 0
  const avgMax = activeRows.length ? Math.round(activeRows.reduce((s, r) => s + r.price_max, 0) / activeRows.length) : 0
  const lastUpdate = rows.length ? rows.reduce((a, b) => new Date(a.updated_at) > new Date(b.updated_at) ? a : b).updated_at : null

  /* ── Filtered rows ── */
  const displayed = filter === 'Tous' ? rows : rows.filter(r => r.trade === filter)

  /* ── No Supabase banner ── */
  if (noSupabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: '#1A1A2E' }}>Supabase non configuré</h2>
          <p className="text-sm text-gray-500">
            Ajoutez <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> et{' '}
            <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans vos variables d&apos;environnement Vercel.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* ── TOP BAR ── */}
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-black" style={{ color: '#1A1A2E' }}>
                Dépannage<span style={{ color: '#FF6B35' }}>.be</span>
              </span>
              <span className="hidden sm:block text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Admin</span>
            </div>

            {/* Title */}
            <h1 className="hidden md:block text-base font-bold" style={{ color: '#1A1A2E' }}>
              Gestion des tarifs
            </h1>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Voir le site <ExternalLink size={12} />
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> <span className="hidden sm:block">Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

          {/* ── STATS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard icon={CheckCircle} label="Services actifs"        value={activeRows.length}    accent="#22C55E" />
            <StatsCard icon={Euro}        label="Prix moyen min"          value={avgMin ? `${avgMin} €` : '—'}  accent="#FF6B35" />
            <StatsCard icon={TrendingUp}  label="Prix moyen max"          value={avgMax ? `${avgMax} €` : '—'}  accent="#1A1A2E" />
            <StatsCard icon={Clock}       label="Dernière modification"   value={timeAgo(lastUpdate)}  accent="#8B5CF6" />
          </div>

          {/* ── FILTER + ADD BUTTON ── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
              {['Tous', ...TRADES].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: filter === t ? '#FF6B35' : '#fff',
                    color:      filter === t ? '#fff'    : '#1A1A2E',
                    border:     `1.5px solid ${filter === t ? '#FF6B35' : 'rgba(26,26,46,0.12)'}`,
                  }}
                >
                  {t}
                  {t !== 'Tous' && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({rows.filter(r => r.trade === t).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Add button */}
            <button
              onClick={() => { setShowAdd(true); setEditingId(null) }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
              style={{ background: '#FF6B35' }}
            >
              <Plus size={16} /> Ajouter un service
            </button>
          </div>

          {/* ── ADD FORM (inline top) ── */}
          {showAdd && (
            <EditForm
              data={newRow}
              onChange={setNewRow}
              onSave={handleAddSave}
              onCancel={() => { setShowAdd(false); setNewRow({ ...EMPTY_ROW }) }}
              saving={saving}
              isNew
            />
          )}

          {/* ── TABLE (desktop) ── */}
          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400 text-sm">
              Chargement des tarifs...
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Métier', 'Prestation', 'Prix min', 'Prix max', 'Durée', 'Statut', 'Actions'].map(col => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {displayed.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                          Aucun service pour ce filtre.
                        </td>
                      </tr>
                    )}
                    {displayed.map((row, i) => (
                      <>
                        <tr key={row.id}
                          className="transition-colors"
                          style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}
                        >
                          <td className="px-4 py-3"><TradeBadge trade={row.trade} /></td>
                          <td className="px-4 py-3 font-semibold" style={{ color: '#1A1A2E' }}>{row.problem}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: '#1A1A2E' }}>{fmt(row.price_min)}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: '#1A1A2E' }}>{fmt(row.price_max)}</td>
                          <td className="px-4 py-3"><DurationBadge duration={row.duration} /></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <ToggleSwitch active={row.active} onChange={() => handleToggle(row)} />
                              <span className="text-xs font-medium" style={{ color: row.active ? '#22C55E' : '#9CA3AF' }}>
                                {row.active ? 'Actif' : 'Inactif'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => editingId === row.id ? setEditingId(null) : startEdit(row)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                style={{ background: editingId === row.id ? '#FFF4F0' : '#F5F5F5', color: editingId === row.id ? '#FF6B35' : '#555' }}
                              >
                                <Pencil size={12} /> {editingId === row.id ? 'Fermer' : 'Modifier'}
                              </button>
                              <button
                                onClick={() => setDeleteRow(row)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 size={12} /> Supprimer
                              </button>
                            </div>
                          </td>
                        </tr>
                        {/* Inline edit row */}
                        {editingId === row.id && (
                          <tr key={`edit-${row.id}`}>
                            <td colSpan={7} className="px-4 py-3 bg-orange-50/40">
                              <EditForm
                                data={editData}
                                onChange={setEditData}
                                onSave={handleSaveEdit}
                                onCancel={() => setEditingId(null)}
                                saving={saving}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
                  {displayed.length} service{displayed.length !== 1 ? 's' : ''} affiché{displayed.length !== 1 ? 's' : ''}
                  {filter !== 'Tous' && ` · filtre : ${filter}`}
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {displayed.length === 0 && (
                  <div className="bg-white rounded-xl p-8 text-center text-gray-400 text-sm shadow-sm">
                    Aucun service pour ce filtre.
                  </div>
                )}
                {displayed.map(row => (
                  <div key={row.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <TradeBadge trade={row.trade} />
                          <div className="mt-1.5 font-bold text-sm" style={{ color: '#1A1A2E' }}>{row.problem}</div>
                        </div>
                        <ToggleSwitch active={row.active} onChange={() => handleToggle(row)} />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold" style={{ color: '#1A1A2E' }}>
                          {fmt(row.price_min)} – {fmt(row.price_max)}
                        </span>
                        <DurationBadge duration={row.duration} />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editingId === row.id ? setEditingId(null) : startEdit(row)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <Pencil size={12} /> Modifier
                        </button>
                        <button
                          onClick={() => setDeleteRow(row)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-500"
                        >
                          <Trash2 size={12} /> Supprimer
                        </button>
                      </div>
                    </div>
                    {editingId === row.id && (
                      <div className="border-t border-gray-100 p-3 bg-orange-50/40">
                        <EditForm
                          data={editData}
                          onChange={setEditData}
                          onSave={handleSaveEdit}
                          onCancel={() => setEditingId(null)}
                          saving={saving}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── DELETE MODAL ── */}
      {deleteRow && (
        <ConfirmModal
          problem={deleteRow.problem}
          onConfirm={handleDelete}
          onCancel={() => setDeleteRow(null)}
        />
      )}

      {/* ── TOASTS ── */}
      <Toast toasts={toasts} />
    </>
  )
}
