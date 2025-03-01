import { Metadata } from "@/app/types/metadata";
import Image from "next/image"

interface LinkedInPreviewProps {
  metadata: Metadata;
}

export default function LinkedInPreview({ metadata }: LinkedInPreviewProps) {
  return (
    <div className="bg-[#1C1C1C] rounded-lg overflow-hidden shadow-lg">
      <div className="p-3 border-b border-gray-700 flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.833 0-2.136 1.389-2.136 3.037v5.569H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="#0077B5"
          />
        </svg>
        <span className="text-white font-medium">LinkedIn</span>
      </div>
      <div className="p-4">
        <div className="bg-[#232E3C] rounded-lg p-2">
          {metadata.image && (
            <Image
              src={metadata.image || "/placeholder.svg"}
              alt={metadata.title}
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          )}
          <h3 className="text-[#FFFFFF] text-base font-semibold mb-1">{metadata.title}</h3>
          <p className="text-[#A6A6A6] text-sm mb-1">{metadata.description}</p>
          <div className="text-[#A6A6A6] text-xs">{metadata.url}</div>
        </div>
      </div>
    </div>
  )
}

