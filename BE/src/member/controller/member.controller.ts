import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MemberResponse } from '../dto/memberResponse';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { Member } from '../entity/member';
import { createApiResponseOption } from 'src/util/swagger.util';
import { MemberService } from '../service/member.service';
import { validateManipulatedToken } from 'src/util/token.util';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';

@Controller('/api/member')
@ApiTags('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth() // 문서 상에 자물쇠 아이콘을 표시하여 쿠키가 필요하다는 것을 나타냄
  @ApiOperation({
    summary: '회원 정보를 반환하는 메서드',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      '현재 사용자의 정보를 반환한다.',
      MemberResponse,
    ),
  )
  getMyInfo(@Req() req: Request) {
    validateManipulatedToken(req.user as Member);
    return MemberResponse.from(req.user as Member);
  }

  @Get('/name')
  @ApiCookieAuth()
  @ApiOperation({
    summary: '면접 화면에 표출할 이름을 반환하는 메서드',
  })
  @ApiResponse(
    createApiResponseOption(
      200,
      `면접 화면에 표출할 이름(회원의 경우 저장된 이름을, 비회원의 경우 '면접자')을 반환한다.`,
      MemberNicknameResponse,
    ),
  )
  async getNameForInterview(@Req() req: Request) {
    return await this.memberService.getNameForInterview(req);
  }
}
