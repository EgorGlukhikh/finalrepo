import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import { Table as ChakraTable } from '@chakra-ui/react';

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <ChakraTable.ScrollArea borderWidth="1px" borderColor="border.subtle" borderRadius="3xl" bg="bg.elevated" boxShadow="sm">
      <ChakraTable.Root native className={className} size="md" {...props} />
    </ChakraTable.ScrollArea>
  );
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <ChakraTable.Header className={className} bg="bg.surfaceMuted" {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <ChakraTable.Body className={className} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <ChakraTable.Row className={className} borderColor="border.subtle" {...props} />;
}

export function TableHeaderCell({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <ChakraTable.ColumnHeader
      className={className}
      px="4"
      py="3.5"
      textStyle="overline"
      color="fg.subtle"
      borderColor="border.subtle"
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <ChakraTable.Cell className={className} px="4" py="4" fontSize="sm" color="fg.default" borderColor="border.subtle" {...props} />;
}
