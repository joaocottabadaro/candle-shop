import { Candle } from "@/context"

export enum ActionTypes {
    INCREASE_CANDLE_QUANTITY = 'INCREASE_CANDLE_QUANTITY',
    DECREASE_CANDLE_QUANTITY = 'DECREASE_CANDLE_QUANTITY',
    REMOVE_ALL_CANDLES = 'REMOVE_ALL_CANDLES',
  }
  
  export function increaseCandleQuantityAction(candle: Candle) {
    return {
      type: ActionTypes.INCREASE_CANDLE_QUANTITY,
      payload: {
        candle,
      },
    }
  }
  export function decreaseCandleQuantityAction(candle: Candle) {
    return {
      type: ActionTypes.DECREASE_CANDLE_QUANTITY,
      payload: {
        candle,
      },
    }
  }

  export function removeAllCandlesAction() {
    return {
      type: ActionTypes.REMOVE_ALL_CANDLES,
    }
  }