import { create } from 'zustand'

type VotingStore = {
  girlVotes: number
  boyVotes: number
  hasVoted: boolean
  userVote: 'girl' | 'boy' | null
  themeColor: 'pink' | 'blue' | 'neutral'
  setVotes: (girlVotes: number, boyVotes: number) => void
  setUserVote: (vote: 'girl' | 'boy') => void
  incrementVote: (team: 'girl' | 'boy') => void
  setThemeColor: (color: 'pink' | 'blue' | 'neutral') => void
}

export const useVotingStore = create<VotingStore>((set) => ({
  girlVotes: 0,
  boyVotes: 0,
  hasVoted: false,
  userVote: null,
  themeColor: 'neutral',
  setVotes: (girlVotes, boyVotes) => set({ girlVotes, boyVotes }),
  setUserVote: (vote) => set({ 
    userVote: vote, 
    hasVoted: true,
    themeColor: vote === 'girl' ? 'pink' : 'blue'
  }),
  incrementVote: (team) =>
    set((state) => ({
      [team === 'girl' ? 'girlVotes' : 'boyVotes']:
        team === 'girl' ? state.girlVotes + 1 : state.boyVotes + 1,
    })),
  setThemeColor: (color) => set({ themeColor: color }),
}))
