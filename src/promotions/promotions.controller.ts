import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Promotions } from 'src/entities/Promotions';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  // @Post()
  // create(@Body() createPromotionDto: CreatePromotionDto) {
  //   return this.promotionsService.create(createPromotionDto);
  // }

  @Get()
  @ApiOperation({ summary: '프로모션 리스트' })
  @ApiOkResponse({
    description: '성공',
    type: Promotions,
  })
  findAll() {
    return this.promotionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.promotionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePromotionDto: UpdatePromotionDto,
  // ) {
  //   return this.promotionsService.update(+id, updatePromotionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.promotionsService.remove(+id);
  // }
}
