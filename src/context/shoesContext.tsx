import * as React from 'react'
import data from '../data/data.json'

export type Action = { type: 'updateRanking'}
type Dispatch = (action: Action) => void
export type State = { shoes: typeof data.shoes }
type ShoesProviderProps = { children: React.ReactNode }
const ShoesContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

export const ShoesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateRanking': {
      return state
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const ShoesProvider = ({ children }: ShoesProviderProps) => {
  const [state, dispatch] = React.useReducer(ShoesReducer, { shoes: data.shoes })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return <ShoesContext.Provider value={value}>{children}</ShoesContext.Provider>
}

function useShoes() {
  const context = React.useContext(ShoesContext)
  if (context === undefined) {
    throw new Error('useShoes must be used within a ShoesProvider')
  }
  return context
}

export { ShoesProvider, useShoes }
