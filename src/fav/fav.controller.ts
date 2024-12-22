import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavService } from './fav.service';

@Controller('favs')
export class FavController {
  constructor(private readonly favesService: FavService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.favesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveArtist(@Param('id') id: string) {
    return this.favesService.createFaveArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveArtist(@Param('id') id: string) {
    return this.favesService.deleteFaveArtist(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveAlbum(@Param('id') id: string) {
    return this.favesService.createFaveAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveAlbum(@Param('id') id: string) {
    return this.favesService.deleteFaveAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  createFaveTrack(@Param('id') id: string) {
    return this.favesService.createFaveTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteFaveTrack(@Param('id') id: string) {
    return this.favesService.deleteFaveTrack(id);
  }
}
