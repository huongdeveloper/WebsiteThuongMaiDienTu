import menuSPService from '../services/menuSPService';

let handleCreateMenuSP = async (req, res) => { 
    try {
        let message = await menuSPService.handleMenuSP(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleGetAllMenuSP = async (req, res) => {
    let id = req.query.id;
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            menu: []
        })
    }
    let menu = await menuSPService.getAllMenu(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        menu
    })
}

let handleEditMenuSP = async (req, res) => {
    let data = req.body;
    let message = await menuSPService.updateMenuData(data);
    return res.status(200).json(message);
}

let handleDeleteMenuSP =async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
        })
    }
    let message = await menuSPService.deleteMenuSP(req.body.id);
    return res.status(200).json(message);

}

let handleCreateSlider = async (req, res) => { 
    try {
        let message = await menuSPService.handleSlider(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleAllSLider = async (req, res) => { 
    try {
        let message = await menuSPService.getAllSLider();
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handUpdateSliderData = async (req, res) => { 
    try {
        let data = req.body;
        let message = await menuSPService.updateSliderData(data);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

let handleDeleteSlider =async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
        })
    }
    let message = await menuSPService.deleteSlider(req.body.id);
    return res.status(200).json(message);

}

module.exports = {
    handleCreateMenuSP: handleCreateMenuSP,
    handleGetAllMenuSP: handleGetAllMenuSP,
    handleDeleteMenuSP: handleDeleteMenuSP,
    handleEditMenuSP: handleEditMenuSP,

    handleCreateSlider: handleCreateSlider,
    handleAllSLider: handleAllSLider,
    handUpdateSliderData: handUpdateSliderData,
    handleDeleteSlider: handleDeleteSlider
}