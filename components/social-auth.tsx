"use client"

import { Button } from "@/components/ui/button"

interface SocialAuthProps {
  onGoogleLogin: () => void
  onFacebookLogin: () => void
  isLoading?: boolean
}

export function SocialAuth({ onGoogleLogin, onFacebookLogin, isLoading = false }: SocialAuthProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Hoặc tiếp tục với</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 8.13745C15.5 7.54038 15.4469 7.13099 15.3313 6.70801H8V9.60033H12.3063C12.2156 10.3394 11.7688 11.3994 10.7906 12.1069L10.7756 12.2042L13.1344 14.0456L13.2875 14.0611C14.7844 12.6912 15.5 10.6118 15.5 8.13745Z"
              fill="#4285F4"
            />
            <path
              d="M8 15.5C10.1625 15.5 12.0156 14.8387 13.2875 14.0611L10.7906 12.1069C10.1219 12.5762 9.2119 12.8862 8 12.8862C5.9475 12.8862 4.2175 11.5387 3.57687 9.66125L3.48562 9.66869L1.02312 11.5831L0.985625 11.6706C2.24375 14.0056 4.9225 15.5 8 15.5Z"
              fill="#34A853"
            />
            <path
              d="M3.57687 9.66125C3.40562 9.23826 3.30562 8.77889 3.30562 8.3C3.30562 7.82106 3.40562 7.36175 3.56937 6.93876L3.56469 6.83521L1.07 4.89888L0.985625 4.92938C0.36 6.20326 0 7.65163 0 9.2C0 10.7484 0.36 12.1967 0.985625 13.4706L3.57687 9.66125Z"
              fill="#FBBC05"
            />
            <path
              d="M8 3.71375C9.48875 3.71375 10.4887 4.3845 11.0644 4.92938L13.2956 2.77375C12.0094 1.59125 10.1625 0.8 8 0.8C4.9225 0.8 2.24375 2.29438 0.985625 4.62938L3.56937 6.93876C4.2175 5.06125 5.9475 3.71375 8 3.71375Z"
              fill="#EB4335"
            />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          onClick={onFacebookLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 8C15.5 3.85938 12.1406 0.5 8 0.5C3.85938 0.5 0.5 3.85938 0.5 8C0.5 11.7344 3.21875 14.8125 6.78125 15.3906V10.1562H4.875V8H6.78125V6.36875C6.78125 4.49375 7.94375 3.40625 9.65625 3.40625C10.4688 3.40625 11.3125 3.57188 11.3125 3.57188V5.40625H10.3594C9.41875 5.40625 9.125 6.00938 9.125 6.625V8H11.2344L10.8906 10.1562H9.125V15.3906C12.6875 14.8125 15.5 11.7344 15.5 8Z"
              fill="#1877F2"
            />
            <path
              d="M10.8906 10.1562L11.2344 8H9.125V6.625C9.125 6.00938 9.41875 5.40625 10.3594 5.40625H11.3125V3.57188C11.3125 3.57188 10.4688 3.40625 9.65625 3.40625C7.94375 3.40625 6.78125 4.49375 6.78125 6.36875V8H4.875V10.1562H6.78125V15.3906C7.17188 15.4531 7.57812 15.5 8 15.5C8.42188 15.5 8.82812 15.4531 9.21875 15.3906V10.1562H10.8906Z"
              fill="white"
            />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  )
}
