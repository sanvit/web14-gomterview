import memberHandlers from './handlers/member';
import questionHandlers from './handlers/question';
import answerHandlers from './handlers/answer';
import videoHandlers from '@/mocks/handlers/video';

export const handlers = [
  ...memberHandlers,
  ...questionHandlers,
  ...answerHandlers,
  ...videoHandlers,
];
