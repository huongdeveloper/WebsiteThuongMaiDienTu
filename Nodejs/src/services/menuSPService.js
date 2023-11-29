import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleMenuSP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.avatar) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            
            }else {
              await db.portfolios.create({
                name: data.name,
                image: data.avatar,

            })
            resolve({
                errCode: 0,
                message: 'OK'
            });
          } 
        } catch (e) {
            reject(e);
        }
    })
}

let getAllMenu = (menId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let menu = '';
            if (menId === 'ALL') {
                menu = await db.portfolios.findAll()
            } 
            if (menId && menId !== 'ALL') {
                menu = await db.portfolios.findOne({
                    where: { id: menId}
                })
                if (menu && menu.image) {
                    menu.image = new Buffer(menu.image, 'base64').toString('binary');
                }
            }
            resolve(menu)
        } catch (e) {
            reject(e);
        }
    })
}

let updateMenuData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id ) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            }
            let menu = await db.portfolios.findOne({
                where: { id: data.id },
                raw :false
            })
            if (menu) {
                menu.name = data.name;
                if (data.avatar) {
                    menu.image = data.avatar;
                }
                
                await menu.save();
                resolve({
                        errCode: 0,
                        message: 'Update thông tin thành công'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });

            }

        } catch (e) {
           resolve(e);
        }
    })
}

let deleteMenuSP = (menId) => {
    return new Promise(async (resolve, reject) => {
        let menu = await db.portfolios.findOne({
            where: {id: menId }
        })
        if (!menu) {
            resolve({
                errCode: 2,
                message: `The user isn't exist`
            });
        }
        await db.portfolios.destroy({
            where: {id: menId }
        });
        resolve({
            errCode: 0,
            message: `The user is delete`
        });
    })
}

let handleSlider = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.SliderA || !data.avatar) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            
            }else {
              await db.Sliders.create({
                sliderId: data.SliderA,
                image: data.avatar,

            })
            resolve({
                errCode: 0,
                message: 'OK'
            });
          } 
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSLider = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let data = '';
                data = await db.Sliders.findAll({
                    include: [   
                        {model: db.Allcode, as: 'SliderData', attributes: ['valueVi']},
                    ],
                    raw: false,
                    nest: true,
                });
                
                if(data && data.length > 0) {
                    data.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
        }catch(e) {
            reject(e);
        }
    })
}

let updateSliderData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.SliderA) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            }
            let slider = await db.Sliders.findOne({
                where: { id: data.id },
                raw :false
            })
            if (slider) {
                slider.sliderId = data.SliderA;
                if (data.avatar) {
                    slider.image = data.avatar;
                }
                
                await slider.save();
                resolve({
                        errCode: 0,
                        message: 'Update the user succeeds'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });

            }

        } catch (e) {
           resolve(e);
        }
    })
}

let deleteSlider = (IdSlider) => {
    return new Promise(async (resolve, reject) => {
        let slider = await db.Sliders.findOne({
            where: {id: IdSlider }
        })
        if (!slider) {
            resolve({
                errCode: 2,
                message: `The user isn't exist`
            });
        }
        await db.Sliders.destroy({
            where: {id: IdSlider }
        });
        resolve({
            errCode: 0,
            message: `The user is delete`
        });
    })
}

module.exports = {
    handlesliderSP: handleMenuSP,
    getAllMenu: getAllMenu,
    deleteMenuSP: deleteMenuSP,
    updateMenuData: updateMenuData,

    handleSlider: handleSlider,
    getAllSLider: getAllSLider,
    updateSliderData: updateSliderData,
    deleteSlider: deleteSlider
}