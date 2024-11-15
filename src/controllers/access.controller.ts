import { log } from "console";

class AccessController {
  signUp = async (req: any, res: any, next: any) => {
    try {
      // Implement the logic for signing up a user
      log("[P]::signUp::", req.body);
      //   const { email, password } = req.body;
      //   res.json({ email, password });
      return res.status(201).json({
        code: "2001",
        metadata: {
          userId: 1,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AccessController();
