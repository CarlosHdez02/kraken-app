"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { traineeType } from "@/models/trainee/trainee.type";
import TableActions from "@/shared/table-actions/Table-actions.component";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlanMapType, planMap } from "@/constants/plan-map/plan-map";

export type TraineeColumnsActions = {
  onEdit: (trainee: traineeType) => void;
  onDelete: (trainee: traineeType) => void;
};

function TraineeActionsCell({
  trainee,
  onEdit,
  onDelete,
}: {
  trainee: traineeType;
  onEdit: (t: traineeType) => void;
  onDelete: (t: traineeType) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisVertical className="size-4 cursor-pointer" />
          <span className="sr-only">Abrir acciones</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-2">
        <TableActions
          onEdit={() => {
            setOpen(false);
            onEdit(trainee);
          }}
          onDelete={() => {
            setOpen(false);
            onDelete(trainee);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function getTraineeColumns(actions: TraineeColumnsActions): ColumnDef<traineeType, unknown>[] {
  const { onEdit, onDelete } = actions;

  return [
    {
      id: "fullName",
      header: "Nombre",
      accessorFn: (row) =>
        [row.firstName, row.lastName].filter(Boolean).join(" ").trim() || "—",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "email",
      header: "Correo Electronico",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "rank",
      header: "Rango",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "age",
      header: "Edad",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "phone",
      header: "Telefono",
      cell: ({ getValue }) => getValue() ?? "—",
    },
    {
      accessorKey: "planType",
      header: "Tipo de Plan",
      cell: ({ getValue }) => planMap[getValue() as keyof typeof planMap] ?? "—",
    },
      {
        accessorKey: "isActive",
        header: "Estatus",
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean
      
          return isActive ? (
            <Badge variant="default">Activo</Badge>
          ) : (
            <Badge variant="destructive">Inactivo</Badge>
          )
        },
      },
    {
      accessorKey: "lastPaymentAt",
      header: "Pago Realizado",
      cell: ({ getValue }) => (getValue() ? "18/03/2026" : "No"),
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <TraineeActionsCell
          trainee={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];
}
