'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  role: string
  member_count: number
  created_at: string
}

type Member = {
  id: number
  user_id: number
  email: string
  role: string
  joined_at: string
}

type Invitation = {
  id: number
  email: string
  status: string
  created_at: string
}

export default function TeamPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [creating, setCreating] = useState(false)
  
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchTeams()
    }
  }, [session])

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams')
      const data = await res.json()
      setTeams(data.teams || [])
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const selectTeam = async (team: Team) => {
    setSelectedTeam(team)
    setMessage(null)
    
    // Fetch members
    const membersRes = await fetch(`/api/teams/members?teamId=${team.id}`)
    const membersData = await membersRes.json()
    setMembers(membersData.members || [])
    
    // Fetch invitations
    const invitesRes = await fetch(`/api/teams/invite?teamId=${team.id}`)
    const invitesData = await invitesRes.json()
    setInvitations(invitesData.invitations || [])
  }

  const createTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) return
    
    setCreating(true)
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName.trim() })
      })
      const data = await res.json()
      
      if (res.ok) {
        setTeams([{ ...data.team, role: 'admin', member_count: 1 }, ...teams])
        setTeamName('')
        setShowCreateTeam(false)
        setMessage({ type: 'success', text: 'Team created!' })
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to create team' })
    }
    setCreating(false)
  }

  const inviteMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim() || !selectedTeam) return
    
    setInviting(true)
    try {
      const res = await fetch('/api/teams/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: selectedTeam.id, email: inviteEmail.trim() })
      })
      const data = await res.json()
      
      if (res.ok) {
        setInvitations([data.invitation, ...invitations])
        setInviteEmail('')
        setMessage({ type: 'success', text: `Invitation link: ${data.inviteLink}` })
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to send invitation' })
    }
    setInviting(false)
  }

  const removeMember = async (memberId: number) => {
    if (!selectedTeam || !confirm('Remove this member?')) return
    
    try {
      const res = await fetch(`/api/teams/members?teamId=${selectedTeam.id}&memberId=${memberId}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        setMembers(members.filter(m => m.user_id !== memberId))
        setMessage({ type: 'success', text: 'Member removed' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to remove member' })
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-900">
        <div className="text-midnight-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-900">
      <header className="border-b border-midnight-800 bg-midnight-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-camp-500 to-camp-400 flex items-center justify-center">
              <span className="text-midnight-900 font-bold">C</span>
            </div>
            <span className="font-display font-semibold text-lg">CampKit</span>
          </Link>
          <Link href="/dashboard" className="text-midnight-400 hover:text-white text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold">Team Management</h1>
          <button
            onClick={() => setShowCreateTeam(!showCreateTeam)}
            className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors"
          >
            {showCreateTeam ? 'Cancel' : '+ Create Team'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-camp-500/10 border border-camp-500/30 text-camp-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            {message.text}
          </div>
        )}

        {/* Create Team Form */}
        {showCreateTeam && (
          <div className="gradient-border p-6 mb-8">
            <h2 className="font-display font-semibold text-lg mb-4">Create New Team</h2>
            <form onSubmit={createTeam} className="flex gap-4">
              <input
                type="text"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder="Team name"
                className="flex-1 px-4 py-3 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-3 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Teams List */}
          <div>
            <h2 className="font-display font-semibold mb-4">Your Teams</h2>
            {teams.length === 0 ? (
              <div className="gradient-border p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-midnight-400 text-sm">No teams yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => selectTeam(team)}
                    className={`w-full text-left p-4 rounded-xl transition-colors ${selectedTeam?.id === team.id ? 'bg-camp-500/20 border border-camp-500/30' : 'gradient-border hover:bg-midnight-800/50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{team.name}</span>
                      <span className="px-2 py-1 bg-midnight-800 text-xs rounded text-midnight-400">
                        {team.role}
                      </span>
                    </div>
                    <p className="text-midnight-500 text-sm mt-1">
                      {team.member_count} member{team.member_count !== 1 ? 's' : ''}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Team Details */}
          <div className="md:col-span-2">
            {selectedTeam ? (
              <div className="space-y-6">
                {/* Members */}
                <div className="gradient-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold">Members ({members.length}/5)</h2>
                  </div>
                  
                  {selectedTeam.role === 'admin' && members.length < 5 && (
                    <form onSubmit={inviteMember} className="flex gap-3 mb-4">
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="Email to invite"
                        className="flex-1 px-4 py-2 bg-midnight-800 border border-midnight-700 rounded-lg text-white placeholder:text-midnight-500 focus:border-camp-500 focus:outline-none text-sm"
                        required
                      />
                      <button
                        type="submit"
                        disabled={inviting}
                        className="px-4 py-2 bg-camp-500 hover:bg-camp-400 text-midnight-900 font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
                      >
                        {inviting ? '...' : 'Invite'}
                      </button>
                    </form>
                  )}

                  <div className="space-y-2">
                    {members.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-midnight-800/50 rounded-lg">
                        <div>
                          <span className="text-sm">{member.email}</span>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded ${member.role === 'admin' ? 'bg-camp-500/20 text-camp-400' : 'bg-midnight-700 text-midnight-400'}`}>
                            {member.role}
                          </span>
                        </div>
                        {selectedTeam.role === 'admin' && member.role !== 'admin' && (
                          <button
                            onClick={() => removeMember(member.user_id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Invitations */}
                {invitations.length > 0 && (
                  <div className="gradient-border p-6">
                    <h2 className="font-display font-semibold mb-4">Pending Invitations</h2>
                    <div className="space-y-2">
                      {invitations.map(inv => (
                        <div key={inv.id} className="flex items-center justify-between p-3 bg-midnight-800/50 rounded-lg">
                          <span className="text-sm">{inv.email}</span>
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                            pending
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="gradient-border p-12 text-center">
                <div className="text-4xl mb-3">👈</div>
                <p className="text-midnight-400">Select a team to manage</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
