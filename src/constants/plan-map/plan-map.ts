export const planMap = {
    SINGLE_VISIT:"Visita Unica",
    TWICE_PER_WEEK:"2 Veces por Semana",
    THREE_PER_WEEK:"3 Veces por Semana",
    UNLIMITED:"Ilimitado",
} as const;

export type PlanMapType = (typeof planMap)[keyof typeof planMap];
