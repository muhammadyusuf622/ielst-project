import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt"

@Injectable()
export class JwtHelper {
  constructor(private readonly jwt: JwtService) {};

  async generateToken(payload: {id: string, role: string}) {

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.SECRET_TOKEN_KEY,
      expiresIn: process.env.SECRET_TOKEN_TIME,
    });

    return token;
  }

  async verifyToken(token: string){
    try {
      const tokenKey = process.env.SECRET_TOKEN_KEY;
      const openToken = await this.jwt.verifyAsync(token, {secret: tokenKey});
      return openToken;
    } catch (error) {

      if(error instanceof TokenExpiredError) {
        throw new ForbiddenException('token time out');
      }
      if(error instanceof JsonWebTokenError) {
        throw new NotFoundException('token not found')
      }
      throw new InternalServerErrorException("server error");
    }
  }
}