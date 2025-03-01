import { Metadata } from "@/app/types/metadata";
import Image from "next/image"

interface TwitterPreviewProps {
  metadata: Metadata;
}

export default function TwitterPreview({ metadata }: TwitterPreviewProps) {
  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
      <div className="p-3 border-b border-gray-800 flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="#ffffff"
          />
        </svg>
        <span className="text-white font-medium">Twitter</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">User Name</span>
              <span className="text-gray-500">@username · 1h</span>
            </div>
            <p className="text-white mb-3">Check out this interesting link:</p>
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              {metadata.image && (
                <Image
                  src={metadata.image || "/placeholder.svg"}
                  alt={metadata.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-3 bg-black">
                <h3 className="text-white text-sm font-bold mb-1">{metadata.title}</h3>
                <p className="text-gray-400 text-sm mb-1">{metadata.description}</p>
                <div className="text-gray-500 text-sm">{metadata.url}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

