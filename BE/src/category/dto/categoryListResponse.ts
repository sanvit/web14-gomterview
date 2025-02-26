import { ApiProperty } from '@nestjs/swagger';
import { createPropertyOption } from '../../util/swagger.util';
import { CategoryResponse } from './categoryResponse';
import { categoryListResponseFixture } from '../fixture/category.fixture';

export class CategoryListResponse {
  @ApiProperty(
    createPropertyOption(categoryListResponseFixture, '카테고리 리스트 응답', [
      CategoryResponse,
    ]),
  )
  categoryList: CategoryResponse[];

  constructor(categoryList: CategoryResponse[]) {
    this.categoryList = categoryList;
  }

  static of(categoryList: CategoryResponse[]) {
    return new CategoryListResponse(categoryList);
  }
}
