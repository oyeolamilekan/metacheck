import { Metadata } from "@/app/types/metadata";
import Image from "next/image"

interface FacebookPreviewProps {
  metadata: Metadata;
}

export default function FacebookPreview({ metadata }: FacebookPreviewProps) {
  return (
    <div className="bg-[#242526] rounded-lg overflow-hidden shadow-lg">
      <div className="p-3 border-b border-[#3E4042] flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 12.073c0-5.8-4.85-10.5-10.837-10.5S2.326 6.273 2.326 12.073c0 5.242 3.874 9.593 8.937 10.377v-7.34H8.066v-3.037h3.197V9.86c0-3.066 1.88-4.76 4.738-4.76 1.37 0 2.803.237 2.803.237v2.988h-1.58c-1.558 0-2.044.936-2.044 1.896v2.277h3.477l-.556 3.037h-2.921v7.34c5.063-.784 8.937-5.135 8.937-10.377z"
            fill="#1877F2"
          />
        </svg>
        <span className="text-white font-medium">Facebook</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0"></div>
          <div>
            <div className="font-semibold text-[#E4E6EB]">User Name</div>
            <div className="text-[#B0B3B8] text-sm">1h · 🌍</div>
          </div>
        </div>
        <p className="text-[#E4E6EB] mb-3">Check out this interesting link:</p>
        <div className="border border-[#3E4042] rounded-lg overflow-hidden">
          {metadata.image && (
            <Image
              src={metadata.image || "/placeholder.svg"}
              alt={metadata.title}
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-3 bg-[#18191A]">
            <div className="text-xs text-[#B0B3B8] uppercase mb-1">{new URL(metadata.url).hostname}</div>
            <h3 className="text-[#E4E6EB] text-base font-semibold mb-1">{metadata.title}</h3>
            <p className="text-[#B0B3B8] text-sm">{metadata.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

