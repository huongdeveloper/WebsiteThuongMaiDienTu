import axios from '../axios'
// khai báo Api

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcodce?type=${inputType}`);
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {data: {id: userId}});
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const createMenuService = (data) => {
    return axios.post('/api/create-menuSP', data);
}

const getAllMenu = (inputId) => {
    return axios.get(`/api/get-all-menuSP?id=${inputId}`);
}

const deleteMenuService = (menId) => {
    return axios.delete('/api/delete-menuSP', {data: {id: menId}});
}

const editMenuService = (inputData) => {
    return axios.put('/api/edit-menuSP', inputData);
}

const saveProductSP = (data) => {
    console.log('Danh sách SP: ', data);
    return axios.post('/api/create-ProductSP', data);
}

const getAllProductList = (page, pageSize) => {
    return axios.get(`/api/get-all-ProductList?page=${page}&pageSize=${pageSize}`);
}

const editProductSPService = (inputData) => {
    return axios.put('/api/edit-ProductSP', inputData);
}

const getDetailProductById = (inputId) => {
    return axios.get(`/api/get-ProductSP-by-id?id=${inputId}`);
}


const deleteProductService = (productId) => {
    return axios.delete('/api/delete-ProductSP', {data: {id: productId}});
}

const saveSelection = (data) => {
    return axios.post('/api/create-Weights', data);
}

const getAllWeights = () => {
    return axios.get(`/api/get-all-Weights`);
}

const deleteWeightsService = (weightid) => {
    return axios.delete('/api/delete-Weights', {data: {id: weightid}});
}

const editWeightService = (inputData) => {
    return axios.put('/api/edit-Weights', inputData);
}

const saveDescriptions = (data) => {
    return axios.post('/api/create-Descriptions', data);
}

const deleteDescriptionService = (descriptionid) => {
    return axios.delete('/api/delete-Descriptions', {data: {id: descriptionid}});
}

const editDescriptionsService = (inputData) => {
    return axios.put('/api/edit-Descriptions', inputData);
}

const getTopProductHomeService = (limit) => {
    return axios.get(`/api/top-ProductSP-home?limit=${limit}`);
}

const getHostP1ProductService = (limit) => {
    return axios.get(`/api/get-HostP1Product?limit=${limit}`);
}

const getDescriptionIdProductById = (productId) => {
    return axios.get(`/api/top-ProductSP-home-by-id?productId=${productId}`);
}

const getCartegoryhomeById = (id, page, pageSize) => {
    return axios.get(`/api/Cartegory-home-by-id?id=${id}&page=${page}&pageSize=${pageSize}`);
}

const getAllSearchList = (searchQuery, page, pageSize) => {
    return axios.get(`/api/Search-Product-by-name?searchQuery=${searchQuery}&page=${page}&pageSize=${pageSize}`);
}

const createSliderService = (data) => {
    return axios.post('/api/create-Slider', data);
}

const getAllSlider = () => {
    return axios.get(`/api/get-all-Slider`);
}

const editSliderService = (inputData) => {
    return axios.put('/api/edit-Slider', inputData);
}

const deleteSliderService = (IdSlider) => {
    return axios.delete('/api/delete-Slider', {data: {id: IdSlider}});
}

// ===================================================================

export { handleLoginApi, getAllUsers, createNewUserService, 
    getAllMenu, createMenuService, deleteMenuService, editMenuService,
    saveProductSP, getAllProductList, saveSelection, getAllWeights, deleteWeightsService, editWeightService,
    deleteProductService, saveDescriptions, deleteDescriptionService, editDescriptionsService, editProductSPService,
    getDetailProductById, getTopProductHomeService, getDescriptionIdProductById, getCartegoryhomeById, getHostP1ProductService,
    getAllSearchList, createSliderService, getAllSlider, editSliderService, deleteSliderService,
    deleteUserService, editUserService, getAllCodeService 
};