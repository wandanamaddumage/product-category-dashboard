import { Container, Box } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Dashboard />
      </Container>
    </Box>
  );
}

export default App;
