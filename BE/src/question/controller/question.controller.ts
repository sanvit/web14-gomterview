import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { Request } from 'express';
import { TokenService } from 'src/token/service/token.service';
import { QuestionListResponse } from '../dto/questionListResponse';
import { createApiResponseOption } from '../../util/swagger.util';
import { AuthGuard } from '@nestjs/passport';
import { Member } from '../../member/entity/member';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { CategoriesResponse } from '../dto/categoriesResponse';

@Controller('/api/question')
@ApiTags('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private tokenService: TokenService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '커스텀 질문 생성' })
  @ApiResponse(createApiResponseOption(201, '커스텀 질문 생성', null))
  async createCustomQuestion(
    @Req() req: Request,
    @Body() customQuestionRequest: CustomQuestionRequest,
  ) {
    await this.questionService.createCustomQuestion(
      customQuestionRequest,
      req.user as Member,
    );
  }

  @Get('')
  @ApiResponse(
    createApiResponseOption(
      200,
      '카테고리별 게시물 조회 api',
      QuestionListResponse,
    ),
  )
  @ApiOperation({ summary: '카테고리별 질문 조회' })
  @UseGuards(AuthGuard('jwt-soft'))
  async findAllByCategory(
    @Query('category') category: string,
    @Req() request: Request,
  ): Promise<any> {
    const member = request.user;
    return await this.questionService.findByCategory(
      category,
      member ? (request.user as Member).id : undefined,
    );
  }

  @Get('/category')
  @ApiResponse(
    createApiResponseOption(200, '전체 카테고리 조회', CategoriesResponse),
  )
  @ApiOperation({ summary: '전체 카테고리 조회' })
  async findAllCategories(): Promise<any> {
    return new CategoriesResponse(await this.questionService.findCategories());
  }

  @ApiOperation({ summary: '게시글 삭제 api' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':questionId')
  @ApiResponse(createApiResponseOption(204, '게시글 삭제', null))
  async deleteQuestion(
    @Param('questionId') questionId: number,
    @Req() req: Request,
  ) {
    await this.questionService.deleteById(questionId, req.user as Member);
  }
}
