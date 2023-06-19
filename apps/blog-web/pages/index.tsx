import type {
  CommentCountByPostIdResponse,
  Post as PostModel,
} from '@tbcc/models';
import { apiClient } from '../lib/api-client';
import { Post } from '../components/post';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { commentService } from '../lib/comment/comment.service';

export interface IndexPageProps {
  posts: PostModel[];
  commentCountByPostId: CommentCountByPostIdResponse;
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  _context: GetServerSidePropsContext
) => {
  const [posts, commentCountByPostId] = await Promise.all([
    apiClient.getData<PostModel[]>('/api/posts'),
    commentService.getCommentCountByPostId(),
  ]);

  return { props: { posts, commentCountByPostId } };
};

const HomePage: React.FC<IndexPageProps> = ({
  posts,
  commentCountByPostId,
}) => {
  return (
    <Container maxW="container.lg">
      <Heading as="h1" my={6}>
        Recents posts
      </Heading>
      <VStack p={4} spacing={{ base: 4, md: 6 }} width="full">
        {posts.map((post) => (
          <Post
            post={post}
            commentCount={commentCountByPostId[post.id]}
            key={post.id}
          />
        ))}
      </VStack>
    </Container>
  );
};

export default HomePage;
