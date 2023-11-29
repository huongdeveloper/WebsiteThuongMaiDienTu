import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import menuSPController from '../controllers/menuSPController'
import ProductController from '../controllers/ProductController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.post('/api/create-menuSP', menuSPController.handleCreateMenuSP);
    router.get('/api/get-all-menuSP', menuSPController.handleGetAllMenuSP);
    router.put('/api/edit-menuSP', menuSPController.handleEditMenuSP);
    router.delete('/api/delete-menuSP', menuSPController.handleDeleteMenuSP);

    router.post('/api/create-Slider', menuSPController.handleCreateSlider);
    router.get('/api/get-all-Slider', menuSPController.handleAllSLider);
    router.put('/api/edit-Slider', menuSPController.handUpdateSliderData);
    router.delete('/api/delete-Slider', menuSPController.handleDeleteSlider);

    router.post('/api/create-ProductSP', ProductController.handleCreateProductSP);
    router.get('/api/get-all-ProductList', ProductController.getAllProductList);
    router.put('/api/edit-ProductSP', ProductController.handleEditProductSP);
    router.delete('/api/delete-ProductSP', ProductController.handleDeleteProduct);
    router.get('/api/get-ProductSP-by-id', ProductController.getProductById);
    router.get('/api/get-HostP1Product', ProductController.handlegetHostP1Product);
    router.get('/api/top-ProductSP-home', ProductController.handlegetProductHome);
    router.get('/api/top-ProductSP-home-by-id', ProductController.getDescriptionIdProductById);
    router.get('/api/Cartegory-home-by-id', ProductController.getCategoryId);
    router.get('/api/Search-Product-by-name', ProductController.getAllSearchList);

 router.post('/api/create-Weights', ProductController.handleCreateWeights);
 router.get('/api/get-all-Weights', ProductController.getAllWeights);
 router.put('/api/edit-Weights', ProductController.handleEditWeight);
 router.delete('/api/delete-Weights', ProductController.deleteWeights);

 router.post('/api/create-Descriptions', ProductController.handleCreateDescriptions);
 router.delete('/api/delete-Descriptions', ProductController.deleteDescription);
 router.put('/api/edit-Descriptions', ProductController.handleEditDescriptions);

    router.get('/api/allcodce', userController.getAllCode);



    return app.use("/", router);
}

module.exports = initWebRoutes;