import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { Request } from 'express';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { Member } from '../../member/entity/member';
import { AuthGuard } from '@nestjs/passport';
import { createApiResponseOption } from '../../util/swagger.util';

@Controller('/api/category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth() // 문서 상에 자물쇠 아이콘을 표시하여 쿠키가 필요하다는 것을 나타냄
  @ApiOperation({
    summary: '카테고리를 추가한다.',
  })
  @ApiBody({ type: CreateCategoryRequest })
  @ApiResponse(createApiResponseOption(201, '카테고리 추가', null))
  async createCategory(
    @Req() req: Request,
    @Body() createCategoryRequest: CreateCategoryRequest,
  ) {
    return await this.categoryService.createCategory(
      createCategoryRequest,
      req.user as Member,
    );
  }
}
