export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  onAction
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
