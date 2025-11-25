import { Box, Card, Heading, Text } from "@chakra-ui/react";
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 2000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
];

export default function BarChart() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Heading size="md">Sales & Revenue</Heading>
        <Text color="gray.600" fontSize="sm">
          Monthly performance metrics
        </Text>
      </Card.Header>
      <Card.Body>
        <Box h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBar data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3182ce" />
              <Bar dataKey="revenue" fill="#38a169" />
            </RechartsBar>
          </ResponsiveContainer>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
