import { lazy, Suspense } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Spinner,
  Center,
  Card,
} from "@chakra-ui/react";

// Dynamically import chart components from chart-app
const Dashboard = lazy(() => import("chartApp/Dashboard"));
const BarChart = lazy(() => import("chartApp/BarChart"));
const LineChart = lazy(() => import("chartApp/LineChart"));
const PieChart = lazy(() => import("chartApp/PieChart"));

const ChartLoader = () => (
  <Card.Root>
    <Card.Body>
      <Center p={8}>
        <VStack gap={4}>
          <Spinner size="xl" colorPalette="blue" />
          <Text color="gray.600">Loading chart component...</Text>
        </VStack>
      </Center>
    </Card.Body>
  </Card.Root>
);

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box textAlign="center" py={8}>
            <Heading size="2xl" mb={4}>
              Container Application
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Host app consuming Chart Micro Frontend
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Built with Vite + React + Module Federation + Chakra UI
            </Text>
          </Box>

          {/* Full Dashboard from Chart App */}
          <Box>
            <Heading size="lg" mb={4}>
              Complete Dashboard
            </Heading>
            <Suspense fallback={<ChartLoader />}>
              <Dashboard />
            </Suspense>
          </Box>

          {/* Individual Charts Section */}
          <Box>
            <Heading size="lg" mb={4}>
              Individual Charts
            </Heading>
            <VStack gap={6} align="stretch">
              <Suspense fallback={<ChartLoader />}>
                <BarChart />
              </Suspense>

              <Suspense fallback={<ChartLoader />}>
                <LineChart />
              </Suspense>

              <Suspense fallback={<ChartLoader />}>
                <PieChart />
              </Suspense>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
