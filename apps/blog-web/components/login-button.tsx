import { Button } from '@chakra-ui/react';
import { LoginModal } from './login-modal';
import { useCallback, useState } from 'react';

export interface LoginButtonProps {
  text?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ text = 'Login' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={handleOpenModal}>{text}</Button>
      <LoginModal isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};
