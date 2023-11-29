import ProductService from '../services/ProductService';


let handleCreateProductSP = async (req, res) => { 
    try {
        let message = await ProductService.CreateProductSP(req.body, req.body.imageList);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let getAllProductList = async (req, res) => { 
    try {
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        let message = await ProductService.getAllProductList(page, pageSize);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleEditProductSP = async (req, res) => { 
    try {
        let data = req.body;
        let message = await ProductService.updateProductSP(data);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let getProductById = async (req, res) => {
    try {
        let infor = await ProductService.getDetailProductById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleDeleteProduct =async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
        })
    }
    let message = await ProductService.deleteProduct(req.body.id);
    return res.status(200).json(message);

}

let handleCreateWeights = async (req, res) => { 
    try {
        let message = await ProductService.CreateWeights(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let getAllWeights = async (req, res) => { 
    try {
        let message = await ProductService.getAllWeights();
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let deleteWeights = async (req, res) => { 
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
        })
    }
    let message = await ProductService.deleteWeights(req.body.id);
    return res.status(200).json(message);
}

let handleEditWeight = async (req, res) => { 
    try {
        let data = req.body;
        let message = await ProductService.updateWeightData(data);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleCreateDescriptions = async (req, res) => { 
    try {
        let message = await ProductService.CreateDescription(req.body, req.body.imageList);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let deleteDescription = async (req, res) => { 
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
        })
    }
    let message = await ProductService.deleteDescription(req.body.id);
    return res.status(200).json(message);
}

let handleEditDescriptions = async (req, res) => { 
    try {
        let data = req.body;
        let message = await ProductService.updateDescriptionsData(data);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handlegetProductHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let response = await ProductService.getProductHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let handlegetHostP1Product = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let response = await ProductService.getHostP1Product(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getDescriptionIdProductById = async (req, res) => {
    try {
        let infor = await ProductService.getDescriptionIdProduct(req.query.productId);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let getCategoryId = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 15;
        let id = req.query.id;
        let Mess = await ProductService.getByCategoryId(id, page, pageSize);
        return res.status(200).json(Mess);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let getAllSearchList = async (req, res) => { 
    try {
        let searchQuery = req.query.searchQuery || ''; 
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 10;
        
        let message = await ProductService.searchProductList(searchQuery, page, pageSize);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from the server'
        });
    }
}

module.exports = {
    handleCreateProductSP: handleCreateProductSP,
    getAllProductList: getAllProductList,
    handleEditProductSP: handleEditProductSP,
    handleDeleteProduct: handleDeleteProduct,
    getProductById: getProductById,
    
    getAllWeights: getAllWeights,
    handleCreateWeights: handleCreateWeights,
    deleteWeights: deleteWeights,
    handleEditWeight: handleEditWeight,

    handleCreateDescriptions: handleCreateDescriptions,
    deleteDescription: deleteDescription,
    handleEditDescriptions: handleEditDescriptions,

    handlegetProductHome:handlegetProductHome,
    getDescriptionIdProductById: getDescriptionIdProductById,
    getCategoryId: getCategoryId,
    handlegetHostP1Product: handlegetHostP1Product,
    getAllSearchList: getAllSearchList

}