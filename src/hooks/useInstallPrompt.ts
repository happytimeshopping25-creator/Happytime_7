import { useEffect, useState } from "react"

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferred(e)
      setCanInstall(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const promptInstall = async () => {
    if (!deferred) return { outcome: "dismissed" }
    const res = await deferred.prompt()
    setDeferred(null)
    setCanInstall(false)
    return res
  }

  return { canInstall, promptInstall }
}
