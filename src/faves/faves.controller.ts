import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FavesService } from './faves.service';

@Controller('favs')
export class FavesController {
  constructor(private readonly favesService: FavesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.favesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(201)
  createFaveArtist(@Param('id') id: string) {
    return this.favesService.createFaveArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFaveArtist(@Param('id') id: string) {
    return this.favesService.deleteFaveArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  createFaveAlbum(@Param('id') id: string) {
    return this.favesService.createFaveAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFaveAlbum(@Param('id') id: string) {
    return this.favesService.deleteFaveAlbum(id);
  }
}
