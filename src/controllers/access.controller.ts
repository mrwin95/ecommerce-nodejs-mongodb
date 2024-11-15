import { log } from "console";
import AccessService from "../services/access.service";
const accessService = new AccessService();

class AccessController {
  signUp = async (req: any, res: any, next: any) => {
    try {
      // Implement the logic for signing up a user
      log("[P]::signUp::", req.body);
      //   const { email, password } = req.body;
      //   res.json({ email, password });
      return res.status(201).json(await accessService.signUp(req.body));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default new AccessController();
