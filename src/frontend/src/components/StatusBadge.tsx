import { Badge } from '@/components/ui/badge';
import {
  GP_STATUS_LABELS,
  GP_STATUS_COLORS,
  STOCK_TAKE_STATUS_LABELS,
  STOCK_TAKE_STATUS_COLORS,
  EXCEPTION_STATUS_LABELS,
  EXCEPTION_STATUS_COLORS,
} from '@/shared/constants/status';

interface StatusBadgeProps {
  status: string;
  type: 'gatepass' | 'stocktake' | 'exception';
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  let label = status;
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';

  if (type === 'gatepass') {
    label = GP_STATUS_LABELS[status] || status;
    variant = GP_STATUS_COLORS[status] || 'default';
  } else if (type === 'stocktake') {
    label = STOCK_TAKE_STATUS_LABELS[status] || status;
    variant = STOCK_TAKE_STATUS_COLORS[status] || 'default';
  } else if (type === 'exception') {
    label = EXCEPTION_STATUS_LABELS[status] || status;
    variant = EXCEPTION_STATUS_COLORS[status] || 'default';
  }

  return (
    <Badge variant={variant} className="status-badge">
      {label}
    </Badge>
  );
}
