import React from 'react';
import type { Comment, Post } from '@tbcc/models';
import { useCommentsByPostIdQuery } from '../lib/comment/comment.query';
import { CreateComment } from './create-comment';
import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { dateUtil } from '../lib/date.util';

export interface PostPageContentProps {
  post: Post;
  comments: Comment[];
}

export const PostPageContent: React.FC<PostPageContentProps> = ({
  post,
  comments: commentsInitialData,
}) => {
  const { data: comments, refetch } = useCommentsByPostIdQuery(post.id, {
    initialData: commentsInitialData,
    refetchOnMount: false,
  });

  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1" size="xl" mt={8} mb={2}>
        {post.title}
      </Heading>
      <Text color="gray.500" fontSize="xs" mb={8}>
        Created at {dateUtil.convertIsoStringToDisplay(post.createdAt)}
      </Text>
      <Box
        sx={{ p: { marginBottom: '12px' } }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Box my={6} pt={6} borderTopColor="gray.200" borderTopWidth="thin">
        <Heading fontSize="md" mb={4}>
          Comments
        </Heading>
        {comments && comments.length > 0 ? (
          <List listStyleType={'none'} spacing={3}>
            {comments.map((comment) => (
              <ListItem
                key={comment.id}
                backgroundColor="gray.100"
                borderRadius="md"
                p={2}
              >
                <Text>{comment.content}</Text>
                <Text color="gray.500" fontSize="xs">
                  By {comment.username} at{' '}
                  {dateUtil.convertIsoStringToDisplay(comment.createdAt)}
                </Text>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No comments yet</Text>
        )}
      </Box>
      <CreateComment postId={post.id} onSuccess={refetch} />
    </Container>
  );
};
