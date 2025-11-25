import { Box, Card, Heading, Text } from "@chakra-ui/react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 20 },
];

const COLORS = ["#3182ce", "#38a169", "#d69e2e"];

export default function PieChart() {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Heading size="md">Traffic Sources</Heading>
        <Text color="gray.600" fontSize="sm">
          Device distribution
        </Text>
      </Card.Header>
      <Card.Body>
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
      </Card.Body>
    </Card.Root>
  );
}
