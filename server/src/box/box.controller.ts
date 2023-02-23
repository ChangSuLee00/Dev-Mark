import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { multerOptions } from 'src/common/utils/multer.options';
import { BoxService } from './box.service';
import { BoxEntity } from './entities/box.entity';

@Controller('api/box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @UseGuards(JwtAuthGuard)
  @Post('img')
  @UseInterceptors(FileInterceptor('img', multerOptions('')))
  uploadImg(@UploadedFile() img: Express.Multer.File) {
    return { url: `http://localhost:5000/img/${img.filename}` };
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create_box(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.boxService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll_box(@ReqWithUserId() body): Promise<BoxEntity> {
    const user_id = body.user_id;
    return this.boxService.findAll(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update_box(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.boxService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove_box(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.boxService.remove(body);
  }
}
