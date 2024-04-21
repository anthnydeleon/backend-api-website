import multer from "multer";
import multerConfig from "../config/multerConfig";
import Photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  async create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { user_id } = req.body;
        const photo = await Photo.create({ originalname, filename, user_id });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ["Aluno não existe."],
        });
      }
    });
  }
}

export default new PhotoController();
