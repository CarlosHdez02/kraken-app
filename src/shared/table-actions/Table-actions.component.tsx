"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { TableActionsProps } from "@/models/components/components.type";

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mx-auto my-auto">
        <Button className="cursor-pointer" variant={"outline"} onClick={onEdit}>
          <PencilIcon className="w-4 h-4" />
          Editar
        </Button>
        <Button className="cursor-pointer" variant={"destructive"} onClick={onDelete}>
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </Button>
      </div>
    </>
  );
};
export default TableActions;
