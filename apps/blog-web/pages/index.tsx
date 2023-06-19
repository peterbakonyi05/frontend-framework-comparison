import type { Post as PostModel } from '@tbcc/models';
import { apiClient } from '../lib/api-client';
import { Post } from '../components/post';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Container, Heading, VStack } from '@chakra-ui/react';

export interface IndexPageProps {
  posts: PostModel[];
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  _context: GetServerSidePropsContext
) => {
  const posts = await apiClient.getData<PostModel[]>('/api/posts');

  return { props: { posts } };
};

const HomePage: React.FC<IndexPageProps> = ({ posts }) => {
  return (
    <Container maxW="container.lg">
      <Heading as="h1" my={6}>Recents posts</Heading>
      <VStack p={4} spacing={{ base: 4, md: 6 }} width="full">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </VStack>
    </Container>
  );
};

export default HomePage;
