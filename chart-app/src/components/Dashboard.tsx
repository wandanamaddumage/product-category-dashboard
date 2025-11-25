import {
  Box,
  Grid,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';
import BarChart from './BarChart';
import LineChart from './LineChart';

export default function Dashboard() {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="xl" mb={2}>
          Analytics Dashboard
        </Heading>
        <Text color="gray.600">Comprehensive view of your metrics</Text>
      </Box>

      {/* Stats Row */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Stat p={4} bg="white" borderRadius="md" boxShadow="sm">
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber fontSize="2xl">$24,500</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <Text as="span" color="green.500" ml={1}>
              12% from last month
            </Text>
          </StatHelpText>
        </Stat>

        <Stat p={4} bg="white" borderRadius="md" boxShadow="sm">
          <StatLabel>Active Users</StatLabel>
          <StatNumber fontSize="2xl">3,200</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            <Text as="span" color="green.500" ml={1}>
              8% from last month
            </Text>
          </StatHelpText>
        </Stat>

        <Stat p={4} bg="white" borderRadius="md" boxShadow="sm">
          <StatLabel>Conversion Rate</StatLabel>
          <StatNumber fontSize="2xl">2.4%</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            <Text as="span" color="red.500" ml={1}>
              0.3% from last month
            </Text>
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Charts Grid */}
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
        <BarChart />
        <LineChart />
      </Grid>

      <Box></Box>
    </VStack>
  );
}
