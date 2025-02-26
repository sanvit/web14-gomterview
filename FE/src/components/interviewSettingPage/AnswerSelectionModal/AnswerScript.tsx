import Avatar from '@/components/foundation/Avatar/Avatar';
import Box from '@/components/foundation/Box/Box';
import Typography from '@/components/foundation/Typography/Typography';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';

type AnswerScriptProps = {
  name: string;
  content: string;
  userImg: string;
};

const AnswerScript: React.FC<AnswerScriptProps> = ({
  name,
  content,
  userImg,
}) => {
  return (
    <Box>
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          padding: 0.6rem;
          background-color: ${theme.colors.point.secondary.default};
          color: ${theme.colors.text.white};
          border-radius: 1rem 1rem 0 0;
        `}
      >
        <Avatar width="1.5rem" height="1.5rem" src={userImg} />
        <Typography>{name}</Typography>
      </div>
      <Typography
        component="p"
        css={css`
          padding: 0.7rem;
        `}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default AnswerScript;
