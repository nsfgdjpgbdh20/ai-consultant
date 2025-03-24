import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Profile = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    'AI開発経験10年以上',
    '100社以上のAIコンサルティング実績',
    'Google認定機械学習エンジニア',
    'AWS認定ソリューションアーキテクト',
    '国内大手企業のAI戦略顧問',
    '著書「ビジネスAI実践ガイド」執筆',
  ];

  return (
    <section id="profile" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              プロフィール
            </h2>
            <p className="text-xl text-gray-600">
              豊富な経験と実績を持つAIコンサルタントが
              あなたのビジネスをサポートします
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">山田 太郎</h3>
                <p className="text-gray-600 mb-4">
                  AIコンサルタント / 技術顧問
                </p>
                <p className="text-gray-600">
                  大手IT企業でAI開発リーダーとして10年以上の経験を積んだ後、
                  独立してAIコンサルタントとして活動。企業のAI戦略立案から
                  実装まで、包括的なサポートを提供しています。
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">主な実績</h4>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
                {/* プロフィール画像をここに追加 */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile; 