import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { LongText } from "@/components/long-text"
import { MediaFile } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"

import { DataTableRowActions } from "./data-table-row-actions"

const columnHelper = createColumnHelper<MediaFile>()

//Make some columns!

export const defaultColumns = [
  //Display column
  columnHelper.display({
    id: "preview",
    header: () => <span>Preview</span>,
    cell: ({ row }) => {
      const { url } = row.original

      return (
        <div className="flex h-12 w-12 items-center gap-2">
          <SingleImagePreview
            imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
          />
        </div>
      )
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (props) => (
      <LongText className="max-w-36">{props.getValue()}</LongText>
    ),
  }),
  columnHelper.accessor("documentId", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document ID" />
    ),
    cell: (props) => (
      <LongText className="max-w-36">{props.getValue()}</LongText>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("ext", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extension" />
    ),
    cell: (props) => (
      <p>{props.getValue().replaceAll(".", "").toUpperCase()}</p>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("size", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size (KB)" />
    ),
    cell: (props) => <p>{props.getValue().toFixed()}</p>,
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: true,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: false,
  }),
  //Actions column
  columnHelper.display({
    id: "actions",
    header: ({ table }) => <span>Actions</span>,
    cell: (props) => <DataTableRowActions row={props.row} />,
  }),
]

// export const usersColumns: ColumnDef<User>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-0.5"
//       />
//     ),
//     meta: {
//       className: cn("inset-s-0 z-10 rounded-tl-[inherit] max-md:sticky"),
//     },
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-0.5"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "username",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Username" />
//     ),
//     cell: ({ row }) => (
//       <LongText className="max-w-36 ps-3">{row.getValue("username")}</LongText>
//     ),
//     meta: {
//       className: cn(
//         "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]",
//         "inset-s-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none"
//       ),
//     },
//     enableHiding: false,
//   },
//   {
//     id: "fullName",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Name" />
//     ),
//     cell: ({ row }) => {
//       const { firstName, lastName } = row.original
//       const fullName = `${firstName} ${lastName}`
//       return <LongText className="max-w-36">{fullName}</LongText>
//     },
//     meta: { className: "w-36" },
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Email" />
//     ),
//     cell: ({ row }) => (
//       <div className="w-fit ps-2 text-nowrap">{row.getValue("email")}</div>
//     ),
//   },
//   {
//     accessorKey: "phoneNumber",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Phone Number" />
//     ),
//     cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
//     enableSorting: false,
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Status" />
//     ),
//     cell: ({ row }) => {
//       const { status } = row.original
//       const badgeColor = callTypes.get(status)
//       return (
//         <div className="flex space-x-2">
//           <Badge variant="outline" className={cn("capitalize", badgeColor)}>
//             {row.getValue("status")}
//           </Badge>
//         </div>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//     enableHiding: false,
//     enableSorting: false,
//   },
//   {
//     accessorKey: "role",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Role" />
//     ),
//     cell: ({ row }) => {
//       const { role } = row.original
//       const userType = roles.find(({ value }) => value === role)

//       if (!userType) {
//         return null
//       }

//       return (
//         <div className="flex items-center gap-x-2">
//           {userType.icon && (
//             <userType.icon size={16} className="text-muted-foreground" />
//           )}
//           <span className="text-sm capitalize">{row.getValue("role")}</span>
//         </div>
//       )
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     id: "actions",
//     cell: DataTableRowActions,
//   },
// ]
