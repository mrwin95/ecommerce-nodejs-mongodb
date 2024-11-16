import { log } from "console";
import AccessService from "../services/access.service";
import KeyTokenService from "../services/keyToken.service";
import { Created } from "../middlewares/sucess.response";
class AccessController {
  signUp = async (req: any, res: any, next: any) => {
    const keyTokenService = new KeyTokenService();
    const accessService = new AccessService(keyTokenService);
    // Implement the logic for signing up a user
    log("[P]::signUp::", req.body);
    const access = await accessService.signUp(req.body);
    new Created("User created successfully", access).send(res);
  };
}

export default new AccessController();
