import { theme } from '@styles/theme';
import { css } from '@emotion/react';

import Icon from '@foundation/Icon/Icon';
import Typography from '@foundation/Typography/Typography';

type InterviewExitButtonType = {
  handleInterviewExit: () => void;
};

const InterviewExitButton: React.FC<InterviewExitButtonType> = ({
  handleInterviewExit,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      `}
      onClick={handleInterviewExit}
    >
      <Icon id="close-circle" width="2rem" height="2rem" />
      <Typography variant={'body1'} color={theme.colors.text.white}>
        나가기
      </Typography>
    </div>
  );
};
export default InterviewExitButton;
