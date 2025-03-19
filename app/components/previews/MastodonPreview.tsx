import { Metadata } from "@/app/types/metadata"
import Image from "next/image"

interface MastodonPreviewProps {
  metadata: Metadata
}

export default function MastodonPreview({ metadata }: MastodonPreviewProps) {
  return (
    <div className="bg-[#1f232b] rounded-lg overflow-hidden shadow-lg">
      <div className="p-3 border-b border-[#313543] flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 74 79" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M73.7014 17.4323C72.5616 9.05152 65.1774 2.4469 56.424 1.1671C54.9472 0.950843 49.3518 0.163818 36.3901 0.163818H36.2933C23.3281 0.163818 20.5465 0.950843 19.0697 1.1671C10.56 2.41145 2.78877 8.34604 0.903306 16.826C-0.00357854 21.0022 -0.100361 25.6322 0.068112 29.8793C0.308275 35.9699 0.354874 42.0498 0.91406 48.1156C1.30064 52.1448 1.97502 56.1419 2.93215 60.0769C4.72441 67.3445 11.9795 73.3925 19.0876 75.86C26.6979 78.4332 34.8821 78.8603 42.724 77.0937C43.5866 76.8952 44.4398 76.6647 45.2833 76.4024C47.1867 75.8033 49.4199 75.1332 51.0616 74.0695C51.0841 74.0542 51.1026 74.0352 51.1162 74.0133C51.1298 73.9914 51.1383 73.9671 51.1409 73.942V68.4661C51.1416 68.4418 51.1362 68.4177 51.1251 68.3957C51.114 68.3736 51.0974 68.354 51.0765 68.3385C51.0556 68.323 51.0309 68.3119 51.0043 68.306C50.9777 68.3001 50.9497 68.2995 50.9227 68.3044C45.8451 69.4057 40.6533 69.9761 35.4458 70.0023C26.6335 70.0023 24.3563 66.0634 23.8372 64.5661C23.4213 63.3456 23.1403 62.0818 22.9991 60.7995C22.9959 60.7752 22.9989 60.7507 23.008 60.7278C23.017 60.7049 23.0319 60.684 23.0517 60.6669C23.0715 60.6498 23.0957 60.6369 23.1223 60.6291C23.149 60.6213 23.1773 60.6188 23.2054 60.6219C28.2036 61.7088 33.3245 62.2677 38.4669 62.2826C39.7513 62.2826 41.0286 62.2826 42.313 62.2471C46.8211 62.1213 51.6195 61.9242 56.1459 61.2703C56.2947 61.2453 56.4463 61.2274 56.5862 61.1953C64.8694 59.9503 72.5972 55.0856 73.5587 44.1423C73.6054 43.6029 73.7014 42.4897 73.7014 42.4897C73.7014 42.4897 73.8068 38.5013 73.8068 36.4347C73.8068 32.5451 73.7014 28.7078 73.7014 17.4323Z" 
            fill="#ffffff"
          />
        </svg>
        <span className="text-white font-medium">Mastodon Preview</span>
      </div>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 mr-3">
          <div className="w-12 h-12 rounded-full bg-[#313543]"></div>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-baseline mb-1">
            <span className="text-white font-bold mr-2">Preview User</span>
            <span className="text-[#606984] text-sm">@preview@mastodon.social · Now</span>
          </div>
          <div className="text-white mb-2 break-words">
            {metadata.title}
          </div>
          <div className="border border-[#313543] rounded overflow-hidden bg-[#313543] hover:bg-[#363b4b] transition-colors">
            {metadata.image && (
              <Image
                src={metadata.image}
                alt={metadata.title}
                width={600}
                height={300}
                className="w-full object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-white font-medium mb-1 line-clamp-2">
                {metadata.title}
              </div>
              {metadata.description && (
                <div className="text-[#606984] text-sm mb-2 line-clamp-2">
                  {metadata.description}
                </div>
              )}
              <div className="text-[#606984] text-sm truncate">
                {metadata.url}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-[#606984]">
            <button className="hover:text-white transition-colors flex items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 5.5v9M5.5 10h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm">9</span>
            </button>
            <button className="hover:text-white transition-colors flex items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5h6a2 2 0 012 2v3a2 2 0 01-2 2h-6l-3 3V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-sm">115</span>
            </button>
            <button className="hover:text-white transition-colors flex items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 7v3a5 5 0 01-5 5H7l-3 3V7a5 5 0 015-5h3a5 5 0 015 5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-sm">17</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
