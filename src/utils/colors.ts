export const optionColors = [
    { bg: 'bg-[#007AFF]/10', border: 'border-[#007AFF]/20', hover: 'hover:bg-[#007AFF]/15', text: 'text-[#007AFF]', shadow: 'shadow-[0_8px_32px_rgba(0,122,255,0.12)]', blob: 'bg-[#007AFF]' }, // iOS Blue
    { bg: 'bg-[#AF52DE]/10', border: 'border-[#AF52DE]/20', hover: 'hover:bg-[#AF52DE]/15', text: 'text-[#AF52DE]', shadow: 'shadow-[0_8px_32px_rgba(175,82,222,0.12)]', blob: 'bg-[#AF52DE]' }, // iOS Purple
    { bg: 'bg-[#FF2D55]/10', border: 'border-[#FF2D55]/20', hover: 'hover:bg-[#FF2D55]/15', text: 'text-[#FF2D55]', shadow: 'shadow-[0_8px_32px_rgba(255,45,85,0.12)]', blob: 'bg-[#FF2D55]' }, // iOS Pink
    { bg: 'bg-[#FF9500]/10', border: 'border-[#FF9500]/20', hover: 'hover:bg-[#FF9500]/15', text: 'text-[#FF9500]', shadow: 'shadow-[0_8px_32px_rgba(255,149,0,0.12)]', blob: 'bg-[#FF9500]' }, // iOS Orange
    { bg: 'bg-[#34C759]/10', border: 'border-[#34C759]/20', hover: 'hover:bg-[#34C759]/15', text: 'text-[#34C759]', shadow: 'shadow-[0_8px_32px_rgba(52,199,89,0.12)]', blob: 'bg-[#34C759]' }, // iOS Green
    { bg: 'bg-[#5AC8FA]/10', border: 'border-[#5AC8FA]/20', hover: 'hover:bg-[#5AC8FA]/15', text: 'text-[#5AC8FA]', shadow: 'shadow-[0_8px_32px_rgba(90,200,250,0.12)]', blob: 'bg-[#5AC8FA]' }, // iOS Teal
];

export const getOptionTheme = (index: number) => optionColors[index % optionColors.length];
