// src/services/trainee/trainee.service.ts

import type { queryParamsType } from "@/models/query-params/query-params.type";
import type { ActionResponseType, PaginatedResult } from "@/models/action-response/action-response.type";
import { createErrorResponse } from "@/models/action-response/action-response.type";
import { ErrorCode } from "@/constants/error-codes";
import { PrismaClient } from "@/generated/prisma/client";
import { runPaginatedQuery } from "../../../lib/pagination";
import type { traineeType } from "@/models/trainee/trainee.type";
import { UUID } from "crypto";

export default class TraineeService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTrainees(queryParams: queryParamsType): Promise<PaginatedResult<traineeType>> {
    try {
      const { page, limit } = queryParams;
      const { items, pagination } = await runPaginatedQuery({
        page,
        limit,
        count: () => this.prisma.trainee.count(),
        findMany: ({ skip, take }) =>
          this.prisma.trainee.findMany({ skip, take }),
      });

      return {
        success: true,
        data: items,
        pagination,
        message: "Trainees fetched successfully",
      };
    } catch (err) {
      console.error("[TraineeService.getTrainees]", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch trainees";
      return createErrorResponse(errorMessage, { code: ErrorCode.DB_ERROR });
    }
  }
  async createTrainee(trainee:traineeType):Promise<ActionResponseType<traineeType>>{
    try{
        const newTrainee = await this.prisma.trainee.create({data:{
            ...trainee,
        }});
        return {
            success: true,
            data: newTrainee,
            message: "Trainee created successfully",
        };
    }catch(err){
        console.error("[TraineeService.createTrainee]",err);
        const errorMessage =
        err instanceof Error ? err.message : "Failed to create trainee";
        return createErrorResponse(errorMessage, { code: ErrorCode.DB_ERROR });
    }
  }
 
}