import { Body, Controller, Get } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  signIn(@Body() loginDto: SignInDto) {
    return this.authService.login(loginDto);
  }
}
