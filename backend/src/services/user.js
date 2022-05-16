/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-05-16 14:33:57
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-05-16 14:55:53
 * @FilePath: \backend\src\services\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const db = require('../models/index.js');

  const getAllUserInfo = async (id) => {
    let users = await db["USERS"].findAll({ 
      where: {
        id: id
      },
        attributes: ['username','image']
    });
    users = users.map((user) => {
        return user.dataValues;
  });
    return users;
  };

module.exports = {
    getAllUserInfo,
  };
