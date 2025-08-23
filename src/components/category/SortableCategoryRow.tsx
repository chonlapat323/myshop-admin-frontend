"use client";

import Button from "@/components/ui/button/Button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type SortableCategoryRowProps = {
  category: {
    id: number;
    name: string;
    is_active: boolean;
    image: string | null;
  };
  isDeleting: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function SortableCategoryRow({
  category,
  isDeleting,
  onEdit,
  onDelete,
}: SortableCategoryRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`transition-opacity duration-300 ${isDeleting ? "opacity-0" : "opacity-100"}`}
    >
      <TableCell className="w-12 p-0">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center h-full cursor-grab active:cursor-grabbing hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors p-3"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-1 pointer-events-none">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Image
          src={
            category.image
              ? `${process.env.NEXT_PUBLIC_API_URL}${category.image}`
              : "/images/placeholder.png"
          }
          alt={`Image of ${category.name}`}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-md border"
          unoptimized
        />
      </TableCell>
      <TableCell className="text-left py-3">{category.name}</TableCell>
      <TableCell className="text-left py-3">
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            category.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {category.is_active ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell className="text-left py-3">
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(category.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            size="sm"
            variant="outline"
            startIcon={<PencilIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(category.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            size="sm"
            variant="outline"
            startIcon={<TrashBinIcon />}
            className="!text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
