import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, createMenuService, getAllMenu,
    deleteMenuService, editMenuService, saveProductSP, getAllProductList, saveSelection, deleteWeightsService, getAllWeights, 
    editWeightService, deleteProductService, saveDescriptions, deleteDescriptionService, editDescriptionsService, editProductSPService,
    getTopProductHomeService, getHostP1ProductService, createSliderService, getAllSlider, deleteSliderService, editSliderService
    } from "../../services/userService";
import { toast } from "react-toastify";


 // ================= Create đăng ký vào data Redex =====================

 export const createNewUser = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await createNewUserService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Đăng Ký thành công");
            dispatch(saveUserSuccess());
            dispatch(fetchAllUserStart());
        }else {
            toast.error(res.message);
            dispatch(saveUserFailed());
        }
    } catch (e) {
        toast.error("Delete the user error!");
        dispatch(saveUserFailed());
        console.log('createNewUser error: ', e)
   }
  }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

// ================== Redex Vai trò ==========================
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllCodeService("ROLE");
       if (res && res.errCode === 0 ) {
            dispatch(fetchRoleSuccess(res.data));
        }else {
        dispatch(fetchRoleFailed());
        }
    } catch (e) {
        dispatch(fetchRoleFailed());
        console.log('fetchRoleStart error: ', e)
   }
  }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// ================= Hiện ra dữ liệu data người dùng Redex =====================

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllUsers("ALL");
       if (res && res.errCode === 0 ) {
            dispatch(fetchAllUserSuccess(res.users.reverse()));
        }else {
            toast.error("Fetch all user error!");
        dispatch(fetchAllUserFailed());
        }
    } catch (e) {
         toast.error("Fetch all user error!");
        dispatch(fetchAllUserFailed());
        // console.log('fetchAllUserStart error: ', e)
   }
  }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

// ================= Delete Xóa data Redex =====================

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteUserService(userId);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa thông tin thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllUserStart());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USERS_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USERS_FAILED
})

 // ================= Update lưu vào data =====================

 export const editAUser = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await editUserService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Update thông tin thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllUserStart());
        }else {
            toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

 // ================= Tạo Menu sản phẩm vào data Redex =====================

 export const createNewMenu = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await createMenuService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Tạo Menu thành công");
            dispatch(saveMenuSuccess());
            dispatch(fetchAllMenuStart());
        }else {
            toast.error(res.message);
            dispatch(saveMenuFailed());
        }
    } catch (e) {
        toast.error("Tạo Menu Thất bại!");
        dispatch(saveMenuFailed());
        console.log('createNewUser error: ', e)
   }
  }
}

export const saveMenuSuccess = () => ({
    type: actionTypes.CREATE_MENU_SUCCESS
})

export const saveMenuFailed = () => ({
    type: actionTypes.CREATE_MENU_FAILED
})

// ================= Hiện ra Menu Redex =====================

export const fetchAllMenuStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllMenu("ALL");
       if (res && res.errCode === 0 ) {
            dispatch(fetchAllMenuSuccess(res.menu.reverse()));
        }else {
            toast.error("Fetch all user error!");
        dispatch(fetchAllMenuFailed());
        }
    } catch (e) {
         toast.error("Fetch all user error!");
        dispatch(fetchAllMenuFailed());
        // console.log('fetchAllUserStart error: ', e)
   }
  }
}

export const fetchAllMenuSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_MENU_SUCCESS,
    menu: data
})

export const fetchAllMenuFailed = () => ({
    type: actionTypes.FETCH_ALL_MENU_FAILED
})

// ================= Delete Xóa data Redex =====================

export const deleteMenu = (WeightsId) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteMenuService(WeightsId);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa thông tin thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllMenuStart());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}

 // ================= Update lưu vào data =====================

 export const editMenu = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await editMenuService(data);
       console.log('12312', res)
       if (res && res.errCode === 0 ) {
            toast.success("Update thông tin thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllMenuStart());
        }else {
            toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

// ========== Redex host ==============
export const fetchHostStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllCodeService("HOST");
       if (res && res.errCode === 0 ) {
            dispatch(fetchHostSuccess(res.data));
        }else {
        dispatch(fetchHostFailed());
        }
    } catch (e) {
        dispatch(fetchHostFailed());
        console.log('fetchHostStart error: ', e)
   }
  }
}

export const fetchHostSuccess = (hostData) => ({
    type: actionTypes.FETCH_HOST_SUCCESS,
    data: hostData
})

export const fetchHostFailed = () => ({
    type: actionTypes.FETCH_HOST_FAILED
})

// ============= Tạo Slider =======
export const createNewSlider = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await createSliderService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Tạo Slider thành công");
            dispatch(saveSliderSuccess());
            dispatch(fetchAllSlider());
        }else {
            toast.error(res.message);
            dispatch(saveSliderFailed());
        }
    } catch (e) {
        toast.error("Tạo Slider Thất bại!");
        dispatch(saveSliderFailed());
        console.log('createNewUser error: ', e)
   }
  }
}

export const saveSliderSuccess = () => ({
    type: actionTypes.CREATE_SLIDER_SUCCESS
})

export const saveSliderFailed = () => ({
    type: actionTypes.CREATE_SLIDER_FAILED
})

// ================= Hiện ra Slider Redex =====================
export const fetchAllSlider = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllSlider('');
       if (res && res.errCode === 0 ) {
            dispatch(fetchAllSliderSuccess(res.data.reverse()));
        }else {
            toast.error("Fetch all user error!");
        dispatch(fetchAllSliderFailed());
        }
    } catch (e) {
         toast.error("Fetch all user error!");
        dispatch(fetchAllSliderFailed());
        // console.log('fetchAllUserStart error: ', e)
   }
  }
}

export const fetchAllSliderSuccess = (sliderdata) => ({
    type: actionTypes.FETCH_TOP_SLIDERALL_SUCCESS,
    data: sliderdata
})

export const fetchAllSliderFailed = () => ({
    type: actionTypes.FETCH_TOP_SLIDERALL_FAILED
})

// ========== Redex Slider ==============
export const fetchSliderStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllCodeService("SLIDER");
       if (res && res.errCode === 0 ) {
            dispatch(fetchSliderSuccess(res.data));
        }else {
        dispatch(fetchSliderFailed());
        }
    } catch (e) {
        dispatch(fetchSliderFailed());
        console.log('fetchSliderStart error: ', e)
   }
  }
}

export const fetchSliderSuccess = (SliderData) => ({
    type: actionTypes.FETCH_SLIDER_SUCCESS,
    dataSlider: SliderData
})

export const fetchSliderFailed = () => ({
    type: actionTypes.FETCH_SLIDER_FAILED
})

// ======== Xóa Slider ============
export const deleteSlider = (IdSlider) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteSliderService(IdSlider);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa Slider thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllSlider());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}

// ======== Update Slider =========
export const editSlider = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await editSliderService(data);
    //    console.log('12312', res)
       if (res && res.errCode === 0 ) {
            toast.success("Update Slier thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllSlider());
        }else {
            toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

// ======= Create lưu vào data Product sản phẩm ==============
export const saveDetailProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveProductSP(data);
            if (res && res.errCode === 0) {
                toast.success("Lưu sản phẩm thành công");
                dispatch(fetchAllProduct());
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                toast.error("Lưu thất bại!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        }catch (e) {
            toast.error("Lưu thất bại!");
            console.log('SAVE_DETAIL_DOCTOR_FAILED ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

// ======= Hiện danh sách product sản phẩm ==============
export const fetchAllProduct = (page, pageSize) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductList(page, pageSize);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
                    dataPr: res.data,
                    totalItems: res.totalCount
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCT_FAILED
                })
            }
        }catch (e) {
            // console.log('FETCH_ALL_DOCTORS_FAILED ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCT_FAILED
            })
        }
    }
}

// ============ Lấy thông tin hải sản ==============
export const fetchTopHomePro = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopProductHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_PRODUCT_SUCCESS,
                    dataHomePro: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_PRODUCT_FAILED
                })
            }
        }catch (e) {
            console.log('FETCH_TOP_PRODUCT_FAILED ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_PRODUCT_FAILED
            })
        }
    }
}

// ============ Lấy thông tin mĩ phẩm ==============
export const fetchgetHostP1Pro = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getHostP1ProductService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_PR0P1_SUCCESS,
                    dataHostP1: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_PR0P1_FAILED
                })
            }
        }catch (e) {
            console.log('FETCH_TOP_PR0P1_FAILED ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_PR0P1_FAILED
            })
        }
    }
}

// ====== Edit sản phẩm ==============
export const editProductSP = (data, productId) => {
    return async (dispatch, getState) => {
   try {
       let res = await editProductSPService(data);
    //    console.log('Update SP: ', res);
       if (res && res.errCode === 0 ) {
            toast.success("Update sản phẩm thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllProduct());
        }else {
            toast.error("Update thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

// ================= Delete Xóa product sản phẩm =====================
export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteProductService(productId);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa sản phẩm thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllProduct());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}

// ======= Create lưu lựa chọn sản phẩm theo giá và kg ==============
export const saveDetailSelections = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await saveSelection(data);
       if (res && res.errCode === 0 ) {
            toast.success("Tạo sản phẩm/kg thành công");
            dispatch(saveMenuSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error(res.message);
            dispatch(saveMenuFailed());
        }
    } catch (e) {
        toast.error("Tạo Thất bại!");
        dispatch(saveMenuFailed());
        console.log('createNewUser error: ', e)
   }
  }
}

// ================= Hiện ra Weight Redex =====================

export const fetchAllWeightStart = () => {
    return async (dispatch, getState) => {
   try {
       let res = await getAllWeights();
       if (res && res.errCode === 0 ) {
            dispatch(fetchAllWeightSuccess(res.data.reverse()));
        }else {
            toast.error("Fetch all user error!");
        dispatch(fetchAllWeightFailed());
        }
    } catch (e) {
         toast.error("Fetch all user error!");
        dispatch(fetchAllWeightFailed());
        // console.log('fetchAllUserStart error: ', e)
   }
  }
}

export const fetchAllWeightSuccess = (weight) => ({
    type: actionTypes.FETCH_ALL_WEIGHT_SUCCESS,
    data: weight
})

export const fetchAllWeightFailed = () => ({
    type: actionTypes.FETCH_ALL_WEIGHT_FAILED
})

// ======= Xóa lựa chọn sản phẩm theo giá và kg ========
export const deleteWeights = (weightid) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteWeightsService(weightid);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa thông tin thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}

// ================= Update lưu vào Weight =====================

 export const editWeight = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await editWeightService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Update thông tin thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

// ======= Create lưu lựa chọn sản phẩm theo giá và kg ==============
export const saveDetailDescriptions = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await saveDescriptions(data);
       if (res && res.errCode === 0 ) {
            toast.success("Tạo ảnh mô tả thành công");
            dispatch(saveMenuSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error(res.message);
            dispatch(saveMenuFailed());
        }
    } catch (e) {
        toast.error("Tạo Thất bại!");
        dispatch(saveMenuFailed());
        console.log('createNewUser error: ', e)
   }
  }
}

// ======= Xóa lựa chọn sản phẩm theo giá và kg ========
export const deleteDescriptions = (descriptionid) => {
    return async (dispatch, getState) => {
   try {
       let res = await deleteDescriptionService(descriptionid);
       if (res && res.errCode === 0 ) {
            toast.success("Xóa ảnh mô tả thành công!");
            dispatch(deleteUserSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        }
    } catch (e) {
        toast.error("Delete lỗi thất bại!");
        dispatch(deleteUserFailed());
        console.log('deleteAUser error: ', e)
   }
  }
}


// ================= Update lưu vào Weight =====================

export const editDescriptions = (data) => {
    return async (dispatch, getState) => {
   try {
       let res = await editDescriptionsService(data);
       if (res && res.errCode === 0 ) {
            toast.success("Update ảnh mô tả thành công!");
            dispatch(editUserSuccess());
            dispatch(fetchAllWeightStart());
        }else {
            toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        }
    } catch (e) {
        toast.error("Update lỗi thất bại!");
        dispatch(editUserFailed());
        console.log('EditAUser error: ', e)
   }
  }
}

// ????????????????????????????====================?????????????????????????????????????????





