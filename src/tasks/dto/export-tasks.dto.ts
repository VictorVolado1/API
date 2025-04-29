import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DateRangeDto {
  @IsOptional()
  from: string | null;

  @IsOptional()
  to: string | null;
}

export class ExportTasksdto {
  @IsOptional()
  completed?: boolean | number | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeDto)
  createdAt?: DateRangeDto | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeDto)
  updatedAt?: DateRangeDto | null;
}