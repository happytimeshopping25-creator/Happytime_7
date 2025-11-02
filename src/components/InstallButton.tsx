"use client"
import { Button } from "@/components/ui/button"
import { useInstallPrompt } from "@/hooks/useInstallPrompt"

export function InstallButton() {
  const { canInstall, promptInstall } = useInstallPrompt()
  if (!canInstall) return null
  return <Button onClick={promptInstall}>تثبيت التطبيق على جهازك</Button>
}
