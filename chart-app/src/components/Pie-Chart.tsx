import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 },
];

const COLORS = ['#3182ce', '#38a169', '#d69e2e'];

export default function PieChart() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="md">Traffic Sources</Heading>
        <Text color="gray.600" fontSize="sm">
          Device distribution
        </Text>
      </CardHeader>
      <CardBody>
        <Box h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPie>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
}
