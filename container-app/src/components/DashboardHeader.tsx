import { Box, Heading, Text } from '@chakra-ui/react';

export function DashboardHeader() {
  return (
        <Box textAlign="start" mb={{ base: 5, md: 8 }} bg="white" p={5} borderRadius="lg" boxShadow="md">
          <Heading 
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="800"
            color="purple.600"
            mb={2}
          >
            Product Dashboard
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
            Analyze categories and products with interactive charts
          </Text>
        </Box>
  );
}
