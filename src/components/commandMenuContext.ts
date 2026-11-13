import { createContext, useContext } from 'react'

export const CommandMenuContext = createContext<() => void>(() => {})

/** Opens the ⌘K menu from anywhere (header button, Dock). */
export function useOpenCommandMenu() {
  return useContext(CommandMenuContext)
}
