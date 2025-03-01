import { Metadata } from "@/app/types/metadata";
import Image from "next/image"

interface WhatsAppPreviewProps {
  metadata: Metadata;
}

export default function WhatsAppPreview({ metadata }: WhatsAppPreviewProps) {
  return (
    <div className="bg-[#0D1418] rounded-lg shadow-lg">
      <div className="p-3 border-b border-gray-700 flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            fill="#25D366"
          />
        </svg>
        <span className="text-white font-medium">WhatsApp</span>
      </div>
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <div className="bg-[#005C4B] rounded-lg p-2 max-w-[80%]">
            <p className="text-white mb-1">Check out this link:</p>
            <div className="bg-[#025144] rounded-md overflow-hidden">
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
                <h3 className="text-[#E9EDF0] text-sm font-semibold mb-1">{metadata.title}</h3>
                <p className="text-[#8696A0] text-xs mb-1 line-clamp-2">{metadata.description}</p>
                <div className="text-[#8696A0] text-xs">{metadata.url}</div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-1">
              <span className="text-[#8696A0] text-xs mr-1">12:34 PM</span>
              <svg className="w-4 h-4 text-[#53bdeb]" fill="currentColor" viewBox="0 0 16 15">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

