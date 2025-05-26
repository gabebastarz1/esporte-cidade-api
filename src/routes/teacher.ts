import express, { Request, Response } from "express";
import { AppDataSource } from "../database/config";
import { Teacher } from "../entities/teacher.entity";
import { Roles } from "../enums/roles.enum";
import bcrypt from "bcrypt";

const router = express.Router();
const teacherRepository = AppDataSource.getRepository(Teacher);

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const teachers = await teacherRepository.find({
        relations: ["modality"],
      });

      res.json(teachers);
    } catch (error) {
      console.error("Erro ao buscar professores:", error.message);
      console.error(error.stack);
      res
        .status(500)
        .json({ message: "Erro ao buscar professores.", error: error.message });
    }
  })
  .get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const teacherId = parseInt(req.params.id, 10);

      if (isNaN(teacherId)) {
        return res.status(400).json("ID de professor inválido.");
      }

      const teacher = await teacherRepository.find({
        where: {
          id: teacherId,
        },
        relations: ["modality"],
      });
      if (!teacher) {
        return res.status(404).json("Professor não encontrado.");
      }

      res.status(200).json(teacher);
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
      res.status(500).json("Erro ao buscar professor.");
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const teacher = teacherRepository.create({
        ...req.body,
        role: Roles.TEACHER,
      });

      await teacherRepository.save(teacher);
      res.status(201).json(teacher);
    } catch (error) {
      console.error("Erro ao criar professor:", error);
      res.status(500).json("Erro ao criar professor.");
    }
  })
  // Remember to add authorization to both these endpoints
  // The user requesting the password-reset should be the
  // One logged in
  .post("/password-reset", async (req, res) => {
    try {
      if (!req.body.email) {
        return res.status(400).send({ error: "The teacher's e-mail is required" });
      }

      const teacher = await teacherRepository.findOneBy({ email: req.body.email });

      if (!teacher)
        return res.status(400).send({ error: "A teacher with the given e-mail doesn't exist" });

      let token = await tokenRepository.findOneBy({ teacherId: teacher.id });

      if (!token) {
        token = await new Token({
          userId: teacher.id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const link = `${process.env.BASE_URL}/password-reset/${teacher.id}/${token.token}`;

      // e-mail service
      await sendEmail(teacher.email, "Password reset", link);

      throw new Error("not yet implemented");
      res.send({ message: "password reset link sent to your email account" });
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  })
  // Remember to add authorization to both these endpoints
  // The user requesting the password-reset should be the
  // One logged in
  .post("password-reset/:teacherId/:token", async (req, res) => {
    try {
        const teacher = await teacherRepository.findOneBy({id: Number(req.params.teacherId)});
        if (!teacher) return res.status(400).send("invalid link or expired");

        const token = await tokenRepository.findOne({
            teacherId: teacher.id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link or expired");

        teacher.password = req.body.password;

        // Save teacher with the new password
        // Delete the old token in the database
        await teacher.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
  .put("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const teacherId = parseInt(req.params.id, 10);

      if (isNaN(teacherId)) {
        return res.status(400).json("ID de professor inválido.");
      }

      const teacher = await teacherRepository.findOneBy({ id: teacherId });
      if (!teacher) {
        return res.status(404).json("Professor não encontrado.");
      }

      teacher.name = req.body.name || teacher.name;
      teacher.cpf = req.body.cpf || teacher.cpf;
      teacher.rg = req.body.rg || teacher.rg;
      teacher.birthday = req.body.birthday || teacher.birthday;
      teacher.phone = req.body.phone || teacher.phone;
      teacher.photo_url = req.body.photo_url || teacher.photo_url;
      teacher.email = req.body.email || teacher.email;

      if (req.body.password) {
        teacher.password = await bcrypt.hash(req.body.password, 10); // Criptografando a nova senha
      }

      await teacherRepository.save(teacher);
      res.status(200).json(teacher);
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res.status(500).json("Erro ao atualizar professor.");
    }
  })
  .delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const teacherId = parseInt(req.params.id, 10);

      if (isNaN(teacherId)) {
        return res.status(400).json("ID de professor inválido.");
      }

      const teacher = await teacherRepository.findOneBy({ id: teacherId });
      if (!teacher) {
        return res.status(404).json("Professor não encontrado.");
      }

      await teacherRepository.remove(teacher);
      res.status(200).json("Professor deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar professor:", error);
      res.status(500).json("Erro ao deletar professor.");
    }
  });

export default router;
