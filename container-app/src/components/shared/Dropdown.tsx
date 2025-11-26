import { Select, IconButton, HStack, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface GenericDropdownProps {
  label: string;
  options: { value: string; label?: string }[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  onClear?: () => void;
}

const GenericDropdown = ({
  label,
  options,
  selectedValue,
  onChange,
  onClear,
}: GenericDropdownProps) => {
  return (
    <div>
      <HStack justify="space-between" mb={3}>
        <Text fontSize="sm" fontWeight="600" color="gray.700">
          {label}
        </Text>
        {selectedValue && onClear && (
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
      <Select
        placeholder={`Select ${label.toLowerCase()}`}
        value={selectedValue || ''}
        onChange={(e) => onChange(e.target.value)}
        borderColor="gray.300"
        _hover={{ borderColor: 'purple.400' }}
        _focus={{ borderColor: 'purple.500', boxShadow: '0 0 0 1px #805ad5' }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ 
              backgroundColor: 'var(--chakra-colors-white)', 
              color: 'var(--chakra-colors-black)', 
              fontWeight: 'normal',
              fontFamily: 'inherit'
            }}
          >
            {option.label || option.value}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default GenericDropdown;
