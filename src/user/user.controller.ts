import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUserRole } from 'src/common/decorators/get-current-user-role.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetCurrentUserRole() role: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.userService.findOne(id, role, userId);
  }

  @Get('/documents')
  findDocuments(@GetCurrentUserId() userId: string) {
    return this.userService.getUserDocuments(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserRole() role: string) {
    return this.userService.remove(id, role);
  }

  @Public()
  @Get('/profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }
}
