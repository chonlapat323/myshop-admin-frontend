import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Category } from "@/types/category";
import { DeleteResponse } from "@/types/DeleteResponse";
import { PaginatedResponse } from "@/types/PaginatedResonse";

export function getAllCategories(): Promise<Category[]> {
  return fetchWithAuth<Category[]>(`${API_URL}/categories/active`);
}

export function getCategories(
  page: number = 1,
  limit: number,
  search: string
): Promise<PaginatedResponse<Category>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    params.set("search", search);
  }

  return fetchWithAuth<PaginatedResponse<Category>>(`${API_URL}/categories/paginated?${params}`, {
    method: "GET",
    cache: "no-store",
  });
}

export function getCategoryById(id: string): Promise<Category> {
  return fetchWithAuth<Category>(`${API_URL}/categories/${id}`);
}

export function createCategory(data: FormData): Promise<Category> {
  return fetchWithAuth<Category>(`${API_URL}/categories`, {
    method: "POST",
    body: data,
  });
}

export function updateCategory(id: number, formData: FormData): Promise<Category> {
  return fetchWithAuth<Category>(`${API_URL}/categories/${id}/update`, {
    method: "POST",
    body: formData,
  });
}

export function updateCategoryOrder(data: { id: number; order: number }[]): Promise<Category[]> {
  return fetchWithAuth<Category[]>(`${API_URL}/categories/admin/order`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
}

export async function deleteCategory(id: number): Promise<DeleteResponse> {
  return fetchWithAuth<DeleteResponse>(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
}
