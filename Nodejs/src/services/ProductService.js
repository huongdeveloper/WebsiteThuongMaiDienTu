import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let CreateProductSP = (data, imageList) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.name) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter! '
                })
            }else {
                let productA = await db.Product.create({
                    name: data.name,
                    price: data.price, 
                    image: data.avatar,
                    discount: data.discount,
                    selled: data.selled,
                    inventory: data.inventory,
                    contentDetailHTML: data.contentDetailHTML,
                    contentDetail: data.contentDetail,
                    contentDescribeHTML: data.contentDescribeHTML,
                    contentDescribe: data.contentDescribe,
                    portfoliosId: data.cartegory,
                    hostId: data.hostA
                  });
                  if (imageList && imageList.length > 0) {
                    let descriptionImageObjects = imageList.map((image) => ({
                        productId: productA.id,
                        imageUrl: image.avatar,
                    }));
                        await db.Descriptions.bulkCreate(descriptionImageObjects);
                  }
                  
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
          } catch (e) {
                reject(e);
          }
    })
}
let getProductHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try{
            let data = await db.Product.findAll({
                    limit: limitInput,
                    order: [['createdAt', 'DESC']],
                    where: {hostId: 'P0'},
                });
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

let getHostP1Product = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try{
            let data = await db.Product.findAll({
                    limit: limitInput,
                    order: [['createdAt', 'DESC']],
                    where: {hostId: 'P1'},
                });
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

let getAllProductList = (page, pageSize) => {
    return new Promise(async (resolve, reject) => {
        try{
            let data = '';
                data = await db.Product.findAndCountAll({
                    include: [
                        {model: db.portfolios, attributes: ['name']},
                        {model: db.Allcode, as: 'hostData', attributes: ['valueVi']},
                        { model: db.Descriptions, as: 'imageList', attributes: ['imageUrl']},
                        {model: db.Weights, attributes: ['nameWeight', 'price']},
                    ],
                    raw: false,
                    nest: true,
                    limit: pageSize, 
                    offset: (page - 1) * pageSize 
                });
                
                if(data && data.rows && data.rows.length > 0) {
                    data.rows.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        
                        if (item.imageList && item.imageList.length > 0) {
                            item.imageList.forEach(image => {
                                image.imageUrl = new Buffer(image.imageUrl, 'base64').toString('binary');
                            });
                        }
                        return item;
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'ok',
                        data: data.rows,
                        totalCount: data.count
                    });
                    
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'No data available',
                        data: [],
                        totalCount: 0
                    });
                }
        }catch(e) {
            reject(e);
        }
    })
}

let updateProductSP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.imageList || data.imageList.length === 0) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters: id or imageList"
                });
            }

            let productA = await db.Product.findOne({
                where: { id: data.id },
                raw :false
            });

            if (productA) {
                    productA.name = data.name;
                    productA.price = data.price;
                    productA.discount = data.discount;
                    productA.selled = data.selled;
                    productA.inventory = data.inventory;
                    productA.contentDetailHTML = data.contentDetailHTML;
                    productA.contentDetail = data.contentDetail;
                    productA.contentDescribeHTML = data.contentDescribeHTML;
                    productA.contentDescribe = data.contentDescribe;
                    productA.portfoliosId = data.cartegory;
                    productA.hostId = data.hostA;

                    if (data.avatar) {
                        productA.image = data.avatar;
                    }
                if (data.imageList && data.imageList.length > 0) {
                    for (let i = 0; i < data.imageList.length; i++) {
                        if (data.imageList[i].avatar) {
                            let descriptionImage = await db.Descriptions.findOne({
                                where: { productId: productA.id, imageUrl: data.imageList[i].avatar }
                            });

                            if (!descriptionImage) {
                                await db.Descriptions.create({
                                    productId: productA.id,
                                    imageUrl: data.imageList[i].avatar
                                });
                            }
                        }
                    }
                }

                await productA.save();

                resolve({
                    errCode: 0,
                    message: "Update the product succeeds"
                });

                
            } else {
                resolve({
                    errCode: 1,
                    message: "Product not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getDetailProductById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try{
             if(!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter '
                })
            }else {
                let data = await db.Product.findOne({
                    where: {
                        id: inputId
                    },
                    
                    include: [
                        {model: db.portfolios, attributes: ['name']},
                        {model: db.Allcode, as: 'hostData', attributes: ['valueVi']},
                        { model: db.Descriptions, as: 'imageList', attributes: ['imageUrl']},
                        {model: db.Weights, attributes: ['nameWeight', 'price']},
                    ],
                    raw: false,
                    nest: true
                });
                if(data && data.length > 0) {
                    data.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        
                        if (item.imageList && item.imageList.length > 0) {
                            item.imageList.forEach(image => {
                                image.imageUrl = new Buffer(image.imageUrl, 'base64').toString('binary');
                            });
                        }
                        return item;
                    })
                    
                }   
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data
                })
                
            }
        }catch(e) {
            reject(e);
        }
    })
}

let deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.Product.findOne({
            where: {id: productId }
        })
        if (!product) {
            resolve({
                errCode: 2,
                message: `The user isn't exist`
            });
        }
        await db.Descriptions.destroy({
            where: { productId: productId },
        });

        await db.Weights.destroy({
            where: { productId: productId },
        });
        await db.Product.destroy({
            where: {id: productId }
        });
        resolve({
            errCode: 0,
            message: `The user is delete`
        });
    })
}
let CreateWeights = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.nameWeight) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter! '
                })
            }else {
                  await db.Weights.create({
                    nameWeight: data.nameWeight,
                    productId: data.productId, 
                    price: data.price
                  });
                  
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
          } catch (e) {
                reject(e);
          }
    })
}

let getAllWeights = () => {
    return new Promise(async (resolve, reject) => {
        try{
                let data = await db.Product.findAll({
                    attributes: {
                        exclude: ['image', 'portfoliosId', 'discount', 'selled', 'inventory', 'hostId', 
                        'contentDetailHTML', 'contentDetail', 'contentDescribeHTML', 'contentDescribe']
                    },
                    include: [
                        {model: db.Weights, attributes: ['nameWeight', 'price', 'id'], 
                        },
                        { model: db.Descriptions, as: 'imageList', attributes: ['imageUrl', 'id']},
                    ],
                    raw: false,
                    nest: true
                });

                if(data && data.length > 0) {
                    data.map(item => { 
                        if (item.imageList && item.imageList.length > 0) {
                            item.imageList.forEach(image => {
                                image.imageUrl = new Buffer(image.imageUrl, 'base64').toString('binary');
                            });
                        }
                        return item;
                    })
                    
                }   
                
                if (!data || !data.length === 0) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Không có dữ liệu hoặc Weights rỗng.',
                        data: null
                    });
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

let deleteWeights = (weightid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await db.Weights.findOne({
                where: {id: weightid }
            })
            if (!result) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                });
            }
            await db.Weights.destroy({
                where: {id: weightid }
            });
            resolve({
                errCode: 0,
                message: `The user is delete`
            });
    }catch(e) {
        reject(e);
    }
    })
}

let updateWeightData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.productId) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            }
            let weight = await db.Weights.findOne({
                where: { id: data.id },
                raw :false
            })
            if (weight) {
                weight.nameWeight = data.nameWeight;
                weight.price = data.price;
                weight.productId = data.productId;
                await weight.save();
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

let CreateDescription = (data, imageList) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter! '
                })
            }else {
                if (imageList && imageList.length > 0) {
                    let descriptionImageObjects = imageList.map((image) => ({
                        productId: data.productId,
                        imageUrl: image.avatar,
                    }));
                        await db.Descriptions.bulkCreate(descriptionImageObjects);
                  }
                  
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
          } catch (e) {
                reject(e);
          }
    })
}

let deleteDescription = (descriptionid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await db.Descriptions.findOne({
                where: {id: descriptionid }
            })
            if (!result) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                });
            }
            await db.Descriptions.destroy({
                where: {id: descriptionid }
            });
            resolve({
                errCode: 0,
                message: `The user is delete`
            });
    }catch(e) {
        reject(e);
    }
    })
}

let updateDescriptionsData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.productId) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            }
            let imgs = await db.Descriptions.findOne({
                where: { id: data.id },
                raw :false
            })
            if (imgs) {
                imgs.productId = data.productId;
                
                if (data.imageList && data.imageList.length > 0) {
                    for (let i = 0; i < data.imageList.length; i++) {
                        if (data.imageList[i].avatar) {
                            imgs.imageUrl = data.imageList[i].avatar;
                            await imgs.save();
                        }
                    }
                }
                await imgs.save();
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

let getDescriptionIdProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!productId ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                let data = await db.Product.findAll({
                    where: {
                        id: productId
                    },
                    attributes: {
                        exclude: ['image', 'portfoliosId', 'discount', 'selled', 'inventory', 'hostId', 
                        'contentDetailHTML', 'contentDetail', 'contentDescribeHTML', 'contentDescribe']
                    },
                    include: [
                        { model: db.Descriptions, as: 'imageList', attributes: ['imageUrl', 'id']},
                    ],
                    raw: false,
                    nest: true
                });

                if(data && data.length > 0) {
                    data.map(item => { 
                        if (item.imageList && item.imageList.length > 0) {
                            item.imageList.forEach(image => {
                                image.imageUrl = new Buffer(image.imageUrl, 'base64').toString('binary');
                            });
                        }
                        return item;
                    })
                    
                }   
                
                if (!data || !data.length === 0) {
                    return resolve({
                        errCode: 1,
                        errMessage: 'Không có dữ liệu hoặc Weights rỗng.',
                        data: null
                    });
                }
            
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data: data
            })
            }
                
        }catch(e) {
            reject(e);
        }
    })
}

let getByCategoryId = (id, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter id'
                });
            } else {
                let offset = (page - 1) * pageSize;
                let { count, rows } = await db.Product.findAndCountAll({
                    where: {
                        portfoliosId: id 
                    },
                    include: [
                        
                        { model: db.portfolios, attributes: ['name'] },
                        { model: db.Allcode, as: 'hostData', attributes: ['valueVi'] },
                    ],
                    raw: false,
                    nest: true,
                    offset,
                    limit: pageSize,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: rows,
                    totalItems: count,
                    currentPage: page,
                    pageSize: pageSize
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let searchProductList = ( searchQuery, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Product.findAndCountAll({
                where: {
                    name: {
                        [db.Sequelize.Op.like]: `%${searchQuery}%`
                    }
                },
                limit: pageSize,
                offset: (page - 1) * pageSize,
                raw: false,
                nest: true,
            });
            if (data && data.rows && data.rows.length > 0) {
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data: data.rows,
                    totalCount: data.count
                });
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'No data available',
                    data: [],
                    totalCount: 0
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    CreateProductSP: CreateProductSP,
    getAllProductList: getAllProductList,
    deleteWeights: deleteWeights,
    updateProductSP: updateProductSP,
    deleteProduct: deleteProduct,
    getDetailProductById: getDetailProductById,

    CreateWeights: CreateWeights,
    getAllWeights: getAllWeights,
    updateWeightData: updateWeightData,
    CreateDescription: CreateDescription,
    deleteDescription: deleteDescription,
    updateDescriptionsData: updateDescriptionsData,

    getProductHome: getProductHome,
    getHostP1Product: getHostP1Product,
    getDescriptionIdProduct: getDescriptionIdProduct,
    getByCategoryId: getByCategoryId,
    searchProductList: searchProductList
}