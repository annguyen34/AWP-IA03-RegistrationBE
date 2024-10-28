import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; username: string; password: string },
  ) {
    const { email, password, username } = body;
    if (!email || !password || !username) {
      throw new BadRequestException(
        'Email, username and password are required',
      );
    }

    await this.userService.register(email, password, username);
    return { status: 'success', message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (!username || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const token = await this.userService.login(username, password);
    return { status: 'success', token };
  }
}
