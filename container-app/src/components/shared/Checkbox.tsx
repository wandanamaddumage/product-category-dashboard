import { Box, Checkbox, CheckboxGroup, Stack, Text, Badge, HStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface GenericCheckboxListProps {
  label: string;
  options: { id: number | string; label: string }[];
  selectedValues: Array<number | string>;
  onChange: (ids: string[]) => void;
  onClear?: () => void;
  disabled?: boolean;
  maxHeight?: string | number;
}

const GenericCheckboxList = ({
  label,
  options,
  selectedValues,
  onChange,
  onClear,
  disabled = false,
  maxHeight = '300px',
}: GenericCheckboxListProps) => {
  return (
    <Box>
      <HStack justify="space-between" mb={3}>
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          {label}
          {selectedValues.length > 0 && (
            <Badge ml={2} colorScheme="purple" fontSize="xs">
              {selectedValues.length} selected
            </Badge>
          )}
        </Text>
        {selectedValues.length > 0 && onClear && (
          <IconButton
            aria-label={`Clear ${label}`}
            icon={<CloseIcon />}
            size="xs"
            colorScheme="purple"
            variant="ghost"
            onClick={onClear}
          />
        )}
      </HStack>

      {disabled ? (
        <Box
          p={4}
          bg="gray.50"
          borderRadius="md"
          border="1px dashed"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.500">
            Select an option above first
          </Text>
        </Box>
      ) : (
        <CheckboxGroup
          value={selectedValues.map(String)}
          onChange={(values) => onChange(values as string[])}
        >
          <Stack spacing={2} maxH={maxHeight} overflowY="auto" pr={1}>
            {options.map((option) => (
              <Checkbox
                key={option.id}
                value={option.id.toString()}
                colorScheme="purple"
              >
                <Text fontSize="sm">{option.label}</Text>
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      )}
    </Box>
  );
};

export default GenericCheckboxList;
