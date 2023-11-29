import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)
        }
    })
}

let handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
          if(check === true) {
            resolve({
                errCode: 1,
                message: 'Email của bạn đã được sử dụng. Vui lòng nhập Email khác!'
            })
          }else {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                name: data.name,
                phonenumber: data.phonenumber,
                email: data.email,
                address: data.address,
                password: hashPassWordFromBcrypt,
                image: data.avatar,
                roleId: data.roleId

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

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password','name', 'image'],
                    where: { email: email },
                    raw: true,

                });
                if (user && user.image) {
                    user.image = new Buffer(user.image, 'base64').toString('binary');
                }
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Mật khẩu bạn đã nhập không chính xác! Vui lòng nhập lại.';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Email của bạn không tồn tại trong hệ thống của chúng tôi, vui lòng thử email khác.`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } 
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteNewUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: {id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                message: `The user isn't exist`
            });
        }
        await db.User.destroy({
            where: {id: userId }
        });
        resolve({
            errCode: 0,
            message: `The user is delete`
        });
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId ) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw :false
            })
            if (user) {
                user.name = data.name;
                user.address = data.address;
                user.roleId = data.roleId;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                
                await user.save();
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

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            }else {
                let res = {};
                let allcodce = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
                res.errCode = 0;
                res.data = allcodce;
                resolve(res);
            }
            
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleCreateUser: handleCreateUser,
    handleUserLogin: handleUserLogin,
    getAllUsers : getAllUsers,
    deleteNewUser: deleteNewUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    
}