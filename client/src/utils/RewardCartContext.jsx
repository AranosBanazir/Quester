import { createContext, useContext, useReducer } from 'react'

const rewardCartState = []

export const RewardCartContext = createContext(rewardCartState)

export const useRewardCartContext = () => useContext(RewardCartContext)

export const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
}

const reducer = (state, action) => {
  switch(action.type) {
    case actions.ADD_TO_CART:
      return [...state, action.payload]
    case actions.REMOVE_FROM_CART:
      return state.filter(reward => reward._id !== action.payload)
    default:
      return state
  }
}

export const RewardCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, rewardCartState)

  return (
    <RewardCartContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </RewardCartContext.Provider>
  )
}

