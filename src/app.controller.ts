import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseSignInDto, SignInDto } from './dto/SignIn.dto';
import { ResponseSignUpDto, SignUpDto } from './dto/SignUp.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('sign-up')
  signUp(@Body() payload: SignUpDto): Promise<ResponseSignUpDto> {
    return this.appService.signUp(payload);
  }

  @Post('sign-in')
  signIn(@Body() payload: SignInDto): Promise<ResponseSignInDto> {
    return this.appService.signIn(payload);
  }
}
