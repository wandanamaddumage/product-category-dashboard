import { IconButton, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLight = colorMode === 'light';

  return (
    <IconButton
      aria-label="Toggle theme"
      onClick={toggleColorMode}
      variant="ghost"
      size="lg"
      bg={isLight ? 'white' : 'black'}
      color={isLight ? 'black' : 'white'}
      border="0"
      borderColor="transparent"
      _hover={{ opacity: 0.8 }}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </IconButton>
  );
}
