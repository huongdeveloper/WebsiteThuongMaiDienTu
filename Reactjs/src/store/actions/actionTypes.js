const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin

    // ================= Create lưu Thông tin đăng ký =====================
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    // ================== Redex Vai trò ==========================
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    // =============== Redex Host =============
    FETCH_HOST_SUCCESS: 'FETCH_HOST_SUCCESS',
    FETCH_HOST_FAILED: 'FETCH_HOST_FAILED',

    // =============== Redex Slider =============
    FETCH_SLIDER_SUCCESS: 'FETCH_SLIDER_SUCCESS',
    FETCH_SLIDER_FAILED: 'FETCH_SLIDER_FAILED',

    CREATE_SLIDER_SUCCESS: 'CREATE_SLIDER_SUCCESS',
    CREATE_SLIDER_FAILED: 'CREATE_SLIDER_FAILED',

    FETCH_TOP_SLIDERALL_SUCCESS: 'FETCH_TOP_SLIDERALL_SUCCESS',
    FETCH_TOP_SLIDERALL_FAILED: 'FETCH_TOP_SLIDERALL_FAILED',

     // ================= Hiện ra dữ liệu data người dùng =====================
     FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
     FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',

      // ================= Xóa dữ liệu data người dùng =====================
     DELETE_USERS_SUCCESS: 'DELETE_USERS_SUCCESS',
     DELETE_USERS_FAILED: 'DELETE_USERS_FAILED',

     // ================= Update lưu vào data =====================
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    // ================= Create Tạo menu  =====================
    CREATE_MENU_SUCCESS: 'CREATE_MENU_SUCCESS',
    CREATE_MENU_FAILED: 'CREATE_MENU_FAILED',

    // ================= Hiện ra Menu =====================
    FETCH_ALL_MENU_SUCCESS: 'FETCH_ALL_MENU_SUCCESS',
    FETCH_ALL_MENU_FAILED: 'FETCH_ALL_MENU_FAILED',

    // ========== Redex Chọn Host ==============
    FETCH_REQUIRE_DOCTOR_INFOR_START: 'FETCH_REQUIRE_DOCTOR_INFOR_START',
    FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS: 'FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS',
    FETCH_REQUIRE_DOCTOR_INFOR_FAILED: 'FETCH_REQUIRE_DOCTOR_INFOR_FAILED',

    // ======= Lấy select Product sản phẩm ==============
    FETCH_ALL_PRODUCT_SUCCESS: 'FETCH_ALL_PRODUCT_SUCCESS',
    FETCH_ALL_PRODUCT_FAILED: 'FETCH_ALL_PRODUCT_FAILED',

    // ================= Hiện ra Menu =====================
    FETCH_ALL_WEIGHT_SUCCESS: 'FETCH_ALL_WEIGHT_SUCCESS',
    FETCH_ALL_WEIGHT_FAILED: 'FETCH_ALL_WEIGHT_FAILED',

     // ======= Lấy select product ==============
     FETCH_TOP_PRODUCT_SUCCESS: 'FETCH_TOP_PRODUCT_SUCCESS',
     FETCH_TOP_PRODUCT_FAILED: 'FETCH_TOP_PRODUCT_FAILED',

     FETCH_TOP_PR0P1_SUCCESS: 'FETCH_TOP_PR0P1_SUCCESS',
     FETCH_TOP_PR0P1_FAILED: 'FETCH_TOP_PR0P1_FAILED',

    // ??????????????????????????????????????????????????????

    

    // ======= Create lưu vào data Thông tin chi tiết bác sĩ ==============
    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    // ======= Tạo giờ khám bệnh của bác sĩ ==============
    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',

    


})

export default actionTypes;