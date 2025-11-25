import { Box, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { BarChart3 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useColorModeValue } from './ui/color-mode';

export function DashboardHeader() {
  return (
    <div style={{ width: 'full' }}>
      <Box
        as="h3"
        w="100%"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <Container px={6} py={6}>
          {/* Top Row */}
          <Flex gap={3} mb={4}>
            {/* Left Section */}
            <Flex justify="flex-start" align="center" gap={3}>
              {/* Icon Box */}
              <Flex height="48px" width="48px" justify="center">
                <Icon as={BarChart3} boxSize={6} color="white" />
              </Flex>

              {/* Title */}
              <Heading
                as="h2"
                size="xl"
                fontWeight="bold"
                color={useColorModeValue('gray.900', 'white')}
              >
                Product & Category Dashboard
              </Heading>
            </Flex>

            {/* Theme Toggle */}
            <Flex justify="flex-end" align="center">
              <ThemeToggle />
            </Flex>
          </Flex>

          {/* Subtitle */}
          <Text
            fontStyle="lg"
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            Analyze product categories and sales performance with interactive
            charts
          </Text>
        </Container>
      </Box>
    </div>
  );
}
