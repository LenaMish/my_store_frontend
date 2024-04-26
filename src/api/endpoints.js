export const BASE_URL = "http://127.0.0.1:8000/api/v1"

export const ENDPOINTS = {
    Login: BASE_URL + "/auth",
    Register: BASE_URL + "/register",
    Products: BASE_URL + "/products",
    Media: BASE_URL + "/media",
    Order: BASE_URL + "/orders",
    Transaction: BASE_URL + "/transaction",
    TransactionFinished: BASE_URL + "/transaction/{paypal_id}/finish",
    Delivery: BASE_URL + "/delivery"
}