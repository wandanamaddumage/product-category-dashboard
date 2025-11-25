import { Box, Card, Button, HStack, Text, VStack, Heading } from "@chakra-ui/react"

export const HostComponent = () => {
  return (
    <Card.Root variant="elevated" bg="white">
      <Card.Header>
        <Heading size="lg">Host Application Features</Heading>
      </Card.Header>
      <Card.Body>
        <VStack gap={4} align="stretch">
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Module Federation
            </Text>
            <Text color="gray.600">
              This application is configured with @originjs/vite-plugin-federation 
              to support micro frontend architecture. You can dynamically load 
              remote applications at runtime.
            </Text>
          </Box>
          
          <Box>
            <Text fontWeight="semibold" mb={2}>
              Chakra UI v3
            </Text>
            <Text color="gray.600">
              Fully integrated with Chakra UI v3 for modern, accessible, and 
              customizable component library.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2}>
              Shared Dependencies
            </Text>
            <Text color="gray.600">
              React and React-DOM are configured as shared dependencies, ensuring 
              efficient bundle sizes across micro frontends.
            </Text>
          </Box>
        </VStack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <HStack gap={3}>
          <Button variant="outline" colorPalette="gray">
            View Documentation
          </Button>
          <Button variant="solid" colorPalette="blue">
            Get Started
          </Button>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}
