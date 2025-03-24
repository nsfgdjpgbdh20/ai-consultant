import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cases = [
  {
    company: '株式会社テックイノベーション',
    industry: '製造業',
    project: '生産ラインの最適化AI導入',
    results: ['生産効率30%向上、不良品率15%削減'],
    tag: '成功事例',
    testimonial: {
      stars: 5,
      text: 'AIの導入により、生産プロセスが大幅に改善されました。投資以上のリターンを得ることができ、大変満足しています。'
    }
  },
  {
    company: 'グローバルリテール株式会社',
    industry: '小売業',
    project: '顧客行動分析AIの実装',
    results: ['顧客満足度25%向上、リピート率40%増加'],
    tag: '成功事例',
    testimonial: {
      stars: 5,
      text: 'お客様の行動パターンを的確に分析できるようになり、より効果的なマーケティング施策が可能になりました。売上向上に大きく貢献しています。'
    }
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(rating)].map((_, i) => (
        <svg
          key={i}
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Cases = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="cases" className="py-20 bg-[#0A0B14] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            実績・事例
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            これまでに手がけたプロジェクトの一部をご紹介します。様々な業界で成果を上げてきた実績があります。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((case_, index) => (
            <motion.div
              key={case_.company}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#1A1B25] p-8 rounded-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{case_.company}</h3>
                  <p className="text-gray-400">{case_.industry}</p>
                </div>
                <span className="px-4 py-1 bg-blue-900 text-blue-300 rounded-full text-sm">
                  {case_.tag}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-400 mb-2">プロジェクト</h4>
                  <p className="text-lg">{case_.project}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-2">成果</h4>
                  {case_.results.map((result, i) => (
                    <p key={i} className="text-lg text-green-400">
                      {result}
                    </p>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-[#0A0B14] rounded-lg">
                  <StarRating rating={case_.testimonial.stars} />
                  <p className="text-gray-300">"{case_.testimonial.text}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases; 