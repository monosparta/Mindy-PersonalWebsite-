const { CommentService ,UserService}=require('../services/index')

const getAllComment = async (req, res) => {

    try {
        const comment =await CommentService.getAllComment();
        return res.status(200).json({
          detail: "成功取得所有位置資訊",
          a:comment ,
        });
      
    
    } catch (error) {
      return res.status(500).json(
        {
        detail: "伺服器內部錯誤"+error
      });
    }
  };
  

  const createComment = async (req, res) => {

    try {
        if(!req.body?.context || !req.body?.announcer){
            return res.status(400).json({
              detail: "參數錯誤，請參考文件",
            });
          }
          const { body }=req;
          const { announcer }=body;
          const existsUser=await UserService.checkUserExistOrNot(announcer);
          if (!existsUser) {
            return res.status(400).json(
              { detail: "查無此用戶" 
            });
          }
        const comment =await CommentService.creatComment(body);
        return res.status(200).json({
          detail: "成功新增留言",
          a: req.tokenPayload.id  ,
        });
      
    } catch (error) {
      return res.status(500).json(
        {
        detail: "伺服器內部錯誤"+error
      });
    }
  };

  const editComment = async (req, res) => {
    try {
        if(!req.body?.context || !req.body?.id){
            return res.status(400).json({
              detail: "參數錯誤，請參考文件",
            });
          }
        const { body }=req;

        const comment =await CommentService.editComment(body);
        return res.status(200).json({
          detail: "成功修改留言",
          a:comment ,
        });
      
    } catch (error) {
      return res.status(500).json(
        {
        detail: "伺服器內部錯誤"+error
      });
    }
  };

  const delectComment = async (req, res) => {
    try {
        if(!req.body?.id){
            return res.status(400).json({
              detail: "參數錯誤，請參考文件",
            });
          }
        const { body }=req;
        const { id }=body;
        const comment =await CommentService.delectComment(id);
        return res.status(200).json({
          detail: "成功刪除留言",
          a:comment ,
        });
      
    } catch (error) {
      return res.status(500).json(
        {
        detail: "伺服器內部錯誤"+error
      });
    }
  };

module.exports = {
    getAllComment,createComment,editComment,delectComment
  };