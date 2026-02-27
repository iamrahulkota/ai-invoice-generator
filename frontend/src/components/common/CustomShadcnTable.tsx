import { memo } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import CustomShadcnPagination from './CustomShadcnPagination';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../ui/avatar';
import { formatPrice } from '@/lib/utils';

interface CustomShadcnTableProps {
  idPrefix?: string;
  headCells: any[];
  data: any[];
  pagination?: boolean;
  setParams: any;
  meta_data: any;
}

function CustomShadcnTable({
  idPrefix,
  headCells,
  data,
  pagination = true,
  setParams,
  meta_data,
}: CustomShadcnTableProps) {

    function getNestedValue(obj: Record<string, any>, path: Path): any {
        const pathArray = typeof path === 'string' ? path.split('.') : path;
    
        return pathArray?.reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          obj,
        );
      }
    
      const isValidDate = (date: any) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      };

      const getStatusColor = (status : string = "") => {
        status = status.toLowerCase();
        if (['active', 'completed'].includes(status)) {
          return 'bg-[#D1FAE5] text-[#065F46]';
        }
        if (['inactive', 'in-active', 'in active', 'pending'].includes(status)) {
          return 'bg-[#FEE2E2] text-[#B91C1C]';
        }
        if (['open', 'closed', 'reopen', 'resolved'].includes(status)) {
          return 'bg-[#E9F0FF] text-[#1250D8]'
        }
        return 'gray';
      };

      
  return (
    <div className="">
      <Table id={`${idPrefix}-table`}>
        <TableHeader id={`${idPrefix}-table-head`}>
          <TableRow>
            {headCells?.length > 0 &&
              headCells?.map((headCell: any, index: number) => (
                <TableHead
                  key={`${headCell.id}-${index}`}
                  className="text-left text-foreground font-semibold py-2 backdrop-blur-3xl bg-muted/80"
                >
                  {headCell.label}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody id={`${idPrefix}-table-body`}>
          {data?.length > 0 &&
            data?.map((row, rowIndex) => (
              <TableRow key={`${idPrefix}-table-row-${rowIndex}`}>
                {headCells?.length > 0 &&
                  headCells?.map((cell: any, index: number) => (
                    <TableCell
                      key={`${idPrefix}-table-cell-${cell.id}-${index}`}
                      className="text-left text-foreground font-medium py-2.5"
                      style={{
                        minWidth: cell?.minWidth,
                        maxWidth: cell?.maxWidth,
                      }}
                    >
                      <div className="">
                        {cell?.type === 'date' ? (
                          <div>
                            {isValidDate(getNestedValue(row, cell?.key))
                              ? format(
                                  new Date(getNestedValue(row, cell?.key)),
                                  'LLL dd, y - hh:mm aa',
                                )
                              : getNestedValue(row, cell?.key)
                                ? 'Invalid date'
                                : 'Not Available'}
                          </div>
                        ) : cell?.type === 'user' ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={
                                  getNestedValue(row, cell?.key)
                                    ?.profile_image || row?.profile_image
                                }
                                alt={`${getNestedValue(row, cell?.key)?.['first_name'] || row['first_name']} ${getNestedValue(row, cell?.key)?.['last_name'] || row['last_name']}`}
                              />
                              <AvatarFallback className="uppercase">
                                {`${getNestedValue(row, cell?.key)?.['first_name']?.[0] || row['first_name']?.[0] || ''}${getNestedValue(row, cell?.key)?.['last_name']?.[0] || row['last_name']?.[0] || ''}`}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>
                                {getNestedValue(row, cell?.key)?.[
                                  'first_name'
                                ] || row['first_name']}{' '}
                                {getNestedValue(row, cell?.key)?.[
                                  'last_name'
                                ] || row['last_name']}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {getNestedValue(row, cell?.key)?.['email'] ||
                                  row?.email}
                              </div>
                            </div>
                          </div>
                        ) : cell?.type === 'price' ? (
                            <div>
                              {formatPrice(
                                Number(getNestedValue(row, cell?.key)?.value), false, getNestedValue(row, cell?.key)?.currency
                              )}
                            </div>
                        ) : cell.type === 'custom' ? (
                          <div>
                            {cell?.render(row)}
                          </div>
                        ) : cell?.type === 'description' ? (
                          <div className="line-clamp-2">{getNestedValue(row, cell?.key)}</div>
                        ) : cell.type === 'status' ? (
                          <div
                            className={`${getStatusColor(row?.status)} px-3 py-1 rounded-full text-xs w-fit`}
                          >
                            {row?.status}
                          </div>
                        ) : cell?.type === 'text' ? (
                          <div className="line-clamp-1">{getNestedValue(row, cell?.key)}</div>
                        ) : (
                        <div className="">--</div>
                        )}
                      </div>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {pagination && (
        <CustomShadcnPagination
          setParams={setParams}
          meta_data={meta_data}
        />
      )}
    </div>
  );
}

export default memo(CustomShadcnTable);
