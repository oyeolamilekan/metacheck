import { Metadata } from "@/app/types/metadata";
import Image from "next/image"

interface TelegramPreviewProps {
  metadata: Metadata;
}

export default function TelegramPreview({ metadata }: TelegramPreviewProps) {
  return (
    <div className="bg-[#17212B] rounded-lg shadow-lg">
      <div className="p-3 border-b border-gray-700 flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
            fill="#0088cc"
          />
        </svg>
        <span className="text-white font-medium">Telegram</span>
      </div>
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <div className="bg-[#2B5278] rounded-lg p-2 max-w-[80%]">
            <p className="text-white mb-1">Check out this link:</p>
            <div className="bg-[#182533] rounded-md overflow-hidden">
              {metadata.image && (
                <Image
                  src={metadata.image || "/placeholder.svg"}
                  alt={metadata.title}
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-2">
                <h3 className="text-[#F5F5F5] text-sm font-semibold mb-1">{metadata.title}</h3>
                <p className="text-[#AAB2BA] text-xs mb-1 line-clamp-2">{metadata.description}</p>
                <div className="text-[#4C5A67] text-xs">{metadata.url}</div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-1">
              <span className="text-[#AAB2BA] text-xs mr-1">12:34 PM</span>
              <svg className="w-4 h-4 text-[#4FAE4E]" fill="currentColor" viewBox="0 0 16 15">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

