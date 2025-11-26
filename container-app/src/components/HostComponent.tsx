import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

export const HostComponent = () => {
  return (
    <Card variant="elevated" bg="white">
      <CardHeader>
        <Heading size="lg">Host Application Features</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Module Federation
            </Text>
            <Text color="gray.600">
              This application is configured with
              @originjs/vite-plugin-federation to support micro frontend
              architecture. You can dynamically load remote applications at
              runtime.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2}>
              Chakra UI
            </Text>
            <Text color="gray.600">
              Fully integrated with Chakra UI for modern, accessible, and
              customizable component library.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2}>
              Shared Dependencies
            </Text>
            <Text color="gray.600">
              React and React-DOM are configured as shared dependencies,
              ensuring efficient bundle sizes across micro frontends.
            </Text>
          </Box>
        </VStack>
      </CardBody>
      <CardFooter justifyContent="flex-end">
        <HStack spacing={3}>
          <Button variant="outline" colorScheme="gray">
            View Documentation
          </Button>
          <Button variant="solid" colorScheme="blue">
            Get Started
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};
