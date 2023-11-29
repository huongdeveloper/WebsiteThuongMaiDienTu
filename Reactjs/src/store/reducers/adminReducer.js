import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    roles: [],
    users: [],
    hosts: [],
    Slider: [],
    sliderAll: [],
    menu: [],
    topHomePros: [],
    allProduct: [],
    arrweight: [],
    topHomeHostP1: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

             // ============= Redex Vai trò  ====================
             case actionTypes.FETCH_ROLE_SUCCESS:
                state.roles = action.data;
                return {
                    ...state
                }
            case actionTypes.FETCH_ROLE_FAILED:
                state.roles = [];
                return {
                    ...state
                }

            // ============= Redex Host  ====================
            case actionTypes.FETCH_HOST_SUCCESS:
                state.hosts = action.data;
                return {
                    ...state
                }
            case actionTypes.FETCH_HOST_FAILED:
                state.hosts = [];
                return {
                    ...state
                }

                // ============= Redex slider  ====================
            case actionTypes.FETCH_SLIDER_SUCCESS:
                state.Slider = action.dataSlider;
                return {
                    ...state
                }
            case actionTypes.FETCH_SLIDER_FAILED:
                state.Slider = [];
                return {
                    ...state
                }

                // ============= Hiện ra dữ liệu data sliderAll ====================
             case actionTypes.FETCH_TOP_SLIDERALL_SUCCESS:
                state.sliderAll = action.data;
                return {
                    ...state
                }
            case actionTypes.FETCH_TOP_SLIDERALL_FAILED:
                state.sliderAll = [];
                return {
                    ...state
                }

            // ============= Hiện ra dữ liệu data người dùng ====================
             case actionTypes.FETCH_ALL_USERS_SUCCESS:
                state.users = action.users;
                return {
                    ...state
                }
            case actionTypes.FETCH_ALL_USERS_FAILED:
                state.users = [];
                return {
                    ...state
                }

            // ============= Hiện ra menu ====================
            case actionTypes.FETCH_ALL_MENU_SUCCESS:
                state.menu = action.menu;
                // console.log('menu', action)
                return {
                    ...state
                }
            case actionTypes.FETCH_ALL_MENU_FAILED:
                state.menu = [];
                return {
                    ...state
                }
            
            // ======= Hiện danh sách Product sản phẩm ==============
            case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
                state.allProduct = action.dataPr;
                // console.log('allProduct', action)
                return {
                    ...state
                }
            case actionTypes.FETCH_ALL_PRODUCT_FAILED:
                state.allProduct = [];
                return {
                    ...state
                }

            // ============= Hiện ra weight ====================
            case actionTypes.FETCH_ALL_WEIGHT_SUCCESS:
                state.arrweight = action.data;
                // console.log('123', action)
                return {
                    ...state
                }
            case actionTypes.FETCH_ALL_WEIGHT_FAILED:
                state.arrweight = [];
                return {
                    ...state
                }
             // ============= Lấy dữ liệu product ====================
             case actionTypes.FETCH_TOP_PRODUCT_SUCCESS:
                state.topHomePros = action.dataHomePro;
                // console.log('ProductA', action);
                return {
                    ...state
                }
            case actionTypes.FETCH_TOP_PRODUCT_FAILED:
                state.topHomePros = [];
                return {
                    ...state
                }

                 // ============= Lấy dữ liệu product ====================
             case actionTypes.FETCH_TOP_PR0P1_SUCCESS:
                state.topHomeHostP1 = action.dataHostP1;
                // console.log('ProductA', action);
                return {
                    ...state
                }
            case actionTypes.FETCH_TOP_PR0P1_FAILED:
                state.topHomeHostP1 = [];
                return {
                    ...state
                }  
            
        default:
            return state;
    }
}

export default adminReducer;