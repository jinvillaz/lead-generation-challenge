import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'

interface ErrorData {
  message: string
}

class NotificationService {
  showInfo(message: string) {
    toast.info(message)
  }

  showError(message: string) {
    toast.error(message)
  }

  handleError(error: unknown) {
    console.info('handleError ', error)
    let message = (error as Error).message
    if (axios.isAxiosError(error)) {
      const customError = (error as AxiosError).response?.data as ErrorData
      message = customError?.message || 'Something happened'
    }
    this.showError(message)
  }
}

export const notificationService = new NotificationService()
