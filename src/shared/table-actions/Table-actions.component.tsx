"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export type TableActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};
const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <div className="flex flex-col gap-2 mx-auto my-auto">
        <Button variant={"outline"} onClick={onEdit}>
          <PencilIcon className="w-4 h-4" />
          Editar
        </Button>
        <Button variant={"destructive"} onClick={onDelete}>
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </Button>
      </div>
    </>
  );
};
export default TableActions;
