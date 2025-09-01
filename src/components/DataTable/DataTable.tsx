import { ChevronDown, ChevronUp, Database, Loader2 } from "lucide-react";
import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const handleRowSelect = (row: T) => {
    let newSelected: T[] = [];
    if (selectedRows.includes(row)) {
      newSelected = selectedRows.filter((r) => r !== row);
    } else {
      newSelected = [...selectedRows, row];
    }
    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleSelectAll = () => {
    const allSelected = selectedRows.length === sortedData.length && sortedData.length > 0;
    const newSelected = allSelected ? [] : [...sortedData];
    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === column.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column.dataIndex, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    if (sortConfig?.key !== column.dataIndex) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  const isAllSelected = selectedRows.length === sortedData.length && sortedData.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header with selection info */}
      {selectable && selectedRows.length > 0 && (
        <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedRows.length} of {sortedData.length} rows selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-slate-500 font-medium">Loading data...</p>
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                {selectable && (
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isIndeterminate;
                        }}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-white border-2 border-slate-300 rounded 
                          focus:ring-blue-500 focus:ring-2 transition-colors duration-150"
                      />
                    </div>
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col)}
                    className={`px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider
                      ${col.sortable 
                        ? "cursor-pointer hover:bg-slate-200 transition-colors duration-150 select-none" 
                        : ""
                      }`}
                  >
                    <div className="flex items-center space-x-2 group">
                      <span>{col.title}</span>
                      {col.sortable && (
                        <div className="flex flex-col">
                          {getSortIcon(col)}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Database className="w-12 h-12 text-slate-300" />
                      <div>
                        <p className="text-slate-500 font-medium">No data available</p>
                        <p className="text-slate-400 text-sm mt-1">
                          There are no records to display at this time.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedData.map((row, idx) => {
                  const isSelected = selectedRows.includes(row);
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors duration-150 hover:bg-slate-50 
                        ${isSelected ? "bg-blue-50 hover:bg-blue-100" : ""}`}
                    >
                      {selectable && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(row)}
                            className="w-4 h-4 text-blue-600 bg-white border-2 border-slate-300 rounded 
                              focus:ring-blue-500 focus:ring-2 transition-colors duration-150"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"
                        >
                          <span className="font-medium">
                            {String(row[col.dataIndex])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer with row count */}
      {!loading && sortedData.length > 0 && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Showing {sortedData.length} {sortedData.length === 1 ? 'row' : 'rows'}
            </span>
            {selectable && (
              <span className="text-sm text-slate-600">
                {selectedRows.length} selected
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}