const path = {
    ACCOUNT: 'account',
    LOGIN: 'login',
    USER_REGISTER: 'user/register',
    USER_LOGIN: 'user/login',

    PUBLIC: '/',
    HOME: '',
    // ALL: '*',
    REGISTER: 'register',
    FINAL_REGISTER: 'final_register/:status',
    FORGOT_PASSWORD: 'fotgot_password',
    CHANGE_PASSWORD: 'change_password/:token',
    PRODUCTS: 'products',
    PRODUCTS_CATEGORY: 'products/:category',
    DETAIL_PRODUCT: 'detail_product',
    DETAIL_PRODUCT_PID: 'detail_product/:pid',
    PERSONAL: 'personal',
    CHECKOUT: 'check_out',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage_user',
    MANAGE_PRODUCTS: 'manage_products',
    CREATE_PRODUCT: 'create_product',
    MANAGE_BILL: 'manage_bill',

    //Member
    MEMBER: 'member',
    MYCART: 'mycart',
    WISHLIST: 'wishlist',
    HISTORY: 'history',
}

export default path