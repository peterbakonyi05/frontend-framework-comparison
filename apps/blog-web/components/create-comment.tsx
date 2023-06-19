import { Button, Skeleton, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useAuth } from '../lib/auth/auth.hook';
import { useCreateCommentMutation } from '../lib/comment/comment.mutation';
import { LoginButton } from './login-button';

export interface CreateCommentProps {
  postId: number;
  onSuccess: () => void;
}

export const CreateComment: React.FC<CreateCommentProps> = ({
  postId,
  onSuccess,
}) => {
  const { isLoading: isAuthLoading, user } = useAuth();
  const [content, setContent] = useState('');
  const toast = useToast();
  const { mutateAsync: createComment, isLoading } = useCreateCommentMutation();

  const handleCreateComment = useCallback(async () => {
    try {
      await createComment({ content, postId });
      toast({
        title: 'Comment created',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setContent('');
      onSuccess();
    } catch {
      toast({
        title: 'Failed to create comment',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [postId, createComment, content, toast, onSuccess]);

  if (isAuthLoading) {
    return <Skeleton width="full" height="2rem" />;
  }

  if (!user) {
    return <LoginButton text='Login to add comment...' />;
  }

  return (
    <VStack alignItems="flex-start">
      <Textarea
        placeholder="Add your comment..."
        value={content}
        maxLength={300}
        noOfLines={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleCreateComment} isLoading={isLoading}>
        Create
      </Button>
    </VStack>
  );
};
