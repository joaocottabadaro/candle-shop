import { produce } from 'immer'

import { Candle } from '@/context'
import { ActionTypes } from './action'


export interface OrderState {
  candles: Candle[]
}


export function CandlesReducer(state: OrderState, action: any) {
  switch (action.type) {

    case ActionTypes.INCREASE_CANDLE_QUANTITY: {
        const currentCandleIndex = state.candles.findIndex((candle) => {
          return candle.id === action.payload.id
        })
  
        return produce(state, (draft) => {
          if (currentCandleIndex < 0) {
            draft.candles.push({
              ...action.payload.candle,
              quantity: 1,
            })
          } else {
            draft.candles[currentCandleIndex].quantity += 1
          }
        })
      }

      
    case ActionTypes.DECREASE_CANDLE_QUANTITY: {
      const currentCandleIndex = state.candles.findIndex((candle) => {
        return candle.id === action.payload.id
      })

      if (currentCandleIndex < 0) return state

      return produce(state, (draft) => {
        draft.candles[currentCandleIndex].quantity -= 1
        if (draft.candles[currentCandleIndex].quantity === 0) {
          draft.candles.splice(currentCandleIndex, 1)
        }
      })
    }
 

    case ActionTypes.REMOVE_ALL_CANDLES: {
      return produce(state, (draft) => {
        draft.candles = [] // Remove todos os itens da sacola
      })
    }

    default:
      return state
  }
}