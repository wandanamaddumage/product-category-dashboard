import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', users: 1200, sessions: 2400 },
  { month: 'Feb', users: 1900, sessions: 3200 },
  { month: 'Mar', users: 1500, sessions: 2800 },
  { month: 'Apr', users: 2300, sessions: 3900 },
  { month: 'May', users: 2800, sessions: 4200 },
  { month: 'Jun', users: 3200, sessions: 4800 },
];

export default function LineChart() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="md">User Growth</Heading>
        <Text color="gray.600" fontSize="sm">
          Active users and sessions over time
        </Text>
      </CardHeader>
      <CardBody>
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
                name="Active Users"
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#d69e2e"
                strokeWidth={2}
                name="Sessions"
              />
            </RechartsLine>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
}
