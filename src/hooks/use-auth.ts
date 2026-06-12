'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, queryKeys } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import type { User, RegisterInput, ApiResponse } from '@/types'

export function useCurrentUser() {
  const { user } = useAuthStore()

  const initialData: ApiResponse<User> | undefined = user
    ? { success: true, data: user }
    : undefined

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => api.get<ApiResponse<User>>('/auth/me'),
    enabled: false,
    select: (data: ApiResponse<User>) => data.data ?? data,
    initialData,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const login = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const register = useAuthStore((state) => state.register)

  return useMutation({
    mutationFn: (data: RegisterInput) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const updateUser = useAuthStore((state) => state.updateUser)

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await api.patch<ApiResponse<User>>('/auth/profile', data)
      return response
    },
    onSuccess: (response) => {
      const user = response.data || response
      updateUser(user as Partial<User>)
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) =>
      api.post<ApiResponse<null>>('/auth/forgot-password', { email }),
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      api.post<ApiResponse<null>>('/auth/reset-password', data),
  })
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) =>
      api.post<ApiResponse<null>>('/auth/verify-email', { token }),
  })
}
