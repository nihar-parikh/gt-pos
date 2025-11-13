import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordResolver } from './forgot-password.resolver';
import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordResolver', () => {
  let resolver: ForgotPasswordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPasswordResolver, ForgotPasswordService],
    }).compile();

    resolver = module.get<ForgotPasswordResolver>(ForgotPasswordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
