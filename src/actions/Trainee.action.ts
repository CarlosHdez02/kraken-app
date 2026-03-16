"use server";

import { queryParamsSchema } from "@/models/query-params/query-params.schema";
import type { ActionResponseType, PaginatedResult } from "@/models/action-response/action-response.type";
import { createErrorResponse } from "@/models/action-response/action-response.type";
import { ErrorCode } from "@/constants/error-codes";
import type { traineeType } from "@/models/trainee/trainee.type";
import TraineeService from "@/services/trainee/trainee.service";
import prisma from "../../lib/prisma";
import { traineeSchema } from "@/models/trainee/trainee.schema";

const traineeService = new TraineeService(prisma);

export async function getTraineesAction(
  rawParams: unknown
): Promise<PaginatedResult<traineeType>> {
  const parsed = queryParamsSchema.safeParse(rawParams);

  if (!parsed.success) {
    return createErrorResponse("Invalid parameters", {
      code: ErrorCode.VALIDATION,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    });
  }
  return traineeService.getTrainees(parsed.data);
}
export async function createTraineeAction(trainee:unknown):Promise<ActionResponseType<traineeType>>{
    const parsed = traineeSchema.safeParse(trainee);
    if(!parsed.success){
        return createErrorResponse("Invalid trainee data", {
            code: ErrorCode.VALIDATION,
            fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        });
    }
    return traineeService.createTrainee(parsed.data);
}