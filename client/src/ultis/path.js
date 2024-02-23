const path = {
    PUBLIC: '/',
    HOME: '',
    // ALL: '*',
    REGISTER: 'register',
    FINAL_REGISTER: 'final_register/:status',
    FORGOT_PASSWORD: 'fotgot_password',
    CHANGE_PASSWORD: 'change_password/:token',
    USER_REGISTER: 'user/register',
    LOGIN: 'login',
    USER_LOGIN: 'user/login',
    PRODUCTS: 'products/:category',
    DETAIL_PRODUCT: 'detail_product',
    DETAIL_PRODUCT_PID: 'detail_product/:pid',
    PERSONAL: 'personal',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage_user',
    MANAGE_PRODUCTS: 'manage_products',
    CREATE_PRODUCT: 'create_product',
    MANAGE_BILL: 'manage_bill',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MYCART: 'mycart',
    WISHLIST: 'wishlist',
    HISTORY: 'history',
}

export default path