/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-16 14:31:04
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-05-18 17:02:16
 * @FilePath: \backend\src\controller\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { UserService } = require("../services/index.js");
const getAllUserInfo = async (req, res) => {
  try {
 
    if(!req.body?.id){
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const { body } = req;
    const { id } = body;
    const users =await UserService.getAllUserInfo(id);
    return res.status(200).json({
      detail: "成功取得所有位置資訊",
      users: [...users.values()],
    });
  
  } catch (error) {
    return res.status(500).json(
    
      {
      detail: "伺服器內部錯誤"+error,
    });
  }
};

const userRegistration = async (req, res) => {

  try {

    if(!req.body?.username || !req.body?.password || !req.body?.mail ){
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const { body } = req;
    const { mail } = body;
    const existUser = await UserService.checkMailExistOrNot(mail);
    if (existUser) {
      return res.status(400).json(
        { detail: "該用戶已註冊" 
      });
     
    }
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(mail.search(emailRule)=== -1){
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
  }
    const userSingUpState = await UserService.creatUser (body);
    return res.status(200).json({
      detail: userSingUpState,
    });
  
  } catch (error) {
    return res.status(500).json(
      {
      detail: "伺服器內部錯誤"+error
    });
  }
};

const userLogin= async (req, res) => {
  try {
    if(!req.body?.mail || !req.body?.password){
      return res.status(400).json({
        detail: "參數錯誤，請參考文件",
      });
    }
    const { body } = req;
    const { mail, password} = body;
    const existUser = await UserService.checkMailExistOrNot(mail);
    if (!existUser) {
      return res.status(400).json(
        { detail: "查無此用戶" 
      });
    }
    const compareResult = await bcrypt
    .compare(password, existUser.password)
    .then((result) => {
      return result;
    });

    if (!compareResult) {
      return res.status(403).json({
        detail: "帳號或密碼錯誤",
      });
    }
    var payload = {
      id: existUser.id ,
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
    };
    var token = jwt.sign(payload,process.env.JWT_SECRET);
    return res.status(200).json({
      detail: "登入成功",
      token:token,
    });
  }
  catch(error){
    return res.status(500).json({
      detail: "伺服器內部錯誤"+error+"：：：："+process.env.JWT_SECRET,
    });
  }

}
module.exports = {
  getAllUserInfo,
  userRegistration,
  userLogin
};