import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private readonly favesService: FavService) {}

  @UseGuards(JwtGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.favesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveArtist(@Param('id') id: string) {
    return this.favesService.createFaveArtist(id);
  }

  @UseGuards(JwtGuard)
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveArtist(@Param('id') id: string) {
    return this.favesService.deleteFaveArtist(id);
  }

  @UseGuards(JwtGuard)
  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveAlbum(@Param('id') id: string) {
    return this.favesService.createFaveAlbum(id);
  }

  @UseGuards(JwtGuard)
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveAlbum(@Param('id') id: string) {
    return this.favesService.deleteFaveAlbum(id);
  }

  @UseGuards(JwtGuard)
  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveTrack(@Param('id') id: string) {
    return this.favesService.createFaveTrack(id);
  }

  @UseGuards(JwtGuard)
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveTrack(@Param('id') id: string) {
    return this.favesService.deleteFaveTrack(id);
  }
}
