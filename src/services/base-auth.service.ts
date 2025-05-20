import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authConfig } from "../config/auth";
interface User {
  id: number;
  email: string;
  password: string;
  tokens: string;
}
export abstract class BaseAuthService<T> {
  protected abstract repository: any;

  async authenticate(credentials: any) {
    try {
      const user = (await this.findUser(credentials)) as User | null;
      if (!user) return this.failResponse("usuario inválido");

      const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!passwordMatch) return this.failResponse("senha incorreta");

      const tokens = this.generateTokens(user);
      return this.successResponse(user, tokens);
    } catch (error) {
      console.error("Authentication error:", error);
      return this.failResponse("Erro na autenticação");
    }
  }

  protected abstract findUser(credentials: any): Promise<T | null>;

  protected generateTokens(user: any) {
    const accessToken = sign(
      this.getAccessTokenPayload(user),
      authConfig.accessToken.secret,
      { expiresIn: authConfig.accessToken.expiresIn }
    );

    const refreshToken = sign({ id: user.id }, authConfig.refreshToken.secret, {
      expiresIn: authConfig.refreshToken.expiresIn,
    });

    return { accessToken, refreshToken };
  }

  protected abstract getAccessTokenPayload(user: T): any;

  protected successResponse(user: any, tokens: any) {
    return {
      success: true,
      data: {
        ...tokens,
        user: this.getUserResponse(user),
      },
    };
  }

  protected failResponse(message: string) {
    return { success: false, message };
  }

  protected abstract getUserResponse(user: T): any;
}
