import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export const UrlInputForm = ({
  url,
  onChange,
  onSubmit,
  isLoading,
}: {
  url: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}) => (
  <form onSubmit={onSubmit} className="relative mb-12">
    <Input
      type="text"
      value={url}
      onChange={onChange}
      placeholder="Enter your URL here..."
      className="w-full h-14 pl-4 pr-12 bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
      required
    />
    <Button
      type="submit"
      disabled={isLoading}
      className="absolute right-2 top-2 h-10 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-all"
    >
      {isLoading ? "Loading..." : <><Send className="w-4 h-4 mr-2" />Preview</>}
    </Button>
  </form>
)