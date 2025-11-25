import { Box, Card, Heading, Text } from "@chakra-ui/react";
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", users: 1200, sessions: 2400 },
  { month: "Feb", users: 1900, sessions: 3200 },
  { month: "Mar", users: 1500, sessions: 2800 },
  { month: "Apr", users: 2300, sessions: 3900 },
  { month: "May", users: 2800, sessions: 4200 },
  { month: "Jun", users: 3200, sessions: 4800 },
];

export default function LineChart() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Heading size="md">User Growth</Heading>
        <Text color="gray.600" fontSize="sm">
          Active users and sessions over time
        </Text>
      </Card.Header>
      <Card.Body>
        <Box h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLine data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#805ad5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#d69e2e"
                strokeWidth={2}
              />
            </RechartsLine>
          </ResponsiveContainer>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
