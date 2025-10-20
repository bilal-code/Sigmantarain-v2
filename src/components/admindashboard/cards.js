const AdminCard = ({ name, Icon, price }) => {
  return (
    <div className="flex w-full items-center bg-[#0B98AC] backdrop-blur-md rounded-xl shadow-[0_4px_12px_rgba(168,85,247,0.25)] border border-purple-600/20 p-3 sm:p-4 transition-all cursor-pointer hover:shadow-[0_6px_15px_rgba(168,85,247,0.35)]">
      
      {/* Icon with subtle neon glow */}
      <div className="flex-shrink-0">
        <Icon size={28} className="text-white " />
      </div>

      {/* Text */}
      <div className="flex-1 overflow-hidden ml-3 sm:ml-4">
        <h4 className="font-semibold text-gray-200 text-sm sm:text-base truncate">
          {name}
        </h4>
        <p className="text-gray-300 text-xs sm:text-sm mt-1">{price}</p>
      </div>
    </div>
  );
};

export default AdminCard;
