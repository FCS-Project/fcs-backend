import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { GetCurrentUserRole } from 'src/common/decorators/get-current-user-role.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Get('/documents')
  findDocuments(@GetCurrentUserId() userId: string) {
    return this.userService.getUserDocuments(userId);
  }

  @Get('/home')
  getHome() {
    return this.userService.getHome();
  }

  @Get('/admin/users')
  getUsers(@GetCurrentUserRole() role: string) {
    return this.userService.getUsers(role);
  }

  @Get('/admin/organisations')
  getOrganisations(@GetCurrentUserRole() role: string) {
    return this.userService.getOrganisations(role);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetCurrentUserRole() role: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.userService.findOne(id, role, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.userService.update(id, updateUserDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUserRole() role: string) {
    return this.userService.remove(id, role);
  }

  @Get('/profile/:id')
  getProfile(
    @Param('id') id: string,
    @GetCurrentUserId() userId: string,
    @GetCurrentUserRole() role: string,
  ) {
    return this.userService.getProfile(id, userId, role);
  }
}
