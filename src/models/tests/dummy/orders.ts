import { Order } from '../../orders'

export const ORDERDUMMY: { [key: string]: Order } = {
    ORDER1: {
        user_id: 1,
        quantity: 4,
        status: 'complete',
    },
    ORDER2: {
        user_id: 1,
        quantity: 2,
        status: 'complete',
    },
    ORDER3: {
        user_id: 1,
        quantity: 3,
        status: 'active',
    }
}
