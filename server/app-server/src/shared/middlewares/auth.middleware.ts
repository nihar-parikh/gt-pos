// import {
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { jwtConstants } from 'src/auth/constants';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private jwtService: JwtService) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     if (req.method === 'POST' && req.url === '/') {
//       const body = req.body as { operationName?: string };
//       const operationName =
//         body && body.operationName ? body.operationName : null;
//       if (operationName === 'LoginMutation') {
//         return next();
//       }
//       const token = req.headers['token'] as string;

//       if (!token) {
//         throw new UnauthorizedException();
//       }
//       try {
//         const payload: Record<string, any> = await this.jwtService.verifyAsync(
//           token,
//           {
//             secret: jwtConstants.secret,
//           },
//         );
//         // 💡 We're assigning the payload to the request object here
//         // so that we can access it in our route handlers
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//         (req as any).user = payload;
//       } catch {
//         throw new UnauthorizedException();
//       }
//     } else {
//       //   console.log(`[GraphQL Request] ${JSON.stringify(req.headers)}`);
//     }
//     next();
//   }
// }
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { jwtConstants } from 'src/constants/constant';

interface JwtPayload {
  sub: string;
  username: string;
  tenantId?: string;
  roles?: string[];
  [key: string]: unknown;
}

// Extend Express Request type to include user
declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' && req.url === '/') {
      const body = req.body as { operationName?: string; query?: string };

      let operationName = body?.operationName ?? null;
      // 🔍 Extract mutation name from the GraphQL query if operationName is null
      if (!operationName && body?.query) {
        const match = body.query.match(/mutation\s*\{?\s*(\w+)/);
        if (match) {
          operationName = match[1]; // e.g. "signUp", "login"
        }
      }

      // ⏭ Skip auth for login or signup
      if (
        operationName === 'login' ||
        operationName === 'signUp' ||
        operationName === 'sendOtp' ||
        operationName === 'verifyOtp' ||
        operationName === 'resetPassword' ||
        operationName === 'createTenant'
      ) {
        return next();
      }

      // 🔑 Require JWT for everything else
      const token = req.headers['token'] as string;
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret: jwtConstants.secret,
        });
        req.user = payload; // attach user to request
      } catch {
        throw new UnauthorizedException();
      }
    }

    next();
  }
}
