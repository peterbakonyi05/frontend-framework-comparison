import type { Post as PostModel } from '@tbcc/models';
import Link from 'next/link';

import { dateUtil } from '../lib/date.util';
import { Card, Heading, Stack, Text } from '@chakra-ui/react';

export interface PostProps {
  post: PostModel;
  commentCount: number | undefined;
}

export const Post: React.FC<PostProps> = ({ post, commentCount }) => {
  return (
    <Card as="article" p={6} width="full">
      <Link href={`/posts/${encodeURIComponent(post.id)}`}>
        <Heading as={'h3'} fontSize="md" mb={3}>
          {post.title}
        </Heading>
      </Link>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text color="gray.500" fontSize="xs" as="div">
          Created at: {dateUtil.convertIsoStringToDisplay(post.createdAt)}
        </Text>
        {typeof commentCount === 'number' ? (
          <Text color="gray.500" fontSize="xs" as="div">
            {commentCount} {`comment${commentCount === 1 ? '' : 's'}`}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
};
