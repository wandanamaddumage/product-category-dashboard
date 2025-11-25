import {
  Box,
  Grid,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Stat,
} from "@chakra-ui/react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function Dashboard() {
  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Heading size="xl" mb={2}>
          Analytics Dashboard
        </Heading>
        <Text color="gray.600">Comprehensive view of your metrics</Text>
      </Box>

      {/* Stats Row */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Stat.Root>
          <Stat.Label>Total Revenue</Stat.Label>
          <Stat.ValueText fontSize="3xl">$24,500</Stat.ValueText>
          <Stat.HelpText>
            <Stat.ValueText color="green.500">↑ 12%</Stat.ValueText> from last
            month
          </Stat.HelpText>
        </Stat.Root>

        <Stat.Root>
          <Stat.Label>Active Users</Stat.Label>
          <Stat.ValueText fontSize="3xl">3,200</Stat.ValueText>
          <Stat.HelpText>
            <Stat.ValueText color="green.500">↑ 8%</Stat.ValueText> from last
            month
          </Stat.HelpText>
        </Stat.Root>

        <Stat.Root>
          <Stat.Label>Conversion Rate</Stat.Label>
          <Stat.ValueText fontSize="3xl">2.4%</Stat.ValueText>
          <Stat.HelpText>
            <Stat.ValueText color="red.500">↓ 0.3%</Stat.ValueText> from last
            month
          </Stat.HelpText>
        </Stat.Root>
      </SimpleGrid>

      {/* Charts Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        <BarChart />
        <LineChart />
      </Grid>

      <Box>
        <PieChart />
      </Box>
    </VStack>
  );
}
