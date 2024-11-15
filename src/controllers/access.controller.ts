import { log } from "console";
import AccessService from "../services/access.service";
import KeyTokenService from "../services/keyToken.service";
class AccessController {
  signUp = async (req: any, res: any, next: any) => {
    try {
      const keyTokenService = new KeyTokenService();
      const accessService = new AccessService(keyTokenService);
      // Implement the logic for signing up a user
      log("[P]::signUp::", req.body);
      //   const { email, password } = req.body;
      //   res.json({ email, password });
      const access = await accessService.signUp(req.body);
      return res.status(201).json(access);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default new AccessController();
