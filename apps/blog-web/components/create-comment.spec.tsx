import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CreateComment } from './create-comment';
import { AppWrapper } from '../test/app-wrapper';
import { User } from '@tbcc/models';

const MOCK_USER: User = {
  email: 'j.d@adsasd.com',
  firstName: 'John',
  lastName: 'Doe',
  id: 100,
};

const server = setupServer(
  rest.get('http://localhost:3000/api/auth/profile', async (req, res, ctx) => {
    return res(ctx.json(MOCK_USER));
  }),
  rest.post('http://localhost:3000/api/comments', async (req, res, ctx) => {
    const { content, postId } = await req.json();
    if (content === 'Test comment' && postId === 1) {
      return res(ctx.status(200), ctx.json({ success: true }));
    } else {
      return res(
        ctx.status(500),
        ctx.json({ error: 'Failed to create comment' })
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CreateComment', () => {
  it('should render correctly and call onSuccess when creating a comment', async () => {
    const onSuccessMock = jest.fn();
    render(<CreateComment postId={1} onSuccess={onSuccessMock} />, {
      wrapper: AppWrapper,
    });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Add your comment...')
      ).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Add your comment...');
    const createButton = screen.getByRole('button', { name: 'Create' });

    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it('should show an error toast when comment creation fails', async () => {
    const onSuccessMock = jest.fn();
    const toastMock = jest.fn();
    const useToastMock = jest.fn().mockReturnValue(toastMock);
    jest.doMock('@chakra-ui/react', () => ({
      ...jest.requireActual('@chakra-ui/react'),
      useToast: useToastMock,
    }));

    render(<CreateComment postId={1} onSuccess={onSuccessMock} />, {
      wrapper: AppWrapper,
    });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Add your comment...')
      ).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Add your comment...');
    const createButton = screen.getByRole('button', { name: 'Create' });

    fireEvent.change(textarea, { target: { value: 'Invalid comment' } });
    fireEvent.click(createButton);

    expect(onSuccessMock).not.toHaveBeenCalled();
  });
});
