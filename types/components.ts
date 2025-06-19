export interface HomePageProps {
  onAssessment: () => void
  onCostCalculator: () => void
  onResources: () => void
  onCommunity: () => void
  onRegister: () => void
  onLogin: () => void
}

export interface AssessmentProps {
  onBack: () => void
  onRegister: (data?: any) => void
}

export interface CostCalculatorProps {
  onBack: () => void
  onRegister: (data?: any) => void
}

export interface GuidesProps {
  onBack: () => void
  onRegister: () => void
}

export interface GuestForumProps {
  onBack: () => void
  onRegister: () => void
}

export interface AuthFormsProps {
  mode: "login" | "register"
  onBack: () => void
  onSuccess: (userData?: any) => void
  onSwitchMode: () => void
  onForgotPassword?: () => void
}

export interface ForgotPasswordProps {
  onBack: () => void
}

export interface DashboardAppProps {
  onLogout: () => void
}