"use client";

interface MessageBubbleProps {
  from: string;
  text: string;
  time: string;
  mine?: boolean;
}

export default function MessageBubble({ from, text, time, mine }: MessageBubbleProps) {
  return (
    <div className={`flex mb-2 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`inline-block max-w-xs md:max-w-md p-3 rounded-2xl ${
          mine
            ? "bg-blue-600 text-white rounded-br-none" // mine → right side
            : "bg-gray-700 text-gray-100 rounded-bl-none" // opponent → left side
        }`}
      >
        {!mine && <div className="font-semibold text-sm mb-1">{from}</div>}
        <div>{text}</div>
        <div className="text-xs text-gray-300 mt-1 text-right">{time}</div>
      </div>
    </div>
  );
}
