import { Answer } from '@/types/answer';
import { API } from '@/constants/api';
import getAPIResponseData from '@/utils/getAPIResponseData';

export const getQuestionAnswer = async (questionId: number) => {
  return await getAPIResponseData<Answer[]>({
    method: 'get',
    url: API.ANSWER_ID(questionId),
  });
};

export const postAnswer = async (questionId: number, content: string) => {
  return await getAPIResponseData({
    method: 'post',
    url: API.ANSWER,
    data: { questionId, content },
  });
};
