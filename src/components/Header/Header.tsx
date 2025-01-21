import { BrandDerivLogoCoralIcon } from "@deriv/quill-icons";

export default function Header() {
    return (
        <div className="h-10 px-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
                <BrandDerivLogoCoralIcon height="20px" width="20px" />
                <span className="text-sm font-medium text-gray-800">
                    bots_v2
                </span>
            </div>
            <div className="flex items-center gap-8 text-xs text-gray-500">
                <span className="hover:text-gray-800 transition-colors">
                    Blah
                </span>
                <span className="hover:text-gray-800 transition-colors">
                    Blah
                </span>
                <span className="text-red-500">Saved</span>
            </div>
        </div>
    );
}
