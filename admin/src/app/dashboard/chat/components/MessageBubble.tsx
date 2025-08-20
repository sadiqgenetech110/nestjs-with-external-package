export default function MessageBubble({ from, text, time, mine }: 
  { from: string, text: string, time: string, mine?: boolean }) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-xs p-3 rounded-lg ${mine ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}>
        <p>{text}</p>
        <span className="text-xs text-gray-400 block mt-1">{time}</span>
      </div>
    </div>
  );
}
