import { Order, OrderProducts } from '../../orders'

export const ORDERDUMMY: { [key: string]: Order } = {
    ORDER1: {
        user_id: 1,
        status: 'active',
    },
    ORDER2: {
        user_id: 1,
        status: 'complete',
    },
    ORDER3: {
        user_id: 1,
        status: 'active',
    },
}

export const ORDERPRODUCTDUMMY: { [key: string]: OrderProducts } = {
    ORDERPROD1: {
        quantity: 4,
        order_id: 1,
        product_id: 2,
    },
    ORDERPROD2: {
        quantity: 3,
        order_id: 1,
        product_id: 1,
    },
    ORDERPROD3: {
        quantity: 5,
        order_id: 1,
        product_id: 4,
    },
    ORDERPROD4: {
        quantity: 2,
        order_id: 1,
        product_id: 3,
    }
}
