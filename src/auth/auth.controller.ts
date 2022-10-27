import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { Tokens } from './types';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { OtpSignInDto } from './dto/otpSignIn.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('otp-signin')
  otpSignIn(@Body() otpSignIn: OtpSignInDto) {
    return this.authService.otpSignIn(otpSignIn);
  }

  @Public()
  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(signUpDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
