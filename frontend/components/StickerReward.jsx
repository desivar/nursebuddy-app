import { motion } from 'framer-motion';

export default function StickerReward({ name, emoji }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-pink-100 p-4 rounded-full text-4xl shadow text-center"
    >
      {emoji} <br />
      <span className="text-sm text-pink-700">{name}</span>
    </motion.div>
  );
}