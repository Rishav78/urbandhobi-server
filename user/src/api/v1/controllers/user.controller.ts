import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/lib/guards';
import { User } from 'src/typings';
import { UserContext } from '../decorators/user.decorator';

@Controller()
export class UserController {
  @UseGuards(AuthGuard)
  @Get('currentuser')
  public async currentUser(@UserContext() user: User) {
    return user;
  }
}
